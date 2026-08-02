import React from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  UserCheck,
  Search,
  ShieldCheck,
  Clock3,
  BriefcaseBusiness,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import './WorkforceSolutions.css';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';

const WorkforceSolutions = () => {
  const services = [
    {
      icon: UserCheck,
      title: 'Technical Staffing',
      desc: 'Skilled IT professionals and technical resources aligned with your project and operational requirements.'
    },
    {
      icon: Users,
      title: 'Field Engineers',
      desc: 'Deploy experienced field engineers for on-site infrastructure, networking, installation, and support requirements.'
    },
    {
      icon: Search,
      title: 'Resource Deployment',
      desc: 'Flexible workforce deployment models designed to support short-term projects and long-term operations.'
    },
    {
      icon: ShieldCheck,
      title: 'Managed Workforce',
      desc: 'Dedicated technical resources managed with defined processes, performance standards, and operational accountability.'
    },
    {
      icon: Clock3,
      title: 'On-Demand Support',
      desc: 'Scale your technical workforce quickly whenever additional resources are required.'
    },
    {
      icon: BriefcaseBusiness,
      title: 'Project-Based Resources',
      desc: 'Get specialized professionals for network rollouts, infrastructure deployments, audits, and technology projects.'
    }
  ];

  const benefits = [
    'Access to skilled technical professionals',
    'Flexible workforce scaling',
    'Faster resource deployment',
    'Experienced field engineering teams',
    'Reduced recruitment and operational overhead',
    'Dedicated support for project and business requirements'
  ];

  return (
    <main className="workforce-page">
      <Header />

      {/* HERO SECTION */}
      <section className="workforce-hero">
        <div className="workforce-hero-glow glow-one"></div>
        <div className="workforce-hero-glow glow-two"></div>

        <div className="container-max workforce-hero-inner">
          <div className="workforce-hero-content">
            <span className="section-eyebrow">
              WORKFORCE SOLUTIONS
            </span>

            <h1>
              The Right
              <span className="text-gradient-blue"> People.</span>
              <br />
              The Right
              <span className="text-gradient-blue"> Expertise.</span>
            </h1>

            <p>
              Build a stronger technology workforce with skilled technical
              professionals, field engineers, and flexible resource deployment
              solutions tailored to your business needs.
            </p>

            <div className="workforce-hero-actions">
              <Link to="/form" className="btn-glow">
                Talk to Our Team
                <ArrowRight size={18} />
              </Link>

              <Link to="/services/managed" className="workforce-secondary-btn">
                Explore Managed Services
              </Link>
            </div>
          </div>

          <div className="workforce-hero-visual">
            <div className="workforce-orbit orbit-one"></div>
            <div className="workforce-orbit orbit-two"></div>

            <div className="workforce-icon-card main-icon">
              <Users size={64} strokeWidth={1.3} />
            </div>

            <div className="floating-card floating-card-one">
              <UserCheck size={22} />
              <div>
                <strong>Skilled Teams</strong>
                <span>Technical Experts</span>
              </div>
            </div>

            <div className="floating-card floating-card-two">
              <ShieldCheck size={22} />
              <div>
                <strong>Reliable Support</strong>
                <span>Operational Excellence</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO SECTION */}
      <section className="workforce-intro section-padding">
        <div className="container-max workforce-intro-grid">
          <div>
            <span className="section-eyebrow">
              FLEXIBLE WORKFORCE CAPABILITY
            </span>

            <h2>
              Technology expertise when
              <span className="text-gradient-blue"> you need it.</span>
            </h2>
          </div>

          <div className="workforce-intro-text">
            <p>
              DNISPL helps organizations strengthen their technology operations
              with access to skilled professionals and technical resources.
              From field engineers and infrastructure specialists to project
              deployment teams, we provide workforce solutions that adapt to
              changing business and project requirements.
            </p>

            <p>
              Our flexible approach enables businesses to scale technical
              capabilities while maintaining operational consistency,
              accountability, and service quality.
            </p>
          </div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="workforce-services section-padding">
        <div className="container-max">

          <div className="section-heading-centered">
            <span className="section-eyebrow">
              OUR WORKFORCE SERVICES
            </span>

            <h2>
              Resources built around
              <span className="text-gradient-blue"> your requirements.</span>
            </h2>

            <p>
              Flexible workforce models designed to support your IT
              infrastructure, projects, and ongoing operations.
            </p>
          </div>

          <div className="workforce-services-grid">
            {services.map((service, index) => {
              const Icon = service.icon;

              return (
                <div
                  className="workforce-service-card"
                  key={service.title}
                >
                  <div className="service-card-number">
                    0{index + 1}
                  </div>

                  <div className="service-icon">
                    <Icon size={27} />
                  </div>

                  <h3>{service.title}</h3>

                  <p>{service.desc}</p>

                  <div className="service-card-line"></div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* BENEFITS SECTION */}
      <section className="workforce-benefits section-padding">
        <div className="container-max workforce-benefits-grid">

          <div className="benefits-visual">
            <div className="benefits-panel">
              <span className="panel-label">
                DNISPL WORKFORCE
              </span>

              <h3>
                Expertise that
                <span className="text-gradient-blue"> moves with you.</span>
              </h3>

              <div className="panel-stat">
                <strong>Flexible</strong>
                <span>Resource Models</span>
              </div>

              <div className="panel-stat">
                <strong>Technical</strong>
                <span>Specialists</span>
              </div>
            </div>
          </div>

          <div className="benefits-content">
            <span className="section-eyebrow">
              WHY CHOOSE OUR WORKFORCE SOLUTIONS
            </span>

            <h2>
              Scale your technical
              <span className="text-gradient-blue"> capabilities.</span>
            </h2>

            <p>
              Whether you need additional project resources, field engineers,
              or dedicated technical professionals, our workforce solutions
              help you respond quickly to changing operational demands.
            </p>

            <div className="benefits-list">
              {benefits.map((benefit) => (
                <div className="benefit-item" key={benefit}>
                  <CheckCircle2 size={20} />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* PROCESS */}
      <section className="workforce-process section-padding">
        <div className="container-max">

          <div className="section-heading-centered">
            <span className="section-eyebrow">
              HOW WE WORK
            </span>

            <h2>
              Simple process.
              <span className="text-gradient-blue"> Strong execution.</span>
            </h2>
          </div>

          <div className="workforce-process-grid">

            <div className="process-step">
              <span>01</span>
              <h3>Understand</h3>
              <p>
                We understand your project, workforce requirements,
                technical skills, and operational objectives.
              </p>
            </div>

            <div className="process-step">
              <span>02</span>
              <h3>Deploy</h3>
              <p>
                We identify and deploy suitable technical resources based
                on your specific requirements.
              </p>
            </div>

            <div className="process-step">
              <span>03</span>
              <h3>Support</h3>
              <p>
                Our teams remain aligned with defined processes and
                operational expectations throughout the engagement.
              </p>
            </div>

            <div className="process-step">
              <span>04</span>
              <h3>Scale</h3>
              <p>
                Expand or adjust your technical workforce as project
                requirements and business needs evolve.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* FINAL CTA */}
      <section className="workforce-final-cta">
        <div className="container-max">
          <div className="workforce-cta-box">

            <div className="cta-dot dot-one"></div>
            <div className="cta-dot dot-two"></div>
            <div className="cta-dot dot-three"></div>
            <div className="cta-dot dot-four"></div>

            <div className="cta-content">
              <span className="section-eyebrow">
                LET'S BUILD YOUR TEAM
              </span>

              <h2>
                Need the right technical
                <span className="text-gradient-blue"> workforce?</span>
              </h2>

              <p>
                Tell us about your project or workforce requirements.
                Our team can help you identify the right technical
                resources for your business.
              </p>

              <Link to="/form" className="btn-glow">
                Start a Conversation
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

export default WorkforceSolutions;