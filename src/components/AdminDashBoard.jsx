import React, { useState } from "react";
import "../css/AdminDashboard.css";
import PatientTable from "./PatientTable";
import PatientForm from "./PatientForm";
import Billing from "./Billing";
import { IoIosLogOut } from "react-icons/io";
import { FaChartBar, FaBell, FaUserInjured, FaUserPlus, FaFileInvoiceDollar, FaUserMd } from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import AdminDocs from "./AdminDocs";
import {HiOutlineDocumentText} from "react-icons/hi2";
import AdminAnalytics from "./AdminAnalytics";
import AdminNotification from "./AdminNotification";
import AdminDoctors from "./AdminDoctors";
import AdminAi from "./AdminAi";


const AdminDashboard = () => {
  const navigate=useNavigate();
  const [activeTab, setActiveTab] = useState("view");
 
  const handelLogout=()=>{
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <div className="admin-dashboard">
  
      <header className="dashboard-header">
        <h1>Admin Dashboard</h1>
      </header>

  
    <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">

       
        <button
          onClick={() => setActiveTab("view")}
          className={`btn ${activeTab === "view" ? "btn-info text-white" : "btn-outline-info"}`}
        >
          <FaUserInjured className="me-2" /> View Patients
        </button>

      
        <button
          onClick={() => setActiveTab("form")}
          className={`btn ${activeTab === "form" ? "btn-success text-white" : "btn-outline-success"}`}
        >
          <FaUserPlus className="me-2" /> Add Patient
        </button>

   
        <button
          onClick={() => setActiveTab("billing")}
          className={`btn ${activeTab === "billing" ? "btn-warning text-dark" : "btn-outline-warning"}`}
        >
          <FaFileInvoiceDollar className="me-2" /> Billing
        </button>

   
        <button
          onClick={() => setActiveTab("admin")}
          className={`btn ${activeTab === "admin" ? "btn-secondary text-white" : "btn-outline-secondary"}`}
        >
          <HiOutlineDocumentText className="me-2" /> Admin Docs
        </button>

      
        <button
          onClick={() => setActiveTab("analytics")}
          className={`btn ${activeTab === "analytics" ? "btn-primary text-white" : "btn-outline-primary"}`}
        >
          <FaChartBar className="me-2" /> Analytics
        </button>

     
        <button
          onClick={() => setActiveTab("notification")}
          className={`btn ${activeTab === "notification" ? "btn-danger text-white" : "btn-outline-danger"}`}
        >
          <FaBell className="me-2" /> Notifications
        </button>

        
        <button
          onClick={() => setActiveTab("doctors")}
          className={`btn ${activeTab === "doctors" ? "btn-dark text-white" : "btn-outline-dark"}`}
        >
          <FaUserMd className="me-2" /> Admin Doctors
        </button>

         <button
          onClick={() => setActiveTab("ai")}
          className={`btn ${activeTab === "ai" ? "btn-dark text-white" : "btn-outline-dark"}`}
        >
          <FaUserMd className="me-2" /> Admin AI
        </button>

        
        <button onClick={handelLogout} className="btn btn-light text-dark">
          <IoIosLogOut className="me-2" /> Logout
        </button>
      </div>


      
      <div className="dashboard-content">
        {activeTab === "view" ? (
          <PatientTable />
        ) : activeTab === "form" ? (
          <PatientForm />
        ) : activeTab === "billing" ? (
          <Billing />
        ) : activeTab==="admin"? (
           <AdminDocs/>
        ):activeTab==="analytics"?(
          <AdminAnalytics/>
        ):activeTab==="notification"?(
          <AdminNotification/>
        ):activeTab==="doctors"?(
          <AdminDoctors/>
        ):activeTab==="ai"?(
           <AdminAi/>
        ):null}
      </div>
    </div>
  );
};

export default AdminDashboard;
