const { DataTypes } = require("sequelize");

const Student = (database) => { 
    return database.define("Student", {  
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false 
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true
        },
        dni: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true
        },
        celular: {
            type: DataTypes.STRING,
            allowNull: true
        },
        observacion: {
            type: DataTypes.STRING,
            allowNull: true
        },
        photo: {
            type: DataTypes.STRING,  // Guardará la URL de la imagen
            allowNull: true
        },
        id_departamento:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        id_Provincia:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        id_distrito:{
            type: DataTypes.STRING,
            allowNull:false,
        },
    }, { timestamps: false });  // 🔹 Retornamos el modelo
};

module.exports = Student;
