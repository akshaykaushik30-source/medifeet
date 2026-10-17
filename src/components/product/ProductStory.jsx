import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Check, Minus, Plus, Star, ArrowRight, BadgeCheck } from 'lucide-react';
import SectionHeading from '../landing/SectionHeading';
import { SUPPORT_EMAIL, SUPPORT_PHONE, supportLink } from '../../config';

const EASE = [0.22, 1, 0.36, 1];
const EASE_OUT = [0.23, 1, 0.32, 1];

// ---------------------------------------------------------------------------
// A muted, looping clip that plays only while it is on screen (and `active`).
// No controls or overlays; with reduced motion it stays on its poster frame.
// The clips are 9:16, so a 4:5 frame crops away their top and bottom edges.
// ---------------------------------------------------------------------------
export const AutoVideo = ({ src, poster, active = true, className = '' }) => {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (inView && active && !reduceMotion) v.play().catch(() => {});
    else v.pause();
  }, [inView, active, reduceMotion]);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      className={`w-full h-full object-cover ${className}`}
    />
  );
};

const Intro = ({ eyebrow, title, text, className = '', light = false }) => (
  <div className={className}>
    <SectionHeading eyebrow={eyebrow} title={title} />
    {text && <p className={`mt-5 text-base sm:text-lg leading-relaxed max-w-[46ch] ${light ? 'text-white/75' : 'text-[#4A5D4E]'}`}>{text}</p>}
  </div>
);

// ---------------------------------------------------------------------------
// Sole layers: the sandal opened into its three layers, with labelled leader
// lines that draw in when the diagram scrolls into view.
// ---------------------------------------------------------------------------
export const SoleLayers = ({ data }) => (
  <section className="bg-[#CDC9C3] py-24 sm:py-32 overflow-hidden" aria-label={data.title}>
    <div className="max-w-[1280px] mx-auto px-5 sm:px-10 grid lg:grid-cols-[1fr_auto_1fr] gap-12 lg:gap-10 items-center">
      <Intro eyebrow={data.eyebrow} title={data.title} />

      <div className="relative mx-auto w-full max-w-[340px] lg:w-[min(36vw,420px)] lg:max-w-none">
        <img src={data.image} alt="A MediFeet sandal opened into its anatomic footbed, MediFeet foam and anti-skid outsole" className="w-full story-mask" loading="lazy" />
        <ul className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {data.items.map((item, i) => (
            <li key={item.letter} className="absolute left-[58%] flex items-center -translate-y-1/2" style={{ top: `${item.y * 100}%` }}>
              <motion.span
                className="block h-px w-[min(26vw,200px)] sm:w-[160px] lg:w-[min(16vw,220px)] bg-[#1E3F20]/60 origin-left"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.2 + i * 0.15 }}
              />
              <motion.span
                className="w-8 h-8 rounded-full bg-[#1E3F20] text-white text-sm font-medium flex items-center justify-center shrink-0"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.4, ease: EASE_OUT, delay: 0.75 + i * 0.15 }}
              >
                {item.letter}
              </motion.span>
            </li>
          ))}
        </ul>
      </div>

      <ol className="space-y-7 lg:pl-16">
        {data.items.map((item, i) => (
          <motion.li
            key={item.letter}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.3 + i * 0.12 }}
            className="flex gap-4"
          >
            <span className="w-8 h-8 rounded-full border border-[#1E3F20]/30 text-[#1E3F20] text-sm font-medium flex items-center justify-center shrink-0">{item.letter}</span>
            <span>
              <span className="block font-['Outfit'] text-xl text-[#1E3F20]">{item.title}</span>
              <span className="block mt-1 text-[15px] leading-relaxed text-[#3D4A3F] max-w-[32ch]">{item.text}</span>
            </span>
          </motion.li>
        ))}
      </ol>
    </div>
  </section>
);

