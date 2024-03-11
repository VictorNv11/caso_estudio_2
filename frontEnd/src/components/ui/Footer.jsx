import React from 'react'

function Footer() {
  return (
    <div>
        <footer className="text-center" style={{backgroundColor:'#35374B'}}>
            <div className="container pt-4">
            {/* Section: Social media */}
            <section className="mb-4">
                {/* Facebook */}
                <a data-mdb-ripple-init className="btn btn-floating btn-lg" href="#!" role="button" style={{color:'white'}}><i className="fab fa-facebook-f" /></a>
                {/* Twitter */}
                <a data-mdb-ripple-init className="btn btn-floating btn-lg" href="#!" role="button" style={{color:'white'}}><i className="fab fa-twitter" /></a>
                {/* Google */}
                <a data-mdb-ripple-init className="btn btn-floating btn-lg" href="#!" role="button" style={{color:'white'}}><i className="fab fa-google" /></a>
                {/* Instagram */}
                <a data-mdb-ripple-init className="btn btn-floating btn-lg" href="#!" role="button" style={{color:'white'}}><i className="fab fa-instagram" /></a>
                {/* Linkedin */}
                <a data-mdb-ripple-init className="btn btn-floating btn-lg" href="#!" role="button" style={{color:'white'}}><i className="fab fa-linkedin" /></a>
                {/* Github */}
                <a data-mdb-ripple-init className="btn btn-floating btn-lg" href="#!" role="button" style={{color:'white'}}><i className="fab fa-github" /></a>
            </section>
            {/* Section: Social media */}
            </div>
            <div className="text-center p-3" style={{backgroundColor: 'rgba(0, 0, 0, 0.05)', color:'white'}}>
            © 2024 Copyright: Gestion de Usuarios
            </div>
        </footer>
    </div>
  )
}

export default Footer
