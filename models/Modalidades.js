const {DataTypes} = require("sequelize");
const Modalidad =(database)=>{
    return database.define("Modalidad",{
        id:{
            type: DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        descrition:{
            type:DataTypes.STRING,
            allowNull:false
        }
    },{timestamps : false })
        }


module.exports = Modalidad;