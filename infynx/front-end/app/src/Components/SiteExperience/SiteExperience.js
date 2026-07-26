import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import * as THREE from 'three';
import './SiteExperience.css';

const NetworkScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

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

    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(2.15, 2),
      new THREE.MeshBasicMaterial({ color: 0x00e2f5, wireframe: true, transparent: true, opacity: 0.16 })
    );
    group.add(core);

    const shell = new THREE.Mesh(
      new THREE.IcosahedronGeometry(2.55, 1),
      new THREE.MeshBasicMaterial({ color: 0xc4f017, wireframe: true, transparent: true, opacity: 0.09 })
    );
    group.add(shell);

    const ringMaterial = new THREE.MeshBasicMaterial({ color: 0xff5a36, transparent: true, opacity: 0.19 });
    [2.8, 3.25, 3.7].forEach((radius, index) => {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(radius, 0.012, 8, 100), ringMaterial);
      ring.rotation.set(Math.PI / (2.3 + index * 0.25), index * 0.35, index * 0.6);
      group.add(ring);
    });

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
      }
      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      core.geometry.dispose();
      core.material.dispose();
      shell.geometry.dispose();
      shell.material.dispose();
      group.children.slice(2).forEach((ring) => ring.geometry.dispose());
      ringMaterial.dispose();
      particlesGeometry.dispose();
      particles.material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
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
    </div>
  );
};

export default SiteExperience;