import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";

function Navbar({ isLoggedIn, setIsLoggedIn, userName }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-title">
        {isLoggedIn && userName ? `Welcome, ${userName}` : "Smart Task Manager"}
      </div>
      <div className="nav-links">
        {!isLoggedIn ? (
          <Link to="/"></Link>
        ) : (
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;