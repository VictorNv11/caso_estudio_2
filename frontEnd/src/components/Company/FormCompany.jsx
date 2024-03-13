import React, { useState } from 'react';
import GenericForm from '../Formulario/FormularioGenerico';
import axios from "axios";
import NavBar from '../NavBar/NavBar';

const FormCompany = () => {
    
  const [file, setFile]=useState(null);

   const endpoint = 'http://localhost:8000/api'; 

   const handleSubmit = async (formData) => {
    try {
      const formDataWithStatus = { ...formData, status: false };
  
      const formDataWithFile = new FormData();
      Object.keys(formDataWithStatus).forEach((key) => {
        formDataWithFile.append(key, formDataWithStatus[key]);
      });
  
if(file){
  formDataWithFile.append('document', file);
}

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
    name_company:'',
    address: '',
    nit: '',
    phone:'',
    email:''
  };

  return (
    <div style={{backgroundColor: '#50727B'}}>     
      <NavBar />    
      <GenericForm 
        fields={initialFormFields} 
        onSubmit={handleSubmit} 
        title="Creación de Compañías" 
        buttonText="Solicitar Creación"
        labels={{
          name_company: 'Nombre de la Compañía',
          address: 'Dirección',
          nit: 'NIT',
          phone: 'Teléfono',
          email: 'Correo Electrónico',
          document: 'Archivo de la Compañía'
        }}
        additionalInputs={{
          document:(
            <input type='file' onChange={(e) =>setFile(e.target.files[0])}/>
          )
        }}
        />
    </div>
  );
};

export default FormCompany;
