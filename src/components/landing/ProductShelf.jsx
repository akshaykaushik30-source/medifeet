import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { loadCatalog, discountPercent } from '../../data/catalog';
import ShopTile from '../ShopTile';
import SectionHeading from './SectionHeading';

const SHELF_SIZE = 8;

// A varied shelf: take turns across categories, preferring in-stock styles
// with the most colours (then the biggest saving).
const pickShelf = (items, gender) => {
  const byCategory = {};
  items
    .filter((p) => p.gender === gender && p.inStock && p.images.length)
    .forEach((p) => (byCategory[p.category] = byCategory[p.category] || []).push(p));
  Object.values(byCategory).forEach((list) =>
    list.sort((a, b) => b.colors.length - a.colors.length || discountPercent(b) - discountPercent(a)),
  );
  const order = Object.keys(byCategory).sort();
  const picked = [];
  for (let round = 0; picked.length < SHELF_SIZE && order.some((c) => byCategory[c][round]); round += 1) {
    order.forEach((c) => byCategory[c][round] && picked.length < SHELF_SIZE && picked.push(byCategory[c][round]));
  }
  return picked;
};

const TABS = [
  { key: 'women', label: 'Women' },
  { key: 'men', label: 'Men' },
];

// "The comfort edit": a scrollable shelf of real catalogue products with
// Women / Men tabs, arrows, a scroll progress line and quick add.
export const ProductShelf = ({ onNavigate }) => {
  const [catalog, setCatalog] = useState(null);
  const [gender, setGender] = useState('women');
  const railRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollXProgress } = useScroll({ container: railRef });

  useEffect(() => {
    let alive = true;
    loadCatalog().then((items) => alive && setCatalog(items));
    return () => {
      alive = false;
    };
  }, []);

  const shelf = useMemo(() => (catalog ? pickShelf(catalog, gender) : []), [catalog, gender]);
  const total = useMemo(() => (catalog ? catalog.filter((p) => p.gender === gender).length : 0), [catalog, gender]);

  const scrollBy = (dir) => {
    const rail = railRef.current;
    if (rail) rail.scrollBy({ left: dir * rail.clientWidth * 0.85, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  const switchTo = (key) => {
    setGender(key);
    if (railRef.current) railRef.current.scrollLeft = 0;
  };

  return (
    <section className="py-24 sm:py-32 bg-white" aria-labelledby="shelf-heading">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10 sm:mb-14">
          <div id="shelf-heading">
            <SectionHeading eyebrow="Shop the collection" title="The comfort edit." />
            <p className="mt-5 text-base sm:text-lg text-[#4A5D4E] max-w-[44ch] leading-relaxed">
              Our most versatile styles, each with an anatomic footbed and cushioning built in.{' '}
              <span className="[@media(hover:none)]:hidden">Hover a pair to add your size.</span>
              <span className="[@media(hover:hover)]:hidden">Tap + on a pair to add your size.</span>
            </p>
          </div>

          <div className="flex items-center justify-between gap-6">
            <div className="relative flex gap-7" role="tablist" aria-label="Choose collection">
              {TABS.map((t) => (
                <button
                  key={t.key}
                  role="tab"
                  aria-selected={gender === t.key}
                  onClick={() => switchTo(t.key)}
                  className={`relative pb-2 font-['Outfit'] text-xl tracking-tight cursor-pointer transition-colors duration-150 ${gender === t.key ? 'text-[#1E3F20]' : 'text-[#667360] hover:text-[#1E3F20]'}`}
                >
                  {t.label}
                  {gender === t.key && (
                    <motion.span layoutId="shelf-tab" className="absolute left-0 right-0 bottom-0 h-[2px] bg-[#1E3F20]" transition={{ type: 'spring', duration: 0.45, bounce: 0 }} />
                  )}
                </button>
              ))}
            </div>
            <div className="hidden sm:flex gap-2">
              {[-1, 1].map((dir) => (
                <button
                  key={dir}
                  onClick={() => scrollBy(dir)}
                  aria-label={dir < 0 ? 'Previous styles' : 'More styles'}
                  className="w-11 h-11 rounded-full border border-[#1E3F20]/15 flex items-center justify-center text-[#1E3F20] hover:bg-[#1E3F20] hover:text-white hover:border-[#1E3F20] transition-[color,background-color,border-color,transform] duration-150 active:scale-[0.94] cursor-pointer"
                >
                  {dir < 0 ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={gender}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, transition: { duration: 0.15 } }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        >
          <div
            ref={railRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory scroll-px-5 sm:scroll-px-10 px-5 sm:px-10 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden max-w-[1400px] mx-auto"
          >
            {catalog
              ? shelf.map((p, i) => (
                  <div key={p.id} className="snap-start shrink-0 w-[72vw] sm:w-[44vw] md:w-[31vw] lg:w-[calc((min(100vw,1400px)-80px-72px)/4)]">
                    <ShopTile product={p} index={i} onNavigate={onNavigate} />
                  </div>
                ))
              : Array.from({ length: 4 }, (_, i) => (
                  <div key={i} className="shrink-0 w-[72vw] sm:w-[44vw] md:w-[31vw] lg:w-[calc((min(100vw,1400px)-80px-72px)/4)]">
                    <div className="aspect-[4/5] rounded-[20px] bg-[#F1F4EC] animate-pulse" />
                  </div>
                ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="max-w-[1400px] mx-auto px-5 sm:px-10 mt-8 flex items-center gap-6">
        <div className="relative flex-1 h-px bg-[#1E3F20]/12 overflow-hidden" aria-hidden="true">
          <motion.div style={{ scaleX: scrollXProgress }} className="absolute inset-0 bg-[#84BD3A] origin-left" />
        </div>
        <button
          onClick={() => onNavigate(gender === 'men' ? 'men' : 'shop')}
          className="group shrink-0 inline-flex items-center gap-2 text-sm font-medium text-[#1E3F20] cursor-pointer"
        >
          View all {total || ''} {gender === 'men' ? "men's" : "women's"} styles
          <ArrowRight size={15} className="transition-transform duration-200 ease-out group-hover:translate-x-1" />
        </button>
      </div>
    </section>
  );
};

export default ProductShelf;
