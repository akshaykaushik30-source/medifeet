import React from 'react';
import CatalogGrid from '../components/CatalogGrid';

const COPY = {
  women: { kicker: "Women's Collection", title: 'Step Into Style', text: 'Orthopedic support in sandals, slippers, loafers and heels for every day.' },
  men: { kicker: "Men's Collection", title: 'Own Every Step', text: 'Arch support and cushioned comfort in slippers, sandals and formal shoes.' },
};

// Mobile shop page for one collection.
export const ShopPage = ({ onNavigate, gender = 'women' }) => {
  const copy = COPY[gender];
  return (
    <div className="bg-[#F7F9F6] text-[#1E3F20] font-['Geist'] min-h-screen py-8 px-4">
      <div className="mb-2">
        <span className="text-[10px] font-['Geist_Mono'] font-bold text-[#667360] uppercase tracking-widest block mb-1">{copy.kicker}</span>
        <h1 className="font-['Outfit'] font-bold text-3xl text-[#1E3F20]">{copy.title}</h1>
        <p className="text-xs text-[#667360] mt-1">{copy.text}</p>
      </div>
      <div className="flex gap-2 my-4">
        {Object.keys(COPY).map((g) => (
          <button
            key={g}
            onClick={() => onNavigate(g === 'men' ? 'men' : 'shop')}
            aria-pressed={g === gender}
            className={`flex-1 py-2.5 rounded-xl text-sm font-['Outfit'] font-bold cursor-pointer ${
              g === gender ? 'bg-[#1E3F20] text-white' : 'bg-white border border-[#E8EDDF] text-[#667360]'
            }`}
          >
            {g === 'men' ? 'Men' : 'Women'}
          </button>
        ))}
      </div>
      <CatalogGrid key={gender} gender={gender} id="mobile-grid" onNavigate={onNavigate} compact />
    </div>
  );
};

export default ShopPage;
