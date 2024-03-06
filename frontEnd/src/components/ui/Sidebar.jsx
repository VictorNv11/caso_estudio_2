import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '..//..//assets/img/planetas.png'


function Sidebar() {
    const [setUsers] = useState([]);
    const endpoint = 'http://localhost:8000/api';
    
    const showData = async () => {
        try {
            const token = Cookies.get("token");
            const response = await axios.get(`${endpoint}/users`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUsers(response.data.users);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    
    useEffect(() => {
        if (Cookies.get("token") === undefined) {
            window.location.href = "/";
        }
        showData();
    });
    
    const salir = () => {
        Cookies.remove("token")
        window.location.href = "/";
    }
  return (
    <div>
         <nav className="sidebar" style={{
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          zIndex: 100,
          paddingTop: '0.5%', // Altura del navbar
          boxShadow: 'inset -1px 0 0 rgba(0, 0, 0, .1)',
          backgroundColor: '#344955', // Color de fondo
          color: '#fff', // Color de texto
          width: '260px' // Ancho del sidebar
      }}>
        <img src={Logo} alt="Logo" title='Logo de la Pagina' style={{ margin: 'auto', display: 'block', width: 50, height: 50 }} />
        <h4 style={{ marginLeft: '16px', marginTop:'10%'}}>Super Administrador</h4>
        <ul className="nav flex-column">
            <li className="nav-item">
                <Link to={'/homePageSuperAdmin'} className="nav-link active" style={{ color: '#fff' }}><i className="fas fa-home"></i> Inicio</Link>
            </li>
            <li className="nav-item">
                <Link to={'/supAdmins'} className="nav-link" style={{ color: '#fff' }}><i className="fas fa-user"></i> Usuarios</Link>
            </li>
            <li className="nav-item">
                <a className="nav-link" style={{ color: '#fff' }}><i className="fas fa-calendar-alt"></i> Calendario</a>
            </li>
            <li className="nav-item">
                <Link to={'/servicios'} className="nav-link" style={{ color: '#fff' }}><i className="fas fa-tools"></i> Servicios</Link>
            </li>
            <li className="nav-item">
                <a className="nav-link" style={{ color: '#fff' }}><i className="fas fa-users"></i> Roles</a>
            </li>
        </ul>
        <div className="user-section" style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%'
        }}>
            <ul className="nav flex-column">
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ color: '#fff' }}>
                        <i className="fas fa-user-circle"></i> Usuario
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li><a className="dropdown-item" href="#"><img src="https://via.placeholder.com/30" alt="Profile" style={{
                            width: '30px',
                            height: '30px',
                            borderRadius: '50%',
                            marginRight: '10px'
                        }} /> Nombre de Usuario</a></li>
                        <li><hr className="dropdown-divider" /></li>
                        <button className="dropdown-item" onClick={salir}><i className="fas fa-sign-out-alt"></i> Salir</button>
                    </ul>
                </li>
            </ul>
        </div>
      </nav>
    </div>
  )
}

export default Sidebar
