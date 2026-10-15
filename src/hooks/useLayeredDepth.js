import { useMotionValue, useSpring, useTransform, useScroll, useReducedMotion } from 'framer-motion';

// Motion values for a three-layer cover hero (word behind, figure in the middle,
// product in front). Each layer follows the pointer by a different amount and
// drifts at a different speed as the hero scrolls away.
export const useLayeredDepth = (sectionRef) => {
  const reduceMotion = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 60, damping: 20, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 60, damping: 20, mass: 0.6 });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });

  const layers = {
    word: { x: useTransform(sx, (v) => v * -24) },
    wordScroll: {
      y: useTransform(scrollYProgress, [0, 1], [0, -140]),
      scale: useTransform(scrollYProgress, [0, 1], [1, 1.12]),
      opacity: useTransform(scrollYProgress, [0, 0.8], [1, 0.15]),
    },
    figure: { x: useTransform(sx, (v) => v * 18), y: useTransform(sy, (v) => v * 10) },
    figureScroll: { y: useTransform(scrollYProgress, [0, 1], [0, 60]) },
    product: { x: useTransform(sx, (v) => v * 46), y: useTransform(sy, (v) => v * 30) },
    productScroll: { y: useTransform(scrollYProgress, [0, 1], [0, -220]) },
    // Rotation goes on the shoe alone so its label stays level.
    productRotate: useTransform([sx, scrollYProgress], ([x, p]) => x * 6 - p * 14),
  };

  const handlers = {
    onPointerMove: (e) => {
      if (reduceMotion || e.pointerType !== 'mouse' || !sectionRef.current) return;
      const r = sectionRef.current.getBoundingClientRect();
      px.set((e.clientX - r.left) / r.width - 0.5);
      py.set((e.clientY - r.top) / r.height - 0.5);
    },
    onPointerLeave: () => {
      px.set(0);
      py.set(0);
    },
  };

  // With reduced motion every layer stays still.
  const style = (key) => (reduceMotion ? {} : layers[key]);

  return { style, handlers, reduceMotion, productRotate: layers.productRotate };
};
