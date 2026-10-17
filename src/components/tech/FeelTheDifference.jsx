import React, { useEffect, useRef, useState } from 'react';
import { motion, animate, useInView, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { AutoVideo } from '../product/ProductStory';
import SectionHeading from '../landing/SectionHeading';

const EASE = [0.22, 1, 0.36, 1];

const Tile = ({ className = '', children, index = 0, dark = false }) => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.8, ease: EASE, delay: (index % 2) * 0.08 }}
    className={`relative rounded-[28px] overflow-hidden ${dark ? 'bg-[#14301A] text-white' : 'bg-white text-[#1E3F20]'} ${className}`}
  >
    {children}
  </motion.div>
);

const Copy = ({ kicker, title, text, dark = false, className = '' }) => (
  <div className={className}>
    <p className={`text-[11px] uppercase tracking-[0.24em] ${dark ? 'text-[#B9D98A]' : 'text-[#667360]'}`}>{kicker}</p>
    <h3 className="mt-2 font-['Outfit'] font-medium text-2xl sm:text-[30px] leading-[1.05] tracking-[-0.025em]">{title}</h3>
    <p className={`mt-2 text-sm sm:text-[15px] leading-relaxed max-w-[40ch] ${dark ? 'text-white/75' : 'text-[#4A5D4E]'}`}>{text}</p>
  </div>
);

// ---------------------------------------------------------------------------
// 1. Footbed: drag from a flat footbed to a contoured one. The pressure under
// the heel and ball eases off as the footbed rises to meet the arch.
// ---------------------------------------------------------------------------
const XS = [40, 100, 170, 240, 310, 380, 450, 520, 580];
const FLAT = 214;
const CONTOUR = [214, 213, 205, 190, 187, 197, 210, 213, 214];

// Smooth curve through points (Catmull-Rom converted to cubic Béziers).
const curve = (pts) => {
  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i += 1) {
    const p0 = pts[i - 1] || pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] || p2;
    d += ` C ${p1[0] + (p2[0] - p0[0]) / 6} ${p1[1] + (p2[1] - p0[1]) / 6}, ${p2[0] - (p3[0] - p1[0]) / 6} ${p2[1] - (p3[1] - p1[1]) / 6}, ${p2[0]} ${p2[1]}`;
  }
  return d;
};
const footbedTop = (t) => XS.map((x, i) => [x, FLAT + (CONTOUR[i] - FLAT) * t]);
const mix = (a, b, t) => Math.round(a + (b - a) * t);
const heat = (t) => `rgb(${mix(228, 132, t)}, ${mix(87, 189, t)}, ${mix(46, 58, t)})`;

const FOOT =
  'M 62 206 C 52 182 58 152 74 122 C 88 96 96 62 100 22 L 178 22 C 182 62 206 98 262 122 C 342 152 470 168 545 178 C 575 182 590 200 572 209 C 522 212 472 211 442 209 C 382 205 322 186 272 184 C 212 184 150 209 102 212 C 84 213 68 212 62 206 Z';

