import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, Heart, ShoppingBag, Search, User, MapPin, 
  ChevronLeft, ChevronRight, Check, Eye, Filter, ArrowRight,
  ShieldCheck, Truck, RefreshCw, Sparkles, SlidersHorizontal
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import DesktopHeader from '../components/DesktopHeader';

export const DesktopShopPage = ({ onNavigate }) => {
  const { addToCart, setIsCartOpen, cartCount, wishlist, toggleWishlist } = useCart();
  
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSort, setSelectedSort] = useState('Featured');
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(7);
  const [addedItemName, setAddedItemName] = useState(null);

  const categories = ['All', 'Sandals', 'Casual', 'Formal', 'Sport', 'Cork Collection'];

  const products = [
    {
      id: 'cloudwalk-sandal',
      name: 'CloudWalk Sandal',
      category: 'Sandals',
      price: 2499,
      formattedPrice: '₹2,499',
      originalPrice: '₹3,499',
      rating: 4.8,
      reviewsCount: 342,
      badge: 'BESTSELLER',
      image: '/assets/desk_product_image_64c439.png',
      isPdp: true,
      colors: [
        { name: 'Olive Green', hex: '#3B4D3C' },
        { name: 'Sand Khaki', hex: '#C2B69D' },
        { name: 'Onyx Black', hex: '#1C1C1C' }
      ],
      desc: 'Double-cushion anatomical arch support with Fluffium™ rebound midsole.'
    },
    {
      id: 'breeze-slip-on',
      name: 'Breeze Slip-On',
      category: 'Casual',
      price: 1899,
      formattedPrice: '₹1,899',
      originalPrice: '₹2,499',
      rating: 4.5,
      reviewsCount: 189,
      badge: 'NEW',
      image: '/assets/desk_product_image_ee0159.png',
      colors: [
        { name: 'Pure White', hex: '#F0F0F0' },
        { name: 'Navy Blue', hex: '#1E293B' },
        { name: 'Slate Grey', hex: '#64748B' }
      ],
      desc: 'Seamless stretch knit upper with zero heel slip construction.'
    },
    {
      id: 'luna-flat',
      name: 'Luna Flat',
      category: 'Formal',
      price: 1499,
      formattedPrice: '₹1,499',
      originalPrice: '₹1,999',
      rating: 4.4,
      reviewsCount: 120,
      badge: null,
      image: '/assets/desk_product_image_5748a7.png',
      colors: [
        { name: 'Ballet Pink', hex: '#E8D5D5' },
        { name: 'Espresso', hex: '#4A3B32' },
        { name: 'Black Patent', hex: '#111111' }
      ],
      desc: 'Ergonomic ballet flat with hidden arch contour and memory foam heel pillow.'
    },
    {
      id: 'aria-mule',
      name: 'Aria Mule',
      category: 'Casual',
      price: 2999,
      formattedPrice: '₹2,999',
      originalPrice: '₹3,799',
      rating: 4.7,
      reviewsCount: 215,
      badge: null,
      image: '/assets/desk_product_image_bed441.png',
      colors: [
        { name: 'Caramel Tan', hex: '#A3683C' },
        { name: 'Bone Ivory', hex: '#EBE5D8' },
        { name: 'Charcoal', hex: '#333333' }
      ],
      desc: 'Slip-on mule in supple full-grain Italian leather with deep metatarsal cup.'
    },
    {
      id: 'nova-court',
      name: 'Nova Court',
      category: 'Sport',
      price: 3199,
      formattedPrice: '₹3,199',
      originalPrice: '₹3,999',
      rating: 4.6,
      reviewsCount: 178,
      badge: 'POPULAR',
      image: '/assets/desk_product_image_05ccc3.png',
      colors: [
        { name: 'Triple White', hex: '#FFFFFF' },
        { name: 'Forest Green', hex: '#1E3F20' },
        { name: 'Cobalt Accent', hex: '#2563EB' }
      ],
      desc: 'Heritage tennis court silhouette retrofitted with clinical shock absorption.'
    },
    {
      id: 'sienna-derby',
      name: 'Sienna Derby',
      category: 'Formal',
      price: 4299,
      formattedPrice: '₹4,299',
      originalPrice: '₹5,499',
      rating: 4.9,
      reviewsCount: 310,
      badge: 'PREMIUM',
      image: '/assets/desk_product_image_edaaad.png',
      colors: [
        { name: 'Burnished Tan', hex: '#8B4513' },
        { name: 'Deep Burgundy', hex: '#4A1525' },
        { name: 'Midnight', hex: '#101018' }
      ],
      desc: 'Hand-burnished luxury calfskin oxford with hidden orthopedic spinal shank.'
    },
    {
      id: 'harbor-slide',
      name: 'Harbor Slide',
      category: 'Sandals',
      price: 2799,
      formattedPrice: '₹2,799',
      originalPrice: '₹3,299',
      rating: 4.5,
      reviewsCount: 164,
      badge: null,
      image: '/assets/desk_product_image_8df6ad.png',
      colors: [
        { name: 'Warm Taupe', hex: '#A89F91' },
        { name: 'Ocean Navy', hex: '#1B2A47' },
        { name: 'Jet Black', hex: '#111111' }
      ],
      desc: 'Water-resistant hydro-foam recovery slide designed for pool, beach, and home.'
    },
    {
      id: 'ember-sandal',
      name: 'Ember Sandal',
      category: 'Sandals',
      price: 3499,
      formattedPrice: '₹3,499',
      originalPrice: '₹4,199',
      rating: 4.8,
      reviewsCount: 288,
      badge: 'TOP RATED',
      image: '/assets/desk_product_image_5dc7bc.png',
      colors: [
        { name: 'Terracotta', hex: '#D97757' },
        { name: 'Desert Khaki', hex: '#CBBBA0' },
        { name: 'Pitch Black', hex: '#141414' }
      ],
      desc: 'Strappy orthopedic wedge sandal with anti-pronation cork core.'
    },
    {
      id: 'tulum-cork-slide',
      name: 'Tulum Cork Slide',
      category: 'Cork Collection',
      price: 2299,
      formattedPrice: '₹2,299',
      originalPrice: '₹2,899',
      rating: 4.7,
      reviewsCount: 195,
      badge: 'ORGANIC CORK',
      image: '/assets/desk_product_image_45a5df.png',
      colors: [
        { name: 'Natural Cork', hex: '#C8A870' },
        { name: 'Espresso Suede', hex: '#4A3525' },
        { name: 'Cream Nubuck', hex: '#EAE5D9' }
      ],
      desc: 'Sustainably harvested Portuguese cork footbed that molds to your unique foot shape.'
    }
  ];

  // Filtering
  const filteredProducts = products.filter(p => {
    if (selectedCategory === 'All') return true;
    return p.category === selectedCategory;
  });

  // Sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (selectedSort === 'Price: Low to High') return a.price - b.price;
    if (selectedSort === 'Price: High to Low') return b.price - a.price;
    if (selectedSort === 'Highest Rated') return b.rating - a.rating;
    return 0; // Featured
  });

  const handleQuickAdd = (product, e) => {
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      size: 7,
      color: product.colors[0].name,
      image: product.image
    });
    setAddedItemName(product.name);
    setTimeout(() => setAddedItemName(null), 3000);
  };

  return (
    <div className="bg-[#FFFFFF] text-[#1E3F20] font-['Geist'] min-h-screen">
      
      {/* ========================================================================= */}
      {/* 1 & 2. UNIFIED TOP BAR & STICKY HEADER                                    */}
      {/* ========================================================================= */}
      <DesktopHeader currentPage="shop" onNavigate={onNavigate} />

      {/* ========================================================================= */}
      {/* 3. HERO BANNER (Matching Figma 1:1320 Hero Image & Typography)            */}
      {/* ========================================================================= */}
      <section className="max-w-[1360px] mx-auto px-6 pt-6 pb-10">
        <div className="relative rounded-3xl overflow-hidden min-h-[420px] shadow-xl border border-gray-200 flex items-center">
          {/* Background Image: Woman in trench coat on beige/stone backdrop */}
          <img
            src="/assets/desk_hero_82c90e.png"
            alt="Women's Collection - Step Into Style"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          {/* Gradient Overlay for high-end contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />

          {/* Hero Content Overlay */}
          <div className="relative z-10 p-12 max-w-xl text-white">
            <span className="font-['Geist_Mono'] text-xs uppercase tracking-widest text-[#84BD3A] font-bold block mb-3">
              WOMEN'S COLLECTION 2026
            </span>
            <h1 className="font-['Outfit'] font-extrabold text-5xl tracking-tight leading-tight mb-4">
              Step Into Style.
            </h1>
            <p className="text-white/85 text-base font-['Geist'] leading-relaxed mb-6">
              Effortless comfort for every outfit, every errand, and every day in between. Podiatrist-certified contour insoles wrapped in luxury craftsmanship.
            </p>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => {
                  const el = document.getElementById('collection-grid');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-[#84BD3A] hover:bg-[#96d246] text-[#1E3F20] font-['Outfit'] font-bold text-xs uppercase tracking-wider px-7 py-3.5 rounded-full transition shadow-lg cursor-pointer flex items-center gap-2"
              >
                <span>EXPLORE COLLECTION</span>
                <ArrowRight size={14} />
              </button>
              <button 
                onClick={() => onNavigate('product')}
                className="bg-white/15 backdrop-blur-md hover:bg-white/25 text-white font-['Outfit'] font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-full border border-white/30 transition cursor-pointer"
              >
                EXPLORE CLOUDWALK
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. COLLECTION FILTER & SORT BAR (Matching Figma 1:1320 Category Pills)     */}
      {/* ========================================================================= */}
      <section id="collection-grid" className="max-w-[1360px] mx-auto px-6 py-6 border-t border-[#E8EDDF]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6">
          
          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2 rounded-full text-xs font-['Outfit'] font-bold transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-[#1E3F20] text-white shadow-sm'
                      : 'bg-[#F4F6F2] text-[#4A5D4E] hover:bg-[#E8EDDF] hover:text-[#1E3F20]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-['Geist'] text-gray-500 flex items-center gap-1.5">
              <SlidersHorizontal size={14} />
              <span>Sort:</span>
            </span>
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="bg-[#F4F6F2] border border-gray-200 text-xs font-['Outfit'] font-bold text-[#1E3F20] px-4 py-2 rounded-full focus:outline-none focus:border-[#84BD3A] cursor-pointer"
            >
              <option value="Featured">Featured</option>
              <option value="Price: Low to High">Price: Low to High</option>
              <option value="Price: High to Low">Price: High to Low</option>
              <option value="Highest Rated">Highest Rated</option>
            </select>
            <span className="text-xs font-['Geist_Mono'] text-gray-400">
              ({sortedProducts.length} models)
            </span>
          </div>
        </div>

        {/* Added Notification Toast */}
        <AnimatePresence>
          {addedItemName && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-[#1E3F20] text-white text-xs px-5 py-2.5 rounded-full shadow-lg mb-6 flex items-center gap-2 w-fit mx-auto"
            >
              <Check size={14} className="text-[#84BD3A]" />
              <span>Added <strong>{addedItemName}</strong> to cart!</span>
              <button 
                onClick={() => setIsCartOpen(true)} 
                className="underline text-[#84BD3A] ml-2 font-bold cursor-pointer"
              >
                View Cart
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ========================================================================= */}
        {/* 5. 9-PRODUCT LUXURY GRID (3 columns x 3 rows matching Figma 1:1320)       */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-2 pb-12">
          {sortedProducts.map((product) => {
            const isWishlisted = wishlist.includes(product.id);
            return (
              <div
                key={product.id}
                onClick={() => {
                  if (product.isPdp) {
                    onNavigate('product');
                  } else {
                    setQuickViewProduct(product);
                  }
                }}
                className="bg-white rounded-3xl overflow-hidden border border-[#E8EDDF] shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col cursor-pointer"
              >
                {/* Product Image Frame */}
                <div className="relative bg-[#F9FAF8] h-72 flex items-center justify-center p-6 overflow-hidden">
                  {/* Badge */}
                  {product.badge && (
                    <span className="absolute top-4 left-4 z-10 bg-[#1E3F20] text-[#84BD3A] text-[10px] font-['Geist_Mono'] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                      {product.badge}
                    </span>
                  )}

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-md text-gray-500 hover:text-[#C25443] transition cursor-pointer"
                  >
                    <Heart size={16} className={isWishlisted ? "fill-[#C25443] text-[#C25443]" : ""} />
                  </button>

                  {/* Product Shoe Image */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-56 max-w-full object-contain group-hover:scale-106 transition-transform duration-500"
                  />

                  {/* Quick Action Overlay on Hover */}
                  <div className="absolute inset-x-4 bottom-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={(e) => handleQuickAdd(product, e)}
                      className="flex-1 bg-[#1E3F20] hover:bg-[#2D5A30] text-white py-2.5 rounded-full text-xs font-['Outfit'] font-bold flex items-center justify-center gap-1.5 shadow-lg transition cursor-pointer"
                    >
                      <ShoppingBag size={13} className="text-[#84BD3A]" />
                      <span>QUICK ADD (UK 7)</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (product.isPdp) {
                          onNavigate('product');
                        } else {
                          setQuickViewProduct(product);
                        }
                      }}
                      className="bg-white/95 hover:bg-white text-[#1E3F20] p-2.5 rounded-full shadow-lg transition cursor-pointer"
                      title="Quick View"
                    >
                      <Eye size={16} />
                    </button>
                  </div>
                </div>

                {/* Product Metadata & Swatches */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Color Swatches */}
                    <div className="flex items-center gap-1.5 mb-2.5">
                      {product.colors.map((c, i) => (
                        <span
                          key={i}
                          title={c.name}
                          style={{ backgroundColor: c.hex }}
                          className="w-3.5 h-3.5 rounded-full border border-gray-300 inline-block shadow-xs"
                        />
                      ))}
                      <span className="text-[11px] text-gray-400 font-['Geist'] ml-1">
                        {product.colors.length} colors
                      </span>
                    </div>

                    {/* Product Name */}
                    <h3 className="font-['Outfit'] font-bold text-lg text-[#1E3F20] group-hover:text-[#84BD3A] transition mb-1">
                      {product.name}
                    </h3>
                    <p className="text-xs text-[#667360] line-clamp-1 mb-3">
                      {product.desc}
                    </p>
                  </div>

                  {/* Price & Rating */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-baseline gap-2">
                      <span className="font-['Geist_Mono'] font-bold text-base text-[#1E3F20]">
                        {product.formattedPrice}
                      </span>
                      {product.originalPrice && (
                        <span className="font-['Geist_Mono'] text-xs text-gray-400 line-through">
                          {product.originalPrice}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1 text-xs">
                      <div className="flex text-[#84BD3A]">
                        {[...Array(5)].map((_, idx) => (
                          <Star key={idx} size={11} className="fill-current text-[#84BD3A]" />
                        ))}
                      </div>
                      <span className="font-['Geist_Mono'] text-gray-500 text-[11px]">
                        ({product.rating})
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* 6. PAGINATION BAR (Matching Figma 1:1320)                                 */}
        {/* ========================================================================= */}
        <div className="flex items-center justify-center gap-2 py-8 border-t border-[#E8EDDF]">
          <button 
            disabled={currentPageNum === 1}
            onClick={() => setCurrentPageNum(p => Math.max(1, p - 1))}
            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#1E3F20] hover:text-[#1E3F20] transition cursor-pointer disabled:opacity-40"
          >
            <ChevronLeft size={16} />
          </button>
          {[1, 2, 3, 4].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPageNum(page)}
              className={`w-10 h-10 rounded-full font-['Geist_Mono'] text-xs font-bold transition cursor-pointer ${
                currentPageNum === page
                  ? 'bg-[#1E3F20] text-white shadow-sm'
                  : 'text-[#1E3F20] hover:bg-gray-100'
              }`}
            >
              {page}
            </button>
          ))}
          <button 
            disabled={currentPageNum === 4}
            onClick={() => setCurrentPageNum(p => Math.min(4, p + 1))}
            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#1E3F20] hover:text-[#1E3F20] transition cursor-pointer disabled:opacity-40"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. VALUE PROPOSITIONS BAR                                                 */}
      {/* ========================================================================= */}
      <section className="bg-[#F7F9F6] border-y border-[#E8EDDF] py-12 px-6">
        <div className="max-w-[1360px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#E8EDDF] flex items-center justify-center text-[#1E3F20]">
              <Truck size={22} />
            </div>
            <div>
              <h4 className="font-['Outfit'] font-bold text-sm text-[#1E3F20]">Free Nationwide Shipping</h4>
              <p className="text-xs text-gray-500">Orders above ₹1,999 dispatch in 24h</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#E8EDDF] flex items-center justify-center text-[#1E3F20]">
              <ShieldCheck size={22} />
            </div>
            <div>
              <h4 className="font-['Outfit'] font-bold text-sm text-[#1E3F20]">Podiatrist Endorsed</h4>
              <p className="text-xs text-gray-500">Certified by Indian Orthotic Society</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#E8EDDF] flex items-center justify-center text-[#1E3F20]">
              <RefreshCw size={22} />
            </div>
            <div>
              <h4 className="font-['Outfit'] font-bold text-sm text-[#1E3F20]">30-Day Wear Trial</h4>
              <p className="text-xs text-gray-500">Walk pain-free or return hassle-free</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#E8EDDF] flex items-center justify-center text-[#1E3F20]">
              <Sparkles size={22} />
            </div>
            <div>
              <h4 className="font-['Outfit'] font-bold text-sm text-[#1E3F20]">Fluffium™ Cushion Tech</h4>
              <p className="text-xs text-gray-500">Rebound EVA eliminates heel shock</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. QUICK VIEW MODAL FOR BROWSING                                          */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {quickViewProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl relative overflow-hidden border border-gray-200"
            >
              <button
                onClick={() => setQuickViewProduct(null)}
                className="absolute top-5 right-5 text-gray-400 hover:text-black font-bold text-xl cursor-pointer"
              >
                ✕
              </button>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="bg-[#F9FAF8] rounded-2xl p-6 flex items-center justify-center h-64">
                  <img
                    src={quickViewProduct.image}
                    alt={quickViewProduct.name}
                    className="max-h-52 object-contain"
                  />
                </div>

                <div>
                  <span className="font-['Geist_Mono'] text-[11px] font-bold text-[#84BD3A] uppercase tracking-wider block mb-1">
                    {quickViewProduct.category}
                  </span>
                  <h3 className="font-['Outfit'] font-bold text-2xl text-[#1E3F20] mb-2">
                    {quickViewProduct.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-['Geist_Mono'] font-bold text-xl text-[#1E3F20]">
                      {quickViewProduct.formattedPrice}
                    </span>
                    <span className="font-['Geist_Mono'] text-xs text-gray-400 line-through">
                      {quickViewProduct.originalPrice}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed mb-4">
                    {quickViewProduct.desc}
                  </p>

                  <div className="mb-4">
                    <span className="text-xs font-['Outfit'] font-bold text-[#1E3F20] block mb-1.5">
                      Select UK Size:
                    </span>
                    <div className="flex gap-2">
                      {[5, 6, 7, 8, 9, 10].map(sz => (
                        <button
                          key={sz}
                          onClick={() => setSelectedSize(sz)}
                          className={`w-8 h-8 rounded-lg text-xs font-['Geist_Mono'] font-bold transition cursor-pointer ${
                            selectedSize === sz
                              ? 'bg-[#1E3F20] text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        addToCart({
                          id: quickViewProduct.id,
                          name: quickViewProduct.name,
                          price: quickViewProduct.price,
                          size: selectedSize,
                          color: quickViewProduct.colors[0].name,
                          image: quickViewProduct.image
                        });
                        setQuickViewProduct(null);
                      }}
                      className="flex-1 bg-[#84BD3A] hover:bg-[#96d246] text-[#1E3F20] font-['Outfit'] font-bold py-3 rounded-full text-xs uppercase tracking-wider transition shadow-md cursor-pointer"
                    >
                      ADD TO CART
                    </button>
                    <button
                      onClick={() => {
                        setQuickViewProduct(null);
                        onNavigate('product');
                      }}
                      className="border border-[#1E3F20] text-[#1E3F20] font-['Outfit'] font-bold py-3 px-4 rounded-full text-xs uppercase tracking-wider hover:bg-gray-50 transition cursor-pointer"
                    >
                      Full Details →
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 9. DESKTOP FOOTER (Matching Figma 1:1320 5-Column Grid)                   */}
      {/* ========================================================================= */}
      <footer className="bg-[#121612] text-white pt-16 pb-12 border-t border-white/10">
        <div className="max-w-[1360px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-white/10">
            {/* Col 1: Shop */}
            <div>
              <h4 className="font-['Outfit'] font-bold text-xs tracking-wider text-white uppercase mb-4">
                SHOP
              </h4>
              <ul className="space-y-2.5 text-xs text-white/70 font-['Geist']">
                <li><button onClick={() => setSelectedCategory('Sandals')} className="hover:text-white transition cursor-pointer">Orthopedic Sandals</button></li>
                <li><button onClick={() => setSelectedCategory('Sport')} className="hover:text-white transition cursor-pointer">Biomechanical Sneakers</button></li>
                <li><button onClick={() => setSelectedCategory('Formal')} className="hover:text-white transition cursor-pointer">Comfort Formal Shoes</button></li>
                <li><button onClick={() => setSelectedCategory('Sport')} className="hover:text-white transition cursor-pointer">Kids Orthotics</button></li>
                <li><button onClick={() => setSelectedCategory('Casual')} className="hover:text-white transition cursor-pointer">New Arrivals</button></li>
                <li><button onClick={() => setSelectedCategory('Sandals')} className="hover:text-white transition cursor-pointer">Sale & Clearance</button></li>
              </ul>
            </div>

            {/* Col 2: Customer Care */}
            <div>
              <h4 className="font-['Outfit'] font-bold text-xs tracking-wider text-white uppercase mb-4">
                CUSTOMER CARE
              </h4>
              <ul className="space-y-2.5 text-xs text-white/70 font-['Geist']">
                <li><button onClick={() => onNavigate('contact')} className="hover:text-white transition cursor-pointer">Track My Order</button></li>
                <li><button onClick={() => onNavigate('contact')} className="hover:text-white transition cursor-pointer">Returns & Exchanges</button></li>
                <li><button onClick={() => onNavigate('product')} className="hover:text-white transition cursor-pointer">Sizing & Fit Guide</button></li>
                <li><button onClick={() => onNavigate('about')} className="hover:text-white transition cursor-pointer">Foot Health Blog</button></li>
                <li><button onClick={() => onNavigate('contact')} className="hover:text-white transition cursor-pointer">Contact Support</button></li>
                <li><button onClick={() => onNavigate('contact')} className="hover:text-white transition cursor-pointer">FAQs</button></li>
              </ul>
            </div>

            {/* Col 3: About */}
            <div>
              <h4 className="font-['Outfit'] font-bold text-xs tracking-wider text-white uppercase mb-4">
                ABOUT MEDIFEET
              </h4>
              <ul className="space-y-2.5 text-xs text-white/70 font-['Geist']">
                <li><button onClick={() => onNavigate('about')} className="hover:text-white transition cursor-pointer">Our Science & Tech</button></li>
                <li><button onClick={() => onNavigate('about')} className="hover:text-white transition cursor-pointer">The Foot Health Story</button></li>
                <li><button onClick={() => onNavigate('about')} className="hover:text-white transition cursor-pointer">Careers</button></li>
                <li><button onClick={() => onNavigate('about')} className="hover:text-white transition cursor-pointer">Sustainability</button></li>
                <li><button onClick={() => onNavigate('about')} className="hover:text-white transition cursor-pointer">Maker's Studio</button></li>
                <li><button onClick={() => onNavigate('about')} className="hover:text-white transition cursor-pointer">Press Releases</button></li>
              </ul>
            </div>

            {/* Col 4: Legal */}
            <div>
              <h4 className="font-['Outfit'] font-bold text-xs tracking-wider text-white uppercase mb-4">
                LEGAL
              </h4>
              <ul className="space-y-2.5 text-xs text-white/70 font-['Geist']">
                <li><span className="hover:text-white transition cursor-pointer">Privacy Policy</span></li>
                <li><span className="hover:text-white transition cursor-pointer">Terms of Use</span></li>
                <li><span className="hover:text-white transition cursor-pointer">Warranty Claim</span></li>
                <li><span className="hover:text-white transition cursor-pointer">Cookie Settings</span></li>
                <li><span className="hover:text-white transition cursor-pointer">Affiliate Program</span></li>
              </ul>
            </div>

            {/* Col 5: Newsletter */}
            <div>
              <h4 className="font-['Outfit'] font-bold text-xs tracking-wider text-white uppercase mb-2">
                SUBSCRIBE & SAVE 10%
              </h4>
              <p className="text-xs text-white/60 mb-4 leading-relaxed">
                Sign up to receive expert foot health tips, exclusive collections, and early access to sales.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-white/10 border border-white/20 text-xs px-3.5 py-2 rounded-full text-white placeholder:text-white/40 flex-1 focus:outline-none focus:border-[#84BD3A]"
                />
                <button className="bg-[#84BD3A] text-[#1E3F20] font-['Outfit'] font-bold text-xs px-4 py-2 rounded-full hover:bg-[#96d246] transition cursor-pointer">
                  JOIN
                </button>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/50">
            <span>© 2026 Medifeet India. Biomechanically engineered comfort. All rights reserved.</span>
            <span className="text-[#84BD3A] font-medium">Verified Partner of Orthotic Society</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DesktopShopPage;
