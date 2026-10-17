import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent, useReducedMotion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';

// Frames from the CloudWalk concept film (720×1109): the sandal turns
// sole-up, opens into its three layers, closes again and turns to face you.
const FRAME_COUNT = 192;
const frameSrc = (i) => `/assets/shoe-story/${String(i).padStart(3, '0')}.webp`;
const STATIC_FRAME = 70; // layers fully apart, used when motion is reduced

// Each chapter covers a slice of the section's scroll progress (0–1), timed
// to what the frames show at that point.
const CHAPTERS = [
  { at: 0, step: 'Sole', kicker: 'Inside every pair', title: 'Engineered from the ground up.', text: 'Scroll to take a MediFeet sandal apart, layer by layer.' },
  { at: 0.12, step: 'Grip', kicker: 'Anti-skid sole', title: 'Grip you can trust.', text: 'Deep tread and high rubber content hold firm on wet floors and busy streets.' },
  { at: 0.24, step: 'Layers', kicker: 'Three layers', title: 'One comfort system.', text: 'An anatomic footbed, a cushioning core and an anti-skid outsole, each built for its job.' },
  { at: 0.44, step: 'Footbed', kicker: 'Anatomic design', title: 'Support from feet to spine.', text: 'The footbed follows the natural curve of your arch, keeping your stride balanced and your posture aligned.' },
  { at: 0.64, step: 'Bounce-back', kicker: 'Bounce-back', title: 'Every step, returned.', text: 'Cushioning made with BASF materials compresses under each step and springs back, so long days feel lighter.' },
  { at: 0.8, step: 'Shop', kicker: 'MediFeet', title: 'Walk the comfort way.', text: 'Sandals, slippers, loafers and shoes for women and men, all built on the same comfort system.', cta: true },
];
const chapterAt = (p) => CHAPTERS.reduce((found, c, i) => (p >= c.at ? i : found), 0);

// Where each layer sits in the frame while the sandal is open (fraction of height).
const LAYERS = [
  { label: 'Anatomic footbed', y: 0.36 },
  { label: 'Cushioning core', y: 0.57 },
  { label: 'Anti-skid outsole', y: 0.76 },
];

const EASE_OUT = [0.23, 1, 0.32, 1];

const LayerLabels = ({ progress }) => {
  const opacity = useTransform(progress, [0.26, 0.31, 0.6, 0.65], [0, 1, 1, 0]);
  const x = useTransform(progress, [0.26, 0.31], [-16, 0]);
  return (
    <motion.ul style={{ opacity }} className="absolute inset-0 pointer-events-none" aria-hidden="true">
      {LAYERS.map((layer, i) => (
        <motion.li key={layer.label} style={{ top: `${layer.y * 100}%`, x }} className="absolute right-[4%] lg:right-auto lg:left-full flex items-center gap-2 lg:gap-3 -translate-y-1/2">
          <span className="hidden lg:block w-14 h-px bg-[#1E3F20]/40" />
          <span className="flex items-center gap-1.5 text-[11px] lg:text-sm text-[#1E3F20] whitespace-nowrap bg-white/80 lg:bg-transparent backdrop-blur lg:backdrop-blur-0 px-2 py-1 lg:p-0 rounded-full">
            <span className="w-4 h-4 rounded-full bg-[#1E3F20] text-white text-[9px] grid place-items-center lg:hidden">{String.fromCharCode(65 + i)}</span>
            {layer.label}
          </span>
        </motion.li>
      ))}
    </motion.ul>
  );
};

