import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, Heart, ShoppingBag, Search, User, MapPin, 
  ChevronLeft, ChevronRight, Check, Eye, Filter, ArrowRight,
  ShieldCheck, Truck, RefreshCw, Sparkles, SlidersHorizontal
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import DesktopHeader from '../components/DesktopHeader';
import CatalogGrid from '../components/CatalogGrid';

export const DesktopShopPage = ({ onNavigate }) => {

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

      {/* Product grid: real catalogue products (src/data/products.json) */}
      <CatalogGrid gender="women" id="collection-grid" onNavigate={onNavigate} />

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
