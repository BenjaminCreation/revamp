import React from 'react';

export default function Curriculum() {
  return (
    <div className="frame">
      <span className="tag">Home · 07 · Curriculum</span>
      <h2 style={{ fontSize: '28px' }}>The classroom: 10 live sessions.</h2>
      <div className="disc">
        <div className="d"><b>Marketing</b><span className="mono">× 2</span></div>
        <div className="d"><b>Strategy</b><span class="mono">× 2</span></div>
        <div className="d"><b>Finance</b><span class="mono">× 2</span></div>
        <div className="d"><b>Sales</b><span class="mono">× 1</span></div>
        <div className="d"><b>Founder Tech</b><span class="mono">× 2</span></div>
        <div className="d"><b>Audit &amp; Legal</b><span class="mono">× 1</span></div>
      </div>
      <p className="sub" style={{ marginTop: '14px', fontSize: '14.5px' }}>
        Every session is live, taught with Indian case studies and dhandha you can use the same week.
      </p>
      <p className="mono" style={{ fontSize: '12px', color: 'var(--ink-soft)' }}>
        Full session-by-session syllabus drops before applications close.
      </p>
      <span className="note">
        <b>NOTE</b> Sales × 1 is my addition to your 9. Marketing gets attention; sales collects money. Both tracks die without it. Session details: brainstorm parked for 24 Jul.
      </span>
    </div>
  );
}
