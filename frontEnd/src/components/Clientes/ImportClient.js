// Hooks de react para variables de estado y sincronización externa
import React, { useState, useEffect } from "react";
import Footer from "../ui/Footer";
// Analizador CSV
import Papa from 'papaparse';

// Iconos de reactstrap
import { BsFillCloudArrowUpFill } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";
import { IoClose } from "react-icons/io5";

// Importando el componente para la exportación del archivo Excel
import BotonExcelDefault from "./BotonExcelDefault";

// Enrutamiento
import { Link } from "react-router-dom";
import axios from 'axios';
import Cookies from 'js-cookie';
import Logo from '..//..//assets/img/planetas.png'



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

  // Agrega un estado para almacenar temporalmente el cliente que se va a eliminar
  const [clienteToDelete, setClienteToDelete] = useState(null);

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

  // Manejo de estados
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
        // Manejo de errores
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

    // Verifica si se selecciono un archivo
    if (file) {
      const fileNameParts = file.name.split('.');
      // Extrae la extensión del archivo
      const fileExtension = fileNameParts[fileNameParts.length - 1].toLowerCase();

      // Verifica el formato del archivo
      if (fileExtension !== 'csv') {
        setError('El formato del archivo no es compatible. Selecciona un archivo CSV.');
        // Configurar el temporizador para limpiar el error después de 5 segundos
        setTimeout(() => {
          setError(null);
        }, 5000);
        return;
      }

      // Lee el contenido del archivo
      setSelectedFile(file);
      const reader = new FileReader();

      // Recarga al terminar de leer el archivo 
      reader.onload = function (e) {
        const fileContent = e.target.result;

      // Verificar si el contenido está vacío o solo contiene espacios en blanco y saltos de línea
      if (/^\s*$/.test(fileContent)) {
        setError('El archivo está vacío. Selecciona un archivo válido.');
         // Configurar el temporizador para limpiar el error después de 5 segundos
         setTimeout(() => {
          setError(null);
        }, 5000);
        return;
      }

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

  // Envío del archivo al servidor
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    if (selectedFile) { // Verifica que se haya seleccionado un archivo
      console.log('cont', contenido)
      const formData = JSON.stringify({ contenido }); // Convierte el contenido del archivo a JSON
      console.log(formData)
      fetch(endpoint, {
        method: 'POST',
        body: formData,

      }) 
        // Respuestas 
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
          // Configurar el temporizador para limpiar el error después de 5 segundos
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);

          alert('Archivo enviado con éxito');
        })

        .catch(error => {
          console.error('Error al enviar el archivo:', error);

          setError(`Error al enviar el archivo. Por favor, verifica el formato y contenido del archivo.`);
          // Configurar el temporizador para limpiar el error después de 5 segundos
        setTimeout(() => {
          setError(null);
        }, 5000);
        });

    } else {
      setError('Selecciona un archivo antes de subirlo');
       // Configurar el temporizador para limpiar el error después de 5 segundos
       setTimeout(() => {
        setError(null);
      }, 5000);
    }

  }

  // Función para mostrar el mensaje de confirmación
  const confirmDelete = (cliente) => {
    setClienteToDelete(cliente);
  };

  // Función para cancelar la eliminación
  const cancelDelete = () => {
    setClienteToDelete(null);
  };

  // Función para eliminar un cliente después de la confirmación
  const deleteCliente = async (id) => {
    if (clienteToDelete && clienteToDelete.id === id) {
    try {
      const token = Cookies.get("token");
      await axios.delete(`${endpointdata}/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      getAllClientes();
      alert('Cliente eliminado con éxito');
      setClienteToDelete(null); // Limpia el registro del cliente después de ser eliminado
    } catch (error) {
      console.error('Error deleting Cliente:', error);
    }
  }
  };
  return (
    <div  style={{ backgroundColor: '#50727B', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '100vh' }}>
      {/* NavBar */}
      <nav className="navbar bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand">Gestion de Usuarios</a>
          
              <Link className="btn" style={{backgroundColor:'#50717a', color:'white'}} to="/supAdmins">
                <i className="fa-solid fa-arrow-left"></i> Volver
              </Link>
            
          </div>
      </nav>

      <div className="container">     
        <div style={{ marginTop: '5%' }}>
          <h1 className='text-center' style={{color:'white'}}>Listado de Clientes</h1>
        </div>
        <h5 className='text-center' style={{color:'#E7DFDD'}}>Importar/Exportar - Excel</h5>
        <br />
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-6">
            <div className="row">
              
            </div>
          </div>
          <div className="col-md-2" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <BotonExcelDefault clientes={clientes} />
          </div>
        </div>
        <div
         style={{
          display: "flex",
          justifyContent: "flex-end",     
          marginTop: "2%",
          paddingBottom: "30px",
       
        }}
        >
          <input
            value={search}
            style={{ borderRadius: 5, marginRight:'10px' }}
            onChange={searcher}
            type="text"
            placeholder="Buscar por Email"
            className="form"
          />
      
          <form onSubmit={handleSubmit} style={{}}>
    <div className="col-md-6">
        <input type="file" onChange={handleFileChange} />
    </div>
    <div className="" style={{marginLeft:'10px'}}>
        
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

          <button className="btn btn-primary" onClick={handleSubmit} style={{marginLeft:'42%'}}>
              <BsFillCloudArrowUpFill style={{ color: 'white'}} /> Cargar Archivos
          </button>
          
          <Link
            to="/createC"
            className="btn btn-primary btn-sm"
            style={{ marginLeft: 'auto', marginRight: 0 }}
          > Crear
          </Link>
        </div>


        <div className="row">
          {currentClientes.length > 0 && (
            <table className="table table-striped"  style={{ marginTop: '2%', border: '1px solid black', backgroundColor: 'white' }}>
              <thead>
                <tr>
                  <th>CC/NIT</th>
                  <th>NOMBRE COMPLETO</th>
                  <th>DIRECCION</th>
                  <th>CIUDAD</th>
                  <th>TELEFONO</th>
                  <th>CORREO ELECTRONICO</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {currentClientes.map((cliente, index) => (
                  <tr key={index}>
                    <td>{cliente.cc_nit}</td>
                    <td>{cliente.nombre_completo}</td>
                    <td>{cliente.direccion}</td>
                    <td>{cliente.ciudad}</td>
                    <td>{cliente.telefono}</td>
                    <td>{cliente.correo_electronico}</td>
                    <td>
                    <Link className='btn btn-primary btn-sm' to={`/editC/${cliente.id}`}>Editar</Link>{' '}
                    <button className='btn btn-danger btn-sm' onClick={() => confirmDelete(cliente)}>Eliminar</button>             
                {clienteToDelete && (
                  <div className="modal fade show " style={{ display: 'block' }}>
                    <div className="modal-dialog">
                      <div className="modal-content bg-dark">
                        <div className="modal-header">
                          <h5 className="modal-title text-white">Confirmar eliminación</h5>
                          
                        </div>
                        <div className="modal-body text-white">
                          <p>¿Estás seguro de que deseas eliminar este cliente?</p>
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-dark border border-primary border-2" onClick={cancelDelete}>Cancelar</button>
                          <button type="button" className="btn btn-danger border border-white border-2" onClick={() => deleteCliente(clienteToDelete.id)}>Eliminar</button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                  </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <section>
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
          </section>

        </div>
      </div>
      <Footer/>
    </div>
  );
}