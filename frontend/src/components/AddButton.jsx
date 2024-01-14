import { BsPlus } from 'react-icons/bs';
import React from 'react'
import { Link } from 'react-router-dom'


export default function AddButton ({destination = '/'}) {
  return (
    <div className='flex'>
        <Link 
            to={destination}
            className='bg-sky-800 text-white px-4 px-1 rounded-1g w-fit'
        >
        <BsPlus className='text-2xl' />
        </Link>
    </div>
  )
}

