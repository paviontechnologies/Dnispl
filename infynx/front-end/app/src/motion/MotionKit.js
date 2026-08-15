/**
 * MotionKit — the Home page's motion vocabulary, packaged for every other page.
 *
 * Home established the language: headlines that swing up out of 3D, aurora
 * beams standing on a mirrored waterline, cards that fly in from their own side
 * of the viewport and settle into a fan, a slowly turning globe, counters that
 * run up on entry. These primitives are the same motions, parameterised so each
 * page can keep its own hue and content.
 */
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform
} from 'framer-motion';
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

const SPLIT_VARIANTS = {
  hidden: { y: '115%', rotateX: -78, opacity: 0 },
  shown: { y: '0%', rotateX: 0, opacity: 1 }
};

/**
 * Each line sits in an overflow-hidden track and swings up out of perspective,
 * one after the next. Pass `lines` as strings or nodes.
 *
 * The viewport observer has to live on the track, not on the text: the text
 * starts translated fully below the track, and an overflow-hidden ancestor
 * clips it out of every intersection rect — observing it directly would mean
 * it never registers as visible and so never animates in.
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
        <motion.span
          className="fx-split-line"
          key={i}
          initial={reduced ? false : 'hidden'}
          whileInView="shown"
          viewport={{ once, amount: 0.15 }}
        >
          <motion.span
            className="fx-split-inner"
            variants={SPLIT_VARIANTS}
            transition={{ duration: 1.1, delay: delay + i * stagger, ease: [0.25, 0.46, 0.45, 0.5] }}
          >
            {line}
          </motion.span>
        </motion.span>
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
   Section progress
   ========================================================================== */

/**
 * Scroll progress for a section, with a guard the raw `useScroll` range lacks.
 *
 * A range like ['start end', 'center center'] only reaches 1 if the document
 * can scroll far enough to put the section's centre at the viewport's centre.
 * On a short page — a careers list with three roles, a filtered case-study
 * view — that scroll distance does not exist, so progress stalls part-way and
 * whatever it drives is left frozen mid-animation. That is what left the
 * careers cards permanently overlapping each other.
 *
 * So: measure whether the range is actually reachable, and if it isn't, drive
 * the same 0 → 1 value off entering the viewport instead. Callers get one
 * motion value either way and don't need to care which mode they're in.
 */
