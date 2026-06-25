import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  Search,
  Plus,
  Trash2,
  Pencil,
  Truck,
  MapPin,
  Clock,
  Wrench,
  X,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface Vehicle {
  id: number;
  name: string;
  driver: string;
  type: string;
  routeArea: string;
  status: 'On Route' | 'Available' | 'Under Maintenance' | 'Inactive';
  lastActive: string;
  capacity: string;
}

export const VehiclesPage: React.FC = () => {
  const { language } = useLanguage();

  const [vehicles, setVehicles] = useState<Vehicle[]>([
    { id: 1, name: 'Doyel Agro Pickup - 01', driver: 'Abdur Rashid', type: 'Pickup Truck', routeArea: 'Manikganj - Dhaka', status: 'On Route', lastActive: '22/05/26 08:30 AM', capacity: '1.5 tons' },
    { id: 2, name: 'Doyel Agro Van - 02', driver: 'Sobahan Ali', type: 'Delivery Van', routeArea: 'Sylhet City', status: 'On Route', lastActive: '22/05/26 09:15 AM', capacity: '800 kg' },
    { id: 3, name: 'Doyel Agro Pickup - 03', driver: 'Mizanur Rahman', type: 'Pickup Truck', routeArea: 'Narayanganj', status: 'Available', lastActive: '21/05/26 05:00 PM', capacity: '1.5 tons' },
    { id: 4, name: 'Doyel Agro Bike - 04', driver: 'Jahid Hasan', type: 'Motorcycle', routeArea: 'Mirpur Zone', status: 'On Route', lastActive: '22/05/26 10:00 AM', capacity: '50 kg' },
    { id: 5, name: 'Doyel Agro Van - 05', driver: 'Shahin Alam', type: 'Delivery Van', routeArea: 'Uttara - Bashundhara', status: 'Under Maintenance', lastActive: '20/05/26 03:00 PM', capacity: '800 kg' },
    { id: 6, name: 'Doyel Agro Pickup - 06', driver: 'Rafiqul Islam', type: 'Pickup Truck', routeArea: 'Savar - Dhamrai', status: 'Available', lastActive: '21/05/26 06:30 PM', capacity: '2 tons' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDriver, setNewDriver] = useState('');
  const [newType, setNewType] = useState('Delivery Van');
  const [newCapacity, setNewCapacity] = useState('');

  const filteredVehicles = vehicles.filter(v =>
    v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.routeArea.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onRoute = vehicles.filter(v => v.status === 'On Route').length;
  const available = vehicles.filter(v => v.status === 'Available').length;
  const maintenance = vehicles.filter(v => v.status === 'Under Maintenance').length;

  const handleAddVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newDriver) return;
    const newId = vehicles.length + 1;
    setVehicles([...vehicles, {
      id: newId,
      name: newName,
      driver: newDriver,
      type: newType,
      routeArea: 'Unassigned',
      status: 'Available',
      lastActive: new Date().toLocaleString('en-GB'),
      capacity: newCapacity || '—'
    }]);
    setShowAddModal(false);
    setNewName('');
    setNewDriver('');
    setNewType('Delivery Van');
    setNewCapacity('');
  };

  const handleDeleteVehicle = (id: number) => {
    const confirmText = language === 'bn' ? 'এই যানবাহন ডিলিট করবেন?' : 'Delete this vehicle?';
    if (window.confirm(confirmText)) {
      setVehicles(prev => prev.filter(v => v.id !== id));
    }
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto w-full text-left">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-black tracking-tight text-neutral-950">
            {language === 'bn' ? 'চালান ও কুরিয়ার' : 'Courier & Fleet'}
          </h1>
        </div>
        <button onClick={() => setShowAddModal(true)} className="px-5 py-2.5 bg-[#3BB75E] hover:bg-[#3BB75E]/90 text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition flex items-center gap-2 cursor-pointer">
          <Plus size={16} />
          <span>{language === 'bn' ? 'নতুন যানবাহন যোগ করুন' : 'Add Vehicle'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-neutral-200/70 shadow-xs space-y-4">
          <div className="flex justify-between items-start">
            <span className="text-sm font-semibold text-neutral-500">
              {language === 'bn' ? 'মোট যানবাহন' : 'Total Vehicles'}
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#3BB75E] flex items-center justify-center">
              <Truck size={16} />
            </div>
          </div>
          <div className="text-3xl font-bold text-neutral-950">{vehicles.length}</div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-neutral-200/70 shadow-xs space-y-4">
          <div className="flex justify-between items-start">
            <span className="text-sm font-semibold text-neutral-500">
              {language === 'bn' ? 'রুটে আছে' : 'On Route'}
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <MapPin size={16} />
            </div>
          </div>
          <div className="text-3xl font-bold text-neutral-950">{onRoute}</div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-neutral-200/70 shadow-xs space-y-4">
          <div className="flex justify-between items-start">
            <span className="text-sm font-semibold text-neutral-500">
              {language === 'bn' ? 'প্রস্তুত' : 'Available'}
            </span>
            <div className="w-8 h-8 rounded-lg bg-green-50 text-green-600 flex items-center justify-center">
              <CheckCircle size={16} />
            </div>
          </div>
          <div className="text-3xl font-bold text-neutral-950">{available}</div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-neutral-200/70 shadow-xs space-y-4">
          <div className="flex justify-between items-start">
            <span className="text-sm font-semibold text-neutral-500">
              {language === 'bn' ? 'মেরামতাধীন' : 'Under Maintenance'}
            </span>
            <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
              <Wrench size={16} />
            </div>
          </div>
          <div className="text-3xl font-bold text-neutral-950">{maintenance}</div>
        </div>
      </div>

      <div className="bg-white border border-neutral-200/80 rounded-3xl overflow-hidden shadow-xs">
        <div className="p-6 border-b border-neutral-200 flex flex-col md:flex-row md:items-center justify-between gap-5 bg-white">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
              {language === 'bn' ? 'সকল যানবাহন' : 'ALL VEHICLES'}
            </span>
          </div>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder={language === 'bn' ? 'যানবাহন বা চালক খুঁজুন...' : 'Search vehicle or driver...'}
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
                <th className="py-4 px-4 font-bold">{language === 'bn' ? 'যানবাহন' : 'Vehicle'}</th>
                <th className="py-4 px-4 font-bold">{language === 'bn' ? 'চালক' : 'Driver'}</th>
                <th className="py-4 px-4 font-bold">{language === 'bn' ? 'ধরন' : 'Type'}</th>
                <th className="py-4 px-4 font-bold">{language === 'bn' ? 'রুট এলাকা' : 'Route Area'}</th>
                <th className="py-4 px-4 font-bold">{language === 'bn' ? 'ধারণ ক্ষমতা' : 'Capacity'}</th>
                <th className="py-4 px-4 font-bold">{language === 'bn' ? 'স্ট্যাটাস' : 'Status'}</th>
                <th className="py-4 px-4 font-bold">{language === 'bn' ? 'শেষ সক্রিয়' : 'Last Active'}</th>
                <th className="py-4 px-6 font-bold text-right">{language === 'bn' ? 'অ্যাকশন' : 'Action'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-neutral-700 bg-white">
              {filteredVehicles.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-neutral-400 font-light">
                    {language === 'bn' ? 'কোনো যানবাহন পাওয়া যায়নি।' : 'No vehicles found.'}
                  </td>
                </tr>
              ) : (
                filteredVehicles.map((v) => (
                  <tr key={v.id} className="hover:bg-neutral-50/60 transition-colors">
                    <td className="py-5 px-6 font-mono text-neutral-400 text-xs">{String(v.id).padStart(2, '0')}</td>
                    <td className="py-5 px-4 font-bold text-neutral-900">{v.name}</td>
                    <td className="py-5 px-4 text-xs font-medium text-neutral-600">{v.driver}</td>
                    <td className="py-5 px-4">
                      <span className="text-xs font-semibold text-neutral-600 bg-neutral-100 rounded-md px-2.5 py-1">{v.type}</span>
                    </td>
                    <td className="py-5 px-4 text-xs text-neutral-500">{v.routeArea}</td>
                    <td className="py-5 px-4 text-xs font-mono text-neutral-500">{v.capacity}</td>
                    <td className="py-5 px-4">
                      {v.status === 'On Route' && <span className="bg-blue-50 text-blue-600 font-bold px-3.5 py-1.5 rounded-full text-[10px] tracking-wide inline-flex items-center gap-1 uppercase font-mono border border-blue-100"><MapPin size={10} />On Route</span>}
                      {v.status === 'Available' && <span className="bg-emerald-50 text-emerald-700 font-bold px-3.5 py-1.5 rounded-full text-[10px] tracking-wide inline-flex items-center gap-1 uppercase font-mono border border-emerald-100"><CheckCircle size={10} />Available</span>}
                      {v.status === 'Under Maintenance' && <span className="bg-amber-50 text-amber-600 font-bold px-3.5 py-1.5 rounded-full text-[10px] tracking-wide inline-flex items-center gap-1 uppercase font-mono border border-amber-100"><Wrench size={10} />Maintenance</span>}
                      {v.status === 'Inactive' && <span className="bg-red-50 text-red-600 font-bold px-3.5 py-1.5 rounded-full text-[10px] tracking-wide inline-flex items-center gap-1 uppercase font-mono border border-red-100"><XCircle size={10} />Inactive</span>}
                    </td>
                    <td className="py-5 px-4 text-xs font-mono text-neutral-400">{v.lastActive}</td>
                    <td className="py-5 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="w-8 h-8 rounded-lg border border-neutral-200 text-neutral-400 hover:text-blue-500 hover:border-blue-200 bg-white flex items-center justify-center transition cursor-pointer" title="Edit"><Pencil size={14} /></button>
                        <button onClick={() => handleDeleteVehicle(v.id)} className="w-8 h-8 rounded-lg border border-neutral-200 text-neutral-400 hover:text-red-500 hover:border-red-200 bg-white flex items-center justify-center transition cursor-pointer" title="Delete"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="p-5 border-t border-neutral-100 bg-white flex items-center justify-between font-sans text-xs text-neutral-500 font-medium">
          <div>{language === 'bn' ? `মোট ${filteredVehicles.length} টি যানবাহন` : `${filteredVehicles.length} vehicles total`}</div>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-neutral-950/40 backdrop-blur-xs flex items-center justify-center z-55 p-4">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl text-left border border-neutral-200">
            <div className="p-6 bg-[#3BB75E] text-white flex items-center justify-between">
              <div>
                <h3 className="font-serif font-black text-lg">{language === 'bn' ? 'নতুন যানবাহন যোগ করুন' : 'Add New Vehicle'}</h3>
              </div>
              <button onClick={() => setShowAddModal(false)} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-lg font-bold border-0 transition"><X size={18} /></button>
            </div>
            <form onSubmit={handleAddVehicle}>
              <div className="p-6 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block">{language === 'bn' ? 'যানবাহনের নাম' : 'Vehicle Name'}</label>
                  <input value={newName} onChange={(e) => setNewName(e.target.value)} className="w-full border border-neutral-200 p-2.5 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#3BB75E]" placeholder="e.g. Doyel Agro Van - 07" required />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block">{language === 'bn' ? 'চালকের নাম' : 'Driver Name'}</label>
                  <input value={newDriver} onChange={(e) => setNewDriver(e.target.value)} className="w-full border border-neutral-200 p-2.5 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#3BB75E]" placeholder="e.g. Abdur Rashid" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block">{language === 'bn' ? 'ধরন' : 'Type'}</label>
                    <select value={newType} onChange={(e) => setNewType(e.target.value)} className="w-full border border-neutral-200 p-2.5 rounded-xl text-xs bg-white focus:outline-none focus:ring-1 focus:ring-[#3BB75E]">
                      <option value="Delivery Van">Delivery Van</option>
                      <option value="Pickup Truck">Pickup Truck</option>
                      <option value="Motorcycle">Motorcycle</option>
                      <option value="CNG">CNG</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block">{language === 'bn' ? 'ধারণ ক্ষমতা' : 'Capacity'}</label>
                    <input value={newCapacity} onChange={(e) => setNewCapacity(e.target.value)} className="w-full border border-neutral-200 p-2.5 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#3BB75E]" placeholder="e.g. 800 kg" />
                  </div>
                </div>
              </div>
              <div className="p-6 bg-neutral-50 border-t border-neutral-100 flex justify-end gap-3 rounded-b-3xl">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4.5 py-2 hover:bg-neutral-100 text-neutral-600 text-xs font-bold rounded-xl border border-neutral-200 transition cursor-pointer">
                  {language === 'bn' ? 'বাতিল' : 'Cancel'}
                </button>
                <button type="submit" className="px-5 py-2 bg-[#3BB75E] hover:bg-[#3BB75E]/90 text-white text-xs font-bold rounded-xl transition cursor-pointer shadow-xs border-0">
                  {language === 'bn' ? 'যোগ করুন' : 'Add Vehicle'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
