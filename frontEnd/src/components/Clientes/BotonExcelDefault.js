import React, { useState } from "react";
import { Button, Spinner, Alert } from "reactstrap";
import * as XLSX from "xlsx";
import { BsFillCloudArrowDownFill } from "react-icons/bs";

const BotonExcelDefault = ({ clientes }) => {
  const [loading, setLoading] = useState(false);
  const [noData, setNoData] = useState(false); // Nuevo estado para manejar la ausencia de datos

  const handleDownload = () => {
    try {
      console.log('Iniciando descarga...');
      setLoading(true);

      if (!clientes || clientes.length === 0) {
        // Si la lista de clientes está vacía, mostrar un mensaje y salir
        console.warn('No hay datos para exportar.');
        setLoading(false);
        setNoData(true); // Establecer el estado para indicar que no hay datos
        return;
      }

      const libro = XLSX.utils.book_new();
      const hoja = XLSX.utils.json_to_sheet(clientes);
      XLSX.utils.book_append_sheet(libro, hoja, 'Clientes');

      setTimeout(() => {
        XLSX.writeFile(libro, 'ClientesDefault.xlsx');
        setLoading(false);
        setNoData(false); // Establecer el estado para indicar que no hay datos
        console.log('Descarga completa.');
      }, 1000);
    } catch (error) {
      // Manejo de errores al exportar
      console.error('Error al exportar a Excel:', error);
      setNoData(false); // Asegurar que se restablezca en caso de error
      setLoading(false);
      throw new Error('Error al exportar a Excel. Inténtalo de nuevo.');
    }
  };
    
    
  
    return (
      <>
       {noData && (
        <Alert color="warning">
          No hay datos para exportar. Asegúrate de tener datos antes de intentar la exportación.
        </Alert>
      )}
        {!loading ? (
          <Button color="primary"  style={{ 
            
            border: 'none',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Agregamos una sombra sutil
          }}
          onMouseOver={(e) => e.target.style.background = ''}
          onMouseOut={(e) => e.target.style.background = ''}
           onClick={handleDownload} className=" d-lg-block">
        <BsFillCloudArrowDownFill style={{ color: 'white', marginRight: '8px' }} />Extraer a Excel 
          </Button>
     
        
         
        ) : (
          <Button color="secondary"  style= {{background: 'success'}} disabled>
            <Spinner size="sm">Loading...</Spinner>
            <span> Generando...</span>
          </Button>
        )}
      </>
    );
  };
  
  export default BotonExcelDefault;
  