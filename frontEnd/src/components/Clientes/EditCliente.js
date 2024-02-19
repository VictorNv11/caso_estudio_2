import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { Link, useNavigate, useParams} from 'react-router-dom'
import { IoEyeSharp, IoEyeOffSharp } from 'react-icons/io5';


const endpoint = 'http://localhost:8000/api/clientes/'

const EditCliente = () => {

    const [cc_nit, setCC_nit] = useState('')
    const [nombre_completo, setNombre_completo] = useState('')
    const [direccion, setDireccion] = useState('')
    const [ciudad, setCiudad] = useState('')
    const[telefono, setTelefono] = useState ('')
    const [correo_electronico, setCorreo_electronico] = useState('')
    const navigate = useNavigate()
    const {id} = useParams()
    


    const update = async (e) => {
        e.preventDefault();
        await axios.put(`${endpoint}${id}`, {
            cc_nit: cc_nit,
            nombre_completo: nombre_completo,
            direccion: direccion,
            ciudad: ciudad,
            telefono: telefono,
            correo_electronico: correo_electronico
        });
        navigate('/clientes');
    }
    
     useEffect( ()=>{
        const getClienteById = async () => {
            const response = await axios.get(`${endpoint}${id}`)
            setCC_nit(response.data.cc_nit.toString())
            setNombre_completo(response.data.nombre_completo)
            setDireccion(response.data.direccion)
            setCiudad(response.data.ciudad)
            setTelefono(response.data.telefono)
            setCorreo_electronico(response.data.correo_electronico)
        }
        getClienteById()
     }, [])


    return(
        <div>
            <div>
            <h1 className="title-1" style={{textAlign:'center',  marginTop: '4%', color:"#E7DFDD"}}>Editando Cliente</h1>
        </div>
        <div style={{ marginTop:'5%', backgroundColor: '#0E0B16 ', padding: '20px', borderRadius: '10px', maxWidth: '600px', margin: 'auto' }}>
              <form onSubmit={update} >
              <div className="mb-3">
                    <label htmlFor="cc_nit" className="form-label"  style={{color:"#E7DFDD" }}>CC/NIT</label>
                    <input value={cc_nit} onChange={(e)=> setCC_nit(e.target.value)} type='text' className='form-control'required />
                </div>
                <div className="mb-3">
                    <label htmlFor="nombre_completo" className="form-label"  style={{color:"#E7DFDD" }}>Nombre Completo</label>
                    <input value={nombre_completo} onChange={(e)=> setNombre_completo(e.target.value)} type='text' className='form-control'required />
                </div>
                <div className="mb-3">
                    <label htmlFor="direccion" className="form-label"  style={{color:"#E7DFDD" }}>Direccion</label>
                    <input value={direccion} onChange={(e)=>setDireccion(e.target.value)} type='text' className='form-control'required />
                </div>
                <div className="mb-3">
                    <label htmlFor="ciudad" className="form-label"  style={{color:"#E7DFDD" }}>Ciudad</label>
                    <input value={ciudad} onChange={(e)=> setCiudad(e.target.value)} type='text' className='form-control'required />
                </div>
                <div className="mb-3">
                    <label htmlFor="telefono" className="form-label"  style={{color:"#E7DFDD" }}>Telefono</label>
                    <input value={telefono} onChange={(e)=> setTelefono(e.target.value)} type='number' className='form-control'required />
                </div>
                <div className="mb-3">
                    <label htmlFor="correo_electronico" className="form-label"  style={{color:"#E7DFDD" }}>Correo Electronico</label>
                    <input value={correo_electronico} onChange={(e)=> setCorreo_electronico(e.target.value)} type='email' className='form-control'required />
                </div>
                <div style={{ paddingTop:'10px', display: 'flex', flexDirection: 'column', alignItems: 'right' }}>
                  <button type="submit" className="btn btn-primary">Editar</button> 
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'right', paddingTop:'5px' }}>
    {/* ... (otro contenido) */}
    {/* <button className='btn btn-secondary' style={{margin:'1px', marginTop: '1px 0' }}>Cancelar</button> */}
    <Link to='/clientes' className='btn btn-secondary'  style={{color:'#E7DFDD'}}>Cancelar</Link>
</div>      
              </form>
          </div>
      </div>
    )

}
 export default EditCliente