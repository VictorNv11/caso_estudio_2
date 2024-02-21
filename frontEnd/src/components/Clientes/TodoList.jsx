import React from 'react'
import { TodoAdd } from '../Clientes/TodoAdd'
import { Servicios } from '../Clientes/Servicios'


export const TodoList = () => {
  return (
    <div className='card-to-do'>
        <h1>Lista de Servicios</h1>
    <div className='counter-todos'>
        <h3>N° Servicios: 4</h3>
        <h3>Pendientes: 3</h3>
    </div>
    <div className="add-todo">
        <h3>Agregar Servicios</h3>
        <TodoAdd/>
    </div>
    <Servicios/>
    </div>
  )
}
