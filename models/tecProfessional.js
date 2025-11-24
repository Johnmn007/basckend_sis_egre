const {DataTypes} = require("sequelize");
const tecProfession =(database)=>{
    return database.define("tecProfession",{
        id:{
            type: DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        nameProfession:{
            type:DataTypes.STRING,
            allowNull:false
        }
    },{timestamps : false })
        }


module.exports = tecProfession