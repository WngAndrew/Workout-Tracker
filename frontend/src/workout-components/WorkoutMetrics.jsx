import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function WorkoutMetrics({ weekId, workoutId, toggler }) {
    const [volumeObject, setVolumeObject] = useState({});

    useEffect(() => {
        axios
            .get(`http://localhost:5000/workouts/metrics/${workoutId}`)
            .then((res) => {
                setVolumeObject(res.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }, [toggler]); // Add weekId as a dependency to refetch data when it changes

    return (
        <div>
            {Object.keys(volumeObject).length > 0 && 
                <h1 className='text-lg font-semibold'>
                    Workout Metrics:
                </h1>}

            {Object.entries(volumeObject).map(([bodyPart, volume], index) => (
                <div key={index}>
                    <p>{bodyPart}: {volume} sets</p>         
                </div>
            ))}
        </div>
    );
}

