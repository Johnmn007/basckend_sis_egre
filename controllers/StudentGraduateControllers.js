const { StudentEgresado,TecProfessional,Student } = require("../db");
const { Sequelize } = require("sequelize");

const createStudentEgresados = async (idProfessional,idStudent, ageEntry, ageGraduation,certificadosModulares,Observacion) => {
    const newStudentEgresados = await StudentEgresado.create({idProfessional,idStudent, ageEntry, ageGraduation,certificadosModulares,Observacion});
    await newStudentEgresados.reload(); // Recarga los datos actualizados de la base de datos
    return newStudentEgresados;
};

const getStudentEgresados = async () => {
    return await StudentEgresado.findAll();
};



const getidStudentEgresados = async (id) => {
    return await StudentEgresado.findByPk(id);
};

const getidProfessionalStudentEgresados = async (idProfessional) => {
  return await StudentEgresado.findAll({
    where: { idProfessional },
    include: [
      {
        model: Student,
        as: "student", // 👈 alias de la relación con estudiantes
      },
      {
        model: TecProfessional,
        as: "profession", // 👈 alias de la relación con profesión
        attributes: ["id", "nameProfession"], // solo lo necesario
      },
    ],
  });
};

const updateStudentEgresados = async (id,idProfessional,idStudent, ageEntry, ageGraduation,certificadosModulares,Observacion) => {
    const Egresado = await StudentEgresado.findByPk(id);
    if (!Egresado) throw new Error("Estudiante egresado no encontrado");

    await Egresado.update({idProfessional,idStudent, ageEntry, ageGraduation,certificadosModulares,Observacion});
   

    return Egresado;
};

const deleteStudentEgresados = async (id) => {
    const studentEgresado = await StudentEgresado.findByPk(id);
    if (!studentEgresado) throw new Error("Estudiante egresado no encontrado");

    await studentEgresado.destroy();
    return { message: "Estudiante egresado eliminado" }; // Se puede retornar un mensaje de éxito
};

const countProfessions = async () => { 
  const result = await StudentEgresado.findAll({
    attributes: [
      "idProfessional",
      [Sequelize.fn("COUNT", Sequelize.literal("*")), "count"]
    ],
    include: [
      {
        model: TecProfessional,
        as: "profession",
        attributes: ["id", "nameProfession"] // 👈 incluyes el id también
      }
    ],
    group: ["idProfessional", "profession.id"],
    raw: true,
    nest: true
  });

  return result.map(r => ({
    id: r.profession.id, // 👈 aquí ya tienes el id del TecProfessional
    nameProfession: r.profession.nameProfession,
    count: parseInt(r.count, 10)
  }));
};







module.exports = {
    createStudentEgresados,
    getStudentEgresados,
    updateStudentEgresados,
    deleteStudentEgresados,
    getidStudentEgresados,

    getidProfessionalStudentEgresados,
    countProfessions,
};
