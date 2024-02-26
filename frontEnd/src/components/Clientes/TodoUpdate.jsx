import React, { useRef, useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { useForm } from '../../hooks/useForm'

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
  inputUpdate: {
    border: 'none',
    fontWeight: '500',
    fontFamily: 'inherit',
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
    fontFamily: 'inherit',
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
  
  const {updateDescription, onInputChange} =useForm({
    updateDescription:todo.description,
  });

  const [disabled, setDisabled] =useState(true)
  const focusInputRef =useRef()


  const onSubmitUpdate = e =>{
    e.preventDefault()

    const  id = todo.id
    const description = updateDescription;
    const done = true;

    handleUpdateTodo(id, description, done);

    setDisabled(!disabled);

    focusInputRef.current.focus();


  };

  
  return (
    <form onSubmit={onSubmitUpdate} style={estilos.form}>
    <input
      type="text"
      style={{ ...estilos.inputUpdate, ...(todo.done ? estilos.textDecorationDashed : {}) }}
      name="updateDescription"
      value={updateDescription}
      onChange={onInputChange}
      placeholder="¿Qué hay que hacer?"
      readOnly={disabled}
      ref={focusInputRef}
    />
   <button style={{ ...estilos.btnEdit, ...(updateDescription && estilos.btnEditHover) }} type="submit">
  <FaEdit />
</button>
  </form>
  );
};
