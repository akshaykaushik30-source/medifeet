import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { AMBASSADORS } from '../data/ambassadors';
import { useRotation } from '../hooks/useRotation';
import { loadCatalog } from '../data/catalog';
import { formatPrice } from '../config';
import TrustMarquee from '../components/TrustMarquee';
import ShoeStory from '../components/ShoeStory';
import HeroProduct from '../components/HeroProduct';
import ProductShelf from '../components/landing/ProductShelf';
import CategoryTiles from '../components/landing/CategoryTiles';
import HelpSection from '../components/landing/HelpSection';
import CommunityReels from '../components/CommunityReels';

// Minimal palette: warm paper, near-black ink, green only as an accent.
const INK = 'text-[#1E3F20]';
const MUTED = 'text-[#667360]';
const EASE = [0.22, 1, 0.36, 1];
const SLIDE_MS = 7500;

const Eyebrow = ({ children, className = '' }) => (
  <p className={`text-[11px] font-medium uppercase tracking-[0.28em] ${MUTED} ${className}`}>{children}</p>
);

// ---------------------------------------------------------------------------
// 1. Hero: "Experience comfort by MediFeet", the shoe, and the ambassador
// cut out on white. Product and ambassador change together.
// ---------------------------------------------------------------------------
const HERO_CATEGORIES = [
  { label: "Women's slippers", page: 'shop' },
  { label: "Women's sandals", page: 'shop' },
  { label: 'Loafers', page: 'shop' },
  { label: 'Heels', page: 'shop' },
  { label: "Men's slippers", page: 'men' },
  { label: "Men's sandals", page: 'men' },
  { label: 'Formal shoes', page: 'men' },
];

// Giant brand word whose letters rise in one after another on load.
const BigWord = ({ word }) => (
  <span className="inline-flex overflow-hidden pb-[0.06em]" aria-label={word}>
    {word.split('').map((ch, i) => (
      <motion.span
        key={i}
        aria-hidden="true"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        transition={{ duration: 1.3, ease: EASE, delay: 0.15 + i * 0.06 }}
        className="inline-block"
      >
        {ch}
      </motion.span>
    ))}
  </span>
);

