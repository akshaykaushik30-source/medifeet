import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

const LOGO = '/assets/medifeet-brand-logo.png';
const EASE = [0.22, 1, 0.36, 1];

// The MediFeet logo assembling itself: the lime figure springs in, the
// wordmark writes itself left to right, then the "+" turns into place.
// Each part is the same logo image clipped to that part.
const Part = ({ clip, ...motionProps }) => (
  <motion.img src={LOGO} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full" style={{ clipPath: clip }} {...motionProps} />
);

export const LogoBuild = ({ className = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();
  const go = inView ? 'shown' : 'hidden';

  if (reduceMotion) return <img src={LOGO} alt="MediFeet" className={className} />;

  return (
    <div ref={ref} className={`relative aspect-[400/129] ${className}`} role="img" aria-label="MediFeet">
      {/* Figure: the five lime shapes on the left. */}
      <Part
        clip="inset(0 77% 0 0)"
        style={{ clipPath: 'inset(0 77% 0 0)', transformOrigin: '12% 55%' }}
        initial={{ opacity: 0, scale: 0.4, rotate: -25 }}
        animate={go === 'shown' ? { opacity: 1, scale: 1, rotate: 0 } : undefined}
        transition={{ type: 'spring', duration: 0.9, bounce: 0.35 }}
      />
      {/* Wordmark and swoosh, written left to right. */}
      <Part
        clip="inset(0 16% 0 26%)"
        initial={{ clipPath: 'inset(0% 74% 0% 26%)' }}
        animate={go === 'shown' ? { clipPath: 'inset(0% 16% 0% 26%)' } : undefined}
        transition={{ duration: 1.1, ease: EASE, delay: 0.45 }}
      />
      {/* The "+" mark. */}
      <Part
        clip="inset(0 0 0 84%)"
        style={{ clipPath: 'inset(0 0 0 84%)', transformOrigin: '92% 45%' }}
        initial={{ opacity: 0, scale: 0.3, rotate: 90 }}
        animate={go === 'shown' ? { opacity: 1, scale: 1, rotate: 0 } : undefined}
        transition={{ type: 'spring', duration: 0.7, bounce: 0.45, delay: 1.35 }}
      />
    </div>
  );
};

export default LogoBuild;
