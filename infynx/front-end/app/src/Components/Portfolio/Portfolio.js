import React, { useState } from "react";
import "./Portfolio.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AuroraBackdrop,
  CountUp,
  MagneticButton,
  Reveal,
  RevealGroup,
  SplitHeading,
  useScrollReveal
} from '../../motion/MotionKit';
import { INDUSTRY_LENS } from '../../data/industries';
import { PROJECTS, PROJECT_CATEGORIES } from '../../data/projects';

const TINT = { from: '#00F0FF', to: '#2563EB', glow: 'rgba(0, 240, 255, 0.3)' };

const METRICS = [
  { value: '200+', label: 'Projects Delivered' },
  { value: '8+', label: 'Countries Served' },
  { value: '50+', label: 'Industries' },
  { value: '5.0★', label: 'Avg. Rating' }
];

const ContentWrapper = ({ children, className }) => (
  <div className={`portfolio-content-wrapper ${className || ""}`}>
    {children}
  </div>
);

const Portfolio = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  useScrollReveal();

  const industryKey = (searchParams.get('industry') || '').toLowerCase();
  const lens = INDUSTRY_LENS[industryKey];

  // Industry comes from the URL (header nav), category from the chips — they
  // stack, so an industry lens still respects the chip the visitor picks.
  const industryMatches = industryKey
    ? PROJECTS.filter((p) => p.industryKey === industryKey)
    : PROJECTS;

  const filteredProjects =
    activeFilter === "All"
      ? industryMatches
      : industryMatches.filter((p) => p.category === activeFilter);

  const clearLens = () => {
    const next = new URLSearchParams(searchParams);
    next.delete('industry');
    setSearchParams(next, { replace: true });
    setSelectedProject(null);
  };

  return (
    <>
      <Header />

      <div className="portfolio-page">

        {/* --- BACKGROUND ANIMATION LAYER --- */}
        <div className="portfolio-bg-layer">
            <div className="grid-dots"></div>
            <div className="gradient-orb orb-top"></div>
            <div className="gradient-orb orb-bottom"></div>
        </div>

        {/* 1️⃣ HERO SECTION */}
        <section className="portfolio-hero">
          <AuroraBackdrop tint={TINT} />

          <ContentWrapper>
            <motion.div
              className="portfolio-badge"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="dot-pulse"></span> {lens ? `${lens.label.toUpperCase()} / INDUSTRY LENS` : 'OUR WORK'}
            </motion.div>

            {/* Re-keying on the lens makes the headline replay its split reveal
                when the visitor switches sector, so the page visibly responds
                instead of silently swapping one word. */}
            <SplitHeading
              key={lens ? lens.slug : 'all'}
              className="portfolio-title"
              lines={
                lens
                  ? [
                      <span key="a">
                        <span className="text-gradient-blue">{lens.label}</span> work
                      </span>,
                      <span key="b">that actually went <span className="text-gradient-purple">live</span>.</span>
                    ]
                  : [
                      <span key="a">A portfolio of <span className="text-gradient-blue">products</span> that</span>,
                      <span key="b">actually went <span className="text-gradient-purple">live</span>.</span>
                    ]
              }
            />

            <motion.p
              className="portfolio-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {lens
                ? lens.blurb
                : `From early-stage MVPs to scaled enterprise platforms, DNISPL
                   partners with teams to ship reliable software and robust
                   infrastructure — on time, and with full ownership.`}
            </motion.p>

            {lens && (
              <motion.div
                className="industry-lens"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.72 }}
              >
                <Link to={`/industries/${lens.slug}`} className="lens-back">
                  <ArrowRight size={14} /> Full {lens.label} sector page
                </Link>
                <Link to="/form" className="lens-cta">Discuss your environment</Link>
                <button type="button" className="lens-clear" onClick={clearLens}>
                  <X size={14} /> Show all work
                </button>
              </motion.div>
            )}

            {/* Counters run up as the strip enters view */}
            <RevealGroup className="portfolio-metrics">
              {METRICS.map((metric) => (
                <Reveal key={metric.label} dir="scale" className="metric-card glass-metric">
                  <span className="metric-value"><CountUp value={metric.value} /></span>
                  <span className="metric-label">{metric.label}</span>
                </Reveal>
              ))}
            </RevealGroup>
          </ContentWrapper>
        </section>

        {/* 2️⃣ FILTERS + PROJECT GRID */}
        <section className="portfolio-projects-section">
          <ContentWrapper>
            <Reveal className="portfolio-header-row">
              <h2 className="section-heading">
                {lens ? `${lens.label} Case Studies` : 'Featured Case Studies'}
              </h2>

              <div className="portfolio-filters">
                {PROJECT_CATEGORIES.map(
                  (filter) => (
                    <motion.button
                      key={filter}
                      className={`filter-chip ${
                        activeFilter === filter ? "active" : ""
                      }`}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setActiveFilter(filter);
                        setSelectedProject(null);
                      }}
                    >
                      {filter}
                    </motion.button>
                  )
                )}
              </div>
            </Reveal>

            {/* Cards deal in from alternating sides, and reshuffle when a filter changes */}
            <motion.div className="projects-grid" layout>
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, index) => (
                  <motion.article
                    key={project.id}
                    layout
                    className={`project-card glass-card hover-lift ${
                      selectedProject?.id === project.id ? "expanded" : ""
                    }`}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -70 : 70, y: 30, scale: 0.95 }}
                    whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                    whileHover={{ y: -8 }}
                    exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.22 } }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.65, delay: (index % 3) * 0.09, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() =>
                      setSelectedProject(
                        selectedProject?.id === project.id ? null : project
                      )
                    }
                  >
                    {/* ✨ Shine Element for Hover Effect */}
                    <div className="card-shine"></div>

                    <div className="project-card-header">
                      <div className="project-badge-row">
                        <span className="project-tag">{project.tag}</span>
                        <span className="project-category">
                          {project.category}
                        </span>
                      </div>
                      <h3 className="project-title">{project.title}</h3>
                      <p className="project-industry">
                        Industry: <span>{project.industry}</span>
                      </p>
                    </div>

                    <AnimatePresence initial={false}>
                      {selectedProject?.id === project.id && (
                        <motion.div
                          className="project-body"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1, marginBottom: 20 }}
                          exit={{ height: 0, opacity: 0, marginBottom: 0 }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <div className="body-content">
                            <p className="project-problem">
                              <strong>Problem:</strong> {project.problem}
                            </p>
                            <p className="project-solution">
                              <strong>Solution:</strong> {project.solution}
                            </p>

                            <div className="project-impact">
                              <strong>Impact:</strong>
                              <ul>
                                {project.impact.map((point, idx) => (
                                  <li key={idx}>{point}</li>
                                ))}
                              </ul>
                            </div>

                            <p className="project-techstack">
                              <strong>Tech stack:</strong> {project.techStack}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="project-footer">
                      <button
                        type="button"
                        className="btn-view-case"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProject(
                            selectedProject?.id === project.id ? null : project
                          );
                        }}
                      >
                        {selectedProject?.id === project.id
                          ? "Hide details"
                          : "View Case Study"}
                      </button>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </motion.div>

            {!filteredProjects.length && (
              <motion.div
                className="portfolio-empty"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
              >
                <h3>No published case study matches this combination yet.</h3>
                <p>
                  We have delivered work here that isn’t public — ask us for the
                  relevant references directly.
                </p>
                <div className="portfolio-empty-actions">
                  {activeFilter !== 'All' && (
                    <button type="button" onClick={() => setActiveFilter('All')}>
                      Clear category
                    </button>
                  )}
                  {lens && (
                    <button type="button" onClick={clearLens}>Show all industries</button>
                  )}
                  {/* The sector page carries the capability detail even where no
                      case study is public, so it is the more useful exit. */}
                  {lens && (
                    <Link to={`/industries/${lens.slug}`}>
                      {lens.label} sector page
                    </Link>
                  )}
                  <Link to="/form">Request case studies</Link>
                </div>
              </motion.div>
            )}
          </ContentWrapper>
        </section>

        {/* 3️⃣ DELIVERY APPROACH */}
        <section className="portfolio-process-section">
          <ContentWrapper className="portfolio-process-inner">
            <Reveal className="process-left" dir="left">
              <h2 className="section-heading text-dark">
                How we deliver <span className="text-gradient-blue">reliable IT infrastructure</span>.
              </h2>
              <p className="process-intro">
                From network deployment and data centre infrastructure to NOC operations
                and managed IT services, DNISPL combines technical expertise, structured
                project execution, and proactive support to deliver reliable and scalable
                technology environments.
              </p>
            </Reveal>

            <Reveal className="process-right" dir="right">
              <div className="process-highlight-card glass-panel-blue">
                <p className="highlight-label">Why teams stay with us</p>
                <ul>
                  <li>Transparent communication & weekly check-ins</li>
                  <li>Strong infra + app + network capabilities</li>
                  <li>Hands-on leadership involvement</li>
                  <li>On-time delivery culture</li>
                </ul>
              </div>
            </Reveal>
          </ContentWrapper>
        </section>

        {/* 4️⃣ BROWSE BY SECTOR — the industry pages, not a filter on this one */}
        <section className="portfolio-sectors">
          <ContentWrapper>
            <Reveal className="portfolio-sectors-head">
              <h2 className="section-heading">Browse by sector</h2>
              <p>
                Each sector page carries the pressures we design against and the
                capabilities we bring — including work that isn’t public here.
              </p>
            </Reveal>

            <RevealGroup className="portfolio-sector-chips">
              {Object.values(INDUSTRY_LENS).map((entry) => (
                <Reveal key={entry.slug} dir="scale" className="sector-chip-shell">
                  <Link
                    to={`/industries/${entry.slug}`}
                    className={`sector-chip ${industryKey === entry.slug ? 'current' : ''}`}
                  >
                    {entry.label}
                    <ArrowRight size={14} />
                  </Link>
                </Reveal>
              ))}
            </RevealGroup>
          </ContentWrapper>
        </section>

        {/* 5️⃣ FINAL CTA */}
        <section className="portfolio-final-cta">
          <ContentWrapper className="portfolio-final-inner">
            <Reveal className="cta-box-gradient" dir="scale">
                <h2 className="final-cta-title">
                  Have an IT infrastructure project in mind?
                </h2>
                <p className="final-cta-subtitle">
                  Whether you need enterprise networking, NOC operations, Wi-Fi solutions,
                  data centre infrastructure, managed IT services, or AMC support —
                  DNISPL is ready to help you plan, deploy, and manage reliable technology
                  solutions.
                </p>
                <div className="final-cta-actions">
                <MagneticButton as={Link} to="/form" className="btn-white-solid">
                  Start a conversation
                </MagneticButton>
                <Link to="/industries" className="btn-outline-white">Explore industries</Link>
                </div>
            </Reveal>
          </ContentWrapper>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default Portfolio;