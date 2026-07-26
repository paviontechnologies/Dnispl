import React from 'react';
import { ArrowLeft, Cookie, FileCheck2, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './InfoPage.css';

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

  return (
    <div className="info-page">
      <Header />
      <section className="info-hero">
        <div className="info-shell">
          <span className="info-eyebrow"><Icon size={16} /> {content.eyebrow}</span>
          <h1>{content.title}</h1>
          <p>{content.intro}</p>
          <span className="info-updated">Last updated: July 2026</span>
        </div>
      </section>
      <section className="info-content info-shell">
        {content.sections.map(([title, body], index) => (
          <article className="info-card" key={title}>
            <span>0{index + 1}</span>
            <div><h2>{title}</h2><p>{body}</p></div>
          </article>
        ))}
        <div className="info-contact">
          <p>Questions about this policy?</p>
          <Link to="/form">Contact our team</Link>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export const NotFound = () => (
  <div className="info-page not-found-page">
    <Header />
    <section className="not-found-content">
      <span className="not-found-code">404</span>
      <h1>This route is off the network.</h1>
      <p>The page may have moved, but the rest of the infrastructure is online.</p>
      <Link to="/" className="info-home-link"><ArrowLeft size={18} /> Back to home</Link>
    </section>
    <Footer />
  </div>
);