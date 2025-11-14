import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const navigate=useNavigate();
    const [signUp, setSignUp] = useState({
        email: "",
        password: "",
        role: "PATIENT"
    });

    const handleChange = (e) => {
        setSignUp({ ...signUp, [e.target.name]: e.target.value });
    }

    const handelSignUp = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:4004/auth/register", signUp);
            alert("✅ Patient register successfully!");
            
            setSignUp({ email: "", password: "", role: "" })
        } catch (error) {
            if (error.response) {
                if (error.response.status === 400) {
                    alert(`⚠️ ${error.response.data.error}`);
                //    console.log(error.response.data);
                } else {
                    alert(`⚠️ Something went wrong: ${error.response.statusText}`);
                }
            } else {
                alert("⚠️ Unable to connect to server");

            }
        }
    };

    return (
        <form onSubmit={handelSignUp} className="patient-form">
            <h4 className="mb-3 text-center">Register</h4>
            <div className="mb-3">
                <label>Email</label>
                <input
                    type="text"
                    name="email"
                    value={signUp.email}
                    onChange={handleChange}
                    className="form-control"
                    required
                />
            </div>

            <div className="mb-3">
                <label>Password</label>
                <input
                    type="text"
                    name="password"
                    value={signUp.password}
                    onChange={handleChange}
                    className="form-control"
                    required
                    pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                    title="Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character"
                />
            </div>

            <div className="mb-3">
                <label>Select Role</label>
                <input
                    name="role"
                    value="PATIENT"
                    onChange={handleChange}
                    className="form-control"
                    disabled   
                />
            </div>
            <button type="submit" className="btn btn-primary w-100"
            onClick={()=>navigate("/login")}
            >
                Sign Up
            </button>
        </form>
    )

}
export default SignUp;