const {DataTypes} = require("sequelize");
const Rol =(database)=>{
    return database.define("Rol",{
        id:{
            type: DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        Descrition:{
            type:DataTypes.STRING,
            allowNull:false
        }
    },{timestamps : false })
        }


module.exports = Rol;