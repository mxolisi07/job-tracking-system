import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Application.css";
import {
  FaBriefcase, FaBars, FaSearch, FaTrash, FaEye, FaEdit,
  FaCalendar, FaUserTie, FaMapMarkerAlt, FaPhone, FaMoneyBill
} from "react-icons/fa";

interface Application {
  id: number;
  company: string;
  role: string;
  dateApplied: string;
  status: string;
  duties: string;
  location: string;
  employmentType?: string;
  contact?: string;
  salary?: string;
}

function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
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

  const filteredApps = applications.filter((app) =>
    app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    <div className="applications-container">

      <header className="applications-header">
        <div className="logo4">
          <FaBriefcase className="logo-icon4"/> <span>Job Tracker</span>
        </div>
        <div className="hamburger4" onClick={() => setMenuOpen(!menuOpen)}>
          <FaBars />
        </div>
        <nav className={`nav-links4 ${menuOpen ? "active" : ""}`}>
          <button onClick={() => navigate("/home")}>Home</button>
          <button onClick={() => navigate("/application")}>Applications</button>
          <button onClick={() => navigate("/stats")}>Statistics</button>
          <FaSearch className="search-icon4" onClick={() => setSearchOpen(!searchOpen)} />
        </nav>
      </header>

      {searchOpen && (
        <div className="search-overlay4">
          <input
            type="text"
            placeholder="Search by company or role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      <div className="applications-header-row">
        <h2>Applications</h2>
        <button className="add-job-btn4" onClick={() => navigate("/addjob")}>
          Add a Job
        </button>
      </div>

      <div className="applications-list">
        {filteredApps.map((app) => (
          <div key={app.id} className={`application-card ${app.status.toLowerCase()}`}>
            <h3><FaBriefcase /> {app.company}</h3>
            <p><FaCalendar /> {app.dateApplied}</p>
            <p className="status">Status: {app.status}</p>
            <p><FaUserTie /> {app.role}</p>
            <p><FaMapMarkerAlt /> {app.location}</p>
            <p>{app.duties}</p>
            <div className="card-actions">
              <FaEye title="View" onClick={() => setViewingApp(app)} />
              <FaEdit title="Edit" onClick={() => setEditingApp(app)} />
              <FaTrash title="Delete" onClick={() => handleDelete(app.id)} />
            </div>
          </div>
        ))}
      </div>

      
      {editingApp && (
        <div className="modal-overlay4">
          <div className="modal4">
            <h2>Edit Application</h2>

            <label>Company</label>
            <input
              type="text"
              value={editingApp.company}
              onChange={(e) => setEditingApp({ ...editingApp, company: e.target.value })}
            />
            {errors.company && <span className="error4">{errors.company}</span>}

            <label>Role</label>
            <input
              type="text"
              value={editingApp.role}
              onChange={(e) => setEditingApp({ ...editingApp, role: e.target.value })}
            />
            {errors.role && <span className="error4">{errors.role}</span>}

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
            {errors.status && <span className="error4">{errors.status}</span>}

            <label>Duties</label>
            <textarea
              value={editingApp.duties}
              onChange={(e) => setEditingApp({ ...editingApp, duties: e.target.value })}
            />
            {errors.duties && <span className="error4">{errors.duties}</span>}

            <div className="modal-actions4">
              <button className="cancel-btn4" onClick={() => setEditingApp(null)}>Cancel</button>
              <button className="save-btn4" onClick={handleEditSave}>Save</button>
            </div>
          </div>
        </div>
      )}

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

    </div>
  );
}

export default ApplicationsPage;
