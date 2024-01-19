import axios from 'axios'
import React,{useState}from 'react'
import { Link, useNavigate } from 'react-router-dom'

const endpoint = 'http://localhost:8000/api/usuarios'
const CreateUsuarios = () => {
    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPass] = useState('')
    const [phone, setPhone] = useState ('')
    const [rol] = useState(1)
    const navigate = useNavigate()
    
    const store = async (e) =>{
        e.preventDefault()
        await axios.post(endpoint, {nombre: nombre, email:email, password:password, phone:phone, rol:rol})
        .then(res =>{
            console.log(res)
            navigate('/Usuarios')
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
                  <Link to='/usuarios' className='nav-link'>Volver</Link>
                </li>
              
              </ul>
            </div>
            <div className="ml-auto" style={{paddingRight: 30}}>
              <Link to='/' className='btn btn-light'>Salir</Link>
            </div>
        </nav>

        <div>
            <h1 className="title-1" style={{textAlign:'center',  marginTop: '4%'}}>Creando Usuario</h1>
        </div>
      <div style={{ marginTop:'5%', backgroundColor: '#f4f4f4', padding: '20px', borderRadius: '10px', maxWidth: '600px', margin: 'auto' }}>
            <form onSubmit={store} >
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre completo</label>
                    <input value={nombre} onChange={(e)=> setNombre(e.target.value)} type='text' className='form-control'required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input value={email} onChange={(e)=> setEmail(e.target.value)} type='email' className='form-control'required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input value={password} onChange={(e)=>setPass(e.target.value)} type='password' className='form-control'required />
                </div>
         
                 <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Telefono</label>
                    <input value={phone} onChange={(e)=> setPhone(e.target.value)} type='number' className='form-control'required />
                </div>
                <button type="submit" className="btn btn-primary">Enviar</button>       
            </form>
        </div>
    </div>
  )
}

export default CreateUsuarios