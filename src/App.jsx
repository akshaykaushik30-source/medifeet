import React, { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import BottomNav from './components/BottomNav';
import CartDrawer from './components/CartDrawer';
import AddedToCartModal from './components/AddedToCartModal';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import DemoPage from './DemoPage';
import DesktopHomePage from './pages/DesktopHomePage';
import DesktopShopPage from './pages/DesktopShopPage';
import DesktopMenShopPage from './pages/DesktopMenShopPage';
import DesktopProductPage from './pages/DesktopProductPage';
import DesktopAboutPage from './pages/DesktopAboutPage';
import DesktopContactPage from './pages/DesktopContactPage';

const MainAppContent = () => {
  // Device view mode: 'desktop' (matching Figma 1440px) vs 'mobile'
  const [viewMode, setViewMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('mode') === 'mobile') return 'mobile';
      if (params.get('mode') === 'desktop') return 'desktop';
    }
    return 'desktop'; // Default to desktop as requested by the user
  });

  const [currentPage, setCurrentPage] = useState(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '');
      if (['home', 'shop', 'men', 'product', 'about', 'contact'].includes(hash)) {
        return hash;
      }
    }
    return 'home'; // Default to Home page
  });

  useEffect(() => {
    window.location.hash = currentPage;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleNavigate = (pageId) => {
    setCurrentPage(pageId);
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] flex flex-col font-['Geist'] selection:bg-[#84BD3A] selection:text-[#1E3F20]">

      {/* Main Content Area */}
      {viewMode === 'desktop' ? (
        <div className="w-full">
          {currentPage === 'home' && <DesktopHomePage onNavigate={handleNavigate} />}
          {currentPage === 'shop' && <DesktopShopPage onNavigate={handleNavigate} />}
          {currentPage === 'men' && <DesktopMenShopPage onNavigate={handleNavigate} />}
          {currentPage === 'product' && <DesktopProductPage onNavigate={handleNavigate} />}
          {currentPage === 'about' && <DesktopAboutPage onNavigate={handleNavigate} />}
          {currentPage === 'contact' && <DesktopContactPage onNavigate={handleNavigate} />}
        </div>
      ) : (
        <div className="max-w-[430px] mx-auto min-h-screen bg-[#F7F9F6] shadow-2xl border-x border-[#E8EDDF] relative flex flex-col">
          {/* Mobile Header */}
          <Header currentPage={currentPage} onNavigate={handleNavigate} />

          <main className="flex-1 pb-16">
            {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
            {currentPage === 'shop' && <ShopPage onNavigate={handleNavigate} />}
            {currentPage === 'product' && (
              <DemoPage onNavigate={handleNavigate} onSwitchToOriginal={() => handleNavigate('shop')} />
            )}
            {currentPage === 'about' && <AboutPage onNavigate={handleNavigate} />}
            {currentPage === 'contact' && <ContactPage onNavigate={handleNavigate} />}
          </main>

          <Footer onNavigate={handleNavigate} />
          <BottomNav currentPage={currentPage} onNavigate={handleNavigate} />
        </div>
      )}

      {/* Global Slide-Over Shopping Cart Drawer */}
      <CartDrawer onNavigateToProduct={(prodId) => handleNavigate('product')} />

      {/* Global "Added to Cart" Confirmation Modal (Figma Frame 308:5935) */}
      <AddedToCartModal onNavigateToCart={() => {}} />
    </div>
  );
};

export const App = () => {
  return (
    <CartProvider>
      <MainAppContent />
    </CartProvider>
  );
};

export default App;
