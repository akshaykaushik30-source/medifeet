import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { AMBASSADORS } from '../data/ambassadors';
import { useRotation } from '../hooks/useRotation';
import { loadCatalog } from '../data/catalog';
import { formatPrice } from '../config';
import TrustMarquee from '../components/TrustMarquee';
import ShoeStory from '../components/ShoeStory';
import CommunityReels from '../components/CommunityReels';

// Minimal palette: warm paper, near-black ink, green only as an accent.
const INK = 'text-[#1A1A17]';
const MUTED = 'text-[#6B675F]';
const EASE = [0.22, 1, 0.36, 1];
const SLIDE_MS = 7000;

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

const Hero = ({ onNavigate }) => {
  const { index, setIndex, paused, setPaused } = useRotation(AMBASSADORS.length, SLIDE_MS);
  const reduceMotion = useReducedMotion();
  const a = AMBASSADORS[index];

  return (
    <section
      className="bg-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Our ambassadors"
    >
      <div className="max-w-[1400px] mx-auto px-5 sm:px-10 grid grid-cols-2 lg:grid-cols-12 items-center lg:min-h-[640px]">
        {/* Wordmark headline */}
        <div className="col-span-2 lg:col-span-4 pt-10 lg:pt-0 order-1">
          <h1 className="text-[#4A4A48]">
            <span className="block overflow-hidden">
              <motion.span initial={{ y: '100%' }} animate={{ y: 0 }} transition={{ duration: 1, ease: EASE }} className="block font-['Outfit'] font-light text-3xl sm:text-[40px] tracking-[0.18em] uppercase">
                Experience
              </motion.span>
            </span>
            <span className="block overflow-hidden -mt-1">
              <motion.span initial={{ y: '100%' }} animate={{ y: 0 }} transition={{ duration: 1.1, ease: EASE, delay: 0.1 }} className="block font-['Outfit'] font-normal text-[92px] sm:text-[120px] lg:text-[112px] xl:text-[124px] leading-[0.9] tracking-[-0.04em]">
                comfort
              </motion.span>
            </span>
            <span className="block overflow-hidden mt-2">
              <motion.span initial={{ y: '100%' }} animate={{ y: 0 }} transition={{ duration: 1, ease: EASE, delay: 0.2 }} className="flex items-baseline gap-2.5 font-['Outfit']">
                <span className="text-2xl font-light">by</span>
                <span className="text-3xl sm:text-[38px] font-semibold tracking-[0.04em]">MEDIFEET</span>
              </motion.span>
            </span>
          </h1>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.6 }} className="mt-8 hidden lg:block">
            <div className="min-h-[3rem]" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.p key={a.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className={`text-[15px] leading-relaxed max-w-[32ch] ${MUTED}`}>
                  {a.tagline}
                </motion.p>
              </AnimatePresence>
            </div>
            <button
              onClick={() => onNavigate(a.shop)}
              className="mt-6 bg-[#1A1A17] hover:bg-[#1E3F20] text-white text-sm font-medium px-7 py-3.5 rounded-full transition-colors cursor-pointer"
            >
              Shop {a.product.label.toLowerCase()}
            </button>
          </motion.div>
        </div>

        {/* Product, large and centred */}
        <div className="col-span-1 lg:col-span-4 order-2 flex flex-col items-center justify-center py-8 lg:py-0">
          <AnimatePresence mode="wait">
            <motion.button
              key={a.product.image}
              onClick={() => onNavigate(a.shop)}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 40, rotate: -8 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -30, rotate: 6 }}
              transition={{ duration: 0.9, ease: EASE }}
              className="group w-full text-center cursor-pointer"
              aria-label={`Shop ${a.product.label}`}
            >
              <img src={a.product.image} alt="" className="w-full max-w-[420px] mx-auto drop-shadow-[0_30px_30px_rgba(26,26,23,0.18)] group-hover:-translate-y-1.5 transition-transform duration-500" />
              <span className={`mt-5 inline-flex items-center gap-1.5 text-sm ${MUTED}`}>
                {a.product.label} · from {formatPrice(a.product.from)}
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </motion.button>
          </AnimatePresence>
        </div>

        {/* Ambassador cut out on white */}
        <div className="col-span-1 lg:col-span-4 order-3 relative self-end h-[300px] sm:h-[420px] lg:h-[620px]">
          <AnimatePresence initial={false}>
            <motion.img
              key={a.id}
              src={a.cutout}
              alt={`${a.name}, MediFeet ambassador`}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 1, ease: EASE }}
              className="absolute bottom-0 right-0 h-full w-auto max-w-none object-contain object-bottom [mask-image:linear-gradient(to_top,transparent,#000_20%)]"
            />
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.p key={a.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={`absolute bottom-3 right-0 text-xs tracking-wide ${MUTED} bg-white/80 backdrop-blur px-3 py-1.5 rounded-full`}>
              {a.name}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      {/* Story-style progress bars */}
      <div className="max-w-[1400px] mx-auto px-5 sm:px-10 pt-6 grid grid-cols-3 gap-4 lg:max-w-[460px] lg:mx-0 lg:ml-[max(40px,calc((100vw-1400px)/2+40px))]">
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
