const {Router}=require("express");
const {
    createModalidad,
    getModalidad,
    getModalidadById,
    updateModalidad,
    deleteModalidad
}=require("../controllers/ModalidadControllers");
const { emit } = require("nodemon");
const modalidadRouter=Router();

const {verifyToken} = require("../middlewares/verifyToken");

modalidadRouter.post("/",verifyToken,async(req,res)=>{
    const {descrition}=req.body;
    try {
        const newProfessional=await createModalidad(descrition);
            res.status(200).json(newProfessional);
    } catch (error) {
        res.status(400).json({error:error.message});       
    }
});
modalidadRouter.get("/",verifyToken,async(req,res)=>{
    try {
        let professional=await getModalidad();
        res.status(200).json(professional)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})
modalidadRouter.get("/:id",verifyToken, async (req, res) => {
    try {
        const { id } = req.params; // Obtener el ID de los parámetros de la URL
        const professional = await getModalidadById(id); // Pasar el ID a la función

        if (!professional) {
            return res.status(404).json({ error: "Profesional no encontrado" });
        }

        res.status(200).json(professional);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

modalidadRouter.put("/:id",verifyToken,async(req,res)=>{
    const {id}=req.params
    const {descrition}=req.body;
    try {
        const updatedProfessional= await updateModalidad(id,descrition);
        res.status(200).json(updatedProfessional)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

modalidadRouter.delete('/:id',async(req,res)=>{
    const {id}=req.params
    try {
        await deleteModalidad(id);
        res.status(200).json("Modalidad eliminado")
    } catch (error) {
        res.status(400).json({error: error.message})
    }
});



module.exports = modalidadRouter
