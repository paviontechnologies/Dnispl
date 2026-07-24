import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./Application.css";

const Applications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/applications", {
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      });
      const data = await res.json();
      setApplications(data);
    } catch (err) {
      console.log(err);
    }
  };

  const updateStatus = async (id, status) => {
    await fetch(`http://localhost:5000/api/applications/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token"),
      },
      body: JSON.stringify({ status }),
    });

    fetchApplications();
  };

  const deleteApplication = async (id) => {
    if (!window.confirm("Delete this application?")) return;

    await fetch(`http://localhost:5000/api/applications/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": localStorage.getItem("token"),
      },
    });

    fetchApplications();
  };

  return (
    <div className="applications-page">
      <Sidebar />

      <div className="applications-content">
            <h2>Job Applications</h2>
            <table>
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Job</th>
                    <th>State</th>
                    <th>City</th>
                    <th>Resume</th>
                    <th>Status</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {applications.map((item) => (
                    <tr key={item._id}>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.jobProfile}</td>
                        <td>{item.state}</td>
                        <td>{item.city}</td>
                        <td>
                            <a href={`http://localhost:5000/uploads/${item.resume}`} target="_blank" rel="noreferrer">
                             View Resume
                            </a>
                        </td>
                        <td>
                            <select value={item.status} onChange={(e) => updateStatus(item._id, e.target.value) }>
                                <option>Pending</option>
                                <option>Shortlisted</option>
                                <option>Rejected</option>
                            </select>
                        </td>
                        <td>
                            <button
                                onClick={() => deleteApplication(item._id)}>
                                Delete
                            </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  );
};

export default Applications;