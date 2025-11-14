import { Link } from "react-router-dom";
import "../css/home.css"; 

const Home = () => {
  return (
    <div className="home-container d-flex align-items-center justify-content-center vh-100">
      <div className="card shadow-lg text-center p-5 border-0 rounded-4 home-card">
        <h1 className="mb-3 text-gradient">🏥 Patient Management System</h1>
        <p className="text-muted mb-4 fs-5">
          Manage patient records, appointments, and medical data effortlessly.
        </p>

        <div className="d-flex justify-content-center gap-4 mt-4">
          <Link to="/login" className="btn btn-login px-4 py-2">
            Login
          </Link>
          <Link to="/signup" className="btn btn-signup px-4 py-2">
            Sign Up
          </Link>
        </div>

        <div className="mt-4">
          <small className="text-secondary">
            Built with ❤️ using Spring Boot & React
          </small>
        </div>
      </div>
    </div>
  );
};

export default Home;
