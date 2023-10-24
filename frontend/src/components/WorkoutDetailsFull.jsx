"use client";
import { Button, Modal } from "flowbite-react";
import { useNavigate, useParams } from "react-router-dom";
// import { WorkoutContext } from "../context/WorkoutContext";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
// import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { API } from "../api";

const WorkoutDetailsFull = () => {
	const navigate = useNavigate();
	let { id } = useParams();
	const [workout, setWorkout] = useState([]);
	console.log(workout);

	const [openModal, setOpenModal] = useState();
	const props = { openModal, setOpenModal };

	const user = localStorage.getItem("user");
	const parsedUser = JSON.parse(user);
	const token = user && parsedUser.token;

	const fetchWorkoutsById = async () => {
		try {
			const response = await axios.get(`${API.prodAPI}/api/workouts/${id}`, {
				headers: {
					Authorization: `Bearer: ${token}`,
				},
			});
			console.log(response.data);
			// dispatch({ type: "GET_WORKOUT", payload: response.data });
			return response.data;
		} catch (error) {
			console.log(error);
		}
	};
	const { isLoading, error, data } = useQuery(["workout"], fetchWorkoutsById, {
		enabled: Boolean(workout),
	});
	console.log(data);
	useEffect(() => {
		data && setWorkout(data);
	}, [data]);

	const handleEdit = () => {
		navigate(`/workout/${id}/edit`);
	};

	const handleDelete = async () => {
		try {
			const response = await axios.delete(`${API.prodAPI}/api/workouts/${id}`, {
				headers: {
					Authorization: `Bearer: ${token}`,
				},
			});
			console.log(response.data);
			navigate("/");
			// dispatch({ type: "GET_WORKOUT", payload: response.data });
			return response.data;
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="workoutdetails-full">
			<div className="section m-10 flex flex-col items-center">
				<h2 className="text-2xl font-bold mb-5">Workout Details</h2>

				{!user && <div> Login or signup to continue</div>}

				<div className="">
					<Modal
						show={props.openModal === "default"}
						onClose={() => props.setOpenModal(undefined)}
						className="flex items-center justify-center md:pt-0 pt-[200px]"
					>
						<Modal.Body>
							<div className="space-y-6">
								<p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
									Are you sure you want to delete this workout?
								</p>
							</div>
						</Modal.Body>
						<Modal.Footer>
							<Button
								onClick={handleDelete}
								className="bg-red-700 hover:bg-red-500"
							>
								Accept
							</Button>
							<Button
								color="gray"
								onClick={() => props.setOpenModal(undefined)}
							>
								Decline
							</Button>
						</Modal.Footer>
					</Modal>
				</div>

				<div className="m-5 bg-white hover:shadow-lg rounded-md p-6 px-20 relative">
					<div className="absolute top-3 right-2">
						<span
							className="material-symbols-outlined absolute right-11 top-0.5 hover:cursor-pointer"
							onClick={handleEdit}
						>
							edit_note
						</span>
						<span
							className="material-symbols-outlined absolute right-2 bg-red-600 text-white rounded-md p-0.5 hover:cursor-pointer"
							onClick={() => props.setOpenModal("default")}
						>
							delete
						</span>
					</div>
					<div className="mt-5">
						<h1 className="uppercase font-bold text-2xl text-sky-700">
							{workout.title}
						</h1>
						<p className="text-lg">Load(kg): {workout.load}</p>
						<p className="text-lg">Reps: {workout.reps}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default WorkoutDetailsFull;
