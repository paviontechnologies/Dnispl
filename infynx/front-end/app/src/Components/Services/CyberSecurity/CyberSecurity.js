import React from "react";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import IndustryStrip from "../../Industries/IndustryStrip";
import "./CyberSecurity.css";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  AuroraBackdrop,
  Reveal,
  RevealGroup,
  ScrollFan,
  SplitHeading,
  useScrollReveal
} from '../../../motion/MotionKit';

const TINT = { from: '#00E2F5', to: '#6366F1', glow: 'rgba(0, 226, 245, 0.32)' };

/* Rainbow fan palette for capability cards */
const PALETTE = [
  { card: '#3B82F6', badge: '#1D4ED8' }, // Blue
  { card: '#10B981', badge: '#047857' }, // Green
  { card: '#F59E0B', badge: '#B45309' }, // Amber
  { card: '#EF4444', badge: '#B91C1C' }, // Red
  { card: '#8B5CF6', badge: '#6D28D9' }, // Purple
  { card: '#EC4899', badge: '#BE185D' }  // Pink
];

const SECURITY_CAPABILITIES = [
  { icon: "🛡️", title: "Next-Gen Firewalls (NGFW)", desc: "Deep packet inspection, application-level filtering, and perimeter security with Fortinet, Cisco, and Palo Alto." },
  { icon: "🔒", title: "Zero Trust & SASE", desc: "Identity-aware access, micro-segmentation, and secure edge connectivity powered by Cato Networks and modern SD-WAN." },
  { icon: "⚡", title: "Intrusion Prevention (IPS/IDS)", desc: "Automated threat detection, behavioral anomaly analysis, and instant mitigation of DDoS and zero-day exploits." },
  { icon: "🌐", title: "Endpoint & EDR Solutions", desc: "Real-time endpoint visibility, automated containment, anti-ransomware defenses, and centralized management." },
  { icon: "🔍", title: "VAPT & Security Audits", desc: "Vulnerability assessments, penetration testing, compliance checks against ISO 27001, and remediation roadmaps." },
  { icon: "📊", title: "SIEM & SOC Telemetry", desc: "Log aggregation, centralized security analytics, 24/7 incident response, and continuous compliance monitoring." }
];

const SECURITY_PROCESS = [
  { step: "01", title: "Threat Surface Assessment", desc: "Comprehensive evaluation of exposed perimeter ports, legacy firewall policies, and compliance vulnerabilities." },
  { step: "02", title: "Zero-Trust Architecture", desc: "Designing segmented network zones, encrypted transport tunnels, and granular role-based access rules." },
  { step: "03", title: "Policy Staging & Hardening", desc: "Lab testing rule sets, SSL/TLS decryption policies, IPS signature sets, and anti-malware profiles." },
  { step: "04", title: "Seamless Deployment", desc: "High-availability (HA) cluster cutover with zero downtime, telemetry forwarding to SIEM and SOC desks." },
  { step: "05", title: "Audit & Continuous Protection", desc: "Vulnerability reporting, periodic penetration audits, compliance documentation, and firmware patch cycles." }
];

const CyberSecurity = () => {
  useScrollReveal();

  return (
    <>
      <Header />

      <div className="cs-page-container">

        {/* --- BACKGROUND ANIMATION LAYER --- */}
        <div className="cs-bg-layer">
          <div className="security-grid"></div>
          <div className="shield-glow shield-glow-1"></div>
          <div className="shield-glow shield-glow-2"></div>
        </div>

        {/* HERO SECTION */}
        <section className="cs-hero-section">
          <AuroraBackdrop tint={TINT} />

          <div className="cs-content-wrapper">
            <motion.div
              className="cs-badge"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="dot-pulse-cs"></span> ENTERPRISE CYBER DEFENSE
            </motion.div>

            <SplitHeading
              className="cs-hero-title"
              lines={[
                <span className="text-gradient-cyan" key="a">Enterprise Cyber Security</span>,
                <span className="text-gradient-blue" key="b">&amp; Infrastructure Defense</span>
              ]}
            />

            <motion.p
              className="cs-hero-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              Comprehensive threat defense, next-generation firewall architectures, zero-trust network access,
              and compliance audits engineered to protect mission-critical business assets.
            </motion.p>

            <motion.div
              className="cs-hero-buttons"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.85 }}
            >
              <Link to="/form" className="btn-cyan-glow">Request Security Audit</Link>
              <a href="#capabilities" className="btn-glass-tech">Explore Defenses</a>
            </motion.div>
          </div>
        </section>

        {/* WHAT WE DELIVER — scroll-driven card fan */}
        <section className="cs-services-section" id="capabilities">
          <div className="cs-content-wrapper">
            <Reveal className="section-header center">
              <h2 className="text-gradient-cyan">Security Capabilities We Deploy</h2>
              <div className="cs-title-underline"></div>
            </Reveal>
          </div>

          <ScrollFan
            items={SECURITY_CAPABILITIES}
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
        <section className="cs-process-section">
          <div className="cs-content-wrapper">
            <Reveal as="h2" className="cs-section-title center text-white">Our 5-Stage Security Framework</Reveal>

            <RevealGroup className="cs-process-timeline">
              {SECURITY_PROCESS.map((proc, index) => (
                <Reveal
                  className="cs-timeline-card"
                  key={proc.step}
                  dir={index % 2 === 0 ? 'left' : 'right'}
                >
                  <div className="timeline-number-cs">{proc.step}</div>
                  <div className="timeline-content-cs">
                    <h3>{proc.title}</h3>
                    <p>{proc.desc}</p>
                  </div>
                </Reveal>
              ))}
            </RevealGroup>
          </div>
        </section>

        {/* Sector cross-links */}
        <IndustryStrip
          tint={TINT}
          title="Industries trusting our cyber security architecture"
          slugs={['enterprise', 'retail', 'education', 'government', 'hospitality', 'healthcare']}
        />

        {/* CTA SECTION */}
        <section className="cs-cta-section" id="contact">
          <Reveal className="cs-cta-box glass-panel-cyan" dir="scale">
            <div className="glow-ring-cs"></div>
            <h2>Protect Your Enterprise Against Advanced Threats</h2>
            <p>
              Consult with our certified network security architects to audit your firewall rulebase,
              implement zero-trust controls, and protect your digital estate.
            </p>
            <Link to="/form" className="btn-cyan-glow">Schedule Security Consultation</Link>
          </Reveal>
        </section>

      </div>
      <Footer />
    </>
  );
};

export default CyberSecurity;
