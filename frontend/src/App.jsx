import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import WorkoutForm from "./components/WorkoutForm";
import WorkoutDetailsFull from "./components/WorkoutDetailsFull";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Login from "./components/Login";
import Signup from "./components/Signup";
// import ReactQueryDevTools

const queryClient = new QueryClient()

function App() {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <NavBar />
        </div>
        <div className="content">
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route path='/add-new-workout'>
              <WorkoutForm />
            </Route>
            <Route path='/workout/:id'>
              <WorkoutDetailsFull />
            </Route>
            <Route path='/login'>
              <Login />
            </Route>
            <Route path='/signup'>
              <Signup />
            </Route>
          </Switch>
        </div>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
