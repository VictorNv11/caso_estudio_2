import React from 'react'
import Logo from '..//..//assets/img/planetas.png';
import img_home from "..//..//assets/img/img_home.png";
import { Link, } from "react-router-dom";
import axios from "axios";


export const ReseteoContrasena = () => {

    // state={};

    // handleSubmit = e =>{
    //     e.preventDefault();

    //     const data={
    //         token:this.props.match.params.id,
    //         password:this.password,
    //         password_confirm:this.password_confirm
    //     };

    //     axios.post('reset', data).then(
    //         res=>{
    //             console.log(res);
    //             this.setState({
    //                 reset:true
    //             }
    //             )
    //         }
    //     ).catch(
    //         err=>{
    //             console.log(err);
    //         }
    //     )
        

    // }

    // if(this.state.reset){
    //     return <Redirect to={'/login'}></Redirect>

    // }

  return (
        <section className="vh-100 gradient-custom"  style={{ backgroundImage: `url(${img_home})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center center' }}>
        <header className="navbar navbar-expand-md navbar-dark fixed-top bg-transparent">
        <div className="container">
        <a className="navbar-brand">
               <img src={Logo} alt="Logo" title='Logo de la Pagina' style={{ paddingLeft: 20, width: 50, height: 30 }} />
         </a>
            <a className="navbar-brand">Mis Usuarios</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
                <ul className="navbar-nav me-auto mb-2 mb-md-0">
                    <li class="nav-item">
                        <Link to='/login'class="nav-link active">Volver </Link>
                    </li>
                </ul>
            </div>            
        </div>
    </header>
        <div className="container py-5 h-100">
               
        <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
                    <div className="card-body p-5 text-center">
                        <div className="mb-md-5 mt-md-4 pb-5">
       <form>
        <h3>Resetear Contraseña</h3>
    
        <div className="input-group">
                                        <input
                                            className="form-control form-control-lg"
                                            placeholder='ingresa tu nueva contraseña'
                                            onChange={(e) => this.password=e.target.value}
                                        />
                                        <label className="form-label" htmlFor="typePasswordX">Contraseña</label>

                                        <input
                                            className="form-control form-control-lg"
                                            placeholder='ingresa tu nueva contraseña'
                                            onChange={(e) =>this.password_confirm=e.target.value}
                                        />
                                       
                                        <label className="form-label" htmlFor="typePasswordX">Confirmar Contraseña</label>
        <button className="btn btn-outline-light btn-lg px-5">Enviar</button>
        </div>
       </form>
       </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
     </section>
  )
}
