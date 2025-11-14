import React, { useState } from "react";
import axios from "axios";

const PatientForm = () => {
  const [form, setForm] = useState({ name: "", email: "", address: "",dateOfBirth:"",registeredDate:"" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     
      const token=localStorage.getItem("token");

      await axios.post("http://localhost:4004/api/patients", form,{
        headers:{
            Authorization:`Bearer ${token}`,
        }
      });
      alert("✅ Patient added successfully!");
      setForm({ name: "", email: "", address: "",dateOfBirth:"",registeredDate:"" });
    } catch (error) {
      if(error.response){
        if(error.response.status===400){
            alert(`⚠️ ${error.response.data.message}`);
        }else{
            alert(`⚠️ Something went wrong: ${error.response.statusText}`);
        }
      }else{
              alert("⚠️ Unable to connect to server");

      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="patient-form">
      <h4 className="mb-3 text-center">Add New Patient</h4>
      <div className="mb-3">
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      <div className="mb-3">
        <label>Email</label>
        <input
          type="text"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      <div className="mb-3">
        <label>Address</label>
        <textarea
          name="address"
          value={form.address}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

     <div className="mb-3">
  <label>Date of Birth</label>
  <input
    type="date"
    name="dateOfBirth"     
    value={form.dateOfBirth || ""} 
    onChange={handleChange}
    className="form-control"
    required
  />
</div>


       <div className="mb-3">
    <label>Register Date</label>
    <input
    type="date"
    name="registeredDate"     
    value={form.registeredDate || ""} 
    onChange={handleChange}
    className="form-control"
    required
  />
</div>


      <button type="submit" className="btn btn-primary w-100">
        Save
      </button>
    </form>
  );
};

export default PatientForm;
