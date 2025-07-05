import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import LoginPage from "./components/loginPage/login";
import RegisterPage from "./components/registerPage/register";
import HomePage from "./components/HomePage/homePage";
import "./App.css";

function App() {
  const [userName, setUserName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem("token");
  });

  useEffect(() => {
    if (isLoggedIn) {
      const storedName = localStorage.getItem("name");
      setUserName(storedName || "");
    } else {
      setUserName("");
    }
  }, [isLoggedIn]);

  return (
    <Router>
      <Navbar
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        userName={userName}
      />
      <div className="container">
        <Routes>
          <Route
            path="/login"
            element={
              isLoggedIn ? (
                <Navigate to="/" />
              ) : (
                <LoginPage
                  onLogin={() => {
                    setIsLoggedIn(true);
                    const storedName = localStorage.getItem("name");
                    setUserName(storedName || "");
                  }}
                />
              )
            }
          />
          <Route
            path="/register"
            element={
              isLoggedIn ? (
                <Navigate to="/" />
              ) : (
                <RegisterPage />
              )
            }
          />
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <HomePage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
