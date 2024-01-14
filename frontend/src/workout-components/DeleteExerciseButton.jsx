import React from 'react'
import axios from 'axios'

export default function DeleteExerciseButton ({ id, route, onSuccess }) {

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
            <div>
                <button 
                    className='bg-red-400 mt-3 px-4 py-2 rounded text-white shadow hover:bg-red-500 transition' 
                    onDoubleClick={handleClick}>
                    Delete Exercise
                </button>
            </div>

            
  )
}

