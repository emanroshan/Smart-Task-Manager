import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./login.css";

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
try {
  const res = await axios.post("http://localhost:5000/api/auth/login", {
    email,
    password,
  });
  
  console.log("Response data:", res.data);
  
const { token, name } = res.data;
localStorage.setItem("token", token);
localStorage.setItem("name", name);

  console.log("Name saved:", name);

  alert("Login successful!");
  onLogin();
  navigate("/");
} catch (err) {
  console.error(err);
  alert(err.response?.data?.message || "Login failed.");
}

  };

  return (
    <div className="center-wrapper">
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account?{" "}
        <Link to="/register">Register here</Link>
      </p>
    </div>
    </div>
  );
}

export default LoginPage;
