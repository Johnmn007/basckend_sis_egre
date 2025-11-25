const {Router}=require("express");
const {
    createPermisos,
    getPermisos,
    getPermisosById,
    updatePermisos,
    deletePermisos
}=require("../controllers/PermisosControllers");

const {verifyToken} = require("../middlewares/verifyToken");
const permisosRouter=Router();

// RUTAS PÚBLICAS (sin verifyToken)
permisosRouter.post("/",async(req,res)=>{
    const {idRol,insertPer,updatePer,deletePer}=req.body;
    try {
        const newPermisos=await createPermisos(idRol,insertPer,updatePer,deletePer);
        res.status(200).json(newPermisos);
    } catch (error) {
        res.status(400).json({error:error.message});       
    }
});

// RUTAS PROTEGIDAS (con verifyToken)
permisosRouter.get("/", verifyToken, async(req,res)=>{
    try {
        let rol = await getPermisos();
        res.status(200).json(rol)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
});

permisosRouter.get("/:id", verifyToken, async (req, res) => {
    try {
        const { id } = req.params;
        const permisos = await getPermisosById(id);

        if (!permisos) {
            return res.status(404).json({ error: "Permiso no encontrado" });
        }

        res.status(200).json(permisos); // ← CORREGIDO: era "professional", debe ser "permisos"
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

permisosRouter.put("/:id", verifyToken, async(req,res)=>{
    const {id}=req.params
    const {idRol,insertPer,updatePer,deletePer}=req.body;
    try {
        const updatedRol= await updatePermisos(id,idRol,insertPer,updatePer,deletePer);
        res.status(200).json(updatedRol)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
});

permisosRouter.delete('/:id', verifyToken, async(req,res)=>{
    const {id}=req.params
    try {
        await deletePermisos(id);
        res.status(200).json("Permiso eliminado")
    } catch (error) {
        res.status(400).json({error: error.message})
    }
});

module.exports = permisosRouter;