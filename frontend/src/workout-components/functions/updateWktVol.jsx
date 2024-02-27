import axios from "axios";

export const updateWktVol = async (workoutId) => {
    const res = await axios.get(`http://localhost:5000/workouts/metrics/${workoutId}`)
    return res.data
}