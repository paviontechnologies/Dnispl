import React from 'react';
import {
  Briefcase,
  TrendingUp,
  Globe,
  Server,
  Users,
  Cpu,
  Zap,
  Award
} from 'lucide-react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Link } from 'react-router-dom';
import {
  AuroraBackdrop,
  CountUp,
  Marquee,
  OrbitVisual,
  Reveal,
  RevealGroup,
  ScrollFan,
  SplitHeading,
  TiltCard,
  useScrollReveal
} from '../../motion/MotionKit';

// Import CSS file
import './About.css';

const TINT = { from: '#00F0FF', to: '#8B5CF6', glow: 'rgba(0, 240, 255, 0.32)' };

/* Fan colours pulled from the page's own cyan → violet ramp. */
const PRINCIPLE_PALETTE = [
  { card: '#1D4ED8', badge: '#1740A8' },
  { card: '#8B5CF6', badge: '#7040D6' },
  { card: '#0E9AA7', badge: '#0B7C87' }
];

const PRINCIPLES = [
  {
    title: 'Innovation First',
    icon: '💡',
    points: [
      'Adopt emerging tech pragmatically',
      'Run lightweight spikes & POCs',
      'Continuously refactor for performance',
      'Leverage AI copilots'
    ]
  },
  {
    title: 'Client-Centric',
    icon: '🤝',
    points: [
      'Design with user empathy',
      'Transparent communication',
      'Business-hours support',
      'Clear escalation paths'
    ]
  },
  {
    title: 'Ownership',
    icon: '👑',
    points: [
      'Treat every project like our own',
      'Proactive risk mitigation',
      'Peer reviews & mentoring',
      'Zero key-person risk'
    ]
  }
];

const STORY_FEATURES = [
  { icon: '⚙️', text: 'End-to-End Dev' },
  { icon: '🏗️', text: 'Agile Builds' },
  { icon: '🧠', text: 'Expert Tech Stack' },
  { icon: '🚀', text: 'Enterprise Ready' }
];

const CAPABILITY_STRIP = [
  'Enterprise Networking', 'Structured Cabling', 'Managed NOC', 'SD-WAN',
  'Data Center', 'Cloud Connectivity', 'Cybersecurity', 'AI & Automation',
  'Workforce Outsourcing', 'Regulatory Compliance'
];

const JOURNEY = [
  { side: 'left', year: '2017', yearClass: 'year-navy', title: 'DNISPL is Formed', icon: Briefcase, desc: 'Commences business on 10th February, laying the foundation for network and IT solutions services.' },
  { side: 'right', year: '2018–19', yearClass: 'year-yellow', title: 'Bags Major Orders', icon: Award, desc: 'Delivered large network deployments and audits for enterprise clients across metro cities.' },
  { side: 'left', year: '2019–20', yearClass: 'year-red', title: 'System Integrator', icon: Server, desc: 'Executed multi-location projects with complex networking, cabling, and infrastructure roll-outs.' },
  { side: 'right', year: '2020–21', yearClass: 'year-blue', title: 'DNISPL Network', icon: Globe, desc: 'Formalized DNISPL as a network-first solutions company, scaling remote operations and support.' },
  { side: 'left', year: '2021–22', yearClass: 'year-teal', title: 'New Verticals', icon: Zap, desc: 'Expanded into data-center networking, cloud connectivity, and security-led architectures.' },
  { side: 'right', year: '2022–23', yearClass: 'year-dark-teal', title: 'Tech Mahindra Project', icon: Cpu, desc: '200+ manpower deployed. Installation & Commissioning of 1.5MVA DG Set. AMC for Samsung, SBI Life, etc.' },
  { side: 'left', year: '2023–24', yearClass: 'year-steel-blue', title: 'Manpower Growth', icon: Users, desc: 'Strength increased to over 450. Solutions for fintech firms. Expanded presence in Mumbai & Bangalore.' },
  { side: 'right', year: 'Future', yearClass: 'year-navy', title: 'Global Expansion', icon: TrendingUp, desc: 'Continuing our rapid ascent with AI integration and global strategic partnerships.' }
];

