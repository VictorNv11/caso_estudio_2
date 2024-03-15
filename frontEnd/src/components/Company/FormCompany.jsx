import React, { useEffect, useState } from 'react';
import axios from "axios";
import NavBar from '../ui/NavBar';
import Footer from './../ui/Footer';

const CompanyForm = () => {
  const endpoint = 'http://localhost:8000/api'; 
  const [formData, setFormData] = useState({
    name_company: '',
    address: '',
    nit: '',
    phone: '',
    email: '',
    document: null,
  });
  const [error, setError] = useState(null);
  const [missingFieldsError, setMissingFieldsError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null); 
  // Estado para controlar la creación de la compañía
  const [creatingCompany, setCreatingCompany] = useState(false);

  // Limpia el mensaje de error
  useEffect(() => {
    setMissingFieldsError(null);
    setError(null);
    setSuccessMessage(null); 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, document: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name_company.trim() || 
    !formData.address.trim() || 
    !formData.nit.trim() || 
    !formData.phone.trim() || 
    !formData.email.trim()) {
      setMissingFieldsError("Completa todos los campos, gracias.");
      setTimeout(() => {
          setMissingFieldsError(null);
        }, 5000);
      return;
    }

      // Validación del nombre: no debe estar vacío y solo debe contener caracteres válidos
      if (!formData.name_company || !/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/.test(formData.name_company)) {
        alert("Por favor, ingrese un nombre válido");
        return;
    }
        // Validación de correo electrónico con una expresión regular simple
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert("Por favor, ingrese un correo electrónico válido");
            return;
        }
  
        // Validación de nit: solo números y al menos 8 caracteres
        if (!/^\d{5,10}$/.test(formData.nit)) {
          alert("Por favor, ingrese un nit válido (al menos de 5 a 10 dígitos)");
          return;
      }
  
        // Validación de teléfono: solo números y al menos 7 caracteres
       if (!/^\d{10,}$/.test(formData.phone)) {
           alert("Por favor, ingrese un número de teléfono válido (al menos 10 dígitos)");
           return;
        }
            // Validación de contraseña: al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número
    /* if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)) {
       alert("La contraseña debe tener al menos 8 caracteres y contener al menos una letra mayúscula, una letra minúscula y un número");
       return;
   }*/

    try {
      setCreatingCompany(true); // Cambia el estado a true para saber que se esta creando la compañía
      const formDataToSend = new FormData();
      for (let key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      await axios.post(`${endpoint}/companies/create`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Compañía creada con éxito');
      setSuccessMessage('Solicitud para la creación de la compañía enviada con éxito');
        setFormData({ // Limpiar el formulario después de enviarlo correctamente
          name_company: '',
          address: '',
          nit: '',
          phone: '',
          email: '',
          document: null,
        });
    } catch (error) {
      console.error('Error al enviar el formulario: ', error);
      setError('Hubo un error al enviar el formulario. Por favor, inténtelo de nuevo más tarde.');
    } finally {
      setTimeout(() => {
        setCreatingCompany(false); // Reestablece el estado a false después de crear la compañía
      }, 3000);
    }

  };

  return (
    <div style={{backgroundColor: '#50727B'}}>     
      <NavBar /> 
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
                    <div className="card-body p-5 text-center">
                        <div className="mb-md-5 mt-md-4 pb-5">
                          <h2 className="fw-bold mb-2 text-">Creación de Compañía</h2> 
                          {error && <div className="alert alert-danger">{error}</div>}
                          {missingFieldsError && <div className="alert alert-danger">{missingFieldsError}</div>}
                          {successMessage && (
                            <div className="alert alert-success">
                              {successMessage}
                              <button className="btn-close" onClick={() => setSuccessMessage(null)}></button>
                            </div>
                          )}
                          {creatingCompany && <div className="alert alert-info">Creando compañía...</div>} {/* Mensaje de proceso de creación */}
                          {!creatingCompany && ( 
                          <form onSubmit={handleSubmit}>
                          <div className="form-outline form-white mb-4">
                            <label htmlFor="name_company" className="form-label">Nombre de la compañía:</label>
                            <input type="text" id="name_company" className="form-control form-control-lg" name="name_company" value={formData.name_company} onChange={handleChange}/>
                          </div>
                          <div className="form-outline form-white mb-4">
                            <label htmlFor="address" className="form-label">Dirección:</label>
                            <input type="text" id="address" className="form-control form-control-lg" name="address" value={formData.address} onChange={handleChange}/>
                          </div>
                          <div className="form-outline form-white mb-4">
                            <label htmlFor="nit" className="form-label">NIT:</label>
                            <input type="text" id="nit" className="form-control form-control-lg" name="nit" value={formData.nit} onChange={handleChange}/>
                          </div>
                          <div className="form-outline form-white mb-4">
                            <label htmlFor="phone" className="form-label">Teléfono:</label>
                            <input type="text" id="phone" className="form-control form-control-lg" name="phone" value={formData.phone} onChange={handleChange}/>
                          </div>
                          <div className="form-outline form-white mb-4">
                            <label htmlFor="email" className="form-label">Correo Electrónico:</label>
                            <input type="email" id="email" className="form-control form-control-lg" name="email" value={formData.email} onChange={handleChange}/>
                          </div>
                          <div className="form-outline form-white mb-4">
                            <label htmlFor="document" className="form-label">Documento (PDF o Excel):</label>
                            <input type="file" id="document" className="form-control form-control-lg" name="document" onChange={handleFileChange} accept='.pdf, xlsx, .xls' />
                          </div>
                          <button type="submit" className="btn btn-outline-light btn-lg px-5">Solicitar Creación</button>
                        </form>
                         )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <Footer/>

    </div>
  );
};

export default CompanyForm;
