import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./register.css";

function RegisterPage() {
   const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
   await axios.post("http://localhost:5000/api/auth/register", {
  name: "Test User",
  email: "test@example.com",
  password: "123456",
})
.then(res => console.log("✅ Response:", res.data))
.catch(err => console.error("❌ Error:", err));


      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className="center-wrapper">
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
         <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
       <p>
        Already have an account?{" "}
        <Link to="/login">Login here</Link>
      </p>
    </div>
    </div>
  );
}

export default RegisterPage;
