import React from 'react'
import '../css/RegistroUsuario.css';
import { useNavigate } from 'react-router-dom';
import InicioSesion from './InicioSesion';

function RegistroUsuario() {
  const navigate = useNavigate()
  return (
    <div className="wrapper">
      <form action=''>
    <h1>Empecemos una nueva aventura...</h1>

    <div className="input-columns">
      <div className="input-box">
        <label>Primer nombre y Segundo nombre</label>
        <input type="text" id="nombre" name="nombre" />
      </div>

      <div className="input-box">
        <label>Primer apellido y Segundo apellido</label>
        <input type="text" id="apellido" name="apellido" />
      </div>

      <div className="input-box-date">
        <label>Fecha de Nacimiento</label>
        <input type="date" id="fecha" name="fecha" />
      </div>

      <div className="input-box">
        <label>Número de Identificación</label>
    
        <input type="text" id="dni" name="identificacion" />
          <select id="tipo-identificacion" name="tipo-identificacion">
            <option value="cc">Cédula de Ciudadanía</option>
            <option value="ce">Cédula de Extranjería</option>
            <option value="rc">Registro Civil</option>
            <option value="dni">Documento de Identidad</option>
          </select>
      </div>

      <div className="input-box">
        <label>Correo Electrónico</label>
        <input type="email" id="email" name="email" />
      </div>

      <div className="input-box">
        <label>Contraseña</label>
        <input type="password" id="password" name="password" />
      </div>

      <div className="input-box">
        <label>Número de Teléfono</label>
        <input type="tel" id="telefono" name="telefono" />
      </div>
    </div>

    <button onClick={()=>navigate("/")} type="submit">Ingresar</button>
   
    
    </form>
    </div>
  );
}

export default RegistroUsuario
