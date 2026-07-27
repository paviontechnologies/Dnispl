import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./WO.css";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  AuroraBackdrop,
  CountUp,
  Marquee,
  Reveal,
  RevealGroup,
  ScrollFan,
  SplitHeading,
  useScrollReveal
} from '../../motion/MotionKit';

const TINT = { from: '#2563EB', to: '#D9A21B', glow: 'rgba(37, 99, 235, 0.32)' };

/* Fan shades stay inside the page's blue/gold family */
const PALETTE = [
  { card: '#2563EB', badge: '#1D4FBC' },
  { card: '#1D4ED8', badge: '#173FAC' },
  { card: '#D9A21B', badge: '#B08115' },
  { card: '#3B82F6', badge: '#2F68C5' },
  { card: '#0EA5E9', badge: '#0B84BB' },
  { card: '#C2900F', badge: '#9C740C' }
];

const CATEGORIES = [
  { icon: "🛠️", title: "Technical Workforce", desc: "L1/L2 engineers, network engineers, NOC engineers, application support, field technicians & system admins." },
  { icon: "📋", title: "Non-Technical Workforce", desc: "HR, operations, back-office, admin, data entry, helpdesk associates, logistics & site support staff." },
  { icon: "🏢", title: "Client-Site Deployment", desc: "Dedicated workforce deployed at your office or remote locations with full attendance tracking & reporting." },
  { icon: "🌍", title: "PAN India Availability", desc: "Access to talent across metros, Tier-1, Tier-2, and Tier-3 cities for rapid & reliable deployment." },
  { icon: "🤝", title: "Contract Hiring", desc: "Short-term, long-term and on-demand contractual workforce for telecom rollouts & IT operations." },
  { icon: "📈", title: "Recruitment Support", desc: "End-to-end sourcing, screening, onboarding & background verification for trusted candidates." }
];

const PROCESS = [
  { step: "01", title: "Requirement Gathering", desc: "Understanding your exact manpower needs, skillsets, shift structure, project location, and SLAs." },
  { step: "02", title: "Screening & Shortlisting", desc: "Candidates undergo technical evaluation, HR screening, background checks & verification." },
  { step: "03", title: "Deployment & Onboarding", desc: "Workforce deployed at client location with ID, documentation, asset allocation & training." },
  { step: "04", title: "Monitoring & Compliance", desc: "Monthly reporting, attendance tracking, performance review, salary processing & compliance." }
];

const SCALE = [
  { value: '450+', label: 'Deployed Workforce' },
  { value: '316', label: 'L1 Engineers' },
  { value: '55', label: 'L2 Engineers' },
  { value: '24/7', label: 'Shift Coverage' }
];

const ROLES = [
  'Network Engineer', 'NOC Engineer', 'Field Technician', 'System Admin',
  'Helpdesk Associate', 'Project Coordinator', 'Back-Office Executive',
  'Application Support', 'Site Supervisor', 'Data Entry Operator'
];

const WO = () => {
  useScrollReveal();

  return (
    <>
      <Header />

      <div className="wo-page-container">

        {/* --- BACKGROUND ANIMATION LAYER --- */}
        <div className="wo-bg-layer">
          <div className="network-grid"></div>
          <div className="floating-bubble bubble-1"></div>
          <div className="floating-bubble bubble-2"></div>
        </div>

        {/* HERO SECTION */}
        <section className="wo-hero-section">
          <AuroraBackdrop tint={TINT} />

          <div className="wo-content-wrapper">
            <motion.div
              className="wo-badge"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="dot-status"></span> TALENT ON DEMAND
            </motion.div>

            <SplitHeading
              className="wo-hero-title"
              lines={[
                'Technical & Non-Technical',
                <span className="text-gradient-blue-gold" key="a">Workforce Outsourcing</span>
              ]}
            />

            <motion.p
              className="wo-hero-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              We provide skilled manpower across IT, engineering, operations, support,
              and field services — deployed on a short-term, long-term, or
              project-based engagement model across India.
            </motion.p>

            <motion.div
              className="wo-hero-buttons"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.85 }}
            >
              <Link to="/form" className="btn-blue-solid">Request Workforce</Link>
              <a href="#services" className="btn-glass-blue">Explore Profiles</a>
            </motion.div>
          </div>
        </section>

        {/* ROLE MARQUEE */}
        <section className="wo-marquee-section">
          <Marquee items={ROLES} speed={40} />
        </section>

        {/* SERVICES — scroll-driven card fan */}
        <section className="wo-services-section" id="services">
          <div className="wo-content-wrapper">
            <Reveal className="section-header center">
              <h2 className="wo-section-title">Workforce Categories</h2>
              <p className="wo-section-desc">Finding the right people for the right job.</p>
            </Reveal>
          </div>

          <ScrollFan
            items={CATEGORIES}
            palette={PALETTE}
            renderCard={(service) => (
              <div className="fx-fan-card">
                <div className="fx-fan-badge">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
              </div>
            )}
          />

          {/* Counters run up as the strip enters view */}
          <div className="wo-content-wrapper">
            <RevealGroup className="wo-scale-strip">
              {SCALE.map((stat) => (
                <Reveal key={stat.label} dir="scale" className="wo-scale-item">
                  <strong><CountUp value={stat.value} /></strong>
                  <span>{stat.label}</span>
                </Reveal>
              ))}
            </RevealGroup>
          </div>
        </section>

        {/* PROCESS SECTION */}
        <section className="wo-process-section">
          <div className="wo-content-wrapper">
            <Reveal as="h2" className="wo-section-title center text-white">Our Hiring Process</Reveal>

            <RevealGroup className="wo-process-steps">
              {PROCESS.map((proc, index) => (
                <Reveal
                  className="wo-process-card"
                  key={proc.step}
                  dir={index % 2 === 0 ? 'left' : 'right'}
                >
                  <div className="step-badge">{proc.step}</div>
                  <div className="process-content">
                    <h3>{proc.title}</h3>
                    <p>{proc.desc}</p>
                  </div>
                </Reveal>
              ))}
            </RevealGroup>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="wo-cta-section" id="contact">
          <Reveal className="wo-cta-box glass-panel-blue" dir="scale">
            <div className="bg-pattern"></div>
            <h2>Need Skilled Workforce on Priority?</h2>
            <p>
              Share your job requirements — our team will provide trained and verified
              manpower within the shortest turnaround time.
            </p>
            <Link to="/form" className="btn-gold-glow">Contact Us</Link>
          </Reveal>
        </section>

      </div>
      <Footer />
    </>
  );
};

export default WO;
