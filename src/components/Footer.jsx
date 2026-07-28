import React from 'react';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import './Footer.css';

export default function Footer({ navigate }) {
  const scrollToTarget = (targetId, smooth = true) => {
    const smoother = ScrollSmoother.get();
    if (smoother) {
      if (targetId === 'top') {
        smoother.scrollTo(0, smooth);
      } else {
        smoother.scrollTo(targetId, smooth);
      }
    } else {
      if (targetId === 'top') {
        if (smooth) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          window.scrollTo(0, 0);
        }
      } else {
        const el = document.querySelector(targetId);
        if (el) {
          if (smooth) {
            el.scrollIntoView({ behavior: 'smooth' });
          } else {
            el.scrollIntoView();
          }
        }
      }
    }
  };

  const handleNavClick = (e, to) => {
    e.preventDefault();
    if (navigate) {
      navigate(to);
    }
  };

  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    if (targetId === 'top') {
      scrollToTarget('top', true);
      return;
    }
    if (window.location.pathname === '/') {
      scrollToTarget(targetId, true);
    } else {
      if (navigate) {
        navigate('/', { skipScroll: true });
      }
      const id = targetId.replace('#', '');
      const waitForEl = setInterval(() => {
        if (document.getElementById(id) && ScrollSmoother.get()) {
          clearInterval(waitForEl);
          scrollToTarget(targetId, false);
        }
      }, 50);
      setTimeout(() => clearInterval(waitForEl), 5000);
    }
  };

  return (
    <footer className="sec8-footer-bottom">
      {/* Background Animation Layer */}
      <div className="footer-gradient-bg">
        <div className="gradient-blobs-container">
          <div className="hero-circ_blue2"></div>
          <div className="hero-circ_pink2"></div>
          <div className="hero-circ_blue"></div>
          <div className="hero-circ_pink"></div>
        </div>
      </div>

      <div className="sec8-footer-inner">
        {/* Main Grid */}
        <div className="sec8-footer-grid">
          {/* Column 1 (Brand) */}
          <div className="sec8-col sec8-col-brand">
            <div className="brand-logo">
              <span className="brand-dhandha">DHANDHA</span>
              <span className="brand-school">school</span>
            </div>
            <p className="brand-desc">
              Real business education taught with Indian case studies and practical frameworks you can deploy the same week.
            </p>
          </div>

          {/* Column 2 (Masterclass) */}
          <div className="sec8-col">
            <span className="sec8-col-title">MASTERCLASS</span>
            <ul className="footer-links">
              <li><a href="/read-this" onClick={(e) => handleNavClick(e, '/read-this')}>Curriculum</a></li>
              <li><a href="/apply" onClick={(e) => handleNavClick(e, '/apply')}>Pricing</a></li>
              <li><a href="#faq" onClick={(e) => handleScrollTo(e, '#faq')}>FAQ</a></li>
            </ul>
          </div>

          {/* Column 3 (About) */}
          <div className="sec8-col">
            <span className="sec8-col-title">ABOUT</span>
            <ul className="footer-links">
              <li><a href="/read-this" onClick={(e) => handleNavClick(e, '/read-this')}>Instructor</a></li>
              <li><a href="#alt" onClick={(e) => handleScrollTo(e, '#alt')}>Why we exist</a></li>
              <li><a href="/read-this" onClick={(e) => handleNavClick(e, '/read-this')}>Masterclass</a></li>
            </ul>
          </div>

          {/* Column 4 (Follow) */}
          <div className="sec8-col">
            <span className="sec8-col-title">FOLLOW</span>
            <ul className="footer-links">
              <li><a href="https://www.instagram.com/whybhanshu?igsh=NDBqajI0ZTFpOGxz" target="_blank" rel="noreferrer">Instagram</a></li>
              <li><a href="https://youtube.com/@whybhanshu?si=Pe16UZHShdl5GCx-" target="_blank" rel="noreferrer">YouTube</a></li>
              <li><a href="https://www.linkedin.com/in/vibhanshu-golia-298a3019a" target="_blank" rel="noreferrer">LinkedIn</a></li>
              <li><a href="https://discord.com/invite/FxDpfHG3Cc" target="_blank" rel="noreferrer">Discord</a></li>
            </ul>
          </div>

          {/* Column 5 (Back to top) */}
          <div className="sec8-col sec8-col-backtop">
            <button className="scroll-to-top-btn" onClick={(e) => handleScrollTo(e, 'top')} aria-label="Scroll to top">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="18 15 12 9 6 15"></polyline>
              </svg>
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="sec8-footer-bottom-bar">
          <div className="footer-copyright">
            © {new Date().getFullYear()} Dhandha School. All rights reserved.
          </div>
          <div className="footer-upforge-link">
            Made by <a href="https://www.upforgeconsulting.com" target="_blank" rel="noreferrer">UpForge Consulting</a>
          </div>
          <div className="footer-cohort-details">
            Cohort 1 • Seats Capped
          </div>
        </div>
      </div>
    </footer>
  );
}
