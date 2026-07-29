import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, MotionPathPlugin);

export default function NewHero({ navigate }) {
  const heroRef = useRef(null);
  const boy1GroupRef = useRef(null);
  const boy1CircleRef = useRef(null);
  const boy1FaceRef = useRef(null);
  
  const boy2GroupRef = useRef(null);
  const boy2CircleRef = useRef(null);
  const boy2FaceRef = useRef(null);
  
  const boy3GroupRef = useRef(null);
  const boy3CircleRef = useRef(null);
  const boy3FaceRef = useRef(null);

  const box16Ref = useRef(null);
  const box18Ref = useRef(null);
  const box22Ref = useRef(null);

  useEffect(() => {
    let ctx;
    
    const initHeroAnimation = () => {
      ctx = gsap.context(() => {
        // Initial positioning along the path
        gsap.set(boy1GroupRef.current, { motionPath: { path: "#road-path", align: "#road-path", alignOrigin: [0.5, 0.5], start: 0, end: 0 } });
        gsap.set(boy2GroupRef.current, { motionPath: { path: "#road-path", align: "#road-path", alignOrigin: [0.5, 0.5], start: 0.5, end: 0.5 } });
        gsap.set(boy3GroupRef.current, { motionPath: { path: "#road-path", align: "#road-path", alignOrigin: [0.5, 0.5], start: 1, end: 1 } });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "+=1500",
            scrub: 1,
            pin: true,
            pinSpacing: true
          }
        });

        // 1. BOY 1 JOURNEY (0 to 0.5 scroll)
        tl.to(boy1CircleRef.current, { opacity: 0, duration: 0.02 }, 0);
        tl.to(boy1FaceRef.current, { opacity: 1, duration: 0.02 }, 0);
        tl.to(box16Ref.current, { opacity: 1, duration: 0.05 }, 0);
        tl.to(boy1GroupRef.current, {
          motionPath: { path: "#road-path", align: "#road-path", alignOrigin: [0.5, 0.5], start: 0, end: 0.5 },
          duration: 0.5, ease: "none"
        }, 0);
        tl.set(boy1GroupRef.current, { opacity: 0 }, 0.5);

        // 2. BOY 2 JOURNEY (0.5 to 1.0 scroll)
        tl.to(boy2CircleRef.current, { opacity: 0, duration: 0.02 }, 0.5);
        tl.to(boy2FaceRef.current, { opacity: 1, duration: 0.02 }, 0.5);
        tl.to(box18Ref.current, { opacity: 1, duration: 0.05 }, 0.5);
        tl.to(boy2GroupRef.current, {
          motionPath: { path: "#road-path", align: "#road-path", alignOrigin: [0.5, 0.5], start: 0.5, end: 1 },
          duration: 0.5, ease: "none"
        }, 0.5);
        tl.set(boy2GroupRef.current, { opacity: 0 }, 1.0);

        // 3. BOY 3 ARRIVAL (1.0 scroll)
        tl.to(boy3CircleRef.current, { opacity: 0, duration: 0.02 }, 0.98);
        tl.to(boy3FaceRef.current, { opacity: 1, duration: 0.02 }, 0.98);
        tl.to(box22Ref.current, { opacity: 1, duration: 0.05 }, 0.98);

      }, heroRef);
    };

    // Defer initialization to ensure ScrollSmoother in App.jsx is ready first
    const timer = setTimeout(() => {
      initHeroAnimation();
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timer);
      if (ctx) {
        try {
          ctx.revert();
        } catch (e) {}
      }
    };
  }, []);

  return (
    <section className="new-hero-section" ref={heroRef}>
      <div className="new-hero-container">
        {/* Left Column: Heading and CTA */}
        <div className="new-hero-content" style={{ marginLeft: '32px' }}>
          <h1 className="new-hero-title">
            India doesn't have an <br />
            education system. <br />
            <span className="exam-highlight-box">It has an exam system.</span>
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
                const smoother = ScrollSmoother.get();
                if (smoother) {
                  smoother.scrollTo('#alt', true);
                } else {
                  const el = document.getElementById('alt');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              So what's the alternative?
            </a>
          </div>
        </div>

        {/* Right Column: Pastel Event Boxes */}
        <div className="new-hero-receipt-col">
          <div className="hero-road-graphic" style={{ position: 'relative', margin: '0 auto', width: '100%', maxWidth: '350px' }}>
            <div className="hero-event-boxes">
              <div className="hero-event-box box-16" ref={box16Ref}>
                <p className="hero-event-text">Lakhs to a coaching institute to crack JEE/NEET.</p>
              </div>
              <div className="hero-event-box box-18" ref={box18Ref}>
                <p className="hero-event-text">9 out of 10 don't crack it. So: lakhs more, to a college you never wanted.</p>
              </div>
              <div className="hero-event-box box-22" ref={box22Ref}>
                <p className="hero-event-text">A job that barely covers living expenses. So you buy the next exam, CAT or UPSC.</p>
              </div>
            </div>
            
            <svg viewBox="0 0 200 300" className="road-svg">

              {/* Dashed Center Line (Used as Motion Path) */}
              <path 
                id="road-path"
                d="M 10 10 L 190 10 L 190 150 L 10 150 L 10 290 L 190 290" 
                fill="none" 
                stroke="#1C1B17" 
                strokeWidth="4" 
                strokeDasharray="12 12" 
                strokeLinecap="round" 
                className="road-dashed-line"
              />
              
              {/* Animated Marker Groups */}
              <g style={{ fontFamily: 'Poppins, sans-serif' }}>
                
                {/* Boy 1 Group */}
                <g ref={boy1GroupRef}>
                  <g ref={boy1CircleRef}>
                    <circle cx="0" cy="0" r="18" fill="#ffffff" stroke="#f97316" strokeWidth="3.5" />
                    <text x="0" y="0" textAnchor="middle" dy=".35em" fontSize="15" fontWeight="800" fill="#1C1B17">16</text>
                  </g>
                  <g ref={boy1FaceRef} style={{ opacity: 0 }}>
                    <image href="/boy16.png" x="-24" y="-24" width="48" height="48" preserveAspectRatio="xMidYMid meet" />
                  </g>
                </g>

                {/* Boy 2 Group */}
                <g ref={boy2GroupRef}>
                  <g ref={boy2CircleRef}>
                    <circle cx="0" cy="0" r="18" fill="#ffffff" stroke="#f97316" strokeWidth="3.5" />
                    <text x="0" y="0" textAnchor="middle" dy=".35em" fontSize="15" fontWeight="800" fill="#1C1B17">18</text>
                  </g>
                  <g ref={boy2FaceRef} style={{ opacity: 0 }}>
                    <image href="/boy18.png" x="-24" y="-24" width="48" height="48" preserveAspectRatio="xMidYMid meet" />
                  </g>
                </g>

                {/* Boy 3 Group */}
                <g ref={boy3GroupRef}>
                  <g ref={boy3CircleRef}>
                    <circle cx="0" cy="0" r="18" fill="#ffffff" stroke="#f97316" strokeWidth="3.5" />
                    <text x="0" y="0" textAnchor="middle" dy=".35em" fontSize="15" fontWeight="800" fill="#1C1B17">22</text>
                  </g>
                  <g ref={boy3FaceRef} style={{ opacity: 0 }}>
                    <image href="/boy22.png" x="-24" y="-24" width="48" height="48" preserveAspectRatio="xMidYMid meet" />
                  </g>
                </g>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
