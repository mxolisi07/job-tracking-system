import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'
import { FaBriefcase } from 'react-icons/fa6'

function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const response = await fetch(
      `http://localhost:5000/users?email=${email}&password=${password}`
    );
    const data = await response.json();

    if (data.length > 0) {
      alert("Login successful!");
      navigate("/home");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      
      <div className="login-header">
        <FaBriefcase className="logo-icon2" />
        <h1 className="logo-text2">Job Tracker</h1>
      </div>
      <p className="welcome-text">Welcome back!!! Login to continue.</p>

      <div className="login-form">
        <label>Username</label>
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

        <div className="login-links">
          <a className="link-forgot" href="/forgot">Forgotten Password?</a>
          <a className='new-user' href="/signup">New User? Click Here</a>
        </div>

        <div className="login-buttons">
          <button className="cancel-btn" onClick={() => navigate("/")}>
            Cancel
          </button>
          <button className="login-btn" onClick={handleLogin}>
            LOGIN
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;