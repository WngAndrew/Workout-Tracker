import React, { useEffect, useState } from 'react';

//displays metrics such as volume by body part
export default function WorkoutMetrics({ workoutId, workoutVolumes}) {


    const volumeObject = workoutVolumes[workoutId]
    
    return (
        <div>
            {Object.keys(volumeObject).length > 0 && 
            <h1 className='text-lg font-semibold'>
                Workout Metrics:
            </h1>}

            {Object.entries(volumeObject).map((volumeData, index) => (
                <div key={index}>
                    <p>{volumeData[0]}: {volumeData[1]} sets</p>         
                </div> 

            ))}
        </div>
    );
}