// ---------------------------------------------------------------------------
// The comfort difference: MediFeet's column sits on a green band.
// ---------------------------------------------------------------------------
export const Comparison = ({ data }) => (
  <section className="bg-[#F4F6F2] py-24 sm:py-32" aria-label={data.eyebrow}>
    <div className="max-w-[1100px] mx-auto px-5 sm:px-10">
      <Intro eyebrow={data.eyebrow} title={data.title} text={data.text} />

      <div className="mt-12 sm:mt-16" role="table" aria-label={data.title}>
        <div role="row" className="grid grid-cols-[1.1fr_1fr_1fr] sm:grid-cols-[1.4fr_1fr_1fr] text-[11px] uppercase tracking-[0.22em] text-[#667360]">
          <span role="columnheader" className="py-4 pr-3">Feature</span>
          <span role="columnheader" className="py-4 px-3 sm:px-6 bg-[#1E3F20] rounded-t-[20px] flex items-center">
            <img src="/assets/medifeet-logo-reversed.png" alt="Medifeet" className="h-6 sm:h-7 w-auto" />
          </span>
          <span role="columnheader" className="py-4 px-3 sm:px-6 flex items-center">Regular footwear</span>
        </div>
        {data.rows.map(([feature, ours, theirs], i) => (
          <motion.div
            role="row"
            key={feature}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, ease: EASE, delay: i * 0.06 }}
            className="grid grid-cols-[1.1fr_1fr_1fr] sm:grid-cols-[1.4fr_1fr_1fr] items-stretch"
          >
            <span role="rowheader" className="py-5 pr-3 border-t border-[#1E3F20]/10 font-['Outfit'] text-[15px] sm:text-lg text-[#1E3F20]">{feature}</span>
            <span role="cell" className={`py-5 px-3 sm:px-6 bg-[#1E3F20] text-white flex items-center gap-2.5 border-t border-white/10 ${i === data.rows.length - 1 ? 'rounded-b-[20px]' : ''}`}>
              <span className="w-5 h-5 rounded-full bg-[#84BD3A] text-[#1E3F20] flex items-center justify-center shrink-0"><Check size={12} strokeWidth={3} /></span>
              <span className="text-sm sm:text-base font-medium">{ours}</span>
            </span>
            <span role="cell" className="py-5 px-3 sm:px-6 border-t border-[#1E3F20]/10 flex items-center gap-2.5 text-sm sm:text-base text-[#667360]">
              <Minus size={14} className="shrink-0 opacity-60" />
              {theirs}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// ---------------------------------------------------------------------------
// See it in motion: two clips that play while on screen.
// ---------------------------------------------------------------------------
export const MotionFilms = ({ data }) => (
  <section className="bg-white py-24 sm:py-32" aria-label={data.eyebrow}>
    <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
      <Intro eyebrow={data.eyebrow} title={data.title} text={data.text} />
      <div className="mt-12 sm:mt-16 grid sm:grid-cols-2 gap-5 sm:gap-6">
        {data.items.map((item, i) => (
          <motion.figure
            key={item.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: EASE, delay: i * 0.1 }}
            className={`relative aspect-[4/5] rounded-[28px] overflow-hidden bg-[#E9EEE4] ${i === 1 ? 'sm:mt-16' : ''}`}
          >
            <AutoVideo src={item.video} poster={item.poster} />
            <figcaption className="absolute inset-x-0 bottom-0 p-6 sm:p-8 bg-gradient-to-t from-black/55 via-black/15 to-transparent text-white">
              <span className="block font-['Outfit'] text-2xl sm:text-3xl tracking-[-0.02em]">{item.title}</span>
              <span className="block mt-1 text-sm sm:text-base text-white/80">{item.text}</span>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </div>
  </section>
);

// ---------------------------------------------------------------------------
// Customer reviews.
// ---------------------------------------------------------------------------
const Stars = ({ value, size = 14 }) => (
  <span className="inline-flex gap-0.5 text-[#1E3F20]" aria-label={`${value} out of 5 stars`}>
    {Array.from({ length: 5 }, (_, i) => (
      <Star key={i} size={size} className={i < Math.round(value) ? 'fill-current' : 'opacity-25'} />
    ))}
  </span>
);

export const Reviews = ({ data }) => (
  <section id="reviews" className="bg-[#F4F6F2] py-24 sm:py-32 scroll-mt-[90px]" aria-label={data.eyebrow}>
    <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <Intro eyebrow={data.eyebrow} title={data.title} />
        <div className="flex items-center gap-5">
          <span className="font-['Outfit'] text-6xl tracking-[-0.04em] text-[#1E3F20] tabular-nums">{data.rating}</span>
          <span>
            <Stars value={data.rating} size={18} />
            <span className="block mt-1 text-sm text-[#667360]">{data.rating} stars from {data.count} reviews</span>
          </span>
        </div>
      </div>
      {data.sample && (
        <p className="mt-6 inline-block text-xs text-[#8A5A00] bg-[#FFF4D6] px-3 py-1.5 rounded-full">Sample reviews: replace with real customer reviews before launch.</p>
      )}
      <div className="mt-10 grid md:grid-cols-2 gap-5">
        {data.items.map((r, i) => (
          <motion.figure
            key={r.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, ease: EASE, delay: i * 0.08 }}
            className="bg-white rounded-[24px] p-7 sm:p-9 flex flex-col"
          >
            <Stars value={r.stars} />
            <blockquote className="mt-5 flex-1">
              <p className="font-['Outfit'] text-2xl tracking-[-0.02em] text-[#1E3F20]">{r.title}</p>
              <p className="mt-3 text-base leading-relaxed text-[#4A5D4E]">{r.text}</p>
            </blockquote>
            <figcaption className="mt-8 pt-5 border-t border-[#1E3F20]/10 flex items-center justify-between text-sm">
              <span className="font-medium uppercase tracking-[0.16em] text-[#1E3F20]">{r.name}</span>
              {r.verified && (
                <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-[#3F7A2A]">
                  <BadgeCheck size={14} /> Verified buyer
                </span>
              )}
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </div>
  </section>
);

// ---------------------------------------------------------------------------
// Good to know: short answers with a follow-up action where one helps.
// ---------------------------------------------------------------------------
export const Guidance = ({ data, actions = {} }) => {
  const [open, setOpen] = useState(0);
  const reduceMotion = useReducedMotion();
  return (
    <section className="bg-white py-24 sm:py-32" aria-label={data.eyebrow}>
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10 grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-24">
        <Intro eyebrow={data.eyebrow} title={data.title} />
        <div className="border-t border-[#1E3F20]/10">
          {data.items.map((item, i) => {
            const isOpen = open === i;
            const action = item.action && actions[item.action];
            return (
              <div key={item.q} className="border-b border-[#1E3F20]/10">
                <h3>
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className="w-full grid grid-cols-[88px_1fr_auto] sm:grid-cols-[120px_1fr_auto] items-center gap-4 py-6 text-left cursor-pointer group"
                  >
                    <span className="text-[11px] uppercase tracking-[0.22em] text-[#667360]">{item.label}</span>
                    <span className="font-['Outfit'] text-lg sm:text-xl tracking-[-0.01em] text-[#1E3F20]">{item.q}</span>
                    <span className={`w-9 h-9 rounded-full border flex items-center justify-center transition-[transform,background-color,color,border-color] duration-200 ease-out ${isOpen ? 'rotate-45 bg-[#1E3F20] text-white border-[#1E3F20]' : 'border-[#1E3F20]/15 text-[#1E3F20] group-hover:border-[#1E3F20]'}`}>
                      <Plus size={16} />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0, transition: { duration: reduceMotion ? 0 : 0.18 } }}
                      transition={{ duration: reduceMotion ? 0 : 0.28, ease: EASE_OUT }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6 sm:pl-[136px] pl-0 pr-12">
                        <p className="text-[15px] sm:text-base leading-relaxed text-[#4A5D4E] max-w-[56ch]">{item.a}</p>
                        {action && (
                          <button onClick={action.onClick} className="group mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#1E3F20] border-b border-[#1E3F20]/30 hover:border-[#1E3F20] pb-0.5 cursor-pointer transition-colors duration-150">
                            {action.label} <ArrowRight size={14} className="transition-transform duration-200 ease-out group-hover:translate-x-1" />
                          </button>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ---------------------------------------------------------------------------
// Here for your next step: contact support (WhatsApp once a number is set).
// ---------------------------------------------------------------------------
export const SupportBand = ({ data }) => (
  <section className="bg-white px-5 sm:px-10 pb-24 sm:pb-32">
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease: EASE }}
      className="max-w-[1280px] mx-auto rounded-[32px] bg-[#1E3F20] text-white px-7 sm:px-14 py-14 sm:py-20 flex flex-col lg:flex-row lg:items-end justify-between gap-10 overflow-hidden relative"
    >
      <div className="relative">
        <h2 className="font-['Outfit'] font-medium text-4xl sm:text-6xl leading-[1] tracking-[-0.035em] uppercase">{data.title}</h2>
        <p className="mt-6 text-lg text-white/75 max-w-[42ch] leading-relaxed">{data.text}</p>
      </div>
      <div className="relative shrink-0">
        <a
          href={supportLink()}
          target={SUPPORT_PHONE ? '_blank' : undefined}
          rel={SUPPORT_PHONE ? 'noreferrer' : undefined}
          className="group inline-flex items-center gap-3 bg-[#84BD3A] hover:bg-[#96CC4C] text-[#14301A] font-medium uppercase tracking-[0.14em] text-sm px-8 py-4 rounded-full transition-[background-color,transform] duration-150 active:scale-[0.97]"
        >
          {data.cta} <ArrowRight size={16} className="transition-transform duration-200 ease-out group-hover:translate-x-1" />
        </a>
        <p className="mt-3 text-sm text-white/60">{SUPPORT_PHONE ? `WhatsApp +${SUPPORT_PHONE}` : SUPPORT_EMAIL}</p>
      </div>
    </motion.div>
  </section>
);
