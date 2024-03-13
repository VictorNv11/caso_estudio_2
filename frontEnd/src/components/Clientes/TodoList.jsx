import React from 'react'
import { TodoAdd } from '../Clientes/TodoAdd'
import { Servicios } from '../Clientes/Servicios';
import { useTodo } from '../../hooks/useTodo'
import Logo from '..//..//assets/img/planetas.png'
import { AiTwotoneBell } from 'react-icons/ai';
import Cookies from 'js-cookie';
import { Link } from "react-router-dom";
import NavBar from '../ui/NavBar';
import Footer from '../ui/Footer';

const estilos={
  
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
  cardToDo: {
    boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)',
    padding: '25px',
    borderRadius: '20px',
    width: '700px',
    margin: '40px auto',
    backgroundColor:'black'
  },
  h1: {
    textAlign: 'center',
    color: '#E7DFDD'
  },
  counterTodos: {
    margin: '40px 0',
    display: 'flex',
    justifyContent: 'space-around',
  },
  counterTodosH3: {
    fontWeight: '500',
    color: '#E7DFDD'
  },
  counterTodosSpan: {
    color: '#f29559',
    fontWeight: '700',
    fontSize: '24px',
    marginLeft: '10px',
  },
  addTodo: {
    textAlign: 'center',
    marginBottom: '40px',
    fontSize: '24px',
    color: '#E7DFDD'
  },

}

export const TodoList = () => {

  const {
    todos, 
    todosCount,
    pendingTodosCount,
    handleNewTodo,
    handleDeleteTodo,
    handleCompleteTodo,
    handleUpdateTodo,
  } = useTodo();




  return (
    <div style={{backgroundColor: '#50727B',display:'flex',flexDirection:'column',justifyContent:'space-between', minHeight: '100vh'}}> 
      <NavBar/>
    <div style={estilos.cardToDo}>
    <h1 style={estilos.h1}>Lista de Servicios</h1>
    <div style={estilos.counterTodos}>
      <h3 style={estilos.counterTodosH3}>N° Servicios: <span style={estilos.counterTodosSpan}>{todosCount}</span></h3>
      <h3 style={estilos.counterTodosH3}>Pendientes: <span style={estilos.counterTodosSpan}>{pendingTodosCount}</span></h3>
    </div>
    <div style={estilos.addTodo}>
      <h3>Agregar Servicios</h3>
      <TodoAdd handleNewTodo={handleNewTodo} />
    </div>

    <Servicios
      todos={todos}
      handleUpdateTodo={handleUpdateTodo}
      handleDeleteTodo={handleDeleteTodo}
      handleCompleteTodo={handleCompleteTodo}
    />
  </div>
  <Footer/>
  </div>
  )
}