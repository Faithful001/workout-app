"use client";

import axios from "axios";
// only import what you want to use
import { Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { WorkoutContext } from "../context/WorkoutContext";
import { useContext } from "react";
import { API } from "../api";

const WorkoutForm = () => {
	const [title, setTitle] = useState("");
	const [load, setLoad] = useState("");
	const [reps, setReps] = useState("");
	// const [form, setForm] = useState("");
	const [error, setError] = useState("");
	const { dispatch } = useContext(WorkoutContext);
	const navigate = useNavigate();

	const { user } = useContext(AuthContext);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const workout = { title, load, reps };
		// console.log(workout)
		try {
			const response = await axios.post(
				`${API.prodAPI}/api/workouts/`,
				workout,
				{
					headers: {
						Authorization: `Bearer: ${user.token}`,
					},
				}
			);
			console.log(response.data);
			dispatch({ type: "CREATE_WORKOUT", payload: response.data });
			navigate("/");
			setTitle("");
			setLoad("");
			setReps("");
		} catch (err) {
			setError(err);
		}
	};
	return (
		<div className="workout-form">
			<div className="section mt-10 flex items-center flex-col">
				<h3 className="flex items-center justify-center font-bold text-2xl text-sky-700 mb-5">
					Add a New Workout
				</h3>

				{!user && <div> Login or signup to continue</div>}

				<form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
					<div>
						<div className="mb-2 block">
							<Label htmlFor="title" value="Title" />
						</div>
						<TextInput
							id="title"
							placeholder=""
							required
							type="text"
							onChange={(e) => setTitle(e.target.value)}
							value={title}
						/>
					</div>
					<div>
						<div className="mb-2 block">
							<Label htmlFor="load" value="Load" />
						</div>
						<TextInput
							id="load"
							placeholder="(kg)"
							required
							type="text"
							onChange={(e) => setLoad(e.target.value)}
							value={load}
						/>
					</div>
					<div>
						<div className="mb-2 block">
							<Label htmlFor="reps" value="Reps" />
						</div>
						<TextInput
							id="reps"
							required
							type="text"
							onChange={(e) => setReps(e.target.value)}
							value={reps}
						/>
					</div>
					<Button className="bg-sky-700" type="submit">
						Submit
					</Button>
				</form>
			</div>
			<p>{error}</p>
		</div>
	);
};

// export const output = {form, error};

export default WorkoutForm;
