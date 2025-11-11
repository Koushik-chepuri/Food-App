import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { useAuth } from "../context/AuthContext";
import "../styling/Login.css";
import Navbar from "../components/Navbar";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/login", { email, password });
      const { token, user } = res.data;
      login(user, token);
      navigate("/restaurants");
    } catch (err) {
      alert("Incorrect credentials. Try again.");
    }
  };

  return (
    <>
      {/* <Navbar /> */}

      <div className="auth-page">
        <div className="auth-card">
          <h2 className="auth-title">Welcome back</h2>
          <p className="auth-sub">Login to continue your feast.</p>

          <form onSubmit={handleSubmit} className="auth-form">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="auth-input"
              required
            />

            <div className="password-field">
            <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="auth-input"
                required
            />

            <span
                className="toggle-eye"
                onClick={() => setShowPassword(!showPassword)}
            >
                {showPassword ? (
                // Eye Off
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-5.52 0-10-4.48-10-7 0-1.02.38-2.02 1.06-2.94"/>
                    <path d="M1 1l22 22"/>
                    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/>
                    <path d="M12 5c5.52 0 10 4.48 10 7a5.4 5.4 0 0 1-.47 2"/>
                </svg>
                ) : (
                // Eye
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z"/>
                    <circle cx="12" cy="12" r="3"/>
                </svg>
                )}
            </span>
            </div>

            <button className="auth-btn">Login</button>
          </form>

          <p className="auth-alt">
            New here? <a href="/signup">Create an account</a>
          </p>
        </div>
      </div>
    </>
  );
}
