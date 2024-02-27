import axios from "axios";

//handle post req for adding a set to a workout
export const setPostReq = async (workoutId, exerciseId, setData) => {
    const res = await axios.post(`http://localhost:5000/sets/${workoutId}/${exerciseId}`, setData)
    return res.data
}