import React, {useState, useEffect} from "react";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button } from 'react-bootstrap';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock, faCalendarAlt} from "@fortawesome/free-solid-svg-icons"

 


function MostrarCursos() {
    const [mostrarTexto, setMostrarTexto] = useState(false);
    const [curso, setCurso] = useState([]);




    useEffect(() => {
        Axios.get("http://localhost:3001/getCourse").then((response) => {
            setCurso(response.data)
            console.log(response.data)
        })
    }, [])

    

    const courseDeleted = (id) => {
        let idCourse = id;
        console.log(idCourse)
        Axios.delete("http://localhost:3001/courseDeleted/" + idCourse)
            .then(res => console.log(res))
            .then(
                alert("Curso borrado!"),
                window.location.reload()
            )
            .catch(error => console.error(error))

    }

    return (
        <div>
            <button onClick={() => setMostrarTexto(true)} className="BotonTexto">Mostrar cursos</button>
            <br />
            <button onClick={() => setMostrarTexto(false)} className="BotonTexto">Ocultar</button>

            {mostrarTexto &&
                <div>
                    {
                        curso.map((curso, i) => {
                            let x = curso.curso_instructor;
                            let fechaISO = curso.DiaHora;

                            fechaISO = fechaISO.replace(/\D/g, " ");

                            let componentes = fechaISO.split(" ");

                            //console.log(componentes);

                            let fecha = new Date(Date.UTC.apply(null, componentes))
                        //console.log(fecha.toTimeString());

                            {
                                x.map((val) => {
                                    let y = val.instructor_curso
                                    //console.log(y);
                                    if (curso.id == y.id_curso) {
                                        x = val
                                    }
                                })
                            }

                            return <div className="container contenedorCard" key={i}>
                                <div className="cards">
                                    <Card style={{ width: '40rem' }}>
                                        <Card.Body>
                                            <Card.Title>{curso.Nombre_curso}</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">{x.Nombre}</Card.Subtitle>
                                            <Card.Text>
                                                <FontAwesomeIcon icon={faClock} /> <p>{curso.Duracion} minutos</p>
                                                <FontAwesomeIcon icon={faCalendarAlt} /> <p>{fecha.toDateString() + " " + fecha.toTimeString().split(":00 GMT-0300 (hora estándar de Argentina)")}</p>
                                            </Card.Text>
                                            <button onClick={() => courseDeleted(curso.id)}>Borrar curso</button>
                                        </Card.Body>
                                    </Card>
                                </div>
                          </div>

                        })
                    }
                </div>
            }

            
        </div>
    )
}

export default MostrarCursos;