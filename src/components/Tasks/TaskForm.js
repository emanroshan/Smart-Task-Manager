import React, { useState } from "react";

function TaskForm({ addTask }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Work");
  const [deadline, setDeadline] = useState("");
  const [error, setError] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();

  const task = {
    title,
    category,
    deadline,
  };

  try {
    await addTask(task);

    setTitle("");
    setDeadline("");
    setCategory("Work");
    setError("");
  } catch (err) {
    console.error("Error adding task:", err);
    const errorMessage = err.response?.data?.message || "Failed to add task.";
    setError(errorMessage);

    setTimeout(() => {
      setError("");
    }, 2500);
  }
};


  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Task Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
          required
        />
      </div>

      <div className="form-group">
        <label>Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>Work</option>
          <option>Personal</option>
          <option>Learning</option>
        </select>
      </div>

      <div className="form-group">
        <label>Deadline</label>
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
        {error && (
          <div style={{ color: "red", marginTop: "4px" }}>
            {error}
          </div>
        )}
      </div>

      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
