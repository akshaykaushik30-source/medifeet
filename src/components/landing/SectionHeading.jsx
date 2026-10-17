import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

// Small-caps eyebrow over a large heading whose words rise into place,
// one after another, the first time the heading scrolls into view.
export const SectionHeading = ({ eyebrow, title, className = '', align = 'left' }) => {
  const reduceMotion = useReducedMotion();
  const words = title.split(' ');
  return (
    <div className={`${align === 'center' ? 'text-center' : ''} ${className}`}>
      {eyebrow && <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-[#667360] mb-4">{eyebrow}</p>}
      <h2 className="font-['Outfit'] font-medium text-[34px] sm:text-5xl lg:text-[56px] leading-[1.02] tracking-[-0.035em] text-[#1E3F20] [text-wrap:balance]" aria-label={title}>
        {words.map((w, i) => (
          <span key={i} className="inline-flex overflow-hidden pb-[0.08em] -mb-[0.08em] align-top" aria-hidden="true">
            <motion.span
              className="inline-block"
              initial={reduceMotion ? { opacity: 0 } : { y: '105%' }}
              whileInView={reduceMotion ? { opacity: 1 } : { y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.9, ease: EASE, delay: i * 0.05 }}
            >
              {w}
              {i < words.length - 1 && ' '}
            </motion.span>
          </span>
        ))}
      </h2>
    </div>
  );
};

export default SectionHeading;
