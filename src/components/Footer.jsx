import React, { useState } from 'react';
import { MessageSquare, ArrowRight, ShieldCheck, Check } from 'lucide-react';

export const Footer = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#121612] text-white pt-12 pb-24 border-t border-white/10">
      <div className="max-w-[1200px] mx-auto px-5">
        
        {/* Newsletter Section */}
        <div className="bg-[#1E241E] border border-white/10 rounded-3xl p-6 sm:p-8 mb-12 shadow-xl">
          <div className="max-w-xl">
            <span className="font-['Geist_Mono'] text-[10px] font-bold text-[#84BD3A] uppercase tracking-widest block mb-2">
              EXCLUSIVE MEMBERS PERK
            </span>
            <h3 className="font-['Outfit'] font-bold text-2xl sm:text-3xl text-white mb-2 leading-tight">
              5% off, plus first dibs on every drop.
            </h3>
            <p className="text-xs text-white/70 mb-5 leading-relaxed">
              Sign up for expert foot health tips, early access to new releases, and subscriber-only comfort discounts.
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#84BD3A] flex-1"
              />
              <button
                type="submit"
                className="bg-[#84BD3A] hover:bg-[#95cf45] text-[#1E3F20] font-bold px-6 py-3 rounded-xl text-sm transition shadow-md flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
              >
                {subscribed ? (
                  <>
                    <Check size={16} />
                    <span>SUBSCRIBED</span>
                  </>
                ) : (
                  <>
                    <span>JOIN</span>
                    <ArrowRight size={14} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-12">
          {/* Shop */}
          <div>
            <h4 className="font-['Geist_Mono'] text-[11px] font-bold text-[#84BD3A] uppercase tracking-wider mb-4">
              SHOP
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-white transition cursor-pointer">
                  New Arrivals
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-white transition cursor-pointer">
                  Women's Ortho
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-white transition cursor-pointer">
                  Men's Comfort
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('product')} className="hover:text-white transition cursor-pointer text-[#84BD3A] font-semibold">
                  CloudWalk Sandal
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-white transition cursor-pointer">
                  Walking Shoes
                </button>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-['Geist_Mono'] text-[11px] font-bold text-[#84BD3A] uppercase tracking-wider mb-4">
              HELP
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li>
                <button onClick={() => alert("Track Order: Enter your AWB / Order ID")} className="hover:text-white transition cursor-pointer">
                  Track My Order
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition cursor-pointer">
                  Returns & Exchanges
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('product')} className="hover:text-white transition cursor-pointer">
                  Size & Fit Guide
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition cursor-pointer">
                  Contact Support
                </button>
              </li>
            </ul>
          </div>

          {/* Medifeet */}
          <div>
            <h4 className="font-['Geist_Mono'] text-[11px] font-bold text-[#84BD3A] uppercase tracking-wider mb-4">
              MEDIFEET
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition cursor-pointer">
                  Our Comfort Story
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition cursor-pointer">
                  Experience Studios
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition cursor-pointer">
                  Podiatrist Certification
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition cursor-pointer">
                  Sustainability
                </button>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-['Geist_Mono'] text-[11px] font-bold text-[#84BD3A] uppercase tracking-wider mb-4">
              LEGAL
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li className="hover:text-white transition cursor-pointer">Privacy Policy</li>
              <li className="hover:text-white transition cursor-pointer">Terms of Service</li>
              <li className="hover:text-white transition cursor-pointer">1-Year Craftsmanship Warranty</li>
              <li className="hover:text-white transition cursor-pointer">Accessibility</li>
            </ul>
          </div>
        </div>

        {/* Bottom Trust & Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>© 2026 MediFeet India. Biomechanically engineered comfort. All rights reserved.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Secure Payments</span>
            <span>·</span>
            <span>30-Day Easy Trial</span>
            <span>·</span>
            <span>WhatsApp Support</span>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp Action Pill */}
      <a
        href="https://wa.me/?text=Hi%20MediFeet,%20I%20have%20a%20question%20about%20the%20CloudWalk%20sandal"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 right-5 z-40 bg-[#25D366] text-white p-3.5 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition flex items-center justify-center cursor-pointer border-2 border-white"
        aria-label="Chat on WhatsApp"
      >
        <MessageSquare size={22} fill="white" />
      </a>
    </footer>
  );
};

export default Footer;
