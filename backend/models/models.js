import mongoose, { mongo } from "mongoose";
import calcVolumeByBodyPart from "../functions/calcVolumeByBodyPart.js"

//Macro cycle model
const MacroCycleSchema = mongoose.Schema(
    {
        startDate: String,
        goal: String,
        name: {
            type: String,
            required: true
        }
    }
)

const MacroCycle = mongoose.model('MacroCycle', MacroCycleSchema)

//TrainingWeek model
const TrainingWeekSchema = mongoose.Schema(
    {
        weekNumber: {
            type: Number,
            reqired: true
        }
    }
)

//Training Block model
const TrainingBlockSchema = mongoose.Schema(
    {
        macroCycleId: {
            type: String,
            required: true
        },
        blockNumber: {
            type: Number,
            required: true
        },
        trainingWeeks: [TrainingWeekSchema]
    }
)

const TrainingBlock = mongoose.model('TrainingBlock', TrainingBlockSchema)

//Model for each set
const SetSchema = mongoose.Schema(
    {
        weight: Number,
        reps: Number,
        rir: Number
    }
)

//model for each exercise
const ExerciseSchema = mongoose.Schema(
    {
        exerciseName: {
            type: String,
            required: true
        },
        bodyPart: {
            type: String,
            required: true
        },
        sets: [SetSchema],
        pumpRating: {
            type: Number
        }
    }
)

//model for each workout
const WorkoutSchema = mongoose.Schema(
    {
        trainingWeekId: {
            type: String,
            required: true
        },
        workoutNumber: {
            type: Number,
            required: true,
            max: [7, 'The value of path `{PATH}` ({VALUE}) exceeds the limit (7).']
        },
        exercises: [ExerciseSchema],
        volumeByBodyPart: {
            type: Map,
            of: Number
        }
    }
)

//apply volume by body part calculation to the Workout Schema
WorkoutSchema.methods.calcVolumeByBodyPart = function() {
    calcVolumeByBodyPart(this);
};


const Workouts = mongoose.model('Workouts', WorkoutSchema)




export { MacroCycle, TrainingBlock, Workouts}