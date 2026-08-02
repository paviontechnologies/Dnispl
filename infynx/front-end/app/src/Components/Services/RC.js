import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import IndustryStrip from "../Industries/IndustryStrip";
import "./RC.css";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  AuroraBackdrop,
  OrbitVisual,
  Reveal,
  RevealGroup,
  ScrollFan,
  SplitHeading,
  useScrollReveal
} from '../../motion/MotionKit';

const TINT = { from: '#6366F1', to: '#22D3EE', glow: 'rgba(99, 102, 241, 0.32)' };

/* Fan shades stay inside the page's indigo/violet family */
const PALETTE = [
  { card: '#6366F1', badge: '#4F51C7' },
  { card: '#4F46E5', badge: '#3F38B8' },
  { card: '#8B5CF6', badge: '#7040D6' },
  { card: '#4338CA', badge: '#3529A5' },
  { card: '#7C3AED', badge: '#6329C4' },
  { card: '#5B21B6', badge: '#481A91' }
];

const AUDITS = [
  { icon: "📡", title: "TRAI Regulatory Audits", desc: "Auditing telecom sites for compliance with TRAI norms, QoS parameters, speed, and coverage." },
  { icon: "📋", title: "Telecom Infra Audit", desc: "Verification of passive & active infra, rack conditions, equipment health, power & safety." },
  { icon: "🛡️", title: "Documentation Check", desc: "Validation of licenses, approvals, safety certificates, access logs, and compliance docs." },
  { icon: "🔌", title: "Power & Backup Audits", desc: "Audit of DG, UPS, battery bank, electrical panels, redundancy & cable routing." },
  { icon: "🛰️", title: "Network Performance", desc: "Speed tests, ping/latency checks, packet loss analysis, RF validation & fiber health." },
  { icon: "👷", title: "PAN India Audit Teams", desc: "Deployment of trained auditors across India for compliance checks and field surveys." }
];

const PROCESS = [
  { step: "01", title: "Requirement Understanding", desc: "Understanding audit scope — TRAI, infra, power, or site readiness — and finalizing checklist." },
  { step: "02", title: "Site Visit & Data Collection", desc: "On-ground audit covering active-passive infra, asset verification, power & safety." },
  { step: "03", title: "Technical Measurements", desc: "RF check, fiber health, latency, throughput, redundancy & alarms captured via tools." },
  { step: "04", title: "Report Submission", desc: "Detailed audit report with findings, non-compliance points, and rectification plan." }
];

const RC = () => {
  useScrollReveal();

  return (
    <>
      <Header />

      <div className="rc-page-container">

        {/* --- BACKGROUND ANIMATION LAYER --- */}
        <div className="rc-bg-layer">
          <div className="radar-scan"></div>
          <div className="abstract-shape shape-1"></div>
          <div className="abstract-shape shape-2"></div>
        </div>

        {/* HERO SECTION */}
        <section className="rc-hero-section">
          <AuroraBackdrop tint={TINT} />

          <div className="rc-content-wrapper">
            <motion.div
              className="rc-badge"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="check-icon">✓</span> 100% COMPLIANCE ASSURED
            </motion.div>

            <SplitHeading
              className="rc-hero-title"
              lines={[
                'Regulatory Compliance &',
                <span className="text-gradient-indigo" key="a">Site Audit Services</span>
              ]}
            />

            <motion.p
              className="rc-hero-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              Comprehensive audits for TRAI regulations, telecom infrastructure validation,
              safety compliance, documentation checks, and network performance verification.
            </motion.p>

            <motion.div
              className="rc-hero-buttons"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.85 }}
            >
              <Link to="/form" className="btn-indigo-glow">Request Audit</Link>
              <a href="#services" className="btn-glass-indigo">View Services</a>
            </motion.div>
          </div>
        </section>

        {/* SERVICES — scroll-driven card fan */}
        <section className="rc-services-section" id="services">
          <div className="rc-content-wrapper">
            <Reveal className="section-header center">
              <h2 className="rc-section-title">Audit Services We Provide</h2>
              <p className="rc-section-desc">Ensuring your infrastructure meets every standard.</p>
            </Reveal>
          </div>

          <ScrollFan
            items={AUDITS}
            palette={PALETTE}
            renderCard={(service) => (
              <div className="fx-fan-card">
                <div className="fx-fan-badge">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
              </div>
            )}
          />
        </section>

        {/* PROCESS SECTION */}
        <section className="rc-process-section">
          <div className="rc-content-wrapper">
            <Reveal as="h2" className="rc-section-title center text-white">Our Audit Process</Reveal>

            <div className="rc-process-layout">
              <RevealGroup className="rc-process-timeline">
                {PROCESS.map((proc, index) => (
                  <Reveal
                    className="rc-process-card"
                    key={proc.step}
                    dir={index % 2 === 0 ? 'left' : 'right'}
                  >
                    <div className="step-circle">
                      <span className="step-num">{proc.step}</span>
                      <div className="pulse-ring"></div>
                    </div>
                    <div className="process-content">
                      <h3>{proc.title}</h3>
                      <p>{proc.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </RevealGroup>

              {/* Turning globe — nationwide audit coverage */}
              <Reveal dir="right" className="rc-process-visual">
                <OrbitVisual tint={TINT} />
                <p>Trained auditors dispatched to metro, Tier-2 and Tier-3 sites nationwide.</p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Sector cross-links — routes this capability page into the
            industries that buy it. */}
        <IndustryStrip
          tint={TINT}
          title="Sectors with the heaviest compliance load"
          slugs={['government', 'finance', 'telecom', 'healthcare', 'manufacturing']}
        />

        {/* CTA SECTION */}
        <section className="rc-cta-section" id="contact">
          <Reveal className="rc-cta-box glass-panel-indigo" dir="scale">
            <div className="shield-deco">🛡️</div>
            <h2>Need Regulatory Compliance Support?</h2>
            <p>
              Our certified auditors ensure complete compliance with TRAI standards,
              safety norms &amp; telecom infrastructure guidelines.
            </p>
            <Link to="/form" className="btn-white-glow">Contact Us</Link>
          </Reveal>
        </section>

      </div>
      <Footer />
    </>
  );
};

export default RC;
