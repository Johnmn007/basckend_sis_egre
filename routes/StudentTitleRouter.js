const {Router}=require("express");
const {
    createStudentTitulado,
    getStudentTitulado,
    updateStudentTitulado,
    deleteStudentTitulado,
    getidStudentTitulado,
    getidProfessionalStudentTitulados,
    getTitleGraduate,
    
}=require("../controllers/StudentTitleControllers");
const { emit } = require("nodemon");

const {verifyToken} = require("../middlewares/verifyToken");
const StudentTituladoRouter=Router();

StudentTituladoRouter.post("/",verifyToken,async(req,res)=>{
    const {idGraduate,idProfessional,idStudent,idSeguimiento,idModalidad,ageTitle,numberTitle,numberResolution,Observacion,photoTitle}=req.body;
    try {
        const newStudentTitulado= await createStudentTitulado(idGraduate,idProfessional,idStudent,idSeguimiento,idModalidad,ageTitle,numberTitle,numberResolution,Observacion,photoTitle);
            res.status(200).json(newStudentTitulado);
    } catch (error) {
        res.status(400).json({error:error.message});       
    }
});
StudentTituladoRouter.get("/",verifyToken,async(req,res)=>{
    try {
        let studentTitulado=await getStudentTitulado();
        res.status(200).json(studentTitulado)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})
StudentTituladoRouter.put("/:id",verifyToken,async(req,res)=>{
    const {id}=req.params
    const {idGraduate,idProfessional,idStudent,idSeguimiento,idModalidad,ageTitle,numberTitle,numberResolution,Observacion,photoTitle}=req.body;
    try {
        const updatedStudentTitulado= await updateStudentTitulado(id,idGraduate,idProfessional,idStudent,idSeguimiento,idModalidad,ageTitle,numberTitle,numberResolution,Observacion,photoTitle);
        res.status(200).json(updatedStudentTitulado)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

StudentTituladoRouter.delete('/:id',verifyToken,async(req,res)=>{
    const {id}=req.params
    try {
        await deleteStudentTitulado(id);
        res.status(200).json("Departaento eliminado")
    } catch (error) {
        res.status(400).json({error: error.message})
    }
});
// StudentTituladoRouter.get("/:id",verifyToken, async (req, res) => {
//     try {
//         const { id } = req.params;
//         const studentTitulado = await getidStudentTitulado(id);
//         if (!studentTitulado) return res.studentTitulado(404).json({ error: "status no encontrado" });

//         res.status(200).json(studentTitulado);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });
StudentTituladoRouter.get("/:type/:id", verifyToken, async (req, res) => {
    try {
        const { type, id } = req.params;
        let studentTitulado;

        if (type === "student") {
            studentTitulado = await getidStudentTitulado(id);
        } else if (type === "professional") {
            studentTitulado = await getidProfessionalStudentTitulados(id);
        }else if (type === "graduate") {
            studentTitulado = await getTitleGraduate(id);
        }

        if (!studentTitulado) {
            return res.status(404).json({ error: "Estudiante egresado no encontrado" });
        }

        res.status(200).json(studentTitulado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = StudentTituladoRouter
