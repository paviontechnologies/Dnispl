import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./WO.css";
import { Link } from 'react-router-dom';

const WO = () => {
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
          <div className="wo-content-wrapper">
            <div className="wo-badge fade-in-up">
                <span className="dot-status"></span> TALENT ON DEMAND
            </div>
            
            <h1 className="wo-hero-title fade-in-up delay-1">
              Technical & Non-Technical <br/>
              <span className="text-gradient-blue-gold">Workforce Outsourcing</span>
            </h1>

            <p className="wo-hero-subtitle fade-in-up delay-2">
              We provide skilled manpower across IT, engineering, operations, support,
              and field services — deployed on a short-term, long-term, or
              project-based engagement model across India.
            </p>

            <div className="wo-hero-buttons fade-in-up delay-3">
              <a href="#contact" className="btn-blue-solid">Request Workforce</a>
              <a href="#services" className="btn-glass-blue">Explore Profiles</a>
            </div>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section className="wo-services-section" id="services">
          <div className="wo-content-wrapper">
            <div className="section-header center">
                <h2 className="wo-section-title">Workforce Categories</h2>
                <p className="wo-section-desc">Finding the right people for the right job.</p>
            </div>

            <div className="wo-cards-grid">
              {[
                { icon: "🛠️", title: "Technical Workforce", desc: "L1/L2 engineers, network engineers, NOC engineers, application support, field technicians & system admins." },
                { icon: "📋", title: "Non-Technical Workforce", desc: "HR, operations, back-office, admin, data entry, helpdesk associates, logistics & site support staff." },
                { icon: "🏢", title: "Client-Site Deployment", desc: "Dedicated workforce deployed at your office or remote locations with full attendance tracking & reporting." },
                { icon: "🌍", title: "PAN India Availability", desc: "Access to talent across metros, Tier-1, Tier-2, and Tier-3 cities for rapid & reliable deployment." },
                { icon: "🤝", title: "Contract Hiring", desc: "Short-term, long-term and on-demand contractual workforce for telecom rollouts & IT operations." },
                { icon: "📈", title: "Recruitment Support", desc: "End-to-end sourcing, screening, onboarding & background verification for trusted candidates." }
              ].map((service, index) => (
                <div className="wo-glass-card hover-lift" key={index}>
                  <div className="card-top-accent"></div>
                  <div className="wo-icon-wrapper">{service.icon}</div>
                  <h3>{service.title}</h3>
                  <p>{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS SECTION */}
        <section className="wo-process-section">
          <div className="wo-content-wrapper">
            <h2 className="wo-section-title center text-white">Our Hiring Process</h2>
            
            <div className="wo-process-steps">
              {[
                { step: "01", title: "Requirement Gathering", desc: "Understanding your exact manpower needs, skillsets, shift structure, project location, and SLAs." },
                { step: "02", title: "Screening & Shortlisting", desc: "Candidates undergo technical evaluation, HR screening, background checks & verification." },
                { step: "03", title: "Deployment & Onboarding", desc: "Workforce deployed at client location with ID, documentation, asset allocation & training." },
                { step: "04", title: "Monitoring & Compliance", desc: "Monthly reporting, attendance tracking, performance review, salary processing & compliance." }
              ].map((proc, index) => (
                <div className="wo-process-card" key={index}>
                  <div className="step-badge">{proc.step}</div>
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
        <section className="wo-cta-section" id="contact">
          <div className="wo-cta-box glass-panel-blue">
            <div className="bg-pattern"></div>
            <h2>Need Skilled Workforce on Priority?</h2>
            <p>
              Share your job requirements — our team will provide trained and verified
              manpower within the shortest turnaround time.
            </p>
            <Link to="/form" className="btn-gold-glow">Contact Us</Link>
          </div>
        </section>

      </div>
      <Footer />
    </>
  );
};

export default WO;