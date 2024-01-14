import React, { useState } from 'react'
import { FaPlus, FaTimes } from 'react-icons/fa';
import axios from 'axios';

//POST request and card design to add a set to an exercise
export default function AddSet({ onClose, exerciseId, workoutId, refresh }) {
    const [weightValue, setWeightValue] = useState('')
    const [repValue, setRepValue] = useState('')
    const [RIRValue, setRIRValue] = useState('')

    const handleAddSet = (e) => {
        e.preventDefault()

        const set = {
            weight: Number(weightValue),
            reps: Number(repValue),
            rir: Number(RIRValue)
        }

        axios
            .post(`http://localhost:5000/sets/${workoutId}/${exerciseId}`, set)
            .then(() => {
                onClose()
                refresh()
            }) 
            .catch((error) => {
                console.log(error)
            })
            
    }

  return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-80 overflow-y-auto h-full w-full flex items-center justify-center px-4">
            <div className="relative mx-auto p-5 border w-full max-w-md rounded-md bg-gray-800 shadow-lg">
                <div className="text-center">
                    <button 
                        onClick={onClose} 
                        className="absolute top-0 right-0 mt-4 mr-4 text-orange-500 hover:text-orange-300 transition-colors duration-150"
                    >
                        <FaTimes className="h-6 w-6" />
                    </button>
                    <h3 className="text-lg leading-6 font-medium text-white">Add Set</h3>
                    <form onSubmit={handleAddSet} className="mt-4">
                        <input 
                            className="mt-2 px-4 py-2 w-full bg-gray-700 text-white rounded-md border-0 focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-400"
                            placeholder="Weight"
                            value={weightValue}
                            onChange={(e) => setWeightValue(e.target.value)}
                        />
                        <input 
                            className="mt-2 px-4 py-2 w-full bg-gray-700 text-white rounded-md border-0 focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-400"
                            placeholder="Reps"
                            value={repValue}
                            onChange={(e) => setRepValue(e.target.value)}
                        />
                        <input 
                            className="mt-2 px-4 py-2 w-full bg-gray-700 text-white rounded-md border-0 focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-400"
                            placeholder="RIR"
                            value={RIRValue}
                            onChange={(e) => setRIRValue(e.target.value)}
                        />
                        <button 
                            type="submit" 
                            className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-md w-full hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-300"
                        >
                            Submit Set Data
                        </button>
                    </form>
                </div>
            </div>
        </div>
  )
}





        // <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
        //     <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        //         <div className="mt-3 text-center">
        //             <button 
        //                 onClick={onClose} 
        //                 className="absolute top-0 right-0 mt-2 mr-2 text-gray-600 hover:text-gray-900 transition-colors duration-150"
        //             >
        //                 <FaTimes className="h-6 w-6" />
        //             </button>
        //             <h3 className="text-lg leading-6 font-medium text-gray-900">Enter Set Data</h3>
        //             <form onSubmit={handleAddSet}>
        //                 <div className="mt-2 px-7 py-3">
        //                     <input 
        //                         className="text-sm text-gray-500 text-center" 
        //                         placeholder="Weight"
        //                         value={weightValue}
        //                         onChange={(e) => setWeightValue(e.target.value)}
        //                     />
        //                 </div>
        //                 <div className="mt-2 px-7 py-3">
        //                     <input 
        //                         className="text-sm text-gray-500 text-center" 
        //                         placeholder="Reps"
        //                         value={repValue}
        //                         onChange={(e) => setRepValue(e.target.value)}
        //                     />
        //                 </div>
        //                 <div className="mt-2 px-7 py-3">
        //                     <input 
        //                         className="text-sm text-gray-500 text-center" 
        //                         placeholder="RIR"
        //                         value={RIRValue}
        //                         onChange={(e) => setRIRValue(e.target.value)}
        //                     />
        //                 </div>
        //                 <div className="items-center px-4 py-3">
        //                     <button type="submit" className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300">
        //                         Submit Set Data
        //                     </button>
        //                 </div>
        //             </form>
        //         </div>
        //     </div>
        // </div>