import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import IndustryStrip from "../Industries/IndustryStrip";
import "./AP.css";
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

const TINT = { from: '#00E2F5', to: '#2563EB', glow: 'rgba(0, 226, 245, 0.32)' };

/* Fan shades stay inside the page's cyan/blue family */
const PALETTE = [
  { card: '#0891B2', badge: '#067289' },
  { card: '#06B6D4', badge: '#0592AB' },
  { card: '#0EA5E9', badge: '#0B84BB' },
  { card: '#2AC5DD', badge: '#22A3B6' },
  { card: '#0284C7', badge: '#02699E' },
  { card: '#38BDF8', badge: '#2C97C7' }
];

const CAPABILITIES = [
  { icon: "🧵", title: "Fiber Optic Installation", desc: "End-to-end OFC laying, splicing, termination, and testing for backbone, distribution, and access networks." },
  { icon: "🔌", title: "Electrical & Power Setup", desc: "DB panels, power cabling, earthing, DG & UPS integration to ensure clean, reliable power for your IT load." },
  { icon: "🛰️", title: "L2 / L3 Network Configuration", desc: "Switching, routing, VLANs, QoS, redundancy and security policies on Cisco, Juniper, HP and other OEMs." },
  { icon: "📷", title: "Cat-6 & Surveillance Cabling", desc: "Structured cabling for workstations, Wi-Fi APs and IP cameras with proper labeling, patching, and rack dressing." },
  { icon: "🏢", title: "Inside Building Implementation", desc: "End-to-end IBMS / IBW / passive rollout inside corporate offices, campuses, DCs and retail outlets." },
  { icon: "🌐", title: "PAN India Rollouts", desc: "Standardized deployment process across cities with central governance, reporting, and SLA-driven execution." }
];

const PROCESS = [
  { step: "01", title: "Site Survey & Audit", desc: "Detailed assessment of existing infra, power, cabling routes, rack space and safety compliance." },
  { step: "02", title: "Solution Design & BOQ", desc: "We design active + passive architecture, prepare BOM/BOQ and share clear implementation plans and timelines." },
  { step: "03", title: "Deployment & Configuration", desc: "On-ground teams execute cabling, mounting, patching, configuration and end-to-end connectivity checks." },
  { step: "04", title: "Testing, Handover & Support", desc: "Performance testing, documentation, sign-off and post-implementation support with defined SLAs." }
];

const AP = () => {
  useScrollReveal();

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
          <AuroraBackdrop tint={TINT} />

          <div className="ap-content-wrapper center-text">
            <SplitHeading
              className="ap-hero-title"
              lines={[
                <span key="a">End-to-End <span className="text-gradient-cyan">Active &amp; Passive</span></span>,
                'Network Implementation'
              ]}
            />

            <motion.p
              className="ap-hero-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              We design, deploy, and maintain robust network infrastructure — from fiber and
              electrical to L2/L3 configuration, Wi-Fi, and surveillance-ready Cat-6 cabling.
            </motion.p>

            <motion.div
              className="ap-hero-buttons"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.78 }}
            >
              <Link to="/form" className="btn-cyan-glow">Discuss Your Network Project</Link>
              <a href="#services" className="btn-glass-outline">View Capabilities</a>
            </motion.div>
          </div>
        </section>

        {/* WHAT WE DELIVER — scroll-driven card fan */}
        <section className="ap-services-section" id="services">
          <div className="ap-content-wrapper">
            <Reveal as="h2" className="ap-section-title center">What We Deliver</Reveal>
          </div>

          <ScrollFan
            items={CAPABILITIES}
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

        {/* HOW WE WORK SECTION */}
        <section className="ap-process-section">
          <div className="ap-content-wrapper">
            <Reveal as="h2" className="ap-section-title center text-white">
              How We Execute Your Network Projects
            </Reveal>

            <div className="ap-process-layout">
              <RevealGroup className="ap-process-grid">
                {PROCESS.map((proc) => (
                  <Reveal className="ap-process-card" key={proc.step} dir="scale">
                    <span className="ap-step">{proc.step}</span>
                    <h3>{proc.title}</h3>
                    <p>{proc.desc}</p>
                    <div className="card-border-bottom"></div>
                  </Reveal>
                ))}
              </RevealGroup>

              {/* Turning globe — the pan-India rollout footprint */}
              <Reveal dir="right" className="ap-process-visual">
                <OrbitVisual tint={TINT} />
                <p>Standardized rollouts governed centrally, executed across 100+ locations.</p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Sector cross-links — routes this capability page into the
            industries that buy it. */}
        <IndustryStrip
          tint={TINT}
          title="Sectors we build networks for"
          slugs={['enterprise', 'finance', 'telecom', 'manufacturing', 'healthcare', 'education']}
        />

        {/* CTA SECTION */}
        <section className="ap-cta-section" id="contact">
          <Reveal className="ap-cta-content glass-panel" dir="scale">
            <h2>Need Active &amp; Passive Network Experts?</h2>
            <p>
              Share your site details, rollout plan or BOQ — our team will help you
              design and execute a reliable network foundation.
            </p>
            <Link to="/form" className="btn-cyan-glow">Contact Us</Link>
          </Reveal>
        </section>

      </div>
      <Footer />
    </div>
  );
};

export default AP;