const Hero = ({ onNavigate }) => {
  const sectionRef = useRef(null);
  const { index, setIndex, paused, setPaused } = useRotation(AMBASSADORS.length, SLIDE_MS);
  const reduceMotion = useReducedMotion();
  const a = AMBASSADORS[index];

  // Pointer depth: each layer follows the pointer by a different amount.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 60, damping: 20, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 60, damping: 20, mass: 0.6 });
  const wordX = useTransform(sx, (v) => v * -24);
  const personX = useTransform(sx, (v) => v * 18);
  const personY = useTransform(sy, (v) => v * 10);
  const shoeX = useTransform(sx, (v) => v * 46);
  const shoeY = useTransform(sy, (v) => v * 30);
  const shoeTilt = useTransform(sx, (v) => v * 6);

  // Scroll exit: layers drift apart at different speeds.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const wordScrollY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const wordScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const wordOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.15]);
  const personScrollY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const shoeScrollY = useTransform(scrollYProgress, [0, 1], [0, -220]);
  const shoeScrollRotate = useTransform(scrollYProgress, [0, 1], [0, -14]);
  const shoeRotate = useTransform([shoeTilt, shoeScrollRotate], ([t, s]) => t + s);

  const onPointerMove = (e) => {
    if (reduceMotion || e.pointerType !== 'mouse') return;
    const r = sectionRef.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };

  const still = reduceMotion ? {} : null;

  return (
    <section
      ref={sectionRef}
      onPointerMove={onPointerMove}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => {
        setPaused(false);
        px.set(0);
        py.set(0);
      }}
      className="relative bg-white overflow-hidden"
      aria-roledescription="carousel"
      aria-label="Our ambassadors"
    >
      <div className="relative h-[640px] sm:h-[720px] lg:h-[calc(100vh-116px)] lg:min-h-[680px] lg:max-h-[1000px]">
        {/* Back layer: the giant word */}
        <motion.div
          style={still ?? { y: wordScrollY, scale: wordScale, opacity: wordOpacity }}
          className="absolute inset-x-0 top-[30%] sm:top-[34%] lg:top-[26%] flex justify-center select-none pointer-events-none"
        >
          <motion.div style={still ?? { x: wordX }} className="relative text-[#1E3F20]">
            <span className="absolute -top-[0.9em] left-[0.06em] font-['Outfit'] font-light uppercase tracking-[0.32em] text-[13px] sm:text-xl lg:text-2xl text-[#667360]">
              Experience
            </span>
            <h1 className="font-['Outfit'] font-normal leading-[0.8] tracking-[-0.055em] text-[25vw] lg:text-[24vw] xl:text-[22vw] 2xl:text-[360px]">
              <BigWord word="comfort" />
            </h1>
            <span className="absolute right-[0.04em] -bottom-[1.5em] hidden sm:flex items-center gap-2 sm:gap-3 font-['Outfit']">
              <span className="text-sm sm:text-xl font-light text-[#667360]">by</span>
              <img src="/assets/medifeet-brand-logo.png" alt="MediFeet" className="h-8 sm:h-11 lg:h-14 w-auto" />
            </span>
          </motion.div>
        </motion.div>

        {/* Middle layer: the ambassador, standing in front of the word */}
        <motion.div style={still ?? { y: personScrollY }} className="absolute inset-0 pointer-events-none">
          <motion.div style={still ?? { x: personX, y: personY }} className="absolute bottom-0 left-1/2 -translate-x-1/2 lg:left-[56%] h-[78%] sm:h-[86%] lg:h-[94%] w-[70%] sm:w-[52%] lg:w-[34%]">
            <AnimatePresence initial={false}>
              <motion.img
                key={a.id}
                src={a.cutout}
                alt={`${a.name}, MediFeet ambassador`}
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 40, filter: 'blur(12px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -30, filter: 'blur(10px)', transition: { duration: 0.5, ease: EASE } }}
                transition={reduceMotion ? { duration: 0.3 } : { duration: 1.1, ease: EASE }}
                className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-full w-auto max-w-none object-contain object-bottom ${a.fullBody ? 'pb-[2%]' : a.fadeRight ? 'hero-fade-bottom-right' : 'hero-fade-bottom'}`}
              />
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* Front layer: the shoe */}
        <motion.div style={still ?? { y: shoeScrollY }} className="absolute left-[2%] sm:left-[4%] lg:left-[7%] bottom-[7%] lg:bottom-[9%] w-[52%] sm:w-[40%] lg:w-[30%] max-w-[520px] z-10">
          <motion.div style={still ?? { x: shoeX, y: shoeY }}>
            <AnimatePresence mode="wait">
              <motion.button
                key={a.product.image}
                onClick={() => onNavigate(a.shop)}
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 120, rotate: 10, filter: 'blur(6px)' }}
                animate={{ opacity: 1, x: 0, rotate: 0, filter: 'blur(0px)' }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -120, rotate: -10, filter: 'blur(6px)', transition: { duration: 0.45, ease: EASE } }}
                transition={reduceMotion ? { duration: 0.3 } : { type: 'spring', duration: 0.9, bounce: 0 }}
                className="group block w-full cursor-pointer text-left"
                aria-label={`Shop ${a.product.label}`}
              >
                <HeroProduct src={a.product.image} rotate={still ? undefined : shoeRotate} />
                <span className="mt-1 ml-[8%] inline-flex items-center gap-2 whitespace-nowrap bg-white/85 backdrop-blur rounded-full px-4 py-2 text-xs sm:text-sm text-[#1E3F20] shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
                  <span className="font-medium">{a.product.label}</span>
                  <span className="text-[#667360]">from {formatPrice(a.product.from)}</span>
                  <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </motion.button>
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* Story text and controls, bottom right on large screens */}
        <div className="hidden lg:block absolute right-[5%] bottom-[10%] w-[300px] z-10">
          <div className="min-h-[4.5rem]" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div key={a.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6, transition: { duration: 0.25 } }} transition={{ duration: 0.6, ease: EASE }}>
                <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-[#667360]">{a.name}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-[#1E3F20]">{a.tagline}</p>
              </motion.div>
            </AnimatePresence>
          </div>
          <button
            onClick={() => onNavigate(a.shop)}
            className="mt-6 bg-[#1E3F20] hover:bg-[#285424] text-white text-sm font-medium px-7 py-3.5 rounded-full transition-[color,background-color,transform] duration-150 active:scale-[0.97] cursor-pointer"
          >
            Shop {a.product.label.toLowerCase()}
          </button>
        </div>
      </div>

      {/* Story text on small screens */}
      <div className="lg:hidden px-5 pt-8 text-center">
        <AnimatePresence mode="wait">
          <motion.p key={a.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-[15px] leading-relaxed text-[#1E3F20] max-w-[34ch] mx-auto">
            {a.tagline}
          </motion.p>
        </AnimatePresence>
        <button onClick={() => onNavigate(a.shop)} className="mt-5 bg-[#1E3F20] text-white text-sm font-medium px-7 py-3.5 rounded-full transition-transform duration-150 active:scale-[0.97] cursor-pointer">
          Shop {a.product.label.toLowerCase()}
        </button>
      </div>

      {/* Story-style progress bars */}
      <div className="max-w-[1400px] mx-auto px-5 sm:px-10 pt-8 lg:pt-4">
        <div className="grid grid-cols-3 gap-4 max-w-[460px] mx-auto lg:mx-0">
          {AMBASSADORS.map((amb, i) => (
            <button key={amb.id} onClick={() => setIndex(i)} className="text-left cursor-pointer group" aria-label={`Show ${amb.name}`} aria-current={i === index || undefined}>
              <span className="block h-px bg-[#1E3F20]/15 overflow-hidden">
                <span
                  key={`${amb.id}-${i === index ? index : 'idle'}`}
                  className="block h-full bg-[#1E3F20] origin-left"
                  style={{
                    transform: i < index ? 'scaleX(1)' : i > index ? 'scaleX(0)' : undefined,
                    animation: i === index && !reduceMotion ? `bar-fill ${SLIDE_MS}ms linear forwards` : undefined,
                    animationPlayState: paused ? 'paused' : 'running',
                  }}
                />
              </span>
              <span className={`block mt-2.5 text-xs transition-colors ${i === index ? INK : `${MUTED} group-hover:text-[#1E3F20]`}`}>{amb.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Category line, like a shelf label under the hero */}
      <div className="max-w-[1400px] mx-auto px-5 sm:px-10 pt-14 pb-12">
        <div className="flex items-center gap-6">
          <span className="flex-1 h-px bg-[#1E3F20]/12" />
          <span className={`text-[11px] font-medium uppercase tracking-[0.28em] ${INK}`}>MediFeet collections</span>
          <span className="flex-1 h-px bg-[#1E3F20]/12" />
        </div>
        <ul className="mt-6 flex flex-wrap justify-center gap-x-8 gap-y-3">
          {HERO_CATEGORIES.map((c) => (
            <li key={c.label}>
              <button onClick={() => onNavigate(c.page)} className={`text-sm ${MUTED} hover:text-[#1E3F20] border-b border-transparent hover:border-[#1E3F20] pb-0.5 transition-colors cursor-pointer`}>
                {c.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

// An image that drifts against the scroll inside its frame.
const Parallax = ({ src, alt = '', speed = 60, className = '' }) => {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [-speed, speed]);
  return (
    <div ref={ref} className={`overflow-hidden bg-[#E3EAD9] ${className}`}>
      <motion.img src={src} alt={alt} loading="lazy" style={{ y, scale: 1.18 }} className="w-full h-full object-cover" />
    </div>
  );
};

const COLLECTIONS = [
  { gender: 'women', title: 'Women', page: 'shop', image: '/assets/medifeet_home/img_51_192_325_story_card.png' },
  { gender: 'men', title: 'Men', page: 'men', image: '/assets/desk_main_image_d227b7.png' },
];

const Collections = ({ onNavigate }) => {
  const [stats, setStats] = useState({});
  useEffect(() => {
    let alive = true;
    loadCatalog().then((items) => {
      if (!alive) return;
      const next = {};
      items.forEach((p) => {
        next[p.gender] = next[p.gender] || { total: 0, from: Infinity };
        next[p.gender].total += 1;
        next[p.gender].from = Math.min(next[p.gender].from, p.price);
      });
      setStats(next);
    });
    return () => {
      alive = false;
    };
  }, []);

  return (
    <section className="bg-[#F4F6F2] pb-28 sm:pb-40 px-5 sm:px-10">
      <div className="max-w-[1320px] mx-auto grid md:grid-cols-2 gap-x-8 gap-y-16">
        {COLLECTIONS.map((c, i) => (
          <motion.article
            key={c.gender}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1, ease: EASE, delay: i * 0.12 }}
            className={i === 1 ? 'md:mt-32' : ''}
          >
            <button onClick={() => onNavigate(c.page)} className="block w-full text-left group cursor-pointer">
              <Parallax src={c.image} alt={`${c.title}'s collection`} className="aspect-[4/5] rounded-[28px]" />
              <div className="mt-6 flex items-end justify-between gap-4">
                <div>
                  <h3 className={`font-['Outfit'] font-medium text-4xl tracking-tight ${INK}`}>{c.title}</h3>
                  {stats[c.gender] && (
                    <p className={`mt-1 text-sm ${MUTED}`}>{stats[c.gender].total} styles from {formatPrice(stats[c.gender].from)}</p>
                  )}
                </div>
                <span className={`inline-flex items-center gap-1.5 text-sm font-medium ${INK} pb-1 border-b border-[#1E3F20]/30 group-hover:border-[#1E3F20] transition-colors`}>
                  Shop {c.title.toLowerCase()} <ArrowRight size={14} />
                </span>
              </div>
            </button>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

// Hero, then products first: the shelf and categories, the comfort story,
// the two collections, the community, and answers to common questions.
export const LandingPage = ({ onNavigate }) => (
  <div className="font-['Geist'] bg-[#F4F6F2]">
    <Hero onNavigate={onNavigate} />
    <TrustMarquee />
    <ProductShelf onNavigate={onNavigate} />
    <CategoryTiles onNavigate={onNavigate} />
    <ShoeStory onNavigate={onNavigate} />
    <Collections onNavigate={onNavigate} />
    <CommunityReels />
    <HelpSection />
  </div>
);

export default LandingPage;
