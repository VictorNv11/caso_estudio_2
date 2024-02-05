import React, { useState, useEffect } from "react";
import axios from "axios";
import Papa from 'papaparse';
import { Link } from "react-router-dom";

export default function ImportClient() {
  const [selectedFile, setSelectedFile] = useState(null);
  const endpoint = 'http://localhost:8000/api/clientes/import';
  const endpointdata = 'http://localhost:8000/api/clientes';
  const [contenido, setContenido] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [clientesFromDB, setClientesFromDB] = useState([]);

  useEffect(() => {
    // Llamamos a la función para obtener los clientes
    getAllClientes();
  }, []);

  const getAllClientes = async () => {
    try {
      const response = await fetch(endpointdata);
      if (response.ok) {
        const data = await response.json();
        setClientesFromDB(data);
      } else {
        console.error(`Error fetching data from ${endpointdata}: ${response.statusText}`);
      }
      } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleFileChange = (event) => {

    const file = event.target.files[0];


    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();

      reader.onload = function (e) {
        const fileContent = e.target.result;

        Papa.parse(fileContent, {
          complete: function (result) {
            // El resultado contiene data, errors y meta
            // data es un array donde cada elemento es una fila (cada fila es un array de campos)
            const linesArray = result.data;
            setContenido(linesArray);

            // Puedes hacer algo más con el array de líneas si es necesario
            console.log('Contenido del archivo CSV en un array:', linesArray);
          },
          header: false, // Si la primera fila del CSV es el encabezado, establecer en true
        });
      };

      // Lees el contenido del archivo como texto
      reader.readAsText(file);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    if (selectedFile) {
      console.log('cont', contenido)
      const formData = JSON.stringify({ contenido });
      console.log(formData)
      fetch(endpoint, {
        method: 'POST',
        body: formData,

      })
        .then(response => {
          console.log(response)
          if (!response.ok) {
            throw new Error(`Error en la respuesta del servidor: ${response}`);

          }
          return response.json();
          // Puedes realizar más acciones si es necesario
        })
        .then(data => {
          console.log('Archivo enviado con éxito', data);
          setSuccessMessage('Archvio enviado con exito');

          alert('Archivo enviado con éxito');
        })

        .catch(error => {
          console.error('Error al enviar el archivo:', error);

          setError('Error al enviar el archivo: ${error.message}');
        });

    } else {
      setError('Selecciona un archivo antes de subirlo');
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
                  {error && (
                    <div className="alert alert-danger" role="alert">
                      {error}
                    </div>
                  )}
                  {successMessage && (
                    <div className="alert alert-success" role="alert">
                      {successMessage}
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-2">
            <form action={`${endpointdata}/export`}method="get" encType="multipart/form-data">
              <button className="btn btn-success">Exportar</button>
            </form>
          </div>
        </div>
        <div style={{marginLeft:'4%', marginTop:'2%'}}>
            <Link to='/createC' className='btn btn-primary btn-sm' style={{marginLeft:'71%'}}>Crear</Link>{' '}
        </div>
        <div className="row">
          {clientesFromDB.length > 0 && (
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
                {clientesFromDB.map((cliente, index) => (
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
