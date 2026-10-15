import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLayeredDepth } from '../hooks/useLayeredDepth';
import { loadCatalog, productImage, discountPercent, productRoute, CATEGORY_LABELS } from '../data/catalog';
import { formatPrice } from '../config';

const EASE = [0.22, 1, 0.36, 1];
const INK = 'text-[#1A1A17]';
const MUTED = 'text-[#6B675F]';
const PAGE_SIZE = 12;

const COLLECTIONS = {
  women: {
    word: 'women',
    eyebrow: 'The collection',
    title: 'Made to move with her.',
    text: 'Slippers, sandals, loafers and heels with arch support and cushioning built in.',
    figure: '/assets/model-women-walk-cutout.webp',
    product: { image: '/assets/hero-shoe-women-sandal.webp', label: "Women's sandals", category: 'sandals' },
    other: { page: 'men', label: "Shop men's", image: '/assets/desk_main_image_d227b7.png' },
  },
  men: {
    word: 'men',
    eyebrow: 'The collection',
    title: 'Built for long days.',
    text: 'Slippers, sandals and formal shoes with anatomic footbeds and anti-skid soles.',
    figure: '/assets/model-men-walk-cutout.webp',
    product: { image: '/assets/hero-shoe-men-oxford.webp', label: "Men's formal shoes", category: 'shoes' },
    other: { page: 'shop', label: "Shop women's", image: '/assets/medifeet_home/img_51_192_325_story_card.png' },
  },
};

