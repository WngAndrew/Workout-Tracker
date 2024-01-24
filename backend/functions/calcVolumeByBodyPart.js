const calcVolumeByBodyPart = function(workout) {
    const bodyPartMap = {};
    workout.exercises.forEach(exercise => {
        const bodyPart = exercise.bodyPart;
        const volume = exercise.sets.length;
        bodyPartMap[bodyPart] = (bodyPartMap[bodyPart] || 0) + volume;
    });
    workout.volumeByBodyPart = bodyPartMap;
};


export default calcVolumeByBodyPart