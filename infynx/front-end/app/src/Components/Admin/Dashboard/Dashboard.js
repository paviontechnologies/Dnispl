import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./Dashboard.css";

const Dashboard = () => {

const [contacts,setContacts]=useState(0);
const [jobs,setJobs]=useState(0);
const [applications,setApplications]=useState(0);
const [blogs,setBlogs]=useState(0);

useEffect(()=>{

loadData();

},[]);

const loadData = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/dashboard", {
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    });
    const data = await res.json();

    setContacts(data.contacts || 0);
    setJobs(data.jobs || 0);
    setApplications(data.applications || 0);
    setBlogs(data.blogs || 0);

  } catch (err) {
    console.log(err);
  }
};

return(

<div className="dashboard">
 <Sidebar/>

  <div className="dashboard-content">
    <h1>Dashboard</h1>
    <div className="cards">
      <div className="card">
        <h2>{contacts}</h2>
        <p>Total Contacts</p>
      </div>

      <div className="card">
       <h2>{applications}</h2>
        <p>Applications</p>
      </div>

      <div className="card">
        <h2>{jobs}</h2>
        <p>Jobs</p>
      </div>

      <div className="card">
        <h2>{blogs}</h2>
        <p>Blogs</p>
      </div>
    </div>
  </div>
</div>

)

}

export default Dashboard;