const {Modalidad} = require("../db");
   
const createModalidad = async(descrition) =>{
    const newModalidad = await Modalidad.create({descrition})
    return newModalidad;
}
const getModalidad = async()=>{
  
    const modalidad= await Modalidad.findAll();
    return modalidad;
}
const getModalidadById = async (id) => {
    try {
      const modalidad = await Modalidad.findByPk(id);
      return modalidad;
    } catch (error) {
      console.error("Error al obtener el profesional:", error);
      throw error;
    }
  };

const updateModalidad = async(id,descrition)=>{
    const findPofessional = await Modalidad.findByPk(id);

    const modalidadUpdate = await findPofessional.update({descrition});
    return modalidadUpdate;
}
const deleteModalidad = async(id)=>{
    const modalidad = await Modalidad.findByPk(id);
    await modalidad.destroy();
}
    


module.exports = {
    createModalidad,
    getModalidad,
    getModalidadById,
    updateModalidad,
    deleteModalidad
}