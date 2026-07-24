import React, { useEffect } from 'react';
import './ServiceDetail.css';

const AIMLDevelopment = () => {
  useEffect(() => {
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
    <div className="service-page ai-theme">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="icon-wrapper reveal">
             <i className="fas fa-robot"></i> {/* AI Robot Icon */}
          </div>
          <h1 className="reveal">AI/ML Solutions</h1>
          <p className="reveal">
            From NLP to predictive analytics, we help you integrate ML into real-world business apps.
          </p>
        </div>
      </section>

      <div className="container">
        {/* Graphic Design Element */}
        <div className="floating-graphic"></div>

        <div className="details-grid">
          <div className="detail-card reveal">
            <i className="fas fa-brain"></i>
            <h3>Neural Networks</h3>
            <p>Building deep learning models that mimic human intelligence for complex tasks.</p>
          </div>
          <div className="detail-card reveal">
            <i className="fas fa-chart-line"></i>
            <h3>Predictive Analytics</h3>
            <p>Using historical data to predict future trends and business outcomes.</p>
          </div>
        </div>

        {/* Process Section */}
        <section className="process-section">
          <h2 className="reveal">The Development Lifecycle</h2>
                    <div className="timeline">
            <div className="step reveal">
              <span>01</span>
              <h4>Data Collection</h4>
              <p>Gathering and cleaning high-quality data for training.</p>
            </div>
            <div className="step reveal">
              <span>02</span>
              <h4>Model Training</h4>
              <p>Choosing algorithms and training models for high accuracy.</p>
            </div>
            <div className="step reveal">
              <span>03</span>
              <h4>Evaluation</h4>
              <p>Rigorous testing to ensure predictions are reliable.</p>
            </div>
            <div className="step reveal">
              <span>04</span>
              <h4>Integration</h4>
              <p>Deploying AI models into your existing software infrastructure.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AIMLDevelopment;