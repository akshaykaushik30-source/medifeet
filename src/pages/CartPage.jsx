import React, { useState } from 'react';
import { ChevronRight, Minus, Plus, X, ShieldCheck, RefreshCw, Headphones, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { FREE_SHIPPING_THRESHOLD, PROMO_CODES, formatPrice } from '../config';

// Shown under the cart until real recommendations come from the Shopify catalogue.
const RECOMMENDED = [
  { id: 'archrestore-knit', name: 'ArchRestore Knit', price: 4899, image: '/assets/medifeet_home/img_34_192_121_image_container.png' },
  { id: 'ergostrut-oxford', name: 'ErgoStrut Oxford', price: 5499, image: '/assets/prod-ergostrut-oxford.png' },
  { id: 'solehealer-slip-on', name: 'SoleHealer Slip-On', price: 3299, image: '/assets/medifeet_home/img_35_192_141_image_container.png' },
  { id: 'bioflex-trainer', name: 'BioFlex Trainer', price: 3999, image: '/assets/prod-bioflex.png' },
];

const TRUST = [
  { icon: ShieldCheck, label: 'Secure Checkout' },
  { icon: RefreshCw, label: 'Free Returns' },
  { icon: Headphones, label: '24/7 Support' },
];

const PAYMENT_METHODS = ['Visa', 'Mastercard', 'RuPay', 'UPI'];

// Shopping cart page (Figma frame "medifeet-cart", node 1:2467).
export const CartPage = ({ onNavigate }) => {
  const { cartItems, cartCount, cartSubtotal, updateQuantity, removeFromCart } = useCart();
  const [promoInput, setPromoInput] = useState('');
  const [promo, setPromo] = useState(null);
  const [promoError, setPromoError] = useState('');
  const [checkoutNotice, setCheckoutNotice] = useState(false);

  const discount = promo ? Math.round(cartSubtotal * PROMO_CODES[promo]) : 0;
  const freeShipping = cartSubtotal >= FREE_SHIPPING_THRESHOLD;
  const total = cartSubtotal - discount;

  const applyPromo = (e) => {
    e.preventDefault();
    const code = promoInput.trim().toUpperCase();
    if (PROMO_CODES[code]) {
      setPromo(code);
      setPromoError('');
    } else {
      setPromo(null);
      setPromoError(code ? `"${code}" isn't a valid code.` : 'Enter a promo code.');
    }
  };

  return (
    <div className="bg-white text-[#111111] font-['Geist']">
      <section className="max-w-[1280px] mx-auto px-4 sm:px-8 pt-8 pb-16">
        <nav className="flex items-center gap-1.5 text-[13px] text-[#6B7280] mb-6" aria-label="Breadcrumb">
          <button onClick={() => onNavigate('home')} className="hover:text-[#1E3F20] cursor-pointer">Home</button>
          <ChevronRight size={14} />
          <span className="text-[#111111]">Shopping Cart</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Line items */}
          <div className="lg:col-span-8 min-w-0">
            <h1 className="font-['Outfit'] font-bold text-3xl sm:text-[34px] tracking-tight pb-6 border-b border-gray-200">
              Shopping Cart ({cartCount} {cartCount === 1 ? 'item' : 'items'})
            </h1>

            {cartItems.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#F4F6F2] text-[#1E3F20] flex items-center justify-center mx-auto">
                  <ShoppingBag size={26} />
                </div>
                <p className="font-['Outfit'] font-semibold text-xl">Your cart is empty</p>
                <p className="text-sm text-[#6B7280]">Find a pair built for all-day comfort.</p>
                <button
                  onClick={() => onNavigate('shop')}
                  className="bg-[#111111] hover:bg-[#1E3F20] text-white font-['Outfit'] font-bold text-sm px-8 py-3.5 rounded-full transition-[color,background-color,border-color,opacity,transform] duration-150 cursor-pointer active:scale-[0.97]"
                >
                  Shop the collection
                </button>
              </div>
            ) : (
              <ul>
                {cartItems.map((item) => (
                  <li key={`${item.id}-${item.size}`} className="flex flex-wrap sm:flex-nowrap items-center gap-4 sm:gap-6 py-6 border-b border-gray-200">
                    <div className="w-[68px] h-[84px] rounded-md bg-[#F3F4F2] flex items-center justify-center shrink-0 overflow-hidden">
                      <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1 min-w-[160px]">
                      <p className="font-['Outfit'] font-semibold text-[15px]">{item.title}</p>
                      <p className="text-xs text-[#6B7280] mt-1">
                        Size: UK {item.size}
                        {item.color ? ` | Color: ${item.color}` : ''}
                      </p>
                    </div>
                    <span className="font-['Geist_Mono'] font-semibold text-sm w-16 text-right hidden sm:block">{formatPrice(item.price)}</span>
                    <div className="flex items-center gap-3 border border-gray-200 rounded-full px-3 py-1.5">
                      <button onClick={() => updateQuantity(item.id, item.size, -1)} aria-label={`Decrease quantity of ${item.title}`} className="cursor-pointer text-gray-600 hover:text-black">
                        <Minus size={14} />
                      </button>
                      <span className="font-['Geist_Mono'] font-bold text-sm w-4 text-center tabular-nums">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.size, 1)} aria-label={`Increase quantity of ${item.title}`} className="cursor-pointer text-gray-600 hover:text-black">
                        <Plus size={14} />
                      </button>
                    </div>
                    <span className="font-['Geist_Mono'] font-bold text-sm w-20 text-right tabular-nums">{formatPrice(item.price * item.quantity)}</span>
                    <button
                      onClick={() => removeFromCart(item.id, item.size)}
                      aria-label={`Remove ${item.title}`}
                      className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:border-black hover:text-black cursor-pointer"
                    >
                      <X size={13} />
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <div className="flex flex-wrap justify-between gap-4 pt-8">
              {TRUST.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2.5 text-[13px] font-['Outfit'] font-semibold">
                  <Icon size={20} className="text-[#84BD3A]" />
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Order summary */}
          {cartItems.length > 0 && (
          <aside className="lg:col-span-4 bg-[#F7F8F5] border border-gray-200 rounded-xl p-6 space-y-5 lg:sticky lg:top-28">
            <h2 className="font-['Outfit'] font-bold text-xl">Order Summary</h2>
            <dl className="space-y-3 text-[13px]">
              <div className="flex justify-between">
                <dt className="text-[#6B7280]">Subtotal</dt>
                <dd className="font-['Geist_Mono'] font-semibold tabular-nums">{formatPrice(cartSubtotal)}</dd>
              </div>
              {promo && (
                <div className="flex justify-between text-[#2E7D32]">
                  <dt>Promo {promo}</dt>
                  <dd className="font-['Geist_Mono'] font-semibold tabular-nums">-{formatPrice(discount)}</dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt className="text-[#6B7280]">Shipping</dt>
                <dd className={`font-semibold ${freeShipping ? 'text-[#2E7D32]' : ''}`}>
                  {freeShipping ? 'FREE' : 'Calculated at checkout'}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-[#6B7280]">Taxes</dt>
                <dd className="font-semibold">Included in price</dd>
              </div>
            </dl>
            {!freeShipping && (
              <p className="text-xs text-[#1E3F20] bg-[#E8F3D6] rounded-lg px-3 py-2">
                Add {formatPrice(FREE_SHIPPING_THRESHOLD - cartSubtotal)} more for free shipping.
              </p>
            )}

            <div className="flex justify-between items-baseline pt-5 border-t border-gray-200">
              <span className="font-['Outfit'] font-bold text-lg">Order Total</span>
              <span className="font-['Outfit'] font-bold text-2xl text-[#1E3F20] tabular-nums">{formatPrice(total)}</span>
            </div>

            <form onSubmit={applyPromo} className="space-y-1.5">
              <div className="flex gap-2">
                <label htmlFor="cart-promo" className="sr-only">Promo code</label>
                <input
                  id="cart-promo"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  placeholder="Promo code"
                  className="flex-1 min-w-0 bg-white border border-gray-200 rounded-full px-4 py-3 text-[13px] uppercase placeholder:normal-case focus:outline-none focus:border-[#1E3F20]"
                />
                <button type="submit" className="bg-[#111111] hover:bg-[#1E3F20] text-white font-['Outfit'] font-bold text-xs uppercase px-5 rounded-full transition-[color,background-color,border-color,opacity,transform] duration-150 cursor-pointer active:scale-[0.97]">
                  Apply
                </button>
              </div>
              {promoError && <p className="text-xs text-[#B42318] px-2">{promoError}</p>}
            </form>

            <button
              onClick={() => setCheckoutNotice(true)}
              className="w-full bg-[#111111] hover:bg-[#1E3F20] text-white font-['Outfit'] font-bold text-sm uppercase tracking-wide py-4 rounded-full transition-[color,background-color,border-color,opacity,transform] duration-150 cursor-pointer active:scale-[0.97]"
            >
              Proceed to Checkout
            </button>
            {checkoutNotice && (
              <p className="text-xs text-[#6B7280] text-center">
                Online payment opens once the store is connected to Shopify checkout.
              </p>
            )}

            <div className="text-center space-y-2">
              <p className="text-[11px] text-[#6B7280]">Accepted Payment Methods</p>
              <div className="flex justify-center gap-2">
                {PAYMENT_METHODS.map((method) => (
                  <span key={method} className="font-['Geist_Mono'] font-bold text-[10px] uppercase border border-gray-300 bg-white rounded px-2 py-1">
                    {method}
                  </span>
                ))}
              </div>
            </div>
          </aside>
          )}
        </div>
      </section>

      <section className="bg-[#F5F7F2] py-16">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          <h2 className="font-['Outfit'] font-bold text-3xl tracking-tight mb-8">You May Also Like</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {RECOMMENDED.map((product) => (
              <button
                key={product.id}
                onClick={() => onNavigate('product')}
                className="bg-white rounded-lg p-3 sm:p-4 text-left group cursor-pointer"
              >
                <div className="aspect-square bg-[#F8F9FB] rounded-md overflow-hidden mb-4">
                  <img src={product.image} alt={product.name} className="w-full h-full object-contain group-hover:scale-[1.03] transition-transform duration-200 ease-out" />
                </div>
                <div className="flex flex-wrap items-baseline justify-between gap-1">
                  <span className="font-['Outfit'] font-semibold text-sm sm:text-[15px]">{product.name}</span>
                  <span className="font-['Geist_Mono'] font-bold text-sm tabular-nums">{formatPrice(product.price)}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CartPage;
