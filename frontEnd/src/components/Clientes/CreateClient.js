import axios from 'axios';
import React,{useState}from 'react';
import { Link, useNavigate } from 'react-router-dom';

const endpoint = 'http://localhost:8000/api/clientes'
const CreateClient = () => {
    const [cc_nit, setCC_NIT] = useState('');
    const [nombre_completo, setNombreCompleto] = useState('');
    const [direccion, setDireccion] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [telefono, setTelefono] = useState ('');
    const [correo_electronico, setCorreoElectronico] = useState('');
    const navigate = useNavigate()
    
    const store = async (e) =>{
        e.preventDefault()
        await axios.post(endpoint, {cc_nit: cc_nit, nombre_completo:nombre_completo, direccion:direccion, ciudad:ciudad, telefono:telefono, correo_electronico:correo_electronico})
        .then(res =>{
            console.log(res)
            navigate('/clientes')
        })
        .catch(err =>{
            console.log(err)
        })  
    }

return (
    <div>
           <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="#" style={{paddingLeft: 20}}>Super Administrador </a>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item active" style={{paddingRight: 20}}>
                  <Link to='/clientes' className='nav-link'>Volver</Link>
                </li>
              </ul>
            </div>
            <div className="ml-auto" style={{paddingRight: 30}}>
              <Link to='/' className='btn btn-light'>Salir</Link>
            </div>
        </nav>
        <div>
            <h1 className="title-1" style={{textAlign:'center',  marginTop: '4%'}}>Creando Cliente</h1>
        </div>
    <div style={{ marginTop:'5%', backgroundColor: '#f4f4f4', padding: '20px', borderRadius: '10px', maxWidth: '600px', margin: 'auto' }}>
            <form onSubmit={store} >
                <div className="mb-3">
                    <label htmlFor="cc/nit" className="form-label">CC/NIT</label>
                    <input value={cc_nit} onChange={(e)=> setCC_NIT(e.target.value)} type='number' className='form-control'required />
                </div>
                <div className="mb-3">
                    <label htmlFor="nombre_completo" className="form-label">Nombre completo</label>
                    <input value={nombre_completo} onChange={(e)=> setNombreCompleto(e.target.value)} type='text' className='form-control'required />
                </div>
                <div className="mb-3">
                    <label htmlFor="direccion" className="form-label">Direccion</label>
                    <input value={direccion} onChange={(e)=>setDireccion(e.target.value)} type='text' className='form-control'required />
                </div>
                <div className="mb-3">
                    <label htmlFor="ciudad" className="form-label">Ciudad</label>
                    <input value={ciudad} onChange={(e)=> setCiudad(e.target.value)} type='text' className='form-control'required />
                </div>
                 <div className="mb-3">
                    <label htmlFor="telefono" className="form-label">Telefono</label>
                    <input value={telefono} onChange={(e)=> setTelefono(e.target.value)} type='phone' className='form-control'required />
                </div>
                <div className="mb-3">
                    <label htmlFor="correo_electronico" className="form-label">Correo Eletrónico</label>
                    <input value={correo_electronico} onChange={(e)=> setCorreoElectronico(e.target.value)} type='email' className='form-control'required />
                </div>
                
                <button type="submit" className="btn btn-primary">Enviar</button>       
            </form>
        </div>
    </div>
  )
}

export default CreateClient;
