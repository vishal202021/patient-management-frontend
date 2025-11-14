import { useEffect, useState } from "react";
import axios from "axios";

const AdminDoctors=()=>{

    const[doctors,setDoctors]=useState([]);
    const[loading,setLoading]=useState(true);
    const[showdoctors,setShowDoctors]=useState(false);
    const[editDoctors,setEditDoctors]=useState(null);
    const[form,setForm]=useState({
       name: "",
       email: "",
       phone: "",
       specialization: "",
       availability: "",
       active: true,
    });
    const[message,setMessage]=useState("");
    const[searchDoctor,setSearchDoctor]=useState("");
     
    const token=localStorage.getItem("token");

    const fetchDoctors=async()=>{
        try{
            const respone=await axios.get("http://localhost:4004/api/doctor",{
                headers:{ Authorization: `Bearer ${token}`}
            });
            setDoctors(respone.data);
        }catch(error){
            console.error("failed to fetch doctors:", error);
        }finally{
            setLoading(false);
        }
    };


    useEffect(()=>{
        fetchDoctors();
    },[]);

     useEffect(()=>{
            if(message){
                const timer=setTimeout(()=>setMessage(""),2000);
                return ()=>clearTimeout(timer);
            }
        },[message]);  


    const handleSearch=async(e)=>{
        const search=e.target.value;
        setSearchDoctor(search);

        if(search.trim()===""){
            fetchDoctors();
            return;
        }

        try{
            const response=await axios.get(
                  `http://localhost:4004/api/doctor/search?query=${search}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
          setDoctors(response.data);
        }catch(error){
            console.error("failed to search:",error)
        }
    };

    const openAddDoctors=()=>{
        setEditDoctors(null);
        setForm({
            name: "",
            email: "",
            phone: "",
            specialization: "",
            availability: "",
            active: true,
        });
        setShowDoctors(true);
    }

    const openEditDoctors=(doctor)=>{
      setEditDoctors(doctor);
        setForm({
         name: doctor.name,
         email: doctor.email,
         phone: doctor.phone,
         specialization: doctor.specialization,
         availability: doctor.availability,
         active: doctor.active,
    });
      setShowDoctors(true);
    };

    const handleCloseDoctors=()=>{
        setShowDoctors(false);
       setEditDoctors(null);
    };

    const handleChange=(e)=>{
        const{name,value,type,checked}=e.target;
        setForm(
            {
                ...form,
                [name]:type==="checkbox"?checked:value,
            }
        );
    };

    const handleSaveDoctor=async()=>{
        try{
            if(editDoctors){
                await axios.put(
                      `http://localhost:4004/api/doctor/${editDoctors.id}`,
          form,
          { headers: { Authorization: `Bearer ${token}` } }
            );
            setMessage("✅ Doctor updated successfully!");
              fetchDoctors();
             handleCloseDoctors();
            }else{
                 await axios.post("http://localhost:4004/api/doctor", form, {
               headers: { Authorization: `Bearer ${token}` },
        });
            setMessage("✅ Doctor added successfully!");
             fetchDoctors();
             handleCloseDoctors();
      }
            }catch(error){
               console.error("Error saving doctor:", error);
               setMessage("❌ Failed to save doctor.");
            }
        };
    
        const handleDeleteDoctor=async(id)=>{
                 if (!window.confirm("Are you sure you want to delete this doctor?")) return;
                 try {
                 await axios.delete(`http://localhost:4004/api/doctor/${id}`, {
                 headers: { Authorization: `Bearer ${token}` },
      });
                 setMessage("🗑️ Doctor deleted successfully!");
                  fetchDoctors();
                } catch (err) {
                  console.error("Failed to delete doctor:", err);
                  setMessage("❌ Failed to delete doctor.");
    }
        };


          if (loading)
          return (
          <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="spinner-border text-primary" role="status"></div>
         </div>
             );

         
             
    return (
        <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>👨‍⚕️ Manage Doctors</h3>
        <button className="btn btn-success" onClick={openAddDoctors}>
          ➕ Add Doctor
        </button>
      </div>
         <div className="input-group mb-3">
        <span className="input-group-text bg-primary text-white">
          <i className="bi bi-search"></i>
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Search by name, email, or specialization..."
          value={searchDoctor}
          onChange={handleSearch}
        />
      </div>

          {message && (
        <div
          className={`alert ${
            message.startsWith("✅")
              ? "alert-success"
              : message.startsWith("❌")
              ? "alert-danger"
              : "alert-warning"
          }`}
        >
          {message}
        </div>
      )}

       {doctors.length === 0 ? (
        <p className="text-center text-muted">No doctors found.</p>
      ) : (
        <table className="table table-striped table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Specialization</th>
              <th>Availability</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
                {doctors.map((doctor, index) => (
              <tr key={doctor.id}>
                <td>{index + 1}</td>
                <td>{doctor.name}</td>
                <td>{doctor.email}</td>
                <td>{doctor.phone}</td>
                <td>{doctor.specialization}</td>
                <td>{doctor.availability}</td>
                <td>
                  <span
                    className={`badge ${
                      doctor.active ? "bg-success" : "bg-secondary"
                    }`}
                  >
                     {doctor.active ? "Active" : "Inactive"}
                  </span>
                    </td>
                <td>
                <div className="d-flex justify-content-center gap-2">
               <button
                className="btn btn-primary btn-sm "
                onClick={() => openEditDoctors(doctor)}
                >
                ✏️ Edit
                </button>

                <button
                className="btn btn-danger btn-sm "
                onClick={() => handleDeleteDoctor(doctor.id)}
                >
                🗑️ Delete
                </button>
            </div>
                  </td>
                  </tr>
                ))}
          </tbody>
          </table>
      )}

       {showdoctors && (
        <div
          className="modal fade show"
          tabIndex="-1"
          style={{ display: "block", background: "rgba(0,0,0,0.6)" }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editDoctors ? "Edit Doctor" : "Add Doctor"}
                </h5>
                  <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseDoctors}
                ></button>
                 </div>
              <div className="modal-body">
                <form className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      value={form.name}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="col-md-6">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={form.email}
                      onChange={handleChange}
                    />
                  </div>

                     <div className="col-md-6">
                    <label className="form-label">Phone</label>
                    <input
                      type="text"
                      name="phone"
                      className="form-control"
                      value={form.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Specialization</label>
                    <input
                      type="text"
                      name="specialization"
                      className="form-control"
                      value={form.specialization}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label">Availability</label>
                    <input
                      type="text"
                      name="availability"
                      className="form-control"
                      value={form.availability}
                      onChange={handleChange}
                      placeholder="e.g., Mon-Fri, 9:00 AM - 5:00 PM"
                    />
                  </div>

                  <div className="col-12 form-check mt-2">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="active"
                      name="active"
                      checked={form.active}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="active">
                      Active
                    </label>
                  </div>
                </form>
              </div>

               <div className="modal-footer">
                <button className="btn btn-secondary" onClick={handleCloseDoctors}>
                  ❌ Cancel
                </button>
                <button className="btn btn-success" onClick={handleSaveDoctor}>
                  {editDoctors ? "💾 Update" : "➕ Add"}
                </button>
              </div>
                </div>
          </div>
        </div>
      )}
    </div>
    );
}

export default AdminDoctors;