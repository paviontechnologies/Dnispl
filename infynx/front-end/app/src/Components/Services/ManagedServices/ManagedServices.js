import React from "react";
import {
  Activity,
  Headphones,
  Network,
  ShieldCheck,
  Server,
  Settings,
  Clock,
  ArrowRight,
  CheckCircle2,
  MonitorCog,
} from "lucide-react";
import { Link } from "react-router-dom";
import "./ManagedServices.css";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";

const managedServices = [
  {
    icon: Activity,
    title: "NOC Management",
    desc: "24/7 network monitoring and proactive management to keep your critical IT infrastructure reliable and available.",
  },
  {
    icon: Network,
    title: "Managed Network Services",
    desc: "End-to-end monitoring, management, and optimization of enterprise network infrastructure.",
  },
  {
    icon: Settings,
    title: "AMC Services",
    desc: "Preventive and corrective maintenance services designed to improve infrastructure performance and reduce downtime.",
  },
  {
    icon: Server,
    title: "Facility Management Services",
    desc: "Dedicated technical resources for managing IT infrastructure and day-to-day operational requirements.",
  },
  {
    icon: Headphones,
    title: "L1 / L2 / L3 Support",
    desc: "Multi-level technical support with structured escalation and faster resolution of infrastructure issues.",
  },
  {
    icon: MonitorCog,
    title: "SME Support",
    desc: "Specialized technical expertise for complex networking, infrastructure, and technology environments.",
  },
];

const benefits = [
  "Proactive infrastructure monitoring",
  "Reduced downtime and faster issue resolution",
  "Dedicated technical support",
  "Scalable service delivery",
  "Structured SLA-based operations",
  "Improved IT infrastructure performance",
];

const process = [
  {
    number: "01",
    title: "Assess",
    desc: "We understand your existing infrastructure, operational requirements, and business priorities.",
  },
  {
    number: "02",
    title: "Plan",
    desc: "Our team defines the right support model, SLA, monitoring approach, and escalation process.",
  },
  {
    number: "03",
    title: "Deploy",
    desc: "We onboard the infrastructure, configure monitoring, and establish operational workflows.",
  },
  {
    number: "04",
    title: "Manage",
    desc: "Our team continuously monitors, supports, and optimizes your IT environment.",
  },
];

