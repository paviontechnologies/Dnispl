import React from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Headphones,
  MonitorCog,
  Network,
  Server,
  ShieldCheck,
  Users,
  Wrench
} from 'lucide-react';
import { Link } from 'react-router-dom';
import './TechnicalSupport.css';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';

const supportServices = [
  {
    icon: Headphones,
    title: 'L1 Support',
    desc: 'First-level technical support for incident logging, basic troubleshooting, user assistance, and issue resolution.'
  },
  {
    icon: MonitorCog,
    title: 'L2 Support',
    desc: 'Advanced technical troubleshooting and incident resolution for network, system, and infrastructure-related issues.'
  },
  {
    icon: Server,
    title: 'L3 Support',
    desc: 'Expert-level technical assistance for complex infrastructure issues, root-cause analysis, and advanced problem resolution.'
  },
  {
    icon: Users,
    title: 'SME Services',
    desc: 'Specialized subject matter expertise to support critical technologies, complex environments, and business requirements.'
  },
  {
    icon: Network,
    title: 'Network Support',
    desc: 'Monitoring and troubleshooting of enterprise network infrastructure to maintain connectivity and operational reliability.'
  },
  {
    icon: Wrench,
    title: 'Infrastructure Support',
    desc: 'Technical assistance for IT infrastructure environments with a focus on stability, availability, and performance.'
  }
];

const supportLevels = [
  {
    level: 'L1',
    title: 'First-Level Support',
    desc: 'Initial incident handling, ticket logging, basic troubleshooting, and user assistance.'
  },
  {
    level: 'L2',
    title: 'Advanced Support',
    desc: 'In-depth troubleshooting, technical analysis, and resolution of escalated infrastructure issues.'
  },
  {
    level: 'L3',
    title: 'Expert Support',
    desc: 'Complex problem resolution, root-cause analysis, and advanced technical intervention.'
  },
  {
    level: 'SME',
    title: 'Subject Matter Experts',
    desc: 'Specialized expertise for critical technologies and complex business environments.'
  }
];

