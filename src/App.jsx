import React, { useState, useEffect } from 'react';
import PillNav from './components/PillNav';
import NewHero from './components/NewHero';
import AlternativeSection from './components/AlternativeSection';
import Beliefs from './components/Beliefs';
import Offer from './components/Offer';
import Tracks from './components/Tracks';
import Curriculum from './components/Curriculum';
import WeekMap from './components/WeekMap';
import InvestorDay from './components/InvestorDay';
import ReadThis from './components/ReadThis';
import Apply from './components/Apply';
import ScrollPlane from './components/ScrollPlane';
import BottomSection from './components/BottomSection';
import Footer from './components/Footer';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import './index.css';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function App() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const [smootherReady, setSmootherReady] = useState(false);

  // Initialize GSAP ScrollSmoother ONLY on homepage ('/')
  React.useLayoutEffect(() => {
    let smoother = null;
    
    if (path === '/') {
      window.scrollTo(0, 0);
      smoother = ScrollSmoother.create({
        smooth: 0.8,
        effects: false,
        smoothTouch: 0.1
      });
      window.__smoother = smoother;
      setSmootherReady(true);
    } else {
      if (window.__smoother) {
        try {
          window.__smoother.kill();
        } catch (e) {}
        window.__smoother = null;
      }
      // Clear all GSAP inline styles (transform, height, position) from wrappers
      gsap.set(['#smooth-wrapper', '#smooth-content'], { clearProps: 'all' });

      // Kill all active homepage ScrollTriggers & pin spacers
      ScrollTrigger.getAll().forEach(st => {
        try {
          st.kill(true);
        } catch (e) {}
      });
      document.querySelectorAll('.pin-spacer').forEach(el => {
        try {
          el.remove();
        } catch (e) {}
      });
      window.scrollTo(0, 0);
      setSmootherReady(true);
    }

    return () => {
      if (smoother) {
        smoother.kill();
        window.__smoother = null;
      }
    };
  }, [path]);

  // Prevent and correct browser zoom levels to preserve 100% layout proportions
  useEffect(() => {
    const handleZoomPrevention = (e) => {
      if (
        e.ctrlKey &&
        (e.key === '=' ||
          e.key === '-' ||
          e.key === '0' ||
          e.keyCode === 187 ||
          e.keyCode === 189 ||
          e.keyCode === 48 ||
          e.keyCode === 96 ||
          e.keyCode === 107 ||
          e.keyCode === 109)
      ) {
        e.preventDefault();
      }
    };

    const handleWheelPrevention = (e) => {
      if (e.ctrlKey) {
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleZoomPrevention, { capture: true });
    window.addEventListener('wheel', handleWheelPrevention, { passive: false, capture: true });

    const correctZoom = () => {
      try {
        const outerW = window.outerWidth;
        const innerW = window.innerWidth;
        if (outerW && innerW) {
          const zoomLevel = outerW / innerW;
          // Apply scaling counter-correction if zoom is not 1.0 (with 5% buffer)
          if (Math.abs(zoomLevel - 1.0) > 0.05 && zoomLevel > 0.1 && zoomLevel < 5) {
            document.body.style.zoom = 1 / zoomLevel;
          } else {
            document.body.style.zoom = 1.0;
          }
        }
      } catch (err) {
        console.error("Zoom correction failed", err);
      }
    };

    let resizeTimer;
    const debouncedCorrectZoom = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(correctZoom, 100);
    };

    window.addEventListener('resize', debouncedCorrectZoom);
    // Double trigger to ensure layout finishes rendering before sizing check
    correctZoom();
    const t = setTimeout(correctZoom, 150);

    return () => {
      window.removeEventListener('keydown', handleZoomPrevention, { capture: true });
      window.removeEventListener('wheel', handleWheelPrevention, { capture: true });
      window.removeEventListener('resize', debouncedCorrectZoom);
      clearTimeout(t);
      clearTimeout(resizeTimer);
    };
  }, []);

  const navigate = (to, options = {}) => {
    // Revert and kill all active ScrollTriggers (unpins hero section synchronously)
    ScrollTrigger.getAll().forEach(st => {
      try {
        st.revert();
        st.kill();
      } catch (e) {}
    });

    if (window.__smoother) {
      try {
        window.__smoother.kill();
      } catch (e) {}
      window.__smoother = null;
    }

    gsap.set(['#smooth-wrapper', '#smooth-content'], { clearProps: 'all' });
    document.querySelectorAll('.pin-spacer').forEach(el => {
      try { el.remove(); } catch (e) {}
    });

    window.history.pushState({}, '', to);
    setPath(to);
    if (!options.skipScroll) {
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className={`app-root ${path === '/' || path === '/apply' ? 'is-home' : ''}`}>
      {/* Global Navigation */}
      <PillNav
        logo="Dhandha School"
        items={[
          { label: 'Read This', href: '/read-this' },
          { label: 'FAQ', href: '#faq' },
          { label: 'Apply', href: '/apply' }
        ]}
        activeHref={path}
        navigate={navigate}
        baseColor={path === '/' || path === '/apply' ? '#1C1B17' : 'var(--ink)'}
        pillColor={path === '/' || path === '/apply' ? '#FAF8F2' : 'var(--paper)'}
        pillTextColor={path === '/' || path === '/apply' ? '#1C1B17' : 'var(--ink)'}
        hoveredPillTextColor="#FFFFFF"
        initialLoadAnimation={true}
      />

      {/* ScrollSmoother viewport wrap */}
      <div id="smooth-wrapper">
        <div id="smooth-content">

          {/* Full-bleed New Hero Section at the top of homepage */}
          {smootherReady && path === '/' && (
            <>
                  <NewHero navigate={navigate} />
                  <AlternativeSection />
                  <Beliefs navigate={navigate} />
                  <Offer navigate={navigate} />
                  <Tracks />
                  <Curriculum />
                  <WeekMap />
                  <InvestorDay />
                </>
              )}

          {/* Full-bleed ReadThis Section */}
          {smootherReady && path === '/read-this' && (
            <ReadThis navigate={navigate} isStandalone={true} />
          )}

          {/* Full-bleed Apply Section */}
          {smootherReady && path === '/apply' && (
            <Apply navigate={navigate} isStandalone={true} />
          )}

          {/* Main Content Bounded Sheet */}
          {smootherReady && path !== '/' && path !== '/read-this' && path !== '/apply' && (
            <div className="sheet">
            </div>
          )}

          {smootherReady && path === '/' && (
            <>
              <BottomSection navigate={navigate} />
              <Footer navigate={navigate} />
            </>
          )}

        </div>
      </div>

      {smootherReady && path === '/' && <ScrollPlane />}
    </div>
  );
}
