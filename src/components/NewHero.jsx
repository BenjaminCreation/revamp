import React from 'react';

export default function NewHero({ navigate }) {
  return (
    <section className="new-hero-section">
      <div className="new-hero-container">
        {/* Left Column: Heading and CTA */}
        <div className="new-hero-content" style={{ marginLeft: '32px' }}>
          <h1 className="new-hero-title">
            India doesn't have an <br />
            education system. <br />
            <span className="accent-text">It has an exam system.</span>
          </h1>
          <p className="new-hero-subtitle">
            You've been its customer since you were 16. Here's the receipt.
          </p>
          <div className="new-hero-actions">
            <a
              className="btn btn-primary"
              href="/apply"
              onClick={(e) => {
                e.preventDefault();
                navigate('/apply');
              }}
            >
              Apply For Cohort 1
            </a>
            <a
              className="hero-alt-link"
              href="#alt"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('alt');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              So what's the alternative?
            </a>
          </div>
        </div>

        {/* Right Column: Pastel Event Boxes */}
        <div className="new-hero-receipt-col">
          <div className="hero-event-boxes">
            <div className="hero-event-box box-16">
              <span className="hero-event-circle">16</span>
              <p className="hero-event-text"><b>At 16.</b> Lakhs to a coaching institute, to crack JEE.</p>
            </div>
            <div className="hero-event-box box-18">
              <span className="hero-event-circle">18</span>
              <p className="hero-event-text"><b>At 18.</b> 9 out of 10 don't crack it. So: lakhs more, to a college you never wanted.</p>
            </div>
            <div className="hero-event-box box-22">
              <span className="hero-event-circle">22</span>
              <p className="hero-event-text"><b>At 22.</b> A job that barely covers rent. So you buy the next exam. CAT. Or UPSC.</p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
