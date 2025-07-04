const express = require("express");
const Task = require("../models/tasks");
const auth = require("../middleware/auth");

const router = express.Router();

// Get all tasks
router.get("/", auth, async (req, res) => {
  const tasks = await Task.find({ userId: req.userId });
  res.json(tasks);
});

// Create task
router.post("/", auth, async (req, res) => {
  const { title, category, deadline } = req.body;
  const task = new Task({ title, category, deadline, userId: req.userId });
  await task.save();
  res.json(task);
});

// Update task
router.put("/:id", auth, async (req, res) => {
  const { title, category, deadline, completed } = req.body;
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, userId: req.userId },
    { title, category, deadline, completed },
    { new: true }
  );
  if (!task) return res.status(404).json({ message: "Task not found" });
  res.json(task);
});

// Delete task
router.delete("/:id", auth, async (req, res) => {
  const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.userId });
  if (!task) return res.status(404).json({ message: "Task not found" });
  res.json({ message: "Task deleted" });
});

module.exports = router;
