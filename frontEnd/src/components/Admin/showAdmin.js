
import React ,{useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BsSearch } from "react-icons/bs";

const endpoint = 'http://localhost:8000/api'

const ShowAdmin = () => {

    const [Admins, setAdmins] = useState([])
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8);


  

    const showData = async () => {
      try {
        const response = await axios.get(`${endpoint}/Admins`);
        setAdmins(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    const searcher = (e) => {
      setSearch(e.target.value);
    };

    useEffect (()=>{
        getAllAdmins()
        showData();
    }, [currentPage])
   
      
    const getAllAdmins = async () =>{
      const response = await axios.get(`${endpoint}/Admins`)
        setAdmins(response.data)
    }
    
    const deleteAdmin = async(id) =>{
      await axios.delete(`${endpoint}/Admin/${id}`)
      getAllAdmins()
      alert('Administrador eliminado con exito');
    }


     const filteredAdmins = search
    ? Admins.filter((admin) =>
        admin.email.toLowerCase().includes(search.toLowerCase())
      )
    : Admins;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentAdmins = filteredAdmins.slice(indexOfFirstItem, indexOfLastItem);
  

  return (
    <div>
         <nav className="navbar navbar-expand-lg "style={{backgroundColor:"#0E0B16 ", borderRadius:5}}>
            <a className="navbar-brand" href="#" style={{paddingLeft: 20, color:"#E7DFDD"}}>Super Administrador </a>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ml-auto">
              <li className="nav-item active" style={{paddingRight: 20}}>
                  <Link to='/supAdmins' className='nav-link' style={{color:"#E7DFDD"}}>Super Administrador</Link>
                </li>
                <li className="nav-item active" style={{paddingRight: 20}}>
                  <Link to='/Admin' className='nav-link' style={{color:"#E7DFDD"}}>Administradores</Link>
                </li>
                <li className="nav-item active" style={{paddingRight: 20}}>
                  <Link to='/usuarios' className='nav-link' style={{color:"#E7DFDD"}}>Usuarios</Link>
                </li>
              </ul>
            </div>
            <div className="ml-auto" style={{paddingRight: 30}}>
              <Link to='/' className='btn btn-dark'>Salir</Link>
            </div>
         </nav>

        <div style={{marginTop:'5%'}}>
          <h1 className='text-center' style={{color:"#E7DFDD"}}>Listado de Administradores</h1>  
        </div>

        <div style={{marginLeft:'4%', marginTop:'2%'}}>
            <input value={search} style={{borderRadius:5}} onChange={searcher} type='text' placeholder='buscar por Email' className='form'></input><BsSearch style={{ marginLeft: 5, color: 'white' }} />
            <Link to='/createA' className='btn btn-dark btn-sm' style={{marginLeft:'71%'}}>Crear</Link>{' '}
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
              currentAdmins.map(Admin => (
                      <tr key={Admin._id}>
                          <td>{Admin.name}</td>
                          <td>{Admin.email}</td>
                          <td>{Admin.phone}</td>
                          <td>{Admin.rol}</td>
                          <td>
                              <Link className='btn btn-primary btn-sm' to={`/editA/${Admin.id}`}>Editar</Link>{' '}
                              <button className='btn btn-danger btn-sm' onClick={() => deleteAdmin(Admin.id)}>Eliminar</button>
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
                <a className="page-link" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              {Array.from({ length: Math.ceil(Admins.length / itemsPerPage) }, (_, index) => (
                <li className={`page-item ${currentPage === index + 1 && 'active'}`} key={index + 1} onClick={() => setCurrentPage(index + 1)}>
                  <a className="page-link">
                    {index + 1}
                  </a>
                </li>
              ))}
              <li className="page-item" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil(Admins.length / itemsPerPage)}>
                <a className="page-link" aria-label="Next">
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

export default ShowAdmin