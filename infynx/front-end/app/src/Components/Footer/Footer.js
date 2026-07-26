import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';
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
              <Link to="/"><img src={Logo} alt="DNISPL Logo" className="footer-logo-img" /></Link>
            </div>
            <p className="brand-desc">
              Building Enterprise Networks That Don't Fail When Business Can't. Strategic Network Integration & Operations at Scale.
            </p>
            <div className="contact-details-footer">
              <a href="https://maps.google.com/?q=WorldMark+Gurugram" target="_blank" rel="noreferrer"><MapPin size={15} /><span><strong>HQ NCR:</strong> Worldmark, Gurugram</span></a>
              <a href="tel:+911244234805"><Phone size={15} /><span><strong>Tel:</strong> +91 124 423 4805</span></a>
              <a href="tel:18003135657"><Phone size={15} /><span><strong>Toll Free:</strong> 1800 313 5657</span></a>
              <a href="mailto:sales@dnispl.com"><Mail size={15} /><span><strong>Sales:</strong> sales@dnispl.com</span></a>
              <a href="mailto:info@dnispl.com"><Mail size={15} /><span><strong>General:</strong> info@dnispl.com</span></a>
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