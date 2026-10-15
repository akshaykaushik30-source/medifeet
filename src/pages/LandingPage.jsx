import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { AMBASSADORS } from '../data/ambassadors';
import { useRotation } from '../hooks/useRotation';
import { loadCatalog, CATEGORY_LABELS } from '../data/catalog';
import { FEATURES } from '../components/FeatureStrip';
import { formatPrice } from '../config';
import TrustMarquee from '../components/TrustMarquee';
import ShoeStory from '../components/ShoeStory';
import CommunityReels from '../components/CommunityReels';

const EASE = [0.22, 1, 0.36, 1]; // smooth deceleration, close to Apple's default curve

const reveal = {
  hidden: { opacity: 0, y: 32 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE, delay: i * 0.08 } }),
};

// ---------------------------------------------------------------------------
// Hero: ambassador portrait with the product they front floating in front.
// ---------------------------------------------------------------------------
const Hero = ({ onNavigate }) => {
  const { index, setIndex, setPaused } = useRotation(AMBASSADORS.length, 6500);
  const reduceMotion = useReducedMotion();
  const a = AMBASSADORS[index];

  return (
    <section
      className="relative overflow-hidden bg-[#F5F2EB]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Our ambassadors"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 pt-8 pb-14 lg:pt-14 lg:pb-20 grid lg:grid-cols-[1fr_1.05fr] gap-10 lg:gap-6 items-center">
        {/* Copy */}
        <div className="order-2 lg:order-1">
          <motion.p initial="hidden" animate="show" variants={reveal} className="font-['Geist_Mono'] text-xs font-bold uppercase tracking-[0.2em] text-[#2F6B2E] mb-4">
            Meet our ambassadors
          </motion.p>
          <div className="min-h-[190px] sm:min-h-[220px]" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={a.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                <h1 className="font-['Outfit'] font-bold text-[52px] sm:text-7xl leading-[0.95] tracking-tight text-[#14301A]">{a.name}</h1>
                <p className="mt-5 text-lg sm:text-xl text-[#3D4A3F] leading-relaxed max-w-[30ch]">{a.tagline}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.div initial="hidden" animate="show" custom={2} variants={reveal} className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate(a.shop)}
              className="bg-[#14301A] hover:bg-[#1E3F20] text-white font-['Outfit'] font-semibold px-7 py-3.5 rounded-full inline-flex items-center gap-2 transition active:scale-[0.98] cursor-pointer"
            >
              Shop {a.product.label.toLowerCase()} <ArrowRight size={16} />
            </button>
            <a href="#inside" className="font-['Outfit'] font-semibold text-[#14301A] px-4 py-3.5 inline-flex items-center gap-2 hover:gap-3 transition-all">
              See what's inside <ArrowDown size={16} />
            </a>
          </motion.div>

          <div className="mt-10 flex items-center gap-2">
            {AMBASSADORS.map((amb, i) => (
              <button
                key={amb.id}
                onClick={() => setIndex(i)}
                aria-label={`Show ${amb.name}`}
                aria-current={i === index || undefined}
                className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${i === index ? 'w-10 bg-[#14301A]' : 'w-2 bg-[#14301A]/25 hover:bg-[#14301A]/50'}`}
              />
            ))}
          </div>
        </div>

        {/* Visual: portrait + floating product */}
        <div className="order-1 lg:order-2 relative mx-auto w-full max-w-[300px] sm:max-w-[400px] lg:max-w-[460px]">
          <div className="absolute -inset-6 sm:-inset-10 rounded-full bg-[radial-gradient(circle_at_50%_45%,#CFE6A8_0%,rgba(207,230,168,0.35)_45%,transparent_70%)]" aria-hidden="true" />
          <div className="relative aspect-[4/5] rounded-t-[999px] rounded-b-[32px] overflow-hidden bg-[#E8E3D8] shadow-[0_30px_80px_-30px_rgba(20,48,26,0.45)]">
            <AnimatePresence initial={false}>
              <motion.img
                key={a.id}
                src={a.image}
                alt={`${a.name}, MediFeet ambassador`}
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease: EASE }}
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
            </AnimatePresence>
          </div>

          {/* Product in front of the portrait */}
          <AnimatePresence mode="wait">
            <motion.button
              key={a.product.image}
              onClick={() => onNavigate(a.shop)}
              initial={{ opacity: 0, x: -40, rotate: -6 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
              className="absolute -left-4 sm:-left-16 lg:-left-24 bottom-[6%] w-[68%] cursor-pointer group text-left"
              aria-label={`Shop ${a.product.label}`}
            >
              <motion.img
                src={a.product.image}
                alt=""
                animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="w-full drop-shadow-[0_24px_24px_rgba(20,48,26,0.35)] group-hover:scale-[1.03] transition-transform duration-500"
              />
              <span className="mt-2 ml-[8%] sm:ml-[14%] inline-flex items-center gap-2 whitespace-nowrap bg-white/90 backdrop-blur rounded-full pl-4 pr-3 py-2 shadow-md">
                <span className="font-['Outfit'] font-semibold text-xs sm:text-sm text-[#14301A]">{a.product.label}</span>
                <span className="text-xs text-[#3D4A3F]">from {formatPrice(a.product.from)}</span>
                <ArrowRight size={14} className="text-[#2F6B2E] group-hover:translate-x-0.5 transition-transform" />
              </span>
            </motion.button>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

// ---------------------------------------------------------------------------
// Features: the four comfort features, revealed one after another.
// ---------------------------------------------------------------------------
const Features = () => (
  <section className="bg-[#14301A] text-white py-20 sm:py-28">
    <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={reveal} className="max-w-2xl mb-14">
        <p className="font-['Geist_Mono'] text-xs font-bold uppercase tracking-[0.2em] text-[#A4D65E] mb-3">Built into every pair</p>
        <h2 className="font-['Outfit'] font-bold text-4xl sm:text-5xl tracking-tight leading-[1.05]">Comfort you can feel from the first step.</h2>
      </motion.div>
      <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 rounded-3xl overflow-hidden">
        {FEATURES.map(({ icon: Icon, title, text }, i) => (
          <motion.li
            key={title}
            custom={i}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            variants={reveal}
            className="bg-[#14301A] p-8 sm:p-10 group"
          >
            <span className="w-16 h-16 rounded-full border-2 border-[#A4D65E] text-[#A4D65E] flex items-center justify-center mb-8 group-hover:bg-[#A4D65E] group-hover:text-[#14301A] transition-colors duration-500">
              <Icon size={28} strokeWidth={1.75} />
            </span>
            <h3 className="font-['Outfit'] font-semibold text-2xl mb-2">{title}</h3>
            <p className="text-white/70 leading-relaxed">{text}</p>
          </motion.li>
        ))}
      </ul>
    </div>
  </section>
);

// ---------------------------------------------------------------------------
// Collections: Women and Men, with category counts from the live catalogue.
// ---------------------------------------------------------------------------
const COLLECTIONS = [
  { gender: 'women', title: 'Women', page: 'shop', image: '/assets/medifeet_home/img_42_204_11_womens_hero_image.png', line: 'Slippers, sandals, loafers and heels with all-day support.' },
  { gender: 'men', title: 'Men', page: 'men', image: '/assets/medifeet_home/img_46_204_40_mens_hero_image.png', line: 'Slippers, sandals and formal shoes that work as hard as you do.' },
];

const Collections = ({ onNavigate }) => {
  const [counts, setCounts] = useState(null);

  useEffect(() => {
    let alive = true;
    loadCatalog().then((items) => {
      if (!alive) return;
      const next = {};
      items.forEach((p) => {
        next[p.gender] = next[p.gender] || { total: 0, from: Infinity, categories: {} };
        next[p.gender].total += 1;
        next[p.gender].from = Math.min(next[p.gender].from, p.price);
        next[p.gender].categories[p.category] = (next[p.gender].categories[p.category] || 0) + 1;
      });
      setCounts(next);
    });
    return () => {
      alive = false;
    };
  }, []);

  return (
    <section className="bg-[#F5F2EB] py-20 sm:py-28">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={reveal} className="mb-12 max-w-2xl">
          <p className="font-['Geist_Mono'] text-xs font-bold uppercase tracking-[0.2em] text-[#2F6B2E] mb-3">Shop by collection</p>
          <h2 className="font-['Outfit'] font-bold text-4xl sm:text-5xl tracking-tight leading-[1.05] text-[#14301A]">Made for her. Made for him.</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {COLLECTIONS.map((c, i) => {
            const info = counts?.[c.gender];
            return (
              <motion.article
                key={c.gender}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-60px' }}
                variants={reveal}
                className="group relative rounded-[32px] overflow-hidden min-h-[520px] sm:min-h-[600px] flex items-end"
              >
                <img src={c.image} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover scale-[1.02] group-hover:scale-[1.07] transition-transform duration-[1.4s] ease-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F2414]/90 via-[#0F2414]/25 to-transparent" />
                <div className="relative p-7 sm:p-10 text-white w-full">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="font-['Outfit'] font-bold text-5xl tracking-tight">{c.title}</h3>
                    {info && <span className="text-sm text-white/80">{info.total} styles · from {formatPrice(info.from)}</span>}
                  </div>
                  <p className="mt-2 text-white/80 max-w-[36ch]">{c.line}</p>
                  {info && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {Object.keys(CATEGORY_LABELS).filter((k) => info.categories[k]).map((k) => (
                        <button
                          key={k}
                          onClick={() => onNavigate(c.page)}
                          className="bg-white/15 hover:bg-white hover:text-[#14301A] backdrop-blur text-sm px-4 py-2 rounded-full transition cursor-pointer"
                        >
                          {CATEGORY_LABELS[k]} <span className="opacity-70">{info.categories[k]}</span>
                        </button>
                      ))}
                    </div>
                  )}
                  <button
                    onClick={() => onNavigate(c.page)}
                    className="mt-7 bg-white text-[#14301A] font-['Outfit'] font-semibold px-6 py-3 rounded-full inline-flex items-center gap-2 hover:gap-3 transition-all cursor-pointer"
                  >
                    Shop {c.title.toLowerCase()} <ArrowRight size={16} />
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// Home page: hero → promises → scroll story → features → collections → reels.
export const LandingPage = ({ onNavigate }) => (
  <div className="font-['Geist'] text-[#14301A] bg-[#F5F2EB]">
    <Hero onNavigate={onNavigate} />
    <TrustMarquee />
    <ShoeStory onNavigate={onNavigate} />
    <Features />
    <Collections onNavigate={onNavigate} />
    <CommunityReels />
  </div>
);

export default LandingPage;