const TechnicalSupport = () => {
  return (
    <main className="technical-support-page">
      <Header />

      {/* HERO */}
      <section className="ts-hero">
        <div className="ts-hero-glow ts-glow-one"></div>
        <div className="ts-hero-glow ts-glow-two"></div>

        <div className="container-max ts-hero-inner">

          <div className="ts-hero-content">
            <span className="ts-eyebrow">
              <span className="ts-eyebrow-dot"></span>
              TECHNICAL SUPPORT
            </span>

            <h1>
              Technical Expertise.
              <span> When You Need It.</span>
            </h1>

            <p>
              Reliable L1, L2, L3, and SME technical support services designed
              to help businesses maintain stable, secure, and high-performing
              IT infrastructure.
            </p>

            <div className="ts-hero-actions">
              <Link to="/form" className="ts-primary-btn">
                Get Technical Support
                <ArrowRight size={18} />
              </Link>

              <a href="#ts-services" className="ts-secondary-btn">
                Explore Support Services
              </a>
            </div>
          </div>

          {/* HERO VISUAL */}
          <div className="ts-hero-visual">
            <div className="ts-support-card">

              <div className="ts-card-header">
                <div>
                  <span>TECHNICAL OPERATIONS</span>
                  <strong>Support Coverage</strong>
                </div>

                <div className="ts-online-status">
                  <span></span>
                  Available
                </div>
              </div>

              <div className="ts-support-levels">
                {supportLevels.map((item) => (
                  <div className="ts-level-row" key={item.level}>
                    <div className="ts-level-badge">
                      {item.level}
                    </div>

                    <div className="ts-level-info">
                      <strong>{item.title}</strong>
                      <span>{item.desc}</span>
                    </div>

                    <CheckCircle2
                      className="ts-check-icon"
                      size={20}
                    />
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* INTRO */}
      <section className="ts-intro">
        <div className="container-max ts-intro-grid">

          <div>
            <span className="ts-section-label">
              SUPPORT THAT WORKS FOR YOU
            </span>

            <h2>
              Keep your technology
              <span> running reliably.</span>
            </h2>
          </div>

          <div className="ts-intro-text">
            <p>
              Technology issues can impact productivity, connectivity, and
              business operations. Our technical support services provide
              structured assistance across multiple levels of technical
              complexity.
            </p>

            <p>
              From first-level incident handling to advanced troubleshooting
              and specialist expertise, DNISPL helps businesses address
              technical challenges with a clear and structured support model.
            </p>
          </div>

        </div>
      </section>

      {/* SERVICES */}
      <section className="ts-services" id="ts-services">
        <div className="container-max">

          <div className="ts-section-heading">
            <div>
              <span className="ts-section-label">
                OUR SUPPORT SERVICES
              </span>

              <h2>
                The right level of expertise for every challenge.
              </h2>
            </div>

            <p>
              Flexible technical support services designed to help maintain
              infrastructure reliability, resolve incidents, and support
              day-to-day IT operations.
            </p>
          </div>

          <div className="ts-services-grid">

            {supportServices.map((service, index) => {
              const Icon = service.icon;

              return (
                <div className="ts-service-card" key={service.title}>

                  <div className="ts-service-number">
                    0{index + 1}
                  </div>

                  <div className="ts-service-icon">
                    <Icon size={24} />
                  </div>

                  <h3>{service.title}</h3>

                  <p>{service.desc}</p>

                  <div className="ts-card-arrow">
                    <ArrowRight size={18} />
                  </div>

                </div>
              );
            })}

          </div>
        </div>
      </section>

      {/* SUPPORT MODEL */}
      <section className="ts-model">
        <div className="container-max ts-model-grid">

          <div className="ts-model-content">

            <span className="ts-section-label">
              OUR SUPPORT MODEL
            </span>

            <h2>
              Structured support.
              <span> Clear escalation.</span>
            </h2>

            <p>
              Our multi-level support approach helps ensure that incidents
              are handled at the appropriate technical level, allowing
              teams to focus on resolution while maintaining operational
              visibility.
            </p>

            <div className="ts-model-features">

              <div>
                <Clock3 size={20} />
                <span>Faster issue handling</span>
              </div>

              <div>
                <ShieldCheck size={20} />
                <span>Structured escalation</span>
              </div>

              <div>
                <Network size={20} />
                <span>Infrastructure expertise</span>
              </div>

            </div>

          </div>

          <div className="ts-escalation-card">

            <div className="ts-escalation-line"></div>

            {supportLevels.map((item, index) => (
              <div
                className="ts-escalation-item"
                key={item.level}
              >
                <div className="ts-escalation-number">
                  {index + 1}
                </div>

                <div>
                  <span>{item.level} SUPPORT</span>
                  <strong>{item.title}</strong>
                </div>
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* WHY DNISPL */}
      <section className="ts-benefits">
        <div className="container-max">

          <div className="ts-benefits-heading">
            <span className="ts-section-label">
              WHY DNISPL
            </span>

            <h2>
              Technical support built around
              <span> reliability.</span>
            </h2>
          </div>

          <div className="ts-benefits-grid">

            <div className="ts-benefit-card">
              <Headphones size={25} />

              <h3>
                Multi-Level Expertise
              </h3>

              <p>
                Access to structured L1, L2, L3, and SME support capabilities
                based on the complexity of your technical requirements.
              </p>
            </div>

            <div className="ts-benefit-card">
              <Clock3 size={25} />

              <h3>
                Faster Resolution
              </h3>

              <p>
                A clear support and escalation model helps technical issues
                move efficiently toward resolution.
              </p>
            </div>

            <div className="ts-benefit-card">
              <ShieldCheck size={25} />

              <h3>
                Reliable Operations
              </h3>

              <p>
                Technical support focused on maintaining infrastructure
                stability, availability, and business continuity.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="ts-final-cta">
        <div className="container-max">

          <div className="ts-cta-box">

            <div className="ts-cta-dots">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>

            <div className="ts-cta-content">

              <span className="ts-section-label">
                NEED TECHNICAL SUPPORT?
              </span>

              <h2>
                Let's keep your
                <span> IT running.</span>
              </h2>

              <p>
                Have a technical challenge or infrastructure issue?
                Talk to our team about your support requirements and
                find the right level of technical expertise for your business.
              </p>

              <Link to="/form" className="ts-primary-btn">
                Contact Our Team
                <ArrowRight size={18} />
              </Link>

            </div>

          </div>

        </div>
      </section>
      <Footer />
    </main>
  );
};

export default TechnicalSupport;