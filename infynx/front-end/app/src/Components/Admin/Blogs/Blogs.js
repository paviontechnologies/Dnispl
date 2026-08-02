import React, { useCallback, useEffect, useState } from "react";
import { ExternalLink, ImageOff, Pencil, Plus, RefreshCw, Trash2, X } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AdminLayout, { AdminState } from "../AdminLayout/AdminLayout";
import { authFetch, publicFetch } from "../../../config/api";
import "./Blogs.css";

const initialForm = {
  title: "",
  category: "",
  author: "DNISPL Admin",
  image: "",
  summary: "",
  content: "",
};

const CATEGORY_SUGGESTIONS = ["Infrastructure", "Operations", "Security", "Cloud", "Careers", "Announcements"];

const matches = (blog, term) =>
  [blog.title, blog.category, blog.author, blog.summary]
    .map((value) => String(value ?? "").toLowerCase())
    .some((value) => value.includes(term));

const formatDate = (value) =>
  value ? new Date(value).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [state, setState] = useState("loading");
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const fetchBlogs = useCallback(async () => {
    setState("loading");
    try {
      const data = await publicFetch("/api/blogs");
      setBlogs(Array.isArray(data) ? data : []);
      setState("ready");
    } catch (err) {
      setFeedback({ tone: "error", text: err.message });
      setState("error");
    }
  }, []);

  useEffect(() => { fetchBlogs(); }, [fetchBlogs]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
    setShowForm(false);
  };

  const saveBlog = async (e) => {
    e.preventDefault();
    setSaving(true);
    setFeedback(null);

    try {
      const saved = await authFetch(
        editingId ? `/api/blogs/${editingId}` : "/api/blogs",
        { method: editingId ? "PUT" : "POST", body: form }
      );

      setBlogs((rows) =>
        editingId ? rows.map((row) => (row._id === editingId ? saved : row)) : [saved, ...rows]
      );
      setFeedback({ tone: "success", text: editingId ? "Story updated." : "Story published to the blog." });
      resetForm();
    } catch (err) {
      setFeedback({ tone: "error", text: err.message });
    } finally {
      setSaving(false);
    }
  };

  const editBlog = (blog) => {
    setEditingId(blog._id);
    setShowForm(true);
    setFeedback(null);
    setForm({
      title: blog.title || "",
      category: blog.category || "",
      author: blog.author || "DNISPL Admin",
      image: blog.image || "",
      summary: blog.summary || "",
      content: blog.content || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteBlog = async (blog) => {
    if (!window.confirm(`Delete "${blog.title}"? This removes it from the public blog.`)) return;

    try {
      await authFetch(`/api/blogs/${blog._id}`, { method: "DELETE" });
      setBlogs((rows) => rows.filter((row) => row._id !== blog._id));
      if (editingId === blog._id) resetForm();
      setFeedback({ tone: "success", text: "Story deleted." });
    } catch (err) {
      setFeedback({ tone: "error", text: err.message });
    }
  };

  const term = search.trim().toLowerCase();
  const filtered = term ? blogs.filter((blog) => matches(blog, term)) : blogs;

  const actions = (
    <>
      <button type="button" className="admin-btn admin-btn-ghost" onClick={fetchBlogs} disabled={state === "loading"}>
        <RefreshCw size={15} className={state === "loading" ? "spin" : ""} />
        Refresh
      </button>
      <button type="button" className="admin-btn" onClick={() => (showForm ? resetForm() : setShowForm(true))}>
        {showForm ? <><X size={15} /> Close</> : <><Plus size={15} /> New story</>}
      </button>
    </>
  );

  return (
    <AdminLayout
      title="Blogs & News"
      subtitle={`${blogs.length} stor${blogs.length === 1 ? "y" : "ies"} published`}
      actions={actions}
    >
      {feedback && <div className={`admin-banner admin-banner-${feedback.tone}`}>{feedback.text}</div>}

      {showForm && (
        <motion.form
          className="admin-panel blog-form-panel"
          onSubmit={saveBlog}
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="admin-panel-head">
            <div>
              <h2>{editingId ? "Edit story" : "Publish a new story"}</h2>
              <p>Published stories appear on /blog and get their own article page.</p>
            </div>
          </div>

          <div className="admin-form-grid">
            <div className="admin-field span-full">
              <label htmlFor="blog-title">Title</label>
              <input id="blog-title" name="title" value={form.title} onChange={handleChange} placeholder="Why resilient networks start before the first device" required />
            </div>

            <div className="admin-field">
              <label htmlFor="blog-category">Category</label>
              <input
                id="blog-category"
                name="category"
                value={form.category}
                onChange={handleChange}
                list="blog-category-options"
                placeholder="Infrastructure"
                required
              />
              <datalist id="blog-category-options">
                {CATEGORY_SUGGESTIONS.map((option) => <option key={option} value={option} />)}
              </datalist>
            </div>

            <div className="admin-field">
              <label htmlFor="blog-author">Author</label>
              <input id="blog-author" name="author" value={form.author} onChange={handleChange} placeholder="DNISPL Engineering" />
            </div>

            <div className="admin-field span-full">
              <label htmlFor="blog-image">Cover image URL</label>
              <input id="blog-image" name="image" value={form.image} onChange={handleChange} placeholder="https://…/cover.webp" required />
              {form.image && (
                <div className="blog-image-preview">
                  <img src={form.image} alt="Cover preview" onError={(e) => { e.currentTarget.style.display = "none"; }} />
                </div>
              )}
            </div>

            <div className="admin-field span-full">
              <label htmlFor="blog-summary">Summary</label>
              <textarea id="blog-summary" name="summary" value={form.summary} onChange={handleChange} placeholder="One or two lines shown on the blog card." required />
            </div>

            <div className="admin-field span-full">
              <label htmlFor="blog-content">Article body</label>
              <textarea
                id="blog-content"
                name="content"
                value={form.content}
                onChange={handleChange}
                rows={12}
                placeholder="Write the full article here."
                required
              />
              <small className="admin-hint">
                Separate paragraphs with a blank line — each becomes its own paragraph on the article page.
              </small>
            </div>
          </div>

          <div className="admin-form-actions">
            <button type="submit" className="admin-btn" disabled={saving}>
              {saving ? "Saving…" : editingId ? "Update story" : "Publish story"}
            </button>
            <button type="button" className="admin-btn admin-btn-ghost" onClick={resetForm}>Cancel</button>
          </div>
        </motion.form>
      )}

      <div className="admin-panel">
        <div className="admin-panel-head">
          <input
            type="text"
            className="admin-search"
            placeholder="Search stories by title, category, or author…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {state === "loading" && !blogs.length && <AdminState kind="loading" title="Loading stories" />}

        {state === "error" && (
          <AdminState
            kind="error"
            title="Couldn’t load stories"
            message={feedback?.text}
            action={<button type="button" className="admin-btn" onClick={fetchBlogs}>Try again</button>}
          />
        )}

        {state === "ready" && !blogs.length && (
          <AdminState
            title="No stories published"
            message="The public blog is currently showing its built-in editorial fallback. Publish a story to take over."
            action={<button type="button" className="admin-btn" onClick={() => setShowForm(true)}><Plus size={15} /> New story</button>}
          />
        )}

        {state === "ready" && blogs.length > 0 && !filtered.length && (
          <AdminState
            title="No matches"
            message={`Nothing matches “${search}”.`}
            action={<button type="button" className="admin-btn admin-btn-ghost" onClick={() => setSearch("")}>Clear search</button>}
          />
        )}

        {filtered.length > 0 && (
          <div className="blog-admin-grid">
            {filtered.map((blog) => (
              <article className="blog-admin-card" key={blog._id}>
                <div className="blog-admin-media">
                  {blog.image ? (
                    <img src={blog.image} alt="" onError={(e) => { e.currentTarget.style.display = "none"; }} />
                  ) : (
                    <span className="blog-admin-noimage"><ImageOff size={20} /></span>
                  )}
                  <span className="blog-admin-tag">{blog.category}</span>
                </div>

                <div className="blog-admin-body">
                  <h3>{blog.title}</h3>
                  <p>{blog.summary}</p>
                  <span className="blog-admin-meta">
                    {blog.author || "DNISPL"} · {formatDate(blog.createdAt)}
                  </span>
                </div>

                <div className="blog-admin-actions">
                  <Link
                    to={`/blog/${blog._id}`}
                    target="_blank"
                    rel="noreferrer"
                    className="admin-icon-btn"
                    aria-label={`Preview ${blog.title}`}
                  >
                    <ExternalLink size={15} />
                  </Link>
                  <button type="button" className="admin-icon-btn" onClick={() => editBlog(blog)} aria-label={`Edit ${blog.title}`}>
                    <Pencil size={15} />
                  </button>
                  <button type="button" className="admin-icon-btn danger" onClick={() => deleteBlog(blog)} aria-label={`Delete ${blog.title}`}>
                    <Trash2 size={15} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Blogs;
