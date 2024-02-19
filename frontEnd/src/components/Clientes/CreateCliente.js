import axios from 'axios';
import React,{useState}from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoEyeSharp, IoEyeOffSharp } from 'react-icons/io5';

const endpoint = 'http://localhost:8000/api/clientes/create'
const CreateCliente = () => {
    const [cc_nit, setCC_nit] = useState('')
    const [nombre_completo, setNombre_completo] = useState('')
    const [direccion, setDireccion] = useState('')
    const [ciudad, setCiudad] = useState('')
    const[telefono, setTelefono] = useState ('')
    const [correo_electronico, setCorreo_electronico] = useState('')
    
    const navigate = useNavigate()
    
    const store = async (e) =>{
        e.preventDefault()
            // Validación de documento: solo números y al menos 8 caracteres
            if (!/^\d{5,10}$/.test(cc_nit)) {
                alert("Por favor, ingrese un documento válido (al menos de 5 a 10 dígitos)");
                return;
            }
      // Validación del nombre: no debe estar vacío y solo debe contener caracteres válidos
      if (!nombre_completo || !/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/.test(nombre_completo)) {
        alert("Por favor, ingrese un nombre válido");
        return;
    }
         
   
           // Validación de teléfono: solo números y al menos 7 caracteres
          if (!/^\d{10,}$/.test(telefono)) {
              alert("Por favor, ingrese un número de teléfono válido (al menos 10 dígitos)");
              return;
           }

           // Validación de correo electrónico con una expresión regular simple
           const emailRegex = /^[^\s@]+@(?:mail|gmail|outlook|hotmail)\.[^\s@]+$/i
           if (!emailRegex.test(correo_electronico)) {
            alert("Por favor, ingrese un correo electrónico válido con un dominio permitido (ej. mail, gmail, outlook, hotmail)");
            return;
           }



         await axios.post(endpoint, {cc_nit: cc_nit, nombre_completo: nombre_completo, direccion: direccion,
            ciudad: ciudad,  telefono:telefono, correo_electronico: correo_electronico })
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
         <nav className="navbar navbar-expand-lg" style={{ backgroundColor:'#0E0B16 ', borderRadius:5}}>
            <a className="navbar-brand" href="#" style={{paddingLeft: 20,  color:'#E7DFDD'}}>Super Administrador </a>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item active" style={{paddingRight: 20}}>
                  <Link to='/supAdmins' className='nav-link'  style={{color:'#E7DFDD'}}>Volver</Link>
                </li>
              </ul>
            </div>
            <div className="ml-auto" style={{paddingRight: 30}}>
              <Link to='/' className='btn btn-dark'>Salir</Link>
            </div>
        </nav>
        <div>
            <h1 className="title-1" style={{textAlign:'center',  marginTop: '4%', color:'#E7DFDD'}}>Creando Clientes</h1>
        </div>
      <div style={{ marginTop:'5%', backgroundColor: '#0E0B16', padding: '20px', borderRadius: '10px', maxWidth: '600px', margin: 'auto' }}>
            <form onSubmit={store} >
                <div className="mb-3">
                    <label htmlFor="cc_nit" className="form-label"  style={{color:"#E7DFDD" }}>CC/NIT</label>
                    <input value={cc_nit} onChange={(e)=> setCC_nit(e.target.value)} type='text' className='form-control'required />
                </div>
                <div className="mb-3">
                    <label htmlFor="nombre_completo" className="form-label"  style={{color:"#E7DFDD" }}>Nombre Completo</label>
                    <input value={nombre_completo} onChange={(e)=> setNombre_completo(e.target.value)} type='text' className='form-control'required />
                </div>
                <div className="mb-3">
                    <label htmlFor="direccion" className="form-label"  style={{color:"#E7DFDD" }}>Direccion</label>
                    <input value={direccion} onChange={(e)=>setDireccion(e.target.value)} type='text' className='form-control'required />
                </div>
                <div className="mb-3">
                    <label htmlFor="ciudad" className="form-label"  style={{color:"#E7DFDD" }}>Ciudad</label>
                    <input value={ciudad} onChange={(e)=> setCiudad(e.target.value)} type='text' className='form-control'required />
                </div>
                <div className="mb-3">
                    <label htmlFor="telefono" className="form-label"  style={{color:"#E7DFDD" }}>Telefono</label>
                    <input value={telefono} onChange={(e)=> setTelefono(e.target.value)} type='text' className='form-control'required />
                </div>
                <div className="mb-3">
                    <label htmlFor="correo_electronico" className="form-label"  style={{color:"#E7DFDD" }}>Correo Electronico</label>
                    <input value={correo_electronico} onChange={(e)=> setCorreo_electronico(e.target.value)} type='email' className='form-control'required />
                </div>
    
                <button type="submit" className="btn btn-dark">Enviar</button>       
            </form>
        </div>
    </div>
  )
}

export default CreateCliente
