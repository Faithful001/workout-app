import { useParams } from "react-router-dom";
import { WorkoutContext } from "../context/WorkoutContext";
// import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useEffect } from "react";
import { useContext } from "react";
import axios from "axios";

const WorkoutDetailsFull = () => {
  const { id } = useParams();
  const {state, dispatch} = useContext(WorkoutContext)
  // const { state, dispatch } = useWorkoutContext();
  console
  useEffect(() => {
    const fetchWorkoutsById = async()=>{
      try{
        const response = await axios.get(`http://localhost:3000/api/workouts/${id}`)
        const {data} = response
        dispatch({type: "GET_WORKOUT", payload: data})  
      }catch(err){
        console.log(err)
      }

    }
    fetchWorkoutsById();
    // axios
    //   .get(`http://localhost:3000/api/workouts/${id}`)
    //   .then((res) => {
    //     dispatch({ type: "GET_WORKOUT", payload: res.data });
    //     // console.log(res.data)
    //   })
    //   .catch((err) => console.log(err));
  }, [id, dispatch]);
  return (
    <div className="workoutdetails-full">
      <div className="section">
        <h2>Workout</h2>
        {state &&
          state.map((workout) => (
            <div key={workout._id}>
              <h1>{workout.title}</h1>
            </div>
          ))}
      </div>
    </div>
  );
};

export default WorkoutDetailsFull;
