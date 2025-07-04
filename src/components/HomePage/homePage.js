import React, { useState, useEffect } from "react";
import axios from "axios";
import Filters from "../../components/Tasks/Filter";
import TaskList from "../../components/Tasks/TaskList";
import TaskForm from "../../components/Tasks/TaskForm";

function Home() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDeadline, setSelectedDeadline] = useState("All");

const fetchTasks = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/tasks", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setTasks(res.data);
  } catch (err) {
    console.error("Error fetching tasks:", err);
    alert("Failed to load tasks.");
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchTasks();
  }, []);
const addTask = async (task) => {
  console.log("Token being sent:", localStorage.getItem("token"));
  const res = await axios.post("http://localhost:5000/api/tasks", task, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  setTasks([res.data, ...tasks]);
};

  const updateTask = async (updated) => {
    try {
      await axios.put(
        `http://localhost:5000/api/tasks/${updated._id}`,
        updated,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setTasks(
        tasks.map((t) => (t._id === updated._id ? { ...t, ...updated } : t))
      );
    } catch (err) {
      console.error("Error updating task:", err);
      alert("Failed to update task.");
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
      alert("Failed to delete task.");
    }
  };

  const toggleComplete = async (id) => {
    try {
      const task = tasks.find((t) => t._id === id);
      await axios.put(
        `http://localhost:5000/api/tasks/${id}`,
        { completed: true },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setTasks(
        tasks.map((t) =>
          t._id === id ? { ...t, completed: true } : t
        )
      );
    } catch (err) {
      console.error("Error marking complete:", err);
      alert("Failed to mark as complete.");
    }
  };

  const filtered = tasks.filter((task) => {
    const categoryMatch =
      selectedCategory === "All" || task.category === selectedCategory;

    const now = new Date();
    const dueDate = task.deadline ? new Date(task.deadline) : null;

    let deadlineMatch = true;

    if (selectedDeadline === "Overdue") {
      deadlineMatch = dueDate && dueDate < now.setHours(0, 0, 0, 0);
    } else if (selectedDeadline === "Due Today") {
      deadlineMatch =
        dueDate &&
        dueDate.toDateString() === new Date().toDateString();
    } else if (selectedDeadline === "Upcoming") {
      if (dueDate) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);

        const nextWeek = new Date();
        nextWeek.setDate(nextWeek.getDate() + 7);
        nextWeek.setHours(23, 59, 59, 999);

        deadlineMatch = dueDate >= tomorrow && dueDate <= nextWeek;
      } else {
        deadlineMatch = false;
      }
    }

    return categoryMatch && deadlineMatch;
  });

  if (loading) return <p>Loading tasks...</p>;

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
