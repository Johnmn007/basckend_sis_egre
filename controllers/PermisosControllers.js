const { Permisos } = require("../db");
const { Op } = require("sequelize");

const createPermisos = async (idRol,insertPer,updatePer,deletePer ) => {

  return await Permisos.create({ idRol,insertPer,updatePer,deletePer});
};


const getPermisos = async () => {
  return await Permisos.findAll();
};
const getPermisosById = async (id) => {
    try {
      const permisos = await Permisos.findByPk(id);
      return permisos;
    } catch (error) {
      console.error("Error al obtener el profesional:", error);
      throw error;
    }
  };


const updatePermisos = async (id, idRol,insertPer,updatePer,deletePer) => {
    const permisos = await Permisos.findByPk(id);
    const per = await permisos.update({idRol,insertPer,updatePer,deletePer});
    return per;
};


const deletePermisos = async (id) => {
  const permisos = await Permisos.findByPk(id);
  await permisos.destroy();
};





module.exports = {
  createPermisos,
  getPermisos,
  getPermisosById,
  updatePermisos,
  deletePermisos,
};
