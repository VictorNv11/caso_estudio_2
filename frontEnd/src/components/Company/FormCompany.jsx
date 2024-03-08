import React, { useState } from 'react';
import GenericForm from '../Formulario/FormularioGenerico';
import axios from "axios";
import NavBar from '../NavBar/NavBar';

const FormCompany = () => {
    
  

   const endpoint = 'http://localhost:8000/api'; 

   const handleSubmit = async (formData) => {
    try {
      const formDataWithStatus = { ...formData, status: false };
  
      const formDataWithFile = new FormData();
      Object.keys(formDataWithStatus).forEach((key) => {
        formDataWithFile.append(key, formDataWithStatus[key]);
      });
  
      const response = await axios.post(`${endpoint}/companies/create`, formDataWithFile);
  
      if (response.status !== 201) {
        throw new Error('Error al crear la compañía');
      }
      
      console.log('Respuesta del backend:', response.data);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const initialFormFields = {
    name_company: '',
    address: '',
    nit: '',
    phone:'',
    email:'',
    document:null
  };

  return (
    <div style={{backgroundColor: '#50727B'}}>     
      <NavBar />    
      <GenericForm 
        fields={initialFormFields} 
        onSubmit={handleSubmit} 
        title="Creación de Compañías" 
        buttonText="Solicitar Creación" 
        />
    </div>
  );
};

export default FormCompany;
