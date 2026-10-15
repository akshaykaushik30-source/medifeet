import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, ArrowRight, Star, ShieldCheck, Heart, ShoppingBag, 
  Play, Plus, Minus, ChevronDown, CheckCircle2, Feather, Footprints, 
  Compass, Eye, Clock, Truck, RefreshCw, Leaf, Activity, HeartHandshake
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import FeatureStrip from '../components/FeatureStrip';
import { AMBASSADORS } from '../data/ambassadors';
import { useRotation } from '../hooks/useRotation';

export const HomePage = ({ onNavigate }) => {
  const { index: spotIndex, setIndex: setSpotIndex } = useRotation(AMBASSADORS.length);
  const spot = AMBASSADORS[spotIndex];
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeSubcat, setActiveSubcat] = useState('All');
  const [quickViewSize, setQuickViewSize] = useState(6);
  const [openFaq, setOpenFaq] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState(null);

  const categories = ['New Arrivals', 'Men', 'Women', 'Collections', 'Releases', 'Sale'];
  const subcats = ['All', 'Sneakers', 'Walking', 'Formals', 'Recovery', 'Work'];

  const stepCards = [
    { num: '01 / EASE', title: 'Responsive Ease', sub: 'Energy return 24/7', img: '/assets/product-thumbnail.png', page: 'product' },
    { num: '02 / ACTIVE', title: 'Breathable Form', sub: 'Knit mesh upper', img: '/assets/product-cushion-runner.png', page: 'shop' },
    { num: '03 / LEGACY', title: 'Locked-in Fit', sub: 'Adaptive heel counter', img: '/assets/product-breeze-walker.png', page: 'shop' },
    { num: '04 / WORK', title: 'Ready For Every Step', sub: 'Everyday comfort core', img: '/assets/product-ortho-slide.png', page: 'shop' },
  ];

  const featuredCatalog = [
    {
      id: 'aerostride-knit',
      name: 'AeroStride Knit',
      tag: 'NEW DROP',
      desc: '18mm heel-drop sole',
      price: 3299,
      origPrice: 4299,
      rating: 4.8,
      img: '/assets/product-cushion-runner.png'
    },
    {
      id: 'cloudwalk-stone-beige',
      name: 'CloudWalk Perfect Sandal',
      tag: 'BESTSELLER',
      desc: 'Women’s comfort sandal',
      price: 2499,
      origPrice: 3299,
      rating: 4.9,
      img: '/assets/product-thumbnail.png',
      featured: true
    },
    {
      id: 'terragrip-slide',
      name: 'TerraGrip Slide',
      tag: 'RESTOCK',
      desc: 'Dual-density recovery slide',
      price: 1999,
      origPrice: 2499,
      rating: 4.7,
      img: '/assets/product-luxe-recovery.png'
    }
  ];

  const communityReviews = [
    {
      handle: '@sneha.on.the.move',
      quote: '12-hour hospital shift and my feet still feel fresh. Game changer!',
      likes: '4.8k',
      tag: 'HEALTHCARE HERO'
    },
    {
      handle: '@vimalambassador',
      quote: 'Walked 18k steps around Mumbai with zero foot fatigue.',
      likes: '3.9k',
      tag: 'CITY WALKER'
    },
    {
      handle: '@anita.markets',
      quote: 'Weekend sell-out for a reason. Fits my high instep seamlessly.',
      likes: '6.2k',
      tag: 'STYLE & COMFORT'
    },
    {
      handle: '@rajesh.fitness.fit',
      quote: 'Nailed the recovery after marathon workouts. High rebound foam.',
      likes: '2.5k',
      tag: 'ACTIVE RECOVERY'
    }
  ];

  return (
    <div className="bg-[#F7F9F6] text-[#1E3F20] font-['Geist']">
      
      {/* Category Pills Header */}
      <div className="bg-white border-b border-[#E8EDDF] px-4 py-2.5 overflow-x-auto no-scrollbar flex items-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-['Outfit'] font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeCategory === cat
                ? 'bg-[#1E3F20] text-white shadow-xs'
                : 'bg-[#F4F7F1] text-[#667360] hover:text-[#1E3F20]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Subcategory Filter Pills */}
      <div className="px-4 py-2 overflow-x-auto no-scrollbar flex items-center gap-2 bg-[#FAFBF9] border-b border-[#E8EDDF]">
        {subcats.map((sc) => (
          <button
            key={sc}
            onClick={() => setActiveSubcat(sc)}
            className={`px-3 py-1 rounded-lg text-[11px] font-['Geist_Mono'] font-medium whitespace-nowrap transition-colors cursor-pointer ${
              activeSubcat === sc
                ? 'bg-[#E8F3D6] text-[#1E3F20] font-bold'
                : 'text-[#667360] hover:text-[#1E3F20]'
            }`}
          >
            {sc}
          </button>
        ))}
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-6">

        {/* Hero Banner: AeroStride / Moss */}
        <div className="relative bg-[#1A2E1C] text-white rounded-3xl overflow-hidden shadow-xl mb-10 border border-[#2D5A30]">
          <div className="p-6 sm:p-10 max-w-xl relative z-10">
            <span className="inline-flex items-center gap-1.5 bg-[#84BD3A]/20 text-[#84BD3A] px-3 py-1 rounded-full text-[10px] font-['Geist_Mono'] font-bold tracking-widest uppercase mb-4 border border-[#84BD3A]/30">
              <Sparkles size={11} /> 2026 FLAGSHIP RELEASE
            </span>

            <h1 className="font-['Outfit'] font-bold text-4xl sm:text-5xl text-white tracking-tight leading-[1.05] mb-3">
              AeroStride | Moss
            </h1>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed mb-6 font-['Geist']">
              Daily energy return 24/7. Engineered with an 18mm heel-drop sole, kinetic rebound foam, and certified orthotic arch support.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigate('product')}
                className="bg-[#84BD3A] hover:bg-[#95cf45] text-[#1E3F20] font-bold px-7 py-3.5 rounded-full text-xs font-['Outfit'] uppercase tracking-wider transition shadow-lg flex items-center gap-2 cursor-pointer"
              >
                <span>SHOP CLOUDWALK</span>
                <ArrowRight size={15} />
              </button>
              <button
                onClick={() => onNavigate('shop')}
                className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3.5 rounded-full text-xs font-['Outfit'] uppercase tracking-wider transition border border-white/20 cursor-pointer"
              >
                EXPLORE CATALOG
              </button>
            </div>
          </div>

          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-25 sm:opacity-50 pointer-events-none overflow-hidden">
            <img
              src="/assets/product-thumbnail.png"
              alt="Sandal Spotlight"
              className="w-full h-full object-contain object-right"
            />
          </div>
        </div>

        {/* Section: "Built step by step." */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-[10px] font-['Geist_Mono'] font-bold text-[#667360] uppercase tracking-wider">
                01 / EXPLORE · THE ANATOMY OF COMFORT
              </span>
              <h2 className="font-['Outfit'] font-bold text-2xl sm:text-3xl text-[#1E3F20]">
                Built step by step.
              </h2>
            </div>
            <button
              onClick={() => onNavigate('shop')}
              className="text-xs font-bold font-['Geist_Mono'] text-[#1E3F20] hover:text-[#84BD3A] flex items-center gap-1 transition cursor-pointer"
            >
              <span>View All</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
            {stepCards.map((card, i) => (
              <div
                key={i}
                onClick={() => onNavigate(card.page)}
                className="bg-white rounded-2xl p-4 border border-[#E8EDDF] shadow-xs hover:shadow-md transition-all group cursor-pointer flex flex-col justify-between"
              >
                <div className="flex items-center justify-between text-[10px] font-['Geist_Mono'] font-bold text-[#667360] mb-2">
                  <span>{card.num}</span>
                  <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#1E3F20]" />
                </div>

                <div className="h-32 bg-[#FAFBF9] rounded-xl flex items-center justify-center p-2 mb-3 overflow-hidden">
                  <img
                    src={card.img}
                    alt={card.title}
                    className="w-full h-full object-contain filter drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div>
                  <h4 className="font-['Outfit'] font-bold text-sm text-[#1E3F20] mb-0.5">
                    {card.title}
                  </h4>
                  <p className="text-[11px] text-[#667360]">
                    {card.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Trust Marquee Strip */}
        <div className="bg-[#E8F3D6] text-[#1E3F20] rounded-2xl p-4 mb-12 border border-[#D5E5BC] shadow-xs flex flex-wrap items-center justify-around gap-4 text-center">
          <div className="flex items-center gap-2 text-xs font-bold">
            <ShieldCheck size={18} className="text-[#2D5A30]" />
            <span>COMFORT GUARANTEED</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold">
            <RefreshCw size={18} className="text-[#2D5A30]" />
            <span>30-DAY FREE TRIAL</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold">
            <Star size={18} fill="#2D5A30" className="text-[#2D5A30]" />
            <span>50,000+ HAPPY WALKERS</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold">
            <Truck size={18} className="text-[#2D5A30]" />
            <span>24-HOUR DISPATCH</span>
          </div>
        </div>

        {/* Comfort features built into every pair */}
        <section className="mb-12">
          <h2 className="font-['Outfit'] font-bold text-2xl text-[#1E3F20] mb-4">Built into every pair</h2>
          <FeatureStrip variant="compact" />
        </section>

        {/* Brand Ambassador Spotlight: rotates through the ambassadors */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8EDDF] shadow-sm mb-12" aria-label="Our ambassadors">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            {/* Visual Card */}
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-[#E8EDDF] group">
              <div className="relative w-full h-[380px]">
                {AMBASSADORS.map((a, i) => (
                  <img
                    key={a.id}
                    src={a.image}
                    alt={i === spotIndex ? `${a.name}, MediFeet ambassador` : ''}
                    aria-hidden={i !== spotIndex || undefined}
                    className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-700 ${i === spotIndex ? 'opacity-100' : 'opacity-0'}`}
                  />
                ))}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-6">
                <span className="bg-[#84BD3A] text-[#1E3F20] text-[9.5px] font-['Geist_Mono'] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider w-fit mb-2">
                  BRAND AMBASSADOR
                </span>
                <h4 className="font-['Outfit'] font-bold text-xl text-white">
                  {spot.name} x MediFeet
                </h4>
                <div className="flex gap-1.5 pt-3">
                  {AMBASSADORS.map((a, i) => (
                    <button
                      key={a.id}
                      onClick={() => setSpotIndex(i)}
                      aria-label={`Show ${a.name}`}
                      aria-current={i === spotIndex || undefined}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${i === spotIndex ? 'w-6 bg-[#84BD3A]' : 'w-1.5 bg-white/50'}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Story & Quote */}
            <div>
              <span className="text-[10px] font-['Geist_Mono'] font-bold text-[#667360] uppercase tracking-widest block mb-2">
                AMBASSADOR SPOTLIGHT
              </span>
              <h3 className="font-['Outfit'] font-bold text-2xl sm:text-3xl text-[#1E3F20] mb-4 leading-tight">
                {spot.tagline}
              </h3>
              <p className="text-xs sm:text-sm text-[#667360] leading-relaxed mb-6">
                Our ambassadors share our mission: footwear designed around everyday comfort, thoughtful medical support, and effortless style.
              </p>

              <div className="flex items-center gap-3 mb-6 p-3 bg-[#F7F9F6] rounded-xl border border-[#E8EDDF]">
                <div className="w-10 h-10 rounded-full bg-[#1E3F20] text-white flex items-center justify-center font-bold text-sm">
                  {spot.name.split(' ').map((w) => w[0]).join('')}
                </div>
                <div>
                  <h5 className="font-['Outfit'] font-bold text-sm text-[#1E3F20]">{spot.name}</h5>
                  <p className="text-[11px] text-[#667360]">{spot.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => onNavigate('shop')}
                  className="bg-[#1E3F20] hover:bg-[#285424] text-white font-bold px-6 py-3 rounded-full text-xs font-['Outfit'] uppercase tracking-wider transition shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <span>SHOP THE CAMPAIGN</span>
                  <ArrowRight size={14} />
                </button>
                <button
                  onClick={() => onNavigate('product')}
                  className="bg-[#E8F3D6] hover:bg-[#d8e8c0] text-[#1E3F20] font-bold px-5 py-3 rounded-full text-xs font-['Outfit'] uppercase tracking-wider transition cursor-pointer"
                >
                  CLOUDWALK PDP
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* Featured Products Catalog & Quick View */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-[10px] font-['Geist_Mono'] font-bold text-[#667360] uppercase tracking-wider">
                LATEST DROPS · 2026 EDITION
              </span>
              <h2 className="font-['Outfit'] font-bold text-2xl sm:text-3xl text-[#1E3F20]">
                New energy. Serious comfort.
              </h2>
            </div>
            <button
              onClick={() => onNavigate('shop')}
              className="text-xs font-bold font-['Geist_Mono'] text-[#1E3F20] hover:text-[#84BD3A] flex items-center gap-1 transition cursor-pointer"
            >
              <span>Explore All (6)</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {featuredCatalog.map((prod) => (
              <div
                key={prod.id}
                className="bg-white rounded-2xl p-4 border border-[#E8EDDF] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[9px] font-['Geist_Mono'] font-bold bg-[#E8F3D6] text-[#1E3F20] px-2 py-0.5 rounded-md uppercase">
                      {prod.tag}
                    </span>
                    <span className="text-xs font-semibold text-[#1E3F20]">
                      ★ {prod.rating}
                    </span>
                  </div>

                  <div 
                    onClick={() => onNavigate(prod.featured ? 'product' : 'shop')}
                    className="h-44 bg-[#FAFBF9] rounded-xl flex items-center justify-center p-3 mb-3 cursor-pointer overflow-hidden group"
                  >
                    <img
                      src={prod.img}
                      alt={prod.name}
                      className="w-full h-full object-contain filter drop-shadow-sm group-hover:scale-105 transition-transform"
                    />
                  </div>

                  <h4 
                    onClick={() => onNavigate(prod.featured ? 'product' : 'shop')}
                    className="font-['Outfit'] font-bold text-base text-[#1E3F20] mb-0.5 cursor-pointer hover:underline"
                  >
                    {prod.name}
                  </h4>
                  <p className="text-xs text-[#667360] mb-2">{prod.desc}</p>
                </div>

                <div className="pt-3 border-t border-[#E8EDDF] flex items-center justify-between">
                  <div>
                    <span className="font-['Outfit'] font-bold text-lg text-[#1E3F20]">
                      ₹{prod.price.toLocaleString('en-IN')}
                    </span>
                    <span className="block text-[10px] text-gray-400 line-through">
                      ₹{prod.origPrice.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      addToCart({
                        id: prod.id,
                        title: prod.name,
                        color: 'Classic',
                        size: 6,
                        price: prod.price,
                        image: prod.img,
                      });
                    }}
                    className="bg-[#1E3F20] hover:bg-[#285424] text-white text-xs font-bold px-3.5 py-2 rounded-xl transition cursor-pointer shadow-xs"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Quick View Interactive Component */}
          <div className="bg-[#F0F4EC] rounded-2xl p-5 border border-[#D5E5BC] shadow-xs">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-white rounded-xl p-1 shrink-0 flex items-center justify-center border border-gray-200 shadow-xs">
                  <img
                    src="/assets/product-thumbnail.png"
                    alt="Quick View Sandal"
                    className="w-full h-full object-contain mix-blend-multiply"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-['Geist_Mono'] font-bold text-[#84BD3A] bg-[#1E3F20] px-2 py-0.5 rounded-full uppercase">
                    FEATURED QUICK VIEW
                  </span>
                  <h4 className="font-['Outfit'] font-bold text-lg text-[#1E3F20] mt-1">
                    CloudWalk Perfect Sandal · Stone Beige
                  </h4>
                  <p className="text-xs text-[#667360]">
                    Podiatrist approved 18mm arch support with shock absorbing foam.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="flex items-center gap-1">
                  {[4, 5, 6, 7, 8].map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setQuickViewSize(sz)}
                      className={`w-8 h-8 rounded-lg text-xs font-bold font-['Geist_Mono'] transition-all cursor-pointer ${
                        quickViewSize === sz
                          ? 'bg-[#1E3F20] text-white shadow-xs'
                          : 'bg-white text-[#1E3F20] hover:bg-gray-100'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => {
                    addToCart({
                      id: 'cloudwalk-stone-beige',
                      title: 'CloudWalk Perfect Sandal',
                      color: 'Stone Beige',
                      size: quickViewSize,
                      price: 2499,
                      image: '/assets/product-thumbnail.png',
                    });
                  }}
                  className="bg-[#84BD3A] hover:bg-[#95cf45] text-[#1E3F20] font-bold px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider transition shadow-sm cursor-pointer whitespace-nowrap"
                >
                  ADD TO CART · ₹2,499
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Community UGC Reviews ("Seen on feet. Proven in life.") */}
        <section className="mb-12">
          <div className="mb-4">
            <span className="text-[10px] font-['Geist_Mono'] font-bold text-[#667360] uppercase tracking-wider">
              COMMUNITY STORIES
            </span>
            <h2 className="font-['Outfit'] font-bold text-2xl sm:text-3xl text-[#1E3F20]">
              Seen on feet. Proven in life.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5">
            {communityReviews.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-4 border border-[#E8EDDF] shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-['Geist_Mono'] text-[#667360] mb-2">
                    <span className="font-bold text-[#1E3F20]">{item.handle}</span>
                    <span className="bg-[#E8F3D6] text-[#1E3F20] px-1.5 py-0.5 rounded text-[8.5px] font-bold">
                      {item.tag}
                    </span>
                  </div>
                  <p className="text-xs text-[#2D332D] leading-relaxed mb-4">
                    "{item.quote}"
                  </p>
                </div>
                <div className="pt-2 border-t border-[#E8EDDF] flex items-center justify-between text-[10px] text-[#667360]">
                  <span className="text-yellow-600 font-bold">★★★★★</span>
                  <span>{item.likes} verified</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Interactive Fit Finder Quiz */}
        <section className="bg-[#1E3F20] text-white rounded-3xl p-6 sm:p-10 mb-12 shadow-xl border border-[#2D5A30]">
          <div className="max-w-xl">
            <span className="text-[10px] font-['Geist_Mono'] font-bold text-[#84BD3A] uppercase tracking-widest block mb-2">
              QUIZ · 30 SECONDS
            </span>
            <h3 className="font-['Outfit'] font-bold text-2xl sm:text-3xl text-white mb-2 leading-tight">
              What does your day ask of your shoes?
            </h3>
            <p className="text-xs text-white/70 mb-5 leading-relaxed">
              Tell us your everyday motion pattern, and we'll calculate your orthotic comfort prescription.
            </p>

            <div className="space-y-2 mb-6">
              {[
                'On my feet for 6+ hours (Medical, Teaching, Retail)',
                'Walking 8,000+ steps across city streets',
                'Switching between desk & light movement'
              ].map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => setQuizAnswer(idx)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center justify-between ${
                    quizAnswer === idx
                      ? 'bg-[#84BD3A] text-[#1E3F20] font-bold shadow-md'
                      : 'bg-white/10 text-white hover:bg-white/15'
                  }`}
                >
                  <span>{opt}</span>
                  {quizAnswer === idx && <CheckCircle2 size={16} />}
                </button>
              ))}
            </div>

            {quizAnswer !== null && (
              <div className="bg-white/10 rounded-2xl p-4 border border-[#84BD3A]/30 mb-4 animate-fade-in">
                <span className="text-[10px] font-['Geist_Mono'] font-bold text-[#84BD3A] uppercase tracking-wider block mb-1">
                  RECOMMENDED MATCH · 98% COMPATIBLE
                </span>
                <h5 className="font-['Outfit'] font-bold text-base text-white">
                  CloudWalk Perfect Sandal (With 18mm Medial Arch Cradle)
                </h5>
                <p className="text-xs text-white/80 mb-3">
                  Reduces plantar fascia tension by 42% for extended standing hours.
                </p>
                <button
                  onClick={() => onNavigate('product')}
                  className="bg-[#84BD3A] text-[#1E3F20] px-4 py-2 rounded-lg text-xs font-bold hover:bg-[#95cf45] transition cursor-pointer"
                >
                  View CloudWalk Sandal →
                </button>
              </div>
            )}
          </div>
        </section>

        {/* FAQ Accordion */}
        <section className="mb-12">
          <div className="mb-4">
            <span className="text-[10px] font-['Geist_Mono'] font-bold text-[#667360] uppercase tracking-wider">
              GOT QUESTIONS?
            </span>
            <h2 className="font-['Outfit'] font-bold text-2xl text-[#1E3F20]">
              Frequently asked questions.
            </h2>
          </div>

          <div className="space-y-2">
            {[
              {
                q: 'Which styles work best for wide feet?',
                a: 'All MediFeet footwear, including CloudWalk, features an anatomical ergonomic footbed with ample forefoot volume and adjustable straps that comfortably accommodate wide feet without pinching.'
              },
              {
                q: 'How does the 30-day risk-free trial work?',
                a: 'Wear them indoors or at home for up to 30 days. If your feet do not feel noticeably more supported and pain-free, exchange them for another size or return them for a 100% full refund.'
              },
              {
                q: 'Can I exchange for a different size?',
                a: 'Yes, absolutely. We offer free size exchanges. If your size feels slightly too snug or loose, our courier will pick up the pair from your doorstep at zero extra charge.'
              },
              {
                q: 'Are MediFeet shoes podiatrist certified?',
                a: 'Yes. Every model is biomechanically engineered and evaluated by certified orthotic specialists and podiatrists for plantar pressure relief and arch stabilization.'
              }
            ].map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#E8EDDF] overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-4 text-left font-['Outfit'] font-bold text-sm text-[#1E3F20] flex items-center justify-between cursor-pointer hover:bg-gray-50 transition"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-300 ${openFaq === idx ? 'rotate-180 text-[#84BD3A]' : 'text-gray-400'}`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-4 pb-4 pt-1 text-xs text-[#667360] leading-relaxed border-t border-gray-100">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default HomePage;
