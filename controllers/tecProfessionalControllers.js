const {TecProfessional} = require("../db");
   
const createProfessional = async(nameProfession) =>{
    const newProfessional = await TecProfessional.create({nameProfession})
    return newProfessional;
}
const getProfessional = async()=>{
  
    const professional= await TecProfessional.findAll();
    return professional;
}
const getProfessionalById = async (id) => {
    try {
      const professional = await TecProfessional.findByPk(id);
      return professional;
    } catch (error) {
      console.error("Error al obtener el profesional:", error);
      throw error;
    }
  };

const updateProfessional = async(id,nameProfession)=>{
    const findPofessional = await TecProfessional.findByPk(id);

    const professionalUpdate = await findPofessional.update({nameProfession});
    return professionalUpdate;
}
const deleteProfessional = async(id)=>{
    const professional = await TecProfessional.findByPk(id);
    await professional.destroy();
}
    


module.exports = {
    createProfessional,
    getProfessional,
    getProfessionalById,
    updateProfessional,
    deleteProfessional
}