import React, { useRef, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { RouteState } from '../types';
import { ShoppingBag, X, Plus, Minus, Trash2, ArrowRight, Sparkles } from 'lucide-react';

interface CartDrawerProps {
  onNavigate: (route: RouteState) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onNavigate }) => {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    cartTotal
  } = useCart();
  const { t, language } = useLanguage();
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsCartOpen(false);
      }
    };
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isCartOpen, setIsCartOpen]);

  if (!isCartOpen) return null;

  return (
    <div id="cart-drawer-overlay" className="fixed inset-0 z-[100] overflow-hidden" role="dialog" aria-modal="true">
      <div className="absolute inset-0 overflow-hidden">
        
        {/* Backdrop overlay */}
        <div 
          onClick={() => setIsCartOpen(false)}
          className="absolute inset-0 bg-[#1E3F20]/50 backdrop-blur-xs transition-opacity duration-300"
        />

        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
          <div 
            ref={drawerRef}
            className="pointer-events-auto w-screen max-w-md transform bg-[#FAF8F5] shadow-2xl border-l border-neutral-100 flex flex-col h-full font-sans"
          >
            {/* Header */}
            <div className="px-6 py-5 bg-[#1E3F20] text-white flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-2.5">
                <ShoppingBag size={21} className="text-[#D4A373]" />
                <h2 className="text-lg font-serif font-bold tracking-tight">
                  {t('cart.title')}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="rounded-full p-1.5 text-white/85 hover:text-white hover:bg-white/10 transition-colors focus:outline-none cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* List products */}
            <div className="flex-1 overflow-y-auto py-6 px-6 space-y-4">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                  <div className="w-16 h-16 rounded-full bg-[#1E3F20]/5 flex items-center justify-center text-[#1E3F20]/30 animate-pulse">
                    <ShoppingBag size={32} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-serif text-lg font-bold text-[#1E3F20]">
                      {language === 'bn' ? 'আপনার খাবার ঝুড়িটি খালি' : 'Your Basket is Clean'}
                    </h3>
                    <p className="text-xs text-neutral-500 max-w-xs font-light">
                      {language === 'bn' ? 'ডক্টরের পরামর্শে পুষ্টিকর অর্গানিক খাবার কিনে সুস্থ থাকুন।' : 'It looks like you have not added any natural crops yet.'}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      onNavigate({ page: 'shop' });
                    }}
                    className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#1E3F20] hover:bg-[#2c542e] transition-all cursor-pointer"
                  >
                    {language === 'bn' ? 'কেনাকাটা শুরু করুন' : 'Discover Sourced Foods'}
                  </button>
                </div>
              ) : (
                <div className="space-y-4 text-left">
                  {cartItems.map((item) => (
                    <div 
                      key={`${item.product.id}-${item.selectedOption.label}`}
                      className="flex items-start space-x-4 p-3.5 bg-white rounded-2xl border border-neutral-100 shadow-sm hover:border-[#1E3F20]/10 transition-all"
                    >
                      {/* Product Thumbnail */}
                      <img
                        src={item.product.imageUrl}
                        alt={language === 'bn' ? item.product.name_bn : item.product.name}
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 rounded-xl object-cover bg-neutral-50 flex-shrink-0"
                      />
                      
                      {/* Information */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="font-serif font-bold text-sm text-neutral-800 line-clamp-1">
                            {language === 'bn' ? item.product.name_bn : item.product.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.product.id, item.selectedOption.label)}
                            className="text-neutral-400 hover:text-rose-500 p-1 rounded-md hover:bg-rose-50 transition-colors flex-shrink-0 cursor-pointer"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>

                        <p className="font-mono text-xs text-[#D4A373] font-semibold mt-0.5">
                          {language === 'bn' ? item.selectedOption.label_bn : item.selectedOption.label}
                        </p>

                        <div className="flex items-center justify-between mt-3">
                          {/* Quantity Counter */}
                          <div className="flex items-center border border-neutral-200 rounded-xl bg-neutral-50 overflow-hidden">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.selectedOption.label, -1)}
                              className="px-2 py-1 text-neutral-400 hover:text-[#1E3F20] hover:bg-neutral-150 transition-colors focus:outline-none cursor-pointer"
                            >
                              <Minus size={13} />
                            </button>
                            <span className="px-2.5 font-sans font-extrabold text-xs text-neutral-800">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.selectedOption.label, 1)}
                              className="px-2 py-1 text-neutral-400 hover:text-[#1E3F20] hover:bg-neutral-150 transition-colors focus:outline-none cursor-pointer"
                            >
                              <Plus size={13} />
                            </button>
                          </div>

                          {/* Calculated price multiplier */}
                          <div className="text-right">
                            <p className="font-sans font-extrabold text-sm text-neutral-900">
                              ৳ {item.selectedOption.price * item.quantity}
                            </p>
                            <p className="text-[10px] text-neutral-400 font-mono font-medium">
                              {language === 'bn' ? `${item.selectedOption.price} ৳ প্রতি পিস` : `৳ ${item.selectedOption.price} each`}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Sticky Foot checkout actions */}
            {cartItems.length > 0 && (
              <div className="px-6 py-6 border-t border-neutral-100 bg-white shadow-xl space-y-4 text-left">
                <div className="flex items-center justify-between text-base font-serif font-bold text-neutral-700">
                  <span>{t('cart.subtotal')}</span>
                  <span className="text-[#1E3F20] text-xl font-bold">
                    ৳ {cartTotal}
                  </span>
                </div>
                
                {cartTotal < 2000 ? (
                  <p className="text-[11px] text-neutral-400 font-light text-center leading-normal">
                    {language === 'bn' ? 'অর্ডার খরচ ৳২০০০ এর বেশি হলে ফ্রী শিপিং পাবেন!' : 'Order ৳2000 or more to unlock free home shipping!'}
                  </p>
                ) : (
                  <div className="p-2.5 bg-emerald-50 rounded-xl text-[10px] font-semibold text-emerald-800 text-center flex items-center justify-center gap-1.5 border border-emerald-100">
                    <Sparkles size={14} className="text-emerald-700 animate-pulse" />
                    <span>{language === 'bn' ? 'সাবাশ! আপনি ফ্রী শিপিং আনলক করেছেন।' : 'Congratulations! Free delivery unlocked.'}</span>
                  </div>
                )}
                
                <div className="space-y-2">
                  <button
                    id="cart-btn-checkout"
                    onClick={() => {
                      setIsCartOpen(false);
                      onNavigate({ page: 'checkout' });
                    }}
                    className="flex w-full items-center justify-center gap-1.5 py-3.5 px-4 rounded-2xl font-bold text-sm text-white bg-[#1E3F20] hover:bg-[#2c542e] shadow-md transition-all cursor-pointer group"
                  >
                    <span>{t('cart.checkout')}</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="flex w-full items-center justify-center py-2 text-xs font-semibold text-neutral-500 hover:text-[#1E3F20] cursor-pointer"
                  >
                    {t('cart.continue')}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
