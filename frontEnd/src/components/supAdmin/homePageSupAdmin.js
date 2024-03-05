import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import Logo from '..//..//assets/img/planetas.png'
import Usuarios from '..//../assets/img/usuarios.png'
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
    <div>
        <nav className="navbar navbar-expand-lg " style={{ backgroundColor: "#0E0B16 "}}>
            <a className="navbar-brand">
            <img src={Logo} alt="Logo" title='Logo de la Pagina' style={{ paddingLeft: 20, width: 50, height: 30 }} />
        <a className="navbar-brand" style={{paddingLeft: 20, color:"#E7DFDD"}}>Super Administrador </a>
            </a>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item active" style={{paddingRight: 20}}>
                        <Link to='/supAdmins' className='nav-link' style={{color:"#E7DFDD"}}>Usuarios</Link>
                    </li>
                    <li className="nav-item active" style={{paddingRight: 20}}>
                        <Link to='/servicios' className='nav-link' style={{color:"#E7DFDD"}}>Servicios</Link>
                    </li>
                </ul>
            </div>
            <div className="ml-auto" style={{paddingRight: 30}}>
                <button onClick={salir} className='btn btn-dark'>Salir</button>
            </div>
        </nav>

        <section>
    <h1 style={{padding:'3%'}}>Esta es la vista de Super Administrador</h1>
    <div style={{display: 'flex', alignItems: 'center', paddingLeft:'3%', marginTop:'1%'}}>
        <img src={Usuarios} alt="usuarios" title='imagen para los roles del sistema' style={{width:900, height:500}}/>
        <div style={{borderLeft: '1px solid black', height: 500, marginLeft: '20px'}}>
            <h1 style={{paddingLeft: '10px'}}>Super Administrador</h1>
            <p style={{paddingLeft: '10px', marginTop:'3%',marginRight:'9%'}}>lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus molestie est at risus semper luctus. Pellentesque pretium eleifend semper. Maecenas aliquam lacinia vestibulum. Donec non laoreet libero, id convallis lorem. Proin malesuada turpis sed sollicitudin sodales. Duis bibendum consectetur fermentum. Sed tempor sed sem eu iaculis. Nullam tempor pharetra tortor, a ornare felis mattis in. Duis ut velit sodales, lobortis enim at, finibus odio. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Mauris gravida aliquet laoreet. Nulla eros dolor, euismod a nibh id, aliquet porta ligula.</p>
            <p style={{paddingLeft: '10px', marginTop:'3%',marginRight:'9%'}}>lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus molestie est at risus semper luctus. Pellentesque pretium eleifend semper. Maecenas aliquam lacinia vestibulum. Donec non laoreet libero, id convallis lorem. Proin malesuada turpis sed sollicitudin sodales. Duis bibendum consectetur fermentum. Sed tempor sed sem eu iaculis. Nullam tempor pharetra tortor, a ornare felis mattis in. Duis ut velit sodales, lobortis enim at, finibus odio. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Mauris gravida aliquet laoreet. Nulla eros dolor, euismod a nibh id, aliquet porta ligula.</p>
        </div>
    </div>
</section>
    </div>
  )
}
