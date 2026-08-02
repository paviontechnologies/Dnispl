import React from 'react';
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Network,
  Settings,
  ShieldCheck,
  Wrench,
  Users,
  BarChart3
} from 'lucide-react';
import { Link } from 'react-router-dom';
import './ProfessionalServices.css';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';

const services = [
  {
    icon: ClipboardCheck,
    title: 'IT Infrastructure Audits',
    desc: 'Comprehensive assessment of your existing IT infrastructure to identify risks, gaps, performance issues, and opportunities for improvement.'
  },
  {
    icon: Network,
    title: 'Network Design & Deployment',
    desc: 'Design and implementation of reliable, scalable, and secure network infrastructure aligned with your business requirements.'
  },
  {
    icon: Settings,
    title: 'Project Management',
    desc: 'End-to-end technology project execution with structured planning, coordination, monitoring, and delivery.'
  },
  {
    icon: Wrench,
    title: 'Network Implementation',
    desc: 'Professional deployment of enterprise networking infrastructure, including configuration, testing, and commissioning.'
  },
  {
    icon: ShieldCheck,
    title: 'Security Implementation',
    desc: 'Implementation-focused services that help strengthen your infrastructure security and reduce operational risks.'
  },
  {
    icon: BarChart3,
    title: 'Performance Optimization',
    desc: 'Analyze and optimize infrastructure performance to improve reliability, efficiency, and overall business continuity.'
  }
];

const process = [
  'Requirement Analysis',
  'Infrastructure Assessment',
  'Solution Architecture',
  'Project Planning',
  'Implementation & Deployment',
  'Testing & Handover'
];

const ProfessionalServices = () => {
  return (
    <main className="professional-services-page">
      <Header />

      {/* HERO SECTION */}
      <section className="ps-hero">
        <div className="ps-hero-glow ps-glow-one"></div>
        <div className="ps-hero-glow ps-glow-two"></div>

        <div className="container-max ps-hero-inner">
          <div className="ps-hero-content">
            <span className="ps-eyebrow">
              <span className="ps-eyebrow-dot"></span>
              PROFESSIONAL SERVICES
            </span>

            <h1>
              Build Smarter.
              <span> Deploy Better.</span>
            </h1>

            <p>
              From infrastructure assessment and network design to technology
              deployment and project execution, DNISPL delivers professional
              services that help businesses build reliable and scalable IT
              environments.
            </p>

            <div className="ps-hero-actions">
              <Link to="/form" className="ps-primary-btn">
                Discuss Your Project
                <ArrowRight size={18} />
              </Link>

              <a href="#ps-services" className="ps-secondary-btn">
                Explore Services
              </a>
            </div>
          </div>

          <div className="ps-hero-visual">
            <div className="ps-visual-card">
              <div className="ps-visual-top">
                <span>PROJECT EXECUTION</span>
                <div className="ps-status">
                  <span></span> Active
                </div>
              </div>

              <div className="ps-network-visual">
                <div className="ps-node node-one">
                  <Network size={22} />
                </div>

                <div className="ps-line line-one"></div>

                <div className="ps-node node-two">
                  <ShieldCheck size={22} />
                </div>

                <div className="ps-line line-two"></div>

                <div className="ps-node node-three">
                  <Settings size={22} />
                </div>
              </div>

              <div className="ps-visual-footer">
                <div>
                  <strong>Reliable</strong>
                  <span>Infrastructure</span>
                </div>
                <div>
                  <strong>Scalable</strong>
                  <span>Architecture</span>
                </div>
                <div>
                  <strong>Secure</strong>
                  <span>Deployment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO SECTION */}
      <section className="ps-intro">
        <div className="container-max ps-intro-grid">
          <div>
            <span className="ps-section-label">OUR EXPERTISE</span>
            <h2>
              Technology execution that
              <span> delivers real outcomes.</span>
            </h2>
          </div>

          <div>
            <p>
              Technology projects require more than just implementation.
              They need clear planning, experienced execution, strong
              coordination, and attention to operational details.
            </p>

            <p>
              Our professional services team works alongside your business
              to deliver structured technology projects from initial
              assessment through deployment and handover.
            </p>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="ps-services" id="ps-services">
        <div className="container-max">
          <div className="ps-section-heading">
            <div>
              <span className="ps-section-label">WHAT WE DO</span>
              <h2>Professional services built around your needs.</h2>
            </div>

            <p>
              Flexible technology services designed to support infrastructure
              modernization, deployment, optimization, and project delivery.
            </p>
          </div>

          <div className="ps-services-grid">
            {services.map((service, index) => {
              const Icon = service.icon;

              return (
                <div className="ps-service-card" key={service.title}>
                  <div className="ps-card-number">
                    0{index + 1}
                  </div>

                  <div className="ps-service-icon">
                    <Icon size={24} />
                  </div>

                  <h3>{service.title}</h3>

                  <p>{service.desc}</p>

                  <div className="ps-card-arrow">
                    <ArrowRight size={18} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* APPROACH */}
      <section className="ps-approach">
        <div className="container-max ps-approach-grid">
          <div className="ps-approach-content">
            <span className="ps-section-label">OUR APPROACH</span>

            <h2>
              From planning to deployment,
              <span> we manage the details.</span>
            </h2>

            <p>
              Our structured delivery approach helps reduce complexity,
              improve visibility, and ensure every stage of your technology
              project is executed with clarity.
            </p>

            <Link to="/form" className="ps-outline-btn">
              Start a Conversation
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="ps-process">
            {process.map((item, index) => (
              <div className="ps-process-item" key={item}>
                <div className="ps-process-icon">
                  <CheckCircle2 size={19} />
                </div>

                <div>
                  <span>0{index + 1}</span>
                  <strong>{item}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY DNISPL */}
      <section className="ps-benefits">
        <div className="container-max">
          <div className="ps-benefits-heading">
            <span className="ps-section-label">WHY DNISPL</span>
            <h2>Experience. Execution. Accountability.</h2>
          </div>

          <div className="ps-benefits-grid">
            <div className="ps-benefit">
              <Users size={25} />
              <h3>Experienced Teams</h3>
              <p>
                Skilled technology professionals focused on reliable project
                execution and operational excellence.
              </p>
            </div>

            <div className="ps-benefit">
              <ShieldCheck size={25} />
              <h3>Reliable Delivery</h3>
              <p>
                Structured processes designed to maintain quality, visibility,
                and consistency throughout implementation.
              </p>
            </div>

            <div className="ps-benefit">
              <BarChart3 size={25} />
              <h3>Business-Focused Outcomes</h3>
              <p>
                Technology solutions aligned with your business objectives,
                operational requirements, and future growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="ps-final-cta">
        <div className="container-max">
          <div className="ps-cta-box">
            <div className="ps-cta-dots">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>

            <div className="ps-cta-content">
              <span className="ps-section-label">LET'S WORK TOGETHER</span>

              <h2>
                Have a technology project
                <span> in mind?</span>
              </h2>

              <p>
                Let's discuss your requirements and explore how DNISPL can
                help you plan, implement, and optimize your technology
                infrastructure.
              </p>

              <Link to="/form" className="ps-primary-btn">
                Contact Us
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

export default ProfessionalServices;