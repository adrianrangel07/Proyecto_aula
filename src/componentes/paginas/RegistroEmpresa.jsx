import React from 'react'
import '../css/RegistroEmpresa.css';

function RegistroEmpresa() {
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

        <button type="submit"> Ingresar </button>

        <div className="registro-usuario">
           <p>Eres Nuevo? <a href='#'>Crea una Cuenta</a></p> 
        </div>

        <div className="registro-empresa">
            <p>Tienes una empresa? <a href='#'>Registrate aqui</a> </p>
            
        </div>

      </form>
    </div>
  )
}

export default RegistroEmpresa
