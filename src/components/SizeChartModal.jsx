import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ruler, X, Check } from 'lucide-react';

export const SizeChartModal = ({ isOpen, onClose, selectedSize, onSelectSize }) => {

  const sizeTable = [
    { uk: 4, eu: 37, cm: '23.0' },
    { uk: 5, eu: 38, cm: '23.8' },
    { uk: 6, eu: 39, cm: '24.6' },
    { uk: 7, eu: 40, cm: '25.4' },
    { uk: 8, eu: 41, cm: '26.2' },
    { uk: 9, eu: 42, cm: '27.0' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%", transition: { duration: 0.24, ease: [0.32, 0.72, 0, 1] } }}
          transition={{ type: "tween", duration: 0.42, ease: [0.32, 0.72, 0, 1] }}
          className="bg-white w-full max-w-[390px] rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl overflow-hidden relative max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Notch */}
          <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4 sm:hidden" />

          {/* Header */}
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-['Outfit'] font-bold text-2xl text-[#1E3F20]">
              Find your fit
            </h3>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-200 transition cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          <p className="text-xs text-[#667360] mb-5">
            CloudWalk Perfect Sandal · Stone Beige
          </p>

          {/* Size Conversion Table */}
          <div className="border border-[#E8EDDF] rounded-2xl overflow-hidden mb-5">
            <div className="bg-[#FAF8F5] grid grid-cols-3 py-2.5 px-4 text-[10px] font-['Geist_Mono'] font-bold text-[#667360] tracking-wider uppercase border-b border-[#E8EDDF]">
              <div>UK</div>
              <div className="text-center">EU</div>
              <div className="text-right">FOOT LENGTH (CM)</div>
            </div>

            <div className="divide-y divide-[#E8EDDF]">
              {sizeTable.map((row) => {
                const isSelected = selectedSize === row.uk;
                return (
                  <div
                    key={row.uk}
                    onClick={() => {
                      if (onSelectSize) onSelectSize(row.uk);
                    }}
                    className={`grid grid-cols-3 py-3 px-4 text-xs font-semibold cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-[#E8F3D6] text-[#1E3F20] font-bold'
                        : 'hover:bg-[#F8FAF6] text-[#2D332D]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>{row.uk}</span>
                    </div>
                    <div className="text-center">{row.eu}</div>
                    <div className="text-right flex items-center justify-end gap-2">
                      <span>{row.cm}</span>
                      {isSelected && (
                        <Check size={14} className="text-[#1E3F20]" strokeWidth={2.5} />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Instruction Box */}
          <div className="bg-[#FAF8F5] border border-[#E8EDDF] rounded-2xl p-3.5 flex items-start gap-3 mb-4">
            <Ruler size={18} className="text-[#1E3F20] shrink-0 mt-0.5" />
            <p className="text-xs text-[#667360] leading-relaxed">
              Measure heel to longest toe on both feet. Use the longer measurement.
            </p>
          </div>

          <p className="text-[10px] text-[#8C9388] text-center mb-5">
            Illustrative size conversions; confirm with the brand before ordering.
          </p>

          {/* Primary CTA */}
          <button
            onClick={onClose}
            className="w-full bg-[#1E3F20] hover:bg-[#285424] text-white py-3.5 rounded-full font-bold text-sm tracking-wide transition shadow-md flex items-center justify-center cursor-pointer mb-2"
          >
            Find My Size
          </button>

          {/* Home indicator bar */}
          <div className="w-32 h-1 bg-black/20 rounded-full mx-auto mt-4" />
        </motion.div>
      </motion.div>
    )}
    </AnimatePresence>
  );
};

export default SizeChartModal;
