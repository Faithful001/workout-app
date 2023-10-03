import { useParams } from "react-router-dom";
import { WorkoutContext } from "../context/WorkoutContext";
// import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const WorkoutDetailsFull = () => {
	const { id } = useParams();
	const { state, dispatch } = useContext(WorkoutContext);
	const [data, setData] = useState("");
	const [input, setInput] = useState(false);
	console.log(input);

	const queryClient = useQueryClient();

	const { user } = useContext(AuthContext);

	const toggleInput = () => {
		setInput(input);
	};

	useEffect(() => {
		const fetchWorkoutsById = async () => {
			try {
				const response = await axios.get(
					`http://localhost:3000/api/workouts/${id}`,
					{
						headers: {
							Authorization: `Bearer: ${user.token}`,
						},
					}
				);
				console.log(response.data.title);
				setData(response.data);
				dispatch({ type: "GET_WORKOUT", payload: response.data });
				return response.data;
			} catch (error) {
				console.log(error);
			}
		};
		fetchWorkoutsById();
	}, [id, dispatch]);

	const edit = async () => {
		try {
			const response = await axios.patch(
				"http://localhost:3000/api/workouts/:id"
			);
			dispatch({ type: "UPDATE_WORKOUT", payload: response.data });
			return response.data;
		} catch (error) {
			console.log(error);
		}
	};

	const mutation = useMutation(
		edit,
		{
			onSuccess: () => {
				queryClient.invalidateQueries("workout update");
				console.log("workout update successfuly");
			},
			onError: (err) => {
				console.log(err);
			},
		},
		{
			enabled: Boolean(workout),
		}
	);

	const handleEdit = () => {
		mutation.mutate();
	};

	const handleDelete = () => {};
	return (
		<div className="workoutdetails-full">
			<div className="section m-10 flex flex-col items-center">
				<h2 className="text-2xl font-bold mb-5">Workout Details</h2>

				{!user && <div> Login or signup to continue</div>}

				<div
					className="m-5 bg-white hover:shadow-lg rounded-md p-6 px-20 relative"
					onClick={toggleInput}
				>
					<div className="absolute top-3 right-2">
						<span
							className="material-symbols-outlined absolute right-11 top-0.5 hover:cursor-pointer"
							onClick={handleDelete}
						>
							edit_note
						</span>
						<span
							className="material-symbols-outlined absolute right-2 bg-red-600 text-white rounded-md p-0.5 hover:cursor-pointer"
							onClick={handleEdit}
						>
							delete
						</span>
					</div>
					<div className="mt-5">
						<h1 className="uppercase font-bold text-2xl text-sky-700">
							{data.title}
						</h1>
						<p className="text-lg">Load(kg): {data.load}</p>
						<p className="text-lg">Reps: {data.reps}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default WorkoutDetailsFull;
