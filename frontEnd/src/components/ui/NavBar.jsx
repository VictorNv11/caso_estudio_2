import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TfiMenuAlt } from "react-icons/tfi";
import { Navbar, Container, Nav, Button, Offcanvas, NavDropdown } from 'react-bootstrap';
import Logo from '..//..//assets/img/planetas.png';
import Cookies from 'js-cookie';



const NavBar = () => {
    
  const [navBarVisible, setNavBarVisible] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const token = Cookies.get("token");
    const role = Cookies.get("role"); // Obtener el rol de las cookies
    if (token && role) {
        setUserRole(parseInt(role)); 
    }
}, []);



   const toggleNavBar = () => {
    setNavBarVisible(!navBarVisible);
  };

  const salir = () => {
    Cookies.remove("token")
    window.location.href = "/";
  }

  return (
    <div style={{backgroundColor: '#50727B'}}>   
    <Navbar expand="lg" className="bg-body-tertiary mb-3" >
      <Container fluid>
        <Navbar.Brand href="#" >Gestión de Usuarios</Navbar.Brand>
        <Button onClick={toggleNavBar} style={{ position: 'absolute', zIndex: 101, top: '20px', right: '20px', transform: 'translateY(-30%)', backgroundColor: '#50727B' }}>
          <TfiMenuAlt />
        </Button> 
        <Navbar.Toggle aria-controls="offcanvasNavbar" />
        <Navbar.Collapse id="offcanvasNavbar">
          <Offcanvas placement="end" show={navBarVisible} onHide={() => setNavBarVisible(false)} >
            <Offcanvas.Header style={{   backgroundColor: '#344955', color: '#fff'}} >
              <button type="button" className="btn-close btn-close-white" style={{ position: 'absolute', top: '10px', right: '10px' }} onClick={() => setNavBarVisible(false)}></button>
              <div style={{ position: 'relative', marginTop: '30px' }}>
               <img src={Logo} alt="Logo" title='Logo de la Pagina' style={{ position: 'absolute', top: '-30px', left: '50%', transform: 'translateX(-50%)', width: 50, height: 50 }} />
               <Offcanvas.Title style={{ marginTop: '20px', color: '#fff' }}>{userRole === '1' ? 'Super Administrador' : userRole === '2' ? 'Administrador' : 'Usuario'}</Offcanvas.Title>
              </div>
            </Offcanvas.Header>
            <Offcanvas.Body style={{   backgroundColor: '#344955'}}>
              <Nav className="justify-content-end flex-grow-1 pe-3">
               {userRole === 1 && (
                  <div>
                    <Nav.Link><Link to={'/HomePageSuperAdmin'} className="nav-link active" style={{ color: '#fff' }}><i className="fas fa-home"></i> Inicio</Link> </Nav.Link>
                    <Nav.Link><Link to={'/supAdmins'} className="nav-link" style={{ color: '#fff' }}><i className="fas fa-user"></i> Usuarios</Link> </Nav.Link>
                   

                    <Nav.Link><Link to={'/servicios'} className="nav-link" style={{ color: '#fff' }}><i class="fa-solid fa-list-check"></i> Crear Tarea</Link> </Nav.Link>
                    
                      <Nav className="justify-content-end flex-grow-1 pe-3">
                        <NavDropdown title={<span style={{ color: '#fff' }}><i className="fas fa-building"></i> Compañía</span>} id="nav-dropdown">
                        <NavDropdown.Item><Link to={'/formCompany'} className="nav-link"><i className="fa-solid fa-plus" style={{ marginRight: '5px' }}></i>Crear compañía</Link></NavDropdown.Item>                          
                          <NavDropdown.Item><Link to={'/ShowCompanies'} className="nav-link"><i class="fa-regular fa-eye"></i>Ver compañias</Link></NavDropdown.Item>                          
                        </NavDropdown>
                      </Nav>
               
                  </div>
               )}
               {userRole === 2 && (
                  <>
                    <Nav.Link><Link to={'/Admin'} className="nav-link active" style={{ color: '#fff' }}><i className="fas fa-home"></i> Inicio</Link> </Nav.Link>
                    <Nav.Link><Link to={'/userProfile'} className="nav-link" style={{ color: '#fff' }}><i className="fas fa-user"></i> Perfil</Link> </Nav.Link>
                  </>
               )}
               {userRole === 3 && (
                  <>
                    <Nav.Link><Link to={'/HomePageUsuario'} className="nav-link active" style={{ color: '#fff' }}><i className="fas fa-home"></i> Inicio</Link> </Nav.Link>
                    <Nav.Link><Link to={'/userProfile'} className="nav-link" style={{ color: '#fff' }}><i className="fas fa-user"></i> Perfil</Link> </Nav.Link>
                    <Nav.Link><Link to={'/formCompany'} className="nav-link" style={{ color: '#fff' }}><i className="fas fa-building"></i> Compañía</Link> </Nav.Link>
                  </>
               )}
               <NavDropdown 
                  title={<span style={{ color: '#fff' }}><i className="fas fa-user-circle"></i> Usuario</span>} 
                  id="offcanvasNavbarDropdown"> 
                  <li><a className="dropdown-item" href="#"><img src="https://via.placeholder.com/30" alt="Profile" style={{
                        width: '30px',
                        height: '30px',
                        borderRadius: '50%',
                        marginRight: '10px'
                    }} /> Nombre de Usuario</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <button className="dropdown-item" onClick={salir}><i className="fas fa-sign-out-alt"></i> Salir</button>
               </NavDropdown>  
              </Nav>
            </Offcanvas.Body>
          </Offcanvas>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </div>
  );
};

export default NavBar;
