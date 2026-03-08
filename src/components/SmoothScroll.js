// src/components/SmoothScroll.js
"use client";
import { ReactLenis } from 'lenis/react';

export default function SmoothScroll({ children }) {
  return (
    <ReactLenis root options={{ 
      lerp: 0.08, // Controls the smoothness (lower = smoother)
      duration: 1.5, 
      smoothWheel: true 
    }}>
      {children}
    </ReactLenis>
  );
}