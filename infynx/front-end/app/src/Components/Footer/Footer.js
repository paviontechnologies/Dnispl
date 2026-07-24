import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import Logo from '../Images/logo.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-glow"></div>

      <div className="footer-container">
        <div className="footer-top">
          
          {/* Brand Column */}
          <div className="footer-brand">
            <div className="logo-section">
              <img src={Logo} alt="DNISPL Logo" className="footer-logo-img" />
            </div>
            <p className="brand-desc">
              Building Enterprise Networks That Don't Fail When Business Can't. Strategic Network Integration & Operations at Scale.
            </p>
            <div className="contact-details-footer" style={{ marginTop: '20px', fontSize: '13.5px', color: '#9ca3af', lineHeight: '1.8' }}>
              <p>📍 <strong>HQ NCR:</strong> Worldmark Sector-69, Gurugram, Haryana</p>
              <p>📞 <strong>Tel:</strong> +91-1244234805</p>
              <p>📞 <strong>Toll Free:</strong> 1800-3135657</p>
              <p>📧 <strong>Sales:</strong> sales@dnispl.com</p>
              <p>📧 <strong>General:</strong> info@dnispl.com</p>
            </div>
          </div>

          <div className="footer-links-wrapper">
            <div className="footer-column">
              <h4>Solutions</h4>
              <Link to="/network-implementation">Enterprise Networking</Link>
              <Link to="/workforce-outsourcing">Managed Services</Link>
              <Link to="/business-solutions">Cyber Security</Link>
              <Link to="/regulatory-compliance">Cloud Solutions</Link>
              <Link to="/dc-passive-work">DC Infrastructure</Link>
            </div>

            <div className="footer-column">
              <h4>Company</h4>
              <Link to="/about">About Us</Link>
              <Link to="/careers">Careers</Link>
              <Link to="/blog">Blogs & News</Link>
              <Link to="/form">Contact Us</Link>
            </div>

            <div className="footer-column">
              <h4>Legal</h4>
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Service</Link>
              <Link to="/cookies">Cookie Policy</Link>
            </div>
          </div>

          <div className="footer-newsletter">
            <h4>Stay Connected</h4>
            <p>Pan-India Main support Hubs in NCR, Mumbai, Kolkata, Hyderabad, Bangalore, Chennai.</p>
            <div className="newsletter-spacer" style={{ height: '15px' }}></div>
            <p className="footer-copyright" style={{ fontSize: '12px', opacity: 0.6 }}>
              © 2026 Diversified Network & Infra Solutions Pvt. Ltd. (DNISPL). All rights reserved.
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>Reliability is engineered, not assumed.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;