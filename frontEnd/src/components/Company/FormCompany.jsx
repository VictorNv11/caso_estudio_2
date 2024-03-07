import React, { useState } from 'react';
import GenericForm from '../Formulario/FormularioGenerico';
import axios from "axios";
import { Link } from 'react-router-dom';
import { TfiMenuAlt } from "react-icons/tfi";
import { Navbar, Container, Nav, Button, Offcanvas, NavDropdown } from 'react-bootstrap';
import Logo from '..//..//assets/img/planetas.png';

const FormCompany = () => {
    
   const [navBarVisible, setNavBarVisible] = useState(false);

   const toggleNavBar = () => {
    setNavBarVisible(!navBarVisible);
  };

   const endpoint = 'http://localhost:8000/api'; 

   const handleSubmit = async (formData) => {
    try {
      const formDataWithStatus = { ...formData, status: false };
  
      const formDataWithFile = new FormData();
      Object.keys(formDataWithStatus).forEach((key) => {
        formDataWithFile.append(key, formDataWithStatus[key]);
      });
  
      const response = await axios.post(`${endpoint}/companies/create`, formDataWithFile);
  
      if (response.status !== 201) {
        throw new Error('Error al crear la compañía');
      }
      
      console.log('Respuesta del backend:', response.data);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const initialFormFields = {
    name_company: '',
    address: '',
    nit: '',
    phone:'',
    email:'',
    document:null
  };

  return (
    <div style={{backgroundColor: '#50727B'}}>
       
      
       
      <Navbar expand="lg" className="bg-body-tertiary mb-3">
        <Container fluid>
        <Navbar.Brand href="#">Gestión de Usuarios</Navbar.Brand>
        <Button onClick={toggleNavBar} style={{ position: 'absolute', zIndex: 101, top: '20px', right: '20px', transform: 'translateY(-30%)', backgroundColor: '#50727B' }}>
        <TfiMenuAlt />
        </Button> 
          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Navbar.Collapse id="offcanvasNavbar">
            <Offcanvas placement="end" show={navBarVisible} onHide={() => setNavBarVisible(false)} >
              <Offcanvas.Header  style={{   backgroundColor: '#344955', color: '#fff'}}  >
              <button type="button" className="btn-close btn-close-white" style={{ color: '#fff', position: 'absolute', top: '10px', right: '10px' }} onClick={() => setNavBarVisible(false)}></button>
                <div style={{ position: 'relative', marginTop: '30px' }}>
                    <img src={Logo} alt="Logo" title='Logo de la Pagina' style={{ position: 'absolute', top: '-30px', left: '50%', transform: 'translateX(-50%)', width: 50, height: 50 }} />
                    <Offcanvas.Title style={{ marginTop: '20px', color: '#fff'  }}>Super Administrador</Offcanvas.Title>
                </div>
              </Offcanvas.Header>
              <Offcanvas.Body  style={{   backgroundColor: '#344955'}}>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link><Link to={'/homePageSuperAdmin'} className="nav-link active" style={{ color: '#fff' }}><i className="fas fa-home"></i> Inicio</Link> </Nav.Link>
                  <Nav.Link><Link to={'/supAdmins'} className="nav-link" style={{ color: '#fff' }}><i className="fas fa-user"></i> Usuarios</Link> </Nav.Link>
                  <Nav.Link><Link to={'/calendar'} className="nav-link" style={{ color: '#fff' }}><i className="fas fa-calendar-alt"></i> Calendario</Link> </Nav.Link>
                  <Nav.Link><Link to={'/services'} className="nav-link" style={{ color: '#fff' }}><i className="fas fa-tools"></i> Servicios</Link> </Nav.Link>
                  <Nav.Link><Link to={'/roles'} className="nav-link" style={{ color: '#fff' }}><i className="fas fa-users"></i> Roles</Link> </Nav.Link>
                  <Nav.Link><Link to={'/companies'} className="nav-link" style={{ color: '#fff' }}><i className="fas fa-users"></i> Compañía</Link> </Nav.Link>
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
                      {/* <button className="dropdown-item" onClick={salir}><i className="fas fa-sign-out-alt"></i> Salir</button> */}
                  </NavDropdown>  
                </Nav>
              </Offcanvas.Body>
            </Offcanvas>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
      
      <GenericForm 
        fields={initialFormFields} 
        onSubmit={handleSubmit} 
        title="Creación de Compañías" 
        buttonText="Solicitar Creación" 
        />
    </div>
  );
};

export default FormCompany;
