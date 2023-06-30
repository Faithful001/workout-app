import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import WorkoutForm from "./components/WorkoutForm";
import WorkoutDetailsFull from "./components/WorkoutDetailsFull";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar/>
      </div>
        <div className="content">
      <Switch>
          <Route exact path='/'>
            <Home/>
          </Route>
          <Route exact path='/add-new-workout'>
            <WorkoutForm/>
          </Route>
          <Route exact path='/workout/:id'>
            <WorkoutDetailsFull/>
          </Route>
      </Switch>
        </div>
    </Router>
  );
}

export default App;
