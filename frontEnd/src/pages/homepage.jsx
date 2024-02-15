import React from 'react';
import { Link } from 'react-router-dom';
import usuarios from '../assets/img/img_home.jpg';
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
            <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#0E0B16", borderRadius: 5 }}>
                <a className="navbar-brand" href="#">
                    <img src={Logo} alt="Logo" title='Logo de la Pagina' style={{ paddingLeft: 20, width: 50, height: 30 }} />
                </a>
                <a className="navbar-brand" style={{ paddingLeft: 20, color: "#E7DFDD" }}>Mis Usuarios </a>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to="/features" className="nav-link" style={{ color: "#E7DFDD" }}>Características</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/pricing" className="nav-link" style={{ color: "#E7DFDD" }}>Precios</Link>
                        </li>
                      </ul>
         
                </div>
                <div className="ml-auto" style={{ paddingRight: 30, display:'flex', justifyContent:'center', alignItems:'center' }}>
                <NavItem className="p-0" style={{listStyle:'none'}}>
              <NavLink
                data-placement="bottom"
                href="https://twitter.com/CreativeTim"
                rel="noopener noreferrer"
                target="_blank"
                title="Síguenos en  Twitter"
              >
                <FaTwitter style={{color: 'white', fontSize:35, padding:'0 4 10 10' }}/>
                <p className="d-lg-none d-xl-none">Twitter</p>
              </NavLink>
            </NavItem>
            <NavItem className="p-0"  style={{listStyle:'none'}}>
              <NavLink
                data-placement="bottom"
                href="https://www.facebook.com/CreativeTim"
                rel="noopener noreferrer"
                target="_blank"
                title="Síguenos en  Facebook"
              >
                <FaFacebookSquare style={{color: 'white', fontSize:35, padding:'0 4 10 10' }}/>
                <p className="d-lg-none d-xl-none">Facebook</p>
              </NavLink>
            </NavItem>
            <NavItem className="p-0"  style={{listStyle:'none'}}>
              <NavLink
                data-placement="bottom"
                href="https://www.instagram.com/CreativeTimOfficial"
                rel="noopener noreferrer"
                target="_blank"
                title="Síguenos en Instagram"
              >
               <FaInstagram style={{color: 'white', fontSize:72, padding:'0 4 10 10', paddingRight:40 }}/>
                <p className="d-lg-none d-xl-none">Instagram</p>
              </NavLink>
            </NavItem>
                    <Link to="/login" className="btn btn-dark">Ingresar</Link>
                </div>
            </nav>
            <body className='fondo'>
                <section>
                    <div>
                        <div>
                            <h1 style={{ textAlign: 'center', paddingTop: '3%', color: "#E7DFDD" }}>¡Descubre Mis Usuarios!</h1>
                        </div>
                        <div style={{ textAlign: 'center', margin: '20px 0' }}>
                            <hr style={{ border: '1px solid #E7DFDD', width: '80%', margin: '0 auto' }} />
                        </div>
                        <div className="container">
                            <div style={{ overflow: 'auto' }}>
                                <img src={usuarios} title='imagen de inicio' alt='imagen de inicio' style={{ float: 'left', marginRight: 20, borderRadius: "20%", width: 626, height: 380 }} />
                                <div style={{ marginLeft: 30 }}>
                                    <h3 style={{ color: "#E7DFDD" }}>Sobre Nosotros</h3>
                                    <p style={{ textAlign: 'left', color: "#828081" }}>Descubre una nueva forma de gestionar tus usuarios. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate deserunt fugit recusandae earum perferendis quaerat? Eaque repudiandae vero quas fuga, praesentium inventore tempora maxime, atque neque illum molestias ducimus pariatur?
                                        Lorem ipsum dolor sit amet consectetur</p>
                                    <h3 style={{ color: "#E7DFDD" }}>¡¡Regístrate ya!!</h3>
                                    <h6 style={{ color: "#828081" }}>Por los Siguientes Motivos</h6>
                                    <p style={{ textAlign: 'left', color: "#828081" }}>Experimenta la mejor plataforma de administración de usuarios. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima assumenda quaerat iste consequatur possimus dolorem incidunt in molestiae ipsam inventore doloremque, delectus nisi pariatur. Earum excepturi consequuntur veritatis suscipit quos.
                                    </p>
                                </div>
                                <Link to='/formRegistro' className='btn btn-primary' style={{ marginLeft: '13%', marginTop: '1%' }}>¡Regístrate Ahora!</Link>
                            </div>
                        </div>
                    </div>
                </section>
            </body>
            <footer style={{ position: 'fixed', bottom: 0, width: '100%', backgroundColor: '#0E0B16' }}>
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
    );
}

export default Homepage;
