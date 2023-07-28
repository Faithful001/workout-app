import axios from "axios";
import { useContext, useEffect, useState } from "react";
import WorkoutDetails from "./WorkoutDetails";
// import WorkoutForm from "./WorkoutForm";
import { WorkoutContext } from "../context/WorkoutContext";
// import { useWorkoutContext } from "../hooks/useWorkoutContext";

const Home = () => {
  // const {workouts, workoutDispatch} = useWorkoutContext();


  return (
    <div className="home">
      <div className="section items-center justify-center flex flex-col">

        <WorkoutDetails />
      </div>
    </div>
  );
};

export default Home;
