import React from "react";

function TaskList({ tasks, onToggle, onDelete }) {
  if (!tasks || tasks.length === 0) {
    return <p>No tasks available.</p>;
  }

  return (
    <div>
      <h2>Task List</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {[...tasks]
            .sort((a,b) => a.completed - b.completed)
            .map((task) => (
          <li key={task.id} 
          style={{ 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center", 
            padding: "0.5rem", 
            marginBottom: "0.5rem", 
            border: "1px solid #ddd", 
            borderRadius: "5px", 
            backgroundColor: task.completed ? "#e0ffe0" : "#fff"
          }}
          >
          <span>{task.title}{" "}</span>
          <div style={{ display: "flex", gap: "0.5rem" }}>

            <button onClick={() => onToggle(task.id)}>
              {task.completed ? "✅" : "❌"}
            </button>

            <button onClick={() => onDelete(task.id)} 
            style={{color: "red"}}>
            ❌ Delete
           </button>
</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
