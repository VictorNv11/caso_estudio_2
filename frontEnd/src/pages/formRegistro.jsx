import React from "react";
import { Link } from "react-router-dom";

export default function FormRegistro() {
    const handleRegistroClick = () => {
        alert('¡Se ha registrado con Exito!');
      };
    return(
        <div>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="#" style={{paddingLeft: 20}}>Mis Usuarios </a>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                <Link to="/" className="nav-link">
                  Inicio   
                </Link>
                </li>
              </ul>
            </div>
            <div className="ml-auto" style={{paddingRight: 30}}>
              <Link to='/Login' className='btn btn-light'>Ingresar</Link>
            </div>
        </nav>
        <div>
            <h1 className="title-1" style={{textAlign:'center',  marginTop: '4%'}}>Regitro cliente</h1>
        </div>
        <div style={{ marginTop:'5%', backgroundColor: '#f4f4f4', padding: '20px', borderRadius: '10px', maxWidth: '600px', margin: 'auto' }}>
      <form>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre completo</label>
          <input type="text" className="form-control" id="nombre" name="nombre"  />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" name="email" required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input type="password" className="form-control" id="password" name="password"  required />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmationPassword" className="form-label">Confirmación contraseña</label>
          <input type="password" className="form-control" id="confirmationPassword" name="confirmationPassword"      required />
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleRegistroClick}>
          Enviar
        </button>



        
      </form>
    </div>
        </div>
    )
}