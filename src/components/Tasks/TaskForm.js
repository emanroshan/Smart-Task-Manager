import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function TaskForm({ addTask }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Work");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const task = {
      id: uuidv4(),
      title,
      category,
      deadline,
      completed: false,
      status: "Incomplete", // ✅ Added status field
    };
    addTask(task);
    setTitle("");
    setDeadline("");
    setCategory("Work");
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
      </div>

      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
