import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, Heart, ShoppingBag, Search, User, MapPin, 
  ChevronLeft, ChevronRight, Check, Eye, ArrowRight,
  ShieldCheck, Truck, RefreshCw, Sparkles, SlidersHorizontal,
  Mail, Send, CheckCircle2
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import DesktopHeader from '../components/DesktopHeader';
import CatalogGrid from '../components/CatalogGrid';

export const DesktopMenShopPage = ({ onNavigate }) => {
  const [clubSubscribed, setClubSubscribed] = useState(false);
  const [clubEmail, setClubEmail] = useState('');

  return (
    <div className="bg-[#FFFFFF] text-[#1E3F20] font-['Geist'] min-h-screen">
      
      {/* ========================================================================= */}
      {/* 1 & 2. UNIFIED TOP BAR & STICKY HEADER                                    */}
      {/* ========================================================================= */}
      <DesktopHeader currentPage="men" onNavigate={onNavigate} />

      {/* ========================================================================= */}
      {/* 3. HERO BANNER (Matching Figma 1:1681 - Own Every Step.)                   */}
      {/* ========================================================================= */}
      <section className="max-w-[1360px] mx-auto px-6 pt-6 pb-10">
        <div className="relative rounded-3xl overflow-hidden min-h-[460px] shadow-xl border border-gray-200 flex items-center">
          {/* Background Image: High-fashion Men's Editorial */}
          <img
            src="/assets/desk_men_9fb88a.png"
            alt="Men's Collection - Own Every Step."
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          {/* Dark Overlay for contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-transparent" />

          {/* Hero Content Overlay */}
          <div className="relative z-10 p-12 max-w-2xl text-white">
            <span className="font-['Geist_Mono'] text-xs uppercase tracking-widest text-[#84BD3A] font-bold block mb-3">
              MEN'S COLLECTION 2026
            </span>
            <h1 className="font-['Outfit'] font-black text-6xl tracking-tight leading-[1.05] mb-4">
              Own Every Step.
            </h1>
            <p className="text-white/85 text-base font-['Geist'] leading-relaxed mb-8 max-w-xl">
              Effortless everyday support met with contemporary, smart-casual design. Experience peak biomechanical cushioning built for the style-conscious vanguard.
            </p>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => {
                  const el = document.getElementById('men-grid');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-[#84BD3A] hover:bg-[#96d246] text-[#1E3F20] font-['Outfit'] font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-full transition shadow-lg cursor-pointer flex items-center gap-2"
              >
                <span>EXPLORE THE NEW ARRIVALS</span>
                <ArrowRight size={15} />
              </button>
              <button 
                onClick={() => onNavigate('product')}
                className="bg-white/15 backdrop-blur-md hover:bg-white/25 text-white font-['Outfit'] font-bold text-xs uppercase tracking-wider px-7 py-4 rounded-full border border-white/30 transition cursor-pointer"
              >
                EXPLORE CLOUDWALK
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Product grid: real catalogue products (src/data/products.json) */}
      <CatalogGrid gender="men" id="men-grid" onNavigate={onNavigate} />

      {/* ========================================================================= */}
      {/* 7. PRE-FOOTER: JOIN THE COMFORT CLUB (Matching Figma 1:1681)              */}
      {/* ========================================================================= */}
      <section className="bg-[#FAFBF9] border-t border-[#E8EDDF] py-16 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <span className="font-['Geist_Mono'] text-xs font-bold text-[#84BD3A] bg-[#1E3F20] px-3.5 py-1 rounded-full uppercase tracking-widest inline-block mb-3">
            COMMUNITY ACCESS
          </span>
          <h2 className="font-['Outfit'] font-extrabold text-4xl text-[#1E3F20] mb-3">
            Join the Comfort Club
          </h2>
          <p className="text-sm text-[#4A5D4E] leading-relaxed mb-8">
            Be the first to hear about clinical research developments, footwear drops, and orthopedic comfort sales.
          </p>

          {clubSubscribed ? (
            <div className="bg-[#1E3F20] text-white py-4 px-6 rounded-2xl flex items-center justify-center gap-2 max-w-md mx-auto shadow-md">
              <CheckCircle2 size={18} className="text-[#84BD3A]" />
              <span className="text-xs font-bold">You're in! Check your email for your 5% welcome code.</span>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (clubEmail) setClubSubscribed(true);
              }}
              className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                required
                value={clubEmail}
                onChange={(e) => setClubEmail(e.target.value)}
                placeholder="Enter your active email address"
                className="w-full bg-white border border-gray-200 px-5 py-3.5 rounded-full text-xs text-[#1E3F20] placeholder:text-gray-400 focus:outline-none focus:border-[#84BD3A] shadow-xs"
              />
              <button
                type="submit"
                className="w-full sm:w-auto bg-[#1E3F20] hover:bg-[#2D5A30] text-white font-['Outfit'] font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-full transition shadow-md cursor-pointer shrink-0"
              >
                SUBSCRIBE
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. DESKTOP FOOTER (Matching Figma 1:1681 5-Column Grid)                   */}
      {/* ========================================================================= */}
      <footer className="bg-[#121612] text-white pt-16 pb-12 border-t border-white/10">
        <div className="max-w-[1360px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-white/10">
            {/* Col 1 */}
            <div>
              <h4 className="font-['Outfit'] font-bold text-xs tracking-wider text-white uppercase mb-4">
                SHOP
              </h4>
              <ul className="space-y-2.5 text-xs text-white/70 font-['Geist']">
                <li><button onClick={() => setSelectedCategory('Sandals')} className="hover:text-white transition cursor-pointer">Orthopedic Sandals</button></li>
                <li><button onClick={() => setSelectedCategory('Sport')} className="hover:text-white transition cursor-pointer">Biomechanical Sneakers</button></li>
                <li><button onClick={() => setSelectedCategory('Formal')} className="hover:text-white transition cursor-pointer">Comfort Formal Shoes</button></li>
                <li><button onClick={() => setSelectedCategory('Barefoot')} className="hover:text-white transition cursor-pointer">Barefoot Series</button></li>
                <li><button onClick={() => onNavigate('shop')} className="hover:text-white transition cursor-pointer">Women's Collection</button></li>
                <li><button onClick={() => setSelectedCategory('Sandals')} className="hover:text-white transition cursor-pointer">Sale & Clearance</button></li>
              </ul>
            </div>

            {/* Col 2 */}
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

            {/* Col 3 */}
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

            {/* Col 4 */}
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

            {/* Col 5 */}
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

export default DesktopMenShopPage;
