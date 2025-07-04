import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";

function Navbar({ isLoggedIn, setIsLoggedIn, userName }) {
 
  const navigate = useNavigate();

  console.log(userName);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-title">
        Smart Task Manager {isLoggedIn && userName ? `- Welcome, ${userName}` : ""}
      </div>
      <div className="nav-links">
        {!isLoggedIn ? (
          <Link to="/login">Login</Link>
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
