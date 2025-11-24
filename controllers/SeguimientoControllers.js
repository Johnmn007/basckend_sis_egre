const {SeguimientoLaboral} = require("../db");
   
const createSeguimientoLaboral = async(idStudent,idStudentTitle,typeInstitution,company,position,fecha_inicio,fecha_fin,salario_aprox,Observacion) =>{
    const newSeguimiento = await SeguimientoLaboral.create({idStudent,idStudentTitle,typeInstitution,company,position,fecha_inicio,fecha_fin,salario_aprox,Observacion})
    return newSeguimiento;
}
const getSeguimientoLaboral = async()=>{
  
    const Seguimiento= await SeguimientoLaboral.findAll();
    return Seguimiento;
}
const getSeguimientoLaboralById = async (id) => {
    try {
      const Seguimiento = await SeguimientoLaboral.findByPk(id);
      return Seguimiento;
    } catch (error) {
      console.error("Error al obtener data:", error);
      throw error;
    }
  };
const getSeguimientoLaboralByIdTitle = async (idTitle) => {
  try {
    const seguimiento = await SeguimientoLaboral.findOne({
      where: { idStudentTitle: idTitle }, // condición con la FK
    });
    return seguimiento;
  } catch (error) {
    console.error("Error al obtener data:", error);
    throw error;
  }
};

const updateSeguimientoLaboral = async(id,idStudent,idStudentTitle,typeInstitution,company,position,fecha_inicio,fecha_fin,salario_aprox,Observacion)=>{
    const findSeguimiento = await SeguimientoLaboral.findByPk(id);

    const SeguimientoUpdate = await findSeguimiento.update({idStudent,idStudentTitle,typeInstitution,company,position,fecha_inicio,fecha_fin,salario_aprox,Observacion});
    return SeguimientoUpdate;
}
const deleteSeguimientoLaboral = async(id)=>{
    const Seguimiento = await SeguimientoLaboral.findByPk(id);
    await Seguimiento.destroy();
}
    


module.exports = {
    createSeguimientoLaboral,
    getSeguimientoLaboral,
    getSeguimientoLaboralById,
    updateSeguimientoLaboral,
    deleteSeguimientoLaboral,
    getSeguimientoLaboralByIdTitle
}