// ---------------------------------------------------------------------------
// Cover hero: the collection name, a walking figure in front, a shoe up front.
// ---------------------------------------------------------------------------
const CollectionHero = ({ c, stats, onPickCategory }) => {
  const sectionRef = useRef(null);
  const { style, handlers, reduceMotion } = useLayeredDepth(sectionRef);
  const productStats = stats?.categories[c.product.category];

  return (
    <section ref={sectionRef} {...handlers} className="relative bg-white overflow-hidden" aria-label={`${c.word} collection`}>
      <div className="relative h-[600px] sm:h-[700px] lg:h-[calc(100vh-116px)] lg:min-h-[660px] lg:max-h-[960px]">
        {/* Back: the collection name */}
        <motion.div style={style('wordScroll')} className="absolute inset-x-0 top-[24%] sm:top-[26%] lg:top-[20%] flex justify-center select-none pointer-events-none">
          <motion.div style={style('word')} className="relative text-[#24241F]">
            <span className="absolute -top-[0.9em] left-[0.06em] font-['Outfit'] font-light uppercase tracking-[0.32em] text-[13px] sm:text-xl lg:text-2xl text-[#6B675F]">
              {c.eyebrow}
            </span>
            <h1
              className={`font-['Outfit'] font-normal leading-[0.8] tracking-[-0.055em] ${
                c.word.length > 3 ? 'text-[26vw] lg:text-[25vw] 2xl:text-[380px]' : 'text-[40vw] lg:text-[34vw] 2xl:text-[480px]'
              }`}
            >
              <span className="inline-flex overflow-hidden pb-[0.06em]" aria-label={c.word}>
                {c.word.split('').map((ch, i) => (
                  <motion.span
                    key={i}
                    aria-hidden="true"
                    initial={reduceMotion ? false : { y: '100%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1.3, ease: EASE, delay: 0.1 + i * 0.07 }}
                    className="inline-block"
                  >
                    {ch}
                  </motion.span>
                ))}
              </span>
            </h1>
            {stats && (
              <span className="hidden sm:block absolute -top-[0.9em] right-[0.06em] font-['Outfit'] font-light text-xl lg:text-2xl text-[#6B675F]">
                {stats.total} styles · from {formatPrice(stats.from)}
              </span>
            )}
          </motion.div>
        </motion.div>

        {/* Middle: the walking figure */}
        <motion.div style={style('figureScroll')} className="absolute inset-0 pointer-events-none">
          <motion.div style={style('figure')} className="absolute bottom-0 left-[58%] lg:left-[56%] -translate-x-1/2 h-[84%] lg:h-[94%]">
            <motion.img
              src={c.figure}
              alt=""
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 40, filter: 'blur(12px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.2, ease: EASE, delay: 0.3 }}
              className="h-full w-auto max-w-none hero-fade-bottom"
            />
          </motion.div>
        </motion.div>

        {/* Front: the product */}
        <motion.div style={style('productScroll')} className="absolute left-[2%] sm:left-[4%] lg:left-[8%] bottom-[8%] w-[50%] sm:w-[40%] lg:w-[28%] max-w-[480px] z-10">
          <motion.div style={style('product')}>
            <motion.button
              onClick={() => onPickCategory(c.product.category)}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 120, rotate: 10, filter: 'blur(6px)' }}
              animate={{ opacity: 1, x: 0, rotate: 0, filter: 'blur(0px)' }}
              transition={reduceMotion ? { duration: 0.3 } : { type: 'spring', duration: 1, bounce: 0, delay: 0.45 }}
              className="group block w-full text-left cursor-pointer"
              aria-label={`Show ${c.product.label}`}
            >
              <img src={c.product.image} alt="" className="w-full drop-shadow-[0_40px_36px_rgba(26,26,23,0.25)]" />
              <span className="mt-3 ml-[8%] inline-flex items-center gap-2 whitespace-nowrap bg-white/85 backdrop-blur rounded-full px-4 py-2 text-xs sm:text-sm text-[#1A1A17] shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
                <span className="font-medium">{c.product.label}</span>
                {productStats && <span className="text-[#6B675F]">{productStats.count} styles</span>}
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Copy, bottom right on large screens */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.7 }}
          className="hidden lg:block absolute right-[5%] bottom-[10%] w-[300px] z-10"
        >
          <p className={`font-['Outfit'] font-medium text-2xl tracking-tight ${INK}`}>{c.title}</p>
          <p className={`mt-2 text-[15px] leading-relaxed ${MUTED}`}>{c.text}</p>
          <a href={`#${c.word === 'men' ? 'men' : 'shop'}`} onClick={(e) => { e.preventDefault(); document.getElementById('collection-grid')?.scrollIntoView({ behavior: 'smooth' }); }} className={`mt-5 inline-flex items-center gap-1.5 text-sm font-medium ${INK} border-b border-[#1A1A17]/30 hover:border-[#1A1A17] pb-0.5`}>
            Browse all styles <ArrowRight size={14} />
          </a>
        </motion.div>
      </div>

      <div className="lg:hidden px-5 pt-8 pb-4 text-center">
        <p className={`font-['Outfit'] font-medium text-2xl tracking-tight ${INK}`}>{c.title}</p>
        <p className={`mt-2 text-[15px] leading-relaxed max-w-[34ch] mx-auto ${MUTED}`}>{c.text}</p>
        {stats && <p className={`mt-3 text-sm ${MUTED}`}>{stats.total} styles · from {formatPrice(stats.from)}</p>}
      </div>
    </section>
  );
};

