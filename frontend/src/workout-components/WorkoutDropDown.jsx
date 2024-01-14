import React, {useState} from 'react'
import { FaEllipsisH, FaPlus } from 'react-icons/fa';
import axios from 'axios';
import DeleteButton from '../components/DeleteButton';
import { SubmitExerciseCard } from './SubmitExerciseCard';

//function to display drop down menu, and delete exercises to a workout (add exercise handled in SubmitExerciseCard)
export default function WorkoutDropDown({id, route, onSuccess}) {
    const [isToggled, setIsToggled] = useState(false)
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleDisplayAddCard = () => {
        setShowConfirmation(true);
    }

  return (
    <div>
        <FaEllipsisH 
            className='cursor-pointer mr-4'
            onClick={() => setIsToggled(prev => !prev)}
        >
        </FaEllipsisH>

        {isToggled && 
            <div className='absolute flex-col'>
                <FaPlus 
                    className='my-2 mb-2 cursor-pointer'
                    onClick={() => {
                        handleDisplayAddCard()
                    }}
                >
                </FaPlus>
                <DeleteButton route={route} id={id} onSuccess={onSuccess}/>
            </div>}
            {showConfirmation && <SubmitExerciseCard onClose={() => setShowConfirmation(false)} workoutId={id} onSuccess={onSuccess}/>}
    </div>
  )
}