const STATS = [
  { value: '200+', label: 'Projects Delivered' },
  { value: '8+', label: 'Client Countries' },
  { value: '98%', label: 'Retention Rate' },
  { value: '5.0★', label: 'Average Rating' }
];

const LIFE = [
  { title: 'Growth-Driven', desc: 'Mentorship, structured upskilling, and real-world projects.' },
  { title: 'Collaboration', desc: 'Flat hierarchy, open communication, and transparent culture.' },
  { title: 'Fun & Celebrations', desc: 'Festivals, games, off-sites, and reward programs.' },
  { title: 'Work-Life Balance', desc: 'Flexible schedules, hybrid options, and wellness initiatives.' }
];

const ContentWrapper = ({ children, className }) => (
  <div className={`about-content-wrapper ${className || ''}`}>{children}</div>
);

/* Each entry swings in from its own side of the centre rail. */
const TimelineItem = ({ year, yearClass, title, desc, side, icon: Icon }) => (
  <Reveal className={`timeline-item ${side}`} dir={side === 'left' ? 'left' : 'right'}>
    <div className="timeline-marker">
      <Icon size={20} strokeWidth={2.5} />
    </div>
    <div className="timeline-connector"></div>
    <div className="timeline-content glass-card-timeline">
      <span className={`timeline-year ${yearClass}`}>{year}</span>
      <h3 className="timeline-heading">{title}</h3>
      <p>{desc}</p>
    </div>
  </Reveal>
);

