import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { RouteState } from '../types';
import { User, Mail, Lock, Phone, ArrowLeft, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface AuthPageProps {
  onNavigate: (route: RouteState) => void;
  onLoginSuccess: (username: string) => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onNavigate, onLoginSuccess }) => {
  const { language } = useLanguage();
  const [isLogin, setIsLogin] = useState(true);
  
  // Login fields
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Register fields
  const [fullName, setFullName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  
  // UI Status
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!loginEmail.trim() || !loginPassword.trim()) {
      setErrorMsg(language === 'bn' ? 'দয়া করে সবগুলো ঘর পূরণ করুন।' : 'Please fill out all fields.');
      return;
    }

    // Simple demo validation/success
    const username = loginEmail.split('@')[0];
    const capitalizedName = username.charAt(0).toUpperCase() + username.slice(1);
    
    setSuccessMsg(language === 'bn' ? 'লগইন সফল হয়েছে! ড্যাশবোর্ডে নিয়ে যাওয়া হচ্ছে...' : 'Login successful! Redirecting you...');
    setTimeout(() => {
      onLoginSuccess(capitalizedName);
    }, 1500);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!fullName.trim() || !regEmail.trim() || !phone.trim() || !regPassword.trim()) {
      setErrorMsg(language === 'bn' ? 'দয়া করে সবগুলো তথ্য প্রদান করুন।' : 'Please supply all credentials.');
      return;
    }

    if (!agreeTerms) {
      setErrorMsg(language === 'bn' ? 'আপনাকে আমাদের সেবার শর্তাবলির সাথে একমত হতে হবে।' : 'You must agree to our Terms of Service.');
      return;
    }

    setSuccessMsg(language === 'bn' ? 'রেজিস্ট্রেশন সফল হয়েছে! অ্যাকাউন্ট তৈরি সম্পন্ন।' : 'Account created successfully! Logging you in...');
    setTimeout(() => {
      onLoginSuccess(fullName);
    }, 1500);
  };

  return (
    <div className="relative min-h-screen pt-32 pb-24 flex items-center justify-center bg-gradient-to-br from-[#FFF5EC] via-[#FAF8F5] to-[#E9F0EB] px-4 overflow-hidden font-sans">
      
      {/* Absolute blur background decorations matching the hero page */}
      <div className="absolute top-[10%] right-[-10%] w-[350px] h-[350px] rounded-full bg-amber-200/40 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[5%] left-[-15%] w-[350px] h-[350px] rounded-full bg-emerald-100/50 blur-[110px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10 transition-all duration-300">
        
        {/* Back Link to Home */}
        <button
          onClick={() => onNavigate({ page: 'landing' })}
          className="inline-flex items-center gap-2 text-[#1E3F20] hover:text-[#D4A373] text-sm font-semibold mb-6 transition-colors duration-200 cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>{language === 'bn' ? 'মূল পাতায় ফিরে যান' : 'Back to Home'}</span>
        </button>

        {/* Master Auth Card Container */}
        <div className="bg-white/90 backdrop-blur-md p-8 rounded-[32px] border border-neutral-200/60 shadow-xl text-left">
          
          {/* Header */}
          <div className="mb-8 text-center sm:text-left">
            <h2 className="text-3xl font-sans font-extrabold text-neutral-900 tracking-tight leading-none">
              {isLogin ? (
                language === 'bn' ? (
                  <>খামারে <span className="font-serif italic font-normal text-[#1E3F20]">স্বাগতম</span></>
                ) : (
                  <>Welcome <span className="font-serif italic font-normal text-[#1E3F20]">Back</span></>
                )
              ) : (
                language === 'bn' ? (
                  <>নতুন <span className="font-serif italic font-normal text-[#1E3F20]">রেজিস্ট্রেশন</span></>
                ) : (
                  <>Create <span className="font-serif italic font-normal text-[#1E3F20]">Account</span></>
                )
              )}
            </h2>
            <p className="text-sm text-neutral-500 font-light mt-2 leading-relaxed">
              {isLogin ? (
                language === 'bn' 
                  ? 'আপনার ইমেইল ও পাসওয়ার্ড দিয়ে মানিকগঞ্জ ডুপ্লেক্সে লগইন করুন।' 
                  : 'Access your organic harvest delivery options & past files.'
              ) : (
                language === 'bn' 
                  ? 'দোয়েল এগ্রো পরিবারের সদস্য হতে নিচের ফর্মটি পূরণ করুন।' 
                  : 'Join 12,000+ happy families eating chemical-free food from Manikganj.'
              )}
            </p>
          </div>

          {/* Form tab controllers */}
          <div className="grid grid-cols-2 bg-neutral-100 p-1 rounded-2xl mb-8 border border-neutral-200/50">
            <button
              onClick={() => {
                setIsLogin(true);
                setErrorMsg('');
                setSuccessMsg('');
              }}
              className={`py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                isLogin ? 'bg-white text-[#1E3F20] shadow-sm' : 'text-neutral-500 hover:text-neutral-800'
              }`}
            >
              {language === 'bn' ? 'লগইন' : 'Login'}
            </button>
            <button
              onClick={() => {
                setIsLogin(false);
                setErrorMsg('');
                setSuccessMsg('');
              }}
              className={`py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                !isLogin ? 'bg-white text-[#1E3F20] shadow-sm' : 'text-neutral-500 hover:text-neutral-800'
              }`}
            >
              {language === 'bn' ? 'রজিস্টার' : 'Register'}
            </button>
          </div>

          {/* Message feedback */}
          {errorMsg && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm font-medium">
              {errorMsg}
            </div>
          )}
          
          {successMsg && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-medium flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-700 flex-shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Forms switcher block */}
          {isLogin ? (
            /* 1. Login Form */
            <form onSubmit={handleLoginSubmit} className="space-y-5">
              
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-[#D4A373] tracking-widest mb-1.5">
                  {language === 'bn' ? 'ইমেইল ঠিকানা' : 'Email Address'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                    <Mail size={16} />
                  </div>
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder={language === 'bn' ? 'customer@example.com' : 'username@gmail.com'}
                    className="w-full bg-neutral-50 border border-neutral-200 focus:bg-white focus:border-[#1E3F20] focus:ring-1 focus:ring-[#1E3F20] text-sm py-3 pl-11 pr-4 rounded-xl transition-all outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-mono font-bold uppercase text-[#D4A373] tracking-widest">
                    {language === 'bn' ? 'পাসওয়ার্ড' : 'Password'}
                  </label>
                  <a href="#forgot" className="text-xs font-semibold text-[#1E3F20] hover:underline">
                    {language === 'bn' ? 'পাসওয়ার্ড ভুলে গেছেন?' : 'Forgot Password?'}
                  </a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                    <Lock size={16} />
                  </div>
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-neutral-50 border border-neutral-200 focus:bg-white focus:border-[#1E3F20] focus:ring-1 focus:ring-[#1E3F20] text-sm py-3 pl-11 pr-4 rounded-xl transition-all outline-none"
                    required
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-[#1E3F20] bg-[#CCFF66] hover:bg-[#b0f04c] active:scale-97 transition-all shadow-md group cursor-pointer border-0"
                >
                  <span>{language === 'bn' ? 'অ্যাকাউন্টে লগইন করুন' : 'Sign in to Account'}</span>
                  <span className="bg-[#1E3F20] text-[#CCFF66] p-1 rounded-full group-hover:translate-x-1 transition-transform">
                    <ArrowRight size={12} className="stroke-[3]" />
                  </span>
                </button>
              </div>

            </form>
          ) : (
            /* 2. Register Form */
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-[#D4A373] tracking-widest mb-1.5">
                  {language === 'bn' ? 'পূর্ণ নাম' : 'Full Name'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                    <User size={16} />
                  </div>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={language === 'bn' ? 'আহমেদ হাসান' : 'Sakib Ahmed'}
                    className="w-full bg-neutral-50 border border-neutral-200 focus:bg-white focus:border-[#1E3F20] focus:ring-1 focus:ring-[#1E3F20] text-sm py-2.5 pl-11 pr-4 rounded-xl transition-all outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase text-[#D4A373] tracking-widest mb-1.5">
                  {language === 'bn' ? 'ইমেইল ঠিকানা' : 'Email Address'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                    <Mail size={16} />
                  </div>
                  <input
                    type="email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="example@doyel.com"
                    className="w-full bg-neutral-50 border border-neutral-200 focus:bg-white focus:border-[#1E3F20] focus:ring-1 focus:ring-[#1E3F20] text-sm py-2.5 pl-11 pr-4 rounded-xl transition-all outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase text-[#D4A373] tracking-widest mb-1.5">
                  {language === 'bn' ? 'মোবাইল নম্বর' : 'Phone Number'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                    <Phone size={16} />
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="01712-XXXXXX"
                    className="w-full bg-neutral-50 border border-neutral-200 focus:bg-white focus:border-[#1E3F20] focus:ring-1 focus:ring-[#1E3F20] text-sm py-2.5 pl-11 pr-4 rounded-xl transition-all outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase text-[#D4A373] tracking-widest mb-1.5">
                  {language === 'bn' ? 'পাসওয়ার্ড নির্ধারণ করুন' : 'Choose Password'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                    <Lock size={16} />
                  </div>
                  <input
                    type="password"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-neutral-50 border border-neutral-200 focus:bg-white focus:border-[#1E3F20] focus:ring-1 focus:ring-[#1E3F20] text-sm py-2.5 pl-11 pr-4 rounded-xl transition-all outline-none"
                    required
                  />
                </div>
              </div>

              {/* Secure terms and conditions */}
              <div className="flex items-start gap-2.5 py-1">
                <input
                  type="checkbox"
                  id="agree-terms-check"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="rounded border-neutral-300 text-[#1E3F20] focus:ring-[#CCFF66] mt-0.5 cursor-pointer h-4 w-4"
                />
                <label htmlFor="agree-terms-check" className="text-xs text-neutral-600 leading-snug cursor-pointer select-none">
                  {language === 'bn' ? (
                    <>আমি দোয়েল এগ্রোর অর্গানিক কন্ডিশন ও <span className="font-semibold text-[#1E3F20] hover:underline">সেবার শর্তাবলির</span> সাথে একমত।</>
                  ) : (
                    <>I agree to Doyel Agro's terms and <span className="font-semibold text-[#1E3F20] hover:underline">Services Policy</span>.</>
                  )}
                </label>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-[#1E3F20] bg-[#CCFF66] hover:bg-[#b0f04c] active:scale-97 transition-all shadow-md group cursor-pointer border-0"
                >
                  <span>{language === 'bn' ? 'অ্যাকাউন্ট তৈরি করুন' : 'Create Free Account'}</span>
                  <span className="bg-[#1E3F20] text-[#CCFF66] p-1 rounded-full group-hover:translate-x-1 transition-transform">
                    <ArrowRight size={12} className="stroke-[3]" />
                  </span>
                </button>
              </div>

            </form>
          )}

          {/* Core credential safety footer info */}
          <div className="mt-6 pt-5 border-t border-neutral-100 flex items-center justify-center gap-1.5 text-[10px] sm:text-xs text-neutral-400 font-mono uppercase tracking-wider text-center select-none">
            <ShieldCheck size={14} className="text-emerald-700" />
            <span>{language === 'bn' ? '১২৮-বিট এনক্রিপশন সিস্টেম' : '128-Bit Secure Connection'}</span>
          </div>

        </div>

      </div>

    </div>
  );
};
