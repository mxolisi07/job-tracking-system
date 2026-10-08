import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";
import { FaBriefcase } from "react-icons/fa6";

function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!name.trim()) newErrors.name = "Name is required.";
    if (!email.trim()) newErrors.email = "Email is required.";
    if (!password.trim()) newErrors.password = "Password is required.";
    if (!confirmPassword.trim()) newErrors.confirmPassword = "Confirm Password is required.";
    if (password && confirmPassword && password !== confirmPassword) {
      newErrors.confirmPassword = "Password do not match."; }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const handleSignUp = async () => {
    if (!validateForm()) {
      alert("Please make sure to have inserted valid data")
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
        {errors.name && <span className="error">{errors.name}</span>}

        <label>Email</label>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <span className="error">{errors.email}</span>}

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <span className="error">{errors.password}</span>}

        <label>Confirm Password</label>
        <input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}

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
