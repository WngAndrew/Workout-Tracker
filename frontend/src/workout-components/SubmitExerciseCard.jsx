import axios from "axios";
import React, { useState } from "react";
import { FaTimes } from 'react-icons/fa';

//card created to display input for adding an exercise 
//handles the post request for adding exercise as well
export function SubmitExerciseCard({ onClose, workoutId, onSuccess}) {
    const [exerciseName, setExerciseName] = useState('')
    const [bodyPart, setBodyPart] = useState('')


    const handleExerciseSubmit = (event) => {
        event.preventDefault()
        const exercise = {
            exerciseName: exerciseName,
            bodyPart: bodyPart
        }

        axios
            .post(`http://localhost:5000/exercises/${workoutId}`, exercise)
            .then(() => {
                console.log('exercise added')
                onSuccess()
                onClose()
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
                    <h3 className="text-lg leading-6 font-medium text-white">Add Exercise</h3>
                    <form onSubmit={handleExerciseSubmit} className="mt-4">
                        <input 
                            className="text-sm text-gray-300 bg-gray-700 rounded-md border-0 shadow w-full py-2 px-4 leading-tight focus:outline-none focus:ring-2 focus:ring-orange-500 my-2" 
                            placeholder="Exercise Name"
                            value={exerciseName}
                            onChange={(e) => setExerciseName(e.target.value)}
                        />
                        <input 
                            className="text-sm text-gray-300 bg-gray-700 rounded-md border-0 shadow w-full py-2 px-4 leading-tight focus:outline-none focus:ring-2 focus:ring-orange-500" 
                            placeholder="Primary Target Body Part"
                            value={bodyPart}
                            onChange={(e) => setBodyPart(e.target.value)}
                        />
                        <button type="submit" className="mt-4 px-4 py-2 bg-orange-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-300">
                            Submit Exercise
                        </button>
                    </form>
                </div>
            </div>
        </div>

    );
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
        //             <h3 className="text-lg leading-6 font-medium text-gray-900">Awesome</h3>
        //             <form onSubmit={handleExerciseSubmit}>
        //                 <div className="mt-2 px-7 py-3">
        //                     <input 
        //                         className="text-sm text-gray-500 text-center" 
        //                         placeholder="Exercise Name"
        //                         value={inputValue}
        //                         onChange={(e) => setInputValue(e.target.value)}
        //                     />
        //                 </div>
        //                 <div className="items-center px-4 py-3">
        //                     <button type="submit" className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300">
        //                         Submit Exercise
        //                     </button>
        //                 </div>
        //             </form>
        //         </div>
        //     </div>
        // </div>
