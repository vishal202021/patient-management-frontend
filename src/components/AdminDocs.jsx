import { useState } from "react";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
const AdminDocs=()=>{

    const [selectedService,setSelectedService]=useState("auth");

    const serviceUrls={
       auth:"http://localhost:4004/api-docs/auth",
       patients : "http://localhost:4004/api-docs/patients",
    };
    return(
          <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="fw-semibold">API Documentation</h3>
        <select  className="form-select w-auto"
        value={selectedService}
        onChange={(e)=>setSelectedService(e.target.value)}>
            <option value="auth">Auth Service</option>
            <option value="patients">Patient Service</option>
        </select>
      </div>
        <div
        className="bg-white rounded shadow-sm p-3"
        style={{ height: "80vh", overflow: "auto" }}
      >
        <SwaggerUI url={serviceUrls[selectedService]} />
      </div>
    </div>
    )
}

export default AdminDocs;