import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

interface TaskFormProps {
  onTaskAdded: (newTask: Task) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onTaskAdded }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/tasks/", { title })
      .then((response) => {
        onTaskAdded(response.data); // Wywołaj funkcję po dodaniu zadania
        setTitle(""); // Reset formularza
      })
      .catch((error) => console.error("Error creating task:", error));
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        placeholder="Enter task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="task-input"
        required
      />
      <button type="submit" className="task-button">
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </form>
  );
};

export default TaskForm;
