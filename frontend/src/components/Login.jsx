import { Label, TextInput } from "flowbite-react";
import { useContext, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { API } from "../api";
import { useMutation, useQueryClient } from "react-query";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");
	const { dispatch } = useContext(AuthContext);
	const navigate = useNavigate();

	const [visible, setVisible] = useState(false);

	const queryClient = useQueryClient();

	function handleVisibility() {
		setVisible(!visible);
	}

	const body = { email, password };
	const handleSubmit = async () => {
		try {
			const response = await axios.post(`${API.prodAPI}/api/user/login`, body);
			console.log(response?.data);
			localStorage.setItem("user", JSON.stringify(response.data));
			dispatch({ type: "LOGIN", payload: response?.data });
			setMessage(response.data);
			setError("");
			navigate("/");
			return response.data;
		} catch (error) {
			setError(error?.response?.data?.error);
			console.log(error?.response?.data?.error);
			setMessage("");
		}
	};

	const mutation = useMutation(handleSubmit, {
		onSuccess: () => {
			queryClient.invalidateQueries("login");
		},
		onError: (error) => {
			console.log(error.message);
		},
	});

	const handleFormSubmit = (e) => {
		e.preventDefault();
		mutation.mutate();
	};

	return (
		<div className="login w-[30rem] absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 pb-5 px-[10px]">
			<div className="section p-10 mx-16 ">
				<form
					className="flex max-w-md flex-col gap-4"
					onSubmit={handleFormSubmit}
				>
					<h1 className="flex justify-center font-bold text-[30px]">Log in</h1>
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
							<Label htmlFor="password1" value="Your password" />
						</div>
						<div className="relative">
							<TextInput
								id="password"
								required
								type={visible ? "text" : "password"}
								onChange={(e) => setPassword(e.target.value)}
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
						{mutation.isLoading ? "Login..." : "Login"}
					</button>
					<p>
						Don't have an account?
						<Link to="/signup">
							<u>Sign up</u>
						</Link>
					</p>

					{message && (
						<div className="text-green-700 text-center">{message}</div>
					)}
					{error && <div className="text-red-700 text-center">{error}</div>}
				</form>
			</div>
		</div>
	);
};

export default Login;
