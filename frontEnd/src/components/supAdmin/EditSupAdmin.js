import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { useNavigate, useParams} from 'react-router-dom'

const endpoint = 'http://localhost:8000/api/supAdmin/'

const EditSupAdmin = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPass] = useState('')
    const [phone, setPhone] = useState('')
    const [rol, setRol] = useState(1)
    const navigate = useNavigate()
    const {id} = useParams()

    const  update =  async (e) =>{
        e.preventDefault()
        await axios.put(`${endpoint}${id}`, {
            name: name,
            email: email,
            password: password,
            phone:phone,
            rol: rol
        })
        navigate('/supAdmins')
    }
    useEffect(  () =>{
        const getSupAdminById = async () =>{
            const response = await axios.get(`${endpoint}${id}`)
            setName(response.data.name)
            setEmail(response.data.email)
            setPass(response.data.password)
            setPhone(response.data.phone)
            setRol(response.data.rol)
        }
        getSupAdminById()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return(
        <div>
            <div>
            <h1 className="title-1" style={{textAlign:'center',  marginTop: '4%'}}>Editando Usuario</h1>
        </div>
        <div style={{ marginTop:'5%', backgroundColor: '#f4f4f4', padding: '20px', borderRadius: '10px', maxWidth: '600px', margin: 'auto' }}>
              <form onSubmit={update} >
                  <div className="mb-3">
                      <label htmlFor="nombre" className="form-label">Nombre completo</label>
                      <input value={name} onChange={(e)=> setName(e.target.value)} type='text' className='form-control'required />
                  </div>
                  <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input value={email} onChange={(e)=> setEmail(e.target.value)} type='email' className='form-control'required />
                  </div>
                  <div className="mb-3">
                      <label htmlFor="password" className="form-label">Contraseña</label>
                      <input value={password} onChange={(e)=>setPass(e.target.value)} type='text' className='form-control'required />
                  </div>
                  {/* <div className="mb-3">
                      <label htmlFor="confirmationPassword" className="form-label">Confirmación contraseña</label>
                      <input type="password" className="form-control" id="confirmationPassword" name="confirmationPassword"required />
                  </div> */}
                  <div className="mb-3">
                      <label htmlFor="phone" className="form-label">Telefono</label>
                      <input value={phone} onChange={(e)=> setPhone(e.target.value)} type='phone' className='form-control'required />
                  </div>
                  <div className="mb-3">
                  <label htmlFor="confirmationPassword" className="form-label">Tipo de Usuario</label>
                      <select className="form-select" aria-label="Default select example" value={rol} onChange={(e)=> setRol(e.target.value)} type='number' required>
                          <option value="1">Usuario</option>
                          <option value="2">Administrador</option>
                          <option value="3">Super Administrador</option>
                      </select>
                  </div>
                  <button type="submit" className="btn btn-primary">Editar</button>       
              </form>
          </div>
      </div>
    )

}
 export default EditSupAdmin