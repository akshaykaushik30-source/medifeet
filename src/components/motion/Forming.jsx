import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

const BUILD = [0.77, 0, 0.175, 1];

// "Shoe forming": the first time it scrolls into view, a faint blueprint of
// the image appears on a grid, then a lime scan line rises from the sole and
// the finished image builds up behind it. `ghost` is the image used for the
// blueprint (usually the same photo); children are the finished content.
// `tint` is the tile colour behind the image: both layers carry it so photos
// that rely on mix-blend-multiply still lose their white backgrounds.
export const Forming = ({ ghost, ghostClassName = 'inset-0 w-full h-full object-contain p-6', tint, children, delay = 0, className = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -12% 0px' });
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return <div className={`absolute inset-0 ${className}`}>{children}</div>;

  return (
    <div ref={ref} className={`absolute inset-0 ${className}`}>
      {/* Blueprint: a grid and a pale, desaturated outline of the shoe. */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ background: tint }}
        variants={{
          idle: { opacity: 0 },
          build: { opacity: [0, 1, 1, 0], transition: { duration: 2.3, times: [0, 0.18, 0.72, 1], delay, ease: 'easeOut' } },
        }}
        initial="idle"
        animate={inView ? 'build' : 'idle'}
      >
        <div className="absolute inset-0 bg-[linear-gradient(rgba(30,63,32,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(30,63,32,0.07)_1px,transparent_1px)] bg-[size:22px_22px]" />
        {ghost && (
          <img src={ghost} alt="" onError={(e) => { e.currentTarget.style.visibility = 'hidden'; }} className={`absolute ${ghostClassName} grayscale contrast-[0.85] brightness-[1.1] opacity-50 mix-blend-multiply`} />
        )}
      </motion.div>

      {/* The finished image, built from the bottom up. */}
      <motion.div
        className="absolute inset-0"
        style={{ background: tint }}
        variants={{
          idle: { clipPath: 'inset(100% 0% 0% 0%)' },
          build: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 1.3, ease: BUILD, delay: delay + 0.4 } },
        }}
        initial="idle"
        animate={inView ? 'build' : 'idle'}
      >
        {children}
      </motion.div>

      {/* The scan line riding the build edge. */}
      <motion.span
        aria-hidden="true"
        className="absolute left-[5%] right-[5%] h-[2px] rounded-full bg-[#84BD3A] shadow-[0_0_16px_4px_rgba(132,189,58,0.55)] pointer-events-none"
        variants={{
          idle: { top: '100%', opacity: 0 },
          build: {
            top: ['100%', '100%', '4%', '0%'],
            opacity: [0, 1, 1, 0],
            transition: { duration: 1.8, times: [0, 0.22, 0.92, 1], ease: 'easeInOut', delay },
          },
        }}
        initial="idle"
        animate={inView ? 'build' : 'idle'}
      />
    </div>
  );
};

export default Forming;
