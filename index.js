const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const multer = require('multer');
const { database } = require("./db");

const ubigeoRouter = require("./routes/ubigeoRouter");

const studentRouter = require("./routes/studentRouter");
const tecProfessionalRouter = require("./routes/tecProfessionalRouter");
const StudentEgresadosRouter = require("./routes/StudentGraduateRouter");
const StudentTituladoRouter = require("./routes/StudentTitleRouter");
const LoginRouter = require("./routes/LoginRouter");
const PermisosRouter = require("./routes/PermisosRouter");
const seguimientoRouter = require("./routes/SeguimientoRouter");
const rolRouter = require("./routes/RolRouter");
const ModalidadRouter = require("./routes/ModalidadRouter");

const ListRouter = require("./routes/ListEgresados/List");

const CountStudent = require("./routes/Count/CountRouter");
//const uploadRouter = require("./routes/uploadRouter");

const server = express();

server.use(morgan("dev"));
server.use(express.json());
server.use(cors());

//server.use('/uploads', express.static('uploads'));


// Rutas
server.use("/ubigeo", ubigeoRouter);


server.use("/Student", studentRouter);
server.use("/tecProfessional", tecProfessionalRouter);
server.use("/StudentGraduate", StudentEgresadosRouter);
server.use("/StudentTitle", StudentTituladoRouter);
server.use("/Login", LoginRouter);
server.use("/Permisos", PermisosRouter);
server.use("/Rol", rolRouter);
server.use("/SeguimientoLaboral", seguimientoRouter);
server.use("/Modalidad", ModalidadRouter);

server.use("/List", ListRouter);

server.use("/countStudent", CountStudent);


// Sincronización de la base de datos


database.sync()
    .then(() => {
        server.listen(PORT, () => {
            console.log("Servidor escuchando en el puerto " + PORT);
        });
    })
    .catch(err => console.log("Error al sincronizar la base de datos:", err.message));
