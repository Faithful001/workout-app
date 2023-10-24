import { createContext, useContext, useState } from "react";

export const ChildrenContext = createContext();

export const ChildrenContextProvider = ({ children }) => {
	const [title, setTitle] = useState("");
	const [load, setLoad] = useState("");
	const [reps, setReps] = useState("");
	return (
		<ChildrenContext.Provider
			value={{ title, setTitle, load, setLoad, reps, setReps }}
		>
			{children}
		</ChildrenContext.Provider>
	);
};

export const useChildren = () => {
	return useContext(ChildrenContext);
};
