import { useEffect } from 'react';
import Lenis from 'lenis';

let lenis = null;

// Inertial smooth scrolling for the whole site (skipped when the visitor
// prefers reduced motion). Scroll-linked animations keep working because
// Lenis still moves the native scroll position.
export const useSmoothScroll = () => {
  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;
    lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9 });
    let frame;
    const raf = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenis = null;
    };
  }, []);
};

// Jump to the top of the page, through Lenis when it is running.
export const scrollToTop = () => {
  if (lenis) lenis.scrollTo(0, { immediate: true });
  else window.scrollTo(0, 0);
};
