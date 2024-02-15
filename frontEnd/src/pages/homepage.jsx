import React from 'react';
import { Link } from 'react-router-dom';
import img_home from '../assets/img/img_home.png';
import Logo from '../assets/img/planetas.png';

const Homepage = () => {
    return (
        // <div>
        //     <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#0E0B16", borderRadius: 5 }}>
        //         <a className="navbar-brand" style={{ paddingLeft: 20, color: "#E7DFDD" }}>Mis Usuarios </a>
        //         <a className="navbar-brand" href="#">
        //             <img src={Logo} alt="Logo" title='Logo de la Pagina' style={{ paddingLeft: 20, width: 50, height: 30 }} />
        //         </a>
        //         <div className="collapse navbar-collapse" id="navbarNav">
        //             <ul className="navbar-nav ml-auto">
        //                 <li className="nav-item">
        //                     <Link to="/features" className="nav-link" style={{ color: "#E7DFDD" }}>Características</Link>
        //                 </li>
        //                 <li className="nav-item">
        //                     <Link to="/pricing" className="nav-link" style={{ color: "#E7DFDD" }}>Precios</Link>
        //                 </li>
        //             </ul>
        //         </div>
        //         <div className="ml-auto" style={{ paddingRight: 30 }}>
        //             <Link to="/login" className="btn btn-dark">Ingresar</Link>
        //         </div>
        //     </nav>
        //     <body className='fondo'>
        //         <section>
        //             <div>
        //                 <div>
        //                     <h1 style={{ textAlign: 'center', paddingTop: '3%', color: "#E7DFDD" }}>¡Descubre Mis Usuarios!</h1>
        //                 </div>
        //                 <div style={{ textAlign: 'center', margin: '20px 0' }}>
        //                     <hr style={{ border: '1px solid #E7DFDD', width: '80%', margin: '0 auto' }} />
        //                 </div>
        //                 <div className="container">
        //                     <div style={{ overflow: 'auto' }}>
        //                         <img src={usuarios} title='imagen de inicio' alt='imagen de inicio' style={{ float: 'left', marginRight: 20, borderRadius: "20%", width: 626, height: 380 }} />
        //                         <div style={{ marginLeft: 30 }}>
        //                             <h3 style={{ color: "#E7DFDD" }}>Sobre Nosotros</h3>
        //                             <p style={{ textAlign: 'left', color: "#828081" }}>Descubre una nueva forma de gestionar tus usuarios. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate deserunt fugit recusandae earum perferendis quaerat? Eaque repudiandae vero quas fuga, praesentium inventore tempora maxime, atque neque illum molestias ducimus pariatur?
        //                                 Lorem ipsum dolor sit amet consectetur</p>
        //                             <h3 style={{ color: "#E7DFDD" }}>¡¡Regístrate ya!!</h3>
        //                             <h6 style={{ color: "#828081" }}>Por los Siguientes Motivos</h6>
        //                             <p style={{ textAlign: 'left', color: "#828081" }}>Experimenta la mejor plataforma de administración de usuarios. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima assumenda quaerat iste consequatur possimus dolorem incidunt in molestiae ipsam inventore doloremque, delectus nisi pariatur. Earum excepturi consequuntur veritatis suscipit quos.
        //                             </p>
        //                         </div>
        //                         <Link to='/formRegistro' className='btn btn-primary' style={{ marginLeft: '13%', marginTop: '1%' }}>¡Regístrate Ahora!</Link>
        //                     </div>
        //                 </div>
        //             </div>
        //         </section>
        //     </body>
        //     <footer style={{ position: 'fixed', bottom: 0, width: '100%', backgroundColor: '#0E0B16' }}>
        //         <div className="container-fluid">
        //             <div className="row p-5 pb-2  text-white">
        //                 <div className="col-xs-12 col-md-6 col-lg-3">
        //                     <p className="h3">Gestión de Usuarios</p>
                           
        //                 </div>
        //                 <div className="col-xs-12 col-md-6 col-lg-3">
        //                     <p className="h5 mb-3">Contactos</p>
        //                     <div className="mb-2">
        //                         <a className='text-secondary text-decoration-none' href="#">Facebook</a>
        //                     </div>
        //                     <div className="mb-2">
        //                         <a className='text-secondary text-decoration-none' href="#">GitHub</a>
        //                     </div>
        //                     <div className="mb-2">
        //                         <a className='text-secondary text-decoration-none' href="#">Gmail</a>
        //                     </div>

        //                 </div>

        //                 <div className="col-xs-12 col-md-6 col-lg-3">
        //                     <p className="h5">Enlaces</p>
        //                     <div className="mb-2">
        //                         <a className='text-secondary text-decoration-none' href="#">Terms & Conditions</a>
        //                     </div>
        //                     <div className="mb-2">
        //                         <a className='text-secondary text-decoration-none' href="#">Private Policy</a>
        //                     </div>
        //                 </div>
        //                 <div className="col-xs-12 col-md-6 col-lg-3">
        //                     <p className="h5">Acerca De</p>
        //                     <div className="mb-2">
        //                         <a className='text-secondary text-decoration-none' href="#">Documentos</a>
        //                     </div>
        //                 </div>
        //                 <div className="col-xs-12 pt-4">
        //                 <p className='text-white text-center'>Copyright - All rights reserved © 2024</p>
        //                 </div>
        //             </div>
        //         </div>
        //     </footer>
        // </div>
  <div >
      <header className="navbar navbar-expand-md navbar-dark fixed-top bg-transparent">
        <div className="container">
        <a className="navbar-brand" href="#">
          <img src={Logo} alt="Logo" title='Logo de la Pagina' style={{ paddingLeft: 20, width: 50, height: 30 }} />
        </a>
          <a className="navbar-brand">Mi Sitio</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li class="nav-item">
            <a class="nav-link active" aria-current="page">Inicio</a>
          </li>
              <li className="nav-item">
              <a class="nav-link disabled" aria-disabled="true">Contacto</a>
              </li>
            </ul>
          </div>
          <div className="ml-auto" style={{ paddingRight: 30 }}>
            <Link to="/login" className="btn btn-primary">Ingresar</Link>
          </div>
        </div>
      </header>

      <section className="hero text-white text-center" style={{ backgroundImage: `url(${img_home})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center center' }}>
        <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
          <h1 className="display-4">Bienvenido a Mi Sitio</h1>
          <p className="lead">Descubre más acerca de nosotros y cómo podemos ayudarte.</p>
          <a className="btn btn btn-lg" href="#about" role="button" style={{backgroundColor:'#BF9DFC'}}>Acerca de Nosotros</a>
        </div>
      </section>

      <section className="py-5" id="about">
        <div className="container">
          <h2 className="mb-5">Sobre Nosotros</h2>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro adipisci veniam quae eligendi rerum odio totam corporis, impedit obcaecati illum, iure at laborum nihil architecto nulla saepe excepturi ut unde? Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum earum ipsam harum modi mollitia consectetur tenetur similique aliquam, recusandae quos nam architecto hic nulla eum error sit laboriosam vel perspiciatis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat aliquam sequi soluta eum eligendi perspiciatis, beatae incidunt esse animi rerum aut. Eius fugit eaque maiores, laborum ipsum laboriosam odit tempore?</p>
          <a className="btn btn-primary btn-lg" href="/formRegistro" role="button">Registrate</a>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3">
        <div className="container">
          <p>©  2024 Mi Sitio. Todos los derechos reservados.</p>
        </div>
      </footer>
     
  </div>

    );
}

export default Homepage;
