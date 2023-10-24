import axios from "axios";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { API } from "../api";

const WorkoutDetails = () => {
	const [workouts, setWorkouts] = useState([]);
	console.log(workouts);

	const user = localStorage.getItem("user");
	const parsedUser = JSON.parse(user);
	const name = user && parsedUser.name;
	const token = user && parsedUser.token;

	if (token) {
		function getWorkouts() {
			return axios
				.get(`${API.prodAPI}/api/workouts/`, {
					headers: { Authorization: `Bearer: ${token}` },
				})
				.then((res) => {
					console.log(res.data);
					return res.data;
				})
				.catch((err) => {
					console.log(err);
					throw err;
				});
		}

		const { isLoading, error, data } = useQuery(["workouts"], getWorkouts, {
			enabled: Boolean(workouts),
		});

		console.log(data);
		useEffect(() => {
			data && setWorkouts(data);
			isLoading && <div>Loading...</div>;
		}, [data]);
	}

	return (
		<div className="workout-details">
			<div className="section m-5">
				<h1 className="text-2xl font-bold text-center">All Workouts</h1>
				{!user ? (
					<div> Login or signup to continue</div>
				) : (
					<div>
						{workouts && workouts.length > 0 ? (
							<div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-white">
								{workouts.map((workout) => (
									<div
										key={workout._id}
										className="m-5 bg-white hover:shadow-lg rounded-md p-6 px-14 flex"
									>
										<Link to={`/workout/${workout._id}`}>
											<div className="flex flex-col items-start justify-center p-5 mr-2 -ml-3">
												<div className="flex ">
													<h4 className="uppercase font-bold text-2xl text-sky-700">
														{workout.title}
													</h4>
												</div>
												<p className="text-lg text-black">
													<strong>Load (kg):</strong> {workout.load}
												</p>
												<p className="text-lg text-black">
													<strong>Reps:</strong> {workout.reps}
												</p>
												<p className="text-sm text-black">
													{workout.updatedAt}
												</p>
											</div>
										</Link>
										{/* <div>
                      <span className="material-symbols-outlined text-black cursor-pointer">
                        delete
                      </span>
                      <span className="material-symbols-outlined text-black ml-2 -mr-6 cursor-pointer">
                        edit
                      </span>
                    </div> */}
									</div>
								))}
							</div>
						) : (
							<div>
								<h1 className="text-center text-lg mt-5 mb-2 bg-[#1F2937] text-white p-2 rounded-lg">
									No workouts
								</h1>
								<p className="text-lg text-center">Add a workout</p>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default WorkoutDetails;
