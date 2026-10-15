import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, Ruler, ArrowRight, Truck, RefreshCw, ShieldCheck, 
  CheckCircle2, Play, Plus, Minus, ChevronDown, Check, Heart, 
  ShoppingBag, Search, Sparkles, User, ExternalLink, Activity, 
  Feather, Layers, Leaf, Eye, CornerUpLeft, Award
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import SizeChartModal from '../components/SizeChartModal';
import DesktopHeader from '../components/DesktopHeader';

export const DesktopProductPage = ({ onNavigate }) => {
  const { addToCart, setIsCartOpen, cartCount, wishlist, toggleWishlist } = useCart();
  const [selectedSize, setSelectedSize] = useState(6);
  const [selectedColor, setSelectedColor] = useState('Stone Beige');
  const [quantity, setQuantity] = useState(1);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [pincode, setPincode] = useState('');
  const [pincodeChecked, setPincodeChecked] = useState(false);
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);
  const [activeComparePoint, setActiveComparePoint] = useState(2);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [virtualTryOnOpen, setVirtualTryOnOpen] = useState(false);

  // Gallery images & videos matching desktop Figma frame 1:3161
  const galleryMedia = [
    { type: 'image', src: '/assets/product-thumbnail.png', label: 'Angle 1 · Studio Stage' },
    { type: 'video', src: '/assets/video-on-foot.mp4', poster: '/assets/on-foot-thumbnail.png', label: 'Angle 2 · Walking Motion' },
    { type: 'video', src: '/assets/video-cushioning.mp4', poster: '/assets/cushioning-photorealistic-illustrative-detail.png', label: 'Angle 3 · Kinetic Rebound' },
    { type: 'video', src: '/assets/video-flexibility.mp4', poster: '/assets/detail-photo.png', label: 'Angle 4 · Natural Flex' },
    { type: 'video', src: '/assets/video-tech-anatomic-footbed.mp4', poster: '/assets/sole-concept-thumbnail-image.png', label: 'Angle 5 · Sole Layers' },
  ];

  const sizes = [
    { num: 4, available: true },
    { num: 5, available: true },
    { num: 6, available: true },
    { num: 7, available: true },
    { num: 8, available: true },
    { num: 9, available: false },
  ];

  const colors = [
    { name: 'Stone Beige', hex: '#C2B69D', inStock: true },
    { name: 'Dark Brown', hex: '#4A3326', inStock: true },
    { name: 'Midnight Black', hex: '#1E1E1E', inStock: true },
  ];

  // Complete the Look dataset from Figma node 1:3710
  const completeTheLook = [
    { id: 'active-runner', name: 'ActiveAlign Runner', tag: 'NEW FIT', price: 4999, origPrice: 5999, img: '/assets/prod-active-runner.png' },
    { id: 'sole-healer', name: 'SoleHealer Slip-On', tag: 'PODIATRIST PICK', price: 3699, origPrice: 4499, img: '/assets/prod-sole-healer.png' },
    { id: 'posture-derby', name: 'PosturePrime Derby', tag: 'LOW STOCK', price: 5299, origPrice: 6499, img: '/assets/prod-posture-derby.png' },
    { id: 'bioflex-trainer', name: 'BioFlex Trainer', tag: 'ECO', price: 3999, origPrice: 4999, img: '/assets/prod-bioflex.png' },
  ];

  // Recently Viewed dataset from Figma node 1:3710
  const recentlyViewed = [
    { id: 'aerostride-knit', name: 'AeroStride Knit', tag: 'NEW DROP', price: 3299, origPrice: 4299, img: '/assets/product-cushion-runner.png' },
    { id: 'cloudwalk-stone-beige', name: 'CloudWalk Perfect Sandal', tag: 'BESTSELLER', price: 2499, origPrice: 3299, img: '/assets/product-thumbnail.png' },
    { id: 'terragrip-slide', name: 'TerraGrip Slide', tag: 'RESTOCK', price: 1999, origPrice: 2499, img: '/assets/prod-terragrip-slide.png' },
    { id: 'ergostrut-oxford', name: 'ErgoStrut Oxford', tag: 'LIMITED', price: 5499, origPrice: 6999, img: '/assets/prod-ergostrut-oxford.png' },
  ];

  return (
    <div className="bg-[#FFFFFF] text-[#1E3F20] font-['Geist'] min-h-screen">
      
      {/* ========================================================================= */}
      {/* 1 & 2. UNIFIED TOP BAR & STICKY HEADER                                    */}
      {/* ========================================================================= */}
      <DesktopHeader currentPage="product" onNavigate={onNavigate} />

      {/* ========================================================================= */}
      {/* 3. BREADCRUMBS (Figma 1:3158)                                             */}
      {/* ========================================================================= */}
      <div className="max-w-[1360px] mx-auto px-6 py-4 text-xs font-['Geist_Mono'] text-[#667360] flex items-center gap-2">
        <button onClick={() => onNavigate && onNavigate('home')} className="hover:underline cursor-pointer">Home</button>
        <span>/</span>
        <button onClick={() => onNavigate && onNavigate('shop')} className="hover:underline cursor-pointer">Women</button>
        <span>/</span>
        <button onClick={() => onNavigate && onNavigate('shop')} className="hover:underline cursor-pointer">Sandals</button>
        <span>/</span>
        <span className="text-[#1E3F20] font-bold">CloudWalk Perfect Sandal</span>
      </div>

      {/* ========================================================================= */}
      {/* 4. PRODUCT HERO (Figma 1:3161 · 734px Desktop Height)                     */}
      {/* ========================================================================= */}
      <section className="max-w-[1360px] mx-auto px-6 mb-16">
        <div className="grid grid-cols-12 gap-10 items-start">
          
          {/* LEFT: 5-Thumbnail Strip + Large Hero Stage (Cols 1-7) */}
          <div className="col-span-12 lg:col-span-7 flex gap-5">
            
            {/* Vertical Thumbnail Strip */}
            <div className="flex flex-col gap-3 shrink-0">
              {galleryMedia.map((media, idx) => {
                const isActive = activeMediaIndex === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveMediaIndex(idx)}
                    className={`w-18 h-20 rounded-2xl overflow-hidden border-2 transition-all p-1 bg-[#F8FAF6] relative cursor-pointer group ${
                      isActive 
                        ? 'border-[#1E3F20] shadow-md ring-2 ring-[#1E3F20]/20' 
                        : 'border-[#E8EDDF] hover:border-gray-400 opacity-80 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={media.poster || media.src}
                      alt={media.label}
                      className="w-full h-full object-contain mix-blend-multiply"
                    />
                    {media.type === 'video' && (
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <div className="w-5 h-5 rounded-full bg-white/90 text-[#1E3F20] flex items-center justify-center">
                          <Play size={8} fill="#1E3F20" />
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Main Stage Display */}
            <div className="flex-1 bg-[#F7F9F4] rounded-3xl p-8 relative overflow-hidden border border-[#E8EDDF] shadow-sm min-h-[580px] flex items-center justify-center group">
              {/* Bestseller Tag */}
              <div className="absolute top-5 left-5 z-20">
                <span className="bg-[#1E3F20] text-white text-[10px] font-['Geist_Mono'] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  BESTSELLER
                </span>
              </div>

              {/* Zoom Action Pill */}
              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="absolute top-5 right-5 z-20 bg-white/90 hover:bg-white text-[#1E3F20] text-xs font-['Geist_Mono'] font-semibold px-3 py-1.5 rounded-full border border-gray-200 shadow-xs flex items-center gap-1.5 transition cursor-pointer"
              >
                <span>🔍 Zoom</span>
              </button>

              {/* Stage Media */}
              {galleryMedia[activeMediaIndex].type === 'video' ? (
                <div className="w-full h-full flex items-center justify-center relative">
                  <video
                    src={galleryMedia[activeMediaIndex].src}
                    poster={galleryMedia[activeMediaIndex].poster}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="max-h-[500px] w-auto object-contain rounded-2xl"
                  />
                  <div className="absolute bottom-3 left-4 bg-black/60 text-white text-[9px] font-['Geist_Mono'] px-2.5 py-1 rounded-full backdrop-blur-xs">
                    4K 60FPS MOTION PREVIEW
                  </div>
                </div>
              ) : (
                <img
                  src={galleryMedia[activeMediaIndex].src}
                  alt="CloudWalk Perfect Sandal"
                  className="max-h-[480px] w-auto object-contain filter drop-shadow-md group-hover:scale-103 transition-transform duration-500"
                />
              )}
            </div>

          </div>

          {/* RIGHT: Product Buy Box & Configurator (Cols 8-12) */}
          <div className="col-span-12 lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-[#E8EDDF] shadow-sm">
            
            {/* Top Category Badge */}
            <div className="flex items-center justify-between mb-2">
              <span className="font-['Geist_Mono'] text-[10px] font-bold text-[#84BD3A] bg-[#1E3F20] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                PODIATRIST APPROVED · OR-PD-1401
              </span>
              <span className="text-xs font-['Geist_Mono'] text-green-700 font-semibold">
                ● In Stock
              </span>
            </div>

            {/* Title */}
            <h1 className="font-['Outfit'] font-bold text-3xl sm:text-4xl text-[#1E3F20] mb-2 leading-tight">
              CloudWalk Perfect Sandal
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-[#E8EDDF]">
              <div className="flex text-[#84BD3A]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill="#84BD3A" />
                ))}
              </div>
              <span className="font-bold text-xs text-[#1E3F20]">4.9</span>
              <span className="text-gray-300">|</span>
              <span className="text-xs text-[#667360] font-medium">124 verified reviews</span>
            </div>

            {/* Pricing */}
            <div className="flex items-baseline gap-3 mb-5">
              <span className="font-['Outfit'] font-bold text-3xl text-[#1E3F20]">₹2,499</span>
              <span className="font-['Outfit'] text-base text-gray-400 line-through">₹3,299</span>
              <span className="bg-[#E8EDDF] text-[#1E3F20] font-['Geist_Mono'] text-xs font-bold px-2 py-0.5 rounded">
                24% OFF
              </span>
              <span className="text-[11px] text-[#667360] block">MRP inclusive of all taxes</span>
            </div>

            {/* Color Swatches */}
            <div className="mb-6">
              <div className="flex justify-between items-center text-xs mb-2.5">
                <span className="font-bold font-['Geist_Mono'] text-[#1E3F20] uppercase">
                  COLOR: {selectedColor}
                </span>
                <span className="text-xs text-[#667360]">In stock</span>
              </div>
              <div className="flex items-center gap-3">
                {colors.map((color) => {
                  const isSelected = selectedColor === color.name;
                  return (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#1E3F20] bg-[#F7F9F6] text-[#1E3F20] shadow-xs'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full border border-black/10 shrink-0"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span>{color.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Size Selector */}
            <div className="mb-6">
              <div className="flex justify-between items-center text-xs mb-2.5">
                <span className="font-bold font-['Geist_Mono'] text-[#1E3F20] uppercase">
                  SELECT SIZE (UK)
                </span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsSizeChartOpen(true)}
                    className="text-[#1E3F20] hover:text-[#84BD3A] underline font-medium cursor-pointer flex items-center gap-1"
                  >
                    <Ruler size={13} /> Size chart
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-6 gap-2 mb-2">
                {sizes.map((s) => (
                  <button
                    key={s.num}
                    onClick={() => s.available && setSelectedSize(s.num)}
                    disabled={!s.available}
                    className={`h-11 rounded-xl text-sm font-['Outfit'] font-bold transition-all relative cursor-pointer ${
                      !s.available
                        ? 'border border-[#E8EDDF] text-gray-300 bg-gray-50 cursor-not-allowed'
                        : selectedSize === s.num
                          ? 'bg-[#1E3F20] text-white shadow-md'
                          : 'border border-[#D5DCCF] text-[#1E3F20] bg-white hover:border-[#1E3F20]'
                    }`}
                  >
                    {s.num}
                    {!s.available && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-full h-px bg-gray-300 -rotate-45" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-[#667360]">
                True to size · adjustable three-point instep straps
              </p>
            </div>

            {/* Quantity & CTA Buttons */}
            <div className="flex items-center gap-3 mb-5">
              {/* Qty */}
              <div className="flex items-center border border-[#D5DCCF] rounded-xl bg-white overflow-hidden h-12">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-10 h-full flex items-center justify-center text-[#1E3F20] hover:bg-gray-100 transition cursor-pointer"
                >
                  <Minus size={14} />
                </button>
                <span className="w-9 text-center font-bold font-['Geist_Mono'] text-sm text-[#1E3F20]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-10 h-full flex items-center justify-center text-[#1E3F20] hover:bg-gray-100 transition cursor-pointer"
                >
                  <Plus size={14} />
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={() => {
                  addToCart({
                    id: 'cloudwalk-stone-beige',
                    title: 'CloudWalk Perfect Sandal',
                    color: selectedColor,
                    size: selectedSize,
                    price: 2499,
                    originalPrice: 3299,
                    quantity: quantity,
                    image: '/assets/product-thumbnail.png',
                  });
                }}
                className="flex-1 bg-[#1E3F20] hover:bg-[#285424] text-white font-bold h-12 rounded-xl text-sm font-['Outfit'] uppercase tracking-wider transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>ADD TO CART · ₹{(2499 * quantity).toLocaleString('en-IN')}</span>
                <ArrowRight size={16} />
              </button>

              {/* Wishlist Heart */}
              <button
                onClick={() => toggleWishlist('cloudwalk-stone-beige')}
                className="w-12 h-12 rounded-xl border border-[#D5DCCF] flex items-center justify-center text-[#1E3F20] hover:bg-gray-50 transition cursor-pointer"
              >
                <Heart
                  size={20}
                  fill={wishlist.includes('cloudwalk-stone-beige') ? "#c0544f" : "none"}
                  className={wishlist.includes('cloudwalk-stone-beige') ? "text-[#c0544f]" : "text-[#1E3F20]"}
                />
              </button>
            </div>

            {/* Prepaid Promo Discount */}
            <div className="bg-[#E8F3D6] text-[#1E3F20] rounded-xl p-3 text-xs flex items-center justify-between mb-5 border border-[#D5E5BC]">
              <span className="font-semibold">🎁 Extra 5% off prepaid orders</span>
              <span className="font-['Geist_Mono'] font-bold bg-white/70 px-2 py-0.5 rounded">Use COMFORT5</span>
            </div>

            {/* Pincode Check */}
            <div className="pt-4 border-t border-[#E8EDDF]">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="Enter delivery pincode"
                  className="flex-1 bg-[#FAFBF9] border border-[#D5DCCF] rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#1E3F20]"
                />
                <button
                  onClick={() => setPincodeChecked(true)}
                  className="bg-[#1E3F20] text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-[#285424] transition cursor-pointer"
                >
                  CHECK
                </button>
              </div>
              {pincodeChecked && (
                <p className="text-[11px] text-[#1E3F20] font-medium mt-2 flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-[#84BD3A]" /> 
                  Delivery in 2–4 business days · Cash on Delivery available
                </p>
              )}
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. DUAL FIT GUIDANCE SECTION (Figma 1:3248 · 506px Height)                 */}
      {/* ========================================================================= */}
      <section className="max-w-[1360px] mx-auto px-6 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Card 1: Find your MediFeet size */}
          <div className="bg-white rounded-3xl p-8 border border-[#E8EDDF] shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-['Outfit'] font-bold text-2xl text-[#1E3F20]">
                  Find your MediFeet size
                </h3>
                <span className="text-xs font-['Geist_Mono'] text-[#667360]">
                  UK / US / EU / Centimetres Converter
                </span>
              </div>

              {/* Table */}
              <div className="border border-[#E8EDDF] rounded-2xl overflow-hidden mb-5">
                <div className="grid grid-cols-7 bg-[#FAFBF9] text-[10px] font-['Geist_Mono'] font-bold text-[#667360] py-2.5 px-3 border-b border-[#E8EDDF] text-center">
                  <div className="text-left font-bold text-[#1E3F20]">UK</div>
                  <div>4</div><div>5</div><div className="text-[#84BD3A] font-bold">6</div><div>7</div><div>8</div><div>9</div>
                </div>
                <div className="grid grid-cols-7 text-xs py-2.5 px-3 border-b border-[#E8EDDF] text-center text-gray-700">
                  <div className="text-left font-bold text-[#1E3F20]">EU</div>
                  <div>37</div><div>38</div><div className="font-bold text-[#1E3F20]">39</div><div>40</div><div>41</div><div>42</div>
                </div>
                <div className="grid grid-cols-7 text-xs py-2.5 px-3 text-center text-gray-700 bg-[#FAFBF9]/50">
                  <div className="text-left font-bold text-[#1E3F20]">CM</div>
                  <div>23.5</div><div>24.1</div><div className="font-bold text-[#1E3F20]">24.8</div><div>25.4</div><div>26.0</div><div>26.7</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 bg-[#FAFBF9] rounded-2xl border border-[#E8EDDF] mb-5">
                <Ruler size={18} className="text-[#1E3F20] shrink-0 mt-0.5" />
                <p className="text-xs text-[#667360] leading-relaxed">
                  Stand on paper, mark heel to longest toe, and measure both feet. Use the longer measurement.
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsSizeChartOpen(true)}
              className="w-full bg-[#1E3F20] hover:bg-[#285424] text-white py-3.5 rounded-full font-bold text-xs font-['Outfit'] uppercase tracking-wider transition shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>START FIND MY SIZE</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Card 2: Three answers. One better fit. */}
          <div className="bg-[#1E3F20] text-white rounded-3xl p-8 border border-[#2D5A30] shadow-xl flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-['Geist_Mono'] font-bold text-[#84BD3A] uppercase tracking-widest block mb-2">
                FIND MY SIZE / 2 MINUTES
              </span>
              <h3 className="font-['Outfit'] font-bold text-3xl text-white mb-2 leading-tight">
                Three answers. One better fit.
              </h3>
              <p className="text-xs text-white/70 mb-6">
                Tell us your current shoe size and foot width to calculate your exact arch profile.
              </p>

              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-white/10 rounded-2xl p-4 border border-white/10">
                  <span className="text-[9px] font-['Geist_Mono'] text-[#84BD3A] font-bold block mb-1">01</span>
                  <h5 className="font-['Outfit'] font-bold text-sm text-white mb-1">What size fits now?</h5>
                  <p className="text-[10px] text-white/60">Usually UK 6 in sneakers</p>
                </div>
                <div className="bg-white/10 rounded-2xl p-4 border border-white/10">
                  <span className="text-[9px] font-['Geist_Mono'] text-[#84BD3A] font-bold block mb-1">02</span>
                  <h5 className="font-['Outfit'] font-bold text-sm text-white mb-1">How wide is your foot?</h5>
                  <p className="text-[10px] text-white/60">Standard / High Instep</p>
                </div>
                <div className="bg-white/10 rounded-2xl p-4 border border-white/10">
                  <span className="text-[9px] font-['Geist_Mono'] text-[#84BD3A] font-bold block mb-1">03</span>
                  <h5 className="font-['Outfit'] font-bold text-sm text-white mb-1">How do you like the fit?</h5>
                  <p className="text-[10px] text-white/60">Contoured & Supportive</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsSizeChartOpen(true)}
              className="w-full bg-[#84BD3A] hover:bg-[#95cf45] text-[#1E3F20] py-3.5 rounded-full font-bold text-xs font-['Outfit'] uppercase tracking-wider transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>START FIT FINDER</span>
              <ArrowRight size={14} />
            </button>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. PRODUCT FILM (Figma 1:3314 · 670px Height Banner)                       */}
      {/* ========================================================================= */}
      <section className="mb-20">
        <div className="max-w-[1360px] mx-auto px-6">
          <div className="relative rounded-3xl overflow-hidden h-[540px] shadow-2xl border border-gray-200 group">
            {/* Background Film Image / Video */}
            <img
              src="/assets/film-lifestyle-bg.png"
              alt="Comfort Technology in Motion"
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40 flex flex-col justify-between p-10">
              {/* Top Tag */}
              <div>
                <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-['Geist_Mono'] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-white/30">
                  02 / 14 PRODUCT FILM
                </span>
              </div>

              {/* Center Play Button */}
              <div className="flex items-center justify-center">
                <button
                  onClick={() => setIsVideoModalOpen(true)}
                  className="w-20 h-20 rounded-full bg-[#84BD3A] text-[#1E3F20] flex items-center justify-center shadow-2xl hover:scale-110 transition-transform cursor-pointer"
                >
                  <Play size={30} fill="#1E3F20" className="ml-1" />
                </button>
              </div>

              {/* Bottom Headings */}
              <div className="max-w-2xl">
                <h2 className="font-['Outfit'] font-bold text-3xl sm:text-4xl text-white mb-2 leading-tight">
                  Comfort technology in motion.
                </h2>
                <p className="text-sm text-white/80 leading-relaxed font-['Geist']">
                  See the CloudWalk move through a full stride—from initial heel contact to energized, supported toe-off.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. COMFORT STORY & BADGES (Figma 1:3323 · 651px Height)                   */}
      {/* ========================================================================= */}
      <section className="max-w-[1360px] mx-auto px-6 mb-20 text-center">
        <span className="text-[10px] font-['Geist_Mono'] font-bold text-[#667360] uppercase tracking-widest block mb-2">
          WHY CLOUDWALK
        </span>
        <h2 className="font-['Outfit'] font-bold text-3xl sm:text-4xl text-[#1E3F20] mb-2">
          Support you feel. Details you can trust.
        </h2>
        <p className="text-sm text-[#667360] max-w-xl mx-auto mb-8 leading-relaxed">
          Built for recovery days, long city walks and all-day standing.
        </p>

        {/* 4 Feature Pills */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
          {[
            { label: 'Cushioned Footbed', icon: Layers },
            { label: 'Breathable', icon: Feather },
            { label: 'Lightweight', icon: Feather },
            { label: 'Durable', icon: ShieldCheck },
          ].map((pill, idx) => {
            const Icon = pill.icon;
            return (
              <div
                key={idx}
                className="bg-[#F8FAF6] border border-[#E8EDDF] px-5 py-2.5 rounded-full flex items-center gap-2 text-xs font-bold text-[#1E3F20] shadow-xs"
              >
                <div className="w-5 h-5 rounded-full bg-[#1E3F20] text-[#84BD3A] flex items-center justify-center">
                  <Icon size={12} />
                </div>
                <span>{pill.label}</span>
              </div>
            );
          })}
        </div>

        {/* 3 Detail Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="bg-[#FAFBF9] rounded-3xl p-8 border border-[#E8EDDF] shadow-xs">
            <div className="w-10 h-10 rounded-2xl bg-white border border-[#E8EDDF] flex items-center justify-center mb-5 text-[#1E3F20]">
              <Ruler size={20} />
            </div>
            <h4 className="font-['Outfit'] font-bold text-lg text-[#1E3F20] mb-2">
              Fit guidance
            </h4>
            <p className="text-xs text-[#667360] leading-relaxed">
              Order your usual UK size. The roomy anatomical toe box and three adjustable straps let you customize the hold throughout the day.
            </p>
          </div>

          <div className="bg-[#FAFBF9] rounded-3xl p-8 border border-[#E8EDDF] shadow-xs">
            <div className="w-10 h-10 rounded-2xl bg-white border border-[#E8EDDF] flex items-center justify-center mb-5 text-[#1E3F20]">
              <Layers size={20} />
            </div>
            <h4 className="font-['Outfit'] font-bold text-lg text-[#1E3F20] mb-2">
              Construction
            </h4>
            <p className="text-xs text-[#667360] leading-relaxed">
              Dual-density kinetic foam underfoot, stabilizing deep heel cup, and directional anti-skid rubber outsole for slip resistance.
            </p>
          </div>

          <div className="bg-[#1E3F20] text-white rounded-3xl p-8 border border-[#2D5A30] shadow-md flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center mb-5 text-[#84BD3A]">
                <Eye size={20} />
              </div>
              <h4 className="font-['Outfit'] font-bold text-lg text-white mb-2">
                On-foot view
              </h4>
              <p className="text-xs text-white/70 leading-relaxed mb-6">
                See it on foot previews scale, strap position, and arch contour before you order.
              </p>
            </div>
            <button
              onClick={() => setIsVideoModalOpen(true)}
              className="w-full bg-[#84BD3A] hover:bg-[#95cf45] text-[#1E3F20] py-3 rounded-full font-bold text-xs font-['Outfit'] uppercase tracking-wider transition shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>LAUNCH VIRTUAL TRY-ON</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. COMPARISON MATRIX (Figma 1:3372 · 1138px Height)                       */}
      {/* ========================================================================= */}
      <section className="bg-[#F7F9F4] py-20 border-y border-[#E8EDDF]">
        <div className="max-w-[1360px] mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-[10px] font-['Geist_Mono'] font-bold text-[#667360] uppercase tracking-widest block mb-1">
              ORDINARY SHOES VS MEDIFEET
            </span>
            <h2 className="font-['Outfit'] font-bold text-3xl sm:text-4xl text-[#1E3F20] mb-2">
              See the difference in every layer.
            </h2>
            <p className="text-xs text-[#667360]">
              An illustrative comparison of what sets the CloudWalk apart from everyday footwear.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Left: Ordinary Shoes */}
            <div className="bg-white rounded-3xl p-8 border border-[#E8EDDF] shadow-xs">
              <span className="text-[10px] font-['Geist_Mono'] font-bold text-[#C25443] bg-red-50 px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">
                ORDINARY SHOES
              </span>

              <div className="h-64 bg-[#FAFBF9] rounded-2xl flex items-center justify-center p-4 mb-6">
                <img
                  src="/assets/generic-ordinary-shoe-illustrative-photo.png"
                  alt="Ordinary Shoe"
                  className="h-full object-contain mix-blend-multiply opacity-85"
                />
              </div>

              <ul className="space-y-3 text-xs text-gray-600">
                <li className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-red-100 text-red-700 flex items-center justify-center font-bold text-[10px]">1</span>
                  <span>Lace-up closure without variable instep release</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-red-100 text-red-700 flex items-center justify-center font-bold text-[10px]">2</span>
                  <span>Flat footbed varies · no medial arch support</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-red-100 text-red-700 flex items-center justify-center font-bold text-[10px]">3</span>
                  <span>Standard EVA cushioning fatigues after 2 hours</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-red-100 text-red-700 flex items-center justify-center font-bold text-[10px]">4</span>
                  <span>Slick outsole tread prone to slipping on wet tile</span>
                </li>
              </ul>
            </div>

            {/* Right: MediFeet CloudWalk */}
            <div className="bg-[#1E3F20] text-white rounded-3xl p-8 border border-[#2D5A30] shadow-xl">
              <span className="text-[10px] font-['Geist_Mono'] font-bold text-[#84BD3A] bg-white/10 px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">
                MEDIFEET CLOUDWALK
              </span>

              <div className="h-64 bg-white rounded-2xl flex items-center justify-center p-4 mb-6 relative overflow-hidden">
                <img
                  src="/assets/product-thumbnail.png"
                  alt="CloudWalk Sandal"
                  className="h-full object-contain filter drop-shadow-md"
                />
                
                {/* 4 Interactive Pins */}
                <div className="absolute top-[40%] left-[30%] w-6 h-6 rounded-full bg-[#84BD3A] text-[#1E3F20] font-bold text-xs flex items-center justify-center shadow-lg animate-pulse">1</div>
                <div className="absolute top-[52%] left-[55%] w-6 h-6 rounded-full bg-[#84BD3A] text-[#1E3F20] font-bold text-xs flex items-center justify-center shadow-lg">2</div>
                <div className="absolute top-[68%] left-[45%] w-6 h-6 rounded-full bg-[#84BD3A] text-[#1E3F20] font-bold text-xs flex items-center justify-center shadow-lg">3</div>
                <div className="absolute top-[75%] left-[70%] w-6 h-6 rounded-full bg-[#84BD3A] text-[#1E3F20] font-bold text-xs flex items-center justify-center shadow-lg">4</div>
              </div>

              <ul className="space-y-3 text-xs text-white/90">
                <li className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#84BD3A] text-[#1E3F20] flex items-center justify-center font-bold text-[10px]">1</span>
                  <span>Adjustable three-point straps adapt as feet change throughout the day</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#84BD3A] text-[#1E3F20] flex items-center justify-center font-bold text-[10px]">2</span>
                  <span>18mm anatomical curved medial arch cradle relieves plantar pressure</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#84BD3A] text-[#1E3F20] flex items-center justify-center font-bold text-[10px]">3</span>
                  <span>Micro-cellular kinetic foam absorbs 68% heel impact force</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#84BD3A] text-[#1E3F20] flex items-center justify-center font-bold text-[10px]">4</span>
                  <span>Directional hex-traction rubber outsole grips firmly on wet surfaces</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. SUSTAINABILITY TRACKER (Figma 1:3474 · 334px Height)                    */}
      {/* ========================================================================= */}
      <section className="max-w-[1360px] mx-auto px-6 py-16">
        <div className="grid grid-cols-12 gap-8 items-center">
          <div className="col-span-12 lg:col-span-4">
            <span className="text-[10px] font-['Geist_Mono'] font-bold text-[#667360] uppercase tracking-widest block mb-1">
              MATERIALS / IMPACT TRACKER
            </span>
            <h3 className="font-['Outfit'] font-bold text-3xl text-[#1E3F20] mb-2 leading-tight">
              A lighter footprint, step by step.
            </h3>
            <p className="text-xs text-[#667360] leading-relaxed">
              Material percentages are measured by weight for this CloudWalk colorway.
            </p>
          </div>

          <div className="col-span-12 lg:col-span-8 grid grid-cols-3 gap-5">
            <div className="bg-[#FAFBF9] rounded-3xl p-6 border border-[#E8EDDF] text-center">
              <span className="font-['Outfit'] font-bold text-4xl text-[#1E3F20] block mb-1">
                38%
              </span>
              <p className="text-xs text-[#667360]">Recycled EVA in midsole</p>
            </div>

            <div className="bg-[#1E3F20] text-white rounded-3xl p-6 border border-[#2D5A30] text-center shadow-md">
              <span className="font-['Outfit'] font-bold text-4xl text-[#84BD3A] block mb-1">
                62%
              </span>
              <p className="text-xs text-white/80">Recycled polyester straps</p>
            </div>

            <div className="bg-[#FAFBF9] rounded-3xl p-6 border border-[#E8EDDF] text-center">
              <span className="font-['Outfit'] font-bold text-4xl text-[#1E3F20] block mb-1">
                100%
              </span>
              <p className="text-xs text-[#667360]">FSC-certified packaging</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. CUSTOMER REVIEWS (Figma 1:3489 · 794px Height)                        */}
      {/* ========================================================================= */}
      <section className="bg-[#FAFBF9] py-20 border-t border-[#E8EDDF]">
        <div className="max-w-[1360px] mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-[10px] font-['Geist_Mono'] font-bold text-[#667360] uppercase tracking-widest block mb-1">
                VERIFIED CUSTOMER REVIEWS
              </span>
              <h2 className="font-['Outfit'] font-bold text-3xl sm:text-4xl text-[#1E3F20]">
                4.8 / 5 — comfort that shows up.
              </h2>
              <p className="text-xs text-[#667360] mt-1">
                124 reviews from verified CloudWalk customers across India.
              </p>
            </div>

            {/* Overall Rating Stat */}
            <div className="flex items-center gap-6 bg-white p-4 rounded-2xl border border-[#E8EDDF] shadow-xs">
              <div>
                <span className="font-['Outfit'] font-bold text-4xl text-[#1E3F20] block leading-none mb-1">
                  4.8
                </span>
                <div className="flex text-[#84BD3A]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} fill="#84BD3A" />
                  ))}
                </div>
              </div>
              <div className="space-y-1 text-[10px] font-['Geist_Mono'] text-gray-500 w-40">
                <div className="flex items-center gap-2"><span>5★</span><div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden"><div className="w-[88%] h-full bg-[#1E3F20]" /></div><span>102</span></div>
                <div className="flex items-center gap-2"><span>4★</span><div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden"><div className="w-[12%] h-full bg-[#1E3F20]" /></div><span>18</span></div>
                <div className="flex items-center gap-2"><span>3★</span><div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden"><div className="w-[3%] h-full bg-[#1E3F20]" /></div><span>3</span></div>
              </div>
            </div>
          </div>

          {/* 3 Review Cards with Real Photos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl p-6 border border-[#E8EDDF] shadow-xs flex flex-col justify-between">
              <div>
                <div className="h-48 rounded-2xl overflow-hidden mb-4 bg-gray-100">
                  <img src="/assets/review-photo-1.png" alt="Review on foot" className="w-full h-full object-cover" />
                </div>
                <div className="flex text-yellow-500 mb-2">★★★★★</div>
                <h4 className="font-['Outfit'] font-bold text-base text-[#1E3F20] mb-1">
                  All-day relief
                </h4>
                <p className="text-xs text-[#667360] leading-relaxed mb-4">
                  "I wore these through a ten-hour hospital shift and never thought about my feet once. The arch cradle is unbelievable."
                </p>
              </div>
              <div className="pt-3 border-t border-gray-100 text-xs">
                <span className="font-bold text-[#1E3F20] block">Priya R.</span>
                <span className="text-[10px] text-green-700 font-semibold">✓ Verified Buyer</span>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-[#E8EDDF] shadow-xs flex flex-col justify-between">
              <div>
                <div className="h-48 rounded-2xl overflow-hidden mb-4 bg-gray-100">
                  <img src="/assets/review-photo-2.png" alt="Review on street" className="w-full h-full object-cover" />
                </div>
                <div className="flex text-yellow-500 mb-2">★★★★★</div>
                <h4 className="font-['Outfit'] font-bold text-base text-[#1E3F20] mb-1">
                  True-to-size fit
                </h4>
                <p className="text-xs text-[#667360] leading-relaxed mb-4">
                  "The UK 6 fits perfectly and the straps make warm-day swelling easy to adjust on the go. Great build quality."
                </p>
              </div>
              <div className="pt-3 border-t border-gray-100 text-xs">
                <span className="font-bold text-[#1E3F20] block">Sneha M.</span>
                <span className="text-[10px] text-green-700 font-semibold">✓ Verified Buyer</span>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-[#E8EDDF] shadow-xs flex flex-col justify-between">
              <div>
                <div className="h-48 rounded-2xl overflow-hidden mb-4 bg-gray-100">
                  <img src="/assets/review-photo-3.png" alt="Review in park" className="w-full h-full object-cover" />
                </div>
                <div className="flex text-yellow-500 mb-2">★★★★★</div>
                <h4 className="font-['Outfit'] font-bold text-base text-[#1E3F20] mb-1">
                  Worth the switch
                </h4>
                <p className="text-xs text-[#667360] leading-relaxed mb-4">
                  "Supportive like my custom orthotics, but much lighter and actually stylish. Wearing them everywhere now."
                </p>
              </div>
              <div className="pt-3 border-t border-gray-100 text-xs">
                <span className="font-bold text-[#1E3F20] block">Aayushi K.</span>
                <span className="text-[10px] text-green-700 font-semibold">✓ Verified Buyer</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 11. FIVE BENEFITS, BRAND STORY & FIVE TECHNOLOGIES (Figma 1:3539)         */}
      {/* ========================================================================= */}
      <section className="max-w-[1360px] mx-auto px-6 py-20">
        
        {/* Five Benefits Cards */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <span className="text-[10px] font-['Geist_Mono'] font-bold text-[#667360] uppercase tracking-widest block mb-1">
              DESIGNED AROUND YOUR DAY
            </span>
            <h2 className="font-['Outfit'] font-bold text-3xl sm:text-4xl text-[#1E3F20]">
              Small details. Big comfort.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { title: 'Only The Finest Materials', desc: 'Full-grain leathers and premium fabrics chosen for lasting comfort.', icon: Award },
              { title: 'Light As A Whisper', desc: 'So light, it feels like walking on air — all day long without fatigue.', icon: Feather },
              { title: 'Luxury You Can Feel', desc: 'Indulgently soft uppers deliver a silky sensation with every step.', icon: Sparkles },
              { title: 'Gentle Support With Purpose', desc: 'Thoughtfully designed for diabetic and orthopedic foot support.', icon: ShieldCheck },
              { title: 'Style In Every Step', desc: 'Versatile silhouettes that move from office to dinner effortlessly.', icon: Activity },
            ].map((ben, i) => {
              const Icon = ben.icon;
              return (
                <div key={i} className="bg-[#FAFBF9] rounded-2xl p-5 border border-[#E8EDDF] shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="w-8 h-8 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-[#1E3F20] mb-3">
                      <Icon size={16} />
                    </div>
                    <h4 className="font-['Outfit'] font-bold text-sm text-[#1E3F20] mb-1.5">
                      {ben.title}
                    </h4>
                    <p className="text-[11px] text-[#667360] leading-relaxed">
                      {ben.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Founder Story Banner */}
        <div className="bg-[#1E3F20] text-white rounded-3xl p-10 lg:p-14 mb-20 shadow-xl border border-[#2D5A30]">
          <div className="max-w-3xl">
            <span className="text-[10px] font-['Geist_Mono'] font-bold text-[#84BD3A] uppercase tracking-widest block mb-3">
              OUR STORY
            </span>
            <h2 className="font-['Outfit'] font-bold text-3xl sm:text-4xl text-white mb-4 leading-tight">
              We identified a gap in the market for diabetic and ortho-friendly shoes — and built a brand around it.
            </h2>
            <p className="text-sm text-white/80 leading-relaxed mb-6 font-['Geist']">
              Working closely with medical professionals since 1997, MediFeet develops footwear that supports health and wellness without sacrificing style. Every design is refined with comfort and functionality in mind — for everyone.
            </p>
            <div className="flex gap-2">
              <span className="bg-white/10 text-white text-xs font-['Geist_Mono'] px-3 py-1 rounded-full border border-white/10">DIABETIC-FRIENDLY DESIGN</span>
              <span className="bg-white/10 text-white text-xs font-['Geist_Mono'] px-3 py-1 rounded-full border border-white/10">STYLE MEETS COMFORT</span>
            </div>
          </div>
        </div>

        {/* Five Technologies */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <span className="text-[10px] font-['Geist_Mono'] font-bold text-[#667360] uppercase tracking-widest block mb-1">
              INSIDE THE CLOUDWALK
            </span>
            <h2 className="font-['Outfit'] font-bold text-3xl sm:text-4xl text-[#1E3F20]">
              Five technologies. One shoe.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { num: '01', cat: 'ARCH SUPPORT', title: 'Alignment & Balance', desc: 'Designed to promote healthy posture and reduce foot strain.' },
              { num: '02', cat: 'REBOUND FOAM', title: 'Responsive Cushioning', desc: 'Absorbs heel strikes and springs back to propel your next stride.' },
              { num: '03', cat: 'ANTI-SKID SOLE', title: 'Grip & Stability', desc: 'Specialized rubber tread maintains traction across wet tiles.' },
              { num: '04', cat: 'ANATOMIC FOOTBED', title: 'Soft, Moulding Comfort', desc: 'Contoured to cradle your foot and prevent pressure hot spots.' },
              { num: '05', cat: 'MEDIFEET FOAM', title: 'Cushioned Footbed Tech', desc: 'Proprietary closed-cell compound for long-lasting joint relief.', dark: true },
            ].map((tech, i) => (
              <div
                key={i}
                className={`rounded-2xl p-5 border shadow-xs flex flex-col justify-between ${
                  tech.dark
                    ? 'bg-[#1E3F20] text-white border-[#2D5A30]'
                    : 'bg-[#FAFBF9] text-[#1E3F20] border-[#E8EDDF]'
                }`}
              >
                <div>
                  <span className={`text-[10px] font-['Geist_Mono'] font-bold block mb-1 ${tech.dark ? 'text-[#84BD3A]' : 'text-[#667360]'}`}>
                    {tech.num} · {tech.cat}
                  </span>
                  <h4 className="font-['Outfit'] font-bold text-sm mb-1.5">
                    {tech.title}
                  </h4>
                  <p className={`text-[11px] leading-relaxed ${tech.dark ? 'text-white/70' : 'text-[#667360]'}`}>
                    {tech.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sole Layers Diagram */}
        <div className="bg-[#FAFBF9] rounded-3xl p-10 border border-[#E8EDDF] mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 flex items-center justify-center p-6 bg-white rounded-2xl border border-gray-100 shadow-xs">
              <img
                src="/assets/sole-concept-thumbnail-image.png"
                alt="Exploded Sole Layers"
                className="max-h-72 object-contain"
              />
            </div>

            <div className="lg:col-span-6 space-y-4">
              <span className="text-[10px] font-['Geist_Mono'] font-bold text-[#667360] uppercase tracking-widest block">
                SOLE LAYERS / CONCEPT DIAGRAM
              </span>
              <h3 className="font-['Outfit'] font-bold text-3xl text-[#1E3F20] leading-tight">
                Three layers. One comfort system.
              </h3>

              <div className="space-y-3 pt-2">
                <div className="bg-white p-3.5 rounded-xl border border-[#E8EDDF] flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#1E3F20] text-[#84BD3A] text-xs font-bold flex items-center justify-center shrink-0">A</span>
                  <div>
                    <h5 className="font-bold text-xs text-[#1E3F20]">Anatomic Footbed (4mm)</h5>
                    <p className="text-[11px] text-[#667360]">Contoured to follow the natural biomechanical form of your foot.</p>
                  </div>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-[#E8EDDF] flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#1E3F20] text-[#84BD3A] text-xs font-bold flex items-center justify-center shrink-0">B</span>
                  <div>
                    <h5 className="font-bold text-xs text-[#1E3F20]">Medifeet Foam Core (12mm)</h5>
                    <p className="text-[11px] text-[#667360]">Lightweight cushioning engineered to absorb everyday joint impact.</p>
                  </div>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-[#E8EDDF] flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#1E3F20] text-[#84BD3A] text-xs font-bold flex items-center justify-center shrink-0">C</span>
                  <div>
                    <h5 className="font-bold text-xs text-[#1E3F20]">Anti-Skid Hex Outsole (6mm)</h5>
                    <p className="text-[11px] text-[#667360]">Textured rubber traction designed for wet and polished floor stability.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Good to Know 6-Card Grid */}
        <div>
          <div className="mb-6">
            <span className="text-[10px] font-['Geist_Mono'] font-bold text-[#667360] uppercase tracking-widest block mb-1">
              A LITTLE GUIDANCE
            </span>
            <h2 className="font-['Outfit'] font-bold text-3xl text-[#1E3F20]">
              Good to know.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="bg-white rounded-2xl p-6 border border-[#E8EDDF] shadow-xs">
              <h4 className="font-['Outfit'] font-bold text-sm text-[#1E3F20] mb-2">How do I care for my sandals?</h4>
              <p className="text-xs text-[#667360] leading-relaxed">Wipe with a soft damp cloth. Avoid soaking or machine washing. Air dry away from direct heat.</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#E8EDDF] shadow-xs">
              <h4 className="font-['Outfit'] font-bold text-sm text-[#1E3F20] mb-2">Can I exchange my size?</h4>
              <p className="text-xs text-[#667360] leading-relaxed">Yes. Keep your pair unworn with original packaging. Contact support to arrange a free exchange.</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#E8EDDF] shadow-xs">
              <h4 className="font-['Outfit'] font-bold text-sm text-[#1E3F20] mb-2">How do I choose my size?</h4>
              <p className="text-xs text-[#667360] leading-relaxed">Measure from heel to longest toe on both feet. Use the longer measurement with our size chart.</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#E8EDDF] shadow-xs">
              <h4 className="font-['Outfit'] font-bold text-sm text-[#1E3F20] mb-2">Can I return my pair?</h4>
              <p className="text-xs text-[#667360] leading-relaxed">Yes. Check our 30-day return policy for eligibility and timelines, then reach out to support.</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#E8EDDF] shadow-xs">
              <h4 className="font-['Outfit'] font-bold text-sm text-[#1E3F20] mb-2">What is the delivery timeline?</h4>
              <p className="text-xs text-[#667360] leading-relaxed">Metro deliveries arrive in 2–3 business days. Non-metros take 4–5 business days.</p>
            </div>

            <div className="bg-[#1E3F20] text-white rounded-2xl p-6 border border-[#2D5A30] shadow-md flex flex-col justify-between">
              <div>
                <h4 className="font-['Outfit'] font-bold text-sm text-white mb-1">Here for your next step.</h4>
                <p className="text-xs text-white/70 leading-relaxed mb-4">Need help with fit, delivery or your order? Talk to the MediFeet clinical care team.</p>
              </div>
              <button
                onClick={() => onNavigate && onNavigate('contact')}
                className="text-xs font-['Geist_Mono'] font-bold text-[#84BD3A] flex items-center gap-1 hover:underline cursor-pointer"
              >
                <span>Contact support →</span>
              </button>
            </div>
          </div>
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 12. PRODUCT RECOMMENDATIONS: COMPLETE THE LOOK & RECENTLY VIEWED (1:3710) */}
      {/* ========================================================================= */}
      <section className="bg-[#FAFBF9] py-20 border-t border-[#E8EDDF]">
        <div className="max-w-[1360px] mx-auto px-6">
          
          {/* Complete the Look */}
          <div className="mb-16">
            <h2 className="font-['Outfit'] font-bold text-2xl text-[#1E3F20] mb-6">
              Complete the Look
            </h2>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {completeTheLook.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-white rounded-2xl p-4 border border-[#E8EDDF] shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    <span className="text-[9px] font-['Geist_Mono'] font-bold bg-[#E8F3D6] text-[#1E3F20] px-2 py-0.5 rounded uppercase">
                      {prod.tag}
                    </span>
                    <div 
                      onClick={() => onNavigate && onNavigate('shop')}
                      className="h-44 bg-[#FAFBF9] rounded-xl p-3 my-3 flex items-center justify-center cursor-pointer overflow-hidden"
                    >
                      <img
                        src={prod.img}
                        alt={prod.name}
                        className="h-full object-contain filter drop-shadow-sm group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <h4 
                      onClick={() => onNavigate && onNavigate('shop')}
                      className="font-['Outfit'] font-bold text-sm text-[#1E3F20] cursor-pointer hover:underline truncate"
                    >
                      {prod.name}
                    </h4>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-2">
                    <div>
                      <span className="font-['Outfit'] font-bold text-base text-[#1E3F20]">₹{prod.price.toLocaleString('en-IN')}</span>
                      <span className="block text-[10px] text-gray-400 line-through">₹{prod.origPrice.toLocaleString('en-IN')}</span>
                    </div>
                    <button
                      onClick={() => addToCart({ id: prod.id, title: prod.name, price: prod.price, size: 6, image: prod.img })}
                      className="bg-[#1E3F20] hover:bg-[#285424] text-white text-xs font-bold px-3 py-1.5 rounded-xl transition cursor-pointer"
                    >
                      Add
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recently Viewed */}
          <div>
            <h2 className="font-['Outfit'] font-bold text-2xl text-[#1E3F20] mb-6">
              Recently Viewed
            </h2>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {recentlyViewed.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-white rounded-2xl p-4 border border-[#E8EDDF] shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    <span className="text-[9px] font-['Geist_Mono'] font-bold bg-[#E8F3D6] text-[#1E3F20] px-2 py-0.5 rounded uppercase">
                      {prod.tag}
                    </span>
                    <div 
                      onClick={() => onNavigate && onNavigate(prod.id === 'cloudwalk-stone-beige' ? 'product' : 'shop')}
                      className="h-44 bg-[#FAFBF9] rounded-xl p-3 my-3 flex items-center justify-center cursor-pointer overflow-hidden"
                    >
                      <img
                        src={prod.img}
                        alt={prod.name}
                        className="h-full object-contain filter drop-shadow-sm group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <h4 
                      onClick={() => onNavigate && onNavigate(prod.id === 'cloudwalk-stone-beige' ? 'product' : 'shop')}
                      className="font-['Outfit'] font-bold text-sm text-[#1E3F20] cursor-pointer hover:underline truncate"
                    >
                      {prod.name}
                    </h4>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-2">
                    <div>
                      <span className="font-['Outfit'] font-bold text-base text-[#1E3F20]">₹{prod.price.toLocaleString('en-IN')}</span>
                      <span className="block text-[10px] text-gray-400 line-through">₹{prod.origPrice.toLocaleString('en-IN')}</span>
                    </div>
                    <button
                      onClick={() => addToCart({ id: prod.id, title: prod.name, price: prod.price, size: 6, image: prod.img })}
                      className="bg-[#1E3F20] hover:bg-[#285424] text-white text-xs font-bold px-3 py-1.5 rounded-xl transition cursor-pointer"
                    >
                      Add
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 13. DESKTOP FOOTER (Figma 1:3869)                                         */}
      {/* ========================================================================= */}
      <footer className="bg-[#121612] text-white py-16 border-t border-white/10">
        <div className="max-w-[1360px] mx-auto px-6">
          <div className="grid grid-cols-12 gap-10 pb-12 border-b border-white/10">
            {/* Brand & Newsletter (Cols 1-5) */}
            <div className="col-span-12 lg:col-span-5">
              <span className="font-['Geist_Mono'] text-[10px] font-bold text-[#84BD3A] uppercase tracking-widest block mb-2">
                STEP INTO WHAT'S NEXT
              </span>
              <h3 className="font-['Outfit'] font-bold text-2xl text-white mb-2">
                Drops, fit advice and members-only comfort edits. Plus 5% off your first order.
              </h3>
              <form onSubmit={(e) => { e.preventDefault(); alert("Subscribed!"); }} className="flex gap-2 mt-4 max-w-md">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  required
                  className="bg-black/50 border border-white/20 rounded-xl px-4 py-3 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[#84BD3A] flex-1"
                />
                <button
                  type="submit"
                  className="bg-[#84BD3A] hover:bg-[#95cf45] text-[#1E3F20] font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider transition cursor-pointer"
                >
                  JOIN
                </button>
              </form>
            </div>

            {/* Links Columns (Cols 6-12) */}
            <div className="col-span-12 lg:col-span-7 grid grid-cols-4 gap-6 text-xs text-white/70">
              <div>
                <h5 className="font-['Geist_Mono'] text-[11px] font-bold text-white uppercase tracking-wider mb-3">SHOP</h5>
                <ul className="space-y-2">
                  <li className="hover:text-white cursor-pointer" onClick={() => onNavigate && onNavigate('shop')}>New arrivals</li>
                  <li className="hover:text-white cursor-pointer" onClick={() => onNavigate && onNavigate('shop')}>Women</li>
                  <li className="hover:text-white cursor-pointer" onClick={() => onNavigate && onNavigate('men')}>Men</li>
                  <li className="hover:text-white cursor-pointer" onClick={() => onNavigate && onNavigate('shop')}>Sandals</li>
                  <li className="hover:text-white cursor-pointer" onClick={() => onNavigate && onNavigate('shop')}>Walking shoes</li>
                </ul>
              </div>

              <div>
                <h5 className="font-['Geist_Mono'] text-[11px] font-bold text-white uppercase tracking-wider mb-3">HELP</h5>
                <ul className="space-y-2">
                  <li className="hover:text-white cursor-pointer">Track my order</li>
                  <li className="hover:text-white cursor-pointer" onClick={() => onNavigate && onNavigate('contact')}>Returns & exchanges</li>
                  <li className="hover:text-white cursor-pointer" onClick={() => setIsSizeChartOpen(true)}>Size & fit guide</li>
                  <li className="hover:text-white cursor-pointer" onClick={() => onNavigate && onNavigate('contact')}>Contact support</li>
                </ul>
              </div>

              <div>
                <h5 className="font-['Geist_Mono'] text-[11px] font-bold text-white uppercase tracking-wider mb-3">MEDIFEET</h5>
                <ul className="space-y-2">
                  <li className="hover:text-white cursor-pointer" onClick={() => onNavigate && onNavigate('about')}>Our comfort story</li>
                  <li className="hover:text-white cursor-pointer" onClick={() => onNavigate && onNavigate('contact')}>Stores</li>
                  <li className="hover:text-white cursor-pointer" onClick={() => onNavigate && onNavigate('about')}>Sustainability</li>
                  <li className="hover:text-white cursor-pointer" onClick={() => onNavigate && onNavigate('about')}>Careers</li>
                </ul>
              </div>

              <div>
                <h5 className="font-['Geist_Mono'] text-[11px] font-bold text-white uppercase tracking-wider mb-3">LEGAL</h5>
                <ul className="space-y-2">
                  <li className="hover:text-white cursor-pointer">Privacy</li>
                  <li className="hover:text-white cursor-pointer">Terms</li>
                  <li className="hover:text-white cursor-pointer">Warranty</li>
                  <li className="hover:text-white cursor-pointer">Accessibility</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="pt-8 flex items-center justify-between text-xs text-white/50">
            <p>© 2026 MediFeet India. Built for comfort, made for motion.</p>
            <div className="flex gap-4">
              <span>Secure payments</span>
              <span>·</span>
              <span>30-day returns</span>
              <span>·</span>
              <span>WhatsApp support</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Sizing Modal */}
      <SizeChartModal
        isOpen={isSizeChartOpen}
        onClose={() => setIsSizeChartOpen(false)}
        selectedSize={selectedSize}
        onSelectSize={(sz) => setSelectedSize(sz)}
      />

    </div>
  );
};

export default DesktopProductPage;
