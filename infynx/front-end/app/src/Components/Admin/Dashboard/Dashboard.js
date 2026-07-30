import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Briefcase,
  FileText,
  Mail,
  Newspaper,
  RefreshCw
} from "lucide-react";
import { motion } from "framer-motion";
import AdminLayout, { AdminState, StatusPill } from "../AdminLayout/AdminLayout";
import { authFetch } from "../../../config/api";
import { CountUp } from "../../../hooks/useScrollReveal";
import "./Dashboard.css";

/* Each tile is a single headline number — a stat tile, not a chart. */
const TILES = [
  { key: "contacts", label: "Total Enquiries", icon: Mail, to: "/admin/contacts", deltaKey: "contactsThisWeek", pendingKey: "pendingContacts" },
  { key: "applications", label: "Applications", icon: FileText, to: "/admin/applications", deltaKey: "applicationsThisWeek", pendingKey: "pendingApplications" },
  { key: "jobs", label: "Open Roles", icon: Briefcase, to: "/admin/jobs" },
  { key: "blogs", label: "Published Blogs", icon: Newspaper, to: "/admin/blogs" }
];

const formatDate = (value) =>
  value ? new Date(value).toLocaleDateString("en-IN", { day: "numeric", month: "short" }) : "—";

/**
 * Enquiries by service. One series comparing magnitude across categories, so it
 * is a single-hue horizontal bar chart with direct value labels — no legend
 * (the title names the series) and no second colour to decode.
 */
const ServiceSplit = ({ data }) => {
  const max = Math.max(...data.map((row) => row.count), 1);

  return (
    <ul className="split-chart">
      {data.map((row, index) => (
        <li key={row.service}>
          <span className="split-label" title={row.service}>{row.service}</span>
          <span className="split-track">
            <motion.span
              className="split-bar"
              initial={{ width: 0 }}
              animate={{ width: `${(row.count / max) * 100}%` }}
              transition={{ duration: 0.75, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
            />
          </span>
          <span className="split-value">{row.count}</span>
        </li>
      ))}
    </ul>
  );
};

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [state, setState] = useState("loading");
  const [error, setError] = useState("");

  const loadData = useCallback(async () => {
    setState("loading");
    try {
      const payload = await authFetch("/api/dashboard");
      setData(payload);
      setState("ready");
    } catch (err) {
      setError(err.message);
      setState("error");
    }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const actions = (
    <button type="button" className="admin-btn admin-btn-ghost" onClick={loadData} disabled={state === "loading"}>
      <RefreshCw size={15} className={state === "loading" ? "spin" : ""} />
      Refresh
    </button>
  );

  return (
    <AdminLayout
      title="Dashboard"
      subtitle="Live view of enquiries, hiring, and published content."
      actions={actions}
    >
      {state === "loading" && !data && (
        <AdminState kind="loading" title="Loading dashboard" message="Fetching the latest counts." />
      )}

      {state === "error" && (
        <AdminState
          kind="error"
          title="Couldn’t load the dashboard"
          message={error}
          action={<button type="button" className="admin-btn" onClick={loadData}>Try again</button>}
        />
      )}

      {data && (
        <>
          <div className="stat-grid">
            {TILES.map((tile, index) => {
              const Icon = tile.icon;
              const delta = tile.deltaKey ? data[tile.deltaKey] : undefined;
              const pending = tile.pendingKey ? data[tile.pendingKey] : undefined;

              return (
                <motion.div
                  key={tile.key}
                  className="stat-tile"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link to={tile.to}>
                    <div className="stat-tile-top">
                      <span className="stat-icon"><Icon size={18} /></span>
                      <ArrowUpRight size={16} className="stat-cue" />
                    </div>

                    <span className="stat-value"><CountUp value={String(data[tile.key] ?? 0)} /></span>
                    <span className="stat-label">{tile.label}</span>

                    <div className="stat-foot">
                      {delta !== undefined && <span className="stat-delta">+{delta} this week</span>}
                      {pending !== undefined && pending > 0 && (
                        <span className="stat-pending">{pending} pending</span>
                      )}
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          <div className="dash-grid">
            <section className="admin-panel">
              <div className="admin-panel-head">
                <div>
                  <h2>Enquiries by service</h2>
                  <p>Which offerings are drawing the most interest.</p>
                </div>
              </div>
              {data.serviceSplit?.length ? (
                <div className="split-wrap"><ServiceSplit data={data.serviceSplit} /></div>
              ) : (
                <AdminState title="No enquiries yet" message="Service breakdown appears once the contact form receives submissions." />
              )}
            </section>

            <section className="admin-panel">
              <div className="admin-panel-head">
                <div>
                  <h2>Latest enquiries</h2>
                  <p>Five most recent contact submissions.</p>
                </div>
                <Link to="/admin/contacts" className="admin-btn admin-btn-ghost">View all</Link>
              </div>

              {data.recentContacts?.length ? (
                <ul className="activity-list">
                  {data.recentContacts.map((item) => (
                    <li key={item._id}>
                      <div>
                        <strong>{item.name}</strong>
                        <span>{item.service}</span>
                      </div>
                      <div className="activity-meta">
                        <StatusPill status={item.status} />
                        <span className="cell-muted">{formatDate(item.createdAt)}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <AdminState title="Nothing yet" message="New contact form submissions will land here." />
              )}
            </section>

            <section className="admin-panel">
              <div className="admin-panel-head">
                <div>
                  <h2>Latest applications</h2>
                  <p>Five most recent candidates.</p>
                </div>
                <Link to="/admin/applications" className="admin-btn admin-btn-ghost">View all</Link>
              </div>

              {data.recentApplications?.length ? (
                <ul className="activity-list">
                  {data.recentApplications.map((item) => (
                    <li key={item._id}>
                      <div>
                        <strong>{item.name}</strong>
                        <span>{item.jobProfile}</span>
                      </div>
                      <div className="activity-meta">
                        <StatusPill status={item.status} />
                        <span className="cell-muted">{formatDate(item.createdAt)}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <AdminState title="No applications yet" message="Candidate applications from the careers page appear here." />
              )}
            </section>
          </div>
        </>
      )}
    </AdminLayout>
  );
};

export default Dashboard;
