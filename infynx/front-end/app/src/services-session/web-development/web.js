import React, { useEffect } from 'react';
import './WebDevelopment.css';

const WebDevelopment = () => {
  useEffect(() => {
    // Scroll Animation Logic using Intersection Observer
    const observerOptions = {
      threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect(); // Cleanup on unmount
  }, []);

  return (
    <div className="web-dev-page">
      {/* Hero Section */}
      <section className="hero-section">
        <h1 className="reveal">Web Development Services</h1>
        <p className="reveal">We create high-performance, scalable, and secure web applications.</p>
      </section>

      <div className="container">
        <div className="abstract-shape"></div>

        {/* Details Cards */}
        <section className="details-grid">
          <div className="detail-card reveal">
            <i className="fas fa-code"></i>
            <h3>Our Tech Stack</h3>
            <p>We use modern technologies like React, Node.js, and Next.js to ensure speed and SEO optimization.</p>
          </div>
          <div className="detail-card reveal">
            <i className="fas fa-mobile-alt"></i>
            <h3>Responsive Design</h3>
            <p>Your website will look perfect on every screen size, from mobile phones to large desktops.</p>
          </div>
        </section>

        {/* Process Timeline */}
        <section className="process-section">
          <h2 className="reveal">How We Build It</h2>
          <div className="timeline">
            {[
              { id: '01', title: 'Planning & Strategy', desc: 'Understanding requirements and creating wireframes.' },
              { id: '02', title: 'UI/UX Design', desc: 'Crafting beautiful and user-friendly interfaces.' },
              { id: '03', title: 'Development', desc: 'Writing clean, efficient, and maintainable code.' },
              { id: '04', title: 'Testing & Launch', desc: 'Rigorous testing before the final deployment.' }
            ].map((step, index) => (
              <div key={index} className="step reveal">
                <span>{step.id}</span>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default WebDevelopment;