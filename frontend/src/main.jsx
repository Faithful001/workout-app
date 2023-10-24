import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { WorkoutContextProvider } from "./context/WorkoutContext.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { ChildContextProvider } from "react";
import {
	ChildrenContext,
	ChildrenContextProvider,
} from "./context/Children.jsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
	// <React.StrictMode>
	<AuthContextProvider>
		<QueryClientProvider client={queryClient}>
			<ChildrenContextProvider>
				<WorkoutContextProvider>
					<App />
				</WorkoutContextProvider>
			</ChildrenContextProvider>
		</QueryClientProvider>
	</AuthContextProvider>
	// </React.StrictMode>
);
