const {Router}=require("express");
const {
    createSeguimientoLaboral,
    getSeguimientoLaboral,
    getSeguimientoLaboralById,
    updateSeguimientoLaboral,
    deleteSeguimientoLaboral,
    getSeguimientoLaboralByIdTitle,
}=require("../controllers/SeguimientoControllers");
const { emit } = require("nodemon");
const seguimientoRouter=Router();

const {verifyToken} = require("../middlewares/verifyToken");

seguimientoRouter.post("/",verifyToken,async(req,res)=>{
    const {idStudent,idStudentTitle,typeInstitution,company,position,fecha_inicio,fecha_fin,salario_aprox,Observacion}=req.body;
    try {
        const newSeguimiento=await createSeguimientoLaboral(idStudent,idStudentTitle,typeInstitution,company,position,fecha_inicio,fecha_fin,salario_aprox,Observacion);
            res.status(200).json(newSeguimiento);
    } catch (error) {
        res.status(400).json({error:error.message});       
    }
});
seguimientoRouter.get("/",verifyToken,async(req,res)=>{
    try {
        let seguimiento=await getSeguimientoLaboral();
        res.status(200).json(seguimiento)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})
seguimientoRouter.get("/:id",verifyToken, async (req, res) => {
    try {
        const { id } = req.params; // Obtener el ID de los parámetros de la URL
        const seguimiento = await getSeguimientoLaboralById(id); // Pasar el ID a la función

        if (!seguimiento) {
            return res.status(404).json({ error: "seguimiento no encontrado" });
        }

        res.status(200).json(seguimiento);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
seguimientoRouter.get("/validar/:id",verifyToken, async (req, res) => {
    try {
        const { id } = req.params; // Obtener el ID de los parámetros de la URL
        const seguimiento = await getSeguimientoLaboralByIdTitle(id); // Pasar el ID a la función

        if (!seguimiento) {
            return res.status(404).json({ error: "seguimiento no encontrado" });
        }

        res.status(200).json(seguimiento);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

seguimientoRouter.put("/:id",verifyToken,async(req,res)=>{
    const {id}=req.params
    const {idStudent,idStudentTitle,typeInstitution,company,position,fecha_inicio,fecha_fin,salario_aprox,Observacion}=req.body;
    try {
        const updatedSeguimiento= await updateSeguimientoLaboral(id,idStudent,idStudentTitle,typeInstitution,company,position,fecha_inicio,fecha_fin,salario_aprox,Observacion);
        res.status(200).json(updatedSeguimiento)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

seguimientoRouter.delete('/:id',async(req,res)=>{
    const {id}=req.params
    try {
        await deleteSeguimientoLaboral(id);
        res.status(200).json("Seguimiento eliminado")
    } catch (error) {
        res.status(400).json({error: error.message})
    }
});



module.exports = seguimientoRouter
