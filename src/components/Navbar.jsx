import React from 'react';

export default function Navbar({ navigate }) {
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
                if (window.__smoother) {
                  window.__smoother.scrollTo('#faq', true, 'top top');
                } else {
                  const el = document.getElementById('faq');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              } else {
                navigate('/');
                setTimeout(() => {
                  if (window.__smoother) {
                    window.__smoother.scrollTo('#faq', true, 'top top');
                  } else {
                    const el = document.getElementById('faq');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }
                }, 100);
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
