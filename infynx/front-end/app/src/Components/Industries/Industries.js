import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
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
  SpotlightCard,
  SplitHeading,
  useScrollReveal
} from '../../motion/MotionKit';
import { INDUSTRIES } from '../../data/industries';
import { PROJECTS } from '../../data/projects';
import './Industries.css';

const TINT = { from: '#00E2F5', to: '#B325F7', glow: 'rgba(0, 226, 245, 0.30)' };

const SCALE = [
  { value: '100+', label: 'Active locations' },
  { value: '2000+', label: 'Managed devices' },
  { value: '18', label: 'Sparing hubs' },
  { value: '24/7', label: 'NOC coverage' }
];

const OEMS = [
  'Cisco', 'Fortinet', 'HPE / Aruba', 'Juniper Networks',
  'Lenovo Enterprise', 'Cato Networks', 'Cisco ACI', 'Nexus Spine'
];

const Industries = () => {
  useScrollReveal();

  return (
    <>
      <Header />

      <div className="ind-page">
        {/* ---------------------------------------------------------- HERO */}
        <section className="ind-hero">
          <AuroraBackdrop tint={TINT} />

          <div className="container-max ind-hero-inner">
            <div className="ind-hero-copy">
              <Reveal className="ind-eyebrow">
                <span className="ind-dot" /> SECTORS WE OPERATE IN
              </Reveal>

              {/* Split so each line fits the column without re-wrapping — a
                  wrapped line animates as one block and strands its last word. */}
              <SplitHeading
                className="ind-hero-title"
                lines={[
                  <span key="a">Every sector breaks</span>,
                  <span key="b">its network <span className="text-gradient-blue">differently</span>.</span>
                ]}
              />

              <Reveal className="ind-hero-lead" delay={220}>
                A branch estate fails on failover time. A shop floor fails on
                segmentation. A warehouse fails on RF behaviour eight metres up a
                rack. Same discipline, different failure mode — so we design and
                operate each sector on its own terms.
              </Reveal>

              <Reveal className="ind-hero-actions" delay={340}>
                <MagneticButton as={Link} to="/form" className="ind-btn-primary">
                  Discuss your environment
                </MagneticButton>
                <Link to="/portfolio" className="ind-btn-ghost">
                  See the case studies
                </Link>
              </Reveal>
            </div>

            <Reveal className="ind-hero-visual" dir="scale" delay={180}>
              <NetworkLattice tint={TINT} density={104} />
            </Reveal>
          </div>

          <RevealGroup className="container-max ind-scale-strip">
            {SCALE.map((item) => (
              <Reveal key={item.label} className="ind-scale-item" dir="scale">
                <span className="ind-scale-value"><CountUp value={item.value} /></span>
                <span className="ind-scale-label">{item.label}</span>
              </Reveal>
            ))}
          </RevealGroup>
        </section>

        {/* ------------------------------------------------------ OEM STRIP */}
        <section className="ind-oem-strip">
          <Marquee
            items={OEMS}
            speed={42}
            renderItem={(name) => <span className="ind-oem">{name}</span>}
          />
        </section>

        {/* ----------------------------------------------------------- GRID */}
        <section className="ind-grid-section">
          <div className="container-max">
            <Reveal className="ind-section-head">
              <span className="ind-section-tag">Industries</span>
              <h2 className="ind-section-title">
                Ten sectors, each with its own{' '}
                <span className="text-gradient-purple">failure mode</span>
              </h2>
              <p className="ind-section-desc">
                Pick a sector to see the pressures we design against, the
                capabilities we bring, and the work we have already delivered
                there.
              </p>
            </Reveal>

            <RevealGroup className="ind-grid">
              {INDUSTRIES.map((industry) => {
                const Icon = industry.icon;
                const proofCount = PROJECTS.filter(
                  (p) => p.industryKey === industry.slug
                ).length;

                return (
                  <Reveal key={industry.slug} className="ind-card-shell">
                    <SpotlightCard
                      as={Link}
                      to={`/industries/${industry.slug}`}
                      className="ind-card fx-lift"
                      style={{
                        '--fx-1': industry.tint.from,
                        '--fx-2': industry.tint.to,
                        '--fx-glow': industry.tint.glow
                      }}
                    >
                      <span className="ind-card-rule" aria-hidden="true" />

                      <span className="ind-card-top">
                        <span className="ind-card-icon">
                          <Icon size={22} />
                        </span>
                        {proofCount > 0 && (
                          <span className="ind-card-count">
                            {proofCount} case {proofCount === 1 ? 'study' : 'studies'}
                          </span>
                        )}
                      </span>

                      <span className="ind-card-eyebrow">{industry.eyebrow}</span>
                      <h3 className="ind-card-title">{industry.name}</h3>
                      <span className="ind-card-desc">{industry.blurb}</span>

                      <span className="ind-card-foot">
                        Explore sector <ArrowRight size={15} />
                      </span>
                    </SpotlightCard>
                  </Reveal>
                );
              })}
            </RevealGroup>
          </div>
        </section>

        {/* ------------------------------------------------------ APPROACH */}
        <section className="ind-approach">
          <div className="container-max ind-approach-inner">
            <Reveal className="ind-approach-copy" dir="left">
              <span className="ind-section-tag">How the sectors converge</span>
              <h2 className="ind-section-title">
                Different pressures.{' '}
                <span className="text-gradient-blue">One discipline.</span>
              </h2>
              <p className="ind-approach-lead">
                Whatever the sector, the same four commitments decide whether the
                estate holds up two years after handover.
              </p>

              <RevealGroup className="ind-approach-list">
                {[
                  {
                    title: 'Design over devices',
                    desc: 'Architecture first, OEM second. The solution decides the hardware, not a stock position.'
                  },
                  {
                    title: 'Lifecycle over projects',
                    desc: 'Build → operate → optimise. We stay on the estate after the cutover, because that is where it drifts.'
                  },
                  {
                    title: 'Outcome over SLAs',
                    desc: 'Uptime that satisfies a report but not the business is a failure with good paperwork.'
                  },
                  {
                    title: 'Evidence by default',
                    desc: 'As-builts, Fluke and OTDR records, config baselines, and a findings register — produced during the work.'
                  }
                ].map((item, index) => (
                  <Reveal key={item.title} className="ind-approach-item" dir="left">
                    <span className="ind-approach-num">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="ind-approach-text">
                      <strong>{item.title}</strong>
                      <span>{item.desc}</span>
                    </span>
                  </Reveal>
                ))}
              </RevealGroup>
            </Reveal>

            <Reveal className="ind-approach-visual" dir="right">
              <NetworkLattice tint={{ from: '#B325F7', to: '#00E2F5', glow: 'rgba(179, 37, 247, 0.28)' }} variant="grid" density={100} />
              <p className="ind-approach-caption">
                Deployed and operated across 100+ active sites, metro through
                tier-3.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ----------------------------------------------------------- CTA */}
        <section className="ind-cta">
          <Reveal className="ind-cta-box" dir="scale">
            <span className="ind-cta-scan" aria-hidden="true" />
            <h2>Not sure which of these you are?</h2>
            <p>
              Most estates are two or three of them at once. Tell us what breaks
              and we will tell you which discipline it needs.
            </p>
            <div className="ind-cta-actions">
              <MagneticButton as={Link} to="/form" className="ind-btn-primary">
                Request an architecture audit
              </MagneticButton>
              <Link to="/portfolio" className="ind-btn-ghost">
                Browse case studies
              </Link>
            </div>
          </Reveal>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default Industries;
