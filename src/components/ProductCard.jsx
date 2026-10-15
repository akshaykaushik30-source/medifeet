import React from 'react';
import { Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { productImage, discountPercent, productRoute } from '../data/catalog';
import { formatPrice } from '../config';

export const ProductCard = ({ product, onNavigate, compact = false }) => {
  const { wishlist, toggleWishlist } = useCart();
  const saved = wishlist.includes(product.id);
  const off = discountPercent(product);
  const open = () => onNavigate(productRoute(product));

  return (
    <article className="bg-white rounded-2xl border border-[#E8EDDF] overflow-hidden flex flex-col group hover:shadow-lg transition-shadow">
      <div className="relative bg-[#F9FAF8] aspect-square">
        <button onClick={open} className="block w-full h-full cursor-pointer" aria-label={`View ${product.name}`}>
          <img
            src={productImage(product.images[0], 600)}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-500"
          />
        </button>
        {off > 0 && (
          <span className="absolute top-3 left-3 bg-[#1E3F20] text-[#84BD3A] text-[10px] font-['Geist_Mono'] font-bold px-2.5 py-1 rounded-full">
            {off}% OFF
          </span>
        )}
        <button
          onClick={() => toggleWishlist(product.id)}
          aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
          aria-pressed={saved}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 hover:bg-white shadow flex items-center justify-center text-gray-500 hover:text-[#C25443] cursor-pointer"
        >
          <Heart size={15} className={saved ? 'fill-[#C25443] text-[#C25443]' : ''} />
        </button>
      </div>

      <button onClick={open} className={`text-left flex-1 flex flex-col gap-2 cursor-pointer ${compact ? 'p-3' : 'p-4 sm:p-5'}`}>
        {product.colors.length > 1 && (
          <span className="text-[11px] text-[#667360]">{product.colors.length} colours</span>
        )}
        <h3 className={`font-['Outfit'] font-semibold text-[#1E3F20] leading-snug line-clamp-2 ${compact ? 'text-sm' : 'text-[15px]'}`}>
          {product.name}
        </h3>
        <div className="mt-auto flex items-baseline gap-2 flex-wrap">
          <span className="font-['Geist_Mono'] font-bold text-[#1E3F20]">{formatPrice(product.price)}</span>
          {off > 0 && <span className="font-['Geist_Mono'] text-xs text-gray-400 line-through">{formatPrice(product.compareAtPrice)}</span>}
        </div>
      </button>
    </article>
  );
};

export default ProductCard;
