import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { TodoUpdate } from './TodoUpdate';
import axios from 'axios';

const estilos = {
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
  listItem: {
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '20px',
  },
  ul: {
    marginTop: '50px',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  ulLi: {
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '20px',
  },
  ulLiSpan: {
    overflow: 'hidden',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
  ulLiForm: {
    flex: '1',
    display: 'flex',
    justifyContent: 'space-between',
  },
  span: {
    overflow: 'hidden',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
  form: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
  },
  containerDone: {
    backgroundColor: 'white',
    width: '24px',
    height: '24px',
    borderRadius: '20px',
    border: '2px solid #09a129',
    cursor: 'pointer',
  },
  containerDoneActive: {
    backgroundColor: '#09a129',
  },
  btnDelete: {
    backgroundColor: '#ba181b',
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
  btnDeleteHover: {
    backgroundColor: '#e5383b',
  },
};

export const TodoItem = ({ todo, handleUpdateTodo, handleCompleteTodo }) => {

  const handleDeleteTodo = async id =>{
    //     const action ={
    //         type: 'Delete Todo', 
    //         payload: id
    //     };
    //     dispatch(action)
    // };

    try {
        const url =`http://localhost:8000/api/servicios/delete/${id}`;
        const response = await axios.delete(url);
        console.log('eliminado:', response.data);
      } catch (error) {
        console.error('Error:', error.message);
      }
    }

  return (
    <li style={estilos.listItem}>
      <span
        onClick={() => handleCompleteTodo(todo.id)}
        style={{ ...estilos.ulLiSpan, ...estilos.containerDone, ...(todo.done ? estilos.containerDoneActive : {}) }}
      >
        <label htmlFor="" className="container-done"></label>
      </span>
      <TodoUpdate todo={todo} handleUpdateTodo={handleUpdateTodo} />
      <button
        style={estilos.btnDelete}
        onClick={() => handleDeleteTodo(todo.id)}
        className={estilos.btnDelete}
      >
        <FaTrash />
      </button>
    </li>
  );
};
