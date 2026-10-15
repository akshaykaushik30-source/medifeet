import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, Pause, ArrowRight, Heart, ShoppingBag, Search, 
  MapPin, User, Sparkles, CheckCircle2, Award, ShieldCheck,
  Compass, Leaf, HeartHandshake, Eye, Volume2, VolumeX
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import DesktopHeader from '../components/DesktopHeader';

export const DesktopAboutPage = ({ onNavigate }) => {
  const { cartCount, setIsCartOpen, wishlist } = useCart();
  const [isPlayingStory, setIsPlayingStory] = useState(false);
  const [isPlayingEnergy, setIsPlayingEnergy] = useState(false);

  const team = [
    {
      name: 'Dr. Ananya Nair',
      role: 'Chief Podiatrist & Co-founder',
      bio: '15+ years of orthopedic medicine expertise.',
      image: '/assets/desk_rectangle_85faec.png'
    },
    {
      name: 'Rohan Singhania',
      role: 'Lead Industrial Designer',
      bio: 'Pratt Institute alumnus specializing in biomechanical silhouettes.',
      image: '/assets/desk_rectangle_2bd65d.png'
    },
    {
      name: 'Sarah Jenkins',
      role: 'Sourcing & Materials Director',
      bio: 'Sourcing zero-friction medical fabrics and organic cork.',
      image: '/assets/desk_rectangle_a56c51.png'
    },
    {
      name: 'Kabir Mehta',
      role: 'VP of Product Engineering',
      bio: 'Focuses on dual-density footbeds and fit perfection.',
      image: '/assets/desk_rectangle_b9c3d2.png'
    },
    {
      name: 'Elena Rostova',
      role: 'Creative Brand Director',
      bio: 'Connecting physical podiatric science with modern visual design.',
      image: '/assets/desk_rectangle_a74768.png'
    },
    {
      name: 'Dr. Marcus Vance',
      role: 'Medical Advisory Chair',
      bio: 'Active consultant to several international athletic wellness boards.',
      image: '/assets/desk_rectangle_e03829.png'
    },
    {
      name: 'Devika Sen',
      role: 'Head of Sustainability',
      bio: 'Committed to driving Medifeet\'s zero-waste footbed loop.',
      image: '/assets/desk_rectangle_20dc56.png'
    },
    {
      name: 'Vikram Malhotra',
      role: 'Global Operations Lead',
      bio: 'Keeping supply chain pristine from insole to outsole.',
      image: '/assets/desk_rectangle_5c6b4b.png'
    }
  ];

  const milestones = [
    {
      year: '2018',
      title: 'Founded',
      desc: 'Started with a vision to heal feet without compromising on high-fashion style.'
    },
    {
      year: '2020',
      title: 'Fluffium Patent',
      desc: 'Invented our lightweight foam compound, clinically proven to absorb strike impact.'
    },
    {
      year: '2023',
      title: '1 Million Happy Feet',
      desc: 'Celebrated a major milestone of shipping orthotic relief to happy customers globally.'
    },
    {
      year: '2026',
      title: 'Global Expansion',
      desc: 'Establishing dedicated design hubs in Paris, Tokyo, and Milan.'
    }
  ];

  return (
    <div className="bg-[#FFFFFF] text-[#1E3F20] font-['Geist'] min-h-screen">
      
      {/* ========================================================================= */}
      {/* 1 & 2. UNIFIED TOP BAR & STICKY HEADER                                    */}
      {/* ========================================================================= */}
      <DesktopHeader currentPage="about" onNavigate={onNavigate} />

      {/* ========================================================================= */}
      {/* 3. ABOUT HERO (Matching Figma 1:1054 Artisan Workshop & Typography)        */}
      {/* ========================================================================= */}
      <section className="max-w-[1360px] mx-auto px-6 pt-6 pb-12">
        <div className="relative rounded-3xl overflow-hidden min-h-[460px] shadow-xl border border-gray-200 flex items-center">
          <img
            src="/assets/desk_about_hero_6ec271.png"
            alt="Artisan shoemaker workshop - Our Story"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />

          <div className="relative z-10 p-12 max-w-xl text-white">
            <span className="font-['Geist_Mono'] text-xs uppercase tracking-widest text-[#84BD3A] font-bold block mb-3">
              ABOUT MEDIFEET
            </span>
            <h1 className="font-['Outfit'] font-extrabold text-5xl tracking-tight leading-tight mb-4">
              Our Story.
            </h1>
            <p className="text-white/85 text-base font-['Geist'] leading-relaxed mb-6">
              Redefining comfort since 2018. Bridging clinical orthotic precision with stunning fashion-forward silhouettes.
            </p>
            <div className="flex items-center gap-4">
              <button
                onClick={() => onNavigate('shop')}
                className="bg-[#84BD3A] hover:bg-[#96d246] text-[#1E3F20] font-['Outfit'] font-bold text-xs uppercase tracking-wider px-7 py-3.5 rounded-full transition shadow-lg cursor-pointer flex items-center gap-2"
              >
                <span>EXPLORE COLLECTION</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. MISSION SECTION (Matching Figma 1:1054)                                 */}
      {/* ========================================================================= */}
      <section className="max-w-[1100px] mx-auto px-6 py-12 text-center">
        <span className="font-['Geist_Mono'] text-xs font-bold uppercase tracking-widest text-[#84BD3A] bg-[#1E3F20] px-4 py-1.5 rounded-full inline-block mb-6 shadow-xs">
          OUR MISSION
        </span>
        <blockquote className="font-['Outfit'] font-bold text-2xl md:text-3xl text-[#1E3F20] leading-snug tracking-tight">
          “We believe nobody should choose between physical orthotic wellness and contemporary fashion. We craft medical grade insoles seamlessly fitted to the world's most elegant outsoles.”
        </blockquote>
      </section>

      {/* ========================================================================= */}
      {/* 5. COMPANY AV VIDEO SECTION (Matching Figma 1:1054)                        */}
      {/* ========================================================================= */}
      <section className="max-w-[1360px] mx-auto px-6 py-12 border-t border-[#E8EDDF]">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-['Geist_Mono'] font-bold text-[#84BD3A] uppercase tracking-wider block mb-2">
            COMPANY AV
          </span>
          <h2 className="font-['Outfit'] font-bold text-3xl text-[#1E3F20] mb-2">
            Watch Our Story
          </h2>
          <p className="text-sm text-[#4A5D4E]">
            See how science meets stride in our clinical biomechanics laboratory.
          </p>
        </div>

        {/* Video Player Card */}
        <div className="relative rounded-3xl overflow-hidden h-[480px] bg-[#121612] shadow-2xl border border-gray-200 group">
          <img
            src="/assets/desk_ellipse_826da8.png"
            alt="Company AV video preview"
            className="w-full h-full object-cover opacity-80 group-hover:opacity-90 transition-opacity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-between p-8">
            <div className="flex items-center justify-between text-white text-xs">
              <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full font-['Geist_Mono']">
                4K HDR · 02:45
              </span>
              <span className="font-['Geist_Mono'] text-[#84BD3A] font-bold">
                CLINICAL REEL
              </span>
            </div>

            <div className="flex flex-col items-center justify-center">
              <button
                onClick={() => setIsPlayingStory(!isPlayingStory)}
                className="w-20 h-20 rounded-full bg-[#84BD3A] hover:bg-[#96d246] text-[#1E3F20] flex items-center justify-center shadow-2xl hover:scale-110 transition-all cursor-pointer mb-4"
              >
                {isPlayingStory ? <Pause size={32} /> : <Play size={32} className="ml-1 fill-current" />}
              </button>
              <h3 className="font-['Outfit'] font-bold text-2xl text-white text-center">
                Science Behind the Cushion
              </h3>
              <p className="text-xs text-white/70 text-center max-w-md mt-1">
                Featuring our head podiatrists Dr. Ananya Nair and Dr. Marcus Vance.
              </p>
            </div>

            <div className="flex items-center justify-between text-xs text-white/60">
              <span>Mumbai Podiatric Center & Pratt Design Studio</span>
              <span>Audio: Stereo Master</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. TIMELINE SECTION (Matching Figma 1:1054 Milestones)                    */}
      {/* ========================================================================= */}
      <section className="bg-[#F7F9F6] border-y border-[#E8EDDF] py-16 px-6">
        <div className="max-w-[1360px] mx-auto">
          <div className="text-center max-w-xl mx-auto mb-14">
            <h2 className="font-['Outfit'] font-bold text-3xl text-[#1E3F20] mb-2">
              Milestones of Innovation
            </h2>
            <p className="text-sm text-[#4A5D4E]">
              From a small orthotic clinic to a nationwide ergonomic footwear revolution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Horizontal Line connecting nodes on desktop */}
            <div className="hidden md:block absolute top-10 left-[12%] right-[12%] h-0.5 bg-[#84BD3A]/40 z-0" />

            {milestones.map((m, idx) => (
              <div key={idx} className="relative z-10 flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-white border-4 border-[#84BD3A] flex items-center justify-center font-['Geist_Mono'] font-extrabold text-base text-[#1E3F20] shadow-md mb-6">
                  {m.year}
                </div>
                <h3 className="font-['Outfit'] font-bold text-lg text-[#1E3F20] mb-2">
                  {m.title}
                </h3>
                <p className="text-xs text-[#4A5D4E] leading-relaxed max-w-xs">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. TEAM SECTION (Matching Figma 1:1054 8 Team Member Cards)                */}
      {/* ========================================================================= */}
      <section className="max-w-[1360px] mx-auto px-6 py-16">
        <div className="text-center max-w-xl mx-auto mb-14">
          <h2 className="font-['Outfit'] font-bold text-3xl text-[#1E3F20] mb-2">
            The Faces Behind Medifeet
          </h2>
          <p className="text-sm text-[#4A5D4E]">
            A dedicated group of podiatrists, footwear engineers, and design visionaries.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {team.map((member, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl overflow-hidden border border-[#E8EDDF] shadow-sm hover:shadow-xl transition-all duration-300 group"
            >
              <div className="h-64 overflow-hidden bg-gray-100">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="font-['Outfit'] font-bold text-base text-[#1E3F20] mb-0.5">
                  {member.name}
                </h3>
                <span className="font-['Geist_Mono'] text-[11px] font-bold text-[#84BD3A] block mb-2">
                  {member.role}
                </span>
                <p className="text-xs text-[#4A5D4E] leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. VALUES SECTION (Matching Figma 1:1054 What Drives Our Stride)          */}
      {/* ========================================================================= */}
      <section className="bg-[#1E3F20] text-white py-16 px-6">
        <div className="max-w-[1360px] mx-auto">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="font-['Geist_Mono'] text-xs font-bold uppercase tracking-widest text-[#84BD3A] block mb-2">
              CORE PHILOSOPHY
            </span>
            <h2 className="font-['Outfit'] font-bold text-3xl text-white mb-2">
              What Drives Our Stride
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition">
              <div className="w-12 h-12 rounded-2xl bg-[#84BD3A] text-[#1E3F20] flex items-center justify-center font-bold mb-6">
                <HeartHandshake size={24} />
              </div>
              <h3 className="font-['Outfit'] font-bold text-xl text-white mb-3">
                Comfort First
              </h3>
              <p className="text-xs text-white/80 leading-relaxed font-['Geist']">
                We design footwear starting from the anatomical pressure map. Pain relief is our non-negotiable metric.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition">
              <div className="w-12 h-12 rounded-2xl bg-[#84BD3A] text-[#1E3F20] flex items-center justify-center font-bold mb-6">
                <Leaf size={24} />
              </div>
              <h3 className="font-['Outfit'] font-bold text-xl text-white mb-3">
                Sustainable Craftsmanship
              </h3>
              <p className="text-xs text-white/80 leading-relaxed font-['Geist']">
                Utilizing medical-grade recycled mesh, organic cork, and premium full-grain leathers harvested responsibly.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition">
              <div className="w-12 h-12 rounded-2xl bg-[#84BD3A] text-[#1E3F20] flex items-center justify-center font-bold mb-6">
                <ShieldCheck size={24} />
              </div>
              <h3 className="font-['Outfit'] font-bold text-xl text-white mb-3">
                Customer Obsession
              </h3>
              <p className="text-xs text-white/80 leading-relaxed font-['Geist']">
                We offer custom-tuned fits and podiatrist consultations to ensure every stride is biomechanically balanced.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. ENERGY FORM SECTION (Matching Figma 1:1054)                            */}
      {/* ========================================================================= */}
      <section className="max-w-[1360px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <span className="font-['Outfit'] font-bold text-xs uppercase tracking-widest text-[#84BD3A] bg-[#1E3F20] px-3.5 py-1.5 rounded-full inline-block mb-4">
              OUR ENERGY FORM
            </span>
            <h2 className="font-['Outfit'] font-bold text-4xl text-[#1E3F20] leading-tight mb-4">
              Feel the spirit behind every step
            </h2>
            <p className="text-sm text-[#4A5D4E] leading-relaxed mb-6 font-['Geist']">
              A brighter, more kinetic view of the brand’s energy — where clinical precision meets confidence, movement, and everyday vitality.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-xs font-bold text-[#1E3F20]">
                <CheckCircle2 size={16} className="text-[#84BD3A]" />
                <span>Zero break-in period out of the box</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-bold text-[#1E3F20]">
                <CheckCircle2 size={16} className="text-[#84BD3A]" />
                <span>Kinetic rebound tested across 100,000 steps</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-bold text-[#1E3F20]">
                <CheckCircle2 size={16} className="text-[#84BD3A]" />
                <span>Endorsed by professional long-shift practitioners</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="relative rounded-3xl overflow-hidden h-[420px] bg-[#121612] shadow-2xl border border-gray-200 group">
              <img
                src="/assets/desk_main_image_d227b7.png"
                alt="Our Energy Form Kinetic preview"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-8">
                <span className="text-[11px] font-['Geist_Mono'] font-bold text-[#84BD3A] uppercase tracking-widest block mb-1">
                  OUR ENERGY FORM
                </span>
                <h3 className="font-['Outfit'] font-bold text-2xl text-white mb-2">
                  A cinematic glimpse into the spirit, pace, and optimism of Medifeet.
                </h3>
                <p className="text-xs text-white/70">
                  Documentary excerpt filmed on location with ambassadors across India.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. ABOUT CTA SECTION (Matching Figma 1:1054)                             */}
      {/* ========================================================================= */}
      <section className="bg-[#F7F9F6] border-t border-[#E8EDDF] py-16 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-['Outfit'] font-extrabold text-4xl text-[#1E3F20] tracking-tight mb-4">
            Ready to Walk on Dense Clouds?
          </h2>
          <p className="text-sm text-[#4A5D4E] leading-relaxed mb-8">
            Experience the beautiful merger of medical clinical science and elite styling. Find your perfect orthotic fit today.
          </p>
          <button
            onClick={() => onNavigate('shop')}
            className="bg-[#84BD3A] hover:bg-[#96d246] text-[#1E3F20] font-['Outfit'] font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-full shadow-xl transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <span>SHOP THE COLLECTION</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 11. DESKTOP FOOTER (Matching Figma 1:1054)                                */}
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

export default DesktopAboutPage;
