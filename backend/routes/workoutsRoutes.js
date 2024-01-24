import express from 'express'
import { TrainingBlock, Workouts } from '../models/models.js'
import calcVolumeByBodyPart from '../functions/calcVolumeByBodyPart.js'

const router = express.Router()

//get all workouts of a given week
router.get('/:weekId', async (req,res) => {
    try {
        const { weekId } = req.params

        const workouts = await Workouts.find({trainingWeekId: weekId})

        if (!workouts) {
            res.status(200).send('wkts not found')
        }   

        //invoking logic to store volume by bp in workout model
        const savePromises = workouts.map(async (workout) => {
            workout.calcVolumeByBodyPart(workout);
            await workout.save(); // Save each document if necessary
        });

        await Promise.all(savePromises);

        res.status(200).send(workouts)
    } catch (error) {
        console.log(error)
        res.status(500).send({message:error.message})
    }
})

//get a specific workouts metrics
router.get('/metrics/:workoutId', async(req, res) => {
    const { workoutId } = req.params

    const workout = await Workouts.findById(workoutId)

    if (!workout) {
        return res.status(404).send('wkt not found')
    }

    res.send(workout.volumeByBodyPart)
})

//add a workout to a week
router.post('/:weekId', async(req,res) => {
    try {
        const { weekId } = req.params

        const {trainingWeekId, workoutNumber} = req.body

        if (!trainingWeekId || !workoutNumber) {
            return res.status(500).send('fill all fields')
        }

        if (weekId != trainingWeekId) {
            return res.status(500).send('id mismatch')
        }
    
        const workout = {
            trainingWeekId: trainingWeekId,
            workoutNumber: workoutNumber
        }
    
        const result = await Workouts.create(workout)
    
        return res.status(200).send(result)
    } catch (error) {
        console.log(error)
        res.status(500).send({message:error.message})
    }
    
})

//delete a given workout of a given week
router.delete('/:workoutId', async (req,res) => {
    const { workoutId } = req.params
    
    const result = await  Workouts.findByIdAndDelete(workoutId)

    if (!result) {
        return res.status(404).send('workout not found')
    }

    return res.status(200).send('workout deleted')
})

export default router