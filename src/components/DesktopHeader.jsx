import React, { useState } from 'react';
import { ShoppingBag, User, X, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const DesktopHeader = ({ currentPage, onNavigate }) => {
  const { cartCount, setIsCartOpen } = useCart();
  const [accountModalOpen, setAccountModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('login'); // 'login' | 'signup'

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Women' },
    { id: 'men', label: 'Men' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact Us' },
  ];

  return (
    <>
      {/* ========================================================================= */}
      {/* FLOATING PILL MODERN DESKTOP HEADER (Matching User Reference Image)       */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-40 bg-[#F8F9FA]/95 backdrop-blur-md border-b border-gray-200/70 transition-all select-none">
        <div className="max-w-[1360px] mx-auto px-8 h-20 flex items-center justify-between">
          
          {/* 1. Left Brand Title / Logo */}
          <button 
            onClick={() => onNavigate && onNavigate('home')} 
            className="flex items-center cursor-pointer group focus:outline-none py-1"
            aria-label="MediFeet Home"
          >
            <img 
              src="/assets/medifeet-brand-logo.png" 
              alt="MediFeet" 
              className="h-10 sm:h-11 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </button>

          {/* 2. Center Floating White Pill Navigation */}
          <nav className="bg-white rounded-full px-8 py-3 shadow-[0_2px_14px_rgba(0,0,0,0.06)] border border-gray-200/80 flex items-center gap-8">
            {navLinks.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => item.action ? item.action() : onNavigate && onNavigate(item.id)}
                  className={`text-sm font-['Outfit'] transition-colors cursor-pointer ${
                    isActive 
                      ? 'text-gray-950 font-bold' 
                      : 'text-gray-600 font-medium hover:text-gray-950'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* 3. Right Action Buttons: Log in, Gradient Sign Up & Cart */}
          <div className="flex items-center gap-5">
            {/* Log in */}
            <button
              onClick={() => {
                setModalMode('login');
                setAccountModalOpen(true);
              }}
              className="text-sm font-['Outfit'] font-medium text-gray-800 hover:text-black transition-colors cursor-pointer"
            >
              Log in
            </button>

            {/* Pastel Gradient Sign Up Button (Exact match to reference) */}
            <button
              onClick={() => {
                setModalMode('signup');
                setAccountModalOpen(true);
              }}
              className="bg-gradient-to-r from-[#F6BED1] via-[#F3AEC5] to-[#EE9DBD] hover:opacity-95 text-[#4A1532] font-['Outfit'] font-semibold text-sm px-6 py-2.5 rounded-xl shadow-xs transition-transform active:scale-95 cursor-pointer"
            >
              Sign Up
            </button>

            {/* Shopping Bag Trigger */}
            <button
              onClick={() => setIsCartOpen && setIsCartOpen(true)}
              className="w-10 h-10 rounded-full bg-white border border-gray-200/90 hover:bg-gray-50 flex items-center justify-center text-gray-800 shadow-xs transition-transform active:scale-95 relative cursor-pointer"
              title="Shopping Bag"
              aria-label="Shopping Bag"
            >
              <ShoppingBag size={17} className="text-gray-800" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#1E3F20] text-[#84BD3A] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

        </div>
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

            <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-[#F6BED1] to-[#EE9DBD] flex items-center justify-center text-[#4A1532] mb-4 shadow-xs">
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
                className="w-full bg-gradient-to-r from-[#F6BED1] via-[#F3AEC5] to-[#EE9DBD] text-[#4A1532] font-['Outfit'] font-bold text-xs uppercase tracking-wider py-3 rounded-xl shadow-xs hover:opacity-95 transition mt-2 cursor-pointer"
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
