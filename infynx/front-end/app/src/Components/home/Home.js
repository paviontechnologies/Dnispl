import React, { useState, useRef } from 'react';
import './Home.css';
import phoneImage from '../Images/infynix/c4-phone.webp';
import phoneGlobe from '../Images/infynix/c4-phone-cirlce.webp';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useScrollReveal, CountUp } from '../../hooks/useScrollReveal';
import { ArrowRight, Phone, Mail, Linkedin } from 'lucide-react';
import { MagneticButton, SpotlightCard } from '../../motion/MotionKit';
import { INDUSTRIES } from '../../data/industries';

// Icons/logos imports
import philipsIcon from '../Images/icons/philips.png';
import paytmIcon from '../Images/icons/paytm.png';
import airtelIcon from '../Images/icons/airtel1.png';
import samsungIcon from '../Images/icons/samsung.png';
import kyndrylIcon from '../Images/icons/Kyndryl.png';
import techMIcon from '../Images/icons/Tech-M1.png';
import panasonicIcon from '../Images/icons/panasonic.png';

//oem logos
import ciscoLogo from '../Images/icons/oem/cisco.png';
import fortinetLogo from '../Images/icons/oem/fortinet.png';
import hpeLogo from '../Images/icons/oem/hpe.png';
import juniperLogo from '../Images/icons/oem/juniper.png';
import lenovoLogo from '../Images/icons/oem/lenovo.png';
import catoLogo from '../Images/icons/oem/cato.png';

/**
 * The theme's signature headline reveal (ftc-split-text): each line sits in an
 * overflow-hidden track and swings up out of 3D perspective, one after another.
 */
const SplitHeading = ({ lines, className }) => (
  <h1 className={className}>
    {lines.map((line, i) => (
      <span className="split-line" key={i}>
        <motion.span
          className="split-inner"
          initial={{ y: '115%', rotateX: -78, opacity: 0 }}
          animate={{ y: '0%', rotateX: 0, opacity: 1 }}
          transition={{ duration: 1.1, delay: 0.2 + i * 0.15, ease: [0.25, 0.46, 0.45, 0.5] }}
        >
          {line}
        </motion.span>
      </span>
    ))}
  </h1>
);

/* Aurora light beams behind the hero — width/offset/hue vary per beam. */
const HERO_BEAMS = [
  { x: 8, w: 2, d: 0, h: 260 }, { x: 15, w: 1, d: 1.4, h: 180 },
  { x: 23, w: 3, d: 0.6, h: 320 }, { x: 30, w: 1, d: 2.1, h: 200 },
  { x: 37, w: 2, d: 1.1, h: 380 }, { x: 44, w: 4, d: 0.3, h: 300 },
  { x: 50, w: 6, d: 1.8, h: 440 }, { x: 57, w: 3, d: 0.9, h: 340 },
  { x: 64, w: 2, d: 2.4, h: 240 }, { x: 71, w: 1, d: 1.2, h: 190 },
  { x: 78, w: 3, d: 0.5, h: 300 }, { x: 86, w: 2, d: 1.9, h: 220 },
  { x: 93, w: 1, d: 0.8, h: 170 }
];

/* Resting pose of each card in the fan, straight from the source theme. */
const FAN_POSE = [
  { rotate: -5.47, y: 0 },
  { rotate: -4.36, y: 26 },
  { rotate: 13.3, y: 0 },
  { rotate: -9, y: 20 },
  { rotate: 7.09, y: 0 },
  { rotate: -11, y: 24 }
];

/**
 * One card in the fan. Starts thrown out to its own side of the viewport and
 * drifts into its resting pose as the section scrolls through — cards left of
 * centre come in from the left, cards right of centre from the right.
 */
