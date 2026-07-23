import React from 'react';

export default function WeekMap() {
  return (
    <div className="frame">
      <span className="tag">Home · 08 · The 4-week map</span>
      <h2 style={{ fontSize: '28px' }}>Four weeks. This is the map.</h2>
      <div className="maphead">
        <span>Karkhana checkpoint</span>
        <span>Week · Sessions</span>
        <span>Hunarkhana checkpoint</span>
      </div>

      <div className="week">
        <div className="cp">
          <span className="who mono">Karkhana</span>
          Niche picked, product idea locked, supplier shortlist. 10 customer conversations.
        </div>
        <div className="wk-mid">
          <span className="wno mono">Week 1</span>
          <h3>Find your dhandha</h3>
          <span className="sess mono">Strategy 1 · Marketing 1</span>
        </div>
        <div className="cp">
          <span className="who mono">Hunarkhana</span>
          Service picked, 25 target businesses listed. 10 customer conversations.
        </div>
      </div>

      <div className="week">
        <div className="cp">
          <span className="who mono">Karkhana</span>
          Final design, supplier quote, pre-order page live.
        </div>
        <div className="wk-mid">
          <span className="wno mono">Week 2</span>
          <h3>Make the offer</h3>
          <span className="sess mono">Sales · Founder Tech 1</span>
        </div>
        <div className="cp">
          <span className="who mono">Hunarkhana</span>
          Offer packaged and priced, first 10 pitches made.
        </div>
      </div>

      <div className="week">
        <div className="cp">
          <span className="who mono">Karkhana</span>
          Pre-order window open, first paid orders in.
        </div>
        <div className="wk-mid">
          <span className="wno mono">Week 3</span>
          <h3>Collect money</h3>
          <span className="sess mono">Finance 1 · Marketing 2</span>
        </div>
        <div className="cp">
          <span className="who mono">Hunarkhana</span>
          First paying client closed.
        </div>
      </div>

      <div className="week">
        <div className="cp">
          <span className="who mono">Karkhana</span>
          Deliver orders. One-page P&amp;L. Demo pitch.
        </div>
        <div className="wk-mid">
          <span className="wno mono">Week 4</span>
          <h3>Deliver and account</h3>
          <span className="sess mono">Finance 2 · Founder Tech 2 · Audit &amp; Legal</span>
        </div>
        <div className="cp">
          <span className="who mono">Hunarkhana</span>
          Deliver the work. One-page P&amp;L. Demo pitch.
        </div>
      </div>

      <p style={{ textAlign: 'center', fontFamily: '"Avenir Next Condensed", sans-serif', fontWeight: 800, fontSize: '18px', margin: '16px 0 0' }}>
        One pitch gets picked. ↓
      </p>
      <span className="note">
        <b>NOTE</b> Desktop: sessions run down the centre, track checkpoints flank left and right, so the bifurcation from section 06 visibly continues. Mobile: weeks stack vertically, checkpoints as chips. All content provisional until the session brainstorm.
      </span>
    </div>
  );
}
