import React from 'react';
import { Link } from 'react-router-dom';
import usuarios from '../assets/img/img_home.jpg';
export default function Homepage() {

  
    return (
        <div>
        <nav className="navbar navbar-expand-lg" style={{backgroundColor:"#0E0B16 "}}>
          <a className="navbar-brand"  style={{paddingLeft: 20, color:"#E7DFDD"}}>Mis Usuarios </a>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
            </ul>
          </div>
          <div className="ml-auto" style={{paddingRight: 30}}>
          <Link to="/login" className="btn btn-dark">Ingresar</Link>
          </div>
        </nav>
        <body className='fondo'>
        <section>
          <div>
            <div>
              <h1 style={{textAlign: 'center', paddingTop: '3%'}}>Bienvenido a mis Usuarios</h1>
            </div>
            <div style={{textAlign: 'center', margin: '20px 0'}}>
              <hr style={{border: '1px solid black', width: '80%', margin: '0 auto'}} />
            </div>
            <div className="container">
              <div style={{overflow: 'auto'}}>
                <img src={usuarios} title='imagen de inicio' alt='imagen de inicio' style={{float: 'left', marginRight: 20, width: 626, height:380}} />
                <div style={{marginLeft: 30}}>
                  <h3>Sobre Nosotros</h3>
                  <p style={{textAlign: 'left'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate deserunt fugit recusandae earum perferendis quaerat? Eaque repudiandae vero quas fuga, praesentium inventore tempora maxime, atque neque illum molestias ducimus pariatur?
                    Lorem ipsum dolor sit amet consectetur</p>
                  <h3>¡¡Registrate ya!!</h3>
                  <h6 >Por los Siguientes Motivos</h6>
                  <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima assumenda quaerat iste consequatur possimus dolorem incidunt in molestiae ipsam inventore doloremque, delectus nisi pariatur. Earum excepturi consequuntur veritatis suscipit quos.
                  </p></div>
                    <Link to='/formRegistro' className='btn btn-dark' style={{marginLeft:'41%', marginTop:'2%'}}>Registrarme</Link>
              </div>
            </div>
          </div>
        </section>
        </body>
      </div>
      
    );
}