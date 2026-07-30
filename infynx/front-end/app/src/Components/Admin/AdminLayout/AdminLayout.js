import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  Briefcase,
  CheckCircle2,
  CircleDot,
  ExternalLink,
  FileText,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  Newspaper,
  ShieldCheck,
  Timer,
  XCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { getRole, signOut } from '../../../config/api';
import './AdminLayout.css';

/**
 * HR signs in by OTP and only manages hiring, so they see the two hiring
 * sections. The admin login sees everything.
 */
const NAV = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard, adminOnly: true },
  { to: '/admin/contacts', label: 'Enquiries', icon: Mail, adminOnly: true },
  { to: '/admin/jobs', label: 'Jobs', icon: Briefcase },
  { to: '/admin/applications', label: 'Applications', icon: FileText },
  { to: '/admin/blogs', label: 'Blogs', icon: Newspaper, adminOnly: true }
];

/**
 * Status is carried by an icon and the word itself, not by hue. Red and green
 * are indistinguishable under deuteranopia (measured ΔE 4.1), so the colour here
 * is reinforcement on top of a label that already says the thing.
 */
const STATUS_META = {
  Pending: { tone: 'warning', Icon: Timer },
  'In Progress': { tone: 'info', Icon: CircleDot },
  Completed: { tone: 'good', Icon: CheckCircle2 },
  Shortlisted: { tone: 'good', Icon: CheckCircle2 },
  Rejected: { tone: 'critical', Icon: XCircle }
};

export const StatusPill = ({ status }) => {
  const meta = STATUS_META[status] || { tone: 'neutral', Icon: CircleDot };
  const { tone, Icon } = meta;

  return (
    <span className={`admin-pill admin-pill-${tone}`}>
      <Icon size={13} aria-hidden="true" />
      {status || 'Unknown'}
    </span>
  );
};

/** Consistent empty / error / loading blocks so no table ever renders as a void. */
export const AdminState = ({ kind = 'empty', title, message, action }) => (
  <div className={`admin-state admin-state-${kind}`}>
    {kind === 'loading' && <span className="admin-spinner" aria-hidden="true" />}
    <h3>{title}</h3>
    {message && <p>{message}</p>}
    {action}
  </div>
);

const AdminLayout = ({ title, subtitle, actions, children }) => {
  const location = useLocation();
  const [navOpen, setNavOpen] = useState(false);
  const role = getRole() || 'admin';

  const links = NAV.filter((item) => !(item.adminOnly && role === 'hr'));

  // Route change closes the mobile drawer — otherwise it stays over the page.
  useEffect(() => { setNavOpen(false); }, [location.pathname]);

  return (
    <div className="admin-shell">
      {/* Ambient brand field, same vocabulary as the public site */}
      <div className="admin-ambience" aria-hidden="true">
        <span className="admin-orb admin-orb-1" />
        <span className="admin-orb admin-orb-2" />
        <span className="admin-grid" />
      </div>

      <button
        type="button"
        className="admin-nav-toggle"
        onClick={() => setNavOpen((open) => !open)}
        aria-label="Toggle navigation"
        aria-expanded={navOpen}
      >
        <Menu size={20} />
      </button>

      <aside className={`admin-sidebar ${navOpen ? 'open' : ''}`}>
        <div className="admin-brand">
          <span className="admin-brand-mark">D</span>
          <div>
            <strong>DNISPL</strong>
            <small>Control Room</small>
          </div>
        </div>

        <div className="admin-role-chip">
          <ShieldCheck size={13} />
          {role === 'hr' ? 'HR Access' : 'Administrator'}
        </div>

        <nav className="admin-nav">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} className="admin-nav-link">
              <Icon size={17} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <Link to="/" className="admin-nav-link admin-nav-secondary" target="_blank" rel="noreferrer">
            <ExternalLink size={17} />
            <span>View website</span>
          </Link>
          <button type="button" className="admin-logout" onClick={signOut}>
            <LogOut size={16} />
            Sign out
          </button>
        </div>
      </aside>

      {navOpen && <div className="admin-scrim" onClick={() => setNavOpen(false)} />}

      <main className="admin-main">
        <motion.header
          className="admin-topbar"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <div>
            <h1>{title}</h1>
            {subtitle && <p>{subtitle}</p>}
          </div>
          {actions && <div className="admin-topbar-actions">{actions}</div>}
        </motion.header>

        <motion.div
          className="admin-content"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
};

export default AdminLayout;
