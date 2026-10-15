import React, { useState, useEffect, lazy, Suspense } from 'react';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import BottomNav from './components/BottomNav';
import CartDrawer from './components/CartDrawer';
import AddedToCartModal from './components/AddedToCartModal';
// Pages load on demand so visitors only download the layout they see.
const HomePage = lazy(() => import('./pages/HomePage'));
const ShopPage = lazy(() => import('./pages/ShopPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const DemoPage = lazy(() => import('./DemoPage'));
const DesktopHomePage = lazy(() => import('./pages/DesktopHomePage'));
const DesktopShopPage = lazy(() => import('./pages/DesktopShopPage'));
const DesktopMenShopPage = lazy(() => import('./pages/DesktopMenShopPage'));
const DesktopProductPage = lazy(() => import('./pages/DesktopProductPage'));
const DesktopAboutPage = lazy(() => import('./pages/DesktopAboutPage'));
const DesktopContactPage = lazy(() => import('./pages/DesktopContactPage'));

const PAGES = ['home', 'shop', 'men', 'product', 'about', 'contact'];
const MOBILE_BREAKPOINT = 768;

// ?mode=mobile or ?mode=desktop forces a layout (handy for previewing); otherwise it follows screen width.
const forcedMode = () => {
  const mode = new URLSearchParams(window.location.search).get('mode');
  return mode === 'mobile' || mode === 'desktop' ? mode : null;
};
const modeForWidth = () => (window.innerWidth < MOBILE_BREAKPOINT ? 'mobile' : 'desktop');
const pageFromHash = () => {
  const hash = window.location.hash.replace('#', '');
  return PAGES.includes(hash) ? hash : 'home';
};

const MainAppContent = () => {
  const [viewMode, setViewMode] = useState(() => forcedMode() ?? modeForWidth());
  const [currentPage, setCurrentPage] = useState(pageFromHash);

  useEffect(() => {
    if (forcedMode()) return undefined;
    const onResize = () => setViewMode(modeForWidth());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Back/forward buttons and pasted links change the hash; follow them.
  useEffect(() => {
    const onHashChange = () => setCurrentPage(pageFromHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    if (window.location.hash !== `#${currentPage}`) window.location.hash = currentPage;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleNavigate = (pageId) => {
    setCurrentPage(pageId);
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] flex flex-col font-['Geist'] selection:bg-[#84BD3A] selection:text-[#1E3F20]">

      <Suspense fallback={<div className="min-h-screen" />}>
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
        <div className="w-full max-w-[430px] mx-auto min-h-screen bg-[#F7F9F6] shadow-2xl border-x border-[#E8EDDF] relative flex flex-col overflow-x-clip">
          {/* Mobile Header */}
          <Header currentPage={currentPage} onNavigate={handleNavigate} />

          <main className="flex-1 pb-16">
            {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
            {/* The mobile layout has a single shop page for every collection */}
            {(currentPage === 'shop' || currentPage === 'men') && <ShopPage onNavigate={handleNavigate} />}
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
      </Suspense>

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
