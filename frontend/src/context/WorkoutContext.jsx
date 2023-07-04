import { createContext, useReducer } from "react";

export const WorkoutContext = createContext();

const INITIAL_STATE = {
  workouts: null
}

export const workoutsReducer = (state, action) => {
  switch (action.type) {
    case "GET_WORKOUTS":
      return {
        workouts: action.payload,
      };
    case "GET_WORKOUT":
        // const workoutId = action.payload;
        // const workout = state.workouts.find((workout) => workout._id === workoutId);
        
        return {
          ...state,
          workout: action.payload,
      };

    case "CREATE_WORKOUT":
      return {
        workouts: [action.payload, ...state.workouts],
      };
    case "DELETE_WORKOUT":
      return {
        workouts: state.workouts.filter((w) => w._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const WorkoutContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutsReducer, INITIAL_STATE);

  return (
    <WorkoutContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutContext.Provider>
  );
};
