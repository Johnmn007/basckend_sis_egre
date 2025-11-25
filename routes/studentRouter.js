const { Router } = require("express");
const upload = require("../middlewares/upload"); // Importar Multer
// const {verifyToken} = require("../middlewares/verifyToken"); // ← COMENTADO
const multer = require('multer');

const {
    createStudent,
    getStudents,
    updateStudent,
    deleteStudent,
    getidStudents,
    getStudentByFilters,
    updateStudentPhoto,
    getidStudentInfo,
    getidStudentInfoTitle
} = require("../controllers/studentControllers");

const studentRouter = Router();

studentRouter.post("/upload", upload.single("photo"), async (req, res) => {  // ← QUITADO verifyToken
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No se subió ninguna imagen" });
        }

        const imageUrl = `http://localhost:3001/uploads/${req.file.filename}`;
        res.status(200).json({ imageUrl });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Crear un nuevo estudiante
studentRouter.post("/", async (req, res) => {  // ← QUITADO verifyToken
    try {
        const { firstName, lastName, gender, age, email, dni,address,celular,observacion, photo,id_departamento,id_Provincia,id_distrito } = req.body;
        const newStudent = await createStudent(firstName, lastName, gender, age, email, dni,address,celular,observacion, photo,id_departamento,id_Provincia,id_distrito);
        res.status(201).json(newStudent);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Obtener todos los estudiantes o filtrados por query params
studentRouter.get("/", async (req, res) => {  // ← QUITADO verifyToken
    try {
        const { dni, lastName, gender } = req.query;

        console.log("🔍 Filtros recibidos en la API:", { dni, lastName, gender });

        if (!dni && !lastName  && !gender) {
            const students = await getStudents();
            return res.status(200).json(students);
        }

        const students = await getStudentByFilters(dni, lastName, gender);
        
        // ✅ Devuelve un array vacío en lugar de un error 404
        return res.status(200).json(students.length ? students : []);

    } catch (error) {
        console.error("❌ Error en la API:", error);
        res.status(500).json({ error: error.message });
    }
});

studentRouter.get("/detalleView/:id", async (req, res) => {  // ← QUITADO verifyToken
    try {
        const {  id } = req.params;
        let student;

        
            student = await getidStudentInfo(id);
        

        if (!student) {
            return res.status(404).json({ error: "Estudiante egresado no encontrado" });
        }

        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

studentRouter.get("/detalleViewTitle/:id", async (req, res) => {  // ← QUITADO verifyToken
    try {
        const {  id } = req.params;
        let student;

        
            student = await getidStudentInfoTitle(id);
        

        if (!student) {
            return res.status(404).json({ error: "Estudiante egresado no encontrado" });
        }

        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener un estudiante por ID
studentRouter.get("/:id", async (req, res) => {  // ← QUITADO verifyToken
    try {
        const { id } = req.params;
        const student = await getidStudents(id);
        if (!student) return res.status(404).json({ error: "Estudiante no encontrado" });

        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Actualizar un estudiante
studentRouter.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const {firstName, lastName, gender, age, email, dni,address,celular,observacion, photo,id_departamento,id_Provincia,id_distrito} = req.body;

        const updatedStudent = await updateStudent(id,firstName, lastName, gender, age, email, dni,address,celular,observacion, photo,id_departamento,id_Provincia,id_distrito);
        res.status(200).json(updatedStudent);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Eliminar un estudiante
studentRouter.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await deleteStudent(id);
        res.status(200).json({ message: "Estudiante eliminado correctamente" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

studentRouter.put("/:id/photo", upload.single("photo"), updateStudentPhoto);

module.exports = studentRouter;