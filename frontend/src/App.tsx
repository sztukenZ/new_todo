interface Task {
  id: number;
  title: string;
  completed: boolean;
}

import React, { useState, useEffect } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import axios from "axios";

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [message, setMessage] = useState("");

  // Funkcja do pobierania listy zadań
  const fetchTasks = (): void => {
    axios
      .get<Task[]>("/api/tasks/")
      .then((response) => setTasks(response.data))
      .catch((error) => console.error("Error fetching tasks:", error));
  };

  // Pobieranie zadań na początku
  useEffect(() => {
    fetchTasks();
  }, []);

  // Funkcja do obsługi dodawania nowego zadania
  const handleTaskAdded = (newTask: Task) => {
    setMessage(`Task "${newTask.title}" added successfully!`);
    fetchTasks(); // Odśwież listę po dodaniu
    setTimeout(() => setMessage(""), 3000); // Usuń komunikat po 3 sekundach
  };

  const handleTaskUpdated = (updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  };

  const handleTaskDeleted = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };
  
  return (
    <div className="app-wrapper">
      <div className="content-container">
        {message && <div className="alert alert-success">{message}</div>}
        <h1>Task List</h1>
        <TaskForm onTaskAdded={handleTaskAdded} />
        <TaskList tasks={tasks} onTaskDeleted={handleTaskDeleted} onTaskUpdated={handleTaskUpdated} />
      </div>
    </div>
  );

  
};

export default App;