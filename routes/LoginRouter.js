const {Router}=require("express");
const  bcrypt  =  require ( 'bcryptjs' ) ; 
const jwt = require("jsonwebtoken");

const {
    createLogin,
    getLogin,
    updateLogin,
    deleteLogin,
    getLoginUser,
    validateLogin,
    getIdLogin,
    
}=require("../controllers/LoginControllers");
const { emit } = require("nodemon");
const LoginRouter=Router();

LoginRouter.post("/",async(req,res)=>{
    const {idRol,usuario, contraseña,responsable}=req.body;
    try {
        const newLogin=await createLogin(idRol,usuario, contraseña,responsable);
            res.status(200).json(newLogin);
    } catch (error) {
        res.status(400).json({error:error.message});       
    }
});
LoginRouter.get("/",async(req,res)=>{
    try {
        let Login=await getLogin();
        res.status(200).json(Login)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})
LoginRouter.get("/:id",async(req,res)=>{
    try {
      const { id } = req.params;
        let login =await getIdLogin(id);
        res.status(200).json(login)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

LoginRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { idRol, usuario, contraseña, responsable } = req.body;
  
  try {
    const updatedLogin = await updateLogin(id, idRol, usuario, contraseña, responsable);
    res.status(200).json(updatedLogin);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


LoginRouter.delete('/:id',async(req,res)=>{
    const {id}=req.params
    try {
        await deleteLogin(id);
        res.status(200).json("Departaento eliminado")
    } catch (error) {
        res.status(400).json({error: error.message})
    }
});
LoginRouter.get('/user/:usuario', async (req, res) => {
    try {
      const { usuario } = req.params;
      const Login = await getLoginUser(usuario);
  
      if (!Login) return res.status(404).json({ error: "Usuario no encontrado" });
  
      res.status(200).json(Login);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});
LoginRouter.post('/validateUser', async (req, res) => {
  try {
    const { usuario, contraseña, idRol } = req.body;

    const loginUser = await getLoginUser(usuario);
    if (!loginUser) return res.status(404).json({ error: "Usuario no encontrado" });

    // Validar contraseña
    const isValidPassword = await bcrypt.compare(contraseña, loginUser.contraseña);
    if (!isValidPassword) return res.status(401).json({ error: "Contraseña incorrecta" });

    // Validar rol
    if (loginUser.idRol !== idRol) return res.status(403).json({ error: "Rol no autorizado" });

    // Generar token
    const token = jwt.sign(
      { id: loginUser.id, usuario: loginUser.usuario, rol: loginUser.idRol }, 
      "secretoSuperSeguro", 
      { expiresIn: "1h" }
    );

    res.json({ token,loginUser });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

  
LoginRouter.post("/validate",async(req, res)=>{
    const {usuario, contraseña} = req.body;
    try {
        const user = await validateLogin(usuario, contraseña);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({error: error.message});       
    }
});



module.exports = LoginRouter
