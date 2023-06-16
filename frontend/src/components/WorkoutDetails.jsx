const WorkoutDetails = ({ workouts, title }) => {
  return (
    <div className="workout-details">
      <div className="section m-5">
        <h1 className="text-2xl font-bold text-center">{title}</h1>
        {workouts.map((workout) => (
          <div
            className="m-5 bg-white hover:shadow-lg rounded-md p-6 w-full"
            key={workout._id}
          >
            <h4 className="uppercase font-bold text-2xl text-sky-700">
              {workout.title}
            </h4>
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
