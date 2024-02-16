import axios from 'axios';
import React,{useState}from 'react'
import { Link, useNavigate } from 'react-router-dom'

const endpoint = 'http://localhost:8000/api/register'
const CreateSupAdmin = () => {
    const [name, setName] = useState('')
    const [documento, setDocumento] = useState('')
    const[telefono, setTelefono] = useState ('')
    const [email, setEmail] = useState('')
    const [password, setPass] = useState('')
    const [roles, setRoles] = useState('')
    
    const navigate = useNavigate()
    
    const store = async (e) =>{
        e.preventDefault()

       // Validación del nombre: no debe estar vacío y solo debe contener caracteres válidos
       if (!name || !/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/.test(name)) {
        alert("Por favor, ingrese un nombre válido");
        return;
    }

           // Validación de correo electrónico con una expresión regular simple
           const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
           if (!emailRegex.test(email)) {
               alert("Por favor, ingrese un correo electrónico válido");
               return;
           }
   
           // Validación de documento: solo números y al menos 8 caracteres
           if (!/^\d{5,10}$/.test(documento)) {
               alert("Por favor, ingrese un documento válido (al menos de 5 a 10 dígitos)");
               return;
           }
   
           // Validación de teléfono: solo números y al menos 7 caracteres
          if (!/^\d{10,}$/.test(telefono)) {
              alert("Por favor, ingrese un número de teléfono válido (al menos 10 dígitos)");
              return;
           }
               // Validación de contraseña: al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)) {
          alert("La contraseña debe tener al menos 8 caracteres y contener al menos una letra mayúscula, una letra minúscula y un número");
          return;
      }

          // Validación de rol: asegúrate de que se haya seleccionado un rol
          if (!roles || roles === "Seleccione un Rol") {
            alert("Por favor, seleccione un rol");
            return;
        }



         await axios.post(endpoint, {name: name, documento:documento ,telefono:telefono, email:email, password:password, roles:roles })
        .then(res =>{
            console.log(res)
            navigate('/supAdmins')
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
            <h1 className="title-1" style={{textAlign:'center',  marginTop: '4%', color:'#E7DFDD'}}>Creando Usuarios</h1>
        </div>
      <div style={{ marginTop:'5%', backgroundColor: '#0E0B16', padding: '20px', borderRadius: '10px', maxWidth: '600px', margin: 'auto' }}>
            <form onSubmit={store} >
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label"  style={{color:"#E7DFDD" }}>Nombre completo</label>
                    <input value={name} onChange={(e)=> setName(e.target.value)} type='text' className='form-control'required />
                </div>
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label"  style={{color:"#E7DFDD" }}>Documento</label>
                    <input value={documento} onChange={(e)=> setDocumento(e.target.value)} type='text' className='form-control'required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label"  style={{color:"#E7DFDD" }}>Telefono</label>
                    <input value={telefono} onChange={(e)=>setTelefono(e.target.value)} type='text' className='form-control'required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label"  style={{color:"#E7DFDD" }}>Email</label>
                    <input value={email} onChange={(e)=> setEmail(e.target.value)} type='email' className='form-control'required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label"  style={{color:"#E7DFDD" }}>Contraseña</label>
                    <input value={password} onChange={(e)=>setPass(e.target.value)} type='password' className='form-control'required />
                </div>
                
                <div>
                  <label htmlFor='password' className='form-label' style={{color:"#E7DFDD", padding:'1%' }}>Roles</label>
                  <select class="form-select" aria-label="seleccione un rol" value={roles} onChange={(e)=>setRoles(e.target.value)}>
                    <option selected>Seleccione un Rol</option>
                    <option value="1">Super Administrador</option>
                    <option value="2">Administrador</option>
                    <option value="3">Usuario</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-dark">Enviar</button>       
            </form>
        </div>
    </div>
  )
}

export default CreateSupAdmin
