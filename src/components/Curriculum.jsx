import React, { useRef, useEffect } from 'react';

const DISCIPLINES = [
  { name: 'Marketing',      count: 2, desc: 'Attract customers without a budget.' },
  { name: 'Strategy',       count: 2, desc: 'Pick fights you can win. Ignore the rest.' },
  { name: 'Finance',        count: 2, desc: 'Read money. Run margins. Don\'t guess.' },
  { name: 'Sales',          count: 1, desc: 'Close. Without it, everything else is a hobby.' },
  { name: 'Founder Tech',   count: 2, desc: 'Build tools, not teams. Move fast with AI.' },
  { name: 'Audit & Legal',  count: 1, desc: 'Stay clean. Know what you\'re signing.' },
];

export default function Curriculum() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const marquee = section.querySelector('.curriculum-marquee-inner');
    if (!marquee) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        marquee.classList.toggle('marquee-paused', !entry.isIntersecting);
      },
      { threshold: 0 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="curriculum-section" ref={sectionRef}>
      <div className="curriculum-main-box">
        <div className="curriculum-marquee">
          <div className="curriculum-marquee-inner">
            <div className="curriculum-marquee-content">
              <span className="marquee-item">LEARN BY BUILDING</span>
              <span className="marquee-item">✦</span>
              <span className="marquee-item">NO THEORY</span>
              <span className="marquee-item">✦</span>
              <span className="marquee-item">INDIAN CASE STUDIES</span>
              <span className="marquee-item">✦</span>
              <span className="marquee-item">REAL BUSINESSES</span>
              <span className="marquee-item">✦</span>
            </div>
            <div className="curriculum-marquee-content" aria-hidden="true">
              <span className="marquee-item">LEARN BY BUILDING</span>
              <span className="marquee-item">✦</span>
              <span className="marquee-item">NO THEORY</span>
              <span className="marquee-item">✦</span>
              <span className="marquee-item">INDIAN CASE STUDIES</span>
              <span className="marquee-item">✦</span>
              <span className="marquee-item">REAL BUSINESSES</span>
              <span className="marquee-item">✦</span>
            </div>
          </div>
        </div>

        <div className="curriculum-container">
          {/* Left Column: Heading and copy */}
          <div className="curriculum-left">
            <h2 className="curriculum-title">
              The classroom: <span className="curriculum-highlight-box yellow-highlight">10 live sessions.</span>
            </h2>
            <p className="curriculum-text-box">
              Every session is live, taught with Indian case studies and dhandha you can use the same week.
            </p>
            <p className="curriculum-footnote mono">
              Full session-by-session syllabus drops before applications close.
            </p>
          </div>

          {/* Right Column: Grid of discipline cards */}
          <div className="curriculum-right">
            <div className="curriculum-disc-grid">
              {DISCIPLINES.map(({ name, count, desc }) => (
                <div className="curriculum-disc-card" key={name}>
                  <div className="curriculum-disc-left">
                    <span className="curriculum-disc-num">{count}</span>
                  </div>
                  <div className="curriculum-disc-right">
                    <span className="curriculum-disc-name">{name}</span>
                    <span className="curriculum-disc-desc">{desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
