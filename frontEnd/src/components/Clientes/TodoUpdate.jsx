import React from 'react'
import { FaEdit } from 'react-icons/fa'

export const TodoUpdate = () => {
  return (
    <form>
    <input type="text" className="input-update" name='description' value='atencion al cliente' placeholder='¿que hay que hacer?' />
    <button className='btn-edit' type='submit'>
        <FaEdit/>
    </button>
</form>
  )
}
