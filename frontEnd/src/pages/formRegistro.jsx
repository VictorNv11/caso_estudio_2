import React,{useState} from "react";
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

  const store = async (e) => {
    e.preventDefault();
    try {
      await axios.post(endpoint, { nombre: nombre, email: email,password: password,phone: phone,rol: rol });
      console.log("Usuario creado exitosamente");
      navigate('/Login'); // Cambio aquí
    } catch (err) {
      console.error("Error al crear el usuario", err);
    }
  };

  

    
 
    return(
        <div>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="#" style={{paddingLeft: 20}}>Mis Usuarios </a>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                <Link to="/" className="nav-link">
                  Inicio   
                </Link>
                </li>
              </ul>
            </div>
            <div className="ml-auto" style={{paddingRight: 30}}>
              <Link to='/Login' className='btn btn-light'>Ingresar</Link>
            </div>
        </nav>
        <div>
            <h1 className="title-1" style={{textAlign:'center',  marginTop: '4%'}}>Regitro cliente</h1>
        </div>
        <div style={{ marginTop:'5%', backgroundColor: '#f4f4f4', padding: '20px', borderRadius: '10px', maxWidth: '600px', margin: 'auto' }}>
      <form onSubmit={store}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre completo</label>
          <input value={nombre} onChange={(e)=> setNombre (e.target.value)}  pattern="[a-zA-Z ]*"
            title="Solo se permiten letras de la A a la Z"
            require type="text" className="form-control" id="nombre" name="nombre"  />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input value={email} onChange={(e)=> setEmail (e.target.value)} type="email" className="form-control" id="email" name="email" required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input value={password} onChange={(e)=> setPass (e.target.value)}  pattern="[A-z-a-Z] {0-10}"type="password" className="form-control" id="password" name="password"  required />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Telefono</label>
          <input value={phone} onChange={(e)=> setPhone (e.target.value)}  pattern="[0-9]{10}" title="Solo se permite telefono de 10 numeros" type="phone" className="form-control" id="phone" name="phone" required />
        </div>
        <button type="submit" className="btn btn-primary" >
          Enviar
        </button>     
      </form>
    </div>
        </div>
    )
}
export default  CreateUsuario