import React, {useState, useEffect} from "react";
import Axios from "axios";
import MostrarCursos from "./ShowCourses";

function FormularioCurso() {
    const [nombreInstructor, setNombreInstructor] = useState("");
    const [nombreCurso, setNombreCurso] = useState("");
    const [duracionCurso, setDuracionCurso] = useState("");
    const [fechaCurso, setFechaCurso] = useState("");
    const [listadoInstructores, setListadoInstructores] = useState([]);


    // INPUTS DEL FORMULARIO CAPTURADOS POR ID#

    const instructorNombre = document.getElementById("nombreInstructorId");
    const cursoNombre = document.getElementById("nombreCursoId");
    const cursoDuracion = document.getElementById("duracionCursoId");
    const cursoDatetime = document.getElementById("datetimeCursoId");
    

    // TRAIGO A LOS INSTRUCTORES DE LA BASE DE DATOS Y LO SETEO EN UN ESTADO
    
    useEffect(() => {
        Axios.get("http://localhost:3001/obtenerProfe").then((response) => {
            setListadoInstructores(response.data)
        })
    }, [])


    const submit = () => {

        // VALIDACIONES

        if(instructorNombre.value == "Seleccione un instructor"){
            alert("Selecciona un instructor")
            return
        }

        if(cursoNombre.value == "Selecciona un curso"){
            alert("Selecciona un curso")
            return
        }

        if(cursoDuracion.value == "Duracion"){
            alert("Selecciona la duracion del curso")
            return
        }

        if(cursoDatetime.value == ""){
            alert("Selecciona la fecha de cursada")
            return
        }

        // ENVIO DE INFORMACION DE LOS INPUTS AL SERVIDOR

        Axios.post("http://localhost:3001/subido", {
            nombreInstructor: nombreInstructor,
            nombreCurso: nombreCurso,
            duracionCurso: duracionCurso,
            datetimeCurso: fechaCurso
        }).then(
            alert("Curso guardado"),
            window.location.reload()  
        )
    }

    // VER POR CONSOLA LA INFORMACION OBTENIDA DE LOS INPUTS
    const revision = () => {
        console.log(nombreInstructor, nombreCurso, duracionCurso, fechaCurso)
    }


    return(
        <div>

            <div className="formulario">

                <h1>Nuevo Curso</h1>

                <div className="contenedor">

                        {/* INSTRUCTORES */}
                    <div className="contenedor-input">
                        <i className="fas fa-user icon"></i>
                        <select id="nombreInstructorId" name="nombreInstructor" onChange={(e) => {
                            setNombreInstructor(e.target.selectedIndex)

                        }}>
                            <option>Seleccione un instructor</option>
                            {listadoInstructores.map((val, i) => {
                                return <option key={i}>{val.Nombre} {val.Apellido}</option>
                            })}

                        </select>
                    </div>


                        {/* CURSOS */}
                    <div className="contenedor-input">
                        <i className="fas fa-envelope icon"></i>

                        <select id="nombreCursoId" name="nombreCurso" required onChange={(e) => {
                            setNombreCurso(e.target.value)
                        }}>
                            <option>Selecciona un curso</option>
                            <option>Fotografia</option>
                            <option>Oratoria</option>
                            <option>Cerrajeria</option>
                            <option>Data Science</option>
                            <option>Programación</option>

                        </select>

                    </div>

                        {/* DURACION DEL CURSO */}
                    <div className="contenedor-input">
                        <i className="fas fa-key icon"></i>
                        <select id="duracionCursoId" name="duracionCurso" onChange={(e) => {
                            setDuracionCurso(e.target.value)
                        }}>
                            <option>Duracion</option>
                            <option>30 minutos</option>
                            <option>60 minutos</option>
                            <option>90 minutos</option>
                            <option>120 minutos</option>

                        </select>
                    </div>

                        {/* FECHA Y HORA DE LA CURSADA */}
                    <label><b>Ingresa el dia y la hora de la cursada</b></label>
                    <input id="datetimeCursoId" name="datetimeCurso" type="datetime-local" onChange={(e) => {
                        setFechaCurso(e.target.value)
                    }} />

                    <button className="button" onClick={submit}>Registrar curso</button>

                </div>

            </div>

            <MostrarCursos />

        </div>
    )
}

export default FormularioCurso;