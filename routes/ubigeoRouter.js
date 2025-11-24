const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

// Rutas de archivos
const departamentos = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/ubigeo_peru_2016_departamentos.json"), "utf-8"));
const provincias = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/ubigeo_peru_2016_provincias.json"), "utf-8"));
const distritos = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/ubigeo_peru_2016_distritos.json"), "utf-8"));

/**
 * Departamentos
 */
router.get("/departamentos", (req, res) => {
  res.json(departamentos);
});

router.get("/departamentos/:id", (req, res) => {
  const dep = departamentos.find(d => d.id === req.params.id);
  if (!dep) return res.status(404).json({ error: "Departamento no encontrado" });
  res.json(dep);
});

/**
 * Provincias
 */
router.get("/provincias/:departmentId", (req, res) => {
  const provs = provincias.filter(p => p.department_id === req.params.departmentId);
  if (!provs.length) return res.status(404).json({ error: "No se encontraron provincias" });
  res.json(provs);
});

router.get("/provincia/:id", (req, res) => {
  const provs = provincias.find(p => p.id === req.params.id);
  if (!provs) return res.status(404).json({ error: "No se encontraron provincias" });
  res.json(provs);
});
/**
 * Distritos
 */
router.get("/distritos/:provinceId", (req, res) => {
  const dists = distritos.filter(d => d.province_id === req.params.provinceId);
  if (!dists.length) return res.status(404).json({ error: "No se encontraron distritos" });
  res.json(dists);
});

router.get("/distrito/:id", (req, res) => {
  const dist = distritos.find(d => d.id === req.params.id);
  if (!dist) return res.status(404).json({ error: "Distrito no encontrado" });
  res.json(dist);
});

module.exports = router;
