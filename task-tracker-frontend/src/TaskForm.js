import React, { useState } from "react";

function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    try {
      const response = await fetch("http://localhost:8080/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, completed: false }),
      });

      if (!response.ok) throw new Error("Failed to add task");

      const newTask = await response.json();
      onAdd(newTask); // calls the function from App.js

      setTitle(""); // clear input box 
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}style={{ marginBottom: "1rem", display: "flex", gap: "0.5rem" }}>
      <input
        type="text"
        placeholder="Enter a new task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{
            flex: 1,
            padding: "0.5rem",
            fontSize: "1rem",
            borderRadius: "5px",
            border: "1px solid #ccc"
          }}
      />
      <button  type="submit" 
    style={{
      padding: "0.5rem 1rem",
      fontSize: "1rem",
      borderRadius: "5px",
      backgroundColor: "#4CAF50",
      color: "white",
      border: "none",
      cursor: "pointer"
    }}>Add Task</button>
    </form>
  );
}

export default TaskForm;
