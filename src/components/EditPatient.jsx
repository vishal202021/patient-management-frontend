import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditPatient = () => {
  const { email } = useParams(); 
  const navigate = useNavigate();

  const [patient, setPatient] = useState({
    name: "",
    email: "",
    address: "",
    dateOfBirth: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:4004/api/patients/email/${email}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPatient(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching patient:", err);
        setError("Unable to fetch patient details.");
        setLoading(false);
      }
    };

    fetchPatient();
  }, [email]);

  const handleChange = (e) => {
    setPatient({
      ...patient,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:4004/api/patients/${patient.id}`, patient, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Patient updated successfully!");
      navigate("/admin_dashboard"); 
    } catch (err) {
      console.error("Error updating patient:", err);
      setError("Failed to update patient.");
    }
  };

  if (loading) return <p className="text-center mt-5">Loading patient...</p>;

  return (
    <div className="container mt-5 p-4 shadow rounded" style={{ maxWidth: "600px" }}>
      <h3 className="text-center mb-4">Edit Patient</h3>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            value={patient.name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            value={patient.email}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Address</label>
          <textarea
            type="text"
            name="address"
            value={patient.address}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={patient.dateOfBirth}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-success">
            Update
          </button>
          <button type="button" className="btn btn-secondary" onClick={() =>  navigate("/admin_dashboard")}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPatient;
