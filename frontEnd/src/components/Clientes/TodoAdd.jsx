import React from 'react'

export const TodoAdd = () => {
  return (
    <form>
        <input type="text" className="input-add" name='description' value='atencion al cliente' placeholder='¿que hay que hacer?' />
        <button className='btn-add' type='submit'>Agregar</button>
    </form>
  )
}
