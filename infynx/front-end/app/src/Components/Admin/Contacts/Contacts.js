import React, { useCallback, useEffect, useState } from "react";
import { Eye, Mail, Phone, RefreshCw, Trash2, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import AdminLayout, { AdminState, StatusPill } from "../AdminLayout/AdminLayout";
import { authFetch } from "../../../config/api";
import "./Contacts.css";

const STATUSES = ["Pending", "In Progress", "Completed"];

/** Records predate some fields, so every search key is coerced before matching. */
const matches = (contact, term) =>
  [contact.name, contact.email, contact.service, contact.phone]
    .map((value) => String(value ?? "").toLowerCase())
    .some((value) => value.includes(term));

const formatDate = (value) =>
  value ? new Date(value).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [state, setState] = useState("loading");
  const [error, setError] = useState("");

  const fetchContacts = useCallback(async () => {
    setState("loading");
    try {
      const data = await authFetch("/api/contacts");
      setContacts(Array.isArray(data) ? data : []);
      setState("ready");
    } catch (err) {
      setError(err.message);
      setState("error");
    }
  }, []);

  useEffect(() => { fetchContacts(); }, [fetchContacts]);

  const updateStatus = async (id, status) => {
    // Optimistic — the select should not wait on a round trip to reflect
    const previous = contacts;
    setContacts((rows) => rows.map((row) => (row._id === id ? { ...row, status } : row)));

    try {
      await authFetch(`/api/contacts/${id}`, { method: "PUT", body: { status } });
    } catch (err) {
      setContacts(previous);
      setError(err.message);
    }
  };

  const deleteContact = async (id) => {
    if (!window.confirm("Delete this enquiry permanently?")) return;

    try {
      await authFetch(`/api/contacts/${id}`, { method: "DELETE" });
      setContacts((rows) => rows.filter((row) => row._id !== id));
      setSelectedContact((current) => (current?._id === id ? null : current));
    } catch (err) {
      setError(err.message);
    }
  };

  const term = search.trim().toLowerCase();
  const filtered = contacts.filter(
    (contact) =>
      (statusFilter === "All" || (contact.status || "Pending") === statusFilter) &&
      (!term || matches(contact, term))
  );

  const actions = (
    <button type="button" className="admin-btn admin-btn-ghost" onClick={fetchContacts} disabled={state === "loading"}>
      <RefreshCw size={15} className={state === "loading" ? "spin" : ""} />
      Refresh
    </button>
  );

  return (
    <AdminLayout
      title="Customer Enquiries"
      subtitle={`${contacts.length} total · ${contacts.filter((c) => (c.status || "Pending") === "Pending").length} awaiting response`}
      actions={actions}
    >
      {error && state !== "error" && (
        <div className="admin-banner admin-banner-error">{error}</div>
      )}

      <div className="admin-panel">
        <div className="admin-panel-head">
          <input
            type="text"
            className="admin-search"
            placeholder="Search by name, email, phone, or service…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="contacts-filter-row">
            {["All", ...STATUSES].map((status) => (
              <button
                key={status}
                type="button"
                className={`contacts-chip ${statusFilter === status ? "active" : ""}`}
                onClick={() => setStatusFilter(status)}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {state === "loading" && !contacts.length && (
          <AdminState kind="loading" title="Loading enquiries" />
        )}

        {state === "error" && (
          <AdminState
            kind="error"
            title="Couldn’t load enquiries"
            message={error}
            action={<button type="button" className="admin-btn" onClick={fetchContacts}>Try again</button>}
          />
        )}

        {state === "ready" && !contacts.length && (
          <AdminState
            title="No enquiries yet"
            message="Submissions from the website contact form will appear here."
          />
        )}

        {state === "ready" && contacts.length > 0 && !filtered.length && (
          <AdminState
            title="No matches"
            message="No enquiry matches this search and status combination."
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
                  <th>Name</th>
                  <th>Contact</th>
                  <th>Service</th>
                  <th>Received</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => (
                  <tr key={item._id}>
                    <td className="cell-strong">{item.name}</td>
                    <td>
                      <div className="contact-lines">
                        <a href={`mailto:${item.email}`}><Mail size={13} /> {item.email}</a>
                        <a href={`tel:${item.phone}`}><Phone size={13} /> {item.phone}</a>
                      </div>
                    </td>
                    <td>{item.service || "—"}</td>
                    <td className="cell-muted">{formatDate(item.createdAt)}</td>
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
                      <div className="admin-row-actions">
                        <button
                          type="button"
                          className="admin-icon-btn"
                          onClick={() => setSelectedContact(item)}
                          aria-label={`View message from ${item.name}`}
                        >
                          <Eye size={15} />
                        </button>
                        <button
                          type="button"
                          className="admin-icon-btn danger"
                          onClick={() => deleteContact(item._id)}
                          aria-label={`Delete enquiry from ${item.name}`}
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

      <AnimatePresence>
        {selectedContact && (
          <motion.div
            className="admin-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={() => setSelectedContact(null)}
          >
            <motion.div
              className="admin-modal"
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 280, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="admin-modal-close"
                onClick={() => setSelectedContact(null)}
                aria-label="Close"
              >
                <X size={18} />
              </button>

              <span className="admin-modal-kicker">Enquiry detail</span>
              <h2>{selectedContact.name}</h2>
              <StatusPill status={selectedContact.status || "Pending"} />

              <dl className="admin-modal-meta">
                <div><dt>Email</dt><dd><a href={`mailto:${selectedContact.email}`}>{selectedContact.email}</a></dd></div>
                <div><dt>Phone</dt><dd><a href={`tel:${selectedContact.phone}`}>{selectedContact.phone}</a></dd></div>
                <div><dt>Service</dt><dd>{selectedContact.service || "—"}</dd></div>
                <div><dt>Received</dt><dd>{formatDate(selectedContact.createdAt)}</dd></div>
              </dl>

              <h3>Message</h3>
              <div className="admin-modal-message">{selectedContact.message}</div>

              <a className="admin-btn" href={`mailto:${selectedContact.email}?subject=Re: your enquiry to DNISPL`}>
                <Mail size={15} /> Reply by email
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
};

export default Contacts;
