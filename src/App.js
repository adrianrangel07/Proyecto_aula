//Importaciones Principales
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Paginas
import InicioSesion from "./componentes/paginas/InicioSesion.jsx";
import RegistroUsuario from "./componentes/paginas/RegistroUsuario.jsx";
import Principal from "./componentes/paginas/Principal.jsx";
import RegistroEmpresa from "./componentes/paginas/RegistroEmpresa.jsx";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<InicioSesion />} />
          <Route path="/registrousuario" element={<RegistroUsuario />} />
          <Route path="/registroempresa" element={<RegistroEmpresa />} />
          <Route path="/principal" element={<Principal />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
