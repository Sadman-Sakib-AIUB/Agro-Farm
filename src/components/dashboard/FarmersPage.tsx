import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  Search,
  Plus,
  Trash2,
  Users,
  MapPin,
  CheckCircle,
  XCircle,
  Pencil,
  DollarSign
} from 'lucide-react';

interface Farmer {
  id: number;
  name: string;
  location: string;
  acreage: string;
  crop: string;
  status: string;
  payout: string;
}

export const FarmersPage: React.FC = () => {
  const { language } = useLanguage();

  const [farmers, setFarmers] = useState<Farmer[]>([
    { id: 1, name: 'Md. Abul Hossain', location: 'Beutha, Manikganj', acreage: '2.5 Acres', crop: 'Carrot & Potatoes', status: 'Active Verified', payout: '$340.00' },
    { id: 2, name: 'Sufia Begum', location: 'Singair, Manikganj', acreage: '1.8 Acres', crop: 'Spinach & Cauliflower', status: 'Active Verified', payout: '$210.00' },
    { id: 3, name: 'Nayan Ali Pramanik', location: 'Raynagor, Sylhet', acreage: '4.2 Acres', crop: 'Organic Cabbage', status: 'Pending Review', payout: '$0.00' },
    { id: 4, name: 'Mamtaj Begum', location: 'Savar, Dhaka', acreage: '1.2 Acres', crop: 'Green Mustard Seeds', status: 'Active Verified', payout: '$190.00' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newCrop, setNewCrop] = useState('');
  const [newAcreage, setNewAcreage] = useState('');

  const filteredFarmers = farmers.filter(f =>
    f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeVerified = farmers.filter(f => f.status === 'Active Verified').length;
  const pendingReview = farmers.filter(f => f.status === 'Pending Review').length;
  const totalPayout = farmers.reduce((sum, f) => sum + parseFloat(f.payout.replace('$', '')), 0);

  const handleAddFarmer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newLocation) return;
    const newId = farmers.length + 1;
    setFarmers([...farmers, {
      id: newId,
      name: newName,
      location: newLocation,
      acreage: newAcreage ? `${newAcreage} Acres` : '1.0 Acres',
      crop: newCrop || 'Vegetables',
      status: 'Active Verified',
      payout: '$0.00'
    }]);
    setShowAddModal(false);
    setNewName('');
    setNewLocation('');
    setNewCrop('');
    setNewAcreage('');
  };

  const handleDeleteFarmer = (id: number) => {
    const confirmText = language === 'bn' ? 'এই কৃষককে ডিলিট করবেন?' : 'Delete this farmer?';
    if (window.confirm(confirmText)) {
      setFarmers(prev => prev.filter(f => f.id !== id));
    }
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto w-full text-left">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-black tracking-tight text-neutral-950">
            {language === 'bn' ? 'কৃষক রেজিস্ট্রি' : 'Farmer Registry'}
          </h1>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2.5 bg-[#3BB75E] hover:bg-[#3BB75E]/90 text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition flex items-center gap-2 cursor-pointer"
        >
          <Plus size={16} />
          <span>{language === 'bn' ? 'নতুন কৃষক যোগ করুন' : 'Add Farmer'}</span>
        </button>
      </div>

      {/* METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-neutral-200/70 shadow-xs space-y-4">
          <div className="flex justify-between items-start">
            <span className="text-sm font-semibold text-neutral-500">
              {language === 'bn' ? 'মোট কৃষক' : 'Total Farmers'}
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#3BB75E] flex items-center justify-center">
              <Users size={16} />
            </div>
          </div>
          <div className="text-3xl font-bold text-neutral-950">{farmers.length}</div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-neutral-200/70 shadow-xs space-y-4">
          <div className="flex justify-between items-start">
            <span className="text-sm font-semibold text-neutral-500">
              {language === 'bn' ? 'সক্রিয় ও যাচাইকৃত' : 'Active Verified'}
            </span>
            <div className="w-8 h-8 rounded-lg bg-green-50 text-green-600 flex items-center justify-center">
              <CheckCircle size={16} />
            </div>
          </div>
          <div className="text-3xl font-bold text-neutral-950">{activeVerified}</div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-neutral-200/70 shadow-xs space-y-4">
          <div className="flex justify-between items-start">
            <span className="text-sm font-semibold text-neutral-500">
              {language === 'bn' ? 'অপেক্ষমান' : 'Pending Review'}
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <XCircle size={16} />
            </div>
          </div>
          <div className="text-3xl font-bold text-neutral-950">{pendingReview}</div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-neutral-200/70 shadow-xs space-y-4">
          <div className="flex justify-between items-start">
            <span className="text-sm font-semibold text-neutral-500">
              {language === 'bn' ? 'মোট পেমেন্ট' : 'Total Payout'}
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <DollarSign size={16} />
            </div>
          </div>
          <div className="text-3xl font-bold text-neutral-950">${totalPayout.toFixed(2)}</div>
        </div>
      </div>

      {/* TABLE CARD */}
      <div className="bg-white border border-neutral-200/80 rounded-3xl overflow-hidden shadow-xs">
        <div className="p-6 border-b border-neutral-200 flex flex-col md:flex-row md:items-center justify-between gap-5 bg-white">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
              {language === 'bn' ? 'সকল কৃষক' : 'ALL FARMERS'}
            </span>
          </div>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder={language === 'bn' ? 'নাম বা এলাকা খুঁজুন...' : 'Search by name or location...'}
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
                <th className="py-4 px-6 font-bold">#</th>
                <th className="py-4 px-4 font-bold">{language === 'bn' ? 'নাম' : 'Name'}</th>
                <th className="py-4 px-4 font-bold">{language === 'bn' ? 'অবস্থান' : 'Location'}</th>
                <th className="py-4 px-4 font-bold">{language === 'bn' ? 'জমির পরিমাণ' : 'Acreage'}</th>
                <th className="py-4 px-4 font-bold">{language === 'bn' ? 'ফসল' : 'Primary Crop'}</th>
                <th className="py-4 px-4 font-bold">{language === 'bn' ? 'স্ট্যাটাস' : 'Status'}</th>
                <th className="py-4 px-4 font-bold">{language === 'bn' ? 'পেমেন্ট' : 'Payout'}</th>
                <th className="py-4 px-6 font-bold text-right">{language === 'bn' ? 'অ্যাকশন' : 'Action'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-neutral-700 bg-white">
              {filteredFarmers.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-neutral-400 font-light">
                    {language === 'bn' ? 'কোনো কৃষক পাওয়া যায়নি।' : 'No farmers found.'}
                  </td>
                </tr>
              ) : (
                filteredFarmers.map((farmer) => (
                  <tr key={farmer.id} className="hover:bg-neutral-50/60 transition-colors">
                    <td className="py-5 px-6 font-mono text-neutral-400 text-xs">{String(farmer.id).padStart(2, '0')}</td>
                    <td className="py-5 px-4 font-bold text-neutral-900">{farmer.name}</td>
                    <td className="py-5 px-4">
                      <div className="flex items-center gap-1.5 text-xs text-neutral-500">
                        <MapPin size={12} className="text-neutral-400 shrink-0" />
                        <span>{farmer.location}</span>
                      </div>
                    </td>
                    <td className="py-5 px-4 text-xs font-mono text-neutral-500">{farmer.acreage}</td>
                    <td className="py-5 px-4">
                      <span className="text-xs font-medium text-neutral-600 bg-neutral-100 rounded-md px-2.5 py-1">
                        {farmer.crop}
                      </span>
                    </td>
                    <td className="py-5 px-4">
                      {farmer.status === 'Active Verified' ? (
                        <span className="bg-emerald-50 text-emerald-700 font-bold px-3.5 py-1.5 rounded-full text-[10px] tracking-wide inline-flex items-center gap-1 uppercase font-mono border border-emerald-100">
                          <CheckCircle size={10} />
                          Active
                        </span>
                      ) : (
                        <span className="bg-amber-50 text-amber-600 font-bold px-3.5 py-1.5 rounded-full text-[10px] tracking-wide inline-flex items-center gap-1 uppercase font-mono border border-amber-100">
                          <XCircle size={10} />
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="py-5 px-4 font-semibold text-neutral-900 font-mono text-xs">{farmer.payout}</td>
                    <td className="py-5 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="w-8 h-8 rounded-lg border border-neutral-200 text-neutral-400 hover:text-blue-500 hover:border-blue-200 bg-white flex items-center justify-center transition cursor-pointer" title="Edit">
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteFarmer(farmer.id)}
                          className="w-8 h-8 rounded-lg border border-neutral-200 text-neutral-400 hover:text-red-500 hover:border-red-200 bg-white flex items-center justify-center transition cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="p-5 border-t border-neutral-100 bg-white flex items-center justify-between font-sans text-xs text-neutral-500 font-medium">
          <div>{language === 'bn' ? `মোট ${filteredFarmers.length} জন কৃষক` : `${filteredFarmers.length} farmers total`}</div>
        </div>
      </div>

      {/* ADD FARMER MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-neutral-950/40 backdrop-blur-xs flex items-center justify-center z-55 p-4">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl text-left border border-neutral-200">
            <div className="p-6 bg-[#3BB75E] text-white flex items-center justify-between">
              <div>
                <h3 className="font-serif font-black text-lg">
                  {language === 'bn' ? 'নতুন কৃষক যোগ করুন' : 'Add New Farmer'}
                </h3>
              </div>
              <button onClick={() => setShowAddModal(false)} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-lg font-bold border-0 transition">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <form onSubmit={handleAddFarmer}>
              <div className="p-6 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block">{language === 'bn' ? 'কৃষকের নাম' : 'Farmer Name'}</label>
                  <input value={newName} onChange={(e) => setNewName(e.target.value)} className="w-full border border-neutral-200 p-2.5 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#3BB75E]" placeholder="e.g. Md. Abul Hossain" required />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block">{language === 'bn' ? 'অবস্থান' : 'Location'}</label>
                  <input value={newLocation} onChange={(e) => setNewLocation(e.target.value)} className="w-full border border-neutral-200 p-2.5 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#3BB75E]" placeholder="e.g. Beutha, Manikganj" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block">{language === 'bn' ? 'জমির পরিমাণ' : 'Acreage'}</label>
                    <input type="number" step="0.1" value={newAcreage} onChange={(e) => setNewAcreage(e.target.value)} className="w-full border border-neutral-200 p-2.5 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#3BB75E]" placeholder="1.0" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block">{language === 'bn' ? 'প্রধান ফসল' : 'Primary Crop'}</label>
                    <input value={newCrop} onChange={(e) => setNewCrop(e.target.value)} className="w-full border border-neutral-200 p-2.5 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#3BB75E]" placeholder="e.g. Vegetables" />
                  </div>
                </div>
              </div>
              <div className="p-6 bg-neutral-50 border-t border-neutral-100 flex justify-end gap-3 rounded-b-3xl">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4.5 py-2 hover:bg-neutral-100 text-neutral-600 text-xs font-bold rounded-xl border border-neutral-200 transition cursor-pointer">
                  {language === 'bn' ? 'বাতিল' : 'Cancel'}
                </button>
                <button type="submit" className="px-5 py-2 bg-[#3BB75E] hover:bg-[#3BB75E]/90 text-white text-xs font-bold rounded-xl transition cursor-pointer shadow-xs border-0">
                  {language === 'bn' ? 'যোগ করুন' : 'Add Farmer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
