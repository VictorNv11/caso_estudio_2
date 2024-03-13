import Footer from '../ui/Footer';
import Avatar from '../../assets/img/avatar.png';
import { IoEyeSharp, IoEyeOffSharp } from 'react-icons/io5';
import React, {useState, useEffect} from 'react';
import { Link, useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import { CiEdit } from "react-icons/ci";

const endpoint = 'http://localhost:8000/api/usuarios/'

const PerfilUser = () => {

    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [rol, setRol] = useState(1)
    const navigate = useNavigate()
    const {id} = useParams()

    const  update =  async (e) =>{
        e.preventDefault()
        await axios.put(`${endpoint}${id}`, {
            nombre: nombre,
            email: email,
            password: password,
            phone:phone,
            rol: rol
        })
        navigate('/Usuarios')
    }
    useEffect(  () =>{
        const getUsuariosById = async () =>{
            const response = await axios.get(`${endpoint}${id}`)
            console.log(response.data)
            setNombre(response.data.nombre)
            setEmail(response.data.email)
            setPassword(response.data.password)
            setPhone(response.data.phone)
            setRol(response.data.rol)
        }
        getUsuariosById()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

  return (
    
    <div style={{backgroundColor: '#50727B'}}>
        <nav className="navbar bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand">Gestion de Usuarios</a>
          
              <Link className="btn" style={{backgroundColor:'#50717a', color:'white'}} to="/supAdmins">
                <i className="fa-solid fa-arrow-left"></i> Volver
              </Link>
            
          </div>
        </nav>
        <div className="container py-5 h-100">
           
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
                        <div className="card-body p-5 text-center">
                            <div className="mb-md-5 mt-md-4 pb-5">
                                <img src={Avatar} alt="icono de usuario" title="icono de usuario" className="img-fluid" style={{width:'10rem'}} />
                                <h2 className="fw-bold mb-2 text-">Datos del Usuario</h2>
                                <form onSubmit={update}>
                                    <div className="form-outline form-white mb-4">
                                        <label htmlFor="" className="form-label">Nombre:</label>
                                        <input value={nombre} onChange={(e)=> setNombre(e.target.value)} type="text" className="form-control form-control-lg"/>
                                        
                                    </div>
                                    <div className="form-outline form-white mb-4">
                                        <label htmlFor="" className="form-label">Documento:</label>
                                        <input type="text" className="form-control form-control-lg" disabled/>
                                        
                                    </div>
                                    <div className="form-outline form-white mb-4">
                                        <label htmlFor="" className="form-label">Teléfono:</label>
                                        <input value={phone} onChange={(e)=> setPhone(e.target.value)} type="text" className="form-control form-control-lg" disabled/>
                                    </div>
                                    <div className="form-outline form-white mb-4">
                                        <label htmlFor="" className="form-label">Correo Eletrónico:</label>
                                        <input value={email} onChange={(e)=> setEmail(e.target.value)} type="email" className="form-control form-control-lg" disabled/>
                                    </div>
                                    <div className="form-outline form-white mb-4 position-relative">
                                        <label className="form-label" htmlFor="typePasswordX">Contraseña</label>
                                    <div className="input-group">
                                       
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            id="typePasswordX"
                                            className="form-control form-control-lg"
                                            value={password} onChange={(e)=>setPassword(e.target.value)}
                                        />
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
                                    <button type="submit" className="btn btn-outline-light btn-lg px-5">Editar<CiEdit /></button> 
                                </form>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>
  )
}

export default PerfilUser