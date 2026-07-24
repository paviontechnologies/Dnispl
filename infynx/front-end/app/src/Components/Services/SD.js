import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./SD.css";
import { Link } from 'react-router-dom';

const SD = () => {
  return (
    <>
      <Header />

      <div className="sd-page-container">
        
        {/* --- BACKGROUND ANIMATION LAYER --- */}
        <div className="sd-bg-layer">
            <div className="code-rain"></div>
            <div className="floating-symbol sym-1">{"{ }"}</div>
            <div className="floating-symbol sym-2">{"< >"}</div>
            <div className="floating-symbol sym-3">{"//"}</div>
        </div>

        {/* HERO SECTION */}
        <section className="sd-hero-section">
          <div className="sd-content-wrapper">
            <div className="sd-badge fade-in-up">
                <span className="dot-blink"></span> READY TO SCALE
            </div>
{/*             
            <h1 className="sd-hero-title fade-in-up delay-1">
               <span className="text-gradient-purple"> Custom Software Development Services</span> <br/>
            
            </h1> */}

            <p className="sd-hero-subtitle fade-in-up delay-2">
              We build fast, secure, and scalable applications tailored to your business needs —
              from concept to deployment.
            </p>

            <div className="sd-hero-buttons fade-in-up delay-3">
              <a href="#contact" className="btn-purple-glow">Start a Project</a>
              <a href="#services" className="btn-glass-purple">Explore Services</a>
            </div>
          </div>
        </section>

        {/* WHAT WE BUILD SECTION */}
        <section className="sd-services-section" id="services">
          <div className="sd-content-wrapper">
            <div className="section-header center">
                <h2 className="text-gradient-purple">What We Build</h2>
                <p className="sd-section-desc">Engineering digital excellence for modern businesses.</p>
            </div>

            <div className="sd-cards-grid">
              {[
                { icon: "💻", title: "Web Applications", desc: "Modern, secure & high-performance web apps designed for speed, usability, and business automation." },
                { icon: "📱", title: "Mobile Applications", desc: "Cross-platform and native apps built for exceptional user experience and top-tier performance." },
                { icon: "🛒", title: "E-Commerce Platforms", desc: "Custom e-commerce websites tailored to drive revenue, handle scale, and integrate secure payments." },
                { icon: "☁️", title: "Cloud-Powered Apps", desc: "Cloud-native software built for AWS, Azure, and GCP with seamless CI/CD, logging, and automation." },
                { icon: "🧠", title: "AI-Integrated Solutions", desc: "AI-powered tools for chat automation, prediction, computer vision, and real-time data processing." },
                { icon: "🔗", title: "API Development", desc: "Secure, fast, and scalable APIs for your apps, partners, and internal systems integration." }
              ].map((service, index) => (
                <div className="sd-glass-card hover-float" key={index}>
                  <div className="card-shine"></div>
                  <div className="sd-icon-box">{service.icon}</div>
                  <h3>{service.title}</h3>
                  <p>{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY CHOOSE US SECTION */}
        <section className="sd-why-section">
          <div className="sd-content-wrapper">
            <h2 className="sd-section-title center text-white">Why Choose Us?</h2>
            
            <div className="sd-why-grid">
              {[
                { icon: "⚡", title: "Fast Delivery", desc: "Agile sprints that ensure quick releases without compromising quality." },
                { icon: "🛡️", title: "Secure Architecture", desc: "Industry-standard security practices with encryption and safe deployments." },
                { icon: "📈", title: "Scale-Ready Systems", desc: "Software designed to handle millions of users and high traffic loads effortlessly." },
                { icon: "🤝", title: "Dedicated Support", desc: "Post-deployment monitoring, regular updates, and continuous enhancements." }
              ].map((item, index) => (
                <div className="sd-feature-card" key={index}>
                  <div className="feature-icon-wrapper">{item.icon}</div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="sd-cta-section" id="contact">
          <div className="sd-cta-box glass-panel-purple">
            <div className="glow-circle"></div>
            <h2>Ready to Build Your Software?</h2>
            <p>
              Contact us today to get a free consultation and project estimation.
              Let's turn your idea into reality.
            </p>
            <Link to="/form" className="btn-white-pulse">Contact Us</Link>
          </div>
        </section>

      </div>
      <Footer />
    </>
  );
};

export default SD;