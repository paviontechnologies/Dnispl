import React from "react";
import "./Leadership.css";
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import ceoImage from '../Images/Rakesh.jpg';
import { Lightbulb, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  AuroraBackdrop,
  CountUp,
  Reveal,
  RevealGroup,
  ScrollFan,
  SplitHeading,
  TiltCard,
  useScrollReveal
} from '../../motion/MotionKit';

const TINT = { from: '#00E2F5', to: '#B325F7', glow: 'rgba(0, 226, 245, 0.3)' };

/* Fan shades for the executive cards — the page's cyan → violet ramp */
const EXEC_PALETTE = [
  { card: '#173FCF', badge: '#12309E' },
  { card: '#6827DA', badge: '#521FAE' },
  { card: '#0E9AA7', badge: '#0B7C87' }
];

const STATS = [
  { icon: '👥', value: '10k+', label: 'Users Impacted' },
  { icon: '💻', value: '80+', label: 'Projects Delivered' },
  { icon: '🌍', value: '8+', label: 'Countries Served' },
  { icon: '🎧', value: '24/7', label: 'Client Support' }
];

const EXECUTIVES = [
  {
    role: 'FOUNDER',
    name: 'Rakesh Uniyal',
    image: ceoImage,
    bio: 'Over 2 decades of experience, including a decade with Airtel, with expertise in Management, Operations, Strategic Planning, and Distribution. A seasoned professional with extensive experience in the Telecom and Retail industries.',
    metric: '20+',
    metricLabel: 'Years of Experience'
  },
  {
    role: 'CHIEF EXECUTIVE OFFICER',
    name: 'Ashish Mehra',
    monogram: 'AM',
    bio: 'Experienced leader with senior roles at Singtel, Airtel, and Hitachi. He brings strong B2B expertise, global digital transformation experience, and CXO-level relationships to drive strategic and sustainable growth.',
    metric: 'Global',
    metricLabel: 'Digital Transformation Leadership'
  },
  {
    role: 'HEAD OF SALES',
    name: 'Awadhesh Gupta',
    monogram: 'AG',
    bio: 'Over 2 decades of experience with Airtel, NTT, and Sify. A seasoned Presales Consultant with expertise in IT services, enterprise solutions, client engagement, and business development.',
    metric: '20+',
    metricLabel: 'Years of Experience'
  }
];

const ContentWrapper = ({ children, className }) => (
  <div className={`about-content-wrapper ${className || ""}`}>
    {children}
  </div>
);

