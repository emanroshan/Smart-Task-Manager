import React, { useState, useEffect } from "react";
import Filters from "../../components/Tasks/Filter";
import TaskList from "../../components/Tasks/TaskList";
import TaskForm from "../../components/Tasks/TaskForm";

function Home() {
  const [tasks, setTasks] = useState(() => {
    const stored = localStorage.getItem("tasks");
    return stored ? JSON.parse(stored) : [];
  });

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDeadline, setSelectedDeadline] = useState("All");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => setTasks([task, ...tasks]);

  const updateTask = (updated) =>
    setTasks(tasks.map((t) => (t.id === updated.id ? updated : t)));

  const deleteTask = (id) => setTasks(tasks.filter((t) => t.id !== id));

  const toggleComplete = (id) =>
    setTasks(
      tasks.map((t) =>
        t.id === id
          ? { ...t, completed: !t.completed }
          : t
      )
    );

 const filtered = tasks.filter((task) => {
  const categoryMatch =
    selectedCategory === "All" || task.category === selectedCategory;

  const now = new Date();
  const dueDate = task.deadline ? new Date(task.deadline) : null;

  let deadlineMatch = true;

  if (selectedDeadline === "Overdue") {
    deadlineMatch = dueDate && dueDate < now.setHours(0,0,0,0);
  } else if (selectedDeadline === "Due Today") {
    deadlineMatch =
      dueDate &&
      dueDate.toDateString() === new Date().toDateString();
  } else if (selectedDeadline === "Upcoming") {
    if (dueDate) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0,0,0,0);

      const nextWeek = new Date();
      nextWeek.setDate(nextWeek.getDate() + 7);
      nextWeek.setHours(23,59,59,999);

      deadlineMatch = dueDate >= tomorrow && dueDate <= nextWeek;
    } else {
      deadlineMatch = false;
    }
  }

  return categoryMatch && deadlineMatch;
});


  return (
    <div>
      <h2>Your Tasks</h2>
      <TaskForm addTask={addTask} />
      <Filters
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedDeadline={selectedDeadline}
        setSelectedDeadline={setSelectedDeadline}
      />
      <TaskList
        tasks={filtered}
        onDelete={deleteTask}
        onToggle={toggleComplete}
        onUpdate={updateTask}
      />
    </div>
  );
}

export default Home;
