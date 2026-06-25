import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  Search,
  Plus,
  Trash2,
  Pencil,
  MapPin,
  Leaf,
  TrendingUp,
  CheckCircle,
  X
} from 'lucide-react';

interface Crop {
  id: number;
  name: string;
  nameBn: string;
  area: string;
  season: string;
  plantedDate: string;
  expectedHarvest: string;
  status: 'Growing' | 'Ready' | 'Harvested' | 'Planned';
  yield: string;
}

export const OverviewPage: React.FC = () => {
  const { language } = useLanguage();

  const [crops, setCrops] = useState<Crop[]>([
    { id: 1, name: 'Summer Rice', nameBn: 'গ্রীষ্মকালীন ধান', area: '12.5 Acres', season: 'Kharif', plantedDate: '15/03/26', expectedHarvest: '15/07/26', status: 'Growing', yield: '—' },
    { id: 2, name: 'Jute', nameBn: 'পাট', area: '8.0 Acres', season: 'Kharif', plantedDate: '10/04/26', expectedHarvest: '20/08/26', status: 'Growing', yield: '—' },
    { id: 3, name: 'Winter Tomato', nameBn: 'শীতকালীন টমেটো', area: '5.5 Acres', season: 'Rabi', plantedDate: '01/11/25', expectedHarvest: '15/02/26', status: 'Harvested', yield: '8.2 tons' },
    { id: 4, name: 'Mustard Seeds', nameBn: 'সরিষা বীজ', area: '6.0 Acres', season: 'Rabi', plantedDate: '20/10/25', expectedHarvest: '05/02/26', status: 'Harvested', yield: '4.5 tons' },
    { id: 5, name: 'Red Amaranth', nameBn: 'লাল শাক', area: '3.2 Acres', season: 'Summer', plantedDate: '01/06/26', expectedHarvest: '25/07/26', status: 'Ready', yield: '—' },
    { id: 6, name: 'Pumpkin', nameBn: 'মিষ্টি কুমড়া', area: '4.0 Acres', season: 'Kharif', plantedDate: '05/05/26', expectedHarvest: '10/09/26', status: 'Growing', yield: '—' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newNameBn, setNewNameBn] = useState('');
  const [newArea, setNewArea] = useState('');
  const [newSeason, setNewSeason] = useState('Kharif');

  const filteredCrops = crops.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.nameBn.includes(searchTerm)
  );

  const totalArea = 45.2;
  const activeCrops = crops.filter(c => c.status === 'Growing' || c.status === 'Ready').length;
  const harvestedYield = crops.filter(c => c.status === 'Harvested').reduce((sum, c) => {
    const val = parseFloat(c.yield.replace(' tons', ''));
    return sum + (isNaN(val) ? 0 : val);
  }, 0);

  const handleAddCrop = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newArea) return;
    const newId = crops.length + 1;
    setCrops([...crops, {
      id: newId,
      name: newName,
      nameBn: newNameBn || newName,
      area: `${newArea} Acres`,
      season: newSeason,
      plantedDate: new Date().toLocaleDateString('en-GB'),
      expectedHarvest: 'TBD',
      status: 'Planned',
      yield: '—'
    }]);
    setShowAddModal(false);
    setNewName('');
    setNewNameBn('');
    setNewArea('');
    setNewSeason('Kharif');
  };

  const handleDeleteCrop = (id: number) => {
    const confirmText = language === 'bn' ? 'এই ফসল ডিলিট করবেন?' : 'Delete this crop?';
    if (window.confirm(confirmText)) {
      setCrops(prev => prev.filter(c => c.id !== id));
    }
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto w-full text-left">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-black tracking-tight text-neutral-950">
            {language === 'bn' ? 'খামার সারসংক্ষেপ' : 'Farm Overview'}
          </h1>
        </div>
        <button onClick={() => setShowAddModal(true)} className="px-5 py-2.5 bg-[#3BB75E] hover:bg-[#3BB75E]/90 text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition flex items-center gap-2 cursor-pointer">
          <Plus size={16} />
          <span>{language === 'bn' ? 'নতুন ফসল যোগ করুন' : 'Add Crop'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-neutral-200/70 shadow-xs space-y-4">
          <div className="flex justify-between items-start">
            <span className="text-sm font-semibold text-neutral-500">
              {language === 'bn' ? 'মোট জমি' : 'Total Farm Area'}
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#3BB75E] flex items-center justify-center">
              <MapPin size={16} />
            </div>
          </div>
          <div className="text-3xl font-bold text-neutral-950">{totalArea} Acres</div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-neutral-200/70 shadow-xs space-y-4">
          <div className="flex justify-between items-start">
            <span className="text-sm font-semibold text-neutral-500">
              {language === 'bn' ? 'সক্রিয় ফসল' : 'Active Crops'}
            </span>
            <div className="w-8 h-8 rounded-lg bg-green-50 text-green-600 flex items-center justify-center">
              <Leaf size={16} />
            </div>
          </div>
          <div className="text-3xl font-bold text-neutral-950">{activeCrops}</div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-neutral-200/70 shadow-xs space-y-4">
          <div className="flex justify-between items-start">
            <span className="text-sm font-semibold text-neutral-500">
              {language === 'bn' ? 'এ মৌসুমে উৎপাদন' : 'This Season Yield'}
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <TrendingUp size={16} />
            </div>
          </div>
          <div className="text-3xl font-bold text-neutral-950">{harvestedYield.toFixed(1)} tons</div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-neutral-200/70 shadow-xs space-y-4">
          <div className="flex justify-between items-start">
            <span className="text-sm font-semibold text-neutral-500">
              {language === 'bn' ? 'ফসল প্রস্তুত' : 'Harvest Readiness'}
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <CheckCircle size={16} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-neutral-950">
              {crops.filter(c => c.status === 'Ready').length}
            </span>
            <span className="text-xs text-neutral-400 font-medium">
              {language === 'bn' ? 'ফসল প্রস্তুত' : 'crops ready'}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white border border-neutral-200/80 rounded-3xl overflow-hidden shadow-xs">
        <div className="p-6 border-b border-neutral-200 flex flex-col md:flex-row md:items-center justify-between gap-5 bg-white">
          <div className="flex flex-wrap gap-2">
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
              {language === 'bn' ? 'সকল ফসল' : 'ALL CROPS'}
            </span>
          </div>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder={language === 'bn' ? 'ফসলের নাম খুঁজুন...' : 'Search crops...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 bg-neutral-50 border border-neutral-200 focus:border-[#3BB75E] focus:bg-white rounded-xl text-xs transition focus:outline-none focus:ring-1 focus:ring-[#3BB75E] outline-none text-neutral-800 w-56 font-semibold"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm text-neutral-600 border-collapse min-w-[900px]">
            <thead>
              <tr className="border-b border-neutral-100 text-[11px] sm:text-xs uppercase font-semibold text-neutral-500 bg-neutral-50/50">
                <th className="py-4 px-6 font-bold">#</th>
                <th className="py-4 px-4 font-bold">{language === 'bn' ? 'ফসলের নাম' : 'Crop Name'}</th>
                <th className="py-4 px-4 font-bold">{language === 'bn' ? 'জমি' : 'Area'}</th>
                <th className="py-4 px-4 font-bold">{language === 'bn' ? 'মৌসুম' : 'Season'}</th>
                <th className="py-4 px-4 font-bold">{language === 'bn' ? 'রোপণের তারিখ' : 'Planted'}</th>
                <th className="py-4 px-4 font-bold">{language === 'bn' ? 'প্রত্যাশিত ফসল' : 'Expected Harvest'}</th>
                <th className="py-4 px-4 font-bold">{language === 'bn' ? 'ফসলের পরিমাণ' : 'Yield'}</th>
                <th className="py-4 px-4 font-bold">{language === 'bn' ? 'স্ট্যাটাস' : 'Status'}</th>
                <th className="py-4 px-6 font-bold text-right">{language === 'bn' ? 'অ্যাকশন' : 'Action'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-neutral-700 bg-white">
              {filteredCrops.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-neutral-400 font-light">
                    {language === 'bn' ? 'কোনো ফসল পাওয়া যায়নি।' : 'No crops found.'}
                  </td>
                </tr>
              ) : (
                filteredCrops.map((crop) => (
                  <tr key={crop.id} className="hover:bg-neutral-50/60 transition-colors">
                    <td className="py-5 px-6 font-mono text-neutral-400 text-xs">{String(crop.id).padStart(2, '0')}</td>
                    <td className="py-5 px-4">
                      <div className="font-bold text-neutral-900">{crop.name}</div>
                      <div className="text-[10px] text-neutral-400 mt-0.5">{crop.nameBn}</div>
                    </td>
                    <td className="py-5 px-4 text-xs font-mono text-neutral-500">{crop.area}</td>
                    <td className="py-5 px-4">
                      <span className="text-xs font-semibold text-neutral-600 bg-neutral-100 rounded-md px-2.5 py-1">{crop.season}</span>
                    </td>
                    <td className="py-5 px-4 text-xs font-mono text-neutral-400">{crop.plantedDate}</td>
                    <td className="py-5 px-4 text-xs font-mono text-neutral-400">{crop.expectedHarvest}</td>
                    <td className="py-5 px-4 text-xs font-semibold text-neutral-800 font-mono">{crop.yield}</td>
                    <td className="py-5 px-4">
                      {crop.status === 'Growing' && (
                        <span className="bg-blue-50 text-blue-600 font-bold px-3.5 py-1.5 rounded-full text-[10px] tracking-wide inline-flex items-center uppercase font-mono border border-blue-100">Growing</span>
                      )}
                      {crop.status === 'Ready' && (
                        <span className="bg-emerald-50 text-emerald-700 font-bold px-3.5 py-1.5 rounded-full text-[10px] tracking-wide inline-flex items-center uppercase font-mono border border-emerald-100">Ready</span>
                      )}
                      {crop.status === 'Harvested' && (
                        <span className="bg-amber-50 text-amber-600 font-bold px-3.5 py-1.5 rounded-full text-[10px] tracking-wide inline-flex items-center uppercase font-mono border border-amber-100">Harvested</span>
                      )}
                      {crop.status === 'Planned' && (
                        <span className="bg-purple-50 text-purple-600 font-bold px-3.5 py-1.5 rounded-full text-[10px] tracking-wide inline-flex items-center uppercase font-mono border border-purple-100">Planned</span>
                      )}
                    </td>
                    <td className="py-5 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="w-8 h-8 rounded-lg border border-neutral-200 text-neutral-400 hover:text-blue-500 hover:border-blue-200 bg-white flex items-center justify-center transition cursor-pointer" title="Edit">
                          <Pencil size={14} />
                        </button>
                        <button onClick={() => handleDeleteCrop(crop.id)} className="w-8 h-8 rounded-lg border border-neutral-200 text-neutral-400 hover:text-red-500 hover:border-red-200 bg-white flex items-center justify-center transition cursor-pointer" title="Delete">
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
          <div>{language === 'bn' ? `মোট ${filteredCrops.length} টি ফসল` : `${filteredCrops.length} crops total`}</div>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-neutral-950/40 backdrop-blur-xs flex items-center justify-center z-55 p-4">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl text-left border border-neutral-200">
            <div className="p-6 bg-[#3BB75E] text-white flex items-center justify-between">
              <div>
                <h3 className="font-serif font-black text-lg">{language === 'bn' ? 'নতুন ফসল যোগ করুন' : 'Add New Crop'}</h3>
              </div>
              <button onClick={() => setShowAddModal(false)} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-lg font-bold border-0 transition">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleAddCrop}>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block">{language === 'bn' ? 'ফসলের নাম' : 'Crop Name'}</label>
                    <input value={newName} onChange={(e) => setNewName(e.target.value)} className="w-full border border-neutral-200 p-2.5 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#3BB75E]" placeholder="e.g. Summer Rice" required />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block">{language === 'bn' ? 'বাংলা নাম' : 'Bengali Name'}</label>
                    <input value={newNameBn} onChange={(e) => setNewNameBn(e.target.value)} className="w-full border border-neutral-200 p-2.5 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#3BB75E]" placeholder="যেমন: গ্রীষ্মকালীন ধান" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block">{language === 'bn' ? 'জমির পরিমাণ' : 'Area (Acres)'}</label>
                    <input type="number" step="0.1" value={newArea} onChange={(e) => setNewArea(e.target.value)} className="w-full border border-neutral-200 p-2.5 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#3BB75E]" placeholder="e.g. 5.0" required />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block">{language === 'bn' ? 'মৌসুম' : 'Season'}</label>
                    <select value={newSeason} onChange={(e) => setNewSeason(e.target.value)} className="w-full border border-neutral-200 p-2.5 rounded-xl text-xs bg-white focus:outline-none focus:ring-1 focus:ring-[#3BB75E]">
                      <option value="Kharif">Kharif</option>
                      <option value="Rabi">Rabi</option>
                      <option value="Summer">Summer</option>
                      <option value="Winter">Winter</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-neutral-50 border-t border-neutral-100 flex justify-end gap-3 rounded-b-3xl">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4.5 py-2 hover:bg-neutral-100 text-neutral-600 text-xs font-bold rounded-xl border border-neutral-200 transition cursor-pointer">
                  {language === 'bn' ? 'বাতিল' : 'Cancel'}
                </button>
                <button type="submit" className="px-5 py-2 bg-[#3BB75E] hover:bg-[#3BB75E]/90 text-white text-xs font-bold rounded-xl transition cursor-pointer shadow-xs border-0">
                  {language === 'bn' ? 'যোগ করুন' : 'Add Crop'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
