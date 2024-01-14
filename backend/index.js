import express from 'express'
import { PORT, mongoDBConnect} from './config.js'
import mongoose from 'mongoose'
import { MacroCycle } from './models/models.js'
import cors from 'cors'
import macroRoutes from './routes/macroRoutes.js'
import trainingBlockRoutes from  './routes/trainingBlockRoutes.js'
import trainingWeekRoutes from './routes/trainingWeekRoutes.js'
import workoutsRoutes from './routes/workoutsRoutes.js'
import exercisesRoutes from './routes/exercisesRoutes.js'
import setRoutes from './routes/setRoutes.js'

const app = express()

app.use(express.json())
app.use(cors())


app.get('/', (req, res) => {
    return res.send('Base')
})


//only intended for production 
app.delete('/deleteAll', async(req, res) => {
    try {
        const deleted = await MacroCycle.deleteMany({})
        return res.status(200).send('all macros deleted')
    } catch(error) {
        console.log(error)
        res.status(500).send({message: error.message})
    }
})


app.use('/macros', macroRoutes)
app.use('/blocks', trainingBlockRoutes)
app.use('/weeks', trainingWeekRoutes)
app.use('/workouts', workoutsRoutes)
app.use('/exercises', exercisesRoutes)
app.use('/sets', setRoutes)

mongoose
    .connect(mongoDBConnect)
    .then(() => {
        console.log('db connected')
        app.listen((PORT), () => {
            console.log('app is listening on port 5000')
        })
    })
    .catch((error) => {
        console.log(error)
    })

