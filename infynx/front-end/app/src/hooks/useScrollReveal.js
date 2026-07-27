import { useEffect, useRef, useState } from 'react';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Reveals every `.ftc-reveal` in the page as it scrolls into view, the way the
 * source site does it with GSAP ScrollTrigger. Elements stagger by their
 * position within the closest `[data-reveal-group]` (or their parent).
 */
export const useScrollReveal = () => {
  useEffect(() => {
    if (prefersReducedMotion()) {
      document
        .querySelectorAll('.ftc-reveal')
        .forEach((el) => el.classList.add('is-revealed'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          // An explicit data-reveal-delay wins; otherwise stagger by position.
          const explicit = el.dataset.revealDelay;
          if (explicit !== undefined && explicit !== '') {
            el.style.transitionDelay = `${explicit}ms`;
          } else {
            const group = el.closest('[data-reveal-group]') || el.parentElement;
            const index = group ? Array.prototype.indexOf.call(group.children, el) : 0;
            el.style.transitionDelay = `${Math.min(index, 6) * 90}ms`;
          }
          el.classList.add('is-revealed');
          observer.unobserve(el);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    const targets = document.querySelectorAll('.ftc-reveal:not(.is-revealed)');
    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  });
};

/**
 * Counts a metric up once it enters the viewport. Preserves any non-numeric
 * decoration in the label ("100+", "24/7", "2000+") by only animating the
 * leading number.
 */
export const useCountUp = (value, duration = 1800) => {
  const ref = useRef(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const node = ref.current;
    const match = String(value).match(/^(\d+)(.*)$/);

    if (!node || !match || prefersReducedMotion()) {
      setDisplay(value);
      return undefined;
    }

    const target = parseInt(match[1], 10);
    const suffix = match[2];
    setDisplay(`0${suffix}`);

    let frame;
    let start;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        observer.disconnect();

        const step = (now) => {
          if (start === undefined) start = now;
          const progress = Math.min((now - start) / duration, 1);
          // easeOutExpo, matching the theme's settle
          const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          setDisplay(`${Math.round(target * eased)}${suffix}`);
          if (progress < 1) frame = requestAnimationFrame(step);
        };

        frame = requestAnimationFrame(step);
      },
      { threshold: 0.4 }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [value, duration]);

  return [ref, display];
};

/** Small presentational wrapper around useCountUp. */
export const CountUp = ({ value, className }) => {
  const [ref, display] = useCountUp(value);
  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
};
