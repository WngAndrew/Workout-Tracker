import express from 'express'
import { MacroCycle, TrainingBlock } from '../models/models.js'

const router = express.Router()

//get all macro cycles
router.get('/', async (req,res) => {
    try {
        const macros = await MacroCycle.find({})
        res.status(200).send(macros)
    } catch(error) {
        console.log(error)
        res.status(400).send({message: error.message})
    }
})

//add a macro cycle
router.post('/', async (req, res) => {
    try {
        if (!req.body.startDate || !req.body.goal || !req.body.name) {
            return res.status(400).send('fill all fields')
        }
        const newMacro = {
            startDate: req.body.startDate,
            goal: req.body.goal,
            name: req.body.name
        }
    
        const macro = await MacroCycle.create(newMacro)
    
        res.status(200).send(macro)
    } catch(error) {
        console.log(error)
        res.status(500).send({message:error.message })
    }

})

//delete a single macro cycle
router.delete('/:id', async(req,res) => {
    try {
        const { id } = req.params
        const result = await MacroCycle.findByIdAndDelete(id)
        await TrainingBlock.deleteMany({ macroCycleId: id })
        if (!result) {
            return res.status(404).send('Macro Not Found')
        }
        return res.status(200).send('Macro Cycle Deleted')

    } catch(error) {
        console.log(error)
        res.status(500).send({message: error.message})
    }
})



export default router