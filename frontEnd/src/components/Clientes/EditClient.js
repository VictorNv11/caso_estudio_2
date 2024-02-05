import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { useNavigate, useParams} from 'react-router-dom'

const endpoint = 'http://localhost:8000/api/clientes/'

const EditAdmin = () => {

    const [cc_nit, setCC_NIT] = useState('');
    const [nombre_completo, setNombreCompleto] = useState('');
    const [direccion, setDireccion] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [telefono, setTelefono] = useState('');
    const [correo_electronico, setCorreoElectronico] = useState('');
    const navigate = useNavigate();
    const {id} = useParams();

    const  update =  async (e) =>{
        e.preventDefault()
        await axios.put(`${endpoint}${id}`, {
            cc_nit: cc_nit,
            nombre_completo: nombre_completo,
            direccioon: direccion,
            ciudad: ciudad,
            telefono: telefono,
            correo_electronico: correo_electronico
        })
        navigate('/clientes')
    }
    useEffect(  () =>{
        const getClientById = async () =>{
            const response = await axios.get(`${endpoint}${id}`)
            setCC_NIT(response.data.cc_nit)
            setNombreCompleto(response.data.nombre_completo)
            setDireccion(response.data.direccion)
            setCiudad(response.data.ciudad)
            setTelefono(response.data.telefono)
            setCorreoElectronico(response.data.correo_electronico)
        }
        getClientById()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return(
        <div>
            <div>
            <h1 className="title-1" style={{textAlign:'center',  marginTop: '4%'}}>Editando Cliente</h1>
        </div>
        <div style={{ marginTop:'5%', backgroundColor: '#f4f4f4', padding: '20px', borderRadius: '10px', maxWidth: '600px', margin: 'auto' }}>
            <form onSubmit={update} >
                <div className="mb-3">
                    <label htmlFor="cc_nit" className="form-label">CC/NIT</label>
                    <input value={cc_nit} onChange={(e)=> setCC_NIT(e.target.value)} type='number' className='form-control'required />
                </div>
                <div className="mb-3">
                    <label htmlFor="nombre_completo" className="form-label">Nombre Completo</label>
                    <input value={nombre_completo} onChange={(e)=> setNombreCompleto(e.target.value)} type='text' className='form-control'required />
                </div>
                <div className="mb-3">
                    <label htmlFor="direccion" className="form-label">Dirección</label>
                    <input value={direccion} onChange={(e)=> setDireccion(e.target.value)} type='text' className='form-control'required />
                </div>
                <div className="mb-3">
                    <label htmlFor="ciudad" className="form-label">Ciudad</label>
                    <input value={ciudad} onChange={(e)=>setCiudad(e.target.value)} type='text' className='form-control'required />
                </div>
                <div className="mb-3">
                    <label htmlFor="telefono" className="form-label">Telefono</label>
                    <input value={telefono} onChange={(e)=> setTelefono(e.target.value)} type='phone' className='form-control'required />
                </div>
                <div className="mb-3">
                    <label htmlFor="correo_electronico" className="form-label">Correo Eletrónico</label>
                    <input value={correo_electronico} onChange={(e)=> setCorreoElectronico(e.target.value)} type='email' className='form-control'required />
                </div>
                <button type="submit" className="btn btn-primary">Editar</button>       
            </form>
        </div>
    </div>
    )

}
export default EditAdmin