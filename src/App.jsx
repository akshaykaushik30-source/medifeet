import React, { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { AccountProvider } from './context/AccountContext';
import DesktopHeader from './components/DesktopHeader';
import DesktopFooter from './components/DesktopFooter';
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
const CartPage = lazy(() => import('./pages/CartPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const AccountPage = lazy(() => import('./pages/AccountPage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));

const PAGES = ['home', 'shop', 'men', 'product', 'about', 'contact', 'cart', 'login', 'account'];

// Pages built from the Figma cart, login and dashboard frames. They share one
// layout on every screen size; on desktop they get the shared header and footer.
const SHARED_PAGES = { cart: CartPage, login: LoginPage, account: AccountPage };
const MOBILE_BREAKPOINT = 768;

// ?mode=mobile or ?mode=desktop forces a layout (handy for previewing); otherwise it follows screen width.
const forcedMode = () => {
  const mode = new URLSearchParams(window.location.search).get('mode');
  return mode === 'mobile' || mode === 'desktop' ? mode : null;
};
const modeForWidth = () => (window.innerWidth < MOBILE_BREAKPOINT ? 'mobile' : 'desktop');
// A route is a page id, optionally followed by a product id: "product/<id>".
const routeFromHash = () => {
  const hash = decodeURIComponent(window.location.hash.replace('#', ''));
  return PAGES.includes(hash.split('/')[0]) ? hash : 'home';
};

const MainAppContent = () => {
  const [viewMode, setViewMode] = useState(() => forcedMode() ?? modeForWidth());
  const [route, setRoute] = useState(routeFromHash);
  const [currentPage, ...rest] = route.split('/');
  const productId = rest.join('/');
  const { setAddedItemModal, setIsCartOpen } = useCart();

  useEffect(() => {
    if (forcedMode()) return undefined;
    const onResize = () => setViewMode(modeForWidth());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Back/forward buttons and pasted links change the hash; follow them.
  useEffect(() => {
    const onHashChange = () => setRoute(routeFromHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Close the bag and the "added to cart" pop-up when moving to another page.
  useEffect(() => {
    setAddedItemModal(null);
    setIsCartOpen(false);
  }, [route, setAddedItemModal, setIsCartOpen]);

  useEffect(() => {
    if (decodeURIComponent(window.location.hash) !== `#${route}`) window.location.hash = route;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [route]);

  const handleNavigate = useCallback((nextRoute) => {
    setRoute(nextRoute);
  }, []);

  // A catalogue product gets its own page; plain #product still shows the CloudWalk showcase.
  const SharedPage = SHARED_PAGES[currentPage];
  const sharedPage = currentPage === 'product' && productId
    ? <ProductDetailPage key={productId} productId={productId} onNavigate={handleNavigate} />
    : SharedPage && <SharedPage onNavigate={handleNavigate} />;

  return (
    <div className="min-h-screen bg-[#FFFFFF] flex flex-col font-['Geist'] selection:bg-[#84BD3A] selection:text-[#1E3F20]">

      <Suspense fallback={<div className="min-h-screen" />}>
      {viewMode === 'desktop' ? (
        <div className="w-full">
          {currentPage === 'home' && <DesktopHomePage onNavigate={handleNavigate} />}
          {currentPage === 'shop' && <DesktopShopPage onNavigate={handleNavigate} />}
          {currentPage === 'men' && <DesktopMenShopPage onNavigate={handleNavigate} />}
          {currentPage === 'product' && !productId && <DesktopProductPage onNavigate={handleNavigate} />}
          {currentPage === 'about' && <DesktopAboutPage onNavigate={handleNavigate} />}
          {currentPage === 'contact' && <DesktopContactPage onNavigate={handleNavigate} />}
          {sharedPage && (
            <>
              <DesktopHeader currentPage={currentPage} onNavigate={handleNavigate} />
              {sharedPage}
              <DesktopFooter onNavigate={handleNavigate} />
            </>
          )}
        </div>
      ) : (
        <div className="w-full max-w-[430px] mx-auto min-h-screen bg-[#F7F9F6] shadow-2xl border-x border-[#E8EDDF] relative flex flex-col overflow-x-clip">
          {/* Mobile Header */}
          <Header currentPage={currentPage} onNavigate={handleNavigate} />

          <main className="flex-1 pb-16">
            {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
            {(currentPage === 'shop' || currentPage === 'men') && (
              <ShopPage gender={currentPage === 'men' ? 'men' : 'women'} onNavigate={handleNavigate} />
            )}
            {currentPage === 'product' && !productId && (
              <DemoPage onNavigate={handleNavigate} onSwitchToOriginal={() => handleNavigate('shop')} />
            )}
            {currentPage === 'about' && <AboutPage onNavigate={handleNavigate} />}
            {currentPage === 'contact' && <ContactPage onNavigate={handleNavigate} />}
            {sharedPage}
          </main>

          <Footer onNavigate={handleNavigate} />
          <BottomNav currentPage={currentPage} onNavigate={handleNavigate} />
        </div>
      )}
      </Suspense>

      {/* Global Slide-Over Shopping Cart Drawer */}
      <CartDrawer onNavigateToProduct={() => handleNavigate('product')} onViewCart={() => handleNavigate('cart')} />

      {/* Global "Added to Cart" Confirmation Modal (Figma Frame 308:5935) */}
      <AddedToCartModal onNavigateToCart={() => handleNavigate('cart')} />
    </div>
  );
};

export const App = () => {
  return (
    <AccountProvider>
      <CartProvider>
        <MainAppContent />
      </CartProvider>
    </AccountProvider>
  );
};

export default App;
