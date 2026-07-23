import React from 'react';

export default function Offer() {
  return (
    <div className="frame">
      <span className="tag">Home · 05 · The offer</span>
      <h2 style={{ fontSize: '30px' }}>We help you become an entrepreneur. By making you build, not study.</h2>
      <p className="sub" style={{ marginTop: '12px' }}>
        Dhandha School is a 4-week cohort. You pick a track, you get live sessions with real Indian case studies, and every week you clear a checkpoint on a real business with your name on it. By Day 30 you haven't "learnt entrepreneurship". You've started.
      </p>
      <div className="chips">
        <span className="chip">4 weeks</span>
        <span class="chip">2 tracks</span>
        <span class="chip">10 live sessions</span>
        <span class="chip">4 checkpoints</span>
        <span class="chip money">1 flight to Bangalore</span>
      </div>
    </div>
  );
}
