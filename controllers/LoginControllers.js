const { Login } = require("../db");
const  bcrypt  =  require ( 'bcryptjs' ) ; 


const createLogin = async (idRol, usuario, contraseña, responsable) => {
  if (!usuario || !contraseña) throw new Error("Faltan datos");

  const exists = await Login.findOne({ where: { usuario } });
  if (exists) throw new Error("El usuario ya existe");

  const hashedPassword = await bcrypt.hash(contraseña, 10);

  const newLogin = await Login.create({
    idRol,
    usuario,
    contraseña: hashedPassword,
    responsable
  });

  return newLogin;
};



const getLogin = async () => {
  return await Login.findAll();
};

const getIdLogin = async (id) => {
    try {
      const login = await Login.findByPk(id);
      return login;
    } catch (error) {
      console.error("Error al obtener :", error);
      throw error;
    }
  };


const getLoginUser = async (usuario) => {
  return await Login.findOne({ where: { usuario: String(usuario) } });
  // if (!loginUser) return res.status(404).json({ error: "Usuario no encontrado" });

  
}

const updateLogin = async (id, idRol, usuario, contraseña, responsable) => {
  const login = await Login.findByPk(id);
  if (!login) throw new Error("Usuario no encontrado");

  // Actualizar campos solo si vienen en el body
  login.idRol = idRol || login.idRol;
  login.usuario = usuario || login.usuario;
  login.responsable = responsable || login.responsable;

  if (contraseña) {
    const hashedPassword = await bcrypt.hash(contraseña, 10);
    login.contraseña = hashedPassword;
  }

  await login.save();
  return login;
};



const deleteLogin = async (id) => {
  const login = await Login.findByPk(id);
  if (!login) throw new Error("Usuario no encontrado");

  await login.destroy();
  return { message: "Login eliminado correctamente" };
};

const validateLogin = async (usuario, contraseña) => {
  const user = await Login.findOne({ where: { usuario } });

  if (!user) throw new Error("Usuario no encontrado");

  const validPassword = await bcrypt.compare(
    contraseña,
    user.contraseña
  );

  if (!validPassword) throw new Error("Contraseña incorrecta");

  return {
    id: user.id,
    usuario: user.usuario,
    idRol: user.idRol,
    responsable: user.responsable
  };
};


// const validateLogin = async (usuario, contraseña) => {
//   const hashedPassword =  crypto.createHash('sha256').update(contraseña).digest('hex');
//   const user = await Login.create({ where: { usuario: usuario}} );
//   if (!user) throw new Error("Datos Incorrectos");
//   return user;
// };

module.exports = {
  createLogin,
  getLogin,
  getLoginUser,
  updateLogin,
  deleteLogin,
  validateLogin,
  getIdLogin,
  
};
