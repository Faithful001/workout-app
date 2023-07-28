import axios from "axios";
// import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { WorkoutContext } from "../context/WorkoutContext";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";


const WorkoutDetails = () => {
  const { workouts, dispatch } = useContext(WorkoutContext);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/workouts/")
      .then((res) => {
        dispatch({ type: "GET_WORKOUTS", payload: res.data });
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="workout-details">
      <div className="section m-5">
        <h1 className="text-2xl font-bold text-center">All Workouts</h1>

        {workouts &&
          workouts.map((workout) => (
            <Link to={`/workout/${workout._id}`} key={workout._id}>
              <div className="flex flex-col items-center justify-center w-screen">
                <div className="m-5 bg-white hover:shadow-lg rounded-md p-6 px-20">
                  <div className="flex ">
                    <h4 className="uppercase font-bold text-2xl text-sky-700">
                      {workout.title}
                    </h4>
                  </div>
                  <p className="text-lg">
                    <strong>Load (kg):</strong> {workout.load}
                  </p>
                  <p className="text-lg">
                    <strong>Reps:</strong> {workout.reps}
                  </p>
                  <p className="text-sm">{workout.updatedAt}</p>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default WorkoutDetails;
