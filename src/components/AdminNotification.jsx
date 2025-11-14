import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Spinner, Table, Badge } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

const AdminNotification=()=>{

    const[notifications,setNotifications]=useState([]);
    const[loading,setLoading]=useState(true);

    const BASE_URL="http://localhost:4004/api/notification";

    useEffect(()=>{
       fetchNotifications();
    },[])

    const token=localStorage.getItem("token");

    const fetchNotifications=async ()=>{
        setLoading(true);
        
        try{
            const response=await axios.get(`${BASE_URL}/all`,{
                headers:{
                    Authorization:`Bearer ${token}`,
                }
            })
            setNotifications(response.data);
        }catch(error){
            console.error("Failed to fetch notifications ",error);
        }finally{
            setLoading(false);
        }
    };

    const markAsRead=async (id)=>{
        try{
            await axios.put(`${BASE_URL}/${id}/read`,null,{
                headers:{
                    Authorization:`Bearer ${token}`,
                },
            });
            setNotifications((prev)=>
                prev.map((n)=>(n.id===id ? {...n,readStatus:true}:n))
            );
        }catch(error){
            console.log("Error making as read ",error);
        }
    }

    
  if (loading)
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Loading notifications...</p>
      </div>
    );


const unreadCount=notifications.filter((n)=>!n.readStatus).length;
return(
        <div className="container mt-4">
      <div className="d-flex align-items-center mb-4">
        <i className="bi bi-bell-fill text-primary fs-4 me-2"></i>
        <h3 className="fw-bold mb-0">
         Admin Notifications{" "}
         {unreadCount>0&&( 
           <Badge bg="danger" pill>
              {unreadCount}
            </Badge>
         )}
         </h3>
         </div>
           <Card className="shadow-sm p-3 mb-4">
        <h5 className="mb-3">
          <i className="bi bi-envelope-paper me-2 text-secondary"></i>
          Recent Notifications
        </h5>
        {notifications.length>0?(
     <Table hover responsive className="align-middle">
      <thead className="table-light">
        <tr>
            <th>Id</th>
            <th>Patient Id</th>
            <th>Message</th>
            <th>Type</th>
            <th>Email</th>
            <th>Created At</th>
            <th>Read Status</th>
        </tr>
        </thead>
         <tbody>
        {notifications.map((n)=>(
          <tr key={n.id} className={!n.readStatus ? "table-warning" : ""}>
            <td>{n.id}</td>
            <td>{n.userId}</td>
            <td>{n.message}</td>
            <td><Badge bg="info">{n.type}</Badge></td>
            <td>{n.email?n.email:"-"}</td>
            <td> {n.createdAt
                      ? new Date(n.createdAt).toLocaleString()
                      : "—"}
                  </td>
            <td>
                {n.readStatus?(
                       <span className="text-success fw-semibold">
                        <i className="bi bi-check-circle-fill me-1"></i> Read
                      </span>
                ):(<span className="text-danger fw-semibold">
                        <i className="bi bi-envelope-fill me-1"></i> Unread
                      </span>
                    )
                    }
            </td>
            <td>
                {!n.readStatus&&(
                     <Button
                      size="sm"
                    variant="outline-success"
                    onClick={()=>markAsRead(n.id)}
                    >
                        <i className="bi bi-check2-circle me-1"></i> Mark Read
                    </Button>
                )}
            </td>
          </tr>
        ))}
        </tbody>
       </Table>
        ):(
          <div className="text-center text-muted py-4">
            <i className="bi bi-inbox fs-2 d-block mb-2"></i>
            No notifications available
          </div>
        )
        }
        </Card>
        </div>

)
    
}

export default AdminNotification;