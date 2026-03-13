import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {

  const { user, setUser, cart } = useContext(AppContext);
  const API_URL = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();

  const handleLogin = async () => {

    const url = API_URL + "/auth/signin";

    const response = await axios.post(url, user);

    setUser(response.data);

    if (cart.length > 0) navigate("/cart");
    else navigate("/");
  };

  return (
    <div className="login-container">

      <div className="login-card">

        <h2 className="login-title">Welcome Back ☕</h2>

        <p className="login-subtitle">
          Sign in to continue to Cup & Co.
        </p>

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
          className="login-btn"
          onClick={handleLogin}
        >
          Login
        </button>

        <p className="register-text">
          New here? <Link to="/register">Create an account</Link>
        </p>

      </div>

    </div>
  );
}

export default Login;