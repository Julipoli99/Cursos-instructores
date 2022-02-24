import './App.css';
import FormularioCurso from './components/FormNewCourse';
import Navbar from './components/Navbar';
import {Route, Link, Routes} from "react-router-dom";
import PlanillaInstructores from './components/PlanillaInstructores';
import Axios from "axios";
import {useState, useEffect} from "react";


function App() {
  const [curso, setCurso] = useState([]);


  useEffect(() => {
    Axios.get("http://localhost:3001/getCourse").then((response) => {
      setCurso(response.data)
    })
  }, [])

 


  return (
    <div className="App">
      
      < Navbar />
      
      <Routes>
        <Route path = "/form" element = {<FormularioCurso/>} />
        <Route path = "/instructores" element = {<PlanillaInstructores/>} />
        
        </Routes>
      
    </div>
  );
}

export default App;
