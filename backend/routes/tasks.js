const express = require("express");
const Task = require("../models/tasks");
const auth = require("../middleware/auth");

const router = express.Router();

// Get all tasks for logged-in user
router.get("/", auth, async (req, res) => {
  const tasks = await Task.find({ userId: req.user.id });
  res.json(tasks);
});




router.post("/", auth, async (req, res) => {
  const { title, category, deadline } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required." });
  }

  const newTask = new Task({
    userId: req.user.id, // <--- this MUST be here
    title,
    category,
    deadline,
    completed: false
  });

  await newTask.save();

  res.status(201).json(newTask);
});

// Update a task
router.put("/:id", auth, async (req, res) => {
  const { title, category, deadline, completed } = req.body;
  const task = await Task.findOne({ _id: req.params.id, userId: req.user.id });

  if (!task) {
    return res.status(404).json({ message: "Task not found." });
  }

  task.title = title ?? task.title;
  task.category = category ?? task.category;
  task.deadline = deadline ?? task.deadline;
  task.completed = completed ?? task.completed;

  await task.save();
  res.json(task);
});

// Delete a task
router.delete("/:id", auth, async (req, res) => {
  const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
  if (!task) {
    return res.status(404).json({ message: "Task not found." });
  }
  res.json({ message: "Task deleted." });
});

module.exports = router;
