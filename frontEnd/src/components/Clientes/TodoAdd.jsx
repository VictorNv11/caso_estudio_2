import React, { useState, useEffect } from 'react'
import { useForm } from '../../hooks/useForm'
import axios from 'axios';
import Modal from '../Modal/Modal'  ;


const estilos ={

  root: {
    '--rojo': '#ba181b',
    '--azul': '#00b4d8',
    '--azul-hover': '#48cae4',
    '--rojo-hover': '#e5383b',
    '--verde': '#09a129',
  },
  body: {
    fontFamily: 'Poppins',
    maxWidth: '1200px',
    margin: '40px auto',
    display: 'flex',
    justifyContent: 'center',
  },
  form: {
    display: 'flex',
   // flexDirection: 'column',
    gap: '20px',
  },
  inputAdd: {
    border: 'none',
    outline: 'none',
    padding: '10px 20px',
    boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.15)',
    borderRadius: '20px',
    flex: '1',
    fontFamily: 'inherit',
    fontSize: '17px',
    color: '#555',
  },
  btnAdd: {
    border: 'none',
    backgroundColor: '#00b4d8',
    color: '#fff',
    padding: '5px 40px',
    borderRadius: '20px',
    fontFamily: 'inherit',
    cursor: 'pointer',
    fontSize: '17px',
  },
  btnAddHover: {
    backgroundColor: '#48cae4',
  },
  errorText: {
    color: 'red',
    fontSize: '14px',
    marginBottom: '10px',
  },

}

export const TodoAdd = ({handleNewTodo}) => {

  const [errors, setErrors] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

  const {description, price, onInputChange, onResetForm} = useForm({
    description: '', price:0
  });

  useEffect(() => {
    // Limpiar el error al abrir el modal
    setErrors('');
  }, [isModalOpen]);


  const onFormSubmit  = async e =>{
    e.preventDefault();

      // Validar campos obligatorios
      if (!description || price === null || price === undefined) {
        setErrors(['Todos los campos son obligatorios']);
        return;
      }
  
      // Validar tipo de dato para price
      if (typeof price !== 'number' || isNaN(price)) {
        setErrors(['El campo de precio debe ser un número']);
        return;
      }
        // Si hay errores, abrir el modal
    if (errors.length > 0) {
      setModalOpen(true);
      return;
    }
      // Restablecer error en caso de éxito
      setErrors([]);
  

    if(description.length <= 1) return

    let newTodo ={
      id: new Date().getTime(),
      description: description,
      done: false,
      price: price
    }
    try {
      const url = 'http://localhost:8000/api/servicios/crear';
      const response = await axios.post(url, newTodo);
      console.log(response.data);
    } catch (error) {
      console.error(error.message);
    }



    handleNewTodo(newTodo);
    onResetForm();

  };

  const closeModal = () => {
    setErrors([]);
    setModalOpen(false);
  };

  return (
    <>
    <form onSubmit={onFormSubmit} style={estilos.form}>
       <div>
      <input
        type="text"
        style={estilos.inputAdd}
        name="description"
        value={description}
        onChange={onInputChange}
        placeholder="¿Qué hay que hacer?"
      />
      </div>
      <div> 
       <input
        type="text"
        style={{...estilos.inputAdd, width: '100%'}}
        name="price"
        value={price}
        onChange={onInputChange}
        placeholder="¿Cuánto cuesta?"
        inputMode="numeric"  // Agregado para quitar las flechas
      />
      </div>
      <button style={{ ...estilos.btnAdd, ...(description && estilos.btnAddHover) }} type="submit">
        Agregar
      </button>
    </form>
    <Modal isOpen={isModalOpen} onClose={closeModal} title="Completa todos los campos">
        <ul>
        {Array.isArray(errors) ? (
          errors.map((error, index) => (
            <li key={index} style={estilos.errorText}>
              {error}
            </li>
             ))
            ): (
              <li style={estilos.errorText}>{errors}</li>
            )}
          
        </ul>
      </Modal> 
    </>
  );
};
