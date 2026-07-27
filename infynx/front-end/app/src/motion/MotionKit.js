/**
 * MotionKit — the Home page's motion vocabulary, packaged for every other page.
 *
 * Home established the language: headlines that swing up out of 3D, aurora
 * beams standing on a mirrored waterline, cards that fly in from their own side
 * of the viewport and settle into a fan, a slowly turning globe, counters that
 * run up on entry. These primitives are the same motions, parameterised so each
 * page can keep its own hue and content.
 */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import './MotionKit.css';

export { useScrollReveal, useCountUp, CountUp } from '../hooks/useScrollReveal';

/* ==========================================================================
   Scroll reveal wrappers — thin sugar over the global .ftc-reveal classes
   ========================================================================== */

const REVEAL_DIR = {
  up: '',
  left: 'ftc-reveal-left',
  right: 'ftc-reveal-right',
  scale: 'ftc-reveal-scale'
};

/**
 * Fades/slides its content in when scrolled into view. Stagger comes from the
 * element's position inside the nearest <RevealGroup>; pass `delay` (ms) to
 * pin an element to an explicit offset instead.
 */
export const Reveal = ({
  as: Tag = 'div',
  dir = 'up',
  delay,
  className = '',
  children,
  ...rest
}) => (
  <Tag
    className={['ftc-reveal', REVEAL_DIR[dir], className].filter(Boolean).join(' ')}
    data-reveal-delay={delay}
    {...rest}
  >
    {children}
  </Tag>
);

/** Marks a container whose <Reveal> children should stagger in sequence. */
export const RevealGroup = ({ as: Tag = 'div', className = '', children, ...rest }) => (
  <Tag className={className} data-reveal-group {...rest}>
    {children}
  </Tag>
);

/* ==========================================================================
   Split headline
   ========================================================================== */

/**
 * Each line sits in an overflow-hidden track and swings up out of perspective,
 * one after the next. Pass `lines` as strings or nodes.
 */
