import React, { useEffect, useState } from 'react';
import { User, Package, MapPin, Heart, Settings, LogOut, ShoppingBag, Award } from 'lucide-react';
import { useAccount } from '../context/AccountContext';
import { useCart } from '../context/CartContext';

const MENU = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'orders', label: 'Orders', icon: Package },
  { id: 'addresses', label: 'Addresses', icon: MapPin },
  { id: 'wishlist', label: 'Wishlist', icon: Heart },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const initials = (name) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');

const Card = ({ title, action, children }) => (
  <section className="bg-white border border-gray-200 rounded-xl p-6 sm:p-7">
    <div className="flex items-center justify-between pb-5 mb-5 border-b border-gray-200">
      <h2 className="font-['Outfit'] font-semibold text-lg">{title}</h2>
      {action}
    </div>
    {children}
  </section>
);

// Customer dashboard (Figma frame "medifeet-dashboard", node 1:2288).
// Orders, addresses and points stay empty until Shopify customer accounts are connected.
export const AccountPage = ({ onNavigate }) => {
  const { user, signOut } = useAccount();
  const { wishlist } = useCart();
  const [active, setActive] = useState('profile');

  useEffect(() => {
    if (!user) onNavigate('login');
  }, [user, onNavigate]);

  if (!user) return null;

  const firstName = user.name.split(' ')[0];
  const stats = [
    { label: 'Total Orders', value: '0 Orders', icon: Package },
    { label: 'My Wishlist', value: `${wishlist.length} ${wishlist.length === 1 ? 'Item' : 'Items'} Saved`, icon: Heart },
    { label: 'MediFeet Club Points', value: '0 Points', icon: Award, highlight: true },
  ];

  return (
    <div className="bg-[#F7F8F5] font-['Geist'] text-[#111111]">
      <div className="max-w-[1344px] mx-auto px-4 sm:px-8 lg:px-12 py-10 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8 lg:gap-12 items-start">
        {/* Sidebar */}
        <aside className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center gap-3 pb-5 mb-4 border-b border-gray-200">
            <span className="w-11 h-11 rounded-full bg-[#1E3F20] text-[#84BD3A] font-['Outfit'] font-bold flex items-center justify-center shrink-0">
              {initials(user.name) || '?'}
            </span>
            <div className="min-w-0">
              <p className="font-['Outfit'] font-semibold text-[15px] truncate">{user.name}</p>
              <p className="text-xs text-[#6B7280] truncate">{user.email}</p>
            </div>
          </div>
          <nav className="flex lg:flex-col gap-1 overflow-x-auto">
            {MENU.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => (id === 'wishlist' ? onNavigate('shop') : setActive(id))}
                className={`flex items-center gap-3 px-4 py-3 rounded-md text-sm font-['Outfit'] font-medium whitespace-nowrap transition cursor-pointer ${
                  active === id ? 'bg-[#1E3F20] text-white' : 'hover:bg-[#F4F6F2]'
                }`}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
            <button
              onClick={() => {
                signOut();
                onNavigate('home');
              }}
              className="flex items-center gap-3 px-4 py-3 rounded-md text-sm font-['Outfit'] font-medium text-[#B42318] hover:bg-[#FEF3F2] whitespace-nowrap transition cursor-pointer"
            >
              <LogOut size={16} />
              Sign Out
            </button>
          </nav>
        </aside>

        {/* Main */}
        <div className="space-y-8 min-w-0">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-1.5">
              <h1 className="font-['Outfit'] font-bold text-3xl sm:text-[32px] tracking-tight">My Dashboard</h1>
              <p className="text-sm text-[#6B7280]">Welcome back {firstName}! Track your orders, saved styles and rewards.</p>
            </div>
            <button
              onClick={() => onNavigate('shop')}
              className="bg-[#1E3F20] hover:bg-[#285424] text-white font-['Outfit'] font-bold text-sm uppercase px-5 py-3 rounded-md transition cursor-pointer"
            >
              Shop New Collection
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map(({ label, value, icon: Icon, highlight }) => (
              <div key={label} className={`rounded-xl p-6 border ${highlight ? 'bg-[#1E3F20] border-[#1E3F20] text-white' : 'bg-white border-gray-200'}`}>
                <div className="flex items-start justify-between mb-6">
                  <p className={`font-['Outfit'] font-semibold text-xs uppercase ${highlight ? 'text-[#84BD3A]' : ''}`}>{label}</p>
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center ${highlight ? 'bg-white/15 text-[#84BD3A]' : 'bg-[#F4F6F2] text-[#1E3F20]'}`}>
                    <Icon size={15} />
                  </span>
                </div>
                <p className="font-['Outfit'] font-bold text-2xl">{value}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <Card
              title="Recent Orders"
              action={<span className="font-['Outfit'] font-semibold text-xs text-[#6B7280]">View History</span>}
            >
              <div className="text-center py-6 space-y-3">
                <span className="w-12 h-12 rounded-full bg-[#F4F6F2] text-[#1E3F20] flex items-center justify-center mx-auto">
                  <ShoppingBag size={20} />
                </span>
                <p className="font-['Outfit'] font-semibold">No orders yet</p>
                <p className="text-sm text-[#6B7280] max-w-xs mx-auto">Your orders will show here with tracking and quick reorder.</p>
                <button onClick={() => onNavigate('shop')} className="font-['Outfit'] font-bold text-sm text-[#1E3F20] hover:underline cursor-pointer">
                  Start shopping
                </button>
              </div>
            </Card>

            <Card
              title="Default Shipping Address"
              action={<span className="font-['Outfit'] font-semibold text-xs text-[#6B7280]">Manage Addresses</span>}
            >
              <p className="font-['Outfit'] font-semibold mb-2">{user.name}</p>
              <p className="text-sm text-[#6B7280] leading-relaxed">No address saved yet. You can add one at checkout.</p>
              <div className="mt-6 pt-5 border-t border-gray-200 space-y-1.5">
                <p className="font-['Outfit'] font-bold text-xs uppercase text-[#84BD3A]">Pro tip for max recovery</p>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  Pair your recovery sandals with our biomechanical sneakers for better posture during active days.
                </p>
              </div>
            </Card>
          </div>

          <p className="text-xs text-[#6B7280]">
            Account preview: your details are kept on this device until MediFeet customer accounts go live with Shopify.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
