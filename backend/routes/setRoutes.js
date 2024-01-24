import express from 'express'
import { Workouts } from '../models/models.js'

const router = express.Router()

//get all sets for a given exercise
router.get('/:workoutId/:exerciseId', async (req,res) => {
    try {
        const { workoutId, exerciseId } = req.params
        
        const workout = await Workouts.findById(workoutId)
        if (!workout) {
            return res.status(404).send('workout not found')
        } 
        const exercise = workout.exercises.id(exerciseId)
        if (!exercise) {
            return res.status(404).send('exercise not found')
        } 
        const sets = exercise.sets

        res.status(200).send(sets)
    } catch(error) {
        console.log(error)
        res.status(500).send({message: error.message})
    }
})

//add a set for a given exercise
router.post('/:workoutId/:exerciseId', async(req, res) => {
    try {
        const { workoutId, exerciseId } = req.params
        const { weight, reps, rir} = req.body

        if (!weight || !reps) {
            if (rir != 0 && !rir) {
                return res.status(500).send('enter weight, rir, and reps')
            }
        }

        const set = {
            weight: weight,
            reps: reps,
            rir: rir
        }

        const workout = await Workouts.findById(workoutId)
        if (!workout) {
            return res.status(404).send('workout not found')
        } 
        const exercise = workout.exercises.id(exerciseId)
        if (!exercise) {
            return res.status(404).send('exercise not found')
        } 
    
        exercise.sets.push(set)
        await workout.save()

        res.status(200).send('set added')
    } 
    catch(error) {
        console.log(error)
        res.status(500).send({message:error.message})
    }
})

//delete a set of a given exercise 
router.delete('/:workoutId/:exerciseId/:setId', async (req,res) => {
    try{
        const { workoutId, exerciseId, setId } = req.params
    
        const workout = await Workouts.findById(workoutId)
        if (!workout) {
            return res.status(404).send('workout not found')
        } 
        const exercise = workout.exercises.id(exerciseId)
        if (!exercise) {
            return res.status(404).send('exercise not found')
        } 
    
        exercise.sets.id(setId).deleteOne()
        await workout.save()
    
        res.status(200).send('set deleted')
    }
    catch(error) {
        console.log(error)
        res.status(500).send({message:error.message})
    }
})

export default router