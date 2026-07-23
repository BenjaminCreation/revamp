import React from 'react';

export default function Navbar({ navigate }) {
  return (
    <div className="frame">
      <span className="tag">Global · Nav</span>
      <div className="navwire">
        <span 
          className="logo" 
          onClick={() => navigate('/')}
        >
          DHANDHA SCHOOL
        </span>
        <span className="spacer"></span>
        <span 
          className="mono" 
          onClick={() => navigate('/read-this')}
        >
          Read This
        </span>
        <span 
          className="mono" 
          onClick={() => {
            navigate('/');
            setTimeout(() => {
              const el = document.getElementById('faq');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 50);
          }}
        >
          FAQ
        </span>
        <a 
          className="btn" 
          href="/apply" 
          onClick={(e) => {
            e.preventDefault();
            navigate('/apply');
          }}
        >
          Apply
        </a>
      </div>
      <span className="note">
        <b>NOTE</b> Sticky, minimal. Apply is the only button in the nav, everywhere, always the same word.
      </span>
    </div>
  );
}
