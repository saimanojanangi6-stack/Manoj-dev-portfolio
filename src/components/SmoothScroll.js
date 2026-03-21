"use client";
import { ReactLenis, useLenis } from 'lenis/react';
import { useEffect, useRef } from 'react';

export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);

  // Advanced: Sync Lenis scroll with Framer Motion or GSAP if needed
  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time);
      requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }, []);

  return (
    <ReactLenis 
      root 
      ref={lenisRef}
      options={{ 
        // LERP: 0.08 is good, but 0.05 gives that "high-end agency" heavy feel
        lerp: 0.05, 
        duration: 1.2, 
        smoothWheel: true,
        wheelMultiplier: 1.1, // Makes the scroll feel more responsive
        touchMultiplier: 1.5, // Better feel for mobile trackpads
        infinite: false,
        // Critical for 3D elements: prevents scroll jitter
        syncTouch: true, 
      }}
    >
      {children}
    </ReactLenis>
  );
}