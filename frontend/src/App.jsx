import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";

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
      </Switch>
        </div>
    </Router>
  );
}

export default App;
