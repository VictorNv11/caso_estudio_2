import React, { useState } from "react";
import { Button, Spinner, Alert } from "reactstrap";
import * as XLSX from "xlsx";
import { BsArrowDownSquareFill } from "react-icons/bs";

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
        setNoData(true); // Establecer el estado para indicar que no hay datos
        console.log('Descarga completa.');
      }, 1000);
    } catch (error) {
      // Manejo de errores al exportar
      console.error('Error al exportar a Excel:', error);
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
          <Button color="success" onClick={handleDownload}>
           <BsArrowDownSquareFill /> Extraer a Excel 
          </Button>
        ) : (
          <Button color="success" disabled>
            <Spinner size="sm">Loading...</Spinner>
            <span> Generando...</span>
          </Button>
        )}
      </>
    );
  };
  
  export default BotonExcelDefault;
  