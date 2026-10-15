import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from './context/CartContext';
import SizeChartModal from './components/SizeChartModal';
import { 
  Star, Maximize2, Ruler, ArrowRight, Truck, RefreshCw, 
  ShieldCheck, Headset, CheckCircle2, Diamond, Feather, 
  HeartHandshake, HeartPulse, Activity, Leaf, Play, Plus, Minus,
  ChevronDown, Package, CornerUpLeft, Droplets, Check, MessageSquare,
  Sparkles, Eye, Clock, Share2, Heart, ArrowLeft, ShoppingBag, Wifi, Battery, Signal,
  Phone, HelpCircle, Footprints, X, Volume2, VolumeX,
  Sliders, MoveHorizontal, AlertTriangle, Layers, Camera, Compass, SlidersHorizontal
} from 'lucide-react';

const springTransition = { type: "spring", stiffness: 400, damping: 25 };

export const DemoPage = ({ onSwitchToOriginal, onNavigate }) => {
  const { addToCart, setIsCartOpen, cartCount, wishlist, toggleWishlist } = useCart();
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState(6);
  const [activeTab, setActiveTab] = useState('Photo');
  const [pincode, setPincode] = useState('');
  const [pincodeChecked, setPincodeChecked] = useState(false);
  const [liked, setLiked] = useState(false);
  const [activeSoleLayer, setActiveSoleLayer] = useState('A');
  const [compareViewMode, setCompareViewMode] = useState('side-by-side'); // 'side-by-side' | 'combined'
  const [activeComparePoint, setActiveComparePoint] = useState(2); // default to Point 2 (Arch Support)
  const hoverPointTimerRef = React.useRef(null);

  const handleComparePointHover = (id) => {
    if (hoverPointTimerRef.current) clearTimeout(hoverPointTimerRef.current);
    hoverPointTimerRef.current = setTimeout(() => {
      setActiveComparePoint(id);
    }, 60);
  };

  const handleComparePointLeave = () => {
    if (hoverPointTimerRef.current) {
      clearTimeout(hoverPointTimerRef.current);
    }
  };

  const handleComparePointClick = (id) => {
    if (hoverPointTimerRef.current) clearTimeout(hoverPointTimerRef.current);
    setActiveComparePoint(id);
  };

  const [splitSliderPos, setSplitSliderPos] = useState(50);
  const [isDraggingSlider, setIsDraggingSlider] = useState(false);
  const sliderContainerRef = React.useRef(null);
  const [activeFilmIndex, setActiveFilmIndex] = useState(0);
  const [isFilmAutoPlaying, setIsFilmAutoPlaying] = useState(true);
  const [activeVideoModal, setActiveVideoModal] = useState(null);
  const [activeTechCard, setActiveTechCard] = useState(null);
  const [stageMediaMode, setStageMediaMode] = useState('photo'); // 'photo' | 'video'
  const [isStageMuted, setIsStageMuted] = useState(true);
  const [techMediaModes, setTechMediaModes] = useState({
    '01': 'video',
    '02': 'video',
    '03': 'video',
    '04': 'video',
    '05': 'video'
  });

  const handleSliderMove = (clientX) => {
    if (!sliderContainerRef.current) return;
    const rect = sliderContainerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(8, Math.min(92, (x / rect.width) * 100));
    setSplitSliderPos(percentage);
  };

  const handleTouchMove = (e) => {
    if (e.touches && e.touches[0]) {
      handleSliderMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e) => {
    if (isDraggingSlider || e.buttons === 1) {
      handleSliderMove(e.clientX);
    }
  };

  const sizes = [
    { num: 4, available: true },
    { num: 5, available: true },
    { num: 6, available: true },
    { num: 7, available: true },
    { num: 8, available: true },
    { num: 9, available: false },
  ];

  // Gallery: Tab 1 is strictly product photo; Tabs 2-5 are videos
  const galleryImages = [
    { 
      label: 'Photo', 
      isVideo: false,
      src: '/assets/product-thumbnail.png',
      title: 'CloudWalk Perfect Sandal · Studio Photo',
      desc: 'High-definition studio photography of the CloudWalk Sandal in Stone Beige, showcasing hand-stitched leather upper and ergonomic footbed.',
      duration: 'Still',
      views: 'Studio 4K'
    },
    { 
      label: '360°', 
      isVideo: true,
      src: '/assets/product-thumbnail.png',
      videoUrl: '/assets/video-product-360.mp4',
      videoTitle: '360° Studio Product Reveal',
      videoDesc: 'Seamless 360-degree commercial turntable showcasing contour silhouette, arch support, and hand-finished stitch detailing.',
      duration: '00:15',
      views: '142k views'
    },
    { 
      label: 'On foot', 
      isVideo: true,
      src: '/assets/on-foot-thumbnail.png',
      videoUrl: '/assets/video-on-foot.mp4',
      videoTitle: 'A Day in CloudWalk · On Foot Motion',
      videoDesc: 'Natural walking steps over sun-drenched stone walkways and city pavements demonstrating effortless all-day stride.',
      duration: '00:32',
      views: '128k views'
    },
    { 
      label: 'Detail', 
      isVideo: true,
      src: '/assets/detail-photo.png',
      videoUrl: '/assets/video-detail.mp4',
      videoTitle: 'Macro Craftsmanship & Flex Test',
      videoDesc: 'Extreme close-up examination of leather texture, flexible gore strap deflection, and anatomic footbed rebound.',
      duration: '00:20',
      views: '95k views'
    },
    { 
      label: 'Concept', 
      isVideo: true,
      src: '/assets/sole-concept-thumbnail-image.png',
      videoUrl: '/assets/video-concept.mp4',
      videoTitle: '3D Exploded Sole System Breakdown',
      videoDesc: '3D exploded animation of the 3 comfort layers: Anatomic Footbed, Medifeet Foam, and Anti-Skid Outsole.',
      duration: '00:28',
      views: '110k views'
    },
  ];

  // Video Film Slider
  const films = [
    {
      id: 1,
      title: 'A day in CloudWalk',
      desc: 'Real walking motion across urban stones and boardwalks.',
      views: '128k views',
      duration: '00:32',
      poster: '/assets/on-foot-thumbnail.png',
      videoUrl: '/assets/video-on-foot.mp4',
    },
    {
      id: 2,
      title: 'Inside the cushioning',
      desc: 'Slow-motion rebound kinetics under repeated foot strikes.',
      views: '42.6k views',
      duration: '00:32',
      poster: '/assets/cushioning-photorealistic-illustrative-detail.png',
      videoUrl: '/assets/video-cushioning.mp4',
    },
    {
      id: 3,
      title: 'Details that move with you',
      desc: 'Precision saddle stitching and flexible gore comfort in motion.',
      views: '86k views',
      duration: '00:32',
      poster: '/assets/detail-photo.png',
      videoUrl: '/assets/video-flexibility.mp4',
    },
  ];

  React.useEffect(() => {
    if (!isFilmAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveFilmIndex((prev) => (prev + 1) % films.length);
    }, 4200);
    return () => clearInterval(interval);
  }, [isFilmAutoPlaying, films.length]);

  const pinColors = {
    1: { bg: '#D8D1E5', text: '#2D2138', border: '#B8A8CE', name: 'Fit & Straps' },
    2: { bg: '#BFD8D8', text: '#193333', border: '#92C4C4', name: 'Arch & Footbed' },
    3: { bg: '#DED3B8', text: '#3D331F', border: '#C5B592', name: 'Cushioning' },
    4: { bg: '#CDD7E4', text: '#1E2B38', border: '#A6BDD9', name: 'Outsole Grip' },
  };

  // The 4 comparison points matched directly with user's reference
  const comparisonData = [
    {
      id: 1,
      title: 'Closure & Instep Fit',
      shortTitle: 'Fit & Straps',
      tableFeature: 'Fit & Closure',
      category: 'FIT ERGONOMICS',
      metric: 'Zero-Pressure Fit',
      metricPercent: 96,
      ordPos: { top: '32%', left: '54%' },
      mediPos: { top: '32%', left: '45%' },
      combinedOrdPos: { top: '32%', left: '46%' },
      combinedMediPos: { top: '32%', left: '46%' },
      ordinary: {
        name: 'Lace-up closure',
        tag: 'Rigid Pressure Points',
        desc: 'Rigid eyelets & tightly tied laces pinch dorsal nerves, restricting micro-circulation as feet naturally swell.',
        flaw: 'High friction rub · Pinching'
      },
      medifeet: {
        name: 'Adjustable straps',
        tag: 'Custom Zero-Pressure Fit',
        desc: 'Dual micro-adjustable Velcro straps contour in seconds to wide insteps and natural swelling with zero pressure.',
        advantage: '100% Tension-Free · Adapts to swelling'
      }
    },
    {
      id: 2,
      title: 'Footbed & Arch Cradle',
      shortTitle: 'Arch & Footbed',
      tableFeature: 'Footbed & Arch',
      category: 'PODIATRIC CONTOUR',
      metric: '+92% Pressure Relief',
      metricPercent: 92,
      ordPos: { top: '42%', left: '26%' },
      mediPos: { top: '52%', left: '16%' },
      combinedOrdPos: { top: '44%', left: '22%' },
      combinedMediPos: { top: '52%', left: '18%' },
      ordinary: {
        name: 'Footbed varies',
        tag: 'Flat, Unsupportive Base',
        desc: 'Flat, uniform insole leaves the arch suspended in air, dumping 80% bodyweight directly onto heel and ball of foot.',
        flaw: '80% weight dumped on heel'
      },
      medifeet: {
        name: 'Contoured footbed',
        tag: '18mm Podiatrist Medial Contour',
        desc: 'Biomechanically molded arch cradle with deep heel cup distributes weight evenly across 100% of the foot sole.',
        advantage: 'Disperses 92% body pressure'
      }
    },
    {
      id: 3,
      title: 'Midsole Cushioning',
      shortTitle: 'Cushioning Foam',
      tableFeature: 'Cushioning',
      category: 'SHOCK REBOUND',
      metric: '68% Impact Absorption',
      metricPercent: 68,
      ordPos: { top: '68%', left: '45%' },
      mediPos: { top: '68%', left: '54%' },
      combinedOrdPos: { top: '66%', left: '48%' },
      combinedMediPos: { top: '66%', left: '54%' },
      ordinary: {
        name: 'Cushioning varies',
        tag: 'Single-Density Compression',
        desc: 'Standard EVA foam packs down permanently within weeks, transferring ground reaction shock straight into knee joints.',
        flaw: 'Impact jars knees & joints'
      },
      medifeet: {
        name: 'Medifeet™ cushioning',
        tag: 'Micro-Cellular Foam Matrix',
        desc: 'Multi-density proprietary foam absorbs up to 68% of walking shock, returning bouncy kinetic energy with each step.',
        advantage: 'Retains 96% bounce after 100k steps'
      }
    },
    {
      id: 4,
      title: 'Outsole & Stability',
      shortTitle: 'Anti-Skid Outsole',
      tableFeature: 'Outsole Grip',
      category: 'TRACTION & TREAD',
      metric: 'Class-A Anti-Skid',
      metricPercent: 95,
      ordPos: { top: '62%', left: '82%' },
      mediPos: { top: '62%', left: '84%' },
      combinedOrdPos: { top: '62%', left: '80%' },
      combinedMediPos: { top: '62%', left: '84%' },
      ordinary: {
        name: 'Grip varies',
        tag: 'Smooth Slip-Prone Tread',
        desc: 'Shallow, generic tread pattern hydroplanes on wet tiles, bathroom floors, and smooth polished surfaces.',
        flaw: 'Hydroplanes on smooth tiles'
      },
      medifeet: {
        name: 'Anti-skid outsole',
        tag: 'Hex-Traction Wet/Dry Grip',
        desc: 'Engineered multi-directional hexagonal siping channels water away instantly for certified anti-slip wet/dry grip.',
        advantage: 'Certified Class-A slip resistance'
      }
    }
  ];

  // STREAMLINED & DEDUPLICATED: 5 distinct technologies covering all aspects of the shoe!
  const streamlinedTechnologies = [
    {
      num: '01',
      category: 'ARCH SUPPORT',
      title: '18mm Medial Arch Contour',
      desc: 'Anatomically shaped cradle supports the natural longitudinal arch, aligning ankles and knees with every stride.',
      img: '/assets/arch-support-photorealistic-illustrative-detail.png',
      videoUrl: '/assets/video-tech-arch-support.mp4',
      videoTitle: '01 · 18mm Medial Arch Contour in Motion',
      videoDesc: 'Laser-guided macro scan tracking the 18mm curved medial arch cradle, stabilizing gait and relieving plantar pressure.',
      duration: '00:05',
      views: '98k views',
      icon: <Activity size={18} />,
      pinPos: 'top-[52%] left-[60%]',
      pinLabel: '18mm CONTOUR',
      specMetric: '18mm Podiatrist Arch Cradle',
      specDetail: 'Relieves plantar tension & corrects excessive pronation'
    },
    {
      num: '02',
      category: 'REBOUND FOAM',
      title: 'Micro-Cellular Kinetic Foam',
      desc: 'Proprietary closed-cell compound absorbs heel strikes and springs back instantaneously to propel your next step.',
      img: '/assets/cushioning-photorealistic-illustrative-detail.png',
      videoUrl: '/assets/video-tech-bounce-back.mp4',
      videoTitle: '02 · Dynamic Foam Rebound & Compression',
      videoDesc: 'Macro slow-motion test of high-density memory foam instantaneously springing back after direct human pressure.',
      duration: '00:05',
      views: '114k views',
      icon: <Feather size={18} />,
      pinPos: 'top-[54%] left-[48%]',
      pinLabel: 'DYNAMIC REBOUND',
      specMetric: '68% Shock Absorption Matrix',
      specDetail: 'Micro-cellular cushioning that prevents joint fatigue'
    },
    {
      num: '03',
      category: 'ANTI-SKID TREAD',
      title: 'Hex-Traction Wet/Dry Outsole',
      desc: 'Directional hexagonal rubber tread channels liquid away to secure your footing on wet tiles, granite, and rain-slick walkways.',
      img: '/assets/outsole-grip-photorealistic-illustrative-detail.png',
      videoUrl: '/assets/video-tech-anti-skid.mp4',
      videoTitle: '03 · Hex-Traction Tread Surface Grip',
      videoDesc: 'High-traction rubber outsole tread flexing and gripping firmly onto wet luxury stone without slipping.',
      duration: '00:05',
      views: '87k views',
      icon: <ShieldCheck size={18} />,
      pinPos: 'top-[58%] left-[52%]',
      pinLabel: 'HEX-TRACTION TREAD',
      specMetric: 'Class-A Wet Friction Certified',
      specDetail: 'Deep siped grooves evacuate surface moisture immediately'
    },
    {
      num: '04',
      category: 'INNER LINING',
      title: 'Frictionless Soft-Touch Lining',
      desc: 'Plush, non-abrasive inner fabric envelopes sensitive skin with seamless edges, preventing blisters and pressure sores.',
      img: '/assets/anatomic-footbed-photorealistic-illustrative-detail.png',
      videoUrl: '/assets/video-tech-anatomic-footbed.mp4',
      videoTitle: '04 · Frictionless Microfiber Touch',
      videoDesc: 'Macro examination of hypoallergenic, silky-smooth inner lining crafted specifically for sensitive and diabetic skin.',
      duration: '00:05',
      views: '92k views',
      icon: <HeartHandshake size={18} />,
      pinPos: 'top-[48%] left-[54%]',
      pinLabel: 'SEAMLESS LINING',
      specMetric: 'Zero-Seam Contact Construction',
      specDetail: 'Engineered for sensitive feet, zero friction rub or hot spots'
    },
    {
      num: '05',
      category: 'ADJUSTABLE FIT',
      title: 'Dual Adaptive Instep Straps',
      desc: 'Effortlessly adapts to high insteps, bunions, and evening foot swelling with smooth micro-adjustable Velcro closures.',
      img: '/assets/foam-photorealistic-illustrative-material-study.png',
      videoUrl: '/assets/video-tech-foam.mp4',
      videoTitle: '05 · Dual Adaptive Fit in Motion',
      videoDesc: 'Demonstrating effortless one-touch strap customization adapting seamlessly to morning vs evening foot volumes.',
      duration: '00:05',
      views: '110k views',
      icon: <SlidersHorizontal size={18} />,
      pinPos: 'top-[50%] left-[50%]',
      pinLabel: 'CUSTOM CLOSURE',
      specMetric: 'Zero Dorsal Pressure Fit',
      specDetail: 'Allows up to 25mm volume adjustment without binding'
    }
  ];

  return (
    <div className="bg-[#F7F9F6] text-[#1E3F20] min-h-screen font-['Geist'] antialiased selection:bg-[#84BD3A] selection:text-[#1E3F20]">
      <div className="max-w-[390px] mx-auto bg-[#F7F9F6] min-h-screen relative shadow-2xl overflow-x-hidden border-x border-[#E8EDDF]">
        
        {/* Sticky Demo Banner Bar */}
        <div className="bg-[#1E3F20] text-white py-1.5 px-4 flex items-center justify-between text-[11px] font-['Geist_Mono'] z-50 sticky top-0 shadow-md">
          <div className="flex items-center gap-1.5 font-bold">
            <span className="w-2 h-2 rounded-full bg-[#84BD3A] animate-pulse" />
            <span className="text-[#84BD3A]">DEMO VERSION</span>
            <span className="text-white/60 hidden sm:inline">· Streamlined & Deduplicated</span>
          </div>
          <button 
            onClick={onSwitchToOriginal}
            className="bg-white/15 hover:bg-white/25 text-white text-[9.5px] px-2.5 py-0.5 rounded-full font-bold transition flex items-center gap-1 cursor-pointer border border-white/20"
          >
            <span>View Current</span>
            <ArrowRight size={10} />
          </button>
        </div>

        {/* iOS Mobile Status Bar */}
        <div className="px-6 pt-2 pb-1 flex items-center justify-between text-xs font-semibold text-[#1E3F20] tracking-tight">
          <span>9:41</span>
          <div className="flex items-center gap-1.5">
            <Signal size={12} strokeWidth={2.5} />
            <Wifi size={12} strokeWidth={2.5} />
            <Battery size={16} strokeWidth={2.5} />
          </div>
        </div>

        {/* Mobile Navigation Header */}
        <header className="px-4 h-14 flex items-center justify-between relative bg-[#F7F9F6]">
          <button 
            onClick={() => onNavigate ? onNavigate('shop') : onSwitchToOriginal()}
            className="w-10 h-10 flex items-center justify-start text-[#1E3F20] z-10 cursor-pointer"
            aria-label="Back"
          >
            <ArrowLeft size={22} strokeWidth={2} />
          </button>
          
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <button 
              onClick={() => onNavigate && onNavigate('home')} 
              className="pointer-events-auto cursor-pointer"
            >
              <img 
                src="/assets/medifeet-logo-transparent.png" 
                alt="Medifeet" 
                className="h-8 max-w-[130px] object-contain mix-blend-multiply"
              />
            </button>
          </div>

          <div className="flex items-center gap-2 z-10">
            <motion.button 
              whileTap={{ scale: 0.85 }} 
              onClick={() => toggleWishlist('cloudwalk-stone-beige')}
              className="w-10 h-10 flex items-center justify-center text-[#1E3F20] cursor-pointer"
              aria-label="Wishlist"
            >
              <Heart 
                size={21} 
                fill={wishlist.includes('cloudwalk-stone-beige') ? "#c0544f" : "none"} 
                className={wishlist.includes('cloudwalk-stone-beige') ? "text-[#c0544f]" : "text-[#1E3F20]"} 
              />
            </motion.button>
            <div 
              onClick={() => setIsCartOpen(true)}
              className="relative w-10 h-10 flex items-center justify-center cursor-pointer" 
              aria-label="Shopping bag"
            >
              <ShoppingBag size={21} className="text-[#1E3F20]" />
              {cartCount > 0 && (
                <span className="absolute top-1.5 right-1 bg-[#1E3F20] text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
          </div>
        </header>

        {/* Top Promo Banner */}
        <div className="bg-[#E8EDDF] text-[#667360] font-['Geist_Mono'] text-[10px] font-medium text-center py-2 tracking-wider">
          Use code NEW5 for 5% off your first order
        </div>

        <main className="px-5 pt-5 pb-24">
          
          {/* Title Area */}
          <div className="mb-5">
            <div className="inline-flex items-center gap-1.5 text-[#667360] font-['Geist_Mono'] text-[9px] font-bold tracking-widest uppercase mb-1.5">
              <span className="w-1.5 h-1.5 bg-[#84BD3A]"></span>
              PODIATRIST APPROVED
            </div>
            
            <h1 className="font-['Outfit'] text-[46px] font-medium text-[#1E3F20] leading-[1.02] tracking-tight">
              CloudWalk
            </h1>
            <p className="font-['Outfit'] text-[26px] font-normal text-[#1E3F20]/90 leading-tight">
              Perfect Sandal
            </p>
            
            <div className="flex items-center gap-2.5 mt-2.5 text-xs">
              <span className="font-bold text-[#1E3F20]">★ 4.8</span>
              <span className="text-[#D5DCCF]">|</span>
              <span className="text-[#667360] font-medium">124 verified reviews</span>
            </div>
          </div>

          {/* Product Gallery Showcase */}
          <div className="relative mb-6">
            <div className="flex items-center gap-1.5 mb-3.5 overflow-x-auto no-scrollbar pb-0.5">
              {galleryImages.map((thumb) => {
                const isActive = activeTab === thumb.label;
                return (
                  <button
                    key={thumb.label}
                    onClick={() => {
                      setActiveTab(thumb.label);
                      if (thumb.isVideo) {
                        setStageMediaMode('video');
                      } else {
                        setStageMediaMode('photo');
                      }
                    }}
                    className="flex flex-col items-center gap-1 group cursor-pointer shrink-0"
                  >
                    <div className={`relative w-[52px] h-[52px] rounded-xl overflow-hidden transition-all duration-200 bg-white ${
                      isActive 
                        ? 'border-[2.5px] border-[#1E3F20] shadow-md ring-2 ring-[#1E3F20]/15 scale-[1.03]' 
                        : 'border border-[#E8EDDF] opacity-80 hover:opacity-100'
                    }`}>
                      <img src={thumb.src} alt={thumb.label} className="w-full h-full object-cover" />
                      {thumb.isVideo ? (
                        <div className="absolute bottom-1 right-1 bg-black/75 backdrop-blur-xs rounded-full w-3.5 h-3.5 flex items-center justify-center text-white shadow-xs">
                          <Play size={6.5} fill="white" className="ml-0.5" />
                        </div>
                      ) : (
                        <div className="absolute bottom-1 right-1 bg-[#1E3F20]/85 backdrop-blur-xs rounded-full w-3.5 h-3.5 flex items-center justify-center text-[#84BD3A] shadow-xs">
                          <Camera size={7} />
                        </div>
                      )}
                    </div>
                    <span className={`text-[9.5px] font-['Geist_Mono'] transition-colors whitespace-nowrap ${
                      isActive ? 'font-bold text-[#1E3F20]' : 'text-[#667360]'
                    }`}>
                      {thumb.label}
                    </span>
                  </button>
                );
              })}

              <button 
                onClick={() => {
                  const cur = galleryImages.find(g => g.label === activeTab) || galleryImages[0];
                  setActiveVideoModal({
                    title: cur.videoTitle || cur.title,
                    desc: cur.videoDesc || cur.desc,
                    duration: cur.duration,
                    views: cur.views,
                    poster: cur.src,
                    videoUrl: cur.videoUrl || null,
                    isVideo: !!cur.isVideo
                  });
                }}
                title="Full view"
                className="ml-auto w-9 h-9 rounded-full border border-[#D5DCCF] bg-white flex items-center justify-center text-[#1E3F20] hover:bg-gray-50 shadow-sm transition cursor-pointer shrink-0"
              >
                <Maximize2 size={14} />
              </button>
            </div>

            {/* Main Stage */}
            <div className="relative bg-[#E8EDDF] rounded-3xl h-[340px] overflow-hidden border border-[#D5DCCF]/60 shadow-sm group">
              {galleryImages.find(g => g.label === activeTab)?.isVideo ? (
                <>
                  <div className="absolute top-3.5 left-4 z-20 flex items-center bg-black/65 backdrop-blur-md rounded-full p-0.5 border border-white/20 shadow-lg">
                    <button
                      onClick={() => setStageMediaMode('photo')}
                      className={`px-3 py-1 rounded-full text-[9px] font-['Geist_Mono'] font-bold transition-all cursor-pointer ${
                        stageMediaMode === 'photo'
                          ? 'bg-[#84BD3A] text-[#1E3F20] shadow-sm'
                          : 'text-white/80 hover:text-white'
                      }`}
                    >
                      PHOTO
                    </button>
                    <button
                      onClick={() => setStageMediaMode('video')}
                      className={`px-3 py-1 rounded-full text-[9px] font-['Geist_Mono'] font-bold transition-all flex items-center gap-1 cursor-pointer ${
                        stageMediaMode === 'video'
                          ? 'bg-[#84BD3A] text-[#1E3F20] shadow-sm'
                          : 'text-white/80 hover:text-white'
                      }`}
                    >
                      <Play size={9} fill="currentColor" />
                      <span>VIDEO</span>
                    </button>
                  </div>

                  <div className="absolute top-3.5 right-3.5 z-20 flex items-center gap-2">
                    {stageMediaMode === 'video' ? (
                      <button
                        onClick={() => setIsStageMuted(!isStageMuted)}
                        className="h-7 px-2.5 rounded-full bg-black/65 hover:bg-black/85 backdrop-blur-md text-white text-[9px] font-['Geist_Mono'] font-bold flex items-center gap-1.5 border border-white/20 shadow-md cursor-pointer transition"
                      >
                        {isStageMuted ? <VolumeX size={11} className="text-[#84BD3A]" /> : <Volume2 size={11} className="text-[#84BD3A]" />}
                        <span>{isStageMuted ? 'MUTED' : 'AUDIO ON'}</span>
                      </button>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setStageMediaMode('video')}
                        className="bg-black/65 hover:bg-black/85 backdrop-blur-md text-white text-[9.5px] font-['Geist_Mono'] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-white/25 shadow-lg cursor-pointer transition"
                      >
                        <Play size={10} fill="#84BD3A" className="text-[#84BD3A]" />
                        <span>WATCH VIDEO</span>
                      </motion.button>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className="absolute top-3.5 left-4 z-20 flex items-center bg-black/65 backdrop-blur-md rounded-full px-3 py-1.5 border border-white/20 shadow-lg text-white text-[9.5px] font-['Geist_Mono'] font-bold gap-1.5">
                    <Camera size={11} className="text-[#84BD3A]" />
                    <span>PRODUCT PHOTO</span>
                  </div>
                  <div className="absolute top-3.5 right-3.5 z-20 bg-black/65 backdrop-blur-md text-[#84BD3A] text-[9px] font-['Geist_Mono'] font-bold px-2.5 py-1.5 rounded-full border border-white/20 shadow-md flex items-center gap-1">
                    <Sparkles size={10} />
                    <span>HIGH DEFINITION</span>
                  </div>
                </>
              )}

              {/* Stage Media Render */}
              {stageMediaMode === 'video' && galleryImages.find(g => g.label === activeTab)?.isVideo ? (
                <div className="w-full h-full relative bg-black flex items-center justify-center">
                  <video 
                    key={`stage-video-${activeTab}`}
                    src={galleryImages.find(g => g.label === activeTab)?.videoUrl || '/assets/cloudwalk-preview.mp4'} 
                    poster={galleryImages.find(g => g.label === activeTab)?.src}
                    autoPlay
                    loop
                    muted={isStageMuted}
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-16 right-4 z-10 bg-black/50 backdrop-blur-xs text-white/90 text-[8px] font-['Geist_Mono'] px-2 py-0.5 rounded-md border border-white/10">
                    4K MOTION PREVIEW
                  </div>
                </div>
              ) : (
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={activeTab}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    src={galleryImages.find(g => g.label === activeTab)?.src || '/assets/product-thumbnail.png'} 
                    alt={activeTab} 
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
              )}

              {/* Bottom Info Bar Overlay */}
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/50 via-black/20 to-transparent pointer-events-none flex items-end justify-between px-5 pb-3.5">
                <div className="text-[9.5px] font-['Geist_Mono'] font-bold tracking-widest text-white uppercase drop-shadow-sm flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#84BD3A] animate-pulse" />
                  CLOUDWALK / 0{galleryImages.findIndex(g => g.label === activeTab) + 1}
                </div>

                <div className="flex items-center gap-1.5 pointer-events-auto">
                  {galleryImages.map((g, idx) => {
                    const isActive = g.label === activeTab;
                    return (
                      <button
                        key={g.label}
                        onClick={() => {
                          setActiveTab(g.label);
                          if (g.isVideo) {
                            setStageMediaMode('video');
                          } else {
                            setStageMediaMode('photo');
                          }
                        }}
                        className={`transition-all duration-300 rounded-full cursor-pointer ${
                          isActive 
                            ? 'w-5 h-1.5 bg-[#84BD3A]' 
                            : 'w-1.5 h-1.5 bg-white/60 hover:bg-white'
                        }`}
                        aria-label={`Slide ${idx + 1}`}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Row */}
          <div className="flex items-baseline justify-between border-b border-[#E8EDDF] pb-5 mb-5">
            <div>
              <div className="flex items-baseline gap-2.5">
                <span className="font-['Outfit'] text-[32px] font-bold text-[#1E3F20]">₹2,499</span>
                <span className="font-['Outfit'] text-sm text-[#7A6F63] line-through">₹3,299</span>
              </div>
              <p className="text-[11px] text-[#667360] mt-0.5">Inclusive of all taxes · Free shipping</p>
            </div>
            <div className="bg-[#E8EDDF] text-[#1E3F20] font-['Geist_Mono'] text-xs font-bold px-2.5 py-1 rounded">
              24% OFF
            </div>
          </div>

          {/* Color Selection Card */}
          <div className="flex items-center justify-between mb-6 bg-white p-3 rounded-2xl border border-[#E8EDDF] shadow-sm">
            <div className="flex items-center gap-3.5">
              <div className="relative w-14 h-14 rounded-xl border-2 border-[#1E3F20] p-1 bg-[#F8F7EF]">
                <img src="/assets/product-thumbnail.png" alt="Stone Beige" className="w-full h-full object-cover rounded-lg" />
                <div className="absolute -bottom-1 -right-1 bg-[#1E3F20] text-white rounded-full p-0.5">
                  <Check size={11} strokeWidth={3} />
                </div>
              </div>
              <div>
                <p className="text-[10px] text-[#667360] uppercase font-['Geist_Mono']">Color</p>
                <p className="font-['Outfit'] text-sm font-bold text-[#1E3F20]">Stone Beige</p>
              </div>
            </div>
            <span className="text-xs font-['Geist_Mono'] text-[#667360]">Selected</span>
          </div>

          {/* Size Selector */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <p className="font-['Outfit'] text-sm font-bold text-[#1E3F20]">Size · UK {selectedSize}</p>
              <button 
                onClick={() => setIsSizeChartOpen(true)}
                className="text-xs font-semibold text-[#1E3F20] underline underline-offset-4 flex items-center gap-1 hover:text-[#84BD3A] cursor-pointer"
              >
                <Ruler size={14} /> Size chart & fit guide
              </button>
            </div>
            
            <div className="grid grid-cols-6 gap-2">
              {sizes.map((s) => (
                <button
                  key={s.num}
                  onClick={() => s.available && setSelectedSize(s.num)}
                  disabled={!s.available}
                  className={`h-12 rounded-xl text-sm font-['Outfit'] font-bold transition-all relative cursor-pointer ${
                    !s.available 
                      ? 'border border-[#E8EDDF] text-[#667360]/40 bg-gray-100/60 cursor-not-allowed'
                      : selectedSize === s.num
                        ? 'bg-[#1E3F20] text-white shadow-md'
                        : 'border border-[#D5DCCF] text-[#1E3F20] bg-white hover:border-[#1E3F20]'
                  }`}
                >
                  {s.num}
                  {!s.available && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-full h-px bg-[#D5DCCF] -rotate-45"></div>
                    </div>
                  )}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-[#667360] mt-2 font-['Geist_Mono']">UK 9 is currently unavailable</p>
          </div>

          {/* Delivery Check */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2.5">
              <Truck size={16} className="text-[#1E3F20]" />
              <p className="font-['Outfit'] text-xs font-bold text-[#1E3F20]">Estimated delivery date</p>
            </div>
            <div className="flex bg-white rounded-xl border border-[#D5DCCF] p-1 shadow-sm focus-within:border-[#1E3F20]">
              <input 
                type="text" 
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="Enter 6-digit pincode" 
                className="flex-1 text-xs px-3 outline-none font-medium text-[#1E3F20] bg-transparent"
              />
              <button 
                onClick={() => setPincodeChecked(true)}
                className="bg-[#E8EDDF] text-[#1E3F20] text-xs font-['Outfit'] font-bold px-5 py-2.5 rounded-lg hover:bg-[#dfe4d5] transition cursor-pointer"
              >
                Check
              </button>
            </div>
            {pincodeChecked && (
              <p className="text-[10px] text-[#1E3F20] font-medium mt-1.5 flex items-center gap-1">
                <CheckCircle2 size={12} className="text-[#84BD3A]" /> Delivery in 2–4 business days · Cash on Delivery eligible
              </p>
            )}
          </div>

          {/* Action CTAs */}
          <div className="flex gap-3 mb-6">
            <button 
              onClick={() => {
                addToCart({
                  id: 'cloudwalk-stone-beige',
                  title: 'CloudWalk Perfect Sandal',
                  color: 'Stone Beige',
                  size: selectedSize,
                  price: 2499,
                  originalPrice: 3299,
                  image: '/assets/product-thumbnail.png',
                });
              }}
              className="flex-1 bg-white border-2 border-[#1E3F20] text-[#1E3F20] font-['Outfit'] font-bold py-3.5 rounded-xl text-sm hover:bg-gray-50 shadow-sm transition cursor-pointer"
            >
              Add to Cart
            </button>
            <button 
              onClick={() => {
                addToCart({
                  id: 'cloudwalk-stone-beige',
                  title: 'CloudWalk Perfect Sandal',
                  color: 'Stone Beige',
                  size: selectedSize,
                  price: 2499,
                  originalPrice: 3299,
                  image: '/assets/product-thumbnail.png',
                });
                setIsCartOpen(true);
              }}
              className="flex-1 bg-[#84BD3A] hover:bg-[#77ab32] text-[#1E3F20] font-['Outfit'] font-bold py-3.5 rounded-xl text-sm shadow-md transition cursor-pointer"
            >
              Buy Now
            </button>
          </div>

          {/* Guarantees */}
          <div className="grid grid-cols-2 gap-y-3.5 gap-x-2 text-xs font-medium text-[#667360] pb-6 border-b border-[#E8EDDF]">
            <div className="flex items-center gap-2"><Truck size={15} className="text-[#1E3F20]"/> Free Shipping</div>
            <div className="flex items-center gap-2"><CheckCircle2 size={15} className="text-[#1E3F20]"/> Cash on Delivery</div>
            <div className="flex items-center gap-2"><RefreshCw size={15} className="text-[#1E3F20]"/> 30-Day Easy Exchange</div>
            <div className="flex items-center gap-2"><ShieldCheck size={15} className="text-[#1E3F20]"/> Secure Payment</div>
            <div className="flex items-center gap-2 col-span-2"><Headset size={15} className="text-[#1E3F20]"/> 24x7 WhatsApp & Phone Support</div>
          </div>

          {/* ========================================================================= */}
          {/* THE COMFORT DIFFERENCE: MEDIFEET VS REGULAR FOOTWEAR                       */}
          {/* ========================================================================= */}
          <section className="mt-14 mb-14">
            <div className="flex items-center justify-between mb-1">
              <div className="font-['Geist_Mono'] text-[9px] font-bold text-[#667360] tracking-widest uppercase">
                THE COMFORT DIFFERENCE
              </div>
              <span className="bg-[#E8EDDF] text-[#1E3F20] font-['Geist_Mono'] text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                Interactive Lab
              </span>
            </div>
            
            <h2 className="font-['Outfit'] text-[32px] font-semibold text-[#1E3F20] leading-tight mb-2">
              Medifeet vs Regular Footwear
            </h2>
            <p className="text-xs text-[#667360] leading-relaxed mb-5">
              Hover pins 1–4 to see how intentional biomechanics relieve foot stress compared to ordinary footwear.
            </p>

            {/* View Mode Pill Switcher */}
            <div className="flex items-center justify-between bg-[#EFECE6] p-1 rounded-2xl border border-[#D5DCCF] mb-4">
              <div className="text-[10px] font-['Geist_Mono'] font-bold text-[#667360] pl-2 uppercase flex items-center gap-1.5">
                <Layers size={12} className="text-[#1E3F20]" />
                <span>Compare Mode</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setCompareViewMode('combined')}
                  className={`px-3 py-1.5 rounded-xl text-[10px] font-['Geist_Mono'] font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    compareViewMode === 'combined'
                      ? 'bg-[#1E3F20] text-white shadow-sm ring-1 ring-[#84BD3A]/50'
                      : 'text-[#667360] hover:text-[#1E3F20] hover:bg-black/5'
                  }`}
                >
                  <MoveHorizontal size={11} className={compareViewMode === 'combined' ? 'text-[#84BD3A]' : ''} />
                  <span>Combined Slider</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCompareViewMode('side-by-side')}
                  className={`px-3 py-1.5 rounded-xl text-[10px] font-['Geist_Mono'] font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    compareViewMode === 'side-by-side'
                      ? 'bg-[#1E3F20] text-white shadow-sm ring-1 ring-[#84BD3A]/50'
                      : 'text-[#667360] hover:text-[#1E3F20] hover:bg-black/5'
                  }`}
                >
                  <Sliders size={11} className={compareViewMode === 'side-by-side' ? 'text-[#84BD3A]' : ''} />
                  <span>Synced Dual</span>
                </button>
              </div>
            </div>

            {/* Stage */}
            {compareViewMode === 'combined' ? (
              <div className="mb-4">
                <div 
                  ref={sliderContainerRef}
                  onMouseMove={handleMouseMove}
                  onTouchMove={handleTouchMove}
                  onMouseDown={() => setIsDraggingSlider(true)}
                  onMouseUp={() => setIsDraggingSlider(false)}
                  onTouchStart={() => setIsDraggingSlider(true)}
                  onTouchEnd={() => setIsDraggingSlider(false)}
                  onClick={(e) => handleSliderMove(e.clientX)}
                  className="relative w-full h-60 rounded-3xl overflow-hidden cursor-ew-resize select-none border border-[#D5DCCF] shadow-lg bg-white group"
                >
                  <div className="absolute inset-0 bg-[#F4F7F1] flex items-center justify-center p-3">
                    <div className="absolute top-3 right-3 bg-[#1E3F20] text-[#84BD3A] text-[8px] font-['Geist_Mono'] font-bold px-2 py-0.5 rounded-full border border-[#84BD3A]/30 flex items-center gap-1 z-10 shadow-sm">
                      <Sparkles size={9} /> MEDIFEET CLOUDWALK
                    </div>
                    <img 
                      src="/assets/product-thumbnail.png" 
                      alt="Medifeet Sandal" 
                      className="max-h-[88%] object-contain drop-shadow-md z-0 scale-105" 
                    />
                  </div>

                  <div 
                    className="absolute inset-0 bg-[#F7F6F3] flex items-center justify-center p-3 pointer-events-none"
                    style={{ clipPath: `inset(0 ${100 - splitSliderPos}% 0 0)` }}
                  >
                    <div className="absolute top-3 left-3 bg-[#E5E0D6] text-[#7A6F63] text-[8px] font-['Geist_Mono'] font-bold px-2 py-0.5 rounded-full border border-[#C5B592] flex items-center gap-1 z-10 shadow-sm">
                      <AlertTriangle size={9} className="text-[#C25443]" /> ORDINARY FOOTWEAR
                    </div>
                    <img 
                      src="/assets/generic-ordinary-shoe-illustrative-photo.png" 
                      alt="Ordinary Shoe" 
                      className="max-h-[88%] object-contain drop-shadow-md scale-105" 
                    />
                  </div>

                  <div 
                    className="absolute inset-y-0 w-0.5 bg-[#1E3F20] shadow-[0_0_12px_rgba(132,189,58,0.9)] z-20 pointer-events-none"
                    style={{ left: `${splitSliderPos}%` }}
                  >
                    <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#1E3F20] border-2 border-white shadow-xl flex items-center justify-center text-white cursor-ew-resize">
                      <MoveHorizontal size={13} className="text-[#84BD3A] animate-pulse" />
                    </div>
                  </div>

                  {comparisonData.map((pt) => {
                    const isSelected = activeComparePoint === pt.id;
                    const pinPos = pt.combinedMediPos;
                    return (
                      <div
                        key={pt.id}
                        style={{ top: pinPos.top, left: pinPos.left }}
                        onMouseEnter={() => handleComparePointHover(pt.id)}
                        onMouseLeave={handleComparePointLeave}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleComparePointClick(pt.id);
                        }}
                        className="absolute -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer"
                      >
                        {isSelected && (
                          <div className="absolute -inset-1 rounded-full border-2 border-[#84BD3A] pointer-events-none" />
                        )}
                        <motion.div
                          whileHover={{ scale: 1.25 }}
                          animate={isSelected ? { scale: 1.2 } : { scale: 1 }}
                          transition={{ duration: 0.2 }}
                          style={{ backgroundColor: pinColors[pt.id].bg, color: pinColors[pt.id].text }}
                          className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] shadow-lg border-2 transition-all ${
                            isSelected ? 'border-[#84BD3A] ring-2 ring-[#84BD3A]/60' : 'border-white'
                          }`}
                        >
                          {pt.id}
                        </motion.div>
                      </div>
                    );
                  })}

                  <div className="absolute bottom-2.5 inset-x-0 flex justify-center pointer-events-none z-15">
                    <span className="bg-[#1E3F20]/80 backdrop-blur-md text-white text-[8px] font-['Geist_Mono'] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm border border-white/10">
                      <MoveHorizontal size={10} className="text-[#84BD3A]" /> Drag line or hover pins 1–4
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 mb-4">
                {/* Ordinary Card */}
                <div className="bg-[#F0EDE8] rounded-3xl p-3 border border-[#E5E0D6] flex flex-col justify-between relative shadow-sm group">
                  <div>
                    <div className="text-center font-['Geist_Mono'] text-[9px] font-bold text-[#7A6F63] uppercase pb-2.5 border-b border-[#E5E0D6] mb-2.5 flex items-center justify-center gap-1">
                      <AlertTriangle size={10} className="text-[#C25443]" />
                      ORDINARY SHOES
                    </div>
                    
                    <div className="bg-white h-48 rounded-2xl p-2.5 flex items-center justify-center mb-3 relative overflow-hidden border border-[#E5E0D6] shadow-xs">
                      <img 
                        src="/assets/generic-ordinary-shoe-illustrative-photo.png" 
                        alt="Ordinary Shoe" 
                        className="w-full h-full object-contain filter drop-shadow-sm transition-transform duration-500 group-hover:scale-105" 
                      />

                      {comparisonData.map((pt) => {
                        const isSelected = activeComparePoint === pt.id;
                        return (
                          <div
                            key={pt.id}
                            style={{ top: pt.ordPos.top, left: pt.ordPos.left }}
                            onMouseEnter={() => handleComparePointHover(pt.id)}
                            onMouseLeave={handleComparePointLeave}
                            onClick={() => handleComparePointClick(pt.id)}
                            className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20"
                          >
                            {isSelected && (
                              <div className="absolute -inset-1.5 rounded-full border-2 border-[#C25443] pointer-events-none" />
                            )}
                            <motion.div 
                              whileHover={{ scale: 1.25 }}
                              animate={isSelected ? { scale: 1.2 } : { scale: 1 }}
                              transition={{ duration: 0.2 }}
                              style={{ backgroundColor: pinColors[pt.id].bg, color: pinColors[pt.id].text }}
                              className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[9px] shadow-md border ${
                                isSelected ? 'border-[#C25443] ring-2 ring-[#C25443]/40' : 'border-white'
                              }`}
                            >
                              {pt.id}
                            </motion.div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <ul className="space-y-1 text-[11px] text-[#7A6F63]">
                    {comparisonData.map((pt) => {
                      const isSelected = activeComparePoint === pt.id;
                      return (
                        <li 
                          key={pt.id}
                          onMouseEnter={() => handleComparePointHover(pt.id)}
                          onMouseLeave={handleComparePointLeave}
                          onClick={() => handleComparePointClick(pt.id)}
                          className={`flex items-center gap-2 px-2.5 py-2 rounded-xl cursor-pointer transition-all duration-200 ${
                            isSelected 
                              ? 'bg-white shadow-sm font-semibold text-[#8C4A3E] border border-[#E5E0D6]/60' 
                              : 'hover:bg-white/50 text-[#7A6F63]'
                          }`}
                        >
                          <span 
                            style={{ backgroundColor: pinColors[pt.id].bg, color: pinColors[pt.id].text }}
                            className="w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold shrink-0 shadow-xs"
                          >
                            {pt.id}
                          </span>
                          <span className="truncate">{pt.ordinary.name}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Medifeet Card */}
                <div className="bg-[#1E3F20] rounded-3xl p-3 text-white shadow-xl flex flex-col justify-between relative group">
                  <div>
                    <div className="text-center font-['Geist_Mono'] text-[9px] font-bold text-[#84BD3A] uppercase pb-2.5 border-b border-white/10 mb-2.5 flex items-center justify-center gap-1">
                      <Sparkles size={10} className="text-[#84BD3A]" />
                      MEDIFEET CLOUDWALK
                    </div>

                    <div className="bg-white h-48 rounded-2xl p-2.5 flex items-center justify-center mb-3 relative overflow-hidden shadow-xs">
                      <img 
                        src="/assets/product-thumbnail.png" 
                        alt="CloudWalk Sandal" 
                        className="w-full h-full object-contain filter drop-shadow-sm transition-transform duration-500 group-hover:scale-105" 
                      />

                      {comparisonData.map((pt) => {
                        const isSelected = activeComparePoint === pt.id;
                        return (
                          <div
                            key={pt.id}
                            style={{ top: pt.mediPos.top, left: pt.mediPos.left }}
                            onMouseEnter={() => handleComparePointHover(pt.id)}
                            onMouseLeave={handleComparePointLeave}
                            onClick={() => handleComparePointClick(pt.id)}
                            className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20"
                          >
                            {isSelected && (
                              <div className="absolute -inset-1.5 rounded-full border-2 border-[#84BD3A] pointer-events-none" />
                            )}
                            <motion.div 
                              whileHover={{ scale: 1.25 }}
                              animate={isSelected ? { scale: 1.2 } : { scale: 1 }}
                              transition={{ duration: 0.2 }}
                              style={{ backgroundColor: pinColors[pt.id].bg, color: pinColors[pt.id].text }}
                              className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[9px] shadow-lg border ${
                                isSelected ? 'border-[#84BD3A] ring-2 ring-[#84BD3A]/60' : 'border-white'
                              }`}
                            >
                              {pt.id}
                            </motion.div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <ul className="space-y-1 text-[11px] text-white/95">
                    {comparisonData.map((pt) => {
                      const isSelected = activeComparePoint === pt.id;
                      return (
                        <li 
                          key={pt.id}
                          onMouseEnter={() => handleComparePointHover(pt.id)}
                          onMouseLeave={handleComparePointLeave}
                          onClick={() => handleComparePointClick(pt.id)}
                          className={`flex items-center gap-2 px-2.5 py-2 rounded-xl cursor-pointer transition-all duration-200 ${
                            isSelected 
                              ? 'bg-white/15 shadow-sm font-semibold text-[#84BD3A] border border-white/10' 
                              : 'hover:bg-white/10 text-white/80'
                          }`}
                        >
                          <span 
                            style={{ backgroundColor: pinColors[pt.id].bg, color: pinColors[pt.id].text }}
                            className="w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold shrink-0 shadow-xs"
                          >
                            {pt.id}
                          </span>
                          <span className="truncate">{pt.medifeet.name}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            )}

            {/* Dynamic Reveal Card */}
            {(() => {
              const selectedData = comparisonData.find(d => d.id === activeComparePoint) || comparisonData[1];
              return (
                <div className="mb-12">
                  <motion.div
                    key={selectedData.id}
                    initial={{ opacity: 0.7, y: 3 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="bg-white rounded-2xl border-2 border-[#1E3F20]/15 p-4 shadow-lg relative overflow-hidden"
                  >
                    <div 
                      className="h-1 absolute top-0 inset-x-0" 
                      style={{ backgroundColor: pinColors[selectedData.id].border }}
                    />

                    <div className="flex items-center justify-between gap-1.5 mb-3 bg-[#F4F5F1] p-1 rounded-xl">
                      {comparisonData.map((pt) => {
                        const isCur = selectedData.id === pt.id;
                        return (
                          <button
                            key={pt.id}
                            onClick={() => handleComparePointClick(pt.id)}
                            onMouseEnter={() => handleComparePointHover(pt.id)}
                            onMouseLeave={handleComparePointLeave}
                            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-1 rounded-lg text-[10px] font-['Geist_Mono'] font-bold transition-all cursor-pointer ${
                              isCur 
                                ? 'bg-[#1E3F20] text-white shadow-xs' 
                                : 'text-[#667360] hover:text-[#1E3F20] hover:bg-white'
                            }`}
                          >
                            <span 
                              style={{ backgroundColor: pinColors[pt.id].bg, color: pinColors[pt.id].text }}
                              className="w-3.5 h-3.5 rounded-full flex items-center justify-center text-[7.5px] font-bold"
                            >
                              {pt.id}
                            </span>
                            <span className="truncate">{pt.shortTitle}</span>
                          </button>
                        );
                      })}
                    </div>

                    <div className="flex items-center justify-between gap-2 mb-3 pt-0.5">
                      <div className="flex items-center gap-2">
                        <span 
                          style={{ backgroundColor: pinColors[selectedData.id].bg, color: pinColors[selectedData.id].text }}
                          className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow-xs shrink-0"
                        >
                          {selectedData.id}
                        </span>
                        <div>
                          <span className="text-[9px] font-['Geist_Mono'] font-bold text-[#667360] uppercase tracking-wider block">
                            POINT {selectedData.id} · {selectedData.category}
                          </span>
                          <h4 className="font-['Outfit'] font-bold text-[15px] text-[#1E3F20] leading-none">
                            {selectedData.title}
                          </h4>
                        </div>
                      </div>

                      <div className="bg-[#1E3F20] text-[#84BD3A] px-2.5 py-1 rounded-full text-[10px] font-['Geist_Mono'] font-bold shadow-xs flex items-center gap-1 shrink-0">
                        <Sparkles size={11} className="text-[#84BD3A]" />
                        {selectedData.metric}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5 mb-3">
                      <div className="bg-[#F8F6F2] rounded-xl p-3 border border-[#E5E0D6] flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-1 text-[9px] font-['Geist_Mono'] font-bold text-[#8C4A3E] uppercase mb-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#C25443]"></span>
                            ORDINARY SHOE
                          </div>
                          <div className="font-['Outfit'] font-bold text-[13px] text-[#252A24] mb-1 flex items-center gap-1.5">
                            <span 
                              style={{ backgroundColor: pinColors[selectedData.id].bg, color: pinColors[selectedData.id].text }}
                              className="w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold shrink-0 shadow-xs"
                            >
                              {selectedData.id}
                            </span>
                            <span className="truncate">{selectedData.ordinary.name}</span>
                          </div>
                          <p className="text-[10px] text-[#697066] leading-relaxed">
                            {selectedData.ordinary.desc}
                          </p>
                        </div>
                        <div className="mt-2.5 pt-2 border-t border-[#E5E0D6] text-[9px] font-semibold text-[#8C4A3E]">
                          ⚠️ {selectedData.ordinary.flaw}
                        </div>
                      </div>

                      <div className="bg-[#1E3F20] text-white rounded-xl p-3 border border-[#2D5A30] flex flex-col justify-between shadow-sm">
                        <div>
                          <div className="flex items-center gap-1 text-[9px] font-['Geist_Mono'] font-bold text-[#84BD3A] uppercase mb-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#84BD3A]"></span>
                            MEDIFEET ADVANTAGE
                          </div>
                          <div className="font-['Outfit'] font-bold text-[13px] text-white mb-1 flex items-center gap-1.5">
                            <span 
                              style={{ backgroundColor: pinColors[selectedData.id].bg, color: pinColors[selectedData.id].text }}
                              className="w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold shrink-0 shadow-xs"
                            >
                              {selectedData.id}
                            </span>
                            <span className="truncate text-[#84BD3A]">{selectedData.medifeet.name}</span>
                          </div>
                          <p className="text-[10px] text-white/80 leading-relaxed">
                            {selectedData.medifeet.desc}
                          </p>
                        </div>
                        <div className="mt-2.5 pt-2 border-t border-white/10 text-[9px] font-semibold text-[#84BD3A] flex items-center gap-1">
                          <CheckCircle2 size={11} className="text-[#84BD3A]" />
                          <span>{selectedData.medifeet.advantage}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#F4F7F1] rounded-xl p-2.5 flex items-center justify-between gap-3 text-[10px]">
                      <span className="text-[#667360] font-medium shrink-0 flex items-center gap-1">
                        <Activity size={12} className="text-[#1E3F20]" /> Comfort Distribution
                      </span>
                      <div className="flex-1 flex items-center gap-2">
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden flex">
                          <div 
                            className="bg-[#C25443] h-full transition-all duration-500" 
                            style={{ width: `${100 - selectedData.metricPercent}%` }}
                          />
                          <div 
                            className="bg-[#84BD3A] h-full transition-all duration-500" 
                            style={{ width: `${selectedData.metricPercent}%` }}
                          />
                        </div>
                        <span className="font-['Geist_Mono'] font-bold text-[#1E3F20] text-[10px]">
                          {selectedData.metricPercent}% Balanced
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })()}
          </section>

          {/* ========================================================================= */}
          {/* DESIGNED AROUND YOUR DAY: SMALL DETAILS. BIG COMFORT.                     */}
          {/* ========================================================================= */}
          <section className="mb-14">
            <div className="mb-6">
              <div className="font-['Geist_Mono'] text-[11px] text-[#1E3F20] uppercase tracking-wider font-medium mb-1">
                DESIGNED AROUND YOUR DAY
              </div>
              <h2 className="font-['Outfit'] text-[28px] font-semibold text-[#252A24] leading-tight">
                Small details. Big comfort.
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-3">
              {/* 1. Only The Finest Materials */}
              <div className="bg-white rounded-[24px] overflow-hidden shadow-xs border border-[#E8EDDF] flex flex-col group transition-all">
                <div className="h-[110px] w-full overflow-hidden relative bg-[#F7F9F6]">
                  <img 
                    src="/assets/materials-conceptual-leather-texture.png" 
                    alt="Finest Materials" 
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute top-2 left-2 bg-black/65 backdrop-blur-xs text-[#84BD3A] text-[6.5px] font-['Geist_Mono'] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs flex items-center gap-1 z-10 border border-white/10">
                    <span className="w-1 h-1 rounded-full bg-[#84BD3A]" />
                    SUPPLE GRAIN
                  </div>
                  <div className="absolute bottom-2 right-2 bg-[#1F3D1F]/75 backdrop-blur-xs text-[#84BD3A] text-[7.5px] font-['Geist_Mono'] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                    PREMIUM
                  </div>
                </div>
                <div className="p-3.5 flex flex-col gap-2 flex-1 justify-between">
                  <div>
                    <Diamond className="w-4 h-4 text-[#1F3D1F] mb-1.5" strokeWidth={2} />
                    <h3 className="font-['Outfit'] font-semibold text-[15px] text-[#252A24] leading-snug mb-1">
                      Finest Raw Materials
                    </h3>
                    <p className="font-['Geist'] text-[12px] text-[#697066] leading-relaxed">
                      Hand-inspected genuine leathers and gentle woven straps chosen for zero chafing.
                    </p>
                  </div>
                </div>
              </div>

              {/* 2. Light As A Whisper */}
              <div className="bg-white rounded-[24px] overflow-hidden shadow-xs border border-[#E8EDDF] flex flex-col group transition-all">
                <div className="h-[110px] w-full overflow-hidden relative bg-[#F4F5F2]">
                  <img 
                    src="/assets/lightweight-airy-feather-concept.png" 
                    alt="Light As A Whisper" 
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute top-2 left-2 bg-[#1F3D1F]/80 backdrop-blur-xs text-[#84BD3A] text-[6.5px] font-['Geist_Mono'] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs flex items-center gap-1 z-10 border border-[#84BD3A]/30">
                    <span className="w-1 h-1 rounded-full bg-[#84BD3A]" />
                    FEATHERLIGHT · 220g
                  </div>
                </div>
                <div className="p-3.5 flex flex-col gap-2 flex-1 justify-between">
                  <div>
                    <Feather className="w-4 h-4 text-[#1F3D1F] mb-1.5" strokeWidth={2} />
                    <h3 className="font-['Outfit'] font-semibold text-[15px] text-[#252A24] leading-snug mb-1">
                      Light As A Whisper
                    </h3>
                    <p className="font-['Geist'] text-[12px] text-[#697066] leading-relaxed">
                      Weighs only 220 grams per shoe, reducing energy expenditure during prolonged walking.
                    </p>
                  </div>
                </div>
              </div>

              {/* 3. Luxury You Can Feel */}
              <div className="bg-white rounded-[24px] overflow-hidden shadow-xs border border-[#E8EDDF] flex flex-col group transition-all">
                <div className="h-[110px] w-full overflow-hidden relative bg-[#EBE7DF]">
                  <img 
                    src="/assets/softness-conceptual-textile-folds.png" 
                    alt="Luxury You Can Feel" 
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute top-2 left-2 bg-black/65 backdrop-blur-xs text-white text-[6.5px] font-['Geist_Mono'] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs flex items-center gap-1 z-10 border border-white/10">
                    <span className="w-1 h-1 rounded-full bg-[#84BD3A]" />
                    SILKY FEEL
                  </div>
                </div>
                <div className="p-3.5 flex flex-col gap-2 flex-1 justify-between">
                  <div>
                    <Sparkles className="w-4 h-4 text-[#1F3D1F] mb-1.5" strokeWidth={2} />
                    <h3 className="font-['Outfit'] font-semibold text-[15px] text-[#252A24] leading-snug mb-1">
                      Luxury You Can Feel
                    </h3>
                    <p className="font-['Geist'] text-[12px] text-[#697066] leading-relaxed">
                      Indulgently soft microfiber touch against bare skin without pinching or binding.
                    </p>
                  </div>
                </div>
              </div>

              {/* 4. Purpose-Driven Engineering */}
              <div className="bg-white rounded-[24px] overflow-hidden shadow-xs border border-[#E8EDDF] flex flex-col group transition-all">
                <div className="h-[110px] w-full overflow-hidden relative bg-[#F7F9F6]">
                  <img 
                    src="/assets/sole-concept-thumbnail-image.png" 
                    alt="Purpose-Driven Support" 
                    className="w-full h-full object-contain p-1 group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute bottom-2 left-2 bg-[#1F3D1F]/90 backdrop-blur-xs text-[#84BD3A] text-[6.5px] font-['Geist_Mono'] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs border border-[#84BD3A]/30 flex items-center gap-1 z-10">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#84BD3A]" />
                    ORTHO RELIEF
                  </div>
                </div>
                <div className="p-3.5 flex flex-col gap-2 flex-1 justify-between">
                  <div>
                    <Heart className="w-4 h-4 text-[#1F3D1F] mb-1.5" strokeWidth={2} />
                    <h3 className="font-['Outfit'] font-semibold text-[15px] text-[#252A24] leading-snug mb-1">
                      Purpose-Driven Design
                    </h3>
                    <p className="font-['Geist'] text-[12px] text-[#697066] leading-relaxed">
                      Crafted with podiatrists to support sensitive arches, diabetic feet, and active days.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* DEDUPLICATED COPY: Wardrobe versatility instead of repeated "morning walks to errands" phrase */}
            <div className="bg-white rounded-[24px] overflow-hidden shadow-xs border border-[#E8EDDF] mb-4 group transition-all">
              <div className="h-[140px] w-full overflow-hidden relative">
                <img 
                  src="/assets/on-foot-thumbnail.png" 
                  alt="Style In Every Step" 
                  className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent flex flex-col justify-end p-4">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Footprints className="w-4 h-4 text-white" strokeWidth={2} />
                    <span className="bg-[#84BD3A] text-[#1F3D1F] text-[8px] font-['Geist_Mono'] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                      VERSATILITY
                    </span>
                  </div>
                  <h3 className="font-['Outfit'] font-bold text-[18px] text-white tracking-tight">
                    Style In Every Step
                  </h3>
                </div>
              </div>
              <div className="p-4 bg-white">
                <p className="font-['Geist'] text-[13px] text-[#697066] leading-relaxed">
                  Pairs effortlessly with summer linens, formal kurtas, weekend denim, and travel outfits without compromising posture.
                </p>
              </div>
            </div>

            {/* Consolidated Disclaimers */}
            <div className="bg-[#F7F9F6] border border-[#DFE2D8] rounded-xl p-3 text-[11px] leading-relaxed text-[#697066] font-['Geist'] mb-10">
              *Diabetic & orthopedic support attributes are designed for everyday comfort. If you have chronic foot conditions, always consult your physician for clinical diagnosis.
            </div>

            {/* OUR STORY */}
            <div className="mb-4">
              <div className="font-['Geist_Mono'] text-[11px] text-[#1E3F20] uppercase tracking-wider font-medium mb-1">
                OUR STORY
              </div>
              <h2 className="font-['Outfit'] text-[28px] font-semibold text-[#252A24] leading-tight">
                Comfort rooted in purpose.
              </h2>
            </div>

            <div className="bg-[#1E3F20] text-white rounded-[24px] p-5 shadow-xl border border-white/5 relative overflow-hidden">
              <div className="w-full h-[180px] rounded-2xl overflow-hidden mb-4 relative shadow-inner bg-black">
                <video 
                  src="/assets/video-on-foot.mp4" 
                  poster="/assets/on-foot-thumbnail.png"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-xs text-white/90 text-[7.5px] font-['Geist_Mono'] font-bold px-2 py-0.5 rounded-full border border-white/15 flex items-center gap-1 z-10">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#84BD3A] animate-pulse" />
                  4K MOTION
                </div>
              </div>

              <div className="mb-3">
                <span className="inline-block bg-white/10 text-[#84BD3A] text-[9px] font-['Geist_Mono'] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border border-white/5">
                  EST. 1997 · MEDICAL HERITAGE
                </span>
              </div>

              <h3 className="font-['Outfit'] font-semibold text-[18px] leading-snug text-white mb-3 tracking-tight">
                We identified a gap in the market for diabetic and ortho-friendly shoes — and built a brand around it.
              </h3>

              <p className="font-['Geist'] text-[13px] text-white/75 leading-relaxed mb-5">
                Working closely with orthopedic surgeons and podiatrists since 1997, Medifeet bridges clinical ergonomics with luxury lifestyle craftsmanship so you never have to choose between comfort and elegance.
              </p>

              <div className="flex flex-wrap gap-2">
                <span className="bg-white/10 text-white/70 text-[9px] font-['Geist_Mono'] font-medium px-2.5 py-1 rounded-full uppercase tracking-wider border border-white/5">
                  ANATOMIC WELLNESS
                </span>
                <span className="bg-white/10 text-white/70 text-[9px] font-['Geist_Mono'] font-medium px-2.5 py-1 rounded-full uppercase tracking-wider border border-white/5">
                  INDIAN CRAFTSMANSHIP
                </span>
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* FIVE TECHNOLOGIES. ONE SHOE. (DEDUPLICATED & DIFFERENTIATED)              */}
          {/* ========================================================================= */}
          <div className="mb-14">
            <div className="font-['Geist_Mono'] text-[9px] font-bold text-[#667360] tracking-widest uppercase mb-1">
              INSIDE THE CLOUDWALK
            </div>
            <h2 className="font-['Outfit'] text-[32px] font-semibold text-[#1E3F20] leading-tight mb-2">
              Five technologies. One shoe.
            </h2>
            <p className="text-xs text-[#667360] leading-relaxed mb-8">
              5 distinct engineering breakthroughs working in unison across arch, midsole, outsole, lining, and instep fit.
            </p>

            <div className="space-y-6">
              {streamlinedTechnologies.map((item, idx) => {
                const isExpanded = activeTechCard === item.num;
                const isVideoActive = techMediaModes[item.num] === 'video';
                return (
                  <motion.div 
                    key={item.num}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                    onClick={() => setActiveTechCard(isExpanded ? null : item.num)}
                    className="bg-white rounded-[24px] border border-[#E8EDDF] overflow-hidden shadow-xs group cursor-pointer transition-all duration-300"
                  >
                    <div className="h-48 relative bg-[#E8EDDF] overflow-hidden">
                      {isVideoActive ? (
                        <div className="w-full h-full relative bg-black flex items-center justify-center">
                          <video 
                            src={item.videoUrl} 
                            poster={item.img}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute bottom-2 left-3 bg-black/60 backdrop-blur-xs text-white/90 text-[8px] font-['Geist_Mono'] px-2 py-0.5 rounded border border-white/10 flex items-center gap-1 z-10 pointer-events-none">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#84BD3A] animate-pulse" />
                            4K MOTION PREVIEW
                          </div>
                        </div>
                      ) : (
                        <>
                          <img 
                            src={item.img} 
                            alt={item.title} 
                            className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700" 
                          />
                          <div className={`absolute ${item.pinPos} -translate-x-1/2 -translate-y-1/2 pointer-events-none`}>
                            <span className="absolute -inset-2.5 rounded-full bg-[#84BD3A]/50 animate-ping opacity-75" />
                            <div className="w-4 h-4 rounded-full bg-[#84BD3A] border-2 border-white shadow-md flex items-center justify-center">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#1E3F20]" />
                            </div>
                            <span className="absolute top-5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#1E3F20]/90 backdrop-blur-xs text-[#84BD3A] font-['Geist_Mono'] text-[8px] font-bold px-2 py-0.5 rounded-full shadow border border-[#84BD3A]/30">
                              {item.pinLabel}
                            </span>
                          </div>
                        </>
                      )}

                      <div className="absolute top-3 left-3 z-20 flex items-center bg-black/70 backdrop-blur-md rounded-full p-0.5 border border-white/20 shadow-lg">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setTechMediaModes(prev => ({ ...prev, [item.num]: 'photo' }));
                          }}
                          className={`px-2.5 py-0.5 rounded-full text-[8px] font-['Geist_Mono'] font-bold transition-all cursor-pointer ${
                            !isVideoActive
                              ? 'bg-[#84BD3A] text-[#1E3F20] shadow-sm'
                              : 'text-white/80 hover:text-white'
                          }`}
                        >
                          PHOTO
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setTechMediaModes(prev => ({ ...prev, [item.num]: 'video' }));
                          }}
                          className={`px-2.5 py-0.5 rounded-full text-[8px] font-['Geist_Mono'] font-bold transition-all flex items-center gap-1 cursor-pointer ${
                            isVideoActive
                              ? 'bg-[#84BD3A] text-[#1E3F20] shadow-sm'
                              : 'text-white/80 hover:text-white'
                          }`}
                        >
                          <Play size={8} fill="currentColor" />
                          <span>VIDEO</span>
                        </button>
                      </div>

                      <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveVideoModal({
                              title: item.videoTitle,
                              desc: item.videoDesc,
                              duration: item.duration,
                              views: item.views,
                              poster: item.img,
                              videoUrl: item.videoUrl
                            });
                          }}
                          title="Open Full Tech Video Player"
                          className="bg-black/70 hover:bg-black/90 backdrop-blur-md text-white font-['Geist_Mono'] text-[8px] font-bold px-2 py-1 rounded-md uppercase tracking-wider shadow-xs border border-white/15 flex items-center gap-1 transition cursor-pointer"
                        >
                          <Maximize2 size={10} className="text-[#84BD3A]" />
                          <span>EXPAND</span>
                        </button>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#EBF3E7] text-[#1E3F20] flex items-center justify-center shrink-0 shadow-xs border border-[#DFE8DA]">
                          {item.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-['Geist_Mono'] text-[9px] font-bold text-[#84BD3A] tracking-wider uppercase">
                              {item.num} — {item.category}
                            </span>
                            <span className="font-['Geist_Mono'] text-[8px] text-[#667360] font-medium">
                              {isExpanded ? '▲' : '▼'}
                            </span>
                          </div>
                          <h4 className="font-['Outfit'] text-[18px] font-bold text-[#1E3F20] leading-snug mb-1.5">
                            {item.title}
                          </h4>
                          <p className="font-['Geist'] text-xs text-[#667360] leading-relaxed">
                            {item.desc}
                          </p>

                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div 
                                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                animate={{ height: "auto", opacity: 1, marginTop: 12 }}
                                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="bg-[#F7F9F6] border border-[#E8EDDF] rounded-xl p-3 flex flex-col gap-1">
                                  <div className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#84BD3A]" />
                                    <span className="font-['Outfit'] font-bold text-[11px] text-[#1E3F20]">
                                      {item.specMetric}
                                    </span>
                                  </div>
                                  <p className="font-['Geist'] text-[10px] text-[#697066] pl-3.5">
                                    {item.specDetail}
                                  </p>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* TECHNICAL SOLE SPECIFICATIONS (DIFFERENTIATED METRICS INSTEAD OF COPY)     */}
          {/* ========================================================================= */}
          <div className="mb-14 bg-white rounded-3xl p-6 border border-[#D5DCCF] shadow-sm">
            <div className="font-['Geist_Mono'] text-[9px] font-bold text-[#667360] tracking-widest uppercase mb-1">
              COMPOSITE COMPONENT BREAKDOWN
            </div>
            <h2 className="font-['Outfit'] text-2xl font-bold text-[#1E3F20] leading-tight mb-5">
              Three-Layer Engineering Blueprint
            </h2>

            <div className="relative bg-[#E8EDDF]/50 rounded-2xl overflow-hidden h-64 mb-5 flex items-center justify-center border border-[#D5DCCF]/60 shadow-inner group">
              <div className="absolute top-3 left-3 z-20 flex items-center gap-2">
                <span className="bg-[#1E3F20] text-white font-['Geist_Mono'] text-[8.5px] font-bold px-2.5 py-1 rounded-md shadow-sm border border-white/10 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#84BD3A] animate-ping" />
                  {activeSoleLayer === 'A' && 'A · 4mm Anatomical Footbed'}
                  {activeSoleLayer === 'B' && 'B · 12mm Rebound Cushioning'}
                  {activeSoleLayer === 'C' && 'C · 6mm Hex-Tread Outsole'}
                </span>
              </div>

              <motion.img 
                src="/assets/sole-concept-thumbnail-image.png" 
                alt="3-layer sole technical blueprint" 
                animate={{ 
                  y: [0, -5, 2, 0],
                  scale: [1, 1.02, 0.99, 1]
                }}
                transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
                className="w-full max-h-56 object-contain drop-shadow-md z-10 p-2 select-none pointer-events-none" 
              />
            </div>

            {/* Technical Thickness & Durometer Specs */}
            <div className="grid grid-cols-3 gap-2 mb-6">
              {[
                { id: 'A', title: 'Top Cradling', mm: '4mm' },
                { id: 'B', title: 'Mid Shock Core', mm: '12mm' },
                { id: 'C', title: 'Traction Base', mm: '6mm' }
              ].map((layer) => (
                <button
                  key={layer.id}
                  onClick={() => setActiveSoleLayer(layer.id)}
                  className={`py-2 px-1 rounded-xl text-center transition cursor-pointer ${
                    activeSoleLayer === layer.id ? 'bg-[#1E3F20] text-white shadow-sm' : 'bg-gray-100/70 text-[#667360]'
                  }`}
                >
                  <div className="text-[10px] font-['Geist_Mono'] font-bold">{layer.id} · {layer.mm}</div>
                  <div className="text-[9px] opacity-80 truncate">{layer.title}</div>
                </button>
              ))}
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex gap-3 items-start">
                <span className="w-6 h-6 rounded-full bg-[#B79B76] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                  A
                </span>
                <div>
                  <h5 className="font-['Outfit'] font-bold text-sm text-[#1E3F20]">4mm Ergonomic Footbed Liner (Shore-A 45°)</h5>
                  <p className="text-[#667360] text-[11px] mt-0.5 leading-relaxed">
                    Custom-molded polyurethane footbed calibrated at 45° durometer to gently cradle the plantar fascia.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <span className="w-6 h-6 rounded-full bg-[#C4B49A] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                  B
                </span>
                <div>
                  <h5 className="font-['Outfit'] font-bold text-sm text-[#1E3F20]">12mm High-Resilience Cushioning Core (68% Rebound)</h5>
                  <p className="text-[#667360] text-[11px] mt-0.5 leading-relaxed">
                    Micro-cellular foam matrix engineered to absorb vertical impact forces and return kinetic momentum.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <span className="w-6 h-6 rounded-full bg-[#8AAAA6] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                  C
                </span>
                <div>
                  <h5 className="font-['Outfit'] font-bold text-sm text-[#1E3F20]">6mm High-Density Hex-Siped Outsole (Class-A Wet Friction)</h5>
                  <p className="text-[#667360] text-[11px] mt-0.5 leading-relaxed">
                    Abrasion-resistant vulcanized rubber base with siped micro-channels that maintain grip on polished stone.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* SEE IT IN MOTION                                                          */}
          {/* ========================================================================= */}
          <section className="mb-14 overflow-hidden">
            <div className="mb-6">
              <div className="font-['Geist_Mono'] text-[9px] font-bold text-[#667360] tracking-widest uppercase mb-1">
                SEE IT IN MOTION
              </div>
              <h2 className="font-['Outfit'] text-[32px] font-semibold text-[#1E3F20] leading-tight mb-2">
                Made for real-life steps.
              </h2>
              <p className="text-xs text-[#667360] leading-relaxed">
                Watch 4K high-speed camera footage testing flex deflection, stride resilience, and active motion.
              </p>
            </div>

            <div 
              className="relative -mx-5 px-5 overflow-hidden py-2"
              onMouseEnter={() => setIsFilmAutoPlaying(false)}
              onMouseLeave={() => setIsFilmAutoPlaying(true)}
            >
              <motion.div 
                className="flex gap-3.5 cursor-grab active:cursor-grabbing"
                animate={{ x: -activeFilmIndex * 254 }}
                transition={{ type: "spring", stiffness: 280, damping: 28 }}
              >
                {films.map((film, idx) => {
                  const isActive = activeFilmIndex === idx;
                  return (
                    <motion.div 
                      key={film.id}
                      whileHover={{ y: -3 }}
                      className={`w-[240px] bg-white rounded-[24px] border ${
                        isActive ? 'border-[#84BD3A]/80 shadow-md ring-1 ring-[#84BD3A]/30' : 'border-[#E8EDDF] shadow-xs'
                      } overflow-hidden flex flex-col shrink-0 select-none transition-all duration-300`}
                    >
                      <div 
                        className="h-44 relative bg-gray-900 group cursor-pointer overflow-hidden"
                        onClick={() => setActiveVideoModal(film)}
                      >
                        <img 
                          src={film.poster} 
                          alt={film.title} 
                          className="w-full h-full object-cover opacity-85 group-hover:scale-106 transition duration-500" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                        
                        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-xs text-white text-[9px] font-['Geist_Mono'] font-medium px-2 py-0.5 rounded-md">
                          {film.views}
                        </div>

                        <div className="absolute inset-0 flex items-center justify-center">
                          <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.95 }} className="relative">
                            <span className="absolute -inset-2 rounded-full bg-[#84BD3A]/30 animate-ping opacity-75" />
                            <div className="w-12 h-12 rounded-full bg-white/95 text-[#1E3F20] flex items-center justify-center shadow-xl z-10 transition">
                              <Play size={18} fill="currentColor" className="ml-0.5" />
                            </div>
                          </motion.div>
                        </div>

                        <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-xs text-white text-[9px] font-['Geist_Mono'] px-2 py-0.5 rounded-md">
                          {film.duration}
                        </div>
                      </div>

                      <div className="p-4 flex-1 flex flex-col justify-between bg-white">
                        <div>
                          <h4 className="font-['Outfit'] text-[15px] font-bold text-[#1E3F20] leading-snug mb-1">
                            {film.title}
                          </h4>
                          <p className="font-['Geist'] text-[11px] text-[#697066] leading-relaxed">
                            {film.desc}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

            <div className="flex items-center justify-between gap-3 mt-4 pt-1 px-1">
              <button 
                onClick={() => {
                  setIsFilmAutoPlaying(false);
                  setActiveFilmIndex((prev) => Math.max(0, prev - 1));
                }}
                disabled={activeFilmIndex === 0}
                className="w-6 h-6 flex items-center justify-center text-[#697066] disabled:opacity-20 cursor-pointer"
              >
                ◀
              </button>
              <div className="flex-1 h-2 bg-[#DFE2D8] rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-[#1E3F20] rounded-full"
                  animate={{ 
                    width: `${100 / films.length}%`,
                    x: `${activeFilmIndex * 100}%`
                  }}
                />
              </div>
              <button 
                onClick={() => {
                  setIsFilmAutoPlaying(false);
                  setActiveFilmIndex((prev) => Math.min(films.length - 1, prev + 1));
                }}
                disabled={activeFilmIndex === films.length - 1}
                className="w-6 h-6 flex items-center justify-center text-[#697066] disabled:opacity-20 cursor-pointer"
              >
                ▶
              </button>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* CUSTOMER REVIEWS                                                          */}
          {/* ========================================================================= */}
          <section className="mb-14">
            <div className="font-['Geist_Mono'] text-[9px] font-bold text-[#667360] tracking-widest uppercase mb-1">
              CUSTOMER REVIEWS
            </div>
            <h2 className="font-['Outfit'] text-[32px] font-semibold text-[#1E3F20] leading-tight mb-5">
              Comfort, in their words.
            </h2>

            {/* Scorecard */}
            <div className="bg-white rounded-3xl border border-[#D5DCCF] p-6 mb-6 shadow-sm">
              <div className="flex gap-6 items-center">
                <div className="text-center shrink-0">
                  <div className="font-['Outfit'] text-5xl font-bold text-[#1E3F20]">4.8</div>
                  <div className="flex text-[#1E3F20] text-xs justify-center my-1.5 gap-0.5">
                    <Star size={11} fill="currentColor" /><Star size={11} fill="currentColor" /><Star size={11} fill="currentColor" /><Star size={11} fill="currentColor" /><Star size={11} fill="currentColor" />
                  </div>
                  <p className="text-[10px] text-[#667360] font-['Geist_Mono']">124 REVIEWS</p>
                </div>

                <div className="flex-1 space-y-1.5 font-['Geist_Mono'] text-[10px] text-[#667360]">
                  {[
                    { star: '5★', count: 105, width: '85%' },
                    { star: '4★', count: 16, width: '13%' },
                    { star: '3★', count: 2, width: '2%' },
                    { star: '2★', count: 1, width: '1%' },
                    { star: '1★', count: 0, width: '0%' },
                  ].map((row) => (
                    <div key={row.star} className="flex items-center gap-2">
                      <span className="w-5">{row.star}</span>
                      <div className="flex-1 h-2 bg-[#E8EDDF] rounded-full overflow-hidden">
                        <div className="h-full bg-[#1E3F20] rounded-full" style={{ width: row.width }}></div>
                      </div>
                      <span className="w-6 text-right font-medium">{row.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Reviews with distinct images */}
            <div className="space-y-4 mb-6">
              <div className="bg-white rounded-3xl border border-[#D5DCCF] p-5 shadow-sm">
                <div className="flex justify-between items-start mb-2.5">
                  <div>
                    <h5 className="font-['Geist_Mono'] text-xs font-bold text-[#1E3F20]">PRIYA R. · MUMBAI</h5>
                    <span className="inline-block bg-[#E8EDDF] text-[#1E3F20] text-[8px] font-['Geist_Mono'] font-bold px-2 py-0.5 rounded mt-1">
                      VERIFIED BUYER
                    </span>
                  </div>
                  <div className="flex text-[#1E3F20] text-xs">★★★★★</div>
                </div>

                <h4 className="font-['Outfit'] text-sm font-bold text-[#1E3F20] mb-1">Cured my heel pain after standing for 8 hours</h4>
                <p className="text-xs text-[#667360] leading-relaxed mb-4">
                  As a hospital physician on my feet all day, these sandals relieved the sharp plantar ache in my heel within 2 days. The adjustable strap makes a huge difference in the evening when feet swell.
                </p>

                <div className="flex gap-2">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#E8EDDF]">
                    <img src="/assets/customer-photo.png" alt="Customer on-foot" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-[#D5DCCF] p-5 shadow-sm">
                <div className="flex justify-between items-start mb-2.5">
                  <div>
                    <h5 className="font-['Geist_Mono'] text-xs font-bold text-[#1E3F20]">SNEHA M. · BANGALORE</h5>
                    <span className="inline-block bg-[#E8EDDF] text-[#1E3F20] text-[8px] font-['Geist_Mono'] font-bold px-2 py-0.5 rounded mt-1">
                      VERIFIED BUYER
                    </span>
                  </div>
                  <div className="flex text-[#1E3F20] text-xs">★★★★★</div>
                </div>

                <h4 className="font-['Outfit'] text-sm font-bold text-[#1E3F20] mb-1">True-to-size and unexpectedly lightweight</h4>
                <p className="text-xs text-[#667360] leading-relaxed mb-4">
                  I was worried orthopedic shoes would look clunky, but this sandal is so sleek. UK 6 fits like a dream, and it feels like stepping on soft dense cloud.
                </p>
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* COLOR RECOMMENDATIONS (WITH ACCURATE COLOR TINTS INSTEAD OF SCHEMATICS)    */}
          {/* ========================================================================= */}
          <section className="mb-14">
            <div className="font-['Geist_Mono'] text-[9px] font-bold text-[#667360] tracking-widest uppercase mb-1">
              MORE WAYS TO CLOUDWALK
            </div>
            <h2 className="font-['Outfit'] text-[32px] font-semibold text-[#1E3F20] leading-tight mb-6">
              Explore Other Colorways
            </h2>

            <div className="grid grid-cols-2 gap-3.5 mb-12">
              {/* Colorway 1: Graphite Charcoal */}
              <div className="bg-white rounded-3xl border border-[#D5DCCF] overflow-hidden p-3 shadow-sm group cursor-pointer hover:shadow-md transition">
                <div className="h-36 rounded-2xl bg-[#E2E4E0] overflow-hidden mb-3 relative flex items-center justify-center">
                  <img 
                    src="/assets/product-thumbnail.png" 
                    alt="Graphite" 
                    className="w-full h-full object-cover filter grayscale contrast-125 brightness-75 group-hover:scale-108 transition-transform duration-500" 
                  />
                  <span className="absolute bottom-2 left-2 bg-black/70 text-white font-['Geist_Mono'] text-[8px] font-bold px-2 py-0.5 rounded-full">
                    GRAPHITE CHARCOAL
                  </span>
                </div>
                <h4 className="font-['Outfit'] text-xs font-bold text-[#1E3F20] truncate">CloudWalk · Deep Graphite</h4>
                <p className="font-['Outfit'] text-sm font-bold text-[#1E3F20] mt-0.5">₹2,499</p>
                <p className="text-[10px] text-[#667360] mt-1 leading-tight">Dark monochrome · Water-repellent</p>
              </div>

              {/* Colorway 2: Forest Olive */}
              <div className="bg-white rounded-3xl border border-[#D5DCCF] overflow-hidden p-3 shadow-sm group cursor-pointer hover:shadow-md transition">
                <div className="h-36 rounded-2xl bg-[#E2E8DE] overflow-hidden mb-3 relative flex items-center justify-center">
                  <img 
                    src="/assets/product-thumbnail.png" 
                    alt="Olive" 
                    className="w-full h-full object-cover filter hue-rotate-60 saturate-150 contrast-105 group-hover:scale-108 transition-transform duration-500" 
                  />
                  <span className="absolute bottom-2 left-2 bg-[#1E3F20]/90 text-[#84BD3A] font-['Geist_Mono'] text-[8px] font-bold px-2 py-0.5 rounded-full border border-[#84BD3A]/30">
                    FOREST OLIVE
                  </span>
                </div>
                <h4 className="font-['Outfit'] text-xs font-bold text-[#1E3F20] truncate">CloudWalk · Forest Olive</h4>
                <p className="font-['Outfit'] text-sm font-bold text-[#1E3F20] mt-0.5">₹2,499</p>
                <p className="text-[10px] text-[#667360] mt-1 leading-tight">Earth tone · Textured nubuck finish</p>
              </div>
            </div>

            {/* CARE & SUSTAINABILITY */}
            <div className="mb-14">
              <div className="font-['Geist_Mono'] text-[9px] font-bold text-[#667360] tracking-widest uppercase mb-1">
                A LITTLE GUIDANCE
              </div>
              <h2 className="font-['Outfit'] text-[32px] font-semibold text-[#1E3F20] leading-tight mb-6">
                Good to know.
              </h2>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-white rounded-[20px] p-[18px] border border-[#E8EDDF] shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="w-9 h-9 rounded-full bg-[#EBF3E7] text-[#1E3F20] flex items-center justify-center mb-3">
                      <Droplets size={16} strokeWidth={2.2} />
                    </div>
                    <h3 className="font-['Outfit'] font-bold text-[15px] text-[#252A24] mb-3">
                      Care & Cleaning
                    </h3>
                  </div>
                  
                  <div className="space-y-2 text-[11px] text-[#697066]">
                    <p>• Wipe leather straps with a soft damp cloth</p>
                    <p>• Air-dry in shade; avoid direct radiator heat</p>
                    <p>• Clean footbed with mild soap & water</p>
                  </div>
                </div>

                <div className="bg-white rounded-[20px] p-[18px] border border-[#E8EDDF] shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="w-9 h-9 rounded-full bg-[#EBF3E7] text-[#1E3F20] flex items-center justify-center mb-3">
                      <HeartHandshake size={16} strokeWidth={2.2} />
                    </div>
                    <h3 className="font-['Outfit'] font-bold text-[15px] text-[#252A24] mb-3">
                      Initial Break-In
                    </h3>
                  </div>

                  <div className="space-y-2 text-[11px] text-[#697066]">
                    <p>• Wear 1–2 hours on Day 1 to adapt to arch cradle</p>
                    <p>• Memory foam molds to your unique footbed by Day 3</p>
                    <p>• Adjust straps whenever natural swelling occurs</p>
                  </div>
                </div>
              </div>

              {/* Order journey */}
              <div className="bg-white rounded-[20px] p-5 border border-[#E8EDDF] shadow-xs space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#EBF3E7] text-[#1E3F20] flex items-center justify-center">
                    <Truck size={16} />
                  </div>
                  <div>
                    <div className="font-['Outfit'] font-bold text-sm text-[#1E3F20]">Express Dispatch</div>
                    <div className="text-[11px] text-[#697066]">All orders ship within 24 hours via premium air courier.</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#EBF3E7] text-[#1E3F20] flex items-center justify-center">
                    <RefreshCw size={16} />
                  </div>
                  <div>
                    <div className="font-['Outfit'] font-bold text-sm text-[#1E3F20]">Hassle-Free Size Exchanges</div>
                    <div className="text-[11px] text-[#697066]">Doorstep pickup & swap if UK size requires adjustment.</div>
                  </div>
                </div>
              </div>

              {/* Support */}
              <div className="bg-white rounded-[24px] p-6 border border-[#E7EFE6] shadow-xs text-center">
                <h4 className="font-['Outfit'] text-[24px] font-bold tracking-tight text-[#1E3F20] mb-2">
                  Need Personalized Fit Advice?
                </h4>
                <p className="text-[13px] text-[#697066] leading-relaxed mb-4">
                  Our podiatric fit specialists are online 24/7 on WhatsApp to guide size choices or answer orthopedic questions.
                </p>

                <a 
                  href="https://wa.me/919876543210?text=Hello%20Medifeet%20Support" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#1E3F20] hover:bg-[#2A4D2C] text-white font-['Outfit'] font-bold text-xs py-3.5 rounded-full shadow-md transition"
                >
                  <MessageSquare size={15} fill="currentColor" /> CHAT WITH MEDIFEET ON WHATSAPP
                </a>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="-mx-5 px-6 pt-10 pb-8 bg-[#151815] text-white">
            <div className="grid grid-cols-2 gap-8 mb-8 text-xs font-medium">
              <div>
                <p className="font-['Outfit'] text-sm font-bold tracking-wider uppercase mb-3">SHOP</p>
                <ul className="space-y-2 text-[#ADB5AE]">
                  <li><a href="#" className="hover:text-white">New arrivals</a></li>
                  <li><a href="#" className="hover:text-white">Women</a></li>
                  <li><a href="#" className="hover:text-white">Men</a></li>
                  <li><a href="#" className="hover:text-white">Sandals</a></li>
                  <li><a href="#" className="hover:text-white">Walking shoes</a></li>
                </ul>
              </div>

              <div>
                <p className="font-['Outfit'] text-sm font-bold tracking-wider uppercase mb-3">HELP</p>
                <ul className="space-y-2 text-[#ADB5AE]">
                  <li><a href="#" className="hover:text-white">Track my order</a></li>
                  <li><a href="#" className="hover:text-white">Returns & exchanges</a></li>
                  <li><a href="#" className="hover:text-white">Size & fit guide</a></li>
                  <li><a href="#" className="hover:text-white">Contact support</a></li>
                </ul>
              </div>
            </div>

            <p className="text-[10px] text-[#697066] font-['Geist_Mono'] mb-6">
              © 2026 MediFeet India. Built for comfort, made for motion.
            </p>
          </footer>
        </main>

        {/* Sticky Mobile Add to Cart Bar */}
        <div className="fixed bottom-0 left-0 right-0 max-w-[390px] mx-auto bg-white/95 backdrop-blur-md border-t border-[#D5DCCF] p-4 flex gap-3 z-50 shadow-[0_-10px_30px_rgba(0,0,0,0.08)]">
          <div className="flex-1 flex flex-col justify-center">
            <span className="font-['Outfit'] text-xs font-bold text-[#1E3F20]">₹2,499</span>
            <span className="text-[10px] text-[#667360] font-['Geist_Mono']">Stone Beige · UK {selectedSize}</span>
          </div>
          <button className="flex-1 bg-[#1E3F20] text-white font-['Outfit'] font-bold text-xs py-3 rounded-xl shadow-md hover:bg-[#2a4d2c] transition">
            Add to Cart
          </button>
          <button className="flex-1 bg-[#84BD3A] text-[#1E3F20] font-['Outfit'] font-bold text-xs py-3 rounded-xl shadow-md hover:bg-[#77ab32] transition">
            Buy Now
          </button>
        </div>

        {/* Video / Photo Modal */}
        <AnimatePresence>
          {activeVideoModal && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
              onClick={() => setActiveVideoModal(null)}
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-[#151815] text-white w-full max-w-[360px] rounded-3xl overflow-hidden shadow-2xl border border-white/10"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-4 flex items-center justify-between border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#84BD3A] animate-ping" />
                    <span className="font-['Geist_Mono'] text-[10px] text-white/70 tracking-wider uppercase font-semibold">
                      {activeVideoModal.videoUrl ? 'MEDIFEET MOTION' : 'MEDIFEET HIGH-RES PHOTO'}
                    </span>
                  </div>
                  <button 
                    onClick={() => setActiveVideoModal(null)}
                    className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition cursor-pointer"
                  >
                    <X size={16} />
                  </button>
                </div>

                {activeVideoModal.videoUrl ? (
                  <div className="relative aspect-video bg-black overflow-hidden flex items-center justify-center">
                    <video 
                      src={activeVideoModal.videoUrl} 
                      poster={activeVideoModal.poster}
                      autoPlay
                      loop
                      controls
                      playsInline
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="relative aspect-square bg-[#E8EDDF] overflow-hidden flex items-center justify-center p-3">
                    <img 
                      src={activeVideoModal.poster} 
                      alt={activeVideoModal.title}
                      className="w-full h-full object-contain drop-shadow-md"
                    />
                  </div>
                )}

                <div className="p-4 bg-[#1E231E]">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-['Geist_Mono'] text-[9px] font-bold text-[#84BD3A] uppercase tracking-wider">
                      {activeVideoModal.views} · {activeVideoModal.videoUrl ? '4K 60FPS' : 'STUDIO MASTER'}
                    </span>
                    <span className="font-['Geist_Mono'] text-[9px] text-white/50">
                      {activeVideoModal.duration}
                    </span>
                  </div>
                  <h4 className="font-['Outfit'] font-bold text-base text-white mb-1">
                    {activeVideoModal.title}
                  </h4>
                  <p className="font-['Geist'] text-xs text-white/70 leading-relaxed mb-3">
                    {activeVideoModal.desc}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Interactive Size Chart Modal (Figma 308:5860) */}
        <SizeChartModal
          isOpen={isSizeChartOpen}
          onClose={() => setIsSizeChartOpen(false)}
          selectedSize={selectedSize}
          onSelectSize={(sz) => setSelectedSize(sz)}
        />

      </div>
    </div>
  );
};

export default DemoPage;
