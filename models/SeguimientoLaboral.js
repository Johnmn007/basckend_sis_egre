const {DataTypes} = require("sequelize");
const SeguimientoLaboral =(database)=>{
    return database.define("SeguimientoLaboral",{
        id:{
            type: DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        idStudent:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        idStudentTitle:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        typeInstitution :{
            type:DataTypes.STRING,
            allowNull:true
        },
        company:{
            type:DataTypes.STRING,
            allowNull:true
        },
        position:{
            type:DataTypes.STRING,
            allowNull:true
        },
        fecha_inicio:{
            type:DataTypes.STRING,
            allowNull:true
        },
        fecha_fin:{
            type:DataTypes.STRING,
            allowNull:true
        },
        salario_aprox: {
            type: DataTypes.DECIMAL(10, 2), // 10 dígitos en total, 2 decimales
            allowNull: true
        },

        Observacion:{
            type:DataTypes.STRING,
            allowNull:true
        }
    },{timestamps : false })
        }


module.exports = SeguimientoLaboral