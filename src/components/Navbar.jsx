import React from 'react';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Navbar({ navigate }) {
  const scrollToFaq = (smooth = true) => {
    const el = document.getElementById('faq');
    const smoother = ScrollSmoother.get();
    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.refresh();
    }
    if (smoother && el) {
      smoother.scrollTo(el, smooth);
    } else if (el) {
      el.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' });
    }
  };

  return (
    <header className="global-navbar">
      <div className="navbar-container">
        <span 
          className="logo" 
          onClick={() => navigate('/')}
        >
          DHANDHA SCHOOL
        </span>
        <nav className="navbar-links">
          <button 
            className="nav-link mono" 
            onClick={() => navigate('/read-this')}
          >
            Read This
          </button>
          <button 
            className="nav-link mono" 
            onClick={() => {
              if (window.location.pathname === '/') {
                scrollToFaq(true);
              } else {
                navigate('/', { skipScroll: true });
                const waitForFaq = setInterval(() => {
                  const el = document.getElementById('faq');
                  const smoother = ScrollSmoother.get();
                  if (el && smoother) {
                    clearInterval(waitForFaq);
                    if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
                    smoother.scrollTo(el, false);

                    setTimeout(() => {
                      if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
                      smoother.scrollTo(el, true);
                    }, 300);

                    setTimeout(() => {
                      if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
                      smoother.scrollTo(el, true);
                    }, 750);
                  }
                }, 50);
                setTimeout(() => clearInterval(waitForFaq), 5000);
              }
            }}
          >
            FAQ
          </button>
          <a 
            className="nav-btn btn-primary" 
            href="/apply" 
            onClick={(e) => {
              e.preventDefault();
              navigate('/apply');
            }}
          >
            Apply
          </a>
        </nav>
      </div>
    </header>
  );
}
