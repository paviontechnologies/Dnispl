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

<<<<<<< HEAD

  const PROJECTS = [
    {
      id: 1,
      title: "PAN India Enterprise Network Rollout",
      category: "Network & Infra",
      industry: "Telecom / Enterprise",
      problem:
        "The client required a reliable implementation partner to execute large-scale network infrastructure deployment across multiple locations with consistent quality and documentation.",
      solution:
        "DNISPL delivered end-to-end network rollout services including site coordination, structured cabling, fiber connectivity, L2/L3 implementation, equipment installation, configuration support, testing, and documentation.",
      impact: [
        "Successful deployment across multiple locations",
        "Standardized implementation and documentation process",
        "Improved network reliability and operational readiness",
        "Single-window execution and project coordination"
      ],
      techStack:
        "Cisco / Juniper Infrastructure, Fiber Optics, Cat-6, L2/L3 Networking, Structured Cabling",
      tag: "Network Rollout"
    },

    {
      id: 2,
      title: "Enterprise NOC & 24×7 Network Monitoring",
      category: "NOC & Managed Services",
      industry: "Enterprise / Telecom",
      problem:
        "The client needed continuous monitoring and faster incident response to maintain network availability and minimize service disruptions.",
      solution:
        "DNISPL provided NOC operations with proactive network monitoring, incident detection, ticket management, escalation handling, SLA tracking, and coordination with on-site engineering teams.",
      impact: [
        "24×7 proactive network monitoring",
        "Faster incident detection and escalation",
        "Improved SLA compliance and service availability",
        "Centralized visibility of network operations"
      ],
      techStack:
        "NOC Operations, Network Monitoring, Incident Management, SLA Management, L1/L2/L3 Support",
      tag: "NOC Operations"
    },

    {
      id: 3,
      title: "Cisco Network Upgrade & Migration",
      category: "Network & Infra",
      industry: "Enterprise / Data Centre",
      problem:
        "The existing network infrastructure required hardware refresh, IOS upgrades, configuration migration, and controlled implementation with minimal downtime.",
      solution:
        "DNISPL supported network upgrade and migration activities including device installation, configuration backup, IOS upgrade, configuration deployment, validation, testing, and post-change monitoring.",
      impact: [
        "Modernized network infrastructure",
        "Controlled migration with planned downtime",
        "Improved network performance and stability",
        "Validated configuration and post-upgrade health checks"
      ],
      techStack:
        "Cisco Catalyst 9200 / 9300 Series, IOS-XE, L2/L3 Switching, Routing, VLAN, STP",
      tag: "Network Upgrade"
    },

    {
      id: 4,
      title: "Enterprise Wi-Fi Survey & Deployment",
      category: "Wi-Fi Solutions",
      industry: "Enterprise / Corporate",
      problem:
        "The client required reliable wireless coverage across a large environment with proper capacity planning and minimal dead zones.",
      solution:
        "DNISPL provided professional Wi-Fi site survey and deployment support including coverage analysis, RF planning, heatmap analysis, access point placement recommendations, and implementation support.",
      impact: [
        "Improved wireless coverage and connectivity",
        "Reduced Wi-Fi dead zones",
        "Optimized access point placement",
        "Better user experience and network capacity planning"
      ],
      techStack:
        "Ekahau AI Pro, Wi-Fi Site Survey, RF Analysis, Heatmaps, Enterprise Access Points",
      tag: "Wi-Fi Solutions"
    },

    {
      id: 5,
      title: "L1 / L2 / L3 Managed Network Support",
      category: "Managed Services",
      industry: "Enterprise / BFSI / Telecom",
      problem:
        "The client needed skilled technical resources to manage day-to-day network operations, troubleshooting, incident resolution, and escalation management.",
      solution:
        "DNISPL provided dedicated L1, L2, L3, and SME-level support for network operations, troubleshooting, configuration changes, incident resolution, and coordination with technology vendors.",
      impact: [
        "Dedicated technical support coverage",
        "Faster troubleshooting and incident resolution",
        "Reduced operational workload for internal IT teams",
        "Structured escalation and vendor coordination"
      ],
      techStack:
        "L1 / L2 / L3 Support, Network Troubleshooting, Routing, Switching, Vendor Coordination",
      tag: "Managed IT Services"
    },

    {
      id: 6,
      title: "IT Infrastructure AMC & Preventive Maintenance",
      category: "AMC & Support",
      industry: "Enterprise / Corporate",
      problem:
        "The client required ongoing maintenance and technical support to reduce infrastructure downtime and ensure operational continuity.",
      solution:
        "DNISPL delivered AMC-based infrastructure support covering preventive maintenance, troubleshooting, hardware checks, incident management, and on-site technical assistance.",
      impact: [
        "Reduced unexpected infrastructure downtime",
        "Regular preventive maintenance activities",
        "Faster on-site technical response",
        "Improved infrastructure availability"
      ],
      techStack:
        "IT Infrastructure, Network Devices, Preventive Maintenance, On-site Support, AMC",
      tag: "AMC Support"
    },

    {
      id: 7,
      title: "Data Centre Active & Passive Infrastructure",
      category: "Data Centre",
      industry: "Enterprise / Telecom",
      problem:
        "The project required structured implementation of data centre infrastructure with proper cabling, rack organization, connectivity, and documentation.",
      solution:
        "DNISPL supported data centre infrastructure activities including structured cabling, fiber connectivity, rack installation, patching, labeling, cable management, and implementation documentation.",
      impact: [
        "Organized and structured data centre environment",
        "Improved cable management and traceability",
        "Standardized infrastructure documentation",
        "Simplified future maintenance and troubleshooting"
      ],
      techStack:
        "Fiber Optics, Cat-6, Racks, Patch Panels, Structured Cabling, Cable Management",
      tag: "Data Centre"
    },

    {
      id: 8,
      title: "Multi-Site IT Project Management",
      category: "Project Management",
      industry: "Enterprise / Telecom",
      problem:
        "Large-scale deployments required centralized coordination between customers, vendors, field engineers, and multiple project stakeholders.",
      solution:
        "DNISPL managed project execution through planning, resource coordination, site readiness tracking, vendor coordination, deployment monitoring, documentation, and project closure.",
      impact: [
        "Improved coordination across project stakeholders",
        "Better visibility into project milestones",
        "Centralized project tracking and reporting",
        "Structured deployment and project closure"
      ],
      techStack:
        "Project Planning, Resource Management, Vendor Coordination, Site Management, Reporting",
      tag: "Project Management"
    }
  ];

