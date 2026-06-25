import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  ShoppingBag,
  LogOut,
  X,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { language } = useLanguage();

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const profile = {
    name: 'Taretan Aditya',
    nameBn: 'তারেক আদিত্য',
    email: 'admin@doyelagro.com',
    phone: '+880 1700-000000',
    location: 'Manikganj, Dhaka, Bangladesh',
    locationBn: 'মানিকগঞ্জ, ঢাকা, বাংলাদেশ',
    role: 'Administrator',
    roleBn: 'অপারেটর',
    memberSince: 'January 2026',
    memberSinceBn: 'জানুয়ারি ২০২৬',
    totalOrders: 47,
    status: 'Active',
    statusBn: 'সক্রিয়',
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.hash = '';
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto w-full text-left">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-black tracking-tight text-neutral-950">
            {language === 'bn' ? 'আমার প্রোফাইল' : 'My Profile'}
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-neutral-200/70 shadow-xs space-y-4">
          <div className="flex justify-between items-start">
            <span className="text-sm font-semibold text-neutral-500">
              {language === 'bn' ? 'অ্যাকাউন্ট স্ট্যাটাস' : 'Account Status'}
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#3BB75E] flex items-center justify-center">
              <CheckCircle size={16} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="text-2xl font-bold text-neutral-950">
              {language === 'bn' ? profile.statusBn : profile.status}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-neutral-200/70 shadow-xs space-y-4">
          <div className="flex justify-between items-start">
            <span className="text-sm font-semibold text-neutral-500">
              {language === 'bn' ? 'সদস্য since' : 'Member Since'}
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Calendar size={16} />
            </div>
          </div>
          <div className="text-2xl font-bold text-neutral-950">
            {language === 'bn' ? profile.memberSinceBn : profile.memberSince}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-neutral-200/70 shadow-xs space-y-4">
          <div className="flex justify-between items-start">
            <span className="text-sm font-semibold text-neutral-500">
              {language === 'bn' ? 'মোট অর্ডার' : 'Total Orders'}
            </span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <ShoppingBag size={16} />
            </div>
          </div>
          <div className="text-3xl font-bold text-neutral-950">{profile.totalOrders}</div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-neutral-200/70 shadow-xs space-y-4">
          <div className="flex justify-between items-start">
            <span className="text-sm font-semibold text-neutral-500">
              {language === 'bn' ? 'ভূমিকা' : 'Account Type'}
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Shield size={16} />
            </div>
          </div>
          <div className="text-2xl font-bold text-neutral-950">
            {language === 'bn' ? profile.roleBn : profile.role}
          </div>
        </div>
      </div>

      <div className="bg-white border border-neutral-200/80 rounded-3xl overflow-hidden shadow-xs">
        <div className="p-6 border-b border-neutral-200 bg-white">
          <h2 className="text-sm font-bold text-neutral-800">
            {language === 'bn' ? 'ব্যক্তিগত তথ্য' : 'Personal Information'}
          </h2>
        </div>

        <div className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start gap-8">
            <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-emerald-100 text-[#3BB75E] flex items-center justify-center font-bold text-3xl sm:text-4xl shrink-0 border-2 border-emerald-200/50">
              TA
            </div>
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 w-full">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block mb-1">
                  {language === 'bn' ? 'নাম' : 'FULL NAME'}
                </span>
                <div className="font-bold text-neutral-900 flex items-center gap-2">
                  <User size={14} className="text-neutral-400" />
                  <span>{language === 'bn' ? profile.nameBn : profile.name}</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block mb-1">
                  {language === 'bn' ? 'ইমেইল' : 'EMAIL ADDRESS'}
                </span>
                <div className="font-medium text-neutral-700 flex items-center gap-2 text-sm">
                  <Mail size={14} className="text-neutral-400" />
                  <span>{profile.email}</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block mb-1">
                  {language === 'bn' ? 'ফোন' : 'PHONE NUMBER'}
                </span>
                <div className="font-medium text-neutral-700 flex items-center gap-2 text-sm">
                  <Phone size={14} className="text-neutral-400" />
                  <span>{profile.phone}</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block mb-1">
                  {language === 'bn' ? 'অবস্থান' : 'LOCATION'}
                </span>
                <div className="font-medium text-neutral-700 flex items-center gap-2 text-sm">
                  <MapPin size={14} className="text-neutral-400" />
                  <span>{language === 'bn' ? profile.locationBn : profile.location}</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block mb-1">
                  {language === 'bn' ? 'ভূমিকা' : 'ROLE'}
                </span>
                <div className="font-medium text-neutral-700 flex items-center gap-2 text-sm">
                  <Shield size={14} className="text-neutral-400" />
                  <span>{language === 'bn' ? profile.roleBn : profile.role}</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block mb-1">
                  {language === 'bn' ? 'সদস্য since' : 'MEMBER SINCE'}
                </span>
                <div className="font-medium text-neutral-700 flex items-center gap-2 text-sm">
                  <Calendar size={14} className="text-neutral-400" />
                  <span>{language === 'bn' ? profile.memberSinceBn : profile.memberSince}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 sm:px-8 pb-6 sm:pb-8">
          <div className="border-t border-neutral-100 pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-xs text-neutral-400">
              {language === 'bn'
                ? 'আপনার অ্যাকাউন্ট থেকে সাইন আউট করতে নীচের বাটনে ক্লিক করুন।'
                : 'Click the button below to sign out of your account.'}
            </div>
            <button
              onClick={() => setShowLogoutModal(true)}
              className="px-6 py-3 bg-red-50 hover:bg-red-100 text-red-600 text-xs sm:text-sm font-bold rounded-xl border border-red-200 transition flex items-center gap-2.5 cursor-pointer shadow-xs active:scale-[0.98]"
            >
              <LogOut size={16} />
              <span>{language === 'bn' ? 'সাইন আউট' : 'Logout'}</span>
            </button>
          </div>
        </div>
      </div>

      {showLogoutModal && (
        <div className="fixed inset-0 bg-neutral-950/40 backdrop-blur-xs flex items-center justify-center z-55 p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full overflow-hidden shadow-2xl text-left border border-neutral-200">
            <div className="p-6 bg-gradient-to-r from-red-500 to-rose-600 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center">
                  <AlertTriangle size={20} />
                </div>
                <div>
                  <h3 className="font-serif font-black text-lg">
                    {language === 'bn' ? 'সাইন আউট' : 'Sign Out'}
                  </h3>
                  <p className="text-xs text-white/80">
                    {language === 'bn' ? 'আপনি কি নিশ্চিত?' : 'Are you sure?'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowLogoutModal(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-lg font-bold border-0 transition shrink-0"
              >
                <X size={18} />
              </button>
            </div>
            <div className="p-6 space-y-5">
              <p className="text-sm text-neutral-600 leading-relaxed">
                {language === 'bn'
                  ? 'আপনি কি আপনার অ্যাকাউন্ট থেকে সাইন আউট করতে চান? আপনি আবার লগইন করে আপনার ড্যাশবোর্ডে ফিরে আসতে পারবেন।'
                  : 'Are you sure you want to sign out? You can log back in anytime to access your dashboard.'}
              </p>
              <div className="p-3.5 bg-amber-50 rounded-xl text-[10px] text-amber-700 leading-relaxed font-medium flex items-start gap-2.5 border border-amber-100">
                <AlertTriangle size={14} className="shrink-0 mt-0.5" />
                <span>
                  {language === 'bn'
                    ? 'আপনার সেশন থেকে সব ডেটা ক্লিয়ার হয়ে যাবে এবং আপনাকে ল্যান্ডিং পেজে নিয়ে যাওয়া হবে।'
                    : 'Your session data will be cleared and you will be redirected to the landing page.'}
                </span>
              </div>
            </div>
            <div className="p-6 bg-neutral-50 border-t border-neutral-100 flex justify-end gap-3 rounded-b-3xl">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-5 py-2.5 bg-white border border-neutral-200 hover:bg-neutral-100 text-neutral-700 text-xs font-bold rounded-xl transition cursor-pointer"
              >
                {language === 'bn' ? 'বাতিল করুন' : 'Cancel'}
              </button>
              <button
                onClick={handleLogout}
                className="px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white text-xs font-bold rounded-xl transition cursor-pointer shadow-xs border-0 flex items-center gap-2"
              >
                <LogOut size={14} />
                <span>{language === 'bn' ? 'সাইন আউট' : 'Sign Out'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
