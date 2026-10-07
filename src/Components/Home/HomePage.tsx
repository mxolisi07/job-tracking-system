import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { FaBriefcase, FaBars, FaSearch } from "react-icons/fa";

interface Application {
  id: number;
  company: string;
  role: string;
  dateApplied: string;
  status: string;
  duties: string;
}

function HomePage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [filter, setFilter] = useState("All");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/applications")
      .then((res) => res.json())
      .then((data) => setApplications(data));
  }, []);

  const filteredApps =
    filter === "All"
      ? applications
      : applications.filter((app) => app.status === filter);

  const appliedCount = applications.filter((a) => a.status === "Applied").length;
  const interviewCount = applications.filter((a) => a.status === "Interviewed").length;
  const rejectedCount = applications.filter((a) => a.status === "Rejected").length;

  return (
    <div className="home-container">
      {/* Header */}
      <header className="home-header">
        <div className="logo">
          <FaBriefcase /> <span>Job Tracker</span>
        </div>

        {/* Hamburger for mobile */}
        <div className="hamburger2" onClick={() => setMenuOpen(!menuOpen)}>
          <FaBars />
        </div>

        <nav className={`nav-links2 ${menuOpen ? "active" : ""}`}>
          <button onClick={() => navigate("/home")}>Home</button>
          <button onClick={() => navigate("/applications")}>Applications</button>
          <button onClick={() => navigate("/stats")}>Statistics</button>
          <FaSearch className="search-icon" />
        </nav>
      </header>
      
      <div className="greeting-section">
        <h2>Hey, Mxoliswa!</h2>
        <p>Here's your job summary.</p>
      </div>

      <button className="add-job-btn" onClick={() => navigate("/applications")}>
          Add a Job
      </button>

      <div className="summary-boxes">
        <div className="box">Jobs Applied: {appliedCount}</div>
        <div className="box">Interviews: {interviewCount}</div>
        <div className="box">Rejected Applications: {rejectedCount}</div>
      </div>

      
      <div className="tabs">
        {["All", "Applied", "Interviewed", "Rejected"].map((tab) => (
          <button
            key={tab}
            className={filter === tab ? "active" : ""}
            onClick={() => setFilter(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <section className="applications-list">
        {filteredApps.map((app) => (
          <div key={app.id} className="application-card">
            <h3>{app.company}</h3>
            <p>Date applied: {app.dateApplied}</p>
            <p>Status: {app.status}</p>
            <p>Role: {app.role}</p>
            <p>Job duties: {app.duties}</p>
            <div className="card-actions">
              <button onClick={() => navigate(`/applications/${app.id}`)}>View</button>
              <button>Edit</button>
              <button>Delete</button>
            </div>
          </div>
        ))}
      </section>

      
      <button className="logout-btn" onClick={() => navigate("/")}>
        Logout
      </button>

    </div>
  );
}

export default HomePage;
