import React, {useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import AddButton from '../components/AddButton'
import DeleteButton from '../components/DeleteButton'

export default function Home() {
    const [macros, setMacros] = useState([])
    const [bool, setBool] = useState(false)    

    const handleDelete = () => {
        setBool((prev) => !prev)
    }

    useEffect(() => {
        axios
            .get('http://localhost:5000/macros')
            .then((res) => {
                setMacros(res.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [bool])

  return (

    // <div className='m-4 p-4 text-center '>
    //     <div className="flex justify-center items-center">
    //         <h1 className='text-3xl my-4 mr-2'>Macro Cycles</h1>
    //         <AddButton destination='/CreateMacro'/>
    //     </div>
    //     {macros?.map((data, index) => (
    //         <div className='flex items-center justify-center p-2'
    //             key={index}>
    //             <Link to={`/${data._id}/Blocks`} className='p-1 mr-4'>
    //                 {data.name}
    //             </Link>
    //             <DeleteButton id={data._id} route='macros' onSuccess={handleDelete}/>
    //         </div>
    //     ))}
    // </div>



    <div className='bg-gray-900 text-white min-h-screen flex flex-col items-center pt-8'>
    <h1 className='text-3xl font-bold mb-6'>Macro Cycles</h1>
    <AddButton destination='/CreateMacro' className="mb-4" />

    <div className="w-full max-w-2xl">
        {macros?.map((data, index) => (
            <div className='bg-gray-800 rounded-lg p-4 flex items-center justify-between my-2 shadow-md'
                key={index}>
                <Link to={`/${data._id}/Blocks`} className='text-lg text-orange-500 hover:text-orange-400'>
                    {data.name}
                </Link>
                <DeleteButton id={data._id} route='macros' onSuccess={handleDelete} className="text-sm bg-red-600 hover:bg-red-700 p-2 rounded" />
            </div>
        ))}
    </div>
</div>

  )
}