const About = () => {
  useScrollReveal();

  return (
    <div className="about-page-container">
      <Header />

      {/* --- HERO SECTION --- */}
      <section className="about-hero-section">
        <AuroraBackdrop tint={TINT} />

        {/* Drifting colour shapes, kept behind the beams */}
        <div className="global-bg-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>

        <ContentWrapper>
          <div className="hero-badge fade-in-up">
            <span className="badge-dot"></span> OUR MISSION
          </div>

          <SplitHeading
            className="about-hero-title"
            lines={[
              'Empowering Digital Growth Through',
              <span className="text-gradient" key="g">Innovation &amp; Trust</span>
            ]}
          />

          <p className="about-hero-description fade-in-up delay-2">
            DNISPL is a technology and IT solutions company delivering reliable,
            scalable, and business-focused solutions across IT infrastructure,
            networking, managed services, software development, and digital
            transformation.
          </p>
        </ContentWrapper>
      </section>

      {/* --- CAPABILITY MARQUEE --- */}
      <section className="about-marquee-section">
        <Marquee items={CAPABILITY_STRIP} speed={42} />
      </section>

      {/* --- OUR STORY --- */}
      <section className="our-story-section">
        <ContentWrapper className="our-story-inner">
          <Reveal className="our-story-left" dir="left">
            <h2 className="section-title">Our Story</h2>
            <p className="our-story-text">
              DNISPL is committed to helping businesses build stronger technology
              foundations and operate with greater efficiency. From IT infrastructure
              and networking to software solutions and managed services, we combine
              technical expertise, execution discipline, and customer-focused support
              to deliver solutions that create measurable business value.
            </p>

            <RevealGroup className="story-features-grid">
              {STORY_FEATURES.map((feature) => (
                <Reveal
                  key={feature.text}
                  dir="scale"
                  className="story-feature glass-card-sm fx-wobble-host"
                >
                  <div className="feature-icon-box fx-wobble">{feature.icon}</div>
                  <div className="story-feature-text">{feature.text}</div>
                </Reveal>
              ))}
            </RevealGroup>

            <div className="story-locations">
              <div className="location-icon-pulse">📍</div>
              <div>
                <p className="location-caption">Serving clients in</p>
                <p className="location-places">India, UAE, USA, UK <span className="location-more">&amp; more</span></p>
              </div>
            </div>
          </Reveal>

          <Reveal className="our-story-right" dir="right">
            <div className="story-visual">
              <div className="story-image-frame">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="DNISPL team collaboration"
                  className="story-main-image"
                />
              </div>
              {/* Turning globe overlapping the frame — Home's phone + globe pairing */}
              <OrbitVisual tint={TINT} rings={2} className="story-globe" />
            </div>
          </Reveal>
        </ContentWrapper>
      </section>

      {/* --- CORE PRINCIPLES (scroll-driven fan) --- */}
      <section className="core-principles-section">
        <ContentWrapper>
          <Reveal className="principles-header center-text">
            <h2 className="section-title text-white">Our Core Principles</h2>
            <p className="section-desc text-gray">The values that drive every line of code we write.</p>
          </Reveal>
        </ContentWrapper>

        <ScrollFan
          items={PRINCIPLES}
          palette={PRINCIPLE_PALETTE}
          renderCard={(principle) => (
            <article className="fx-fan-card principle-fan-card">
              <div className="fx-fan-badge">{principle.icon}</div>
              <h3>{principle.title}</h3>
              <ul className="principle-fan-list">
                {principle.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          )}
        />
      </section>

      {/* --- OUR JOURNEY --- */}
      <section className="our-journey-section">
        <div className="journey-bg-pattern"></div>
        <Cpu className="floating-tech-icon tech-icon-1" />
        <Server className="floating-tech-icon tech-icon-2" />
        <Globe className="floating-tech-icon tech-icon-3" />

        <ContentWrapper>
          <Reveal className="center-text mb-60" style={{ position: 'relative', zIndex: 5 }}>
            <h2 className="section-title">Our Journey</h2>
            <p className="section-desc">From incorporation to product scale—execution-first, outcomes-driven.</p>
          </Reveal>

          <div className="journey-ribbon-timeline">
            {/* Center Line with Laser Beam */}
            <div className="timeline-center-line">
              <div className="timeline-beam"></div>
            </div>

            {JOURNEY.map((entry) => (
              <TimelineItem key={entry.title} {...entry} />
            ))}
          </div>
        </ContentWrapper>
      </section>

      {/* --- STATS SECTION --- */}
      <section className="stats-section">
        <ContentWrapper className="stats-inner">
          <Reveal className="stats-intro" dir="left">
            <h2 className="section-title">Stats That Matter</h2>
            <p>
              At DNISPL Infotech, performance speaks louder than promises. These numbers reflect our sustained delivery excellence.
            </p>
            <Link to="/portfolio" className="link-arrow mt-10" style={{ textDecoration: 'none', color: '#00e2f5', fontWeight: 'bold' }}>
              Explore our case studies →
            </Link>
          </Reveal>

          <RevealGroup className="stats-grid">
            {STATS.map((stat) => (
              <Reveal key={stat.label} dir="scale" className="stat-card">
                <h3 className="stat-value"><CountUp value={stat.value} /></h3>
                <p className="stat-label">{stat.label}</p>
              </Reveal>
            ))}
          </RevealGroup>
        </ContentWrapper>
      </section>

      {/* --- LIFE AT DNISPL --- */}
      <section className="life-at-section">
        <ContentWrapper className="life-at-inner">
          <Reveal className="life-left" dir="left">
            <h2 className="section-title">Discover Life at <span className="text-gradient-blue">DNISPL</span></h2>
            <p className="life-desc">
              We believe great technology is built by great teams. At DNISPL, we
              encourage collaboration, continuous learning, ownership, and a shared
              commitment to delivering meaningful outcomes for our clients.
            </p>
          </Reveal>

          <RevealGroup className="life-right-grid">
            {LIFE.map((item) => (
              <Reveal key={item.title} dir="scale">
                {/* Tilt lives on the wrapper so the card keeps its own hover lift */}
                <TiltCard>
                  <div className="life-card card-hover-effect">
                    <h3 className="life-card-title">{item.title}</h3>
                    <p className="life-card-desc">{item.desc}</p>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </RevealGroup>
        </ContentWrapper>
      </section>

      <section className="final-cta-section">
        <Reveal className="cta-content" dir="scale">
          <h2 className="final-cta-title">Excited to Start?</h2>
          <p className="final-cta-subtitle">
            Contact us directly at <span className="cta-email" style={{ textDecoration: 'underline' }}>account@dnispl.com</span>
          </p>
          <div className="final-cta-actions">
            <Link to="/form" className="btn btn-white">Contact Now</Link>
          </div>
        </Reveal>
      </section>

      <Footer />
    </div>
  );
};

export default About;
