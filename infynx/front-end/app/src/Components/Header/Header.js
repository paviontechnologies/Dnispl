import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  ArrowRight, ChevronDown, Cloud, Code2, Database, Menu, Network,
  ShieldCheck, Users, Wrench, X
} from 'lucide-react';
import './Header.css';
import Logo from '../Images/logo.png';
import { INDUSTRIES } from '../../data/industries';

const solutionItems = [
  { to: '/network-implementation', icon: Network, title: 'Enterprise Networking', desc: 'Active and passive networking' },
  { to: '/business-solutions', icon: ShieldCheck, title: 'Cyber Security', desc: 'Protecting your digital assets' },
  { to: '/regulatory-compliance', icon: Cloud, title: 'Cloud Solutions', desc: 'Scalable cloud infrastructure' },
  { to: '/dc-passive-work', icon: Database, title: 'DC Infrastructure', desc: 'Data center passive work' },
  { to: '/software-development', icon: Code2, title: 'Software Development', desc: 'Web, mobile, cloud and AI builds' },
];

const serviceItems = [
  { to: '/services/managed', icon: Wrench, title: 'Managed Services', desc: 'NOC, managed network, AMC and FMS' },
  { to: '/services/professional', icon: Network, title: 'Professional Services', desc: 'Audits, deployment and project management' },
  { to: '/services/technical', icon: ShieldCheck, title: 'Technical Support', desc: 'L1, L2, L3 and SME services' },
  { to: '/services/workforce-solutions', icon: Users, title: 'Workforce Solutions', desc: 'Technical staffing and field engineers' },
  { to: '/software-development', icon: Code2, title: 'Software Development', desc: 'Custom platforms, APIs and integrations' },
];

/**
 * Built from the industries dataset so the menu can never advertise a sector
 * that has no page behind it. Data Centers is appended by hand — it is a
 * service page, not a sector, but it belongs in this menu commercially.
 */
const industryItems = [
  ...INDUSTRIES.map((industry) => ({
    to: `/industries/${industry.slug}`,
    icon: industry.icon,
    title: industry.name,
    desc: industry.tagline
  })),
  { to: '/dc-passive-work', icon: Database, title: 'Data Centers', desc: 'ACI, Nexus fabric and audits' }
];

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
          <button className="hamburger" onClick={toggleMenu} aria-label="Toggle navigation menu" aria-expanded={isMenuOpen}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Navigation */}
          <nav className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
            <NavLink to="/" end className="nav-link" onClick={closeMenuAndNavigate}>Home</NavLink>

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
                <ChevronDown className={`arrow-icon ${activeDropdown === 'solutions' ? 'rotate' : ''}`} />
              </a>

              {activeDropdown === 'solutions' && (
                <div className="dropdown-menu services-menu">
                  <div className="dropdown-header">
                    <h1 className="dropdown-subtitle">Enterprise solutions and architectures</h1>
                  </div>

                  <div className="dropdown-grid">
                    {solutionItems.map(item => (
                      <Link
                        key={item.to}
                        to={item.to}
                        className="dropdown-card"
                        onClick={closeMenuAndNavigate}
                      >
                        <div className="card-icon"><item.icon size={19} /></div>
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
                <ChevronDown className={`arrow-icon ${activeDropdown === 'services' ? 'rotate' : ''}`} />
              </a>

              {activeDropdown === 'services' && (
                <div className="dropdown-menu services-menu" style={{ width: '480px' }}>
                  <div className="dropdown-header">
                    <h1 className="dropdown-subtitle">Professional operational services portfolios</h1>
                  </div>
                  <div className="dropdown-grid" style={{ gridTemplateColumns: '1fr' }}>
                    {serviceItems.map((item) => (
                      <Link key={item.title} to={item.to} className="dropdown-card" onClick={closeMenuAndNavigate}>
                        <div className="card-icon"><item.icon size={19} /></div>
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
                <ChevronDown className={`arrow-icon ${activeDropdown === 'industries' ? 'rotate' : ''}`} />
              </a>

              {activeDropdown === 'industries' && (
                <div className="dropdown-menu services-menu" style={{ width: '580px' }}>
                  <div className="dropdown-header">
                    <h1 className="dropdown-subtitle">Sectors we secure and empower nationwide</h1>
                  </div>
                  <div className="dropdown-grid">
                    {industryItems.map((item) => (
                      <Link key={item.title} to={item.to} className="dropdown-card" onClick={closeMenuAndNavigate}>
                        <div className="card-icon"><item.icon size={19} /></div>
                        <div className="card-info">
                          <span className="card-title">{item.title}</span>
                          <span className="card-desc">{item.desc}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <Link to="/industries" className="dropdown-footer-link" onClick={closeMenuAndNavigate}>
                    View all industries <ArrowRight size={15} />
                  </Link>
                </div>
              )}
            </div>

            <NavLink to="/portfolio" className="nav-link" onClick={closeMenuAndNavigate}>Portfolio</NavLink>

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
                <ChevronDown className={`arrow-icon ${activeDropdown === 'about' ? 'rotate' : ''}`} />
              </a>

              {activeDropdown === 'about' && (
                <div className="dropdown-menu company-menu">
                  {[
                    { to: "/about", title: "About Us", desc: "Our history, engineering values, and outcomes." },
                    { to: "/leadership", title: "Leadership Team", desc: "Meet the founders and directors." },
                    { to: "/work", title: "How We Work", desc: "Agile execution, SoW, and SLA operations." },
                    { to: "/blog", title: "Blogs & News", desc: "Field notes from complex rollouts." },
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
                      <ArrowRight className="arrow-right" size={17} />
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <NavLink to="/careers" className="nav-link" onClick={closeMenuAndNavigate}>Careers</NavLink>

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