=======
>>>>>>> b9d58bf141ed5a6e141dfcf9e4c8fb380e9086dd
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

<<<<<<< HEAD
  const filteredProjects = PROJECTS.filter((project) => {
  const categoryMatch =
    activeFilter === "All" ||
    project.category === activeFilter;

  const industryMatch =
    !industryFocus ||
    project.industry
      .toLowerCase()
      .includes(industryFocus.toLowerCase());

  return categoryMatch && industryMatch;
});
=======
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
>>>>>>> b9d58bf141ed5a6e141dfcf9e4c8fb380e9086dd

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
<<<<<<< HEAD
          <ContentWrapper>
            <div className="portfolio-badge fade-in-up">
              <span className="dot-pulse"></span> {industryFocus ? `${industryFocus.toUpperCase()} / INDUSTRY LENS` : 'OUR WORK'}
            </div>
            <h1 className="portfolio-title fade-in-up delay-1">
              Infrastructure that keeps <span className="text-gradient-blue">Business connected</span>.
            </h1>
            <p className="portfolio-subtitle fade-in-up delay-2">
              From enterprise network deployments and NOC operations to Wi-Fi,
              data centre infrastructure, and managed IT services — DNISPL delivers
              reliable technology solutions built for performance, scale, and continuity.
            </p>
=======
          <AuroraBackdrop tint={TINT} />
>>>>>>> b9d58bf141ed5a6e141dfcf9e4c8fb380e9086dd

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