export const SplitHeading = ({
  lines,
  as: Tag = 'h1',
  className = '',
  delay = 0.15,
  stagger = 0.14,
  once = true
}) => {
  const reduced = useReducedMotion();

  return (
    <Tag className={['fx-split', className].filter(Boolean).join(' ')}>
      {lines.map((line, i) => (
        <span className="fx-split-line" key={i}>
          <motion.span
            className="fx-split-inner"
            initial={reduced ? false : { y: '115%', rotateX: -78, opacity: 0 }}
            whileInView={{ y: '0%', rotateX: 0, opacity: 1 }}
            viewport={{ once, amount: 0.15 }}
            transition={{ duration: 1.1, delay: delay + i * stagger, ease: [0.25, 0.46, 0.45, 0.5] }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
};

/* ==========================================================================
   Pointer parallax
   ========================================================================== */

/**
 * Writes the pointer's position within `ref`'s box to --mx / --my (-0.5 … 0.5)
 * so CSS can drift layers against the cursor. Updates are coalesced into one
 * rAF per frame and skipped entirely under reduced motion.
 */
export const usePointerParallax = (ref, enabled = true) => {
  const reduced = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || reduced || !enabled) return undefined;

    let frame = null;
    let pending = null;

    const flush = () => {
      frame = null;
      if (!pending) return;
      node.style.setProperty('--mx', pending.x.toFixed(4));
      node.style.setProperty('--my', pending.y.toFixed(4));
    };

    const handleMove = (event) => {
      const rect = node.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      pending = {
        x: (event.clientX - rect.left) / rect.width - 0.5,
        y: (event.clientY - rect.top) / rect.height - 0.5
      };
      if (frame === null) frame = window.requestAnimationFrame(flush);
    };

    window.addEventListener('pointermove', handleMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', handleMove);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, [ref, reduced, enabled]);
};

/* ==========================================================================
   Aurora backdrop
   ========================================================================== */

/* Width / horizontal offset / delay / height vary per beam so the field
   breathes unevenly rather than pulsing as one block. */
const BEAMS = [
  { x: 8, w: 2, d: 0, h: 260 }, { x: 15, w: 1, d: 1.4, h: 180 },
  { x: 23, w: 3, d: 0.6, h: 320 }, { x: 30, w: 1, d: 2.1, h: 200 },
  { x: 37, w: 2, d: 1.1, h: 380 }, { x: 44, w: 4, d: 0.3, h: 300 },
  { x: 50, w: 6, d: 1.8, h: 440 }, { x: 57, w: 3, d: 0.9, h: 340 },
  { x: 64, w: 2, d: 2.4, h: 240 }, { x: 71, w: 1, d: 1.2, h: 190 },
  { x: 78, w: 3, d: 0.5, h: 300 }, { x: 86, w: 2, d: 1.9, h: 220 },
  { x: 93, w: 1, d: 0.8, h: 170 }
];

/**
 * Aurora beams on a mirrored waterline, plus an optional floating cube grid and
 * ambient orbs. Absolutely positioned — drop it into any `position: relative`
 * section. `tint` recolours the whole field: { from, to, glow }.
 */
export const AuroraBackdrop = ({
  tint,
  cubes = true,
  orbs = [],
  className = '',
  parallax = true
}) => {
  const ref = useRef(null);
  usePointerParallax(ref, parallax);

  const style = tint
    ? { '--fx-1': tint.from, '--fx-2': tint.to, '--fx-glow': tint.glow || tint.from }
    : undefined;

  return (
    <div
      ref={ref}
      className={['fx-aurora', 'fx-scope', className].filter(Boolean).join(' ')}
      style={style}
      aria-hidden="true"
    >
      <div className="fx-aurora-inner">
        <div className="fx-beam-field">
          {BEAMS.map((b, i) => (
            <span
              key={i}
              className="fx-beam"
              style={{ left: `${b.x}%`, width: `${b.w}px`, height: `${b.h}px`, animationDelay: `${b.d}s` }}
            />
          ))}
        </div>

        <div className="fx-waterline" />

        <div className="fx-beam-field fx-beam-reflection">
          {BEAMS.map((b, i) => (
            <span
              key={i}
              className="fx-beam"
              style={{ left: `${b.x}%`, width: `${b.w}px`, height: `${b.h * 0.8}px`, animationDelay: `${b.d}s` }}
            />
          ))}
        </div>
      </div>

      {cubes && (
        <div className="fx-cube-grid">
          <span /><span /><span /><span />
        </div>
      )}

      {orbs.map((orb, i) => (
        <span
          key={i}
          className="fx-orb"
          style={{
            background: orb.color,
            top: orb.top,
            left: orb.left,
            right: orb.right,
            bottom: orb.bottom,
            opacity: orb.opacity,
            animationDelay: `${i * 3}s`
          }}
        />
      ))}
    </div>
  );
};

/* ==========================================================================
   Scroll fan
   ========================================================================== */

/* Resting pose of each card in the fan — deliberately irregular. */
const FAN_POSE = [
  { rotate: -5.47, y: 0 },
  { rotate: -4.36, y: 26 },
  { rotate: 13.3, y: 0 },
  { rotate: -9, y: 20 },
  { rotate: 7.09, y: 0 },
  { rotate: -11, y: 24 }
];

/** Tracks viewport width so the fan's throw distance shrinks on small screens. */
const useViewportWidth = () => {
  const [width, setWidth] = useState(() =>
    typeof window === 'undefined' ? 1440 : window.innerWidth
  );

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return width;
};

const FanCard = ({ index, total, progress, spread, palette, reduced, children }) => {
  const pose = FAN_POSE[index % FAN_POSE.length];
  const offset = index - (total - 1) / 2;
  const tone = palette[index % palette.length];

  const x = useTransform(progress, [0, 1], [offset * spread, 0]);
  const y = useTransform(progress, [0, 1], [90, pose.y]);
  const rotate = useTransform(progress, [0, 1], [offset * 10, pose.rotate]);
  const scale = useTransform(progress, [0, 1], [0.82, 1]);
  const opacity = useTransform(progress, [0, 0.35], [0, 1]);

  const restingStyle = {
    '--counter-rot': `${-pose.rotate}deg`,
    '--fx-card-bg': tone.card,
    '--fx-badge-bg': tone.badge
  };

  if (reduced) {
    return <div className="fx-fan-slot" style={restingStyle}>{children}</div>;
  }

  return (
    <motion.div
      className="fx-fan-slot"
      style={{ x, y, rotate, scale, opacity, ...restingStyle }}
    >
      {children}
    </motion.div>
  );
};

const DEFAULT_PALETTE = [
  { card: '#B325F7', badge: '#9B1DD8' },
  { card: '#E45621', badge: '#C55126' },
  { card: '#1AC975', badge: '#1CAF69' },
  { card: '#2925F7', badge: '#3432BD' },
  { card: '#DF8E14', badge: '#BB7D20' },
  { card: '#2AC5DD', badge: '#3AB0C2' }
];

/**
 * Cards start thrown out to their own side of the viewport and drift into a
 * resting fan as the section scrolls through — cards left of centre come in
 * from the left, cards right of centre from the right.
 *
 * `items` is an array of { num?, title, desc } unless `renderCard` is supplied.
 */
export const ScrollFan = ({
  items,
  palette = DEFAULT_PALETTE,
  renderCard,
  className = '',
  keyOf = (item, i) => item.id ?? item.num ?? item.title ?? i
}) => {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const viewport = useViewportWidth();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center']
  });

  // Full 340px throw on desktop; proportionally gentler once cards start
  // wrapping, so they never fly in from far outside the page.
  const spread = Math.min(340, Math.max(90, viewport * 0.22));

  return (
    <div className={['fx-fan', className].filter(Boolean).join(' ')} ref={ref}>
      {items.map((item, index) => (
        <FanCard
          key={keyOf(item, index)}
          index={index}
          total={items.length}
          progress={scrollYProgress}
          spread={spread}
          palette={palette}
          reduced={reduced}
        >
          {renderCard ? (
            renderCard(item, index)
          ) : (
            <div className="fx-fan-card">
              {item.num !== undefined && <div className="fx-fan-badge">{item.num}</div>}
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          )}
        </FanCard>
      ))}
    </div>
  );
};

/* ==========================================================================
   Scroll drift — the fan's motion without the rotation
   ========================================================================== */

const DriftItem = ({ index, progress, distance, reduced, className, children }) => {
  const from = index % 2 === 0 ? -distance : distance;
  const x = useTransform(progress, [0, 1], [from, 0]);
  const opacity = useTransform(progress, [0, 0.5], [0, 1]);

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div className={className} style={{ x, opacity }}>
      {children}
    </motion.div>
  );
};

/**
 * Slides children in from alternating sides as the block scrolls through.
 * Use where a fan's tilt would fight the content (interactive cards, lists).
 */
export const ScrollDrift = ({
  items,
  renderItem,
  className = '',
  itemClassName = '',
  distance = 140,
  keyOf = (item, i) => item.id ?? item._id ?? i
}) => {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center']
  });

  return (
    <div className={className} ref={ref}>
      {items.map((item, index) => (
        <DriftItem
          key={keyOf(item, index)}
          index={index}
          progress={scrollYProgress}
          distance={distance}
          reduced={reduced}
          className={itemClassName}
        >
          {renderItem(item, index)}
        </DriftItem>
      ))}
    </div>
  );
};

