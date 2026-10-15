import React from 'react';
import { Footprints, Atom } from 'lucide-react';

// Tread pattern on a sole, for the anti-skid feature.
const SoleGrip = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M12 2.5c3.3 0 5 2.6 5 6.2 0 2.4-.8 4.2-1 6.3-.3 3.4-1.6 6.5-4 6.5s-3.7-3.1-4-6.5c-.2-2.1-1-3.9-1-6.3 0-3.6 1.7-6.2 5-6.2z" />
    <path d="M9.5 7h5M9 10.5h6M9.6 14h4.8M10.3 17.5h3.4" />
  </svg>
);

// Compressed coil spring, for bounce-back cushioning.
const Spring = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M4 3h16" />
    <path d="M18 3 6 7l12 4-12 4 12 4" />
    <path d="M4 21h16" />
  </svg>
);

export const FEATURES = [
  { icon: Footprints, title: 'Anatomic Design', text: 'Shaped to follow the natural contours of your feet.' },
  { icon: Atom, title: 'Advanced Cushioning', text: 'Made with cutting-edge cushioning technology.' },
  { icon: SoleGrip, title: 'Anti-Skid Sole', text: 'High rubber content in the sole for a better grip.' },
  { icon: Spring, title: 'Bounce-Back', text: 'Absorbs shock and returns energy, easing every step.' },
];

// The four MediFeet comfort features. `band` is a full-width green strip for
// landing pages; `compact` is a light 2x2 grid for product pages.
export const FeatureStrip = ({ variant = 'band' }) => {
  if (variant === 'compact') {
    return (
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {FEATURES.map(({ icon: Icon, title, text }) => (
          <li key={title} className="flex gap-3 rounded-2xl bg-[#F4F7F0] p-4">
            <span className="w-10 h-10 shrink-0 rounded-full border-2 border-[#84BD3A] text-[#2F6B2E] flex items-center justify-center">
              <Icon size={19} />
            </span>
            <span className="min-w-0">
              <span className="block font-['Outfit'] font-semibold text-sm text-[#1E3F20]">{title}</span>
              <span className="block text-xs text-[#5F6B62] leading-snug mt-0.5">{text}</span>
            </span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section aria-label="MediFeet comfort features" className="bg-[#2F5D3A] text-white">
      <ul className="max-w-[1360px] mx-auto px-6 sm:px-8 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
        {FEATURES.map(({ icon: Icon, title, text }) => (
          <li key={title} className="flex items-center gap-4 lg:justify-center">
            <span className="w-16 h-16 shrink-0 rounded-full border-2 border-[#A4D65E] text-[#A4D65E] flex items-center justify-center">
              <Icon size={28} strokeWidth={1.75} />
            </span>
            <span className="min-w-0">
              <span className="block font-['Outfit'] font-semibold text-xl tracking-tight">{title}</span>
              <span className="block text-[13px] text-white/75 leading-snug mt-1 max-w-[230px]">{text}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default FeatureStrip;
