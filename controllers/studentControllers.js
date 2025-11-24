const { Student,StudentEgresado,StudentTitulado,SeguimientoLaboral,TecProfessional,Modalidad } = require("../db");
const { Op } = require("sequelize");

const createStudent = async (firstName, lastName, gender, age, email, dni,address,celular,observacion, photo,id_departamento,id_Provincia,id_distrito) => {
    return await Student.create({firstName,lastName,gender,age,email,dni,address,celular,observacion, photo,id_departamento,id_Provincia,id_distrito});
};


const getStudents = async () => {
    return await Student.findAll();
};

const getidStudents = async (id) => {
    return await Student.findByPk(id);
};

const updateStudent = async (id, firstName, lastName, gender, age, email, dni,address,celular,observacion, photo,id_departamento,id_Provincia,id_distrito) => {
    const findStudent = await Student.findByPk(id);
    if (!findStudent) throw new Error("Estudiante no encontrado");

    return await findStudent.update({ firstName, lastName, gender, age, email, dni,address,celular,observacion, photo,id_departamento,id_Provincia,id_distrito});
};

const deleteStudent = async (id) => {
    const student = await Student.findByPk(id);
    if (!student) throw new Error("Estudiante no encontrado");

    await student.destroy();
};

const getStudentByFilters = async (dni, lastName, ageGraduation, idProfessional, idStatus, idGestionManagement, gender) => {
    const whereClause = {};

    if (dni) whereClause.dni = { [Op.iLike]: `${dni}%` };
    if (lastName) whereClause.lastName = { [Op.iLike]: `${lastName}%` };
    if (ageGraduation) whereClause.ageGraduation = String(ageGraduation);
    if (idProfessional) whereClause.idProfessional = Number(idProfessional);
    if (idGestionManagement) whereClause.idGestionManagement = Number(idGestionManagement);
    if (idStatus) whereClause.idStatus = Number(idStatus); // ✅ Corrección aquí
    if (gender) whereClause.gender = String(gender);

    console.log("🔎 Consulta con filtros:", JSON.stringify(whereClause, null, 2));

    return await Student.findAll({ where: whereClause });
};
const updateStudentPhoto = async (req, res) => {
  const studentId = req.params.id;
  const photoPath = req.file ? `/uploads/Students/${req.file.filename}` : null;

  if (!photoPath) {
    return res.status(400).json({ error: 'No photo uploaded' });
  }

  try {
    const student = await Student.findByPk(studentId);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    student.photo = photoPath;
    await student.save();

    res.json({ message: 'Photo updated', photo: photoPath });
  } catch (error) {
    res.status(500).json({ error: 'Error updating photo' });
  }
};
const getidStudentInfo = async (id) => {
    return await Student.findByPk(id, {
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

const getidStudentInfoTitle = async (id) => {
  return await Student.findByPk(id, {
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: [
          {
              model: StudentTitulado,
              as: "titulados", 
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
                {
                  model: Modalidad,
                  as: "modalidad",
                  attributes: ['id', 'descrition'],
                }
              ],
          }
        ]   
  });
}
module.exports = {
    createStudent,
    getStudents,
    getidStudents,
    updateStudent,
    deleteStudent,
    getStudentByFilters,
    updateStudentPhoto,
    getidStudentInfo,
    getidStudentInfoTitle,
};
