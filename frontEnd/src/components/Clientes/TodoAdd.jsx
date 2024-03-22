import React, { useState, useEffect } from 'react'
import { useForm } from '../../hooks/useForm'
import axios from 'axios';
import Modal from '../Modal/Modal';
import ShowSupAdmin from '../supAdmin/ShowSupAdmin';


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

    fontSize: '17px',
    color: '#555',
  },
  btnAdd: {
    border: 'none',
    backgroundColor: '#00b4d8',
    color: '#fff',
    padding: '5px 40px',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '17px',
    marginTop:'9%'
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

export const TodoAdd = ({ handleNewTodo }) => {
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const endpoint = 'http://localhost:8000/api';


 useEffect(() => {
    const getAllUsers = async () => {
      try {
        const response = await axios.get(`${endpoint}/users`);
        // Verificar si response.data.users es un array antes de filtrarlo
        if (Array.isArray(response.data.users)) {
          // Filtrar solo los usuarios con el rol 3
          const filteredUsers = response.data.users.filter(user => user.roles === 3);
          setUsers(filteredUsers);
        } else {
          console.error('Error fetching users: response.data.users is not an array');
          setUsers([]); // Inicializar users como un array vacío en caso de error
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        setUsers([]); // Inicializar users como un array vacío en caso de error
      }
    };

    getAllUsers();
  }, []);

  const {description, price, onInputChange, onResetForm} = useForm({
    description: '', price:0
  });


  const onFormSubmit  = async e =>{
    e.preventDefault();

    if (!description || !price) {
      setError('Por favor completa todos los campos.');
      return;
    }

    if (description.length <= 1) {
      setError('La descripción debe tener al menos 2 caracteres.');
      return;
  }

  if (isNaN(price)) {
    setError('El precio debe ser un número válido.');
    return;
}

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
        // Agrega el nuevo todo solo si la solicitud es exitosa
      handleNewTodo(newTodo);
      onResetForm();
    } catch (error) {
      console.error(error.message);
      setError('Ocurrió un error al agregar el servicio. Por favor, inténtalo de nuevo más tarde.');
    }

  };

  const closeModal = () => {
    setError(null);
  };

  return (
    <>
      <form onSubmit={onFormSubmit} style={{ ...estilos.form, display: 'flex', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', marginRight: '10px' }}>
          <p>Tarea</p>
          <input
            type="text"
            style={estilos.inputAdd}
            name="description"
            value={description}
            onChange={onInputChange}
            placeholder="¿Qué hay que hacer?"
          />
            <h6 style={{marginTop: '10px'}}>Asignar tarea a un usuario</h6>
          <select
            style={{ ...estilos.inputAdd, marginTop: '5px' }}
            name="user"
          >
            <option value="">Escoger el usuario</option>
            {users.map(user => (
              <option key={user._id} value={user._id}>{user.name}</option>
            ))}
          </select>
        </div>
        <div>
          <p>Costo</p>
          <input
            type="text"
            style={{ ...estilos.inputAdd, width: '100%' }}
            name="price"
            value={price}
            onChange={onInputChange}
            inputMode="numeric" // Agregado para quitar las flechas
          />
        </div>
        <button style={{ ...estilos.btnAdd, ...(description && estilos.btnAddHover)}} type="submit">
          Agregar
        </button>
      </form>
      {/* Mostrar el modal de error si hay un error */}
      {error && (
        <Modal isOpen={true} onClose={closeModal} title="Error">
          <p style={{ fontSize: '20px', margin: '5px 0' }}>{error}</p>
        </Modal>
      )}
    </>
  );
};