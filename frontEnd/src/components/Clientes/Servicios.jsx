import React, { useState, useEffect } from 'react';
import { TodoItem } from './TodoItem';
import Buscador from '../Search/Search';



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
	
}

export const Servicios = ({
	
	todos,
	handleUpdateTodo,
	handleDeleteTodo,
	handleCompleteTodo,
}) => {

	const [filteredTodos, setFilteredTodos] = useState(todos);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  // Efecto secundario para actualizar filteredTodos cuando cambian los todos
  useEffect(() => {
	if (!todos || !Array.isArray(todos)) {
		setError("Los datos de los servicios no son válidos");
		return;
	}

    const filtered = todos.filter(todo =>
      todo.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
	  (todo.price && todo.price.toString().toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredTodos(filtered);
	setError(null);
  }, [todos, searchTerm]);

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const todosDescriptions = todos ? todos.map(todo => todo.description): [];
	return (
		<div>
			 {error && <div>{error}</div>}
           <Buscador datos={todosDescriptions} onBuscar={handleSearch} />
            <ul>
                {filteredTodos.map(todo => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        handleUpdateTodo={handleUpdateTodo}
                        handleDeleteTodo={handleDeleteTodo}
                        handleCompleteTodo={handleCompleteTodo}
                    />
                ))}
            </ul>
        </div>
	);
};