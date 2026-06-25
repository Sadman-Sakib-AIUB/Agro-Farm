import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { ActivePage, RouteState } from '../types';
import { ShoppingBag, ChevronRight, Menu, X, Youtube, Leaf, User, LogOut, Globe } from 'lucide-react';

interface NavbarProps {
  currentRoute: RouteState;
  onNavigate: (route: RouteState) => void;
  activeUser: string | null;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentRoute, onNavigate, activeUser, onLogout }) => {
  const { itemCount, setIsCartOpen } = useCart();
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navBg = 'bg-[#1E3F20]/95 backdrop-blur-md shadow-lg border-b border-[#D4A373]/15 py-3';

  const navLinks: { label: string; page: ActivePage }[] = [
    { label: language === 'bn' ? 'হোম' : 'Home', page: 'landing' },
    { label: language === 'bn' ? 'শপ' : 'Shop', page: 'shop' },
    { label: language === 'bn' ? 'কন্টাক্ট' : 'Contact Us', page: 'contact' },
    { label: language === 'bn' ? 'অ্যাডমিন প্যানেল' : 'Admin Panel', page: 'dashboard' },
  ];

  const logoTitleColor = 'text-white group-hover:text-[#D4A373]';
  const logoSubtitleColor = 'text-[#FDFBF7]/70';
  const isTransparent = false;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg} font-sans`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo with clean traditional typography */}
          <button
            onClick={() => {
              onNavigate({ page: 'landing' });
              setIsMobileMenuOpen(false);
            }}
            className="flex items-center space-x-2 text-left cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-full bg-[#D4A373] text-[#1E3F20] flex items-center justify-center font-bold text-xl shadow-md group-hover:scale-105 transition-transform duration-300">
              <Leaf size={20} className="stroke-[2.5]" />
            </div>
            <div>
              <span className={`block font-serif text-xl sm:text-2xl font-bold tracking-tight transition-colors duration-250 ${logoTitleColor}`}>
                {language === 'bn' ? 'দোয়েল এগ্রো' : 'Doyel Agro'}
              </span>
              <span className={`block text-[9px] uppercase tracking-widest -mt-1 font-mono transition-colors duration-250 ${logoSubtitleColor}`}>
                {language === 'bn' ? 'মানিকগঞ্জ খামার ঘর' : 'Manikganj Duplex Farm'}
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = currentRoute.page === link.page;
              return (
                <button
                  key={link.page}
                  onClick={() => onNavigate({ page: link.page })}
                  className={`font-sans font-medium text-sm transition-colors duration-250 cursor-pointer ${
                    isActive
                      ? 'text-[#CCFF66] border-b-2 border-[#CCFF66] pb-1 font-bold'
                      : 'text-white/80 hover:text-[#D4A373]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* Actions & Toggles */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            
            {/* Language Switcher Pill Switch */}
            <div className={`flex items-center p-0.5 rounded-full border text-xs transition-colors duration-250 ${
              isTransparent 
                ? 'bg-[#1E3F20]/5 border-neutral-300/60 text-[#1E3F20]' 
                : 'bg-white/10 border-white/10 text-white'
            }`}>
              <button
                onClick={() => setLanguage('bn')}
                className={`px-2.5 py-1 rounded-full transition-all duration-200 font-semibold cursor-pointer ${
                  language === 'bn' 
                    ? 'bg-[#D4A373] text-[#1E3F20] shadow-sm' 
                    : isTransparent 
                      ? 'hover:text-[#1E3F20] text-neutral-500' 
                      : 'hover:text-white/80 text-white/60'
                }`}
              >
                বাংলা
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 rounded-full transition-all duration-300 font-semibold cursor-pointer ${
                  language === 'en' 
                    ? 'bg-[#D4A373] text-[#1E3F20] shadow-sm' 
                    : isTransparent 
                      ? 'hover:text-[#1E3F20] text-neutral-500' 
                      : 'hover:text-white/80 text-white/60'
                }`}
              >
                EN
              </button>
            </div>

            {/* Auth Indicator (User Profile/Login button) */}
            <div className="hidden sm:flex items-center">
              {activeUser ? (
                <div id="nav-user-profile-badge" className={`flex items-center gap-2 pl-3 pr-1 py-1 rounded-full border transition-colors duration-250 ${
                  isTransparent ? 'bg-[#1E3F20]/5 border-neutral-300/60' : 'bg-white/5 border-white/5'
                }`}>
                  <span className={`text-xs font-semibold max-w-[100px] truncate ${
                    isTransparent ? 'text-[#1E3F20]' : 'text-neutral-200 hover:text-white'
                  }`}>
                    {activeUser}
                  </span>
                  <button
                    id="nav-logout-btn"
                    onClick={onLogout}
                    title={t('nav.logout')}
                    className="p-1.5 rounded-full text-rose-600 hover:text-rose-800 transition-all cursor-pointer"
                  >
                    <LogOut size={14} />
                  </button>
                </div>
              ) : (
                <button
                  id="nav-login-btn"
                  onClick={() => onNavigate({ page: 'auth' })}
                  className={`font-sans font-medium text-xs py-1.5 px-3.5 border rounded-full transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                    isTransparent
                      ? 'bg-[#1E3F20]/5 hover:bg-[#1E3F20]/10 border-neutral-300/60 text-[#1E3F20]'
                      : 'bg-white/10 hover:bg-white/20 border-white/10 text-white'
                  } ${currentRoute.page === 'auth' ? (isTransparent ? 'border-[#1E3F20] bg-white' : 'bg-[#D4A373]/20 border-[#D4A373]') : ''}`}
                >
                  <User size={13} className={isTransparent ? 'text-[#1E3F20]' : 'text-[#D4A373]'} />
                  <span>{t('nav.login')}</span>
                </button>
              )}
            </div>

            {/* Cart Trigger Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full bg-[#D4A373] text-[#1E3F20] hover:bg-[#c49363] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer focus:outline-none"
              id="desktop-cart-toggle"
            >
              <ShoppingBag size={18} className="stroke-[2.5]" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-white text-[#1E3F20] font-sans font-semibold text-[10px] flex items-center justify-center shadow-sm">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Action Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 rounded-full transition-colors duration-250 cursor-pointer ${
                isTransparent 
                  ? 'bg-neutral-150 text-[#1E3F20] hover:bg-neutral-200/80' 
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div id="mobile-navigation-drawer" className="md:hidden bg-[#1E3F20] border-t border-[#D4A373]/10 px-4 py-6 space-y-4 shadow-xl font-sans">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => {
                  onNavigate({ page: link.page });
                  setIsMobileMenuOpen(false);
                }}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-left font-medium ${
                  currentRoute.page === link.page
                    ? 'bg-[#D4A373]/10 text-[#D4A373]'
                    : 'text-white/80 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span>{link.label}</span>
                <ChevronRight size={16} />
              </button>
            ))}

            {/* Mobile Auth Indicator */}
            <div className="px-4 py-3 rounded-xl border border-white/5 bg-white/5 flex items-center justify-between">
              {activeUser ? (
                <>
                  <div className="flex items-center gap-2">
                    <User size={16} className="text-[#D4A373]" />
                    <span className="text-sm text-neutral-200 font-semibold truncate max-w-[150px]">{activeUser}</span>
                  </div>
                  <button
                    onClick={() => {
                      onLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-1 text-xs text-rose-300 font-semibold hover:text-rose-400"
                  >
                    <LogOut size={14} />
                    <span>{t('nav.logout')}</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    onNavigate({ page: 'auth' });
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 text-sm text-white hover:text-[#D4A373] w-full"
                >
                  <User size={16} className="text-[#D4A373]" />
                  <span>{t('nav.login')}</span>
                </button>
              )}
            </div>
            
            <div className="h-[1px] bg-white/10 my-2"></div>
            
            {/* Quick Watch story */}
            <button
              onClick={() => {
                onNavigate({ page: 'landing' });
                setIsMobileMenuOpen(false);
                setTimeout(() => {
                  const el = document.getElementById('vlog-vloggers-story');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }, 300);
              }}
              className="flex items-center justify-center space-x-2 w-full py-3 px-4 rounded-xl text-sm font-semibold bg-[#D4A373] text-[#1E3F20] hover:bg-[#c49363] transition-colors duration-200"
            >
              <Youtube size={16} />
              <span>{language === 'bn' ? 'ইউটিউব খামার ভ্লগ' : 'Watch Farm Vlogs'}</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
