import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import WorkoutForm from "./components/WorkoutForm";
import WorkoutDetailsFull from "./components/WorkoutDetailsFull";
import WorkoutEdit from "./components/WorkoutEdit";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Login from "./components/Login";
import Signup from "./components/Signup";
// import ReactQueryDevTools

const queryClient = new QueryClient();

function App() {
	return (
		<Router>
			<QueryClientProvider client={queryClient}>
				<div className="App">
					<NavBar />
				</div>
				<div className="content">
					<Routes>
						<Route exact path="/" element={<Home />} />
						<Route path="/add-new-workout" element={<WorkoutForm />} />
						<Route path="/workout/:id" element={<WorkoutDetailsFull />} />
						<Route path="/workout/:id/edit" element={<WorkoutEdit />} />
						<Route path="/login" element={<Login />} />
						<Route path="/signup" element={<Signup />} />
					</Routes>
				</div>
			</QueryClientProvider>
		</Router>
	);
}

export default App;
