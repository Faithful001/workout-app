import { useParams } from "react-router-dom";
import { WorkoutContext } from "../context/WorkoutContext";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useEffect } from "react";
import axios from "axios";

const WorkoutDetailsFull = () => {
  const { id } = useParams();
  console.log(id);
  const { workouts, dispatch } = useWorkoutContext();
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/workouts/${id}`)
      .then((res) => {
        dispatch({ type: "GET_WROKOUTS", payload: res.data });
        console.log(res.data)
      })
      .catch((err) => console.log(err));
  },[id, dispatch]);
  return (
    <div className="workoutdetails-full">
      <div className="section">
        <h2>Workout</h2>
        {workouts && workouts.map((workout) => (
          <div key={workout._id}>
            <h1>{workout.title}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutDetailsFull;
