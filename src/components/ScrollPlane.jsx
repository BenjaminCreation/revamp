import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function ScrollPlane() {
  useEffect(() => {
    // Get the image elements
    const startImg = document.getElementById('plane-start-img');
    const endImg = document.getElementById('plane-end-img');
    const floatingPlane = document.getElementById('floating-scroll-plane');

    if (!floatingPlane) return;

    let startX = 0;
    let endX = 0;
    let startY = 0;
    let endY = 0;
    let Y_MID = 0;

    // Path ratios and cruise offset variables (calculated dynamically on refresh)
    let ARC_RELEASE = 0.20;
    let ARC_LANDING = 0.91;
    let radiusX = 100;

    const measureCoords = () => {
      const startEl = document.getElementById('plane-start-marker');
      const endEl = document.getElementById('plane-end-marker');
      if (!startEl || !endEl) return;

      const rectStart = startEl.getBoundingClientRect();
      const rectEnd = endEl.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const viewportW = window.innerWidth;

      const smoother = ScrollSmoother.get();
      const currentScrollY = smoother ? smoother.scrollTop() : window.scrollY;

      // Extract accurate horizontal points in viewport space and vertical offsets in document space
      // Since markers are styled absolute on the right edge, their centers are exactly the card boundaries.
      startX = rectStart.left + rectStart.width / 2;
      startY = rectStart.top + rectStart.height / 2 + currentScrollY;
      endX = rectEnd.left + rectEnd.width / 2;
      endY = rectEnd.top + rectEnd.height / 2 + currentScrollY;
      Y_MID = viewportH * 0.45;

      // Calculate path ratios dynamically from actual scroll distance
      const totalScrollDist = endY - startY;
      if (totalScrollDist > 300) {
        const exitDist = 180; // px of scroll dedicated to takeoff curve
        const landDist = 180; // px of scroll dedicated to landing curve
        
        ARC_RELEASE = exitDist / totalScrollDist;
        ARC_LANDING = 1 - (landDist / totalScrollDist);
      } else {
        ARC_RELEASE = 0.20;
        ARC_LANDING = 0.91;
      }

      // Compute radiusX to fit viewport bounds comfortably
      radiusX = Math.min(viewportW - startX - 100, 220);
      if (radiusX < 160) radiusX = 160; // minimum safety radius to accommodate 135px slide exit
    };

    let st = null;
    let pollTimer = null;
    let attempts = 0;
    const MAX_ATTEMPTS = 20; // poll up to ~1000ms

    const init = () => {
      const smoother = ScrollSmoother.get();
      if (!smoother && attempts < MAX_ATTEMPTS) {
        attempts++;
        pollTimer = setTimeout(init, 50);
        return;
      }

      // ScrollSmoother is ready (or we've waited long enough) — measure and create trigger
      measureCoords();

      // ScrollTrigger needs scroller: '#smooth-wrapper' when ScrollSmoother is active
      // but ScrollSmoother patches ScrollTrigger globally, so the default scroller works.
      // We just need to ensure refresh happens after measurement.
      st = ScrollTrigger.create({
        trigger: "#plane-start-marker",
        endTrigger: "#plane-end-marker",
        start: "center 50%",
        end: "center 50%",
        scrub: true,
        invalidateOnRefresh: true,
        onRefresh: () => {
          measureCoords();
        },
        onToggle: self => {
          if (self.isActive) {
            // Flight active: hide inline placeholders, show active floating plane
            if (startImg) startImg.style.opacity = '0';
            if (endImg) endImg.style.opacity = '0';
            floatingPlane.style.opacity = '1';
            floatingPlane.style.visibility = 'visible';
          } else {
            // Flight inactive: hide floating plane, show correct static placeholder
            floatingPlane.style.opacity = '0';
            floatingPlane.style.visibility = 'hidden';
            if (self.progress === 0) {
              if (startImg) startImg.style.opacity = '1';
              if (endImg) endImg.style.opacity = '0';
            } else if (self.progress === 1) {
              if (startImg) startImg.style.opacity = '0';
              if (endImg) endImg.style.opacity = '1';
            }
          }
        },
        onUpdate: self => {
          const progress = self.progress;
          const smoother = ScrollSmoother.get();
          const currentScrollY = smoother ? smoother.scrollTop() : window.scrollY;

          // Current viewport coordinates of the takeoff and landing placeholders
          const yStartViewport = startY - currentScrollY;
          const yEndViewport = endY - currentScrollY;

          let x = startX;
          let y = Y_MID;
          let rotate = 90;

          if (progress < ARC_RELEASE) {
            // Phase A: Takeoff slides straight rightward out of the card first, then curves down
            const p = progress / ARC_RELEASE;
            const SLIDE_RATIO = 0.45; // First 45% of takeoff phase is purely horizontal slide

            if (p < SLIDE_RATIO) {
              const t = p / SLIDE_RATIO;
              x = startX + t * 135; // Slide horizontally straight out of the card by 135px
              y = yStartViewport; // Keep aligned vertically with card center
              rotate = 90; // Face right
            } else {
              const t = (p - SLIDE_RATIO) / (1 - SLIDE_RATIO);
              const xReleaseStart = startX + 135;
              x = xReleaseStart + Math.sin(t * Math.PI / 2) * (radiusX - 135); // Curve to cruise X
              y = yStartViewport + t * (Y_MID - yStartViewport); // Transition to Y_MID cruise height
              rotate = 90 + t * 90; // Face right (90) to down (180)
            }
          } else if (progress > ARC_LANDING) {
            // Phase C: Landing drops vertically first, then slides horizontally left into card
            const p = (progress - ARC_LANDING) / (1 - ARC_LANDING);
            const xCruise = startX + radiusX;
            const deltaX = xCruise - endX;
            x = xCruise - (1 - Math.cos(p * Math.PI / 2)) * deltaX; // Slide leftward into card
            y = Y_MID + Math.sin(p * Math.PI / 2) * (yEndViewport - Y_MID); // Drop to target card height first
            rotate = 180 + p * 90; // Face down (180) to left (270)
          } else {
            // Phase B: Perfectly vertical descent
            x = startX + radiusX;
            y = Y_MID;
            rotate = 180; // Facing down
          }

          // Apply coordinates directly to bypass React virtual DOM lag
          floatingPlane.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) rotate(${rotate}deg)`;
        }
      });

      // Force a refresh so ScrollTrigger re-reads all positions with smoother active
      ScrollTrigger.refresh();
    };

    // Start polling — ScrollSmoother may not be ready yet on first render
    pollTimer = setTimeout(init, 50);

    return () => {
      clearTimeout(pollTimer);
      st?.kill();
    };
  }, []);

  return (
    <div
      id="floating-scroll-plane"
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: '7.5rem',
        height: '4.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        pointerEvents: 'none',
        opacity: 0,
        visibility: 'hidden',
        willChange: 'transform'
      }}
    >
      <img
        src="/real_airplane.png"
        alt="Flying airplane scrolling animation"
        style={{
          width: '100%',
          height: 'auto',
          display: 'block'
        }}
      />
    </div>
  );
}
