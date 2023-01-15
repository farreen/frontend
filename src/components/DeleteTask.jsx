import axios from "axios";
import { useState } from "react";

const DeleteTask = ({taskAddedByUser}) => {
    const [deleteTask, setDeleteTask] = useState(taskAddedByUser);

    const handleSubmit = async() => {
        try{
            const res = await axios.post(`http://localhost:8080/api/v1/task/deleteTask/${deleteTask._id}`);
            console.log("ress from delete", res.data);
        }catch(err){
            console.log("Err", err.message);
        }
    }
    return (
        <div className="form-group mt-3">
            <div className="form-group mt-3">
                {/* <div> <span>{errMsg}</span></div> */}
            </div>
            <div className="form-group mt-3">
                <label>Select Task Category</label>
                <select value={deleteTask.taskCategory}>
                    <option>Select Category</option>
                    <option>Marketing</option>
                    <option>Design</option>
                    <option>Development</option>
                    <option>Management</option>
                </select>
            </div>
            <div className="form-group mt-3">
                <label>Enter Task Title</label>
                <input
                    value={deleteTask.taskTitle}
                />
            </div>

            <div className="form-group mt-3">
                <label>Enter Task Description</label>
                <input
                    value={deleteTask.taskDescription}
                />
            </div>
            <div className="form-group mt-3">
                <button onClick={() => handleSubmit()}>Delete</button>
            </div>
        </div>
    );
}
export default DeleteTask;