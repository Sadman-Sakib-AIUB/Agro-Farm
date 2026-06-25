import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  Search,
  Eye,
  Pencil,
  Trash2,
  Truck,
  MapPin,
  Package,
  Users,
  ChevronLeft,
  ChevronRight,
  Info
} from 'lucide-react';

interface Delivery {
  id: string;
  deliveryNo: string;
  orderNo: string;
  customer: string;
  address: string;
  addressBn: string;
  zone: string;
  courier: string;
  status: 'Pending Pickup' | 'In Transit' | 'Out for Delivery' | 'Delivered' | 'Failed' | 'Returned';
  assignedDate: string;
}

export const DeliveryPage: React.FC = () => {
  const { language } = useLanguage();

  const [deliveryFilter, setDeliveryFilter] = useState<'All' | 'Pending Pickup' | 'In Transit' | 'Out for Delivery' | 'Delivered' | 'Failed' | 'Returned'>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDelivery, setSelectedDelivery] = useState<Delivery | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editStatus, setEditStatus] = useState<string>('Pending Pickup');

  const [deliveries, setDeliveries] = useState<Delivery[]>([
    { id: '1', deliveryNo: '#DEL-001', orderNo: '#Order 01', customer: 'Mr. Sayedur Rahman', address: 'Raynagor H68, Sylhet', addressBn: 'রায়নাগর এইচ৬৮, সিলেট', zone: 'Sylhet City', courier: 'SA Paribahan', status: 'Pending Pickup', assignedDate: '22/05/26' },
    { id: '2', deliveryNo: '#DEL-002', orderNo: '#Order 02', customer: 'Ms. Tasnim Sultana', address: 'Sector 4, Uttara, Dhaka', addressBn: 'সেক্টর ৪, উত্তরা, ঢাকা', zone: 'Uttara', courier: 'Korotoa Express', status: 'In Transit', assignedDate: '22/05/26' },
    { id: '3', deliveryNo: '#DEL-003', orderNo: '#Order 03', customer: 'Engr. Sakib Ahmed', address: 'Beutha Road, Manikganj', addressBn: 'বেউথা রোড, মানিকগঞ্জ', zone: 'Manikganj Sadar', courier: 'Manikganj Courier', status: 'Out for Delivery', assignedDate: '21/05/26' },
    { id: '4', deliveryNo: '#DEL-004', orderNo: '#Order 04', customer: 'Dr. Rafique Islam', address: 'Mirpur 10, Dhaka', addressBn: 'মিরপুর ১০, ঢাকা', zone: 'Mirpur', courier: 'Sundarban Courier', status: 'Delivered', assignedDate: '21/05/26' },
    { id: '5', deliveryNo: '#DEL-005', orderNo: '#Order 05', customer: 'Farhana Yasmin', address: 'Chashara, Narayanganj', addressBn: 'চাষাড়া, নারায়ণগঞ্জ', zone: 'Narayanganj', courier: 'SA Paribahan', status: 'Failed', assignedDate: '21/05/26' },
    { id: '6', deliveryNo: '#DEL-006', orderNo: '#Order 06', customer: 'Rahim Uddin', address: 'Bashundhara R/A, Dhaka', addressBn: 'বাসুন্ধরা আর/এ, ঢাকা', zone: 'Bashundhara', courier: 'Korotoa Express', status: 'In Transit', assignedDate: '22/05/26' },
    { id: '7', deliveryNo: '#DEL-007', orderNo: '#Order 07', customer: 'Shahina Akter', address: 'Kazipara, Mirpur, Dhaka', addressBn: 'কাজীপাড়া, মিরপুর, ঢাকা', zone: 'Mirpur', courier: 'Sundarban Courier', status: 'Returned', assignedDate: '20/05/26' },
    { id: '8', deliveryNo: '#DEL-008', orderNo: '#Order 08', customer: 'Abdul Malek', address: 'Shahbag, Dhaka', addressBn: 'শাহবাগ, ঢাকা', zone: 'Shahbag', courier: 'SA Paribahan', status: 'Delivered', assignedDate: '20/05/26' },
  ]);

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDelivery) {
      setDeliveries(prev => prev.map(d => d.id === selectedDelivery.id ? { ...d, status: editStatus as Delivery['status'] } : d));
      setIsEditModalOpen(false);
    }
  };

  const handleDelete = (id: string) => {
    const confirmText = language === 'bn' ? 'এই ডেলিভারি ডিলিট করবেন?' : 'Delete this delivery?';
    if (window.confirm(confirmText)) {
      setDeliveries(prev => prev.filter(d => d.id !== id));
    }
  };

  const filteredDeliveries = deliveries.filter(d => {
    const matchSearch = d.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        d.deliveryNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        d.orderNo.toLowerCase().includes(searchTerm.toLowerCase());
    if (deliveryFilter === 'All') return matchSearch;
    return d.status === deliveryFilter && matchSearch;
  });

  const totalDeliveries = 156;
  const outForDelivery = deliveries.filter(d => d.status === 'Out for Delivery').length + 22;
  const delivered = deliveries.filter(d => d.status === 'Delivered').length + 108;
  const failed = deliveries.filter(d => d.status === 'Failed' || d.status === 'Returned').length + 12;

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto w-full text-left">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-black tracking-tight text-neutral-950">
            {language === 'bn' ? 'ডেলিভারি ট্র্যাকিং' : 'Delivery Tracking'}
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-neutral-200/70 shadow-xs space-y-4">
          <div className="flex justify-between items-start">
            <span className="text-sm font-semibold text-neutral-500">
              {language === 'bn' ? 'মোট ডেলিভারি' : 'Total Deliveries'}
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#3BB75E] flex items-center justify-center">
              <Package size={16} />
            </div>
          </div>
          <div className="text-3xl font-bold text-neutral-950">{totalDeliveries}</div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-neutral-200/70 shadow-xs space-y-4">
          <div className="flex justify-between items-start">
            <span className="text-sm font-semibold text-neutral-500">
              {language === 'bn' ? 'ডেলিভারির পথে' : 'Out for Delivery'}
            </span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <Truck size={16} />
            </div>
          </div>
          <div className="text-3xl font-bold text-neutral-950">{outForDelivery}</div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-neutral-200/70 shadow-xs space-y-4">
          <div className="flex justify-between items-start">
            <span className="text-sm font-semibold text-neutral-500">
              {language === 'bn' ? 'ডেলিভারি সম্পন্ন' : 'Delivered'}
            </span>
            <div className="w-8 h-8 rounded-lg bg-green-50 text-green-600 flex items-center justify-center">
              <MapPin size={16} />
            </div>
          </div>
          <div className="text-3xl font-bold text-neutral-950">{delivered}</div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-neutral-200/70 shadow-xs space-y-4">
          <div className="flex justify-between items-start">
            <span className="text-sm font-semibold text-neutral-500">
              {language === 'bn' ? 'ব্যর্থ/ফেরত' : 'Failed/Returned'}
            </span>
            <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
              <Users size={16} />
            </div>
          </div>
          <div className="text-3xl font-bold text-neutral-950">{failed}</div>
        </div>
      </div>

      <div className="bg-white border border-neutral-200/80 rounded-3xl overflow-hidden shadow-xs">
        <div className="p-6 border-b border-neutral-200 flex flex-col md:flex-row md:items-center justify-between gap-5 bg-white">
          <div className="flex flex-wrap gap-2">
            {(['All', 'Pending Pickup', 'In Transit', 'Out for Delivery', 'Delivered', 'Failed', 'Returned'] as const).map((filterVal) => {
              const isActive = deliveryFilter === filterVal;
              return (
                <button key={filterVal} onClick={() => setDeliveryFilter(filterVal)}
                  className={`px-4.5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    isActive ? 'bg-[#3BB75E] text-white shadow-sm border-transparent' : 'bg-white hover:bg-neutral-50 text-neutral-500 border border-neutral-200'
                  }`}>
                  {filterVal === 'All' && (language === 'bn' ? 'সব ডেলিভারি' : 'All')}
                  {filterVal === 'Pending Pickup' && (language === 'bn' ? 'পিকআপ অপেক্ষা' : 'Pending')}
                  {filterVal === 'In Transit' && (language === 'bn' ? 'পথে' : 'In Transit')}
                  {filterVal === 'Out for Delivery' && (language === 'bn' ? 'ডেলিভারির পথে' : 'Out for Del.')}
                  {filterVal === 'Delivered' && (language === 'bn' ? 'ডেলিভারি সম্পন্ন' : 'Delivered')}
                  {filterVal === 'Failed' && (language === 'bn' ? 'ব্যর্থ' : 'Failed')}
                  {filterVal === 'Returned' && (language === 'bn' ? 'ফেরত' : 'Returned')}
                </button>
              );
            })}
          </div>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder={language === 'bn' ? 'খুঁজুন...' : 'Search...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 bg-neutral-50 border border-neutral-200 focus:border-[#3BB75E] focus:bg-white rounded-xl text-xs transition focus:outline-none focus:ring-1 focus:ring-[#3BB75E] outline-none text-neutral-800 w-48 font-semibold"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm text-neutral-600 border-collapse min-w-[1000px]">
            <thead>
              <tr className="border-b border-neutral-100 text-[11px] sm:text-xs uppercase font-semibold text-neutral-500 bg-neutral-50/50">
                <th className="py-4 px-6 font-bold">{language === 'bn' ? 'ডেলিভারি নং' : 'Del. No'}</th>
                <th className="py-4 px-4 font-bold">{language === 'bn' ? 'অর্ডার নং' : 'Order'}</th>
                <th className="py-4 px-4 font-bold">{language === 'bn' ? 'গ্রাহক' : 'Customer'}</th>
                <th className="py-4 px-4 font-bold">{language === 'bn' ? 'ঠিকানা' : 'Address'}</th>
                <th className="py-4 px-4 font-bold">{language === 'bn' ? 'জোন' : 'Zone'}</th>
                <th className="py-4 px-4 font-bold">{language === 'bn' ? 'কুরিয়ার' : 'Courier'}</th>
                <th className="py-4 px-4 font-bold">{language === 'bn' ? 'স্ট্যাটাস' : 'Status'}</th>
                <th className="py-4 px-4 font-bold">{language === 'bn' ? 'তারিখ' : 'Date'}</th>
                <th className="py-4 px-6 font-bold text-right">{language === 'bn' ? 'অ্যাকশন' : 'Action'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-neutral-700 bg-white">
              {filteredDeliveries.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-neutral-400 font-light">
                    {language === 'bn' ? 'কোনো ডেলিভারি পাওয়া যায়নি।' : 'No deliveries found.'}
                  </td>
                </tr>
              ) : (
                filteredDeliveries.map((del) => (
                  <tr key={del.id} className="hover:bg-neutral-50/60 transition-colors">
                    <td className="py-5 px-6 font-bold font-mono text-neutral-900">{del.deliveryNo}</td>
                    <td className="py-5 px-4 font-mono text-neutral-500 text-xs">{del.orderNo}</td>
                    <td className="py-5 px-4 font-extrabold text-neutral-900 tracking-tight text-xs sm:text-[13px]">{del.customer}</td>
                    <td className="py-5 px-4 max-w-[160px] truncate text-xs font-medium text-neutral-500">
                      {language === 'bn' ? del.addressBn : del.address}
                    </td>
                    <td className="py-5 px-4 text-xs font-medium text-neutral-500">{del.zone}</td>
                    <td className="py-5 px-4 text-xs font-semibold text-neutral-600">{del.courier}</td>
                    <td className="py-5 px-4">
                      {del.status === 'Pending Pickup' && <span className="bg-amber-50 text-amber-600 font-bold px-3.5 py-1.5 rounded-full text-[10px] tracking-wide inline-flex items-center uppercase font-mono border border-amber-100">Pending</span>}
                      {del.status === 'In Transit' && <span className="bg-blue-50 text-blue-600 font-bold px-3.5 py-1.5 rounded-full text-[10px] tracking-wide inline-flex items-center uppercase font-mono border border-blue-100">In Transit</span>}
                      {del.status === 'Out for Delivery' && <span className="bg-purple-50 text-purple-600 font-bold px-3.5 py-1.5 rounded-full text-[10px] tracking-wide inline-flex items-center uppercase font-mono border border-purple-100">Out for Del.</span>}
                      {del.status === 'Delivered' && <span className="bg-emerald-50 text-emerald-700 font-bold px-3.5 py-1.5 rounded-full text-[10px] tracking-wide inline-flex items-center uppercase font-mono border border-emerald-100">Delivered</span>}
                      {del.status === 'Failed' && <span className="bg-red-50 text-red-600 font-bold px-3.5 py-1.5 rounded-full text-[10px] tracking-wide inline-flex items-center uppercase font-mono border border-red-100">Failed</span>}
                      {del.status === 'Returned' && <span className="bg-rose-50 text-rose-600 font-bold px-3.5 py-1.5 rounded-full text-[10px] tracking-wide inline-flex items-center uppercase font-mono border border-rose-100">Returned</span>}
                    </td>
                    <td className="py-5 px-4 text-xs font-mono text-neutral-400">{del.assignedDate}</td>
                    <td className="py-5 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => { setSelectedDelivery(del); setIsViewModalOpen(true); }} className="w-8 h-8 rounded-lg border border-neutral-200 text-neutral-400 hover:text-[#3BB75E] hover:border-emerald-200 bg-white flex items-center justify-center transition cursor-pointer" title="View Details"><Eye size={14} /></button>
                        <button onClick={() => { setSelectedDelivery(del); setEditStatus(del.status); setIsEditModalOpen(true); }} className="w-8 h-8 rounded-lg border border-neutral-200 text-neutral-400 hover:text-blue-500 hover:border-blue-200 bg-white flex items-center justify-center transition cursor-pointer" title="Edit Status"><Pencil size={14} /></button>
                        <button onClick={() => handleDelete(del.id)} className="w-8 h-8 rounded-lg border border-neutral-200 text-neutral-400 hover:text-red-500 hover:border-red-200 bg-white flex items-center justify-center transition cursor-pointer" title="Delete"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="p-5 border-t border-neutral-100 bg-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 font-sans text-xs sm:text-sm text-neutral-500 font-medium">
          <div>Page 1 of 16</div>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 rounded-lg border border-neutral-200 flex items-center justify-center text-neutral-400 hover:bg-neutral-50 transition cursor-pointer"><ChevronLeft size={14} /></button>
            <button className="w-8 h-8 rounded-lg bg-[#3BB75E] text-white font-extrabold flex items-center justify-center shadow-xs">1</button>
            <button className="w-8 h-8 rounded-lg border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 hover:text-neutral-900 bg-white transition cursor-pointer">2</button>
            <button className="w-8 h-8 rounded-lg border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 hover:text-neutral-900 bg-white transition cursor-pointer">3</button>
            <span className="px-1 text-neutral-300 font-bold">..</span>
            <button className="w-8 h-8 rounded-lg border border-neutral-200 flex items-center justify-center text-neutral-400 hover:bg-neutral-50 transition cursor-pointer"><ChevronRight size={14} /></button>
          </div>
        </div>
      </div>

      {isViewModalOpen && selectedDelivery && (
        <div className="fixed inset-0 bg-neutral-950/40 backdrop-blur-xs flex items-center justify-center z-55 p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl text-left border border-neutral-200">
            <div className="p-6 bg-gradient-to-r from-emerald-500 to-teal-600 text-white flex items-center justify-between">
              <div>
                <h3 className="font-serif font-black text-lg">{selectedDelivery.deliveryNo}</h3>
                <p className="text-xs text-white/80">{selectedDelivery.orderNo} - {selectedDelivery.assignedDate}</p>
              </div>
              <button onClick={() => setIsViewModalOpen(false)} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-lg font-bold border-0 transition">&times;</button>
            </div>
            <div className="p-6 space-y-5">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block mb-1">{language === 'bn' ? 'গ্রাহক' : 'CUSTOMER'}</span>
                <div className="font-bold text-neutral-900 text-base">{selectedDelivery.customer}</div>
                <div className="text-xs text-neutral-500 mt-1">{language === 'bn' ? selectedDelivery.addressBn : selectedDelivery.address}</div>
              </div>
              <div className="grid grid-cols-2 gap-4 border-t border-neutral-100 pt-4">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block">{language === 'bn' ? 'জোন' : 'ZONE'}</span>
                  <span className="text-xs font-bold text-neutral-700 block mt-1">{selectedDelivery.zone}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block">{language === 'bn' ? 'কুরিয়ার' : 'COURIER'}</span>
                  <span className="text-xs font-bold text-neutral-700 block mt-1">{selectedDelivery.courier}</span>
                </div>
              </div>
              <div className="border-t border-neutral-100 pt-4">
                <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block mb-1">{language === 'bn' ? 'স্ট্যাটাস' : 'STATUS'}</span>
                <span className="text-xs font-bold text-[#3BB75E] uppercase">{selectedDelivery.status}</span>
              </div>
            </div>
            <div className="p-6 bg-neutral-50 border-t border-neutral-100 flex justify-end rounded-b-3xl">
              <button onClick={() => setIsViewModalOpen(false)} className="px-5 py-2.5 bg-white border border-neutral-200 hover:bg-neutral-100 text-neutral-700 text-xs font-bold rounded-xl transition cursor-pointer">
                {language === 'bn' ? 'বন্ধ করুন' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}

      {isEditModalOpen && selectedDelivery && (
        <div className="fixed inset-0 bg-neutral-950/40 backdrop-blur-xs flex items-center justify-center z-55 p-4">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl text-left border border-neutral-200">
            <div className="p-6 bg-[#3BB75E] text-white flex items-center justify-between">
              <div>
                <h3 className="font-serif font-black text-lg">{language === 'bn' ? 'ডেলিভারি স্ট্যাটাস পরিবর্তন' : 'Update Delivery Status'}</h3>
                <p className="text-xs text-white/85">{selectedDelivery.deliveryNo}</p>
              </div>
              <button onClick={() => setIsEditModalOpen(false)} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-lg font-bold border-0 transition">&times;</button>
            </div>
            <form onSubmit={handleSaveEdit}>
              <div className="p-6 space-y-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block">{language === 'bn' ? 'স্ট্যাটাস সিলেক্ট করুন' : 'CHANGE STATUS'}</label>
                  <select value={editStatus} onChange={(e) => setEditStatus(e.target.value)} className="w-full border border-neutral-200 hover:border-neutral-300 py-2.5 px-3 rounded-xl text-xs bg-white text-neutral-800 font-bold focus:outline-none focus:ring-1 focus:ring-[#3BB75E]">
                    <option value="Pending Pickup">Pending Pickup</option>
                    <option value="In Transit">In Transit</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Failed">Failed</option>
                    <option value="Returned">Returned</option>
                  </select>
                </div>
                <div className="p-3.5 bg-neutral-50 rounded-xl text-[10px] text-neutral-500 leading-relaxed font-light flex items-start gap-2 border border-neutral-100">
                  <Info size={14} className="text-[#3BB75E] shrink-0 mt-0.5" />
                  <span>
                    {language === 'bn'
                      ? 'ডেলিভারি স্ট্যাটাস আপডেট করলে গ্রাহককে নোটিফিকেশন পাঠানো হবে।'
                      : 'Updating delivery status will notify the customer via SMS.'}
                  </span>
                </div>
              </div>
              <div className="p-6 bg-neutral-50 border-t border-neutral-100 flex justify-end gap-3 rounded-b-3xl">
                <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-4.5 py-2 hover:bg-neutral-100 text-neutral-600 text-xs font-bold rounded-xl border border-neutral-200 transition cursor-pointer">
                  {language === 'bn' ? 'বাতিল' : 'Cancel'}
                </button>
                <button type="submit" className="px-5 py-2 bg-[#3BB75E] hover:bg-[#3BB75E]/90 text-white text-xs font-bold rounded-xl transition cursor-pointer shadow-xs border-0">
                  {language === 'bn' ? 'আপডেট করুন' : 'Update Status'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
