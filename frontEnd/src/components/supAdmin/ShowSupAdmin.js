
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { BsSearch } from "react-icons/bs";
import Cookies from 'js-cookie';
import Logo from '..//..//assets/img/planetas.png'
import { Navbar, Nav, Dropdown, Button } from 'react-bootstrap';
import { BsList } from 'react-icons/bs';
import { AiTwotoneBell } from 'react-icons/ai';


const endpoint = 'http://localhost:8000/api';

const ShowSupAdmin = () => {
  const [supAdmins, setSupAdmins] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  



  const showData = async () => {
    try {
      const response = await axios.get(`${endpoint}/supAdmins`);
      setSupAdmins(response.data);
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
    console.log(Cookies.get("token"))
    if (Cookies.get("token")===undefined) {
       window.location.href = "/";
    }
    showData();
  }, [currentPage]);

  const deleteUsers = async (id) => {
    try {
      const token = Cookies.get("token");
      await axios.delete(`${endpoint}/User/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      showData();
      alert('Usuario eliminado con éxito');
    } catch (error) {
      console.error('Error deleting Usuraio:', error);
    }
  };

  const filteredUsers = search
  ? supAdmins.filter((admin) =>
      admin.email.toLowerCase().includes(search.toLowerCase())
    )
  : supAdmins;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAdmins = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  const salir = () => {
    Cookies.remove("token")
    window.location.href = "/";
  }

  return (
    <div>
    <nav className="navbar navbar-expand-lg " style={{ backgroundColor: "#0E0B16 " }}>
      <a className="navbar-brand" href="#" style={{ paddingLeft: 20, color: "#E7DFDD" }}>Super Administrador </a>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item active" style={{ paddingRight: 20 }}>
            <Link to='/supAdmins' className='nav-link' style={{ color: "#E7DFDD" }}>Super Administrador</Link>
          </li>
          <li className="nav-item active" style={{ paddingRight: 20 }}>
            <Link to='/Admin' className='nav-link' style={{ color: "#E7DFDD" }}>Administradores</Link>
          </li>
          <li className="nav-item active" style={{ paddingRight: 20 }}>
            <Link to='/usuarios' className='nav-link disabled' style={{ color: "#E7DFDD" }}>Usuarios</Link>
          </li>
        </ul>
      </div>
      <div className="ml-auto" style={{ paddingRight: 30 }}>
        <button onClick={salir} className='btn btn-light'>Salir</button>
      </div>
    </nav>
    <div style={{ marginTop: '5%' }}>
      <h1 className='text-center'>Listado de Super Administradores</h1>
    </div>
    <div style={{ marginLeft: '4%', marginTop: '2%' }}>
      <input value={search} style={{ borderRadius: 5 }} onChange={searcher} type='text' placeholder='buscar por Email' className='form'></input><BsSearch style={{ marginLeft: 5, color: 'white' }} />
      <Link className='btn btn-success btn-sm' to={'/Clientes'} style={{ marginLeft: '65.5%' }}>importar</Link>{' '}
      <Link to='/create' className='btn btn-dark btn-sm'>Crear</Link>{' '}
    </div>
    <div>
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
            currentAdmins.map(users => (
              <tr key={users._id}>
                <td>{users.name}</td>
                <td>{users.email}</td>
                <td>{users.documento}</td>
                <td>{users.telefono}</td>
                <td>{users.roles}</td>
                <td>
                  <Link className='btn btn-primary btn-sm' to={`/edit/${users.id}`}>Editar</Link>{' '}
                  <button className='btn btn-danger btn-sm' onClick={() => deleteUsers(users.id)}>Eliminar</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <footer>
        <div style={{ marginLeft: '44.5%', marginTop: 'auto' }}>
          <ul className="pagination">
            <li className="page-item" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
              <a className="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            {Array.from({ length: Math.ceil(Users.length / itemsPerPage) }, (_, index) => (
              <li className={`page-item ${currentPage === index + 1 && 'active'}`} key={index + 1} onClick={() => setCurrentPage(index + 1)}>
                <a className="page-link" href="#">
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
  )
}

export default ShowSupAdmin
