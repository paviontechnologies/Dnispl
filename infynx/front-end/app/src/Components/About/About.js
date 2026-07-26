import React, { useEffect } from 'react';
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

// Import CSS file
import './About.css'; 

const ContentWrapper = ({ children, className }) => (
  <div className={`about-content-wrapper ${className || ''}`}>{children}</div>
);

const TimelineItem = ({ year, yearClass, title, desc, side, icon: Icon, delay }) => (
  <div className={`timeline-item ${side} reveal-on-scroll`} style={{ transitionDelay: `${delay}s` }}>
    <div className="timeline-marker">
      <Icon size={20} strokeWidth={2.5} />
    </div>
    <div className="timeline-connector"></div>
    <div className="timeline-content glass-card-timeline">
      <span className={`timeline-year ${yearClass}`}>{year}</span>
      <h3 className="timeline-heading">{title}</h3>
      <p>{desc}</p>
    </div>
  </div>
);

const About = () => {
  // Setup Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.15 } // Trigger when 15% visible
    );

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="about-page-container">
      {/* Header Placeholder */}
      <Header/>

      {/* --- HERO SECTION --- */}
      <section className="about-hero-section">
        {/* Animated Shapes */}
        <div className="global-bg-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>

        <ContentWrapper>
          <div className="hero-badge fade-in-up">
             <span className="badge-dot"></span> OUR MISSION
          </div>
          <h1 className="about-hero-title fade-in-up delay-1">
            Empowering Digital Growth Through <br />
            <span className="text-gradient">Innovation & Trust</span>
          </h1>
          <p className="about-hero-description fade-in-up delay-2">
            At DNISPL Infotech, we believe technology should be an enabler, not a hurdle. We are dedicated
            to delivering human-centric, resilient, and scalable digital solutions that transform ambitious
            ideas into market-leading products.
          </p>
        </ContentWrapper>
      </section>

      {/* --- OUR STORY --- */}
      <section className="our-story-section">
        <ContentWrapper className="our-story-inner">
          <div className="our-story-left fade-in-up delay-2">
            <h2 className="section-title">Our Story</h2>
            <p className="our-story-text">
              Incorporated in 2022 and operational since 2023, DNISPL Infotech engineers reliable web,
              mobile, network and AI solutions for Indian and global businesses. We operate with a
              client-first mindset—clear communication, predictable delivery, and engineering
              transparency.
            </p>

            <div className="story-features-grid">
              <div className="story-feature glass-card-sm">
                <div className="feature-icon-box">⚙️</div>
                <div className="story-feature-text">End-to-End Dev</div>
              </div>
              <div className="story-feature glass-card-sm">
                <div className="feature-icon-box">🏗️</div>
                <div className="story-feature-text">Agile Builds</div>
              </div>
              <div className="story-feature glass-card-sm">
                <div className="feature-icon-box">🧠</div>
                <div className="story-feature-text">Expert Tech Stack</div>
              </div>
              <div className="story-feature glass-card-sm">
                <div className="feature-icon-box">🚀</div>
                <div className="story-feature-text">Enterprise Ready</div>
              </div>
            </div>

            <div className="story-locations">
              <div className="location-icon-pulse">📍</div>
              <div>
                <p className="location-caption">Serving clients in</p>
                <p className="location-places">India, UAE, USA, UK <span className="location-more">& more</span></p>
              </div>
            </div>
          </div>

          <div className="our-story-right fade-in-up delay-2">
            <div className="story-image-frame">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="DNISPL team collaboration"
                className="story-main-image"
              />
            </div>
          </div>
        </ContentWrapper>
      </section>

      {/* --- CORE PRINCIPLES --- */}
      <section className="core-principles-section">
        <ContentWrapper>
          <div className="principles-header center-text">
             <h2 className="section-title text-white">Our Core Principles</h2>
             <p className="section-desc text-gray">The values that drive every line of code we write.</p>
          </div>

          <div className="principles-grid">
            <article className="principle-card card-hover-effect">
              <div className="principle-card-top">
                <h3 className="principle-heading">Innovation First</h3>
                <div className="icon-box-principle">💡</div>
              </div>
              <ul className="principle-list">
                <li>Adopt emerging tech pragmatically</li>
                <li>Run lightweight spikes & POCs</li>
                <li>Continuously refactor for performance</li>
                <li>Leverage AI copilots</li>
              </ul>
            </article>

            <article className="principle-card card-hover-effect">
              <div className="principle-card-top">
                <h3 className="principle-heading">Client-Centric</h3>
                <div className="icon-box-principle">🤝</div>
              </div>
              <ul className="principle-list">
                <li>Design with user empathy</li>
                <li>Transparent communication</li>
                <li>Business-hours support</li>
                <li>Clear escalation paths</li>
              </ul>
            </article>

            <article className="principle-card card-hover-effect">
              <div className="principle-card-top">
                <h3 className="principle-heading">Ownership</h3>
                <div className="icon-box-principle">👑</div>
              </div>
              <ul className="principle-list">
                <li>Treat every project like our own</li>
                <li>Proactive risk mitigation</li>
                <li>Peer reviews & mentoring</li>
                <li>Zero key-person risk</li>
              </ul>
            </article>
          </div>
        </ContentWrapper>
      </section>

      {/* =========================================================
          --- OUR JOURNEY (ENHANCED WITH ANIMATION & GRAPHICS) --- 
          ========================================================= */}
      <section className="our-journey-section">
        {/* Background Graphics */}
        <div className="journey-bg-pattern"></div>
        <Cpu className="floating-tech-icon tech-icon-1" />
        <Server className="floating-tech-icon tech-icon-2" />
        <Globe className="floating-tech-icon tech-icon-3" />

        <ContentWrapper>
          <div className="center-text mb-60" style={{ position: 'relative', zIndex: 5 }}>
            <h2 className="section-title">Our Journey</h2>
            <p className="section-desc">From incorporation to product scale—execution-first, outcomes-driven.</p>
          </div>

          <div className="journey-ribbon-timeline">
            {/* Center Line with Laser Beam */}
            <div className="timeline-center-line">
              <div className="timeline-beam"></div>
            </div>

            {/* Timeline Items */}
            <TimelineItem 
              side="left"
              year="2017" yearClass="year-navy"
              title="DNISPL is Formed"
              desc="Commences business on 10th February, laying the foundation for network and IT solutions services."
              icon={Briefcase}
              delay={0}
            />

            <TimelineItem 
              side="right"
              year="2018–19" yearClass="year-yellow"
              title="Bags Major Orders"
              desc="Delivered large network deployments and audits for enterprise clients across metro cities."
              icon={Award}
              delay={0.1}
            />

            <TimelineItem 
              side="left"
              year="2019–20" yearClass="year-red"
              title="System Integrator"
              desc="Executed multi-location projects with complex networking, cabling, and infrastructure roll-outs."
              icon={Server}
              delay={0.2}
            />

            <TimelineItem 
              side="right"
              year="2020–21" yearClass="year-blue"
              title="DNISPL Network"
              desc="Formalized DNISPL as a network-first solutions company, scaling remote operations and support."
              icon={Globe}
              delay={0.3}
            />

            <TimelineItem 
              side="left"
              year="2021–22" yearClass="year-teal"
              title="New Verticals"
              desc="Expanded into data-center networking, cloud connectivity, and security-led architectures."
              icon={Zap}
              delay={0.4}
            />

            <TimelineItem 
              side="right"
              year="2022–23" yearClass="year-dark-teal"
              title="Tech Mahindra Project"
              desc="200+ manpower deployed. Installation & Commissioning of 1.5MVA DG Set. AMC for Samsung, SBI Life, etc."
              icon={Cpu}
              delay={0.5}
            />

            <TimelineItem 
              side="left"
              year="2023–24" yearClass="year-steel-blue"
              title="Manpower Growth"
              desc="Strength increased to over 450. Solutions for fintech firms. Expanded presence in Mumbai & Bangalore."
              icon={Users}
              delay={0.6}
            />

            <TimelineItem 
              side="right"
              year="Future" yearClass="year-navy"
              title="Global Expansion"
              desc="Continuing our rapid ascent with AI integration and global strategic partnerships."
              icon={TrendingUp}
              delay={0.7}
            />

          </div>
        </ContentWrapper>
      </section>

      {/* --- STATS SECTION --- */}
      <section className="stats-section">
        <ContentWrapper className="stats-inner">
          <div className="stats-intro">
            <h2 className="section-title">Stats That Matter</h2>
            <p>
              At DNISPL Infotech, performance speaks louder than promises. These numbers reflect our sustained delivery excellence.
            </p>
            <Link to="/portfolio" className="link-arrow mt-10" style={{ textDecoration: 'none', color: '#00e2f5', fontWeight: 'bold' }}>
              Explore our case studies →
            </Link>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <h3 className="stat-value">200+</h3>
              <p className="stat-label">Projects Delivered</p>
            </div>
            <div className="stat-card">
              <h3 className="stat-value">8+</h3>
              <p className="stat-label">Client Countries</p>
            </div>
            <div className="stat-card">
              <h3 className="stat-value">98%</h3>
              <p className="stat-label">Retention Rate</p>
            </div>
            <div className="stat-card">
              <h3 className="stat-value">5.0<span>★</span></h3>
              <p className="stat-label">Average Rating</p>
            </div>
          </div>
        </ContentWrapper>
      </section>

      {/* --- LIFE AT DNISPL --- */}
      <section className="life-at-section">
        <ContentWrapper className="life-at-inner">
          <div className="life-left">
            <h2 className="section-title">Discover Life at <span className="text-gradient-blue">DNISPL</span></h2>
            <p className="life-desc">
              At Dnispl, innovation meets purpose. We empower every team member to grow, collaborate, and thrive.
            </p>
            
          </div>

          <div className="life-right-grid">
            <div className="life-card card-hover-effect">
              <h3 className="life-card-title">Growth-Driven</h3>
              <p className="life-card-desc">Mentorship, structured upskilling, and real-world projects.</p>
            </div>
            <div className="life-card card-hover-effect">
              <h3 className="life-card-title">Collaboration</h3>
              <p className="life-card-desc">Flat hierarchy, open communication, and transparent culture.</p>
            </div>
            <div className="life-card card-hover-effect">
              <h3 className="life-card-title">Fun & Celebrations</h3>
              <p className="life-card-desc">Festivals, games, off-sites, and reward programs.</p>
            </div>
            <div className="life-card card-hover-effect">
              <h3 className="life-card-title">Work-Life Balance</h3>
              <p className="life-card-desc">Flexible schedules, hybrid options, and wellness initiatives.</p>
            </div>
          </div>
        </ContentWrapper>
      </section>

    
      <section className="final-cta-section">
        <div className="cta-content">
          <h2 className="final-cta-title">Excited to Start?</h2>
          <p className="final-cta-subtitle">
            Contact us directly at <span className="cta-email" style={{textDecoration:'underline'}}>account@dnispl.com</span>
          </p>
          <div className="final-cta-actions">
            <Link to="/form" className="btn btn-white">Contact Now</Link>
            
          </div>
        </div>
      </section>
      
      <Footer/>
    </div>
  );
};

export default About;