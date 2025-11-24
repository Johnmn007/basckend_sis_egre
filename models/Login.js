const {DataTypes} = require("sequelize");
const Login =(database)=>{
    return database.define("Login",{
        id:{
            type: DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        idRol:{
            type: DataTypes.INTEGER,
            allowNull:false,
        },
        usuario:{
            type: DataTypes.STRING,
            allowNull:false
        },
        contraseña:{
            type: DataTypes.STRING,
            allowNull:false
        },
        responsable:{
            type: DataTypes.STRING,
            allowNull:false
        },

    },{timestamps : false })
        }


module.exports = Login;