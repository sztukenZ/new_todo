import React from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCheck } from "@fortawesome/free-solid-svg-icons";

interface TaskListProps {
  tasks: Task[];
  onTaskDeleted: (id: number) => void;
  onTaskUpdated: (updatedTask: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onTaskDeleted,
  onTaskUpdated,
}) => {
  const handleDelete = (id) => {
    axios
      .delete(`/api/tasks/${id}/`)
      .then(() => onTaskDeleted(id))
      .catch((error) => console.error("Error deleting task:", error));
  };

  const handleUpdate = (id, updatedTask) => {
    axios
      .patch(`/api/tasks/${id}/`, updatedTask)
      .then((response) => onTaskUpdated(response.data))
      .catch((error) => console.error("Error updating task:", error));
  };

  return (
    <div>
      <h1>Task List</h1>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className={task.completed ? "completed" : ""}>
          {task.title} - {task.completed ? "Completed" : "Not Completed"}
          <FontAwesomeIcon
            icon={faCheck}
            style={{ cursor: "pointer", marginRight: "10px", color: "green" }}
            onClick={() => handleUpdate(task.id, { completed: !task.completed })}
          />
          <FontAwesomeIcon
            icon={faTrash}
            style={{ cursor: "pointer", color: "red" }}
            onClick={() => handleDelete(task.id)}
          />
        </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
