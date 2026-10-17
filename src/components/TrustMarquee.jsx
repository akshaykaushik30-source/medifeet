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
  <div className="w-full bg-[#F4F6F2] text-[#1E3F20] py-4 border-y border-[#1E3F20]/10 overflow-hidden select-none" aria-label="Store promises">
    <ul className="animate-marquee gap-14">
      {[...PROMISES, ...PROMISES, ...PROMISES, ...PROMISES].map(({ icon: Icon, label }, i) => (
        <li key={i} className="flex items-center gap-2.5 shrink-0" aria-hidden={i >= PROMISES.length || undefined}>
          <Icon size={14} strokeWidth={1.5} className="text-[#1E3F20]" />
          <span className="text-[13px] text-[#667360] whitespace-nowrap">{label}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default TrustMarquee;
