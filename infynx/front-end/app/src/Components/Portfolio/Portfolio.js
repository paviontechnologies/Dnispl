import React, { useState } from "react";
import "./Portfolio.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Link, useSearchParams } from 'react-router-dom';

const ContentWrapper = ({ children, className }) => (
  <div className={`portfolio-content-wrapper ${className || ""}`}>
    {children}
  </div>
);


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

const Portfolio = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const industryFocus = searchParams.get('industry');

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

            {industryFocus && (
              <div className="industry-lens fade-in-up delay-2">
                <span>Exploring {industryFocus.replace('-', ' ')} infrastructure?</span>
                <Link to="/form">Discuss your environment</Link>
              </div>
            )}

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
          </ContentWrapper>
        </section>

        {/* 2️⃣ FILTERS + PROJECT GRID */}
        <section className="portfolio-projects-section">
          <ContentWrapper>
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
                How we deliver <span className="text-gradient-blue">reliable IT infrastructure</span>.
              </h2>
              <p className="process-intro">
                From network deployment and data centre infrastructure to NOC operations
                and managed IT services, DNISPL combines technical expertise, structured
                project execution, and proactive support to deliver reliable and scalable
                technology environments.
              </p>
            </div>

            <div className="process-right">
              <div className="process-highlight-card glass-panel-blue">
                <p className="highlight-label">Why teams stay with us</p>
                  <ul>
                    <li>Structured planning and transparent communication</li>
                    <li>Experienced network and infrastructure teams</li>
                    <li>End-to-end project coordination and execution</li>
                    <li>Proactive monitoring, support, and maintenance</li>
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
                  Have an IT infrastructure project in mind?
                </h2>
                <p className="final-cta-subtitle">
                  Whether you need enterprise networking, NOC operations, Wi-Fi solutions,
                  data centre infrastructure, managed IT services, or AMC support —
                  DNISPL is ready to help you plan, deploy, and manage reliable technology
                  solutions.
                </p>
                <div className="final-cta-actions">
                <Link to="/form" className="btn-white-solid">Discuss Your Project</Link>
                <Link to="/form" className="btn-outline-white">Request Case Studies</Link>
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