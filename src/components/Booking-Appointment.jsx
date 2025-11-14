import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Booking_Appointment=()=>{

    const{patientId}=useParams();
    const navigate=useNavigate();

    const[doctors,setDoctors]=useState([]);
    const[selectedDoctorId,setSelectedDoctorId]=useState("");
    const[appointmentTime,setAppointmentTime]=useState("");
    const[message,setMessage]=useState("");

    const token=localStorage.getItem("token");

    useEffect(()=>{
         const fetchDoctors=async()=>{
            try{
            const response=await axios.get("http://localhost:4004/api/doctor",{
                   headers:{Authorization: `Bearer ${token}`},
            });
            setDoctors(response.data);
         }catch(error){
               console.error("Failed to fetch doctors:", err);
         }
        }
         fetchDoctors();
    },[token])

    const handleBook=async()=>{
        if(!selectedDoctorId||!appointmentTime){
             setMessage("Please select doctor and appointment time.");
              return;
        }
        try{
            const body={
                patientId:patientId.toString(),
                doctorId:selectedDoctorId.toString(),
                appointmentTime:appointmentTime,
            };
        
            await axios.post("http://localhost:4004/api/appointment",body,{
                headers:{Authorization: `Bearer ${token}`},
            });
            setMessage("Appointment scheduled successfully!");
            setTimeout(()=>navigate("/patient_dashboard"),1500);
        }catch(err){
         console.error(err);
         setMessage("Failed to schedule appointment.");
        }
    };

    return(
         <div className="container mt-5">
      <h3 className="mb-4 text-center">📅 Book an Appointment</h3>
      {message&&(
        <div
        className={`alert ${
            message.startsWith("Appointment")
            ? "alert-success":message.startsWith("Please")
            ?"alert-warning":"alert-danger"
        }`} >{message}</div> 
        )}
         <div className="card shadow-sm p-4">
        <div className="form-group mb-3">
          <label>Select Doctor</label>
          <select
           className="form-select"
           value={selectedDoctorId}
           onChange={(e)=>setSelectedDoctorId(e.target.value)}
           >
         <option value="">-- Choose Doctor --</option>
         {doctors.map((docs)=>(
            <option key={docs.id} value={docs.id}>
                Dr. {docs.name} ({docs.specialization})
            </option>
         ))}
           </select>
           </div>
          <div className="form-group mb-3">
          <label>Appointment Date & Time</label>
          <input
           type="datetime-local"
            className="form-control"
            value={appointmentTime}
            onChange={(e)=>setAppointmentTime(e.target.value)}
            />
            </div>
            
        <div className="d-flex justify-content-between">
          <button className="btn btn-secondary" onClick={() => navigate(-1)}>
            ⬅️ Back
          </button>
        <button className="btn btn-success" onClick={handleBook}>
            📅 Schedule Appointment
          </button>
        </div>
        </div>
        </div>
    )
}

export default Booking_Appointment;