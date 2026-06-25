import React, { useState } from 'react';
import { PRODUCTS } from '../data';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { RouteState } from '../types';
import { ArrowLeft, Plus, Minus, ShoppingCart, Check, Compass, RefreshCw, Feather, Youtube, Play, Star } from 'lucide-react';

interface ProductDetailsProps {
  productId: string;
  onNavigate: (route: RouteState) => void;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ productId, onNavigate }) => {
  const { addToCart } = useCart();
  const { t, language } = useLanguage();
  const product = PRODUCTS.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="bg-[#FAF8F5] pt-32 pb-24 min-h-screen text-center space-y-4 font-sans">
        <h2 className="font-serif text-2xl font-bold text-[#1E3F20]">Product Harvest Not Found</h2>
        <button
          onClick={() => onNavigate({ page: 'shop' })}
          className="px-5 py-2.5 rounded-xl text-white bg-[#1E3F20] hover:bg-[#2e5230] transition-colors"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
  const selectedOption = product.options[selectedOptionIndex];
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    addToCart(product, selectedOption, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div id="product-detail-view" className="bg-[#FAF8F5] pt-32 pb-24 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back navigation button */}
        <button
          onClick={() => onNavigate({ page: 'shop' })}
          className="inline-flex items-center space-x-2 text-[#E1A46A] font-sans font-bold text-sm hover:text-[#1E3F20] transition-colors mb-8 cursor-pointer group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>{t('product.back')}</span>
        </button>

        {/* 2-Column Product presentation details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start text-left">
          
          {/* Left Column: ImageGallery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-square bg-white rounded-3xl overflow-hidden border border-neutral-100 shadow-md">
              <img
                src={product.images[activeImageIndex]}
                alt={language === 'bn' ? product.name_bn : product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-all"
              />
              
              <div className="absolute top-4 left-4 py-1.5 px-3 bg-[#1E3F20]/95 text-white font-mono text-xs font-bold uppercase rounded-lg shadow-sm">
                {language === 'bn' ? product.stockBadge_bn : product.stockBadge}
              </div>
            </div>

            {/* Thumbnail selectors */}
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative aspect-square rounded-2xl overflow-hidden bg-white border cursor-pointer focus:outline-none transition-all ${
                    activeImageIndex === idx
                      ? 'border-[#D4A373] ring-1 ring-[#D4A373]/30 scale-102'
                      : 'border-neutral-100 hover:border-neutral-300'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} gallery ${idx + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: ProductPurchasePanel */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-mono text-[#D4A373] font-bold uppercase tracking-widest block">
                {language === 'bn' ? product.categoryLabel_bn : product.categoryLabel}
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E3F20] leading-tight mt-1">
                {language === 'bn' ? product.name_bn : product.name}
              </h1>
              
              <p className="text-xs text-neutral-500 mt-1.5 flex items-center gap-1.5 font-light">
                <Compass size={14} className="text-[#D4A373]" />
                <span>{language === 'bn' ? 'মানিকগঞ্জ সিংগাইর খামারে ও ঐতিহ্যবাহী ঘানিতে প্রস্তুতকৃত' : 'Harvested & bottled on-site in Manikganj organic homestead'}</span>
              </p>
            </div>

            <p className="text-sm text-neutral-600 leading-relaxed font-light">
              {language === 'bn' ? product.description_bn : product.description}
            </p>

            {/* Weight selections */}
            <div className="space-y-3">
              <label className="block text-xs uppercase tracking-widest text-[#D4A373] font-mono font-bold">
                {t('product.size')}:
              </label>
              
              <div className="flex flex-wrap gap-2.5">
                {product.options.map((opt, idx) => (
                  <button
                    key={opt.label}
                    onClick={() => {
                      setSelectedOptionIndex(idx);
                      setActiveImageIndex(0);
                    }}
                    className={`px-4 py-3 rounded-2xl border font-sans text-xs sm:text-sm font-semibold transition-all flex flex-col text-left justify-center cursor-pointer min-w-[130px] ${
                      selectedOptionIndex === idx
                        ? 'bg-[#1E3F20]/5 text-[#1E3F20] border-[#1E3F20]'
                        : 'bg-white hover:bg-neutral-50 border-neutral-200/50 text-neutral-600'
                    }`}
                  >
                    <span className="font-serif font-bold text-sm">
                      {language === 'bn' ? opt.label_bn : opt.label}
                    </span>
                    <span className="font-mono text-xs text-[#D4A373] mt-0.5">৳ {opt.price}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Calculations and purchase parameters */}
            <div className="bg-white p-5 rounded-3xl border border-neutral-100 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-neutral-400 block font-mono uppercase">{language === 'bn' ? 'অর্ডার প্রদেয় মূল্য' : 'CALCULATED COST'}</span>
                  <span className="text-2xl font-black text-[#1E3F20]">
                    ৳ {selectedOption.price * quantity}
                  </span>
                </div>

                {/* Adjust Quantities */}
                <div className="flex items-center border border-neutral-200 rounded-2xl bg-neutral-50 overflow-hidden">
                  <button
                    onClick={handleDecrement}
                    className="p-3 text-neutral-500 hover:text-[#1E3F20] hover:bg-neutral-100 transition-colors cursor-pointer"
                  >
                    <Minus size={15} />
                  </button>
                  <span className="px-5 font-sans font-extrabold text-base text-neutral-800">
                    {quantity}
                  </span>
                  <button
                    onClick={handleIncrement}
                    className="p-3 text-neutral-500 hover:text-[#1E3F20] hover:bg-neutral-100 transition-colors cursor-pointer"
                  >
                    <Plus size={15} />
                  </button>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  id="btn-addto-cart-details"
                  onClick={handleAddToCart}
                  className={`flex-1 inline-flex items-center justify-center gap-2 py-4 px-6 rounded-2xl font-bold text-sm transition-all shadow-sm cursor-pointer select-none ${
                    isAdded
                      ? 'bg-[#D4A373] text-[#1E3F20]'
                      : 'bg-[#1E3F20] hover:bg-[#2c532e] text-white'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check size={18} className="stroke-[3]" />
                      <span>{t('product.added')}</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={18} />
                      <span>{t('product.addToCart')}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Specifications Highlights */}
            <div className="space-y-3 pt-4 border-t border-neutral-150">
              <h4 className="text-xs font-semibold text-[#D4A373] uppercase tracking-wider">{t('product.specs')}</h4>
              <ul className="text-xs text-neutral-600 space-y-2 font-light">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-700" />
                  <span>{t('product.origin')}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-700" />
                  <span>{t('product.purity')}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-700" />
                  <span>{language === 'bn' ? 'প্যাকেজিং: উচ্চমানের নিরাপদ কাঁচের জারে বা ফুড গ্রেড বোতলে সরবরাহ।' : 'Packaging: Shipped in premium thick glass jars with protective jute sacks.'}</span>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* VloggersNote handwritten notebook section */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Note book display */}
          <div className="lg:col-span-6 bg-[#FEFCF9] border-t-8 border-[#D4A373] border-l border-r border-b border-neutral-150 p-8 rounded-2xl relative shadow-sm text-left">
            <div className="absolute top-0 bottom-0 left-6 w-[1.5px] bg-rose-100 pointer-events-none"></div>

            <div className="pl-6 space-y-4">
              <div className="flex items-center space-x-2 text-[#D4A373]">
                <Feather size={18} />
                <span className="font-serif italic text-sm font-semibold">{language === 'bn' ? 'সরাসরি খামার ডায়েরি' : 'Vlogger’s Farm Diary'}</span>
              </div>
              
              <h3 className="font-serif text-xl font-bold text-[#1E3F20]">
                {t('product.vloggerNote')}
              </h3>
              
              <div className="space-y-3 font-serif italic text-sm text-neutral-700 leading-relaxed pl-1">
                <p>&ldquo;{language === 'bn' ? product.vloggerNote_bn : product.vloggerNote}&rdquo;</p>
              </div>
              
              <div className="pt-4 flex items-center space-x-2 text-xs font-mono text-neutral-400">
                <span>By Shakib & Family • Manikganj Sadar</span>
              </div>
            </div>
          </div>

          {/* YouTube Video link box if present */}
          {product.featuredInVlog && (
            <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-neutral-100 shadow-md space-y-4 text-left">
              <div className="flex items-center space-x-1.5 text-red-650 text-xs font-mono font-bold uppercase tracking-widest text-[#1E3F20]">
                <Youtube size={16} className="text-red-500" />
                <span>{t('product.vlogCoverage')}</span>
              </div>
              
              <h4 className="font-serif font-bold text-lg text-[#1E3F20]">
                {language === 'bn' ? product.featuredInVlog.title_bn : product.featuredInVlog.title}
              </h4>
              
              <p className="text-xs text-neutral-500 leading-relaxed font-light">
                {language === 'bn' ? product.featuredInVlog.description_bn : product.featuredInVlog.description}
              </p>

              <div className="relative aspect-video rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-150 group shadow-inner">
                <img
                  src={product.featuredInVlog.thumbnailUrl}
                  alt={product.featuredInVlog.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform group-hover:scale-103"
                />
                
                <div className="absolute inset-0 bg-black/35 flex items-center justify-center">
                  <a
                    href={product.featuredInVlog.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-[#CCFF66] text-[#1E3F20] flex items-center justify-center shadow-lg hover:scale-110 transition-all text-sm font-bold cursor-pointer"
                  >
                    <Play size={20} className="fill-[#1E3F20] ml-0.5 text-[#1E3F20]" />
                  </a>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
