import React from 'react'
import '../css/InicioSesion.css';
import { useNavigate } from 'react-router-dom';
import { LuUser } from "react-icons/lu";
import { GoLock } from "react-icons/go";



function InicioSesion() {
  const navigate = useNavigate()
  return (
    <div className='wrapper'>
      <form action="">
        <h1>Inicio Sesion</h1>
        <div className="input-box">
            <input type="text" placeholder='Usuario / Correo' required />
            <LuUser className='icono'/>
        </div>

        <div className="input-box">
            <input type="password" placeholder='Contraseña' required />
            <GoLock className='icono' />
        </div>

        <div className='password-forgot'>
        <a href='#'>Recordar Contraseña</a>
        </div>

        <button onClick={()=> navigate("/principal")} type="submit"> Ingresar </button>

        <div className="registro-usuario">
        <p>Eres nuevo? <a href=''onClick={()=>navigate("/registrousuario")}>Registrate aqui</a></p>
        </div>

        <div className="registro-empresa">
            <p>Tienes una empresa? <a href='' onClick={()=>navigate("/registroempresa")}>Registrate aqui</a> </p>
            
        </div>

      </form>
    </div>
  )
}

export default InicioSesion
