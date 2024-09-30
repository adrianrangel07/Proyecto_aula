//Importaciones Principales
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Paginas
import InicioSesion from "./paginas/Inicio Sesion/InicioSesion.jsx";
import RegistroUsuario from "./paginas/Registro/Usuario/RegistroUsuario.jsx";
import Principal from "./paginas/Principal.jsx";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<InicioSesion />} />
          <Route path="/registrousuario" element={<RegistroUsuario />} />
          <Route path="/principal" element={<Principal />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
