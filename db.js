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

// 📌 Configuración de conexión a la base de datos
const DB_USER = "postgres";
const DB_PASSWORD = "john.007";
const DB_HOST = "localhost"; 
const DB_PORT = "5432";
const DB_NAME = "sistema_egresados_titulados";

const database = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  { logging: false }
);

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


// =======================================================
// 🔹 Verificar conexión
// =======================================================
(async () => {
  try {
    await database.authenticate();
    console.log("✅ Conexión exitosa a la base de datos.");
    await database.sync({ alter: true });
    console.log("✅ Modelos sincronizados correctamente.");
  } catch (error) {
    console.error("❌ Error al conectar la base de datos:", error);
  }
})();

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
