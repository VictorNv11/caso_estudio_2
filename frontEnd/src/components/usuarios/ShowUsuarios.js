
import React ,{useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BsSearch } from "react-icons/bs";

const endpoint = 'http://localhost:8000/api'

const ShowUsuarios = () => {

    const [usuarios, setUsuarios] = useState([])
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8);

    const showData = async () => {
      try {
        const response = await axios.get(`${endpoint}/usuarios`);
        setUsuarios(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    const searcher = (e) => {
      setSearch(e.target.value);
    };

    
    useEffect (()=>{
        getAllUsuarios()
        showData();
    }, [currentPage])
   
      
    const getAllUsuarios= async () =>{
    const response = await axios.get(`${endpoint}/usuarios`)
        setUsuarios(response.data)
    }
    
    const deleteUsuarios = async(id) =>{
    await axios.delete(`${endpoint}/Usuarios/${id}`)
    getAllUsuarios()
    alert('Usuario eliminado con exito');
    }

    const filteredUsuarios = search
    ? usuarios.filter((supAdmin) =>
        supAdmin.email.toLowerCase().includes(search.toLowerCase())
      )
    : usuarios

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUsuarios = filteredUsuarios.slice(indexOfFirstItem, indexOfLastItem);

return (
    <div>
        <nav className="navbar navbar-expand-lg" style={{backgroundColor:"#0E0B16 ", borderRadius:5}}>
          <a className="navbar-brand" href="#" style={{paddingLeft: 20, color:"#E7DFDD"}}>USUARIO </a>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
            <li className="nav-item active" style={{paddingRight: 20}}>
                <Link to='/supAdmins' className='nav-link' style={{color:"#E7DFDD"}}>Super Administrador</Link>
              </li>
              <li className="nav-item active" style={{paddingRight: 20}}>
                <Link to='/Admin' className='nav-link'  style={{color:"#E7DFDD"}}>Administradores</Link>
              </li>
              <li className="nav-item active" style={{paddingRight: 20}}>
                <Link to='/usuarios' className='nav-link'  style={{color:"#E7DFDD"}}>Usuarios</Link>
              </li>
            </ul>
          </div>
          <div className="ml-auto" style={{paddingRight: 30}}>
            <Link to='/' className='btn btn-dark'>Salir</Link>
          </div>
        </nav>

        <div style={{marginTop:'5%'}}>
          <h1 className='text-center'  style={{color:"#E7DFDD"}}>Listado de Usuarios</h1>  
        </div>

        <div style={{marginLeft:'4%', marginTop:'2%'}}>
              <input value={search} style={{borderRadius:5}} onChange={searcher} type='text' placeholder='buscar por Email' className='form'></input><BsSearch style={{ marginLeft: 5, color: 'white' }} />
              <Link to='/createU' className='btn btn-dark btn-sm' style={{marginLeft:'71%'}}>Crear</Link>{' '}
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
            currentUsuarios.map(usuarios => (
            <tr key={usuarios._id}>
            <td>{usuarios.nombre}</td>
            <td>{usuarios.email}</td>
            <td>{usuarios.phone}</td>
            <td>{usuarios.rol}</td>
            <td>
                <Link className='btn btn-primary btn-sm' to={`/editU/${usuarios.id}`}>Editar</Link>{' '}
                    <button className='btn btn-danger btn-sm' onClick={() => deleteUsuarios(usuarios.id)}>Eliminar</button>
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
              {Array.from({ length: Math.ceil(usuarios.length / itemsPerPage) }, (_, index) => (
                <li className={`page-item ${currentPage === index + 1 && 'active'}`} key={index + 1} onClick={() => setCurrentPage(index + 1)}>
                  <a className="page-link" href="#">
                    {index + 1}
                  </a>
                </li>
              ))}
              <li className="page-item" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil(usuarios.length / itemsPerPage)}>
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

export default ShowUsuarios