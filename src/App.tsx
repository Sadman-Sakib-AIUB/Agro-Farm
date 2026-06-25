import React, { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { LanguageProvider } from './context/LanguageContext';
import { RouteState, OrderDetails } from './types';
import { Navbar } from './components/Navbar';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { LandingPage } from './components/LandingPage';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductDetails } from './components/ProductDetails';
import { Checkout } from './components/Checkout';
import { OrderConfirmation } from './components/OrderConfirmation';
import { ContactPage } from './components/ContactPage';
import { AuthPage } from './components/AuthPage';
import { AdminDashboard } from './components/AdminDashboard';

export default function App() {
  const [routeState, setRouteState] = useState<RouteState>({ page: 'landing' });
  const [lastOrder, setLastOrder] = useState<OrderDetails | null>(null);
  const [activeUser, setActiveUser] = useState<string | null>(() => {
    return localStorage.getItem('doyel_active_user');
  });

  const handleLogout = () => {
    localStorage.removeItem('doyel_active_user');
    setActiveUser(null);
    navigateTo({ page: 'landing' });
  };

  // Synchronize routing state with URL Hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      
      if (!hash) {
        setRouteState({ page: 'landing' });
        return;
      }
      
      if (hash.startsWith('product/')) {
        const productId = hash.split('product/')[1];
        setRouteState({ page: 'product-details', productId });
      } else if (hash === 'shop') {
        setRouteState({ page: 'shop' });
      } else if (hash === 'checkout') {
        setRouteState({ page: 'checkout' });
      } else if (hash === 'contact') {
        setRouteState({ page: 'contact' });
      } else if (hash === 'auth') {
        setRouteState({ page: 'auth' });
      } else if (hash === 'dashboard') {
        setRouteState({ page: 'dashboard' });
      } else if (hash.startsWith('confirmation/')) {
        const orderId = hash.split('confirmation/')[1];
        setRouteState({ page: 'confirmation', orderId });
      } else {
        setRouteState({ page: 'landing' });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    // Trigger on mount
    handleHashChange();
    
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (route: RouteState) => {
    let hash = '';
    
    if (route.page === 'landing') {
      hash = '';
    } else if (route.page === 'shop') {
      hash = 'shop';
    } else if (route.page === 'contact') {
      hash = 'contact';
    } else if (route.page === 'checkout') {
      hash = 'checkout';
    } else if (route.page === 'auth') {
      hash = 'auth';
    } else if (route.page === 'dashboard') {
      hash = 'dashboard';
    } else if (route.page === 'product-details' && route.productId) {
      hash = `product/${route.productId}`;
    } else if (route.page === 'confirmation' && route.orderId) {
      hash = `confirmation/${route.orderId}`;
    }

    // Set URL hash which triggers the event listener and sets route state
    window.location.hash = hash;
    setRouteState(route);
    window.scrollTo({ top: 0 });
  };

  const renderActivePage = () => {
    switch (routeState.page) {
      case 'landing':
        return <LandingPage onNavigate={navigateTo} />;
      case 'shop':
        return <ProductCatalog onNavigate={navigateTo} />;
      case 'product-details':
        return <ProductDetails productId={routeState.productId || ''} onNavigate={navigateTo} />;
      case 'checkout':
        return <Checkout onNavigate={navigateTo} onSetLastOrder={setLastOrder} />;
      case 'confirmation':
        return <OrderConfirmation orderId={routeState.orderId || ''} lastOrder={lastOrder} onNavigate={navigateTo} />;
      case 'contact':
        return <ContactPage onNavigate={navigateTo} />;
      case 'auth':
        return (
          <AuthPage
            onNavigate={navigateTo}
            onLoginSuccess={(username) => {
              setActiveUser(username);
              localStorage.setItem('doyel_active_user', username);
              navigateTo({ page: 'landing' });
            }}
          />
        );
      case 'dashboard':
        return <AdminDashboard onNavigate={navigateTo} />;
      default:
        return <LandingPage onNavigate={navigateTo} />;
    }
  };

  return (
    <LanguageProvider>
      <CartProvider>
        <div className="min-h-screen flex flex-col bg-[#FDFBF7] font-sans antialiased text-[#2C3E2B]">
          {/* Navigation Head */}
          {routeState.page !== 'dashboard' && (
            <Navbar
              currentRoute={routeState}
              onNavigate={navigateTo}
              activeUser={activeUser}
              onLogout={handleLogout}
            />
          )}

          {/* Dynamic Screen Viewport Router */}
          <main className="flex-grow">
            {renderActivePage()}
          </main>

          {/* Sliding Shopping Drawer */}
          <CartDrawer onNavigate={navigateTo} />

          {/* Brand footer */}
          {routeState.page !== 'dashboard' && <Footer onNavigate={navigateTo} />}
        </div>
      </CartProvider>
    </LanguageProvider>
  );
}
