import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>DNISPL</h2>
      <Link to="/admin">Dashboard</Link>
      <Link to="/admin/contacts">Contacts</Link>
      <Link to="/admin/jobs">Jobs</Link>
      <Link to="/admin/applications">Applications</Link>
      <Link to="/admin/blogs">Blogs</Link>
      <Link to="/admin/login">Logout</Link>
      <button className="logout-btn" onClick={() => { localStorage.removeItem("token"); window.location.href = "/admin/login";}}>
        Logout
      </button>
    </div>
  );
};

export default Sidebar;