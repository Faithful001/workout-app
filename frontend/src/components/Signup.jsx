"use client";

import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useState, useContext } from "react";
import { API } from "../api";
import { useQueryClient } from "react-query";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const [message, setMessage] = useState("");
	const [error, setError] = useState("");

	const [passwordType, setPasswordType] = useState("password");
	const [visible, setVisible] = useState(false);

	console.log(message);
	console.log(error);

	const queryClient = useQueryClient();

	const { dispatch } = useContext(AuthContext);

	function handleVisibility() {
		setVisible(!visible);
		if (visible) {
			setPasswordType("text");
		} else {
			setPasswordType("password");
		}
	}

	const body = { email, name, password };

	const formSubmit = async () => {
		try {
			const response = await axios.post(`${API.prodAPI}/api/user/signup`, body);
			console.log(response?.data);
			localStorage.setItem("user", JSON.stringify(response.data));
			setMessage(response?.data);
			dispatch({ type: "LOGIN", payload: response?.data });
			navigate("/");
			return response.data;
		} catch (error) {
			// console.log(error.message);
			setError(error?.response?.data?.error);
			console.log(error?.response?.data?.error);
		}
	};

	const mutation = useMutation(formSubmit, {
		onSuccess: () => {
			queryClient.invalidateQueries("sign up");
		},
		onError: (error) => {
			console.log(error);
		},
	});

	const handleFormSubmit = (e) => {
		e.preventDefault();
		mutation.mutate();
	};

	return (
		<div className="signp w-[30rem] absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 pb-5 px-[10px]">
			<div className="section p-10 mx-16 ">
				<form
					className="flex max-w-md flex-col gap-4"
					onSubmit={handleFormSubmit}
				>
					<h1 className="flex justify-center font-bold text-[30px]">Sign up</h1>
					<div>
						<div className="mb-2 block">
							<Label htmlFor="email" value="Your email" />
						</div>
						<TextInput
							id="email"
							placeholder="example@email.com"
							required
							type="email"
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div>
						<div className="mb-2 block">
							<Label htmlFor="name" value="Your full name" />
						</div>
						<TextInput
							id="name"
							placeholder="John Doe"
							required
							type="text"
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div>
						<div className="mb-2 block">
							<Label htmlFor="password1" value="Your password" />
						</div>
						<div className="relative">
							<TextInput
								id="password"
								required
								type={passwordType}
								onChange={(e) => setPassword(e.target.value)}
								className=""
							/>
							{visible ? (
								<span
									onClick={handleVisibility}
									className="material-symbols-outlined absolute text-xl top-2 right-2 bg-[#F9FAFB] pl-5 cursor-pointer"
								>
									visibility_off
								</span>
							) : (
								<span
									onClick={handleVisibility}
									className="material-symbols-outlined absolute text-xl top-2 right-2 bg-[#F9FAFB] pl-5 cursor-pointer"
								>
									visibility
								</span>
							)}
						</div>
						<p className="text-[13px]">
							An uppercase letter, a number and a special character
						</p>
					</div>
					<button
						className="bg-sky-700 w-full 5 p-2 rounded-md text-white"
						type="submit"
					>
						Sign up
					</button>
					<p>
						Already have an account?
						<Link to="/login">
							<u>Login</u>
						</Link>
					</p>
					{message && (
						<div className="bg-green-700 opacity-70 text-white p-3 text-center">
							{message}
						</div>
					)}
					{error && (
						<div className="bg-red-700 opacity-70 text-white p-3 text-center">
							{error}
						</div>
					)}
				</form>
			</div>
		</div>
	);
};

export default Signup;
