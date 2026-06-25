import React, { useState } from 'react';
import { PRODUCTS } from '../data';
import { Product, RouteState } from '../types';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { ShoppingCart, Leaf, Compass, Check, Sparkles, ArrowRight } from 'lucide-react';

interface ProductCatalogProps {
  onNavigate: (route: RouteState) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({ onNavigate }) => {
  const { addToCart } = useCart();
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<'all' | 'ghee-oils' | 'honey-sweets' | 'spices'>('all');
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const categories: { labelKey: string; value: 'all' | 'ghee-oils' | 'honey-sweets' | 'spices' }[] = [
    { labelKey: 'shop.category.all', value: 'all' },
    { labelKey: 'shop.category.ghee-oils', value: 'ghee-oils' },
    { labelKey: 'shop.category.honey-sweets', value: 'honey-sweets' },
    { labelKey: 'shop.category.spices', value: 'spices' },
  ];

  const filteredProducts = activeCategory === 'all'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === activeCategory);

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation(); 
    const defaultOption = product.options[0];
    addToCart(product, defaultOption, 1);
    
    setJustAddedId(`${product.id}-${defaultOption.label}`);
    setTimeout(() => setJustAddedId(null), 2000);
  };

  return (
    <div id="product-catalog-store" className="relative bg-gradient-to-br from-[#FFF5EC] via-[#FAF8F5] to-[#E9F0EB] pt-32 pb-24 min-h-screen font-sans overflow-hidden">
      
      {/* Soft elegant sunrise blur decorators matching the hero */}
      <div className="absolute top-[10%] right-[-10%] w-[450px] h-[450px] rounded-full bg-amber-200/40 blur-[130px] pointer-events-none" />
      <div className="absolute top-[35%] left-[-10%] w-[380px] h-[380px] rounded-full bg-emerald-100/50 blur-[110px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-amber-100/30 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
        
        {/* Page title header styled after the hero */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-[#D4A373] font-bold flex items-center justify-center gap-1.5">
            <Leaf size={13} className="text-emerald-700" />
            <span>{language === 'bn' ? 'মানিকগঞ্জের সরাসরি খামার পণ্য' : 'DIRECT HARVEST IN STOCK'}</span>
          </span>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-sans tracking-tight leading-[1.08] text-neutral-900 font-extrabold mt-2.5">
            {language === 'bn' ? (
              <>
                আমাদের সেরা <span className="font-serif italic font-normal text-[#1E3F20] tracking-normal">অর্গানিক পণ্যসমূহ</span>
              </>
            ) : (
              <>
                Our Sourced <span className="font-serif italic font-normal text-[#1E3F20] tracking-normal">Organic Goods</span>
              </>
            )}
          </h1>
          
          <p className="text-sm text-neutral-600 mt-4 font-light leading-relaxed">
            {t('shop.subtitle')}
          </p>
        </div>

        {/* CategoryFilter Horizontal pill row */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-5 py-2.5 rounded-full font-sans text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer focus:outline-none border shadow-xs ${
                activeCategory === cat.value
                  ? 'bg-[#1E3F20] text-[#CCFF66] border-[#1E3F20] scale-102 shadow-md font-bold'
                  : 'bg-white/90 text-neutral-600 border-neutral-200/80 hover:border-emerald-700/30 hover:text-[#1E3F20]'
              }`}
            >
              {t(cat.labelKey)}
            </button>
          ))}
        </div>

        {/* ProductGrid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-neutral-400 font-serif text-lg">{t('shop.results.none')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => {
              const defaultOption = product.options[0];
              const isAdded = justAddedId === `${product.id}-${defaultOption.label}`;
              
              return (
                <div
                  key={product.id}
                  onClick={() => onNavigate({ page: 'product-details', productId: product.id })}
                  className="bg-white/90 backdrop-blur-md rounded-[32px] overflow-hidden border border-neutral-250/60 shadow-md hover:shadow-2xl hover:-translate-y-2 cursor-pointer transition-all duration-300 flex flex-col justify-between group"
                >
                  {/* Card Image segment */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-neutral-50 flex-shrink-0">
                    <img
                      src={product.imageUrl}
                      alt={language === 'bn' ? product.name_bn : product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-104"
                    />

                    {/* Stock badge matching the hero banner layout */}
                    <div className="absolute top-3 left-3 py-1 px-2.5 bg-[#1E3F20]/90 text-[#CCFF66] border border-[#D4A373]/10 font-mono text-[9px] font-bold uppercase rounded-lg shadow-sm">
                      {language === 'bn' ? product.stockBadge_bn : product.stockBadge}
                    </div>

                    {/* Category Label Overlay */}
                    <div className="absolute bottom-3 right-3 py-1 px-2.5 bg-white/95 text-[#1E3F20] font-sans text-[10px] font-extrabold rounded-md shadow-sm">
                      {language === 'bn' ? product.categoryLabel_bn : product.categoryLabel}
                    </div>
                  </div>

                  {/* Card Details segment */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="font-serif font-bold text-xl text-neutral-800 line-clamp-1 group-hover:text-[#1E3F20] transition-colors">
                        {language === 'bn' ? product.name_bn : product.name}
                      </h3>
                      
                      {/* Short Origin Note */}
                      <p className="text-xs text-[#D4A373] font-mono mt-1 flex items-center gap-1.5">
                        <Compass size={12} />
                        <span>{language === 'bn' ? 'মানিকগঞ্জ সদর খামারে উৎপাদিত' : 'Harvested on-site at Manikganj'}</span>
                      </p>

                      <p className="text-sm text-neutral-500 leading-relaxed font-light mt-3 line-clamp-2">
                        {language === 'bn' ? product.shortDescription_bn : product.shortDescription}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-neutral-100 flex items-center justify-between gap-4">
                      {/* Pricing block */}
                      <div>
                        <span className="text-[9px] text-neutral-400 font-mono block uppercase">
                          {product.options.length > 1 
                            ? (language === 'bn' ? `মূল্য (${defaultOption.label_bn})` : `Starting (${defaultOption.label})`) 
                            : (language === 'bn' ? 'অর্গানিক মূল্য' : 'Base Price')
                          }
                        </span>
                        <span className="text-xl font-bold text-[#1E3F20]">
                          ৳ {defaultOption.price}
                        </span>
                      </div>

                      {/* Buy Action trigger */}
                      <button
                        onClick={(e) => handleAddToCart(e, product)}
                        className={`inline-flex items-center gap-1.5 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold shadow-xs select-none cursor-pointer transition-all duration-200 ${
                          isAdded
                            ? 'bg-[#D4A373] text-[#1E3F20] font-bold'
                            : 'bg-[#CCFF66] hover:bg-[#b0f04c] text-[#1E3F20] hover:scale-102'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check size={14} className="stroke-[3]" />
                            <span>{t('product.added')}</span>
                          </>
                        ) : (
                          <>
                            <ShoppingCart size={14} />
                            <span>{t('product.addToCart')}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Farmer Promise Seal block */}
        <div className="mt-20 bg-[#1E3F20] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-lg border border-[#D4A373]/20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#D4A373]/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10 text-left">
            <div className="lg:col-span-8 space-y-4">
              <span className="font-mono text-xs text-[#D4A373] font-bold uppercase tracking-widest flex items-center gap-1">
                <Sparkles size={12} />
                <span>{language === 'bn' ? '১০০% ভেজালমুক্ত খাদ্যের নিশ্চয়তা' : 'OUR 100% ANTI-ADULTERATION CHARTER'}</span>
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
                {language === 'bn' 
                  ? 'নিখাদ কাঠের ঘানি ভাঙা তেল ও মধু, সরাসরি খামার থেকেই গ্রাহকের কাছে' 
                  : 'Authentic, Unadulterated country food, delivered direct'}
              </h2>
              <p className="text-white/80 text-sm font-sans max-w-2xl leading-relaxed font-light">
                {language === 'bn' 
                  ? 'বাজারে ভেজাল তেলের ছড়াছড়ি ও চিনি মিশ্রিত মধুর ভিড়ে আমরা নিয়ে এসেছি সম্পূর্ণ নিশ্চয়তা। আমাদের প্রতিটি ড্রয়িং বা মধু কাটার দৃশ্য ইউটিউব ভিডিও ব্লগে নিয়মিত লাইভ দেখানো হয়। আপনার বিশ্বস্ত সঙ্গী দোয়েল এগ্রো।' 
                  : 'We know the market is filled with fake mustard oil, sugar-infused honey, and fat-mixed ghee. That is why we film our exact day-to-day harvesting. Everything shipped leaves our Manikganj farmstead directly, packed with clean premium glass packing.'}
              </p>
            </div>
            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col space-y-3 w-full sm:max-w-xs">
                <div className="font-semibold text-[#D4A373] text-sm font-serif">{language === 'bn' ? 'ফোনে সরাসরি অর্ডার করুন' : 'Quick Farm Help Line'}</div>
                <div className="text-white text-base font-mono font-bold">+880 1712-345678</div>
                <div className="text-xs text-white/60 font-sans leading-snug">
                  {language === 'bn' ? 'যেকোনো প্রশ্নে সরাসরি আমাদের খামার ঘরে কল করুন। ঢাকার ভিতরে ২৪-৪৮ ঘণ্টায় ক্যাশ অন ডেলিভারি পাবেন।' : 'Call us directly if you prefer standard cash-on-delivery. We speak Bengali/English!'}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
