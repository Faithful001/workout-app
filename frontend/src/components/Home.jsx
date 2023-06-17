import axios from "axios";
import { useEffect, useState } from "react";
import WorkoutDetails from "./WorkoutDetails";
import WorkoutForm from "./WorkoutForm";
const Home = () => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/workouts/")
      .then((res) => {
        setWorkouts(res.data);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="home">
      <div className="section items-center flex">
        {workouts && (
          <WorkoutDetails title={"All Workouts"} workouts={workouts} />
        )}
        {/* <WorkoutForm /> */}
      </div>
    </div>
  );
};

export default Home;
