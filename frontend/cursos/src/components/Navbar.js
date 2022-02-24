import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Button, Form, Nav, FormControl } from 'react-bootstrap';
import {Route, Link, Routes} from "react-router-dom";

function NavbarUp(){
    return(
        <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand><Link to={"/form"}>Nuevo curso</Link></Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link><Link to={"/instructores"}>Instructores/cursos</Link></Nav.Link>
          </Nav>
        </Navbar>
        </div>
    )
}

export default NavbarUp;