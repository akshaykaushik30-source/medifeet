import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { AMBASSADORS } from '../data/ambassadors';
import { useRotation } from '../hooks/useRotation';
import { loadCatalog } from '../data/catalog';
import { formatPrice } from '../config';
import TrustMarquee from '../components/TrustMarquee';
import ShoeStory from '../components/ShoeStory';
import HeroProduct from '../components/HeroProduct';
import CommunityReels from '../components/CommunityReels';

// Minimal palette: warm paper, near-black ink, green only as an accent.
const INK = 'text-[#1A1A17]';
const MUTED = 'text-[#6B675F]';
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
          <motion.div style={still ?? { x: wordX }} className="relative text-[#24241F]">
            <span className="absolute -top-[0.9em] left-[0.06em] font-['Outfit'] font-light uppercase tracking-[0.32em] text-[13px] sm:text-xl lg:text-2xl text-[#6B675F]">
              Experience
            </span>
            <h1 className="font-['Outfit'] font-normal leading-[0.8] tracking-[-0.055em] text-[25vw] lg:text-[24vw] xl:text-[22vw] 2xl:text-[360px]">
              <BigWord word="comfort" />
            </h1>
            <span className="absolute right-[0.04em] -bottom-[1.5em] hidden sm:flex items-center gap-2 sm:gap-3 font-['Outfit']">
              <span className="text-sm sm:text-xl font-light text-[#6B675F]">by</span>
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
                <span className="mt-1 ml-[8%] inline-flex items-center gap-2 whitespace-nowrap bg-white/85 backdrop-blur rounded-full px-4 py-2 text-xs sm:text-sm text-[#1A1A17] shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
                  <span className="font-medium">{a.product.label}</span>
                  <span className="text-[#6B675F]">from {formatPrice(a.product.from)}</span>
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
                <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-[#6B675F]">{a.name}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-[#1A1A17]">{a.tagline}</p>
              </motion.div>
            </AnimatePresence>
          </div>
          <button
            onClick={() => onNavigate(a.shop)}
            className="mt-6 bg-[#1A1A17] hover:bg-[#1E3F20] text-white text-sm font-medium px-7 py-3.5 rounded-full transition-[color,background-color,transform] duration-150 active:scale-[0.97] cursor-pointer"
          >
            Shop {a.product.label.toLowerCase()}
          </button>
        </div>
      </div>

      {/* Story text on small screens */}
      <div className="lg:hidden px-5 pt-8 text-center">
        <AnimatePresence mode="wait">
          <motion.p key={a.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-[15px] leading-relaxed text-[#1A1A17] max-w-[34ch] mx-auto">
            {a.tagline}
          </motion.p>
        </AnimatePresence>
        <button onClick={() => onNavigate(a.shop)} className="mt-5 bg-[#1A1A17] text-white text-sm font-medium px-7 py-3.5 rounded-full transition-transform duration-150 active:scale-[0.97] cursor-pointer">
          Shop {a.product.label.toLowerCase()}
        </button>
      </div>

      {/* Story-style progress bars */}
      <div className="max-w-[1400px] mx-auto px-5 sm:px-10 pt-8 lg:pt-4">
        <div className="grid grid-cols-3 gap-4 max-w-[460px] mx-auto lg:mx-0">
          {AMBASSADORS.map((amb, i) => (
            <button key={amb.id} onClick={() => setIndex(i)} className="text-left cursor-pointer group" aria-label={`Show ${amb.name}`} aria-current={i === index || undefined}>
              <span className="block h-px bg-[#1A1A17]/15 overflow-hidden">
                <span
                  key={`${amb.id}-${i === index ? index : 'idle'}`}
                  className="block h-full bg-[#1A1A17] origin-left"
                  style={{
                    transform: i < index ? 'scaleX(1)' : i > index ? 'scaleX(0)' : undefined,
                    animation: i === index && !reduceMotion ? `bar-fill ${SLIDE_MS}ms linear forwards` : undefined,
                    animationPlayState: paused ? 'paused' : 'running',
                  }}
                />
              </span>
              <span className={`block mt-2.5 text-xs transition-colors ${i === index ? INK : `${MUTED} group-hover:text-[#1A1A17]`}`}>{amb.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Category line, like a shelf label under the hero */}
      <div className="max-w-[1400px] mx-auto px-5 sm:px-10 pt-14 pb-12">
        <div className="flex items-center gap-6">
          <span className="flex-1 h-px bg-[#1A1A17]/12" />
          <span className={`text-[11px] font-medium uppercase tracking-[0.28em] ${INK}`}>MediFeet collections</span>
          <span className="flex-1 h-px bg-[#1A1A17]/12" />
        </div>
        <ul className="mt-6 flex flex-wrap justify-center gap-x-8 gap-y-3">
          {HERO_CATEGORIES.map((c) => (
            <li key={c.label}>
              <button onClick={() => onNavigate(c.page)} className={`text-sm ${MUTED} hover:text-[#1A1A17] border-b border-transparent hover:border-[#1A1A17] pb-0.5 transition-colors cursor-pointer`}>
                {c.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

// ---------------------------------------------------------------------------
// 2. Materials: scrolling down moves a pinned gallery sideways.
// ---------------------------------------------------------------------------
const MATERIALS = [
  { image: '/assets/materials-conceptual-leather-texture.png', title: 'Premium leather', text: 'Genuine and vegan leathers, finished by hand.' },
  { image: '/assets/cushioning-photorealistic-illustrative-detail.png', title: 'Soft cushioning', text: 'Gives under every step and springs back.' },
  { image: '/assets/anatomic-footbed-photorealistic-illustrative-detail.png', title: 'Anatomic footbed', text: 'Follows the natural curve of your arch.' },
  { image: '/assets/outsole-grip-photorealistic-illustrative-detail.png', title: 'Anti-skid grip', text: 'High rubber content for a firm hold.' },
  { image: '/assets/lightweight-airy-feather-concept.png', title: 'Featherlight', text: 'Light enough to forget you are wearing them.' },
];

const MaterialCard = ({ m, i }) => (
  <figure className="shrink-0 w-[78vw] sm:w-[52vw] lg:w-[36vw]">
    <div className="aspect-[4/3] rounded-[24px] overflow-hidden bg-[#E9E4DB]">
      <img src={m.image} alt="" loading="lazy" className="w-full h-full object-cover" />
    </div>
    <figcaption className="mt-5 flex gap-5">
      <span className={`text-xs tabular-nums pt-1 ${MUTED}`}>0{i + 1}</span>
      <span>
        <span className={`block font-['Outfit'] font-medium text-2xl tracking-tight ${INK}`}>{m.title}</span>
        <span className={`block mt-1 ${MUTED}`}>{m.text}</span>
      </span>
    </figcaption>
  </figure>
);

const Materials = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [distance, setDistance] = useState(0);
  const distanceRef = useRef(0);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  // How far the track has to travel sideways; read from a ref so resizes apply at once.
  const x = useTransform(scrollYProgress, (p) => -distanceRef.current * Math.min(1, Math.max(0, (p - 0.05) / 0.9)));

  useLayoutEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      distanceRef.current = Math.max(0, trackRef.current.scrollWidth - window.innerWidth);
      setDistance(distanceRef.current);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const heading = (
    <div className="shrink-0 w-[78vw] sm:w-[40vw] lg:w-[28vw] self-center pr-6">
      <Eyebrow className="mb-5">What goes into every pair</Eyebrow>
      <h2 className={`font-['Outfit'] font-medium text-4xl sm:text-5xl leading-[1.05] tracking-[-0.03em] ${INK}`}>
        Five things you'll feel, not see.
      </h2>
    </div>
  );

  if (reduceMotion) {
    return (
      <section className="bg-[#F6F3EE] py-24">
        <div className="flex gap-8 overflow-x-auto px-5 sm:px-10">{heading}{MATERIALS.map((m, i) => <MaterialCard key={m.title} m={m} i={i} />)}</div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative bg-[#F6F3EE]" style={{ height: `calc(100vh + ${distance}px)` }}>
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <motion.div ref={trackRef} style={{ x }} className="flex gap-8 sm:gap-12 px-5 sm:px-10">
          {heading}
          {MATERIALS.map((m, i) => <MaterialCard key={m.title} m={m} i={i} />)}
        </motion.div>
      </div>
    </section>
  );
};

// ---------------------------------------------------------------------------
// 3. Statement: words brighten one by one as the visitor scrolls.
// ---------------------------------------------------------------------------
const STATEMENT = 'Comfort is not a feature we add. It is how every MediFeet pair begins, from the footbed up.';

const Word = ({ word, progress, range }) => {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return <motion.span style={{ opacity }} className="inline-block mr-[0.25em]">{word}</motion.span>;
};

const Statement = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.45'] });
  const words = STATEMENT.split(' ');
  return (
    <section ref={ref} className="bg-[#F6F3EE] py-32 sm:py-44 px-5 sm:px-10">
      <p className={`max-w-[1000px] mx-auto font-['Outfit'] font-medium text-[34px] sm:text-5xl lg:text-[60px] leading-[1.12] tracking-[-0.03em] ${INK}`}>
        {words.map((w, i) => (
          <Word key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
        ))}
      </p>
    </section>
  );
};

// ---------------------------------------------------------------------------
// 4. Collections: two portraits drifting with gentle parallax.
// ---------------------------------------------------------------------------
const Parallax = ({ src, alt = '', speed = 60, className = '' }) => {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [-speed, speed]);
  return (
    <div ref={ref} className={`overflow-hidden bg-[#E9E4DB] ${className}`}>
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
    <section className="bg-[#F6F3EE] pb-28 sm:pb-40 px-5 sm:px-10">
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
                <span className={`inline-flex items-center gap-1.5 text-sm font-medium ${INK} pb-1 border-b border-[#1A1A17]/30 group-hover:border-[#1A1A17] transition-colors`}>
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

// ---------------------------------------------------------------------------
// 5. Everyday moments: three images drifting at different speeds.
// ---------------------------------------------------------------------------
const Moments = () => (
  <section className="bg-[#EFEBE4] py-28 sm:py-40 px-5 sm:px-10 overflow-hidden">
    <div className="max-w-[1320px] mx-auto">
      <div className="max-w-xl mb-16">
        <Eyebrow className="mb-5">Made for real days</Eyebrow>
        <h2 className={`font-['Outfit'] font-medium text-4xl sm:text-5xl leading-[1.05] tracking-[-0.03em] ${INK}`}>
          Errands. Workdays. Long walks home.
        </h2>
      </div>
      <div className="grid grid-cols-12 gap-4 sm:gap-6 items-start">
        <Parallax src="/assets/medifeet_home/img_27_93_24_collage_card_2.png" speed={30} className="col-span-12 sm:col-span-5 aspect-[4/5] rounded-[24px]" />
        <Parallax src="/assets/medifeet_home/img_28_93_27_collage_card_3.png" speed={90} className="col-span-7 sm:col-span-4 aspect-[3/4] rounded-[24px] sm:mt-24" />
        <Parallax src="/assets/medifeet_home/img_26_93_21_collage_card_1.png" speed={50} className="col-span-5 sm:col-span-3 aspect-[3/5] rounded-[24px] mt-16 sm:mt-48" />
      </div>
    </div>
  </section>
);

// Home: hero → promises → shoe story → materials → statement → collections → moments → reels.
export const LandingPage = ({ onNavigate }) => (
  <div className="font-['Geist'] bg-[#F6F3EE]">
    <Hero onNavigate={onNavigate} />
    <TrustMarquee />
    <ShoeStory onNavigate={onNavigate} />
    <Materials />
    <Statement />
    <Collections onNavigate={onNavigate} />
    <Moments />
    <CommunityReels />
  </div>
);

export default LandingPage;
