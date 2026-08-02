import React from 'react';
import { ArrowLeft, Cookie, FileCheck2, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { motion } from 'framer-motion';
import {
  AuroraBackdrop,
  Reveal,
  RevealGroup,
  SplitHeading,
  useScrollReveal
} from '../../motion/MotionKit';
import './InfoPage.css';

const TINT = { from: '#00E2F5', to: '#C4F017', glow: 'rgba(0, 226, 245, 0.28)' };

const pageContent = {
  privacy: {
    eyebrow: 'Data & Trust',
    title: 'Privacy Policy',
    intro: 'How DNISPL collects, uses, and protects information shared through our digital services.',
    icon: ShieldCheck,
    sections: [
      ['Information we collect', 'We collect contact and project information that you submit through forms, along with essential technical data used to keep the website reliable and secure.'],
      ['How we use it', 'Information is used to answer enquiries, deliver requested services, improve our operations, and maintain business records required by law.'],
      ['Your choices', 'You may request access, correction, or deletion of your personal information by contacting info@dnispl.com.'],
    ],
  },
  terms: {
    eyebrow: 'Working Agreement',
    title: 'Terms of Service',
    intro: 'The practical terms that govern use of this website and engagement with DNISPL services.',
    icon: FileCheck2,
    sections: [
      ['Website use', 'Content is provided for general business information. You agree not to misuse, disrupt, or attempt unauthorized access to the website or related systems.'],
      ['Project engagements', 'Commercial scope, delivery milestones, warranties, and support commitments are defined in the signed proposal or statement of work for each engagement.'],
      ['Intellectual property', 'DNISPL retains rights to its pre-existing methods and materials. Project-specific ownership is governed by the applicable client agreement.'],
    ],
  },
  cookies: {
    eyebrow: 'Your Experience',
    title: 'Cookie Policy',
    intro: 'A clear overview of small data files used to support site functionality and performance.',
    icon: Cookie,
    sections: [
      ['Essential cookies', 'These support core functions such as security, routing, and remembering basic preferences.'],
      ['Performance signals', 'Aggregated usage signals may help us understand page performance and improve navigation without identifying you directly.'],
      ['Browser controls', 'You can limit or remove cookies from your browser settings. Some essential functionality may be affected.'],
    ],
  },
};

export const InfoPage = ({ type }) => {
  const content = pageContent[type];
  const Icon = content.icon;
  useScrollReveal();

  return (
    <div className="info-page">
      <Header />
      <section className="info-hero">
        <AuroraBackdrop tint={TINT} cubes={false} />

        <div className="info-shell">
          <motion.span
            className="info-eyebrow"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Icon size={16} /> {content.eyebrow}
          </motion.span>

          <SplitHeading lines={[content.title]} />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {content.intro}
          </motion.p>

          <motion.span
            className="info-updated"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Last updated: July 2026
          </motion.span>
        </div>
      </section>

      <RevealGroup as="section" className="info-content info-shell">
        {content.sections.map(([title, body], index) => (
          <Reveal as="article" dir="left" className="info-card" key={title}>
            <span>0{index + 1}</span>
            <div><h2>{title}</h2><p>{body}</p></div>
          </Reveal>
        ))}
        <Reveal className="info-contact" dir="scale">
          <p>Questions about this policy?</p>
          <Link to="/form">Contact our team</Link>
        </Reveal>
      </RevealGroup>

      <Footer />
    </div>
  );
};

export const NotFound = () => (
  <div className="info-page not-found-page">
    <Header />
    <section className="not-found-content">
      <AuroraBackdrop tint={TINT} />

      <motion.span
        className="not-found-code"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 0.2, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        404
      </motion.span>

      <SplitHeading lines={['This route is off the network.']} />

      <motion.p
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
      >
        The page may have moved, but the rest of the infrastructure is online.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.65 }}
      >
        <Link to="/" className="info-home-link"><ArrowLeft size={18} /> Back to home</Link>
      </motion.div>
    </section>
    <Footer />
  </div>
);