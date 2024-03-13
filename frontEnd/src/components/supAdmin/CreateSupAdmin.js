import axios from 'axios';
import React,{useEffect, useState}from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoEyeSharp, IoEyeOffSharp } from 'react-icons/io5';
import Cookies from 'js-cookie';
import NavBar from '../ui/NavBar';
import Footer from '../ui/Footer';

 

const endpoint = 'http://localhost:8000/api/register'
const CreateSupAdmin = () => {
  const [setUsers] = useState([]);   
  const [name, setName] = useState('')
    const [documento, setDocumento] = useState('')
    const[telefono, setTelefono] = useState ('')
    const [email, setEmail] = useState('')
    const [password, setPass] = useState('')
    const [roles, setRoles] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    
    const navigate = useNavigate()

    const showData = async () => {
      try {
        const token = Cookies.get("token");
        const response = await axios.get(`${endpoint}/users`, {
          headers: {  
            Authorization: `Bearer ${token}`
          }
        });
        setUsers(response.data.users);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    useEffect(() => {
      if (Cookies.get("token") === undefined) {
        window.location.href = "/";
      }
      showData();
    }, []);

    

    const store = async (e) =>{
        e.preventDefault()

       // Validación del nombre: no debe estar vacío y solo debe contener caracteres válidos
       if (!name || !/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/.test(name)) {
        alert("Por favor, ingrese un nombre válido");
        return;
    }

           // Validación de correo electrónico con una expresión regular simple
           const emailRegex = /^[^\s@]+@(?:mail|gmail|outlook|hotmail)\.[^\s@]+$/i
           if (!emailRegex.test(email)) {
            alert("Por favor, ingrese un correo electrónico válido con un dominio permitido (ej. mail, gmail, outlook, hotmail)");
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
    <div style={{ backgroundColor: '#50727B'}}>
        <nav className="navbar bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand" href='#!'>Gestion de Usuarios</a>
          
              <Link className="btn" style={{backgroundColor:'#50717a', color:'white'}} to="/supAdmins">
                <i className="fa-solid fa-arrow-left"></i> Volver
              </Link>
            
          </div>
        </nav>
        <div>
            <h1 className="title-1" style={{textAlign:'center',  marginTop: '4%', color:'#E7DFDD'}}>Creando Usuarios</h1>
        </div>
      <div style={{ marginTop:'1%', backgroundColor: '#0E0B16', padding: '20px', borderRadius: '10px', maxWidth: '600px', margin: 'auto',marginBottom:'2%' }}>
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
                <div className="mb-3 position-relative">
                    <label htmlFor="password" className="form-label"  style={{color:"#E7DFDD" }}>Contraseña</label>
                    <div className="input-group">
                    <input value={password} onChange={(e)=>setPass(e.target.value)} type={showPassword ? 'text' : 'password'}
                      className='form-control'required />
                      
                    <button
                        className="btn btn-outline-dark"
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ zIndex: 2 }}
                    >
                        {showPassword ? <IoEyeSharp  style={{ color:'white'  }} /> : <IoEyeOffSharp  style={{ color:'white'  }} />}
                    </button>
                    </div>
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
                <button type="submit" className="btn btn-secondary" style={{marginTop:'10px'}}>Enviar</button>       
            </form>
        </div>
        <Footer/>
    </div>
  )
}

export default CreateSupAdmin
