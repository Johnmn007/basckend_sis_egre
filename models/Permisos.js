const {DataTypes} = require("sequelize");
const Permisos =(database)=>{
    return database.define("Permisos",{
        id:{
            type: DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        idRol:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        insertPer:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        updatePer:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        deletePer:{
            type:DataTypes.INTEGER,
            allowNull:false
        }
    },{timestamps : false })
        }


module.exports = Permisos