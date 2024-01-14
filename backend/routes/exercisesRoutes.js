import express from 'express'
import { Workouts } from '../models/models.js'

const router = express.Router()

//get all exercises for a given workout
router.get('/:workoutId', async (req,res) => {
    try {
        const { workoutId } = req.params
        const workout = await Workouts.findById(workoutId)

        if (!workout) {
            return res.status(404).send('workout not found')
        }

        const exercises = workout.exercises

        return res.status(200).send(exercises)

    } catch (error) {
        console.log(error)
        res.status(500).send({message: error.message})
    }
})

//add an exercise to a given workout
router.post('/:workoutId', async (req,res) => {
    try {
        const { workoutId } = req.params
        const { exerciseName, bodyPart } = req.body
        const workout = await Workouts.findById(workoutId)

        if (!exerciseName || !bodyPart) {
            return res.status(400).send('provide name and body part')
        }
        if (!workout) {
            return res.status(404).send('workout not found')
        }
        const exercise = {
            exerciseName: exerciseName,
            bodyPart: bodyPart
        }

        workout.exercises.push(exercise)
        await workout.save()
        return res.status(200).send('exercise added')

    } catch (error) {
        console.log(error)
        res.status(500).send({message: error.message})
    }
})

//delete a given exercise of a given workout
router.delete('/:workoutId/:exerciseId', async (req,res) => {
    try {
        const { exerciseId, workoutId } = req.params
        
        const workout = await Workouts.findById(workoutId)

        if (!workout) {
            return res.status(404).send('wkt not found')
        }

        const exercise = workout.exercises.id(exerciseId).deleteOne()
        // if (!exercise) {
        //     return res.status(404).send('exercise not found')
        // }

        // exercise.remove()

        await workout.save()

        res.status(200).send('exercise deleted')

    } catch (error) {
        console.log(error)
        res.status(500).send({message: error.message})
    }
})

export default router