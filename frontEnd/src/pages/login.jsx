import React from "react";
import { Link } from "react-router-dom";

export default function login() {
    return(
<div>
    <div>
    <div>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand"style={{paddingLeft: 20}}>Mis Usuarios </a>
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
        </div>
    </div>
    <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-dark text-white" style={{borderRadius: '1rem'}}>
                <div className="card-body p-5 text-center">
                <div className="mb-md-5 mt-md-4 pb-5">
                    <h2 className="fw-bold mb-2 text-">Inicio de Sesion</h2>
                    <p className="text-white-50 mb-5">Por favor digite su Correo y Contraseña</p>
                    <div className="form-outline form-white mb-4">
                    <input type="email" id="typeEmailX" className="form-control form-control-lg" />
                    <label className="form-label" htmlFor="typeEmailX">Correo</label>
                    </div>
                    <div className="form-outline form-white mb-4">
                    <input type="password" id="typePasswordX" className="form-control form-control-lg" />
                    <label className="form-label" htmlFor="typePasswordX">Password</label>
                    </div>
            
                    <button className="btn" type="submit">
                    <Link to="/supAdmins" className="btn btn-outline-light btn-lg px-5">Ingresar</Link></button>
                    <div className="d-flex justify-content-center text-center mt-4 pt-1">
                    </div>
                </div>
                <div>
                    <p className="mb-0">No tiene cuenta? <a href="#!" className="text-white-50 fw-bold">
                    <Link to="/FormRegistro" className="link link-success">Registrarse</Link></a>
                    </p>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    </section>
</div>

    )
}