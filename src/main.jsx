import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import SignUp from './components/SignUp.jsx';
import AdminDashboard from './components/AdminDashBoard.jsx';
import PatientDashBoard from './components/PatientDashBoard.jsx';
import EditPatient from './components/EditPatient.jsx';
import Billing from './components/Billing.jsx';
import AdminDocs from './components/AdminDocs.jsx';
import AdminAnalytics from './components/AdminAnalytics.jsx';
import AdminNotification from './components/AdminNotification.jsx';
import Booking_Appointment from './components/Booking-Appointment.jsx';
import AdminDoctors from './components/AdminDoctors.jsx';
import AdminAi from './components/AdminAi.jsx';

  const router=createBrowserRouter([
    {
      path:"/",
      element:<App/>,
       children:[
        {
          path:"/",
          element:<Home/>
        },
        {
          path:"/login",
          element:<Login/>
        },
        {
          path:"/signup",
          element:<SignUp/>
        },
          {
             path: "/admin_dashboard",
             element: <AdminDashboard/>
         },
         {
            path:"/patient_dashboard",
            element:<PatientDashBoard/>
         },
         {
          path:"/edit_patient/:email",
          element:<EditPatient/>
         },
         {
          path:"/billing",
          element:<Billing/>
         },
         {
          path:"/admi_docs",
          element:<AdminDocs/>
         },
         {
          path:"/analytics",
          element:<AdminAnalytics/>
         },
         {
          path:"/notification",
          element:<AdminNotification/>
         },
         {
          path:"/book-appointment/:patientId",
          element:<Booking_Appointment/>
         },
         {
          path:"/admin_doctors",
          element:<AdminDoctors/>
         },
           {
          path:"/admin_ai",
          element:<AdminAi/>
         }
       ]
    }
  ])

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <RouterProvider router={router}/>
  </StrictMode>,
)