// Apple-style scroll story: a pinned canvas plays the film as you scroll,
// with one clearly readable chapter at a time and a step guide showing where
// you are. The drawn frame eases toward the scroll position, so playback
// stays smooth even when touch scrolling moves in jumps.
export const ShoeStory = ({ onNavigate }) => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const framesRef = useRef([]);
  const targetRef = useRef(0);
  const shownRef = useRef(-1);
  const posRef = useRef(0);
  const runningRef = useRef(false);
  const reduceMotion = useReducedMotion();
  const [chapter, setChapter] = useState(0);
  const [started, setStarted] = useState(false);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });

  const draw = useCallback((index) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // Use the requested frame, or the nearest earlier one that has loaded.
    let i = index;
    while (i > 0 && !framesRef.current[i]?.ready) i -= 1;
    const img = framesRef.current[i];
    if (!img?.ready || i === shownRef.current) return;
    shownRef.current = i;
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingQuality = 'high';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  }, []);

  // Ease the shown frame toward the target, one animation frame at a time.
  const tick = useCallback(() => {
    const diff = targetRef.current - posRef.current;
    posRef.current = Math.abs(diff) < 0.4 ? targetRef.current : posRef.current + diff * 0.28;
    draw(Math.round(posRef.current));
    if (posRef.current !== targetRef.current) requestAnimationFrame(tick);
    else runningRef.current = false;
  }, [draw]);

  const seek = useCallback((index) => {
    targetRef.current = index;
    if (!runningRef.current) {
      runningRef.current = true;
      requestAnimationFrame(tick);
    }
  }, [tick]);

  // Load and decode the frames once the section is close to the viewport.
  useEffect(() => {
    if (reduceMotion) return undefined;
    const section = sectionRef.current;
    let started = false;
    const load = () => {
      if (started) return;
      started = true;
      for (let i = 0; i < FRAME_COUNT; i += 1) {
        const img = new Image();
        img.src = frameSrc(i);
        framesRef.current[i] = img;
        img.decode().then(() => {
          img.ready = true;
          if (i === 0 || i === targetRef.current) {
            shownRef.current = -1;
            draw(Math.round(posRef.current));
          }
        }).catch(() => {});
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
      shownRef.current = -1;
      draw(Math.round(posRef.current));
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    return () => ro.disconnect();
  }, [draw, reduceMotion]);

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    seek(Math.min(FRAME_COUNT - 1, Math.max(0, p * (FRAME_COUNT - 1))));
    const c = chapterAt(p);
    if (c !== chapter) setChapter(c);
    if (!started && p > 0.02) setStarted(true);
  });

  const progressLine = useTransform(scrollYProgress, [0, 1], [0, 1]);

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

  const c = CHAPTERS[chapter];

  return (
    <section id="inside" ref={sectionRef} className="relative h-[420vh] lg:h-[520vh] bg-[#CDC9C3]" aria-label="Inside a MediFeet sandal">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* Phones: a segmented progress bar with the current step's name. */}
        <div className="lg:hidden absolute inset-x-5 top-[76px] z-10">
          <div className="flex gap-1">
            {CHAPTERS.map((ch, i) => (
              <span key={ch.step} className="h-[3px] flex-1 rounded-full bg-[#1E3F20]/15 overflow-hidden">
                <span className={`block h-full bg-[#1E3F20] origin-left transition-transform duration-300 ease-out ${i <= chapter ? 'scale-x-100' : 'scale-x-0'}`} />
              </span>
            ))}
          </div>
          <p className="mt-2 text-[11px] uppercase tracking-[0.22em] text-[#1E3F20]/70 tabular-nums">
            {String(chapter + 1).padStart(2, '0')} / {String(CHAPTERS.length).padStart(2, '0')} · {c.step}
          </p>
        </div>

        <div className="h-full max-w-[1280px] mx-auto px-5 sm:px-8 grid grid-rows-[1fr_auto] lg:grid-rows-1 lg:grid-cols-[1fr_auto_1fr] items-center gap-4 lg:gap-10 pt-[110px] lg:pt-0">
          {/* Chapter text: one at a time, fully readable. */}
          <div className="relative min-h-[210px] sm:min-h-[230px] lg:min-h-[320px] order-2 lg:order-1 mb-20 md:mb-8 lg:mb-0" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={chapter}
                initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -12, filter: 'blur(4px)', transition: { duration: 0.18 } }}
                transition={{ duration: 0.45, ease: EASE_OUT }}
                className="lg:absolute lg:inset-0 flex flex-col justify-center"
              >
                <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-[#3F5B3A] mb-3 lg:mb-4">{c.kicker}</p>
                <h2 className="font-['Outfit'] font-medium text-[30px] sm:text-5xl leading-[1.05] tracking-[-0.03em] text-[#1E3F20] [text-wrap:balance]">{c.title}</h2>
                <p className="mt-3 lg:mt-4 text-[15px] sm:text-lg text-[#33432F] leading-relaxed max-w-[34ch]">{c.text}</p>
                {c.cta && (
                  <div className="mt-6 flex flex-wrap gap-3">
                    <button onClick={() => onNavigate('shop')} className="bg-[#1E3F20] hover:bg-[#285424] text-white text-sm font-medium px-6 py-3 rounded-full inline-flex items-center gap-2 transition-[background-color,transform] duration-150 active:scale-[0.97] cursor-pointer">
                      Shop women
                    </button>
                    <button onClick={() => onNavigate('men')} className="text-[#1E3F20] text-sm font-medium px-2 py-3 inline-flex items-center gap-1.5 cursor-pointer">
                      Shop men <ArrowRight size={15} />
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* The film. */}
          <div className="relative order-1 lg:order-2 h-full max-h-[calc(100svh-400px)] md:max-h-[calc(100svh-340px)] lg:max-h-[88vh] aspect-[720/1109] mx-auto self-end lg:self-center">
            <canvas
              ref={canvasRef}
              role="img"
              aria-label="A MediFeet sandal turning, opening into its layers and closing again as you scroll"
              className="w-full h-full story-mask"
            />
            <LayerLabels progress={scrollYProgress} />
          </div>

          {/* Large screens: the steps, with the current one highlighted. */}
          <ol className="hidden lg:flex order-3 flex-col gap-1 justify-self-end relative pl-6" aria-label="Steps">
            <span className="absolute left-0 top-2 bottom-2 w-px bg-[#1E3F20]/15" aria-hidden="true">
              <motion.span style={{ scaleY: progressLine }} className="absolute inset-0 bg-[#1E3F20] origin-top" />
            </span>
            {CHAPTERS.map((ch, i) => (
              <li key={ch.step} className={`flex items-baseline gap-3 py-1.5 transition-colors duration-300 ${i === chapter ? 'text-[#1E3F20]' : 'text-[#1E3F20]/35'}`}>
                <span className="text-[11px] tabular-nums tracking-[0.15em]">{String(i + 1).padStart(2, '0')}</span>
                <span className={`font-['Outfit'] transition-[font-size] duration-300 ${i === chapter ? 'text-xl' : 'text-base'}`}>{ch.step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* A scroll cue until the story starts. */}
        <AnimatePresence>
          {!started && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="hidden lg:flex absolute left-1/2 -translate-x-1/2 bottom-8 flex-col items-center gap-1 text-[#1E3F20]/70 text-[11px] uppercase tracking-[0.24em] pointer-events-none"
            >
              Scroll
              <motion.span animate={{ y: [0, 5, 0] }} transition={{ duration: 1.4, repeat: 3, ease: 'easeInOut' }}>
                <ChevronDown size={16} />
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ShoeStory;
