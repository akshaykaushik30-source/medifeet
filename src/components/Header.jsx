import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, Heart, Search, Menu, X, ArrowRight,
  ShieldCheck, Truck, RefreshCw, Phone, Footprints
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { FREE_SHIPPING_LABEL } from '../config';

export const Header = ({ currentPage, onNavigate }) => {
  const { cartCount, setIsCartOpen, wishlist } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Shop' },
    { id: 'product', label: 'CloudWalk' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
    { id: 'account', label: 'My Account' },
  ];

  return (
    <>
      {/* Top Global Promo Bar */}
      <div className="bg-[#1E3F20] text-[#E8EDDF] text-[9.5px] font-['Geist_Mono'] py-2 px-4 tracking-wider flex items-center justify-center text-center border-b border-[#2D5A30]">
        <span className="font-bold text-[#84BD3A] mr-1.5">FREE SHIPPING</span>
        OVER {FREE_SHIPPING_LABEL} · 30-DAY EASY TRIAL · DISPATCH: 24-48 HRS
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-40 bg-[#F7F9F6]/95 backdrop-blur-md border-b border-[#E8EDDF] transition-all">
        <div className="max-w-[1200px] mx-auto px-4 h-15 flex items-center justify-between">
          
          {/* Left: Mobile Menu Toggle & Desktop Nav Links */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="w-10 h-10 flex items-center justify-center text-[#1E3F20] hover:bg-black/5 rounded-full md:hidden cursor-pointer"
              aria-label="Open navigation menu"
            >
              <Menu size={22} />
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-7">
              {navLinks.map((link) => {
                const isActive = currentPage === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => onNavigate(link.id)}
                    className={`font-['Outfit'] text-sm tracking-wide transition-colors cursor-pointer relative py-1 ${
                      isActive ? 'font-bold text-[#1E3F20]' : 'text-[#667360] hover:text-[#1E3F20]'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 inset-x-0 h-0.5 bg-[#84BD3A] rounded-full"
                      />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Center: Brand Logo */}
          <div className="flex items-center justify-center">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center justify-center cursor-pointer"
            >
              <img
                src="/assets/medifeet-logo-transparent.png"
                alt="Medifeet"
                className="h-8 max-w-[130px] object-contain mix-blend-multiply"
              />
            </button>
          </div>

          {/* Right: Actions (Search, Wishlist, Cart) */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="w-10 h-10 flex items-center justify-center text-[#1E3F20] hover:bg-black/5 rounded-full transition cursor-pointer"
              aria-label="Search"
            >
              <Search size={20} />
            </button>

            <button
              onClick={() => onNavigate('shop')}
              className="w-10 h-10 flex items-center justify-center text-[#1E3F20] hover:bg-black/5 rounded-full transition cursor-pointer relative"
              aria-label="Wishlist"
            >
              <Heart 
                size={20} 
                fill={wishlist.length > 0 ? "#c0544f" : "none"} 
                className={wishlist.length > 0 ? "text-[#c0544f]" : "text-[#1E3F20]"} 
              />
              {wishlist.length > 0 && (
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#c0544f]" />
              )}
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="w-10 h-10 flex items-center justify-center text-[#1E3F20] hover:bg-black/5 rounded-full transition cursor-pointer relative"
              aria-label="Cart"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-1.5 right-1 bg-[#1E3F20] text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-xs"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Out Drawer Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex md:hidden"
            onClick={() => setIsMenuOpen(false)}
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.42, ease: [0.32, 0.72, 0, 1] }}
              className="bg-[#F7F9F6] w-[82%] max-w-[320px] h-full shadow-2xl flex flex-col justify-between p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#E8EDDF] mb-6">
                  <img
                    src="/assets/medifeet-logo-transparent.png"
                    alt="Medifeet"
                    className="h-7 max-w-[120px] object-contain mix-blend-multiply"
                  />
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:text-black transition cursor-pointer"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="space-y-1 mb-8">
                  <span className="text-[10px] font-['Geist_Mono'] uppercase tracking-wider text-[#667360] font-bold px-3">
                    Menu
                  </span>
                  {navLinks.map((link) => {
                    const isActive = currentPage === link.id;
                    return (
                      <button
                        key={link.id}
                        onClick={() => {
                          onNavigate(link.id);
                          setIsMenuOpen(false);
                        }}
                        className={`w-full text-left px-3 py-3 rounded-xl font-['Outfit'] font-bold text-lg flex items-center justify-between transition-colors cursor-pointer ${
                          isActive
                            ? 'bg-[#E8F3D6] text-[#1E3F20]'
                            : 'text-[#1E3F20] hover:bg-black/5'
                        }`}
                      >
                        <span>{link.label}</span>
                        <ArrowRight size={16} className={isActive ? 'text-[#1E3F20]' : 'text-gray-400'} />
                      </button>
                    );
                  })}
                </div>

                {/* Collections Quick Links */}
                <div className="bg-white rounded-2xl p-4 border border-[#E8EDDF] space-y-2 mb-6">
                  <span className="text-[10px] font-['Geist_Mono'] font-bold uppercase tracking-wider text-[#667360]">
                    Featured Category
                  </span>
                  <div className="grid grid-cols-2 gap-2 pt-1 text-xs font-semibold text-[#1E3F20]">
                    <button 
                      onClick={() => { onNavigate('shop'); setIsMenuOpen(false); }} 
                      className="p-2 rounded-lg bg-[#F7F9F6] text-left hover:bg-[#E8F3D6] transition"
                    >
                      Women's Ortho
                    </button>
                    <button 
                      onClick={() => { onNavigate('shop'); setIsMenuOpen(false); }} 
                      className="p-2 rounded-lg bg-[#F7F9F6] text-left hover:bg-[#E8F3D6] transition"
                    >
                      Men's Comfort
                    </button>
                    <button 
                      onClick={() => { onNavigate('product'); setIsMenuOpen(false); }} 
                      className="p-2 rounded-lg bg-[#F7F9F6] text-left hover:bg-[#E8F3D6] transition col-span-2 text-[#1E3F20] font-bold"
                    >
                      ✨ CloudWalk Sandal (Top Pick)
                    </button>
                  </div>
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="pt-4 border-t border-[#E8EDDF] text-xs text-[#667360] space-y-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={14} className="text-[#84BD3A]" />
                  <span>Podiatrist Approved Footwear</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck size={14} className="text-[#84BD3A]" />
                  <span>Free Express Shipping on {FREE_SHIPPING_LABEL}+</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center p-4 pt-16"
            onClick={() => setIsSearchOpen(false)}
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="bg-white w-full max-w-[500px] rounded-3xl p-5 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 border-b border-[#E8EDDF] pb-3 mb-4">
                <Search size={20} className="text-[#1E3F20]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search sandals, slides, orthopedic shoes..."
                  autoFocus
                  className="flex-1 text-sm font-medium focus:outline-none text-[#1E3F20]"
                />
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="text-gray-400 hover:text-black p-1"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-2 text-xs">
                <span className="font-['Geist_Mono'] text-[10px] text-[#667360] uppercase tracking-wider font-bold">
                  Popular Searches
                </span>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {['CloudWalk Sandal', 'Arch Support', 'Diabetic Friendly', 'Slides', 'Breeze Walker'].map((term) => (
                    <button
                      key={term}
                      onClick={() => {
                        setSearchQuery(term);
                        onNavigate('shop');
                        setIsSearchOpen(false);
                      }}
                      className="bg-[#F4F7F1] hover:bg-[#E8F3D6] text-[#1E3F20] px-3 py-1.5 rounded-full transition cursor-pointer"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
