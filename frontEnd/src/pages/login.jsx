import axios from "axios";
import Cookies from "js-cookie";
import React, { useState} from "react";
import { Link } from "react-router-dom";
import GoogleLogin from 'react-google-login';
import Logo from '../assets/img/planetas.png';
import img_home from "../assets/img/img_home.png"
import { IoEyeSharp, IoEyeOffSharp } from 'react-icons/io5';
import avatar from "../assets/img/avatar.png";


export default function Login() {
    
   const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    

    const endpoint = 'http://localhost:8000/api/'
    
    const responseGoogle = (respuesta) => {
        console.log(respuesta);
      }



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${endpoint}login`, {
                email,
                password
            });
            console.log(response);
            // Si la solicitud es exitosa, redirige al usuario a la página de inicio
            if (response.status === 200) {
                Cookies.set("token", response.data.token);
                const role = response.data.role;
                Cookies.set("role", role); // Almacena el rol del usuario en las cookies

                // Almacena el nombre de usuario en el almacenamiento local
                localStorage.setItem('username', response.data.username);
                console.log(role);
                // Redirige al usuario según su rol
                if (role === 1) {
                    window.location.href = "/HomePageSuperAdmin";
                } else if (role === 2) {
                    window.location.href = "/homePageAdmin";
                } else if (role === 3) {
                    window.location.href = "/HomePageUsuario";
                }
            }
        } catch (error) {
            // Si hay un error en la solicitud, muestra el mensaje de error
            setError("Credenciales inválidas");
            // Configura el temporizador para limpiar el error después de 5 segundos
            setTimeout(() => {
                setError(null);
            }, 5000);
            return;
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
                            <Link to='/'class="nav-link active">Volver </Link>
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
                            
                <img src={avatar} alt="icono de usuario" title="icono de usuario" className="img-fluid" style={{width:'10rem'}} />
            
                                <h2 className="fw-bold mb-2 text-">Inicio de Sesión</h2>
                                    <p className="text-white-50 mb-5">Por favor digite su Correo y Contraseña</p>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-outline form-white mb-4">
                                        <input
                                            type="email"
                                            id="typeEmailX"
                                            className="form-control form-control-lg"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        <label className="form-label" htmlFor="typeEmailX">Correo</label>
                                    </div>
                                    <div className="form-outline form-white mb-4 position-relative">
                                    <div className="input-group">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            id="typePasswordX"
                                            className="form-control form-control-lg"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                                            <button
                                            className="btn btn-outline-dark"
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            style={{ zIndex: 2 }}
                                        >
                                            {showPassword ? <IoEyeSharp  style={{ color:'white'  }} /> : <IoEyeOffSharp  style={{ color:'white'  }} />}
                                        </button>
                                        </div>
                                        <label className="form-label" htmlFor="typePasswordX">Contraseña</label>
                                    </div>
                                    <button type="submit" className="btn btn-outline-light btn-lg px-5">Ingresar</button>
                                    <hr style={{border: '1px solid #ccc', margin: '10px 0',marginTop:'5%'}} />   
                                    <GoogleLogin
                                        clientId="25474265081-tn5qcf5efuhti5l15qee26scha591a40.apps.googleusercontent.com"
                                        buttonText="Ingresar con google"
                                        onSuccess={responseGoogle}
                                        onFailure={responseGoogle}
                                        cookiePolicy={'single_host_origin'}
                                        className="btn btn-outline-light btn-lg px-5"
                                        style={{ marginTop: '2%', display: 'flex', alignItems: 'center' }}
                                    />
                                </form>
                                {error && <p className="text-danger mt-3">{error}</p>}
                            </div>
                            <div>
                               <p className="forgot-password">
                                <Link className="mb-0" to={'/recuperarContrasena'} style={{color:'#BF9DFC'}}>¿Olvidaste tu Contraseña?</Link>
                                </p> 
                                    <p className="mb-0">¿No tienes Cuenta? <Link to="/FormRegistro" className="link" style={{color:'#BF9DFC'}}>Registrarse</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    );
}