import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  CreditCard,
  CheckCircle,
  XCircle,
  Smartphone,
  Banknote,
  Building2,
  Globe,
  DollarSign,
  TrendingUp
} from 'lucide-react';

interface Gateway {
  id: string;
  name: string;
  status: string;
  fee: string;
  limit: string;
}

const gatewayIcons: Record<string, React.ReactNode> = {
  bkash: <Smartphone size={24} />,
  nagad: <Smartphone size={24} />,
  cod: <Banknote size={24} />,
  bank: <Building2 size={24} />
};

const gatewayColors: Record<string, string> = {
  bkash: 'bg-rose-50 text-rose-600',
  nagad: 'bg-orange-50 text-orange-600',
  cod: 'bg-emerald-50 text-emerald-600',
  bank: 'bg-blue-50 text-blue-600'
};

export const PaymentsPage: React.FC = () => {
  const { language } = useLanguage();

  const [gateways, setGateways] = useState<Gateway[]>([
    { id: 'bkash', name: 'bKash Merchant Account', status: 'Active Connect', fee: '1.85%', limit: '$500 / transaction' },
    { id: 'nagad', name: 'Nagad Merchant SDK', status: 'Active Connect', fee: '1.45%', limit: '$800 / transaction' },
    { id: 'cod', name: 'Cash on Delivery (COD)', status: 'Enabled Global', fee: '0.00%', limit: 'Max $150 / order' },
    { id: 'bank', name: 'City Bank EFT Router', status: 'Active Connect', fee: '0.80%', limit: 'No Transaction Limit' }
  ]);

  const activeCount = gateways.filter(g => g.status.includes('Active') || g.status.includes('Enabled')).length;
  const avgFee = gateways.reduce((sum, g) => sum + parseFloat(g.fee.replace('%', '')), 0) / gateways.length;

  const toggleGateway = (id: string) => {
    setGateways(prev => prev.map(g =>
      g.id === id
        ? {
            ...g,
            status: g.status.includes('Active') || g.status === 'Enabled Global'
                ? 'Disconnected'
                : g.id === 'cod' ? 'Enabled Global' : 'Active Connect'
          }
        : g
    ));
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto w-full text-left">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-serif font-black tracking-tight text-neutral-950">
          {language === 'bn' ? 'পেমেন্ট গেটওয়ে' : 'Payment Gateways'}
        </h1>
      </div>

      {/* METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-neutral-200/70 shadow-xs space-y-4">
          <div className="flex justify-between items-start">
            <span className="text-sm font-semibold text-neutral-500">
              {language === 'bn' ? 'সক্রিয় গেটওয়ে' : 'Active Gateways'}
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#3BB75E] flex items-center justify-center">
              <CreditCard size={16} />
            </div>
          </div>
          <div className="text-3xl font-bold text-neutral-950">{activeCount}</div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-neutral-200/70 shadow-xs space-y-4">
          <div className="flex justify-between items-start">
            <span className="text-sm font-semibold text-neutral-500">
              {language === 'bn' ? 'মোট মাধ্যম' : 'Total Methods'}
            </span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <Globe size={16} />
            </div>
          </div>
          <div className="text-3xl font-bold text-neutral-950">{gateways.length}</div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-neutral-200/70 shadow-xs space-y-4">
          <div className="flex justify-between items-start">
            <span className="text-sm font-semibold text-neutral-500">
              {language === 'bn' ? 'গড় ফি' : 'Avg Transaction Fee'}
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <TrendingUp size={16} />
            </div>
          </div>
          <div className="text-3xl font-bold text-neutral-950">{avgFee.toFixed(2)}%</div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-neutral-200/70 shadow-xs space-y-4">
          <div className="flex justify-between items-start">
            <span className="text-sm font-semibold text-neutral-500">
              {language === 'bn' ? 'সর্বনিম্ন ফি' : 'Best Rate'}
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <DollarSign size={16} />
            </div>
          </div>
          <div className="text-3xl font-bold text-neutral-950">
            {Math.min(...gateways.map(g => parseFloat(g.fee.replace('%', '')))).toFixed(2)}%
          </div>
        </div>
      </div>

      {/* GATEWAY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {gateways.map((gateway) => (
          <div key={gateway.id} className="bg-white rounded-3xl border border-neutral-200/80 shadow-xs overflow-hidden transition hover:shadow-md">
            <div className="p-6 flex items-start gap-5">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${gatewayColors[gateway.id] || 'bg-neutral-100 text-neutral-500'}`}>
                {gatewayIcons[gateway.id] || <CreditCard size={24} />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-neutral-900 text-sm sm:text-base">{gateway.name}</h3>
                    <span className={`inline-flex items-center gap-1 mt-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${
                      gateway.status === 'Disconnected'
                        ? 'bg-red-50 text-red-600 border-red-100'
                        : 'bg-emerald-50 text-emerald-700 border-emerald-100'
                    }`}>
                      {gateway.status === 'Disconnected' ? <XCircle size={10} /> : <CheckCircle size={10} />}
                      {gateway.status}
                    </span>
                  </div>
                  <button
                    onClick={() => toggleGateway(gateway.id)}
                    className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer border-0 ${
                      gateway.status === 'Disconnected' ? 'bg-neutral-300' : 'bg-[#3BB75E]'
                    }`}
                  >
                    <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-xs transition-transform ${
                      gateway.status === 'Disconnected' ? 'translate-x-0' : 'translate-x-5'
                    }`} />
                  </button>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4 pt-4 border-t border-neutral-100">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block">
                      {language === 'bn' ? 'লেনদেন ফি' : 'TRANSACTION FEE'}
                    </span>
                    <span className="text-sm font-bold text-neutral-800">{gateway.fee}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block">
                      {language === 'bn' ? 'সীমা' : 'LIMIT'}
                    </span>
                    <span className="text-sm font-bold text-neutral-800">{gateway.limit}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
