import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { TodoUpdate } from './TodoUpdate';
import axios from 'axios';
import Modal from '../Modal/Modal'  ;

const estilos = {
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
  },
  btnDeleteHover: {
    backgroundColor: '#e5383b',
  },
};

export const TodoItem = ({ todo, handleUpdateTodo, handleCompleteTodo, handleDeleteTodo, handleCancelDelete, handleConfirmDelete }) => {

  const [serviceToDelete, setServiceToDelete] = useState(null);
  const [error, setError] = useState(null);
  
  
  //funcion para mostrar el mensaje de confirmacion 
  const confirmDelete = (service) =>{
    setServiceToDelete(service);
  };

  //funcion para cancelar la eliminacion
  const cancelDelete =() =>{
    setServiceToDelete(null);
  };

  const closeModal = () => {
    cancelDelete(null);
  };

  return (
    <>
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
    {error && (
  <Modal isOpen={true} onClose={() => setError(null)} title="Error">
    <p style={{ fontSize: '20px', margin: '5px 0' }}>{error}</p>
  </Modal>
)}

    {/* Mostrar el modal de confirmación si hay un servicio a eliminar */}
    {serviceToDelete && (
        <Modal isOpen={true} onClose={handleCancelDelete} title="Confirmar Eliminación">
          <p style={{ fontSize: '20px', margin: '5px 0' }}>¿Estás seguro de que deseas eliminar este servicio?</p>
          <button onClick={handleConfirmDelete}>Sí</button>
          <button onClick={handleCancelDelete}>Cancelar</button>
        </Modal>
      )}
     </>
  );
};