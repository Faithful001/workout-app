import axios from "axios";

const WorkoutDetails = ({ workouts, title }) => {
  const handleDelete = (e) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:3000/api/workouts/${workouts?._id}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div className="workout-details">
      <div className="section m-5">
        <h1 className="text-2xl font-bold text-center">{title}</h1>
        {workouts &&
          workouts.map((workout) => (
            <div
              className="m-5 bg-white hover:shadow-lg rounded-md p-6 w-full"
              key={workout._id}
            >
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
          ))}
      </div>
    </div>
  );
};

export default WorkoutDetails;