const ManagedServices = () => {
  return (
    <main className="managed-services-page">
        <Header />

      {/* HERO SECTION */}
      <section className="managed-hero">
        <div className="managed-hero-glow glow-one"></div>
        <div className="managed-hero-glow glow-two"></div>

        <div className="managed-container">
          <div className="managed-hero-content">

            <div className="managed-eyebrow">
              <span></span>
              MANAGED SERVICES
            </div>

            <h1>
              Reliable IT Operations.
              <br />
              <span>Managed With Confidence.</span>
            </h1>

            <p>
              Keep your IT infrastructure secure, available, and performing
              at its best with DNISPL's managed technology and support services.
            </p>

            <div className="managed-hero-actions">
              <a href="https://discovery.diversifiedsolutions.in/" target="_blank" rel="noopener noreferrer" className="managed-primary-btn">
                Discuss Your Requirements
                <ArrowRight size={18} />
              </a>

              <a href="#managed-services" className="managed-secondary-btn">
                Explore Services
              </a>
            </div>

            <div className="managed-hero-stats">
              <div>
                <strong>24/7</strong>
                <span>Monitoring & Support</span>
              </div>

              <div>
                <strong>L1-L3</strong>
                <span>Technical Support</span>
              </div>

              <div>
                <strong>SLA</strong>
                <span>Driven Operations</span>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* INTRO SECTION */}
      <section className="managed-intro">
        <div className="managed-container managed-two-column">

          <div className="managed-section-label">
            <span>01</span>
            <p>WHY MANAGED SERVICES</p>
          </div>

          <div className="managed-intro-content">
            <h2>
              Focus on your business.
              <br />
              <span>We'll manage the technology.</span>
            </h2>

            <p>
              Modern businesses depend on reliable IT infrastructure to operate
              efficiently. DNISPL helps organizations simplify IT operations
              through proactive monitoring, technical support, infrastructure
              management, and skilled technology resources.
            </p>

            <p>
              Our managed services model is designed to improve operational
              visibility, reduce downtime, and provide businesses with the
              technical expertise they need to keep their infrastructure running
              smoothly.
            </p>
          </div>

        </div>
      </section>


      {/* SERVICES SECTION */}
      <section
        className="managed-services-section"
        id="managed-services"
      >
        <div className="managed-container">

          <div className="managed-section-heading">
            <div className="managed-section-label">
              <span>02</span>
              <p>OUR CAPABILITIES</p>
            </div>

            <h2>
              Managed services built
              <br />
              <span>around your operations.</span>
            </h2>

            <p>
              From proactive monitoring to specialized technical support,
              our services help you maintain a stable and scalable technology
              environment.
            </p>
          </div>


          <div className="managed-services-grid">
            {managedServices.map((service, index) => {
              const Icon = service.icon;

              return (
                <div
                  className="managed-service-card"
                  key={service.title}
                >
                  <div className="managed-card-top">
                    <span className="managed-card-number">
                      0{index + 1}
                    </span>

                    <div className="managed-card-icon">
                      <Icon size={24} />
                    </div>
                  </div>

                  <h3>{service.title}</h3>

                  <p>{service.desc}</p>

                  <Link to="/form">
                    Learn More
                    <ArrowRight size={16} />
                  </Link>
                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* SUPPORT MODEL */}
      <section className="managed-support">
        <div className="managed-container managed-support-grid">

          <div className="managed-support-visual">
            <div className="support-circle circle-one"></div>
            <div className="support-circle circle-two"></div>

            <div className="support-center-icon">
              <ShieldCheck size={48} />
            </div>

            <div className="support-floating-card card-top">
              <Clock size={20} />
              <div>
                <strong>24/7</strong>
                <span>Monitoring</span>
              </div>
            </div>

            <div className="support-floating-card card-bottom">
              <Headphones size={20} />
              <div>
                <strong>L1-L3</strong>
                <span>Support</span>
              </div>
            </div>
          </div>


          <div className="managed-support-content">

            <div className="managed-section-label">
              <span>03</span>
              <p>OUR SUPPORT MODEL</p>
            </div>

            <h2>
              Support that keeps
              <br />
              <span>your business moving.</span>
            </h2>

            <p>
              Our structured support approach combines proactive monitoring,
              technical expertise, defined escalation processes, and
              service-level commitments to help maintain business continuity.
            </p>

            <div className="managed-benefits">
              {benefits.map((benefit) => (
                <div key={benefit}>
                  <CheckCircle2 size={19} />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>


      {/* PROCESS SECTION */}
      <section className="managed-process">
        <div className="managed-container">

          <div className="managed-section-heading center">
            <div className="managed-section-label">
              <span>04</span>
              <p>HOW WE WORK</p>
            </div>

            <h2>
              A structured approach to
              <br />
              <span>managed IT operations.</span>
            </h2>
          </div>

          <div className="managed-process-grid">
            {process.map((item) => (
              <div className="managed-process-card" key={item.number}>

                <span className="process-number">
                  {item.number}
                </span>

                <h3>{item.title}</h3>

                <p>{item.desc}</p>

              </div>
            ))}
          </div>

        </div>
      </section>


      {/* CTA SECTION */}
      <section className="managed-final-cta">
        <div className="managed-container">

          <div className="managed-cta-box">

            <div className="cta-dots">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>

            <div className="managed-cta-content">

              <div className="managed-section-label">
                <span>05</span>
                <p>LET'S WORK TOGETHER</p>
              </div>

              <h2>
                Ready to simplify
                <br />
                <span>your IT operations?</span>
              </h2>

              <p>
                Let's discuss your infrastructure, support requirements,
                and how DNISPL can help you build a more reliable technology
                environment.
              </p>

              <a href="https://discovery.diversifiedsolutions.in/" target="_blank" rel="noopener noreferrer" className="managed-primary-btn">
                Start a Conversation
                <ArrowRight size={18} />
              </a>

            </div>

          </div>

        </div>
      </section>
      <Footer />  
    </main>
  );
};

export default ManagedServices;