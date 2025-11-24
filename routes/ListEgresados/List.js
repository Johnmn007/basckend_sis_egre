const { Router } = require("express");

const {verifyToken} = require("../../middlewares/verifyToken");
const multer = require('multer');

const {
    getListStudent,
    getListStudentid,
} = require("../../controllers/ListEgresados/List");

const listRouter = Router();

listRouter.get("/",verifyToken, async (req, res) => {
    try {
        let student;
        student = await getListStudent();
        if (!student) {
            return res.status(404).json({ error: "error al obtener datos" });
        }

        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
listRouter.get("/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params; // 👈 aquí obtienes el id de la URL
    const student = await getListStudentid(id); // 👈 lo pasas a tu función

    if (!student) {
      return res.status(404).json({ error: "error al obtener datos" });
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = listRouter;
