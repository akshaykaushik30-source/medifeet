import { useEffect, useState } from 'react';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

// Cycles an index through `count` items every `intervalMs`, unless paused or
// the visitor prefers reduced motion. Choosing an item restarts the timer.
export const useRotation = (count, intervalMs = 6000) => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || count < 2 || prefersReducedMotion()) return undefined;
    const timer = setTimeout(() => setIndex((i) => (i + 1) % count), intervalMs);
    return () => clearTimeout(timer);
  }, [index, paused, count, intervalMs]);

  return { index, setIndex, setPaused };
};
