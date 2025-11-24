# 🏥 Patient Management System — Frontend (React)

This is the **React Frontend** for the Patient Management System built using:
- React (Vite)
- Bootstrap (pure)
- Axios
- React Router DOM
- JWT Authentication

The frontend provides **role-based dashboards** for:
- **Admin**
- **Patient**

Fully integrated with backend microservices via API Gateway (`http://localhost:4004`).

---

## 🚀 Tech Stack

- **React 18**
- **Vite**
- **Bootstrap 5**
- **React Router DOM**
- **Axios**
- **LocalStorage JWT Auth**

---

## 🗂️ Project Structure (Actual)
src/
├── components/
│ ├── AdminAnalytics.jsx
│ ├── AdminDashBoard.jsx
│ ├── AdminDocs.jsx
│ ├── AdminDoctors.jsx
│ ├── AdminNotification.jsx
│ ├── Billing.jsx
│ ├── Booking-Appointment.jsx
│ ├── EditPatient.jsx
│ ├── Home.jsx
│ ├── Login.jsx
│ ├── PatientDashBoard.jsx
│ ├── PatientForm.jsx
│ ├── PatientTable.jsx
│ └── SignUp.jsx
│
├── css/
│ ├── AdminDashboard.css
│ ├── App.css
│ ├── PatientDashboard.css
│ ├── home.css
│ └── login.css
│
├── App.jsx
├── main.jsx


---

## 👨‍⚕️ Admin Dashboard Features (Based on Real Components)

### ✔ `AdminDashBoard.jsx`
Main admin landing dashboard.

### ✔ `PatientTable.jsx`  
View all patients.

### ✔ `PatientForm.jsx` / `EditPatient.jsx`  
Add new patient  
Edit patient information

### ✔ `AdminDoctors.jsx`  
Manage doctor list (CRUD).

### ✔ `Billing.jsx`  
Billing data (via Billing Service).

### ✔ `AdminNotification.jsx`  
View all system notifications  
(mark as read / unread)

### ✔ `AdminAnalytics.jsx`  
Analytics dashboard connected to Kafka → Analytics Service

---

## 👤 Patient Dashboard Features (Based on Real Components)

### ✔ `PatientDashBoard.jsx`
Main patient dashboard.

### ✔ Profile (View and update)

### ✔ Book Appointment  
Uses `Booking-Appointment.jsx` form.

---

## 🔐 Authentication Screens

### ✔ `Login.jsx`  
Login using JWT token from Auth Service.

### ✔ `SignUp.jsx`  
Register a patient.

---

## 🌐 Backend Communication

All API calls go through:

http://localhost:4004 (API Gateway)

Examples:
- `/auth/login`
- `/patient/all`
- `/appointments/book`
- `/analytics/all`
- `/notification/all`

All axios calls are correctly pointing to API Gateway.
VITE_API_BASE_URL=http://localhost:4004


---

## ▶️ Run the project

Install dependencies
npm install

Run in development mode
npm run dev

Frontend will start at:
http://localhost:5173

📦 Deployment Options

Netlify

Vercel

GitHub Pages

Docker + Nginx (optional)

⭐ If this project helped you, please star the repo!

Backend Repo (microservices):
👉 https://github.com/vishal202021/patient-management-system-microservices

Frontend Repo:
👉 https://github.com/vishal202021/patient-management-frontend



 



