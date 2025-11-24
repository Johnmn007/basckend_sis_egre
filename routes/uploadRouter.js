// ./routes/uploadRouter.js
const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload"); // ✅ Verifica la ruta correcta

router.post("/", upload.single("photo"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No se envió ningún archivo." });
  }

  res.json({
    filename: req.file.filename,
    url: `/uploads/Students/${req.file.filename}`,
  });
});

module.exports = router;
