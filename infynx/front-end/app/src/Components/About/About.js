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
            <span className="badge-dot"></span> ABOUT DNISPL
          </div>

          <h1 className="about-hero-title fade-in-up delay-1">
            Building Reliable Technology
            <br />
            <span className="text-gradient">For a Connected Future</span>
          </h1>

          <p className="about-hero-description fade-in-up delay-2">
            DNISPL is a technology and IT solutions company delivering reliable,
            scalable, and business-focused solutions across IT infrastructure,
            networking, managed services, software development, and digital
            transformation.
          </p>
        </ContentWrapper>
      </section>

      {/* --- OUR STORY --- */}
      <section className="our-story-section">
        <ContentWrapper className="our-story-inner">
          <div className="our-story-left fade-in-up delay-2">
            <h2 className="section-title">Who We Are</h2>
            <p className="our-story-text">
              DNISPL is committed to helping businesses build stronger technology
              foundations and operate with greater efficiency. From IT infrastructure
              and networking to software solutions and managed services, we combine
              technical expertise, execution discipline, and customer-focused support
              to deliver solutions that create measurable business value.
            </p>

            <div className="story-features-grid">
              <div className="story-feature glass-card-sm">
                <div className="feature-icon-box">⚙️</div>
                <div className="story-feature-text">Reliable Solutions</div>
              </div>
              <div className="story-feature glass-card-sm">
                <div className="feature-icon-box">🏗️</div>
                <div className="story-feature-text">Expert Execution</div>
              </div>
              <div className="story-feature glass-card-sm">
                <div className="feature-icon-box">🧠</div>
                <div className="story-feature-text">Scalable Technology</div>
              </div>
              <div className="story-feature glass-card-sm">
                <div className="feature-icon-box">🚀</div>
                <div className="story-feature-text">Long-Term Support</div>
              </div>
            </div>

            <div className="story-locations">
              <div className="location-icon-pulse">📍</div>
              <div>
                <p className="location-caption">Serving businesses across</p>
                <p className="location-places">India & Global Markets</p>
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
             <h2 className="section-title text-white">What Drives Us</h2>
             <p className="section-desc text-gray">Our approach is built around technology, accountability, and long-term partnerships.</p>
          </div>

          <div className="principles-grid">
            <article className="principle-card card-hover-effect">
              <div className="principle-card-top">
                <h3 className="principle-heading">Innovation First</h3>
                <div className="icon-box-principle">💡</div>
              </div>
              <ul className="principle-list">
                <li>Adopt practical and emerging technologies</li>
                <li>Build solutions for real business needs</li>
                <li>Focus on performance and scalability</li>
                <li>Continuously improve our capabilities</li>
              </ul>
            </article>

            <article className="principle-card card-hover-effect">
              <div className="principle-card-top">
                <h3 className="principle-heading">Client-Centric</h3>
                <div className="icon-box-principle">🤝</div>
              </div>
              <ul className="principle-list">
                <li>Understand business requirements deeply</li>
                <li>Maintain clear and transparent communication</li>
                <li>Deliver with quality and accountability</li>
                <li>Build long-term client relationships</li>
              </ul>
            </article>

            <article className="principle-card card-hover-effect">
              <div className="principle-card-top">
                <h3 className="principle-heading">Ownership</h3>
                <div className="icon-box-principle">👑</div>
              </div>
              <ul className="principle-list">
                <li>Take responsibility from planning to delivery</li>
                <li>Proactively identify and solve challenges</li>
                <li>Maintain high standards of execution</li>
                <li>Stay accountable for business outcomes</li>
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
              year="2017"
              title="DNISPL is Established"
              desc="DNISPL began its journey with a vision to deliver dependable IT infrastructure, networking, and technology solutions for businesses."
              icon={Briefcase}
              delay={0}
            />

            <TimelineItem 
              side="right"
              year="2018"
              title="Building Strong Foundations"
              desc="Focused on strengthening technical capabilities and delivering reliable IT infrastructure and networking solutions to meet evolving business needs."
              icon={Server}
              delay={0.1}
            />

            <TimelineItem 
              side="left"
              year="2019"
              title="Expanding Client Partnerships"
              desc="Expanded our client network and strengthened long-term partnerships through consistent service delivery, technical expertise, and responsive support."
              icon={Users}
              delay={0.2}
            />

            <TimelineItem 
              side="right"
              year="2020"
              title="Growing Technology Capabilities"
              desc="Enhanced our technology capabilities and expanded our service offerings to support businesses with reliable and scalable IT solutions."
              icon={Cpu}
              delay={0.3}
            />

            <TimelineItem 
              side="left"
              year="2021"
              title="Strengthening Our Services"
              desc="Continued expanding our expertise across IT infrastructure, networking, managed services, and technology-driven business solutions."
              icon={Globe}
              delay={0.4}
            />

            <TimelineItem 
              side="right"
              year="2022"
              title="Scaling Our Operations"
              desc="Expanded our operational capabilities and strengthened our team to deliver larger and more complex technology and infrastructure projects."
              icon={TrendingUp}
              delay={0.5}
            />

            <TimelineItem 
              side="left"
              year="2023"
              title="Expanding Our Reach"
              desc="Focused on delivering end-to-end technology solutions while building stronger client relationships and expanding our presence across key markets."
              icon={Award}
              delay={0.6}
            />

            <TimelineItem 
              side="right"
              year="2024–25"
              title="Driving Growth & Innovation"
              desc="Continued to evolve with modern technologies, managed services, and scalable solutions designed to help businesses improve efficiency and stay future-ready."
              icon={Zap}
              delay={0.7}
            />

            <TimelineItem 
              side="left"
              year="2026"
              title="Building the Future"
              desc="Moving forward with a focus on innovation, strategic partnerships, and scalable technology solutions that create lasting value for our clients."
              icon={TrendingUp}
              delay={0.8}
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
              <h3 className="stat-value">End-to-End</h3>
              <p className="stat-label">Technology Solutions</p>
            </div>
            <div className="stat-card">
              <h3 className="stat-value">24/7</h3>
              <p className="stat-label">Operational Support</p>
            </div>
            <div className="stat-card">
              <h3 className="stat-value">Multi-Industry</h3>
              <p className="stat-label">Domain Experience</p>
            </div>
            <div className="stat-card">
              <h3 className="stat-value">Long-Term</h3>
              <p className="stat-label">Client Partnerships</p>
            </div>
          </div>
        </ContentWrapper>
      </section>

      {/* --- LIFE AT DNISPL --- */}
      <section className="life-at-section">
        <ContentWrapper className="life-at-inner">
          <div className="life-left">
            <h2 className="section-title">Life at <span className="text-gradient-blue">DNISPL</span></h2>
            <p className="life-desc">
              We believe great technology is built by great teams. At DNISPL, we
              encourage collaboration, continuous learning, ownership, and a shared
              commitment to delivering meaningful outcomes for our clients.
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
        <ContentWrapper className="final-cta-inner">
          <div className="cta-box-gradient">
              <div className="cta-dots cta-dots-left"></div>
              <div className="cta-dots cta-dots-right"></div>
            <h2 className="final-cta-title">
              Let's Build Something
              <span className="text-gradient-blue"> Better Together.</span>
            </h2>

            <p className="final-cta-subtitle">
              Have a technology challenge or a project in mind?
              Let's discuss how DNISPL can help your business build,
              scale, and operate with confidence.
              <br />
              Contact us at{" "}
              <a href="mailto:accounts@dnispl.com">
                accounts@dnispl.com
              </a>
            </p>

            <div className="final-cta-actions">
              <Link to="/form" className="btn btn-solid">
                Contact Us
              </Link>
            </div>
          </div>
        </ContentWrapper>
      </section>
      
      <Footer/>
    </div>
  );
};

export default About;