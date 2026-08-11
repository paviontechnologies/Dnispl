import React from "react";
import "./Leadership.css";
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import ceoImage from '../Images/Rakesh.jpg';
import ashishImage from '../Images/Ashish.jpg';
import awadheshImage from '../Images/Awadhesh.jpg';
import { Link } from 'react-router-dom';
import {
  CountUp,
  Reveal,
  RevealGroup,
  TiltCard,
  useScrollReveal
} from '../../motion/MotionKit';

/* Fan shades for the executive cards — the page's cyan → violet ramp */
const EXEC_PALETTE = [
  { card: '#173FCF', badge: '#12309E' },
  { card: '#6827DA', badge: '#521FAE' },
  { card: '#0E9AA7', badge: '#0B7C87' }
];

const STATS = [
  { icon: '👥', value: '450+', label: 'Enterprise Workforce' },
  { icon: '💻', value: '200+', label: 'Projects Delivered' },
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
    image: ashishImage,
    monogram: 'AM',
    bio: 'Experienced leader with senior roles at Singtel, Airtel, and Hitachi. He brings strong B2B expertise, global digital transformation experience, and CXO-level relationships to drive strategic and sustainable growth.',
    metric: 'Global',
    metricLabel: 'Digital Transformation Leadership'
  },
  {
    role: 'HEAD OF SALES',
    name: 'Awadhesh Gupta',
    image: awadheshImage,
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



      {/* 2️⃣ Executive Leadership & Strategic Vision Section */}
      <section className="ls-about-services-section">
        <ContentWrapper className="ls-about-services-inner">

          {/* Left side text */}
          <Reveal className="ls-about-left" dir="left">
            <p className="section-tag">• EXECUTIVE LEADERSHIP</p>
            <h2 className="ls-about-title">
              Decades of Leadership in <br />
              <span className="text-gradient-blue">IT, Telecom & Infrastructure</span>
            </h2>

            <p className="ls-about-desc">
              Our executive leadership brings over two decades of deep industry experience
              from top global enterprises including Airtel, Singtel, NTT, and Hitachi.
              We lead with strategic foresight, driving large-scale enterprise network deployments,
              digital transformation, and mission-critical infrastructure solutions.
            </p>

            <div className="ls-about-actions">
              <Link to="/about" className="btn-primary-dark">Our Story & Journey</Link>
              <Link to="/contact" className="btn-outline-dark">Connect With Us</Link>
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
                  alt="Leadership team collaborating"
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

        <ContentWrapper>
          <div className="executive-team-grid">
            {EXECUTIVES.map((exec, idx) => (
              <article key={exec.name} className="executive-card">
                <div className="executive-card-image">
                  <img src={exec.image} alt={`${exec.name} — ${exec.role}`} />
                  <div className="executive-card-overlay"></div>
                </div>

                <div className="executive-card-content">
                  <span className="executive-role" style={{ color: EXEC_PALETTE[idx % EXEC_PALETTE.length].card }}>
                    {exec.role}
                  </span>
                  <h3>{exec.name}</h3>
                  <p className="executive-description">{exec.bio}</p>

                  <div className="executive-experience">
                    <span style={{ color: EXEC_PALETTE[idx % EXEC_PALETTE.length].card }}>{exec.metric}</span>
                    <small>{exec.metricLabel}</small>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </ContentWrapper>
      </section>

      <Footer />
    </div>
  );
};

export default Leadership;
