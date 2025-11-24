const { Student,StudentEgresado,StudentTitulado,SeguimientoLaboral,TecProfessional } = require("../../db");
const { Op } = require("sequelize");

const getListStudent = async () => {
    return await Student.findAll( {
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        include: [
            {
                model: StudentEgresado, 
                as: "egresados",
                attributes: { exclude: ['createdAt', 'updatedAt', 'idStudent'] },
                include: [
                  {
                      model: TecProfessional,
                      as: "profession", 
                      attributes: ['id', 'nameProfession'], 
                  },
                  {
                    model: StudentTitulado,
                    as: "titulo", 
                    attributes: { exclude: ['createdAt', 'updatedAt', 'idGraduate', 'idStudent', 'idProfessional'] }, 
                    include: [
                      {
                          model: TecProfessional, 
                          as: "profession",
                          attributes: ['id', 'nameProfession'], 
                      },
                      {
                          model: SeguimientoLaboral,
                          as: "seguimientos",
                          attributes: { exclude: ['createdAt', 'updatedAt', 'idStudentTitle', 'idStudent'] },   
                      },
                    ],
                  },
                ],
            }
          ]   
    });
}
const getListStudentid = async (id) => {
  return await Student.findOne({
    where: { id }, // 👈 filtro por el id recibido
    attributes: { exclude: ["createdAt", "updatedAt"] },
    include: [
      {
        model: StudentEgresado,
        as: "egresados",
        attributes: { exclude: ["createdAt", "updatedAt", "idStudent"] },
        include: [
          {
            model: TecProfessional,
            as: "profession",
            attributes: ["id", "nameProfession"],
          },
          {
            model: StudentTitulado,
            as: "titulo",
            attributes: {
              exclude: [
                "createdAt",
                "updatedAt",
                "idGraduate",
                "idStudent",
                "idProfessional",
              ],
            },
            include: [
              {
                model: TecProfessional,
                as: "profession",
                attributes: ["id", "nameProfession"],
              },
              {
                model: SeguimientoLaboral,
                as: "seguimientos",
                attributes: {
                  exclude: [
                    "createdAt",
                    "updatedAt",
                    "idStudentTitle",
                    "idStudent",
                  ],
                },
              },
            ],
          },
        ],
      },
    ],
  });
};

module.exports = {
    
    getListStudent,
    getListStudentid,
};
