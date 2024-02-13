import React, { useState, useEffect } from "react";
import Papa from 'papaparse';
import { BsArrowUpSquareFill } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";
import BotonExcelDefault from "./BotonExcelDefault";
import { Link } from "react-router-dom";



export default function ImportClient() {


  // Selección de archivos
  const [selectedFile, setSelectedFile] = useState(null);

  // Rutas BackEnd
  const endpoint = 'http://localhost:8000/api/clientes/import';
  const endpointdata = 'http://localhost:8000/api/clientes';

  // Datos del Archivo Excel
  const [contenido, setContenido] = useState(null);

  // Manejo de errores
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Datos de clientes de la base de datos
  const [clientesFromDB, setClientesFromDB] = useState([]);

  // Búsqueda por correo
  const [search, setSearch] = useState('');

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Modelo Clientes
  const [clientes, setClientes] = useState([]);
  // Filtrando clientes por Correo Electrónico y Número de Teléfono
  const filteredClientes = search
  ? clientesFromDB.filter((cliente) =>
      cliente.correo_electronico.toLowerCase().includes(search.toLowerCase()) ||
      (cliente.telefono && cliente.telefono.toString().includes(search.toString()))
    )
    : clientesFromDB;
  
  const currentClientes = filteredClientes.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    // Llamamos a la función para obtener los clientes
    getAllClientes();
  }, []);

  // Búsqueda y paginación
  const searcher = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  // Obteniendo clientes de la base de datos
  const getAllClientes = async () => {
    try {
      const response = await fetch(endpointdata);
      if (response.ok) {
        const data = await response.json();
        setClientes (data);
        setClientesFromDB(data);
      } else {
        console.error(`Error fetching data from ${endpointdata}: ${response.statusText}`);
      }
      } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Importación del Archivo Excel
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
                    <BsArrowUpSquareFill /> Cargar Archivos
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
          <BotonExcelDefault clientes= {clientes} /> 
          </div>
        </div>
        <div
          style={{ marginLeft: "4%", marginTop: "2%", paddingBottom: "30px" }}
        >
          <input
    value={search}
    style={{ borderRadius: 5 }}
    onChange={searcher}
    type="text"
    placeholder="Buscar por Email"
    className="form"
  />
  <BsSearch style={{ marginLeft: 5, color: 'white' }} />

          <Link
            to="/createC"
            className="btn btn-primary btn-sm"
            style={{ marginLeft: "71%" }}
          >
            Crear
          </Link>{" "}
        </div>
        <div>
          <BotonExcelDefault clientes= {clientes}/> 
 

        </div>
        <div className="row">
          {currentClientes.length > 0 && (
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
                {currentClientes.map((cliente, index) => (
                  <tr key={index}>
                    <td>{cliente["cc/nit"]}</td>
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
          <footer>
            <div style={{ marginLeft: "44.5%", marginTop: "auto" }}>
              <ul className="pagination">
                <li
                  className="page-item"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <a className="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                {Array.from(
                  { length: Math.ceil(clientes.length / itemsPerPage) },
                  (_, index) => (
                    <li
                      className={`page-item ${
                        currentPage === index + 1 && "active"
                      }`}
                      key={index + 1}
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      <a className="page-link" href="#">
                        {index + 1}
                      </a>
                    </li>
                  )
                )}
                <li
                  className="page-item"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={
                    currentPage === Math.ceil(clientes.length / itemsPerPage)
                  }
                >
                  <a className="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
