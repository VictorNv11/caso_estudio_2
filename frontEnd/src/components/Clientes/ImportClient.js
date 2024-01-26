import React, { useState, useEffect } from "react";
import axios from "axios"; // Asegúrate de importar axios


export default function ImportClient() {
  const [clientes, setClientes] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const endpoint = 'http://localhost:8000/api/clientes/import';
  const endpointdata = 'http://localhost:8000/api/clientes';
  

  useEffect(() => {
    // Llamamos a la función para obtener los clientes
    getAllClientes();
  }, []);

  const getAllClientes = async () => {
    try {
      // Realizamos la solicitud al backend para obtener los datos de clientes
      const response = await axios.post(endpointdata, formData);
      console.log('Import successful:', response);
      
      // Actualizamos el estado con los datos obtenidos
      setClientes(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(selectedFile){
      const formData = new FormData();
      formData.append('excelFile',selectedFile);
      fetch(endpoint, {
        method:'POST',
        body: formData,

      })

      .then(response => {
        if (!response.ok) {
          throw new Error(`Error en la respuesta del servidor: ${response.statusText}`);
        }
        console.log('Archivo enviado con éxito');
        // Puedes realizar más acciones si es necesario
      })
      .catch(error=>{
        console.error('Error al enviar el archivo:', error);
      });
      
    } else{
      console.error('Selecciona un archivo antes de subirlo');
    }
    
  }


  return (
    <div>
      <div className="container">
        <title>Importar/Exportar - Excel</title>
        <br />
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-6">
            <div className="row">
            <form onSubmit={handleSubmit}>
                <div className="col-md-6">
                  <input type="file" onChange={handleFileChange} />
                </div>
                <div className="col-md-6">
                  <button className="btn btn-primary" type="submit">
                    Importar
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-2">
            <form action={`${endpoint}/clientes/export`} method="get" encType="multipart/form-data">
              <button className="btn btn-success">Exportar</button>
            </form>
          </div>
        </div>
        <div className="row">
          {clientes.length > 0 && (
            <table className="table table-striped">
              <thead>
                <tr>
                  <td>CC/NIT</td>
                  <td>NOMBRE COMPLETO</td>
                  <td>DIRECCION</td>
                  <td>CIUDAD</td>
                  <td>TELEFONO</td>
                  <td>CORREO ELECTRONICO</td>
                </tr>
              </thead>
              <tbody>
                {clientes.map((cliente, index) => (
                  <tr key={index}>
                    <td>{cliente['cc/nit']}</td>
                    <td>{cliente.nombre_completo}</td>
                    <td>{cliente.direccion}</td>
                    <td>{cliente.ciudad}</td>
                    <td>{cliente.telefono}</td>
                    <td>{cliente.correo_electronico}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
