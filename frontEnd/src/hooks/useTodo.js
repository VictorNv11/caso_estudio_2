import { useEffect, useReducer, useState } from "react"
import { todoReducer } from "../todoreducer"
import axios from 'axios';
export const useTodo=() => {
    const initialState =[]

    const init=() => {
        return JSON.parse(localStorage.getItem('todos')) || []
    }

    const[todos, dispatch] = useReducer(todoReducer, initialState, init)

    const todosCount= todos.length
    const pendingTodosCount= todos.filter(todo => !todo.done).length

    const [error, setError] = useState(null);


    useEffect(()=>{
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos]) 

    const handleNewTodo  = todo =>{
        const action={
            type:'Add Todo', 
            payload:todo, 
        };
        dispatch(action)
    };

 
    const handleCompleteTodo = async (id) => {
        try {
          // Realiza la solicitud para marcar el servicio como completo
          const url = `http://localhost:8000/api/servicios/complete/${id}`;
          const response = await axios.put(url);
      
          // Despacha la acción para marcar el servicio como completo en el estado local
          const action = {
            type: 'Complete Todo',
            payload: id
          };
          dispatch(action);
          
        } catch (error) {
          console.error('Error:', error.message);
        }
      };

    const handleUpdateTodo = async (id, description, done, price) => {
        try {
          const url = `http://localhost:8000/api/servicios/${id}`;
          const response = await axios.put(url, { description, done, price }); // Puedes ajustar esto según tu API
      
          const action = {
            type: 'Update Todo',
            payload: {
              id,
              description,
              done,
              price
            }
          };
          dispatch(action);
        } catch (error) {
          console.error('Error:', error.message);
        }
      };
    const handleDeleteTodo = async id =>{
        try {
            const url = `http://localhost:8000/api/servicios/delete/${id}`;
            const response = await axios.delete(url);

            const action = {
                type: 'Delete Todo',
                payload: id
            };
            dispatch(action);
        } catch (error) {
          console.error('Error deleting todo:', error.message);
          setError('Error al eliminar el servicio. Por favor, inténtalo de nuevo.')
        }
    }
   
  
    return{
        todos,
        todosCount,
        pendingTodosCount,
        handleNewTodo,
        handleDeleteTodo,
        handleCompleteTodo,
        handleUpdateTodo,
    }
}