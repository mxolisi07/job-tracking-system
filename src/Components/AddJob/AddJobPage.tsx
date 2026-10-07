import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddJob.css";
import { FaBriefcase, FaBars, FaSearch } from "react-icons/fa";

function AddJobPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    company: "",
    employmentType: "",
    contact: "",
    salary: "",
    dateApplied: "",
    role: "",
    location: "",
    duties: "",
    status: ""
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.company.trim()) newErrors.company = "Company name is required.";
    if (!formData.employmentType || formData.employmentType.includes("Choose"))
      newErrors.employmentType = "Select employment type.";
    if (!formData.contact.trim()) newErrors.contact = "Contact details required.";
    if (!formData.salary || formData.salary.includes("Choose"))
      newErrors.salary = "Select salary range.";
    if (!formData.dateApplied) newErrors.dateApplied = "Date of application required.";
    if (!formData.role || formData.role.includes("Choose"))
      newErrors.role = "Select a role.";
    if (!formData.location.trim()) newErrors.location = "Location required.";
    if (!formData.duties.trim()) newErrors.duties = "Job duties required.";
    if (!formData.status || formData.status.includes("Choose"))
      newErrors.status = "Select status.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      alert("Please fix the errors before submitting.");
      return;
    }

    const response = await fetch("http://localhost:5000/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      alert("Job added successfully!");
      navigate("/home");
    } else {
      alert("Error adding job.");
    }
  };

  return (
    <div className="addjob-container">
      {/* Header */}
      <header className="addjob-header">
        <div className="logo">
          <FaBriefcase /> <span>Job Tracker</span>
        </div>
      </header>

      {/* Form */}
      <h2>Add a New Job</h2>
      <form className="job-form">
        <label>Company Name</label>
        <input type="text" name="company" placeholder="e.g. Google" onChange={handleChange} />
        {errors.company && <span className="error">{errors.company}</span>}

        <label>Employment Type</label>
        <select name="employmentType" onChange={handleChange}>
          <option>--- Choose an option ---</option>
          <option>Full-time</option>
          <option>Part-time</option>
          <option>Contract</option>
          <option>Internship</option>
        </select>
        {errors.employmentType && <span className="error">{errors.employmentType}</span>}

        <label>Company Contact Details</label>
        <input type="text" name="contact" onChange={handleChange} />
        {errors.contact && <span className="error">{errors.contact}</span>}

        <label>Salary Range</label>
        <select name="salary" onChange={handleChange}>
          <option>--- Choose an option ---</option>
          <option>R10,000 - R20,000</option>
          <option>R20,000 - R40,000</option>
          <option>R40,000+</option>
        </select>
        {errors.salary && <span className="error">{errors.salary}</span>}

        <label>Date of Application</label>
        <input type="date" name="dateApplied" onChange={handleChange} />
        {errors.dateApplied && <span className="error">{errors.dateApplied}</span>}

        <label>Role</label>
        <select name="role" onChange={handleChange}>
          <option>--- Choose an option ---</option>
          <option>Software Developer</option>
          <option>Data Analyst</option>
          <option>Project Manager</option>
        </select>
        {errors.role && <span className="error">{errors.role}</span>}

        <label>Company Location</label>
        <input type="text" name="location" onChange={handleChange} />
        {errors.location && <span className="error">{errors.location}</span>}

        <label>Job Duties</label>
        <textarea name="duties" placeholder="Add a short description" onChange={handleChange}></textarea>
        {errors.duties && <span className="error">{errors.duties}</span>}

        <label>Status</label>
        <select name="status" onChange={handleChange}>
          <option>--- Choose an option ---</option>
          <option>Applied</option>
          <option>Interviewed</option>
          <option>Rejected</option>
          <option>Successful</option>
        </select>
        {errors.status && <span className="error">{errors.status}</span>}

        <div className="form-buttons">
          <button type="button" className="cancel-btn" onClick={() => navigate("/home")}>
            Cancel
          </button>
          <button type="button" className="add-btn" onClick={handleSubmit}>
            Add Job
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddJobPage;
