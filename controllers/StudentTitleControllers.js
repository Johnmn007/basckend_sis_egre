const {StudentTitulado,TecProfessional,Student} = require("../db");
   
const createStudentTitulado = async(idGraduate,idProfessional,idStudent,idSeguimiento,idModalidad,ageTitle,numberTitle,numberResolution,Observacion,photoTitle) =>{
    const newStudentTitulado = await StudentTitulado.create({idGraduate,idProfessional,idStudent,idSeguimiento,idModalidad,ageTitle,numberTitle,numberResolution,Observacion,photoTitle})
    return newStudentTitulado;
}
const getStudentTitulado = async()=>{
  
    const studenttitulado= await StudentTitulado.findAll();
    return studenttitulado;
}
const getidStudentTitulado = async (id) => {
    return await StudentTitulado.findByPk(id);
};

const getTitleGraduate = async (id) => {
    return await StudentTitulado.findAll({
      where: { idGraduate: id },  
    });
  }  


const updateStudentTitulado = async(id,idGraduate,idProfessional,idStudent,idSeguimiento,idModalidad,ageTitle,numberTitle,numberResolution,Observacion,photoTitle)=>{
    const findStudentTitulado = await StudentTitulado.findByPk(id);

    const StudentTituladoUpdate = await findStudentTitulado.update({idGraduate,idProfessional,idStudent,idSeguimiento,idModalidad,ageTitle,numberTitle,numberResolution,Observacion,photoTitle});
    return StudentTituladoUpdate;
}
const deleteStudentTitulado = async(id)=>{
    const studenttitulado = await StudentTitulado.findByPk(id);
    await studenttitulado.destroy();
}
    
const getidProfessionalStudentTitulados = async (idProfessional) => {
  return await StudentTitulado.findAll({
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


module.exports = {
    createStudentTitulado,
    getStudentTitulado,
    updateStudentTitulado,
    deleteStudentTitulado,
    getidStudentTitulado,
    getidProfessionalStudentTitulados,
    getTitleGraduate
}