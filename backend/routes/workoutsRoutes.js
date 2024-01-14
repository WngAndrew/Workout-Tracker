import express from 'express'
import { TrainingBlock, Workouts } from '../models/models.js'

const router = express.Router()

//get all workouts of a given week
router.get('/:weekId', async (req,res) => {
    try {
        const { weekId } = req.params

        const workouts = await Workouts.find({trainingWeekId: weekId})

        if (!workouts) {
            res.status(200).send('wkts not found')
        }

        res.status(200).send(workouts)
    } catch (error) {
        console.log(error)
        res.status(500).send({message:error.message})
    }
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