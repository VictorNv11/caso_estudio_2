import React,{useState, useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


const endpoint = 'http://localhost:8000/api/usuarios'
const CreateUsuario = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');
  const [phone, setPhone]= useState('');
  const [rol] = useState('1');
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [missingFieldsError, setMissingFieldsError] = useState(null);

  // Limpia el mensaje de error
  useEffect(() => {
    setMissingFieldsError(null);
    setError(null);
  }, [nombre, email, password, phone, rol]);
  
  // Limpia el mensaje de error
  useEffect(() => {
    setError(null);
  }, [nombre, email, password, phone, rol]);
  
  // Verifica que todos los datos se completen
  const store = async (e) => {
    e.preventDefault();

    if (!nombre || !email || !password || !phone) {
      setMissingFieldsError("Completa todos los campos, gracias.");
      return;
    }
    try {
      await axios.post(endpoint, { nombre, email,password,phone,rol });
      console.log("Usuario creado exitosamente");
      navigate('/Login'); // Cambio aquí
    } catch (err) {
      console.error("Error al crear el usuario", err);
      setError("Error al crear el usuario. Mire los datos e intentelo nuevamente.")
    }
  };

  

    
 
    return(
        <div>
          <nav className="navbar navbar-expand-lg" style={{backgroundColor:'#4717F6 '}}>
            <a className="navbar-brand" href="#" style={{paddingLeft: 20, color:'#E7DFDD'}}>Mis Usuarios </a>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                <Link to="/" className="nav-link" style={{ color:'#E7DFDD'}}>
                  Inicio   
                </Link>
                </li>
              </ul>
            </div>
            <div className="ml-auto" style={{paddingRight: 30}}>
              <Link to='/Login' className='btn btn-dark'>Ingresar</Link>
            </div>
        </nav>
        <div>
            <h1 className="title-1" style={{textAlign:'center',  marginTop: '4%',  color:'#E7DFDD'}}>Regitro Usuario</h1>
        </div>
        <div style={{ marginTop:'5%', backgroundColor: '', padding: '20px', borderRadius: '10px', maxWidth: '600px', margin: 'auto' }}>
      <form onSubmit={store}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label" style={{ color:'#828081'}}>Nombre completo</label>
          <input value={nombre} placeholder="name" onChange={(e)=> setNombre (e.target.value)}  pattern="[a-zA-Z ]*"
            title="Solo se permiten letras de la A a la Z"
            require type="text" className="form-control" id="nombre" name="nombre"  />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label" style={{color:'#828081'}}>Email</label>
          <input value={email} placeholder="email" onChange={(e)=> setEmail (e.target.value)} type="email" className="form-control" id="email" name="email" required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label" style={{color:'#828081'}}>Contraseña</label>
          <input value={password} placeholder="password" onChange={(e)=> setPass (e.target.value)}  pattern="[A-z-a-Z] {0-10}"type="password" className="form-control" id="password" name="password"  required />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label" style={{color:'#828081'}}>Telefono</label>
          <input value={phone} placeholder="phone" onChange={(e)=> setPhone (e.target.value)}  pattern="[0-9]{10}" title="Solo se permite telefono de 10 numeros" type="phone" className="form-control" id="phone" name="phone" required />
        </div>
        {missingFieldsError && <div className="alert alert-danger" role="alert">{missingFieldsError}</div>}
        {error && <div className="alert alert-danger" role="alert">{error}</div>}
        <button type="submit" className="btn btn-primary" style={{backgroundcolor:'#4717F6'}} >
          Enviar
        </button>     
      </form>
    </div>
        </div>
    )
}
export default  CreateUsuario