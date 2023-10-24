const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

//get all workouts
const getWorkouts = async (req, res) => {
	try {
		const user_id = req.user._id;
		const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 });
		// console.log(workouts);
		res.status(200).json(workouts);
	} catch (error) {
		res.status(500).json({ error: "Something went wrong" + error });
	}
};

//get a single workout

const getWorkout = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: "no such workout" });
	}
	const workout = await Workout.findById(id);

	if (!workout) {
		return res.status(404).json({ err: "no such workout" });
	} else {
		return res.status(200).json(workout);
	}
};

//create a new workout
const createWorkout = async (req, res) => {
	const { title, load, reps } = req.body;
	const user_id = req.user._id;
	// add doc to db
	try {
		const workout = await Workout.create({ title, load, reps, user_id });
		res.status(200).json(workout);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

//delete a workout
const deleteWorkout = async (req, res) => {
	const { id } = req.params;
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: "no such workout" });
	}
	const workout = await Workout.findOneAndDelete({ _id: id });
	if (!workout) {
		return res.status(404).json({ error: "no such workout" });
	} else {
		return res.status(200).json(workout);
	}
};

//update a workout
const updateWorkout = async (req, res) => {
	const { id } = req.params;
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ error: "no such workout" });
	}

	const workout = await Workout.findOneAndUpdate(
		{ _id: id },
		{
			...req.body,
		}
	);

	if (!workout) {
		return res.status(404).json({ error: "no such workout" });
	} else {
		return res.status(200).json(workout);
	}
};

module.exports = {
	getWorkouts,
	getWorkout,
	createWorkout,
	deleteWorkout,
	updateWorkout,
};
