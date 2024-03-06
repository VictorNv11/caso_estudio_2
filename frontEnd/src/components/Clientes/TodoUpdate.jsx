import React, { useRef, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { useForm } from '../../hooks/useForm';
import Modal from '../Modal/Modal';


const estilos ={

  root: {
    '--rojo': '#ba181b',
    '--azul': '#00b4d8',
    '--azul-hover': '#48cae4',
    '--rojo-hover': '#e5383b',
    '--verde': '#09a129',
  },
  body: {
    maxWidth: '1200px',
    margin: '40px auto',
    display: 'flex',
    justifyContent: 'center',
  },
  inputUpdate: {
    border: 'none',
    fontWeight: '500',
    fontSize: '18px',
    color: '#E7DFDD',
    width: '100%',
    outline: 'none',
    backgroundColor:'black'
  },
  textDecorationDashed: {
    textDecoration: 'line-through',
  },
  btnEdit: {
    backgroundColor: '#00b4d8',
    color: '#fff',
    padding: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    borderRadius: '50%',
    transition: 'all 0.3s',
    cursor: 'pointer',
  },
  btnEditHover: {
    backgroundColor: '#48cae4',
  },
  form: {
    display: 'flex',
    gap: '20px',
  },

}

export const TodoUpdate = ({todo, handleUpdateTodo}) => {
  
  const {updateDescription, updatePrice, onInputChange} =useForm({
    updateDescription: todo.description,
    updatePrice: todo.price,
  });

  const [disabled, setDisabled] =useState(true);
  const focusInputRef =useRef();
  const [error, setError] = useState(null);

  const onSubmitUpdate = e =>{
    e.preventDefault();

    if (!updateDescription || !updatePrice) {
      setError('Por favor completa todos los campos.');
      return;
  }

  if (updateDescription.length <= 1) {
      setError('La descripción debe tener al menos 2 caracteres.');
      return;
  }

  if (isNaN(updatePrice)) {
    setError('El precio debe ser un número válido.');
    return;
}

    const  id = todo.id
    const description = updateDescription;
    const done = todo.done;
    const price = updatePrice;

    try {
      handleUpdateTodo(id, description, done, price);
      setDisabled(!disabled);
      focusInputRef.current.focus();
      setError(null);
  } catch (error) {
      console.error(error.message);
      setError('Ocurrió un error al actualizar el todo. Por favor, inténtalo de nuevo más tarde.');
  }


  };

  const closeModal = () => {
    setError(null);
  };

  
  return (
    <>
    <form onSubmit={onSubmitUpdate} style={estilos.form}>
    <input
      type="text"
      style={{ ...estilos.inputUpdate, ...(todo.done ? estilos.textDecorationDashed : {}) }}
      name="updateDescription"
      value={updateDescription}
      onChange={(e) => onInputChange(e, "updateDescription")}
      placeholder="¿Qué hay que hacer?"
      readOnly={disabled}
      ref={focusInputRef}
    />

<input
      type="text"
      style={{ ...estilos.inputUpdate, ...(todo.done ? estilos.textDecorationDashed : {}) }}
      name="updatePrice"
      value={updatePrice}
      onChange={(e) => onInputChange(e, "updatePrice")}
      placeholder="¿Cuánto cuesta?"
      readOnly={disabled}
      ref={focusInputRef}
      inputMode="numeric"  // Agregado para quitar las flechas
    />
   <button style={{ ...estilos.btnEdit, ...(updateDescription && estilos.btnEditHover) }} type="submit">
  <FaEdit />
</button>
  </form>
  {/* Mostrar el modal de error si hay un error */}
  {error && (
        <Modal isOpen={true} onClose={closeModal} title="Error">
          <p style={{ fontSize: '20px', margin: '5px 0'}}>{error}</p>
        </Modal>
      )} 
  </>
  );
};