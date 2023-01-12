import axios from "axios";
import React, { useState } from "react";
// import { Modal, ModalBody } from "react-bootstrap";

const TaskModal = ({taskAddedByUser}) => {
  const [taskAddedBy, setTaskAddedBy] = useState(taskAddedByUser);
  const [taskCategory, setTaskCategory] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [errMsg, setErrorMsg] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:8080/api/v1/add/task", { taskAddedBy, taskCategory, taskDescription, taskTitle });
      console.log("res taskk", res.data);
      setErrorMsg(res.data.message)
    } catch (err) {
      console.log("Err");
      setErrorMsg(err.response.data);

    }
  }

  return (
    <div className="form-group mt-3">
      <div className="form-group mt-3">
        <div> <span>{errMsg}</span></div>
      </div>
      <div className="form-group mt-3">
         <label>Select Task Category</label>
        <select value={taskCategory} onChange={(e) => setTaskCategory(e.target.value)}>
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
              type="text"
              placeholder="Enter task title"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
            />
          </div>

      <div className="form-group mt-3">
      <label>Enter Task Description</label>
        <input
          type="text"
          placeholder="Enter task description"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />
      </div>
      <div className="form-group mt-3">
        <button onClick={() => handleSubmit()}>submit</button>
      </div>
    </div>
  );
};
export default TaskModal;