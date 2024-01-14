import React, { useEffect, useState } from 'react';

export default function WorkoutMetrics({ workoutId, workoutVolumes}) {

    const volumeObject = workoutVolumes[workoutId]
    console.log(Object.entries(volumeObject))
    return (
        <div>
            <h1 className='text-lg font-semibold'>
                Workout Metrics:
            </h1>
            {Object.entries(volumeObject).map((volumeData, index) => (
                <div key={index}>
                    <p>{volumeData[0]}: {volumeData[1]} sets</p>         
                </div> 

            ))}
        </div>
    );
}
