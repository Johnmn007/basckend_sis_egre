const {DataTypes} = require("sequelize");
const StudentTitle =(database)=>{ 
    return database.define("StudentTitle",{
        id:{
            type: DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        idGraduate:{
            type: DataTypes.INTEGER,
            allowNull:false,
        },
        idProfessional:{
            type: DataTypes.INTEGER,
            allowNull:false,
        },
        idStudent:{
            type: DataTypes.INTEGER,
            allowNull:false,
        },
        idSeguimiento:{
            type: DataTypes.INTEGER,
            allowNull:true,
        },
        idModalidad :{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        ageTitle:{
            type:DataTypes.STRING,
            allowNull:false
        },
        numberTitle:{
            type:DataTypes.STRING,
            allowNull:false
        },
        numberResolution:{
            type:DataTypes.STRING,
            allowNull:false
        },
        Observacion:{
            type:DataTypes.STRING,
            allowNull:true
        },
        photoTitle:{
            type:DataTypes.STRING,
            allowNull:true
        }
        
        
    },{timestamps : false })
}


module.exports = StudentTitle

