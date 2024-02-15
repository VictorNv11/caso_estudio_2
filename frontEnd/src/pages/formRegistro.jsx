import React,{useState, useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Logo from '../assets/img/planetas.png';


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


  // Limpia el mensaje de error
  useEffect(() => {
    setMissingFieldsError(null);
    setError(null);
  }, [name, documento ,telefono ,email, password, roles]);
  
  
  // Verifica que todos los datos se completen
  const store = async (e) => {
    e.preventDefault();

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


    if (!name || !documento || !telefono ||!email || !password ) {
      setMissingFieldsError("Completa todos los campos, gracias.");
      return;
    }
    try {
      await axios.post(endpoint, {name, documento ,telefono ,email, password, roles});
      console.log("Usuario creado exitosamente");
      navigate('/Login'); // Cambio aquí
    } catch (err) {
      console.error("Error al crear el usuario", err);
      setError("Error al crear el usuario. Mire los datos e intentelo nuevamente.")
    }
  };

    return(

  <div>
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
    <div>
        <h1 className="title-1" style={{textAlign:'center',  marginTop: '4%'}}>Registro</h1>
    </div>
    <div style={{border:'solid 1px', padding: '20px', borderRadius: '10px', maxWidth: '600px', marginTop:'4%', marginLeft:'35%' }}>
        <form onSubmit={store} >
            <div className="mb-3">
                <label htmlFor="nombre" className="form-label">Nombre completo</label>
                <input value={name} onChange={(e)=> setName(e.target.value)} type='text' className='form-control'required />
            </div>
            <div className="mb-3">
                <label htmlFor="nombre" className="form-label">Documento</label>
                <input value={documento} onChange={(e)=> setDocumento(e.target.value)} type='text' className='form-control'required />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Telefono</label>
                <input value={telefono} onChange={(e)=>setTelefono(e.target.value)} type='text' className='form-control'required />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input value={email} onChange={(e)=> setEmail(e.target.value)} type='email' className='form-control'required />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Contraseña</label>
                <input value={password} onChange={(e)=>setPass(e.target.value)} type='password' className='form-control'required />
            </div>
            <button type="submit" className="btn btn-dark">Enviar</button>       
        </form>
    </div>
 </div>
    )
}
export default  CreateUsuario