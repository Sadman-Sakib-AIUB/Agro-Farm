import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  DollarSign,
  ShoppingBag,
  Users,
  Truck,
  Eye,
  Search,
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  TrendingUp
} from 'lucide-react';

interface RecentOrder {
  id: string;
  orderNo: string;
  customer: string;
  items: string;
  total: string;
  status: 'Pending' | 'Preparing' | 'Out of delivery' | 'Delivered' | 'Cancelled';
  date: string;
}

export const DashboardHome: React.FC = () => {
  const { language } = useLanguage();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<RecentOrder | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);

  const recentOrders: RecentOrder[] = [
    { id: '1', orderNo: '#Order 01', customer: 'Mr. Sayedur Rahman', items: 'Carrot, Potato', total: '$26.00', status: 'Pending', date: '21/05/26 04:27 pm' },
    { id: '2', orderNo: '#Order 02', customer: 'Ms. Tasnim Sultana', items: 'Tomato, Cabbage', total: '$26.00', status: 'Out of delivery', date: '21/05/26 04:27 pm' },
    { id: '3', orderNo: '#Order 03', customer: 'Engr. Sakib Ahmed', items: 'Spinach, Onion', total: '$26.00', status: 'Delivered', date: '21/05/26 04:27 pm' },
    { id: '4', orderNo: '#Order 04', customer: 'Dr. Rafique Islam', items: 'Broccoli, Cauliflower', total: '$26.00', status: 'Preparing', date: '21/05/26 04:27 pm' },
    { id: '5', orderNo: '#Order 05', customer: 'Farhana Yasmin', items: 'Cucumber, Eggplant', total: '$26.00', status: 'Cancelled', date: '21/05/26 04:27 pm' },
    { id: '6', orderNo: '#Order 06', customer: 'Rahim Uddin', items: 'Mustard Oil, Honey', total: '$38.50', status: 'Delivered', date: '22/05/26 09:15 am' },
  ];

  const filteredOrders = recentOrders.filter(o =>
    o.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.orderNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalRevenue = 12845;
  const ordersToday = 47;
  const activeFarmers = 24;
  const pendingDeliveries = 13;

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto w-full text-left">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-black tracking-tight text-neutral-950">
            {language === 'bn' ? 'ড্যাশবোর্ড সারসংক্ষেপ' : 'Dashboard Overview'}
          </h1>
        </div>
        <div className="flex items-center gap-3.5">
          <button className="px-4 py-2.5 bg-white border border-neutral-200 hover:border-neutral-300 text-xs sm:text-sm text-neutral-700 font-medium rounded-xl flex items-center gap-2.5 shadow-xs transition cursor-pointer">
            <Calendar size={16} className="text-neutral-400" />
            <span>June, 2026</span>
            <ChevronDown size={14} className="text-neutral-400" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-neutral-200/70 shadow-xs space-y-4">
          <div className="flex justify-between items-start">
            <span className="text-sm font-semibold text-neutral-500">
              {language === 'bn' ? 'সর্বমোট আয়' : 'Total Revenue'}
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#3BB75E] flex items-center justify-center">
              <DollarSign size={16} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-neutral-950">${totalRevenue.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1 text-[11px]">
            <TrendingUp size={12} className="text-emerald-500" />
            <span className="text-emerald-600 font-bold">+12.5%</span>
            <span className="text-neutral-400">vs last month</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-neutral-200/70 shadow-xs space-y-4">
          <div className="flex justify-between items-start">
            <span className="text-sm font-semibold text-neutral-500">
              {language === 'bn' ? 'আজকের অর্ডার' : 'Orders Today'}
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <ShoppingBag size={16} />
            </div>
          </div>
          <div className="text-3xl font-bold text-neutral-950">{ordersToday}</div>
          <div className="flex items-center gap-1 text-[11px]">
            <TrendingUp size={12} className="text-emerald-500" />
            <span className="text-emerald-600 font-bold">+8.2%</span>
            <span className="text-neutral-400">vs yesterday</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-neutral-200/70 shadow-xs space-y-4">
          <div className="flex justify-between items-start">
            <span className="text-sm font-semibold text-neutral-500">
              {language === 'bn' ? 'সক্রিয় কৃষক' : 'Active Farmers'}
            </span>
            <div className="w-8 h-8 rounded-lg bg-green-50 text-green-600 flex items-center justify-center">
              <Users size={16} />
            </div>
          </div>
          <div className="text-3xl font-bold text-neutral-950">{activeFarmers}</div>
          <div className="flex items-center gap-1 text-[11px]">
            <TrendingUp size={12} className="text-emerald-500" />
            <span className="text-emerald-600 font-bold">+3 new</span>
            <span className="text-neutral-400">this week</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-neutral-200/70 shadow-xs space-y-4">
          <div className="flex justify-between items-start">
            <span className="text-sm font-semibold text-neutral-500">
              {language === 'bn' ? 'অপেক্ষমান ডেলিভারি' : 'Pending Deliveries'}
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Truck size={16} />
            </div>
          </div>
          <div className="text-3xl font-bold text-neutral-950">{pendingDeliveries}</div>
          <div className="flex items-center gap-1 text-[11px]">
            <span className="text-amber-600 font-bold">{language === 'bn' ? '৭টির বেশি রুট' : '7+ routes'}</span>
            <span className="text-neutral-400">{language === 'bn' ? 'সক্রিয়' : 'active'}</span>
          </div>
        </div>
      </div>

      <div className="bg-white border border-neutral-200/80 rounded-3xl overflow-hidden shadow-xs">
        <div className="p-6 border-b border-neutral-200 flex flex-col md:flex-row md:items-center justify-between gap-5 bg-white">
          <div>
            <h2 className="text-sm font-bold text-neutral-800">
              {language === 'bn' ? 'সাম্প্রতিক অর্ডারসমূহ' : 'Recent Orders'}
            </h2>
          </div>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder={language === 'bn' ? 'অর্ডার খুঁজুন...' : 'Search orders...'}
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
                <th className="py-4 px-6 font-bold">{language === 'bn' ? 'অর্ডার নং' : 'Order No'}</th>
                <th className="py-4 px-4 font-bold">{language === 'bn' ? 'গ্রাহক' : 'Customer'}</th>
                <th className="py-4 px-4 font-bold">{language === 'bn' ? 'আইটেম' : 'Items'}</th>
                <th className="py-4 px-4 font-bold">{language === 'bn' ? 'মোট' : 'Total'}</th>
                <th className="py-4 px-4 font-bold">{language === 'bn' ? 'স্ট্যাটাস' : 'Status'}</th>
                <th className="py-4 px-4 font-bold">{language === 'bn' ? 'তারিখ' : 'Date'}</th>
                <th className="py-4 px-6 font-bold text-right">{language === 'bn' ? 'অ্যাকশন' : 'Action'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-neutral-700 bg-white">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-neutral-400 font-light">
                    {language === 'bn' ? 'কোনো অর্ডার পাওয়া যায়নি।' : 'No orders found.'}
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-neutral-50/60 transition-colors">
                    <td className="py-5 px-6 font-bold font-mono text-neutral-900">{order.orderNo}</td>
                    <td className="py-5 px-4 font-extrabold text-neutral-900 tracking-tight text-xs sm:text-[13px]">{order.customer}</td>
                    <td className="py-5 px-4 text-xs text-neutral-500 font-medium">{order.items}</td>
                    <td className="py-5 px-4 font-semibold text-neutral-900 font-mono">{order.total}</td>
                    <td className="py-5 px-4">
                      {order.status === 'Pending' && (
                        <span className="bg-amber-50 text-amber-600 font-bold px-3.5 py-1.5 rounded-full text-[10px] tracking-wide inline-flex items-center uppercase font-mono border border-amber-100">Pending</span>
                      )}
                      {order.status === 'Out of delivery' && (
                        <span className="bg-purple-50 text-purple-600 font-bold px-3.5 py-1.5 rounded-full text-[10px] tracking-wide inline-flex items-center uppercase font-mono border border-purple-100">Out of delivery</span>
                      )}
                      {order.status === 'Delivered' && (
                        <span className="bg-emerald-50 text-emerald-700 font-bold px-3.5 py-1.5 rounded-full text-[10px] tracking-wide inline-flex items-center uppercase font-mono border border-emerald-100">Delivered</span>
                      )}
                      {order.status === 'Preparing' && (
                        <span className="bg-indigo-50 text-indigo-600 font-bold px-3.5 py-1.5 rounded-full text-[10px] tracking-wide inline-flex items-center uppercase font-mono border border-indigo-100">Preparing</span>
                      )}
                      {order.status === 'Cancelled' && (
                        <span className="bg-red-50 text-red-600 font-bold px-3.5 py-1.5 rounded-full text-[10px] tracking-wide inline-flex items-center uppercase font-mono border border-red-100">Cancelled</span>
                      )}
                    </td>
                    <td className="py-5 px-4 text-xs font-mono text-neutral-400">{order.date}</td>
                    <td className="py-5 px-6 text-right">
                      <button
                        onClick={() => { setSelectedOrder(order); setShowViewModal(true); }}
                        className="w-8 h-8 rounded-lg border border-neutral-200 text-neutral-400 hover:text-[#3BB75E] hover:border-emerald-200 bg-white flex items-center justify-center transition cursor-pointer"
                        title="View Details"
                      >
                        <Eye size={14} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="p-5 border-t border-neutral-100 bg-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 font-sans text-xs sm:text-sm text-neutral-500 font-medium">
          <div>{language === 'bn' ? `মোট ${filteredOrders.length} টি অর্ডার` : `${filteredOrders.length} orders`}</div>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 rounded-lg border border-neutral-200 flex items-center justify-center text-neutral-400 hover:bg-neutral-50 transition cursor-pointer">
              <ChevronLeft size={14} />
            </button>
            <button className="w-8 h-8 rounded-lg bg-[#3BB75E] text-white font-extrabold flex items-center justify-center shadow-xs">1</button>
            <button className="w-8 h-8 rounded-lg border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 hover:text-neutral-900 bg-white transition cursor-pointer">2</button>
            <button className="w-8 h-8 rounded-lg border border-neutral-200 flex items-center justify-center text-neutral-400 hover:bg-neutral-50 transition cursor-pointer">
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {showViewModal && selectedOrder && (
        <div className="fixed inset-0 bg-neutral-950/40 backdrop-blur-xs flex items-center justify-center z-55 p-4">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl text-left border border-neutral-200">
            <div className="p-6 bg-gradient-to-r from-emerald-500 to-teal-600 text-white flex items-center justify-between">
              <div>
                <h3 className="font-serif font-black text-lg">{selectedOrder.orderNo}</h3>
                <p className="text-xs text-white/80">{selectedOrder.date}</p>
              </div>
              <button onClick={() => setShowViewModal(false)} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-lg font-bold border-0 transition">&times;</button>
            </div>
            <div className="p-6 space-y-5">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block mb-1">
                  {language === 'bn' ? 'গ্রাহক' : 'CUSTOMER'}
                </span>
                <div className="font-bold text-neutral-900 text-base">{selectedOrder.customer}</div>
              </div>
              <div className="border-t border-neutral-100 pt-4">
                <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block mb-2.5">
                  {language === 'bn' ? 'আইটেম সমূহ' : 'ITEMS'}
                </span>
                <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-neutral-100">
                  <div className="flex justify-between items-center text-xs font-bold text-neutral-800">
                    <span>{selectedOrder.items}</span>
                    <span className="font-mono text-[#3BB75E]">{selectedOrder.total}</span>
                  </div>
                </div>
              </div>
              <div className="border-t border-neutral-100 pt-4">
                <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block mb-1">
                  {language === 'bn' ? 'স্ট্যাটাস' : 'STATUS'}
                </span>
                <span className="text-xs font-bold text-[#3BB75E] uppercase">{selectedOrder.status}</span>
              </div>
            </div>
            <div className="p-6 bg-neutral-50 border-t border-neutral-100 flex justify-end rounded-b-3xl">
              <button onClick={() => setShowViewModal(false)} className="px-5 py-2.5 bg-white border border-neutral-200 hover:bg-neutral-100 text-neutral-700 text-xs font-bold rounded-xl transition cursor-pointer">
                {language === 'bn' ? 'বন্ধ করুন' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
