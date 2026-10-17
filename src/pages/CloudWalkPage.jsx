import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Heart, Star, Truck, Banknote, RefreshCw, Ruler, ArrowUpRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CLOUDWALK as P } from '../data/cloudwalk';
import { formatPrice, FREE_SHIPPING_LABEL, supportLink } from '../config';
import SizeChartModal from '../components/SizeChartModal';
import TechExplorer from '../components/tech/TechExplorer';
import FeelTheDifference from '../components/tech/FeelTheDifference';
import { AutoVideo, SoleLayers, Comparison, MotionFilms, Reviews, Guidance, SupportBand } from '../components/product/ProductStory';
import SectionHeading from '../components/landing/SectionHeading';

const EASE = [0.22, 1, 0.36, 1];
const EASE_OUT = [0.23, 1, 0.32, 1];
const off = Math.round((1 - P.price / P.compareAtPrice) * 100);

// The studio photo, tinted when a colour without its own photos is chosen.
const Photo = ({ color, className = '' }) => (
  <img src={P.photo} alt={`${P.name} in ${color.name}`} style={color.preview ? { filter: color.preview } : undefined} className={className} />
);

// ---------------------------------------------------------------------------
// Gallery: the studio shot and four clips, crossfading between them.
// ---------------------------------------------------------------------------
const Gallery = ({ color }) => {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const item = P.gallery[index];
  return (
    <div className="flex flex-col-reverse lg:flex-row gap-3 lg:gap-4">
      <div className="flex lg:flex-col gap-2.5 overflow-x-auto [scrollbar-width:none]" role="tablist" aria-label="Photos and videos">
        {P.gallery.map((g, i) => (
          <button
            key={g.label}
            role="tab"
            aria-selected={i === index}
            aria-label={g.label}
            onClick={() => setIndex(i)}
            className={`relative shrink-0 w-16 h-20 lg:w-20 lg:h-24 rounded-2xl overflow-hidden bg-[#F1F4EC] cursor-pointer transition-[box-shadow,transform] duration-150 active:scale-[0.96] ${i === index ? 'shadow-[0_0_0_2px_#1E3F20]' : 'opacity-80 hover:opacity-100'}`}
          >
            {g.type === 'image' ? (
              <Photo color={color} className="absolute inset-0 w-full h-full object-contain p-2" />
            ) : (
              <img src={g.poster} alt="" className="absolute inset-0 w-full h-full object-cover" />
            )}
            {g.type === 'video' && <span className="absolute left-1.5 bottom-1.5 text-[9px] uppercase tracking-wider bg-white/85 text-[#1E3F20] px-1.5 py-0.5 rounded-full">{g.label}</span>}
          </button>
        ))}
      </div>

      <div className="relative flex-1 aspect-[4/5] rounded-[28px] overflow-hidden bg-[#F1F4EC]">
        <AnimatePresence initial={false}>
          <motion.div
            key={`${index}-${color.name}`}
            className="absolute inset-0"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.03, filter: 'blur(8px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            {item.type === 'image' ? (
              <Photo color={color} className="absolute inset-0 w-full h-full object-contain p-10 sm:p-14 drop-shadow-[0_30px_30px_rgba(30,63,32,0.18)]" />
            ) : (
              <AutoVideo src={item.video} poster={item.poster} />
            )}
          </motion.div>
        </AnimatePresence>
        {color.preview && index === 0 && (
          <span className="absolute left-5 bottom-5 text-xs bg-white/85 backdrop-blur text-[#1E3F20] px-3 py-1.5 rounded-full">Colour preview</span>
        )}
        <span className="absolute left-5 top-5 text-[11px] font-semibold bg-[#E8F3D6] text-[#1E3F20] px-2.5 py-1 rounded-full">−{off}%</span>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Purchase panel.
