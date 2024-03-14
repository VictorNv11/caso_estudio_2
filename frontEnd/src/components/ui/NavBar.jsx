import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TfiMenuAlt } from "react-icons/tfi";
import { Navbar, Container, Nav, Button, Offcanvas, NavDropdown, Modal, ListGroup  } from 'react-bootstrap';
import Logo from '..//..//assets/img/planetas.png';
import Cookies from 'js-cookie';
import { AiTwotoneBell } from 'react-icons/ai';
import axios from 'axios';
import Echo from 'laravel-echo';
import { Pusher } from 'pusher-js';


const NavBar = () => {
    
  const [navBarVisible, setNavBarVisible] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [username, setUsername] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null); 
  const [newNotificationsCount, setNewNotificationsCount] = useState(0);
  const navigate = useNavigate(); // Importa useNavigate
  



  useEffect(() => {
    const token = Cookies.get("token");
    const role = Cookies.get("role"); // Obtener el rol de las cookies
    const storedUsername = localStorage.getItem('username'); 
    if (token && role) {
        setUserRole(parseInt(role)); 
        setUsername(storedUsername);
    }
}, []);


   const toggleNavBar = () => {
    setNavBarVisible(!navBarVisible);
  };

  
 
  const [totalNotifications, setTotalNotifications] = useState(0);

const fetchTotalNotifications = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/notifications');
    const total = response.data.totalNotifications;
    setNewNotificationsCount(total);
  } catch (error) {
    console.error('Error fetching total notifications:', error);
  }
};

useEffect(() => {
  fetchTotalNotifications();
}, []);

useEffect(() => {
  const fetchNotifications = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/notifications');
      setNotifications(response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };
  fetchNotifications();
}, []);

const toggleNotifications = () => {
  setShowNotifications(!showNotifications);
  setNewNotificationsCount(0);
};

const handleNotificationClick = (notificationId) => {
  const selected = notifications.find(notification => notification.id === notificationId);
  setSelectedNotification(selected); // Almacena la notificación seleccionada
  setShowNotifications(false);
  navigate('/notifications');
};

