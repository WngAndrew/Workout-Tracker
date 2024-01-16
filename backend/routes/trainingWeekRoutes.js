import express from 'express'
import { TrainingBlock, Workouts } from '../models/models.js'

const router = express.Router()

//CRUD operations for training weeks

//add a new week to a given block
router.post('/:blockId', async(req,res) => {
    try {
        const { blockId } = req.params

        if (!req.body.weekNumber) {
            return res.status(500).send('enter a week number')
        }
        
        const newWeek = {
            weekNumber: req.body.weekNumber
        }

        const block = await TrainingBlock.findById(blockId)

        if (!block) {
            return res.status(404).send({message: 'block not found'})
        }

        block.trainingWeeks.push(newWeek)

        await block.save()

        res.status(200).send(block)

    } catch (error) {
        console.log(error)
        res.status(500).send({message: error.message})
    }
})

//get all weeks of a given block
router.get('/:blockId', async(req,res) => {
    try {
        const { blockId } = req.params
        
        const block = await TrainingBlock.findById(blockId)

        if (!block) {
            return res.status(404).send({message: 'block not found'})
        }

        return res.status(200).send(block.trainingWeeks)

    } catch (error) {
        console.log(error)
        res.status(500).send({message: error.message})
    }
})

//delete a week of a given block
router.delete('/:blockId/:weekId', async(req,res) => {
    try {  
        const { blockId } = req.params
        const { weekId } = req.params
        const block = await TrainingBlock.findById(blockId)

        if (!block) {
            return res.status(404).send({message: 'block not found'})
        }
        
        const week = await block.trainingWeeks.id(weekId)

        if (!week) {
            return res.status(404).send({message: 'week not found'})
        }

        week.deleteOne()

        await Workouts.deleteMany({ trainingWeekId: weekId });
        await block.save()

        return res.status(200).send({message: 'Week and associated workouts deleted'});
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ error: error.message })
    }
})

export default router