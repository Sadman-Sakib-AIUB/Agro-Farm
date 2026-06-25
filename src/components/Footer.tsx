import React, { useState } from 'react';
import { RouteState } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { Youtube, Facebook, Mail, Phone, MapPin, Send, Leaf, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (route: RouteState) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { language } = useLanguage();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-[#1E3F20] text-white border-t border-[#D4A373]/20 pt-16 pb-8 text-left font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-white/10">
          
          {/* Column 1: Brand details */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-full bg-[#D4A373] text-[#1E3F20] flex items-center justify-center font-bold">
                <Leaf size={18} className="stroke-[2.5]" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight">Doyel Agro</span>
            </div>
            
            <p className="text-white/70 text-sm leading-relaxed font-light">
              {language === 'bn' 
                ? 'ঢাকা শহরের কর্মব্যস্ত করপোরেট জীবন ছেড়ে আমরা গড়ে তুলেছি মানিকগঞ্জের এক শান্ত নিরিবিলি ডুপ্লেক্স খামার। আপনার টেবিলে শতভাগ খাঁটি ও অর্গানিক গ্রামীণ ফসল পৌঁছে দেওয়াই আমাদের লক্ষ্য।' 
                : 'From the busy, concrete corporate offices of Dhaka to the peaceful, rich mud fields of Manikganj. We cultivate transparency, wellness, and 100% authentic organic farmhouse foods.'}
            </p>
            
            <div className="pt-2 flex items-center space-x-4">
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#D4A373] hover:bg-[#c49363] text-[#1E3F20] flex items-center justify-center transition-all duration-200 shadow-md group"
                title={language === 'bn' ? 'আমাদের ইউটিউব খামার ভ্লগ দেখুন' : 'Watch our Daily Manikganj Farm Vlog'}
              >
                <Youtube size={18} className="group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors shadow-sm"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-4">
            <h4 className="font-serif font-bold text-lg text-[#D4A373] tracking-tight">
              {language === 'bn' ? 'প্রয়োজনীয় লিংক' : 'Quick Links'}
            </h4>
            <ul className="space-y-2.5 text-sm font-light">
              <li>
                <button
                  onClick={() => onNavigate({ page: 'landing' })}
                  className="text-white/75 hover:text-[#D4A373] hover:underline transition-colors cursor-pointer text-left"
                >
                  {language === 'bn' ? 'আমাদের খামারের গল্প (ইউটিউব)' : 'Our Farm Story (Vlog)'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate({ page: 'shop' })}
                  className="text-white/75 hover:text-[#D4A373] hover:underline transition-colors cursor-pointer text-left"
                >
                  {language === 'bn' ? 'পণ্যসমূহ কিনুন' : 'Explore Catalog Products'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate({ page: 'contact' })}
                  className="text-white/75 hover:text-[#D4A373] hover:underline transition-colors cursor-pointer text-left"
                >
                  {language === 'bn' ? 'খামার ও যোগাযোগের মানচিত্র' : 'Farm Location & Contact Map'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate({ page: 'checkout' })}
                  className="text-white/75 hover:text-[#D4A373] hover:underline transition-colors cursor-pointer text-left"
                >
                  {language === 'bn' ? 'চেকআউট ফর্ম' : 'Checkout & Transmit Order'}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Manikganj HQ Contacts */}
          <div className="space-y-4">
            <h4 className="font-serif font-bold text-lg text-[#D4A373] tracking-tight">
              {language === 'bn' ? 'যোগাযোগ করুন' : 'Farm Contacts'}
            </h4>
            <ul className="space-y-3 text-sm text-white/75 font-light">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-[#D4A373] flex-shrink-0 mt-0.5" />
                <span>
                  {language === 'bn' ? (
                    <>
                      দোয়েল এগ্রো ডুপ্লেক্স হোম,<br />
                      বেউথা ব্রিজ রোড, মানিকগঞ্জ সদর,<br />
                      মানিকগঞ্জ, বাংলাদেশ
                    </>
                  ) : (
                    <>
                      Doyel Agro Duplex House,<br />
                      Beutha Bridge Road, Manikganj Sadar,<br />
                      Manikganj, Bangladesh
                    </>
                  )}
                </span>
              </li>
              <li className="flex items-center space-x-3 text-xs sm:text-sm">
                <Phone size={16} className="text-[#D4A373] flex-shrink-0" />
                <span>+880 1712-345678 ({language === 'bn' ? 'অর্ডার হেল্পলাইন' : 'Orders via Phone'})</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={16} className="text-[#D4A373] flex-shrink-0" />
                <span className="font-mono">harvest@doyelagro.com</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter vlog list */}
          <div className="space-y-4">
            <h4 className="font-serif font-bold text-lg text-[#D4A373] tracking-tight">
              {language === 'bn' ? 'বিজ্ঞপ্তি ও আপডেট' : 'Daily Vlog Feed'}
            </h4>
            <p className="text-white/75 text-sm font-light leading-relaxed">
              {language === 'bn' 
                ? 'নতুন মধু সংগ্রহ বা খাঁটি সরিষার তেলের কান্ট্রি ব্লগের নোটিফিকেশন পেতে আপনার ইমেইলটি দিন!' 
                : 'Get notified when a new vlog is live and fresh batches of honey are collected!'}
            </p>
            
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={language === 'bn' ? 'আপনার ইমেইল ঠিকানা' : 'Enter your email address'}
                  className="w-full bg-white/10 border border-white/20 text-white placeholder-white/50 text-sm py-2.5 pl-3 pr-10 rounded-xl focus:outline-none focus:border-[#D4A373] focus:ring-1 focus:ring-[#D4A373] transition-colors"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-2.5 bg-[#D4A373] text-[#1E3F20] rounded-lg hover:bg-[#c49363] transition-colors cursor-pointer"
                >
                  <Send size={15} />
                </button>
              </div>
              
              {isSubscribed && (
                <p className="text-xs text-[#D4A373] font-sans font-medium transition-opacity">
                  {language === 'bn' ? 'নিবন্ধন সফল হয়েছে!' : 'Subscribed successfully!'}
                </p>
              )}
            </form>
          </div>

        </div>

        {/* Footer Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 font-sans font-medium gap-4">
          <p>© {new Date().getFullYear()} Doyel Agro Farmers Syndicate. All Rights Reserved.</p>
          <p className="flex items-center gap-1 font-light">
            {language === 'bn' ? 'মানিকগঞ্জের খাঁটি ভালোবাসা দিয়ে তৈরি ' : 'Made with '}
            <Heart size={12} className="text-red-450 fill-red-450" />
            {language === 'bn' ? '' : ' straight from Manikganj, Bangladesh'}
          </p>
        </div>
      </div>
    </footer>
  );
};
