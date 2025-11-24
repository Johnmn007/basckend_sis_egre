const { Rol } = require("../db");
const { Op } = require("sequelize");

const createRol = async (Descrition) => {

  return await Rol.create({ Descrition});
};


const getRol = async () => {
  return await Rol.findAll();
};

const getRolById = async (id) => {
    try {
      const rol = await Rol.findByPk(id);
      return rol;
    } catch (error) {
      console.error("Error al obtener el profesional:", error);
      throw error;
    }
  };


const updateRol = async (id, Descrition) => {
    const rol = await Rol.findByPk(id);
    const per = await rol.update({Descrition});
    return per;
};


const deleteRol = async (id) => {
  const rol = await Rol.findByPk(id);
  await rol.destroy();
};





module.exports = {
  createRol,
  getRol,
  getRolById,
  updateRol,
  deleteRol,
};
