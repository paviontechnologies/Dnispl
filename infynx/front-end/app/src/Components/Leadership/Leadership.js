import React from "react";
import "./Leadership.css";
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import ceoImage from '../Images/Rakesh.jpg';  
// Ensure these images exist or use placeholders
// import ceoAvatar from '../Images/ceo-avatar.jpg';
// import ceoMain from '../Images/ceo-main.png';

const ContentWrapper = ({ children, className }) => (
    <div className={`about-content-wrapper ${className || ""}`}>
        {children}
    </div>
);

const Leadership = () => {
  return (
    <div className="leadership-page-container">
      <Header />

      {/* --- BACKGROUND ANIMATION LAYER --- */}
      <div className="global-bg-shapes">
        <div className="shape shape-blue"></div>
        <div className="shape shape-purple"></div>
        <div className="shape shape-teal"></div>
      </div>

      {/* 1️⃣ HERO / TOP SECTION */}
      <section className="leadership-section">
        <div className="leadership-wrapper">
          
          {/* LEFT SIDE */}
          <div className="leadership-left fade-in-up">
            <div className="leader-badge glass-pill">
              <img
                src={ceoImage} // Placeholder
                alt="Managing Director"
                className="leader-avatar"
              />
              <div className="leader-badge-text">
                <p className="leader-name">Rakesh Uniyal</p>
                <p className="leader-role">Managing Director</p>
              </div>
            </div>

            <h1 className="leader-title">
              Let's Build Your Product & <br />
              <span className="text-gradient">Scale it Together</span>
            </h1>

            <p className="leader-desc">
              Thanks for connecting. We're a full-stack tech company helping
              startups and SMEs build scalable apps, websites, and automation
              tools — with growth in mind.
            </p>

            <div className="leader-buttons">
              <button className="btn-glow">Schedule a Call</button>
              <button className="btn-glass">Call Me Now</button>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="leadership-right fade-in-right">
            <div className="image-glass-container floating-anim">
                <div className="blob-bg"></div>
                <img
                    src="./images/ceo-main.png" // Replace with actual CEO Image
                    alt="Rakesh Uniyal"
                    className="leader-main-img"
                />
                
                {/* Floating Decor Elements */}
                <div className="floating-card card-1">
                    <span>🚀</span>
                    <p>Growth</p>
                </div>
                <div className="floating-card card-2">
                    <span>💡</span>
                    <p>Innovation</p>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2️⃣ Custom Web, Mobile & AI Development Section */}
      <section className="ls-about-services-section">
        <ContentWrapper className="ls-about-services-inner">
          
          {/* Left side text */}
          <div className="ls-about-left fade-in-left">
            <p className="section-tag">• ABOUT US</p>
            <h2 className="ls-about-title">
              Custom Web, Mobile & <br />
              <span className="text-gradient-blue">AI Development</span>
            </h2>

            <p className="ls-about-desc">
              We're a full-stack tech company helping startups and SMEs build
              scalable apps, websites, and automation tools. With years of
              expertise across multiple industries, our team has delivered
              innovative digital solutions to clients worldwide.
            </p>

            <div className="ls-about-actions">
              <button className="btn-primary-dark">Explore more</button>
              <button className="btn-outline-dark">Watch video</button>
            </div>
          </div>

          {/* Right side image */}
          <div className="ls-about-right fade-in-right">
            <div className="ls-image-card hover-tilt">
              <div className="card-shine"></div>
              <img
                src="https://images.unsplash.com/photo-1553877615-30c73a63bbc4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Team collaborating"
                className="ls-about-image"
              />
            </div>
          </div>
        </ContentWrapper>
      </section>

      {/* 3️⃣ NEW: Stats Strip */}
      <section className="ls-stats-section">
        <ContentWrapper>
            <div className="ls-stats-grid">
                <div className="ls-stat-card glass-card">
                    <div className="stat-icon">👥</div>
                    <p className="ls-stat-value">10k+</p>
                    <p className="ls-stat-label">Users Impacted</p>
                </div>

                <div className="ls-stat-card glass-card">
                    <div className="stat-icon">💻</div>
                    <p className="ls-stat-value">80+</p>
                    <p className="ls-stat-label">Projects Delivered</p>
                </div>

                <div className="ls-stat-card glass-card">
                    <div className="stat-icon">🌍</div>
                    <p className="ls-stat-value">8+</p>
                    <p className="ls-stat-label">Countries Served</p>
                </div>

                <div className="ls-stat-card glass-card">
                    <div className="stat-icon">🎧</div>
                    <p className="ls-stat-value">24/7</p>
                    <p className="ls-stat-label">Client Support</p>
                </div>
            </div>
        </ContentWrapper>
      </section>

      
      {/* 4️⃣ LEADERSHIP TEAM SECTION */}
      <section className="executive-team-section">
        <ContentWrapper>

          <div className="executive-team-header fade-in-up">
            <p className="section-tag">• OUR LEADERSHIP</p>
            <h2 className="executive-team-title">
              Meet the Minds Behind <br />
              <span className="text-gradient-blue">Our Vision & Growth</span>
            </h2>
            <p className="executive-team-desc">
              Our leadership team brings decades of experience across telecom,
              technology, digital transformation, operations, strategy, and
              enterprise sales.
            </p>
          </div>

          <div className="executive-team-grid">
            {/* FOUNDER */}
              <div className="executive-card fade-in-up">
                <div className="executive-card-image">
                  <img src={ceoImage} alt="Rakesh Uniyal - Founder" />
                  <div className="executive-card-overlay"></div>
              </div>

              <div className="executive-card-content">
                <span className="executive-role">FOUNDER</span>
                <h3>Rakesh Uniyal</h3>
                <p className="executive-description">
                  Over 2 decades of experience, including a decade with Airtel, with expertise in Management, Operations, Strategic Planning, and Distribution. A seasoned professional with extensive experience in the Telecom and Retail industries.
               </p>

                <div className="executive-experience">
                  <span>20+</span>
                  <small>Years of Experience</small>
                </div>
              </div>
          </div>


          {/* CEO */}
          <div className="executive-card fade-in-up">
            <div className="executive-card-image">
              <img
                src="/images/ashish-mehra.jpg"
                alt="Ashish Mehra - CEO"
              />
              <div className="executive-card-overlay"></div>
            </div>

            <div className="executive-card-content">
              <span className="executive-role">CHIEF EXECUTIVE OFFICER</span>

              <h3>Ashish Mehra</h3>

              <p className="executive-description">
                Experienced leader with senior roles at Singtel, Airtel, and Hitachi. He brings strong B2B expertise, global digital transformation experience, and CXO-level relationships to drive strategic and sustainable growth.
              </p>

              <div className="executive-experience">
                <span>Global</span>
                <small>Digital Transformation Leadership</small>
              </div>
            </div>
          </div>


          {/* HEAD OF SALES */}
          <div className="executive-card fade-in-up">
            <div className="executive-card-image">
              <img
                src="/images/awadesh-gupta.jpg"
                alt="Awadesh Gupta - Head of Sales"
              />
              <div className="executive-card-overlay"></div>
            </div>

            <div className="executive-card-content">
              <span className="executive-role">HEAD OF SALES</span>

              <h3>Awadhesh Gupta</h3>

              <p className="executive-description">
                Over 2 decades of experience with Airtel, NTT, and Sify. A seasoned Presales Consultant with expertise in IT services, enterprise solutions, client engagement, and business development.
              </p>

              <div className="executive-experience">
                <span>20+</span>
                <small>Years of Experience</small>
              </div>
            </div>
          </div>

          </div>

        </ContentWrapper>
      </section>


      <Footer />
    </div>
  );
};

export default Leadership;