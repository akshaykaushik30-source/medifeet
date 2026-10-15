import React, { useState } from 'react';

const COLUMNS = [
  { title: 'Shop', page: 'shop', links: ['Orthopedic Sandals', 'Biomechanical Sneakers', 'Comfort Formal Shoes', 'New Arrivals', 'Sale & Clearance'] },
  { title: 'Customer Care', page: 'contact', links: ['Track My Order', 'Returns & Exchanges', 'Sizing & Fit Guide', 'Contact Support', 'FAQs'] },
  { title: 'About MediFeet', page: 'about', links: ['Our Science & Tech', 'The Foot Health Story', 'Careers', 'Sustainability'] },
  { title: 'Legal', page: 'contact', links: ['Privacy Policy', 'Terms of Use', 'Warranty Claim', 'Cookie Settings'] },
];

// Site footer from the Figma cart, login and dashboard frames.
export const DesktopFooter = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);

  return (
    <footer className="bg-[#111111] text-white pt-16 pb-8 px-8">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-8 pb-14 border-b border-white/10">
          {COLUMNS.map((col) => (
            <div key={col.title} className="lg:col-span-2 space-y-4">
              <h5 className="font-['Outfit'] font-bold text-xs tracking-wider uppercase">{col.title}</h5>
              <ul className="space-y-2.5 text-[13px] text-[#8A8F86]">
                {col.links.map((link) => (
                  <li key={link}>
                    <button onClick={() => onNavigate(col.page)} className="hover:text-white transition cursor-pointer text-left">
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="col-span-2 md:col-span-4 lg:col-span-4 space-y-4">
            <h5 className="font-['Outfit'] font-bold text-xs tracking-wider uppercase">Subscribe &amp; Save 10%</h5>
            <p className="text-[13px] text-[#8A8F86] leading-relaxed">
              Sign up to receive expert foot health tips, exclusive collections, and early access to sales.
            </p>
            {joined ? (
              <p className="text-[13px] text-[#84BD3A] font-semibold">Thanks, you're on the list.</p>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setJoined(true);
                }}
                className="flex"
              >
                <input
                  id="footer-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 min-w-0 bg-[#1E1E1E] text-white px-4 py-3 text-[13px] placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#84BD3A]"
                />
                <button type="submit" className="bg-[#84BD3A] hover:bg-[#94cd4a] text-[#111111] px-6 font-['Outfit'] font-bold text-xs uppercase tracking-wider transition cursor-pointer">
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8A8F86]">
          <p>© 2026 Medifeet India. Biomechanically engineered comfort. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span>Verified Partner of Orthotic Society</span>
            <span className="w-6 h-6 rounded-full bg-[#1E3F20] text-[#84BD3A] flex items-center justify-center text-[10px] font-bold">✓</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default DesktopFooter;
