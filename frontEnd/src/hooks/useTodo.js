import { useEffect, useReducer } from "react"
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

 
    const handleCompleteTodo = id =>{
        const action = {
            type:'Complete Todo',
            payload: id
        };
        dispatch(action)
    };

    const handleUpdateTodo =(id, description, done) =>{
        const action ={
            type:'Update Todo',
            payload:{
                id,
                description,
                done
            }
        };
        dispatch(action)
    };

    const handleDeleteTodo = async id =>{
        try {
            const url = `http://localhost:8000/api/servicios/delete/${id}`;
            const response = await axios.delete(url);
            console.log('eliminado:', response.data);

            const action = {
                type: 'Delete Todo',
                payload: id
            };
            dispatch(action);
        } catch (error) {
            console.error('Error:', error.message);
        }
    }

    return{
        todos,
        todosCount,
        pendingTodosCount,
        handleNewTodo,
        handleDeleteTodo,
        handleCompleteTodo,
        handleUpdateTodo
    }
}