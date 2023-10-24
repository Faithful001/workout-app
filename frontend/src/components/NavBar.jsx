"use client";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";

const NavBar = () => {
	const { user } = useContext(AuthContext);
	return (
		<div className="navbar">
			<div className="section flex relative">
				<div className="w-full h-15 bg-sky-700 p-5 flex items-center justify-between">
					<Link to="/">
						<h1 className="text-gray-300 text-xl">
							<b>Workout Buddy</b>
						</h1>
					</Link>
					{!user ? (
						<div className="flex">
							<p className="text-white">
								<Link to="/login">Login</Link>
							</p>
							<p className="text-white">/</p>
							<p className="text-white">
								<Link to="/signup">Signup</Link>
							</p>
						</div>
					) : (
						<Link to="/add-new-workout">
							<Button color="dark" pill className="absolute right-0 top-3 mr-6">
								<p>Add New Workout</p>
							</Button>
						</Link>
					)}
				</div>
			</div>
		</div>
	);
};

export default NavBar;
