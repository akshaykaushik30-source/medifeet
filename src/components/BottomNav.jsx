import React from 'react';
import { Home, Compass, Sparkles, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const BottomNav = ({ currentPage, onNavigate }) => {
  const { cartCount, setIsCartOpen } = useCart();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'shop', label: 'Shop', icon: Compass },
    { id: 'product', label: 'CloudWalk', icon: Sparkles, featured: true },
  ];

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-[#F7F9F6]/95 backdrop-blur-md border-t border-[#E8EDDF] px-4 py-2 sm:hidden flex items-center justify-around shadow-lg">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentPage === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all cursor-pointer ${
              isActive 
                ? 'text-[#1E3F20] font-bold' 
                : 'text-[#667360] hover:text-[#1E3F20]'
            }`}
          >
            <div className={`p-1 rounded-full ${item.featured ? 'bg-[#E8F3D6] text-[#1E3F20]' : ''}`}>
              <Icon size={19} />
            </div>
            <span className="text-[10px] font-['Geist_Mono']">{item.label}</span>
          </button>
        );
      })}

      <button
        onClick={() => setIsCartOpen(true)}
        className="flex flex-col items-center gap-1 py-1 px-3 rounded-xl text-[#667360] hover:text-[#1E3F20] transition-all cursor-pointer relative"
      >
        <div className="p-1 relative">
          <ShoppingBag size={19} />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#1E3F20] text-white text-[8px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </div>
        <span className="text-[10px] font-['Geist_Mono']">Cart</span>
      </button>
    </div>
  );
};

export default BottomNav;
