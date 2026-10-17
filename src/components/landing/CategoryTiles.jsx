import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { loadCatalog } from '../../data/catalog';
import SectionHeading from './SectionHeading';
import Forming from '../motion/Forming';

const EASE = [0.22, 1, 0.36, 1];

const tile = (name) => `/assets/tiles/${name}.webp`;

const ROWS = [
  {
    gender: 'women',
    page: 'shop',
    label: 'Women',
    tiles: [
      { category: 'sandals', name: 'Sandals', image: tile('desk_product_image_64c439'), tint: '#EEF3E6' },
      { category: 'loafers', name: 'Loafers', image: tile('desk_product_image_5748a7'), tint: '#E8EFE0' },
      { category: 'slippers', name: 'Slippers', image: tile('desk_product_image_45a5df'), tint: '#F2F5EC' },
      { category: 'heels', name: 'Heels', image: tile('desk_product_image_bed441'), tint: '#EAF0E3' },
    ],
  },
  {
    gender: 'men',
    page: 'men',
    label: 'Men',
    tiles: [
      { category: 'shoes', name: 'Formal shoes', image: tile('prod-posture-derby'), tint: '#E6EDE6' },
      { category: 'slippers', name: 'Slippers', image: tile('desk_product_image_05ccc3'), tint: '#EDF1E7' },
      { category: 'sandals', name: 'Sandals', image: tile('desk_product_image_8df6ad'), tint: '#E4EBE0' },
    ],
  },
];

const Tile = ({ tile, count, onClick, index }) => (
  <motion.button
    onClick={onClick}
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.7, ease: EASE, delay: index * 0.06 }}
    className="group relative aspect-[4/5] rounded-[24px] overflow-hidden text-left cursor-pointer active:scale-[0.99] transition-transform duration-150"
    style={{ background: tile.tint }}
    aria-label={`Shop ${tile.name}${count ? `, ${count} styles` : ''}`}
  >
    <Forming tint={tile.tint} delay={index * 0.12} ghost={tile.image} ghostClassName="left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 w-[78%]">
      <img
        src={tile.image}
        alt=""
        loading="lazy"
        className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 w-[78%] drop-shadow-[0_18px_18px_rgba(30,63,32,0.14)] transition-transform duration-500 ease-out group-hover:-translate-y-[56%] group-hover:-rotate-[4deg] group-hover:scale-[1.04]"
      />
    </Forming>
    <span className="absolute left-4 right-4 bottom-4 sm:left-5 sm:right-5 sm:bottom-5 flex items-end justify-between gap-3">
      <span>
        <span className="block font-['Outfit'] text-[17px] leading-tight sm:text-2xl tracking-[-0.02em] text-[#1E3F20]">{tile.name}</span>
        <span className="block mt-0.5 text-xs sm:text-sm text-[#667360] tabular-nums">{count ? `${count} styles` : ' '}</span>
      </span>
      <span className="shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white flex items-center justify-center text-[#1E3F20] transition-colors duration-200 group-hover:bg-[#1E3F20] group-hover:text-white">
        <ArrowUpRight size={17} />
      </span>
    </span>
  </motion.button>
);

// "Find your pair": shop by kind of shoe, women's and men's, with live style counts.
export const CategoryTiles = ({ onNavigate }) => {
  const [catalog, setCatalog] = useState(null);

  useEffect(() => {
    let alive = true;
    loadCatalog().then((items) => alive && setCatalog(items));
    return () => {
      alive = false;
    };
  }, []);

  const counts = useMemo(() => {
    const out = {};
    (catalog || []).forEach((p) => {
      const key = `${p.gender}/${p.category}`;
      out[key] = (out[key] || 0) + 1;
      out[p.gender] = (out[p.gender] || 0) + 1;
    });
    return out;
  }, [catalog]);

  return (
    <section className="pb-24 sm:pb-32 bg-white" aria-label="Shop by category">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-10">
        <SectionHeading eyebrow="Shop by category" title="Find your pair." className="mb-12 sm:mb-16" />

        <div className="space-y-12 sm:space-y-16">
          {ROWS.map((row) => (
            <div key={row.gender}>
              <div className="flex items-baseline justify-between mb-5 border-t border-[#1E3F20]/10 pt-5">
                <h3 className="font-['Outfit'] text-lg text-[#1E3F20]">
                  {row.label}
                  {counts[row.gender] ? <span className="ml-2 text-sm text-[#667360] tabular-nums">{counts[row.gender]} styles</span> : null}
                </h3>
                <button onClick={() => onNavigate(row.page)} className="group inline-flex items-center gap-1.5 text-sm text-[#1E3F20] cursor-pointer">
                  Shop all <ArrowRight size={14} className="transition-transform duration-200 ease-out group-hover:translate-x-1" />
                </button>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
                {row.tiles.map((tile, i) => (
                  <Tile
                    key={tile.category}
                    tile={tile}
                    index={i}
                    count={counts[`${row.gender}/${tile.category}`]}
                    onClick={() => onNavigate(`${row.page}/${tile.category}`)}
                  />
                ))}
                {row.tiles.length === 3 && (
                  <motion.button
                    onClick={() => onNavigate(row.page)}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.7, ease: EASE, delay: 0.18 }}
                    className="group relative aspect-[4/5] rounded-[24px] bg-[#1E3F20] text-white p-6 text-left flex flex-col justify-between cursor-pointer active:scale-[0.99] transition-transform duration-150"
                  >
                    <span className="text-[11px] uppercase tracking-[0.28em] text-white/60">The full range</span>
                    <span>
                      <span className="block font-['Outfit'] text-2xl sm:text-3xl tracking-[-0.02em] leading-tight">
                        {counts.men ? `All ${counts.men} men's styles` : "All men's styles"}
                      </span>
                      <span className="mt-4 inline-flex items-center gap-2 text-sm text-white/80">
                        Shop men <ArrowRight size={15} className="transition-transform duration-200 ease-out group-hover:translate-x-1" />
                      </span>
                    </span>
                  </motion.button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryTiles;
