import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { RouteState } from '../types';
import {
  Compass,
  Leaf,
  LayoutDashboard,
  ShoppingBag,
  Users,
  Truck,
  TrendingUp,
  Plus,
  Search,
  Sparkles,
  Settings,
  HelpCircle,
  Check,
  Package,
  Play,
  Bell,
  MessageSquare,
  ChevronDown,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  Clock,
  User,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { DashboardHome } from './dashboard/DashboardHome';
import { OverviewPage } from './dashboard/OverviewPage';
import { OrdersPage } from './dashboard/OrdersPage';
import { ProductsPage } from './dashboard/ProductsPage';
import { FarmersPage } from './dashboard/FarmersPage';
import { PaymentsPage } from './dashboard/PaymentsPage';
import { DeliveryPage } from './dashboard/DeliveryPage';
import { VehiclesPage } from './dashboard/VehiclesPage';
import { SocialPage } from './dashboard/SocialPage';
import { AnalyticsPage } from './dashboard/AnalyticsPage';
import { SettingsPage } from './dashboard/SettingsPage';
import { HelpPage } from './dashboard/HelpPage';
import { ProfilePage } from './dashboard/ProfilePage';

interface AdminDashboardProps {
  onNavigate: (route: RouteState) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate }) => {
  const { language } = useLanguage();

  const [activeTab, setActiveTab] = useState<'dashboard' | 'overview' | 'orders' | 'products' | 'farmers' | 'payments' | 'delivery' | 'vehicles' | 'social' | 'analytics' | 'settings' | 'help' | 'profile'>('orders');

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const closeMobileSidebar = () => setMobileSidebarOpen(false);

  const handleNavClick = (key: string) => {
    setActiveTab(key as any);
    closeMobileSidebar();
  };

  const [showSetupChecklist, setShowSetupChecklist] = useState(false);
  const [setupSteps, setSetupSteps] = useState([
    { id: 1, text: language === 'bn' ? 'খামারের প্রোফাইল সম্পূর্ণ করুন' : 'Setup Farm Profile', done: true },
    { id: 2, text: language === 'bn' ? '৩টি নতুন সবজি/তেল পণ্য তালিকাভুক্ত করুন' : 'Add 3 Essential Agro products', done: true },
    { id: 3, text: language === 'bn' ? 'পেমেন্ট গেটওয়ে যুক্ত করুন' : 'Connect Bkash/Nagad Merchant', done: true },
    { id: 4, text: language === 'bn' ? 'মানিকগঞ্জ ও ঢাকা কুরিয়ার হাব যুক্ত করুন' : 'Integrate Courier Hubs', done: true },
    { id: 5, text: language === 'bn' ? 'ডেলিভারি এরিয়া ও খরচ নির্ধারণ করুন' : 'Set Delivery Charge thresholds', done: true },
    { id: 6, text: language === 'bn' ? 'সাবস্ক্রাইবার নিউজলেটার সক্রিয় করুন' : 'Activate Subscriber Newsletter', done: true },
    { id: 7, text: language === 'bn' ? 'প্রথম অর্ডার ডেলিভারি সম্পন্ন করুন' : 'Complete 1st Successful Delivery', done: false }
  ]);

  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications] = useState([
    { id: 1, text: language === 'bn' ? 'সৈয়দুর রহমান ৩টি দেশি গোল আলু অর্ডার করেছেন।' : 'Sayedur Rahman ordered 3x Potato.', time: '2 mins ago' },
    { id: 2, text: language === 'bn' ? 'তাজনিম সুলতানার কুরিয়ার হাব আপডেট হয়েছে।' : 'Tasnim Sultana hub dispatched successfully.', time: '1 hour ago' },
    { id: 3, text: language === 'bn' ? 'মানিকগঞ্জ খামারে গাজর মজুদ শেষ পর্যায়ে।' : 'Carrot stock level critical in Manikganj.', time: '3 hours ago' }
  ]);

  const completedSteps = setupSteps.filter(s => s.done).length;

  const toggleStep = (id: number) => {
    setSetupSteps(prev => prev.map(s => s.id === id ? { ...s, done: !s.done } : s));
  };

  const navItems = [
    { key: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', labelBn: 'ড্যাশবোর্ড' },
    { key: 'overview', icon: Compass, label: 'Overview', labelBn: 'সারসংক্ষেপ' },
    { key: 'orders', icon: ShoppingBag, label: 'Orders', labelBn: 'অর্ডার সমূহ', badge: true },
    { key: 'products', icon: Package, label: 'Products', labelBn: 'পণ্য তালিকা' },
    { key: 'farmers', icon: Users, label: 'Farmers', labelBn: 'আমদানীকারক ও কৃষক' },
    { key: 'payments', icon: CreditCard, label: 'Payments', labelBn: 'পেমেন্ট গেটওয়ে' },
    { key: 'delivery', icon: Truck, label: 'Delivery', labelBn: 'ডেলিভারি ট্র্যাকিং' },
    { key: 'vehicles', icon: Clock, label: 'Vehicles', labelBn: 'চালান ও কুরিয়ার' },
    { key: 'social', icon: Sparkles, label: 'Social content', labelBn: 'সামাজিক কার্যক্রম' },
    { key: 'analytics', icon: TrendingUp, label: 'Analytics', labelBn: 'লাভ লোকসান চার্ট' },
  ];

  const otherItems = [
    { key: 'profile', icon: User, label: 'Profile', labelBn: 'প্রোফাইল' },
    { key: 'settings', icon: Settings, label: 'Settings', labelBn: 'সেটিংস' },
    { key: 'help', icon: HelpCircle, label: 'Help', labelBn: 'সহায়তা নির্দেশিকা' },
  ];

  const renderActivePage = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardHome />;
      case 'overview':
        return <OverviewPage />;
      case 'orders':
        return <OrdersPage />;
      case 'products':
        return <ProductsPage />;
      case 'farmers':
        return <FarmersPage />;
      case 'payments':
        return <PaymentsPage />;
      case 'delivery':
        return <DeliveryPage />;
      case 'vehicles':
        return <VehiclesPage />;
      case 'social':
        return <SocialPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'settings':
        return <SettingsPage />;
      case 'help':
        return <HelpPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex text-[#333333] font-sans antialiased selection:bg-emerald-500 selection:text-white pt-0">

      {/* MOBILE BACKDROP */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-neutral-950/40 backdrop-blur-xs z-40 lg:hidden"
          onClick={closeMobileSidebar}
        />
      )}

      {/* LEFT SIDEBAR */}
      <aside
        className={`
          bg-white border-r border-neutral-200/80 flex flex-col justify-between shrink-0 fixed bottom-0 top-0 left-0 z-50
          transition-all duration-300 ease-in-out
          ${sidebarCollapsed ? 'w-[72px]' : 'w-[260px]'}
          ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex flex-col flex-1 overflow-y-auto px-3 py-6 space-y-7 sidebar-scroll">

          <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-between'} px-2`}>
            <div className={`flex items-center gap-2.5 ${sidebarCollapsed ? 'justify-center' : ''}`}>
              <div className="w-8 h-8 rounded-lg bg-[#3BB75E] flex items-center justify-center text-white shrink-0 shadow-sm">
                <Leaf size={16} className="fill-current" />
              </div>
              <span className={`font-serif font-bold text-lg text-neutral-950 tracking-tight ${sidebarCollapsed ? 'hidden' : 'block'}`}>
                Doyel Agro
              </span>
            </div>
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className={`text-neutral-400 hover:text-neutral-600 transition-colors p-1 ${sidebarCollapsed ? 'hidden' : 'lg:block hidden'}`}
              title="Collapse Menu"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={closeMobileSidebar}
              className="lg:hidden text-neutral-400 hover:text-neutral-600 transition-colors p-1"
              title="Close Menu"
            >
              <X size={18} />
            </button>
          </div>

          {/* MAIN MENU */}
          <div className={`space-y-2 ${sidebarCollapsed ? 'px-0' : ''}`}>
            <span className={`text-[10px] font-bold uppercase tracking-widest text-neutral-400 block px-2.5 ${sidebarCollapsed ? 'hidden' : ''}`}>
              {language === 'bn' ? 'প্রধান মেনু' : 'MAIN MENU'}
            </span>
            <div className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.key;
                return (
                  <button
                    key={item.key}
                    onClick={() => handleNavClick(item.key)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all font-medium text-xs sm:text-sm cursor-pointer ${
                      isActive ? 'bg-[#3BB75E] text-white' : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                    } ${sidebarCollapsed ? 'justify-center px-0' : ''}`}
                    title={sidebarCollapsed ? item.label : undefined}
                  >
                    <div className={`flex items-center gap-3 ${sidebarCollapsed ? 'justify-center' : ''}`}>
                      <Icon size={18} className="shrink-0" />
                      <span className={sidebarCollapsed ? 'hidden' : 'block'}>{language === 'bn' ? item.labelBn : item.label}</span>
                    </div>
                    {!sidebarCollapsed && item.key === 'orders' && (
                      <span className={`text-[10px] px-2 py-0.5 font-bold rounded-full ${
                        isActive ? 'bg-white text-[#3BB75E]' : 'bg-emerald-50 text-[#3BB75E]'
                      }`}>
                        5
                      </span>
                    )}
                    {!sidebarCollapsed && item.key === 'overview' && (
                      <ChevronDown size={14} className={isActive ? 'text-white' : 'text-neutral-400'} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* OTHER SECTION */}
          <div className={`space-y-2 ${sidebarCollapsed ? 'px-0' : ''}`}>
            <span className={`text-[10px] font-bold uppercase tracking-widest text-neutral-400 block px-2.5 ${sidebarCollapsed ? 'hidden' : ''}`}>
              {language === 'bn' ? 'অন্যান্য' : 'OTHER'}
            </span>
            <div className="space-y-1">
              {otherItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.key;
                return (
                  <button
                    key={item.key}
                    onClick={() => handleNavClick(item.key)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all font-medium text-xs sm:text-sm cursor-pointer ${
                      isActive ? 'bg-[#3BB75E] text-white' : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                    } ${sidebarCollapsed ? 'justify-center px-0' : ''}`}
                    title={sidebarCollapsed ? item.label : undefined}
                  >
                    <Icon size={18} className="shrink-0" />
                    <span className={sidebarCollapsed ? 'hidden' : 'block'}>{language === 'bn' ? item.labelBn : item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* INTEGRATIONS */}
          <div className={`flex items-center justify-between border-t border-neutral-100 pt-4 ${sidebarCollapsed ? 'px-3' : 'px-2'}`}>
            <span className={`text-[10px] font-bold text-neutral-400 uppercase tracking-wider ${sidebarCollapsed ? 'hidden' : 'block'}`}>
              {language === 'bn' ? 'ইন্টিগ্রেশন' : 'INTEGRATIONS'}
            </span>
            <button className="text-neutral-400 hover:text-neutral-900 p-0.5 transition" title="Add Integration">
              <Plus size={16} />
            </button>
          </div>

          {/* SETUP STORE PROGRESS */}
          <div className={`bg-[#FAF8F5] border border-neutral-200/80 rounded-2xl p-4 text-left shadow-xs ${sidebarCollapsed ? 'hidden' : 'block'}`}>
            <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block mb-1">
              {language === 'bn' ? 'স্টোর সেটআপ' : 'SETUP STORE'}
            </span>
            <div className="text-sm font-bold text-neutral-900 mb-2">
              {completedSteps} / {setupSteps.length} {language === 'bn' ? 'ধাপ সম্পন্ন' : 'steps complete'}
            </div>
            <div className="w-full bg-neutral-200 h-2 rounded-full overflow-hidden mb-4">
              <div
                className="bg-[#3BB75E] h-full transition-all duration-500"
                style={{ width: `${(completedSteps / setupSteps.length) * 100}%` }}
              />
            </div>
            <button
              onClick={() => setShowSetupChecklist(!showSetupChecklist)}
              className="w-full py-2 bg-white hover:bg-neutral-50 text-neutral-800 text-xs font-semibold rounded-xl border border-neutral-200 shadow-xs transition active:scale-[0.98] cursor-pointer"
            >
              {language === 'bn' ? 'পদক্ষেপ সমূহ দেখুন' : 'Setup Steps'}
            </button>
          </div>

          {/* SETUP STORE COLLAPSED ICON */}
          <div className={`bg-[#FAF8F5] border border-neutral-200/80 rounded-2xl p-3 ${sidebarCollapsed ? 'flex justify-center' : 'hidden'}`}>
            <button
              onClick={() => setShowSetupChecklist(!showSetupChecklist)}
              className="text-[#3BB75E] hover:text-[#3BB75E]/80 transition"
              title={language === 'bn' ? 'স্টোর সেটআপ' : 'Store Setup'}
            >
              <Check size={18} />
            </button>
          </div>
        </div>

        {/* PROFILE FOOTER */}
        <div className="p-4 border-t border-neutral-100 bg-white">
          <div
            onClick={() => handleNavClick('profile')}
            className={`flex items-center justify-between p-2 rounded-xl transition cursor-pointer ${
              activeTab === 'profile' ? 'bg-[#3BB75E] text-white' : 'hover:bg-neutral-50'
            } ${sidebarCollapsed ? 'justify-center px-0' : ''}`}
            title={sidebarCollapsed ? 'Profile' : undefined}
          >
            <div className={`flex items-center gap-3 ${sidebarCollapsed ? 'justify-center' : ''}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 border ${
                activeTab === 'profile' ? 'bg-white/20 text-white border-white/20' : 'bg-emerald-100 text-[#3BB75E] border-emerald-200/40'
              }`}>
                TA
              </div>
              <div className={`text-left ${sidebarCollapsed ? 'hidden' : 'block'}`}>
                <div className={`text-xs sm:text-sm font-bold tracking-tight leading-none ${
                  activeTab === 'profile' ? 'text-white' : 'text-neutral-900'
                }`}>
                  {language === 'bn' ? 'তারেক আদিত্য' : 'Taretan Aditya'}
                </div>
                <div className={`text-[10px] mt-1 uppercase font-semibold ${
                  activeTab === 'profile' ? 'text-white/70' : 'text-neutral-400'
                }`}>
                  {language === 'bn' ? 'অপারেটর' : 'Admin'}
                </div>
              </div>
            </div>
            {!sidebarCollapsed && (
              <LogOut size={14} className={`shrink-0 ${activeTab === 'profile' ? 'text-white' : 'text-neutral-400'}`} />
            )}
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className={`flex-1 min-w-0 bg-[#F8F9FA] flex flex-col justify-between min-h-screen transition-all duration-300 ease-in-out ${
        sidebarCollapsed ? 'lg:pl-[72px]' : 'lg:pl-[260px]'
      }`}>

        {/* TOP HEADER */}
        <header className="h-[76px] bg-white border-b border-neutral-200/60 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-4">
            {/* MOBILE HAMBURGER */}
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden w-10 h-10 bg-[#FAF9F6] border border-neutral-200/80 rounded-2xl flex items-center justify-center text-neutral-500 hover:text-neutral-900 transition cursor-pointer shrink-0"
              title="Open Menu"
            >
              <Menu size={18} />
            </button>

            {/* EXPAND BUTTON WHEN COLLAPSED */}
            <button
              onClick={() => setSidebarCollapsed(false)}
              className={`hidden lg:flex w-10 h-10 bg-[#FAF9F6] border border-neutral-200/80 rounded-2xl items-center justify-center text-neutral-500 hover:text-neutral-900 transition cursor-pointer shrink-0 ${
                sidebarCollapsed ? '' : 'hidden'
              }`}
              title="Expand Menu"
            >
              <ChevronRight size={18} />
            </button>

            <div className="w-40 sm:w-64 lg:w-96 relative">
              <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder={language === 'bn' ? 'এখানে খুঁজুন...' : 'Search here...'}
                className="w-full pl-11 pr-4 py-2.5 bg-[#FAF9F6] border border-neutral-200 focus:border-[#3BB75E] focus:bg-white rounded-2xl text-sm transition focus:outline-none focus:ring-1 focus:ring-[#3BB75E] outline-none text-neutral-800"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button className="hidden sm:flex w-10 h-10 bg-[#FAF9F6] border border-neutral-200/80 rounded-2xl items-center justify-center text-neutral-500 hover:text-[#3BB75E] hover:bg-emerald-50 transition cursor-pointer" title="Tutorial Playback">
              <Play size={16} className="fill-current text-neutral-500" />
            </button>

            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="w-10 h-10 bg-[#FAF9F6] border border-neutral-200/80 rounded-2xl flex items-center justify-center text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 transition cursor-pointer"
                title="Notifications"
              >
                <Bell size={18} />
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-orange-500" />
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2.5 w-72 sm:w-80 bg-white border border-neutral-200 rounded-2xl shadow-xl p-4 z-40 text-left">
                  <div className="flex items-center justify-between border-b pb-2 mb-2">
                    <span className="font-bold text-sm tracking-tight">{language === 'bn' ? 'সাম্প্রতিক বিজ্ঞপ্তি' : 'Latest Notifications'}</span>
                    <span className="text-[10px] text-[#3BB75E] font-semibold uppercase">{language === 'bn' ? 'একটিভ' : 'Active'}</span>
                  </div>
                  <div className="space-y-3">
                    {notifications.map((n) => (
                      <div key={n.id} className="text-xs hover:bg-neutral-50 p-1.5 rounded-lg transition">
                        <div className="font-medium text-neutral-800 leading-tight">{n.text}</div>
                        <div className="text-[10px] text-neutral-400 mt-1 flex items-center gap-1">
                          <Clock size={10} />
                          <span>{n.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button className="hidden sm:flex w-10 h-10 bg-[#FAF9F6] border border-neutral-200/80 rounded-2xl items-center justify-center text-neutral-500 hover:text-neutral-950 hover:bg-neutral-100 transition cursor-pointer" title="Messages & Feeds">
              <MessageSquare size={18} />
              <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-[#3BB75E]" />
            </button>

            <div className="hidden sm:block h-8 w-[1px] bg-neutral-200" />

            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-50 border border-neutral-200 flex items-center justify-center font-bold text-sm overflow-hidden text-neutral-700">
                <div className="w-full h-full bg-[#E5F9EA] text-[#3BB75E] flex items-center justify-center font-bold font-serif text-sm">
                  AN
                </div>
              </div>
              <div className="text-left hidden lg:block">
                <div className="text-xs sm:text-sm font-bold text-neutral-900 tracking-tight leading-none flex items-center gap-1.5">
                  <span>AgriNest</span>
                  <span className="w-3.5 h-3.5 rounded-full bg-emerald-50 text-[#3BB75E] flex items-center justify-center border border-emerald-200">
                    <Check size={8} className="stroke-[3]" />
                  </span>
                </div>
                <div className="text-[10px] text-neutral-400 mt-1 uppercase font-semibold">
                  Admin
                </div>
              </div>
              <button className="text-neutral-400 hover:text-neutral-900 cursor-pointer hidden sm:block">
                <ChevronDown size={14} />
              </button>
            </div>

            <button className="hidden sm:flex w-10 h-10 bg-[#FAF9F6] border border-neutral-200/80 rounded-2xl items-center justify-center text-neutral-500 hover:text-neutral-900 transition ml-1 cursor-pointer">
              <Settings size={18} />
            </button>
          </div>
        </header>

        {/* ACTIVE PAGE */}
        {renderActivePage()}

        {/* FOOTER */}
        <footer className="py-4 sm:py-6 px-4 sm:px-8 border-t border-neutral-200/50 bg-white text-center text-[10px] sm:text-xs text-neutral-400 font-medium">
          <div>&copy; 2026 Doyel Agro Farm Operations. Optimized for rural dispatch hubs. Created for AgriNest.</div>
        </footer>
      </main>

      {/* SETUP CHECKLIST MODAL */}
      {showSetupChecklist && (
        <div className="fixed inset-0 bg-neutral-950/40 backdrop-blur-xs flex items-center justify-center z-55 p-4">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl text-left border border-neutral-200">
            <div className="p-6 bg-[#3BB75E] text-white flex items-center justify-between">
              <div>
                <h3 className="font-serif font-black text-lg">{language === 'bn' ? 'স্টোর সেটআপ উইজার্ড' : 'AgriNest Store Setup'}</h3>
                <p className="text-xs text-white/80">{completedSteps} of {setupSteps.length} complete</p>
              </div>
              <button
                onClick={() => setShowSetupChecklist(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-lg font-bold border-0 transition"
              >
                &times;
              </button>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-xs text-neutral-500 leading-relaxed font-light">
                {language === 'bn'
                  ? 'আপনার দোয়েল এগ্রো শপের কার্যক্রম সফলভাবে শুরু করতে নীচের ধাপগুলো সম্পূর্ণ করুন।'
                  : 'Establish operations seamlessly with a visual checklist designed for absolute nontechnical managers.'}
              </p>
              <div className="divide-y divide-neutral-100">
                {setupSteps.map((step) => (
                  <div
                    key={step.id}
                    onClick={() => toggleStep(step.id)}
                    className="flex items-center justify-between py-3 cursor-pointer hover:bg-neutral-50/50 px-1 rounded-lg transition"
                  >
                    <span className={`text-xs ${step.done ? 'line-through text-neutral-400' : 'text-neutral-800 font-medium'}`}>
                      {step.text}
                    </span>
                    <button className={`w-5 h-5 rounded-full border flex items-center justify-center text-white transition-all ${
                      step.done ? 'bg-[#3BB75E] border-[#3BB75E]' : 'border-neutral-300 bg-white'
                    }`}>
                      {step.done && <Check size={12} className="stroke-[3.5]" />}
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6 bg-neutral-50 border-t border-neutral-100 flex justify-end rounded-b-3xl">
              <button
                onClick={() => setShowSetupChecklist(false)}
                className="px-5 py-2 bg-[#3BB75E] hover:bg-[#3BB75E]/90 text-white text-xs font-bold rounded-xl transition cursor-pointer shadow-sm border-0"
              >
                {language === 'bn' ? 'সম্পন্ন' : 'Done'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
