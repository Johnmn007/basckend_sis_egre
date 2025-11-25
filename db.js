const { Sequelize } = require("sequelize");

// 📌 Importar modelos
const StudentModel = require("./models/Student");
const TecProfessionalModel = require("./models/tecProfessional");
const StudentEgresadoModel = require("./models/StudentGraduate");
const StudentTituladoModel = require("./models/StudentTitle");
const ModalidadModel = require("./models/Modalidades");
const LoginModel = require("./models/Login");
const RolModel = require("./models/Roles");
const PermisosModel = require("./models/Permisos");
const SeguimientoLaboralModel = require("./models/SeguimientoLaboral");


// ===========================================
// 🔹 CONFIGURACIÓN PARA RAILWAY
// ===========================================

// 📌 TU URL (Railway) — debe venir desde Variable de entorno
// DATABASE_URL = "postgresql://postgres:AwzjjEKwrxLelAagJedxGjkoGPtHGxBY@postgres.railway.internal:5432/railway"

// const database = new Sequelize(process.env.DATABASE_URL, {
//   dialect: "postgres",
//   protocol: "postgres",
//   logging: false,
//   dialectOptions: {
//     ssl: {
//       require: false // 🚫 NO usar SSL en railway.internal
//     }
//   }
// });


const database = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    ssl: process.env.NODE_ENV === 'production' ? {
      require: true,
      rejectUnauthorized: false
    } : false
  }
});

// Verificar conexión
database.authenticate()
  .then(() => console.log('✅ Conectado a la base de datos'))
  .catch(err => console.error('❌ Error de conexión:', err));




// 📌 Crear instancias de los modelos
const Student = StudentModel(database);
const TecProfessional = TecProfessionalModel(database);
const StudentEgresado = StudentEgresadoModel(database);
const StudentTitulado = StudentTituladoModel(database);
const Login = LoginModel(database);
const Rol = RolModel(database);
const Permisos = PermisosModel(database);
const SeguimientoLaboral = SeguimientoLaboralModel(database);
const Modalidad = ModalidadModel(database);

// =======================================================
// 🔹 Definir Relaciones con ALIAS claros
// =======================================================

// 🔸 Student → StudentEgresado
Student.hasMany(StudentEgresado, { foreignKey: "idStudent", as: "egresados", onDelete: "CASCADE" });
StudentEgresado.belongsTo(Student, { foreignKey: "idStudent", as: "student" });

// 🔸 TecProfessional → StudentEgresado
TecProfessional.hasMany(StudentEgresado, { foreignKey: "idProfessional", as: "egresados", onDelete: "CASCADE" });
StudentEgresado.belongsTo(TecProfessional, { foreignKey: "idProfessional", as: "profession" });

// 🔸 StudentEgresado → StudentTitulado (1:1 con alias "titulo")
StudentEgresado.hasOne(StudentTitulado, { as: "titulo", foreignKey: "idGraduate" });
StudentTitulado.belongsTo(StudentEgresado, { as: "egresado", foreignKey: "idGraduate" });

// 🔸 Student → StudentTitulado
Student.hasMany(StudentTitulado, { foreignKey: "idStudent", as: "titulados", onDelete: "CASCADE" });
StudentTitulado.belongsTo(Student, { foreignKey: "idStudent", as: "student" });

// 🔸 Login → Rol
Login.belongsTo(Rol, { foreignKey: "idRol", as: "rol", onDelete: "SET NULL" });
Rol.hasMany(Login, { foreignKey: "idRol", as: "logins", onDelete: "SET NULL" });

// 🔸 Rol → Permisos
Rol.hasMany(Permisos, { foreignKey: "idRol", as: "permisos", onDelete: "CASCADE" });
Permisos.belongsTo(Rol, { foreignKey: "idRol", as: "rol", onDelete: "CASCADE" });

// 🔸 SeguimientoLaboral → Student
SeguimientoLaboral.belongsTo(Student, { foreignKey: "idStudent", as: "student", onDelete: "CASCADE" });
Student.hasMany(SeguimientoLaboral, { foreignKey: "idStudent", as: "seguimientos", onDelete: "CASCADE" });

// 🔸 SeguimientoLaboral → StudentTitulado
SeguimientoLaboral.belongsTo(StudentTitulado, { foreignKey: "idStudentTitle", as: "titulado", onDelete: "CASCADE" });
StudentTitulado.hasMany(SeguimientoLaboral, { foreignKey: "idStudentTitle", as: "seguimientos", onDelete: "CASCADE" });

// 🔸 Modalidad → StudentTitulado
Modalidad.hasMany(StudentTitulado, { foreignKey: "idModalidad", as: "titulados", onDelete: "SET NULL" });
StudentTitulado.belongsTo(Modalidad, { foreignKey: "idModalidad", as: "modalidad", onDelete: "SET NULL" });

StudentTitulado.belongsTo(TecProfessional, { as: "profession", foreignKey: "idProfessional" });
TecProfessional.hasMany(StudentTitulado, { as: "titulados", foreignKey: "idProfessional" });


module.exports = {
  database,
  Student,
  TecProfessional,
  StudentEgresado,
  StudentTitulado,
  Login,
  Rol,
  Permisos,
  SeguimientoLaboral,
  Modalidad
};


// ----------------------logs--------------
const getRol = async () => {
  try {
    console.log("🔍 Intentando obtener roles...");
    const roles = await Rol.findAll();
    console.log("✅ Roles obtenidos:", roles.length);
    return roles;
  } catch (error) {
    console.error("❌ Error en getRol:", error);
    throw error;
  }
};