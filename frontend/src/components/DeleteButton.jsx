import { FaTrash } from 'react-icons/fa';
import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function DeleteButton ({ id, route, onSuccess }) {

    const handleClick = () => {
        axios
            .delete(`http://localhost:5000/${route}/${id}`)
            .then(() => {
                onSuccess()

            })
            .catch((error) => {
                console.log('error')
                alert('error occured')
            })
    }
 
  return (
            <FaTrash 
                className='cursor-pointer' 
                onDoubleClick={handleClick}
            />
  )
}

