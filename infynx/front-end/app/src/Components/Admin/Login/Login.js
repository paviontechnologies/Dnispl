import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, KeyRound, Loader2, Lock, Mail, ShieldCheck, User } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { getRole, getToken, publicFetch } from "../../../config/api";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [loginMode, setLoginMode] = useState("admin"); // 'admin' | 'hr'
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // HR OTP login states
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null); // { tone, text }

  const landing = (role) => (role === "hr" ? "/admin/jobs" : "/admin/dashboard");

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      const data = await publicFetch("/api/admin/login", {
        method: "POST",
        body: { username, password },
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("userRole", "admin");
      navigate("/admin/dashboard");
    } catch (err) {
      setMessage({ tone: "error", text: err.message || "Invalid credentials" });
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email) return;
    setMessage(null);
    setLoading(true);

    try {
      await publicFetch("/api/hr/send-otp", { method: "POST", body: { email } });
      setOtpSent(true);
      setMessage({ tone: "success", text: `Code sent to ${email}. It expires in 5 minutes.` });
    } catch (err) {
      setMessage({ tone: "error", text: err.message || "Failed to send the code." });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp) return;
    setMessage(null);
    setLoading(true);

    try {
      const data = await publicFetch("/api/hr/verify-otp", { method: "POST", body: { email, otp } });
      localStorage.setItem("token", data.token);
      localStorage.setItem("userRole", "hr");
      navigate("/admin/jobs");
    } catch (err) {
      setMessage({ tone: "error", text: err.message || "Invalid or expired code." });
    } finally {
      setLoading(false);
    }
  };

  // Already signed in — skip the form
  useEffect(() => {
    if (getToken()) navigate(landing(getRole()), { replace: true });
  }, [navigate]);

  const switchMode = (mode) => {
    setLoginMode(mode);
    setMessage(null);
    setOtpSent(false);
    setOtp("");
  };

  return (
    <div className="login-page">
      <div className="login-ambience" aria-hidden="true">
        <span className="login-orb login-orb-1" />
        <span className="login-orb login-orb-2" />
        <span className="login-grid" />
      </div>

      <Link to="/" className="login-back"><ArrowLeft size={16} /> Back to website</Link>

      <motion.div
        className="login-card"
        initial={{ opacity: 0, y: 26, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="login-brand">
          <span className="login-brand-mark">D</span>
          <div>
            <strong>DNISPL</strong>
            <small>Control Room</small>
          </div>
        </div>

        <h1>Sign in</h1>
        <p className="login-intro">Administration tools, hiring, and content management.</p>

        <div className="login-tabs" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={loginMode === "admin"}
            className={`login-tab ${loginMode === "admin" ? "active" : ""}`}
            onClick={() => switchMode("admin")}
          >
            <Lock size={14} /> Admin
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={loginMode === "hr"}
            className={`login-tab ${loginMode === "hr" ? "active" : ""}`}
            onClick={() => switchMode("hr")}
          >
            <KeyRound size={14} /> HR — one-time code
          </button>
        </div>

        <AnimatePresence mode="wait">
          {message && (
            <motion.div
              key={message.text}
              className={`login-message ${message.tone}`}
              initial={{ opacity: 0, y: -8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -8, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {message.text}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {loginMode === "admin" ? (
            <motion.form
              key="admin"
              onSubmit={handleAdminLogin}
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 14 }}
              transition={{ duration: 0.28 }}
            >
              <label className="login-field">
                <span>Username</span>
                <div className="login-input">
                  <User size={16} />
                  <input
                    type="text"
                    placeholder="admin"
                    autoComplete="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              </label>

              <label className="login-field">
                <span>Password</span>
                <div className="login-input">
                  <Lock size={16} />
                  <input
                    type="password"
                    placeholder="••••••••"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </label>

              <button type="submit" className="login-submit" disabled={loading}>
                {loading ? <><Loader2 size={16} className="login-spin" /> Signing in…</> : "Sign in"}
              </button>
            </motion.form>
          ) : (
            <motion.div
              key="hr"
              initial={{ opacity: 0, x: 14 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -14 }}
              transition={{ duration: 0.28 }}
            >
              {!otpSent ? (
                <form onSubmit={handleSendOtp}>
                  <label className="login-field">
                    <span>Work email</span>
                    <div className="login-input">
                      <Mail size={16} />
                      <input
                        type="email"
                        placeholder="hr@dnispl.com"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </label>

                  <button type="submit" className="login-submit" disabled={loading}>
                    {loading ? <><Loader2 size={16} className="login-spin" /> Sending…</> : "Send one-time code"}
                  </button>

                  <p className="login-note">
                    <ShieldCheck size={13} /> Only approved DNISPL mailboxes can receive a code.
                  </p>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp}>
                  <label className="login-field">
                    <span>6-digit code</span>
                    <div className="login-input">
                      <KeyRound size={16} />
                      <input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        placeholder="000000"
                        className="login-otp"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                        maxLength={6}
                        autoFocus
                        required
                      />
                    </div>
                  </label>

                  <button type="submit" className="login-submit" disabled={loading || otp.length < 6}>
                    {loading ? <><Loader2 size={16} className="login-spin" /> Verifying…</> : "Verify & sign in"}
                  </button>

                  <button type="button" className="login-link" onClick={() => { setOtpSent(false); setOtp(""); setMessage(null); }}>
                    Use a different email / resend
                  </button>
                </form>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Login;
