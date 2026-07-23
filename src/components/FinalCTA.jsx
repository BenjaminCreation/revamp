import React from 'react';

export default function FinalCTA({ navigate }) {
  return (
    <div className="frame">
      <span className="tag">Home · 11 · Final CTA</span>
      <div className="cta-center">
        <h2>Stop preparing. Start building.</h2>
        <p className="sub" style={{ margin: '0 auto 16px', maxWidth: '48ch' }}>
          Applications for Cohort 1 close [date]. Seats are capped and we read every application personally.
        </p>
        <a 
          className="btn" 
          href="/apply"
          onClick={(e) => {
            e.preventDefault();
            navigate('/apply');
          }}
        >
          Apply for Cohort 1
        </a>
        &nbsp;&nbsp;
        <a 
          className="btn ghost" 
          href="#"
          onClick={(e) => {
            e.preventDefault();
            alert('Waitlist joined!');
          }}
        >
          Join the waitlist
        </a>
      </div>
    </div>
  );
}
