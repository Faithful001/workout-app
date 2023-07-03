import axios from "axios";
import { useEffect, useState } from "react";
import WorkoutDetails from "./WorkoutDetails";
import WorkoutForm from "./WorkoutForm";
import { useWorkoutContext } from "../hooks/useWorkoutContext";

const Home = () => {
  const {workouts, dispatch} = useWorkoutContext();
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
        {workouts && (
          <WorkoutDetails title={"All Workouts"} workouts={workouts} />
        )}
        {/* <WorkoutForm /> */}
      </div>
    </div>
  );
};

export default Home;
