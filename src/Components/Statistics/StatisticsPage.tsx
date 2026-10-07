import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Statistics.css";
import { FaBriefcase, FaBars, FaSearch } from "react-icons/fa";

interface Application {
  id: number;
  status: string;
}

function StatisticsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/applications")
      .then((res) => res.json())
      .then((data) => setApplications(data));
  }, []);

  const appliedCount = applications.filter((a) => a.status === "Applied").length;
  const interviewCount = applications.filter((a) => a.status === "Interviewed").length;
  const rejectedCount = applications.filter((a) => a.status === "Rejected").length;
  const successfulCount = applications.filter((a) => a.status === "Successful").length;

  return (
    <div className="statistics-container">
      
      <header className="statistics-header">
        <div className="logo5">
          <FaBriefcase className="logo-icon5"/> <span>Job Tracker</span>
        </div>
        <div className="hamburger5" onClick={() => setMenuOpen(!menuOpen)}>
          <FaBars />
        </div>
        <nav className={`nav-links5 ${menuOpen ? "active" : ""}`}>
          <button onClick={() => navigate("/home")}>Home</button>
          <button onClick={() => navigate("/application")}>Applications</button>
          <button onClick={() => navigate("/stats")}>Statistics</button>
          <FaSearch className="search-icon5" onClick={() => setSearchOpen(!searchOpen)} />
        </nav>
      </header>

      
      {searchOpen && (
        <div className="search-overlay5">
          <input
            type="text"
            placeholder="Search by status..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      
      <h2 className="stats-title">Statistics</h2>

      <div className="stats-bar applied">
        <span>Applied</span>
        <span>Total Number {appliedCount}</span>
      </div>

      <div className="stats-bar interviewed">
        <span>Interviewed</span>
        <span>Total Number {interviewCount}</span>
      </div>

      <div className="stats-bar rejected">
        <span>Rejected</span>
        <span>Total Number {rejectedCount}</span>
      </div>
      
      <div className="stats-bar successful">
        <span>Successful</span>
        <span>Total Number {successfulCount}</span>
      </div>

      <button className="back-btn5" onClick={() => navigate("/home")}>
        Back
      </button>
    </div>
  );
}

export default StatisticsPage;
