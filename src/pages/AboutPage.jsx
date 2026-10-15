import React from 'react';
import { Sparkles, Play, Award, CheckCircle2, ArrowRight } from 'lucide-react';

export const AboutPage = ({ onNavigate }) => {
  return (
    <div className="bg-[#F7F9F6] text-[#1E3F20] font-['Geist'] min-h-screen py-8 px-4 sm:px-6">
      <div className="max-w-[900px] mx-auto">
        
        {/* Hero Banner */}
        <div className="relative bg-[#1A2E1C] text-white rounded-3xl overflow-hidden shadow-xl mb-12 p-8 sm:p-14 text-center">
          <span className="inline-flex items-center gap-1.5 bg-[#84BD3A]/20 text-[#84BD3A] px-3.5 py-1 rounded-full text-[10px] font-['Geist_Mono'] font-bold tracking-widest uppercase mb-4 border border-[#84BD3A]/30">
            <Sparkles size={11} /> SINCE 2018
          </span>

          <h1 className="font-['Outfit'] font-bold text-4xl sm:text-5xl text-white tracking-tight mb-4">
            Our Story
          </h1>
          <p className="text-sm sm:text-base text-white/80 max-w-xl mx-auto leading-relaxed">
            Redefining comfort since 2018. Bridging clinical orthotic precision with stunning, fashion-forward silhouettes so you never have to choose between elegance and pain-free steps.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E8EDDF] shadow-xs text-center mb-12">
          <span className="text-[10px] font-['Geist_Mono'] font-bold text-[#667360] uppercase tracking-widest block mb-3">
            OUR MISSION
          </span>
          <h2 className="font-['Outfit'] font-bold text-2xl sm:text-3xl text-[#1E3F20] max-w-2xl mx-auto leading-snug">
            “We believe nobody should choose between physical orthotic wellness and contemporary fashion. We craft medical-grade insoles seamlessly fitted to beautiful outsoles.”
          </h2>
        </div>

        {/* Video Feature Card */}
        <div className="bg-[#1E241E] text-white rounded-3xl overflow-hidden p-6 sm:p-8 mb-12 border border-white/10 shadow-lg">
          <span className="text-[10px] font-['Geist_Mono'] font-bold text-[#84BD3A] uppercase tracking-wider block mb-2">
            WATCH OUR STORY
          </span>
          <h3 className="font-['Outfit'] font-bold text-2xl text-white mb-4">
            See how science meets stride.
          </h3>

          <div className="relative rounded-2xl overflow-hidden bg-black/40 h-64 sm:h-80 flex items-center justify-center group">
            <video
              src="/assets/video-lifestyle-walk.mp4"
              poster="/assets/on-foot-thumbnail.png"
              muted
              loop
              autoPlay
              playsInline
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-[#84BD3A] text-[#1E3F20] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                <Play size={24} fill="#1E3F20" className="ml-1" />
              </div>
            </div>
          </div>
        </div>

        {/* Milestones of Innovation */}
        <div className="bg-white rounded-3xl p-8 border border-[#E8EDDF] shadow-xs mb-12">
          <span className="text-[10px] font-['Geist_Mono'] font-bold text-[#667360] uppercase tracking-wider block mb-2">
            INNOVATION TIMELINE
          </span>
          <h3 className="font-['Outfit'] font-bold text-2xl text-[#1E3F20] mb-8">
            Milestones of Innovation
          </h3>

          <div className="relative pl-8 space-y-8 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#84BD3A]">
            <div className="relative">
              <div className="absolute -left-8 top-1 w-3 h-3 rounded-full bg-[#84BD3A] ring-4 ring-[#E8F3D6]" />
              <span className="font-['Geist_Mono'] text-xs font-bold text-[#84BD3A] uppercase">
                2018 · FOUNDED
              </span>
              <h4 className="font-['Outfit'] font-bold text-lg text-[#1E3F20] mt-0.5 mb-1">
                Started with a vision to heal feet
              </h4>
              <p className="text-xs text-[#667360] leading-relaxed">
                Founded by orthopedic surgeons and podiatrists who grew frustrated seeing patients forced to wear bulky, unstylish medical footwear.
              </p>
            </div>

            <div className="relative">
              <div className="absolute -left-8 top-1 w-3 h-3 rounded-full bg-[#84BD3A] ring-4 ring-[#E8F3D6]" />
              <span className="font-['Geist_Mono'] text-xs font-bold text-[#84BD3A] uppercase">
                2020 · FLUFFIUM™ PATENT
              </span>
              <h4 className="font-['Outfit'] font-bold text-lg text-[#1E3F20] mt-0.5 mb-1">
                Patented micro-cellular kinetic compound
              </h4>
              <p className="text-xs text-[#667360] leading-relaxed">
                Engineered our proprietary closed-cell footbed that absorbs 68% of heel impact forces while returning kinetic spring with every step.
              </p>
            </div>

            <div className="relative">
              <div className="absolute -left-8 top-1 w-3 h-3 rounded-full bg-[#84BD3A] ring-4 ring-[#E8F3D6]" />
              <span className="font-['Geist_Mono'] text-xs font-bold text-[#84BD3A] uppercase">
                2026 · THE CLOUDWALK ERA
              </span>
              <h4 className="font-['Outfit'] font-bold text-lg text-[#1E3F20] mt-0.5 mb-1">
                Over 50,000+ Happy Walkers Across India
              </h4>
              <p className="text-xs text-[#667360] leading-relaxed">
                Bringing biomechanically balanced footwear to thousands of healthcare workers, teachers, travelers, and daily walkers nationwide.
              </p>
            </div>
          </div>
        </div>

        {/* The Faces Behind Medifeet */}
        <div className="bg-white rounded-3xl p-8 border border-[#E8EDDF] shadow-xs mb-12">
          <span className="text-[10px] font-['Geist_Mono'] font-bold text-[#667360] uppercase tracking-wider block mb-2">
            LEADERSHIP & EXPERTISE
          </span>
          <h3 className="font-['Outfit'] font-bold text-2xl text-[#1E3F20] mb-6">
            The Faces Behind MediFeet
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-[#FAFBF9] rounded-2xl p-5 border border-[#E8EDDF] flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[#1E3F20] text-white flex items-center justify-center font-bold text-xl shrink-0">
                AN
              </div>
              <div>
                <h4 className="font-['Outfit'] font-bold text-base text-[#1E3F20]">
                  Dr. Ananya Nair
                </h4>
                <span className="font-['Geist_Mono'] text-[10px] font-bold text-[#84BD3A] uppercase block mb-1">
                  CHIEF PODIATRIST
                </span>
                <p className="text-[11px] text-[#667360]">
                  14+ years specializing in plantar fascia alignment and diabetic foot care.
                </p>
              </div>
            </div>

            <div className="bg-[#FAFBF9] rounded-2xl p-5 border border-[#E8EDDF] flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[#84BD3A] text-[#1E3F20] flex items-center justify-center font-bold text-xl shrink-0">
                RS
              </div>
              <div>
                <h4 className="font-['Outfit'] font-bold text-base text-[#1E3F20]">
                  Rohan Singhania
                </h4>
                <span className="font-['Geist_Mono'] text-[10px] font-bold text-[#1E3F20] uppercase block mb-1">
                  LEAD DESIGNER
                </span>
                <p className="text-[11px] text-[#667360]">
                  Milan Footwear Academy alumnus translating medical molds into chic designs.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center bg-[#E8F3D6] rounded-3xl p-8 border border-[#D5E5BC]">
          <h3 className="font-['Outfit'] font-bold text-2xl text-[#1E3F20] mb-2">
            Ready to experience the difference?
          </h3>
          <p className="text-xs text-[#285424] mb-5">
            Try the CloudWalk Sandal today with our 30-day risk-free in-home trial.
          </p>
          <button
            onClick={() => onNavigate('product')}
            className="bg-[#1E3F20] hover:bg-[#285424] text-white font-bold px-7 py-3.5 rounded-full text-xs font-['Outfit'] uppercase tracking-wider transition shadow-md inline-flex items-center gap-2 cursor-pointer"
          >
            <span>SHOP CLOUDWALK SANDAL</span>
            <ArrowRight size={14} />
          </button>
        </div>

      </div>
    </div>
  );
};

export default AboutPage;
