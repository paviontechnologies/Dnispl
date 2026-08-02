import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Reveal, RevealGroup } from '../../motion/MotionKit';
import { INDUSTRIES } from '../../data/industries';
import './IndustryStrip.css';

/**
 * "Which sectors we deliver this in" — dropped onto the service pages so each
 * capability page routes into the sectors that buy it. Pass `slugs` to pick the
 * relevant sectors; omit it to show all ten.
 *
 * `tint` keeps the strip in the host page's hue (green on DC, orange on HPD…)
 * rather than importing a second accent colour onto the page.
 */
const IndustryStrip = ({
  slugs,
  tint,
  title = 'Sectors we deliver this in',
  lead = 'Each sector page carries the pressures we design against and the proof we have shipped there.'
}) => {
  const list = slugs
    ? slugs.map((slug) => INDUSTRIES.find((i) => i.slug === slug)).filter(Boolean)
    : INDUSTRIES;

  if (!list.length) return null;

  const style = tint
    ? { '--fx-1': tint.from, '--fx-2': tint.to, '--fx-glow': tint.glow || tint.from }
    : undefined;

  return (
    <section className="istrip" style={style}>
      <div className="container-max">
        <Reveal className="istrip-head">
          <span className="istrip-tag">Industries</span>
          <h2>{title}</h2>
          <p>{lead}</p>
        </Reveal>

        <RevealGroup className="istrip-grid">
          {list.map((industry) => {
            const Icon = industry.icon;
            return (
              <Reveal key={industry.slug} className="istrip-shell" dir="scale">
                <Link to={`/industries/${industry.slug}`} className="istrip-card">
                  <span className="istrip-icon"><Icon size={18} /></span>
                  <span className="istrip-text">
                    <strong>{industry.name}</strong>
                    <span>{industry.tagline}</span>
                  </span>
                  <ArrowRight size={15} className="istrip-arrow" />
                </Link>
              </Reveal>
            );
          })}
        </RevealGroup>

        <Reveal className="istrip-all">
          <Link to="/industries">
            View all industries <ArrowRight size={15} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
};

export default IndustryStrip;
