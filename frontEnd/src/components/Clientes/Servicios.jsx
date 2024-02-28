import React from 'react';
import { TodoItem } from './TodoItem';



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
	
}

export const Servicios = ({
	todos,
	handleUpdateTodo,
	handleDeleteTodo,
	handleCompleteTodo,
}) => {
	return (
		<ul style={estilos.ul}>
		{todos.map((todo) => (
		  <TodoItem
			key={todo.id}
			todo={todo}
			handleUpdateTodo={handleUpdateTodo}
			handleDeleteTodo={handleDeleteTodo}
			handleCompleteTodo={handleCompleteTodo}
		  />
		))}
	  </ul>
	);
};
