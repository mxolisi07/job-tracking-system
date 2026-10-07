import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { FaBriefcase, FaBars, FaSearch, FaTrash,
  FaEye, FaEdit, FaCalendar, FaUserTie, FaMapMarkerAlt, FaPhone, FaMoneyBill } from "react-icons/fa";

interface Application {
  id: number;
  company: string;
  role: string;
  dateApplied: string;
  status: string;
  duties: string;
  employmentType: string;
  location: string;
  contact: string;
  salary: string;
}

function HomePage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [filter, setFilter] = useState("All");
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingApp, setEditingApp] = useState<Application | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [viewingApp, setViewingApp] = useState<Application | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/applications")
      .then((res) => res.json())
      .then((data) => setApplications(data));
  }, []);

  const filteredApps = applications.filter((app) => {
    const matchesFilter = filter === "All" || app.status === filter;
    const matchesSearch =
      app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.role.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const appliedCount = applications.filter((a) => a.status === "Applied").length;
  const interviewCount = applications.filter((a) => a.status === "Interviewed").length;
  const rejectedCount = applications.filter((a) => a.status === "Rejected").length;
  const successfulCount = applications.filter((a) => a.status === "Successful").length;

  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:5000/applications/${id}`, { method: "DELETE" });
    setApplications(applications.filter((app) => app.id !== id));
  };

    const validateEditForm = () => {
      const newErrors: { [key: string]: string } = {};
      if (!editingApp?.company.trim()) newErrors.company = "Company name is required.";
      if (!editingApp?.role.trim()) newErrors.role = "Role is required.";
      if (!editingApp?.status) newErrors.status = "Status must be selected.";
      if (!editingApp?.duties.trim()) newErrors.duties = "Job duties are required.";
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleEditSave = async () => {
      if (!editingApp) return;
      if (!validateEditForm()) return;

      await fetch(`http://localhost:5000/applications/${editingApp.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingApp),
      });
      setApplications(applications.map(app => app.id === editingApp.id ? editingApp : app));
      setEditingApp(null);
    };




  return (
    <div className="home-container">
      
      <header className="home-header">
        <div className="logo2">
          <FaBriefcase className="logo-icon2"/> <span>Job Tracker</span>
        </div>

        <div className="hamburger2" onClick={() => setMenuOpen(!menuOpen)}>
          <FaBars />
        </div>

        <nav className={`nav-links2 ${menuOpen ? "active" : ""}`}>
          <button onClick={() => navigate("/home")}>Home</button>
          <button onClick={() => navigate("/application")}>Applications</button>
          <button onClick={() => navigate("/stats")}>Statistics</button>
          <FaSearch className="search-icon" 
          onClick={() => setSearchOpen(!searchOpen)}
          />
        </nav>
      </header>

        {searchOpen && (
        <div className="search-overlay">
          <input
            type="text"
            placeholder="Search by company or role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}
      
      <div className="greeting-section">
        <h2>Hey, Mxoliswa!</h2>
        <p>Here's your job summary.</p>
      </div>

      <div className="summary-boxes">
        <div className="box">Jobs Applied: {appliedCount}</div>
        <div className="box">Interviews: {interviewCount}</div>
        <div className="box">Rejected Applications: {rejectedCount}</div>
        <div className="box">Successful Applications: {successfulCount}</div>
      </div>

      <div className="controls">
        <button className="add-job-btn" onClick={() => navigate("/addjob")}>
          Add Job
        </button>
        <div className="tabs">
          {["All", "Applied", "Interviewed", "Successful", "Rejected"].map((tab) => (
            <button
              key={tab}
              className={filter === tab ? "active" : ""}
              onClick={() => setFilter(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <button className="logout-btn" onClick={() => navigate("/")}>
          Logout
        </button>
      </div>

      <h3 className="applications-title">Applications</h3>
      <div className="applications-list">
        {filteredApps.map((app) => (
          <div key={app.id} className={`application-card ${app.status.toLowerCase()}`}>
            <p><FaBriefcase /> Company name: {app.company}</p>
            <p><FaCalendar /> Date applied: {app.dateApplied}</p>
            <p className="status">Status: {app.status}</p>
            <p><FaUserTie /> Role: {app.role}</p>
            <p>Job duties: {app.duties}</p>
            <div className="card-actions">
                <FaEye title="View" onClick={() => setViewingApp(app)} />
                <FaEdit title="Edit" onClick={() => setEditingApp(app)} />
                <FaTrash title="Delete" onClick={() => handleDelete(app.id)} />
            </div>
          </div>
        ))}
      </div>

        {viewingApp && (
  <div className="modal-overlay">
    <div className="modal">
      <h2>View Job Details</h2>

      <p><FaBriefcase /> <strong>Company:</strong> {viewingApp.company}</p>
      <p><FaUserTie /> <strong>Role:</strong> {viewingApp.role}</p>
      <p><strong>Employment Type:</strong> {viewingApp.employmentType}</p>
      <p><FaMapMarkerAlt /> <strong>Address:</strong> {viewingApp.location}</p>
      <p><FaPhone /> <strong>Contact:</strong> {viewingApp.contact}</p>
      <p><strong>Duties:</strong> {viewingApp.duties}</p>
      <p><FaMoneyBill /> <strong>Salary:</strong> {viewingApp.salary}</p>
      <p><FaCalendar /> <strong>Date Applied:</strong> {viewingApp.dateApplied}</p>
      <p className="status"><strong>Status:</strong> {viewingApp.status}</p>

      <div className="modal-actions">
        <button className="cancel-btn" onClick={() => setViewingApp(null)}>Close</button>
      </div>
    </div>
  </div>
)}

        {editingApp && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Edit Application</h2>

            <label>Company</label>
            <input
              type="text"
              value={editingApp.company}
              onChange={(e) => setEditingApp({ ...editingApp, company: e.target.value })}
            />
            {errors.company && <span className="error">{errors.company}</span>}

            <label>Role</label>
            <input
              type="text"
              value={editingApp.role}
              onChange={(e) => setEditingApp({ ...editingApp, role: e.target.value })}
            />
            {errors.role && <span className="error">{errors.role}</span>}

            <label>Status</label>
            <select
              value={editingApp.status}
              onChange={(e) => setEditingApp({ ...editingApp, status: e.target.value })}
            >
              <option value="">--- Choose an option ---</option>
              <option>Applied</option>
              <option>Interviewed</option>
              <option>Rejected</option>
              <option>Successful</option>
            </select>
            {errors.status && <span className="error">{errors.status}</span>}

            <label>Duties</label>
            <textarea
              value={editingApp.duties}
              onChange={(e) => setEditingApp({ ...editingApp, duties: e.target.value })}
            />
            {errors.duties && <span className="error">{errors.duties}</span>}

            <div className="modal-actions">
              <button className="cancel-btn3" onClick={() => setEditingApp(null)}>Cancel</button>
              <button className="save-btn3" onClick={handleEditSave}>Save</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default HomePage;
