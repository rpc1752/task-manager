import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

function App() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  // Function to fetch all tasks
  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/tasks");
      setTasks(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch tasks");
      console.error("Error fetching tasks:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to add a new task
  const addTask = async (title) => {
    try {
      const response = await axios.post("/tasks", { title, completed: false });
      setTasks([...tasks, response.data]);
    } catch (err) {
      setError("Failed to add task");
      console.error("Error adding task:", err);
    }
  };

  // Function to mark a task as completed
  const completeTask = async (taskId) => {
    try {
      const response = await axios.put(`/tasks/${taskId}`);
      setTasks(
        tasks.map((task) =>
          task.id === taskId ? { ...task, completed: true } : task
        )
      );
    } catch (err) {
      setError("Failed to update task");
      console.error("Error updating task:", err);
    }
  };

  return (
    <div className="container">
      <h1>Task Manager</h1>
      {error && <p className="error">{error}</p>}
      <TaskForm addTask={addTask} />
      {isLoading ? (
        <p>Loading tasks...</p>
      ) : (
        <TaskList tasks={tasks} completeTask={completeTask} />
      )}
    </div>
  );
}

export default App;
