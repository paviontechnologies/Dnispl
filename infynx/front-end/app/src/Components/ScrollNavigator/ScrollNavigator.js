import React, { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import './ScrollNavigator.css';

const ScrollNavigator = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const [atBottom, setAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Show if page is scrollable
      setIsVisible(documentHeight > windowHeight + 100);
      setAtTop(scrollY < 120);
      setAtBottom(scrollY + windowHeight >= documentHeight - 120);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <aside className="scroll-navigator-widget" aria-label="Page Scroll Navigation">
      <button
        type="button"
        className={`scroll-nav-btn scroll-nav-top ${atTop ? 'dimmed' : ''}`}
        onClick={scrollToTop}
        title="Scroll to Top"
        aria-label="Scroll to top of page"
      >
        <ChevronUp size={20} className="scroll-nav-icon" />
        <span className="scroll-nav-tooltip">Top</span>
      </button>

      <div className="scroll-nav-divider" />

      <button
        type="button"
        className={`scroll-nav-btn scroll-nav-bottom ${atBottom ? 'dimmed' : ''}`}
        onClick={scrollToBottom}
        title="Scroll to Bottom"
        aria-label="Scroll to bottom of page"
      >
        <ChevronDown size={20} className="scroll-nav-icon" />
        <span className="scroll-nav-tooltip">Bottom</span>
      </button>
    </aside>
  );
};

export default ScrollNavigator;
