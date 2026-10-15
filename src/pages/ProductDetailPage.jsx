import React, { useEffect, useMemo, useState } from 'react';
import { ChevronRight, Heart, Minus, Plus, Truck, RefreshCw, ShieldCheck, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { loadCatalog, productImage, discountPercent, CATEGORY_LABELS, GENDER_LABELS } from '../data/catalog';
import { FREE_SHIPPING_LABEL, formatPrice } from '../config';
import ProductCard from '../components/ProductCard';
import FeatureStrip from '../components/FeatureStrip';

const SHOP_PAGE = { women: 'shop', men: 'men' };

// Product page for any catalogue product, opened at #product/<id>.
export const ProductDetailPage = ({ productId, onNavigate }) => {
  const { addToCart, wishlist, toggleWishlist } = useCart();
  const [catalog, setCatalog] = useState(null);
  const [color, setColor] = useState(null);
  const [size, setSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [sizeError, setSizeError] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    let alive = true;
    loadCatalog().then((items) => alive && setCatalog(items));
    return () => {
      alive = false;
    };
  }, []);

  const product = useMemo(() => catalog?.find((p) => p.id === productId), [catalog, productId]);

  // Start each product on its first colour that has stock.
  useEffect(() => {
    if (!product) return;
    const firstInStock = product.colors.find((c) => product.variants.some((v) => v.color === c.name && v.stock > 0));
    setColor((firstInStock || product.colors[0])?.name ?? null);
    setSize(null);
    setQuantity(1);
    setActiveImage(0);
    setSizeError(false);
    setAdded(false);
  }, [product]);

  const related = useMemo(() => {
    if (!catalog || !product) return [];
    const same = catalog.filter((p) => p.id !== product.id && p.gender === product.gender);
    const sameCategory = same.filter((p) => p.category === product.category);
    return [...sameCategory, ...same.filter((p) => p.category !== product.category)].slice(0, 4);
  }, [catalog, product]);

  if (!catalog) {
    return <div className="min-h-[60vh] flex items-center justify-center text-sm text-[#667360]">Loading product…</div>;
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="font-['Outfit'] font-bold text-2xl text-[#1E3F20]">We couldn't find that product</p>
        <p className="text-sm text-[#667360]">It may have been removed or renamed.</p>
        <button onClick={() => onNavigate('shop')} className="bg-[#1E3F20] text-white font-['Outfit'] font-bold text-sm px-6 py-3 rounded-full cursor-pointer">
          Browse the collection
        </button>
      </div>
    );
  }

  const colorImage = product.colors.find((c) => c.name === color)?.image;
  const gallery = colorImage ? [colorImage, ...product.images.filter((img) => img !== colorImage)] : product.images;
  const variantFor = (s) => product.variants.find((v) => v.size === s && (!color || v.color === color));
  const selectedVariant = size ? variantFor(size) : null;
  const price = selectedVariant?.price ?? product.price;
  const compareAt = selectedVariant?.compareAtPrice ?? product.compareAtPrice;
  const off = discountPercent({ price, compareAtPrice: compareAt });
  const saved = wishlist.includes(product.id);
  const shopPage = SHOP_PAGE[product.gender] || 'shop';
  const paragraphs = product.description.split('\n').filter(Boolean);

  const handleAdd = () => {
    if (!selectedVariant) {
      setSizeError(true);
      return;
    }
    addToCart({
      id: color ? `${product.id}--${color.toLowerCase().replace(/\s+/g, '-')}` : product.id,
      title: product.name,
      color: color || '',
      size,
      price,
      originalPrice: compareAt,
      image: productImage(colorImage || product.images[0], 300),
      quantity,
    });
    setAdded(true);
  };

  return (
    <div className="bg-white text-[#1E3F20] font-['Geist']">
      <section className="max-w-[1280px] mx-auto px-4 sm:px-8 pt-6 pb-14">
        <nav className="flex flex-wrap items-center gap-1.5 text-[13px] text-[#6B7280] mb-6" aria-label="Breadcrumb">
          <button onClick={() => onNavigate('home')} className="hover:text-[#1E3F20] cursor-pointer">Home</button>
          <ChevronRight size={14} />
          <button onClick={() => onNavigate(shopPage)} className="hover:text-[#1E3F20] cursor-pointer">{GENDER_LABELS[product.gender] || 'Shop'}</button>
          <ChevronRight size={14} />
          <span>{CATEGORY_LABELS[product.category] || 'Footwear'}</span>
          <ChevronRight size={14} />
          <span className="text-[#111111] truncate max-w-[240px]">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start">
          {/* Gallery */}
          <div className="flex flex-col-reverse sm:flex-row gap-3 lg:sticky lg:top-28 min-w-0">
            <div className="flex sm:flex-col gap-2.5 overflow-x-auto sm:overflow-visible sm:w-20 shrink-0">
              {gallery.map((img, i) => (
                <button
                  key={img}
                  onClick={() => setActiveImage(i)}
                  aria-label={`Show image ${i + 1}`}
                  className={`w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-xl bg-[#F9FAF8] border-2 overflow-hidden cursor-pointer ${
                    i === activeImage ? 'border-[#1E3F20]' : 'border-transparent hover:border-[#D5DCCF]'
                  }`}
                >
                  <img src={productImage(img, 160)} alt="" className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
            <div className="flex-1 aspect-square rounded-3xl bg-[#F9FAF8] overflow-hidden relative">
              <img
                src={productImage(gallery[Math.min(activeImage, gallery.length - 1)], 1000)}
                alt={product.name}
                className="w-full h-full object-contain"
              />
              {off > 0 && (
                <span className="absolute top-4 left-4 bg-[#1E3F20] text-[#84BD3A] text-[11px] font-['Geist_Mono'] font-bold px-3 py-1 rounded-full">
                  {off}% OFF
                </span>
              )}
            </div>
          </div>

          {/* Details & purchase */}
          <div className="space-y-6 min-w-0">
            <div className="space-y-2">
              <p className="font-['Geist_Mono'] text-[11px] font-bold uppercase tracking-widest text-[#84BD3A]">
                {GENDER_LABELS[product.gender]} · {CATEGORY_LABELS[product.category] || 'Footwear'}
              </p>
              <h1 className="font-['Outfit'] font-bold text-3xl sm:text-4xl leading-tight tracking-tight">{product.name}</h1>
            </div>

            <div className="flex flex-wrap items-baseline gap-3 pb-6 border-b border-gray-100">
              <span className="font-['Outfit'] font-bold text-3xl tabular-nums">{formatPrice(price)}</span>
              {off > 0 && (
                <>
                  <span className="font-['Geist_Mono'] text-base text-gray-400 line-through">{formatPrice(compareAt)}</span>
                  <span className="bg-[#E8F3D6] text-[#1E3F20] font-['Geist_Mono'] font-bold text-xs px-2 py-1 rounded">{off}% OFF</span>
                </>
              )}
              <span className="text-xs text-gray-500 basis-full">MRP inclusive of all taxes</span>
            </div>

            {product.colors.length > 0 && (
              <div className="space-y-3">
                <p className="font-['Geist_Mono'] text-xs font-bold uppercase tracking-wider">
                  Colour: <span className="text-[#667360]">{color}</span>
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => {
                        setColor(c.name);
                        setActiveImage(0);
                        setSize(null);
                        setAdded(false);
                      }}
                      aria-pressed={c.name === color}
                      className={`flex items-center gap-2 pl-1.5 pr-3.5 py-1.5 rounded-xl border text-sm cursor-pointer transition ${
                        c.name === color ? 'border-[#1E3F20] bg-[#F4F6F2] font-semibold' : 'border-gray-200 hover:border-[#1E3F20]'
                      }`}
                    >
                      {c.image && <img src={productImage(c.image, 80)} alt="" className="w-8 h-8 rounded-lg object-contain bg-white" />}
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.sizes.length > 0 && (
              <div className="space-y-3">
                <p className="font-['Geist_Mono'] text-xs font-bold uppercase tracking-wider">Select size (UK)</p>
                <div className="grid grid-cols-5 sm:grid-cols-6 gap-2">
                  {product.sizes.map((s) => {
                    const variant = variantFor(s);
                    const soldOut = !variant || variant.stock <= 0;
                    return (
                      <button
                        key={s}
                        disabled={soldOut}
                        onClick={() => {
                          setSize(s);
                          setSizeError(false);
                          setAdded(false);
                        }}
                        aria-pressed={s === size}
                        title={soldOut ? 'Sold out' : undefined}
                        className={`py-3 rounded-xl border font-['Geist_Mono'] font-bold text-sm transition cursor-pointer disabled:cursor-not-allowed disabled:text-gray-300 disabled:line-through disabled:bg-gray-50 ${
                          s === size ? 'bg-[#1E3F20] border-[#1E3F20] text-white' : 'border-gray-200 hover:border-[#1E3F20]'
                        }`}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
                {sizeError && <p className="text-xs text-[#B42318]">Please choose a size.</p>}
                {selectedVariant && selectedVariant.stock > 0 && selectedVariant.stock <= 3 && (
                  <p className="text-xs text-[#B45309]">Only {selectedVariant.stock} left in this size.</p>
                )}
                {product.sizeNote && <p className="text-xs text-gray-500">{product.sizeNote}</p>}
              </div>
            )}

            <div className="flex gap-3">
              <div className="flex items-center gap-4 border border-gray-200 rounded-full px-4">
                <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} aria-label="Decrease quantity" className="cursor-pointer text-gray-600 hover:text-black">
                  <Minus size={15} />
                </button>
                <span className="font-['Geist_Mono'] font-bold w-4 text-center tabular-nums">{quantity}</span>
                <button onClick={() => setQuantity((q) => Math.min(10, q + 1))} aria-label="Increase quantity" className="cursor-pointer text-gray-600 hover:text-black">
                  <Plus size={15} />
                </button>
              </div>
              <button
                onClick={handleAdd}
                className="flex-1 bg-[#1E3F20] hover:bg-[#285424] text-white font-['Outfit'] font-bold text-sm uppercase tracking-wide py-4 rounded-full transition cursor-pointer"
              >
                Add to cart · {formatPrice(price * quantity)}
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                aria-label={saved ? 'Remove from wishlist' : 'Save to wishlist'}
                aria-pressed={saved}
                className="w-14 rounded-full border border-gray-200 flex items-center justify-center hover:border-[#C25443] cursor-pointer"
              >
                <Heart size={18} className={saved ? 'fill-[#C25443] text-[#C25443]' : 'text-gray-600'} />
              </button>
            </div>
            {added && (
              <p className="flex items-center gap-2 text-sm text-[#1E3F20]">
                <Check size={16} className="text-[#84BD3A]" /> Added to your bag.
                <button onClick={() => onNavigate('cart')} className="font-bold underline cursor-pointer">View cart</button>
              </p>
            )}

            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              {[
                { icon: Truck, text: `Free shipping over ${FREE_SHIPPING_LABEL}` },
                { icon: RefreshCw, text: 'Easy exchange & returns' },
                { icon: ShieldCheck, text: 'Secure payments' },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-2 bg-[#F7F9F6] rounded-xl px-3 py-3">
                  <Icon size={16} className="text-[#84BD3A] shrink-0" /> {text}
                </li>
              ))}
            </ul>

            <FeatureStrip variant="compact" />

            {product.highlights.length > 0 && (
              <div className="space-y-3 pt-2">
                <h2 className="font-['Outfit'] font-bold text-lg">Why you'll love it</h2>
                <ul className="space-y-2">
                  {product.highlights.map((h) => (
                    <li key={h} className="flex gap-2.5 text-sm text-[#4A5D4E]">
                      <Check size={16} className="text-[#84BD3A] shrink-0 mt-0.5" /> {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {paragraphs.length > 0 && (
              <details className="group border-t border-gray-100 pt-5" open>
                <summary className="font-['Outfit'] font-bold text-lg cursor-pointer list-none flex justify-between">
                  Description <span className="text-gray-400 group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="space-y-3 pt-3 text-sm leading-relaxed text-[#4A5D4E] max-w-prose">
                  {paragraphs.map((para, i) => <p key={i}>{para}</p>)}
                </div>
              </details>
            )}

            {product.details.length > 0 && (
              <details className="group border-t border-gray-100 pt-5">
                <summary className="font-['Outfit'] font-bold text-lg cursor-pointer list-none flex justify-between">
                  Product details <span className="text-gray-400 group-open:rotate-45 transition-transform">+</span>
                </summary>
                <ul className="pt-3 space-y-1.5 text-sm text-[#4A5D4E]">
                  {product.details.map((d) => <li key={d}>{d}</li>)}
                </ul>
              </details>
            )}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-[#F5F7F2] py-14">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
            <h2 className="font-['Outfit'] font-bold text-2xl sm:text-3xl tracking-tight mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} onNavigate={onNavigate} compact />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetailPage;
