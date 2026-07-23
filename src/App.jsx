import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Pivot from './components/Pivot';
import Beliefs from './components/Beliefs';
import Segue from './components/Segue';
import Offer from './components/Offer';
import Tracks from './components/Tracks';
import Curriculum from './components/Curriculum';
import WeekMap from './components/WeekMap';
import InvestorDay from './components/InvestorDay';
import FAQ from './components/FAQ';
import FinalCTA from './components/FinalCTA';
import ReadThis from './components/ReadThis';
import Apply from './components/Apply';
import './index.css';

export default function App() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (to) => {
    window.history.pushState({}, '', to);
    setPath(to);
    window.scrollTo(0, 0);
  };

  return (
    <div className="sheet">
      <header className="sheet-head">
        <span className="mono">Dhandha School · skeleton v2 · 23 Jul 2026 · goes with website-design-v2.md</span>
        <h1>The website, bone by bone.</h1>
        <p>This is a wireframe, not the visual design. Copy is real draft copy. Blue notes are build instructions. Green is the one accent, reserved for money and action.</p>
      </header>

      {/* Global Navigation */}
      <Navbar navigate={navigate} />

      {/* Dynamic Main Content */}
      {path === '/' && (
        <>
          <Hero navigate={navigate} />
          <Pivot />
          <Beliefs />
          <Segue navigate={navigate} />
          <Offer />
          <Tracks />
          <Curriculum />
          <WeekMap />
          <InvestorDay />
          <FAQ />
          <FinalCTA navigate={navigate} />
        </>
      )}

      {path === '/read-this' && (
        <ReadThis navigate={navigate} />
      )}

      {path === '/apply' && (
        <Apply />
      )}

      <footer className="colophon">
        Skeleton v2 · pairs with website-design-v2.md · Open decisions: service-track name, dates, seat cap, fee, guarantee vs Investor-Day-as-promise, 16-45 age policy.
      </footer>
    </div>
  );
}
