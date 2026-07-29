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

  // Mobile Animation Refs
  const mobCircle16Ref = useRef(null);
  const mobCircle18Ref = useRef(null);
  const mobCircle22Ref = useRef(null);
  const mobCard16Ref = useRef(null);
  const mobCard18Ref = useRef(null);
  const mobCard22Ref = useRef(null);

  useEffect(() => {
    let ctx;
    
    const initHeroAnimation = () => {
      ctx = gsap.context(() => {
        const isMobile = window.innerWidth <= 768;

        if (!isMobile) {
          // Desktop Pinned MotionPath Timeline
          if (boy1GroupRef.current && boy2GroupRef.current && boy3GroupRef.current) {
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

            tl.to(boy1CircleRef.current, { opacity: 0, duration: 0.02 }, 0);
            tl.to(boy1FaceRef.current, { opacity: 1, duration: 0.02 }, 0);
            tl.to(box16Ref.current, { opacity: 1, duration: 0.05 }, 0);
            tl.to(boy1GroupRef.current, {
              motionPath: { path: "#road-path", align: "#road-path", alignOrigin: [0.5, 0.5], start: 0, end: 0.5 },
              duration: 0.5, ease: "none"
            }, 0);
            tl.set(boy1GroupRef.current, { opacity: 0 }, 0.5);

            tl.to(boy2CircleRef.current, { opacity: 0, duration: 0.02 }, 0.5);
            tl.to(boy2FaceRef.current, { opacity: 1, duration: 0.02 }, 0.5);
            tl.to(box18Ref.current, { opacity: 1, duration: 0.05 }, 0.5);
            tl.to(boy2GroupRef.current, {
              motionPath: { path: "#road-path", align: "#road-path", alignOrigin: [0.5, 0.5], start: 0.5, end: 1 },
              duration: 0.5, ease: "none"
            }, 0.5);
            tl.set(boy2GroupRef.current, { opacity: 0 }, 1.0);

            tl.to(boy3CircleRef.current, { opacity: 0, duration: 0.02 }, 0.98);
            tl.to(boy3FaceRef.current, { opacity: 1, duration: 0.02 }, 0.98);
            tl.to(box22Ref.current, { opacity: 1, duration: 0.05 }, 0.98);
          }
        } else {
          // Mobile ScrollTrigger Sequence (Reveals Boy Faces & Event Tooltips)
          const mobTl = gsap.timeline({
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top+=20",
              end: "+=400",
              scrub: 0.5
            }
          });

          // Boy 16 reveal
          if (mobCircle16Ref.current) {
            mobTl.to(mobCircle16Ref.current, { scale: 1.15, borderColor: '#f97316', duration: 0.2 }, 0);
            mobTl.to(mobCircle16Ref.current.querySelector('.mob-badge-num'), { opacity: 0, duration: 0.1 }, 0);
            mobTl.to(mobCircle16Ref.current.querySelector('.mob-badge-img'), { opacity: 1, scale: 1, duration: 0.2 }, 0);
          }
          if (mobCard16Ref.current) {
            mobTl.to(mobCard16Ref.current, { opacity: 1, y: 0, duration: 0.2 }, 0.05);
          }

          // Boy 18 reveal
          if (mobCircle18Ref.current) {
            mobTl.to(mobCircle18Ref.current, { scale: 1.15, borderColor: '#f97316', duration: 0.2 }, 0.3);
            mobTl.to(mobCircle18Ref.current.querySelector('.mob-badge-num'), { opacity: 0, duration: 0.1 }, 0.3);
            mobTl.to(mobCircle18Ref.current.querySelector('.mob-badge-img'), { opacity: 1, scale: 1, duration: 0.2 }, 0.3);
          }
          if (mobCard18Ref.current) {
            mobTl.to(mobCard18Ref.current, { opacity: 1, y: 0, duration: 0.2 }, 0.35);
          }

          // Boy 22 reveal
          if (mobCircle22Ref.current) {
            mobTl.to(mobCircle22Ref.current, { scale: 1.15, borderColor: '#f97316', duration: 0.2 }, 0.6);
            mobTl.to(mobCircle22Ref.current.querySelector('.mob-badge-num'), { opacity: 0, duration: 0.1 }, 0.6);
            mobTl.to(mobCircle22Ref.current.querySelector('.mob-badge-img'), { opacity: 1, scale: 1, duration: 0.2 }, 0.6);
          }
          if (mobCard22Ref.current) {
            mobTl.to(mobCard22Ref.current, { opacity: 1, y: 0, duration: 0.2 }, 0.65);
          }
        }

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
        {/* Mobile Sub-Nav Box */}
        <div className="mobile-subnav-wrapper mobile-only">
          <span className="plus-symbol">+</span>
          <div className="mobile-subnav-box">
            <a
              href="/read-this"
              onClick={(e) => {
                e.preventDefault();
                navigate('/read-this');
              }}
            >
              READ THIS
            </a>
            <span className="subnav-divider">|</span>
            <a
              href="#faq"
              onClick={(e) => {
                e.preventDefault();
                const smoother = ScrollSmoother.get();
                if (smoother) smoother.scrollTo('#faq', true);
                else document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              FAQ
            </a>
            <span className="subnav-divider">|</span>
            <a
              href="/apply"
              onClick={(e) => {
                e.preventDefault();
                navigate('/apply');
              }}
            >
              APPLY
            </a>
          </div>
          <span className="plus-symbol">+</span>
        </div>

        {/* Headline and Subtitle */}
        <div className="new-hero-content">
          <h1 className="new-hero-title">
            INDIA DOESN&rsquo;T HAVE AN <br />
            EDUCATION SYSTEM. <br />
            <span className="accent-text mobile-block-highlight">IT HAS AN EXAM SYSTEM.</span>
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

        {/* Right Column: Desktop Pinned Road Graphic */}
        <div className="new-hero-receipt-col desktop-only">
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
              <g style={{ fontFamily: 'Poppins, sans-serif' }}>
                <g ref={boy1GroupRef}>
                  <g ref={boy1CircleRef}>
                    <circle cx="0" cy="0" r="18" fill="#ffffff" stroke="#f97316" strokeWidth="3.5" />
                    <text x="0" y="0" textAnchor="middle" dy=".35em" fontSize="15" fontWeight="800" fill="#1C1B17">16</text>
                  </g>
                  <g ref={boy1FaceRef} style={{ opacity: 0 }}>
                    <image href="/boy16.png" x="-24" y="-24" width="48" height="48" preserveAspectRatio="xMidYMid meet" />
                  </g>
                </g>

                <g ref={boy2GroupRef}>
                  <g ref={boy2CircleRef}>
                    <circle cx="0" cy="0" r="18" fill="#ffffff" stroke="#f97316" strokeWidth="3.5" />
                    <text x="0" y="0" textAnchor="middle" dy=".35em" fontSize="15" fontWeight="800" fill="#1C1B17">18</text>
                  </g>
                  <g ref={boy2FaceRef} style={{ opacity: 0 }}>
                    <image href="/boy18.png" x="-24" y="-24" width="48" height="48" preserveAspectRatio="xMidYMid meet" />
                  </g>
                </g>

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

        {/* Mobile Vertical S-Curve Timeline (Design Spec) */}
        <div className="mobile-receipt-timeline mobile-only">
          <div className="mobile-timeline-step step-16">
            <div className="mobile-badge-circle" ref={mobCircle16Ref}>
              <span className="mob-badge-num">16</span>
              <img src="/boy16.png" alt="16" className="mob-badge-img" />
            </div>
            <p className="mobile-step-desc">You enter the system.</p>
            <div className="mobile-event-card card-16" ref={mobCard16Ref}>
              Lakhs to a coaching institute to crack JEE/NEET.
            </div>
          </div>

          <div className="mobile-timeline-step step-18">
            <div className="mobile-badge-circle" ref={mobCircle18Ref}>
              <span className="mob-badge-num">18</span>
              <img src="/boy18.png" alt="18" className="mob-badge-img" />
            </div>
            <p className="mobile-step-desc">You prepare for the exam.</p>
            <div className="mobile-event-card card-18" ref={mobCard18Ref}>
              9 out of 10 don't crack it. So: lakhs more to college.
            </div>
          </div>

          <div className="mobile-timeline-step step-22">
            <div className="mobile-badge-circle" ref={mobCircle22Ref}>
              <span className="mob-badge-num">22</span>
              <img src="/boy22.png" alt="22" className="mob-badge-img" />
            </div>
            <p className="mobile-step-desc">You get a degree.<br />Not a skill.</p>
            <div className="mobile-event-card card-22" ref={mobCard22Ref}>
              Job barely covers living expenses. Buy next exam: CAT/UPSC.
            </div>
          </div>

          <svg className="mobile-s-path-svg" viewBox="0 0 280 320" preserveAspectRatio="none">
            <path
              d="M 55 20 H 235 V 125 H 55 V 230 H 235"
              fill="none"
              stroke="#1C1B17"
              strokeWidth="3.5"
              strokeDasharray="7 7"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Mobile Bottom CTA Block (Design Spec) */}
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
