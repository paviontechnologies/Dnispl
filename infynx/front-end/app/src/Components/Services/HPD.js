import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./HPD.css";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  AuroraBackdrop,
  Reveal,
  RevealGroup,
  ScrollFan,
  SplitHeading,
  useScrollReveal
} from '../../motion/MotionKit';

const TINT = { from: '#F97316', to: '#FBBF24', glow: 'rgba(249, 115, 22, 0.32)' };

/* Fan shades stay inside the page's orange/amber family */
const PALETTE = [
  { card: '#F97316', badge: '#D0600F' },
  { card: '#EA580C', badge: '#C24A09' },
  { card: '#F59E0B', badge: '#CE8409' },
  { card: '#FB923C', badge: '#D57930' },
  { card: '#D97706', badge: '#B5620A' },
  { card: '#C2410C', badge: '#A03509' }
];

const HARDWARE = [
  { icon: "🔌", title: "Enterprise Switches", desc: "L2/L3 managed switches from Cisco, HP, Juniper, Arista, D-Link, TP-Link, and enterprise OEMs." },
  { icon: "📡", title: "Routers & Firewalls", desc: "Secure routing devices, firewalls, SD-WAN appliances and load balancers procured and configured." },
  { icon: "📶", title: "Wi-Fi Access Points", desc: "Deployment of enterprise Wi-Fi networks with heatmaps, placement planning, mounting, and testing." },
  { icon: "🖧", title: "Network Accessories", desc: "Patch panels, POE injectors, SFP modules, racks, power strips, LAN cables, and accessories." },
  { icon: "💾", title: "Servers & Storage", desc: "Rack servers, NAS, SAN storage, backup servers, and virtualization-ready compute hardware." },
  { icon: "🎛️", title: "Staging & Config", desc: "Hardware unboxing, OS upgrade, license installation, rack mounting, basic configuration & health check." }
];

const PROCESS = [
  { step: "01", title: "Requirement Understanding", desc: "We capture hardware specifications, OEM choice, network architecture, and rack space needs." },
  { step: "02", title: "Procurement & Verification", desc: "Authentic OEM hardware sourcing, invoice validation, warranty check, serial number tracking." },
  { step: "03", title: "Staging & Testing", desc: "OS upgrade, configuration templates, SNMP/SSH setup, VLANs, routing policies and lab testing." },
  { step: "04", title: "Delivery & Installation", desc: "Safe shipment, on-site mounting, cabling, patching, labeling, and network bring-up." },
  { step: "05", title: "Handover & Docs", desc: "Final testing, topology diagrams, configuration backup, serial logs, and warranty documentation." }
];

const HPD = () => {
  useScrollReveal();

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
          <AuroraBackdrop tint={TINT} />

          <div className="hpd-content-wrapper">
            <motion.div
              className="hpd-badge"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="dot-pulse"></span> ENTERPRISE GRADE HARDWARE
            </motion.div>

            <SplitHeading
              className="hpd-hero-title"
              lines={[
                <span className="text-gradient-orange" key="a">IT Hardware Procurement</span>,
                <span className="text-gradient-orange" key="b">&amp; Deployment Services</span>
              ]}
            />

            <motion.p
              className="hpd-hero-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              Reliable sourcing, staging, configuration, and deployment of enterprise-grade
              IT hardware — including switches, routers, firewalls, access points, and more.
            </motion.p>

            <motion.div
              className="hpd-hero-buttons"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.85 }}
            >
              <Link to="/form" className="btn-orange-glow">Request Hardware Quote</Link>
              <a href="#services" className="btn-glass-tech">See What We Provide</a>
            </motion.div>
          </div>
        </section>

        {/* WHAT WE PROCURE — scroll-driven card fan */}
        <section className="hpd-services-section" id="services">
          <div className="hpd-content-wrapper">
            <Reveal className="section-header center">
              <h2 className="text-gradient-orange">Hardware We Procure &amp; Deploy</h2>
              <div className="hpd-title-underline"></div>
            </Reveal>
          </div>

          <ScrollFan
            items={HARDWARE}
            palette={PALETTE}
            renderCard={(item) => (
              <div className="fx-fan-card">
                <div className="fx-fan-badge">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            )}
          />
        </section>

        {/* PROCESS SECTION — steps slide in from alternating sides */}
        <section className="hpd-process-section">
          <div className="hpd-content-wrapper">
            <Reveal as="h2" className="hpd-section-title center text-white">Our Deployment Process</Reveal>

            <RevealGroup className="hpd-process-timeline">
              {PROCESS.map((proc, index) => (
                <Reveal
                  className="hpd-timeline-card"
                  key={proc.step}
                  dir={index % 2 === 0 ? 'left' : 'right'}
                >
                  <div className="timeline-number">{proc.step}</div>
                  <div className="timeline-content">
                    <h3>{proc.title}</h3>
                    <p>{proc.desc}</p>
                  </div>
                </Reveal>
              ))}
            </RevealGroup>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="hpd-cta-section" id="contact">
          <Reveal className="hpd-cta-box glass-panel-orange" dir="scale">
            <div className="glow-ring"></div>
            <h2>Need Hardware Procurement?</h2>
            <p>
              Share your BOQ or hardware list — our procurement &amp; engineering team
              will deliver the right equipment with professional installation.
            </p>
            <Link to="/form" className="btn-orange-glow">Contact Us</Link>
          </Reveal>
        </section>

      </div>
      <Footer />
    </>
  );
};

export default HPD;
