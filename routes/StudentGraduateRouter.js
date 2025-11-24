const { Router } = require("express");
const {
    createStudentEgresados,
    getStudentEgresados,
    updateStudentEgresados,
    deleteStudentEgresados,
    getidStudentEgresados,
    getidProfessionalStudentEgresados,
    countProfessions,
} = require("../controllers/StudentGraduateControllers");


const {verifyToken} = require("../middlewares/verifyToken");
const StudentEgresadosRouter = Router();

// Crear un nuevo estudiante egresado
StudentEgresadosRouter.post("/",verifyToken, async (req, res) => {
    const {idProfessional,idStudent, ageEntry, ageGraduation,certificadosModulares,Observacion} = req.body;
    try {
        const newStudentEgresados = await createStudentEgresados(idProfessional,idStudent, ageEntry, ageGraduation,certificadosModulares,Observacion);
        res.status(201).json(newStudentEgresados);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Obtener todos los estudiantes egresados
StudentEgresadosRouter.get("/",verifyToken, async (req, res) => {
    try {
        const studentEgresados = await getStudentEgresados();
        res.status(200).json(studentEgresados);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

StudentEgresadosRouter.get("/:type/:id", verifyToken, async (req, res) => {
    try {
        const { type, id } = req.params;
        let studentEgresados;

        if (type === "student") {
            studentEgresados = await getidStudentEgresados(id);
        } else if (type === "professional") {
            studentEgresados = await getidProfessionalStudentEgresados(id);
        }

        if (!studentEgresados) {
            return res.status(404).json({ error: "Estudiante egresado no encontrado" });
        }

        res.status(200).json(studentEgresados);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Actualizar un estudiante egresado
StudentEgresadosRouter.put("/:id",verifyToken, async (req, res) => {
    const { id } = req.params;
    const {idProfessional,idStudent, ageEntry, ageGraduation,certificadosModulares,Observacion} = req.body;
    try {
        const updatedStudentEgresados = await updateStudentEgresados(id,idProfessional,idStudent, ageEntry, ageGraduation,certificadosModulares,Observacion);
        res.status(200).json(updatedStudentEgresados);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Eliminar un estudiante egresado
StudentEgresadosRouter.delete("/:id",verifyToken, async (req, res) => {
    const { id } = req.params;
    try {
        await deleteStudentEgresados(id);
        res.status(200).json({ message: "Estudiante egresado eliminado" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

StudentEgresadosRouter.get("/countProfecional", verifyToken, async (req, res) => {
  try {
    const studentEgresados = await countProfessions();
    res.status(200).json(studentEgresados);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = StudentEgresadosRouter;
