import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Spinner } from "react-bootstrap";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { BarChart2 } from "react-feather";

const AdminAnalytics=()=>{

    const[summary,setSummary] =useState({});
    const[daily,setDaily]=useState([]);
    const[events,setEvents]=useState([]);
    const[loading,setLoading]=useState(true);

    const BASE_URL="http://localhost:4004/api/analytics"

    useEffect(()=>{
      loadData();
    },[]);

    const token=localStorage.getItem("token");
    const config={
        headers: {Authorization: `Bearer ${token}`},
    }

    const loadData=async()=>{
        setLoading(true);
        try{
            const[summaryRes,dailyRes,eventsRes]=await Promise.all(
                [
                    axios.get(`${BASE_URL}/summary`,config),
                    axios.get(`${BASE_URL}/daily`,config),
                    axios.get(`${BASE_URL}/events`,config),
                    
                ],
            
            )
            setSummary(summaryRes.data);
         //   console.log(summaryRes.data)
            setDaily(dailyRes.data);
         //   console.log(dailyRes.data)
            setEvents(eventsRes.data);
           // console.log(eventsRes.data)
            console
        }catch(error){
            console.error("error fetching details ",error);
        }finally{
            setLoading(false);
        }
    }
    if(loading){
        return(
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p>Loading analytics...</p>
      </div>
        );
    }



    return (
           <div className="container mt-4">
      <div className="d-flex align-items-center mb-4">
        <BarChart2 size={28} className="me-2 text-primary" />
        <h3 className="fw-bold mb-0">Analytics Dashboard</h3>
      </div>

            <div className="row mb-4">
        <div className="col-md-6">
          <Card className="text-center shadow-sm p-3">
            <h5>Total Events</h5>
            <h2 className="text-success">{summary.totalCreated||0}</h2>
          </Card>
        </div>
        <div className="col-md-6">
          <Card className="text-center shadow-sm p-3">
            <h5>Patients Created</h5>
            <h2 className="text-primary">{summary.totalCreated || 0}</h2>
          </Card>
        </div>
      </div>
  
        <Card className="shadow-sm p-4 mb-4">
        <h5 className="mb-3">Daily Patient Events</h5>
        {daily.length>0?(
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={daily}>
              <Line type="monotone" dataKey="total" stroke="#007bff" />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        ):  (
          <p className="text-muted">No daily data available</p>
        )}
        </Card>
              <Card className="shadow-sm p-4 mb-4">
        <h5>All Patient Events</h5>
        <div className="table-responsive">
          <table className="table table-striped table-hover">
           <thead>
            <tr>
                <th>Patient Id</th>
                <th>Patient Name</th>
                <th>Patient Email</th>
                <th>Event Type</th>
                <th>TimeStamp</th>
            </tr>
            </thead> 
            <tbody>
                {events.length>0?(
                   events.map((e)=>(
                    <tr key={e.id}>
                        <td>{e.patientId}</td>
                        <td>{e.patientName}</td>
                        <td>{e.patientEmail}</td>
                        <td>{e.eventType}</td>
                        <td>{new Date(e.timeStamp).toLocaleString()}</td>
                    </tr>
                   ))
                ):(
                <tr>
                  <td colSpan="5" className="text-center text-muted">
                    No events available
                  </td>
                </tr>
              )}
            
            </tbody>
            </table>
            </div>
            </Card>
              <div className="text-center mb-5">
        <Button variant="outline-primary" onClick={loadData}>
          Refresh Data
        </Button>
      </div>
    </div>
    );
}

export default AdminAnalytics;