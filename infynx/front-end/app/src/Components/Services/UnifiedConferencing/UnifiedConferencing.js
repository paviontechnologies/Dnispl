import React from "react";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import IndustryStrip from "../../Industries/IndustryStrip";
import "./UnifiedConferencing.css";
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

const TINT = { from: '#6366F1', to: '#00E2F5', glow: 'rgba(99, 102, 241, 0.32)' };

/* Rainbow fan palette for conferencing capabilities */
const PALETTE = [
  { card: '#3B82F6', badge: '#1D4ED8' }, // Blue
  { card: '#10B981', badge: '#047857' }, // Green
  { card: '#F59E0B', badge: '#B45309' }, // Amber
  { card: '#EF4444', badge: '#B91C1C' }, // Red
  { card: '#8B5CF6', badge: '#6D28D9' }, // Purple
  { card: '#EC4899', badge: '#BE185D' }  // Pink
];

const CAPABILITIES = [
  { icon: "🎥", title: "Video Conferencing", desc: "Executive Boardrooms, hybrid classrooms, townhalls, and auditoriums designed for multi-location synchronization." },
  { icon: "👥", title: "Teams & Zoom Rooms", desc: "Native Microsoft Teams Rooms (MTR) and Zoom Rooms integration with certified hardware and scheduling panels." },
  { icon: "🎙️", title: "Beamforming Audio", desc: "DSP-based room audio, beamforming ceiling/table microphone arrays, acoustic echo cancellation, and speech tuning." },
  { icon: "📺", title: "Commercial Displays", desc: "Interactive touch panels, high-brightness commercial displays, LED video walls, and custom mounts." },
  { icon: "📡", title: "Wireless Presentation", desc: "One-touch BYOD screen casting, AirPlay, Miracast, Google Cast, and Barco ClickShare integrations." },
  { icon: "🤖", title: "AI Meeting Assistants", desc: "Intelligent camera tracking, auto-framing, speaker tracking, AI noise cancellation, and automated transcription." }
];

const ROOM_TYPES = [
  { type: "Huddle Spaces", capacity: "2-4 People", gear: "All-in-One USB Video Bar, Touch Control, 4K Display" },
  { type: "Small Meeting Rooms", capacity: "4-6 People", gear: "Native MTR/Zoom Room Compute, Wide-angle AI Camera, Ceiling Mic" },
  { type: "Medium Conference Rooms", capacity: "8-12 People", gear: "PTZ Optical Zoom Camera, Beamforming Mic Pods, Dual 4K Displays" },
  { type: "Executive Boardrooms", capacity: "12-24 People", gear: "Multi-Camera intelligent framing, DSP Processor, Ceiling Arrays, Touch Controls" },
  { type: "Auditoriums & Townhalls", capacity: "50+ People", gear: "AV-over-IP distribution, Wireless Mics, Laser Projector/LED Walls, Line Arrays" }
];

const LIFECYCLE = [
  { step: "01", title: "Consulting & Assessment", desc: "Collaboration assessment, acoustics evaluation, technology roadmapping, and room capacity planning." },
  { step: "02", title: "Custom Room Design", desc: "Room layout modeling, AV system design, CAD wiring schematics, and network bandwidth design." },
  { step: "03", title: "Staging & Implementation", desc: "Certified engineer deployment, compute setup, display calibration, mic tuning, and User Acceptance Testing (UAT)." },
  { step: "04", title: "Training & Adoption", desc: "End-user interactive training, IT administrator governance courses, and scheduling panel setup." },
  { step: "05", title: "Support & SLA Services", desc: "Preventive maintenance, remote health checks, firmware upgrades, and 24x7 AMC onsite engineering support." }
];