// ---------------------------------------------------------------------------
const Purchase = ({ color, setColor, onSizeChart, pincodeRef }) => {
  const { addToCart, wishlist, toggleWishlist } = useCart();
  const [size, setSize] = useState(null);
  const [sizeError, setSizeError] = useState(false);
  const [pincode, setPincode] = useState('');
  const [delivery, setDelivery] = useState(null);
  const saved = wishlist.includes(P.id);

  const add = () => {
    if (!size) {
      setSizeError(true);
      return;
    }
    addToCart({
      id: `${P.id}--${color.name.toLowerCase()}`,
      title: P.name,
      color: color.name,
      size,
      price: P.price,
      originalPrice: P.compareAtPrice,
      image: P.photo,
      quantity: 1,
    });
  };

  const checkPincode = (e) => {
    e.preventDefault();
    setDelivery(/^[1-9]\d{5}$/.test(pincode) ? 'ok' : 'invalid');
  };

  return (
    <div className="lg:sticky lg:top-[110px]">
      <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-[#667360]">Women · Sandals</p>
      <h1 className="mt-3 font-['Outfit'] font-medium text-[40px] sm:text-[52px] leading-[1] tracking-[-0.035em] text-[#1E3F20]">{P.name}</h1>
      <a href="#reviews" onClick={(e) => { e.preventDefault(); document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' }); }} className="mt-4 inline-flex items-center gap-2 text-sm text-[#4A5D4E] hover:text-[#1E3F20]">
        <Star size={15} className="fill-[#1E3F20] text-[#1E3F20]" /> {P.reviews.rating} · {P.reviews.count} reviews
      </a>

      <div className="mt-6 flex items-baseline gap-3">
        <span className="font-['Outfit'] text-3xl text-[#1E3F20] tabular-nums">{formatPrice(P.price)}</span>
        <span className="text-base line-through text-[#667360] tabular-nums">{formatPrice(P.compareAtPrice)}</span>
        <span className="text-xs font-semibold bg-[#E8F3D6] text-[#1E3F20] px-2.5 py-1 rounded-full">Save {off}%</span>
      </div>
      <p className="mt-1 text-xs text-[#667360]">Inclusive of all taxes</p>

      {/* Colour */}
      <div className="mt-8">
        <p className="text-sm text-[#1E3F20]">Colour: <span className="font-medium">{color.name}</span></p>
        <div className="mt-3 flex gap-3">
          {P.colors.map((c) => (
            <button
              key={c.name}
              onClick={() => setColor(c)}
              aria-label={c.name}
              aria-pressed={c.name === color.name}
              className={`w-9 h-9 rounded-full cursor-pointer transition-[box-shadow,transform] duration-150 active:scale-[0.92] ${c.name === color.name ? 'shadow-[0_0_0_3px_#fff,0_0_0_4.5px_#1E3F20]' : 'hover:shadow-[0_0_0_3px_#fff,0_0_0_4.5px_rgba(30,63,32,0.3)]'}`}
              style={{ background: c.swatch }}
            />
          ))}
        </div>
      </div>

      {/* Size */}
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <p className="text-sm text-[#1E3F20]">Size: <span className="font-medium">{size ? `UK ${size}` : 'Choose your size'}</span></p>
          <button onClick={onSizeChart} className="inline-flex items-center gap-1.5 text-sm text-[#1E3F20] border-b border-[#1E3F20]/30 hover:border-[#1E3F20] cursor-pointer transition-colors duration-150">
            <Ruler size={14} /> Size chart
          </button>
        </div>
        <div className="mt-3 grid grid-cols-6 gap-2">
          {P.sizes.map((s) => (
            <button
              key={s.size}
              disabled={!s.available}
              onClick={() => { setSize(s.size); setSizeError(false); }}
              aria-pressed={size === s.size}
              aria-label={s.available ? `UK ${s.size}` : `UK ${s.size}, sold out`}
              className={`h-12 rounded-full border text-sm tabular-nums cursor-pointer transition-[color,background-color,border-color,transform] duration-150 active:scale-[0.95] disabled:cursor-not-allowed disabled:text-[#1E3F20]/25 disabled:line-through ${
                size === s.size ? 'bg-[#1E3F20] border-[#1E3F20] text-white' : 'border-[#1E3F20]/15 text-[#1E3F20] hover:border-[#1E3F20] disabled:hover:border-[#1E3F20]/15'
              }`}
            >
              {s.size}
            </button>
          ))}
        </div>
        <AnimatePresence>
          {sizeError && (
            <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="mt-2 text-sm text-[#B42318]" role="alert">
              Please choose a size first.
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Add */}
      <div className="mt-8 flex gap-3">
        <button onClick={add} className="flex-1 h-14 rounded-full bg-[#1E3F20] hover:bg-[#285424] text-white font-medium transition-[background-color,transform] duration-150 active:scale-[0.98] cursor-pointer">
          Add to bag · {formatPrice(P.price)}
        </button>
        <button
          onClick={() => toggleWishlist(P.id)}
          aria-label={saved ? 'Remove from wishlist' : 'Save to wishlist'}
          aria-pressed={saved}
          className="w-14 h-14 rounded-full border border-[#1E3F20]/15 hover:border-[#1E3F20] flex items-center justify-center text-[#1E3F20] cursor-pointer transition-[border-color,transform] duration-150 active:scale-[0.94]"
        >
          <Heart size={19} className={saved ? 'fill-[#1E3F20]' : ''} />
        </button>
      </div>

      {/* Delivery */}
      <form id="pincode" ref={pincodeRef} onSubmit={checkPincode} className="mt-8 rounded-2xl bg-[#F4F6F2] p-5 scroll-mt-[120px]">
        <label htmlFor="pincode-input" className="text-sm font-medium text-[#1E3F20]">Check delivery</label>
        <div className="mt-3 flex gap-2">
          <input
            id="pincode-input"
            inputMode="numeric"
            maxLength={6}
            value={pincode}
            onChange={(e) => { setPincode(e.target.value.replace(/\D/g, '')); setDelivery(null); }}
            placeholder="Enter pincode"
            className="flex-1 min-w-0 h-11 rounded-full bg-white px-4 text-sm text-[#1E3F20] placeholder-[#667360]/70 outline-none focus:shadow-[0_0_0_2px_#84BD3A]"
          />
          <button type="submit" className="h-11 px-5 rounded-full bg-white border border-[#1E3F20]/15 hover:border-[#1E3F20] text-sm font-medium text-[#1E3F20] cursor-pointer transition-[border-color,transform] duration-150 active:scale-[0.96]">
            Check
          </button>
        </div>
        <AnimatePresence mode="wait">
          {delivery && (
            <motion.p
              key={delivery}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: EASE_OUT }}
              className={`mt-3 text-sm ${delivery === 'ok' ? 'text-[#2D5A30]' : 'text-[#B42318]'}`}
              role="status"
            >
              {delivery === 'ok' ? `Delivers to ${pincode}: dispatched within 24 hours, usually arrives in 2–7 days.` : 'Please enter a valid 6-digit pincode.'}
            </motion.p>
          )}
        </AnimatePresence>
      </form>

      <ul className="mt-6 grid grid-cols-3 gap-3 text-xs text-[#4A5D4E]">
        {[
          { icon: Truck, text: `Free delivery above ${FREE_SHIPPING_LABEL}` },
          { icon: Banknote, text: 'Cash on delivery' },
          { icon: RefreshCw, text: 'Easy exchange' },
        ].map(({ icon: Icon, text }) => (
          <li key={text} className="flex flex-col items-start gap-2">
            <span className="w-9 h-9 rounded-full bg-[#E8F3D6] text-[#1E3F20] flex items-center justify-center"><Icon size={16} /></span>
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
};

// ---------------------------------------------------------------------------
// More ways to CloudWalk: the other colourways.
// ---------------------------------------------------------------------------
const MoreWays = ({ color, onPick }) => (
  <section className="bg-white py-24 sm:py-32" aria-label={P.moreWays.eyebrow}>
    <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
      <SectionHeading eyebrow={P.moreWays.eyebrow} title={P.moreWays.title} />
      <div className="mt-12 grid sm:grid-cols-2 gap-5 sm:gap-6">
        {P.colors.filter((c) => c.name !== color.name).map((c, i) => (
          <motion.button
            key={c.name}
            onClick={() => onPick(c)}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, ease: EASE, delay: i * 0.08 }}
            className="group text-left cursor-pointer"
          >
            <span className="relative block aspect-[5/4] rounded-[28px] overflow-hidden bg-[#F1F4EC]">
              <Photo color={c} className="absolute inset-0 w-full h-full object-contain p-12 transition-transform duration-500 ease-out group-hover:-translate-y-2 group-hover:-rotate-2" />
              {c.preview && <span className="absolute left-5 bottom-5 text-xs bg-white/85 text-[#1E3F20] px-3 py-1.5 rounded-full">Colour preview</span>}
              <span className="absolute right-5 top-5 w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#1E3F20] transition-colors duration-200 group-hover:bg-[#1E3F20] group-hover:text-white">
                <ArrowUpRight size={17} />
              </span>
            </span>
            <span className="mt-5 flex items-baseline justify-between gap-4">
              <span className="text-[11px] uppercase tracking-[0.24em] text-[#1E3F20] font-medium">{P.shortName} · {c.name}</span>
              <span className="font-['Outfit'] text-xl text-[#1E3F20] tabular-nums">{formatPrice(P.price)}</span>
            </span>
            <span className="mt-1 block text-sm text-[#667360]">{P.moreWays.tagline}</span>
          </motion.button>
        ))}
      </div>
    </div>
  </section>
);

// ---------------------------------------------------------------------------
// The CloudWalk product page.
// ---------------------------------------------------------------------------
export const CloudWalkPage = ({ onNavigate }) => {
  const [color, setColor] = useState(P.colors[0]);
  const [sizeChartOpen, setSizeChartOpen] = useState(false);
  const pincodeRef = useRef(null);
  const topRef = useRef(null);

  const pickColor = (c) => {
    setColor(c);
    topRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const guidanceActions = {
    'size-chart': { label: 'Open the size chart', onClick: () => setSizeChartOpen(true) },
    pincode: {
      label: 'Check your pincode',
      onClick: () => {
        pincodeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => document.getElementById('pincode-input')?.focus({ preventScroll: true }), 600);
      },
    },
    support: { label: 'Contact support', onClick: () => window.open(supportLink(), '_self') },
  };

  return (
    <div className="bg-white font-['Geist']">
      <section ref={topRef} className="max-w-[1280px] mx-auto px-5 sm:px-10 pt-6 pb-20 sm:pb-28 scroll-mt-[90px]">
        <nav className="text-xs text-[#667360] flex items-center gap-2 mb-6" aria-label="Breadcrumb">
          <button onClick={() => onNavigate('home')} className="hover:text-[#1E3F20] cursor-pointer">Home</button>
          <span>/</span>
          <button onClick={() => onNavigate('shop')} className="hover:text-[#1E3F20] cursor-pointer">Women</button>
          <span>/</span>
          <button onClick={() => onNavigate('shop/sandals')} className="hover:text-[#1E3F20] cursor-pointer">Sandals</button>
          <span>/</span>
          <span className="text-[#1E3F20]">{P.shortName}</span>
        </nav>
        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-16 items-start">
          <Gallery color={color} />
          <Purchase color={color} setColor={setColor} onSizeChart={() => setSizeChartOpen(true)} pincodeRef={pincodeRef} />
        </div>
      </section>

      <TechExplorer eyebrow={P.technologies.eyebrow} title={P.technologies.title} text={P.technologies.text} />
      <SoleLayers data={P.layers} />
      <FeelTheDifference className="bg-white" />
      <Comparison data={P.comparison} />
      <MotionFilms data={P.motion} />
      <Reviews data={P.reviews} />
      <MoreWays color={color} onPick={pickColor} />
      <Guidance data={P.guidance} actions={guidanceActions} />
      <SupportBand data={P.support} />

      <SizeChartModal isOpen={sizeChartOpen} onClose={() => setSizeChartOpen(false)} selectedSize={null} onSelectSize={() => setSizeChartOpen(false)} />
    </div>
  );
};

export default CloudWalkPage;
