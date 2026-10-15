import React, { useState } from 'react';
import { SlidersHorizontal, ChevronDown, Star, Sparkles, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const ShopPage = ({ onNavigate }) => {
  const { addToCart } = useCart();
  const [activeFilter, setActiveFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Featured');
  const [currentPageNum, setCurrentPageNum] = useState(1);

  const filters = ['All', 'Sandals', 'Slides', 'Casual'];

  const products = [
    {
      id: 'cloudwalk-stone-beige',
      name: 'CloudWalk Sandal',
      category: 'Sandals',
      price: 2499,
      origPrice: 3299,
      rating: 4.9,
      reviewsCount: 124,
      image: '/assets/product-thumbnail.png',
      badge: 'TOP SELLER',
      featured: true,
      description: '18mm contoured arch support & dynamic rebound memory foam.'
    },
    {
      id: 'ortho-comfort-slide',
      name: 'Ortho Comfort Slide',
      category: 'Slides',
      price: 1899,
      origPrice: 2499,
      rating: 4.8,
      reviewsCount: 88,
      image: '/assets/product-ortho-slide.png',
      badge: 'POPULAR',
      description: 'Dual adjustable instep closures designed for high insteps.'
    },
    {
      id: 'breeze-walker',
      name: 'Breeze Walker',
      category: 'Casual',
      price: 3299,
      origPrice: 3999,
      rating: 4.7,
      reviewsCount: 65,
      image: '/assets/product-breeze-walker.png',
      badge: 'NEW',
      description: 'Supple full-grain leather loafers with orthotic cup footbed.'
    },
    {
      id: 'cork-ortho-slipper',
      name: 'Cork Ortho Slipper',
      category: 'Slides',
      price: 2199,
      origPrice: 2899,
      rating: 4.9,
      reviewsCount: 110,
      image: '/assets/product-cork-slipper.png',
      badge: 'ECO CHOICE',
      description: 'Natural contour cork midsole molded to anatomical arches.'
    },
    {
      id: 'cloud-cushion-runner',
      name: 'Cloud Cushion Runner',
      category: 'Casual',
      price: 3899,
      origPrice: 4799,
      rating: 4.8,
      reviewsCount: 94,
      image: '/assets/product-cushion-runner.png',
      badge: 'RUNNER',
      description: 'Lightweight knit slip-on with 68% kinetic shock absorption.'
    },
    {
      id: 'luxe-recovery-flip',
      name: 'Luxe Recovery Flip',
      category: 'Sandals',
      price: 1599,
      origPrice: 1999,
      rating: 4.6,
      reviewsCount: 52,
      image: '/assets/product-luxe-recovery.png',
      badge: 'RECOVERY',
      description: 'Soft-touch toe post with non-slip hexagonal wet outsole.'
    }
  ];

  const filteredProducts = products.filter(p => {
    if (activeFilter === 'All') return true;
    return p.category === activeFilter;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'Price: Low to High') return a.price - b.price;
    if (sortBy === 'Price: High to Low') return b.price - a.price;
    if (sortBy === 'Rating') return b.rating - a.rating;
    return 0; // Featured
  });

  return (
    <div className="bg-[#F7F9F6] text-[#1E3F20] font-['Geist'] min-h-screen py-8 px-4 sm:px-6">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Page Header */}
        <div className="mb-6">
          <span className="text-[10px] font-['Geist_Mono'] font-bold text-[#667360] uppercase tracking-widest block mb-1">
            WOMEN'S COLLECTION
          </span>
          <h1 className="font-['Outfit'] font-bold text-3xl sm:text-4xl text-[#1E3F20]">
            Step Into Style
          </h1>
          <p className="text-xs text-[#667360] mt-1">
            Clinical podiatric ergonomics combined with contemporary silhouettes.
          </p>
        </div>

        {/* Filter Pills & Sort Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-[#E8EDDF]">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {filters.map((fil) => (
              <button
                key={fil}
                onClick={() => setActiveFilter(fil)}
                className={`px-4 py-1.5 rounded-full text-xs font-['Outfit'] font-bold transition-all cursor-pointer ${
                  activeFilter === fil
                    ? 'bg-[#1E3F20] text-white shadow-xs'
                    : 'bg-white border border-[#E8EDDF] text-[#667360] hover:text-[#1E3F20]'
                }`}
              >
                {fil}
              </button>
            ))}
          </div>

          {/* Controls: Filter count & Sort */}
          <div className="flex items-center justify-between sm:justify-end gap-3 text-xs">
            <div className="flex items-center gap-1.5 text-[#667360] font-medium">
              <SlidersHorizontal size={14} />
              <span>Filters ({filteredProducts.length})</span>
            </div>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-[#D5DCCF] rounded-xl px-3 py-1.5 text-xs font-medium text-[#1E3F20] focus:outline-none cursor-pointer"
              >
                <option value="Featured">Sort: Featured</option>
                <option value="Price: Low to High">Sort: Price (Low to High)</option>
                <option value="Price: High to Low">Sort: Price (High to Low)</option>
                <option value="Rating">Sort: Top Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-6 mb-12">
          {sortedProducts.map((prod) => (
            <div
              key={prod.id}
              className="bg-white rounded-2xl border border-[#E8EDDF] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="p-3 sm:p-4">
                {/* Badge & Rating */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[8.5px] font-['Geist_Mono'] font-bold bg-[#E8F3D6] text-[#1E3F20] px-2 py-0.5 rounded-md uppercase">
                    {prod.badge}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-[#1E3F20]">
                    <Star size={11} fill="#84BD3A" className="text-[#84BD3A]" />
                    <span>{prod.rating}</span>
                  </div>
                </div>

                {/* Product Image Stage */}
                <div
                  onClick={() => onNavigate(prod.featured ? 'product' : 'product')}
                  className="h-40 sm:h-52 bg-[#F9FAF7] rounded-xl p-3 flex items-center justify-center cursor-pointer overflow-hidden relative mb-3 group-hover:bg-[#F4F6F1] transition-colors"
                >
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-contain filter drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
                  />
                  {prod.featured && (
                    <span className="absolute bottom-2 left-2 bg-[#1E3F20]/90 text-white text-[8px] font-['Geist_Mono'] px-2 py-0.5 rounded font-bold uppercase tracking-wider backdrop-blur-xs">
                      PODIATRIST TOP CHOICE
                    </span>
                  )}
                </div>

                {/* Title & Description */}
                <h3
                  onClick={() => onNavigate(prod.featured ? 'product' : 'product')}
                  className="font-['Outfit'] font-bold text-sm sm:text-base text-[#1E3F20] cursor-pointer hover:underline truncate mb-1"
                >
                  {prod.name}
                </h3>
                <p className="text-[11px] text-[#667360] line-clamp-2 leading-relaxed">
                  {prod.description}
                </p>
              </div>

              {/* Price & Action */}
              <div className="p-3 sm:p-4 pt-2 border-t border-[#E8EDDF] flex items-center justify-between gap-2">
                <div>
                  <span className="font-['Outfit'] font-bold text-base sm:text-lg text-[#1E3F20]">
                    ₹{prod.price.toLocaleString('en-IN')}
                  </span>
                  <span className="block text-[10px] text-gray-400 line-through">
                    ₹{prod.origPrice.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      addToCart({
                        id: prod.id,
                        title: prod.name,
                        color: 'Stone Classic',
                        size: 6,
                        price: prod.price,
                        image: prod.image,
                      });
                    }}
                    className="bg-[#1E3F20] hover:bg-[#285424] text-white text-xs font-bold px-3 py-2 rounded-xl transition cursor-pointer shadow-xs whitespace-nowrap"
                  >
                    Add
                  </button>
                  {prod.featured && (
                    <button
                      onClick={() => onNavigate('product')}
                      className="bg-[#84BD3A] hover:bg-[#95cf45] text-[#1E3F20] text-xs font-bold p-2 rounded-xl transition cursor-pointer shadow-xs"
                      title="View Details"
                    >
                      <ArrowRight size={14} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Bar */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <button
            onClick={() => setCurrentPageNum(p => Math.max(1, p - 1))}
            className="w-9 h-9 rounded-xl border border-[#D5DCCF] bg-white flex items-center justify-center text-[#1E3F20] hover:bg-gray-50 text-xs font-bold cursor-pointer"
          >
            ‹
          </button>
          {[1, 2, 3].map((num) => (
            <button
              key={num}
              onClick={() => setCurrentPageNum(num)}
              className={`w-9 h-9 rounded-xl text-xs font-bold font-['Geist_Mono'] transition-all cursor-pointer ${
                currentPageNum === num
                  ? 'bg-[#1E3F20] text-white shadow-xs'
                  : 'bg-white border border-[#D5DCCF] text-[#1E3F20] hover:bg-gray-50'
              }`}
            >
              {num}
            </button>
          ))}
          <button
            onClick={() => setCurrentPageNum(p => Math.min(3, p + 1))}
            className="w-9 h-9 rounded-xl border border-[#D5DCCF] bg-white flex items-center justify-center text-[#1E3F20] hover:bg-gray-50 text-xs font-bold cursor-pointer"
          >
            ›
          </button>
        </div>

      </div>
    </div>
  );
};

export default ShopPage;
