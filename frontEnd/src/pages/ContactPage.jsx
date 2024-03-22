import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/img/planetas.png';
import { NavItem, NavLink } from "reactstrap";
import { FaTwitter, FaFacebookSquare, FaInstagram } from "react-icons/fa";

const ContactPage = () => {
  const [activeSection, setActiveSection] = useState('contacto');

  const handleSectionChange = (section) => {
    setActiveSection(section);
  }

  return (
    <div>
      <div style={{ backgroundColor: 'black' }}>
        <header className="navbar navbar-expand-md navbar-dark fixed-top ">
          <div className="container">
            <Link to="/" className="navbar-brand">
              <img src={Logo} alt="Logo" title='Logo de la Pagina' style={{ paddingLeft: 20, width: 50, height: 30 }} />
            </Link>
            <a className="navbar-brand">Mis Usuarios</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
              <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/"
                    style={{ color: activeSection === 'inicio' ? '#fff' : '#808080' }}
                    onClick={() => handleSectionChange('inicio')}
                  >
                    Inicio
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/contactos"
                    style={{ color: activeSection === 'contacto' ? '#fff' : '#808080' }}
                    onClick={() => handleSectionChange('contacto')}
                  >
                    Contacto
                  </Link>
                </li>
              </ul>
            </div>
            <div className="ml-auto" style={{ paddingRight: 30, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <NavItem className="p-0" style={{ listStyle: 'none' }}>
                <NavLink
                  data-placement="bottom"
                  // href="https://twitter.com/CreativeTim"
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
                  // href="https://www.facebook.com/CreativeTim"
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
                  // href="https://www.instagram.com/CreativeTimOfficial"
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
      </div>
      <div style={{backgroundColor: '#50727B'}}>
        <div>
          <div className="container-contact" style={{marginLeft:'500px', fontSize:'2em', padding:'2em'}}>
            <div>
              <h4 style={{color:'#fff', paddingTop:'120px'}}>Envíame un mensaje</h4>
              <form className="form" style={{display:'flex', flexDirection: 'column', width:'50vw', marginTop:'2em'}}>
                <input type="text" placeholder="Usuario" formControlName="name" 
                    style={{
                        padding:'10px 20px',
                        marginBottom:'1em',
                        background: 'none',
                        borderRadius: '7px',
                        borderBottom:'1px solid #fff',
                        color: '#fff'
                    }}/>
                <input type="email" placeholder="Correo" formControlName="username"
                    style={{
                        padding:'10px 20px',
                        marginBottom:'1em',
                        background: 'none',
                        borderRadius: '7px',
                        borderBottom:'1px solid #fff',
                        color: '#fff'
                    }}/>
                <textarea placeholder="Deja tu mensaje aquí..." formControlName="complaint"
                    style={{
                        height:'150px',
                        background: 'none',
                        color: '#fff',
                        padding: '1em',
                        border: '1px solid #fff',
                        borderRadius: '7px',
                    }}/>
                <button type="submit" className="btn-submit" 
                    style={{
                        padding:'10px 20px',
                        margin:'1em',
                        border: 'none',
                        textTransform: 'uppercase',
                        backgroundColor: '#344955',
                        borderRadius: '20px',
                        cursor: 'pointer',
                        boxShadow: '1px 3px 11px -5px rgb(255, 255, 255, .5)',
                        transition: 'background-color 0.3s, box-shadow 0.3s',
                        color:'#fff'
                    }}>
                  Enviar mensaje
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Pie de Página */}
      <footer style={{ position: 'static', bottom: 0, width: '100%', backgroundColor: '#35374B' }}>
            <div className="container-fluid">
              <div className="row p-5 pb-2  text-white">
                <div className="col-xs-12 col-md-6 col-lg-3">
                  <p className="h3">Gestión de Usuarios</p>                  
                </div>
                <div className="col-xs-12 col-md-6 col-lg-3">
                  <p className="h5 mb-3">Contactos</p>
                  <div className="mb-2">
                    <a className='text-success text-decoration-none' href="#!">Facebook</a>
                  </div>
                  <div className="mb-2">
                    <a className='text-success text-decoration-none' href="#!">GitHub</a>
                  </div>
                  <div className="mb-2">
                    <a className='text-success text-decoration-none' href="#!">Gmail</a>
                  </div>
                </div>

                <div className="col-xs-12 col-md-6 col-lg-3">
                  <p className="h5">Enlaces</p>
                  <div className="mb-2">
                    <a className='text-success text-decoration-none' href="#!">Terms & Conditions</a>
                  </div>
                  <div className="mb-2">
                    <a className='text-success text-decoration-none' href="#!">Private Policy</a>
                  </div>
                </div>
                <div className="col-xs-12 col-md-6 col-lg-3">
                  <p className="h5">Acerca De</p>
                  <div className="mb-2">
                    <a className='text-success text-decoration-none' href="#!">Documentos</a>
                  </div>
                </div>
                <div className="col-xs-12 pt-4">
                  <p className='text-white text-center'> © 2024 Copyright: Todos los Derechos Reservados a Gestión de Usuarios</p>
                </div>
              </div>
            </div>
          </footer>  
    </div>
  );
}

export default ContactPage;
