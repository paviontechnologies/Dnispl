import React, { useCallback, useEffect, useState } from "react";
import { Download, Mail, MapPin, RefreshCw, Trash2 } from "lucide-react";
import AdminLayout, { AdminState, StatusPill } from "../AdminLayout/AdminLayout";
import { authFetch, uploadUrl } from "../../../config/api";
import "./Application.css";

const STATUSES = ["Pending", "Shortlisted", "Rejected"];

const matches = (application, term) =>
  [application.name, application.email, application.jobProfile, application.city, application.state]
    .map((value) => String(value ?? "").toLowerCase())
    .some((value) => value.includes(term));

const formatDate = (value) =>
  value ? new Date(value).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—";

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [state, setState] = useState("loading");
  const [error, setError] = useState("");

  const fetchApplications = useCallback(async () => {
    setState("loading");
    try {
      const data = await authFetch("/api/applications");
      setApplications(Array.isArray(data) ? data : []);
      setState("ready");
    } catch (err) {
      setError(err.message);
      setState("error");
    }
  }, []);

  useEffect(() => { fetchApplications(); }, [fetchApplications]);

  const updateStatus = async (id, status) => {
    const previous = applications;
    setApplications((rows) => rows.map((row) => (row._id === id ? { ...row, status } : row)));

    try {
      await authFetch(`/api/applications/${id}`, { method: "PUT", body: { status } });
    } catch (err) {
      setApplications(previous);
      setError(err.message);
    }
  };

  const deleteApplication = async (application) => {
    if (!window.confirm(`Delete ${application.name}'s application permanently?`)) return;

    try {
      await authFetch(`/api/applications/${application._id}`, { method: "DELETE" });
      setApplications((rows) => rows.filter((row) => row._id !== application._id));
    } catch (err) {
      setError(err.message);
    }
  };

  const term = search.trim().toLowerCase();
  const filtered = applications.filter(
    (application) =>
      (statusFilter === "All" || (application.status || "Pending") === statusFilter) &&
      (!term || matches(application, term))
  );

  const counts = STATUSES.reduce((acc, status) => {
    acc[status] = applications.filter((a) => (a.status || "Pending") === status).length;
    return acc;
  }, {});

  const actions = (
    <button type="button" className="admin-btn admin-btn-ghost" onClick={fetchApplications} disabled={state === "loading"}>
      <RefreshCw size={15} className={state === "loading" ? "spin" : ""} />
      Refresh
    </button>
  );

  return (
    <AdminLayout
      title="Job Applications"
      subtitle={`${applications.length} received · ${counts.Pending || 0} awaiting review`}
      actions={actions}
    >
      {error && state !== "error" && <div className="admin-banner admin-banner-error">{error}</div>}

      <div className="admin-panel">
        <div className="admin-panel-head">
          <input
            type="text"
            className="admin-search"
            placeholder="Search by name, email, role, or city…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="applications-filter-row">
            {["All", ...STATUSES].map((status) => (
              <button
                key={status}
                type="button"
                className={`applications-chip ${statusFilter === status ? "active" : ""}`}
                onClick={() => setStatusFilter(status)}
              >
                {status}
                {status !== "All" && <em>{counts[status] || 0}</em>}
              </button>
            ))}
          </div>
        </div>

        {state === "loading" && !applications.length && <AdminState kind="loading" title="Loading applications" />}

        {state === "error" && (
          <AdminState
            kind="error"
            title="Couldn’t load applications"
            message={error}
            action={<button type="button" className="admin-btn" onClick={fetchApplications}>Try again</button>}
          />
        )}

        {state === "ready" && !applications.length && (
          <AdminState
            title="No applications yet"
            message="Candidates who apply through the careers page will appear here with their résumé attached."
          />
        )}

        {state === "ready" && applications.length > 0 && !filtered.length && (
          <AdminState
            title="No matches"
            message="No application matches this search and status combination."
            action={
              <button
                type="button"
                className="admin-btn admin-btn-ghost"
                onClick={() => { setSearch(""); setStatusFilter("All"); }}
              >
                Clear filters
              </button>
            }
          />
        )}

        {filtered.length > 0 && (
          <div className="admin-table-scroll">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Candidate</th>
                  <th>Applied for</th>
                  <th>Location</th>
                  <th>Received</th>
                  <th>Résumé</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <span className="cell-strong">{item.name}</span>
                      <a className="applicant-mail" href={`mailto:${item.email}`}>
                        <Mail size={12} /> {item.email}
                      </a>
                    </td>
                    <td>{item.jobProfile || "—"}</td>
                    <td>
                      <span className="applicant-location">
                        <MapPin size={13} /> {[item.city, item.state].filter(Boolean).join(", ") || "—"}
                      </span>
                    </td>
                    <td className="cell-muted">{formatDate(item.createdAt)}</td>
                    <td>
                      {item.resume ? (
                        <a
                          className="resume-link"
                          href={uploadUrl(item.resume)}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Download size={13} /> Open
                        </a>
                      ) : (
                        <span className="cell-muted">Not attached</span>
                      )}
                    </td>
                    <td>
                      <div className="status-cell">
                        <StatusPill status={item.status || "Pending"} />
                        <select
                          className="admin-select"
                          value={item.status || "Pending"}
                          onChange={(e) => updateStatus(item._id, e.target.value)}
                          aria-label={`Change status for ${item.name}`}
                        >
                          {STATUSES.map((status) => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>
                      </div>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="admin-icon-btn danger"
                        onClick={() => deleteApplication(item)}
                        aria-label={`Delete application from ${item.name}`}
                      >
                        <Trash2 size={15} />
                      </button>
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

export default Applications;
