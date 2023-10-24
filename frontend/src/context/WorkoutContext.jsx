import { createContext, useReducer } from "react";

export const WorkoutContext = createContext();

const INITIAL_STATE = {
	workouts: null,
};

export const workoutsReducer = (state, action) => {
	switch (action.type) {
		case "GET_WORKOUTS":
			return {
				workouts: action.payload,
			};
		case "GET_WORKOUT":
			const { workoutId } = action.payload;
			const workout = state.workouts.find(
				(workout) => workout._id === workoutId
			);
			return {
				workouts: workout ? [workout] : state.workouts,
			};
		case "CREATE_WORKOUT":
			return {
				workouts: [action.payload, ...state.workouts],
			};
		case "DELETE_WORKOUT":
			return {
				workouts: state.workouts.filter((w) => w._id !== action.payload._id),
			};
		case "UPDATE_WORKOUT":
			const updatedWorkout = action.payload; // Assuming action.payload contains the updated workout data
			const updatedWorkouts = state.workouts.map((workout) =>
				workout._id === updatedWorkout._id ? updatedWorkout : workout
			);
			return {
				...state,
				workouts: updatedWorkouts,
			};

		default:
			return state;
	}
};

export const WorkoutContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(workoutsReducer, INITIAL_STATE);
	console.log(state);

	return (
		<WorkoutContext.Provider value={{ ...state, dispatch }}>
			{children}
		</WorkoutContext.Provider>
	);
};
