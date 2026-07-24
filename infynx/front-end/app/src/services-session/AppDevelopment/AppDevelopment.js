import React, { useEffect } from 'react';
import './AppDevelopment.css';

const AppDevelopment = () => {
  useEffect(() => {
    // Scroll hone par elements ko reveal karne ka logic
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="app-page">
      {/* Hero Section with Graphic Design feel */}
      <section className="app-hero">
        <div className="hero-content">
          <h1 className="reveal">Android & iOS Apps</h1>
          <p className="reveal">
            Delivering seamless mobile experiences across devices with native and hybrid apps.
          </p>
          <div className="scroll-indicator"></div>
        </div>
      </section>

      <div className="container">
        {/* Animated Background Shape */}
        <div className="graphic-blob"></div>

        {/* Feature Cards */}
        <div className="details-grid">
          <div className="detail-card reveal">
            <div className="icon-box"><i className="fas fa-mobile-alt"></i></div>
            <h3>Native Experience</h3>
            <p>High-performance apps built specifically for iOS (Swift) and Android (Kotlin).</p>
          </div>
          <div className="detail-card reveal">
            <div className="icon-box"><i className="fas fa-infinity"></i></div>
            <h3>Cross-Platform</h3>
            <p>One codebase for both platforms using React Native or Flutter to save time and cost.</p>
          </div>
        </div>

        {/* Development Process Graphic Section */}
        <section className="process-section">
          <h2 className="reveal">How We Develop</h2>
          
          <div className="timeline">
            <div className="step reveal">
              <span className="step-num">01</span>
              <h4>Wireframing</h4>
              <p>Creating the blueprint and user flow of your mobile app.</p>
            </div>
            <div className="step reveal">
              <span className="step-num">02</span>
              <h4>UI/UX Design</h4>
              <p>Designing modern, "thumb-friendly" interfaces with premium graphics.</p>
            </div>
            <div className="step reveal">
              <span className="step-num">03</span>
              <h4>Development</h4>
              <p>Coding with robust architecture and secure API integration.</p>
            </div>
            <div className="step reveal">
              <span className="step-num">04</span>
              <h4>Deployment</h4>
              <p>Final testing and publishing on Apple App Store & Google Play Store.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AppDevelopment;