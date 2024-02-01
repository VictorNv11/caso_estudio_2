import React, { useState, useEffect } from "react";
//import axios from "axios";
import Papa from 'papaparse';

export default function ImportClient() {
  const [clientes] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const endpoint = 'http://localhost:8000/api/clientes/import';
  //const endpointdata = 'http://localhost:8000/api/clientes';
  const [contenido, setContenido] = useState(null);

  useEffect(() => {
    // Llamamos a la función para obtener los clientes
    getAllClientes();
  }, []);

  const getAllClientes = async () => {
    try {
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
          console.log('Archivo enviado con éxito');
          console.log(response);
          // Puedes realizar más acciones si es necesario
        })
        .catch(error => {
          console.error('Error al enviar el archivo:', error);
        });

    } else {
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
