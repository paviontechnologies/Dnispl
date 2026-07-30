import React, { useState } from "react";
import "./Portfolio.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Link, useSearchParams } from 'react-router-dom';
import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AuroraBackdrop,
  CountUp,
  Reveal,
  RevealGroup,
  SplitHeading,
  useScrollReveal
} from '../../motion/MotionKit';

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

/**
 * Industry lens. The header links to /portfolio?industry=<key>, so every key it
 * advertises has to resolve here — otherwise those nav items land on a page
 * that silently ignores the parameter.
 */
const INDUSTRY_LENS = {
  finance: { label: 'Banking & Finance', blurb: 'Branch connectivity, core banking networks, and SD-WAN estates.' },
  telecom: { label: 'Telecom', blurb: 'NOC operations, nationwide rollouts, and fiber execution.' },
  manufacturing: { label: 'Manufacturing', blurb: 'Plant networks, shop-floor connectivity, and campus links.' },
  healthcare: { label: 'Healthcare', blurb: 'Always-on hospital infrastructure and clinical system uptime.' },
  education: { label: 'Education', blurb: 'Campus Wi-Fi architectures and high-density coverage.' },
  retail: { label: 'Retail', blurb: 'Multi-store networks, VPN backhaul, and POS reliability.' },
  enterprise: { label: 'Enterprise', blurb: 'End-to-end IT infrastructure across distributed offices.' },
  logistics: { label: 'Logistics', blurb: 'Warehouse and fleet connectivity across sites in motion.' },
  hospitality: { label: 'Hospitality', blurb: 'Guest networks, POS, and property-wide coverage.' }
};

