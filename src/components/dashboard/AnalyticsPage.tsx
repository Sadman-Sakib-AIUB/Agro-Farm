import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  Search,
  Eye,
  DollarSign,
  TrendingUp,
  TrendingDown,
  ShoppingBag,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

interface MonthlyData {
  id: number;
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
  orders: number;
  growth: number;
}

export const AnalyticsPage: React.FC = () => {
  const { language } = useLanguage();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMonth, setSelectedMonth] = useState<MonthlyData | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);

  const [monthlyData] = useState<MonthlyData[]>([
    { id: 1, month: 'January 2026', revenue: 18200, expenses: 11200, profit: 7000, orders: 145, growth: 5.2 },
    { id: 2, month: 'February 2026', revenue: 16500, expenses: 9800, profit: 6700, orders: 132, growth: -4.3 },
    { id: 3, month: 'March 2026', revenue: 21000, expenses: 12500, profit: 8500, orders: 168, growth: 21.4 },
    { id: 4, month: 'April 2026', revenue: 19800, expenses: 11800, profit: 8000, orders: 155, growth: -5.9 },
    { id: 5, month: 'May 2026', revenue: 24500, expenses: 14200, profit: 10300, orders: 189, growth: 23.7 },
    { id: 6, month: 'June 2026', revenue: 28500, expenses: 16700, profit: 11800, orders: 210, growth: 16.3 },
    { id: 7, month: 'July 2025', revenue: 14200, expenses: 8800, profit: 5400, orders: 112, growth: -8.1 },
    { id: 8, month: 'August 2025', revenue: 15800, expenses: 9500, profit: 6300, orders: 124, growth: 11.3 },
    { id: 9, month: 'September 2025', revenue: 17200, expenses: 10200, profit: 7000, orders: 136, growth: 8.9 },
    { id: 10, month: 'October 2025', revenue: 19500, expenses: 11500, profit: 8000, orders: 150, growth: 13.4 },
    { id: 11, month: 'November 2025', revenue: 22300, expenses: 13000, profit: 9300, orders: 172, growth: 16.2 },
    { id: 12, month: 'December 2025', revenue: 25200, expenses: 14800, profit: 10400, orders: 195, growth: 13.0 },
  ]);

  const filteredData = monthlyData.filter(d =>
    d.month.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalRevenue = monthlyData.reduce((s, d) => s + d.revenue, 0);
  const totalExpenses = monthlyData.reduce((s, d) => s + d.expenses, 0);
  const totalProfit = monthlyData.reduce((s, d) => s + d.profit, 0);
  const avgGrowth = monthlyData.reduce((s, d) => s + d.growth, 0) / monthlyData.length;

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto w-full text-left">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-black tracking-tight text-neutral-950">
            {language === 'bn' ? 'লাভ লোকসান চার্ট' : 'Analytics & Reports'}
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-neutral-200/70 shadow-xs space-y-4">
          <div className="flex justify-between items-start">
            <span className="text-sm font-semibold text-neutral-500">
              {language === 'bn' ? 'মোট আয়' : 'Total Revenue'}
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#3BB75E] flex items-center justify-center">
              <DollarSign size={16} />
            </div>
          </div>
          <div className="text-3xl font-bold text-neutral-950">${(totalRevenue / 1000).toFixed(1)}K</div>
          <div className="flex items-center gap-1 text-[11px]">
            <ArrowUpRight size={12} className="text-emerald-500" />
            <span className="text-emerald-600 font-bold">+12.5%</span>
            <span className="text-neutral-400">vs last year</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-neutral-200/70 shadow-xs space-y-4">
          <div className="flex justify-between items-start">
            <span className="text-sm font-semibold text-neutral-500">
              {language === 'bn' ? 'মোট খরচ' : 'Total Expenses'}
            </span>
            <div className="w-8 h-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center">
              <TrendingDown size={16} />
            </div>
          </div>
          <div className="text-3xl font-bold text-neutral-950">${(totalExpenses / 1000).toFixed(1)}K</div>
          <div className="flex items-center gap-1 text-[11px]">
            <ArrowUpRight size={12} className="text-red-500" />
            <span className="text-red-600 font-bold">+8.3%</span>
            <span className="text-neutral-400">vs last year</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-neutral-200/70 shadow-xs space-y-4">
          <div className="flex justify-between items-start">
            <span className="text-sm font-semibold text-neutral-500">
              {language === 'bn' ? 'নিট লাভ' : 'Net Profit'}
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <BarChart3 size={16} />
            </div>
          </div>
          <div className="text-3xl font-bold text-neutral-950">${(totalProfit / 1000).toFixed(1)}K</div>
          <div className="flex items-center gap-1 text-[11px]">
            <ArrowUpRight size={12} className="text-emerald-500" />
            <span className="text-emerald-600 font-bold">+18.7%</span>
            <span className="text-neutral-400">margin</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-neutral-200/70 shadow-xs space-y-4">
          <div className="flex justify-between items-start">
            <span className="text-sm font-semibold text-neutral-500">
              {language === 'bn' ? 'গড় প্রবৃদ্ধি' : 'Avg Growth Rate'}
            </span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <TrendingUp size={16} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-neutral-950">{avgGrowth.toFixed(1)}%</span>
            <span className={`text-xs font-bold ${avgGrowth >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
              {avgGrowth >= 0 ? '↑' : '↓'} MoM
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white border border-neutral-200/80 rounded-3xl overflow-hidden shadow-xs">
        <div className="p-6 border-b border-neutral-200 flex flex-col md:flex-row md:items-center justify-between gap-5 bg-white">
          <div>
            <h2 className="text-sm font-bold text-neutral-800">
              {language === 'bn' ? 'মাসিক আর্থিক প্রতিবেদন' : 'Monthly Financial Report'}
            </h2>
          </div>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder={language === 'bn' ? 'মাস খুঁজুন...' : 'Search month...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 bg-neutral-50 border border-neutral-200 focus:border-[#3BB75E] focus:bg-white rounded-xl text-xs transition focus:outline-none focus:ring-1 focus:ring-[#3BB75E] outline-none text-neutral-800 w-48 font-semibold"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm text-neutral-600 border-collapse min-w-[900px]">
            <thead>
              <tr className="border-b border-neutral-100 text-[11px] sm:text-xs uppercase font-semibold text-neutral-500 bg-neutral-50/50">
                <th className="py-4 px-6 font-bold">{language === 'bn' ? 'মাস' : 'Month'}</th>
                <th className="py-4 px-4 font-bold">{language === 'bn' ? 'আয়' : 'Revenue'}</th>
                <th className="py-4 px-4 font-bold">{language === 'bn' ? 'খরচ' : 'Expenses'}</th>
                <th className="py-4 px-4 font-bold">{language === 'bn' ? 'লাভ' : 'Profit'}</th>
                <th className="py-4 px-4 font-bold text-center">{language === 'bn' ? 'অর্ডার' : 'Orders'}</th>
                <th className="py-4 px-4 font-bold text-center">{language === 'bn' ? 'প্রবৃদ্ধি' : 'Growth'}</th>
                <th className="py-4 px-6 font-bold text-center">{language === 'bn' ? 'বিবরণ' : 'Details'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-neutral-700 bg-white">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-neutral-400 font-light">
                    {language === 'bn' ? 'কোনো তথ্য পাওয়া যায়নি।' : 'No data found.'}
                  </td>
                </tr>
              ) : (
                filteredData.map((d) => (
                  <tr key={d.id} className="hover:bg-neutral-50/60 transition-colors">
                    <td className="py-5 px-6 font-bold text-neutral-900">{d.month}</td>
                    <td className="py-5 px-4 font-semibold font-mono text-emerald-600">${d.revenue.toLocaleString()}</td>
                    <td className="py-5 px-4 font-semibold font-mono text-red-500">${d.expenses.toLocaleString()}</td>
                    <td className="py-5 px-4 font-bold font-mono text-neutral-900">${d.profit.toLocaleString()}</td>
                    <td className="py-5 px-4 text-center font-mono font-semibold text-neutral-800">{d.orders}</td>
                    <td className="py-5 px-4 text-center">
                      <span className={`inline-flex items-center gap-1 text-xs font-bold ${
                        d.growth >= 0 ? 'text-emerald-600' : 'text-red-500'
                      }`}>
                        {d.growth >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                        {Math.abs(d.growth)}%
                      </span>
                    </td>
                    <td className="py-5 px-6 text-center">
                      <button
                        onClick={() => { setSelectedMonth(d); setShowViewModal(true); }}
                        className="w-8 h-8 rounded-lg border border-neutral-200 text-neutral-400 hover:text-[#3BB75E] hover:border-emerald-200 bg-white flex items-center justify-center transition cursor-pointer mx-auto"
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
          <div>{language === 'bn' ? `মোট ${filteredData.length} মাসের তথ্য` : `${filteredData.length} months data`}</div>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 rounded-lg border border-neutral-200 flex items-center justify-center text-neutral-400 hover:bg-neutral-50 transition cursor-pointer"><ChevronLeft size={14} /></button>
            <button className="w-8 h-8 rounded-lg bg-[#3BB75E] text-white font-extrabold flex items-center justify-center shadow-xs">1</button>
            <button className="w-8 h-8 rounded-lg border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 hover:text-neutral-900 bg-white transition cursor-pointer">2</button>
            <button className="w-8 h-8 rounded-lg border border-neutral-200 flex items-center justify-center text-neutral-400 hover:bg-neutral-50 transition cursor-pointer"><ChevronRight size={14} /></button>
          </div>
        </div>
      </div>

      {showViewModal && selectedMonth && (
        <div className="fixed inset-0 bg-neutral-950/40 backdrop-blur-xs flex items-center justify-center z-55 p-4">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl text-left border border-neutral-200">
            <div className="p-6 bg-gradient-to-r from-emerald-500 to-teal-600 text-white flex items-center justify-between">
              <div>
                <h3 className="font-serif font-black text-lg">{selectedMonth.month}</h3>
                <p className="text-xs text-white/80">{language === 'bn' ? 'আর্থিক বিবরণী' : 'Financial Summary'}</p>
              </div>
              <button onClick={() => setShowViewModal(false)} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-lg font-bold border-0 transition">&times;</button>
            </div>
            <div className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-600 block">{language === 'bn' ? 'আয়' : 'REVENUE'}</span>
                  <span className="text-2xl font-bold text-emerald-700 font-mono">${selectedMonth.revenue.toLocaleString()}</span>
                </div>
                <div className="bg-red-50 p-4 rounded-2xl border border-red-100">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-red-600 block">{language === 'bn' ? 'খরচ' : 'EXPENSES'}</span>
                  <span className="text-2xl font-bold text-red-600 font-mono">${selectedMonth.expenses.toLocaleString()}</span>
                </div>
              </div>
              <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
                <span className="text-[10px] uppercase font-bold tracking-wider text-blue-600 block">{language === 'bn' ? 'নিট লাভ' : 'NET PROFIT'}</span>
                <span className="text-2xl font-bold text-blue-700 font-mono">${selectedMonth.profit.toLocaleString()}</span>
              </div>
              <div className="border-t border-neutral-100 pt-4 grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block">{language === 'bn' ? 'মোট অর্ডার' : 'TOTAL ORDERS'}</span>
                  <span className="text-lg font-bold text-neutral-900">{selectedMonth.orders}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block">{language === 'bn' ? 'প্রবৃদ্ধি' : 'GROWTH'}</span>
                  <span className={`text-lg font-bold ${selectedMonth.growth >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                    {selectedMonth.growth >= 0 ? '+' : ''}{selectedMonth.growth}%
                  </span>
                </div>
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
