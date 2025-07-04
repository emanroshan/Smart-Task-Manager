const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  category: String,
  deadline: String,
  completed: { type: Boolean, default: false }
});

module.exports = mongoose.model("Task", taskSchema);
