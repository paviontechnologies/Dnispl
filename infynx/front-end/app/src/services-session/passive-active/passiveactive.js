import React, { useEffect } from 'react';
import './passiveactive.css';

const  passiveactive = ({ type }) => {
  
  const content = {
    web: {
      title: "Web Development",
      desc: "We build scalable, responsive, and high-performance web apps tailored to your needs.",
      icon: "fa-globe", theme: "web-theme",
      steps: ["Planning", "Design", "Coding", "Testing"]
    },
    app: {
      title: "Android & iOS Apps",
      desc: "Delivering seamless mobile experiences across devices with native and hybrid apps.",
      icon: "fa-mobile-alt", theme: "app-theme",
      steps: ["UX Wireframing", "App Design", "Development", "App Store Launch"]
    },
    ai: {
      title: "AI/ML Solutions",
      desc: "From NLP to predictive analytics, we help you integrate ML into real-world business apps.",
      icon: "fa-robot", theme: "ai-theme",
      steps: ["Data Collection", "Model Training", "Evaluation", "AI Integration"]
    },
    // Naya Active & Passive Section
    network: {
      title: "Active and Passive Infrastructure",
      desc: "We design, deploy, and maintain robust network infrastructure — from fiber and electrical to L2/L3 configuration.",
      icon: "fa-building",
      theme: "network-theme",
      features: [
        { icon: "fa-project-diagram", title: "Fiber Optic Installation", detail: "End-to-end OFC laying, splicing, termination, and testing." },
        { icon: "fa-bolt", title: "Electrical & Power Setup", detail: "DB panels, power cabling, earthing, DG & UPS integration." },
        { icon: "fa-network-wired", title: "L2 / L3 Configuration", detail: "Switching, routing, VLANs, and security on Cisco, Juniper, etc." },
        { icon: "fa-video", title: "Cat-6 & Surveillance", detail: "Structured cabling for workstations, Wi-Fi APs and IP cameras." },
        { icon: "fa-city", title: "Inside Building Implementation", detail: "End-to-end passive rollout for offices, campuses, and DCs." },
        { icon: "fa-map-marked-alt", title: "PAN India Rollouts", detail: "Standardized deployment across cities with central governance." }
      ]
    }
  };

  const data = content[type] || content.web;

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [type]);

  return (
    <div className={`details-page ${data.theme}`}>
      <section className="hero">
        <div className="blob-graphic"></div>
        <div className="hero-content reveal">
          <i className={`fas ${data.icon} main-icon`}></i>
          <h1>{data.title}</h1>
          <p>{data.desc}</p>
        </div>
      </section>

      <div className="container">
        <h2 className="reveal text-center">Our Expertise & Services</h2>
        
        
        <div className="features-grid">
          {(data.features || data.steps).map((item, index) => (
            <div key={index} className="feature-card reveal">
              <div className="card-header">
                {item.icon ? <i className={`fas ${item.icon}`}></i> : <span className="number">0{index + 1}</span>}
                <h4>{item.title || item}</h4>
              </div>
              <p>{item.detail || `Professional execution of ${item} for your infrastructure.`}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default passiveactive;