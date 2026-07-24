import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./AP.css"; 
import { Link } from 'react-router-dom';

const AP = () => {
  return (
    <div className="ap-page-container">
      <Header />

      {/* --- BACKGROUND ANIMATION LAYER --- */}
      <div className="ap-global-bg">
          <div className="ap-grid-overlay"></div>
          <div className="ap-orb orb-1"></div>
          <div className="ap-orb orb-2"></div>
      </div>

      <div className="ap-content-relative">
        
        {/* HERO SECTION */}
        <section className="ap-hero-section">
          <div className="ap-content-wrapper center-text">
            <h1 className="ap-hero-title animate-pop-in">
              End-to-End <span className="text-gradient-cyan">Active & Passive</span> <br/>
              Network Implementation
            </h1>
            <p className="ap-hero-subtitle animate-slide-up">
              We design, deploy, and maintain robust network infrastructure — from fiber and
              electrical to L2/L3 configuration, Wi-Fi, and surveillance-ready Cat-6 cabling.
            </p>

            <div className="ap-hero-buttons animate-slide-up delay-1">
              <a href="#contact" className="btn-cyan-glow">Discuss Your Network Project</a>
              <a href="#services" className="btn-glass-outline">View Capabilities</a>
            </div>
          </div>
        </section>

        {/* WHAT WE DELIVER SECTION */}
        <section className="ap-services-section" id="services">
          <div className="ap-content-wrapper">
            <h2 className="ap-section-title center">What We Deliver</h2>
            
            <div className="ap-cards-grid">
              {/* Card 1 */}
              <div className="ap-glass-card hover-glow">
                <span className="ap-icon">🧵</span>
                <h3>Fiber Optic Installation</h3>
                <p>End-to-end OFC laying, splicing, termination, and testing for backbone, distribution, and access networks.</p>
              </div>

              {/* Card 2 */}
              <div className="ap-glass-card hover-glow">
                <span className="ap-icon">🔌</span>
                <h3>Electrical & Power Setup</h3>
                <p>DB panels, power cabling, earthing, DG & UPS integration to ensure clean, reliable power for your IT load.</p>
              </div>

              {/* Card 3 */}
              <div className="ap-glass-card hover-glow">
                <span className="ap-icon">🛰️</span>
                <h3>L2 / L3 Network Configuration</h3>
                <p>Switching, routing, VLANs, QoS, redundancy and security policies on Cisco, Juniper, HP and other OEMs.</p>
              </div>

              {/* Card 4 */}
              <div className="ap-glass-card hover-glow">
                <span className="ap-icon">📷</span>
                <h3>Cat-6 & Surveillance Cabling</h3>
                <p>Structured cabling for workstations, Wi-Fi APs and IP cameras with proper labeling, patching, and rack dressing.</p>
              </div>

              {/* Card 5 */}
              <div className="ap-glass-card hover-glow">
                <span className="ap-icon">🏢</span>
                <h3>Inside Building Implementation</h3>
                <p>End-to-end IBMS / IBW / passive rollout inside corporate offices, campuses, DCs and retail outlets.</p>
              </div>

              {/* Card 6 */}
              <div className="ap-glass-card hover-glow">
                <span className="ap-icon">🌐</span>
                <h3>PAN India Rollouts</h3>
                <p>Standardized deployment process across cities with central governance, reporting, and SLA-driven execution.</p>
              </div>
            </div>
          </div>
        </section>

        {/* HOW WE WORK SECTION */}
        <section className="ap-process-section">
          <div className="ap-content-wrapper">
            <h2 className="ap-section-title center text-white">How We Execute Your Network Projects</h2>

            <div className="ap-process-grid">
              {/* Step 1 */}
              <div className="ap-process-card">
                <span className="ap-step">01</span>
                <h3>Site Survey & Audit</h3>
                <p>Detailed assessment of existing infra, power, cabling routes, rack space and safety compliance.</p>
                <div className="card-border-bottom"></div>
              </div>

              {/* Step 2 */}
              <div className="ap-process-card">
                <span className="ap-step">02</span>
                <h3>Solution Design & BOQ</h3>
                <p>We design active + passive architecture, prepare BOM/BOQ and share clear implementation plans and timelines.</p>
                <div className="card-border-bottom"></div>
              </div>

              {/* Step 3 */}
              <div className="ap-process-card">
                <span className="ap-step">03</span>
                <h3>Deployment & Configuration</h3>
                <p>On-ground teams execute cabling, mounting, patching, configuration and end-to-end connectivity checks.</p>
                <div className="card-border-bottom"></div>
              </div>

              {/* Step 4 */}
              <div className="ap-process-card">
                <span className="ap-step">04</span>
                <h3>Testing, Handover & Support</h3>
                <p>Performance testing, documentation, sign-off and post-implementation support with defined SLAs.</p>
                <div className="card-border-bottom"></div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="ap-cta-section" id="contact">
          <div className="ap-cta-content glass-panel">
            <h2>Need Active & Passive Network Experts?</h2>
            <p>
              Share your site details, rollout plan or BOQ — our team will help you
              design and execute a reliable network foundation.
            </p>
            <Link to="/form" className="btn-cyan-glow">Contact Us</Link>
          </div>
        </section>

      </div>
      <Footer />
    </div>
  );
};

export default AP;