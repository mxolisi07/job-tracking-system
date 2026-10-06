import react from 'react'
import { useNavigate } from 'react-router-dom'
import { FaBriefcase, FaBars } from 'react-icons/fa'
import './LandingPage.css'


function LandingPage() {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = react.useState(false)

  return (
    <div>
      {/* Topbar */}
      <nav className="topbar">
        <div className="logo" onClick={() => navigate("/")}>
          <FaBriefcase className="logo-icon" />
          <span className="logo-text">Job Tracker</span>
        </div>

        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <FaBars />
        </div>

        <div className={`nav-links ${menuOpen ? "active" : ""}`}>
          <button onClick={() => navigate("/")}>Home</button>
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => navigate("/signup")}>Sign Up</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero" >
        <h1>Track your job applications with ease.</h1>
        <p>Stay organized and monitor your progress — 
          know which applications you have Applied, 
          interviewed, or rejected.
        </p>
        <div>
          <button onClick={() => navigate("/signup")}>Get Started</button>
        </div>
      </section>

    </div>
    
  )
}

export default LandingPage