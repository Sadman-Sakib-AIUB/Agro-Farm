import React, { useState } from 'react';
import { PRODUCTS } from '../data';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { Product, RouteState } from '../types';
import { Play, ArrowRight, Compass, Youtube, Star, Flame, Clock, Sprout, ArrowUpRight } from 'lucide-react';

interface LandingPageProps {
  onNavigate: (route: RouteState) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const { addToCart } = useCart();
  const { t, language } = useLanguage();
  const [isPlayingVlog, setIsPlayingVlog] = useState(false);

  // Top 4 products for featured section
  const featuredProducts = PRODUCTS.slice(0, 4);
  
  // Featured product in the vlog spotlight
  const vlogProduct = PRODUCTS.find((p) => p.id === 'mustard-oil') || PRODUCTS[0];

  return (
    <div className="bg-[#FAF8F5] text-neutral-900 font-sans">
      
      {/* 1. Dribbble-Style Hero Section (Matched to requested image aesthetic) */}
      <section id="hero-showcase-section" className="relative min-h-[90vh] lg:min-h-screen flex items-center bg-gradient-to-br from-[#FFF5EC] via-[#FAF8F5] to-[#E9F0EB] pb-16 pt-24 lg:pt-32 overflow-hidden px-4 sm:px-6 lg:px-8">
        
        {/* Soft elegant sunrise blur decorators */}
        <div className="absolute top-[10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-amber-200/40 blur-[130px] pointer-events-none" />
        <div className="absolute bottom-[5%] left-[-5%] w-[40%] h-[40%] rounded-full bg-emerald-100/50 blur-[110px] pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left Text Detail */}
          <div className="lg:col-span-6 space-y-6 lg:pr-6 text-left">
            
            {/* Green Badge pill */}
            <div id="hero-badge-pill" className="inline-flex items-center gap-2 px-3 py-1 bg-[#E8F3EA] text-[#1E3F20] rounded-full text-xs font-semibold tracking-wide border border-emerald-200/50">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
              <span>{t('hero.badge')}</span>
            </div>

            {/* Giant elegant typography with stylized italics */}
            <h1 id="hero-headline" className="text-5xl sm:text-6xl lg:text-7xl font-sans tracking-tight leading-[1.05] text-neutral-900 font-extrabold">
              {language === 'bn' ? (
                <>
                  মনমুগ্ধকর <br />
                  <span className="font-serif italic font-normal text-[#1E3F20] tracking-normal">খাঁটি খাদ্য সম্ভার।</span>
                </>
              ) : (
                <>
                  Agricultural <br />
                  <span className="font-serif italic font-normal text-[#1E3F20] tracking-normal">Solutions.</span>
                </>
              )}
            </h1>

            {/* Subtext description */}
            <p id="hero-description" className="text-base sm:text-lg text-neutral-600 max-w-xl leading-relaxed font-light">
              {t('hero.title.sub')}
            </p>

            {/* Main call-to-actions matching the reference image capsules */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-4">
              <button
                id="hero-btn-start"
                onClick={() => onNavigate({ page: 'shop' })}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-[#1E3F20] bg-[#CCFF66] hover:bg-[#b0f04c] active:scale-95 transition-all shadow-md group cursor-pointer"
              >
                <span>{t('hero.btn.start')}</span>
                <span className="bg-[#1E3F20] text-[#CCFF66] p-1 rounded-full group-hover:rotate-45 transition-transform duration-300">
                  <ArrowUpRight size={12} className="stroke-[3]" />
                </span>
              </button>
              
              <button
                id="hero-btn-vlog-scroll"
                onClick={() => {
                  const element = document.getElementById('vlog-vloggers-story');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-neutral-800 bg-white hover:bg-neutral-100 border border-neutral-200 shadow-sm cursor-pointer"
              >
                <span>{t('hero.btn.vlog')}</span>
                <span className="bg-neutral-800 text-white p-1 rounded-full">
                  <ArrowUpRight size={12} />
                </span>
              </button>
            </div>

          </div>

          {/* Right Image Composition (Exactly replicating the custom banner style with overlay card) */}
          <div className="lg:col-span-6 relative flex justify-center">
            
            {/* The main picture block: Warm, gorgeous golden farmers sunrise scene */}
            <div className="relative w-full aspect-[4/3] rounded-[36px] overflow-hidden shadow-2xl border-4 border-white bg-neutral-200">
              <img
                src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=1400"
                alt="Doyel Agro Manikganj Farmers working proudly"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              
              {/* Golden morning overlay filter */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E3F20]/20 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Overlap Showcase Card (Exactly matches the floating crop card on bottom right of the image mock) */}
            <div id="hero-floating-crop-card" className="absolute bottom-[-24px] right-[4%] max-w-[280px] sm:max-w-[340px] bg-white p-3 rounded-2xl shadow-xl border border-neutral-100/90 flex flex-col gap-2.5 transition-transform duration-300 hover:scale-105">
              
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-neutral-100">
                <img
                  src="https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&q=80&w=600"
                  alt="Spotlight pure crop extract"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                
                {/* Micro capsule tag */}
                <button 
                  onClick={() => onNavigate({ page: 'product-details', productId: 'mustard-oil' })}
                  className="absolute top-2 right-2 w-7 h-7 rounded-full bg-[#CCFF66] text-[#1E3F20] flex items-center justify-center font-bold shadow-md hover:scale-110 active:scale-95 transition-all cursor-pointer"
                >
                  <ArrowUpRight size={14} className="stroke-[2.5]" />
                </button>
              </div>

              <div className="px-1 text-left">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#D4A373]">
                  {t('hero.showcase.label')}
                </span>
                <p className="text-xs text-neutral-600 font-light leading-relaxed mt-0.5">
                  {t('hero.showcase.desc')}
                </p>
              </div>
            </div>

          </div>

        </div>

      </section>


      {/* 2. Trusted Partners Grayscale Ribbon (Matched to mockup bottom section) */}
      <section id="partners-ribbon" className="bg-white py-12 px-4 border-b border-neutral-100 relative z-20">
        <div className="max-w-7xl mx-auto text-center space-y-6">
          <p className="text-xs font-semibold text-neutral-400 uppercase tracking-widest">
            {t('partners.title')}
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-60">
            <div className="flex items-center gap-2 text-sm font-semibold tracking-wider text-neutral-800">
              <Sprout className="w-4 h-4 text-emerald-700" />
              <span>Manikganj Co.</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold tracking-wider text-neutral-800">
              <Sprout className="w-4 h-4 text-emerald-700" />
              <span>SorishaGhor Ltd.</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold tracking-wider text-neutral-800">
              <Sprout className="w-4 h-4 text-emerald-700" />
              <span>Shuddho Sourcing</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold tracking-wider text-neutral-800">
              <Sprout className="w-4 h-4 text-[#D4A373]" />
              <span>Dost Agro</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold tracking-wider text-neutral-800">
              <Sprout className="w-4 h-4 text-emerald-700" />
              <span>PureFood BD</span>
            </div>
          </div>
        </div>
      </section>


      {/* 3. The Inline Image Sentence Block (Highly sophisticated visual design from reference) */}
      <section id="inline-image-sentence" className="py-24 bg-white px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          
          {/* Green highlight tag badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#1E3F20] text-white rounded-full text-xs font-semibold tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF66] animate-pulse" />
            <span>{t('sentence.badge')}</span>
          </div>

          {/* Elegant sentence with nested inline images and rounded borders */}
          <h2 id="sentence-highlight-text" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-neutral-900 leading-snug sm:leading-snug md:leading-tight lg:leading-[1.15] tracking-tight">
            {t('sentence.part1')}
            <span className="inline-block h-8 w-16 sm:h-11 sm:w-24 rounded-full overflow-hidden align-middle mx-1.5 sm:mx-2 border border-emerald-800/10 shadow-sm bg-neutral-100">
              <img
                src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=400"
                alt="Green plants inline display"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </span>
            {t('sentence.part2')}
            <span className="inline-block h-8 w-16 sm:h-11 sm:w-24 rounded-full overflow-hidden align-middle mx-1.5 sm:mx-2 border border-emerald-800/10 shadow-sm bg-neutral-150">
              <img
                src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=400"
                alt="Dried seeds spices inline display"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </span>
            {t('sentence.part3')}
            <span className="inline-block h-8 w-16 sm:h-11 sm:w-24 rounded-full overflow-hidden align-middle mx-1.5 sm:mx-2 border border-emerald-800/10 shadow-sm bg-neutral-100">
              <img
                src="https://images.unsplash.com/photo-1631515223380-7f21a93e71c6?auto=format&fit=crop&q=80&w=400"
                alt="Farm ground fresh display"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </span>
            {t('sentence.part4')}
          </h2>

          {/* Simple outline capsules underneath */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-4">
            <button className="px-4 py-2 text-xs font-semibold text-neutral-600 bg-neutral-50 hover:bg-neutral-100 hover:text-[#1E3F20] rounded-full border border-neutral-200/60 transition-all">
              {t('sentence.btn.smart')}
            </button>
            <button className="px-4 py-2 text-xs font-semibold text-neutral-600 bg-neutral-50 hover:bg-neutral-100 hover:text-[#1E3F20] rounded-full border border-neutral-200/60 transition-all">
              {t('sentence.btn.growth')}
            </button>
            <button className="px-4 py-2 text-xs font-semibold text-neutral-600 bg-neutral-50 hover:bg-neutral-100 hover:text-[#1E3F20] rounded-full border border-neutral-200/60 transition-all">
              {t('sentence.btn.agri')}
            </button>
            <button className="px-4 py-2 text-xs font-semibold text-neutral-600 bg-neutral-50 hover:bg-neutral-100 hover:text-[#1E3F20] rounded-full border border-neutral-200/60 transition-all">
              {t('sentence.btn.harvest')}
            </button>
          </div>

        </div>
      </section>


      {/* 4. Live Farm Vlog Section with YouTube player */}
      <section id="vlog-vloggers-story" className="py-24 bg-neutral-50 border-t border-b border-neutral-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-mono text-xs uppercase tracking-widest text-[#D4A373] font-bold">
              {language === 'bn' ? 'শতভাগ স্বচ্ছতা' : '100% Honest Production'}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E3F20] tracking-tight mt-1.5">
              {language === 'bn' ? 'সরাসরি আমাদের খামারের ভিডিও ব্লগ' : 'Watch Our Daily Farm Story on YouTube'}
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base mt-2 font-light">
              {language === 'bn' 
                ? 'আমরা কোনো কিছু লুকিয়ে রাখি না। সরিষা বীজ প্রস্তুত করা থেকে শুরু করে মাটির হাঁড়িতে ঘি জ্বাল দেওয়া পর্যন্ত সবকিছু নিজে দেখুন।' 
                : 'We believe zero chemicals demand absolute transparency. Watch our fresh extractions recorded live in our farmyard.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Custom Mock Video Player Frame */}
            <div className="lg:col-span-7">
              <div className="relative aspect-video rounded-3xl overflow-hidden bg-neutral-900 shadow-xl border border-neutral-200/80 group">
                {!isPlayingVlog ? (
                  <>
                    <img
                      src={vlogProduct.featuredInVlog?.thumbnailUrl}
                      alt="Vlog video presentation thumbnail"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                    />
                    <div className="absolute inset-0 bg-black/45 flex flex-col justify-between p-6">
                      
                      <div className="flex items-center space-x-2 bg-red-650/90 text-white font-semibold text-xs px-3 py-1 rounded-full w-max bg-red-600">
                        <Youtube size={14} />
                        <span>{language === 'bn' ? 'ইউটিউব লাইভ ভ্লগ' : 'RECENT HARVEST VLOG'}</span>
                      </div>
                      
                      <div className="space-y-4">
                        <button
                          id="btn-play-video-vlog"
                          onClick={() => setIsPlayingVlog(true)}
                          className="w-16 h-16 rounded-full bg-[#CCFF66] hover:bg-[#b0f04c] text-[#1E3F20] flex items-center justify-center mx-auto shadow-xl hover:scale-[1.08] duration-200 cursor-pointer focus:outline-none"
                        >
                          <Play size={24} className="fill-[#1E3F20] ml-1 text-[#1E3F20]" />
                        </button>
                        
                        <div className="text-center">
                          <h3 className="font-serif text-lg sm:text-xl font-bold text-white leading-tight">
                            {language === 'bn' ? vlogProduct.featuredInVlog?.title_bn : vlogProduct.featuredInVlog?.title}
                          </h3>
                          <p className="text-xs text-white/85 font-sans mt-1.5 max-w-md mx-auto line-clamp-1 font-light">
                            {language === 'bn' ? vlogProduct.featuredInVlog?.description_bn : vlogProduct.featuredInVlog?.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-between items-center text-[10px] text-white/70 font-mono tracking-wider">
                        <span className="flex items-center space-x-1">
                          <Clock size={11} />
                          <span>18:24 mins</span>
                        </span>
                        <span>4.8k views this week</span>
                      </div>
                      
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full relative">
                    <iframe
                      src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                      title="Doyel Agro YouTube Farm Vlog Player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full border-0 absolute top-0 left-0"
                    ></iframe>
                    <button
                      onClick={() => setIsPlayingVlog(false)}
                      className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-lg bg-black hover:bg-neutral-950 text-white font-sans text-xs font-semibold cursor-pointer"
                    >
                      {language === 'bn' ? 'ভিডিও বন্ধ করুন' : 'Close Player'}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Detailed spotlight cards */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-100 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 py-1.5 px-4 bg-[#D4A373] text-[#1E3F20] font-mono text-[9px] font-bold uppercase tracking-wider rounded-bl-2xl flex items-center space-x-1 select-none">
                  <Flame size={12} />
                  <span>{t('product.vlogVerified')}</span>
                </div>
                
                <span className="text-xs font-mono text-[#D4A373] font-bold uppercase tracking-widest block">
                  {t('product.vloggerNote')}
                </span>
                
                <h3 className="font-serif text-2xl font-bold text-[#1E3F20] mt-1.5">
                  {language === 'bn' ? vlogProduct.name_bn : vlogProduct.name}
                </h3>
                
                <p className="text-xs font-sans text-neutral-500 mt-1 flex items-center gap-1.5">
                  <Compass size={12} className="text-neutral-400" />
                  <span>{language === 'bn' ? 'মানিকগঞ্জ খামার থেকে সরাসরি সংগৃহীত' : 'Sourced direct from Manikganj countryside'}</span>
                </p>

                <p className="text-sm text-neutral-600 mt-4 leading-relaxed font-light">
                  {language === 'bn' ? vlogProduct.vloggerNote_bn : vlogProduct.vloggerNote}
                </p>

                {/* Star Rating decoration */}
                <div className="flex items-center space-x-1 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-[#D4A373] text-[#D4A373]" />
                  ))}
                  <span className="text-xs font-semibold text-neutral-500 ml-2">(48 {language === 'bn' ? 'টি অর্গানিক রিভিউ' : 'reviews'})</span>
                </div>

                <div className="mt-6 pt-5 border-t border-neutral-100 flex items-center justify-between">
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-neutral-400 font-mono">{language === 'bn' ? 'অর্ডার প্রারম্ভিক মূল্য' : 'BATCH PRICE STARTING AT'}</span>
                    <span className="text-2xl font-semibold text-[#1E3F20]">৳ {vlogProduct.price}</span>
                  </div>
                  
                  <button
                    onClick={() => onNavigate({ page: 'product-details', productId: vlogProduct.id })}
                    className="inline-flex items-center justify-center gap-1 px-5 py-3 rounded-2xl text-xs font-bold text-[#1E3F20] bg-[#CCFF66] hover:bg-[#b0f04c] hover:scale-[1.01] active:scale-95 transition-all cursor-pointer shadow-sm"
                  >
                    <span>{language === 'bn' ? 'পণ্য বিস্তারিত দেখুন' : 'Buy Clean Oils'}</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* 5. Weekly Fresh Crops in stock / Product grid section */}
      <section id="weekly-fresh-grid" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-baseline justify-between mb-12 text-left">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#D4A373] font-bold">
              {language === 'bn' ? 'তাজা সংগৃহীত পণ্য সামগ্রী' : 'This Week\'s Fresh Harvest'}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E3F20] tracking-tight mt-1.5">
              {language === 'bn' ? 'চলতি সপ্তাহের ফ্রেশ স্টক' : 'Freshly Prepared Farm Goods'}
            </h2>
            <p className="text-neutral-500 text-sm mt-1 max-w-md font-light">
              {language === 'bn' 
                ? 'আমাদের মানিকগঞ্জের খামারে প্রস্তুতকৃত সেরা সেরা পণ্যগুলো বেছে নিয়ে স্টক সীমাবদ্ধ হওয়ার আগে অর্ডার চূড়ান্ত করুন।' 
                : 'Check out these premium top-performing farm goodies currently in stock. Hand-packaged with extreme love.'}
            </p>
          </div>
          <button
            onClick={() => onNavigate({ page: 'shop' })}
            className="group inline-flex items-center gap-1.5 text-[#1E3F20] hover:text-[#D4A373] font-semibold text-sm transition-colors mt-4 md:mt-0 cursor-pointer"
          >
            <span>{language === 'bn' ? 'সকল পণ্য দেখুন' : 'View Full Farm Shop'}</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Product Grid display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => onNavigate({ page: 'product-details', productId: product.id })}
              className="bg-white rounded-3xl overflow-hidden border border-neutral-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 cursor-pointer transition-all duration-300 flex flex-col group"
            >
              <div className="relative aspect-square overflow-hidden bg-neutral-50 flex-shrink-0">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-104"
                />
                
                {/* Active stock badge */}
                <div className="absolute top-3 left-3 py-1 px-2.5 bg-[#1E3F20]/90 text-white font-mono text-[9px] font-bold uppercase rounded-lg shadow-sm">
                  {language === 'bn' ? product.stockBadge_bn : product.stockBadge}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono text-[#D4A373] uppercase tracking-widest font-bold">
                    {language === 'bn' ? product.categoryLabel_bn : product.categoryLabel}
                  </span>
                  
                  <h3 className="font-serif font-bold text-lg text-neutral-800 line-clamp-1 group-hover:text-[#1E3F20] transition-colors mt-1">
                    {language === 'bn' ? product.name_bn : product.name}
                  </h3>
                  
                  <p className="text-xs text-neutral-500 mt-1 lines-clamp-2 leading-relaxed font-light">
                    {language === 'bn' ? product.shortDescription_bn : product.shortDescription}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-neutral-100 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] text-[#D4A373] font-mono block uppercase">{language === 'bn' ? 'মূল্য শুরু' : 'Batch Price'}</span>
                    <span className="text-base font-semibold text-[#1E3F20]">৳ {product.price}</span>
                  </div>
                  
                  <span className="w-8 h-8 rounded-full bg-neutral-100 group-hover:bg-[#CCFF66] text-neutral-800 group-hover:text-[#1E3F20] flex items-center justify-center transition-colors">
                    <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
