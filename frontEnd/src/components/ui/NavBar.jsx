  // Importa las bibliotecas necesarias y los estilos
  import React, { useEffect, useState } from 'react';
  import { Link, useNavigate } from 'react-router-dom';
  import { TfiMenuAlt } from "react-icons/tfi";
  import Logo from '..//..//assets/img/planetas.png';
  import Cookies from 'js-cookie';
  import { AiTwotoneBell } from 'react-icons/ai';
  import axios from 'axios';
  import Notifications from '../Notifications/Notifications';
  import { Navbar, Container, Nav, Button, Offcanvas, NavDropdown, Modal, ListGroup, OverlayTrigger, Tooltip } from 'react-bootstrap';
  import { FaUserCircle } from 'react-icons/fa';

  // Definir el componente NavBar
  const NavBar = () => {
      
    // Definir estados del componente
    const [navBarVisible, setNavBarVisible] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [username, setUsername] = useState('');
    const [notifications, setNotifications] = useState([]);
    const [showNotifications, setShowNotifications] = useState(false);
    const [selectedNotification, setSelectedNotification] = useState(null); 
    const [newNotificationsCount, setNewNotificationsCount] = useState(0);
    const navigate = useNavigate(); // Importa useNavigate
    const [profileImage, setProfileImage] = useState('');
    const [profileImagesVisible, setProfileImagesVisible] = useState(false); // Estado para controlar la visibilidad de las imágenes de perfil

    // Efecto para obtener el rol y el nombre del usuario
    useEffect(() => {
      const token = Cookies.get("token");
      const role = Cookies.get("role"); // Obtener el rol de las cookies
      const storedUsername = localStorage.getItem('username'); 
      if (token && role) {
          setUserRole(parseInt(role)); 
          setUsername(storedUsername);
      }
    }, []);

    // Función para alternar la visibilidad del menú desplegable
    const toggleNavBar = () => {
      setNavBarVisible(!navBarVisible);
    };

    // Estado para el número total de notificaciones
    const [totalNotifications, setTotalNotifications] = useState(0);

    // Función para obtener el número total de notificaciones
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

    // Efecto para obtener las notificaciones
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

    // Función para alternar la visibilidad de las notificaciones
    const toggleNotifications = () => {
      setShowNotifications(!showNotifications);
      setNewNotificationsCount(0);
    };

    // Función para manejar el clic en una notificación
    const handleNotificationClick = (notificationId) => {
      setSelectedNotification(notificationId); // Almacena la notificación seleccionada
      setShowNotifications(false);
      navigate(`/notifications`);
    };

    // Función para cerrar las notificaciones
    const handleCloseNotifications = () => {
      setShowNotifications(false);
      setNewNotificationsCount(0); 
    };

    // Función para cerrar sesión
    const salir = () => {
      Cookies.remove("token")
      window.location.href = "/";
    }

    // Función para alternar la visibilidad de las imágenes de perfil
    const toggleProfileImages = () => {
      setProfileImagesVisible(!profileImagesVisible);
    };

    // Función para manejar el cambio de imagen de perfil
    const handleProfileImageChange = (imageUrl) => {
      setProfileImage(imageUrl);
      setProfileImagesVisible(false);
      // Almacenar la URL de la imagen seleccionada en el localStorage
  localStorage.setItem('profileImage', imageUrl);
};

    // Función para mostrar las imágenes de perfil
const showProfileImages = () => {
  setProfileImagesVisible(true);
};

// Función para ocultar las imágenes de perfil
const hideProfileImages = () => {
  setProfileImagesVisible(false);
};

    // Definir las imágenes de perfil
    const profileImages = [
      require('../../assets/img/Usuario1.png'),
      require('../../assets/img/Usuario2.png'),
      require('../../assets/img/Usuario3.png'),
      require('../../assets/img/Usuario4.png'),
      // Agrega más URL de imágenes según sea necesario
    ];


    // Efecto para obtener la imagen de perfil almacenada en localStorage
useEffect(() => {
  const storedProfileImage = localStorage.getItem('profileImage');
  if (storedProfileImage) {
    setProfileImage(storedProfileImage);
  }
}, []);

// Aplicar los estilos CSS en el head del documento HTML
document.head.appendChild(document.createElement("style")).textContent = `
  @keyframes placeholderAnimation {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-5px);
    }
    100% {
      transform: translateY(0);
    }
  }
`;

    // Renderizar el componente NavBar
    return (
      <div style={{backgroundColor: '#50727B'}}>   
        <Navbar expand="lg" className="bg-body-tertiary mb-3" >
          <Container fluid>
            <Navbar.Brand href="#" >Gestión de Usuarios</Navbar.Brand>
            <Button onClick={toggleNavBar} style={{ position: 'absolute', zIndex: 101, top: '20px', right: '20px', transform: 'translateY(-30%)', backgroundColor: '#50727B' }}>
              <TfiMenuAlt />
            </Button> 
            <div className='ml-auto' style={{paddingRight:10, fontSize:'25px', transform: 'translateY(-10%)'}} onClick={toggleNotifications}>
              <OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip id="notifications-tooltip">Notificaciones ({newNotificationsCount})</Tooltip>}
                >
                  <div onClick={toggleNotifications}>
                    <AiTwotoneBell style={{color: newNotificationsCount > 0 ? 'red' : '#50727B'}} />
                  </div>
                </OverlayTrigger>
                <Modal show={showNotifications} onHide={handleCloseNotifications}>
                  <Modal.Header closeButton>
                    <Modal.Title>Notificaciones</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <ListGroup>
                      {notifications.map(notification => {
                        let message;
                        switch(notification.type) {
                          case 'App\\Notifications\\NewUserRegisteredNotification':
                            message = '¡Nuevo usuario registrado!👨‍💻';
                            break;
                          case 'App\\Notifications\\NewCompanyCreatedNotification':
                            message = '¡Solicitud de creación de compañía!🏢';
                            break;
                          // Agrega más casos según tus tipos de notificaciones
                          default:
                            message = 'Mensaje predeterminado';
                        }
                        return (
                          <ListGroup.Item key={notification.id} onClick={() => handleNotificationClick(notification.id)} >
                            {message}
                          </ListGroup.Item>
                        );
                      })}
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
                    <img src={Logo} alt="Logo" title='Logo de la Pagina' style={{ position: 'absolute', top: '-30px', left: '20%', transform: 'translateX(-50%)', width: 50, height: 50,  animation: 'placeholderAnimation 2s infinite' }} />
                    <Offcanvas.Title style={{ marginTop: '20px', color: '#fff' }}>{userRole === '1' ? 'Super Administrador' : userRole === '2' ? 'Administrador' : `${username}`}</Offcanvas.Title>
                  </div>
                </Offcanvas.Header>
                <Offcanvas.Body style={{   backgroundColor: '#344955'}}>
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    {userRole === 1 && (
                      <div>
                        <Nav.Link><Link to={'/HomePageSuperAdmin'} className="nav-link active" style={{ color: '#fff' }}><i className="fas fa-home"></i> Inicio</Link> </Nav.Link>
                        <Nav.Link><Link to={'/supAdmins'} className="nav-link" style={{ color: '#fff' }}><i className="fas fa-user"></i> Usuarios</Link> </Nav.Link>
                        <Nav.Link><Link to={'/servicios'} className="nav-link" style={{ color: '#fff' }}><i class="fa-solid fa-list-check"></i> Tareas</Link> </Nav.Link>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                          <NavDropdown title={<span style={{ color: '#fff' }}><i className="fas fa-building"></i> Compañía</span>} id="nav-dropdown">
                            <NavDropdown.Item><Link to={'/formCompany'} className="nav-link"><i class="fa-solid fa-plus"></i> Crear compañia</Link></NavDropdown.Item>
                            <NavDropdown.Item><Link to={'/ShowCompanies'} className="nav-link">  <i class="fa-regular fa-eye"></i> Ver compañias</Link></NavDropdown.Item>                          
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
                        <Nav.Link><Link to={'/showTask'} className="nav-link" style={{ color: '#fff' }}><i className="fas fa-user"></i> Ver tareas</Link> </Nav.Link>
                        <Nav.Link><Link to={'/notifications'} className="nav-link" style={{ color: '#fff' }}><i className="fas fa-bell"></i> Notificaciones</Link> </Nav.Link>                  
                      </>
                    )}
                  </Nav>
                  <NavDropdown 
                    title={
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img
                          src={profileImage || '../../assets/img/Usuario1.png'}
                          alt="Perfil"
                          style={{
                            width: '30px',
                            height: '30px',
                            borderRadius: '50%',
                            marginRight: '10px',
                            cursor: 'pointer' // Agregamos cursor pointer para indicar que es clickeable
                          }}
                          onClick={showProfileImages} // Mostrar las imágenes de perfil al hacer clic en la foto de perfil
                        />
                        <span style={{ color: '#fff' }}>{username}</span>
                      </div>
                    } 
                    id="offcanvasNavbarDropdown"
                    onMouseEnter={showProfileImages} // Mostrar las imágenes de perfil cuando el cursor entra en el área del desplegable
                    onMouseLeave={hideProfileImages} // Ocultar las imágenes de perfil cuando el cursor sale del área del desplegable
                  >
                    {profileImagesVisible && // Mostrar las imágenes de perfil solo si profileImagesVisible es true
                      profileImages.map((imageUrl, index) => (
                        <NavDropdown.Item key={index} onClick={() => handleProfileImageChange(imageUrl)}>
                          <img
                            src={imageUrl}
                            alt={`Imagen ${index + 1}`}
                            style={{
                              width: '30px',
                              height: '30px',
                              borderRadius: '50%',
                              marginRight: '10px',
                            }}
                          />
                          Elegir
                        </NavDropdown.Item>
                      ))
                    }
                    <li><hr className="dropdown-divider" /></li>
                    <NavDropdown.Item onClick={salir} style={{color: '#fff', backgroundColor: '#50727B'}}><i className="fas fa-sign-out-alt"></i> Salir</NavDropdown.Item>
                  </NavDropdown>  
                </Offcanvas.Body>
              </Offcanvas>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    );
  };

  // Exporta el componente NavBar
  export default NavBar;
