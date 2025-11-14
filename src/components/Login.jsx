import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Login.css";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

 
  useEffect(() => {
    
    setEmail("");
    setPassword("");
    setError("");


    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decode = jwtDecode(token);
        const userRole = decode.role;

        if (userRole === "ADMIN") {
          navigate("/admin_dashboard");
        } else if (userRole === "PATIENT") {
          navigate("/patient_dashboard");
        }
      } catch (err) {
        console.error("Invalid token, clearing localStorage");
        localStorage.removeItem("token");
      }
    }
  }, [navigate]); 

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4004/auth/login", {
        email,
        password,
      });

      const token = response.data.token;
      localStorage.setItem("token", token);

      const decode = jwtDecode(token);
      const userRole = decode.role;

      
      setEmail("");
      setPassword("");
      setError("");

  
      if (userRole === "ADMIN") {
        navigate("/admin_dashboard");
      } else if (userRole === "PATIENT") {
        navigate("/patient_dashboard");
      }
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center vh-100">
      <div className="login-card p-5 shadow-lg">
        <h2 className="text-center mb-4 text-light">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group mb-3">
            <label className="text-light">Email address</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group mb-4">
            <label className="text-light">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>

          {error && <p className="text-danger text-center">{error}</p>}

          <button type="submit" className="btn btn-success w-100 mb-3">
            Login
          </button>

          <p className="text-center text-light">
            Don’t have an account?{" "}
            <span
              className="text-info signup-link"
              onClick={() => navigate("/signup")}
              style={{ cursor: "pointer" }}
            >
              Sign up here
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
