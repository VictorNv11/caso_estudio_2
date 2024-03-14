
import axios from 'axios';
import Cookies from 'js-cookie';
import NavBar from '../ui/NavBar';
import Footer from '../ui/Footer';
import { Link } from 'react-router-dom';
import { BsSearch } from "react-icons/bs";
import Logo from '..//..//assets/img/planetas.png'
import React, { useEffect, useState } from 'react';
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
    else {
      // Verifica el rol del usuario antes de mostrar la página de superadmin
      const userRole = Cookies.get("role");
      if (userRole !== "1") {
        // Si el usuario no es un superadministrador, redirige a la página adecuada
        window.location.href = "/"; // Cambia esto a la página a la que deberían redirigir los usuarios normales
      } else {
        showData();
      }
    }
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


  const validateSearch = (searchInput) => {
   
    if (!isNaN(searchInput) && searchInput.toString().length === 10) {
      return true;
    }
    
    if (typeof searchInput === 'string' && searchInput.trim() !== '') {
      return true;
    }
    return false;
  };
  
  // Función de búsqueda
  const handleSearch = (event) => {
    const value = event.target.value;
    // Validar el campo de búsqueda
    if (validateSearch(value)) {
      setSearch(value);
    } else {
      setSearch('');
    }
  };
  
  // Filtro de usuarios
  const filteredUsers = search
    ? Users.filter((user) =>
        (user.name.toLowerCase().includes(search.toLowerCase()) ||
        (user.telefono && user.telefono.toString().includes(search.toString())))
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
  <div style={{ backgroundColor: '#50727B',display:'flex',flexDirection:'column',justifyContent:'space-between', minHeight: '100vh'}}>
    <div >
     <NavBar />
    {/* Mostrar el componente de notificaciones si showNotifications es true */}
    {showNotifications && <Notification notifications={notifications} />}
    <div style={{ marginTop: '5%' }}>
      <h1 className='text-center' style={{color:'white'}}>Listado de Usuarios</h1>
    </div>

    <div style={{ marginLeft: '4%', marginTop: '2%' }}>
      <input value={search} style={{ borderRadius: 5 }} onChange={handleSearch} type='text' placeholder='Buscar Nombre o Teléfono' className='form'></input>
      <BsSearch style={{ marginLeft: 5, color: 'white' }} />
      <Link className='btn btn-success btn-sm' to={'/Clientes'} style={{ marginLeft: '65.5%' }}>Importar</Link>{' '}
      <Link to='/create' className='btn btn-sm' style={{backgroundColor:'#78A083', color:'white'}}>Crear</Link>{' '}
    </div>


    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <a className="navbar-brand" href="#" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img src={Logo} alt="Logo" title='Logo de la Pagina' style={{ width: 70, height: 60 }} />
      </a>
      <div style={{   }}>
        <table className='table table-striped  container' style={{ marginTop: '2%', border:'1px solid black', backgroundColor: 'white'  }}>
          <thead className='contetn'>
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
                            <button type="button" className="btn btn-danger border " onClick={() => deleteUsers(userIdToDelete.id)}>Eliminar</button>
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
      
        <section>
          <div style={{ marginLeft: '46.5%', marginTop: 'auto' }}>
            <ul className="pagination">
              <li className="page-item" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                <a className="page-link " href="#" aria-label="Previous">
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
        </section>
        

      </div>
    </div>


    </div>

    <Footer/>

  </div>
  )
}

export default ShowSupAdmin