const handleCloseNotifications = () => {
  setShowNotifications(false);
  setNewNotificationsCount(0); 
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
        <div className='ml-auto' style={{paddingRight:10, fontSize:'25px', transform: 'translateY(-10%)'}} onClick={toggleNotifications}>
          <AiTwotoneBell style={{color: newNotificationsCount > 0 ? 'red' : '#50727B'}} />
          <Modal show={showNotifications} onHide={handleCloseNotifications}>
              <Modal.Header closeButton>
                <Modal.Title>Notificaciones</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <ListGroup>
                {notifications.map(notification => (
                  <ListGroup.Item key={notification.id} onClick={() => handleNotificationClick(notification.id)}>
                    {notification.type === 'App\\Notifications\\NewUserRegisteredNotification' ? '¡Nuevo usuario registrado!' : 'Otro tipo de notificación'}
                  </ListGroup.Item>
                ))}
              </ListGroup>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseNotifications}>
                  Cerrar
                </Button>
              </Modal.Footer>
            </Modal>
          {newNotificationsCount > 0 && <span className="badge badge-danger">{newNotificationsCount}</span>} 
        </div>
        <Navbar.Toggle aria-controls="offcanvasNavbar" />
        <Navbar.Collapse id="offcanvasNavbar">
          <Offcanvas placement="end" show={navBarVisible} onHide={() => setNavBarVisible(false)} >
            <Offcanvas.Header style={{   backgroundColor: '#344955', color: '#fff'}} >
              <button type="button" className="btn-close btn-close-white" style={{ color: '#fff', position: 'absolute', top: '10px', right: '10px' }} onClick={() => setNavBarVisible(false)}></button>
              <div style={{ position: 'relative', marginTop: '30px' }}>
               <img src={Logo} alt="Logo" title='Logo de la Pagina' style={{ position: 'absolute', top: '-30px', left: '50%', transform: 'translateX(-50%)', width: 50, height: 50 }} />
               <Offcanvas.Title style={{ marginTop: '20px', color: '#fff' }}>{userRole === '1' ? 'Super Administrador' : userRole === '2' ? 'Administrador' : `${username}`}</Offcanvas.Title>
              </div>
            </Offcanvas.Header>
            <Offcanvas.Body style={{   backgroundColor: '#344955'}}>
              <Nav className="justify-content-end flex-grow-1 pe-3">
               {userRole === 1 && (
                  <div>
                    <Nav.Link><Link to={'/HomePageSuperAdmin'} className="nav-link active" style={{ color: '#fff' }}><i className="fas fa-home"></i> Inicio</Link> </Nav.Link>
                    <Nav.Link><Link to={'/supAdmins'} className="nav-link" style={{ color: '#fff' }}><i className="fas fa-user"></i> Usuarios</Link> </Nav.Link>
                    
                      <Nav className="justify-content-end flex-grow-1 pe-3">
                        <NavDropdown title={<span style={{ color: '#fff' }}><i className="fas fa-building"></i> Compañía</span>} id="nav-dropdown">
                          <NavDropdown.Item><Link to={'/formCompany'} className="nav-link">Crear compañia</Link></NavDropdown.Item>
                          <NavDropdown.Item><Link to={'/ShowCompanies'} className="nav-link">Ver compañias</Link></NavDropdown.Item>                          
                        </NavDropdown>
                      </Nav>
                      <Nav.Link><Link to={'/notifications'} className="nav-link" style={{ color: '#fff' }}><i className="fas fa-bell"></i> Notificaciones</Link> </Nav.Link>
               
                  </div>
               )}
               {userRole === 2 && (
                  <>
                    <Nav.Link><Link to={'/Admin'} className="nav-link active" style={{ color: '#fff' }}><i className="fas fa-home"></i> Inicio</Link> </Nav.Link>
                    <Nav.Link><Link to={'/userProfile'} className="nav-link" style={{ color: '#fff' }}><i className="fas fa-user"></i> Perfil</Link> </Nav.Link>
                    <Nav.Link><Link to={'/notifications'} className="nav-link" style={{ color: '#fff' }}><i className="fas fa-bell"></i> Notificaciones</Link> </Nav.Link>
                  </>

               )}
               {userRole === 3 && (
                  <>
                    <Nav.Link><Link to={'/HomePageUsuario'} className="nav-link active" style={{ color: '#fff' }}><i className="fas fa-home"></i> Inicio</Link> </Nav.Link>
                    <Nav.Link><Link to={'/userProfile'} className="nav-link" style={{ color: '#fff' }}><i className="fas fa-user"></i> Perfil</Link> </Nav.Link>
                    <Nav.Link><Link to={'/formCompany'} className="nav-link" style={{ color: '#fff' }}><i className="fas fa-building"></i> Compañía</Link> </Nav.Link>
                    <Nav.Link><Link to={'/notifications'} className="nav-link" style={{ color: '#fff' }}><i className="fas fa-bell"></i> Notificaciones</Link> </Nav.Link>                  
                  </>
               )}
               <NavDropdown 
                  title={<span style={{ color: '#fff' }}><i className="fas fa-user-circle"></i> Usuario</span>} 
                  id="offcanvasNavbarDropdown"
                  > 
                  <li><a className="dropdown-item" href="#"><img src="https://via.placeholder.com/30" alt="Profile" style={{
                        width: '30px',
                        height: '30px',
                        borderRadius: '50%',
                        marginRight: '10px', 
                    }} />  {username} {/* Mostrar el nombre de usuario */}</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <button className="dropdown-item" onClick={salir} style={{color: '#fff', backgroundColor: '#50727B'}}><i className="fas fa-sign-out-alt"></i> Salir</button>
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
