import React, { useState, useEffect } from 'react'
import Logo from '..//..//assets/img/planetas.png';
import img_home from "..//..//assets/img/img_home.png";
import { Link, useLocation } from "react-router-dom";
import queryString from 'query-string';
import axios from "axios";

export const ReseteoContrasena = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const location = useLocation();

    useEffect(() => {
        const { email, token } = queryString.parse(location.search);
        // Hacer algo con el correo electrónico y el token, si es necesario
    }, [location.search]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { email, token } = queryString.parse(location.search);
          const response = await axios.post('http://localhost:8000/password/reset', {
            email: email,
            token: token,
            password: password,
            password_confirmation: confirmPassword
          });
          setMessage(response.data.message);
        } catch (error) {
          setMessage('Hubo un error al restablecer la contraseña.');
        }
      };
    

  return (
        <section className="vh-100 gradient-custom"  style={{ backgroundImage: `url(${img_home})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center center' }}>
        <header className="navbar navbar-expand-md navbar-dark fixed-top bg-transparent">
        <div className="container">
        <a className="navbar-brand">
               <img src={Logo} alt="Logo" title='Logo de la Pagina' style={{ paddingLeft: 20, width: 50, height: 30 }} />
         </a>
            <a className="navbar-brand">Mis Usuarios</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
                <ul className="navbar-nav me-auto mb-2 mb-md-0">
                    <li class="nav-item">
                        <Link to='/login'class="nav-link active">Volver </Link>
                    </li>
                </ul>
            </div>            
        </div>
    </header>
        <div className="container py-5 h-100">
               
        <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
                    <div className="card-body p-5 text-center">
                        <div className="mb-md-5 mt-md-4 pb-5">
       <form onSubmit={handleSubmit}>
        <h3>Resetear Contraseña</h3>
 
        <div className="form-group">
                                            <label className="form-label" htmlFor="password">Nueva Contraseña:</label>
                                            <input
                                                className="form-control form-control-lg"
                                                placeholder='Ingresa tu nueva contraseña'
                                                type="password"
                                                id="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label" htmlFor="confirmPassword">Confirmar Contraseña:</label>
                                            <input
                                                className="form-control form-control-lg"
                                                placeholder='Confirma tu nueva contraseña'
                                                type="password"
                                                id="confirmPassword"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                required
                                            />
                                        </div>
                                       
                                        
        <button className="btn btn-outline-light btn-lg px-5" type="submit">Restablecer Contraseña</button>
   
       </form>
       {message && <p>{message}</p>}
       </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
     </section>
  )
}
