import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, Phone, Clock, MapPin, Search, ChevronDown, 
  ChevronUp, CheckCircle2, Send, ShoppingBag, Heart, 
  Sparkles, ExternalLink, Navigation
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import DesktopHeader from '../components/DesktopHeader';

export const DesktopContactPage = ({ onNavigate }) => {
  const { cartCount, setIsCartOpen, wishlist } = useCart();

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Sizing & Fit Help',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [storeSearch, setStoreSearch] = useState('');

  const faqs = [
    {
      q: "How do I find my correct Medifeet size?",
      a: "We recommend reviewing our comprehensive Sizing Guide. If you wear a half size, order the next full size up for perfect orthopedic alignment."
    },
    {
      q: "Are Medifeet shoes recommended for Plantar Fasciitis?",
      a: "Yes, our podiatrist-designed deep heel cup and biomechanical arch contours are engineered specifically to provide substantial metatarsal relief."
    },
    {
      q: "What is your return and exchange policy?",
      a: "We offer a 30-day hassle-free window for unused products in their original packaging. Return shipping is completely covered."
    },
    {
      q: "Can I clean the footbeds of my Cork Collection?",
      a: "Yes, gently wipe cork surfaces with a damp cloth and mild organic soap. Avoid submerging in water or leaving in direct sunlight."
    },
    {
      q: "Do you ship internationally?",
      a: "Currently, we serve customers all over India. We are opening worldwide shipping soon in mid-2026."
    },
    {
      q: "Do these shoes support customs inserts?",
      a: "Our premium insoles are removable, allowing you to slip your custom clinical orthotic inserts in easily."
    }
  ];

  const stores = [
    {
      city: "Mumbai",
      name: "Mumbai Experience Center",
      address: "Medifeet House, Bandra West, Mumbai 400050",
      phone: "+91 22-9876-5432",
      hours: "Mon-Sun 10:00 AM - 9:00 PM",
      features: "3D Foot Pressure Mapping · Orthotist on Site"
    },
    {
      city: "Delhi",
      name: "Delhi Ortho Lounge",
      address: "Connaught Place, Block E, New Delhi 110001",
      phone: "+91 11-4567-8901",
      hours: "Mon-Sun 10:30 AM - 8:30 PM",
      features: "Gait Analysis Treadmill · Complete Collection"
    },
    {
      city: "Bangalore",
      name: "Bangalore Wellness Hub",
      address: "Indiranagar 100ft Road, Bangalore 560038",
      phone: "+91 80-2345-6789",
      hours: "Mon-Sun 10:00 AM - 9:00 PM",
      features: "Fluffium™ Test Track · Custom Arch Fitting"
    }
  ];

  const filteredStores = stores.filter(s => 
    s.city.toLowerCase().includes(storeSearch.toLowerCase()) ||
    s.name.toLowerCase().includes(storeSearch.toLowerCase()) ||
    s.address.toLowerCase().includes(storeSearch.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormState({
        name: '',
        email: '',
        phone: '',
        subject: 'Sizing & Fit Help',
        message: ''
      });
    }, 4000);
  };

  return (
    <div className="bg-[#FFFFFF] text-[#1E3F20] font-['Geist'] min-h-screen">
      
      {/* ========================================================================= */}
      {/* 1 & 2. UNIFIED TOP BAR & STICKY HEADER                                    */}
      {/* ========================================================================= */}
      <DesktopHeader currentPage="contact" onNavigate={onNavigate} />

      {/* ========================================================================= */}
      {/* 3. CONTACT HERO (Matching Figma 1:2046)                                   */}
      {/* ========================================================================= */}
      <section className="bg-[#F7F9F6] border-b border-[#E8EDDF] py-16 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <span className="font-['Geist_Mono'] text-xs uppercase tracking-widest text-[#84BD3A] font-bold block mb-2">
            WE ARE HERE FOR YOU
          </span>
          <h1 className="font-['Outfit'] font-black text-5xl tracking-tight text-[#1E3F20] mb-3">
            Get In Touch
          </h1>
          <p className="text-base text-[#4A5D4E] font-['Geist'] leading-relaxed">
            Our clinical experts and customer care team are here to support your foot health.
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. FORM & INFO WRAPPER (2 Columns matching Figma 1:2046)                  */}
      {/* ========================================================================= */}
      <section className="max-w-[1360px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Form: Send Us a Message */}
          <div className="lg:col-span-7 bg-[#FBFDFB] border border-[#E8EDDF] rounded-3xl p-10 shadow-sm">
            <h2 className="font-['Outfit'] font-bold text-2xl text-[#1E3F20] mb-2">
              Send us a Message
            </h2>
            <p className="text-xs text-[#667360] mb-8 font-['Geist']">
              Have a question about arch support, sizing recommendations, or an existing order? Drop us a line.
            </p>

            {formSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#1E3F20] text-white p-8 rounded-2xl text-center shadow-lg"
              >
                <CheckCircle2 size={40} className="text-[#84BD3A] mx-auto mb-3" />
                <h3 className="font-['Outfit'] font-bold text-xl mb-1">
                  Inquiry Received!
                </h3>
                <p className="text-xs text-white/80 leading-relaxed max-w-sm mx-auto">
                  Thank you, <strong>{formState.name || 'there'}</strong>. Our podiatric customer care specialist will respond to <strong>{formState.email}</strong> within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-['Geist'] font-bold text-[#1E3F20] mb-1.5">
                      Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Enter your name"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full bg-white border border-gray-200 text-xs px-4 py-3 rounded-xl focus:outline-none focus:border-[#84BD3A] transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-['Geist'] font-bold text-[#1E3F20] mb-1.5">
                      Email Address *
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="Enter your email"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full bg-white border border-gray-200 text-xs px-4 py-3 rounded-xl focus:outline-none focus:border-[#84BD3A] transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-['Geist'] font-bold text-[#1E3F20] mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      className="w-full bg-white border border-gray-200 text-xs px-4 py-3 rounded-xl focus:outline-none focus:border-[#84BD3A] transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-['Geist'] font-bold text-[#1E3F20] mb-1.5">
                      Subject
                    </label>
                    <select
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      className="w-full bg-white border border-gray-200 text-xs px-4 py-3 rounded-xl focus:outline-none focus:border-[#84BD3A] transition cursor-pointer"
                    >
                      <option value="Sizing & Fit Help">Sizing & Fit Help</option>
                      <option value="Plantar Fasciitis Orthotic Advice">Plantar Fasciitis Orthotic Advice</option>
                      <option value="Order Tracking & Logistics">Order Tracking & Logistics</option>
                      <option value="Return / 30-Day Trial Exchange">Return / 30-Day Trial Exchange</option>
                      <option value="Store Appointment Booking">Store Appointment Booking</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-['Geist'] font-bold text-[#1E3F20] mb-1.5">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your requirements or medical inquiry..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full bg-white border border-gray-200 text-xs p-4 rounded-xl focus:outline-none focus:border-[#84BD3A] transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#1E3F20] hover:bg-[#2D5A30] text-[#84BD3A] font-['Outfit'] font-bold text-xs uppercase tracking-wider py-4 rounded-full transition shadow-lg cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send size={15} />
                  <span>SUBMIT INQUIRY</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Info: Contact Info & HQ Map Card */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8">
            <div className="bg-[#F7F9F6] border border-[#E8EDDF] rounded-3xl p-8">
              <h3 className="font-['Outfit'] font-bold text-xl text-[#1E3F20] mb-6">
                Contact Information
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#E8EDDF] flex items-center justify-center text-[#1E3F20] shrink-0 mt-0.5">
                    <Mail size={18} />
                  </div>
                  <div>
                    <h4 className="font-['Outfit'] font-bold text-sm text-[#1E3F20]">General Support</h4>
                    <p className="text-xs text-[#4A5D4E]">support@medifeet.com</p>
                    <p className="text-xs font-['Geist_Mono'] font-bold text-[#1E3F20] mt-0.5">+91 1800-123-4567 (Toll-Free)</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#E8EDDF] flex items-center justify-center text-[#1E3F20] shrink-0 mt-0.5">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h4 className="font-['Outfit'] font-bold text-sm text-[#1E3F20]">Corporate Headquarters</h4>
                    <p className="text-xs text-[#4A5D4E] leading-relaxed">
                      Medifeet India Private Ltd, BKC Road, G Block, Bandra Kurla Complex, Mumbai 400051
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#E8EDDF] flex items-center justify-center text-[#1E3F20] shrink-0 mt-0.5">
                    <Clock size={18} />
                  </div>
                  <div>
                    <h4 className="font-['Outfit'] font-bold text-sm text-[#1E3F20]">Operating Hours</h4>
                    <p className="text-xs text-[#4A5D4E]">Monday – Saturday: 9:00 AM – 6:00 PM IST</p>
                    <p className="text-[11px] text-[#84BD3A] font-bold mt-0.5">Sunday: Fit Studios Open (10 AM - 8 PM)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* HQ Map Graphic Card (Matching Figma 1:2046 Frame 969f7a) */}
            <div className="rounded-3xl overflow-hidden border border-[#E8EDDF] shadow-md group relative h-64 bg-[#121612]">
              <img
                src="/assets/desk_frame_969f7a.png"
                alt="Medifeet HQ BKC Map Location"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6 justify-between">
                <div>
                  <span className="font-['Geist_Mono'] text-[10px] font-bold text-[#84BD3A] uppercase tracking-widest block">
                    HEADQUARTERS LOCATION
                  </span>
                  <h4 className="font-['Outfit'] font-bold text-lg text-white">
                    Medifeet HQ BKC
                  </h4>
                  <p className="text-xs text-white/70">Mumbai, Maharashtra</p>
                </div>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#84BD3A] hover:bg-[#96d246] text-[#1E3F20] p-2.5 rounded-full transition shadow-md cursor-pointer"
                  title="Open in Maps"
                >
                  <Navigation size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. FREQUENTLY ASKED QUESTIONS (Matching Figma 1:2046 FAQ Section)         */}
      {/* ========================================================================= */}
      <section className="bg-[#F7F9F6] border-y border-[#E8EDDF] py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="font-['Geist_Mono'] text-xs uppercase tracking-widest text-[#84BD3A] font-bold block mb-2">
              CLINICAL & LOGISTICAL CLARITY
            </span>
            <h2 className="font-['Outfit'] font-bold text-3xl text-[#1E3F20]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-[#E8EDDF] overflow-hidden shadow-xs transition"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer hover:bg-gray-50/50 transition"
                  >
                    <span className="font-['Outfit'] font-bold text-base text-[#1E3F20]">
                      {faq.q}
                    </span>
                    <span className="w-8 h-8 rounded-full bg-[#F4F6F2] flex items-center justify-center text-[#1E3F20] shrink-0 ml-4">
                      {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-6 pb-5 pt-1 text-xs text-[#4A5D4E] leading-relaxed border-t border-gray-100">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. STORE LOCATOR SECTION (Matching Figma 1:2046 3 Stores Near You)        */}
      {/* ========================================================================= */}
      <section id="store-locator-sec" className="max-w-[1360px] mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="font-['Geist_Mono'] text-xs font-bold text-[#84BD3A] uppercase tracking-wider block mb-2">
              PHYSICAL FIT GALLERIES
            </span>
            <h2 className="font-['Outfit'] font-bold text-3xl text-[#1E3F20]">
              Find a Store Near You
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative w-72">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={storeSearch}
                onChange={(e) => setStoreSearch(e.target.value)}
                placeholder="Enter PIN code or city..."
                className="w-full bg-[#F4F6F2] text-xs pl-9 pr-4 py-2.5 rounded-full border border-gray-200 focus:outline-none focus:border-[#84BD3A] font-['Geist']"
              />
            </div>
            <button className="bg-[#1E3F20] text-white text-xs font-['Outfit'] font-bold px-6 py-2.5 rounded-full hover:bg-[#2D5A30] transition cursor-pointer">
              SEARCH
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredStores.map((store, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#E8EDDF] rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#E8EDDF] flex items-center justify-center text-[#1E3F20] mb-5 group-hover:bg-[#84BD3A] group-hover:text-[#1E3F20] transition">
                  <MapPin size={20} />
                </div>
                <h3 className="font-['Outfit'] font-bold text-xl text-[#1E3F20] mb-2">
                  {store.name}
                </h3>
                <p className="text-xs text-[#4A5D4E] leading-relaxed mb-4">
                  {store.address}
                </p>
                <p className="text-xs font-['Geist_Mono'] text-[#1E3F20] font-bold mb-2">
                  {store.phone}
                </p>
                <div className="bg-[#F4F6F2] rounded-xl p-3 mb-6">
                  <span className="text-[11px] text-[#667360] block font-['Geist'] mb-1">
                    {store.hours}
                  </span>
                  <span className="text-[10px] font-['Geist_Mono'] font-bold text-[#1E3F20] uppercase block">
                    {store.features}
                  </span>
                </div>
              </div>

              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(store.address)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-[#1E3F20] hover:bg-[#2D5A30] text-white text-xs font-['Outfit'] font-bold py-3 rounded-full flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <span>GET DIRECTIONS</span>
                <ExternalLink size={14} className="text-[#84BD3A]" />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. DESKTOP FOOTER (Matching Figma 1:2046)                                 */}
      {/* ========================================================================= */}
      <footer className="bg-[#121612] text-white pt-16 pb-12 border-t border-white/10">
        <div className="max-w-[1360px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-white/10">
            <div>
              <h4 className="font-['Outfit'] font-bold text-xs tracking-wider text-white uppercase mb-4">
                SHOP
              </h4>
              <ul className="space-y-2.5 text-xs text-white/70 font-['Geist']">
                <li><button onClick={() => onNavigate('shop')} className="hover:text-white transition cursor-pointer">Orthopedic Sandals</button></li>
                <li><button onClick={() => onNavigate('shop')} className="hover:text-white transition cursor-pointer">Biomechanical Sneakers</button></li>
                <li><button onClick={() => onNavigate('shop')} className="hover:text-white transition cursor-pointer">Comfort Formal Shoes</button></li>
                <li><button onClick={() => onNavigate('shop')} className="hover:text-white transition cursor-pointer">Kids Orthotics</button></li>
                <li><button onClick={() => onNavigate('shop')} className="hover:text-white transition cursor-pointer">New Arrivals</button></li>
                <li><button onClick={() => onNavigate('shop')} className="hover:text-white transition cursor-pointer">Sale & Clearance</button></li>
              </ul>
            </div>

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

export default DesktopContactPage;
