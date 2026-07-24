import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import Logo from '../Images/logo.png';

const HeaderContentWrapper = ({ children, className }) => (
  <div className={`container-max ${className || ''}`}>{children}</div>
);

const Header = () => {
  const [activeDropdown, setActiveDropdown] = useState(null); // 'solutions', 'services', 'industries', 'about' or null
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle mobile hamburger
  const toggleMenu = () => {
    if (isMenuOpen) {
      setActiveDropdown(null);
    }
    setIsMenuOpen(!isMenuOpen);
  };

  // Toggle specific dropdown (mainly for mobile click)
  const toggleDropdown = (dropdownName, e) => {
    e.preventDefault();
    if (activeDropdown === dropdownName) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdownName);
    }
  };

  // Hover handlers for desktop
  const handleMouseEnter = (dropdownName) => {
    if (window.innerWidth > 1024) {
      setActiveDropdown(dropdownName);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth > 1024) {
      setActiveDropdown(null);
    }
  };

  const closeMenuAndNavigate = () => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <>
      <header className="header">
        <HeaderContentWrapper className="header-content">
          {/* Logo Section */}
          <div className="logo">
            <Link to="/" onClick={closeMenuAndNavigate}>
              <img src={Logo} alt="DNISPL Logo" className="logo-img" />
            </Link>
          </div>

          {/* Hamburger Button */}
          <button className="hamburger" onClick={toggleMenu} aria-label="Toggle navigation menu">
            {isMenuOpen ? '✕' : '☰'}
          </button>

          {/* Navigation */}
          <nav className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
            <Link to="/" className="nav-link" onClick={closeMenuAndNavigate}>Home</Link>

            {/* SOLUTIONS DROPDOWN */}
            <div
              className="nav-item-dropdown"
              onMouseEnter={() => handleMouseEnter('solutions')}
              onMouseLeave={handleMouseLeave}
            >
              <a
                href="#solutions"
                className={`nav-link dropdown-btn ${activeDropdown === 'solutions' ? 'active' : ''}`}
                onClick={e => toggleDropdown('solutions', e)}
              >
                Solutions
                <span className={`arrow-icon ${activeDropdown === 'solutions' ? 'rotate' : ''}`}>▼</span>
              </a>

              {activeDropdown === 'solutions' && (
                <div className="dropdown-menu services-menu">
                  <div className="dropdown-header">
                    <h1 className="dropdown-subtitle">Enterprise solutions and architectures</h1>
                  </div>

                  <div className="dropdown-grid">
                    {[
                      { to: "/network-implementation", icon: "🌐", title: "Enterprise Networking", desc: "Active & Passive networking" },
                      { to: "/workforce-outsourcing", icon: "👥", title: "Managed Services", desc: "Ongoing IT support & management" },
                      { to: "/business-solutions", icon: "🖥️", title: "Cyber Security", desc: "Protecting your digital assets" },
                      { to: "/regulatory-compliance", icon: "📋", title: "Cloud Solutions", desc: "Scalable cloud infrastructure" },
                      { to: "/dc-passive-work", icon: "🔋", title: "DC Infrastructure", desc: "Data Center passive work" },
                      { to: "/about", icon: "🧠", title: "Collaboration", desc: "Expert IT guidance & strategy" },
                    ].map(item => (
                      <Link
                        key={item.to}
                        to={item.to}
                        className="dropdown-card"
                        onClick={closeMenuAndNavigate}
                      >
                        <div className="card-icon">{item.icon}</div>
                        <div className="card-info">
                          <span className="card-title">{item.title}</span>
                          <span className="card-desc">{item.desc}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* SERVICES DROPDOWN */}
            <div
              className="nav-item-dropdown"
              onMouseEnter={() => handleMouseEnter('services')}
              onMouseLeave={handleMouseLeave}
            >
              <a
                href="#services"
                className={`nav-link dropdown-btn ${activeDropdown === 'services' ? 'active' : ''}`}
                onClick={e => toggleDropdown('services', e)}
              >
                Services
                <span className={`arrow-icon ${activeDropdown === 'services' ? 'rotate' : ''}`}>▼</span>
              </a>

              {activeDropdown === 'services' && (
                <div className="dropdown-menu services-menu" style={{ width: '480px' }}>
                  <div className="dropdown-header">
                    <h1 className="dropdown-subtitle">Professional operational services portfolios</h1>
                  </div>
                  <div className="dropdown-grid" style={{ gridTemplateColumns: '1fr' }}>
                    {[
                      { title: "Managed Services", desc: "NOC, Managed Network, SLA-driven AMC, FMS, Resource Augmentation" },
                      { title: "Professional Services", desc: "Project Management, Network Audits, Deployment, Ekahau Wi-Fi Survey" },
                      { title: "Technical Support", desc: "L1, L2, L3 Support, SME Services, Resident Engineers" },
                      { title: "Workforce Solutions", desc: "Technical Manpower, Managed Desk Services, Field Engineers, Staffing" }
                    ].map((item, idx) => (
                      <div key={idx} className="dropdown-card" style={{ cursor: 'default' }}>
                        <div className="card-icon">🛠️</div>
                        <div className="card-info">
                          <span className="card-title">{item.title}</span>
                          <span className="card-desc">{item.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* INDUSTRIES DROPDOWN */}
            <div
              className="nav-item-dropdown"
              onMouseEnter={() => handleMouseEnter('industries')}
              onMouseLeave={handleMouseLeave}
            >
              <a
                href="#industries"
                className={`nav-link dropdown-btn ${activeDropdown === 'industries' ? 'active' : ''}`}
                onClick={e => toggleDropdown('industries', e)}
              >
                Industries
                <span className={`arrow-icon ${activeDropdown === 'industries' ? 'rotate' : ''}`}>▼</span>
              </a>

              {activeDropdown === 'industries' && (
                <div className="dropdown-menu services-menu" style={{ width: '560px' }}>
                  <div className="dropdown-header">
                    <h1 className="dropdown-subtitle">Sectors we secure and empower nationwide</h1>
                  </div>
                  <div className="dropdown-grid">
                    {[
                      { icon: "🏦", title: "Banking & Finance", desc: "Branch connectivity, Core Banking, SD-WAN" },
                      // { icon: "🏛️", title: "Government", desc: "Mission-critical secure infrastructure" },
                      { icon: "📡", title: "Telecom", desc: "NOC, Network rollouts, fiber operations" },
                      { icon: "🏭", title: "Manufacturing", desc: "Plant Networks & Industrial connectivity" },
                      { icon: "🏥", title: "Healthcare", desc: "Reliable Hospital Network infrastructures" },
                      { icon: "🎓", title: "Education", desc: "Campus Wi-Fi & Smart Network architectures" },
                      { icon: "🛒", title: "Retail", desc: "Multi-store Enterprise Networking and VPNs" },
                      { icon: "☁️", title: "Data Centers", desc: "Cisco ACI, Nexus fabric, security audits" },
                      { icon: "🏢", title: "Enterprise", desc: "End-to-end active/passive IT infrastructure" },
                      { icon: "🚚", title: "Logistics", desc: "Warehouse & Fleet connectivity frameworks" }
                    ].map((item, idx) => (
                      <div key={idx} className="dropdown-card" style={{ cursor: 'default' }}>
                        <div className="card-icon">{item.icon}</div>
                        <div className="card-info">
                          <span className="card-title">{item.title}</span>
                          <span className="card-desc">{item.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link to="/portfolio" className="nav-link" onClick={closeMenuAndNavigate}>Case Studies</Link>

            {/* ABOUT DROPDOWN */}
            <div
              className="nav-item-dropdown"
              onMouseEnter={() => handleMouseEnter('about')}
              onMouseLeave={handleMouseLeave}
            >
              <a
                href="#company"
                className={`nav-link dropdown-btn ${activeDropdown === 'about' ? 'active' : ''}`}
                onClick={e => toggleDropdown('about', e)}
              >
                About Us
                <span className={`arrow-icon ${activeDropdown === 'about' ? 'rotate' : ''}`}>▼</span>
              </a>

              {activeDropdown === 'about' && (
                <div className="dropdown-menu company-menu">
                  {[
                    { to: "/about", title: "About Us", desc: "Our history, engineering values, and outcomes." },
                    { to: "/leadership", title: "Leadership Team", desc: "Meet the founders and directors." },
                    { to: "/work", title: "How We Work", desc: "Agile execution, SoW, and SLA operations." },
                  ].map(item => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className="company-item"
                      onClick={closeMenuAndNavigate}
                    >
                      <div className="company-text">
                        <h4>{item.title}</h4>
                        <p>{item.desc}</p>
                      </div>
                      <span className="arrow-right">→</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/careers" className="nav-link" onClick={closeMenuAndNavigate}>Careers</Link>

            <Link to="/admin/login" className="nav-link admin-nav" onClick={closeMenuAndNavigate}>HR Portal</Link>

            <Link to="/form" className="btn-glow desktop-cta" onClick={closeMenuAndNavigate}>
              Start Project
            </Link>
          </nav>
        </HeaderContentWrapper>
      </header>

      {/* Mobile Fixed CTA */}
      <Link to="/form" className="btn-glow mobile-fixed-cta">
        Start Project
      </Link>
    </>
  );
};

export default Header;