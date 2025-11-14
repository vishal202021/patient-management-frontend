import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import "../css/PatientDashboard.css"; 

const PatientDashboard = () => {
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    dateOfBirth: "",
  });

  const token = localStorage.getItem("token");
  let email = null;
  if (token) {
    try {
      const decode = jwtDecode(token);
      email = decode.email;
    } catch (err) {
      console.error("Invalid or expired token:", err);
    }
  }

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4004/api/patients/email/${email}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setPatient(response.data);
        setForm(response.data);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setError("You are not yet registered as a patient.");
        } else {
          setError("Failed to fetch patient data.");
        }
      } finally {
        setLoading(false);
      }
    };

    if (token && email) fetchPatientData();
  }, [token, email]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:4004/api/patients/${patient.id}`,
        form,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setPatient(form);
      setEditing(false);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setPatient(null);
    navigate("/");
  };

  if (loading)
    return (
      <div className="loading-screen">
        <div className="spinner-border text-primary mb-3" role="status"></div>
        <p>Loading your profile...</p>
      </div>
    );

  if (error)
    return (
      <div className="error-screen">
        <p className="text-danger mb-3">{error}</p>
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>
    );

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>👨‍⚕️ Patient Dashboard</h2>
        <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="patient-card card">
        <div className="card-body">
          <h5 className="section-title">Personal Information</h5>

          <div className="form-group mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name || ""}
              onChange={handleChange}
              className="form-control"
              disabled={!editing}
            />
          </div>

          <div className="form-group mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={form.email || ""}
              className="form-control"
              disabled
            />
          </div>

          <div className="form-group mb-3">
            <label className="form-label">Address</label>
            <textarea
              name="address"
              value={form.address || ""}
              onChange={handleChange}
              className="form-control"
              disabled={!editing}
              rows="3"
            />
          </div>

          <div className="form-group mb-3">
            <label className="form-label">Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={form.dateOfBirth || ""}
              onChange={handleChange}
              className="form-control"
              disabled={!editing}
            />
          </div>

          <div className="button-group d-flex justify-content-end">
            {!editing ? (
              <button className="btn btn-primary" onClick={() => setEditing(true)}>
                ✏️ Edit Profile
              </button>
            ) : (
              <>
                <button className="btn btn-success me-2" onClick={handleUpdate}>
                  💾 Save
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setForm(patient);
                    setEditing(false);
                  }}
                >
                  ❌ Cancel
                </button>
              </>
            )}
               {patient && (
              <button
                className="btn btn-success appointment"
                onClick={() => navigate(`/book-appointment/${patient.id}`)}
              >
                📅 Book Appointment
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
