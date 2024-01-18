import express from 'express'
import { TrainingBlock, Workouts } from '../models/models.js'

const router = express.Router()

//get all training blocks (mostly for production)
router.get('/', async(req,res) => {
    try {
        const blocks = await TrainingBlock.find()
        res.status(200).send(blocks)
    } catch(error) {
        console.log(error)
        return res.status(500).send({message: error.message})
    }
})

//get all blocks for a given macro cycle
router.get('/:macroCycleId', async(req,res) => {
    try {
        const { macroCycleId } = req.params
        const blocks = await TrainingBlock.find({macroCycleId: macroCycleId})
        res.status(200).send(blocks)
    } catch(error) {
        console.log(error)
        return res.status(500).send({message: error.message})
    }
})

//add a training block
router.post('/', async(req,res) => {
    try {
        if (!req.body.macroCycleId || !req.body.blockNumber) {
            return res.status(400).send('fill all fields')
        }
        const newBlock = {
            macroCycleId: req.body.macroCycleId,
            blockNumber: req.body.blockNumber        }
        const block = await TrainingBlock.create(newBlock)
        return res.status(200).send(block)


    } catch(error) {
        console.log(error)
        return res.status(500).send({message: error.message})
    }
})

//only intended for production 
router.delete('/deleteAll', async(req, res) => {
    try {
        const deleted = await TrainingBlock.deleteMany({})
        return res.status(200).send('all macros deleted')
    } catch(error) {
        console.log(error)
        res.status(500).send({message: error.message})
    }
})

//delete a training block
router.delete('/:id', async(req,res) => {
    try {
        const { id } = req.params

        const block = await TrainingBlock.findById(id)
        if (!block) {
            return res.status(404).send('block not found')
        }
        const weekIds = block.trainingWeeks.map(week => week._id)

        await Promise.all(weekIds.map(weekId => Workouts.deleteMany({trainingWeekId : weekId})))

        await TrainingBlock.findByIdAndDelete(id)

        return res.status(200).send('deletion succesful')
    } catch (error) {
        console.log(error) 
        return res.status(500).send({message: error.message})
    }
}) 


export default router