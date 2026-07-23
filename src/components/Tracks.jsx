import React, { useEffect, useRef, useState } from 'react';

function ScrollForkPath({ d }) {
  const pathRef = useRef(null);
  const [dashOffset, setDashOffset] = useState(0);
  const [dashLength, setDashLength] = useState(0);

  useEffect(() => {
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength();
      setDashLength(length);
      setDashOffset(length);
    }

    const handleScroll = () => {
      if (!pathRef.current || !dashLength) return;
      const rect = pathRef.current.getBoundingClientRect();
      const viewHeight = window.innerHeight;
      
      const start = viewHeight;
      const end = viewHeight / 2;
      
      if (rect.top > start) {
        setDashOffset(dashLength);
      } else if (rect.top < end) {
        setDashOffset(0);
      } else {
        const pct = (rect.top - end) / (start - end);
        setDashOffset(dashLength * pct);
      }
    };

    window.addEventListener('scroll', handleScroll);
    setTimeout(handleScroll, 100);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [dashLength]);

  return (
    <path 
      ref={pathRef}
      d={d}
      style={{
        strokeDasharray: dashLength,
        strokeDashoffset: dashOffset,
        transition: 'stroke-dashoffset 0.1s ease-out'
      }}
    />
  );
}

export default function Tracks() {
  return (
    <div className="frame">
      <span className="tag">Home · 06 · The fork</span>
      <h2 style={{ fontSize: '28px', textAlign: 'center' }}>One school. Two tracks. Pick yours.</h2>
      <svg className="fork-svg" width="560" height="90" viewBox="0 0 560 90" aria-hidden="true">
        <ScrollForkPath d="M280 4 L280 26 C 280 56, 150 50, 148 86" />
        <ScrollForkPath d="M280 26 C 280 56, 410 50, 412 86" />
      </svg>
      <div className="tracks">
        <div className="track">
          <span className="kind mono">The maker track</span>
          <h3>KARKHANA</h3>
          <p>You build a merchandise brand for a community you belong to: your college, your city, your fandom. Design, suppliers, pre-orders, margins. One rule is iron: you never print what nobody has paid for.</p>
          <span className="cap mono">Capital: a few thousand ₹, mostly collected from customers first</span>
        </div>
        <div className="track">
          <span className="kind mono">The skills track</span>
          <h3>HUNARKHANA</h3>
          <p>India has over 6 crore small businesses, and most run on instinct. You pick a skill they need, package it as a service, price it, and land your first paying client. Sell to the shops around you.</p>
          <span className="cap mono">Capital: ₹0</span>
        </div>
      </div>
      <p className="join-line">Sessions are combined across tracks. Checkpoints are separate. You learn together; you build alone.</p>
      <span className="note">
        <b>NOTE</b> The fork is signature visual #2: one dashed path splits into the two cards. Track name "Hunarkhana" is my recommendation, pending your call (alternates: Sevaghar, Karobar). And Karkhana means factory, not inventory. Better fit anyway.
      </span>
    </div>
  );
}
