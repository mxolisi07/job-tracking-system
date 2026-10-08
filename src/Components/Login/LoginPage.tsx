import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'
import { FaBriefcase } from 'react-icons/fa6'

function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}
    if (!email.trim()) newErrors.email ="Email is required."
    if (!password.trim()) newErrors.password ="Password is required."
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleLogin = async () => {
    if (!validateForm()) {
      alert("Please make sure that your data is correct.")
      return
    }

    const response = await fetch(
      `http://localhost:5000/users?email=${email}&password=${password}`
    )
    const users = await response.json()
    const user = users.find((u: any) => u.email === email && u.password === password)

    if (user) {
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
        {errors.email && <span className="error">{errors.email}</span>}

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <span className="error">{errors.password}</span>}

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