
import React ,{useEffect, useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const endpoint = 'http://localhost:8000/api'

const ShowUsuarios = () => {

    const [usuarios, setUsuarios] = useState([])
    
    useEffect (()=>{
        getAllUsuarios()
    }, [])
   
      
    const getAllUsuarios= async () =>{
    const response = await axios.get(`${endpoint}/usuarios`)
        setUsuarios(response.data)
    }
    
    const deleteUsuarios = async(id) =>{
    await axios.delete(`${endpoint}/usuarios/${id}`)
    getAllUsuarios()
    alert('Cliente eliminado con exito');
    }

return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="#" style={{paddingLeft: 20}}>Usuarios </a>
            <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
                <li className="nav-item active" style={{paddingRight: 20}}>
                  {/* <Link to='/Usuarios' className='nav-link'>Usuarios</Link> */}
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
                    <th>Telefono</th>
                    <th>rol</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
            {
            usuarios.map(usuarios => (
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
      </div>
    </div>
  )
}

export default ShowUsuarios