import React, { useEffect, useRef, useState } from 'react';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

function ScrollDashedPath({ d, width, height, className }) {
  const pathRef = useRef(null);
  const [dashOffset, setDashOffset] = useState(0);
  const [dashLength, setDashLength] = useState(0);
  const maskId = useRef(`mask-${Math.random().toString(36).substring(2, 9)}`).current;

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
    <svg className={className} width={width} height={height} viewBox={`0 0 ${width} ${height}`} aria-hidden="true">
      <defs>
        <mask id={maskId}>
          <path
            ref={pathRef}
            d={d}
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="12"
            strokeLinecap="round"
            style={{
              strokeDasharray: `${dashLength} ${dashLength}`,
              strokeDashoffset: dashOffset,
              transition: 'stroke-dashoffset 0.1s ease-out'
            }}
          />
        </mask>
      </defs>
      <path 
        d={d}
        fill="none"
        stroke="#1C1B17"
        strokeWidth="3"
        strokeDasharray="6 6"
        strokeLinecap="round"
        mask={`url(#${maskId})`}
      />
    </svg>
  );
}

export default function NewHero({ navigate }) {
  const [activeStep, setActiveStep] = useState(16);
  const step16Ref = useRef(null);
  const step18Ref = useRef(null);
  const step22Ref = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const vThreshold = window.innerHeight * 0.65;

      if (step22Ref.current) {
        const r22 = step22Ref.current.getBoundingClientRect();
        if (r22.top <= vThreshold) {
          setActiveStep(22);
          return;
        }
      }
      if (step18Ref.current) {
        const r18 = step18Ref.current.getBoundingClientRect();
        if (r18.top <= vThreshold) {
          setActiveStep(18);
          return;
        }
      }
      setActiveStep(16);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="new-hero-section">
      <div className="new-hero-container">

        {/* Headline and Subtitle */}
        <div className="new-hero-content">
          <h1 className="new-hero-title">
            INDIA DOESN&rsquo;T HAVE AN <br />
            EDUCATION SYSTEM. <br />
            <span className="exam-highlight-box mobile-block-highlight">IT HAS AN EXAM SYSTEM.</span>
          </h1>
          <p className="new-hero-subtitle">
            You&rsquo;ve been our customer since you were 16. Here&rsquo;s the receipt.
          </p>

          {/* Desktop Actions */}
          <div className="new-hero-actions desktop-only">
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
                const smoother = ScrollSmoother.get();
                if (smoother) {
                  smoother.scrollTo('#alt', true);
                } else {
                  const el = document.getElementById('alt');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              So what&rsquo;s the alternative?
            </a>
          </div>
        </div>

        {/* Clean Un-boxed Receipt Column with Scroll Highlight */}
        <div className="hero-receipt-column">
          <div className="hero-receipt-card unboxed">
            <div 
              ref={step16Ref} 
              className={`receipt-stop ${activeStep === 16 ? 'is-active step-16-active' : ''}`}
            >
              <span className="receipt-dot">16</span>
              <div className="receipt-body-box">
                <p className="receipt-body">
                  <strong>At 16.</strong> Lakhs to a coaching institute, to crack JEE/NEET.
                </p>
              </div>
            </div>

            <ScrollDashedPath
              className="receipt-curve curve-1"
              width={160}
              height={50}
              d="M 20 2 C 20 28, 110 20, 110 46"
            />

            <div 
              ref={step18Ref} 
              className={`receipt-stop shift-right ${activeStep === 18 ? 'is-active step-18-active' : ''}`}
            >
              <span className="receipt-dot">18</span>
              <div className="receipt-body-box">
                <p className="receipt-body">
                  <strong>At 18.</strong> 9 out of 10 don't crack it. So: lakhs more, to a college you never wanted.
                </p>
              </div>
            </div>

            <ScrollDashedPath
              className="receipt-curve curve-2"
              width={160}
              height={50}
              d="M 110 2 C 110 28, 20 20, 20 46"
            />

            <div 
              ref={step22Ref} 
              className={`receipt-stop ${activeStep === 22 ? 'is-active step-22-active' : ''}`}
            >
              <span className="receipt-dot">22</span>
              <div className="receipt-body-box">
                <p className="receipt-body">
                  <strong>At 22.</strong> A job that barely covers rent. So you buy the next exam. CAT. Or UPSC.
                </p>
              </div>
            </div>

            <p className="receipt-kicker">
              The system never runs out of exams to sell you.
            </p>
          </div>
        </div>

        {/* Mobile Bottom CTA Block */}
        <div className="mobile-hero-cta mobile-only">
          <a
            className="mobile-apply-black-btn"
            href="/apply"
            onClick={(e) => {
              e.preventDefault();
              navigate('/apply');
            }}
          >
            Apply For Cohort 1
          </a>
          <a
            className="mobile-alt-text-link"
            href="#alt"
            onClick={(e) => {
              e.preventDefault();
              const smoother = ScrollSmoother.get();
              if (smoother) smoother.scrollTo('#alt', true);
              else document.getElementById('alt')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            so what&rsquo;s the alternative? <span className="plus-hint">+</span>
          </a>
          <div className="mobile-pagebreak-dots">&bull; &bull; &bull;</div>
        </div>
      </div>
    </section>
  );
}
