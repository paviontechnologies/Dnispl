import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Landmark, RadioTower, Factory, HeartPulse, GraduationCap, ShoppingBag, Database, Building2, Truck, Hotel,
  ArrowRight, Award, CheckCircle2, ChevronRight
} from 'lucide-react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { motion } from 'framer-motion';
import {
  AuroraBackdrop,
  Reveal,
  RevealGroup,
  SplitHeading,
  useScrollReveal
} from '../../motion/MotionKit';
import { NotFound } from '../InfoPage/InfoPage';
import './IndustryPage.css';

const INDUSTRIES_DATA = {
  finance: {
    title: "Banking & Finance",
    tagline: "Branch connectivity and SD-WAN estates",
    theme: { from: '#00F0FF', to: '#2563EB', glow: 'rgba(0, 240, 255, 0.3)' }, // Blue
    icon: Landmark,
    description: "Robust, low-latency, and highly secure network architectures designed for modern financial institutions, corporate branches, and micro-ATMs. Our solutions ensure 100% transaction integrity and regulatory compliance.",
    capabilities: [
      { title: "High-Availability SD-WAN", desc: "Dual-ISP transport failover with active-active path optimization for core banking apps." },
      { title: "Zero-Trust Segmentation", desc: "Micro-segmentation separating guest Wi-Fi, administrative networks, and high-security transactional terminals." },
      { title: "Compliance Audits", desc: "Detailed network architecture audits aligning to PCI-DSS, RBI guidelines, and ISO 27001 standards." },
      { title: "24/7 NOC & SOC", desc: "Proactive threat detection and latency monitoring to prevent transaction delays." },
    ],
    statistics: [
      { value: "400+", label: "Branches Migrated" },
      { value: "99.999%", label: "Core Network Uptime" },
      { value: "0ms", label: "Failover Interruption" }
    ],
    solutions: [
      "Branch Office SD-WAN edge transformation",
      "Secure ATM and kiosk network integration",
      "Core banking switch/router refresh & consolidation",
      "Network compliance audit and remediation"
    ],
    caseStudy: {
      title: "Core Banking Network & Branch SD-WAN Estate",
      problem: "Branch connectivity ran on ageing MPLS links with no application-level visibility, and every outage became a manual, branch-by-branch investigation.",
      solution: "We re-architected the branch edge onto SD-WAN with dual-transport failover, application-aware path selection, centralised policy, and a monitored NOC handover.",
      impact: "400+ branch sites migrated with no unplanned core downtime."
    }
  },
  telecom: {
    title: "Telecom & Service Providers",
    tagline: "NOC, rollouts and fiber operations",
    theme: { from: '#FF007A', to: '#7928CA', glow: 'rgba(255, 0, 122, 0.3)' }, // Pink/Purple
    icon: RadioTower,
    description: "Scale infrastructure rapidly with our end-to-end telecom deployment, fiber rollouts, and active/passive infrastructure management services designed for ISPs and mobile operators.",
    capabilities: [
      { title: "Fiber Optic Rollouts", desc: "FTTH deployment, dark fiber splicing, OTDR testing, and inside-building cabling." },
      { title: "NOC Operations", desc: "24/7 network surveillance, ticket resolution, incident response, and performance reports." },
      { title: "BTS & Site Deployment", desc: "Active equipment installation, commission, electrical work, and battery integration." },
      { title: "Audits & Surveying", desc: "TRAI compliance checks, line-of-sight surveys, RF analysis, and node testing." }
    ],
    statistics: [
      { value: "10k+ km", label: "Fiber Laid & Audited" },
      { value: "24/7/365", label: "NOC Surveillance" },
      { value: "50+ Cities", label: "Rollout Footprint" }
    ],
    solutions: [
      "High-speed fiber backhaul deployment",
      "Inside-building telecom infrastructure commissioning",
      "NOC support outsourcing and L1/L2 escalation",
      "Tower power & battery backup management"
    ],
    caseStudy: {
      title: "InfraNet360 – PAN India Active & Passive Rollout",
      problem: "A leading SI required a single partner to execute PAN India network rollouts – including fiber, L2/L3 setup, DC passive work, and audits.",
      solution: "DNISPL provided end-to-end implementation: inside-building fiber, Cat-6, electrical, DC passive, L2/L3 configuration, and regulatory audits.",
      impact: "On-time delivery across 50+ cities."
    }
  },
  manufacturing: {
    title: "Manufacturing & Industrial",
    tagline: "Plant networks and connectivity",
    theme: { from: '#F59E0B', to: '#EF4444', glow: 'rgba(245, 158, 11, 0.3)' }, // Amber/Red
    icon: Factory,
    description: "OT/IT convergence solutions providing industrial-grade network reliability, shop-floor automation, and secure segmentation. We build resilient backbones for heavy industries.",
    capabilities: [
      { title: "Ruggedized Switching", desc: "Industrial Ethernet deployments designed for high temperatures, dust, and vibration." },
      { title: "Zero Single-Point-of-Failure", desc: "High-speed optical fiber ring topology implementation using ERP/MRP protocols." },
      { title: "OT/IT Firewall Segmentation", desc: "Secure partitioning aligning to the Purdue Model, protecting SCADA and PLC control systems." },
      { title: "Fluke Certified Cabling", desc: "Rigorous testing and structured layout labeling of copper and fiber segments." }
    ],
    statistics: [
      { value: "20+", label: "Smart Plants Configured" },
      { value: "100%", label: "OT/IT Isolation" },
      { value: "5000+", label: "Certified Nodes" }
    ],
    solutions: [
      "Ruggedized industrial-grade WLAN deployment",
      "OT network design, zoning, and isolation",
      "High-bandwidth plant fiber rings",
      "Warehouse-to-plant backbone connectivity"
    ],
    caseStudy: {
      title: "Plant Network Modernisation & Shop-Floor Connectivity",
      problem: "Production lines shared a flat network with office traffic, so a single broadcast storm could stall the shop floor, and industrial zones had no segmentation.",
      solution: "We segmented OT from IT with policy-enforced VLANs, deployed ruggedised switching across production zones, and rebuilt the fibre backbone between plant blocks.",
      impact: "Production and corporate traffic fully isolated with redundant ring topology."
    }
  },
  healthcare: {
    title: "Healthcare & Life Sciences",
    tagline: "Reliable hospital infrastructure",
    theme: { from: '#10B981', to: '#059669', glow: 'rgba(16, 185, 129, 0.3)' }, // Emerald/Green
    icon: HeartPulse,
    description: "Mission-critical healthcare networks built for 100% uptime, high-speed PACS imaging transfer, and isolated patient/clinical traffic. We prioritize connectivity where lives are on the line.",
    capabilities: [
      { title: "Priority QoS policies", desc: "Strict traffic shaping prioritizing patient monitoring systems and imaging data over general load." },
      { title: "Clinical Network Isolation", desc: "VLAN policies partitioning medical IoT, HIS administrative portals, and patient guest networks." },
      { title: "High-Density Wireless", desc: "Continuous roaming coverage for portable telemetry, carts, and tablet-equipped staff." },
      { title: "24/7 NOC Service SLA", desc: "Round-the-clock monitoring with a strict clinical incident escalation matrix." }
    ],
    statistics: [
      { value: "50+", label: "Hospitals Managed" },
      { value: "100%", label: "Telemetry Roaming Coverage" },
      { value: "15 min", label: "Critical Ticket SLA" }
    ],
    solutions: [
      "Hospital-wide high-density wireless infrastructure",
      "Network segmentation and HIPAA compliance",
      "Monitored network uplinks with automated failovers",
      "PACS server-to-ward network optimization"
    ],
    caseStudy: {
      title: "Hospital Infrastructure & Clinical System Uptime",
      problem: "Clinical applications and imaging transfers competed with guest Wi-Fi on the same infrastructure, and there was no redundancy on the paths carrying patient data.",
      solution: "We designed a tiered network separating clinical, administrative, and guest traffic, with redundant uplinks, prioritised imaging transfer, and 24/7 monitored support.",
      impact: "Clinical traffic prioritised and isolated from guest load with zero downtime."
    }
  },
  education: {
    title: "Education & Campus Networks",
    tagline: "Campus Wi-Fi architectures",
    theme: { from: '#8B5CF6', to: '#3B82F6', glow: 'rgba(139, 92, 246, 0.3)' }, // Violet/Blue
    icon: GraduationCap,
    description: "High-density, campus-wide wireless networking, digital classroom connectivity, and secure access management for schools, colleges, and universities.",
    capabilities: [
      { title: "High-Density WLAN", desc: "Controller-managed wireless architectures to handle thousands of concurrent student devices." },
      { title: "Captive Portal Auth", desc: "User-level authentication and directory integrations for students, faculty, and guests." },
      { title: "Campus Fiber Ring", desc: "Multi-gigabit backbone connecting administrative halls, libraries, and hostels." },
      { title: "Traffic Management", desc: "Bandwidth throttling and content filtering policies to keep academic tools prioritized." }
    ],
    statistics: [
      { value: "15+", label: "Large Campuses Wired" },
      { value: "50k+", label: "Active Student Users" },
      { value: "10G", label: "Backbone Speeds" }
    ],
    solutions: [
      "Campus-wide high-density outdoor Wi-Fi",
      "Classroom and lab structured cabling",
      "Centralized firewall and web filtering",
      "Smart card / LDAP server integrations"
    ],
    caseStudy: {
      title: "Ease Yatrika – School Transport & Booking Platform",
      problem: "Parents had no transparency on school cabs location, safety, and billing. Operators managed everything on Excel and WhatsApp.",
      solution: "A mobile-first platform for route planning, live GPS tracking, parent notifications, and automated fee collection with reporting.",
      impact: "90% reduction in manual coordination between parents and drivers."
    }
  },
  retail: {
    title: "Retail & Multi-Store",
    tagline: "Multi-store networks and VPNs",
    theme: { from: '#0EA5E9', to: '#2563EB', glow: 'rgba(14, 165, 233, 0.3)' }, // Sky/Blue
    icon: ShoppingBag,
    description: "Fast, reliable, and secure point-of-sale (POS) connectivity, store-to-cloud VPNs, and guest hotspot management for retail chains and distribution networks.",
    capabilities: [
      { title: "Secure POS Connectivity", desc: "IPSec VPN backhauls and SD-WAN links protecting transactions and customer details." },
      { title: "LTE/Cellular Backup", desc: "Automated failover protocols ensuring stores stay online even when primary ISP goes down." },
      { title: "Hotspot Engagement", desc: "Captive portal guest Wi-Fi with social login and marketing insights integration." },
      { title: "Branch Deployments", desc: "Rapid rollout playbooks to spin up new store networks in days." }
    ],
    statistics: [
      { value: "1200+", label: "Retail Stores Wired" },
      { value: "100%", label: "POS Transaction Security" },
      { value: "5 Days", label: "Avg. Store Setup Time" }
    ],
    solutions: [
      "Multi-store secure VPN configurations",
      "In-store guest Wi-Fi and marketing portals",
      "LTE/Cellular secondary link integrations",
      "Automated stock-reconciliation networks"
    ],
    caseStudy: {
      title: "StockPilot – Multi-Location Inventory Intelligence",
      problem: "Retailers had multiple warehouses and stores, but no unified, intelligent view of inventory, reorder levels, and dead stock.",
      solution: "We developed an AI-driven inventory engine that predicts reorder points, highlights slow-moving SKUs, and optimizes procurement.",
      impact: "Up to 25% reduction in overstocking with unified stock visibility."
    }
  },
  "data-centers": {
    title: "Data Centers",
    tagline: "ACI, Nexus fabric and audits",
    theme: { from: '#10B981', to: '#22D3EE', glow: 'rgba(16, 185, 129, 0.3)' }, // Green/Cyan
    icon: Database,
    description: "Next-generation software-defined networking, leaf-spine architectures (Cisco ACI/Nexus), and complete physical passive audits. We design and build datacenter backbones.",
    capabilities: [
      { title: "Nexus & ACI Deployment", desc: "Installation, policy configuration, and scaling of software-defined leaf-spine fabrics." },
      { title: "Containment Systems", desc: "Design and install of hot/cold aisle containments, fiber runners, and tray paths." },
      { title: "Physical Passive Work", desc: "Structured optical fiber splicing, dressing, labelling, and patch panel mapping." },
      { title: "DC Site Audits", desc: "Detailed cooling efficacy maps, load audits, electrical balancing checks, and inventory logs." }
    ],
    statistics: [
      { value: "30+", label: "DC Fabrics Configured" },
      { value: "50k+", label: "Fitted Rack Units" },
      { value: "Fluke", label: "Certified Cabling" }
    ],
    solutions: [
      "Nexus switch deployment and virtualization",
      "Complete passive rack grooming and tray styling",
      "Environment and security audit remediation",
      "Smart-hands local datacenter operations"
    ],
    caseStudy: {
      title: "InfraNet360 – PAN India Active & Passive Rollout",
      problem: "A leading SI required a single partner to execute PAN India network rollouts – including fiber, L2/L3 setup, DC passive work, and audits.",
      solution: "DNISPL provided end-to-end implementation: inside-building fiber, Cat-6, electrical, DC passive, L2/L3 configuration, and regulatory audits.",
      impact: "On-time delivery across 50+ cities."
    }
  },
  enterprise: {
    title: "Enterprise IT Infrastructure",
    tagline: "End-to-end IT infrastructure",
    theme: { from: '#6366F1', to: '#4F46E5', glow: 'rgba(99, 102, 241, 0.3)' }, // Indigo/Violet
    icon: Building2,
    description: "Scalable corporate office network deployments, cloud-ready architectures, collaboration infrastructure, and modern security posture built for distributed enterprise workforces.",
    capabilities: [
      { title: "Zero-Trust Network Access", desc: "Identity-aware access control replacing traditional corporate perimeter VPNs." },
      { title: "Enterprise WLAN", desc: "Controller-based corporate wireless networks with seamless roaming and security keys." },
      { title: "Structured Server Rooms", desc: "Neat, label-certified, and ventilated rack layouts with power and link failovers." },
      { title: "Collaboration Networks", desc: "VoIP, video conference QoS shaping, and unified communication link prioritization." }
    ],
    statistics: [
      { value: "80+", label: "Enterprise Headquarters Wired" },
      { value: "100k+", label: "Corporate Users Empowered" },
      { value: "99.99%", label: "Access Link Availability" }
    ],
    solutions: [
      "HQ and branch office active infrastructure setups",
      "Unified Communications/VoIP trunk configuration",
      "Enterprise firewall and endpoint protection deployment",
      "Network optimization for cloud application workloads"
    ],
    caseStudy: {
      title: "Enterprise HQ & Branch SD-WAN Rollout",
      problem: "A multi-site corporate enterprise suffered frequent link failures on legacy WAN links, stalling collaboration tools and access to cloud services.",
      solution: "We deployed dual-ISP path redundancy, standardized firewall policies, and implemented SD-WAN edge routing with centralized policy control.",
      impact: "Real-time path failover, reduced latency, and unified network visibility."
    }
  },
  logistics: {
    title: "Logistics & Warehousing",
    tagline: "Warehouse and fleet connectivity",
    theme: { from: '#EAB308', to: '#D97706', glow: 'rgba(234, 179, 8, 0.3)' }, // Yellow/Orange
    icon: Truck,
    description: "Warehouse wireless engineering, barcode scanner coverage optimization, and fleet monitoring network integrations. We keep logistics hubs running without connectivity dropouts.",
    capabilities: [
      { title: "RF Surveys", desc: "Detailed active and predictive wireless propagation mapping for high-rack warehouse layouts." },
      { title: "Hardened Wireless APs", desc: "Industrial-grade hardware designed for cold storage, high humidity, and open yards." },
      { title: "Seamless Roaming Policies", desc: "Custom network roaming thresholds ensuring handheld scanners do not drop links." },
      { title: "Redundant WAN Failover", desc: "Secondary link failovers to keep remote centers reporting status live." }
    ],
    statistics: [
      { value: "80+", label: "Warehouses Surveyed & Wired" },
      { value: "99.98%", label: "Scanner Connection Reliability" },
      { value: "0ms", label: "AP Roaming Delay" }
    ],
    solutions: [
      "Warehouse-grade wireless site designs",
      "Rugged network rack setups in harsh climates",
      "LTE/Sat-link secondary connection setups",
      "Fleet tracker server and telemetry network integrations"
    ],
    caseStudy: {
      title: "Warehouse & Fleet Connectivity Rollout",
      problem: "Scanner coverage dropped in high-rack aisles and cold zones, forcing manual stock reconciliation at the end of every shift.",
      solution: "We ran predictive and on-site RF surveys, redesigned access-point placement for rack-aisle propagation, and deployed hardened APs across cold and dock zones.",
      impact: "Continuous scanner coverage through high-rack aisles and manual reconciliation eliminated."
    }
  },
  hospitality: {
    title: "Hospitality",
    tagline: "Guest networks, POS and coverage",
    theme: { from: '#C084FC', to: '#22D3EE', glow: 'rgba(192, 132, 252, 0.30)' },
    icon: Hotel,
    description: "In hospitality, the network is part of the product. We design and implement robust Wi-Fi, secure POS networks, and property-wide coverage.",
    capabilities: [
      { title: "Property-wide Wi-Fi", desc: "Surveyed in-room, corridor, and back-of-house coverage with seamless roaming." },
      { title: "Guest network isolation", desc: "Guest access with no adjacency to POS, property management, or administrative systems." },
      { title: "POS Backhaul prioritization", desc: "Dedicated low-latency pathways prioritizing transactional and card reader traffic." },
      { title: "Structured Server Closets", desc: "Neat, label-certified, and ventilated rack layouts with power and link failovers." }
    ],
    statistics: [
      { value: "100%", label: "POS Transaction Reliability" },
      { value: "0ms", label: "Guest Wi-Fi Roaming Latency" },
      { value: "100%", label: "Guest Network Isolation" }
    ],
    solutions: [
      "Property-wide surveyed Wi-Fi coverage",
      "Guest network isolation and gateway setup",
      "POS backend network link optimization",
      "Dedicated administrative network segmentation"
    ],
    caseStudy: {
      title: "Luxury Hotel Network & Guest Wi-Fi Modernization",
      problem: "Aged wireless APs could not handle concurrent guest connections in conference halls, and POS transactions were failing during peak checkout times.",
      solution: "Deployed high-density controller-managed Wi-Fi with band steering, isolated guest traffic via secure VLANs, and configured QoS to prioritize POS and PMS systems.",
      impact: "100% guest Wi-Fi coverage across all rooms and zero POS transaction failures."
    }
  },
  government: {
    title: "Government & PSU",
    tagline: "Secure routing and audit compliance",
    theme: { from: '#38BDF8', to: '#6366F1', glow: 'rgba(56, 189, 248, 0.30)' },
    icon: Landmark,
    description: "Secure nationwide routing, compliance architecture, and audit closure. We standardise routing and hardening baselines across regional government offices.",
    capabilities: [
      { title: "Standardised baselines", desc: "One routing and hardening standard applied across every regional office, documented and version-controlled." },
      { title: "Vulnerability & config audit", desc: "Per-site scanning and configuration compliance checks against the agreed baseline." },
      { title: "Secure nationwide routing", desc: "Segmented, policy-controlled routing between regions with secure remote access." },
      { title: "Compliance register", desc: "Findings tracked to closure with an owner and a date, in a form that survives audit handover." }
    ],
    statistics: [
      { value: "One", label: "Hardening Baseline" },
      { value: "Tracked", label: "Audit Closure Process" },
      { value: "7 SME", label: "Engineers Supporting CPCL" }
    ],
    solutions: [
      "Nationwide routing standardization",
      "Per-site vulnerability compliance mapping",
      "SME & L1 resourcing against strict SLAs",
      "As-built compliant risk register documentation"
    ],
    caseStudy: {
      title: "Secure Routing & Compliance Audit Programme",
      problem: "A nationwide department ran regional offices on inconsistent configurations, so every audit cycle turned into a fresh discovery exercise with no baseline to compare against.",
      solution: "We standardised routing and hardening baselines across regions, ran vulnerability and configuration audits per site, and delivered a compliance register that survives audit handover.",
      impact: "One hardening baseline applied across all regional offices with accepted documentation packs."
    }
  }
};

