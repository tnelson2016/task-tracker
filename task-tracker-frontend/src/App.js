import React, { useEffect, useState } from 'react';
import TaskList from './TaskList';
import TaskForm from './TaskForm';

function App() {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from the backend
  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/tasks');
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    }
  };

  useEffect(() => {
fetchTasks();
  }, []);

  // -------Add a new task to the list
  const handleAddTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  // ------Toggle task completion status
  const handleToggleTask = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/tasks/${taskId}/toggle`, {
        method: "PUT",
      });

      if (!response.ok) throw new Error("Failed to toggle task");

      const updatedTask = await response.json();

      //----- Update the task in state
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        )
      );
    } catch (error) {
      console.error("Toggle error:", error);
    }
  };

  //----Delete a task
  const handleDeleteTask = async (taskId) =>{
    try {
      const response = await fetch(`http://localhost:8080/api/tasks/${taskId}`, {
        method: "DELETE",
      });

      if(!response.ok) throw new Error("Failed to Delete Task");

      setTasks((prevTasks) => prevTasks.filter((task) => task.id != taskId));
    }catch(error){
      console.error("Delete error:", error)
    }
  };

  return (
    <div style={{ 
      maxWidth: "600px", 
      margin: "2rem auto", 
      padding: "2rem", 
      border: "1px solid #ccc", 
      borderRadius: "10px", 
      backgroundColor: "#f9f9f9" 
      }}>

      <h1 style={{ textAlign: "center", color: "#333" }}>📝Task Tracker</h1>
      <TaskForm onAdd={handleAddTask} />
      <TaskList tasks={tasks} onToggle={handleToggleTask} onDelete = {handleDeleteTask} />
    </div>
  );
}

export default App;
