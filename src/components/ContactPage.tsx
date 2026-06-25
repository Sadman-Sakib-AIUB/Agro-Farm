import React, { useState } from 'react';
import { RouteState } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { MapPin, Clock, Send, CheckCircle, Youtube, Facebook, Instagram, ShieldQuestion } from 'lucide-react';

interface ContactPageProps {
  onNavigate: (route: RouteState) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const { t, language } = useLanguage();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const[phoneNumber, setPhoneNumber] = useState('');
  const [subject, setSubject] = useState('general');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim() && message.trim()) {
      setIsSent(true);
      setName('');
      setEmail('');
      setPhoneNumber('');
      setMessage('');
      setTimeout(() => setIsSent(false), 5000);
    }
  };

  return (
    <div id="contact-page-view" className="bg-[#FAF8F5] pt-32 pb-24 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Head */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-[#D4A373] font-semibold flex items-center justify-center gap-1.5">
            <MapPin size={13} className="text-emerald-700" />
            <span>{language === 'bn' ? 'মানিকগঞ্জ সদর খামার ও ডুপ্লেক্স হোম' : 'VISIT OUR MANIKGANJ DUPLEX'}</span>
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1E3F20] mt-2 tracking-tight">
            {language === 'bn' ? 'আমাদের সাথে যোগাযোগ করুন' : 'Connect With Doyel Agro'}
          </h1>
          <p className="text-sm text-neutral-600 mt-3 font-light leading-relaxed">
            {language === 'bn' 
              ? 'খাঁটি সরিষার তেল, লিচু ফুলের মধু বা ঘি নিয়ে কোনো প্রশ্ন আছে? কিংবা আমাদের খামার দেখার কোনো পরিকল্পনা? নির্দ্বিধায় মেসেজ দিন বা আমাদের কল করুন।' 
              : 'Have questions about a fresh honey crop? Need to place a bulk custom spices order for a family wedding? Reach out or visit us in the quiet country lanes.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start text-left">
          
          {/* Column 1: ContactForm */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border border-neutral-100 p-6 sm:p-8 shadow-md">
              <h2 className="font-serif text-2xl font-bold text-[#1E3F20] mb-6">
                {language === 'bn' ? 'মেসেজ পাঠান' : 'Send Us a Message'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  
                  {/* Visitor Name */}
                  <div className="space-y-1.5">
                    <label className="block text-xs uppercase tracking-widest text-neutral-500 font-mono font-bold">
                      {language === 'bn' ? 'আপনার পুরো নাম' : 'Your Full Name'}
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={language === 'bn' ? 'যেমন: সাকিব খান' : 'e.g. Sakib Khan'}
                      className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm bg-neutral-50/50 focus:outline-none focus:ring-1 focus:ring-[#1E3F20] focus:bg-white text-neutral-900 transition-colors"
                      required
                    />
                  </div>

                  {/* Email Address */}
                  <div className="space-y-1.5">
                    <label className="block text-xs uppercase tracking-widest text-neutral-500 font-mono font-bold">
                      {language === 'bn' ? 'ইমেইল অ্যাড্রেস' : 'Email Address'}
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. sakib@mail.com"
                      className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm bg-neutral-50/50 focus:outline-none focus:ring-1 focus:ring-[#1E3F20] focus:bg-white text-neutral-900 transition-colors"
                      required
                    />
                  </div>

                  {/* Optional mobile */}
                  <div className="space-y-1.5">
                    <label className="block text-xs uppercase tracking-widest text-neutral-500 font-mono font-bold">
                      {language === 'bn' ? 'মোবাইল নম্বর (ঐচ্ছিক)' : 'Mobile Number (Optional)'}
                    </label>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="e.g. 01711223344"
                      className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm bg-neutral-50/50 focus:outline-none focus:ring-1 focus:ring-[#1E3F20] focus:bg-white text-neutral-900 transition-colors"
                    />
                  </div>

                  {/* Reason selector dropdown */}
                  <div className="space-y-1.5">
                    <label className="block text-xs uppercase tracking-widest text-neutral-500 font-mono font-bold">
                      {language === 'bn' ? 'যোগাযোগের কারণ' : 'Inquiry Subject'}
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm bg-neutral-50/50 focus:outline-none focus:ring-1 focus:ring-[#1E3F20] focus:bg-white text-neutral-900 transition-colors"
                    >
                      {language === 'bn' ? (
                        <>
                          <option value="general">সাধারণ জিজ্ঞাসা / শুভেচ্ছা বিনিময়</option>
                          <option value="order">কাস্টম অথবা পাইকারি পন্য অর্ডার</option>
                          <option value="visitation">ডুপ্লেক্স খামার পরিদর্শনের অনুমতি</option>
                          <option value="vlog">ইউটিউব কোলাবোরেশন ও স্পন্সরশিপ</option>
                        </>
                      ) : (
                        <>
                          <option value="general">General Support / Hello</option>
                          <option value="order">Custom / Bulk Crops Order</option>
                          <option value="visitation">Duplex Farm Visit Inquiries</option>
                          <option value="vlog">YouTube Sponsorship / Collab</option>
                        </>
                      )}
                    </select>
                  </div>

                </div>

                {/* Question body */}
                <div className="space-y-1.5">
                  <label className="block text-xs uppercase tracking-widest text-neutral-500 font-mono font-bold">
                    {language === 'bn' ? 'আপনার বার্তাটি লিখুন' : 'Write Your Message'}
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    placeholder={language === 'bn' ? 'আপনার মূল্যবান মতামত বা বার্তা আমাদের সাথে শেয়ার করুন...' : 'We respond to all emails and guest comments within 1 working day...'}
                    className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm bg-neutral-50/50 focus:outline-none focus:ring-1 focus:ring-[#1E3F20] focus:bg-white text-neutral-900 transition-colors"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl font-bold text-sm bg-[#1E3F20] text-white hover:bg-[#2c542e] shadow-sm transition-all cursor-pointer"
                >
                  <Send size={14} />
                  <span>{language === 'bn' ? 'বার্তা পাঠান' : 'Transmit Message'}</span>
                </button>

                {isSent && (
                  <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl text-sm text-emerald-800 flex items-center gap-2 animate-fade-in">
                    <CheckCircle size={18} className="text-emerald-700" />
                    <span>
                      {language === 'bn' 
                        ? 'আপনার বার্তাটি সফলভাবে পাঠানো হয়েছে! ২৪ ঘণ্টার মধ্যে আমরা যোগাযোগ করব।' 
                        : 'Your message was transmitted safely! Our family team will reply inside 1 working day.'}
                    </span>
                  </div>
                )}

              </form>
            </div>
          </div>

          {/* Column 2: Location and Coordinates details */}
          <div className="lg:col-span-1 border-0 hidden lg:block"></div>
          
          <div className="lg:col-span-4 space-y-8">
            
            {/* FarmLocationCard */}
            <div className="bg-[#1E3F20] p-6 sm:p-8 rounded-3xl text-white border border-[#D4A373]/20 shadow-lg space-y-6">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#D4A373]">
                {language === 'bn' ? 'খামারের মূল ঠিকানা' : 'Duplex Farmhouse Location'}
              </h2>

              <div className="space-y-4 text-xs sm:text-sm leading-relaxed font-sans">
                
                <div className="flex items-start space-x-3.5">
                  <MapPin size={18} className="text-[#D4A373] mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="block text-white">{language === 'bn' ? 'ঠিকানা:' : 'Physical Address:'}</strong>
                    <span className="text-white/80 font-light">
                      {language === 'bn' ? (
                        <>
                          দোয়েল এগ্রো ডুপ্লেক্স হোম, <br />
                          বেউথা ব্রিজ রোড, সিংগাইর সংযোগ লাইন, <br />
                          মানিকগঞ্জ সদর, বাংলাদেশ
                        </>
                      ) : (
                        <>
                          Doyel Agro Duplex, <br />
                          Beutha Bridge Road, <br />
                          Manikganj Sadar, Bangladesh
                        </>
                      )}
                    </span>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <Clock size={16} className="text-[#D4A373] mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="block text-white">{language === 'bn' ? 'পরিদর্শনের সময়:' : 'Guest Visitation Hours:'}</strong>
                    <span className="text-white/80 font-light">
                      {language === 'bn' 
                        ? 'শনিবার — বৃহস্পতিবার (শুক্রবার মধু নিষ্কাশন ও সাপ্তাহিক ছুটির দিন বন্ধ থাকে)\nসকাল ৯:০০ টা — বিকাল ৫:০০ টা' 
                        : 'Saturday — Thursday (Closed Friday for active farm harvest chores)\n9:00 AM — 5:00 PM BST'}
                    </span>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5 pt-1">
                  <ShieldQuestion size={23} className="text-[#D4A373] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white">{language === 'bn' ? 'ভিজিটর নির্দেশিকা:' : 'Guest Instructions:'}</strong>
                    <span className="text-white/80 font-light">
                      {language === 'bn' 
                        ? 'অনুগ্রহ করে আসার পূর্বে আমাদের ফোনে কল বা মেসেজে কন্ট্যাক্ট করে নিন, যেন লাইভ ইউটিউব শ্যুট বা ঐতিহ্যবাহী কাঠের ঘানির প্রক্রিয়ায় কোনো ব্যাঘাত না ঘটে।' 
                        : 'Please write or drop a call before arriving. This helps avoid interrupting active honey centrifugal extraction processes or live vlog filmings!'}
                    </span>
                  </div>
                </div>

              </div>

              {/* Decorative Map Grid */}
              <div className="border border-white/10 rounded-2xl overflow-hidden bg-white/5 relative aspect-video p-4 flex flex-col justify-end shadow-inner">
                <div className="absolute inset-0 bg-[radial-gradient(#D4A373_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>
                
                <div className="relative z-10 space-y-1 text-center p-3 rounded-xl bg-black/60 backdrop-blur-xs border border-white/10">
                  <p className="font-mono text-[9px] uppercase text-[#D4A373] tracking-widest font-bold">BEUTHA BRIDGE • MANIKGANJ</p>
                  <p className="text-[11px] font-light leading-relaxed">
                    {language === 'bn' ? 'ধলেশ্বরী নদীর বেউথা ব্রিজের ঠিক উত্তর পাশে।' : 'Slightly north of the Dhaleshwari river bridge.'}
                  </p>
                </div>
              </div>

            </div>

            {/* SocialConnect prominent interactive boxes */}
            <div className="bg-white rounded-3xl border border-neutral-100 p-6 space-y-4 shadow-sm">
              <h3 className="font-serif text-lg font-bold text-[#1E3F20]">
                {language === 'bn' ? 'গ্রাম্য জীবনের স্পন্দন' : 'Tune into the Country Life'}
              </h3>
              
              <p className="text-xs text-neutral-500 leading-relaxed font-light">
                {language === 'bn' 
                  ? 'আমরা প্রতি সপ্তাহের পন্ড বা পুকুর সেচ, দেশি মুরগির খাবার দেওয়া এবং মন ভালো করা পিঠার রেসিপি আমাদের সোশ্যাল প্রোফাইলে আপলোড করি:' 
                  : 'We share day-to-day happenings, chicken chores, pond harvests, and pitha baking directly on our active digital profiles:'}
              </p>

              <div className="grid grid-cols-3 gap-2.5 pt-2">
                
                {/* YT */}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center justify-center py-3.5 bg-rose-50 hover:bg-rose-100/50 border border-rose-100 rounded-2xl text-center cursor-pointer transition-colors space-y-1"
                >
                  <Youtube size={18} className="text-rose-600 animate-pulse" />
                  <span className="font-mono text-[9px] uppercase tracking-wider font-bold text-rose-600">YouTube</span>
                </a>

                {/* FB */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center justify-center py-3.5 bg-blue-50 hover:bg-blue-100/50 border border-blue-100 rounded-2xl text-center cursor-pointer transition-colors space-y-1"
                >
                  <Facebook size={18} className="text-blue-600" />
                  <span className="font-mono text-[9px] uppercase tracking-wider font-bold text-blue-600">Facebook</span>
                </a>

                {/* IG */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center justify-center py-3.5 bg-pink-50 hover:bg-pink-100/50 border border-pink-100 rounded-2xl text-center cursor-pointer transition-colors space-y-1"
                >
                  <Instagram size={18} className="text-pink-600" />
                  <span className="font-mono text-[9px] uppercase tracking-wider font-bold text-pink-600">Instagram</span>
                </a>

              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
