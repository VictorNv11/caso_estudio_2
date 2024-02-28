
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BsSearch } from "react-icons/bs";
import Cookies from 'js-cookie';
import Logo from '..//..//assets/img/planetas.png'
import { AiTwotoneBell } from 'react-icons/ai';
import { Dropdown } from 'react-bootstrap';
import { AiOutlineAppstore } from 'react-icons/ai';
import { Servicios } from '../Clientes/Servicios';
import { FaTools } from "react-icons/fa";

import Notification from '../Notifications/Notifications';



const ShowSupAdmin = () => {
  const [Users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const endpoint = 'http://localhost:8000/api';
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  

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

  const searcher = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (Cookies.get("token") === undefined) {
      window.location.href = "/";
    }
    showData();
  }, []);

  const confirmDelete = (id) => {
    setUserIdToDelete(id);
  };

  const cancelDelete = () => {
    setUserIdToDelete(null);
  };


  const deleteUsers = async (id) => {
    if (userIdToDelete && userIdToDelete.id === id) {
    try {
      const token = Cookies.get("token");
      await axios.delete(`${endpoint}/User/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      showData();
      alert('Usuario eliminado con éxito');
      setUserIdToDelete(null); // Limpia el registro del cliente después de ser eliminado
    } catch (error) {
      console.error('Error deleting Usuraio:', error);
    }
  }
  };

  const notifySuperAdmin = async () => {
    try {
      const token = Cookies.get("token");
      await axios.post(`${endpoint}/notifications/send`, {
        // Puedes pasar cualquier dato adicional necesario para la notificación
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setNotifications([...notifications, {/* datos de la notificación */}]); // Actualiza el estado de las notificaciones
      console.log('Notificación enviada al Super Administrador');
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  // Manejador de eventos para mostrar/ocultar las notificaciones
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };
  const filteredUsers = search
    ? Users.filter((users) =>
        users.email.toLowerCase().includes(search.toLowerCase()) ||
        (users.telefono && users.telefono.toString().includes(search.toString()))
      )
    : Users;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const salir = () => {
    Cookies.remove("token")
    window.location.href = "/";
  }

  const [totalNotifications, setTotalNotifications] = useState(0);

const fetchTotalNotifications = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/notifications');
    setTotalNotifications(response.data.totalNotifications);
  } catch (error) {
    console.error('Error fetching total notifications:', error);
  }
};

useEffect(() => {
  fetchTotalNotifications();
}, []);


  return (
    <div>
    <nav className="navbar navbar-expand-lg " style={{ backgroundColor: "#0E0B16 ", borderRadius: 5 }}>
    <a className="navbar-brand" href="#">
          <img src={Logo} alt="Logo" title='Logo de la Pagina' style={{ paddingLeft: 20, width: 50, height: 30 }} />
        </a>
      <a className="navbar-brand" href="#" style={{ paddingLeft: 20, color: "#E7DFDD" }}>Super Administrador </a>
      <div className='ml-auto' style={{paddingRight:10, fontSize:'25px'}} onClick={toggleNotifications}>
          <AiTwotoneBell style={{color: notifications.length > 0 ? 'red' : 'white'}} />
          {totalNotifications > 0 && <span className="badge badge-danger">{totalNotifications}</span>}
        </div>
        <Dropdown>
      <Dropdown.Toggle variant="dark" id="dropdown-basic">
      <AiOutlineAppstore style={{ marginRight: '0.5em' }} /> {/* Ajusta el estilo según tus necesidades */}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {/* Agrega aquí los enlaces o componentes relacionados con los servicios */}
        <Dropdown.Item href="/lista"><FaTools /> Servicios</Dropdown.Item>
        <Dropdown.Item href="#"></Dropdown.Item>
        {/* ... */}
      </Dropdown.Menu>
    </Dropdown>
      <div className="ms-auto" style={{ paddingRight: 30 }}>
        <button onClick={salir} className='btn btn-dark'>Salir</button>
      </div>
    </nav>
    {/* Mostrar el componente de notificaciones si showNotifications es true */}
    {showNotifications && <Notification notifications={notifications} />}
    <div style={{ marginTop: '5%' }}>
      <h1 className='text-center' style={{color:'#E7DFDD'}}>Listado de Super Administradores</h1>
    </div>
    <div style={{ marginLeft: '4%', marginTop: '2%' }}>
      <input value={search} style={{ borderRadius: 5 }} onChange={searcher} type='text' placeholder='buscar por Email' className='form'></input><BsSearch style={{ marginLeft: 5, color: 'white' }} />
      <Link className='btn btn-success btn-sm' to={'/Clientes'} style={{ marginLeft: '65.5%' }}>importar</Link>{' '}
      <Link to='/create' className='btn btn-dark btn-sm'>Crear</Link>{' '}

    </div>
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    <a className="navbar-brand" href="#" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <img src={Logo} alt="Logo" title='Logo de la Pagina' style={{ width: 70, height: 60 }} />
</a>
<div style={{ flex: 1, boxSizing: 'border-box', paddingBottom: '60px' }}>
      <table className='table table-striped  container' style={{ marginTop: '2%', border: '1px solid black', borderRadius: 5 }}>
        <thead className='bg-dark text-white'>
          <tr>
            <th>Nombre</th>
            <th>email</th>
            <th>Documento</th>
            <th>Telefono</th>
            <th>rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            currentUsers.map(users => (
              <tr key={users._id}>
                <td>{users.name}</td>
                <td>{users.email}</td>
                <td>{users.documento}</td>
                <td>{users.telefono}</td>
                <td>{users.roles}</td>
                <td>
                  <Link className='btn btn-primary btn-sm' to={`/edit/${users.id}`}>Editar</Link>{' '}
                  <button className='btn btn-danger btn-sm' onClick={() => confirmDelete(users)}>Eliminar</button>
                  {userIdToDelete && (
                  <div className="modal fade show " style={{ display: 'block' }}>
                    <div className="modal-dialog">
                      <div className="modal-content bg-dark">
                        <div className="modal-header">
                          <h5 className="modal-title text-white">Confirmar eliminación</h5>
                          
                        </div>
                        <div className="modal-body text-white">
                          <p>¿Estás seguro de que deseas eliminar este usuario?</p>
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-dark border border-primary border-2" onClick={cancelDelete}>Cancelar</button>
                          <button type="button" className="btn btn-danger border border-white border-2" onClick={() => deleteUsers(userIdToDelete.id)}>Eliminar</button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
     
      <footer>
        <div style={{ marginLeft: '46.5%', marginTop: 'auto' }}>
          <ul className="pagination">
            <li className="page-item" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
              <a className="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            {Array.from({ length: Math.ceil(filteredUsers.length / itemsPerPage) }, (_, index) => (
              <li key={index + 1} className={`page-item ${currentPage === index + 1 && 'active'}`}>
              <a className="page-link" href="#" onClick={() => paginate(index + 1)}>
                {index + 1}
              </a>
            </li>
            ))}
            <li className="page-item" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil(Users.length / itemsPerPage)}>
              <a className="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
     </div>
    <footer className="fixed-bottom" style={{ backgroundColor: '#0E0B16', zIndex: 1 }}>
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
  )
}

export default ShowSupAdmin