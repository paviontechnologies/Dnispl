import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [loginMode, setLoginMode] = useState("admin"); // 'admin' or 'hr'
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // HR OTP login states
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userRole", "admin");
        navigate("/admin/dashboard");
      } else {
        setMessage(data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      setMessage("Server Connection Error");
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email) return;
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/hr/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setOtpSent(true);
        setMessage("✅ OTP sent successfully. Please check your inbox!");
      } else {
        setMessage("❌ " + (data.message || "Failed to send OTP."));
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Connection Error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp) return;
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/hr/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userRole", "hr");
        navigate("/admin/jobs"); // Directly link HR to Jobs page on dashboard!
      } else {
        setMessage("❌ " + (data.message || "Invalid or expired OTP."));
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Verification Error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const role = localStorage.getItem("userRole");
      if (role === "hr") {
        navigate("/admin/jobs");
      } else {
        navigate("/admin/dashboard");
      }
    }
  }, [navigate]);

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>DNISPL Portal</h2>
        <p>Access administration tools & career updates</p>

        <div className="login-tabs">
          <button
            type="button"
            className={`tab-btn ${loginMode === "admin" ? "active" : ""}`}
            onClick={() => { setLoginMode("admin"); setMessage(""); }}
          >
            Admin Login
          </button>
          <button
            type="button"
            className={`tab-btn ${loginMode === "hr" ? "active" : ""}`}
            onClick={() => { setLoginMode("hr"); setMessage(""); }}
          >
            HR Login (OTP)
          </button>
        </div>

        {message && (
          <div className={`login-message ${message.includes("✅") ? "success" : "error"}`}>
            {message}
          </div>
        )}

        {loginMode === "admin" ? (
          <form onSubmit={handleAdminLogin}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        ) : (
          <div>
            {!otpSent ? (
              <form onSubmit={handleSendOtp}>
                <input
                  type="email"
                  placeholder="Enter HR Email (e.g. hr@dnispl.com)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" disabled={loading}>
                  {loading ? "Sending..." : "Send OTP"}
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp}>
                <input
                  type="text"
                  placeholder="Enter 6-Digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                  required
                />
                <button type="submit" disabled={loading}>
                  {loading ? "Verifying..." : "Verify & Login"}
                </button>
                <button
                  type="button"
                  className="btn-link"
                  onClick={() => setOtpSent(false)}
                  style={{ marginTop: "10px", background: "none", border: "none", color: "#3b82f6", cursor: "pointer", display: "block", width: "100%", textAlign: "center" }}
                >
                  Change Email / Resend
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;