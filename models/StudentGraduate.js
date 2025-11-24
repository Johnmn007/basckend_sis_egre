const {DataTypes} = require("sequelize");

const StudentGraduate =(database)=>{ 
    return database.define("StudentGraduate",{
        id:{
            type: DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        idProfessional:{
            type: DataTypes.INTEGER,
            allowNull:false,
        },
        idStudent:{
            type: DataTypes.INTEGER,
            allowNull:false,
        },
        ageEntry:{
            type:DataTypes.STRING,
            allowNull:false
        },
        ageGraduation:{
            type:DataTypes.STRING,
            allowNull:false
        },
        certificadosModulares:{
            type: DataTypes.INTEGER,
            allowNull:true,
        },
        Observacion:{
            type:DataTypes.STRING,
            allowNull:true
        }

    },{timestamps : false })
        };
    


module.exports = StudentGraduate

