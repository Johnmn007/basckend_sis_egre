const {Router}=require("express");
const {
    createProfessional,
    getProfessional,
    getProfessionalById,
    updateProfessional,
    deleteProfessional
}=require("../controllers/tecProfessionalControllers");
const { emit } = require("nodemon");
const professionalRouter=Router();

const {verifyToken} = require("../middlewares/verifyToken");

professionalRouter.post("/",verifyToken,async(req,res)=>{
    const {nameProfession}=req.body;
    try {
        const newProfessional=await createProfessional(nameProfession);
            res.status(200).json(newProfessional);
    } catch (error) {
        res.status(400).json({error:error.message});       
    }
});
professionalRouter.get("/",verifyToken,async(req,res)=>{
    try {
        let professional=await getProfessional();
        res.status(200).json(professional)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})
professionalRouter.get("/:id",verifyToken, async (req, res) => {
    try {
        const { id } = req.params; // Obtener el ID de los parámetros de la URL
        const professional = await getProfessionalById(id); // Pasar el ID a la función

        if (!professional) {
            return res.status(404).json({ error: "Profesional no encontrado" });
        }

        res.status(200).json(professional);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

professionalRouter.put("/:id",verifyToken,async(req,res)=>{
    const {id}=req.params
    const {nameProfession}=req.body;
    try {
        const updatedProfessional= await updateProfessional(id,nameProfession);
        res.status(200).json(updatedProfessional)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

professionalRouter.delete('/:id',async(req,res)=>{
    const {id}=req.params
    try {
        await deleteProfessional(id);
        res.status(200).json("Departaento eliminado")
    } catch (error) {
        res.status(400).json({error: error.message})
    }
});



module.exports = professionalRouter
