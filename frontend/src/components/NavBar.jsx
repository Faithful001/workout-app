"use client";

import { Button } from "flowbite-react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="navbar">
      <div className="section flex relative">
        <div className="w-full h-15 bg-sky-700 p-5">
          <Link to="/">
            <h1 className="text-gray-300 text-xl">
              <b>Workout Buddy</b>
            </h1>
          </Link>
          <Link to="/add-new-workout">
            <Button color="dark" pill className="absolute right-0 top-3 mr-10">
              <p>Add New Workout</p>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
