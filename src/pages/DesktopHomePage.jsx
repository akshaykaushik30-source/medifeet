import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, Pause, ArrowRight, ArrowLeft, Star, ShieldCheck, Heart, ShoppingBag, 
  Search, User, MapPin, CheckCircle2, ChevronRight, X, Volume2, VolumeX,
  Layers, Sparkles, Footprints, Check, Eye, Award, Maximize2,
  RefreshCw, Headphones, Truck, Banknote
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import DesktopHeader from '../components/DesktopHeader';
import FeatureStrip from '../components/FeatureStrip';

const InstagramIcon = ({ size = 16, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

// Section Dividing Strip (Trust Marquee Banner matching Figma & user upload)
const SectionTrustDivider = () => {
  const trustFeatures = [
    { icon: RefreshCw, label: 'EASY EXCHANGE & RETURN' },
    { icon: ShieldCheck, label: 'SECURED PAYMENT' },
    { icon: Headphones, label: '24 X 7 CHATBOT SUPPORT' },
    { icon: Truck, label: 'FREE SHIPPING' },
    { icon: Banknote, label: 'CASH ON DELIVERY' },
  ];

  // Quadruple for seamless infinite marquee scroll
  const repeatedFeatures = [...trustFeatures, ...trustFeatures, ...trustFeatures, ...trustFeatures];

  return (
    <div className="w-full bg-[#1E3F20] text-white py-3 sm:py-3.5 overflow-hidden border-y border-[#2B4728] relative select-none shadow-inner z-20">
      <div className="animate-marquee flex items-center gap-10 sm:gap-14 whitespace-nowrap">
        {repeatedFeatures.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="flex items-center gap-2.5 shrink-0 group/item cursor-default">
              <div className="w-6 h-6 rounded-full border border-white/40 flex items-center justify-center text-white group-hover/item:border-[#84BD3A] group-hover/item:text-[#84BD3A] group-hover/item:scale-110 transition-transform">
                <Icon size={12} strokeWidth={2.4} />
              </div>
              <span className="font-['Outfit'] font-bold text-[11px] sm:text-[12px] tracking-wider text-white group-hover/item:text-[#84BD3A] transition-colors">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// One reel in the community strip: poster at rest, muted preview on hover,
// full video with sound on click.
const StoryReelCard = ({ story, onOpen, hidden }) => {
  const videoRef = useRef(null);
  const preview = (play) => {
    const video = videoRef.current;
    if (!video) return;
    if (play) {
      video.play().catch(() => {});
    } else {
      video.pause();
      video.currentTime = 0;
    }
  };

  return (
    <button
      type="button"
      onClick={onOpen}
      onMouseEnter={() => preview(true)}
      onMouseLeave={() => preview(false)}
      onFocus={() => preview(true)}
      onBlur={() => preview(false)}
      aria-label={`Play ${story.name}: ${story.title}`}
      aria-hidden={hidden || undefined}
      tabIndex={hidden ? -1 : 0}
      className="group relative w-[260px] sm:w-[280px] aspect-[9/16] shrink-0 rounded-3xl overflow-hidden bg-[#1A3520] ring-1 ring-white/10 hover:ring-2 hover:ring-[#84BD3A] focus-visible:ring-2 focus-visible:ring-[#84BD3A] outline-none shadow-xl transition hover:-translate-y-1 cursor-pointer text-left"
    >
      <img src={story.image} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
      <video
        ref={videoRef}
        src={story.video}
        muted
        loop
        playsInline
        preload="none"
        className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/25" />

      <span className="absolute top-4 left-4 bg-black/45 backdrop-blur-md text-white text-[11px] font-['Geist_Mono'] px-2.5 py-1 rounded-full">
        {story.time}
      </span>

      <div className="absolute inset-x-0 bottom-0 p-5 space-y-1.5">
        <p className="text-[11px] font-['Geist_Mono'] text-[#84BD3A]">{story.handle}</p>
        <p className="font-['Outfit'] font-bold text-base text-white leading-snug">{story.name}</p>
        <p className="text-xs text-white/75 leading-relaxed line-clamp-2">{story.title}</p>
      </div>
    </button>
  );
};

export const DesktopHomePage = ({ onNavigate }) => {
  const { addToCart, setIsCartOpen, cartCount, wishlist, toggleWishlist } = useCart();

  // ---------------------------------------------------------------------------
  // INTERACTIVE STATES
  // ---------------------------------------------------------------------------
  const [toastMessage, setToastMessage] = useState(null);

  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [activeVideoSrc, setActiveVideoSrc] = useState('/assets/video-concept.mp4');
  const [activeVideoTitle, setActiveVideoTitle] = useState('');
  const [activeVideoInstagramUrl, setActiveVideoInstagramUrl] = useState('');
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  
  // Comfort Technology Interactive Video States
  const [selectedTechIdx, setSelectedTechIdx] = useState(0);

  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [quickViewSize, setQuickViewSize] = useState(8);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [footerEmail, setFooterEmail] = useState('');

  const triggerToast = (itemName) => {
    setToastMessage(`Added "${itemName}" to your shopping bag!`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const openVideoModal = (src, title, igUrl) => {
    setActiveVideoSrc(src || '/assets/video-concept.mp4');
    setActiveVideoTitle(title || 'Community Comfort Journey');
    setActiveVideoInstagramUrl(igUrl || '');
    setIsVideoModalOpen(true);
  };

  // ---------------------------------------------------------------------------
  // DATA MODELS MATCHING FIGMA FRAME 19:6 & 192:5 EXACTLY
  // ---------------------------------------------------------------------------
  
  // Community & Ambassador Video Stories (Section 2 - Real MediFeet Instagram Reels)
  const ugcStories = [
    {
      id: 0,
      name: 'Shilpa Shetty Kundra',
      handle: '@theshilpashetty',
      tag: 'BRAND AMBASSADOR',
      title: 'A perfect blend of comfort, technology & style',
      time: '0:45',
      model: 'MediFeet Ortho Comfort · Signature Series',
      image: '/assets/medifeet-reel-5-shilpa-shetty-ambassador.jpg',
      video: '/assets/medifeet-reel-5-shilpa-shetty-ambassador.mp4',
      instagramUrl: 'https://www.instagram.com/reel/DdisRTgJQFi/',
      quote: 'Our Brand Ambassador Shilpa Shetty shares her experience with MediFeet. Truly walk the comfort way!'
    },
    {
      id: 1,
      name: 'Bobby Deol & Shilpa Shetty',
      handle: '@iambobbydeol',
      tag: 'CELEBRITY AMBASSADORS',
      title: 'Bobby Deol & Shilpa Shetty bring star power to MediFeet',
      time: '0:38',
      model: 'MediFeet Active Align · Power Walk',
      image: '/assets/medifeet-reel-3-bobby-deol-shilpa-shetty.jpg',
      video: '/assets/medifeet-reel-3-bobby-deol-shilpa-shetty.mp4',
      instagramUrl: 'https://www.instagram.com/reel/DdGkZtmNKVk/',
      quote: 'Star power meets therapeutic orthopedic innovation. Step into the comfort revolution.'
    },
    {
      id: 2,
      name: 'MediFeet Comfort Sandals',
      handle: '@medifeet.care',
      tag: 'COMFORT IN MOTION',
      title: 'Comfort that keeps up with you all day',
      time: '0:35',
      model: 'MediFeet CloudWalk Sandal · Daily Recovery',
      image: '/assets/medifeet-reel-2-comfort-sandals.jpg',
      video: '/assets/medifeet-reel-2-comfort-sandals.mp4',
      instagramUrl: 'https://www.instagram.com/reel/Dc_RtMSh6nx/',
      quote: 'Step into MediFeet Sandals — designed to give your feet the support, cushioning, and effortless ease they deserve.'
    },
    {
      id: 3,
      name: 'Manjot Singh',
      handle: '@oyemanjot',
      tag: 'BUSINESS MEET 2026',
      title: 'Innovation, cushioning & real experience',
      time: '0:50',
      model: 'MediFeet SoleHealer · Ergonomic Fit',
      image: '/assets/medifeet-reel-4-manjot-business-meet.jpg',
      video: '/assets/medifeet-reel-4-manjot-business-meet.mp4',
      instagramUrl: 'https://www.instagram.com/reel/Ddf22eohyKD/',
      quote: 'Straight from the MediFeet Business Meet 2026 — an insightful conversation with @oyemanjot on all-day comfort.'
    },
    {
      id: 4,
      name: 'MediFeet Innovation Meet',
      handle: '@medifeet.care',
      tag: 'BRAND STORY',
      title: 'A celebration of innovation and partnerships',
      time: '1:02',
      model: 'MediFeet Biomechanical Collection',
      image: '/assets/medifeet-reel-1-business-meet.jpg',
      video: '/assets/medifeet-reel-1-business-meet.mp4',
      instagramUrl: 'https://www.instagram.com/reel/Dc59wy8BgDk/',
      quote: 'Moving MediFeet forward with cutting-edge orthopedic design, quality materials, and a passionate community.'
    }
  ];

  // Featured Comfort Products (Section 3)
  const featuredProducts = [
    {
      id: 'cloudwalk-sandal',
      name: 'CloudWalk Sandal',
      price: 2499,
      formattedPrice: '₹2,499',
      rating: 4.8,
      reviews: '1.2k',
      badge: 'Best Seller',
      desc: 'Soft, breathable comfort for warm days and easy recovery.',
      image: '/assets/medifeet_home/img_33_192_101_image_container.png',
      gender: 'women',
      sizes: [4, 5, 6, 7, 8, 9]
    },
    {
      id: 'archrestore-knit',
      name: 'ArchRestore Knit',
      price: 4899,
      formattedPrice: '₹4,899',
      rating: 4.9,
      reviews: '980',
      badge: 'Best Seller',
      desc: 'Knit comfort with balanced arch support for all-day wear.',
      image: '/assets/medifeet_home/img_34_192_121_image_container.png',
      gender: 'men',
      sizes: [7, 8, 9, 10, 11, 12]
    },
    {
      id: 'solehealer-slip-on',
      name: 'SoleHealer Slip-On',
      price: 3299,
      formattedPrice: '₹3,299',
      rating: 4.7,
      reviews: '850',
      badge: 'Best Seller',
      desc: 'Effortless slip-on with targeted heel spur relief.',
      image: '/assets/medifeet_home/img_35_192_141_image_container.png',
      gender: 'unisex',
      sizes: [6, 7, 8, 9, 10, 11]
    },
    {
      id: 'orthogrip-walking-shoe',
      name: 'OrthoGrip Walking Shoe',
      price: 3799,
      formattedPrice: '₹3,799',
      rating: 4.9,
      reviews: '1.4k',
      badge: 'Best Seller',
      desc: 'Engineered all-day traction with zero fatigue cushioning.',
      image: '/assets/medifeet_home/img_36_192_161_image_container.png',
      gender: 'men',
      sizes: [7, 8, 9, 10, 11, 12]
    }
  ];

  // Best Sellers (Section 5)
  const bestSellers = [
    {
      id: 'activealign-runner',
      name: 'ActiveAlign Runner',
      price: 4599,
      formattedPrice: '₹4,599',
      rating: 4.8,
      reviews: '1.6k',
      badge: 'Best Seller',
      desc: 'Responsive comfort for training, recovery, and active daily movement.',
      image: '/assets/medifeet_home/img_38_192_221_image_container.png',
      gender: 'unisex',
      sizes: [6, 7, 8, 9, 10, 11]
    },
    {
      id: 'theragrip-slide',
      name: 'TheraGrip Slide',
      price: 1899,
      formattedPrice: '₹1,899',
      rating: 4.5,
      reviews: '2.1k',
      badge: 'Best Seller',
      desc: 'Easy, grippy comfort for quick recovery and relaxed everyday wear.',
      image: '/assets/medifeet_home/img_39_192_241_image_container.png',
      gender: 'unisex',
      sizes: [5, 6, 7, 8, 9, 10]
    },
    {
      id: 'aeroflex-oxford',
      name: 'AeroFlex Oxford',
      price: 4299,
      formattedPrice: '₹4,299',
      rating: 4.9,
      reviews: '840',
      badge: 'Best Seller',
      desc: 'Formal cap-toe leather with hidden ergonomic arch support.',
      image: '/assets/medifeet_home/img_40_192_261_image_container.png',
      gender: 'men',
      sizes: [7, 8, 9, 10, 11, 12]
    },
    {
      id: 'relaxstride-loafer',
      name: 'RelaxStride Loafer',
      price: 3899,
      formattedPrice: '₹3,899',
      rating: 4.7,
      reviews: '1.1k',
      badge: 'Best Seller',
      desc: 'Supple Italian milled leather driving loafer with zero heel rub.',
      image: '/assets/medifeet_home/img_41_192_281_image_container.png',
      gender: 'men',
      sizes: [7, 8, 9, 10, 11, 12]
    }
  ];

  // Community Stories Cards (Section 8)
  const testimonialCards = [
    {
      id: 1,
      duration: '2:45',
      name: "Dr. Priya's Recovery",
      desc: 'After plantar fasciitis surgery, CloudWalk helped her get back on her feet faster and feel steadier every day.',
      image: '/assets/medifeet_home/img_51_192_325_story_card.png',
      video: '/assets/video-concept.mp4'
    },
    {
      id: 2,
      duration: '1:30',
      name: "Rahul's Marathon Journey",
      desc: 'From recovery days to race day, Rahul shares how these shoes kept every mile feeling lighter and steadier.',
      image: '/assets/medifeet_home/img_52_192_334_story_card.png',
      video: '/assets/video-lifestyle-walk.mp4'
    },
    {
      id: 3,
      duration: '3:12',
      name: "Anita's Work Day",
      desc: 'Long shifts used to leave her sore - now she can stand, walk, and lead through the day with ease.',
      image: '/assets/medifeet_home/img_53_192_343_story_card.png',
      video: '/assets/video-on-foot.mp4'
    },
    {
      id: 4,
      duration: '2:08',
      name: "Coach Vikram's Pick",
      desc: 'I recommend comfort-first footwear to every athlete who wants to train harder and recover faster.',
      image: '/assets/medifeet_home/img_54_192_352_story_card.png',
      video: '/assets/video-concept.mp4'
    }
  ];

  return (
    <div className="w-full bg-[#FFFFFF] text-[#111111] font-['Geist'] selection:bg-[#84BD3A] selection:text-[#1E3F20]">
      
      <DesktopHeader currentPage="home" onNavigate={onNavigate} />

      {/* ========================================================================= */}
      {/* 2. HERO BANNER: BOBBY DEOL AMBASSADOR SUITE (Figma Node 19:44)             */}
      {/* ========================================================================= */}
      <section className="bg-[#F7F4EF] pt-12 pb-16 px-8 relative overflow-hidden border-b border-[#E8E2D8]">
        <div className="max-w-[1440px] mx-auto grid grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Left Column: Ambassador Kicker & Title */}
          <div className="col-span-12 lg:col-span-4 space-y-5">
            <div className="inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#84BD3A]" />
              <span className="text-[11px] font-['Geist_Mono'] font-bold text-[#2C5F3E] tracking-widest uppercase">
                MEET OUR AMBASSADORS
              </span>
            </div>

            <h1 className="font-['Outfit'] font-black text-5xl lg:text-6xl text-[#2C5F3E] tracking-tight leading-none">
              Bobby Deol
            </h1>

            <p className="text-sm text-[#666666] leading-relaxed font-['Geist'] max-w-sm">
              Every step tells a story. Bobby Deol's starts with Medifeet.
            </p>

            <div className="pt-2">
              <button 
                onClick={() => onNavigate('men')}
                className="bg-[#1E3F20] hover:bg-[#285424] text-white px-8 py-4 rounded-full font-['Outfit'] font-bold text-xs uppercase tracking-wider transition-all shadow-lg hover:shadow-xl flex items-center gap-2.5 cursor-pointer active:scale-98"
              >
                <span>Shop Now</span>
                <ArrowRight size={14} className="text-[#84BD3A]" />
              </button>
            </div>

            {/* Slider Dots */}
            <div className="flex items-center gap-2 pt-6">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2C5F3E]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#2C5F3E]/40" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#2C5F3E]/40" />
            </div>
          </div>

          {/* Center Column: Portrait in Arch Frame */}
          <div className="col-span-12 lg:col-span-4 flex justify-center relative">
            <div className="relative w-full max-w-[380px] aspect-[4/5] rounded-t-[180px] rounded-b-3xl overflow-hidden shadow-2xl border-4 border-white bg-gradient-to-b from-[#84BD3A]/20 via-[#1E3F20]/10 to-[#1E3F20]/30 flex items-end justify-center group">
              <img 
                src="/assets/medifeet_home/img_0_35_104_bobby_deol_portrait.png" 
                alt="Bobby Deol wearing MediFeet"
                className="w-full h-full object-cover object-top select-none group-hover:scale-103 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Right Column: "Walk the Comfort Way" Headline & Description */}
          <div className="col-span-12 lg:col-span-4 space-y-4 lg:pl-6 text-left">
            <h2 className="font-['Outfit'] font-bold text-4xl lg:text-5xl text-[#2C5F3E] leading-tight">
              Walk the Comfort Way
            </h2>

            <p className="text-sm text-[#595959] leading-relaxed font-['Geist'] max-w-sm">
              Premium footwear designed for those who never compromise on comfort or style.
            </p>

            <div className="w-16 h-1 bg-[#6BA52D] rounded-full mt-4" />

            <div className="pt-2">
              <img 
                src="/assets/medifeet-brand-logo.png" 
                alt="MEDIFEET" 
                className="h-7 w-auto object-contain select-none"
              />
            </div>
          </div>

        </div>

        {/* Hero to UGC Bridge Indicator */}
        <div className="mt-12 flex justify-center">
          <a 
            href="#community-stories"
            className="bg-[#0D1F10] text-[#84BD3A] px-5 py-2.5 rounded-full text-xs font-['Geist_Mono'] font-bold flex items-center gap-2 shadow-lg border border-[#84BD3A]/30 hover:border-[#84BD3A] transition cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-[#84BD3A] animate-pulse" />
            <span>Community Stories ↓</span>
          </a>
        </div>
      </section>

      {/* Section Dividing Trust Marquee Strip */}
      <SectionTrustDivider />

      {/* ========================================================================= */}
      {/* 3. COMMUNITY VIDEO STORIES SECTION (Figma Node 196:623 - Dark Forest)      */}
      {/* ========================================================================= */}
      <section id="community-stories" className="bg-[#0D1F10] text-white py-20 px-8 relative overflow-hidden">
        
        {/* Top Decorative Dash Accent */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-12 h-0.5 bg-[#84BD3A]" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#84BD3A]" />
          <div className="w-28 h-0.5 bg-[#84BD3A]" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#84BD3A]" />
          <div className="w-28 h-0.5 bg-[#84BD3A]" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#84BD3A]" />
          <div className="w-12 h-0.5 bg-[#84BD3A]" />
        </div>

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="font-['Geist_Mono'] text-xs font-bold text-[#84BD3A] uppercase tracking-widest block mb-2">
            Real People, Real Comfort
          </span>
          <h2 className="font-['Outfit'] font-black text-4xl lg:text-5xl text-white tracking-tight mb-3">
            Stories from our <span className="text-[#84BD3A]">community</span>
          </h2>
          <p className="text-sm text-[#B7C6BC] leading-relaxed max-w-xl mx-auto font-['Geist']">
            Real customers sharing their everyday comfort journeys — unscripted, unfiltered, and honestly incredible.
          </p>
        </div>

        {/* Continuously moving reel strip; hover pauses it and previews a card */}
        <div className="reel-strip overflow-hidden -mx-8">
          <div className="reel-track gap-6 px-3 py-4">
            {[...ugcStories, ...ugcStories].map((story, i) => (
              <StoryReelCard
                key={`${story.id}-${i}`}
                story={story}
                hidden={i >= ugcStories.length}
                onOpen={() => openVideoModal(story.video, `${story.name} — ${story.model}`)}
              />
            ))}
          </div>
        </div>

        <div className="max-w-[1360px] mx-auto">
        {/* Bottom Social Proof Strip */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-[#84BD3A] text-[#1E3F20] flex items-center justify-center">
              <Star size={14} className="fill-[#1E3F20]" />
            </div>
            <span className="text-xs font-['Geist_Mono'] text-[#B7C6BC]">
              <strong className="text-white font-bold">4.9 / 5</strong> from 2,400+ verified customer reviews
            </span>
          </div>

          <button 
            onClick={() => triggerToast('Share your story dialog opened')}
            className="border border-white/30 hover:border-[#84BD3A] hover:text-[#84BD3A] text-white px-5 py-2.5 rounded-full text-xs font-['Outfit'] font-bold uppercase tracking-wider transition cursor-pointer"
          >
            Share Your Story
          </button>
        </div>

        </div>
      </section>

      {/* Section Dividing Trust Marquee Strip */}
      <SectionTrustDivider />

      {/* ========================================================================= */}
      {/* 4. FEATURED PRODUCTS SECTION (Figma Node 192:94)                           */}
      {/* ========================================================================= */}
      <section className="py-20 px-8 max-w-[1440px] mx-auto bg-white">
        
        {/* Section Header */}
        <div className="mb-12">
          <span className="font-['Geist_Mono'] text-xs font-bold text-[#1E3F20] uppercase tracking-widest block mb-2">
            Featured Comfort
          </span>
          <h2 className="font-['Outfit'] font-black text-4xl text-[#1E3F20] tracking-tight mb-2">
            Comfort that feels personal, not generic
          </h2>
          <p className="text-xs text-[#5F6B62] max-w-2xl font-['Geist']">
            A curated selection of premium comfort styles designed for long days, recovery, and everyday movement.
          </p>
        </div>

        {/* 4 Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map(prod => (
            <div 
              key={prod.id}
              className="bg-white rounded-3xl p-5 border border-gray-100 hover:border-[#84BD3A]/60 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Image Box */}
                <div 
                  onClick={() => setQuickViewProduct(prod)}
                  className="h-56 bg-[#F9FAF8] rounded-2xl flex items-center justify-center p-4 relative overflow-hidden cursor-pointer"
                >
                  <span className="absolute top-3 left-3 bg-white text-[#1E3F20] text-[10px] font-['Geist_Mono'] font-bold px-3 py-1 rounded-full shadow-xs border border-gray-100">
                    {prod.badge}
                  </span>
                  
                  <img 
                    src={prod.image} 
                    alt={prod.name}
                    className="max-h-44 object-contain group-hover:scale-106 transition-transform duration-500 select-none"
                  />

                  {/* Quick View Hover Tag */}
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white text-[#1E3F20] px-4 py-1.5 rounded-full text-xs font-['Outfit'] font-bold shadow-md flex items-center gap-1.5">
                      <Eye size={13} />
                      <span>Quick View</span>
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="pt-4 space-y-1">
                  <div className="flex items-baseline justify-between">
                    <h3 
                      onClick={() => setQuickViewProduct(prod)}
                      className="font-['Outfit'] font-bold text-base text-[#1E3F20] group-hover:text-[#84BD3A] transition cursor-pointer"
                    >
                      {prod.name}
                    </h3>
                    <span className="text-xs font-['Geist_Mono'] text-gray-500">
                      ★ {prod.rating}
                    </span>
                  </div>

                  <p className="text-xs text-[#5F6B62] line-clamp-2 leading-relaxed">
                    {prod.desc}
                  </p>
                </div>
              </div>

              {/* Price & Add to Bag CTA */}
              <div className="pt-4 border-t border-gray-100 mt-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-['Outfit'] font-bold text-lg text-[#1E3F20]">
                    {prod.formattedPrice}
                  </span>
                  <span className="text-[10px] font-['Geist_Mono'] text-[#84BD3A] font-bold">
                    IN STOCK
                  </span>
                </div>

                <button 
                  onClick={() => {
                    addToCart({
                      id: prod.id,
                      name: prod.name,
                      price: prod.price,
                      image: prod.image,
                      size: prod.sizes[1]
                    });
                    triggerToast(prod.name);
                  }}
                  className="w-full bg-[#1E3F20] hover:bg-[#285424] text-white py-3 rounded-full font-['Outfit'] font-bold text-xs uppercase tracking-wider transition shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <ShoppingBag size={14} className="text-[#84BD3A]" />
                  <span>Add to Bag</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 5. COMFORT TECHNOLOGY SECTION (Figma Node 192:180 - Interactive Video)     */}
      {/* ========================================================================= */}
      {(() => {
        const techFeatures = [
          {
            id: 0,
            title: 'Everyday Lifestyle Walk',
            tag: 'NATURAL WALKING STRIDE',
            video: '/assets/video-lifestyle-walk.mp4',
            poster: '/assets/medifeet_home/img_37_192_181_visual_column.png',
            badge: 'Everyday Comfort',
            headline: 'Designed to feel good from your first step to your last.',
            desc: 'Supportive structure, softer landings, and a more natural stride — all built to carry you comfortably through the day.',
            icon: Footprints,
            cardTitle: 'Everyday Walking',
            cardDesc: 'Outdoor-tested all-day comfort designed for effortless natural movement on any surface.'
          },
          {
            id: 1,
            title: 'Cloud Cushioning',
            tag: 'HEEL & MIDSOLE SHOCK ABSORPTION',
            video: '/assets/video-cushioning.mp4',
            poster: '/assets/medifeet_home/img_37_192_181_visual_column.png',
            badge: 'Cloud Cushioning',
            headline: 'Soft, responsive impact absorption with every step.',
            desc: 'Dual-density compressed sole absorbs 95% of strike shock and returns energy smoothly into your stride.',
            icon: Layers,
            cardTitle: 'Cloud Cushioning',
            cardDesc: 'Soft, responsive cushioning makes every step feel light and smooth, helping you stay comfortable from morning to night.'
          },
          {
            id: 2,
            title: 'All-Day Support',
            tag: 'ANATOMICAL ARCH BRIDGE',
            video: '/assets/video-tech-arch-support.mp4',
            poster: '/assets/medifeet_home/img_37_192_181_visual_column.png',
            badge: 'All-Day Support',
            headline: 'Balanced anatomical arch support aligns your entire body.',
            desc: 'Contoured orthopedic arch alignment cradles the foot, relieving plantar fascia tension on hard floors.',
            icon: ShieldCheck,
            cardTitle: 'All-Day Support',
            cardDesc: 'A balanced footbed keeps your stride feeling stable and supported, so long days still feel easy and effortless.'
          },
          {
            id: 3,
            title: 'Adaptive Comfort',
            tag: 'PLUSH MEMORY CONTOUR',
            video: '/assets/video-tech-foam.mp4',
            poster: '/assets/medifeet_home/img_37_192_181_visual_column.png',
            badge: 'Adaptive Memory Foam',
            headline: 'Custom plush contouring that molds to your unique foot.',
            desc: 'High-rebound memory foam adapts to your unique pressure points for custom, zero-pressure everyday walking.',
            icon: Sparkles,
            cardTitle: 'Adaptive Comfort',
            cardDesc: 'Plush comfort adapts to the shape of your feet, giving you a personalized feel that moves naturally with your day.'
          }
        ];

        // Default to lifestyle walk (0) or active selected
        const activeTech = techFeatures[selectedTechIdx] || techFeatures[0];
        const techCardList = techFeatures.slice(1, 4); // The 3 cards matching screenshot

        return (
          <section className="bg-[#F7F9F6] py-16 lg:py-24 px-6 sm:px-8 lg:px-12 border-y border-[#E8EDE5]">
            <div className="max-w-[1440px] mx-auto grid grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Interactive Video Player matching Figma screenshot */}
              <div className="col-span-12 lg:col-span-5 relative">
                
                <div className="rounded-[28px] overflow-hidden aspect-[4/5] min-h-[500px] relative shadow-2xl border-4 border-white bg-black group">
                  <video
                    key={activeTech.video}
                    src={activeTech.video}
                    poster={activeTech.poster}
                    autoPlay
                    loop
                    muted
                    playsInline
                    aria-hidden="true"
                    className="w-full h-full object-cover select-none animate-[fadeIn_0.5s_ease]"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/30 p-6 flex flex-col justify-between pointer-events-none">
                    
                    {/* Top Bar inside Video Card */}
                    <div className="flex items-center justify-between pointer-events-auto">
                      <div className="bg-white/95 backdrop-blur-md text-[#1E3F20] text-xs font-['Outfit'] font-bold px-4 py-2 rounded-full shadow-md flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#84BD3A]" />
                        <span>{activeTech.badge}</span>
                      </div>
                    </div>

                    {/* Bottom Info Card matching user uploaded screenshot exactly */}
                    <div className="bg-[#212420]/85 backdrop-blur-md p-6 rounded-[20px] border border-white/10 text-white space-y-2 pointer-events-auto shadow-2xl">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-['Geist_Mono'] text-[#84BD3A] uppercase font-bold tracking-wider">
                          {activeTech.tag}
                        </span>
                      </div>
                      <h4 className="font-['Outfit'] font-bold text-lg sm:text-xl leading-snug">
                        {activeTech.headline}
                      </h4>
                      <p className="text-xs sm:text-[13px] text-[#D7E1D9] leading-relaxed font-['Geist']">
                        {activeTech.desc}
                      </p>
                    </div>

                  </div>
                </div>
              </div>

              {/* Right Column: Comfort Technology Stack */}
              <div className="col-span-12 lg:col-span-7 space-y-6">
                <div>
                  <span className="font-['Geist_Mono'] text-xs font-bold text-[#1E3F20] uppercase tracking-[0.2em] block mb-2">
                    COMFORT TECHNOLOGY
                  </span>
                  <h2 className="font-['Outfit'] font-black text-3xl sm:text-4xl lg:text-[42px] text-[#1E3F20] tracking-tight leading-tight mb-3">
                    Comfort Made for Every Day
                  </h2>
                  <p className="text-[14px] text-[#5F6B62] leading-relaxed max-w-xl font-['Geist']">
                    A premium look at the comfort details that help every walk, workday, and long mile feel steadier, softer, and more natural.
                  </p>
                </div>

                {/* Feature list: hovering or tapping a feature shows it in the video */}
                <div className="space-y-3" role="list">
                  {techCardList.map((feat) => {
                    const Icon = feat.icon;
                    const isActive = selectedTechIdx === feat.id;
                    return (
                      <button
                        type="button"
                        role="listitem"
                        key={feat.id}
                        onClick={() => setSelectedTechIdx(feat.id)}
                        onMouseEnter={() => setSelectedTechIdx(feat.id)}
                        onFocus={() => setSelectedTechIdx(feat.id)}
                        aria-current={isActive || undefined}
                        className={`w-full text-left rounded-2xl p-5 sm:p-6 flex items-start gap-5 border transition-colors duration-300 cursor-pointer ${
                          isActive
                            ? 'bg-white border-[#84BD3A] shadow-[0_8px_30px_rgba(30,63,32,0.08)]'
                            : 'bg-white/60 border-[#E8EDE5] hover:bg-white'
                        }`}
                      >
                        <span className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300 ${
                          isActive ? 'bg-[#1E3F20] text-[#84BD3A]' : 'bg-[#E8EFE3] text-[#1E3F20]'
                        }`}>
                          <Icon size={22} strokeWidth={2} />
                        </span>
                        <span className="flex-1 space-y-1.5">
                          <span className="block font-['Outfit'] font-bold text-[17px] text-[#1E3F20]">{feat.cardTitle}</span>
                          <span className="block text-sm text-[#5F6B62] leading-relaxed">{feat.cardDesc}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Bottom Link matching screenshot */}
                <div className="pt-2">
                  <button 
                    onClick={() => onNavigate('about')}
                    className="inline-flex items-center gap-2 font-['Outfit'] font-bold text-sm text-[#1E3F20] hover:text-[#84BD3A] transition cursor-pointer group"
                  >
                    <span>Learn More About Our Technology</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform text-[#1E3F20] group-hover:text-[#84BD3A]" />
                  </button>
                </div>

              </div>

            </div>
          </section>
        );
      })()}

      <FeatureStrip />

      {/* ========================================================================= */}
      {/* 6. BEST SELLERS SECTION (Figma Node 192:214)                              */}
      {/* ========================================================================= */}
      <section className="py-20 px-8 max-w-[1440px] mx-auto bg-white">
        
        {/* Section Header */}
        <div className="mb-12">
          <span className="font-['Geist_Mono'] text-xs font-bold text-[#1E3F20] uppercase tracking-widest block mb-2">
            Best Sellers
          </span>
          <h2 className="font-['Outfit'] font-black text-4xl text-[#1E3F20] tracking-tight mb-2">
            The styles customers love most
          </h2>
          <p className="text-xs text-[#5F6B62] max-w-2xl font-['Geist']">
            A larger product showcase with clearer shopping information, stronger calls to action, and a more balanced discovery experience.
          </p>
        </div>

        {/* 4 Best Seller Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map(prod => (
            <div 
              key={prod.id}
              className="bg-white rounded-3xl p-5 border border-gray-100 hover:border-[#84BD3A]/60 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Image Box */}
                <div 
                  onClick={() => setQuickViewProduct(prod)}
                  className="h-56 bg-[#F9FAF8] rounded-2xl flex items-center justify-center p-4 relative overflow-hidden cursor-pointer"
                >
                  <span className="absolute top-3 left-3 bg-white text-[#1E3F20] text-[10px] font-['Geist_Mono'] font-bold px-3 py-1 rounded-full shadow-xs border border-gray-100">
                    {prod.badge}
                  </span>
                  
                  <img 
                    src={prod.image} 
                    alt={prod.name}
                    className="max-h-44 object-contain group-hover:scale-106 transition-transform duration-500 select-none"
                  />

                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white text-[#1E3F20] px-4 py-1.5 rounded-full text-xs font-['Outfit'] font-bold shadow-md flex items-center gap-1.5">
                      <Eye size={13} />
                      <span>Quick View</span>
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="pt-4 space-y-1">
                  <div className="flex items-baseline justify-between">
                    <h3 
                      onClick={() => setQuickViewProduct(prod)}
                      className="font-['Outfit'] font-bold text-base text-[#1E3F20] group-hover:text-[#84BD3A] transition cursor-pointer"
                    >
                      {prod.name}
                    </h3>
                    <span className="text-xs font-['Geist_Mono'] text-gray-500">
                      ★ {prod.rating}
                    </span>
                  </div>

                  <p className="text-xs text-[#5F6B62] line-clamp-2 leading-relaxed">
                    {prod.desc}
                  </p>
                </div>
              </div>

              {/* Price & Add to Bag CTA */}
              <div className="pt-4 border-t border-gray-100 mt-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-['Outfit'] font-bold text-lg text-[#1E3F20]">
                    {prod.formattedPrice}
                  </span>
                  <span className="text-[10px] font-['Geist_Mono'] text-[#84BD3A] font-bold">
                    IN STOCK
                  </span>
                </div>

                <button 
                  onClick={() => {
                    addToCart({
                      id: prod.id,
                      name: prod.name,
                      price: prod.price,
                      image: prod.image,
                      size: prod.sizes[1]
                    });
                    triggerToast(prod.name);
                  }}
                  className="w-full bg-[#1E3F20] hover:bg-[#285424] text-white py-3 rounded-full font-['Outfit'] font-bold text-xs uppercase tracking-wider transition shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <ShoppingBag size={14} className="text-[#84BD3A]" />
                  <span>Add to Bag</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </section>

      {/* Section Dividing Trust Marquee Strip */}
      <SectionTrustDivider />

      {/* ========================================================================= */}
      {/* 7. COLLECTIONS PREVIEW SECTION (Figma Node 204:4 - Men & Women Showcase)  */}
      {/* ========================================================================= */}
      <section className="py-20 px-8 max-w-[1440px] mx-auto bg-white border-t border-gray-100">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="font-['Geist_Mono'] text-xs font-bold text-[#1E3F20] uppercase tracking-widest block mb-2">
            Shop by Collection
          </span>
          <h2 className="font-['Outfit'] font-black text-4xl text-[#1E3F20] tracking-tight mb-3">
            Comfort designed for every step, every lifestyle
          </h2>
          <p className="text-xs text-[#5F6B62] leading-relaxed font-['Geist']">
            Two collections, one philosophy — every pair is engineered to move with you naturally, all day long.
          </p>
        </div>

        {/* Dual Cards: Women's on Left, Men's on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          
          {/* WOMEN'S COLLECTION CARD */}
          <div className="bg-[#FAFBF9] rounded-3xl overflow-hidden border border-[#DFE5D9] shadow-md flex flex-col justify-between">
            <div>
              {/* Large Hero Image */}
              <div className="h-96 relative overflow-hidden group">
                <img 
                  src="/assets/medifeet_home/img_42_204_11_womens_hero_image.png" 
                  alt="Women's comfort collection"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 select-none"
                />
                <div className="absolute top-5 left-5 bg-white text-[#1E3F20] text-xs font-['Outfit'] font-bold px-4 py-1.5 rounded-full shadow-md">
                  Women's
                </div>
                <div className="absolute bottom-6 left-6 right-6 bg-black/60 backdrop-blur-md p-5 rounded-2xl border border-white/10 text-white">
                  <h3 className="font-['Outfit'] font-bold text-2xl mb-1">
                    Made for her every move
                  </h3>
                  <p className="text-xs text-white/80 leading-relaxed font-['Geist']">
                    Sandals, slip-ons, and knit styles built for comfort-first women who never compromise.
                  </p>
                </div>
              </div>

              {/* 3 Product Thumbnails Row */}
              <div className="p-6">
                <span className="text-[10px] font-['Geist_Mono'] text-gray-500 uppercase tracking-wider block mb-3 font-bold">
                  WOMEN'S TOP STYLES:
                </span>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { name: 'CloudWalk Sandal', price: '₹2,499', img: '/assets/medifeet_home/img_43_204_25_frame.png' },
                    { name: 'TheraGrip Slide', price: '₹1,899', img: '/assets/medifeet_home/img_44_204_29_frame.png' },
                    { name: 'SoleHealer Slip-On', price: '₹3,299', img: '/assets/medifeet_home/img_45_204_33_frame.png' }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-white rounded-xl p-3 border border-gray-100 text-center">
                      <div className="h-20 flex items-center justify-center mb-1">
                        <img src={item.img} alt={item.name} className="max-h-16 object-contain" />
                      </div>
                      <h5 className="font-['Outfit'] font-bold text-[11px] text-[#1E3F20] truncate">{item.name}</h5>
                      <span className="text-[10px] font-['Geist_Mono'] text-gray-500 font-bold">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Shop Women Button */}
            <div className="p-6 pt-0">
              <button 
                onClick={() => onNavigate('shop')}
                className="w-full bg-[#1E3F20] hover:bg-[#285424] text-white py-4 rounded-full font-['Outfit'] font-bold text-xs uppercase tracking-wider transition shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <span>Shop Women's Collection</span>
                <ArrowRight size={14} className="text-[#84BD3A]" />
              </button>
            </div>
          </div>

          {/* MEN'S COLLECTION CARD */}
          <div className="bg-[#FAFBF9] rounded-3xl overflow-hidden border border-[#DFE5D9] shadow-md flex flex-col justify-between">
            <div>
              {/* Large Hero Image */}
              <div className="h-96 relative overflow-hidden group">
                <img 
                  src="/assets/medifeet_home/img_46_204_40_mens_hero_image.png" 
                  alt="Men's active comfort collection"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 select-none"
                />
                <div className="absolute top-5 left-5 bg-white text-[#1E3F20] text-xs font-['Outfit'] font-bold px-4 py-1.5 rounded-full shadow-md">
                  Men's
                </div>
                <div className="absolute bottom-6 left-6 right-6 bg-black/60 backdrop-blur-md p-5 rounded-2xl border border-white/10 text-white">
                  <h3 className="font-['Outfit'] font-bold text-2xl mb-1">
                    Engineered for all-day action
                  </h3>
                  <p className="text-xs text-white/80 leading-relaxed font-['Geist']">
                    Oxfords, runners, and work slip-ons calibrated for stability and heavy strides.
                  </p>
                </div>
              </div>

              {/* 3 Product Thumbnails Row */}
              <div className="p-6">
                <span className="text-[10px] font-['Geist_Mono'] text-gray-500 uppercase tracking-wider block mb-3 font-bold">
                  MEN'S TOP STYLES:
                </span>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { name: 'AeroFlex Oxford', price: '₹4,299', img: '/assets/medifeet_home/img_47_204_54_frame.png' },
                    { name: 'ActiveAlign Runner', price: '₹4,599', img: '/assets/medifeet_home/img_48_204_58_frame.png' },
                    { name: 'Urban Loafer', price: '₹3,899', img: '/assets/medifeet_home/img_49_204_62_frame.png' }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-white rounded-xl p-3 border border-gray-100 text-center">
                      <div className="h-20 flex items-center justify-center mb-1">
                        <img src={item.img} alt={item.name} className="max-h-16 object-contain" />
                      </div>
                      <h5 className="font-['Outfit'] font-bold text-[11px] text-[#1E3F20] truncate">{item.name}</h5>
                      <span className="text-[10px] font-['Geist_Mono'] text-gray-500 font-bold">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Shop Men Button */}
            <div className="p-6 pt-0">
              <button 
                onClick={() => onNavigate('men')}
                className="w-full bg-[#84BD3A] hover:bg-[#94cd4a] text-[#1E3F20] py-4 rounded-full font-['Outfit'] font-bold text-xs uppercase tracking-wider transition shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <span>Shop Men's Collection</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

        </div>

        <div className="text-center">
          <button 
            onClick={() => onNavigate('shop')}
            className="inline-flex items-center gap-2 font-['Outfit'] font-bold text-sm text-[#1E3F20] hover:text-[#84BD3A] transition cursor-pointer"
          >
            <span>Browse All Collections</span>
            <ArrowRight size={15} />
          </button>
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 8. LIFESTYLE SECTION (Figma Node 192:300)                                  */}
      {/* ========================================================================= */}
      <section className="bg-[#F7F9F6] py-20 px-8 border-y border-[#E8EDE5]">
        <div className="max-w-[1440px] mx-auto grid grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Heading & Stat Cards */}
          <div className="col-span-12 lg:col-span-5 space-y-6">
            <div>
              <span className="font-['Geist_Mono'] text-xs font-bold text-[#1E3F20] uppercase tracking-widest block mb-2">
                Lifestyle
              </span>
              <h2 className="font-['Outfit'] font-black text-4xl text-[#1E3F20] tracking-tight mb-3">
                Comfort that fits your real life
              </h2>
              <p className="text-xs text-[#5F6B62] leading-relaxed max-w-md font-['Geist']">
                From workdays to weekend adventures, these styles are designed to keep up with how you move, live, and feel.
              </p>
            </div>

            {/* 2 White Metric Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs">
                <span className="font-['Outfit'] font-extrabold text-3xl text-[#1E3F20] block mb-1">
                  50K+
                </span>
                <span className="text-xs text-[#5F6B62] font-['Geist']">
                  Happy Customers
                </span>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs">
                <span className="font-['Outfit'] font-extrabold text-3xl text-[#84BD3A] block mb-1">
                  4.8
                </span>
                <span className="text-xs text-[#5F6B62] font-['Geist']">
                  Average Rating
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Column (Woman walking in sunlit park) */}
          <div className="col-span-12 lg:col-span-7">
            <div className="rounded-3xl overflow-hidden aspect-[16/10] relative shadow-xl border-4 border-white group">
              <img 
                src="/assets/medifeet_home/img_50_192_313_visual_column.png" 
                alt="Woman walking happily in sunlit park"
                className="w-full h-full object-cover group-hover:scale-102 transition duration-700 select-none"
              />
              
              <div className="absolute top-5 left-5 bg-white text-[#1E3F20] text-xs font-['Outfit'] font-bold px-4 py-1.5 rounded-full shadow-md">
                Park Walk
              </div>

              <div className="absolute bottom-6 left-6 right-6 bg-black/60 backdrop-blur-md p-6 rounded-2xl border border-white/10 text-white space-y-1">
                <h4 className="font-['Outfit'] font-bold text-xl text-white">
                  Comfort that fits your real life
                </h4>
                <p className="text-xs text-[#D7E1D9] leading-relaxed font-['Geist']">
                  From workdays to weekend adventures, these styles are designed to keep up with how you move, live, and feel.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. COMMUNITY SECTION & TESTIMONIAL CARDS (Figma Node 192:319)              */}
      {/* ========================================================================= */}
      <section className="py-20 px-8 max-w-[1440px] mx-auto bg-white">
        
        {/* Section Header */}
        <div className="mb-12">
          <span className="font-['Geist_Mono'] text-xs font-bold text-[#1E3F20] uppercase tracking-widest block mb-2">
            Community
          </span>
          <h2 className="font-['Outfit'] font-black text-4xl text-[#1E3F20] tracking-tight mb-2">
            Real stories from people who wear MediFeet
          </h2>
          <p className="text-xs text-[#5F6B62] max-w-2xl font-['Geist']">
            A concise look at the comfort journeys, recovery wins, and everyday moments that make the brand feel human.
          </p>
        </div>

        {/* 4 Story Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {testimonialCards.map(item => (
            <div 
              key={item.id}
              className="rounded-3xl overflow-hidden aspect-[4/5] relative border border-gray-100 shadow-lg group flex flex-col justify-between p-6 bg-[#10241B]"
            >
              <img 
                src={item.image} 
                alt={item.name}
                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 pointer-events-none" />

              {/* Duration Tag */}
              <div className="relative z-10 self-start">
                <span className="bg-black/60 backdrop-blur-md text-white text-[11px] font-['Geist_Mono'] font-bold px-3 py-1 rounded-full border border-white/10">
                  {item.duration}
                </span>
              </div>

              {/* Story Content & Action */}
              <div className="relative z-10 space-y-3">
                <h4 className="font-['Outfit'] font-bold text-lg text-white leading-tight">
                  {item.name}
                </h4>
                <p className="text-xs text-[#D7E1D9] leading-relaxed line-clamp-3 font-['Geist']">
                  {item.desc}
                </p>

                <button 
                  onClick={() => openVideoModal(item.video, item.name)}
                  className="w-full bg-[#84BD3A] hover:bg-[#94cd4a] text-[#1E3F20] py-2.5 rounded-full font-['Outfit'] font-bold text-xs uppercase tracking-wider transition shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <Play size={12} className="fill-[#1E3F20]" />
                  <span>Watch Story</span>
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* 4 Community Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-6 bg-[#FAFBF9] rounded-3xl border border-[#E8EDE5] mb-8">
          <div className="text-center p-4">
            <span className="font-['Outfit'] font-black text-3xl text-[#1E3F20] block mb-1">
              50,000+
            </span>
            <span className="text-xs text-[#5F6B62] font-['Geist']">
              Happy Customers
            </span>
          </div>
          <div className="text-center p-4">
            <span className="font-['Outfit'] font-black text-3xl text-[#84BD3A] block mb-1">
              4.8
            </span>
            <span className="text-xs text-[#5F6B62] font-['Geist']">
              Average Rating
            </span>
          </div>
          <div className="text-center p-4">
            <span className="font-['Outfit'] font-black text-3xl text-[#1E3F20] block mb-1">
              98%
            </span>
            <span className="text-xs text-[#5F6B62] font-['Geist']">
              Would Recommend
            </span>
          </div>
          <div className="text-center p-4">
            <span className="font-['Outfit'] font-black text-3xl text-[#1E3F20] block mb-1">
              1-Year
            </span>
            <span className="text-xs text-[#5F6B62] font-['Geist']">
              Warranty
            </span>
          </div>
        </div>

        {/* Center Share Story CTA */}
        <div className="text-center">
          <button 
            onClick={() => triggerToast('Story submission opened')}
            className="bg-[#1E3F20] hover:bg-[#285424] text-white px-8 py-3.5 rounded-full font-['Outfit'] font-bold text-xs uppercase tracking-wider transition shadow-md inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Share Your Story</span>
            <ArrowRight size={14} className="text-[#84BD3A]" />
          </button>
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 10. NEWSLETTER SIGNUP BANNER (Figma Node 192:377)                         */}
      {/* ========================================================================= */}
      <section className="bg-[#1E3F20] text-white py-16 px-8 relative overflow-hidden">
        {/* Decorative Green Circles */}
        <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-[#84BD3A]/10 pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-[#84BD3A]/10 pointer-events-none" />

        <div className="max-w-[1440px] mx-auto grid grid-cols-12 gap-8 items-center relative z-10">
          
          <div className="col-span-12 lg:col-span-6 space-y-2">
            <span className="font-['Geist_Mono'] text-xs font-bold text-[#84BD3A] uppercase tracking-widest block">
              Newsletter
            </span>
            <h3 className="font-['Outfit'] font-extrabold text-3xl lg:text-4xl text-white">
              Get 10% Off Your First Order
            </h3>
            <p className="text-xs text-white/80 max-w-md font-['Geist']">
              Subscribe to our newsletter for exclusive deals, new arrivals, and foot health tips.
            </p>
          </div>

          <div className="col-span-12 lg:col-span-6 space-y-2">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                if (newsletterEmail) {
                  triggerToast(`Thank you! ${newsletterEmail} subscribed for 10% off.`);
                  setNewsletterEmail('');
                }
              }}
              className="flex items-center gap-2 max-w-md ml-auto"
            >
              <input 
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address"
                className="bg-white text-gray-900 px-5 py-3.5 rounded-full text-xs font-['Geist'] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#84BD3A] flex-1 shadow-inner"
              />
              <button 
                type="submit"
                className="bg-[#84BD3A] hover:bg-[#94cd4a] text-[#1E3F20] px-7 py-3.5 rounded-full font-['Outfit'] font-bold text-xs uppercase tracking-wider transition shadow-md shrink-0 cursor-pointer"
              >
                SUBSCRIBE
              </button>
            </form>
            <p className="text-[11px] text-white/60 text-right max-w-md ml-auto font-['Geist']">
              Join 50,000+ walkers getting comfort tips and early access.
            </p>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 11. FOOTER (Figma Node 192:391)                                           */}
      {/* ========================================================================= */}
      <footer className="bg-[#111111] text-white pt-16 pb-8 px-8 border-t border-white/10">
        <div className="max-w-[1440px] mx-auto">
          
          {/* Footer Logo & Brand Heading */}
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
            <button 
              onClick={() => onNavigate('home')}
              className="flex items-center gap-3 cursor-pointer group focus:outline-none"
            >
              <div className="bg-white px-3 py-1.5 rounded-xl shadow-xs group-hover:scale-105 transition-transform">
                <img 
                  src="/assets/medifeet-brand-logo.png" 
                  alt="MediFeet" 
                  className="h-7 w-auto object-contain"
                />
              </div>
            </button>
            <span className="text-[11px] text-[#84BD3A] font-['Geist_Mono'] font-bold uppercase tracking-widest">
              ● Official Biomechanical Comfort Footwear
            </span>
          </div>

          <div className="grid grid-cols-12 gap-8 pb-14 border-b border-white/10">
            
            {/* Column 1: SHOP */}
            <div className="col-span-6 sm:col-span-3 lg:col-span-2 space-y-3">
              <h5 className="font-['Outfit'] font-bold text-xs tracking-wider text-white uppercase">
                SHOP
              </h5>
              <ul className="space-y-2 text-xs text-[#6B7280]">
                {['Orthopedic Sandals', 'Biomechanical Sneakers', 'Comfort Formal Shoes', 'Kids Orthotics', 'New Arrivals', 'Sale & Clearance'].map((link, idx) => (
                  <li key={idx}>
                    <button onClick={() => onNavigate('shop')} className="hover:text-white transition cursor-pointer text-left">
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: CUSTOMER CARE */}
            <div className="col-span-6 sm:col-span-3 lg:col-span-2 space-y-3">
              <h5 className="font-['Outfit'] font-bold text-xs tracking-wider text-white uppercase">
                CUSTOMER CARE
              </h5>
              <ul className="space-y-2 text-xs text-[#6B7280]">
                {['Track My Order', 'Returns & Exchanges', 'Sizing & Fit Guide', 'Foot Health Blog', 'Contact Support', 'FAQs'].map((link, idx) => (
                  <li key={idx}>
                    <button onClick={() => onNavigate('contact')} className="hover:text-white transition cursor-pointer text-left">
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: ABOUT MEDIFEET */}
            <div className="col-span-6 sm:col-span-3 lg:col-span-2 space-y-3">
              <h5 className="font-['Outfit'] font-bold text-xs tracking-wider text-white uppercase">
                ABOUT MEDIFEET
              </h5>
              <ul className="space-y-2 text-xs text-[#6B7280]">
                {['Our Science & Tech', 'The Foot Health Story', 'Careers', 'Sustainability', "Maker's Studio", 'Press Releases'].map((link, idx) => (
                  <li key={idx}>
                    <button onClick={() => onNavigate('about')} className="hover:text-white transition cursor-pointer text-left">
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: LEGAL */}
            <div className="col-span-6 sm:col-span-3 lg:col-span-2 space-y-3">
              <h5 className="font-['Outfit'] font-bold text-xs tracking-wider text-white uppercase">
                LEGAL
              </h5>
              <ul className="space-y-2 text-xs text-[#6B7280]">
                {['Privacy Policy', 'Terms of Use', 'Warranty Claim', 'Cookie Settings', 'Affiliate Program'].map((link, idx) => (
                  <li key={idx}>
                    <button onClick={() => triggerToast(link)} className="hover:text-white transition cursor-pointer text-left">
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 5: Right Newsletter Box */}
            <div className="col-span-12 lg:col-span-4 space-y-3">
              <h5 className="font-['Outfit'] font-bold text-xs tracking-wider text-white uppercase">
                SUBSCRIBE & SAVE 10%
              </h5>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Sign up to receive expert foot health tips, exclusive collections, and early access to sales.
              </p>

              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (footerEmail) {
                    triggerToast(`Subscribed ${footerEmail} to VIP Club`);
                    setFooterEmail('');
                  }
                }}
                className="flex items-center gap-2 pt-1"
              >
                <input 
                  type="email"
                  required
                  value={footerEmail}
                  onChange={(e) => setFooterEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="bg-[#222222] text-white px-4 py-2.5 rounded-xl text-xs placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#84BD3A] flex-1 border border-white/5"
                />
                <button 
                  type="submit"
                  className="bg-[#84BD3A] hover:bg-[#94cd4a] text-[#111111] px-5 py-2.5 rounded-xl font-['Outfit'] font-bold text-xs uppercase tracking-wider transition cursor-pointer"
                >
                  JOIN
                </button>
              </form>

              {/* Social Icons */}
              <div className="flex items-center gap-2 pt-2">
                {['IG', 'FB', 'YT', 'X'].map((soc, idx) => (
                  <button 
                    key={idx}
                    onClick={() => triggerToast(`Navigating to ${soc}`)}
                    className="w-8 h-8 rounded-lg bg-[#222222] hover:bg-[#333333] text-gray-400 hover:text-white flex items-center justify-center text-xs font-bold transition cursor-pointer"
                  >
                    {soc}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Bottom Copyright & Verified Bar */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6B7280]">
            <p>© 2026 Medifeet India. Biomechanically engineered comfort. All rights reserved.</p>
            
            <div className="flex items-center gap-2">
              <span>Verified Partner of Orthotic Society</span>
              <div className="w-5 h-5 rounded-full bg-[#1E3F20] text-[#84BD3A] flex items-center justify-center font-bold text-[10px]">
                ✓
              </div>
            </div>
          </div>

        </div>
      </footer>

      {/* ========================================================================= */}
      {/* 12. POPUP MODAL: VIDEO STORIES VIEWER                                     */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#121A12] border border-[#2B4728] rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl relative text-white"
            >
              {/* Modal Header */}
              <div className="p-4 px-6 border-b border-white/10 flex items-center justify-between bg-black/40">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#84BD3A] animate-pulse" />
                  <span className="font-['Outfit'] font-bold text-sm text-white">
                    {activeVideoTitle}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setIsVideoMuted(!isVideoMuted)}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
                    aria-label="Toggle mute"
                  >
                    {isVideoMuted ? <VolumeX size={16} /> : <Volume2 size={16} className="text-[#84BD3A]" />}
                  </button>
                  <button 
                    onClick={() => setIsVideoModalOpen(false)}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
                    aria-label="Close modal"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Video Player */}
              <div className="relative aspect-video bg-black flex items-center justify-center">
                <video 
                  src={activeVideoSrc}
                  autoPlay
                  controls
                  loop
                  muted={isVideoMuted}
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Modal Footer */}
              <div className="p-4 px-6 bg-black/40 flex items-center justify-between text-xs text-white/70">
                <span>Verified Customer Video Submission</span>
                <button 
                  onClick={() => {
                    setIsVideoModalOpen(false);
                    onNavigate('shop');
                  }}
                  className="bg-[#84BD3A] hover:bg-[#94cd4a] text-[#1E3F20] px-5 py-2 rounded-full font-bold text-xs uppercase tracking-wider transition cursor-pointer"
                >
                  Shop Featured Shoes
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 13. POPUP MODAL: QUICK VIEW PRODUCT                                       */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {quickViewProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl relative border border-gray-100"
            >
              <button 
                onClick={() => setQuickViewProduct(null)}
                className="absolute top-5 right-5 p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-black transition cursor-pointer"
                aria-label="Close quick view"
              >
                <X size={18} />
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                <div className="h-64 bg-[#F9FAF8] rounded-2xl flex items-center justify-center p-6 border border-gray-100">
                  <img 
                    src={quickViewProduct.image} 
                    alt={quickViewProduct.name}
                    className="max-h-52 object-contain"
                  />
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="bg-[#1E3F20] text-[#84BD3A] text-[10px] font-['Geist_Mono'] font-bold px-3 py-1 rounded-full uppercase">
                      {quickViewProduct.badge}
                    </span>
                    <h3 className="font-['Outfit'] font-bold text-2xl text-[#1E3F20] mt-2">
                      {quickViewProduct.name}
                    </h3>
                    <span className="font-['Outfit'] font-black text-xl text-[#1E3F20] block mt-1">
                      {quickViewProduct.formattedPrice}
                    </span>
                  </div>

                  <p className="text-xs text-[#5F6B62] leading-relaxed">
                    {quickViewProduct.desc}
                  </p>

                  <div>
                    <span className="text-[11px] font-['Geist_Mono'] font-bold text-gray-700 block mb-2 uppercase">
                      SELECT SIZE (UK):
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {quickViewProduct.sizes.map(sz => (
                        <button 
                          key={sz}
                          onClick={() => setQuickViewSize(sz)}
                          className={`w-9 h-9 rounded-xl font-['Outfit'] font-bold text-xs transition cursor-pointer ${
                            quickViewSize === sz ? 'bg-[#1E3F20] text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      addToCart({
                        id: quickViewProduct.id,
                        name: `${quickViewProduct.name} (UK ${quickViewSize})`,
                        price: quickViewProduct.price,
                        image: quickViewProduct.image,
                        size: quickViewSize
                      });
                      triggerToast(`${quickViewProduct.name} (UK ${quickViewSize})`);
                      setQuickViewProduct(null);
                    }}
                    className="w-full bg-[#1E3F20] hover:bg-[#285424] text-white py-3.5 rounded-full font-['Outfit'] font-bold text-xs uppercase tracking-wider transition shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                  >
                    <ShoppingBag size={14} className="text-[#84BD3A]" />
                    <span>ADD TO BAG · {quickViewProduct.formattedPrice}</span>
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 14. TOAST NOTIFICATION                                                    */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-6 right-6 z-50 bg-[#1E3F20] text-white px-6 py-3.5 rounded-2xl shadow-2xl border border-[#84BD3A]/40 flex items-center gap-3"
          >
            <CheckCircle2 size={18} className="text-[#84BD3A] shrink-0" />
            <span className="text-xs font-['Outfit'] font-semibold">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default DesktopHomePage;
