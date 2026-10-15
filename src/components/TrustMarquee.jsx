import React from 'react';
import { RefreshCw, ShieldCheck, Headphones, Truck, Banknote } from 'lucide-react';

const PROMISES = [
  { icon: Truck, label: 'Free delivery across India' },
  { icon: Banknote, label: 'Cash on delivery' },
  { icon: RefreshCw, label: 'Easy exchange & return' },
  { icon: ShieldCheck, label: 'Secure payments' },
  { icon: Headphones, label: 'Dispatched within 24 hours' },
];

// Slim, continuously scrolling strip of store promises.
export const TrustMarquee = () => (
  <div className="w-full bg-[#14301A] text-white py-3.5 overflow-hidden select-none" aria-label="Store promises">
    <ul className="animate-marquee gap-12">
      {[...PROMISES, ...PROMISES, ...PROMISES, ...PROMISES].map(({ icon: Icon, label }, i) => (
        <li key={i} className="flex items-center gap-2.5 shrink-0" aria-hidden={i >= PROMISES.length || undefined}>
          <Icon size={15} className="text-[#A4D65E]" />
          <span className="font-['Outfit'] font-medium text-[13px] tracking-wide whitespace-nowrap">{label}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default TrustMarquee;
