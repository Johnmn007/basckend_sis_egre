const {Router}=require("express");
const {
    createPermisos,
    getPermisos,
    getPermisosById,
    updatePermisos,
    deletePermisos
}=require("../controllers/PermisosControllers");
const { emit } = require("nodemon");
const permisosRouter=Router();

// const {verifyToken} = require("../middlewares/verifyToken"); // ← COMENTADO

permisosRouter.post("/",async(req,res)=>{
    const {idRol,insertPer,updatePer,deletePer}=req.body;
    try {
        const newPermisos=await createPermisos(idRol,insertPer,updatePer,deletePer);
            res.status(200).json(newPermisos,);
    } catch (error) {
        res.status(400).json({error:error.message});       
    }
});
permisosRouter.get("/",async(req,res)=>{
    try {
        let rol = await getPermisos();
        res.status(200).json(rol)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})
permisosRouter.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const rol = await getPermisosById(id);

        if (!rol) {
            return res.status(404).json({ error: "Profesional no encontrado" });
        }

        res.status(200).json(professional);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

permisosRouter.put("/:id",async(req,res)=>{
    const {id}=req.params
    const {idRol,insertPer,updatePer,deletePer}=req.body;
    try {
        const updatedRol= await updatePermisos(id,idRol,insertPer,updatePer,deletePer);
        res.status(200).json(updatedRol)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

permisosRouter.delete('/:id',async(req,res)=>{
    const {id}=req.params
    try {
        await deletePermisos(id);
        res.status(200).json("Departaento eliminado")
    } catch (error) {
        res.status(400).json({error: error.message})
    }
});

module.exports = permisosRouter;