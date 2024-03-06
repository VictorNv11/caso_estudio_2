import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import Logo from '..//..//assets/img/planetas.png';
import Usuarios from '..//../assets/img/usuarios.png';
import { Link } from 'react-router-dom';

export default function HomePageSupAdmin() {
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
      <div style={{ display: 'flex', height: '100vh' }}>
      <nav className="sidebar">
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
          <div style={{ marginLeft: '260px', padding: '20px', backgroundColor: '#50727B', width: '100%' }}>
              <h1 style={{ marginTop: '5%', color:'white' }}>Esta es la vista de Super Administrador</h1>
              <div style={{ marginTop: '5%' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                      <img src={Usuarios} alt="usuarios" title='imagen para los roles del sistema' style={{ width: 800, height: 500 }} />
                      <div style={{ height: 500, marginLeft: '20px' }}>
                          <h1 style={{ paddingLeft: '10px', color:'white' }}>Super Administrador</h1>
                          <p style={{ paddingLeft: '10px', marginTop: '3%', marginRight: '9%',color:'#E7DFDD' }}>lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus molestie est at risus semper luctus. Pellentesque pretium eleifend semper. Maecenas aliquam lacinia vestibulum. Donec non laoreet libero, id convallis lorem. Proin malesuada turpis sed sollicitudin sodales. Duis bibendum consectetur fermentum. Sed tempor sed sem eu iaculis. Nullam tempor pharetra tortor, a ornare felis mattis in. Duis ut velit sodales, lobortis enim at, finibus odio. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Mauris gravida aliquet laoreet. Nulla eros dolor, euismod a nibh id, aliquet porta ligula.</p>
                          <p style={{ paddingLeft: '10px', marginTop: '3%', marginRight: '9%',color:'#E7DFDD' }}>lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus molestie est at risus semper luctus. Pellentesque pretium eleifend semper. Maecenas aliquam lacinia vestibulum. Donec non laoreet libero, id convallis lorem. Proin malesuada turpis sed sollicitudin sodales. Duis bibendum consectetur fermentum. Sed tempor sed sem eu iaculis. Nullam tempor pharetra tortor, a ornare felis mattis in. Duis ut velit sodales, lobortis enim at, finibus odio. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Mauris gravida aliquet laoreet. Nulla eros dolor, euismod a nibh id, aliquet porta ligula.</p>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    )
}