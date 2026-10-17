import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Plus, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { productImage, discountPercent, productRoute } from '../data/catalog';
import { formatPrice } from '../config';
import { fallbackPhoto } from '../data/fallbacks';

const EASE = [0.22, 1, 0.36, 1];

// Approximate swatch colours for the colour names used in the catalogue.
const SWATCHES = {
  Black: '#1A1A17', Brown: '#6B4226', Tan: '#C08A5B', Beige: '#D9C6A5', Grey: '#9A9A96',
  Onion: '#C9A2A0', Cream: '#EFE6D2', Chiku: '#A88B6E', Cherry: '#7A1F2B', 'Rose Pink': '#E3A3AE',
  White: '#FFFFFF', Olive: '#6B6B3A', 'Dark Grey': '#4A4A48', Blue: '#3D5A8A', Sky: '#9CC3E0',
  'Cherry Black': '#3A1A1E', Pink: '#F0B6C4', Pista: '#B9C98E', Navy: '#1F2A44', Mustard: '#D4A22A',
  Orange: '#E07B39', Peach: '#F2C1A0', 'Light Grey': '#CFCFCB', Camel: '#B9874F',
};

const slug = (s) => s.toLowerCase().replace(/\s+/g, '-');

// A size is available when that colour/size variant has stock; products
// without per-variant data fall back to the product's own stock flag.
const sizeAvailable = (product, color, size) => {
  const variants = product.variants.filter((v) => v.color === color);
  if (!variants.length) return product.inStock;
  return variants.some((v) => v.size === size && v.stock > 0);
};