<<<<<<< HEAD
            <div className="portfolio-metrics fade-in-up delay-3">
              <div className="metric-card glass-metric">
                <span className="metric-value">200+</span>
                <span className="metric-label">Projects Delivered</span>
              </div>
              <div className="metric-card glass-metric">
                <span className="metric-value">24×7</span>
                <span className="metric-label">NOC & Support</span>
              </div>
              <div className="metric-card glass-metric">
                <span className="metric-value">L1-L3</span>
                <span className="metric-label">Technical expertise</span>
              </div>
              <div className="metric-card glass-metric">
                <span className="metric-value">PAN INDIA</span>
                <span className="metric-label">Deployment capability</span>
              </div>
            </div>
=======
            {/* Counters run up as the strip enters view */}
            <RevealGroup className="portfolio-metrics">
              {METRICS.map((metric) => (
                <Reveal key={metric.label} dir="scale" className="metric-card glass-metric">
                  <span className="metric-value"><CountUp value={metric.value} /></span>
                  <span className="metric-label">{metric.label}</span>
                </Reveal>
              ))}
            </RevealGroup>
>>>>>>> b9d58bf141ed5a6e141dfcf9e4c8fb380e9086dd
          </ContentWrapper>
        </section>

        {/* 2️⃣ FILTERS + PROJECT GRID */}
        <section className="portfolio-projects-section">
          <ContentWrapper>
<<<<<<< HEAD
            <div className="portfolio-header-row">
              <h2 className="section-heading">
                Featured Case Studies
              </h2>
                 {/* INDUSTRY FILTER */}
              <div className="industry-filter-wrapper">
                <label htmlFor="industry-filter">
                  Filter by Industry
                </label>
                <select id="industry-filter" value={industryFocus || ""} onChange={(e) => {
                  const value = e.target.value;
                  setSearchParams(
                     value
                     ? { industry: value }
                     : {}
                    );
=======
            <Reveal className="portfolio-header-row">
              <h2 className="section-heading">
                {lens ? `${lens.label} Case Studies` : 'Featured Case Studies'}
              </h2>
>>>>>>> b9d58bf141ed5a6e141dfcf9e4c8fb380e9086dd

                  setSelectedProject(null);
                }}>
                  <option value="" className="filter-option">
                    All Industries
                  </option>
                  <option value="Telecom">Telecom</option>
                  <option value="Enterprise">Enterprise</option>
                  <option value="Corporate">Corporate</option>
                  <option value="BFSI">BFSI</option>
                  <option value="Data Centre">Data Centre</option>
                </select>
              </div>

              {/* CATEGORY FILTER */}
              <div className="portfolio-filters">
<<<<<<< HEAD
                {[
                  "All",
                  "Network & Infra",
                  "NOC & Managed Services",
                  "Wi-Fi Solutions",
                  "Managed Services",
                  "AMC & Support",
                  "Data Centre",
                  "Project Management",
                ].map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    className={`filter-chip ${
                      activeFilter === filter ? "active" : ""
                    }`}
                    onClick={() => {
                      setActiveFilter(filter);
                      setSelectedProject(null);
                    }}
                  >
                    {filter}
                  </button>
                ))}
=======
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
>>>>>>> b9d58bf141ed5a6e141dfcf9e4c8fb380e9086dd
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
<<<<<<< HEAD
                  <ul>
                    <li>Structured planning and transparent communication</li>
                    <li>Experienced network and infrastructure teams</li>
                    <li>End-to-end project coordination and execution</li>
                    <li>Proactive monitoring, support, and maintenance</li>
                  </ul>
              </div> 
            </div>
=======
                <ul>
                  <li>Transparent communication & weekly check-ins</li>
                  <li>Strong infra + app + network capabilities</li>
                  <li>Hands-on leadership involvement</li>
                  <li>On-time delivery culture</li>
                </ul>
              </div>
            </Reveal>
>>>>>>> b9d58bf141ed5a6e141dfcf9e4c8fb380e9086dd
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
<<<<<<< HEAD
                <Link to="/form" className="btn-white-solid">Discuss Your Project</Link>
                <Link to="/form" className="btn-outline-white">Request Case Studies</Link>
=======
                <MagneticButton as={Link} to="/form" className="btn-white-solid">
                  Start a conversation
                </MagneticButton>
                <Link to="/industries" className="btn-outline-white">Explore industries</Link>
>>>>>>> b9d58bf141ed5a6e141dfcf9e4c8fb380e9086dd
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