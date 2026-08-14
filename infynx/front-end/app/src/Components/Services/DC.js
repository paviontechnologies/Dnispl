import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./DC.css";
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

const TINT = { from: '#10B981', to: '#22D3EE', glow: 'rgba(16, 185, 129, 0.32)' };

/* Fan shades stay inside the page's green/teal family */
const PALETTE = [
  { card: '#3B82F6', badge: '#1D4ED8' }, // Blue
  { card: '#10B981', badge: '#047857' }, // Green
  { card: '#F59E0B', badge: '#B45309' }, // Amber
  { card: '#EF4444', badge: '#B91C1C' }, // Red
  { card: '#8B5CF6', badge: '#6D28D9' }, // Purple
  { card: '#EC4899', badge: '#BE185D' }  // Pink
];

const SERVICES = [
  { icon: "🌐", title: "Cisco ACI Fabric", desc: "Design and deployment of software-defined, policy-driven Cisco Application Centric Infrastructure (ACI)." },
  { icon: "🔗", title: "Nexus Spine-Leaf Switching", desc: "High-speed leaf-spine network backbones utilizing Cisco Nexus switches for multi-gigabit routing." },
  { icon: "💻", title: "Compute & Virtualization", desc: "Deployment of virtualization clusters, hyperconverged infrastructure (HCI), VMware, and ESXi servers." },
  { icon: "💾", title: "Storage Area Networks (SAN)", desc: "Installation of secure, scalable storage systems and MDS switch configurations." },
  { icon: "🛡️", title: "Micro-Segmentation Security", desc: "East-west traffic protection, perimeter firewalls, and microsegmentation security policies." },
  { icon: "⚙️", title: "Installation & Commissioning", desc: "Active staging, software upgrades, license mapping, and full hardware commissioning." }
];

const PROCESS = [
  { step: "01", title: "Architectural Planning", desc: "Detailed mapping of logical fabrics, tenant requirements, and routing policies." },
  { step: "02", title: "Active Staging", desc: "Pre-staging hardware, software upgrades, firmware patches, and initial config testing." },
  { step: "03", title: "Fabric Deployment", desc: "Leaf-spine physical installation, ACI policy configuration, and routing enablement." },
  { step: "04", title: "Testing & Handover", desc: "Uptime validation, path failover testing, security auditing, and documentation sign-off." }
];

const DC = () => {
  useScrollReveal();

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
          <AuroraBackdrop tint={TINT} />

          <div className="dc-content-wrapper">
            <motion.div
              className="dc-status-badge"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="blink-green">●</span> SYSTEM ONLINE
            </motion.div>

            <SplitHeading
              className="dc-hero-title"
              lines={[
                <span className="text-gradient-green" key="a">Next-Gen DC Active Fabric</span>,
                <span className="text-gradient-green" key="b">&amp; Infrastructure Services</span>
              ]}
            />

            <motion.p
              className="dc-hero-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              Design and implementation of Cisco ACI fabric, leaf-spine switching, compute clusters,
              virtualization, and secure active infrastructure for enterprise data centers.
            </motion.p>

            <motion.div
              className="dc-hero-buttons"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.85 }}
            >
              <Link to="/form" className="btn-green-neon">Request Deployment</Link>
              <a href="#services" className="btn-glass-green">View Capabilities</a>
            </motion.div>
          </div>
        </section>

        {/* WHAT WE OFFER — scroll-driven card fan */}
        <section className="dc-services-section" id="services">
          <div className="dc-content-wrapper">
            <Reveal className="section-header center">
              <h2 className="text-gradient-green">Infrastructure Services</h2>
              <p className="dc-section-desc">Building the backbone of your digital operations.</p>
            </Reveal>
          </div>

          <ScrollFan
            items={SERVICES}
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
        <section className="dc-process-section">
          <div className="dc-content-wrapper">
            <Reveal as="h2" className="dc-section-title center text-white">Deployment Process</Reveal>

            <div className="dc-process-layout">
              <RevealGroup className="dc-process-grid">
                {PROCESS.map((proc) => (
                  <Reveal className="dc-process-card" key={proc.step} dir="scale">
                    <div className="proc-number">{proc.step}</div>
                    <h3>{proc.title}</h3>
                    <p>{proc.desc}</p>
                    <div className="progress-bar"><div className="fill"></div></div>
                  </Reveal>
                ))}
              </RevealGroup>

              {/* Turning globe — pan-India deployment reach */}
              <Reveal dir="right" className="dc-process-visual">
                <OrbitVisual tint={TINT} />
                <p>Deployed and commissioned across 100+ active sites nationwide.</p>
              </Reveal>
            </div>
          </div>
        </section>



        {/* CTA SECTION */}
        <section className="dc-cta-section" id="contact">
          <Reveal className="dc-cta-box glass-panel" dir="scale">
            <div className="scan-line"></div>
            <h2>Ready to Deploy Your Data Center Infrastructure?</h2>
            <p>
              From custom server rooms to hyperscale fabrics — our certified teams
              handle complete active datacenter infrastructure deployment.
            </p>
            <Link to="/form" className="btn-green-neon">Start Project</Link>
          </Reveal>
        </section>

      </div>
      <Footer />
    </>
  );
};

export default DC;
