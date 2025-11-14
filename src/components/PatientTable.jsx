import { useEffect, useState } from "react";
import { TiUserDelete } from "react-icons/ti";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const PatientTable = () => {
  const [patients, setPatients] = useState([]);
  const navigate=useNavigate();

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
    const token=localStorage.getItem("token");
    const decode=jwtDecode(token);
    console.log(decode);
      const res = await axios.get("http://localhost:4004/api/patients",{
        headers:{
            Authorization:`Bearer ${token}`,
        }
    });
      setPatients(res.data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  const deletePatient = async (id) => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      try {
         const token=localStorage.getItem("token");
        await axios.delete(` http://localhost:4004/api/patients/${id}`,{
            headers:{
                 Authorization:`Bearer ${token}`,
            }
        });
        setPatients(patients.filter((p) => p.id !== id));
      } catch (error) {
        console.error("Error deleting patient:", error);
      }
    }
  };
  const updatePatient = (email) => {
  navigate(`/edit_patient/${email}`);
};

  return (
    <div className="table-responsive patient-table">
      <h4 className="text-center mb-3">Patient List</h4>
      <table className="table table-bordered table-hover">
        <thead className="table-primary">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Gmail</th>
            <th>Address</th>
            <th>Date of Birth</th>
          </tr>
        </thead>
        <tbody>
          {patients.length > 0 ? (
            patients.map((p) => (
              <tr key={p.id}>
                 <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.email}</td>
                <td>{p.address}</td>
                <td>{p.dateOfBirth}</td>
                <td>
                  <button className="btn btn-sm btn-danger" onClick={() => deletePatient(p.id)}>
                    <TiUserDelete />
                  </button>
                </td>
                 <td>
                  <button className="btn btn-primary" onClick={() => updatePatient(p.email)}>
                  <FaEdit/>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No patients found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PatientTable;
