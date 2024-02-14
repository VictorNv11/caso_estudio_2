import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import cookie from 'js-cookie'
import Cookies from "js-cookie";

export default function Login() {
    
   const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const endpoint = 'http://localhost:8000/api/';

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${endpoint}login`, {
                email,
                password
            });
            console.log(response)
            // Si la solicitud es exitosa, redirige al usuario a la página de inicio
            if (response.status === 200) {
                Cookies.set("token",response.data['token'])
                window.location.href = "/supAdmins";
            }
        } catch (error) {
            // Si hay un error en la solicitud, muestra el mensaje de error
            setError("Credenciales inválidas");
        }
    };

    return (
        <section className="vh-100 gradient-custom">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
                            <div className="card-body p-5 text-center">
                                <div className="mb-md-5 mt-md-4 pb-5">
                                    <h2 className="fw-bold mb-2 text-">Inicio de Sesion</h2>
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
                                        <div className="form-outline form-white mb-4">
                                            <input
                                                type="password"
                                                id="typePasswordX"
                                                className="form-control form-control-lg"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                            <label className="form-label" htmlFor="typePasswordX">Password</label>
                                        </div>
                                        <button type="submit" className="btn btn-outline-light btn-lg px-5">Ingresar</button>
                                    </form>
                                    {error && <p className="text-danger mt-3">{error}</p>}
                                </div>
                                <div>
                                    <p className="mb-0">No tiene cuenta? <Link to="/FormRegistro" className="link link-success">Registrarse</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}