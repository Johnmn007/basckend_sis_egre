const { Router } = require("express");
const { countProfessions } = require("../../controllers/Count/CountControllers");
// const { verifyToken } = require("../../middlewares/verifyToken"); // ← COMENTADO

const CountStudent = Router();

// 🔹 Obtener TODOS los egresados o filtrar por parámetros
CountStudent.get("/", async (req, res) => {  // ← QUITADO verifyToken
  try {
    const countStudent = await countProfessions();
    res.status(200).json(countStudent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = CountStudent;