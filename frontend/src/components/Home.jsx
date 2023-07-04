import axios from "axios";
import { useContext, useEffect, useState } from "react";
import WorkoutDetails from "./WorkoutDetails";
// import WorkoutForm from "./WorkoutForm";
import { WorkoutContext } from "../context/WorkoutContext";
// import { useWorkoutContext } from "../hooks/useWorkoutContext";

const Home = () => {
  // const {workouts, workoutDispatch} = useWorkoutContext();
  const {state, dispatch} = useContext(WorkoutContext)
  // console.log(workouts)

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/workouts/")
      .then((res) => {
        dispatch({type: 'GET_WORKOUTS', payload: res.data});
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="home">
      <div className="section items-center justify-center flex">
        {state && (
          <WorkoutDetails title={"All Workouts"} />
        )}
        {/* <WorkoutForm /> */}
      </div>
    </div>
  );
};

export default Home;