// Product card used across the shop: photo on a warm tile (second photo on
// hover), colour swatches that switch the photo, and quick add by size.
// If the product photo can't load, a local photo of the same kind of shoe stands in.
export const ShopTile = ({ product, onNavigate, index = 0, fallback = fallbackPhoto(product, index) }) => {
  const { wishlist, toggleWishlist, addToCart } = useCart();
  const [failed, setFailed] = useState(false);
  const [colorIdx, setColorIdx] = useState(0);
  const [panelOpen, setPanelOpen] = useState(false);
  const saved = wishlist.includes(product.id);
  const off = discountPercent(product);
  const color = product.colors[colorIdx];
  const mainImage = (colorIdx > 0 && color?.image) || product.images[0];
  const second = colorIdx === 0 ? product.images[1] : null;
  const open = () => onNavigate(productRoute(product));

  const quickAdd = (size) => {
    addToCart({
      id: color ? `${product.id}--${slug(color.name)}` : product.id,
      title: product.name,
      color: color?.name || '',
      size,
      price: product.price,
      originalPrice: product.compareAtPrice,
      image: failed && fallback ? fallback : productImage(mainImage, 300),
      quantity: 1,
    });
    setPanelOpen(false);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, ease: EASE, delay: (index % 4) * 0.06 }}
      className="group"
    >
      <div className="relative aspect-[4/5] rounded-[20px] overflow-hidden bg-[#F1F4EC]">
        <button onClick={open} className="absolute inset-0 cursor-pointer" aria-label={`View ${product.name}`}>
          {failed ? (
            fallback ? (
              <img src={fallback} alt="" className="absolute inset-0 w-full h-full object-contain p-8 transition-transform duration-300 ease-out group-hover:scale-[1.03]" />
            ) : (
              <img src="/assets/medifeet-brand-logo.png" alt="" className="absolute inset-0 m-auto w-24 opacity-20 grayscale" />
            )
          ) : (
            <>
              <img
                key={mainImage}
                src={productImage(mainImage, 700)}
                alt={product.name}
                loading="lazy"
                onError={() => setFailed(true)}
                className={`absolute inset-0 w-full h-full object-contain p-6 mix-blend-multiply transition-[opacity,transform] duration-300 ease-out group-hover:scale-[1.03] ${second ? 'group-hover:opacity-0' : ''}`}
              />
              {second && (
                <img src={productImage(second, 700)} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-contain p-6 mix-blend-multiply opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100" />
              )}
            </>
          )}
        </button>

        {off > 0 && <span className="absolute top-4 left-4 text-[11px] font-semibold bg-[#E8F3D6] text-[#1E3F20] px-2.5 py-1 rounded-full pointer-events-none">−{off}%</span>}

        <button
          onClick={() => toggleWishlist(product.id)}
          aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name}`}
          aria-pressed={saved}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 focus-visible:opacity-100 [@media(hover:none)]:opacity-100 transition-[opacity,transform] duration-150 active:scale-[0.94] cursor-pointer"
        >
          <Heart size={16} className={saved ? 'fill-[#1E3F20] text-[#1E3F20]' : 'text-[#1E3F20]'} />
        </button>

        {/* Quick add: slides up on hover (or the + button on touch screens). */}
        {product.sizes.length > 0 && (
          <>
            <div
              className={`absolute inset-x-3 bottom-3 rounded-2xl bg-white/90 backdrop-blur-md p-3 shadow-[0_8px_30px_rgba(26,26,23,0.08)] transition-[transform,opacity] duration-300 ease-out ${
                panelOpen ? 'translate-y-0 opacity-100' : 'translate-y-[calc(100%+16px)] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#667360]">Quick add · UK size</p>
                {panelOpen && (
                  <button onClick={() => setPanelOpen(false)} aria-label="Close quick add" className="-m-1 p-1 text-[#667360] cursor-pointer">
                    <X size={14} />
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {product.sizes.map((s) => {
                  const ok = sizeAvailable(product, color?.name, s);
                  return (
                    <button
                      key={s}
                      disabled={!ok}
                      onClick={() => quickAdd(s)}
                      aria-label={ok ? `Add UK ${s} to bag` : `UK ${s} sold out`}
                      className="min-w-9 h-9 px-2 rounded-full border border-[#1E3F20]/15 text-sm tabular-nums text-[#1E3F20] hover:bg-[#1E3F20] hover:text-white hover:border-[#1E3F20] disabled:text-[#1E3F20]/25 disabled:line-through disabled:hover:bg-transparent disabled:cursor-not-allowed transition-[color,background-color,border-color,transform] duration-150 active:scale-[0.94] cursor-pointer"
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>
            {!panelOpen && (
              <button
                onClick={() => setPanelOpen(true)}
                aria-label={`Quick add ${product.name}`}
                className="[@media(hover:hover)]:hidden absolute right-3 bottom-3 w-9 h-9 rounded-full bg-[#1E3F20] text-white flex items-center justify-center transition-transform duration-150 active:scale-[0.94]"
              >
                <Plus size={16} />
              </button>
            )}
          </>
        )}
      </div>

      <div className="mt-4">
        {product.colors.length > 1 && (
          <div className="flex items-center gap-1.5 mb-2.5" role="group" aria-label="Colours">
            {product.colors.slice(0, 5).map((c, i) => (
              <button
                key={c.name}
                onClick={() => { setColorIdx(i); setFailed(false); }}
                aria-label={c.name}
                aria-pressed={i === colorIdx}
                title={c.name}
                className={`w-4 h-4 rounded-full border transition-[box-shadow,transform] duration-150 active:scale-[0.9] cursor-pointer ${
                  i === colorIdx ? 'shadow-[0_0_0_2px_#fff,0_0_0_3px_#1E3F20]' : 'shadow-none'
                } ${c.name === 'White' || c.name === 'Cream' ? 'border-[#1E3F20]/20' : 'border-transparent'}`}
                style={{ background: SWATCHES[c.name] || '#C8C4BC' }}
              />
            ))}
            {product.colors.length > 5 && <span className="text-xs text-[#667360]">+{product.colors.length - 5}</span>}
          </div>
        )}
        <button onClick={open} className="w-full text-left cursor-pointer">
          <span className="block text-[15px] leading-snug line-clamp-2 text-[#1E3F20]">{product.name}</span>
          <span className="mt-1.5 flex items-baseline gap-2">
            <span className="text-[15px] font-medium tabular-nums text-[#1E3F20]">{formatPrice(product.price)}</span>
            {off > 0 && <span className="text-xs line-through tabular-nums text-[#667360]">{formatPrice(product.compareAtPrice)}</span>}
            {color && <span className="ml-auto text-xs text-[#667360]">{color.name}</span>}
          </span>
        </button>
      </div>
    </motion.article>
  );
};

export default ShopTile;