const PROJECTS = [
  {
    id: 1,
    title: "DinePOS – Smart POS & Inventory Automation",
    category: "Web",
    industryKey: "hospitality",
    industry: "Hospitality / Restaurants",
    problem:
      "Local restaurants struggled with manual billing, inaccurate inventory, and no visibility on daily sales performance.",
    solution:
      "We built a cloud-based POS with real-time KOT printing, table management, recipe-level inventory deduction, and multi-outlet support.",
    impact: [
      "30% reduction in pilferage and wastage",
      "Real-time sales dashboard for owners across outlets",
      "Integrated GST-compliant invoicing and reports",
    ],
    techStack: "React, Node.js, PostgreSQL, Redis, AWS, Thermal Printer APIs",
    tag: "Product Engineering",
  },
  {
    id: 2,
    title: "Ease Yatrika – School Transport & Booking Platform",
    category: "Mobile",
    industryKey: "education",
    industry: "EdTech / Transportation",
    problem:
      "Parents had no transparency on school cabs location, safety, and billing. Operators managed everything on Excel and WhatsApp.",
    solution:
      "A mobile-first platform for route planning, live GPS tracking, parent notifications, and automated fee collection with reporting.",
    impact: [
      "90% reduction in manual coordination between parents and drivers",
      "Live ETA tracking improved parent satisfaction",
      "Central dashboard for school administrators",
    ],
    techStack: "Flutter, Firebase, Node.js, Google Maps APIs, Razorpay",
    tag: "Mobility & Safety",
  },
  {
    id: 3,
    title: "StockPilot – Multi-Location Inventory Intelligence",
    category: "AI & Automation",
    industryKey: "retail",
    industry: "Retail / Distribution",
    problem:
      "Retailers had multiple warehouses and stores, but no unified, intelligent view of inventory, reorder levels, and dead stock.",
    solution:
      "We developed an AI-driven inventory engine that predicts reorder points, highlights slow-moving SKUs, and optimizes procurement.",
    impact: [
      "Up to 25% reduction in overstocking",
      "Improved fill-rate and on-shelf availability",
      "Unified stock visibility across warehouses and stores",
    ],
    techStack: "React, Python, ML models (time series), MongoDB, Kafka",
    tag: "AI & Analytics",
  },
  {
    id: 4,
    title: "InfraNet360 – PAN India Active & Passive Rollout",
    category: "Network & Infra",
    industryKey: "telecom",
    industry: "Telecom / Enterprise",
    problem:
      "A leading SI required a single partner to execute PAN India network rollouts – including fiber, L2/L3 setup, DC passive work, and audits.",
    solution:
      "DNISPL provided end-to-end implementation: inside-building fiber, Cat-6, electrical, DC passive, L2/L3 configuration, and regulatory audits.",
    impact: [
      "On-time delivery across 50+ cities",
      "Standardized documentation and TRAI-compliant audits",
      "Single-window execution partner for the SI",
    ],
    techStack:
      "Cisco / Juniper switches & routers, Fiber & Cat-6, UPS, DG, DC passive components",
    tag: "Network Rollout",
  },
  {
    id: 5,
    title: "LeadSync – B2B Sales & Marketing Automation Suite",
    category: "Web",
    industryKey: "enterprise",
    industry: "B2B SaaS",
    problem:
      "The client’s sales team used spreadsheets and manual follow-ups, causing lost leads and poor tracking.",
    solution:
      "We built a web-based lead management and automation suite with email workflows, lead scoring, task reminders, and dashboards.",
    impact: [
      "2x increase in qualified follow-ups",
      "Single source of truth for leads and activities",
      "Team performance tracking made transparent",
    ],
    techStack: "Next.js, Node.js, MySQL, Redis, SendGrid, Chart.js",
    tag: "SaaS Platform",
  },
  {
    id: 6,
    title: "Core Banking Network & Branch SD-WAN Estate",
    category: "Network & Infra",
    industryKey: "finance",
    industry: "Banking & Financial Services",
    problem:
      "Branch connectivity ran on ageing MPLS links with no application-level visibility, and every outage became a manual, branch-by-branch investigation.",
    solution:
      "We re-architected the branch edge onto SD-WAN with dual-transport failover, application-aware path selection, centralised policy, and a monitored NOC handover.",
    impact: [
      "400+ branch sites migrated with no unplanned core downtime",
      "Link failover measured in seconds instead of manual re-routes",
      "Single monitoring plane across every branch and the data centre",
    ],
    techStack: "Cisco SD-WAN (vManage), ISR routers, Fortinet NGFW, dual-ISP transport, NOC tooling",
    tag: "Network Transformation",
  },
  {
    id: 7,
    title: "Plant Network Modernisation & Shop-Floor Connectivity",
    category: "Network & Infra",
    industryKey: "manufacturing",
    industry: "Manufacturing",
    problem:
      "Production lines shared a flat network with office traffic, so a single broadcast storm could stall the shop floor, and industrial zones had no segmentation.",
    solution:
      "We segmented OT from IT with policy-enforced VLANs, deployed ruggedised switching across production zones, and rebuilt the fibre backbone between plant blocks.",
    impact: [
      "Production and corporate traffic fully isolated",
      "Redundant ring topology removed the single points of failure",
      "Documented, labelled cable plant with Fluke certification",
    ],
    techStack: "Industrial Ethernet switches, fibre ring backbone, VLAN segmentation, Cisco ISE",
    tag: "OT / IT Convergence",
  },
  {
    id: 8,
    title: "Hospital Infrastructure & Clinical System Uptime",
    category: "Network & Infra",
    industryKey: "healthcare",
    industry: "Healthcare",
    problem:
      "Clinical applications and imaging transfers competed with guest Wi-Fi on the same infrastructure, and there was no redundancy on the paths carrying patient data.",
    solution:
      "We designed a tiered network separating clinical, administrative, and guest traffic, with redundant uplinks, prioritised imaging transfer, and 24/7 monitored support.",
    impact: [
      "Clinical traffic prioritised and isolated from guest load",
      "Redundant paths on every critical ward and imaging link",
      "24/7 NOC coverage with a defined clinical escalation matrix",
    ],
    techStack: "Layer 3 switching, QoS policy, controller-based Wi-Fi, redundant uplinks, NOC monitoring",
    tag: "Mission-Critical Infra",
  },
  {
    id: 9,
    title: "Warehouse & Fleet Connectivity Rollout",
    category: "Network & Infra",
    industryKey: "logistics",
    industry: "Logistics & Warehousing",
    problem:
      "Scanner coverage dropped in high-rack aisles and cold zones, forcing manual stock reconciliation at the end of every shift.",
    solution:
      "We ran predictive and on-site RF surveys, redesigned access-point placement for rack-aisle propagation, and deployed hardened APs across cold and dock zones.",
    impact: [
      "Continuous scanner coverage through high-rack aisles",
      "End-of-shift manual reconciliation effectively eliminated",
      "Repeatable site template rolled out across the warehouse network",
    ],
    techStack: "Predictive RF survey tooling, industrial-grade APs, wireless controllers, PoE switching",
    tag: "Wireless Engineering",
  },
];

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

            <SplitHeading
              className="portfolio-title"
              lines={[
                <span key="a">A portfolio of <span className="text-gradient-blue">products</span> that</span>,
                <span key="b">actually went <span className="text-gradient-purple">live</span>.</span>
              ]}
            />

            <motion.p
              className="portfolio-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              From early-stage MVPs to scaled enterprise platforms, DNISPL
              partners with teams to ship reliable software and robust
              infrastructure — on time, and with full ownership.
            </motion.p>

            {lens && (
              <motion.div
                className="industry-lens"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.72 }}
              >
                <span>{lens.blurb}</span>
                <Link to="/form">Discuss your environment</Link>
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
                {["All", "Web", "Mobile", "AI & Automation", "Network & Infra"].map(
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
                How we turn <span className="text-gradient-blue">ideas</span> into
                production-ready <span className="text-gradient-purple">systems</span>.
              </h2>
              <p className="process-intro">
                DNISPL combines product thinking, engineering excellence, and
                on-ground implementation experience. We don’t just ship code —
                we own outcomes.
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

        {/* 4️⃣ FINAL CTA */}
        <section className="portfolio-final-cta">
          <ContentWrapper className="portfolio-final-inner">
            <Reveal className="cta-box-gradient" dir="scale">
                <h2 className="final-cta-title">
                Let’s add your product to this portfolio.
                </h2>
                <p className="final-cta-subtitle">
                Whether you’re building an MVP, scaling an existing platform, or
                rolling out infra across India — DNISPL can be your partner.
                </p>
                <div className="final-cta-actions">
                <Link to="/form" className="btn-white-solid">Start a conversation</Link>
                <Link to="/form" className="btn-outline-white">Request Case Studies</Link>
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