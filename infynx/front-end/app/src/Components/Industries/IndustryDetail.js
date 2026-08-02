import React, { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Check, ChevronDown, Minus, ShieldCheck } from 'lucide-react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import {
  AuroraBackdrop,
  CountUp,
  MagneticButton,
  Marquee,
  NetworkLattice,
  Reveal,
  RevealGroup,
  ScrollFan,
  ScrollSpine,
  SpotlightCard,
  SplitHeading,
  useScrollReveal
} from '../../motion/MotionKit';
import { INDUSTRIES, getIndustry } from '../../data/industries';
import { projectsForIndustry } from '../../data/projects';
import './IndustryDetail.css';

/* Fan shades derived from the industry's own tint, so the six capability cards
   stay inside one hue family instead of pulling in the default rainbow. */
const fanPalette = (tint) => [
  { card: tint.from, badge: tint.to },
  { card: tint.to, badge: tint.from },
  { card: tint.from, badge: tint.to },
  { card: tint.to, badge: tint.from },
  { card: tint.from, badge: tint.to },
  { card: tint.to, badge: tint.from }
];

const Faq = ({ item, index, tint }) => {
  const [open, setOpen] = useState(index === 0);

  return (
    <Reveal className={`idt-faq ${open ? 'open' : ''}`}>
      <button
        type="button"
        className="idt-faq-q"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span>{item.q}</span>
        <ChevronDown className="idt-faq-arrow" size={19} />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className="idt-faq-a"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <p style={{ borderLeftColor: tint.from }}>{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </Reveal>
  );
};

const IndustryDetail = () => {
  const { slug } = useParams();
  const industry = getIndustry(slug);
  useScrollReveal();

  // An unknown slug is a bad URL, not a blank page — send it to the index
  // rather than rendering a shell with nothing in it.
  if (!industry) return <Navigate to="/industries" replace />;

  const {
    name, icon: Icon, eyebrow, tint, summary, headline, stats, pressures,
    capabilities, stack, outcomes, proof, compliance, faqs
  } = industry;

  const cases = projectsForIndustry(industry.slug);
  const siblings = INDUSTRIES.filter((i) => i.slug !== industry.slug).slice(0, 6);

  const cssTint = {
    '--fx-1': tint.from,
    '--fx-2': tint.to,
    '--fx-glow': tint.glow
  };

  return (
    <>
      <Header />

      <div className="idt-page" style={cssTint}>
        {/* ---------------------------------------------------------- HERO */}
        <section className="idt-hero">
          <AuroraBackdrop tint={tint} />

          <div className="container-max idt-hero-inner">
            <div className="idt-hero-copy">
              <Reveal className="idt-breadcrumb">
                <Link to="/industries">Industries</Link>
                <span aria-hidden="true">/</span>
                <span className="idt-crumb-current">{name}</span>
              </Reveal>

              <Reveal className="idt-badge" delay={60}>
                <span className="idt-badge-icon"><Icon size={16} /></span>
                {eyebrow}
              </Reveal>

              <SplitHeading
                className="idt-title"
                lines={headline.map((line, i) => (
                  <span key={i}>
                    {i === headline.length - 1 ? (
                      <span className="idt-title-accent">{line}</span>
                    ) : (
                      line
                    )}
                  </span>
                ))}
              />

              <Reveal className="idt-summary" delay={280}>
                {summary}
              </Reveal>

              <Reveal className="idt-hero-actions" delay={380}>
                <MagneticButton as={Link} to="/form" className="idt-btn-primary">
                  Talk to an architect
                </MagneticButton>
                {cases.length > 0 && (
                  <Link
                    to={`/portfolio?industry=${industry.slug}`}
                    className="idt-btn-ghost"
                  >
                    {cases.length} case {cases.length === 1 ? 'study' : 'studies'}
                    <ArrowRight size={15} />
                  </Link>
                )}
              </Reveal>
            </div>

            <Reveal className="idt-hero-visual" dir="scale" delay={140}>
              <NetworkLattice tint={tint} density={98} />
            </Reveal>
          </div>

          {/* Metric strip — counters run up on entry */}
          <RevealGroup className="container-max idt-stats">
            {stats.map((stat) => (
              <Reveal key={stat.label} className="idt-stat" dir="scale">
                <span className="idt-stat-value"><CountUp value={stat.value} /></span>
                <span className="idt-stat-label">{stat.label}</span>
              </Reveal>
            ))}
          </RevealGroup>
        </section>

        {/* ------------------------------------------------------- PRESSURES */}
        <section className="idt-pressures">
          <div className="container-max">
            <Reveal className="idt-head">
              <span className="idt-tag">What actually breaks</span>
              <h2 className="idt-h2">
                The pressures we design <span className="idt-accent">against</span>
              </h2>
            </Reveal>

            <div className="idt-pressure-layout">
              <ScrollSpine tint={tint} className="idt-pressure-spine" />

              <RevealGroup className="idt-pressure-list">
                {pressures.map((item, index) => (
                  <Reveal key={item.title} className="idt-pressure" dir="left">
                    <span className="idt-pressure-num">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="idt-pressure-body">
                      <h3>{item.title}</h3>
                      <p>{item.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </RevealGroup>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------- CAPABILITIES */}
        <section className="idt-capabilities">
          <div className="container-max">
            <Reveal className="idt-head center">
              <span className="idt-tag">What we bring</span>
              <h2 className="idt-h2">
                Capabilities for <span className="idt-accent">{name.toLowerCase()}</span>
              </h2>
              <p className="idt-head-desc">
                Six things this sector consistently needs, and which we deliver
                under one accountable scope.
              </p>
            </Reveal>
          </div>

          {/* Cards fly in from their own side of the viewport and settle into a fan */}
          <ScrollFan
            items={capabilities}
            palette={fanPalette(tint)}
            keyOf={(item) => item.title}
            renderCard={(cap, index) => (
              <div className="fx-fan-card">
                <div className="fx-fan-badge">{String(index + 1).padStart(2, '0')}</div>
                <h3>{cap.title}</h3>
                <p>{cap.desc}</p>
              </div>
            )}
          />
        </section>

        {/* ----------------------------------------------------- STACK STRIP */}
        <section className="idt-stack">
          <div className="container-max">
            <Reveal className="idt-stack-label">
              <ShieldCheck size={16} /> Typical stack in this sector
            </Reveal>
          </div>
          <Marquee
            items={stack}
            speed={38}
            renderItem={(tech) => <span className="idt-stack-item">{tech}</span>}
          />
        </section>

        {/* -------------------------------------------- OUTCOMES + COMPLIANCE */}
        <section className="idt-outcomes">
          <div className="container-max idt-outcomes-inner">
            <Reveal className="idt-outcomes-copy" dir="left">
              <span className="idt-tag">Measured results</span>
              <h2 className="idt-h2">
                What changed <span className="idt-accent">afterwards</span>
              </h2>

              <RevealGroup className="idt-outcome-list">
                {outcomes.map((outcome) => (
                  <Reveal key={outcome.label} className="idt-outcome" dir="left">
                    <span className="idt-outcome-metric">{outcome.metric}</span>
                    <span className="idt-outcome-text">
                      <strong>{outcome.label}</strong>
                      <span>{outcome.note}</span>
                    </span>
                  </Reveal>
                ))}
              </RevealGroup>

              {proof && (
                <Reveal className="idt-proof" dir="scale">
                  <span className="idt-proof-tag">Delivered for</span>
                  <strong>{proof.client}</strong>
                  <p>{proof.note}</p>
                </Reveal>
              )}
            </Reveal>

            <Reveal className="idt-compliance" dir="right">
              <h3>Evidence you get</h3>
              <p className="idt-compliance-lead">
                Produced during the work, not reconstructed for the audit.
              </p>
              <ul>
                {compliance.map((item) => (
                  <li key={item}>
                    <Check size={15} /> {item}
                  </li>
                ))}
              </ul>
              <Link to="/work" className="idt-inline-link">
                How we run engagements <ArrowRight size={14} />
              </Link>
            </Reveal>
          </div>
        </section>

        {/* ---------------------------------------------------- CASE STUDIES */}
        {cases.length > 0 && (
          <section className="idt-cases">
            <div className="container-max">
              <Reveal className="idt-head idt-head-row">
                <div>
                  <span className="idt-tag">Proof</span>
                  <h2 className="idt-h2">
                    {name} work we have <span className="idt-accent">shipped</span>
                  </h2>
                </div>
                <Link
                  to={`/portfolio?industry=${industry.slug}`}
                  className="idt-btn-ghost"
                >
                  Open in case studies <ArrowRight size={15} />
                </Link>
              </Reveal>

              <RevealGroup className="idt-case-grid">
                {cases.map((project) => (
                  <Reveal key={project.id} className="idt-case-shell">
                    <SpotlightCard className="idt-case fx-lift">
                      <span className="idt-case-top">
                        <span className="idt-case-tag">{project.tag}</span>
                        <span className="idt-case-cat">{project.category}</span>
                      </span>
                      <h3>{project.title}</h3>
                      <p className="idt-case-problem">{project.problem}</p>
                      <ul className="idt-case-impact">
                        {project.impact.map((point) => (
                          <li key={point}>
                            <Check size={14} /> {point}
                          </li>
                        ))}
                      </ul>
                      <span className="idt-case-stack">{project.techStack}</span>
                    </SpotlightCard>
                  </Reveal>
                ))}
              </RevealGroup>
            </div>
          </section>
        )}

        {/* ------------------------------------------------------------ FAQ */}
        <section className="idt-faqs">
          <div className="container-max idt-faq-inner">
            <Reveal className="idt-faq-aside" dir="left">
              <span className="idt-tag">Questions we get</span>
              <h2 className="idt-h2">
                Before you <span className="idt-accent">commit</span>
              </h2>
              <p>
                If your question isn’t here, it is probably specific to your
                estate — which is the kind we prefer answering directly.
              </p>
              <MagneticButton as={Link} to="/form" className="idt-btn-primary">
                Ask us directly
              </MagneticButton>
            </Reveal>

            <div className="idt-faq-list">
              {faqs.map((item, index) => (
                <Faq key={item.q} item={item} index={index} tint={tint} />
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------- OTHER SECTORS */}
        <section className="idt-siblings">
          <div className="container-max">
            <Reveal className="idt-head center">
              <span className="idt-tag">Also relevant</span>
              <h2 className="idt-h2">Other sectors we operate in</h2>
            </Reveal>

            <RevealGroup className="idt-sibling-grid">
              {siblings.map((sibling) => {
                const SiblingIcon = sibling.icon;
                return (
                  <Reveal key={sibling.slug} className="idt-sibling-shell">
                    <Link
                      to={`/industries/${sibling.slug}`}
                      className="idt-sibling"
                      style={{ '--fx-1': sibling.tint.from, '--fx-2': sibling.tint.to }}
                    >
                      <span className="idt-sibling-icon"><SiblingIcon size={18} /></span>
                      <span className="idt-sibling-text">
                        <strong>{sibling.name}</strong>
                        <span>{sibling.tagline}</span>
                      </span>
                      <ArrowRight size={16} className="idt-sibling-arrow" />
                    </Link>
                  </Reveal>
                );
              })}
            </RevealGroup>

            <Reveal className="idt-sibling-all">
              <Link to="/industries" className="idt-btn-ghost">
                View all industries <ArrowRight size={15} />
              </Link>
            </Reveal>
          </div>
        </section>

        {/* ------------------------------------------------------------ CTA */}
        <section className="idt-cta">
          <Reveal className="idt-cta-box" dir="scale">
            <span className="idt-cta-grid" aria-hidden="true" />
            <span className="idt-cta-eyebrow">
              <Minus size={14} /> {name}
            </span>
            <h2>Tell us what’s failing and when.</h2>
            <p>
              Bring the outage pattern, the audit finding, or the rollout date you
              cannot miss. We will come back with an architecture and a plan that
              fits the window.
            </p>
            <div className="idt-cta-actions">
              <MagneticButton as={Link} to="/form" className="idt-btn-primary">
                Request an architecture audit
              </MagneticButton>
              <a href="tel:+911244234805" className="idt-btn-ghost">
                +91 124 423 4805
              </a>
            </div>
          </Reveal>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default IndustryDetail;