const UnifiedConferencing = () => {
  useScrollReveal();

  return (
    <>
      <Header />

      <div className="uc-page-container">

        {/* --- BACKGROUND ANIMATION LAYER --- */}
        <div className="uc-bg-layer">
          <div className="conferencing-grid"></div>
          <div className="collab-glow collab-glow-1"></div>
          <div className="collab-glow collab-glow-2"></div>
        </div>

        {/* HERO SECTION */}
        <section className="uc-hero-section">
          <AuroraBackdrop tint={TINT} />

          <div className="uc-content-wrapper">
            <motion.div
              className="uc-badge"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="dot-pulse-uc"></span> SECURE &amp; INTELLIGENT COLLABORATION
            </motion.div>

            <SplitHeading
              className="uc-hero-title"
              lines={[
                <span className="text-gradient-indigo-uc" key="a">Unified Communications</span>,
                <span className="text-gradient-cyan-uc" key="b">&amp; Smart Collaboration</span>
              ]}
            />

            <motion.p
              className="uc-hero-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              Transform meetings with secure, intelligent hybrid solutions. Connect rooms, desktops,
              and mobile devices seamlessly across Teams, Zoom, Webex, and Google Workspace.
            </motion.p>

            <motion.div
              className="uc-hero-buttons"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.85 }}
            >
              <Link to="/form" className="btn-indigo-glow">Design Your Workspace</Link>
              <a href="#capabilities" className="btn-glass-tech">See Capabilities</a>
            </motion.div>
          </div>
        </section>

        {/* KEY CAPABILITIES */}
        <section className="uc-services-section" id="capabilities">
          <div className="uc-content-wrapper">
            <Reveal className="section-header center">
              <h2 className="text-gradient-indigo-uc">Collaboration Capabilities</h2>
              <div className="uc-title-underline"></div>
            </Reveal>
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

        {/* MEETING ROOM TYPES */}
        <section className="uc-rooms-section">
          <div className="uc-content-wrapper">
            <Reveal className="section-header center">
              <h2>Meeting Room Standards We Deploy</h2>
              <p className="uc-section-desc">From huddle spaces to large-scale townhalls, we optimize audio, video, and control configurations.</p>
            </Reveal>

            <RevealGroup className="uc-rooms-grid">
              {ROOM_TYPES.map((room, i) => (
                <div className="uc-room-card glass-panel" key={i}>
                  <div className="room-icon-wrap">🏢</div>
                  <h3>{room.type}</h3>
                  <span className="room-capacity">{room.capacity}</span>
                  <p className="room-gear"><strong>Core Hardware:</strong> {room.gear}</p>
                </div>
              ))}
            </RevealGroup>
          </div>
        </section>

        {/* 5-STAGE COLLABORATION LIFECYCLE */}
        <section className="uc-process-section">
          <div className="uc-content-wrapper">
            <Reveal as="h2" className="uc-section-title center text-white">Our Implementation Lifecycle</Reveal>

            <RevealGroup className="uc-process-timeline">
              {LIFECYCLE.map((proc, index) => (
                <Reveal
                  className="uc-timeline-card"
                  key={proc.step}
                  dir={index % 2 === 0 ? 'left' : 'right'}
                >
                  <div className="timeline-number-uc">{proc.step}</div>
                  <div className="timeline-content-uc">
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
          title="Sectors trusting our hybrid meeting architecture"
          slugs={['enterprise', 'bfsi', 'manufacturing', 'healthcare', 'education', 'government']}
        />

        {/* CTA SECTION */}
        <section className="uc-cta-section" id="contact">
          <Reveal className="uc-cta-box glass-panel-indigo" dir="scale">
            <div className="glow-ring-uc"></div>
            <h2>Ready to Upgrade Your Hybrid Collaboration?</h2>
            <p>
              Connect with our certified collaboration engineers to perform room audits,
              acoustical assessments, and multi-OEM hardware integration.
            </p>
            <Link to="/form" className="btn-indigo-glow">Contact Our Team</Link>
          </Reveal>
        </section>

      </div>
      <Footer />
    </>
  );
};

export default UnifiedConferencing;
