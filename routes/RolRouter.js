const {Router}=require("express");
const {
    createRol,
    getRol,
    getRolById,
    updateRol,
    deleteRol
}=require("../controllers/RolControllers");
const { emit } = require("nodemon");
const rolRouter=Router();

//const {verifyToken} = require("../middlewares/verifyToken");

rolRouter.post("/",async(req,res)=>{
    const {Descrition}=req.body;
    try {
        const newRol=await createRol(Descrition);
            res.status(200).json(newRol,);
    } catch (error) {
        res.status(400).json({error:error.message});       
    }
});
rolRouter.get("/",async(req,res)=>{
    try {
        let allRol = await getRol();
        res.status(200).json(allRol);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})
rolRouter.get("/:id", async (req, res) => {
    try {
        const { id } = req.params; // Obtener el ID de los parámetros de la URL
        const rol = await getRolById(id); // Pasar el ID a la función

        if (!rol) {
            return res.status(404).json({ error: "Profesional no encontrado" });
        }

        res.status(200).json(rol);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

rolRouter.put("/:id",async(req,res)=>{
    const {id}=req.params
    const {Descrition}=req.body;
    try {
        const updatedRol= await updateRol(id,Descrition);
        res.status(200).json(updatedRol)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

rolRouter.delete('/:id',async(req,res)=>{
    const {id}=req.params
    try {
        await deleteRol(id);
        res.status(200).json("Departaento eliminado")
    } catch (error) {
        res.status(400).json({error: error.message})
    }
});



module.exports = rolRouter
