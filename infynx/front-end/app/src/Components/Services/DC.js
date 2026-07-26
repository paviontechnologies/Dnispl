import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./DC.css";
import { Link } from 'react-router-dom';

const DC = () => {
  return (
    <>
      <Header />

      <div className="dc-page-container">
        
        {/* --- BACKGROUND ANIMATION --- */}
        <div className="dc-bg-layer">
            <div className="hex-grid"></div>
            <div className="glow-spot spot-1"></div>
            <div className="glow-spot spot-2"></div>
        </div>

        {/* HERO SECTION */}
        <section className="dc-hero-section">
          <div className="dc-content-wrapper">
            <div className="dc-status-badge fade-in-up">
                <span className="blink-green">●</span> SYSTEM ONLINE
            </div>
            <h1 className="dc-hero-title fade-in-up delay-1">
              <span className="text-gradient-green"> Next-Gen DC Passive Work <br/>& Infrastructure Services</span>
               
            </h1>

            <p className="dc-hero-subtitle fade-in-up delay-2">
              Complete implementation of cabling, electrical, mechanical, civil work, DG/UPS
              setup, PAC units, and installation & commissioning for small to large data centers.
            </p>

            <div className="dc-hero-buttons fade-in-up delay-3">
              <Link to="/form" className="btn-green-neon">Request Deployment</Link>
              <a href="#services" className="btn-glass-green">View Capabilities</a>
            </div>
          </div>
        </section>

        {/* WHAT WE OFFER SECTION */}
        <section className="dc-services-section" id="services">
          <div className="dc-content-wrapper">
            <div className="section-header center">
                <h2 className="text-gradient-green">Infrastructure Services</h2>
                <p className="dc-section-desc">Building the backbone of your digital operations.</p>
            </div>

            <div className="dc-cards-grid">
              {[
                { icon: "🧵", title: "Structured Cabling", desc: "Cat-6, OFC fiber cabling, rack dressing, patch panels, tray installation & labeling." },
                { icon: "⚡", title: "Electrical Work", desc: "DB installation, power cabling, earthing, surge protection & load balancing." },
                { icon: "🔧", title: "Mechanical & Civil", desc: "Civil modifications, cooling ducting, raised flooring, rack mounting & sealing." },
                { icon: "🔋", title: "DG & UPS Setup", desc: "Deployment of DG sets, UPS units, battery banks & backup power integration." },
                { icon: "❄️", title: "PAC Installation", desc: "Precision AC installation, ducting, cooling optimization & environment monitoring." },
                { icon: "🛠️", title: "I&C Services", desc: "Complete site execution: mounting, power integration, cabling & final commissioning." }
              ].map((service, index) => (
                <div className="dc-glass-card hover-lift" key={index}>
                  <div className="card-top-bar">
                      <span className="dot red"></span><span className="dot yellow"></span><span className="dot green"></span>
                  </div>
                  <div className="dc-icon-wrapper">{service.icon}</div>
                  <h3>{service.title}</h3>
                  <p>{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS SECTION */}
        <section className="dc-process-section">
          <div className="dc-content-wrapper">
            <h2 className="dc-section-title center text-white">Deployment Process</h2>
            
            <div className="dc-process-grid">
              {[
                { step: "01", title: "Site Survey", desc: "Detailed evaluation of site layout, power, cooling & safety compliance." },
                { step: "02", title: "Design & Planning", desc: "BOQ preparation, power diagrams, cabling layout & resource allocation." },
                { step: "03", title: "Implementation", desc: "Execution of cabling, power setup, PAC installation & hardware mounting." },
                { step: "04", title: "Testing & Handover", desc: "Electrical testing, cooling validation, load tests & commissioning sign-off." }
              ].map((proc, index) => (
                <div className="dc-process-card" key={index}>
                  <div className="proc-number">{proc.step}</div>
                  <h3>{proc.title}</h3>
                  <p>{proc.desc}</p>
                  <div className="progress-bar"><div className="fill"></div></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="dc-cta-section" id="contact">
          <div className="dc-cta-box glass-panel">
            <div className="scan-line"></div>
            <h2>Ready to Build Your Data Center?</h2>
            <p>
              From small server rooms to hyperscale centers — our certified teams 
              handle complete passive infrastructure deployment.
            </p>
            <Link to="/form" className="btn-green-neon">Start Project</Link>
          </div>
        </section>

      </div>
      <Footer />
    </>
  );
};

export default DC;