import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import IndustryStrip from "../Industries/IndustryStrip";
import "./SD.css";
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

const TINT = { from: '#B325F7', to: '#00E2F5', glow: 'rgba(179, 37, 247, 0.32)' };

/* Fan shades stay inside the page's purple/magenta family */
const PALETTE = [
  { card: '#B325F7', badge: '#9B1DD8' },
  { card: '#8B5CF6', badge: '#7040D6' },
  { card: '#E504EE', badge: '#BC03C4' },
  { card: '#7C3AED', badge: '#6329C4' },
  { card: '#A855F7', badge: '#8A44CC' },
  { card: '#6827DA', badge: '#521FAE' }
];

const BUILDS = [
  { icon: "💻", title: "Web Applications", desc: "Modern, secure & high-performance web apps designed for speed, usability, and business automation." },
  { icon: "📱", title: "Mobile Applications", desc: "Cross-platform and native apps built for exceptional user experience and top-tier performance." },
  { icon: "🛒", title: "E-Commerce Platforms", desc: "Custom e-commerce websites tailored to drive revenue, handle scale, and integrate secure payments." },
  { icon: "☁️", title: "Cloud-Powered Apps", desc: "Cloud-native software built for AWS, Azure, and GCP with seamless CI/CD, logging, and automation." },
  { icon: "🧠", title: "AI-Integrated Solutions", desc: "AI-powered tools for chat automation, prediction, computer vision, and real-time data processing." },
  { icon: "🔗", title: "API Development", desc: "Secure, fast, and scalable APIs for your apps, partners, and internal systems integration." }
];

const REASONS = [
  { icon: "⚡", title: "Fast Delivery", desc: "Agile sprints that ensure quick releases without compromising quality." },
  { icon: "🛡️", title: "Secure Architecture", desc: "Industry-standard security practices with encryption and safe deployments." },
  { icon: "📈", title: "Scale-Ready Systems", desc: "Software designed to handle millions of users and high traffic loads effortlessly." },
  { icon: "🤝", title: "Dedicated Support", desc: "Post-deployment monitoring, regular updates, and continuous enhancements." }
];

const SD = () => {
  useScrollReveal();

  return (
    <>
      <Header />

      <div className="sd-page-container">

        {/* --- BACKGROUND ANIMATION LAYER --- */}
        <div className="sd-bg-layer">
          <div className="code-rain"></div>
          <div className="floating-symbol sym-1">{"{ }"}</div>
          <div className="floating-symbol sym-2">{"< >"}</div>
          <div className="floating-symbol sym-3">{"//"}</div>
        </div>

        {/* HERO SECTION */}
        <section className="sd-hero-section">
          <AuroraBackdrop tint={TINT} />

          <div className="sd-content-wrapper">
            <motion.div
              className="sd-badge"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="dot-blink"></span> READY TO SCALE
            </motion.div>

            <SplitHeading
              className="sd-hero-title"
              lines={[
                <span className="text-gradient-purple" key="a">Custom Software</span>,
                <span className="text-gradient-purple" key="b">Development Services</span>
              ]}
            />

            <motion.p
              className="sd-hero-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              We build fast, secure, and scalable applications tailored to your business needs —
              from concept to deployment.
            </motion.p>

            <motion.div
              className="sd-hero-buttons"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.85 }}
            >
              <a href="#contact" className="btn-purple-glow">Start a Project</a>
              <a href="#services" className="btn-glass-purple">Explore Services</a>
            </motion.div>
          </div>
        </section>

        {/* WHAT WE BUILD — scroll-driven card fan */}
        <section className="sd-services-section" id="services">
          <div className="sd-content-wrapper">
            <Reveal className="section-header center">
              <h2 className="text-gradient-purple">What We Build</h2>
              <p className="sd-section-desc">Engineering digital excellence for modern businesses.</p>
            </Reveal>
          </div>

          <ScrollFan
            items={BUILDS}
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

        {/* WHY CHOOSE US SECTION */}
        <section className="sd-why-section">
          <div className="sd-content-wrapper">
            <Reveal as="h2" className="sd-section-title center text-white">Why Choose Us?</Reveal>

            <RevealGroup className="sd-why-grid">
              {REASONS.map((item) => (
                <Reveal className="sd-feature-card fx-wobble-host" key={item.title} dir="scale">
                  <div className="feature-icon-wrapper fx-wobble">{item.icon}</div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </Reveal>
              ))}
            </RevealGroup>
          </div>
        </section>

        {/* Sector cross-links — routes this capability page into the
            industries that buy it. */}
        <IndustryStrip
          tint={TINT}
          title="Sectors we have shipped software for"
          slugs={['hospitality', 'retail', 'education', 'logistics', 'enterprise']}
        />

        {/* CTA SECTION */}
        <section className="sd-cta-section" id="contact">
          <Reveal className="sd-cta-box glass-panel-purple" dir="scale">
            <div className="glow-circle"></div>
            <h2>Ready to Build Your Software?</h2>
            <p>
              Contact us today to get a free consultation and project estimation.
              Let's turn your idea into reality.
            </p>
            <Link to="/form" className="btn-white-pulse">Contact Us</Link>
          </Reveal>
        </section>

      </div>
      <Footer />
    </>
  );
};

export default SD;
