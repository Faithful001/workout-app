import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { WorkoutContextProvider } from "./context/WorkoutContext.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <WorkoutContextProvider>
          <App />
        </WorkoutContextProvider>
      </QueryClientProvider>
    </AuthContextProvider>
  // </React.StrictMode>
);
