import React,{useState, useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


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
         <h1 className="title-1" style={{textAlign:'center',  marginTop: '4%', color:'#E7DFDD'}}>Creando SuperAdministrador</h1>
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

             <button type="submit" className="btn btn-dark">Enviar</button>       
         </form>
     </div>
 </div>
        // <div>
        //   <nav className="navbar navbar-expand-lg" style={{backgroundColor:'#0E0B16 '}}>
        //     <a className="navbar-brand" href="#" style={{paddingLeft: 20, color:'#E7DFDD'}}>Mis Usuarios </a>
        //     <div className="collapse navbar-collapse" id="navbarNav">
        //       <ul className="navbar-nav ml-auto">
        //         <li className="nav-item">
        //         <Link to="/" className="nav-link" style={{ color:'#E7DFDD'}}>
        //           Inicio   
        //         </Link>
        //         </li>
        //       </ul>
        //     </div>
        //     <div className="ml-auto" style={{paddingRight: 30}}>
        //       <Link to='/Login' className='btn btn-dark'>Ingresar</Link>
        //     </div>
        // </nav>
     
        // </div>

    )
}
export default  CreateUsuario