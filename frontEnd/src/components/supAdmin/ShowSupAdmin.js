
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { BsSearch } from "react-icons/bs";
import Cookies from 'js-cookie';
import Logo from '..//..//assets/img/planetas.png'
import { Navbar, Nav, Dropdown, Button } from 'react-bootstrap';
import { BsList } from 'react-icons/bs';



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
    console.log(Cookies.get("token"))
    if (Cookies.get("token")===undefined) {
       window.location.href = "/";
    }
    showData();
  }, [currentPage]);

  const deleteSupAdmin = async (id) => {
    try {
      await axios.delete(`${endpoint}/supAdmin/${id}`);
      showData();
      alert('Super Administrador eliminado con éxito');
    } catch (error) {
      console.error('Error deleting Super Admin:', error);
    }
  };

  const filteredSupAdmins = search
    ? supAdmins.filter((supAdmin) =>
        supAdmin.email.toLowerCase().includes(search.toLowerCase())
      )
    : supAdmins

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentAdmins = filteredSupAdmins.slice(indexOfFirstItem, indexOfLastItem);

    const salir =() =>{
      console.log("Entro")
      Cookies.remove("token")
      window.location.href = "/";
    }

  return (
    <div>
              <Navbar className="navbar navbar-expand-lg " style={{ backgroundColor: "#0E0B16 ", borderRadius: 5 }}>
        <a className="navbar-brand" href="#">
          <img src={Logo} alt="Logo" title='Logo de la Pagina' style={{ paddingLeft: 20, width: 50, height: 30 }} />
        </a>

        <a className="navbar-brand" href="#" style={{ paddingLeft: 20, color: "#E7DFDD" }}>Super Administrador </a>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
           
            {/* Menú desplegable */}
            <Dropdown>
              <Dropdown.Toggle variant="dark" id="dropdown-basic">
              <BsList size={20} /> {/* Utiliza el icono BsList */}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="/supAdmins">Super Administrador</Dropdown.Item>
                <Dropdown.Item href="/Admin">Administradores</Dropdown.Item>
                <Dropdown.Item href="/usuarios">Usuarios</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </ul>
        </div>

        <div className="ml-auto" style={{ paddingRight: 30 }}>
          <button onClick={salir} className='btn btn-dark'>Salir</button>
        </div>
      </Navbar>

        <div style={{marginTop:'5%'}}>
          <h1 className='text-center'  style={{color:"#E7DFDD"}}>Listado de Super Administradores</h1>  
        </div>
            <div style={{marginLeft:'4%', marginTop:'2%'}}>
              <input value={search} style={{borderRadius:5}} onChange={searcher} type='text' placeholder='buscar por Email' className='form'></input><BsSearch style={{ marginLeft: 5, color: 'white' }} />
              <Link to='/create' className='btn btn-dark btn-sm' style={{marginLeft:'71%'}}>Crear</Link>{' '}
            </div>
       <div>
        <table className='table table-striped  container' style={{marginTop:'2%',border: '1px solid black', borderRadius:5}}>
            <thead className='bg-dark text-white'>
                <tr>
                    <th>Nombre</th>
                    <th>email</th>
                    <th>Telefono</th>
                    <th>rol</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
            {
              currentAdmins.map(supAdmin => (
                      <tr key={supAdmin._id}>
                          <td>{supAdmin.name}</td>
                          <td>{supAdmin.email}</td>
                          <td>{supAdmin.phone}</td>
                          <td>{supAdmin.rol}</td>
                          <td>
                              <Link className='btn btn-primary btn-sm' to={`/edit/${supAdmin.id}`}>Editar</Link>{' '}
                              <button className='btn btn-danger btn-sm' onClick={() => deleteSupAdmin(supAdmin.id)}>Eliminar</button>
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
              {Array.from({ length: Math.ceil(supAdmins.length / itemsPerPage) }, (_, index) => (
                <li className={`page-item ${currentPage === index + 1 && 'active'}`} key={index + 1} onClick={() => setCurrentPage(index + 1)}>
                  <a className="page-link" href="#">
                    {index + 1}
                  </a>
                </li>
              ))}
              <li className="page-item" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil(supAdmins.length / itemsPerPage)}>
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