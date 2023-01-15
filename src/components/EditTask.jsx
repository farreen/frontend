import axios from "axios";
import { useState } from "react";

const EditTask = ({taskAddedByUser}) => {
    const [update, setUpdate] = useState(taskAddedByUser);

    const handleSubmit = async() => {
        try{
            const res = await axios.post("http://localhost:8080/api/v1/task/update", {update});
            console.log("updated../", res.data);
        }catch(err){
            console.log("Err..", err.message);
        }
    }
    return (
        <div className="form-group mt-3">
      <div className="form-group mt-3">
        {/* <div> <span>{errMsg}</span></div> */}
      </div>
      <div className="form-group mt-3">
         <label>Select Task Category</label>
        <select value={update.taskCategory} onChange={(e) => setUpdate({...update, taskCategory: e.target.value})}>
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
              value={update.taskTitle}
              onChange={(e) => setUpdate({...update, taskTitle: e.target.value})}
            />
      </div>

      <div className="form-group mt-3">
      <label>Enter Task Description</label>
        <input
          value={update.taskDescription}
          onChange={(e) => setUpdate({...update, taskDescription: e.target.value})}
        />
      </div>
      <div className="form-group mt-3">
        <button onClick={() => handleSubmit()}>update</button>
      </div>
     </div>
    );
}
export default EditTask;