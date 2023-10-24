"use client";
import { Button, Modal } from "flowbite-react";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const NavBar = () => {
	const { user, dispatch } = useContext(AuthContext);
	const [dropDown, setDropDown] = useState(false);

	const [openModal, setOpenModal] = useState();
	const props = { openModal, setOpenModal };

	function handleDropDown() {
		setDropDown(!dropDown);
	}

	function handleLogout() {
		localStorage.clear("user");
		dispatch({ type: "LOGOUT" });
		window.location.reload();
	}
	return (
		<div className="navbar">
			<div className="section flex relative">
				<div className="w-full h-15 bg-sky-700 p-5 flex items-center justify-between">
					<Link to="/">
						<h1 className="text-gray-300 text-xl">
							<b>Workout Buddy</b>
						</h1>
					</Link>
					<div className="">
						<Modal
							show={props.openModal === "default"}
							onClose={() => props.setOpenModal(undefined)}
							className="flex items-center justify-center md:pt-0 pt-[200px]"
						>
							<Modal.Body>
								<div className="space-y-6">
									<p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
										Are you sure you want to log out of this application?
									</p>
								</div>
							</Modal.Body>
							<Modal.Footer>
								<Button
									onClick={handleLogout}
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
						<div className="">
							<Link to="/add-new-workout">
								<Button
									color="dark"
									pill
									className="absolute right-0 top-4 mr-12"
								>
									<p>Add New Workout</p>
								</Button>
							</Link>
							<span
								className="material-symbols-outlined text-white text-3xl -mr-2 cursor-pointer"
								onClick={handleDropDown}
							>
								account_circle
							</span>
							{dropDown && (
								<div
									className="bg-white rounded-md p-8 flex flex-col
					 absolute right-5 top-[72px] z-10"
								>
									<button
										className="flex items-center mb-3 cursor-pointer"
										onClick={() => props.setOpenModal("default")}
									>
										<span className="material-symbols-outlined text-black">
											logout
										</span>
										<p className="text-black ml-2">Logout</p>
									</button>
								</div>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default NavBar;
