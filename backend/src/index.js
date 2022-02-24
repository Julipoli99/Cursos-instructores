const express = require("express");
const app = express();
const path = require("path");

const db = require("../database/models");
const {sequelize, Sequelize} = require("../database/models");
const op = Sequelize.Op

const bodyParser = require("body-parser");
const cors = require("cors");


// CONFIGURACIONES
app.listen(3001, () => {
    console.log("Server running on port 3001")
});
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}))


                                        // ** ROUTES ** //

// INSERTAR LOS DATOS A LA BASE DE DATOS //
app.post("/subido", async (req, res) => {
    const nombreInstructor = await req.body.nombreInstructor;
    const nombreCurso = await req.body.nombreCurso;
    const duracionCurso = req.body.duracionCurso;
    const datetimeCurso = req.body.datetimeCurso;


    let creacionCurso = await db.Curso.create({
        Nombre_curso: nombreCurso,
        Duracion: duracionCurso,
        DiaHora: datetimeCurso
    })

    let cursoId = creacionCurso.id

    await db.InstructorCurso.create({
        id_instructor: nombreInstructor,
        id_curso: cursoId
    })
    console.log(nombreInstructor, nombreCurso, duracionCurso, datetimeCurso)
    console.log(nombreInstructor.id, nombreCurso.id)
    console.log(cursoId, nombreInstructor)

})

// OBTENER INSTRUCTORES DE LA BASE DE DATOS //
app.get("/obtenerProfe", (req, res) => {
    db.Instructor.findAll()
        .then(function(instructores){
           // console.log(instructores)
            res.send(instructores)
        })
})

// OBTENER LOS CURSOS CREADOS //
app.get("/getCourse", (req, res) => {
    db.Curso.findAll({
        include: {association: 'curso_instructor'}
    })
        .then((instructores) => {
            res.json(instructores)
            
        })
        .catch((error)=> {
            console.log(error)
        })
        
})


// BORRAR CURSO //
app.delete("/courseDeleted/:id", async (req, res) => {
    await db.InstructorCurso.destroy({
        where: {
            id_curso: req.params.id
        }
    })

    await db.Curso.destroy({
        where: {
            id: req.params.id
        }
    })

    res.send("Curso borrado!")
})


/*app.put("/update", async (req, res) => {
    const id = req.body.id;
    const nombreInstructor = await req.body.nombreInstructorEdit;
    const nombreCurso = await req.body.nombreCursoEdit;
    const duracionCurso = req.body.duracionCursoEdit;
    const datetimeCurso = req.body.datetimeCursoEdit;

    let edicionCurso = await db.Curso.update({
        id: id,
        Nombre_curso: nombreCurso,
        Duracion: duracionCurso,
        DiaHora: datetimeCurso
    })

    let cursoId = edicionCurso.id;
})*/