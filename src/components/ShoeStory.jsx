import React, { useCallback, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

// Frames rendered from the CloudWalk concept film: the sandal turns sole-up,
// opens into its three layers, closes again and turns to face the viewer.
const FRAME_COUNT = 192;
const frameSrc = (i) => `/assets/shoe-story/${String(i).padStart(3, '0')}.webp`;
const STATIC_FRAME = 70; // layers fully apart, used when motion is reduced

// Each chapter is shown for a slice of the section's scroll progress (0–1),
// timed to what the frames show at that point.
const CHAPTERS = [
  { range: [0, 0.12], kicker: 'Inside every pair', title: 'Engineered from the ground up.', text: 'Scroll to take a MediFeet sandal apart, layer by layer.' },
  { range: [0.12, 0.24], kicker: 'Anti-skid sole', title: 'Grip you can trust.', text: 'Deep tread and high rubber content hold firm on wet floors and busy streets.' },
  { range: [0.24, 0.44], kicker: 'Three layers', title: 'One comfort system.', text: 'An anatomic footbed, a cushioning core and an anti-skid outsole, each built for its job.' },
  { range: [0.44, 0.64], kicker: 'Anatomic design', title: 'Support from feet to spine.', text: 'The footbed follows the natural curve of your arch, keeping your stride balanced and your posture aligned.' },
  { range: [0.64, 0.78], kicker: 'Bounce-back', title: 'Every step, returned.', text: 'Cushioning made with BASF materials compresses under each step and springs back, so long days feel lighter.' },
  { range: [0.78, 1], kicker: 'MediFeet', title: 'Walk the comfort way.', text: 'Sandals, slippers, loafers and shoes for women and men, all built on the same comfort system.', cta: true },
];

// Where each layer sits in the frame while the sandal is open (fraction of height).
const LAYERS = [
  { label: 'Anatomic footbed', y: 0.36 },
  { label: 'Cushioning core', y: 0.57 },
  { label: 'Anti-skid outsole', y: 0.76 },
];

const FADE = 0.035;

const Chapter = ({ chapter, index, progress, onNavigate }) => {
  const [start, end] = chapter.range;
  const first = index === 0;
  const last = index === CHAPTERS.length - 1;
  const opacity = useTransform(
    progress,
    [start, start + FADE, end - FADE, end],
    [first ? 1 : 0, 1, 1, last ? 1 : 0],
  );
  const y = useTransform(progress, [start, start + FADE, end - FADE, end], [first ? 0 : 28, 0, 0, last ? 0 : -28]);
  const pointerEvents = useTransform(opacity, (o) => (o > 0.5 ? 'auto' : 'none'));

  return (
    <motion.div style={{ opacity, y, pointerEvents }} className="absolute inset-0 flex flex-col justify-center">
      <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-[#5C6B57] mb-4">{chapter.kicker}</p>
      <h2 className="font-['Outfit'] font-medium text-[34px] sm:text-5xl leading-[1.05] tracking-[-0.03em] text-[#1E3F20] [text-wrap:balance]">
        {chapter.title}
      </h2>
      <p className="mt-4 text-base sm:text-lg text-[#4A5D4E] leading-relaxed max-w-[34ch]">{chapter.text}</p>
      {chapter.cta && (
        <div className="mt-7 flex flex-wrap gap-3">
          <button onClick={() => onNavigate('shop')} className="bg-[#1E3F20] hover:bg-[#285424] text-white text-sm font-medium px-6 py-3 rounded-full inline-flex items-center gap-2 transition duration-150 active:scale-[0.97] cursor-pointer">
            Shop women
          </button>
          <button onClick={() => onNavigate('men')} className="text-[#1E3F20] text-sm font-medium px-2 py-3 inline-flex items-center gap-1.5 cursor-pointer">
            Shop men <ArrowRight size={15} />
          </button>
        </div>
      )}
    </motion.div>
  );
};

const LayerLabels = ({ progress }) => {
  const opacity = useTransform(progress, [0.26, 0.31, 0.6, 0.65], [0, 1, 1, 0]);
  const x = useTransform(progress, [0.26, 0.31], [-16, 0]);
  return (
    <motion.ul style={{ opacity, x }} className="absolute inset-0 pointer-events-none hidden lg:block" aria-hidden="true">
      {LAYERS.map((layer) => (
        <li key={layer.label} className="absolute left-full flex items-center gap-3 -translate-y-1/2" style={{ top: `${layer.y * 100}%` }}>
          <span className="w-14 h-px bg-[#1E3F20]/35" />
          <span className="text-sm text-[#1E3F20] whitespace-nowrap">{layer.label}</span>
        </li>
      ))}
    </motion.ul>
  );
};

// A thin vertical line that fills as the story progresses.
const ProgressDots = ({ progress }) => (
  <div className="absolute right-5 sm:right-8 top-1/2 -translate-y-1/2 h-32 w-px bg-[#1E3F20]/15" aria-hidden="true">
    <motion.div style={{ scaleY: progress }} className="w-full h-full bg-[#1E3F20] origin-top" />
  </div>
);

// Apple-style scroll story: a pinned canvas draws the frame that matches how far
// the visitor has scrolled through this tall section, while chapters fade in.
export const ShoeStory = ({ onNavigate }) => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const framesRef = useRef([]);
  const currentRef = useRef(0);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });

  const draw = useCallback((index) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // Use the requested frame, or the nearest earlier one that has loaded.
    let i = index;
    while (i > 0 && !framesRef.current[i]?.complete) i -= 1;
    const img = framesRef.current[i];
    if (!img?.complete || !img.naturalWidth) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  }, []);

  // Load the frames once the section is close to the viewport.
  useEffect(() => {
    if (reduceMotion) return undefined;
    const section = sectionRef.current;
    let started = false;
    const load = () => {
      if (started) return;
      started = true;
      for (let i = 0; i < FRAME_COUNT; i += 1) {
        const img = new Image();
        img.decoding = 'async';
        img.src = frameSrc(i);
        img.onload = () => {
          if (i === currentRef.current || i === 0) draw(currentRef.current);
        };
        framesRef.current[i] = img;
      }
    };
    const observer = new IntersectionObserver((entries) => entries[0].isIntersecting && load(), { rootMargin: '150% 0px' });
    observer.observe(section);
    return () => observer.disconnect();
  }, [draw, reduceMotion]);

  // Match the canvas resolution to its displayed size.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      draw(currentRef.current);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    return () => ro.disconnect();
  }, [draw, reduceMotion]);

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const index = Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(p * (FRAME_COUNT - 1))));
    if (index !== currentRef.current) {
      currentRef.current = index;
      requestAnimationFrame(() => draw(index));
    }
  });

  if (reduceMotion) {
    return (
      <section id="inside" className="bg-[#CDC9C3] py-20 px-5 sm:px-8">
        <div className="max-w-[1100px] mx-auto grid md:grid-cols-2 gap-10 items-center">
          <img src={frameSrc(STATIC_FRAME)} alt="A MediFeet sandal opened into its footbed, cushioning core and anti-skid outsole" className="w-full max-w-[420px] mx-auto rounded-3xl" />
          <div className="space-y-8">
            {CHAPTERS.map((c) => (
              <div key={c.kicker}>
                <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-[#5C6B57] mb-2">{c.kicker}</p>
                <h3 className="font-['Outfit'] font-medium text-2xl tracking-[-0.02em] text-[#1E3F20]">{c.title}</h3>
                <p className="text-[#4A5D4E] mt-1 leading-relaxed">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="inside" ref={sectionRef} className="relative h-[520vh] bg-[#CDC9C3]" aria-label="Inside a MediFeet sandal">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="h-full max-w-[1280px] mx-auto px-5 sm:px-8 grid grid-rows-[1fr_auto] lg:grid-rows-1 lg:grid-cols-[1fr_auto_1fr] items-center gap-4 lg:gap-10">
          {/* Chapters */}
          <div className="relative h-[230px] sm:h-[260px] lg:h-[340px] order-2 lg:order-1 mb-24 md:mb-8 lg:mb-0">
            {CHAPTERS.map((chapter, i) => (
              <Chapter key={chapter.kicker} chapter={chapter} index={i} progress={scrollYProgress} onNavigate={onNavigate} />
            ))}
          </div>

          {/* Frame canvas */}
          <div className="relative order-1 lg:order-2 h-full max-h-[calc(100vh-400px)] md:max-h-[calc(100vh-330px)] lg:max-h-[88vh] aspect-[540/832] mx-auto self-end lg:self-center">
            <canvas
              ref={canvasRef}
              role="img"
              aria-label="A MediFeet sandal turning, opening into its layers and closing again as you scroll"
              className="w-full h-full story-mask"
            />
            <LayerLabels progress={scrollYProgress} />
          </div>

          <div className="hidden lg:block order-3" />
        </div>
        <ProgressDots progress={scrollYProgress} />
      </div>
    </section>
  );
};

export default ShoeStory;
