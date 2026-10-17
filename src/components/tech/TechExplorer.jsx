import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import { TECHNOLOGIES as ITEMS, TECH_PHOTO } from '../../data/technology';
import { AutoVideo } from '../product/ProductStory';
import SectionHeading from '../landing/SectionHeading';

const EASE = [0.22, 1, 0.36, 1];
const EASE_OUT = [0.23, 1, 0.32, 1];
const STEP_MS = 6500;

// Desktop stage geometry, in % of the stage box (16:8.5). The sandal photo is
// 1124×584, so at 58% of the stage width it is 56.7% of the stage height.
const SHOE = { left: 2, top: 15, width: 58, height: 56.7 };
const CARD = { left: 68, mid: 41 };
const stageSpot = ({ x, y }) => ({ x: SHOE.left + x * SHOE.width, y: SHOE.top + y * SHOE.height });

const Hotspot = ({ index, active, onSelect, style }) => (
  <button
    onClick={() => onSelect(index)}
    onMouseEnter={() => onSelect(index, true)}
    aria-label={`${ITEMS[index].short}`}
    aria-pressed={active}
    style={style}
    className="absolute -translate-x-1/2 -translate-y-1/2 w-12 h-12 grid place-items-center cursor-pointer group z-10"
  >
    {!active && <span className="absolute inset-1.5 rounded-full bg-[#84BD3A]/50 hotspot-pulse" style={{ animationDelay: `${index * 0.35}s` }} />}
    <span
      className={`relative w-8 h-8 rounded-full grid place-items-center text-[12px] font-semibold tabular-nums shadow-[0_6px_18px_rgba(0,0,0,0.25)] transition-[transform,background-color,color] duration-200 ease-out group-active:scale-[0.92] ${
        active ? 'bg-white text-[#14301A] scale-[1.15]' : 'bg-[#84BD3A] text-[#14301A] group-hover:scale-[1.08]'
      }`}
    >
      {index + 1}
    </span>
  </button>
);

const Shoe = ({ className = '' }) => (
  <>
    <span aria-hidden="true" className="absolute left-[8%] right-[6%] -bottom-[6%] h-[16%] rounded-[50%] bg-black/40 blur-[18px]" />
    <img src={TECH_PHOTO} alt="A MediFeet sandal with its five comfort technologies marked" className={`relative w-full ${className}`} />
  </>
);

