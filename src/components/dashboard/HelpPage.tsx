import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  Search,
  Eye,
  HelpCircle,
  BookOpen,
  Video,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  FileText,
  ExternalLink
} from 'lucide-react';

interface HelpArticle {
  id: number;
  title: string;
  titleBn: string;
  category: string;
  categoryBn: string;
  status: 'Published' | 'Draft' | 'Archived';
  lastUpdated: string;
  views: string;
  summary: string;
  summaryBn: string;
}

export const HelpPage: React.FC = () => {
  const { language } = useLanguage();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<HelpArticle | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);

  const [articles] = useState<HelpArticle[]>([
    { id: 1, title: 'How to Process an Order', titleBn: 'অর্ডার প্রক্রিয়াকরণের নিয়ম', category: 'Orders', categoryBn: 'অর্ডার', status: 'Published', lastUpdated: '15/05/26', views: '1.2K', summary: 'Step-by-step guide to process customer orders from pending to delivery.', summaryBn: 'গ্রাহকের অর্ডার পেন্ডিং থেকে ডেলিভারি পর্যন্ত প্রক্রিয়াকরণের ধাপে ধাপে নির্দেশিকা।' },
    { id: 2, title: 'Adding New Products', titleBn: 'নতুন পণ্য যোগ করা', category: 'Products', categoryBn: 'পণ্য', status: 'Published', lastUpdated: '10/05/26', views: '890', summary: 'Learn how to add, edit and manage products in your inventory.', summaryBn: 'আপনার ইনভেন্টরিতে পণ্য যোগ, সম্পাদনা এবং পরিচালনার নিয়ম।' },
    { id: 3, title: 'Farmer Registration Guide', titleBn: 'কৃষক নিবন্ধন নির্দেশিকা', category: 'Farmers', categoryBn: 'কৃষক', status: 'Published', lastUpdated: '08/05/26', views: '650', summary: 'Complete guide to register and verify new farmers on the platform.', summaryBn: 'প্ল্যাটফর্মে নতুন কৃষক নিবন্ধন এবং যাচাইকরণের সম্পূর্ণ নির্দেশিকা।' },
    { id: 4, title: 'Payment Gateway Setup', titleBn: 'পেমেন্ট গেটওয়ে সেটআপ', category: 'Payments', categoryBn: 'পেমেন্ট', status: 'Published', lastUpdated: '20/04/26', views: '1.5K', summary: 'Configure bKash, Nagad and bank payment gateways for your store.', summaryBn: 'আপনার দোকানের জন্য বিকাশ, নগদ এবং ব্যাংক পেমেন্ট গেটওয়ে কনফিগার করুন।' },
    { id: 5, title: 'Delivery Zone Management', titleBn: 'ডেলিভারি জোন ব্যবস্থাপনা', category: 'Delivery', categoryBn: 'ডেলিভারি', status: 'Draft', lastUpdated: '—', views: '—', summary: 'Set up and manage delivery zones, areas and shipping charges.', summaryBn: 'ডেলিভারি জোন, এলাকা এবং শিপিং চার্জ সেটআপ ও ব্যবস্থাপনা।' },
    { id: 6, title: 'Troubleshooting Common Issues', titleBn: 'সাধারণ সমস্যার সমাধান', category: 'Support', categoryBn: 'সাপোর্ট', status: 'Published', lastUpdated: '25/05/26', views: '2.1K', summary: 'Solutions for common technical issues faced by admin operators.', summaryBn: 'অ্যাডমিন অপারেটরদের সাধারণ প্রযুক্তিগত সমস্যার সমাধান।' },
    { id: 7, title: 'Understanding Analytics Reports', titleBn: 'অ্যানালিটিক্স রিপোর্ট বোঝা', category: 'Analytics', categoryBn: 'অ্যানালিটিক্স', status: 'Published', lastUpdated: '18/05/26', views: '720', summary: 'How to read and interpret monthly financial and growth reports.', summaryBn: 'মাসিক আর্থিক এবং বৃদ্ধির রিপোর্ট পড়া এবং ব্যাখ্যা করার নিয়ম।' },
    { id: 8, title: 'Managing Social Content', titleBn: 'সোশ্যাল কন্টেন্ট ব্যবস্থাপনা', category: 'Social', categoryBn: 'সামাজিক', status: 'Draft', lastUpdated: '—', views: '—', summary: 'Schedule and manage your farm\'s social media posts and vlogs.', summaryBn: 'আপনার খামারের সোশ্যাল মিডিয়া পোস্ট এবং ভ্লগ শিডিউল ও ব্যবস্থাপনা।' },
  ]);

  const filteredArticles = articles.filter(a =>
    a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.titleBn.includes(searchTerm) ||
    a.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const published = articles.filter(a => a.status === 'Published').length;
  const drafts = articles.filter(a => a.status === 'Draft').length;

  const categoryIcon = (category: string) => {
    switch (category) {
      case 'Orders': return <FileText size={14} />;
      case 'Products': return <FileText size={14} />;
      case 'Farmers': return <FileText size={14} />;
      case 'Payments': return <FileText size={14} />;
      case 'Delivery': return <FileText size={14} />;
      case 'Support': return <MessageSquare size={14} />;
      case 'Analytics': return <FileText size={14} />;
      default: return <FileText size={14} />;
    }
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto w-full text-left">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-black tracking-tight text-neutral-950">
            {language === 'bn' ? 'সহায়তা নির্দেশিকা' : 'Help & Guide'}
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-neutral-200/70 shadow-xs space-y-4">
          <div className="flex justify-between items-start">
            <span className="text-sm font-semibold text-neutral-500">
              {language === 'bn' ? 'মোট নির্দেশিকা' : 'Total Guides'}
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#3BB75E] flex items-center justify-center">
              <BookOpen size={16} />
            </div>
          </div>
          <div className="text-3xl font-bold text-neutral-950">{articles.length}</div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-neutral-200/70 shadow-xs space-y-4">
          <div className="flex justify-between items-start">
            <span className="text-sm font-semibold text-neutral-500">
              {language === 'bn' ? 'প্রকাশিত' : 'Published'}
            </span>
            <div className="w-8 h-8 rounded-lg bg-green-50 text-green-600 flex items-center justify-center">
              <HelpCircle size={16} />
            </div>
          </div>
          <div className="text-3xl font-bold text-neutral-950">{published}</div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-neutral-200/70 shadow-xs space-y-4">
          <div className="flex justify-between items-start">
            <span className="text-sm font-semibold text-neutral-500">
              {language === 'bn' ? 'খসড়া' : 'Drafts'}
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Video size={16} />
            </div>
          </div>
          <div className="text-3xl font-bold text-neutral-950">{drafts}</div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-neutral-200/70 shadow-xs space-y-4">
          <div className="flex justify-between items-start">
            <span className="text-sm font-semibold text-neutral-500">
              {language === 'bn' ? 'সাপোর্ট রেটিং' : 'Support Rating'}
            </span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <MessageSquare size={16} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-neutral-950">95%</span>
            <span className="text-xs text-emerald-600 font-bold">↑ 2.1%</span>
          </div>
        </div>
      </div>

      <div className="bg-white border border-neutral-200/80 rounded-3xl overflow-hidden shadow-xs">
        <div className="p-6 border-b border-neutral-200 flex flex-col md:flex-row md:items-center justify-between gap-5 bg-white">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
              {language === 'bn' ? 'সকল নির্দেশিকা' : 'ALL ARTICLES'}
            </span>
          </div>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder={language === 'bn' ? 'নির্দেশিকা খুঁজুন...' : 'Search articles...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 bg-neutral-50 border border-neutral-200 focus:border-[#3BB75E] focus:bg-white rounded-xl text-xs transition focus:outline-none focus:ring-1 focus:ring-[#3BB75E] outline-none text-neutral-800 w-56 font-semibold"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm text-neutral-600 border-collapse min-w-[850px]">
            <thead>
              <tr className="border-b border-neutral-100 text-[11px] sm:text-xs uppercase font-semibold text-neutral-500 bg-neutral-50/50">
                <th className="py-4 px-6 font-bold">#</th>
                <th className="py-4 px-4 font-bold">{language === 'bn' ? 'শিরোনাম' : 'Article'}</th>
                <th className="py-4 px-4 font-bold">{language === 'bn' ? 'বিভাগ' : 'Category'}</th>
                <th className="py-4 px-4 font-bold">{language === 'bn' ? 'স্ট্যাটাস' : 'Status'}</th>
                <th className="py-4 px-4 font-bold">{language === 'bn' ? 'সর্বশেষ আপডেট' : 'Last Updated'}</th>
                <th className="py-4 px-4 font-bold text-center">{language === 'bn' ? 'ভিউ' : 'Views'}</th>
                <th className="py-4 px-6 font-bold text-center">{language === 'bn' ? 'বিবরণ' : 'Details'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-neutral-700 bg-white">
              {filteredArticles.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-neutral-400 font-light">
                    {language === 'bn' ? 'কোনো নির্দেশিকা পাওয়া যায়নি।' : 'No articles found.'}
                  </td>
                </tr>
              ) : (
                filteredArticles.map((article) => (
                  <tr key={article.id} className="hover:bg-neutral-50/60 transition-colors">
                    <td className="py-5 px-6 font-mono text-neutral-400 text-xs">{String(article.id).padStart(2, '0')}</td>
                    <td className="py-5 px-4">
                      <div className="font-bold text-neutral-900">{language === 'bn' ? article.titleBn : article.title}</div>
                    </td>
                    <td className="py-5 px-4">
                      <div className="flex items-center gap-1.5 text-xs font-medium text-neutral-600">
                        {categoryIcon(article.category)}
                        <span>{language === 'bn' ? article.categoryBn : article.category}</span>
                      </div>
                    </td>
                    <td className="py-5 px-4">
                      {article.status === 'Published' && <span className="bg-emerald-50 text-emerald-700 font-bold px-3.5 py-1.5 rounded-full text-[10px] tracking-wide inline-flex items-center uppercase font-mono border border-emerald-100">Published</span>}
                      {article.status === 'Draft' && <span className="bg-amber-50 text-amber-600 font-bold px-3.5 py-1.5 rounded-full text-[10px] tracking-wide inline-flex items-center uppercase font-mono border border-amber-100">Draft</span>}
                      {article.status === 'Archived' && <span className="bg-neutral-100 text-neutral-500 font-bold px-3.5 py-1.5 rounded-full text-[10px] tracking-wide inline-flex items-center uppercase font-mono border border-neutral-200">Archived</span>}
                    </td>
                    <td className="py-5 px-4 text-xs font-mono text-neutral-400">{article.lastUpdated}</td>
                    <td className="py-5 px-4 text-center text-xs font-bold text-neutral-700">{article.views}</td>
                    <td className="py-5 px-6 text-center">
                      <button
                        onClick={() => { setSelectedArticle(article); setShowViewModal(true); }}
                        className="w-8 h-8 rounded-lg border border-neutral-200 text-neutral-400 hover:text-[#3BB75E] hover:border-emerald-200 bg-white flex items-center justify-center transition cursor-pointer mx-auto"
                        title="View Article"
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
          <div>{language === 'bn' ? `মোট ${filteredArticles.length} টি নির্দেশিকা` : `${filteredArticles.length} articles`}</div>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 rounded-lg border border-neutral-200 flex items-center justify-center text-neutral-400 hover:bg-neutral-50 transition cursor-pointer"><ChevronLeft size={14} /></button>
            <button className="w-8 h-8 rounded-lg bg-[#3BB75E] text-white font-extrabold flex items-center justify-center shadow-xs">1</button>
            <button className="w-8 h-8 rounded-lg border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 hover:text-neutral-900 bg-white transition cursor-pointer">2</button>
            <button className="w-8 h-8 rounded-lg border border-neutral-200 flex items-center justify-center text-neutral-400 hover:bg-neutral-50 transition cursor-pointer"><ChevronRight size={14} /></button>
          </div>
        </div>
      </div>

      {showViewModal && selectedArticle && (
        <div className="fixed inset-0 bg-neutral-950/40 backdrop-blur-xs flex items-center justify-center z-55 p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl text-left border border-neutral-200">
            <div className="p-6 bg-gradient-to-r from-emerald-500 to-teal-600 text-white flex items-center justify-between">
              <div>
                <h3 className="font-serif font-black text-lg">{language === 'bn' ? selectedArticle.titleBn : selectedArticle.title}</h3>
                <p className="text-xs text-white/80">
                  {language === 'bn' ? selectedArticle.categoryBn : selectedArticle.category}
                  {' · '}
                  {selectedArticle.views !== '—' ? `${selectedArticle.views} views` : language === 'bn' ? 'খসড়া' : 'Draft'}
                </p>
              </div>
              <button onClick={() => setShowViewModal(false)} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-lg font-bold border-0 transition">&times;</button>
            </div>
            <div className="p-6 space-y-5">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block mb-2">
                  {language === 'bn' ? 'সারসংক্ষেপ' : 'SUMMARY'}
                </span>
                <p className="text-sm text-neutral-700 leading-relaxed">
                  {language === 'bn' ? selectedArticle.summaryBn : selectedArticle.summary}
                </p>
              </div>
              <div className="border-t border-neutral-100 pt-4 grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block">{language === 'bn' ? 'বিভাগ' : 'CATEGORY'}</span>
                  <span className="text-xs font-bold text-neutral-700 block mt-1">{language === 'bn' ? selectedArticle.categoryBn : selectedArticle.category}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block">{language === 'bn' ? 'স্ট্যাটাস' : 'STATUS'}</span>
                  <span className="text-xs font-bold text-[#3BB75E] block mt-1 uppercase">{selectedArticle.status}</span>
                </div>
              </div>
              <div className="border-t border-neutral-100 pt-4">
                <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block mb-1">{language === 'bn' ? 'সর্বশেষ আপডেট' : 'LAST UPDATED'}</span>
                <span className="text-xs font-medium text-neutral-500">{selectedArticle.lastUpdated}</span>
              </div>
            </div>
            <div className="p-6 bg-neutral-50 border-t border-neutral-100 flex justify-end gap-3 rounded-b-3xl">
              <button
                onClick={() => setShowViewModal(false)}
                className="px-5 py-2.5 bg-white border border-neutral-200 hover:bg-neutral-100 text-neutral-700 text-xs font-bold rounded-xl transition cursor-pointer"
              >
                {language === 'bn' ? 'বন্ধ করুন' : 'Close'}
              </button>
              {selectedArticle.link && (
                <button className="px-5 py-2.5 bg-[#3BB75E] hover:bg-[#3BB75E]/90 text-white text-xs font-bold rounded-xl transition cursor-pointer shadow-xs border-0 flex items-center gap-1.5">
                  <ExternalLink size={12} />
                  <span>{language === 'bn' ? 'পড়ুন' : 'Read More'}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