/* ==========================================================================
   Orbit visual — the turning globe
   ========================================================================== */

/**
 * A slowly rotating globe wrapped in orbital rings, each carrying a satellite.
 * Pass `media` to put an image (device, portrait) in front of the globe
 * instead — the rings keep turning around it, mirroring Home's phone + globe.
 */
export const OrbitVisual = ({
  tint,
  rings = 3,
  media,
  mediaAlt = '',
  float = true,
  className = '',
  children
}) => {
  const style = tint
    ? { '--fx-1': tint.from, '--fx-2': tint.to, '--fx-glow': tint.glow || tint.from, '--fx-ring': tint.ring || tint.to }
    : undefined;

  return (
    <div
      className={['fx-orbit', 'fx-scope', className].filter(Boolean).join(' ')}
      style={style}
      aria-hidden={!media && !children}
    >
      <div className={['fx-orbit-stage', float ? 'fx-orbit-float' : ''].filter(Boolean).join(' ')}>
        {media ? (
          <img className="fx-orbit-media" src={media} alt={mediaAlt} />
        ) : (
          children || <div className="fx-globe" />
        )}

        {Array.from({ length: rings }, (_, i) => (
          <span key={i} className={`fx-orbit-ring fx-orbit-ring-${i + 1}`} />
        ))}
      </div>
    </div>
  );
};

/* ==========================================================================
   Marquee
   ========================================================================== */

/** Endlessly scrolling strip. Children are duplicated to make the loop seamless. */
export const Marquee = ({ items, renderItem, speed = 36, className = '' }) => (
  <div
    className={['fx-marquee', className].filter(Boolean).join(' ')}
    style={{ '--fx-marquee-speed': `${speed}s` }}
  >
    {[0, 1].map((copy) => (
      <div className="fx-marquee-run" key={copy} aria-hidden={copy === 1}>
        {items.map((item, i) => (
          <span className="fx-marquee-item" key={`${copy}-${i}`}>
            {renderItem ? renderItem(item, i) : item}
          </span>
        ))}
      </div>
    ))}
  </div>
);

/* ==========================================================================
   Tilt card
   ========================================================================== */

/**
 * Tips towards the pointer and carries a shine that tracks it, giving flat
 * cards the same in-and-out depth the fan cards get from scrolling.
 */
export const TiltCard = ({
  as: Tag = 'div',
  max = 7,
  className = '',
  children,
  ...rest
}) => {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  const handleMove = useCallback(
    (event) => {
      const node = ref.current;
      if (!node || reduced) return;
      const rect = node.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;
      node.style.setProperty('--ty', `${(px - 0.5) * max * 2}deg`);
      node.style.setProperty('--tx', `${(0.5 - py) * max * 2}deg`);
      node.style.setProperty('--sx', `${px * 100}%`);
      node.style.setProperty('--sy', `${py * 100}%`);
    },
    [max, reduced]
  );

  const handleLeave = useCallback(() => {
    const node = ref.current;
    if (!node) return;
    node.style.setProperty('--tx', '0deg');
    node.style.setProperty('--ty', '0deg');
  }, []);

  return (
    <Tag
      ref={ref}
      className={['fx-tilt', className].filter(Boolean).join(' ')}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      {...rest}
    >
      <span className="fx-tilt-shine" aria-hidden="true" />
      {children}
    </Tag>
  );
};