// ---------------------------------------------------------------------------
// Category bar: large words with counts and a gliding underline.
// ---------------------------------------------------------------------------
const CategoryBar = ({ categories, active, onPick, total }) => (
  <div className="sticky top-[61px] md:top-[80px] z-20 bg-white/85 backdrop-blur-xl border-b border-[#1A1A17]/8">
    <ul className="max-w-[1400px] mx-auto px-5 sm:px-10 flex gap-7 sm:gap-10 overflow-x-auto" role="tablist">
      {[{ key: 'all', label: 'All', count: total }, ...categories].map((cat) => {
        const isActive = active === cat.key;
        return (
          <li key={cat.key} className="relative shrink-0">
            <button
              role="tab"
              aria-selected={isActive}
              onClick={() => onPick(cat.key)}
              className={`py-5 font-['Outfit'] text-lg sm:text-xl tracking-tight transition-colors cursor-pointer ${isActive ? INK : `${MUTED} hover:text-[#1A1A17]`}`}
            >
              {cat.label}
              <sup className="ml-1 text-[11px] tabular-nums">{cat.count}</sup>
            </button>
            {isActive && <motion.span layoutId="category-underline" className="absolute left-0 right-0 bottom-0 h-[2px] bg-[#1A1A17]" transition={{ type: 'spring', duration: 0.5, bounce: 0 }} />}
          </li>
        );
      })}
    </ul>
  </div>
);

// ---------------------------------------------------------------------------
// Product card: borderless, second photo on hover, quiet fallback if a photo
// can't load (e.g. while images are served from Shopify's CDN).
// ---------------------------------------------------------------------------
const ProductTile = ({ product, onNavigate, index }) => {
  const { wishlist, toggleWishlist } = useCart();
  const [failed, setFailed] = useState(false);
  const saved = wishlist.includes(product.id);
  const off = discountPercent(product);
  const second = product.images[1];

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.8, ease: EASE, delay: (index % 4) * 0.06 }}
      className="group"
    >
      <div className="relative aspect-[4/5] rounded-[20px] overflow-hidden bg-[#F3F1EC]">
        <button onClick={() => onNavigate(productRoute(product))} className="absolute inset-0 cursor-pointer" aria-label={`View ${product.name}`}>
          {failed ? (
            <img src="/assets/medifeet-brand-logo.png" alt="" className="absolute inset-0 m-auto w-24 opacity-20 grayscale" />
          ) : (
            <>
              <img
                src={productImage(product.images[0], 700)}
                alt={product.name}
                loading="lazy"
                onError={() => setFailed(true)}
                className={`absolute inset-0 w-full h-full object-contain p-6 transition-[opacity,transform] duration-700 ease-out group-hover:scale-[1.04] ${second ? 'group-hover:opacity-0' : ''}`}
              />
              {second && (
                <img src={productImage(second, 700)} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-contain p-6 opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100" />
              )}
            </>
          )}
        </button>
        {off > 0 && <span className="absolute top-4 left-4 text-[11px] font-medium bg-white/90 text-[#1A1A17] px-2.5 py-1 rounded-full">−{off}%</span>}
        <button
          onClick={() => toggleWishlist(product.id)}
          aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name}`}
          aria-pressed={saved}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 focus-visible:opacity-100 [@media(hover:none)]:opacity-100 transition-opacity active:scale-[0.94] cursor-pointer"
        >
          <Heart size={16} className={saved ? 'fill-[#1A1A17] text-[#1A1A17]' : 'text-[#1A1A17]'} />
        </button>
      </div>
      <button onClick={() => onNavigate(productRoute(product))} className="mt-4 w-full text-left cursor-pointer">
        <span className={`block text-[15px] leading-snug line-clamp-2 ${INK}`}>{product.name}</span>
        <span className="mt-1.5 flex items-baseline gap-2">
          <span className={`text-[15px] font-medium tabular-nums ${INK}`}>{formatPrice(product.price)}</span>
          {off > 0 && <span className={`text-xs line-through tabular-nums ${MUTED}`}>{formatPrice(product.compareAtPrice)}</span>}
          {product.colors.length > 1 && <span className={`ml-auto text-xs ${MUTED}`}>{product.colors.length} colours</span>}
        </span>
      </button>
    </motion.article>
  );
};

// Closing banner pointing to the other collection, drifting with parallax.
const OtherCollection = ({ other, onNavigate }) => {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [-80, 80]);
  return (
    <section ref={ref} className="px-5 sm:px-10 pb-24">
      <button onClick={() => onNavigate(other.page)} className="group relative block w-full max-w-[1400px] mx-auto h-[420px] sm:h-[520px] rounded-[32px] overflow-hidden cursor-pointer text-left">
        <motion.img src={other.image} alt="" loading="lazy" style={{ y, scale: 1.25 }} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
        <span className="absolute left-8 sm:left-12 bottom-8 sm:bottom-12 text-white">
          <span className="block text-[11px] uppercase tracking-[0.28em] text-white/75 mb-3">Also from MediFeet</span>
          <span className="flex items-center gap-3 font-['Outfit'] font-medium text-4xl sm:text-6xl tracking-[-0.03em]">
            {other.label} <ArrowRight className="w-8 h-8 sm:w-12 sm:h-12 group-hover:translate-x-2 transition-transform duration-500" />
          </span>
        </span>
      </button>
    </section>
  );
};

// Women's or men's collection page.
export const CollectionPage = ({ gender = 'women', onNavigate }) => {
  const c = COLLECTIONS[gender];
  const [catalog, setCatalog] = useState(null);
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('featured');
  const [shown, setShown] = useState(PAGE_SIZE);

  useEffect(() => {
    let alive = true;
    loadCatalog().then((items) => alive && setCatalog(items.filter((p) => p.gender === gender)));
    return () => {
      alive = false;
    };
  }, [gender]);

  const stats = useMemo(() => {
    if (!catalog) return null;
    const categories = {};
    catalog.forEach((p) => {
      categories[p.category] = categories[p.category] || { count: 0 };
      categories[p.category].count += 1;
    });
    return { total: catalog.length, from: Math.min(...catalog.map((p) => p.price)), categories };
  }, [catalog]);

  const categories = useMemo(
    () => (stats ? Object.keys(CATEGORY_LABELS).filter((k) => stats.categories[k]).map((k) => ({ key: k, label: CATEGORY_LABELS[k], count: stats.categories[k].count })) : []),
    [stats],
  );

  const list = useMemo(() => {
    const items = (catalog || []).filter((p) => category === 'all' || p.category === category);
    if (sort === 'price-asc') return [...items].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') return [...items].sort((a, b) => b.price - a.price);
    return items;
  }, [catalog, category, sort]);

  const pick = (key) => {
    setCategory(key);
    setShown(PAGE_SIZE);
    document.getElementById('collection-grid')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-white font-['Geist']">
      <CollectionHero c={c} stats={stats} onPickCategory={pick} />

      <div id="collection-grid" className="scroll-mt-[80px]" />
      <CategoryBar categories={categories} active={category} onPick={pick} total={stats?.total ?? 0} />

      <section className="max-w-[1400px] mx-auto px-5 sm:px-10 pt-10 pb-24">
        <div className="flex items-center justify-between mb-8">
          <p className={`text-sm ${MUTED}`} aria-live="polite">{catalog ? `${list.length} styles` : 'Loading styles…'}</p>
          <label className="text-sm flex items-center gap-2">
            <span className={MUTED}>Sort</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className={`bg-transparent ${INK} font-medium focus:outline-none cursor-pointer`}
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price, low to high</option>
              <option value="price-desc">Price, high to low</option>
            </select>
          </label>
        </div>

        {!catalog ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-12">
            {Array.from({ length: 8 }, (_, i) => <div key={i} className="aspect-[4/5] rounded-[20px] bg-[#F3F1EC] animate-pulse" />)}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${category}-${sort}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-12"
            >
              {list.slice(0, shown).map((p, i) => <ProductTile key={p.id} product={p} index={i} onNavigate={onNavigate} />)}
            </motion.div>
          </AnimatePresence>
        )}

        {catalog && shown < list.length && (
          <div className="mt-16 flex flex-col items-center gap-4">
            <p className={`text-sm ${MUTED}`}>Showing {Math.min(shown, list.length)} of {list.length}</p>
            <button
              onClick={() => setShown((n) => n + PAGE_SIZE)}
              className="border border-[#1A1A17] text-[#1A1A17] hover:bg-[#1A1A17] hover:text-white text-sm font-medium px-8 py-3.5 rounded-full transition-[color,background-color,transform] duration-150 active:scale-[0.97] cursor-pointer"
            >
              Show more
            </button>
          </div>
        )}
      </section>

      <OtherCollection other={c.other} onNavigate={onNavigate} />
    </div>
  );
};

export default CollectionPage;
