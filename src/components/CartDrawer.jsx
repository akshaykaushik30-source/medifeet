import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartDrawer = ({ onNavigateToProduct }) => {
  const { isCartOpen, setIsCartOpen, cartItems, cartSubtotal, updateQuantity, removeFromCart } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);

  if (!isCartOpen) return null;

  const freeShippingThreshold = 1499;
  const progressPercent = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  const discount = discountApplied ? Math.round(cartSubtotal * 0.05) : 0;
  const finalTotal = cartSubtotal - discount;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'NEW5') {
      setDiscountApplied(true);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end"
        onClick={() => setIsCartOpen(false)}
      >
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 28, stiffness: 300 }}
          className="bg-[#F7F9F6] w-full max-w-[420px] h-full shadow-2xl flex flex-col justify-between"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-4 bg-white border-b border-[#E8EDDF] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag size={20} className="text-[#1E3F20]" />
              <h3 className="font-['Outfit'] font-bold text-lg text-[#1E3F20]">
                Your Shopping Cart ({cartItems.reduce((a, b) => a + b.quantity, 0)})
              </h3>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-black transition cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Free Shipping Progress Strip */}
          <div className="bg-[#E8F3D6] px-4 py-2.5 border-b border-[#D5E5BC]">
            <p className="text-xs font-semibold text-[#1E3F20] mb-1.5 flex items-center justify-between">
              <span>
                {remainingForFreeShipping === 0 
                  ? '🎉 Congratulations! You have unlocked Free Delivery.' 
                  : `Add ₹${remainingForFreeShipping.toLocaleString('en-IN')} more for Free Delivery`}
              </span>
              <span className="font-['Geist_Mono'] text-[10px]">{Math.round(progressPercent)}%</span>
            </p>
            <div className="w-full h-1.5 bg-white/70 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#1E3F20] transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {cartItems.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-[#E8EDDF] rounded-full flex items-center justify-center mx-auto mb-4 text-[#667360]">
                  <ShoppingBag size={28} />
                </div>
                <h4 className="font-['Outfit'] font-bold text-lg text-[#1E3F20] mb-1">
                  Your cart is empty
                </h4>
                <p className="text-xs text-[#667360] mb-6">
                  Explore our orthopedic collection and give your feet the comfort they deserve.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="bg-[#1E3F20] text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#285424] transition cursor-pointer shadow-sm"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={`${item.id}-${item.size}`}
                  className="bg-white rounded-2xl p-3.5 border border-[#E8EDDF] shadow-xs flex gap-3.5 items-center"
                >
                  <div 
                    onClick={() => {
                      setIsCartOpen(false);
                      if (onNavigateToProduct) onNavigateToProduct(item.id);
                    }}
                    className="w-20 h-20 bg-[#F7F9F6] rounded-xl p-1 shrink-0 flex items-center justify-center cursor-pointer border border-[#E8EDDF]/60"
                  >
                    <img
                      src={item.image || '/assets/product-thumbnail.png'}
                      alt={item.title}
                      className="w-full h-full object-contain mix-blend-multiply"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <h5 
                        onClick={() => {
                          setIsCartOpen(false);
                          if (onNavigateToProduct) onNavigateToProduct(item.id);
                        }}
                        className="font-['Outfit'] font-bold text-sm text-[#1E3F20] truncate cursor-pointer hover:underline"
                      >
                        {item.title}
                      </h5>
                      <button
                        onClick={() => removeFromCart(item.id, item.size)}
                        className="text-gray-400 hover:text-red-500 transition p-1 cursor-pointer"
                        title="Remove"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    <p className="text-[11px] text-[#667360] mb-1">
                      {item.color} · Size UK {item.size}
                    </p>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-[#D5DCCF] rounded-lg bg-white overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, item.size, -1)}
                          className="w-7 h-7 flex items-center justify-center text-[#1E3F20] hover:bg-gray-100 transition cursor-pointer"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-8 text-center text-xs font-bold font-['Geist_Mono'] text-[#1E3F20]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.size, 1)}
                          className="w-7 h-7 flex items-center justify-center text-[#1E3F20] hover:bg-gray-100 transition cursor-pointer"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="font-['Outfit'] font-bold text-sm text-[#1E3F20]">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                        {item.originalPrice && (
                          <span className="block text-[10px] text-[#8C9388] line-through">
                            ₹{(item.originalPrice * item.quantity).toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cartItems.length > 0 && (
            <div className="p-4 bg-white border-t border-[#E8EDDF] shadow-lg">
              {/* Promo code */}
              <form onSubmit={handleApplyPromo} className="flex gap-2 mb-3">
                <div className="relative flex-1">
                  <Tag size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Coupon code (e.g. NEW5)"
                    className="w-full bg-[#F7F9F6] border border-[#D5DCCF] rounded-xl pl-8 pr-3 py-2 text-xs uppercase font-['Geist_Mono'] focus:outline-none focus:border-[#1E3F20]"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#1E3F20] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#285424] transition cursor-pointer"
                >
                  Apply
                </button>
              </form>

              {discountApplied && (
                <div className="bg-[#E8F3D6] text-[#1E3F20] text-xs px-3 py-1.5 rounded-lg mb-3 flex items-center justify-between font-semibold">
                  <span>🎉 Coupon NEW5 Applied (5% Off)</span>
                  <span>-₹{discount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="space-y-1.5 text-xs text-[#667360] mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-[#1E3F20]">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>
                {discountApplied && (
                  <div className="flex justify-between text-green-700">
                    <span>Discount</span>
                    <span className="font-bold">-₹{discount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-bold text-green-700">FREE</span>
                </div>
                <div className="flex justify-between text-sm font-['Outfit'] font-bold text-[#1E3F20] pt-2 border-t border-gray-100">
                  <span>Total Amount</span>
                  <span>₹{finalTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button
                onClick={() => alert(`Redirecting to Shopify Checkout for ₹${finalTotal.toLocaleString('en-IN')}!`)}
                className="w-full bg-[#1E3F20] hover:bg-[#285424] text-white py-3.5 rounded-full font-bold text-sm tracking-wide transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={16} />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-[#667360] mt-3">
                <ShieldCheck size={13} className="text-[#84BD3A]" />
                <span>256-Bit Encrypted & 30-Day Risk-Free Trial</span>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CartDrawer;
