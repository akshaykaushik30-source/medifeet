import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const AddedToCartModal = ({ onNavigateToCart }) => {
  const { addedItemModal, setAddedItemModal, cartCount, cartSubtotal, setIsCartOpen } = useCart();

  if (!addedItemModal) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4"
        onClick={() => setAddedItemModal(null)}
      >
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 28, stiffness: 350 }}
          className="bg-white w-full max-w-[390px] rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl overflow-hidden relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Pull Notch */}
          <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-5 sm:hidden" />

          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#E8F3D6] text-[#285424] flex items-center justify-center">
                <Check size={18} strokeWidth={2.5} />
              </div>
              <h3 className="font-['Outfit'] font-bold text-2xl text-[#1E3F20]">
                Added to cart
              </h3>
            </div>
            <button
              onClick={() => setAddedItemModal(null)}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-200 transition cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Product Info Card */}
          <div className="bg-[#F8FAF6] border border-[#E8EDDF] rounded-2xl p-3.5 flex items-center gap-4 mb-5">
            <div className="w-20 h-20 bg-white rounded-xl p-1 border border-gray-100 flex items-center justify-center shrink-0 overflow-hidden">
              <img
                src={addedItemModal.image || '/assets/product-thumbnail.png'}
                alt={addedItemModal.title}
                className="w-full h-full object-contain mix-blend-multiply"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-['Outfit'] font-bold text-base text-[#1E3F20] truncate">
                {addedItemModal.title}
              </h4>
              <p className="text-xs text-[#667360] mb-1">
                {addedItemModal.color || 'Stone Beige'}
              </p>
              <p className="text-xs font-['Geist_Mono'] text-[#667360] mb-1">
                UK {addedItemModal.size || 6} · Qty {addedItemModal.quantity || 1}
              </p>
              <p className="font-['Outfit'] font-bold text-base text-[#1E3F20]">
                ₹{(addedItemModal.price || 2499).toLocaleString('en-IN')}
              </p>
            </div>
          </div>

          {/* Cart Subtotal Line */}
          <div className="flex items-center justify-between text-sm py-3 border-t border-[#E8EDDF] mb-5">
            <span className="text-[#667360] font-medium">
              Cart subtotal · {cartCount} {cartCount === 1 ? 'item' : 'items'}
            </span>
            <span className="font-['Outfit'] font-bold text-lg text-[#1E3F20]">
              ₹{cartSubtotal.toLocaleString('en-IN')}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5">
            <button
              onClick={() => {
                setAddedItemModal(null);
                if (onNavigateToCart) {
                  onNavigateToCart();
                } else {
                  setIsCartOpen(true);
                }
              }}
              className="w-full bg-[#1E3F20] hover:bg-[#285424] text-white py-3.5 rounded-full font-bold text-sm tracking-wide transition shadow-md flex items-center justify-center cursor-pointer"
            >
              View Cart
            </button>
            <button
              onClick={() => setAddedItemModal(null)}
              className="w-full bg-white hover:bg-gray-50 text-[#1E3F20] border border-[#1E3F20] py-3.5 rounded-full font-bold text-sm tracking-wide transition flex items-center justify-center cursor-pointer"
            >
              Continue Shopping
            </button>
          </div>

          {/* Home indicator bar */}
          <div className="w-32 h-1 bg-black/20 rounded-full mx-auto mt-6" />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AddedToCartModal;
