
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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

  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="#" style={{paddingLeft: 20}}>Super Administrador </a>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ml-auto">
              <li className="nav-item active" style={{paddingRight: 20}}>
                  <Link to='/supAdmins' className='nav-link'>Super Administrador</Link>
                </li>
                <li className="nav-item active" style={{paddingRight: 20}}>
                  <Link to='/Admin' className='nav-link'>Administradores</Link>
                </li>
                <li className="nav-item active" style={{paddingRight: 20}}>
                  <Link to='/usuarios' className='nav-link'>Usuarios</Link>
                </li>
              </ul>
            </div>
            <div className="ml-auto" style={{paddingRight: 30}}>
              <Link to='/' className='btn btn-light'>Salir</Link>
            </div>
          </nav>
        <div style={{marginTop:'5%'}}>
          <h1 className='text-center'>Listado de Super Administradores</h1>  
        </div>
            <div style={{marginLeft:'4%', marginTop:'2%'}}>
              <input value={search} onChange={searcher} type='text' placeholder='buscar por Email' className='form'></input>
              <Link to='/create' className='btn btn-secondary btn-sm' style={{marginLeft:'71%'}}>Crear</Link>{' '}
            </div>
       <div>
        <table className='table table-striped  container' style={{marginTop:'2%',border: '1px solid black', borderRadius: '20px'}}>
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
