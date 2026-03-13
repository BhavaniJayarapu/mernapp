import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";

function Register() {

  const [user, setUser] = useState({});
  const API_URL = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const url = API_URL + "/auth/signup";

    await axios.post(url, user);

    navigate("/login");
  };

  return (
    <div className="register-container">

      <div className="register-card">

        <h2 className="register-title">Join Cup & Co. ☕</h2>

        <p className="register-subtitle">
          Create an account to enjoy our coffee menu
        </p>

        <input
          type="text"
          placeholder="Name"
          onChange={(e) =>
            setUser({ ...user, name: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Email"
          onChange={(e) =>
            setUser({ ...user, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setUser({ ...user, password: e.target.value })
          }
        />

        <button
          className="register-btn"
          onClick={handleSubmit}
        >
          Create Account
        </button>

        <p className="login-link">
          Already a member? <Link to="/login">Login here</Link>
        </p>

      </div>

    </div>
  );
}

export default Register;