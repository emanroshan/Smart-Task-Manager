import React, { useState } from "react";
import "./Tasks.css";

function TaskList({ tasks, onDelete, onToggle, onUpdate }) {
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDeadline, setEditDeadline] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const startEdit = (task) => {
    setEditingId(task._id);   
    setEditTitle(task.title);
    setEditDeadline(task.deadline || "");
  };

  const saveEdit = (task) => {
    onUpdate({ ...task, title: editTitle, deadline: editDeadline });
    setEditingId(null);
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getDeadlineStatus = (deadline) => {
    if (!deadline) return null;
    const now = new Date();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dueDate = new Date(deadline);
    dueDate.setHours(0, 0, 0, 0);

    if (dueDate < today) return "Overdue";

    const diffDays = (dueDate - today) / (1000 * 60 * 60 * 24);
    if (diffDays < 7) return "Due Soon";

    return null;
  };

  if (tasks.length === 0) {
    return <p>No tasks to display.</p>;
  }

  let sortedTasks = [...tasks];

  const getPriority = (task) => {
    if (task.completed) return 3;

    const status = getDeadlineStatus(task.deadline);
    if (status === "Due Soon") return 0;
    if (status === "Overdue") return 2;
    return 1;
  };

  sortedTasks.sort((a, b) => {
    const prioA = getPriority(a);
    const prioB = getPriority(b);
    if (prioA !== prioB) return prioA - prioB;

    if (sortConfig.key) {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      if (sortConfig.key === "deadline") {
        aValue = aValue ? new Date(aValue) : new Date(0);
        bValue = bValue ? new Date(bValue) : new Date(0);
      }

      if (typeof aValue === "string") aValue = aValue.toLowerCase();
      if (typeof bValue === "string") bValue = bValue.toLowerCase();

      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    }

    return 0;
  });

  return (
    <div className="table-container">
      <table className="task-table">
        <thead>
          <tr>
            <th onClick={() => handleSort("title")}>
              Title{" "}
              {sortConfig.key === "title"
                ? sortConfig.direction === "asc"
                  ? "▲"
                  : "▼"
                : ""}
            </th>
            <th onClick={() => handleSort("deadline")}>
              Deadline{" "}
              {sortConfig.key === "deadline"
                ? sortConfig.direction === "asc"
                  ? "▲"
                  : "▼"
                : ""}
            </th>
            <th onClick={() => handleSort("category")}>
              Category{" "}
              {sortConfig.key === "category"
                ? sortConfig.direction === "asc"
                  ? "▲"
                  : "▼"
                : ""}
            </th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedTasks.map((task) => {
            const deadlineStatus = getDeadlineStatus(task.deadline);
            const isOverdue = deadlineStatus === "Overdue" && !task.completed;
            const rowClass = task.completed || isOverdue ? "completed-row" : "";

            return (
              <tr key={task._id}> {/* ✅ changed id -> _id */}
      <td className={task.completed ? "strikethrough" : ""}>
                  {editingId === task._id ? (   /* ✅ changed id -> _id */
                    <input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                    />
                  ) : (
                    task.title
                  )}
                </td>
                <td>
                  {editingId === task._id ? (  /* ✅ changed id -> _id */
                    <input
                      type="date"
                      value={editDeadline}
                      onChange={(e) => setEditDeadline(e.target.value)}
                    />
                  ) : (
                    <>
                      {task.deadline || "—"}
                      {deadlineStatus && (
                        <span
                          className={`badge ${
                            deadlineStatus === "Overdue"
                              ? "overdue"
                              : "duesoon"
                          }`}
                        >
                          {deadlineStatus}
                        </span>
                      )}
                    </>
                  )}
                </td>
                <td>{task.category}</td>
                <td>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => {
                        if (!task.completed) {
                          onToggle(task._id);  /* ✅ changed id -> _id */
                        }
                      }}
                      disabled={task.completed}
                    />
                    <span className="slider round"></span>
                  </label>
                  <span className="status-label">
                    {task.completed ? "Complete" : "Incomplete"}
                  </span>
                </td>
                <td>
                  {editingId === task._id ? (  /* ✅ changed id -> _id */
                    <>
                      <button onClick={() => saveEdit(task)}>Save</button>
                      <button onClick={() => setEditingId(null)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => startEdit(task)}>Edit</button>
                      <button onClick={() => onDelete(task._id)}>Delete</button> {/* ✅ changed id -> _id */}
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TaskList;
