import React from 'react';
import { Link } from 'react-router-dom';
import usuarios from '../assets/img/usuarios.jpg'
export default function Homepage() {

  
    return (
        <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand"  style={{paddingLeft: 20}}>Mis Usuarios </a>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
            </ul>
          </div>
          <div className="ml-auto" style={{paddingRight: 30}}>
          <Link to="/login" className="btn btn-light">Ingresar</Link>
          </div>
        </nav>
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
                <img src={usuarios} style={{float: 'left', marginRight: 20}} />
                <div style={{marginLeft: 30}}>
                  <h3>Sobre Nosotros</h3>
                  <p style={{textAlign: 'left'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate deserunt fugit recusandae earum perferendis quaerat? Eaque repudiandae vero quas fuga, praesentium inventore tempora maxime, atque neque illum molestias ducimus pariatur?
                    Lorem ipsum dolor sit amet consectetur</p>
                  <h3>¡¡Registrate ya!!</h3>
                  <h6>Por los Siguientes Motivos</h6>
                  <p style={{textAlign: 'left'}}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima assumenda quaerat iste consequatur possimus dolorem incidunt in molestiae ipsam inventore doloremque, delectus nisi pariatur. Earum excepturi consequuntur veritatis suscipit quos.
                  </p></div>
                    <Link to='/formRegistro' className='btn btn-dark' style={{marginLeft:'33%', marginTop:'1%'}}>Registrarme</Link>
              </div>
            </div>
          </div>
        </section>
      </div>
      
    );
}