import React, { useEffect, useState } from 'react'
import axios from 'axios'
import BackButton from '../components/BackButton';
import { useParams, useLocation } from 'react-router';
import DeleteExerciseButton from '../workout-components/DeleteExerciseButton';
import WorkoutDropDown from '../workout-components/WorkoutDropDown';
import AddSet from '../workout-components/AddSet';
import DeleteButton from '../components/DeleteButton';
import WorkoutMetrics from '../workout-components/WorkoutMetrics';
import SetDropDownButton from '../workout-components/SetDropDownButton';

//page to display a given week of workouts
export default function Workouts() {
    const [workouts, setWorkouts] = useState('') 

    const [bool, setBool] = useState(false) //used to trigger use state
    const [toggleSets, setToggleSets] = useState({})
    const [showInputCard, setShowInputCard] = useState(false) 

    const [exerciseId, setExerciseId] = useState('') //exercise id prop changes when AddSet button is clicked
    const [workoutId, setWorkoutId] = useState('') //workout id prop changes when AddSet button is clicked
    const [workoutVolumes, setWorkoutVolumes] = useState({}) //used to track volume per body part for each workout

    const {id, weekId} = useParams()
    const location = useLocation()
   
    const weekNumber = location.state?.weekNumber

    useEffect(() => {
        axios
            .get(`http://localhost:5000/workouts/${weekId}`)
            .then((res) => {
                setWorkouts(res.data)

                const tempVolumeData = {} // {workout id : {body part : volume } }
                const tempWorkoutData = res.data

                tempWorkoutData.map((workout, index) => {
                    const bodyPartVolume = {}
                    workout.exercises.map((exercise, index) => {
                        bodyPartVolume[exercise.bodyPart] = (bodyPartVolume[exercise.bodyPart] || 0) + exercise.sets.length
                    })
                    tempVolumeData[workout._id] = bodyPartVolume
                })

                setWorkoutVolumes(tempVolumeData)

            })
            .catch((error) => {
                console.log(error)
            })
    }, [bool])

    const handleAddWorkout = () => {

        const workoutNumber = workouts.length + 1

        if (workoutNumber > 7) {
            return
        }

        const workout = {
            trainingWeekId: weekId,
            workoutNumber: workoutNumber
        }

        axios.
            post(`http://localhost:5000/workouts/${weekId}`, workout)
            .then(() => {
                setBool((prev) => !prev)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const handleDelete = () => {
        setBool((prev) => !prev)
    }

    const handleToggleDisplay = (exerciseId, workoutId) => {
        setWorkoutId(workoutId)
        setExerciseId(exerciseId)
        setShowInputCard(true)
    }

    //passed into SetDropDownButton as a prop, receives toggle state from the component
    const toggleStateComms = (toggleState, exerciseId) => {
        const temp = {...toggleSets, [exerciseId] : toggleState}
        setToggleSets(temp)
    }


  return (
    <div className='bg-gray-900 text-white min-h-screen'> {/* Main background */}
        <div className="container mx-auto p-4">
            <div className="flex justify-center items-center">
                <h1 className='text-3xl font-bold mr-4'>Week {weekNumber} Workouts</h1>
                <button className='bg-orange-500 text-white px-4 py-2 rounded shadow-lg hover:bg-orange-600 transition' onClick={handleAddWorkout}>
                    Add Workout
                </button>
                <div className="fixed top-0 right-0 p-4">
                    <BackButton destination={`/${id}/Blocks`}/>
                </div>
            </div>

            <div className="flex flex-wrap justify-center gap-6 my-6">
                {workouts && workouts.map((workout, index) => (
                    <div key={index} className='bg-gray-800 rounded-lg shadow-lg p-4 w-full md:w-1/2 lg:w-1/3'> {/* Workout Card */}
                        <div className='flex justify-between items-center mb-4'>
                            <h2 className='text-xl font-semibold'>Workout {workout.workoutNumber}</h2>
                            <WorkoutDropDown id={workout._id} route='workouts' onSuccess={handleDelete} />
                        </div>

                        {workout.exercises?.map((exercise, index) => (
                            <div key={index} className='bg-gray-700 p-3 rounded-md mb-3'> {/* Exercise Subcard */}
                                <div className='flex items-center'>
                                    <h3 className='text-lg font-semibold'>{exercise.exerciseName}</h3>
                                    <SetDropDownButton toggleStateComms={toggleStateComms} exerciseId={exercise._id}/>
                                </div>
                                {toggleSets[exercise._id] && exercise.sets?.map((set, index) => (
                                    <div key={index} className='flex justify-between items-center py-2 border-b border-gray-600'>
                                        <span>{set.weight}lbs x {set.reps}</span>
                                        <span>RIR: {set.rir} </span>
                                        <div className='opacity-0 hover:opacity-100 transition'>
                                            <DeleteButton id={set._id} route={`sets/${workout._id}/${exercise._id}`} onSuccess={handleDelete} />
                                        </div>
                                    </div>
                                ))} 

                                <div className="flex justify-evenly">
                                    <button 
                                        className='bg-red-400 mt-3 px-2 py-2 rounded text-white shadow hover:bg-red-500 transition' 
                                        onClick={() => handleToggleDisplay(exercise._id, workout._id)}
                                    >
                                        Add Set
                                    </button>

                                    {showInputCard &&
                                        <AddSet onClose={() => setShowInputCard(false)} 
                                        exerciseId={exerciseId} 
                                        workoutId={workoutId}
                                        refresh={() => setBool(prev => !prev)}
                                    />}
                                    <DeleteExerciseButton route={`exercises/${workout._id}`} id={exercise._id} onSuccess={handleDelete}/> 
                                </div>
                            </div>
                        ))}
                            
                        <WorkoutMetrics workoutId={workout._id} workoutVolumes={workoutVolumes}/>

                    </div>
                ))}
            </div>
        </div>
    </div>

  )
}




    // <div className=''>
    //     <div className="flex justify-center items-center">
    //         <h1 className='text-center text-3xl my-4 mr-4'>Week {weekNumber} Workouts</h1>
    //         <BsPlus className='text-3xl cursor-pointer border rounded' onClick={handleAddWorkout}></BsPlus>
    //         <div className="fixed top-0 right-0 p-4">
    //             <BackButton destination={`/${id}/Blocks`}/>
    //         </div>
    //     </div>

    //     <div className="flex justify-evenly my-4">
    //         {workouts && workouts.map((workout, index) => (
    //             <div key={index}>
    //                 <div className='flex items-center'>
    //                     <p className='mr-4'>Workout {workout.workoutNumber}</p>
    //                     <WorkoutDropDown id={workout._id} route='workouts' onSuccess={handleDelete}/>
    //                 </div>

    //                 {workout.exercises?.map((exercise, index) => (
    //                     <div key={index} className='my-4'>
    //                         <p >{exercise.exerciseName}</p>
    //                         {exercise.sets?.map((set, index) => (
    //                             <div key={index} className=''>
    //                                 <div className="flex items-center">
    //                                     <ul className='ml-4 mr-2'>{set.weight}lbs x {set.reps} RIR:{set.rir}</ul>
    //                                     <div className='opacity-0 hover:opacity-100'>
    //                                         <DeleteButton 
    //                                             id={set._id} 
    //                                             route={`sets/${workout._id}/${exercise._id}`} 
    //                                             onSuccess={handleDelete}
    //                                         /> {/*Deletes an exercise*/}
    //                                     </div>
    //                                 </div>
    //                             </div>
    //                         ))}
    //                         <div className="flex items-center">
    //                             <button className='bg-red-400 mr-4' onClick={() => handleToggleDisplay(exercise._id, workout._id)}>Add Set</button>
    //                             {showInputCard &&
    //                                 <AddSet onClose={() => setShowInputCard(false)} 
    //                                 exerciseId={exerciseId} 
    //                                 workoutId={workoutId}
    //                                 refresh={() => setBool(prev => !prev)}
    //                             />}
    //                             <DeleteButton route={`exercises/${workout._id}`} id={exercise._id} onSuccess={handleDelete}/> {/* delete's an exercise */}
    //                         </div>
    //                     </div>
    //                 ))}
    //             </div>
    //         ))}
    //     </div>
    // </div>