// "Comfort, decoded": the sandal under a soft light with five hotspots. On
// large screens the active hotspot draws a line to a card playing that
// technology's clip, and the five take turns until the visitor picks one.
// On phones the hotspots sit above a swipeable row of cards kept in sync.
export const TechExplorer = ({
  eyebrow = 'The MediFeet comfort system',
  title = 'Comfort, decoded.',
  text = 'Five technologies work together in every pair. Tap a point on the sandal to see what each one does.',
}) => {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const [stage, setStage] = useState({ w: 0, h: 0 });
  const railRef = useRef(null);
  const cardRefs = useRef([]);
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [paused, setPaused] = useState(false);
  const inView = useInView(sectionRef, { amount: 0.35 });
  const reduceMotion = useReducedMotion();
  const item = ITEMS[active];

  // Take turns on large screens until the visitor chooses one themselves.
  useEffect(() => {
    if (!auto || paused || !inView || reduceMotion || !window.matchMedia('(min-width: 1024px)').matches) return undefined;
    const t = setTimeout(() => setActive((i) => (i + 1) % ITEMS.length), STEP_MS);
    return () => clearTimeout(t);
  }, [active, auto, paused, inView, reduceMotion]);

  const select = useCallback((i, hover = false) => {
    setActive(i);
    if (!hover) setAuto(false);
    const rail = railRef.current;
    const card = cardRefs.current[i];
    if (!hover && rail && card && rail.offsetParent) {
      rail.scrollTo({ left: card.offsetLeft - rail.offsetLeft - 20, behavior: reduceMotion ? 'auto' : 'smooth' });
    }
  }, [reduceMotion]);

  // The connector is drawn in pixels so it stays a clean, solid line.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return undefined;
    const ro = new ResizeObserver(() => setStage({ w: el.clientWidth, h: el.clientHeight }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Phones: the card that fills the row becomes the active technology.
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number(e.target.dataset.index));
        });
      },
      { root: rail, threshold: 0.6 },
    );
    cardRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const from = stageSpot(item.spot);
  const elbowX = from.x + (CARD.left - from.x) * 0.55;
  const px = (v) => (v / 100) * stage.w;
  const py = (v) => (v / 100) * stage.h;

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#14301A] text-white py-24 sm:py-32 overflow-hidden"
      aria-label={title}
    >
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_30%_55%,rgba(132,189,58,0.20),transparent_70%)]" />
      <div className="relative max-w-[1320px] mx-auto px-5 sm:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="[&_h2]:text-white [&_p:first-child]:text-[#B9D98A]">
            <SectionHeading eyebrow={eyebrow} title={title} />
          </div>
          <p className="text-base sm:text-lg text-white/70 max-w-[38ch] leading-relaxed">{text}</p>
        </div>

        {/* Large screens: one stage with a connector line to the clip card. */}
        <div
          ref={stageRef}
          className="relative hidden lg:block aspect-[16/8.5] mt-10"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <motion.div
            className="absolute"
            style={{ left: `${SHOE.left}%`, top: `${SHOE.top}%`, width: `${SHOE.width}%` }}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1, ease: EASE }}
          >
            <Shoe className="drop-shadow-[0_30px_40px_rgba(0,0,0,0.35)]" />
          </motion.div>

          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox={`0 0 ${stage.w || 1} ${stage.h || 1}`} aria-hidden="true">
            <motion.path
              key={active}
              d={`M ${px(from.x)} ${py(from.y)} L ${px(elbowX)} ${py(CARD.mid)} L ${px(CARD.left)} ${py(CARD.mid)}`}
              fill="none"
              stroke="#84BD3A"
              strokeWidth="1.5"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: reduceMotion ? 0 : 0.6, ease: EASE_OUT }}
            />
          </svg>

          {ITEMS.map((t, i) => {
            const p = stageSpot(t.spot);
            return <Hotspot key={t.short} index={i} active={i === active} onSelect={select} style={{ left: `${p.x}%`, top: `${p.y}%` }} />;
          })}

          <div className="absolute top-[4%] w-[30%] aspect-[4/5]" style={{ left: `${CARD.left}%` }}>
            <div className="relative w-full h-full rounded-[28px] overflow-hidden bg-black/30 shadow-[0_30px_60px_rgba(0,0,0,0.35)]">
              <AnimatePresence initial={false}>
                <motion.div
                  key={active}
                  className="absolute inset-0"
                  initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, transition: { duration: 0.3 } }}
                  transition={{ duration: 0.7, ease: EASE }}
                >
                  <AutoVideo src={item.video} poster={item.poster} />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-x-5 top-5 flex gap-1.5" aria-hidden="true">
                {ITEMS.map((t, i) => (
                  <span key={t.short} className="h-[3px] flex-1 rounded-full bg-white/30 overflow-hidden">
                    {i < active && <span className="block h-full bg-white" />}
                    {i === active && (
                      <span
                        key={`${active}-${auto}`}
                        className="block h-full bg-white origin-left"
                        style={{
                          animation: auto && !reduceMotion ? `bar-fill ${STEP_MS}ms linear forwards` : 'none',
                          animationPlayState: paused || !inView ? 'paused' : 'running',
                          transform: auto && !reduceMotion ? undefined : 'none',
                        }}
                      />
                    )}
                  </span>
                ))}
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6 pt-24 bg-gradient-to-t from-black/75 via-black/35 to-transparent">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, transition: { duration: 0.15 } }}
                    transition={{ duration: 0.45, ease: EASE_OUT, delay: 0.15 }}
                  >
                    <p className="text-[11px] uppercase tracking-[0.24em] text-[#B9D98A]">{item.kicker}</p>
                    <h3 className="mt-2 font-['Outfit'] text-[26px] leading-tight tracking-[-0.02em]">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/80">{item.text}</p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Large screens: the five as a labelled row (also the keyboard route). */}
        <div className="hidden lg:grid grid-cols-5 gap-4 mt-2" role="tablist" aria-label="Technologies">
          {ITEMS.map((t, i) => (
            <button
              key={t.short}
              role="tab"
              aria-selected={i === active}
              onClick={() => select(i)}
              className={`text-left pt-4 border-t cursor-pointer transition-[color,border-color] duration-200 ${i === active ? 'border-[#84BD3A] text-white' : 'border-white/15 text-white/50 hover:text-white/80'}`}
            >
              <span className="block text-[11px] tabular-nums tracking-[0.2em]">0{i + 1}</span>
              <span className="block mt-1 font-['Outfit'] text-lg">{t.short}</span>
            </button>
          ))}
        </div>

        {/* Phones and tablets: hotspots on the sandal, cards below. */}
        <div className="lg:hidden mt-10">
          <div className="relative mx-auto max-w-[560px] px-2">
            <div className="relative">
              <Shoe className="drop-shadow-[0_20px_30px_rgba(0,0,0,0.35)]" />
              {ITEMS.map((t, i) => (
                <Hotspot key={t.short} index={i} active={i === active} onSelect={select} style={{ left: `${t.spot.x * 100}%`, top: `${t.spot.y * 100}%` }} />
              ))}
            </div>
          </div>
          <div
            ref={railRef}
            className="mt-12 -mx-5 sm:-mx-10 px-5 sm:px-10 flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {ITEMS.map((t, i) => (
              <article
                key={t.short}
                ref={(el) => (cardRefs.current[i] = el)}
                data-index={i}
                className={`snap-start shrink-0 w-[84%] sm:w-[60%] rounded-[24px] overflow-hidden flex bg-white/[0.06] border transition-[border-color] duration-200 ${i === active ? 'border-[#84BD3A]/70' : 'border-white/10'}`}
              >
                <div className="w-[42%] shrink-0 aspect-[4/5] bg-black/30">
                  <AutoVideo src={t.video} poster={t.poster} active={i === active} />
                </div>
                <div className="p-4 sm:p-6 flex flex-col justify-center">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-[#B9D98A]">{t.kicker}</p>
                  <h3 className="mt-2 font-['Outfit'] text-xl leading-tight">{t.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-white/75">{t.text}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-5 flex justify-center gap-2" aria-hidden="true">
            {ITEMS.map((t, i) => (
              <span key={t.short} className={`h-1.5 rounded-full transition-[width,background-color] duration-300 ease-out ${i === active ? 'w-6 bg-[#84BD3A]' : 'w-1.5 bg-white/30'}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechExplorer;
