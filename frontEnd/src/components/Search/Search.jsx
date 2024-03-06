import React, { useState } from 'react';

const Buscador = ({ datos, onBuscar }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setQuery(inputValue);

    // En lugar de pasar los resultados, pasa el término de búsqueda
    onBuscar(inputValue);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Buscar..."
      />
    </div>
  );
};

export default Buscador;
