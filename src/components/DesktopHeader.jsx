import React, { useState } from 'react';
import { ShoppingBag, User, X, Heart, Search, MapPin } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { FREE_SHIPPING_LABEL } from '../config';

export const DesktopHeader = ({ currentPage, onNavigate }) => {
  const { cartCount, setIsCartOpen, wishlist } = useCart();
  const [accountModalOpen, setAccountModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('login'); // 'login' | 'signup'
  const [notice, setNotice] = useState(null);

  const navLinks = [
    { id: 'shop', label: 'Women' },
    { id: 'men', label: 'Men' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const go = (pageId) => onNavigate && onNavigate(pageId);

  const openAccount = () => {
    setModalMode('login');
    setAccountModalOpen(true);
  };

  const showWishlist = () => {
    setNotice(`Your wishlist has ${wishlist.length} item${wishlist.length === 1 ? '' : 's'}`);
    setTimeout(() => setNotice(null), 2500);
  };

  return (
    <>
      {/* Utility bar (Figma Node 19:7) */}
      <div className="w-full bg-[#111111] text-white text-xs py-2.5 px-8 flex items-center justify-between z-50 select-none">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#84BD3A] animate-pulse" />
          <span className="font-['Geist'] text-white/90">
            Free shipping on all orders above <strong className="text-[#84BD3A]">{FREE_SHIPPING_LABEL}</strong>
          </span>
        </div>

        <div className="flex items-center gap-6 text-white/80">
          <button
            onClick={() => go('contact')}
            className="flex items-center gap-1.5 hover:text-white transition cursor-pointer text-xs"
          >
            <MapPin size={13} className="text-[#84BD3A]" />
            <span>Store Locator</span>
          </button>
          <div className="w-px h-3 bg-white/20" />
          <button
            onClick={openAccount}
            className="flex items-center gap-1.5 hover:text-white transition cursor-pointer text-xs"
          >
            <User size={13} className="text-[#84BD3A]" />
            <span>My Account</span>
          </button>
        </div>
      </div>

      {/* Main header (Figma Node 19:16) */}
      <header className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-gray-100 px-8 py-4 z-40 shadow-xs select-none">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <button
            onClick={() => go('home')}
            className="flex items-center cursor-pointer group focus:outline-none py-1"
            aria-label="MediFeet Home"
          >
            <img
              src="/assets/medifeet-brand-logo.png"
              alt="MediFeet"
              className="h-9 sm:h-10 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </button>

          <nav className="hidden md:flex items-center gap-8 text-sm font-['Outfit'] font-semibold">
            {navLinks.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => go(item.id)}
                  className={`relative transition cursor-pointer ${
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
            <div className="relative hidden sm:flex items-center bg-[#F4F6F2] rounded-full px-3.5 py-1.5 border border-transparent focus-within:border-[#84BD3A] transition">
              <Search size={14} className="text-gray-400 mr-2 shrink-0" />
              <input
                type="text"
                placeholder="Search shoes..."
                className="bg-transparent text-xs text-[#111111] placeholder-gray-400 focus:outline-none w-32 lg:w-44 font-['Geist']"
              />
            </div>

            <button
              onClick={showWishlist}
              className="relative p-2 rounded-full hover:bg-gray-100 transition cursor-pointer text-gray-700"
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
              className="relative p-2 rounded-full hover:bg-gray-100 transition cursor-pointer text-gray-700"
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

        {notice && (
          <div className="absolute right-8 top-full mt-2 bg-[#1E3F20] text-white text-xs font-['Outfit'] font-semibold px-4 py-2.5 rounded-xl shadow-lg">
            {notice}
          </div>
        )}
      </header>

      {/* Auth / Account Modal */}
      {accountModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-7 shadow-2xl border border-gray-100 relative animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setAccountModalOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 cursor-pointer"
            >
              <X size={18} />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-[#E8EDDF] flex items-center justify-center text-[#1E3F20] mb-4 shadow-xs">
              <User size={22} />
            </div>

            <h3 className="font-['Outfit'] font-bold text-xl text-gray-900">
              {modalMode === 'login' ? 'Welcome Back' : 'Create Your Account'}
            </h3>
            <p className="text-xs text-gray-500 mt-1 mb-5 leading-relaxed">
              {modalMode === 'login' 
                ? 'Sign in to access your saved biomechanical fitting profiles and orders.' 
                : 'Join the MediFeet Comfort Club to get 10% off your first order.'}
            </p>

            <form onSubmit={(e) => { e.preventDefault(); setAccountModalOpen(false); }} className="space-y-3">
              <div>
                <label className="text-[11px] font-['Geist_Mono'] text-gray-500 uppercase tracking-wider block mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  required
                  className="w-full bg-[#F8F9FA] border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-800 focus:outline-none focus:border-[#1E3F20]"
                />
              </div>

              <div>
                <label className="text-[11px] font-['Geist_Mono'] text-gray-500 uppercase tracking-wider block mb-1">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  required
                  className="w-full bg-[#F8F9FA] border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-800 focus:outline-none focus:border-[#1E3F20]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#1E3F20] text-white font-['Outfit'] font-bold text-xs uppercase tracking-wider py-3 rounded-xl shadow-xs hover:opacity-95 transition mt-2 cursor-pointer"
              >
                {modalMode === 'login' ? 'Log In' : 'Create Account'}
              </button>
            </form>

            <div className="mt-4 pt-4 border-t border-gray-100 text-center">
              <button
                type="button"
                onClick={() => setModalMode(modalMode === 'login' ? 'signup' : 'login')}
                className="text-xs text-gray-600 hover:text-black font-medium transition cursor-pointer"
              >
                {modalMode === 'login' 
                  ? "Don't have an account? Sign Up" 
                  : 'Already have an account? Log In'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DesktopHeader;
