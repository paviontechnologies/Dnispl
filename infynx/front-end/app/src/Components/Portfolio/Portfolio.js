import React, { useState } from "react";
import "./Portfolio.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Link } from 'react-router-dom';

const ContentWrapper = ({ children, className }) => (
  <div className={`portfolio-content-wrapper ${className || ""}`}>
    {children}
  </div>
);

const PROJECTS = [
  {
    id: 1,
    title: "DinePOS – Smart POS & Inventory Automation",
    category: "Web",
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
    title: "LeadSync – B2B Sales & Marketing Automation Suite",
    category: "Web",
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
  
  
];

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects =
    activeFilter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter);

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
          <ContentWrapper>
            <div className="portfolio-badge fade-in-up">
                <span className="dot-pulse"></span> OUR WORK
            </div>
            <h1 className="portfolio-title fade-in-up delay-1">
              A portfolio of <span className="text-gradient-blue">products</span> that
              actually went <span className="text-gradient-purple">live</span>.
            </h1>
            <p className="portfolio-subtitle fade-in-up delay-2">
              From early-stage MVPs to scaled enterprise platforms, DNISPL
              partners with teams to ship reliable software and robust
              infrastructure — on time, and with full ownership.
            </p>

            <div className="portfolio-metrics fade-in-up delay-3">
              <div className="metric-card glass-metric">
                <span className="metric-value">200+</span>
                <span className="metric-label">Projects Delivered</span>
              </div>
              <div className="metric-card glass-metric">
                <span className="metric-value">8+</span>
                <span className="metric-label">Countries Served</span>
              </div>
              <div className="metric-card glass-metric">
                <span className="metric-value">50+</span>
                <span className="metric-label">Industries</span>
              </div>
              <div className="metric-card glass-metric">
                <span className="metric-value">5.0★</span>
                <span className="metric-label">Avg. Rating</span>
              </div>
            </div>
          </ContentWrapper>
        </section>

        {/* 2️⃣ FILTERS + PROJECT GRID */}
        <section className="portfolio-projects-section">
          <ContentWrapper>
            <div className="portfolio-header-row">
              <h2 className="section-heading">Featured Case Studies</h2>

              <div className="portfolio-filters">
                {["All", "Web", "Mobile", "AI & Automation", "Network & Infra"].map(
                  (filter) => (
                    <button
                      key={filter}
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
                  )
                )}
              </div>
            </div>

            <div className="projects-grid">
              {filteredProjects.map((project, index) => (
                <article
                  key={project.id}
                  className={`project-card glass-card hover-lift ${
                    selectedProject?.id === project.id ? "expanded" : ""
                  }`}
                  style={{ animationDelay: `${index * 0.15}s` }} // ✨ This adds the staggered animation
                  onClick={() =>
                    setSelectedProject(
                      selectedProject?.id === project.id ? null : project
                    )
                  }
                >
                  {/* ✨ New Shine Element for Hover Effect */}
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

                  <div className="project-body">
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
                  </div>

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
                </article>
              ))}
            </div>
          </ContentWrapper>
        </section>

        {/* 3️⃣ DELIVERY APPROACH */}
        <section className="portfolio-process-section">
          <ContentWrapper className="portfolio-process-inner">
            <div className="process-left">
              <h2 className="section-heading text-dark">
                How we turn <span className="text-gradient-blue">ideas</span> into
                production-ready <span className="text-gradient-purple">systems</span>.
              </h2>
              <p className="process-intro">
                DNISPL combines product thinking, engineering excellence, and
                on-ground implementation experience. We don’t just ship code —
                we own outcomes.
              </p>
            </div>

            <div className="process-right">
              <div className="process-highlight-card glass-panel-blue">
                <p className="highlight-label">Why teams stay with us</p>
                <ul>
                  <li>Transparent communication & weekly check-ins</li>
                  <li>Strong infra + app + network capabilities</li>
                  <li>Hands-on leadership involvement</li>
                  <li>On-time delivery culture</li>
                </ul>
              </div>

              
              
            </div>
          </ContentWrapper>
        </section>

        {/* 4️⃣ FINAL CTA */}
        <section className="portfolio-final-cta">
          <ContentWrapper className="portfolio-final-inner">
            <div className="cta-box-gradient">
                <h2 className="final-cta-title">
                Let’s add your product to this portfolio.
                </h2>
                <p className="final-cta-subtitle">
                Whether you’re building an MVP, scaling an existing platform, or
                rolling out infra across India — DNISPL can be your partner.
                </p>
                <div className="final-cta-actions">
                <Link to="/form" className="btn-white-solid">Start a conversation</Link>
                <a href="#portfolio" className="btn-outline-white">Request Case Studies</a>
                </div>
            </div>
          </ContentWrapper>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default Portfolio;