const Leadership = () => {
  useScrollReveal();

  return (
    <div className="leadership-page-container">
      <Header />

      {/* --- BACKGROUND ANIMATION LAYER --- */}
      <div className="global-bg-shapes">
        <div className="shape shape-blue"></div>
        <div className="shape shape-purple"></div>
        <div className="shape shape-teal"></div>
      </div>

      {/* 1️⃣ HERO / TOP SECTION */}
      <section className="leadership-section">
        <AuroraBackdrop tint={TINT} />

        <div className="leadership-wrapper">

          {/* LEFT SIDE */}
          <div className="leadership-left">
            <motion.div
              className="leader-badge glass-pill"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <img
                src={ceoImage}
                alt="Managing Director"
                className="leader-avatar"
              />
              <div className="leader-badge-text">
                <p className="leader-name">Rakesh Uniyal</p>
                <p className="leader-role">Managing Director</p>
              </div>
            </motion.div>

            <SplitHeading
              className="leader-title"
              lines={[
                "Let's Build Your Product &",
                <span className="text-gradient" key="a">Scale it Together</span>
              ]}
            />

            <motion.p
              className="leader-desc"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Thanks for connecting. We're a full-stack tech company helping
              startups and SMEs build scalable apps, websites, and automation
              tools — with growth in mind.
            </motion.p>

            <motion.div
              className="leader-buttons"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.75 }}
            >
              <Link to="/form" className="btn-glow">Schedule a Call</Link>
              <a href="tel:+911244234805" className="btn-glass">Call Me Now</a>
            </motion.div>
          </div>

          {/* RIGHT SIDE — portrait circled by turning orbit rings */}
          <motion.div
            className="leadership-right"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.35 }}
          >
            <div className="image-glass-container floating-anim">
              <div className="blob-bg"></div>
              <span className="leader-orbit fx-scope" aria-hidden="true">
                <span className="fx-orbit-ring fx-orbit-ring-1" />
                <span className="fx-orbit-ring fx-orbit-ring-2" />
                <span className="fx-orbit-ring fx-orbit-ring-3" />
              </span>
              <img
                src={ceoImage}
                alt="Rakesh Uniyal"
                className="leader-main-img"
              />

              {/* Floating Decor Elements */}
              <div className="floating-card card-1">
                <Rocket size={22} />
                <p>Growth</p>
              </div>
              <div className="floating-card card-2">
                <Lightbulb size={22} />
                <p>Innovation</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2️⃣ Custom Web, Mobile & AI Development Section */}
      <section className="ls-about-services-section">
        <ContentWrapper className="ls-about-services-inner">

          {/* Left side text */}
          <Reveal className="ls-about-left" dir="left">
            <p className="section-tag">• ABOUT US</p>
            <h2 className="ls-about-title">
              Custom Web, Mobile & <br />
              <span className="text-gradient-blue">AI Development</span>
            </h2>

            <p className="ls-about-desc">
              We're a full-stack tech company helping startups and SMEs build
              scalable apps, websites, and automation tools. With years of
              expertise across multiple industries, our team has delivered
              innovative digital solutions to clients worldwide.
            </p>

            <div className="ls-about-actions">
              <Link to="/about" className="btn-primary-dark">Explore more</Link>
              <Link to="/portfolio" className="btn-outline-dark">View case studies</Link>
            </div>
          </Reveal>

          {/* Right side image */}
          <Reveal className="ls-about-right" dir="right">
            {/* Tilt sits on the wrapper so the card keeps its own rotate-straighten hover */}
            <TiltCard className="ls-image-tilt">
              <div className="ls-image-card">
                <div className="card-shine"></div>
                <img
                  src="https://images.unsplash.com/photo-1553877615-30c73a63bbc4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="Team collaborating"
                  className="ls-about-image"
                />
              </div>
            </TiltCard>
          </Reveal>
        </ContentWrapper>
      </section>

      {/* 3️⃣ Stats Strip — counters run up on entry */}
      <section className="ls-stats-section">
        <ContentWrapper>
          <RevealGroup className="ls-stats-grid">
            {STATS.map((stat) => (
              <Reveal
                key={stat.label}
                dir="scale"
                className="ls-stat-card glass-card fx-wobble-host"
              >
                <div className="stat-icon fx-wobble">{stat.icon}</div>
                <p className="ls-stat-value"><CountUp value={stat.value} /></p>
                <p className="ls-stat-label">{stat.label}</p>
              </Reveal>
            ))}
          </RevealGroup>
        </ContentWrapper>
      </section>

      {/* 4️⃣ LEADERSHIP TEAM — scroll-driven card fan */}
      <section className="executive-team-section">
        <ContentWrapper>
          <Reveal className="executive-team-header">
            <p className="section-tag">• OUR LEADERSHIP</p>
            <h2 className="executive-team-title">
              Meet the Minds Behind <br />
              <span className="text-gradient-blue">Our Vision & Growth</span>
            </h2>
            <p className="executive-team-desc">
              Our leadership team brings decades of experience across telecom,
              technology, digital transformation, operations, strategy, and
              enterprise sales.
            </p>
          </Reveal>
        </ContentWrapper>

        <ScrollFan
          items={EXECUTIVES}
          palette={EXEC_PALETTE}
          keyOf={(exec) => exec.name}
          renderCard={(exec) => (
            <article className="fx-fan-card executive-fan-card">
              <div className="executive-card-image">
                {exec.image ? (
                  <img src={exec.image} alt={`${exec.name} — ${exec.role}`} />
                ) : (
                  <div className="executive-monogram" aria-label={exec.name}>{exec.monogram}</div>
                )}
                <div className="executive-card-overlay"></div>
              </div>

              <div className="executive-card-content">
                <span className="executive-role">{exec.role}</span>
                <h3>{exec.name}</h3>
                <p className="executive-description">{exec.bio}</p>

                <div className="executive-experience">
                  <span>{exec.metric}</span>
                  <small>{exec.metricLabel}</small>
                </div>
              </div>
            </article>
          )}
        />
      </section>

      <Footer />
    </div>
  );
};

export default Leadership;
