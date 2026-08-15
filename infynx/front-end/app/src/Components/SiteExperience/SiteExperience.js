import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import './SiteExperience.css';
import ScrollNavigator from '../ScrollNavigator/ScrollNavigator';

/**
 * The background globe.
 *
 * three.js is imported on demand rather than at module scope. Statically it
 * landed in the entry chunk, which meant roughly 600 kB of WebGL had to be
 * downloaded and evaluated before the first route could render — a cost paid
 * on every page, including ones where the visitor never looks at the scene.
 * Fetching it after mount lets the page paint first and the globe fade in
 * behind it.
 */
const NetworkScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    let disposed = false;
    let cleanup = null;

    import('three').then((THREE) => {
      if (disposed || !mountRef.current) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 9);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    group.position.set(3.8, -0.2, -1.5);
    scene.add(group);

    /* The lit node globe: brand-blue nodes wired to their nearest neighbours,
       additively blended so the links glow where they cross. This replaced a
       pair of near-invisible wireframe icosahedra (opacity 0.16 and 0.09) that
       read as smudges rather than as a network — it is the same object the
       industry pages use, promoted to the shared background so every route
       shows one consistent, lit globe instead of each page inventing its own. */
    const NODE_COUNT = window.innerWidth < 700 ? 70 : 118;
    const RADIUS = 2.6;
    const colorA = new THREE.Color(0x0071bd);
    const colorB = new THREE.Color(0x8cc63e);

    // Fibonacci sphere — even coverage without the polar clustering that
    // uniform random spherical sampling produces.
    const golden = Math.PI * (3 - Math.sqrt(5));
    const nodePoints = [];
    for (let i = 0; i < NODE_COUNT; i += 1) {
      const y = 1 - (i / (NODE_COUNT - 1)) * 2;
      const ring = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = golden * i;
      nodePoints.push(
        new THREE.Vector3(
          Math.cos(theta) * ring * RADIUS,
          y * RADIUS,
          Math.sin(theta) * ring * RADIUS
        )
      );
    }

    const nodeGeometry = new THREE.BufferGeometry().setFromPoints(nodePoints);
    const nodeColors = new Float32Array(nodePoints.length * 3);
    nodePoints.forEach((point, i) => {
      const mix = colorA.clone().lerp(colorB, (point.y + RADIUS) / (RADIUS * 2));
      nodeColors[i * 3] = mix.r;
      nodeColors[i * 3 + 1] = mix.g;
      nodeColors[i * 3 + 2] = mix.b;
    });
    nodeGeometry.setAttribute('color', new THREE.BufferAttribute(nodeColors, 3));
    const nodes = new THREE.Points(
      nodeGeometry,
      new THREE.PointsMaterial({
        size: 0.07,
        vertexColors: true,
        transparent: true,
        opacity: 0.95,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      })
    );
    group.add(nodes);

    const LINK_RANGE = 1.6;
    const MAX_LINKS_PER_NODE = 3;
    const linkPositions = [];
    const linkColors = [];
    for (let i = 0; i < nodePoints.length; i += 1) {
      let made = 0;
      for (let j = i + 1; j < nodePoints.length && made < MAX_LINKS_PER_NODE; j += 1) {
        if (nodePoints[i].distanceTo(nodePoints[j]) > LINK_RANGE) continue;
        linkPositions.push(
          nodePoints[i].x, nodePoints[i].y, nodePoints[i].z,
          nodePoints[j].x, nodePoints[j].y, nodePoints[j].z
        );
        const ca = colorA.clone().lerp(colorB, (nodePoints[i].y + RADIUS) / (RADIUS * 2));
        const cb = colorA.clone().lerp(colorB, (nodePoints[j].y + RADIUS) / (RADIUS * 2));
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
      opacity: 0.3,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    const links = new THREE.LineSegments(linkGeometry, linkMaterial);
    group.add(links);

    const shell = new THREE.Mesh(
      new THREE.IcosahedronGeometry(3.05, 1),
      new THREE.MeshBasicMaterial({
        color: 0x2a9be0,
        wireframe: true,
        transparent: true,
        opacity: 0.1,
        depthWrite: false
      })
    );
    group.add(shell);

    const particleCount = window.innerWidth < 700 ? 260 : 620;
    const positions = new Float32Array(particleCount * 3);
    for (let index = 0; index < particleCount; index += 1) {
      positions[index * 3] = (Math.random() - 0.5) * 22;
      positions[index * 3 + 1] = (Math.random() - 0.5) * 14;
      positions[index * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particles = new THREE.Points(
      particlesGeometry,
      new THREE.PointsMaterial({ color: 0xffffff, size: 0.018, transparent: true, opacity: 0.42 })
    );
    scene.add(particles);

    const pointer = { x: 0, y: 0 };
    const handlePointerMove = (event) => {
      pointer.x = (event.clientX / window.innerWidth - 0.5) * 0.75;
      pointer.y = (event.clientY / window.innerHeight - 0.5) * 0.55;
    };
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      group.position.x = window.innerWidth < 800 ? 1.6 : 3.8;
      group.position.y = window.innerWidth < 800 ? 1.6 : -0.2;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('resize', handleResize);
    handleResize();

    let frameId;
    const clock = new THREE.Clock();
    const render = () => {
      const elapsed = clock.getElapsedTime();
      if (!reducedMotion) {
        group.rotation.y += (pointer.x + elapsed * 0.045 - group.rotation.y) * 0.018;
        group.rotation.x += (-pointer.y + Math.sin(elapsed * 0.25) * 0.12 - group.rotation.x) * 0.018;
        shell.rotation.z = elapsed * -0.055;
        particles.rotation.y = elapsed * 0.008;
        // Links breathe so the globe never reads as a static mesh.
        linkMaterial.opacity = 0.22 + Math.sin(elapsed * 0.8) * 0.09;
      }
      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(render);
    };
    render();

    cleanup = () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      nodeGeometry.dispose();
      nodes.material.dispose();
      linkGeometry.dispose();
      linkMaterial.dispose();
      shell.geometry.dispose();
      shell.material.dispose();
      particlesGeometry.dispose();
      particles.material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
    }).catch(() => {
      /* three failed to load — the atmosphere gradient stands in on its own */
    });

    return () => {
      disposed = true;
      if (cleanup) cleanup();
    };
  }, []);

  return <div className="site-network-scene" ref={mountRef} aria-hidden="true" />;
};

const SiteExperience = ({ children }) => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });
  const [cursorVisible, setCursorVisible] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  if (isAdmin) return children;

  return (
    <div
      className="site-experience"
      onPointerEnter={() => setCursorVisible(true)}
      onPointerLeave={() => setCursorVisible(false)}
      onPointerMove={(event) => {
        event.currentTarget.style.setProperty('--cursor-x', `${event.clientX}px`);
        event.currentTarget.style.setProperty('--cursor-y', `${event.clientY}px`);
      }}
    >
      <motion.div className="site-scroll-progress" style={{ scaleX: progress }} />
      <div className="site-atmosphere" aria-hidden="true" />
      <NetworkScene />
      <motion.div
        className="site-cursor-glow"
        animate={{ opacity: cursorVisible ? 1 : 0 }}
        aria-hidden="true"
      />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          className="site-page-stage"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <ScrollNavigator />
    </div>
  );
};

export default SiteExperience;