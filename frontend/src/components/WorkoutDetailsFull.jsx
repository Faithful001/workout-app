import {useParams} from "react-router-dom";

const WorkoutDetailsFull = () => {
    const { id } = useParams()
    return ( 
        <div className="workoutdetails-full">
            <div className="section">
                <h2>Workout - {id}</h2>
            </div>
        </div>
     );
}
 
export default WorkoutDetailsFull;