const ServiceFanCard = ({ service, index, total, progress }) => {
  const pose = FAN_POSE[index % FAN_POSE.length];
  const offset = index - (total - 1) / 2;

  const x = useTransform(progress, [0, 1], [offset * 340, 0]);
  const y = useTransform(progress, [0, 1], [90, pose.y]);
  const rotate = useTransform(progress, [0, 1], [offset * 10, pose.rotate]);
  const scale = useTransform(progress, [0, 1], [0.82, 1]);
  const opacity = useTransform(progress, [0, 0.35], [0, 1]);

  return (
    <motion.div
      className="service-card-roted"
      style={{ x, y, rotate, scale, opacity, '--counter-rot': `${-pose.rotate}deg` }}
    >
      <div className="service-card">
        <div className="card-num-badge">0{service.num}</div>
        <h3>{service.title}</h3>
        <p>{service.desc}</p>
      </div>
    </motion.div>
  );
};

const Home = () => {
  const [activeTab, setActiveTab] = useState('philosophy');
  useScrollReveal();

  const fanRef = useRef(null);
  const { scrollYProgress: fanProgress } = useScroll({
    target: fanRef,
    offset: ['start end', 'center center']
  });

  // Pointer parallax: feeds the hero's orbs and beams via CSS custom properties.
  const heroRef = useRef(null);
  const handleHeroMove = (e) => {
    const hero = heroRef.current;
    if (!hero) return;
    const rect = hero.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    hero.style.setProperty('--mx', px.toFixed(4));
    hero.style.setProperty('--my', py.toFixed(4));
  };

  const enterpriseSolutions = [
    { title: "Switch & Router", desc: "Enterprise-grade Layer 2/3 switching and routing with high availability setup.", icon: "⚡" },
    { title: "SD-WAN", desc: "Intelligent path control, bandwidth optimization, and application-aware routing.", icon: "🌐" },
    { title: "Meraki/Cisco", desc: "Cloud-managed wireless, switching, and security for distributed sites.", icon: "☁️" },
    { title: "ACI", desc: "Cisco ACI fabric implementation for data center agility and segmentation.", icon: "🏢" },
    { title: "Nexus Spine", desc: "High-speed 10/40/100G switching backbone using Nexus spine-leaf architecture.", icon: "🔗" },
    { title: "AD Migration", desc: "Active Directory setup, upgrade, and secure migration services.", icon: "🔄" },
    { title: "Wireless", desc: "Enterprise Wi-Fi design, planning, survey with controller-based management and seamless roaming.", icon: "📡" }
  ];

  const challenges = [
    { num: "1", title: "Fragmented Vendors & Diffused Accountability", desc: "Multiple vendors for different network segments leads to finger-pointing and delayed resolution during critical outages." },
    { num: "2", title: "Built for Scale, Not Resilience", desc: "Legacy architectures focused on expansion often neglect redundancy, creating single points of failure as the network grows." },
    { num: "3", title: "Operational Skill Gaps (L2/L3/SME)", desc: "Difficulty in retaining high-level expertise internally results in prolonged troubleshooting and dependency on external OEMs." },
    { num: "4", title: "Rising Security & Compliance Exposure", desc: "Expanding perimeters and hybrid work models increase the attack surface, making compliance harder to maintain." },
    { num: "5", title: "High CapEx, Low Outcome Visibility", desc: "Significant investments in hardware without clear visibility into how they translate to improved business continuity." }
  ];

  const philosophy = [
    { title: "Design over Devices", desc: "We prioritize Architecture first, OEM second. The solution drives the hardware choice, not the other way around.", icon: "🎨" },
    { title: "Lifecycle over Projects", desc: "Moving from one-time installs to Build → Operate → Optimize. Continuous improvement is built into the engagement.", icon: "🔁" },
    { title: "Outcome over SLAs", desc: "Focusing on real Business Continuity, not just technical uptime metrics. If the business works, the network works.", icon: "🎯" },
    { title: "People + Process + Platform", desc: "Technology alone fails. We ensure all three move together to create a resilient operational fabric.", icon: "🛡️" }
  ];

  const coreServices = [
    { num: "1", title: "Structured Cabling", desc: "Design & implementation (Cat6, Cat6A, Cat7, FTTH and fiber). Adherence to TIA/EIA, ISO/IEC, and BICSI standards. Fluke and OTDR testing reports with skilled field force for multi-site projects." },
    { num: "2", title: "Enterprise Networking", desc: "LAN/WAN, SD-WAN, SDN, Routing, Switching, Wi-Fi, Cisco ACI, Nexus fabric, Data Center, Cybersecurity, FortiGate NGFW, Cisco ISE, FortiNAC, segmentation, and endpoint security." },
    { num: "3", title: "Professional Services", desc: "NOC management, Project Management, Network Auditing, L1, L2, L3 & SME Services, Manpower and Managed desk services." },
    { num: "4", title: "Managed Services", desc: "SLA-driven AMC, FMS, L1/L2/L3 field services, NOC setup and compliance management." },
    { num: "5", title: "Collaboration & Voice", desc: "Webex, MS Teams, VC rollouts, and IP Telephony solutions for seamless communication." }
  ];

  return (
    <div className="home-container">
      <Header />

      {/* --- HERO SECTION --- */}
      <section className="hero-section" ref={heroRef} onMouseMove={handleHeroMove}>
        {/* Aurora beams + their reflection in the "waterline" */}
        <div className="hero-aurora" aria-hidden="true">
          <div className="beam-field">
            {HERO_BEAMS.map((b, i) => (
              <span
                key={i}
                className="beam"
                style={{ left: `${b.x}%`, width: `${b.w}px`, height: `${b.h}px`, animationDelay: `${b.d}s` }}
              />
            ))}
          </div>
          <div className="hero-waterline"></div>
          <div className="beam-field beam-field-reflection">
            {HERO_BEAMS.map((b, i) => (
              <span
                key={i}
                className="beam"
                style={{ left: `${b.x}%`, width: `${b.w}px`, height: `${b.h * 0.8}px`, animationDelay: `${b.d}s` }}
              />
            ))}
          </div>
        </div>

        {/* 2x2 cube grid, as on the source hero */}
        <div className="hero-cube-grid" aria-hidden="true">
          <span></span><span></span><span></span><span></span>
        </div>

        <div className="glow-orb orb-1"></div>
        <div className="glow-orb orb-2"></div>
        <div className="glow-orb orb-3"></div>

        <div className="hero-content-wrapper">
          <div className="hero-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="tagline-badge"
            >
              <span className="pulse-dot"></span> PAN-INDIA 24/7 MISSION-CRITICAL NETWORKS
            </motion.div>

            <SplitHeading
              className="hero-title"
              lines={[
                'Building Enterprise',
                'Networks That',
                <span className="text-gradient-primary" key="g">Don't Fail</span>,
                'When Business Can’t'
              ]}
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="hero-description"
            >
              Strategic Network Integration & Operations at Scale. We think beyond deployment — into resilience, business outcomes, and 99.99% operational continuity.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.05 }}
              className="hero-actions"
            >
              {/* <Link to="/form" className="btn btn-glow-primary">Request Architecture Audit</Link> */}
              {/* <a href="#expert-consultation" className="btn btn-glass-outline">Speak with a Network Architect</a> */}
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="hero-stats"
            >
              <Link to="/active-locations" className="stat-item glass-pill">
                <span className="check-icon">🏢</span>
                <p><strong>100+</strong> Active Locations</p>
              </Link>
              <Link to="/sparing-warehouses" className="stat-item glass-pill">
                <span className="check-icon">📦</span>
                <p><strong>18</strong> Sparing Warehouses</p>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Vertical contact rail (ftc-hero-4-social) */}
        <motion.div
          className="hero-social"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
        >
          <a href="tel:+911244234805" className="link" aria-label="Call us"><Phone size={20} /></a>
          <a href="mailto:sales@dnispl.com" className="link" aria-label="Email us"><Mail size={20} /></a>
          <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="link" aria-label="LinkedIn"><Linkedin size={20} /></a>
          <span className="rail-title">let’s keep in touch</span>
          <span className="rail-line"></span>
        </motion.div>

        <motion.a
          href="#about-us"
          className="hero-scroll-cue"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <span className="cue-track"><span className="cue-dot"></span></span>
          scroll
        </motion.a>
      </section>

      {/* --- TRUSTED LOGOS MARQUEE --- */}
      <section className="services-tech-icons-marquee">
        <div className="marquee-track">
          {[...Array(2)].map((_, index) => (
            <div key={index} className="marquee-content-1">
              <div className="marquee-item"><img src={philipsIcon} alt="Philips" /></div>
              <div className="marquee-item"><img src={panasonicIcon} alt="Panasonic" /></div>
              <div className="marquee-item"><img src={paytmIcon} alt="Paytm" /></div>
              <div className="marquee-item"><img src={airtelIcon} alt="Airtel" /></div>
              <div className="marquee-item"><img src={samsungIcon} alt="Samsung" /></div>
              <div className="marquee-item"><img src={kyndrylIcon} alt="Kyndryl" /></div>       
              <div className="marquee-item"><img src={techMIcon} alt="Tech Mahindra" /></div>       
            </div>
          ))}
        </div>
      </section>

      {/* --- ENTERPRISE CHALLENGES vs OUR PHILOSOPHY (Interactive Tabs) --- */}
      <section className="philosophy-challenges-section">
        <div className="container-max">
          <div className="section-header center ftc-reveal">
            <span className="section-tag">DNISPL Perspective</span>
            <h2 className="section-title">Solving Enterprise Infrastructure Constraints</h2>
            <div className="toggle-tabs">
              <button 
                className={`tab-toggle-btn ${activeTab === 'challenges' ? 'active' : ''}`}
                onClick={() => setActiveTab('challenges')}
              >
                Enterprise Challenges
              </button>
              <button 
                className={`tab-toggle-btn ${activeTab === 'philosophy' ? 'active' : ''}`}
                onClick={() => setActiveTab('philosophy')}
              >
                Our Philosophy
              </button>
            </div>
          </div>

          <div className="tab-content-container">
            <AnimatePresence mode="wait">
              {activeTab === 'challenges' ? (
                <motion.div 
                  key="challenges"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="challenges-grid"
                >
                  {challenges.map((c) => (
                    <div key={c.num} className="challenge-item-card">
                      <div className="challenge-num">{c.num}</div>
                      <h3>{c.title}</h3>
                      <p>{c.desc}</p>
                    </div>
                  ))}
                </motion.div>
              ) : (
                <motion.div 
                  key="philosophy"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="philosophy-grid"
                >
                  {philosophy.map((p) => (
                    <div key={p.title} className="philosophy-item-card">
                      <div className="philosophy-icon">{p.icon}</div>
                      <h3>{p.title}</h3>
                      <p>{p.desc}</p>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* --- CORE COMPETENCIES & SERVICES --- */}
      <section className="services-section" id="all-services">
        <div className="services-header-content">
          <div className="services-left ftc-reveal ftc-reveal-left">
            <span className="section-tag">Core Services</span>
            <h2 className="section-title">
              <span className="text-gradient-blue">Comprehensive IT Infrastructure</span>
            </h2>
          </div>
          <div className="services-right ftc-reveal ftc-reveal-right">
            <p className="section-desc">
              Tailored capabilities designed for high-availability enterprise networks, structure cabling, and NOC-managed environments.
            </p>
          </div>
        </div>

        <div className="service-cards-grid" ref={fanRef}>
          {coreServices.map((service, index) => (
            <ServiceFanCard
              key={service.num}
              service={service}
              index={index}
              total={coreServices.length}
              progress={fanProgress}
            />
          ))}
        </div>
      </section>

      {/* --- ENTERPRISE NETWORK SOLUTIONS --- */}
      <section className="enterprise-solutions-section">
        <div className="container-max">
          <div className="section-header center ftc-reveal">
            <span className="section-tag">Solutions Portfolio</span>
            <h2 className="section-title">Active Networking & Architectures</h2>
          </div>

          <div className="solutions-grid" data-reveal-group>
            {enterpriseSolutions.map((sol, index) => (
              <div key={index} className="solution-glow-card ftc-reveal">
                <div className="sol-icon-wrapper">{sol.icon}</div>
                <h3>{sol.title}</h3>
                <p>{sol.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- STRUCTURED CABLING SERVICES & PORTFOLIO --- */}
      <section className="structured-cabling-section">
        <div className="container-max">
          <div className="section-header center ftc-reveal">
            <span className="section-tag">Passive Infrastructure</span>
            <h2 className="section-title">Structure Cabling & Data Center Setup</h2>
          </div>

          <div className="cabling-grid" data-reveal-group>
            {[
              { title: "Passive Cabling", desc: "Design, survey and implementation of Cat6/Cat6A/FTTH/Fiber cabling for voice & data.", icon: "🔌" },
              { title: "Server Room Setup", desc: "Rack dressing, patch panel termination, cable manager integration for airflow organization.", icon: "🗄️" },
              { title: "Fiber Splicing & Testing", desc: "Single-mode/multimode fiber splicing, link-loss certification and OTDR testing.", icon: "⚡" },
              { title: "Cable Certification", desc: "Fluke testing, standards compliance documentation, and multi-site certification reports.", icon: "📜" },
              { title: "Raceway & Trunking", desc: "Surface and concealed wiring layouts for industrial plants and corporate towers.", icon: "🛣️" },
              { title: "Network Rack Dressing", desc: "Rack layout planning, structured labeling, cable tagging, and layout drawings.", icon: "🏷️" }
            ].map((cab, idx) => (
              <div key={idx} className="cabling-card ftc-reveal">
                <span className="cab-icon">{cab.icon}</span>
                <h4>{cab.title}</h4>
                <p>{cab.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- INDUSTRIES WE OPERATE IN --- */}
      <section className="home-industries-section" id="industries">
        <div className="container-max">
          <div className="section-header center ftc-reveal">
            <span className="section-tag">Sectors</span>
            <h2 className="section-title">
              Every Sector Breaks Its Network{' '}
              <span className="text-gradient-blue">Differently</span>
            </h2>
            <p className="section-desc">
              A branch estate fails on failover time. A shop floor fails on
              segmentation. Same discipline — different failure mode.
            </p>
          </div>

          <div className="home-industry-grid" data-reveal-group>
            {INDUSTRIES.map((industry) => {
              const Icon = industry.icon;
              return (
                <SpotlightCard
                  key={industry.slug}
                  as={Link}
                  to={`/industries/${industry.slug}`}
                  className="home-industry-card ftc-reveal"
                  style={{ '--fx-1': industry.tint.from, '--fx-2': industry.tint.to }}
                >
                  <span className="home-industry-icon"><Icon size={20} /></span>
                  <span className="home-industry-name">{industry.name}</span>
                  <span className="home-industry-desc">{industry.tagline}</span>
                  <span className="home-industry-go">
                    <ArrowRight size={15} />
                  </span>
                </SpotlightCard>
              );
            })}
          </div>

          <div className="home-industry-cta ftc-reveal">
            <MagneticButton as={Link} to="/industries" className="btn btn-glow-primary">
              Explore all industries
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* --- OPERATIONAL SCALE & METRICS --- */}
      <section className="operational-scale-section">
        <div className="glow-orb orb-4"></div>
        <div className="container-max">
          <div className="scale-layout">
            <div className="scale-left ftc-reveal ftc-reveal-left">
              <span className="section-tag">Operational Scale</span>
              <h2 className="section-title">Execution Capability Across India</h2>
              <p>We deploy managed and active hardware projects seamlessly in major metropolitan hubs and tier-2/3 cities.</p>

              <div className="scale-metrics-grid">
                {[
                  { value: "100+", label: "Active Locations" },
                  { value: "18", label: "Warehouse Hubs" },
                  { value: "2000+", label: "Managed Devices" },
                  { value: "24/7", label: "NOC Support Desk" }
                ].map((metric) => (
                  <div className="metric-box" key={metric.label}>
                    <h3><CountUp value={metric.value} /></h3>
                    <p>{metric.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="scale-visual-col">
              <div className="phone-visual ftc-reveal ftc-reveal-scale">
                <img src={phoneImage} alt="" className="phone-main" />
                <img src={phoneGlobe} alt="" className="phone-circle" />
              </div>

              <div className="scale-right ftc-reveal ftc-reveal-right">
                <h4>Pan-India Execution Network</h4>
                <ul className="scale-features-list">
                  <li><strong>Centralized Governance:</strong> Uniform SLA standards managed from HQ.</li>
                  <li><strong>24/7 Support:</strong> Escalation matrices built for mission-critical banking & defense networks.</li>
                  <li><strong>Strategic Logistics:</strong> Sparing hubs minimize RMA transit times.</li>
                  <li><strong>OEM-Agnostic:</strong> Expertise spanning Cisco, Fortinet, Juniper, HPE, Cato, and Lenovo.</li>
                </ul>
                <div className="coverage-footer">
                  <strong>Main Hubs:</strong> NCR (HQ), Mumbai, Kolkata, Hyderabad, Bangalore, Chennai with active expansion.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- PROOF OF CAPABILITY / CLIENT STORIES --- */}
      <section className="proof-capability-section">
        <div className="container-max">
          <div className="section-header center ftc-reveal">
            <span className="section-tag">Case Proofs</span>
            <h2 className="section-title">Trusted by Enterprise Giants</h2>
          </div>

          <div className="proof-grid" data-reveal-group>
            <div className="proof-card main-highlight ftc-reveal ftc-reveal-left">
              <h3>Aditya Birla Group</h3>
              <p className="proof-lead">Strategic Network & SD-WAN Transformation</p>
              <div className="proof-metric">400+ SD-WAN Deployments</div>
              <ul>
                <li>Centralized monitoring & support architecture</li>
                <li>Consistent nationwide multi-site rollout</li>
                <li>Unified governance and penalty-backed uptime guarantees</li>
              </ul>
            </div>

            <div className="proof-list-side ftc-reveal ftc-reveal-right" data-reveal-group>
              <div className="proof-subcard ftc-reveal">
                <h4>IDBI Bank</h4>
                <p>Core Banking Network Infrastructure & Security Operations.</p>
              </div>
              <div className="proof-subcard ftc-reveal">
                <h4>CBDT</h4>
                <p>Nationwide secure routing, compliance architecture, and vulnerability auditing.</p>
              </div>
              <div className="proof-subcard ftc-reveal">
                <h4>Tech Mahindra</h4>
                <p>Global IT services support desk augmentation with hundreds of L1/L2 resources.</p>
              </div>
              <div className="proof-subcard ftc-reveal">
                <h4>Samsung</h4>
                <p>Active routing/switching connectivity for massive manufacturing facilities and corporate campuses.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- MANAGED SERVICES EXCELLENCE & AMC METRICS --- */}
      <section className="managed-excellence-section">
        <div className="container-max">
          <div className="section-header center ftc-reveal">
            <span className="section-tag">Operational Excellence</span>
            <h2 className="section-title">Resource & Sparing Metrics</h2>
          </div>

          <div className="excellence-grid" data-reveal-group>
            <div className="excellence-card ftc-reveal">
              <h4>Airtel</h4>
              <p>Managed order entry desk with <strong>100+ dedicated resources</strong> deployed for SLA-driven processing.</p>
            </div>
            <div className="excellence-card ftc-reveal">
              <h4>Tech Mahindra</h4>
              <p>Comprehensive managed services desk: <strong>316 L1 engineers</strong> and <strong>55 L2 engineers</strong> globally.</p>
            </div>
            <div className="excellence-card ftc-reveal">
              <h4>CPCL</h4>
              <p>Highly specialized support desk: <strong>7 SME (Subject Matter Experts)</strong> and <strong>20 L1 engineers</strong>.</p>
            </div>
            <div className="excellence-card ftc-reveal">
              <h4>Comprehensive AMC</h4>
              <p>Managing <strong>2,000+ active network devices</strong> including <strong>1,500+ hands & feet assets</strong>.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- PARTNERS --- */}
      <section className="partners-section">
        <div className="container-max center">
          <div className="ftc-reveal">
            <span className="section-tag">Technology Ecosystem</span>
            <h2 className="section-title">Our Technology Partners</h2>
          </div>
          <div className="partners-logos-grid" data-reveal-group>
            <div className="partner-logo-box ftc-reveal ftc-reveal-scale">
              <img src={ciscoLogo} alt="Cisco" />
            </div>
            <div className="partner-logo-box ftc-reveal ftc-reveal-scale">
              <img src={fortinetLogo} alt="Fortinet" />
            </div>
            <div className="partner-logo-box ftc-reveal ftc-reveal-scale">
              <img src={hpeLogo} alt="HPE" />
            </div>
            <div className="partner-logo-box ftc-reveal ftc-reveal-scale">
              <img src={juniperLogo} alt="Juniper Networks" />
            </div>
            <div className="partner-logo-box ftc-reveal ftc-reveal-scale">
              <img src={lenovoLogo} alt="Lenovo" />
            </div>
            <div className="partner-logo-box ftc-reveal ftc-reveal-scale">
              <img src={catoLogo} alt="Cato Networks" />
            </div>
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE DIVERSIFIED/DNISPL --- */}
      <section className="why-choose-us-section" id="expert-consultation">
        <div className="why-header ftc-reveal">
          <div className="why-text">
            <span className="section-tag">Why DNISPL</span>
            <h2 className="section-title">Why Enterprise Leaders Choose <span className="text-gradient-orange">DNISPL</span></h2>
            <p className="section-desc">
              We move beyond simple equipment supply. We design and deliver lifecycle operations with guaranteed SLA performance.
            </p>
          </div>
          <Link to="/form" className="btn btn-glow-primary">Request Architecture Audit</Link>
        </div>

        <div className="reason-cards-grid" data-reveal-group>
          {[
            { title: "Proven Track Record", desc: "Expertise in SD-WAN, NAC, Cisco ACI, NGFW, and Managed Services deployments across India." },
            { title: "Multi-OEM Technical Stack", desc: "Certified capabilities across Cisco, Fortinet, HPE, Juniper, and Cato architectures." },
            { title: "SLA-Backed Resource Pools", desc: "Dedicated L1/L2/L3 engineers and field specialists with robust escalation protocols." },
            { title: "Documentation & Audit Rich", desc: "Every project supported by SoW, RCA, TAT metrics, risk register, and Fluke reports." }
          ].map((item, i) => (
            <div className="reason-card ftc-reveal" key={i}>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- FINAL CALL TO ACTION --- */}
      <section className="final-cta-section">
        <div className="cta-anim-bg"></div>
        <div className="cta-content ftc-reveal">
          <h2 className="final-title">Let's Build Your Resilient Network</h2>
          <p className="final-subtitle">
            Consult with our Solutions Architects today to design fail-safe active & passive infrastructure.
          </p>
          <div className="cta-contact-block">
            <div className="cta-contact-item">
              <span>📧 Email Us</span>
              <strong>sales@dnispl.com</strong>
            </div>
            <div className="cta-contact-item">
              <span>📞 Call Us</span>
              <strong>+91-1244234805 (Tel) / 1800-3135657 (Toll Free)</strong>
            </div>
          </div>
          <Link to="/form" className="btn btn-white-solid">Get In Touch</Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;