import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./HPD.css";
import { Link } from 'react-router-dom';

const HPD = () => {
  return (
    <>
      <Header />

      <div className="hpd-page-container">
        
        {/* --- BACKGROUND ANIMATION LAYER --- */}
        <div className="hpd-bg-layer">
            <div className="circuit-grid"></div>
            {/* Floating "Hardware" Cubes */}
            <div className="cube cube-1"></div>
            <div className="cube cube-2"></div>
            <div className="cube cube-3"></div>
        </div>

        {/* HERO SECTION */}
        <section className="hpd-hero-section">
          <div className="hpd-content-wrapper">
            <div className="hpd-badge fade-in-up">
                <span className="dot-pulse"></span> ENTERPRISE GRADE HARDWARE
            </div>
            
            <h1 className="hpd-hero-title fade-in-up delay-1">
              <span className="text-gradient-orange"> IT Hardware Procurement <br/>
              & Deployment Services </span>
            </h1>

            <p className="hpd-hero-subtitle fade-in-up delay-2">
              Reliable sourcing, staging, configuration, and deployment of enterprise-grade
              IT hardware — including switches, routers, firewalls, access points, and more.
            </p>

            <div className="hpd-hero-buttons fade-in-up delay-3">
              <a href="#contact" className="btn-orange-glow">Request Hardware Quote</a>
              <a href="#services" className="btn-glass-tech">See What We Provide</a>
            </div>
          </div>
        </section>

        {/* WHAT WE PROCURE SECTION */}
        <section className="hpd-services-section" id="services">
          <div className="hpd-content-wrapper">
            <div className="section-header center">
                <h2 className="text-gradient-orange">Hardware We Procure & Deploy</h2>
                <div className="hpd-title-underline"></div>
            </div>

            <div className="hpd-cards-grid">
              {[
                { icon: "🔌", title: "Enterprise Switches", desc: "L2/L3 managed switches from Cisco, HP, Juniper, Arista, D-Link, TP-Link, and enterprise OEMs." },
                { icon: "📡", title: "Routers & Firewalls", desc: "Secure routing devices, firewalls, SD-WAN appliances and load balancers procured and configured." },
                { icon: "📶", title: "Wi-Fi Access Points", desc: "Deployment of enterprise Wi-Fi networks with heatmaps, placement planning, mounting, and testing." },
                { icon: "🖧", title: "Network Accessories", desc: "Patch panels, POE injectors, SFP modules, racks, power strips, LAN cables, and accessories." },
                { icon: "💾", title: "Servers & Storage", desc: "Rack servers, NAS, SAN storage, backup servers, and virtualization-ready compute hardware." },
                { icon: "🎛️", title: "Staging & Config", desc: "Hardware unboxing, OS upgrade, license installation, rack mounting, basic configuration & health check." }
              ].map((item, index) => (
                <div className="hpd-tech-card hover-scale" key={index}>
                  <div className="card-corner top-left"></div>
                  <div className="card-corner bottom-right"></div>
                  <span className="hpd-icon-floating">{item.icon}</span>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS SECTION */}
        <section className="hpd-process-section">
          <div className="hpd-content-wrapper">
            <h2 className="hpd-section-title center text-white">Our Deployment Process</h2>
            
            <div className="hpd-process-timeline">
              {[
                { step: "01", title: "Requirement Understanding", desc: "We capture hardware specifications, OEM choice, network architecture, and rack space needs." },
                { step: "02", title: "Procurement & Verification", desc: "Authentic OEM hardware sourcing, invoice validation, warranty check, serial number tracking." },
                { step: "03", title: "Staging & Testing", desc: "OS upgrade, configuration templates, SNMP/SSH setup, VLANs, routing policies and lab testing." },
                { step: "04", title: "Delivery & Installation", desc: "Safe shipment, on-site mounting, cabling, patching, labeling, and network bring-up." },
                { step: "05", title: "Handover & Docs", desc: "Final testing, topology diagrams, configuration backup, serial logs, and warranty documentation." }
              ].map((proc, index) => (
                <div className="hpd-timeline-card" key={index}>
                  <div className="timeline-number">{proc.step}</div>
                  <div className="timeline-content">
                    <h3>{proc.title}</h3>
                    <p>{proc.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="hpd-cta-section" id="contact">
          <div className="hpd-cta-box glass-panel-orange">
            <div className="glow-ring"></div>
            <h2>Need Hardware Procurement?</h2>
            <p>
              Share your BOQ or hardware list — our procurement & engineering team
              will deliver the right equipment with professional installation.
            </p>
            <Link to="/form" className="btn-orange-glow">Contact Us</Link>
          </div>
        </section>

      </div>
      <Footer />
    </>
  );
};

export default HPD;