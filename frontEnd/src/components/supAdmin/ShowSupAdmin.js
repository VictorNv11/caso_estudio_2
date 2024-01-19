
import React ,{useEffect, useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const endpoint = 'http://localhost:8000/api'

const ShowSupAdmin = () => {

    const [supAdmins, setSupAdmins] = useState([])
    
    useEffect (()=>{
        getAllSupAdmins()
    }, [])
   
      
    const getAllSupAdmins = async () =>{
      const response = await axios.get(`${endpoint}/supAdmins`)
        setSupAdmins(response.data)
    }
    
    const deleteSupAdmin = async(id) =>{
      await axios.delete(`${endpoint}/supAdmin/${id}`)
      getAllSupAdmins()
      alert('Cliente eliminado con exito');
    }

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
                  <Link to='/usuarios' className='nav-link'>Usuarios</Link>
                </li>
              </ul>
            </div>
            <div className="ml-auto" style={{paddingRight: 30}}>
              <Link to='/' className='btn btn-light'>Salir</Link>
            </div>
        </nav>
        <div style={{marginTop:'5%'}}>
          <h1 className='text-center'>Listado de Usuarios, Administradores y Super Administradores</h1>  
        </div>
        <Link to='/create' className='btn btn-secondary btn-sm' style={{marginLeft:'82%', marginTop:'2%'}}>Crear</Link>{' '}
       <div>
        <table className='table table-striped  container' style={{marginTop:'2%',border: '1px solid black', borderRadius: '20px'}}>
            <thead className='bg-dark text-white'>
                <tr>
                    <th>Nombre</th>
                    <th>email</th>
                    <th>rol</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
            {
              supAdmins.map(supAdmin => (
                      <tr key={supAdmin._id}>
                          <td>{supAdmin.name}</td>
                          <td>{supAdmin.email}</td>
                         
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
      </div>
    </div>
  )
}

export default ShowSupAdmin
