import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  Search,
  Pencil,
  Save,
  Store,
  CreditCard,
  Truck,
  Bell,
  Globe,
  DollarSign,
  X,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface Setting {
  id: string;
  name: string;
  nameBn: string;
  value: string;
  lastUpdated: string;
  status: 'Configured' | 'Not Set' | 'Active' | 'Inactive';
}

export const SettingsPage: React.FC = () => {
  const { language } = useLanguage();

  const [settings, setSettings] = useState<Setting[]>([
    { id: 'store', name: 'Store Name & Logo', nameBn: 'দোকানের নাম ও লোগো', value: 'Doyel Agro Farm', lastUpdated: '01/01/26', status: 'Configured' },
    { id: 'payment', name: 'Payment Gateway', nameBn: 'পেমেন্ট গেটওয়ে', value: 'bKash, Nagad, COD', lastUpdated: '15/03/26', status: 'Active' },
    { id: 'shipping', name: 'Shipping Zones', nameBn: 'ডেলিভারি জোন', value: 'Dhaka, Manikganj, Sylhet', lastUpdated: '10/02/26', status: 'Configured' },
    { id: 'notification', name: 'SMS & Email Notification', nameBn: 'এসএমএস ও ইমেইল নোটিফিকেশন', value: 'Active - All channels', lastUpdated: '20/04/26', status: 'Active' },
    { id: 'currency', name: 'Currency & Tax', nameBn: 'মুদ্রা ও কর', value: 'USD ($) | Tax: 5%', lastUpdated: '05/01/26', status: 'Configured' },
    { id: 'social', name: 'Social Media Links', nameBn: 'সোশ্যাল মিডিয়া লিংক', value: 'Facebook, YouTube, Instagram', lastUpdated: '12/03/26', status: 'Not Set' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [editSetting, setEditSetting] = useState<Setting | null>(null);
  const [editValue, setEditValue] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);

  const filteredSettings = settings.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.nameBn.includes(searchTerm) ||
    s.value.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const configured = settings.filter(s => s.status === 'Configured' || s.status === 'Active').length;
  const notSet = settings.filter(s => s.status === 'Not Set').length;

  const handleOpenEdit = (setting: Setting) => {
    setEditSetting(setting);
    setEditValue(setting.value);
    setShowEditModal(true);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editSetting) {
      setSettings(prev => prev.map(s =>
        s.id === editSetting.id
          ? { ...s, value: editValue, lastUpdated: new Date().toLocaleDateString('en-GB'), status: editValue ? 'Configured' : 'Not Set' as const }
          : s
      ));
      setShowEditModal(false);
    }
  };

  const statusIcon = (status: string) => {
    switch (status) {
      case 'Configured':
      case 'Active':
        return <CheckCircle size={12} className="text-emerald-500" />;
      default:
        return <XCircle size={12} className="text-amber-500" />;
    }
  };

  const statusColor = (status: string) => {
    switch (status) {
      case 'Configured':
      case 'Active':
        return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      default:
        return 'bg-amber-50 text-amber-600 border-amber-100';
    }
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto w-full text-left">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-black tracking-tight text-neutral-950">
            {language === 'bn' ? 'সেটিংস' : 'Settings'}
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-neutral-200/70 shadow-xs space-y-4">
          <div className="flex justify-between items-start">
            <span className="text-sm font-semibold text-neutral-500">
              {language === 'bn' ? 'মোট সেটিংস' : 'Total Settings'}
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#3BB75E] flex items-center justify-center">
              <Store size={16} />
            </div>
          </div>
          <div className="text-3xl font-bold text-neutral-950">{settings.length}</div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-neutral-200/70 shadow-xs space-y-4">
          <div className="flex justify-between items-start">
            <span className="text-sm font-semibold text-neutral-500">
              {language === 'bn' ? 'কনফিগার করা' : 'Configured'}
            </span>
            <div className="w-8 h-8 rounded-lg bg-green-50 text-green-600 flex items-center justify-center">
              <CheckCircle size={16} />
            </div>
          </div>
          <div className="text-3xl font-bold text-neutral-950">{configured}</div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-neutral-200/70 shadow-xs space-y-4">
          <div className="flex justify-between items-start">
            <span className="text-sm font-semibold text-neutral-500">
              {language === 'bn' ? 'সেট করা হয়নি' : 'Not Configured'}
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <XCircle size={16} />
            </div>
          </div>
          <div className="text-3xl font-bold text-neutral-950">{notSet}</div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-neutral-200/70 shadow-xs space-y-4">
          <div className="flex justify-between items-start">
            <span className="text-sm font-semibold text-neutral-500">
              {language === 'bn' ? 'সক্রিয় গেটওয়ে' : 'Active Gateways'}
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <CreditCard size={16} />
            </div>
          </div>
          <div className="text-3xl font-bold text-neutral-950">
            {settings.filter(s => s.status === 'Active').length}
          </div>
        </div>
      </div>

      <div className="bg-white border border-neutral-200/80 rounded-3xl overflow-hidden shadow-xs">
        <div className="p-6 border-b border-neutral-200 flex flex-col md:flex-row md:items-center justify-between gap-5 bg-white">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
              {language === 'bn' ? 'সকল সেটিংস' : 'ALL SETTINGS'}
            </span>
          </div>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder={language === 'bn' ? 'সেটিংস খুঁজুন...' : 'Search settings...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 bg-neutral-50 border border-neutral-200 focus:border-[#3BB75E] focus:bg-white rounded-xl text-xs transition focus:outline-none focus:ring-1 focus:ring-[#3BB75E] outline-none text-neutral-800 w-56 font-semibold"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm text-neutral-600 border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-neutral-100 text-[11px] sm:text-xs uppercase font-semibold text-neutral-500 bg-neutral-50/50">
                <th className="py-4 px-6 font-bold">{language === 'bn' ? 'সেটিংস' : 'Setting'}</th>
                <th className="py-4 px-4 font-bold">{language === 'bn' ? 'বর্তমান মান' : 'Current Value'}</th>
                <th className="py-4 px-4 font-bold">{language === 'bn' ? 'সর্বশেষ আপডেট' : 'Last Updated'}</th>
                <th className="py-4 px-4 font-bold">{language === 'bn' ? 'স্ট্যাটাস' : 'Status'}</th>
                <th className="py-4 px-6 font-bold text-right">{language === 'bn' ? 'অ্যাকশন' : 'Action'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-neutral-700 bg-white">
              {filteredSettings.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-neutral-400 font-light">
                    {language === 'bn' ? 'কোনো সেটিংস পাওয়া যায়নি।' : 'No settings found.'}
                  </td>
                </tr>
              ) : (
                filteredSettings.map((setting) => (
                  <tr key={setting.id} className="hover:bg-neutral-50/60 transition-colors">
                    <td className="py-5 px-6">
                      <div className="font-bold text-neutral-900">{language === 'bn' ? setting.nameBn : setting.name}</div>
                    </td>
                    <td className="py-5 px-4 text-xs font-medium text-neutral-600 max-w-[240px] truncate">{setting.value}</td>
                    <td className="py-5 px-4 text-xs font-mono text-neutral-400">{setting.lastUpdated}</td>
                    <td className="py-5 px-4">
                      <span className={`inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase font-mono border ${statusColor(setting.status)}`}>
                        {statusIcon(setting.status)}
                        {setting.status}
                      </span>
                    </td>
                    <td className="py-5 px-6 text-right">
                      <button
                        onClick={() => handleOpenEdit(setting)}
                        className="w-8 h-8 rounded-lg border border-neutral-200 text-neutral-400 hover:text-blue-500 hover:border-blue-200 bg-white flex items-center justify-center transition cursor-pointer"
                        title="Edit"
                      >
                        <Pencil size={14} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="p-5 border-t border-neutral-100 bg-white flex items-center justify-between font-sans text-xs text-neutral-500 font-medium">
          <div>{language === 'bn' ? `মোট ${filteredSettings.length} টি সেটিংস` : `${filteredSettings.length} settings`}</div>
        </div>
      </div>

      {showEditModal && editSetting && (
        <div className="fixed inset-0 bg-neutral-950/40 backdrop-blur-xs flex items-center justify-center z-55 p-4">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl text-left border border-neutral-200">
            <div className="p-6 bg-[#3BB75E] text-white flex items-center justify-between">
              <div>
                <h3 className="font-serif font-black text-lg">{language === 'bn' ? 'সেটিংস সম্পাদনা' : 'Edit Setting'}</h3>
                <p className="text-xs text-white/85">{language === 'bn' ? editSetting.nameBn : editSetting.name}</p>
              </div>
              <button onClick={() => setShowEditModal(false)} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-lg font-bold border-0 transition"><X size={18} /></button>
            </div>
            <form onSubmit={handleSaveEdit}>
              <div className="p-6 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block">
                    {language === 'bn' ? 'মান' : 'VALUE'}
                  </label>
                  <input
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="w-full border border-neutral-200 p-2.5 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#3BB75E]"
                    placeholder={language === 'bn' ? 'মান দিন' : 'Enter value'}
                    required
                  />
                </div>
                <div className="p-3.5 bg-neutral-50 rounded-xl text-[10px] text-neutral-500 leading-relaxed font-light flex items-start gap-2 border border-neutral-100">
                  <Globe size={14} className="text-[#3BB75E] shrink-0 mt-0.5" />
                  <span>
                    {language === 'bn'
                      ? 'সেটিংস পরিবর্তন করলে তা অবিলম্বে সক্রিয় হবে।'
                      : 'Changes will take effect immediately.'}
                  </span>
                </div>
              </div>
              <div className="p-6 bg-neutral-50 border-t border-neutral-100 flex justify-end gap-3 rounded-b-3xl">
                <button type="button" onClick={() => setShowEditModal(false)} className="px-4.5 py-2 hover:bg-neutral-100 text-neutral-600 text-xs font-bold rounded-xl border border-neutral-200 transition cursor-pointer">
                  {language === 'bn' ? 'বাতিল' : 'Cancel'}
                </button>
                <button type="submit" className="px-5 py-2 bg-[#3BB75E] hover:bg-[#3BB75E]/90 text-white text-xs font-bold rounded-xl transition cursor-pointer shadow-xs border-0 flex items-center gap-1.5">
                  <Save size={14} />
                  <span>{language === 'bn' ? 'সেভ করুন' : 'Save'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
