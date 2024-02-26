import React from 'react'
import { useForm } from '../../hooks/useForm'
import axios from 'axios';


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
}

export const TodoAdd = ({handleNewTodo}) => {

  const {description, onInputChange, onResetForm} = useForm({
    description: '',
  });


  const onFormSubmit  = async e =>{
    e.preventDefault();

    if(description.length <= 1) return

    let newTodo ={
      id: new Date().getTime(),
      description: description,
      done: false
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

  return (
    <form onSubmit={onFormSubmit} style={estilos.form}>
      <input
        type="text"
        style={estilos.inputAdd}
        name="description"
        value={description}
        onChange={onInputChange}
        placeholder="¿Qué hay que hacer?"
      />
      <button style={{ ...estilos.btnAdd, ...(description && estilos.btnAddHover) }} type="submit">
        Agregar
      </button>
    </form>
  )
}
