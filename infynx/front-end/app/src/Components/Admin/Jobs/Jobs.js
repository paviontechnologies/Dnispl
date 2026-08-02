import React, { useCallback, useEffect, useState } from "react";
import { Pencil, Plus, RefreshCw, Trash2, X } from "lucide-react";
import { motion } from "framer-motion";
import AdminLayout, { AdminState } from "../AdminLayout/AdminLayout";
import { authFetch, publicFetch } from "../../../config/api";
import "./Jobs.css";

const initialForm = {
  title: "",
  experience: "",
  location: "",
  category: "",
  description: "",
  fullDescription: "",
};

/* The careers page colours its tag from this value, so keep the vocabulary tight. */
const EXPERIENCE_OPTIONS = ["ENGINEERING", "DELIVERY", "GROWTH", "OPERATIONS"];

/** Every key is coerced — older records may be missing category or location. */
const matches = (job, term) =>
  [job.title, job.location, job.category, job.experience]
    .map((value) => String(value ?? "").toLowerCase())
    .some((value) => value.includes(term));

const formatDate = (value) =>
  value ? new Date(value).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [state, setState] = useState("loading");
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState(null); // { tone, text }

  const fetchJobs = useCallback(async () => {
    setState("loading");
    try {
      const data = await publicFetch("/api/jobs");
      setJobs(Array.isArray(data) ? data : []);
      setState("ready");
    } catch (err) {
      setFeedback({ tone: "error", text: err.message });
      setState("error");
    }
  }, []);

  useEffect(() => { fetchJobs(); }, [fetchJobs]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
    setShowForm(false);
  };

  const saveJob = async (e) => {
    e.preventDefault();
    setSaving(true);
    setFeedback(null);

    try {
      const saved = await authFetch(
        editingId ? `/api/jobs/${editingId}` : "/api/jobs",
        { method: editingId ? "PUT" : "POST", body: form }
      );

      setJobs((rows) =>
        editingId ? rows.map((row) => (row._id === editingId ? saved : row)) : [saved, ...rows]
      );
      setFeedback({ tone: "success", text: editingId ? "Role updated." : "Role published to the careers page." });
      resetForm();
    } catch (err) {
      setFeedback({ tone: "error", text: err.message });
    } finally {
      setSaving(false);
    }
  };

  const editJob = (job) => {
    setEditingId(job._id);
    setShowForm(true);
    setFeedback(null);
    setForm({
      title: job.title || "",
      experience: job.experience || "",
      location: job.location || "",
      category: job.category || "",
      description: job.description || "",
      fullDescription: job.fullDescription || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteJob = async (job) => {
    if (!window.confirm(`Delete "${job.title}"? This removes it from the careers page.`)) return;

    try {
      await authFetch(`/api/jobs/${job._id}`, { method: "DELETE" });
      setJobs((rows) => rows.filter((row) => row._id !== job._id));
      if (editingId === job._id) resetForm();
      setFeedback({ tone: "success", text: "Role deleted." });
    } catch (err) {
      setFeedback({ tone: "error", text: err.message });
    }
  };

  const term = search.trim().toLowerCase();
  const filteredJobs = term ? jobs.filter((job) => matches(job, term)) : jobs;

  const actions = (
    <>
      <button type="button" className="admin-btn admin-btn-ghost" onClick={fetchJobs} disabled={state === "loading"}>
        <RefreshCw size={15} className={state === "loading" ? "spin" : ""} />
        Refresh
      </button>
      <button
        type="button"
        className="admin-btn"
        onClick={() => (showForm ? resetForm() : setShowForm(true))}
      >
        {showForm ? <><X size={15} /> Close</> : <><Plus size={15} /> New role</>}
      </button>
    </>
  );

  return (
    <AdminLayout
      title="Manage Jobs"
      subtitle={`${jobs.length} role${jobs.length === 1 ? "" : "s"} live on the careers page`}
      actions={actions}
    >
      {feedback && (
        <div className={`admin-banner admin-banner-${feedback.tone}`}>{feedback.text}</div>
      )}

      {showForm && (
        <motion.form
          className="admin-panel job-form-panel"
          onSubmit={saveJob}
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="admin-panel-head">
            <div>
              <h2>{editingId ? "Edit role" : "Publish a new role"}</h2>
              <p>These fields render directly on the public careers page.</p>
            </div>
          </div>

          <div className="admin-form-grid">
            <div className="admin-field">
              <label htmlFor="title">Job title</label>
              <input id="title" name="title" value={form.title} onChange={handleChange} placeholder="Network Engineer - L2/L3" required />
            </div>

            <div className="admin-field">
              <label htmlFor="experience">Track</label>
              <select id="experience" name="experience" value={form.experience} onChange={handleChange} required>
                <option value="">Select a track</option>
                {EXPERIENCE_OPTIONS.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div className="admin-field">
              <label htmlFor="location">Location</label>
              <input id="location" name="location" value={form.location} onChange={handleChange} placeholder="Gurugram / PAN India" required />
            </div>

            <div className="admin-field">
              <label htmlFor="category">Category</label>
              <input id="category" name="category" value={form.category} onChange={handleChange} placeholder="Networking" required />
            </div>

            <div className="admin-field span-full">
              <label htmlFor="description">Short description</label>
              <textarea id="description" name="description" value={form.description} onChange={handleChange} placeholder="One or two lines shown on the role card." required />
            </div>

            <div className="admin-field span-full">
              <label htmlFor="fullDescription">Full description</label>
              <textarea
                id="fullDescription"
                name="fullDescription"
                value={form.fullDescription}
                onChange={handleChange}
                rows={7}
                placeholder={"Role: what this person owns\nExperience: what we expect\nWhat matters: how we evaluate"}
                required
              />
              <small className="admin-hint">
                Lines containing a colon render as bold headings in the application modal.
              </small>
            </div>
          </div>

          <div className="admin-form-actions">
            <button type="submit" className="admin-btn" disabled={saving}>
              {saving ? "Saving…" : editingId ? "Update role" : "Publish role"}
            </button>
            <button type="button" className="admin-btn admin-btn-ghost" onClick={resetForm}>
              Cancel
            </button>
          </div>
        </motion.form>
      )}

      <div className="admin-panel">
        <div className="admin-panel-head">
          <input
            type="text"
            className="admin-search"
            placeholder="Search by title, location, category, or track…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {state === "loading" && !jobs.length && <AdminState kind="loading" title="Loading roles" />}

        {state === "error" && (
          <AdminState
            kind="error"
            title="Couldn’t load roles"
            message={feedback?.text}
            action={<button type="button" className="admin-btn" onClick={fetchJobs}>Try again</button>}
          />
        )}

        {state === "ready" && !jobs.length && (
          <AdminState
            title="No roles published"
            message="Publish your first opening and it appears on the careers page immediately."
            action={<button type="button" className="admin-btn" onClick={() => setShowForm(true)}><Plus size={15} /> New role</button>}
          />
        )}

        {state === "ready" && jobs.length > 0 && !filteredJobs.length && (
          <AdminState
            title="No matches"
            message={`Nothing matches “${search}”.`}
            action={<button type="button" className="admin-btn admin-btn-ghost" onClick={() => setSearch("")}>Clear search</button>}
          />
        )}

        {filteredJobs.length > 0 && (
          <div className="admin-table-scroll">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Track</th>
                  <th>Location</th>
                  <th>Category</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredJobs.map((job) => (
                  <tr key={job._id}>
                    <td className="cell-strong">{job.title}</td>
                    <td><span className="job-track">{job.experience || "—"}</span></td>
                    <td>{job.location || "—"}</td>
                    <td>{job.category || "—"}</td>
                    <td className="cell-muted">{formatDate(job.createdAt)}</td>
                    <td>
                      <div className="admin-row-actions">
                        <button
                          type="button"
                          className="admin-icon-btn"
                          onClick={() => editJob(job)}
                          aria-label={`Edit ${job.title}`}
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          type="button"
                          className="admin-icon-btn danger"
                          onClick={() => deleteJob(job)}
                          aria-label={`Delete ${job.title}`}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Jobs;
