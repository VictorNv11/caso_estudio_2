import React, { useEffect } from 'react'
import NavBar from '../ui/NavBar'
import Footer from '../ui/Footer'
import Usuarios from '..//../assets/img/usuarios.png';
import Cookies from 'js-cookie';



function HomePageAdmin() {

    useEffect(() => {
        if (Cookies.get("token") === undefined) {
            window.location.href = "/";
        }
    });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
    <NavBar />
        <div style={{ display: 'flex', flex: 1 }}>
            <div style={{ flex: 1, padding: '20px', backgroundColor: '#50727B', overflowY: 'auto' }}>
                <h1 style={{ color: 'white' }}>Esta es la vista de Administrador</h1>
                <div style={{ marginTop: '5%', display: 'flex' }}>
                    <img src={Usuarios} alt="usuarios" title='imagen para los roles del sistema' style={{ width: 800, height: 500 }} />
                    <div style={{ marginLeft: '20px' }}>
                        <div style={{ marginTop: '3%', color: '#E7DFDD' }}>
                            <h1 style={{ color: 'white' }}>Administrador</h1>
                            <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus molestie est at risus semper luctus. Pellentesque pretium eleifend semper. Maecenas aliquam lacinia vestibulum. Donec non laoreet libero, id convallis lorem. Proin malesuada turpis sed sollicitudin sodales. Duis bibendum consectetur fermentum. Sed tempor sed sem eu iaculis. Nullam tempor pharetra tortor, a ornare felis mattis in. Duis ut velit sodales, lobortis enim at, finibus odio. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Mauris gravida aliquet laoreet. Nulla eros dolor, euismod a nibh id, aliquet porta ligula.
                            </p>
                            <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus molestie est at risus semper luctus. Pellentesque pretium eleifend semper. Maecenas aliquam lacinia vestibulum. Donec non laoreet libero, id convallis lorem. Proin malesuada turpis sed sollicitudin sodales. Duis bibendum consectetur fermentum. Sed tempor sed sem eu iaculis. Nullam tempor pharetra tortor, a ornare felis mattis in. Duis ut velit sodales, lobortis enim at, finibus odio. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Mauris gravida aliquet laoreet. Nulla eros dolor, euismod a nibh id, aliquet porta ligula.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default HomePageAdmin
