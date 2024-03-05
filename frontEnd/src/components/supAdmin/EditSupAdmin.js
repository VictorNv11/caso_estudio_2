import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { Link, useNavigate, useParams} from 'react-router-dom'
import { IoEyeSharp, IoEyeOffSharp } from 'react-icons/io5';
import Cookies from 'js-cookie';


const endpoint = 'http://localhost:8000/api/User/'

const EditSupAdmin = () => {
    
    const [setUsers] = useState([]);   
    const [name, setName] = useState('')
    const [documento, setDocumento] = useState('')
    const [telefono, setTelefono] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPass] = useState('')
    const [roles, setRoles] = useState(3)
    const navigate = useNavigate()
    const {id} = useParams()
    const [showPassword, setShowPassword] = useState(false);


     const update = async (e) =>{
        e.preventDefault()
        await axios.put(`${endpoint}${id}`,{
            name: name,
            documento: documento,
            telefono: telefono,
            email: email,
            password: password,
            roles: roles
        })
        navigate('/supAdmins')
     }
     useEffect( ()=>{
        const getUserById = async () => {
            const response = await axios.get(`${endpoint}${id}`)
            setName(response.data.name)
            setDocumento(response.data.documento)
            setTelefono(response.data.telefono)
            setEmail(response.data.email)
            setPass(response.data.password)
            setRoles(response.data.roles)
        }
        getUserById()
     }, [])

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

    return(
        <div>
            <div>
            <h1 className="title-1" style={{textAlign:'center',  marginTop: '4%', color:"#E7DFDD"}}>Editando Usuario</h1>
        </div>
        <div style={{ marginTop:'5%', backgroundColor: '#0E0B16 ', padding: '20px', borderRadius: '10px', maxWidth: '600px', margin: 'auto' }}>
              <form onSubmit={update} >
                  <div className="mb-3">
                      <label htmlFor="nombre" className="form-label" style={{color:"#E7DFDD" }}>Nombre completo</label>
                      <input value={name} onChange={(e)=> setName(e.target.value)} type='text' className='form-control'required />
                  </div>
                  <div className="mb-3">
                      <label htmlFor="phone" className="form-label" style={{color:"#E7DFDD" }}>documento</label>
                      <input value={documento} onChange={(e)=> setDocumento(e.target.value)} type='number' className='form-control'required />
                  </div>
                  <div className="mb-3">
                      <label htmlFor="phone" className="form-label" style={{color:"#E7DFDD" }}>Telefono</label>
                      <input value={telefono} onChange={(e)=> setTelefono(e.target.value)} type='number' className='form-control'required />
                  </div>
                  <div className="mb-3">
                      <label htmlFor="email" className="form-label" style={{color:"#E7DFDD" }}>Email</label>
                      <input value={email} onChange={(e)=> setEmail(e.target.value)} type='email' className='form-control'required />
                  </div>
                  <div className="mb-3 position-relative">
                      <label htmlFor="password" className="form-label" style={{color:"#E7DFDD" }}>Contraseña</label>
                      <div className="input-group">
                      <input value={password} onChange={(e)=>setPass(e.target.value)} type={showPassword ? 'text' : 'password'} label className='form-control'required />
                      
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
                  <label className='form-label' style={{color:"#E7DFDD", padding:'1%' }}>Roles</label>
                  <select className="form-select" aria-label="seleccione un rol" value={roles} onChange={(e)=>setRoles(e.target.value)}>
                    <option selected>Seleccione un Rol</option>
                    <option value="1">Super Administrador</option>
                    <option value="2">Administrador</option>
                    <option value="3">Usuario</option>
                  </select>
                </div>
                <div style={{ paddingTop:'10px', display: 'flex', flexDirection: 'column', alignItems: 'right' }}>
                  <button type="submit" className="btn btn-primary">Editar</button> 
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'right', paddingTop:'5px' }}>
    {/* ... (otro contenido) */}
    {/* <button className='btn btn-secondary' style={{margin:'1px', marginTop: '1px 0' }}>Cancelar</button> */}
    <Link to='/supAdmins' className='btn btn-secondary'  style={{color:'#E7DFDD'}}>Cancelar</Link>
</div>      
              </form>
          </div>
      </div>
    )

}
 export default EditSupAdmin