const FootbedDemo = () => {
  const ref = useRef(null);
  const svgRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const t = useMotionValue(0);
  const s = useSpring(t, { stiffness: 140, damping: 22 });
  const [value, setValue] = useState(0);
  const touched = useRef(false);

  useEffect(() => s.on('change', (v) => setValue(v)), [s]);

  // Show what it does once, the first time it scrolls into view.
  useEffect(() => {
    if (!inView || touched.current) return undefined;
    if (reduceMotion) {
      t.set(1);
      return undefined;
    }
    const controls = animate(t, [0, 0, 1], { duration: 2.2, times: [0, 0.35, 1], ease: EASE });
    return () => controls.stop();
  }, [inView, reduceMotion, t]);

  const setFromPointer = (e) => {
    const r = svgRef.current.getBoundingClientRect();
    touched.current = true;
    t.set(Math.min(1, Math.max(0, (e.clientX - r.left - r.width * 0.15) / (r.width * 0.7))));
  };

  const top = footbedTop(value);
  const topPath = curve(top);
  const arch = curve(top.slice(2, 7));
  const contoured = value > 0.5;

  return (
    <div ref={ref} className="p-6 sm:p-9 h-full flex flex-col">
      <Copy
        kicker="Anatomic footbed · Arch support"
        title="Drag to shape the footbed."
        text="On a flat footbed your weight lands on the heel and ball. A MediFeet footbed rises to meet the arch, so the load spreads along the whole foot."
      />
      <svg
        ref={svgRef}
        viewBox="20 0 590 270"
        className="mt-6 w-full lg:flex-1 min-h-[180px] touch-none cursor-ew-resize select-none"
        onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); setFromPointer(e); }}
        onPointerMove={(e) => e.buttons && setFromPointer(e)}
        role="img"
        aria-label={contoured ? 'Contoured footbed: pressure spread along the foot' : 'Flat footbed: pressure on heel and ball'}
      >
        <path d={FOOT} fill="#F4F6F2" stroke="#1E3F20" strokeWidth="1.5" />
        {/* Sole layers: footbed (follows the arch), foam, outsole. */}
        <path d={`${topPath} L 580 232 L 40 232 Z`} fill="#C08A5B" />
        <rect x="40" y="232" width="540" height="16" fill="#E8F3D6" />
        <rect x="40" y="248" width="540" height="12" rx="4" fill="#1E3F20" />
        {/* Pressure under the heel and ball, and along the arch once supported. */}
        <path d={arch} fill="none" stroke="#84BD3A" strokeWidth="7" strokeLinecap="round" opacity={Math.max(0, value * 1.2 - 0.2)} />
        {[110, 455].map((cx) => (
          <circle key={cx} cx={cx} cy={FLAT - 3} r={10 + (1 - value) * 12} fill={heat(value)} opacity={0.85 - value * 0.25} />
        ))}
      </svg>
      <div className="mt-4">
        <input
          type="range"
          min="0"
          max="100"
          value={Math.round(value * 100)}
          onChange={(e) => { touched.current = true; t.set(Number(e.target.value) / 100); }}
          aria-label="Footbed shape, from flat to contoured"
          className="w-full accent-[#1E3F20] cursor-pointer"
        />
        <div className="mt-2 flex justify-between text-xs">
          <span className={contoured ? 'text-[#667360]' : 'text-[#B5462A] font-medium'}>Flat: pressure on heel & ball</span>
          <span className={contoured ? 'text-[#2D5A30] font-medium' : 'text-[#667360]'}>MediFeet: pressure spread evenly</span>
        </div>
        <p className="mt-2 text-[11px] text-[#667360]">Illustration</p>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// 2. Bounce-back: press and hold to compress the cushioning; let go and it
// springs back.
// ---------------------------------------------------------------------------
const BounceDemo = () => {
  const [pressed, setPressed] = useState(false);
  const [steps, setSteps] = useState(0);
  const reduceMotion = useReducedMotion();

  const down = () => setPressed(true);
  const up = () => {
    if (pressed) setSteps((n) => n + 1);
    setPressed(false);
  };

  const release = reduceMotion ? { duration: 0.2 } : { type: 'spring', duration: 0.7, bounce: 0.5 };
  const press = reduceMotion ? { duration: 0.2 } : { type: 'spring', duration: 0.4, bounce: 0 };

  return (
    <div className="p-6 sm:p-9 h-full flex flex-col">
      <Copy kicker="Bounce-back cushioning" title="Press and hold." text="Cushioning compresses under each step and springs back, ready for the next one." />
      <button
        onPointerDown={down}
        onPointerUp={up}
        onPointerLeave={up}
        onPointerCancel={up}
        onKeyDown={(e) => (e.key === ' ' || e.key === 'Enter') && !e.repeat && (e.preventDefault(), down())}
        onKeyUp={(e) => (e.key === ' ' || e.key === 'Enter') && up()}
        onContextMenu={(e) => e.preventDefault()}
        aria-label="Press and hold to compress the cushioning"
        className="relative mt-6 flex-1 min-h-[220px] rounded-[22px] bg-[#F4F6F2] cursor-pointer select-none touch-none overflow-hidden"
      >
        {/* The heel pressing down. */}
        <motion.span
          aria-hidden="true"
          className="absolute left-[27%] w-[46%] top-[18%] h-[34%] rounded-t-[40px] rounded-b-[60px] bg-[#1E3F20]/90"
          animate={{ y: pressed ? '40%' : '0%' }}
          transition={pressed ? press : release}
        />
        {/* The cushioning: a foam block whose cells squash as it compresses. */}
        <motion.span
          aria-hidden="true"
          className="absolute left-[12%] right-[12%] bottom-[14%] h-[34%] rounded-[18px] origin-bottom"
          style={{
            backgroundColor: '#E8F3D6',
            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(30,63,32,0.22) 0 28%, transparent 30%)',
            backgroundSize: '22px 22px',
          }}
          animate={{ scaleY: pressed ? 0.6 : 1 }}
          transition={pressed ? press : release}
        />
        <span aria-hidden="true" className="absolute left-[10%] right-[10%] bottom-[10%] h-[4%] rounded-full bg-[#1E3F20]" />
        <span className="absolute left-0 right-0 bottom-3 text-center text-xs text-[#667360]" aria-live="polite">
          {pressed ? 'Compressing…' : steps ? `Bounced back · ${steps} ${steps === 1 ? 'step' : 'steps'}` : 'Press and hold'}
        </span>
      </button>
    </div>
  );
};

