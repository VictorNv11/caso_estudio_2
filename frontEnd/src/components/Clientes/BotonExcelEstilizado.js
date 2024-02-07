import React, { useState } from "react";
import { Button, Spinner } from "reactstrap";
import * as XLSX from "xlsx";

const BotonExcelEstilizado = ({ clientes }) => {
  const [loading, setLoading] = useState(false);

  const titulo = [{ A: "Reporte de Clientes" }, {}];

  const informacionAdicional = {
    A: "Creado por: SuperAdministrador el Martes, 07 de Febrero del 2024",
  };

  const longitudes = [5, 35, 25, 20, 10, 10];

  const handleDownload = () => {
    setLoading(true);

    let tabla = [
      {
        A: "cc/nit",
        B: "Nombre Completo",
        C: "direccion",
        D: "ciudad",
        E: "telefono",
        F: "correo electronico",
    
      },
    ];

    clientes.forEach((cliente) => {
      tabla.push({
        A: cliente.cc_nit.replace(/_/g, "/"),
        B: cliente.nombre_completo,
        C: cliente.direccion,
        D: cliente.ciudad,
        E: cliente.telefono,
        F: cliente.correo_electronico,
        
      });
    });

    const dataFinal = [...titulo, ...tabla, informacionAdicional];

    setTimeout(() => {
      creandoArchivo(dataFinal);
      setLoading(false);
    }, 1000);
  };

  const creandoArchivo = (dataFinal) => {
    const libro = XLSX.utils.book_new();

    const hoja = XLSX.utils.json_to_sheet(dataFinal, { skipHeader: true });

    hoja["!merges"] = [
      XLSX.utils.decode_range("A1:G1"),
      XLSX.utils.decode_range("A2:G2"),
      XLSX.utils.decode_range("A34:G34"),
    ];

    let propiedades = [];

    longitudes.forEach((col) => {
      propiedades.push({
        width: col,
      });
    });

    hoja["!cols"] = propiedades;

    XLSX.utils.book_append_sheet(libro, hoja, "Clientes");

    XLSX.writeFile(libro, "ClientesEstilizado.xlsx");
  };

  return (
    <>
      {!loading ? (
        <Button color="success" onClick={handleDownload}>
          Excel Estilizado
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

export default BotonExcelEstilizado;
