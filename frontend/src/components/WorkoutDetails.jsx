import axios from "axios";
// import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { WorkoutContext } from "../context/WorkoutContext";
import { Link } from "react-router-dom";
import { useContext } from "react";

const WorkoutDetails = ({ title, workout }) => {
  // const { dispatch } = useWorkoutContext();
  const { state, dispatch } = useContext(WorkoutContext);

  const handleDelete = async () => {
    // const workoutToDelete = workouts.find(
    //   (workout) => workout._id === idToDelete
    // );
    // console.log(workouts._id);

    const response = await fetch(
      `http://localhost:3000/api/workouts/${workouts._id}`,
      {
        method: "DELETE",
      }
    );

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }

    // axios
    //   .delete("http://localhost:3000/api/workouts/" + workouts?._id)
    //   .then((res) => {
    //     dispatch({type: 'DELETE_WORKOUT', payload: res.data})
    //   })
    //   .catch((err) => console.log(err));
  };

  return (
    <div className="workout-details">
      <div className="section m-5">
        <h1 className="text-2xl font-bold text-center">{title}</h1>

        <Link to={`/workout/${workout._id}`}>
          <div className="m-5 bg-white hover:shadow-lg rounded-md p-6 w-full px-8">
            <div className="flex ">
              <h4 className="uppercase font-bold text-2xl text-sky-700">
                {workout.title}
              </h4>
              <span
                className="material-symbols-outlined bg-red-600 p-1 rounded-md text-slate-50 hover:cursor-pointer ml-auto"
                onClick={handleDelete}
              >
                delete
              </span>
            </div>
            <p className="text-lg">
              <strong>Load (kg):</strong> {workout.load}
            </p>
            <p className="text-lg">
              <strong>Reps:</strong> {workout.reps}
            </p>
            <p className="text-sm">{workout.updatedAt}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default WorkoutDetails;
