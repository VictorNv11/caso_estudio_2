import React,{useState, useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Logo from '../assets/img/planetas.png';
import { IoEyeSharp, IoEyeOffSharp } from 'react-icons/io5';



const endpoint = 'http://localhost:8000/api/register'
const CreateUsuario = () => {
  const [name, setName] = useState('');
  const[documento , setDocumento] = useState ('');
  const [telefono, setTelefono]= useState('');
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');
  const [roles] = useState('3');
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [missingFieldsError, setMissingFieldsError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);



  // Limpia el mensaje de error
  useEffect(() => {
    setMissingFieldsError(null);
    setError(null);
  }, [name, documento ,telefono ,email, password, roles]);
  
  
  // Verifica que todos los datos se completen
  const store = async (e) => {
    e.preventDefault();

    if (!name || !documento || !telefono || !email || !password) {
        setMissingFieldsError("Completa todos los campos, gracias.");
        // Configurar el temporizador para limpiar el error después de 5 segundos
        setTimeout(() => {
            setMissingFieldsError(null);
          }, 5000);
        return;
      }

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
    /* if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)) {
       alert("La contraseña debe tener al menos 8 caracteres y contener al menos una letra mayúscula, una letra minúscula y un número");
       return;
   }*/

   try {
    await axios.post(endpoint, { name, documento, telefono, email, password, roles });
    console.log("Usuario creado exitosamente");
    navigate('/Login');
  } catch (err) {
    console.error("Error al crear el usuario", err);
    if (err.response && err.response.data && err.response.data.message) {
      setError(err.response.data.message);
    } else {
      setError("Error al crear el usuario. Por favor, inténtelo nuevamente.");
      
    }
  }
     
  };
    return(

  <div style={{backgroundColor:'#50727B'}}>
    <header className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
          <div className="container">
              <a className="navbar-brand" href="#">
                <img src={Logo} alt="Logo" title='Logo de la Pagina' style={{ paddingLeft: 20, width: 50, height: 30 }} />
              </a>
              <a className="navbar-brand">Mi Sitio</a>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon" />
              </button>
              <div className="collapse navbar-collapse" id="navbarCollapse">
                  <ul className="navbar-nav me-auto mb-2 mb-md-0">
                      <li class="nav-item">
                          <Link to='/'class="nav-link active">Volver</Link>
                      </li>
                  </ul>
              </div>            
          </div>
    </header>
    <div >
        <h1 className="title-1" style={{textAlign:'center',  marginTop: '6%', color:'#E7DFDD'}}>Formulario de Registro</h1>
   </div>
    <div style={{border:'solid 1px', padding: '20px', borderRadius: '10px', maxWidth: '600px', marginTop:'4%', marginLeft:'35%', backgroundColor:'#0E0B16'}}>
        {error && <div className="alert alert-danger">{error}</div>}
        {missingFieldsError && <div className="alert alert-danger">{missingFieldsError}</div>}
        <form onSubmit={store} >
            <div className="mb-3">
                <label htmlFor="nombre" className="form-label" style={{color:'#E7DFDD'}}>Nombre completo</label>
                <input value={name} onChange={(e)=> setName(e.target.value)} type='text' className='form-control' />
            </div>
            <div className="mb-3">
                <label htmlFor="nombre" className="form-label" style={{color:'#E7DFDD'}}>Documento</label>
                <input value={documento} onChange={(e)=> setDocumento(e.target.value)} type='text' className='form-control'/>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label" style={{color:'#E7DFDD'}}>Telefono</label>
                <input value={telefono} onChange={(e)=>setTelefono(e.target.value)} type='text' className='form-control' />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label" style={{color:'#E7DFDD'}}>Email</label>
                <input value={email} onChange={(e)=> setEmail(e.target.value)} type='email' className='form-control' />
            </div>
            <div className="mb-3 position-relative">
                <label htmlFor="password" className="form-label" style={{ color: '#E7DFDD', marginBottom: '0.5rem' }}>Contraseña</label>
                <div className="input-group">
                    <input value={password} onChange={(e)=>setPass(e.target.value)} type={showPassword ? 'text' : 'password'}
                        className='form-control'
                        />
                 
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
            <button type="submit" className="btn btn-dark">Enviar</button>       
        </form>
        
    </div>
    {/* Footer */}
    <footer style={{ position: 'static', bottom: 0, width: '100%', backgroundColor: '#35374B' }}>
                <div className="container-fluid">
                    <div className="row p-5 pb-2  text-white">
                        <div className="col-xs-12 col-md-6 col-lg-3">
                            <p className="h3">Gestión de Usuarios</p>
                           
                        </div>
                        <div className="col-xs-12 col-md-6 col-lg-3">
                            <p className="h5 mb-3">Contactos</p>
                            <div className="mb-2">
                                <a className='text-success text-decoration-none' href="#!">Facebook</a>
                            </div>
                            <div className="mb-2">
                                <a className='text-success text-decoration-none' href="#!">GitHub</a>
                            </div>
                            <div className="mb-2">
                                <a className='text-success text-decoration-none' href="#!">Gmail</a>
                            </div>

                        </div>

                        <div className="col-xs-12 col-md-6 col-lg-3">
                            <p className="h5">Enlaces</p>
                            <div className="mb-2">
                                <a className='text-success text-decoration-none' href="#!">Terms & Conditions</a>
                            </div>
                            <div className="mb-2">
                                <a className='text-success text-decoration-none' href="#!">Private Policy</a>
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-6 col-lg-3">
                            <p className="h5">Acerca De</p>
                            <div className="mb-2">
                                <a className='text-success text-decoration-none' href="#!">Documentos</a>
                            </div>
                        </div>
                        <div className="col-xs-12 pt-4">
                        <p className='text-white text-center'> © 2024 Copyright: Gestion de Usuarios</p>
                        </div>
                    </div>
                </div>
            </footer>
    
 </div>
    )
}
export default  CreateUsuario