export const useSectionProgress = (
  ref,
  { offset = ['start end', 'center center'], duration = 1.1 } = {}
) => {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset });
  const timed = useMotionValue(0);
  const [scrollable, setScrollable] = useState(true);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  // Can the document scroll far enough for `offset`'s end position to be hit?
  useEffect(() => {
    const measure = () => {
      const node = ref.current;
      if (!node) return;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const rect = node.getBoundingClientRect();
      const centreAt =
        rect.top + window.scrollY + rect.height / 2 - window.innerHeight / 2;
      // 4px of slack absorbs sub-pixel layout rounding.
      setScrollable(maxScroll > 4 && centreAt <= maxScroll - 4);
    };

    measure();
    // Re-measure once late layout (fonts, images, lazy sections) has settled.
    const settle = window.setTimeout(measure, 500);
    window.addEventListener('resize', measure);
    return () => {
      window.clearTimeout(settle);
      window.removeEventListener('resize', measure);
    };
  }, [ref]);

  useEffect(() => {
    if (scrollable) return undefined;
    if (reduced) {
      timed.set(1);
      return undefined;
    }
    if (!inView) return undefined;
    const controls = animate(timed, 1, { duration, ease: [0.16, 1, 0.3, 1] });
    return () => controls.stop();
  }, [scrollable, inView, reduced, timed, duration]);

  return scrollable ? scrollYProgress : timed;
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

  // The cards land in a grid now, so they settle flat and aligned: a resting
  // tilt of up to 13 degrees was what made neighbouring cards overlap at the
  // corners once a set wrapped onto a second row. The tilt survives as part of
  // the entrance instead, which is where it was doing the work anyway.
  const x = useTransform(progress, [0, 1], [offset * spread, 0]);
  const y = useTransform(progress, [0, 1], [70, 0]);
  const rotate = useTransform(progress, [0, 1], [pose.rotate * 0.8 + offset * 4, 0]);
  const scale = useTransform(progress, [0, 1], [0.86, 1]);
  const opacity = useTransform(progress, [0, 0.35], [0, 1]);

  const restingStyle = {
    '--counter-rot': '0deg',
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
  const progress = useSectionProgress(ref);

  // Throw distance is now per-card rather than per-row: with six items the
  // outermost offset is 2.5, so the old 340px base launched cards from 850px
  // off-centre and they spent most of the scroll off-screen. Scaling it down by
  // the item count keeps the furthest card inside the viewport at any width.
  const base = Math.min(340, Math.max(90, viewport * 0.22));
  const spread = base / Math.max(1, items.length / 3);

  return (
    <div className={['fx-fan', className].filter(Boolean).join(' ')} ref={ref}>
      {items.map((item, index) => (
        <FanCard
          key={keyOf(item, index)}
          index={index}
          total={items.length}
          progress={progress}
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
  // fx-drift-item keeps the wrapper transparent to the parent grid's sizing, so
  // adding drift doesn't break equal-height rows.
  const classes = ['fx-drift-item', className].filter(Boolean).join(' ');

  if (reduced) return <div className={classes}>{children}</div>;

  return (
    <motion.div className={classes} style={{ x, opacity }}>
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
  const progress = useSectionProgress(ref);

  return (
    <div className={className} ref={ref}>
      {items.map((item, index) => (
        <DriftItem
          key={keyOf(item, index)}
          index={index}
          progress={progress}
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
 *
 * The globe itself is the WebGL node lattice rather than the CSS sphere it used
 * to be. Two reasons. It reads as what the company actually sells — nodes with
 * live links between them — and it turns on Safari, which the CSS version did
 * not: that globe faked rotation by animating `background-position` across a
 * three-layer background behind a `mask-image`, and WebKit does not interpolate
 * a comma-separated background-position list on a masked pseudo-element, so the
 * sphere sat frozen on Apple devices while animating normally everywhere else.
 * Rotation now happens in the render loop, which every engine agrees on.
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
          children || (
            <NetworkLattice tint={tint} density={78} className="fx-orbit-lattice" />
          )
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

/**
 * Endlessly scrolling strip. The track holds two identical copies and slides by
 * exactly -50%, so the loop restarts on a frame that looks the same.
 */
export const Marquee = ({ items, renderItem, speed = 36, className = '' }) => (
  <div
    className={['fx-marquee', className].filter(Boolean).join(' ')}
    style={{ '--fx-marquee-speed': `${speed}s` }}
  >
    <div className="fx-marquee-track">
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
  </div>
);

/* ==========================================================================
   Network lattice — the 3D hero visual
   ========================================================================== */

/**
 * A live WebGL lattice: nodes suspended in depth, linked wherever they fall
 * within range of each other, turning slowly and leaning towards the pointer.
 * `tint` colours the nodes and the links, so each industry page gets the same
 * structure in its own hue.
 *
 * three.js is loaded on demand rather than imported at module scope — the site
 * shell already runs a WebGL scene, and pulling a second copy of three into
 * every page's initial bundle costs more than the visual is worth on routes
 * that never show one.
 *
 * The render loop only runs while the canvas is actually on screen, and under
 * `prefers-reduced-motion` nothing is created at all: the CSS fallback behind
 * it stands in.
 */
export const NetworkLattice = ({
  tint,
  variant = 'sphere',
  density = 90,
  className = ''
}) => {
  const mountRef = useRef(null);
  const reduced = useReducedMotion();
  // Drives the crossfade from the CSS stand-in to the live canvas.
  const [live, setLive] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || reduced) return undefined;

    let disposed = false;
    let cleanup = null;

    import('three')
      .then((THREE) => {
        if (disposed || !mountRef.current) return;

        const host = mountRef.current;
        const size = () => ({
          w: host.clientWidth || 480,
          h: host.clientHeight || 480
        });
        const { w, h } = size();

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(46, w / h, 0.1, 100);
        camera.position.set(0, 0, 7.2);

        let renderer;
        try {
          renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        } catch (err) {
          // No WebGL context available (blocked, software-rendering disabled).
          // The CSS fallback layer is already behind us, so just stand down.
          return;
        }
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
        renderer.setSize(w, h);
        renderer.setClearColor(0x000000, 0);
        host.appendChild(renderer.domElement);

        const colorA = new THREE.Color(tint?.from || '#00E2F5');
        const colorB = new THREE.Color(tint?.to || '#B325F7');

        /* --- node positions --- */
        const count = Math.max(24, Math.min(160, density));
        const points = [];
        if (variant === 'grid') {
          // A rippled plane, seen at an angle — reads as a fabric or a floor.
          const side = Math.max(4, Math.round(Math.sqrt(count)));
          for (let ix = 0; ix < side; ix += 1) {
            for (let iz = 0; iz < side; iz += 1) {
              const x = (ix / (side - 1) - 0.5) * 8;
              const z = (iz / (side - 1) - 0.5) * 8;
              points.push(new THREE.Vector3(x, Math.sin(x * 1.1) * Math.cos(z * 1.1) * 0.55, z));
            }
          }
        } else {
          // Fibonacci sphere: even coverage without the clustering that random
          // spherical sampling produces at the poles.
          const golden = Math.PI * (3 - Math.sqrt(5));
          for (let i = 0; i < count; i += 1) {
            const y = 1 - (i / (count - 1)) * 2;
            const radius = Math.sqrt(Math.max(0, 1 - y * y));
            const theta = golden * i;
            const jitter = 0.9 + Math.random() * 0.22;
            points.push(
              new THREE.Vector3(
                Math.cos(theta) * radius * 2.5 * jitter,
                y * 2.5 * jitter,
                Math.sin(theta) * radius * 2.5 * jitter
              )
            );
          }
        }

        const group = new THREE.Group();
        scene.add(group);

        /* --- nodes --- */
        const nodeGeometry = new THREE.BufferGeometry().setFromPoints(points);
        const nodeColors = new Float32Array(points.length * 3);
        points.forEach((p, i) => {
          const mix = colorA.clone().lerp(colorB, (p.y + 2.5) / 5);
          nodeColors[i * 3] = mix.r;
          nodeColors[i * 3 + 1] = mix.g;
          nodeColors[i * 3 + 2] = mix.b;
        });
        nodeGeometry.setAttribute('color', new THREE.BufferAttribute(nodeColors, 3));
        const nodes = new THREE.Points(
          nodeGeometry,
          new THREE.PointsMaterial({
            size: 0.075,
            vertexColors: true,
            transparent: true,
            opacity: 0.95,
            depthWrite: false,
            blending: THREE.AdditiveBlending
          })
        );
        group.add(nodes);

        /* --- links between neighbours --- */
        const LINK_RANGE = variant === 'grid' ? 1.9 : 1.55;
        const MAX_LINKS_PER_NODE = 3;
        const linkPositions = [];
        const linkColors = [];
        for (let i = 0; i < points.length; i += 1) {
          let made = 0;
          for (let j = i + 1; j < points.length && made < MAX_LINKS_PER_NODE; j += 1) {
            if (points[i].distanceTo(points[j]) > LINK_RANGE) continue;
            linkPositions.push(
              points[i].x, points[i].y, points[i].z,
              points[j].x, points[j].y, points[j].z
            );
            const ca = colorA.clone().lerp(colorB, (points[i].y + 2.5) / 5);
            const cb = colorA.clone().lerp(colorB, (points[j].y + 2.5) / 5);
            linkColors.push(ca.r, ca.g, ca.b, cb.r, cb.g, cb.b);
            made += 1;
          }
        }
        const linkGeometry = new THREE.BufferGeometry();
        linkGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linkPositions, 3));
        linkGeometry.setAttribute('color', new THREE.Float32BufferAttribute(linkColors, 3));
        const linkMaterial = new THREE.LineBasicMaterial({
          vertexColors: true,
          transparent: true,
          opacity: 0.24,
          depthWrite: false,
          blending: THREE.AdditiveBlending
        });
        const links = new THREE.LineSegments(linkGeometry, linkMaterial);
        group.add(links);

        /* --- a wireframe shell for silhouette --- */
        const shell = new THREE.Mesh(
          new THREE.IcosahedronGeometry(variant === 'grid' ? 3.4 : 2.95, 1),
          new THREE.MeshBasicMaterial({
            color: colorB,
            wireframe: true,
            transparent: true,
            opacity: 0.07,
            depthWrite: false
          })
        );
        group.add(shell);

        if (variant === 'grid') group.rotation.x = -0.62;

        /* --- interaction + loop --- */
        const pointer = { x: 0, y: 0 };
        const target = { x: 0, y: 0 };
        const handlePointer = (event) => {
          const rect = host.getBoundingClientRect();
          if (!rect.width || !rect.height) return;
          target.x = ((event.clientX - rect.left) / rect.width - 0.5) * 0.9;
          target.y = ((event.clientY - rect.top) / rect.height - 0.5) * 0.6;
        };
        window.addEventListener('pointermove', handlePointer, { passive: true });

        const handleResize = () => {
          const next = size();
          camera.aspect = next.w / next.h;
          camera.updateProjectionMatrix();
          renderer.setSize(next.w, next.h);
        };
        const resizeObserver =
          typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(handleResize);
        if (resizeObserver) resizeObserver.observe(host);
        else window.addEventListener('resize', handleResize);

        let frameId = null;
        let visible = true;
        const clock = new THREE.Clock();
        const baseRotationX = variant === 'grid' ? -0.62 : 0;

        const render = () => {
          const elapsed = clock.getElapsedTime();
          pointer.x += (target.x - pointer.x) * 0.045;
          pointer.y += (target.y - pointer.y) * 0.045;
          group.rotation.y = elapsed * 0.11 + pointer.x;
          group.rotation.x = baseRotationX + Math.sin(elapsed * 0.28) * 0.11 - pointer.y;
          shell.rotation.y = elapsed * -0.07;
          shell.rotation.z = elapsed * 0.05;
          // Links breathe so the lattice never reads as a static mesh.
          linkMaterial.opacity = 0.18 + Math.sin(elapsed * 0.9) * 0.07;
          renderer.render(scene, camera);
          frameId = window.requestAnimationFrame(render);
        };

        const start = () => {
          if (frameId === null) {
            clock.getDelta();
            render();
          }
        };
        const stop = () => {
          if (frameId !== null) {
            window.cancelAnimationFrame(frameId);
            frameId = null;
          }
        };

        // Only burn frames while the canvas is on screen.
        const io = new IntersectionObserver(
          ([entry]) => {
            visible = entry.isIntersecting;
            if (visible) start();
            else stop();
          },
          { threshold: 0 }
        );
        io.observe(host);
        if (visible) start();
        setLive(true);

        cleanup = () => {
          stop();
          setLive(false);
          io.disconnect();
          if (resizeObserver) resizeObserver.disconnect();
          else window.removeEventListener('resize', handleResize);
          window.removeEventListener('pointermove', handlePointer);
          nodeGeometry.dispose();
          nodes.material.dispose();
          linkGeometry.dispose();
          linkMaterial.dispose();
          shell.geometry.dispose();
          shell.material.dispose();
          renderer.dispose();
          renderer.domElement.remove();
        };
      })
      .catch(() => {
        /* three failed to load — the CSS fallback layer stays visible */
      });

    return () => {
      disposed = true;
      if (cleanup) cleanup();
    };
  }, [tint, variant, density, reduced]);

  const style = tint
    ? { '--fx-1': tint.from, '--fx-2': tint.to, '--fx-glow': tint.glow || tint.from }
    : undefined;

  return (
    <div
      className={['fx-lattice', 'fx-scope', live ? 'is-live' : '', className]
        .filter(Boolean)
        .join(' ')}
      style={style}
      aria-hidden="true"
    >
      {/* Carries the visual on reduced-motion, on a failed three import, and in
          the frames before WebGL initialises — then fades out, so it doesn't sit
          behind the lattice as a second, brighter object. */}
      <span className="fx-lattice-fallback" />
      <div className="fx-lattice-canvas" ref={mountRef} />
    </div>
  );
};

/* ==========================================================================
   Magnetic button
   ========================================================================== */

/**
 * Leans towards the pointer while it's nearby and snaps back on exit. Used on
 * the primary CTA so the most important target on the page is the one that
 * responds first.
 */
export const MagneticButton = ({
  as: Tag = 'button',
  strength = 0.28,
  className = '',
  children,
  ...rest
}) => {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMove = useCallback(
    (event) => {
      const node = ref.current;
      if (!node || reduced) return;
      const rect = node.getBoundingClientRect();
      x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
      y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
    },
    [reduced, strength, x, y]
  );

  const handleLeave = useCallback(() => {
    animate(x, 0, { type: 'spring', stiffness: 260, damping: 18 });
    animate(y, 0, { type: 'spring', stiffness: 260, damping: 18 });
  }, [x, y]);

  const MotionTag = useMemo(() => motion.create(Tag), [Tag]);

  return (
    <MotionTag
      ref={ref}
      className={['fx-magnetic', className].filter(Boolean).join(' ')}
      style={{ x, y }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      {...rest}
    >
      {children}
    </MotionTag>
  );
};

/* ==========================================================================
   Spotlight card
   ========================================================================== */

/**
 * Writes the pointer's position into --sx / --sy so a radial highlight can
 * follow it across the card. Cheaper than TiltCard (no transform, no layout)
 * which makes it safe to use on a grid of twenty.
 */
export const SpotlightCard = ({
  as: Tag = 'div',
  className = '',
  children,
  ...rest
}) => {
  const ref = useRef(null);

  const handleMove = useCallback((event) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty('--sx', `${((event.clientX - rect.left) / rect.width) * 100}%`);
    node.style.setProperty('--sy', `${((event.clientY - rect.top) / rect.height) * 100}%`);
  }, []);

  return (
    <Tag
      ref={ref}
      className={['fx-spotlight', className].filter(Boolean).join(' ')}
      onPointerMove={handleMove}
      {...rest}
    >
      <span className="fx-spotlight-glow" aria-hidden="true" />
      <div className="fx-spotlight-body">{children}</div>
    </Tag>
  );
};

/* ==========================================================================
   Scroll-drawn connector
   ========================================================================== */

/**
 * A vertical rule that draws itself downward as its section scrolls past —
 * used as the spine of a numbered sequence so the list reads as a path rather
 * than as separate cards.
 */
export const ScrollSpine = ({ tint, className = '' }) => {
  const ref = useRef(null);
  const progress = useSectionProgress(ref, {
    offset: ['start 80%', 'end 40%']
  });
  const scaleY = useTransform(progress, [0, 1], [0, 1]);

  const style = tint
    ? { '--fx-1': tint.from, '--fx-2': tint.to }
    : undefined;

  return (
    <div
      className={['fx-spine', className].filter(Boolean).join(' ')}
      ref={ref}
      style={style}
      aria-hidden="true"
    >
      <motion.span className="fx-spine-fill" style={{ scaleY }} />
    </div>
  );
};

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
