"use client";

import axios from "axios";
// only import what you want to use
import { Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const WorkoutForm = () => {
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  // const [form, setForm] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    const workout = { title, load, reps };
    // console.log(workout)
     const res = axios.post("http://localhost:3000/api/workouts/", workout)
    .then((res)=>{
      console.log(res.data)
    })
    .catch(err => setError(err))

    if(!res.ok) {
      setError(res.error)
    }
    if(res.ok){
      setTitle('');
      setLoad('');
      setReps('');
      setError(null);
      console.log("new workout added");
    }


    // if (!res.ok) {
    //   setError(json.error);
    // }
    // if (res.ok) {
    //   setTitle('');
    //   setLoad('');
    //   setReps('');
    //   setError(null);
    //   console.log("new workout added");
    // }
  }
  return (
    <div className="workout-form">
      <div className="section mt-10 flex items-center flex-col">
        <h3 className="flex items-center justify-center font-bold text-2xl text-sky-700 mb-5">
          Add a New Workout
        </h3>
        <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="title" value="Title" />
            </div>
            <TextInput
              id="title"
              placeholder=""
              required
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="load" value="Load" />
            </div>
            <TextInput
              id="load"
              required
              type="text"
              onChange={(e) => setLoad(e.target.value)}
              value={load}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="reps" value="Reps" />
            </div>
            <TextInput
              id="reps"
              required
              type="text"
              onChange={(e) => setReps(e.target.value)}
              value={reps}
            />
          </div>
          <Button className="bg-sky-700" type="submit">
            Submit
          </Button>
        </form>
      </div>
      <p>{error}</p>
    </div>
  );
};

// export const output = {form, error};

export default WorkoutForm;
