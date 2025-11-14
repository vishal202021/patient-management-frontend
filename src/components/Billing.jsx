import axios from "axios";
import { useEffect, useState } from "react"

const Billing=()=>{

    const[billing,setBilling]=useState([]);

    useEffect(()=>{
        fetchBilling();
    },[])

    const fetchBilling=async()=>{
        const token=localStorage.getItem("token");
        try{
            const response= await axios.get("http://localhost:4004/api/billing/billing",{
                headers:{
                    Authorization:`Bearer ${token}`,
                }
            }  
            );
             console.log(response.data);
            setBilling(response.data);

        }catch(error){
            console.error("Error Fetching: ",error);
        }
    };


    return (
     <div className="table-responsive patient-table">
      <h4 className="text-center mb-3">Billing List</h4>
      <table className="table table-bordered table-hover">
        <thead className="table-primary">
        <tr>
            <th>Id</th>
            <th>Account Id</th>
            <th>Patient Id</th>
            <th>Patient Name</th>
            <th>Patient Email</th>
            <th>Patient Balance</th>
            <th>Status</th>
            <th>Created At</th>
        </tr>
        </thead>
        <tbody>
         {billing.length > 0 ? (
            billing.map((b)=>(
                <tr key={b.id}>
                    <td>{b.id}</td>
                    <td>{b.accountId}</td>
                    <td>{b.patientId}</td>
                    <td>{b.patientName}</td>
                    <td>{b.patientEmail}</td>
                    <td>{b.patientBalance}</td>
                    <td>{b.status}</td>
                    <td>{b.createdAt}</td>
                   </tr>
            ))
         ):(
            <tr>
              <td colSpan="5" className="text-center">
                No patients found.
              </td>
            </tr>
          )
         }
         </tbody>
         </table>
         </div>
    )
}

export default Billing;