import React from 'react';
import { Link } from 'react-router-dom';
import img_home from '../assets/img/img_home.png';
import Logo from '../assets/img/planetas.png';
import {
  Button,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";
import { FaTwitter } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

const Homepage = () => {
    return (
  <div>
  <div >
      <header className="navbar navbar-expand-md navbar-dark fixed-top bg-transparent">
        <div className="container">
        <a className="navbar-brand" href="#">
          <img src={Logo} alt="Logo" title='Logo de la Pagina' style={{ paddingLeft: 20, width: 50, height: 30 }} />
        </a>
          <a className="navbar-brand">Mis Usuarios</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li class="nav-item">
            <a class="nav-link active" aria-current="page">Inicio</a>
          </li>
              <li className="nav-item">
              <a class="nav-link disabled" aria-disabled="true">Contacto</a>
              </li>
            </ul>
          </div>
          <div className="ml-auto" style={{ paddingRight: 30, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <NavItem className="p-0" style={{ listStyle: 'none' }}>
        <NavLink
            data-placement="bottom"
            href="https://twitter.com/CreativeTim"
            rel="noopener noreferrer"
            target="_blank"
            title="Síguenos en  Twitter"
        >
            <FaTwitter style={{ color: 'white', fontSize: 45, padding: '0 10px' }} />
            <p className="d-lg-none d-xl-none">Twitter</p>
        </NavLink>
    </NavItem>
    <NavItem className="p-0" style={{ listStyle: 'none' }}>
        <NavLink
            data-placement="bottom"
            href="https://www.facebook.com/CreativeTim"
            rel="noopener noreferrer"
            target="_blank"
            title="Síguenos en  Facebook"
        >
            <FaFacebookSquare style={{ color: 'white', fontSize: 40, padding: '0 10px' }} />
            <p className="d-lg-none d-xl-none">Facebook</p>
        </NavLink>
    </NavItem>
    <NavItem className="p-0" style={{ listStyle: 'none' }}>
        <NavLink
            data-placement="bottom"
            href="https://www.instagram.com/CreativeTimOfficial"
            rel="noopener noreferrer"
            target="_blank"
            title="Síguenos en Instagram"
        >
            <FaInstagram style={{ color: 'white', fontSize: 43, padding: '0 10px' }} />
            <p className="d-lg-none d-xl-none">Instagram</p>
        </NavLink>
    </NavItem>
</div>
          <div className="ml-auto" style={{ paddingRight: 30 }}>
          
            <Link to="/login" className="btn btn-primary">Ingresar</Link>
          </div>
        </div>
      </header>

      <section className="hero text-white text-center" style={{ backgroundImage: `url(${img_home})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center center' }}>
        <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
          <h1 className="display-4">Bienvenido a Mi Sitio</h1>
          <p className="lead">Descubre más acerca de nosotros y cómo podemos ayudarte.</p>
          <a className="btn btn-primary btn-lg" href="#about" role="button" style={{backgroundColor:''}}>Acerca de Nosotros</a>
        </div>
      </section>

      <section className="py-5 text-center" id="about" style={{background: 'linear-gradient( to right,#0E0B16 , #A239CA )'}}>
        <div className="container">
        <h3 className='mb-3' style={{ color: "#E7DFDD" }}>Sobre Nosotros</h3>
        <p style={{ textAlign: 'left', color: "#828081" }}>Descubre una nueva forma de gestionar tus usuarios. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate deserunt fugit recusandae earum perferendis quaerat? Eaque repudiandae vero quas fuga, praesentium inventore tempora maxime, atque neque illum molestias ducimus pariatur?
          Lorem ipsum dolor sit amet consectetur</p>
          <h3 className='mb-3' style={{ color: "#E7DFDD" }}>¡¡Regístrate ya!!</h3>
              <h6 style={{ color: "#E7DFDD" }}>Por los Siguientes Motivos</h6>
              <p style={{ textAlign: 'left', color: "#828081" }}>Experimenta la mejor plataforma de administración de usuarios. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima assumenda quaerat iste consequatur possimus dolorem incidunt in molestiae ipsam inventore doloremque, delectus nisi pariatur. Earum excepturi consequuntur veritatis suscipit quos.
              </p>
          <Link to='/formRegistro' className='btn btn-primary' style={{ marginLeft: '0%', marginTop: '1%'}}>¡Regístrate Ahora!</Link>
        </div>
      </section>
      {/* Footer */}
      <footer style={{ position: 'static', bottom: 0, width: '100%', backgroundColor: '#0E0B16' }}>
                <div className="container-fluid">
                    <div className="row p-5 pb-2  text-white">
                        <div className="col-xs-12 col-md-6 col-lg-3">
                            <p className="h3">Gestión de Usuarios</p>
                           
                        </div>
                        <div className="col-xs-12 col-md-6 col-lg-3">
                            <p className="h5 mb-3">Contactos</p>
                            <div className="mb-2">
                                <a className='text-secondary text-decoration-none' href="#">Facebook</a>
                            </div>
                            <div className="mb-2">
                                <a className='text-secondary text-decoration-none' href="#">GitHub</a>
                            </div>
                            <div className="mb-2">
                                <a className='text-secondary text-decoration-none' href="#">Gmail</a>
                            </div>

                        </div>

                        <div className="col-xs-12 col-md-6 col-lg-3">
                            <p className="h5">Enlaces</p>
                            <div className="mb-2">
                                <a className='text-secondary text-decoration-none' href="#">Terms & Conditions</a>
                            </div>
                            <div className="mb-2">
                                <a className='text-secondary text-decoration-none' href="#">Private Policy</a>
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-6 col-lg-3">
                            <p className="h5">Acerca De</p>
                            <div className="mb-2">
                                <a className='text-secondary text-decoration-none' href="#">Documentos</a>
                            </div>
                        </div>
                        <div className="col-xs-12 pt-4">
                        <p className='text-white text-center'>Copyright - All rights reserved © 2024</p>
                        </div>
                    </div>
                </div>
            </footer>
     
  </div>
  </div>


    );
}

export default Homepage;
