import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./RC.css";
import { Link } from 'react-router-dom';

const RC = () => {
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
          <div className="rc-content-wrapper">
            <div className="rc-badge fade-in-up">
                <span className="check-icon">✓</span> 100% COMPLIANCE ASSURED
            </div>
            
            <h1 className="rc-hero-title fade-in-up delay-1">
              Regulatory Compliance & <br />
              <span className="text-gradient-indigo">Site Audit Services</span>
            </h1>

            <p className="rc-hero-subtitle fade-in-up delay-2">
              Comprehensive audits for TRAI regulations, telecom infrastructure validation,
              safety compliance, documentation checks, and network performance verification.
            </p>

            <div className="rc-hero-buttons fade-in-up delay-3">
              <a href="#contact" className="btn-indigo-glow">Request Audit</a>
              <a href="#services" className="btn-glass-indigo">View Services</a>
            </div>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section className="rc-services-section" id="services">
          <div className="rc-content-wrapper">
            <div className="section-header center">
                <h2 className="rc-section-title">Audit Services We Provide</h2>
                <p className="rc-section-desc">Ensuring your infrastructure meets every standard.</p>
            </div>

            <div className="rc-cards-grid">
              {[
                { icon: "📡", title: "TRAI Regulatory Audits", desc: "Auditing telecom sites for compliance with TRAI norms, QoS parameters, speed, and coverage." },
                { icon: "📋", title: "Telecom Infra Audit", desc: "Verification of passive & active infra, rack conditions, equipment health, power & safety." },
                { icon: "🛡️", title: "Documentation Check", desc: "Validation of licenses, approvals, safety certificates, access logs, and compliance docs." },
                { icon: "🔌", title: "Power & Backup Audits", desc: "Audit of DG, UPS, battery bank, electrical panels, redundancy & cable routing." },
                { icon: "🛰️", title: "Network Performance", desc: "Speed tests, ping/latency checks, packet loss analysis, RF validation & fiber health." },
                { icon: "👷", title: "PAN India Audit Teams", desc: "Deployment of trained auditors across India for compliance checks and field surveys." }
              ].map((service, index) => (
                <div className="rc-glass-card hover-shield" key={index}>
                  <div className="card-bg-icon">{service.icon}</div>
                  <div className="rc-icon-wrapper">{service.icon}</div>
                  <h3>{service.title}</h3>
                  <p>{service.desc}</p>
                  <div className="bottom-line"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS SECTION */}
        <section className="rc-process-section">
          <div className="rc-content-wrapper">
            <h2 className="rc-section-title center text-white">Our Audit Process</h2>
            
            <div className="rc-process-timeline">
              {[
                { step: "01", title: "Requirement Understanding", desc: "Understanding audit scope — TRAI, infra, power, or site readiness — and finalizing checklist." },
                { step: "02", title: "Site Visit & Data Collection", desc: "On-ground audit covering active-passive infra, asset verification, power & safety." },
                { step: "03", title: "Technical Measurements", desc: "RF check, fiber health, latency, throughput, redundancy & alarms captured via tools." },
                { step: "04", title: "Report Submission", desc: "Detailed audit report with findings, non-compliance points, and rectification plan." }
              ].map((proc, index) => (
                <div className="rc-process-card" key={index}>
                  <div className="step-circle">
                    <span className="step-num">{proc.step}</span>
                    <div className="pulse-ring"></div>
                  </div>
                  <div className="process-content">
                    <h3>{proc.title}</h3>
                    <p>{proc.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="rc-cta-section" id="contact">
          <div className="rc-cta-box glass-panel-indigo">
            <div className="shield-deco">🛡️</div>
            <h2>Need Regulatory Compliance Support?</h2>
            <p>
              Our certified auditors ensure complete compliance with TRAI standards,
              safety norms & telecom infrastructure guidelines.
            </p>
            <Link to="/form" className="btn-white-glow">Contact Us</Link>
          </div>
        </section>

      </div>
      <Footer />
    </>
  );
};

export default RC;