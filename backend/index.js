const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/user");
const taskRoutes = require("./routes/tasks");

const app = express();
app.use(cors());
app.use(express.json());


app.use((req, res, next) => {
 
  next();
});

mongoose.connect("mongodb+srv://imannroshan458:12345@cluster0.a6ekyvn.mongodb.net/")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));


app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`API running on port ${PORT}`));
