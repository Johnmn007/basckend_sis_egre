const { Sequelize } = require("sequelize");
const { StudentEgresado, StudentTitulado, TecProfessional } = require("../../db");

const countProfessions = async () => {
  // 👉 contar egresados
  const egresados = await StudentEgresado.findAll({
    attributes: [
      "idProfessional",
      [Sequelize.fn("COUNT", Sequelize.literal("*")), "countGraduate"],
    ],
    include: [
      {
        model: TecProfessional,
        as: "profession",
        attributes: ["id", "nameProfession"],
      },
    ],
    group: ["idProfessional", "profession.id"],
    raw: true,
    nest: true,
  });

  // 👉 contar titulados
  const titulados = await StudentTitulado.findAll({
    attributes: [
      "idProfessional",
      [Sequelize.fn("COUNT", Sequelize.literal("*")), "countTitulado"],
    ],
    include: [
      {
        model: TecProfessional,
        as: "profession",
        attributes: ["id", "nameProfession"],
      },
    ],
    group: ["idProfessional", "profession.id"],
    raw: true,
    nest: true,
  });

  // 👉 convertir titulados en un diccionario para fácil merge
  const tituladosMap = {};
  titulados.forEach(t => {
    tituladosMap[t.idProfessional] = parseInt(t.countTitulado, 10);
  });

  // 👉 fusionar resultados
  return egresados.map(e => ({
    id: e.profession.id,
    nameProfession: e.profession.nameProfession,
    countGraduate: parseInt(e.countGraduate, 10),
    countTitulado: tituladosMap[e.idProfessional] || 0,
  }));
};

module.exports = {
  countProfessions,
};
