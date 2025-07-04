const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

router.post("/register", async (req, res) => {
  console.log("📥 REGISTER route called!");

  const { name, email, password } = req.body;
  console.log("📋 Request body:", { name, email });

  try {
    const existing = await User.findOne({ email });
    console.log("🔍 Existing user lookup result:", existing);

    if (existing) {
      console.log("⚠️ User already exists, returning 400.");
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("🔑 Password hashed.");

    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    console.log("✅ User saved to DB:", user);

    res.status(201).json({ message: "User registered" });
  } catch (err) {
    console.error("❌ Registration error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;


// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user._id, email: user.email }, SECRET, { expiresIn: "1h" });

  res.json({ token, name: user.name });
});

module.exports = router;