const IndustryPage = () => {
  const { industryKey } = useParams();
  const data = INDUSTRIES_DATA[industryKey?.toLowerCase()];

  useScrollReveal();

  if (!data) {
    return <NotFound />;
  }

  const IndustryIcon = data.icon;
  const TINT = data.theme;

  return (
    <>
      <Header />

      <div className="ind-page-container">
        {/* --- BACKGROUND ANIMATION LAYER --- */}
        <div className="ind-bg-layer">
          <div className="ind-grid-dots"></div>
          <div className="ind-glow-spot spot-1" style={{ background: `radial-gradient(circle, ${TINT.glow} 0%, transparent 60%)` }}></div>
          <div className="ind-glow-spot spot-2" style={{ background: `radial-gradient(circle, ${TINT.glow} 0%, transparent 60%)` }}></div>
        </div>

        {/* 1️⃣ HERO SECTION */}
        <section className="ind-hero-section">
          <AuroraBackdrop tint={TINT} />

          <div className="ind-content-wrapper">
            <motion.div
              className="ind-status-badge"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{ color: TINT.from, borderColor: `${TINT.from}44`, background: `${TINT.from}11`, display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <IndustryIcon size={14} />
              SECTOR HIGHLIGHT / {data.title.toUpperCase()}
            </motion.div>

            <SplitHeading
              className="ind-hero-title"
              lines={[
                <span className="text-gradient" style={{ backgroundImage: `linear-gradient(135deg, ${TINT.from} 0%, ${TINT.to} 100%)` }} key="a">
                  {data.title} Networks
                </span>,
                <span className="text-white" key="b">Engineered For Resilience</span>
              ]}
            />

            <motion.p
              className="ind-hero-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              {data.description}
            </motion.p>

            <motion.div
              className="ind-hero-buttons"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.85 }}
            >
              <Link to="/form" className="btn-neon" style={{
                background: `linear-gradient(135deg, ${TINT.from} 0%, ${TINT.to} 100%)`,
                boxShadow: `0 4px 20px ${TINT.glow}`
              }}>
                Consult Our Engineers
              </Link>
              <a href="#capabilities" className="btn-glass" style={{ borderColor: TINT.from, color: TINT.from }}>
                View Capabilities
              </a>
            </motion.div>
          </div>
        </section>

        {/* 2️⃣ METRICS STRIP */}
        <section className="ind-metrics-section">
          <div className="ind-content-wrapper">
            <RevealGroup className="ind-metrics-grid">
              {data.statistics.map((stat, i) => (
                <Reveal key={i} dir="scale" className="ind-metric-card">
                  <span className="ind-metric-value" style={{
                    backgroundImage: `linear-gradient(135deg, ${TINT.from} 0%, ${TINT.to} 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>
                    {stat.value}
                  </span>
                  <span className="ind-metric-label">{stat.label}</span>
                </Reveal>
              ))}
            </RevealGroup>
          </div>
        </section>

        {/* 3️⃣ CAPABILITIES SECTION */}
        <section className="ind-capabilities-section" id="capabilities">
          <div className="ind-content-wrapper">
            <Reveal className="section-header">
              <span className="section-tag" style={{ color: TINT.from }}>Capabilities</span>
              <h2 className="section-heading">How We Empower {data.title}</h2>
              <p className="section-desc">Tailored operational and engineering solutions to secure and sustain your connectivity.</p>
            </Reveal>

            <div className="ind-cards-grid">
              {data.capabilities.map((cap, index) => (
                <Reveal key={index} dir="left" className="ind-glass-card hover-lift-ind">
                  <div className="ind-icon-box" style={{ color: TINT.from, borderColor: `${TINT.from}33`, background: `${TINT.from}11` }}>
                    <CheckCircle2 size={20} />
                  </div>
                  <h3>{cap.title}</h3>
                  <p>{cap.desc}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 4️⃣ SOLUTIONS LIST & CASE STUDY SIDE-BY-SIDE */}
        <section className="ind-solutions-section">
          <div className="ind-content-wrapper">
            <div className="ind-solutions-layout">
              {/* Left: Solution Bullets */}
              <Reveal dir="left" className="ind-solutions-left">
                <span className="section-tag" style={{ color: TINT.from }}>Services Portfolio</span>
                <h2 className="section-heading text-white">Specific Solutions</h2>
                <div className="ind-solutions-list">
                  {data.solutions.map((sol, index) => (
                    <div className="ind-solution-item" key={index}>
                      <ChevronRight size={18} style={{ color: TINT.from }} />
                      <span>{sol}</span>
                    </div>
                  ))}
                </div>
              </Reveal>

              {/* Right: Case Study Spotlight Card */}
              <Reveal dir="right" className="ind-case-spotlight">
                <div className="spotlight-card glass-panel" style={{ borderColor: `${TINT.from}33` }}>
                  <div className="spotlight-badge" style={{ color: TINT.from, background: `${TINT.from}11` }}>
                    <Award size={14} /> FEATURED CASE STUDY
                  </div>
                  <h3 className="spotlight-title text-white">{data.caseStudy.title}</h3>
                  
                  <div className="spotlight-content">
                    <p><strong>The Challenge:</strong> {data.caseStudy.problem}</p>
                    <p><strong>Our Approach:</strong> {data.caseStudy.solution}</p>
                    <p className="spotlight-impact" style={{ color: TINT.from }}>
                      <strong>Business Impact:</strong> {data.caseStudy.impact}
                    </p>
                  </div>

                  <div className="spotlight-action">
                    <Link to={`/portfolio?industry=${industryKey}`} className="btn-spotlight" style={{ color: TINT.from }}>
                      Explore All Case Studies <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 5️⃣ CALL TO ACTION */}
        <section className="ind-cta-section">
          <div className="ind-content-wrapper">
            <Reveal className="ind-cta-box glass-panel-ind" dir="scale" style={{
              border: `1px solid ${TINT.from}44`,
              boxShadow: `0 20px 50px rgba(0, 0, 0, 0.5), 0 0 30px ${TINT.glow}`,
              background: `linear-gradient(135deg, ${TINT.from}15 0%, rgba(8, 9, 13, 0.4) 100%)`
            }}>
              <h2>Need a High-Resilience {data.title} Architecture?</h2>
              <p>
                From initial site surveys and RF planning to active configuration and 24/7 operations,
                our engineering teams deliver standard-compliant, zero-downtime environments.
              </p>
              <Link to="/form" className="btn-white-ind">
                Start Technical Discussion <ArrowRight size={16} />
              </Link>
            </Reveal>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default IndustryPage;
