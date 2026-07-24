import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./Jobs.css";

const initialForm = {
  title: "",
  experience: "",
  location: "",
  category: "",
  description: "",
  fullDescription: "",
};

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const res = await fetch("http://localhost:5000/api/jobs");
    const data = await res.json();
    setJobs(data);
  };

  const filteredJobs = jobs.filter((job) =>
  job.title.toLowerCase().includes(search.toLowerCase()) ||
  job.location.toLowerCase().includes(search.toLowerCase()) ||
  job.category.toLowerCase().includes(search.toLowerCase())
);

  const handleChange = (e) => {
    const { name, type, value, checked, files } = e.target;
    const newValue = type === "checkbox" ? checked : type === "file" ? files : value;
    setForm((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const saveJob = async () => {
  try {
    const url = editingId
      ? `http://localhost:5000/api/jobs/${editingId}`
      : "http://localhost:5000/api/jobs";

    const method = editingId ? "PUT" : "POST";

    console.log("Sending:", form);

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token"),
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    console.log("Status:", res.status);
    console.log("Response:", data);

    if (!res.ok) {
      alert(data.message);
      return;
    }

    alert(editingId ? "Job Updated" : "Job Added");

    setForm(initialForm);
    setEditingId(null);
    fetchJobs();

  } catch (err) {
    console.log(err);
  }
};

  const editJob = (job) => {
    setEditingId(job._id);
    setForm({
      title: job.title || "",
      experience: job.experience || "",
      location: job.location || "",
      category: job.category || "",
      description: job.description || "",
      fullDescription: job.fullDescription || "",
    });
  };

  const deleteJob = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/jobs/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": localStorage.getItem("token"),
        },
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Failed to delete job");
        return;
      }
      alert("Job Deleted");
      fetchJobs();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="jobs-page">
      <Sidebar />

      <div className="jobs-content">

        <h2>Manage Jobs</h2>

        <div className="job-form">
          <input
            name="search"
            placeholder="Search jobs..."
            className="search-box"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <input
            name="title"
            placeholder="Job Title"
            value={form.title}
            onChange={handleChange}
          />

          <input
            name="experience"
            placeholder="Experience"
            value={form.experience}
            onChange={handleChange}
          />

          <input
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
          />

          <input
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Short Description"
            value={form.description}
            onChange={handleChange}
            />

          <textarea
            name="fullDescription"
            placeholder="Full Description"
            value={form.fullDescription}
            onChange={handleChange}
          />

          <button onClick={saveJob}>
            {editingId ? "Update Job" : "Add Job"}
          </button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Experience</th>
              <th>Location</th>
              <th>Category</th>
              <th>Actions</th>
              <th>Created At</th>
            </tr>
          </thead>

          <tbody>
          {filteredJobs.map((job) => (
              <tr key={job._id}>
                <td>{job.title}</td>
                <td>{job.experience}</td>
                <td>{job.location}</td>
                <td>{job.category}</td>
                <td>{new Date(job.createdAt).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => editJob(job)}>
                    Edit
                  </button>
                  <button onClick={() => deleteJob(job._id)}>
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

export default Jobs;