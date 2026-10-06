import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";
import { FaBriefcase } from "react-icons/fa6";

function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const newUser = { name, email, password };

    const response = await fetch("http://localhost:5000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });

    if (response.ok) {
      alert("Sign up successful! Please login.");
      navigate("/login");
    } else {
      alert("Error creating account.");
    }
  };

  return (
    <div className="signup-container">

      <div className="signup-header">
        <FaBriefcase className="logo-icon3" />
        <h1 className="logo-text3">Job Tracker</h1>
      </div>
      <p className="welcome-text">Create your account to get started.</p>

     
      <div className="signup-form">
        <label>Name</label>
        <input
          type="text"
          placeholder="Enter full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Email</label>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label>Confirm Password</label>
        <input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <div className="signup-links">
          <a href="/login">Already have an account? Login</a>
        </div>

        <div className="signup-buttons">
          <button className="cancel-btn" onClick={() => navigate("/")}>
            Cancel
          </button>
          <button className="signup-btn" onClick={handleSignUp}>
            SIGN UP
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
