import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  Eye,
  Pencil,
  Trash2,
  Search,
  Sliders,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Calendar,
  Download,
  Info
} from 'lucide-react';

interface OrderItem {
  name: string;
  nameBn: string;
  quantity: string;
  price: string;
}

interface Order {
  id: string;
  orderNo: string;
  customer: string;
  items: OrderItem[];
  totalPrice: string;
  payMethod: string;
  orderDate: string;
  address: string;
  addressBn: string;
  status: 'Pending' | 'Out of delivery' | 'Delivered' | 'Preparing' | 'Cancelled';
}

export const OrdersPage: React.FC = () => {
  const { language } = useLanguage();

  const [orderFilter, setOrderFilter] = useState<'All' | 'Pending' | 'Preparing' | 'Out of delivery' | 'Delivered' | 'Cancelled'>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editStatus, setEditStatus] = useState<'Pending' | 'Out of delivery' | 'Delivered' | 'Preparing' | 'Cancelled'>('Pending');
  const [editAddress, setEditAddress] = useState('');

  const [orders, setOrders] = useState<Order[]>([
    {
      id: '1',
      orderNo: '#Order 01',
      customer: 'Mr. Sayedur Rahman',
      items: [
        { name: '1. Carrot', nameBn: '১. টাটকা গাজর', quantity: '01', price: '$10.00' },
        { name: '2. Potato', nameBn: '২. দেশি গোল আলু', quantity: '03', price: '$16.00' }
      ],
      totalPrice: '$26.00',
      payMethod: 'Bkash',
      orderDate: '21/05/26 04:27 pm',
      address: 'Raynagor H68 Sylhet',
      addressBn: 'রায়নাগর এইচ৬৮, সিলেট',
      status: 'Pending'
    },
    {
      id: '2',
      orderNo: '#Order 02',
      customer: 'Ms. Tasnim Sultana',
      items: [
        { name: '1. Tomato', nameBn: '১. খামারের লাল টমেটো', quantity: '01', price: '$10.00' },
        { name: '2. Cabbage', nameBn: '২. কচি বাঁধাকপি', quantity: '03', price: '$16.00' }
      ],
      totalPrice: '$26.00',
      payMethod: 'Nagad',
      orderDate: '21/05/26 04:27 pm',
      address: 'Sector 4, Uttara, Dhaka',
      addressBn: 'সেক্টর ৪, উত্তরা, ঢাকা',
      status: 'Out of delivery'
    },
    {
      id: '3',
      orderNo: '#Order 03',
      customer: 'Engr. Sakib Ahmed',
      items: [
        { name: '1. Spinach', nameBn: '১. পুষ্টিকর পালং শাক', quantity: '01', price: '$10.00' },
        { name: '2. Onion', nameBn: '২. দেশি লাল পেঁয়াজ', quantity: '03', price: '$16.00' }
      ],
      totalPrice: '$26.00',
      payMethod: 'Bkash',
      orderDate: '21/05/26 04:27 pm',
      address: 'Beutha Road, Manikganj',
      addressBn: 'বেউথা রোড, মানিকগঞ্জ',
      status: 'Delivered'
    },
    {
      id: '4',
      orderNo: '#Order 04',
      customer: 'Dr. Rafique Islam',
      items: [
        { name: '1. Broccoli', nameBn: '১. পুষ্টিকর ব্রকলি', quantity: '01', price: '$10.00' },
        { name: '2. Cauliflower', nameBn: '২. ফুলকপি', quantity: '03', price: '$16.00' }
      ],
      totalPrice: '$26.00',
      payMethod: 'COD',
      orderDate: '21/05/26 04:27 pm',
      address: 'Mirpur 10, Dhaka',
      addressBn: 'মিরপুর ১০, ঢাকা',
      status: 'Preparing'
    },
    {
      id: '5',
      orderNo: '#Order 05',
      customer: 'Farhana Yasmin',
      items: [
        { name: '1. Cucumber', nameBn: '১. শসা', quantity: '01', price: '$10.00' },
        { name: '2. Eggplant', nameBn: '২. গোল বেগুন', quantity: '03', price: '$16.00' }
      ],
      totalPrice: '$26.00',
      payMethod: 'Bkash',
      orderDate: '21/05/26 04:27 pm',
      address: 'Chashara, Narayanganj',
      addressBn: 'চাষাড়া, নারায়ণগঞ্জ',
      status: 'Cancelled'
    }
  ]);

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedOrder) {
      setOrders(prev => prev.map(o => o.id === selectedOrder.id ? { ...o, status: editStatus, address: editAddress } : o));
      setIsEditModalOpen(false);
    }
  };

  const handleDeleteOrder = (id: string) => {
    const confirmText = language === 'bn'
      ? 'আপনি কি নিশ্চিতভাবে এই অর্ডারটি ডিলিট করতে চান?'
      : 'Are you sure you want to delete this order?';
    if (window.confirm(confirmText)) {
      setOrders(prev => prev.filter(o => o.id !== id));
    }
  };

  const filteredOrders = orders.filter(o => {
    const matchSearch = o.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        o.orderNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        o.address.toLowerCase().includes(searchTerm.toLowerCase());

    if (orderFilter === 'All') return matchSearch;
    return o.status === orderFilter && matchSearch;
  });

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto w-full text-left">
      {/* HEADER & TIME ACTIONS ROW */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-black tracking-tight text-neutral-950">
            {language === 'bn' ? 'অর্ডার ওভারভিউ' : 'Order Overview'}
          </h1>
        </div>

        <div className="flex items-center gap-3.5">
          <button className="px-4 py-2.5 bg-white border border-neutral-200 hover:border-neutral-300 text-xs sm:text-sm text-neutral-700 font-medium rounded-xl flex items-center gap-2.5 shadow-xs transition cursor-pointer">
            <Calendar size={16} className="text-neutral-400" />
            <span>15 Mar, 2025 - 21 Mar, 2025</span>
            <ChevronDown size={14} className="text-neutral-400" />
          </button>

          <button
            onClick={() => alert(language === 'bn' ? 'CSV ফাইল ডাউনলোড করা হয়েছে!' : 'CSV exported successfully!')}
            className="px-4 py-2.5 bg-white hover:bg-neutral-50 text-neutral-800 text-xs sm:text-sm font-bold rounded-xl border border-neutral-200 shadow-xs transition flex items-center gap-2 cursor-pointer"
          >
            <Download size={15} className="text-neutral-400" />
            <span>{language === 'bn' ? 'এক্সপোর্ট সিএসভি' : 'Export CSV'}</span>
          </button>
        </div>
      </div>

      {/* 8 METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-neutral-200/70 shadow-xs space-y-4">
          <div className="flex justify-between items-start">
            <span className="text-sm font-semibold text-neutral-500">
              {language === 'bn' ? 'মোট অর্ডার সংখ্যা' : 'Total Orders'}
            </span>
            <span className="px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 rounded-full flex items-center gap-0.5">
              ↑ 4.9%
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-neutral-950">{orders.length + 75}</span>
          </div>
          <div className="text-[11px] text-neutral-400">vs 0 last period</div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-neutral-200/70 shadow-xs space-y-4">
          <div className="flex justify-between items-start">
            <span className="text-sm font-semibold text-neutral-500">
              {language === 'bn' ? 'বাতিলকৃত অর্ডার' : 'Cancelled Orders'}
            </span>
            <span className="px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 rounded-full flex items-center gap-0.5">
              ↑ 4.9%
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-neutral-950">
              {orders.filter(o => o.status === 'Cancelled').length + 20}
            </span>
          </div>
          <div className="text-[11px] text-neutral-400">vs 0 last period</div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-neutral-200/70 shadow-xs space-y-4">
          <div className="flex justify-between items-start">
            <span className="text-sm font-semibold text-neutral-500">
              {language === 'bn' ? 'নিশ্চিতকৃত অর্ডার' : 'Confirm Orders'}
            </span>
            <span className="px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 rounded-full flex items-center gap-0.5">
              ↑ 4.9%
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-neutral-950">
              {orders.filter(o => o.status !== 'Cancelled').length + 73}
            </span>
          </div>
          <div className="text-[11px] text-neutral-400">vs 0 last period</div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-neutral-200/70 shadow-xs space-y-4">
          <div className="flex justify-between items-start">
            <span className="text-sm font-semibold text-neutral-500">
              {language === 'bn' ? 'প্রস্তুতকৃত অর্ডার' : 'Preparing Orders'}
            </span>
            <span className="px-2.5 py-0.5 text-[11px] font-bold bg-red-50 text-red-600 rounded-full flex items-center gap-0.5">
              ↑ 4.9%
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-neutral-950">
              {orders.filter(o => o.status === 'Preparing').length + 47}
            </span>
          </div>
          <div className="text-[11px] text-neutral-400">vs 0 last period</div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-neutral-200/70 shadow-xs space-y-4">
          <div className="flex justify-between items-start">
            <span className="text-sm font-semibold text-neutral-500">
              {language === 'bn' ? 'ডেলিভারির জন্য প্রস্তুত' : 'Ready for delivery'}
            </span>
            <span className="px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 rounded-full flex items-center gap-0.5">
              ↑ 4.9%
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-neutral-950">
              {orders.filter(o => o.status === 'Pending').length + 41}
            </span>
          </div>
          <div className="text-[11px] text-neutral-400">vs 0 last period</div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-neutral-200/70 shadow-xs space-y-4">
          <div className="flex justify-between items-start">
            <span className="text-sm font-semibold text-neutral-500">
              {language === 'bn' ? 'ট্রান্সিট অর্ডার' : 'Order on its way'}
            </span>
            <span className="px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 rounded-full flex items-center gap-0.5">
              ↑ 4.9%
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-neutral-950">
              {orders.filter(o => o.status === 'Out of delivery').length + 19}
            </span>
          </div>
          <div className="text-[11px] text-neutral-400">vs 0 last period</div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-neutral-200/70 shadow-xs space-y-4">
          <div className="flex justify-between items-start">
            <span className="text-sm font-semibold text-neutral-500">
              {language === 'bn' ? 'অপেক্ষমান অর্ডার' : 'Pending orders'}
            </span>
            <span className="px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 rounded-full flex items-center gap-0.5">
              ↑ 4.9%
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-neutral-950">
              {orders.filter(o => o.status === 'Pending').length + 29}
            </span>
          </div>
          <div className="text-[11px] text-neutral-400">vs 0 last period</div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-neutral-200/70 shadow-xs space-y-4">
          <div className="flex justify-between items-start">
            <span className="text-sm font-semibold text-neutral-500">
              {language === 'bn' ? 'ডেলিভারি সম্পন্ন' : 'Delivered Order'}
            </span>
            <span className="px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 rounded-full flex items-center gap-0.5">
              ↑ 4.9%
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-neutral-950">
              {orders.filter(o => o.status === 'Delivered').length + 24}
            </span>
          </div>
          <div className="text-[11px] text-neutral-400">vs 0 last period</div>
        </div>
      </div>

      {/* MAIN WHITE TABLE BOX CARD */}
      <div className="bg-white border border-neutral-200/80 rounded-3xl overflow-hidden shadow-xs">
        <div className="p-6 border-b border-neutral-200 flex flex-col md:flex-row md:items-center justify-between gap-5 bg-white">
          <div className="flex flex-wrap gap-2">
            {(['All', 'Pending', 'Preparing', 'Out of delivery', 'Delivered', 'Cancelled'] as const).map((filterVal) => {
              const isActive = orderFilter === filterVal;
              return (
                <button
                  key={filterVal}
                  onClick={() => setOrderFilter(filterVal)}
                  className={`px-4.5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#3BB75E] text-white shadow-sm border-transparent'
                      : 'bg-white hover:bg-neutral-50 text-neutral-500 border border-neutral-200'
                  }`}
                >
                  {filterVal === 'All' && (language === 'bn' ? 'সব অর্ডার (All Menu)' : 'All Menu')}
                  {filterVal === 'Pending' && (language === 'bn' ? 'অপেক্ষমান' : 'Pending')}
                  {filterVal === 'Preparing' && (language === 'bn' ? 'প্রস্তুত হচ্ছে' : 'Preparing')}
                  {filterVal === 'Out of delivery' && (language === 'bn' ? 'কুরিয়ারে পাঠানো' : 'Out of delivery')}
                  {filterVal === 'Delivered' && (language === 'bn' ? 'ডেলিভারি সম্পন্ন' : 'Completed')}
                  {filterVal === 'Cancelled' && (language === 'bn' ? 'বাতিল' : 'Cancelled')}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder={language === 'bn' ? 'অর্ডার নম্বর বা কাস্টমার খুঁজুন...' : 'Search'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 bg-neutral-50 hover:bg-neutral-100/50 border border-neutral-200 focus:border-[#3BB75E] focus:bg-white rounded-xl text-xs transition focus:outline-none focus:ring-1 focus:ring-[#3BB75E] outline-none text-neutral-800 w-48 font-semibold"
              />
            </div>

            <button className="px-4.5 py-2 hover:bg-neutral-50 text-neutral-600 text-xs font-semibold rounded-xl border border-neutral-200 flex items-center gap-2 transition cursor-pointer">
              <Sliders size={14} className="text-neutral-400" />
              <span>{language === 'bn' ? 'ফিল্টার' : 'Filter'}</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm text-neutral-600 border-collapse min-w-[1000px]">
            <thead>
              <tr className="border-b border-neutral-100 text-[11px] sm:text-xs uppercase font-semibold text-neutral-500 bg-neutral-50/50">
                <th className="py-4 px-6 font-bold">Order No</th>
                <th className="py-4 px-4 font-bold">Customer</th>
                <th className="py-4 px-4 font-bold">Items Name</th>
                <th className="py-4 px-4 font-bold text-center">Quantity</th>
                <th className="py-4 px-4 font-bold">Price per Item</th>
                <th className="py-4 px-4 font-bold">Total Price</th>
                <th className="py-4 px-4 font-bold">Pay Method</th>
                <th className="py-4 px-4 font-bold">Order Date</th>
                <th className="py-4 px-4 font-bold">Address</th>
                <th className="py-4 px-4 font-bold">Delivery Status</th>
                <th className="py-4 px-6 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 font-sans text-neutral-700 bg-white">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={11} className="py-12 text-center text-neutral-400 font-light">
                    {language === 'bn' ? 'কোনো অর্ডার খুঁজে পাওয়া যায়নি।' : 'No matching orders processed.'}
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-neutral-50/60 transition-colors">
                    <td className="py-5 px-6 font-bold font-mono text-neutral-900">{order.orderNo}</td>
                    <td className="py-5 px-4 font-extrabold text-neutral-900 tracking-tight text-xs sm:text-[13px]">{order.customer}</td>
                    <td className="py-5 px-4">
                      <div className="space-y-1.5 text-xs text-neutral-500 font-medium leading-relaxed">
                        {order.items.map((item, idx) => (
                          <div key={idx}>
                            {language === 'bn' ? item.nameBn : item.name}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="py-5 px-4 text-center">
                      <div className="space-y-1.5 text-xs font-mono">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="font-extrabold text-neutral-500 py-[1.5px]">
                            {item.quantity}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="py-5 px-4">
                      <div className="space-y-1.5 text-xs font-mono">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="text-neutral-500 py-[1.5px]">
                            {item.price}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="py-5 px-4 font-semibold text-neutral-900 font-mono">{order.totalPrice}</td>
                    <td className="py-5 px-4">
                      <span className="font-serif font-black text-xs text-neutral-600 bg-neutral-100 rounded-md px-2.5 py-1 uppercase tracking-tight">
                        {order.payMethod}
                      </span>
                    </td>
                    <td className="py-5 px-4 text-xs font-mono text-neutral-400">{order.orderDate}</td>
                    <td className="py-5 px-4 max-w-[180px] truncate text-xs font-medium text-neutral-500">
                      {language === 'bn' ? order.addressBn : order.address}
                    </td>
                    <td className="py-5 px-4">
                      {order.status === 'Pending' && (
                        <span className="bg-amber-50 text-amber-600 font-bold px-3.5 py-1.5 rounded-full text-[10px] tracking-wide inline-flex items-center uppercase font-mono border border-amber-100">
                          Pending
                        </span>
                      )}
                      {order.status === 'Out of delivery' && (
                        <span className="bg-purple-50 text-purple-600 font-bold px-3.5 py-1.5 rounded-full text-[10px] tracking-wide inline-flex items-center uppercase font-mono border border-purple-100">
                          Out of delivery
                        </span>
                      )}
                      {order.status === 'Delivered' && (
                        <span className="bg-emerald-50 text-emerald-700 font-bold px-3.5 py-1.5 rounded-full text-[10px] tracking-wide inline-flex items-center uppercase font-mono border border-emerald-100">
                          Delivered
                        </span>
                      )}
                      {order.status === 'Preparing' && (
                        <span className="bg-indigo-50 text-indigo-600 font-bold px-3.5 py-1.5 rounded-full text-[10px] tracking-wide inline-flex items-center uppercase font-mono border border-indigo-100 animate-pulse">
                          Delivery Status
                        </span>
                      )}
                      {order.status === 'Cancelled' && (
                        <span className="bg-red-50 text-red-600 font-bold px-3.5 py-1.5 rounded-full text-[10px] tracking-wide inline-flex items-center uppercase font-mono border border-red-100">
                          Cancelled
                        </span>
                      )}
                    </td>
                    <td className="py-5 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => { setSelectedOrder(order); setIsViewModalOpen(true); }}
                          className="w-8 h-8 rounded-lg border border-neutral-200 text-neutral-400 hover:text-[#3BB75E] hover:border-emerald-200 bg-white flex items-center justify-center transition cursor-pointer"
                          title="View Details"
                        >
                          <Eye size={14} />
                        </button>
                        <button
                          onClick={() => { setSelectedOrder(order); setEditStatus(order.status); setEditAddress(order.address); setIsEditModalOpen(true); }}
                          className="w-8 h-8 rounded-lg border border-neutral-200 text-neutral-400 hover:text-blue-500 hover:border-blue-200 bg-white flex items-center justify-center transition cursor-pointer"
                          title="Edit Status"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteOrder(order.id)}
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

        <div className="p-5 border-t border-neutral-100 bg-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 font-sans text-xs sm:text-sm text-neutral-500 font-medium">
          <div>Page 1 of 16</div>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 rounded-lg border border-neutral-200 flex items-center justify-center text-neutral-400 hover:bg-neutral-50 transition cursor-pointer" title="Previous Page">
              <ChevronLeft size={14} />
            </button>
            <button className="w-8 h-8 rounded-lg bg-[#3BB75E] text-white font-extrabold flex items-center justify-center shadow-xs">1</button>
            <button className="w-8 h-8 rounded-lg border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 hover:text-neutral-900 bg-white transition cursor-pointer">2</button>
            <button className="w-8 h-8 rounded-lg border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 hover:text-neutral-900 bg-white transition cursor-pointer">3</button>
            <button className="w-8 h-8 rounded-lg border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 hover:text-neutral-900 bg-white transition cursor-pointer">4</button>
            <span className="px-1 text-neutral-300 font-bold">..</span>
            <button className="w-8 h-8 rounded-lg border border-neutral-200 flex items-center justify-center text-neutral-400 hover:bg-neutral-50 transition cursor-pointer" title="Next Page">
              <ChevronRight size={14} />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <select className="border border-neutral-200 hover:border-neutral-300 py-1.5 px-3 rounded-lg text-xs bg-white text-neutral-600 font-bold focus:outline-none cursor-pointer">
              <option>8 data per row</option>
              <option>16 data per row</option>
              <option>32 data per row</option>
            </select>
          </div>
        </div>
      </div>

      {/* VIEW ORDER DETAILS MODAL */}
      {isViewModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-neutral-950/40 backdrop-blur-xs flex items-center justify-center z-55 p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl text-left border border-neutral-200">
            <div className="p-6 bg-gradient-to-r from-emerald-500 to-teal-600 text-white flex items-center justify-between">
              <div>
                <h3 className="font-serif font-black text-xl">{selectedOrder.orderNo} Details</h3>
                <p className="text-xs text-white/80">{selectedOrder.orderDate}</p>
              </div>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-lg font-bold border-0 transition"
              >
                &times;
              </button>
            </div>
            <div className="p-6 space-y-5">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block mb-1">
                  {language === 'bn' ? 'কাস্টমার প্রোফাইল' : 'CUSTOMER PROFILE'}
                </span>
                <div className="font-bold text-neutral-900 text-base">{selectedOrder.customer}</div>
                <div className="text-xs text-neutral-500 mt-1">
                  {language === 'bn' ? selectedOrder.addressBn : selectedOrder.address}
                </div>
              </div>
              <div className="border-t border-neutral-100 pt-4">
                <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block mb-2.5">
                  {language === 'bn' ? 'অর্ডারকৃত শস্যসমূহ' : 'HARVEST ITEMS LIST'}
                </span>
                <div className="space-y-2 bg-[#FAF8F5] p-4 rounded-2xl border border-neutral-100">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs">
                      <span className="font-bold text-neutral-800">
                        {language === 'bn' ? item.nameBn : item.name}
                      </span>
                      <div className="flex gap-4 text-neutral-500 font-mono">
                        <span>Qty: {item.quantity}</span>
                        <span className="font-bold text-[#3BB75E]">{item.price}</span>
                      </div>
                    </div>
                  ))}
                  <div className="border-t border-dashed border-neutral-200 mt-2 pt-2 flex justify-between items-center text-sm font-bold text-neutral-900">
                    <span>{language === 'bn' ? 'মোট পেমেন্ট' : 'Total Invoice'}</span>
                    <span className="font-mono text-emerald-700">{selectedOrder.totalPrice}</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 border-t border-neutral-100 pt-4">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block">
                    {language === 'bn' ? 'টাকা প্রদানের মাধ্যম' : 'PAY METHOD'}
                  </span>
                  <span className="text-xs font-bold text-neutral-700 block mt-1 uppercase font-mono">{selectedOrder.payMethod}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block">
                    {language === 'bn' ? 'ডেলিভারি স্ট্যাটাস' : 'CURRENT STATE'}
                  </span>
                  <span className="text-xs font-bold text-[#3BB75E] block mt-1 uppercase">{selectedOrder.status}</span>
                </div>
              </div>
            </div>
            <div className="p-6 bg-neutral-50 border-t border-neutral-100 flex justify-end gap-3 rounded-b-3xl">
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="px-5 py-2.5 bg-white border border-neutral-200 hover:bg-neutral-100 text-neutral-700 text-xs font-bold rounded-xl transition cursor-pointer"
              >
                {language === 'bn' ? 'বন্ধ করুন' : 'Close Receipt'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT STATUS & ADDRESS MODAL */}
      {isEditModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-neutral-950/40 backdrop-blur-xs flex items-center justify-center z-55 p-4">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl text-left border border-neutral-200">
            <div className="p-6 bg-[#3BB75E] text-white flex items-center justify-between">
              <div>
                <h3 className="font-serif font-black text-lg">{language === 'bn' ? 'অর্ডার স্ট্যাটাস পরিবর্তন' : 'Process Dispatch Pipeline'}</h3>
                <p className="text-xs text-white/85">{selectedOrder.orderNo} for {selectedOrder.customer}</p>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-lg font-bold border-0 transition"
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleSaveEdit}>
              <div className="p-6 space-y-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block">
                    {language === 'bn' ? 'ডেলিভারি ধাপ সিলেক্ট করুন' : 'CHANGE PIPELINE STATE'}
                  </label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value as any)}
                    className="w-full border border-neutral-200 hover:border-neutral-300 py-2.5 px-3 rounded-xl text-xs bg-white text-neutral-800 font-bold focus:outline-none focus:ring-1 focus:ring-[#3BB75E]"
                  >
                    <option value="Pending">Pending (অপেক্ষমান)</option>
                    <option value="Preparing">Delivery Status (প্রস্তুত হচ্ছে)</option>
                    <option value="Out of delivery">Out of delivery (কুরিয়ারে)</option>
                    <option value="Delivered">Delivered (সম্পন্ন)</option>
                    <option value="Cancelled">Cancelled (বাতিলকৃত)</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block">
                    {language === 'bn' ? 'ডেলিভারি ঠিকানা' : 'SHIPPING LOCATION ADDRESS'}
                  </label>
                  <textarea
                    value={editAddress}
                    onChange={(e) => setEditAddress(e.target.value)}
                    rows={3}
                    className="w-full border border-neutral-200 p-3 rounded-xl text-xs text-neutral-800 focus:outline-none focus:ring-1 focus:ring-[#3BB75E]"
                    placeholder="Address details"
                  />
                </div>
                <div className="p-3.5 bg-neutral-50 rounded-xl text-[10px] text-neutral-500 leading-relaxed font-light flex items-start gap-2 border border-neutral-100">
                  <Info size={14} className="text-[#3BB75E] shrink-0 mt-0.5" />
                  <span>
                    {language === 'bn'
                      ? 'অপারেটরদের অনুরোধ: অর্ডারের সঠিক পরিবর্তন সাথে সাথেই করুন যাতে গুদাম ম্যানেজার সঠিক শস্য সংগ্রহ করতে পারেন।'
                      : 'Non-technical reminder: ensure checkmate confirmation tags are clear on wire transfer before marking as dispatched.'}
                  </span>
                </div>
              </div>
              <div className="p-6 bg-neutral-50 border-t border-neutral-100 flex justify-end gap-3 rounded-b-3xl">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4.5 py-2 hover:bg-neutral-100 text-neutral-600 text-xs font-bold rounded-xl border border-neutral-200 transition cursor-pointer"
                >
                  {language === 'bn' ? 'বাতিল' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#3BB75E] hover:bg-[#3BB75E]/90 text-white text-xs font-bold rounded-xl transition cursor-pointer shadow-xs border-0"
                >
                  {language === 'bn' ? 'সেভ করুন' : 'Confirm & Dispatch'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
