import React, { useState } from 'react'
import { FaEllipsisH, FaPlus, FaTrash } from 'react-icons/fa';
import DeleteButton from './DeleteButton';
import axios from 'axios';

//drop down menu for each training block, also handles logic for adding blocks 
export default function BlockDropDown({ id, route, onSuccess }) {
    const [isToggled, setIsToggled] = useState(false)
    const [weekNumber, setWeekNumber] = useState(1)

    const getWeekLength = async () => {
        try { 
            const res = await axios.get(`http://localhost:5000/weeks/${id}`);
            const newWeekLength = res.data.length + 1;
            setWeekNumber(newWeekLength);
            return newWeekLength;
        } catch (error) {
            console.log(error)
        }
    }

    const handleClick = async () => {

        try {
            const weekNumber = await getWeekLength()

            const trainingWeek = {
                weekNumber: weekNumber
            }
    
            axios
                .post(`http://localhost:5000/weeks/${id}`, trainingWeek)
                .then((res) => {
                    onSuccess()
                })
                .catch((error) => {
                    console.log('error')
                })
        } catch (error) {
            console.log(error)
        }


    }

  return (
    <div className='mr-4 relative'> 
        <FaEllipsisH
            onClick={() => setIsToggled(!isToggled)}
            className='cursor-pointer'
        >
        </FaEllipsisH>
        {isToggled ? (
            <div className='absolute flex-col'>
                <FaPlus 
                    className='my-2 mb-2 cursor-pointer'
                    onClick={() => {
                        handleClick()
                    }}
                >
                </FaPlus>
                <DeleteButton route={route} id={id} onSuccess={onSuccess}/>
            </div>
        ) : (
            ''
        )}
    </div>
  )
}