// ---------------------------------------------------------------------------
// 3. Anti-skid: a magnifier over the tread. Follows the pointer; on touch
// screens, tap to move it.
// ---------------------------------------------------------------------------
const LENS = 150;
const ZOOM = 1.7;

const GripLens = ({ poster }) => {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [size, setSize] = useState({ w: 0, h: 0 });
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 28 });
  const sy = useSpring(y, { stiffness: 220, damping: 28 });
  const lensX = useTransform(sx, (v) => v - LENS / 2);
  const lensY = useTransform(sy, (v) => v - LENS / 2);
  const imgX = useTransform(sx, (v) => -(v * ZOOM - LENS / 2));
  const imgY = useTransform(sy, (v) => -(v * ZOOM - LENS / 2));
  const moved = useRef(false);

  useEffect(() => {
    const el = ref.current;
    const ro = new ResizeObserver(() => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      setSize({ w, h });
      if (!moved.current) {
        x.set(w * 0.25);
        y.set(h * 0.55);
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [x, y]);

  // One slow sweep across the tread when it first comes into view.
  useEffect(() => {
    if (!inView || reduceMotion || !size.w) return undefined;
    const c = animate(x, [size.w * 0.25, size.w * 0.72], { duration: 1.8, ease: EASE, delay: 0.3 });
    return () => c.stop();
  }, [inView, reduceMotion, size.w, x]);

  const place = (e) => {
    const r = ref.current.getBoundingClientRect();
    moved.current = true;
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
  };

  return (
    <div
      ref={ref}
      className="absolute inset-0 cursor-none"
      onPointerMove={(e) => e.pointerType === 'mouse' && place(e)}
      onPointerDown={place}
    >
      <img src={poster} alt="" className="absolute inset-0 w-full h-full object-cover blur-[5px] brightness-[0.45] scale-105" />
      <motion.div
        aria-hidden="true"
        className="absolute rounded-full overflow-hidden border border-white/50 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        style={{ width: LENS, height: LENS, x: lensX, y: lensY }}
      >
        <motion.img
          src={poster}
          alt=""
          className="absolute max-w-none object-cover"
          style={{ width: size.w * ZOOM, height: size.h * ZOOM, x: imgX, y: imgY }}
        />
      </motion.div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// The section.
// ---------------------------------------------------------------------------
export const FeelTheDifference = ({
  eyebrow = 'Feel the difference',
  title = 'Comfort you can try from here.',
  text = 'Drag, press and explore how each part of a MediFeet pair works for you.',
  className = 'bg-[#F4F6F2]',
}) => (
  <section className={`py-24 sm:py-32 ${className}`} aria-label={eyebrow}>
    <div className="max-w-[1320px] mx-auto px-5 sm:px-10">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-14">
        <SectionHeading eyebrow={eyebrow} title={title} />
        <p className="text-base sm:text-lg text-[#4A5D4E] max-w-[38ch] leading-relaxed">{text}</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-4 sm:gap-5">
        <Tile className="lg:col-span-7 lg:min-h-[520px]" index={0}>
          <FootbedDemo />
        </Tile>
        <Tile className="lg:col-span-5 lg:min-h-[480px]" index={1}>
          <BounceDemo />
        </Tile>
        <Tile className="lg:col-span-5 min-h-[440px]" index={2} dark>
          <GripLens poster="/assets/posters/video-tech-anti-skid.webp" />
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-9 pt-24 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none">
            <Copy dark kicker="Anti-skid sole" title="Inspect the grip." text="A deep, textured tread built for traction on everyday surfaces. Move the lens, or tap on a phone." />
          </div>
        </Tile>
        <Tile className="lg:col-span-7 min-h-[440px]" index={3} dark>
          <AutoVideo src="/assets/video-tech-foam.mp4" poster="/assets/posters/video-tech-foam.webp" className="absolute inset-0" />
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-9 pt-24 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
            <Copy dark kicker="MediFeet™ foam" title="Light, and built to absorb." text="Lightweight, shock-absorbing foam adds cushioning beneath the footbed and supports comfortable movement all day." />
            <div className="mt-4 flex flex-wrap gap-2">
              {['Lightweight', 'Shock-absorbing', 'Cushioned'].map((chip, i) => (
                <motion.span
                  key={chip}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.3 + i * 0.08 }}
                  className="text-xs px-3 py-1.5 rounded-full bg-white/15 backdrop-blur text-white"
                >
                  {chip}
                </motion.span>
              ))}
            </div>
          </div>
        </Tile>
      </div>
    </div>
  </section>
);

export default FeelTheDifference;
