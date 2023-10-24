// import wave from "../assets/wave.png";
import WorkoutDetails from "./WorkoutDetails";

const Home = () => {
	// const {workouts, workoutDispatch} = useWorkoutContext();
	const user = localStorage.getItem("user");
	const parsedUser = JSON.parse(user);
	const name = user && parsedUser.name;
	return (
		<div className="home">
			{/* <div className="flex items-center justify-center max-w-[320px] -mb-5"> */}
			{user && <p className="flex-1 text-[20px] m-4 mb-0">Welcome, {name}</p>}
			{/* </div> */}
			<div className="section items-center justify-center flex flex-col">
				<WorkoutDetails />
			</div>
		</div>
	);
};

export default Home;
