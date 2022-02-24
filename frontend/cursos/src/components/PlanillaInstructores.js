import 'bootstrap/dist/css/bootstrap.min.css';
import {useState, useEffect} from "react";
import { Table } from 'react-bootstrap';
import Axios from "axios";
import {Route, Link, Routes} from "react-router-dom";


function PlanillaInstructores(){
    const [Instructores, setInstructores] = useState([]);
    const [cursos, setCursos] = useState([]);


    useEffect(() => {
        Axios.get("http://localhost:3001/obtenerProfe").then((response) => {
            setInstructores(response.data)
        })
    }, [])

    useEffect(() => {
        Axios.get("http://localhost:3001/getCourse").then((response) => {
            setCursos(response.data)
            console.log(response.data);
        })
    }, [])

    

    


    return(
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Instructor</th>
                        <th>Curso</th>
                        <th>Duración</th>
                        <th>Fecha</th>
                    </tr>
                </thead>

                {
                    cursos.map((curso, i) => {
                        let x = curso.curso_instructor;
                        let fechaISO = curso.DiaHora;

                        fechaISO = fechaISO.replace(/\D/g, " ");

                        let componentes = fechaISO.split(" ");

                        let fecha = new Date(Date.UTC.apply(null, componentes))


                        {
                            x.map((val) => {
                                let y = val.instructor_curso
                                if (curso.id == y.id_curso) {
                                    x = val
                                }
                            })
                        }
                        return <tbody key={i}>
                            <tr>
                                <td>{curso.id}</td>
                                <td>{x.Nombre}</td>
                                <td>{curso.Nombre_curso}</td>
                                <td>{curso.Duracion} minutos</td>
                                <td>{fecha.toDateString() + " " + fecha.toTimeString().split(":00 GMT-0300 (hora estándar de Argentina)")}</td>
                            </tr>

                        </tbody>

                    })
                }
            </Table>
        </div>
    )
}

export default PlanillaInstructores;