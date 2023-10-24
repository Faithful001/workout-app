import { AuthContext } from "../context/AuthContext";
import { WorkoutContext } from "../context/WorkoutContext";
import { useContext } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
	QueryClient,
	useMutation,
	useQuery,
	useQueryClient,
} from "react-query";
import axios from "axios";
import { API } from "../api";

const WorkoutEdit = () => {
	let { id } = useParams();
	console.log(id);
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const [title, setTitle] = useState("");
	const [load, setLoad] = useState("");
	const [reps, setReps] = useState("");

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
	const { error, data } = useQuery(["workout"], fetchWorkoutsById);
	console.log(data);
	useEffect(() => {
		data && setTitle(data.title);
		data && setLoad(data.load);
		data && setReps(data.reps);
	}, [data]);

	async function handleSubmit() {
		const body = { title, load, reps };
		try {
			const response = await axios.patch(
				`${API.prodAPI}/api/workouts/${id}`,
				body,
				{
					headers: {
						Authorization: `Bearer: ${token}`,
					},
				}
			);
			console.log(response.data);
			window.location.reload();
		} catch (error) {
			console.log(error.message);
		}
	}
	const { mutate, isLoading } = useMutation(handleSubmit, {
		onSuccess: () => {
			queryClient.invalidateQueries("edit");
		},
		onError: (error) => {
			console.log(error);
		},
	});

	function handleFormSubmit() {
		mutate();
		navigate(`/workout/${id}`);
	}
	return (
		<div className="workkout-edit">
			<div className="section mt-10 flex items-center flex-col">
				<h3 className="flex items-center justify-center font-bold text-2xl text-sky-700 mb-5">
					Edit your Workout
				</h3>

				{!user && <div> Login or signup to continue</div>}

				<form
					className="flex max-w-md flex-col gap-4"
					onSubmit={handleFormSubmit}
				>
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
					{isLoading ? (
						<Button className="bg-sky-700" type="submit">
							Saving...
						</Button>
					) : (
						<Button className="bg-sky-700" type="submit">
							Save
						</Button>
					)}
				</form>
			</div>
		</div>
	);
};

export default WorkoutEdit;
