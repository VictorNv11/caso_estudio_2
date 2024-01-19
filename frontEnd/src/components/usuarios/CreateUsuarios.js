import axios from 'axios'
import React,{useState}from 'react'
import { useNavigate } from 'react-router-dom'

const endpoint = 'http://localhost:8000/api/Usuarios'
const CreateUsuarios = () => {
    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPass] = useState('')
    const [phone, setPhone] = useState ('')
    const [rol] = useState('usuario')
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
        <div>
            <h1 className="title-1" style={{textAlign:'center',  marginTop: '4%'}}>Creando Tipo  de Usuario</h1>
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