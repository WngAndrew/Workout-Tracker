import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useLocation, Link } from 'react-router-dom'
import BackButton from '../components/BackButton'
import AddButton from '../components/AddButton'
import DeleteButton from '../components/DeleteButton'
import BlockDropDown from '../components/BlockDropDown'

export default function TrainingBlocks() {
    const [blocks, setBlocks] = useState([])
    const [bool, setBool] = useState(false)

    //id of the macro cycle corresponding to all training blocks
    const { id } = useParams()
    const location = useLocation()

    const handleDelete = () => {
        setBool((prev) => !prev)
    }

    useEffect(() => {
        axios
            .get(`http://localhost:5000/blocks/${id}`)
            .then((res) => {
                setBlocks(res.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [bool])

    
  return (
    // <div className=''>
    //     <div className="flex items-center justify-center">
    //         <h1 className='my-4 text-3xl m-4'>Training Blocks</h1>
    //         <AddButton destination={`${location.pathname}/CreateBlock`}/> 
    //         <div className="fixed top-0 right-0 p-4">
    //             <BackButton />
    //         </div>
    //     </div>
    //     <div className="flex items-start justify-center">
    //         {blocks?.map((data, index) => (
    //             <div key={index}>
    //                 <div className='flex justify-center items-center' >
    //                     <p className='text-xl mr-4'>Block #{data.blockNumber}</p>
    //                     <BlockDropDown route='blocks' id={data._id} onSuccess={handleDelete}/>
    //                 </div>
    //                 <div className="flex-col">
    //                     {data.trainingWeeks?.map((weeks, index) => (
    //                         <div className="flex items-center" key={index}>
    //                             <Link to={`${location.pathname}/${weeks._id}/Workouts`} state={ {weekNumber: weeks.weekNumber} }> 
    //                                 <p className='mr-2'>Week #{weeks.weekNumber}</p>
    //                             </Link>
    //                             <DeleteButton route={`weeks/${data._id}`} id={weeks._id} onSuccess={handleDelete}/>
    //                         </div>  
    //                     ))}
    //                 </div>
    //             </div>

    //         ))}
    //     </div>

    // </div>




    <div className='bg-gray-900 text-white min-h-screen'> {/* Main background */}
    <div className="container mx-auto p-4">
        <div className="flex items-center justify-between">
            <h1 className='text-3xl font-bold my-4'>Training Blocks</h1>
            <div>
                <AddButton destination={`${location.pathname}/CreateBlock`} /> 
                <BackButton />
            </div>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
            {blocks?.map((data, index) => (
                <div key={index} className='bg-gray-800 rounded-lg shadow-lg p-4 w-full md:w-1/2 lg:w-1/3'> {/* Block Card */}
                    <div className='flex justify-between items-center mb-4'>
                        <h2 className='text-xl font-semibold'>Block #{data.blockNumber}</h2>
                        <BlockDropDown route='blocks' id={data._id} onSuccess={handleDelete}/>
                    </div>

                    <div className="flex flex-col space-y-4">
                        {data.trainingWeeks?.map((weeks, index) => (
                            <div className="flex items-center justify-between" key={index}>
                                <Link to={`${location.pathname}/${weeks._id}/Workouts`} state={ { weekNumber: weeks.weekNumber } }> 
                                    <p className='text-lg hover:text-orange-500 transition-colors duration-150'>Week #{weeks.weekNumber}</p>
                                </Link>
                                <DeleteButton route={`weeks/${data._id}`} id={weeks._id} onSuccess={handleDelete}/>
                            </div>  
                        ))}
                    </div>
                </div>
            ))}
        </div>
    </div>
</div>

  )
}

