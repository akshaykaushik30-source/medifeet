import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, User, Heart, Search, MapPin } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAccount } from '../context/AccountContext';
import { FREE_SHIPPING_LABEL } from '../config';

export const DesktopHeader = ({ currentPage, onNavigate }) => {
  const { cartCount, setIsCartOpen, wishlist } = useCart();
  const { user } = useAccount();
  const [notice, setNotice] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Navigation from the Figma header; New Arrivals and Sale open the shop until those collections exist.
  const navLinks = [
    { id: 'shop', label: 'Women' },
    { id: 'men', label: 'Men' },
    { id: 'shop', label: 'New Arrivals', key: 'new' },
    { id: 'shop', label: 'Sale', key: 'sale' },
  ];

  const go = (pageId) => onNavigate && onNavigate(pageId);

  const openAccount = () => go(user ? 'account' : 'login');

  const showWishlist = () => {
    setNotice(`Your wishlist has ${wishlist.length} item${wishlist.length === 1 ? '' : 's'}`);
    setTimeout(() => setNotice(null), 2500);
  };

  return (
    <>
      {/* Utility bar (Figma Node 19:7) */}
      <div className="w-full bg-[#111111] text-white text-xs py-2.5 px-8 flex items-center justify-between z-50 select-none">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#84BD3A]" />
          <span className="font-['Geist'] text-white/90">
            Free shipping on all orders above <strong className="text-[#84BD3A]">{FREE_SHIPPING_LABEL}</strong>
          </span>
        </div>

        <div className="flex items-center gap-6 text-white/80">
          <button
            onClick={() => go('contact')}
            className="flex items-center gap-1.5 hover:text-white transition-[color,background-color,border-color,opacity,transform] duration-150 cursor-pointer text-xs active:scale-[0.97]"
          >
            <MapPin size={13} className="text-[#84BD3A]" />
            <span>Store Locator</span>
          </button>
          <div className="w-px h-3 bg-white/20" />
          <button
            onClick={openAccount}
            className="flex items-center gap-1.5 hover:text-white transition-[color,background-color,border-color,opacity,transform] duration-150 cursor-pointer text-xs active:scale-[0.97]"
          >
            <User size={13} className="text-[#84BD3A]" />
            <span>{user ? user.name.split(' ')[0] : 'My Account'}</span>
          </button>
        </div>
      </div>

      {/* Main header (Figma Node 19:16) */}
      <header className={`sticky top-0 bg-white/80 backdrop-blur-xl backdrop-saturate-150 border-b px-8 py-4 z-40 select-none transition-[border-color] duration-200 ${scrolled ? 'border-[#1A1A17]/10' : 'border-transparent'}`}>
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <button
            onClick={() => go('home')}
            className="flex items-center cursor-pointer group focus:outline-none py-1"
            aria-label="MediFeet Home"
          >
            <img
              src="/assets/medifeet-brand-logo.png"
              alt="MediFeet"
              className="h-9 sm:h-10 w-auto object-contain"
            />
          </button>

          <nav className="hidden md:flex items-center gap-8 text-sm font-['Outfit'] font-semibold">
            {navLinks.map((item) => {
              const isActive = !item.key && currentPage === item.id;
              return (
                <button
                  key={item.key || item.id}
                  onClick={() => go(item.id)}
                  className={`relative transition-[color,background-color,border-color,opacity,transform] duration-150 cursor-pointer ${
                    isActive ? 'text-[#1E3F20] font-bold' : 'text-[#111111] hover:text-[#1E3F20]'
                  }`}
                >
                  {item.label}
                  {isActive && <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#84BD3A] rounded-full" />}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <div className="relative hidden sm:flex items-center bg-[#F4F6F2] rounded-full px-3.5 py-1.5 border border-transparent focus-within:border-[#84BD3A] transition-[color,background-color,border-color,opacity,transform] duration-150">
              <Search size={14} className="text-gray-400 mr-2 shrink-0" />
              <input
                type="text"
                placeholder="Search shoes..."
                className="bg-transparent text-xs text-[#111111] placeholder-gray-400 focus:outline-none w-32 lg:w-44 font-['Geist']"
              />
            </div>

            <button
              onClick={showWishlist}
              className="relative p-2 rounded-full hover:bg-gray-100 transition-[color,background-color,border-color,opacity,transform] duration-150 cursor-pointer text-gray-700 active:scale-[0.97]"
              aria-label="Wishlist"
            >
              <Heart size={20} />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#84BD3A] text-[#1E3F20] font-['Geist_Mono'] font-bold text-[10px] flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsCartOpen && setIsCartOpen(true)}
              className="relative p-2 rounded-full hover:bg-gray-100 transition-[color,background-color,border-color,opacity,transform] duration-150 cursor-pointer text-gray-700 active:scale-[0.97]"
              aria-label="Cart"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#1E3F20] text-white font-['Geist_Mono'] font-bold text-[10px] flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        <AnimatePresence>
        {notice && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            style={{ transformOrigin: 'top right' }}
            className="absolute right-8 top-full mt-2 bg-[#1E3F20] text-white text-xs font-['Outfit'] font-semibold px-4 py-2.5 rounded-xl shadow-lg">
            {notice}
          </motion.div>
        )}
        </AnimatePresence>
      </header>

    </>
  );
};

export default DesktopHeader;
