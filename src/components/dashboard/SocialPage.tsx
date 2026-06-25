import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  Search,
  Plus,
  Trash2,
  Pencil,
  Eye,
  Sparkles,
  Youtube,
  Globe,
  MessageSquare,
  ThumbsUp,
  X,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface SocialPost {
  id: number;
  title: string;
  titleBn: string;
  platform: 'YouTube' | 'Facebook' | 'Instagram' | 'Website';
  type: 'Vlog' | 'Post' | 'Story' | 'Article';
  status: 'Published' | 'Draft' | 'Archived';
  publishDate: string;
  views: string;
  link: string;
}

export const SocialPage: React.FC = () => {
  const { language } = useLanguage();

  const [posts, setPosts] = useState<SocialPost[]>([
    { id: 1, title: 'গাজর চাষের আধুনিক পদ্ধতি', titleBn: 'Modern Carrot Farming Techniques', platform: 'YouTube', type: 'Vlog', status: 'Published', publishDate: '15/05/26', views: '12.5K', link: 'https://youtube.com/watch?v=abc123' },
    { id: 2, title: 'Fresh Harvest at Doyel Agro', titleBn: 'দোয়েল এগ্রোতে তাজা ফসল', platform: 'Facebook', type: 'Post', status: 'Published', publishDate: '18/05/26', views: '4.2K', link: 'https://facebook.com/doyelagro' },
    { id: 3, title: 'জৈব সারের উপকারিতা', titleBn: 'Benefits of Organic Fertilizer', platform: 'YouTube', type: 'Vlog', status: 'Draft', publishDate: '—', views: '—', link: '#' },
    { id: 4, title: 'মনোকালচার বনাম বহুফসল চাষ', titleBn: 'Mono vs Multi-crop Farming', platform: 'Website', type: 'Article', status: 'Published', publishDate: '10/05/26', views: '8.7K', link: 'https://doyelagro.com/blog/mono-vs-multi' },
    { id: 5, title: 'Seasonal Vegetable Guide', titleBn: 'মৌসুমি সবজি গাইড', platform: 'Instagram', type: 'Story', status: 'Archived', publishDate: '01/05/26', views: '2.1K', link: 'https://instagram.com/doyelagro' },
    { id: 6, title: 'কৃষক সমাবেশ ২০২৬', titleBn: 'Farmers Gathering 2026', platform: 'Facebook', type: 'Post', status: 'Draft', publishDate: '—', views: '—', link: '#' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newTitleBn, setNewTitleBn] = useState('');
  const [newPlatform, setNewPlatform] = useState<'YouTube' | 'Facebook' | 'Instagram' | 'Website'>('Facebook');
  const [newType, setNewType] = useState<'Vlog' | 'Post' | 'Story' | 'Article'>('Post');

  const filteredPosts = posts.filter(p =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.titleBn.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.platform.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const published = posts.filter(p => p.status === 'Published').length;
  const drafts = posts.filter(p => p.status === 'Draft').length;
  const totalViews = posts.reduce((sum, p) => {
    const v = p.views.replace('K', '').replace('—', '0');
    return sum + (parseFloat(v) || 0);
  }, 0);

  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;
    const newId = posts.length + 1;
    setPosts([...posts, {
      id: newId,
      title: newTitle,
      titleBn: newTitleBn || newTitle,
      platform: newPlatform,
      type: newType,
      status: 'Draft',
      publishDate: '—',
      views: '—',
      link: '#'
    }]);
    setShowAddModal(false);
    setNewTitle('');
    setNewTitleBn('');
    setNewPlatform('Facebook');
    setNewType('Post');
  };

  const handleDelete = (id: number) => {
    const confirmText = language === 'bn' ? 'এই পোস্ট ডিলিট করবেন?' : 'Delete this post?';
    if (window.confirm(confirmText)) {
      setPosts(prev => prev.filter(p => p.id !== id));
    }
  };

  const platformIcon = (platform: string) => {
    switch (platform) {
      case 'YouTube': return <Youtube size={12} className="text-red-500" />;
      case 'Facebook': return <MessageSquare size={12} className="text-blue-500" />;
      case 'Instagram': return <Sparkles size={12} className="text-pink-500" />;
      default: return <Globe size={12} className="text-neutral-500" />;
    }
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto w-full text-left">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-black tracking-tight text-neutral-950">
            {language === 'bn' ? 'সামাজিক কার্যক্রম' : 'Social Content'}
          </h1>
        </div>
        <button onClick={() => setShowAddModal(true)} className="px-5 py-2.5 bg-[#3BB75E] hover:bg-[#3BB75E]/90 text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition flex items-center gap-2 cursor-pointer">
          <Plus size={16} />
          <span>{language === 'bn' ? 'নতুন কন্টেন্ট যোগ করুন' : 'Add Content'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-neutral-200/70 shadow-xs space-y-4">
          <div className="flex justify-between items-start">
            <span className="text-sm font-semibold text-neutral-500">
              {language === 'bn' ? 'মোট পোস্ট' : 'Total Posts'}
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#3BB75E] flex items-center justify-center">
              <Sparkles size={16} />
            </div>
          </div>
          <div className="text-3xl font-bold text-neutral-950">{posts.length}</div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-neutral-200/70 shadow-xs space-y-4">
          <div className="flex justify-between items-start">
            <span className="text-sm font-semibold text-neutral-500">
              {language === 'bn' ? 'প্রকাশিত' : 'Published'}
            </span>
            <div className="w-8 h-8 rounded-lg bg-green-50 text-green-600 flex items-center justify-center">
              <CheckCircle size={16} />
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
              <XCircle size={16} />
            </div>
          </div>
          <div className="text-3xl font-bold text-neutral-950">{drafts}</div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-neutral-200/70 shadow-xs space-y-4">
          <div className="flex justify-between items-start">
            <span className="text-sm font-semibold text-neutral-500">
              {language === 'bn' ? 'মোট ভিউ' : 'Total Reach'}
            </span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <ThumbsUp size={16} />
            </div>
          </div>
          <div className="text-3xl font-bold text-neutral-950">{totalViews.toFixed(1)}K</div>
        </div>
      </div>

      <div className="bg-white border border-neutral-200/80 rounded-3xl overflow-hidden shadow-xs">
        <div className="p-6 border-b border-neutral-200 flex flex-col md:flex-row md:items-center justify-between gap-5 bg-white">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
              {language === 'bn' ? 'সকল কন্টেন্ট' : 'ALL CONTENT'}
            </span>
          </div>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder={language === 'bn' ? 'শিরোনাম বা প্ল্যাটফর্ম খুঁজুন...' : 'Search title or platform...'}
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
                <th className="py-4 px-4 font-bold">{language === 'bn' ? 'শিরোনাম' : 'Title'}</th>
                <th className="py-4 px-4 font-bold">{language === 'bn' ? 'প্ল্যাটফর্ম' : 'Platform'}</th>
                <th className="py-4 px-4 font-bold">{language === 'bn' ? 'ধরন' : 'Type'}</th>
                <th className="py-4 px-4 font-bold">{language === 'bn' ? 'স্ট্যাটাস' : 'Status'}</th>
                <th className="py-4 px-4 font-bold">{language === 'bn' ? 'প্রকাশের তারিখ' : 'Publish Date'}</th>
                <th className="py-4 px-4 font-bold">{language === 'bn' ? 'ভিউ' : 'Views'}</th>
                <th className="py-4 px-6 font-bold text-right">{language === 'bn' ? 'অ্যাকশন' : 'Action'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-neutral-700 bg-white">
              {filteredPosts.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-neutral-400 font-light">
                    {language === 'bn' ? 'কোনো কন্টেন্ট পাওয়া যায়নি।' : 'No content found.'}
                  </td>
                </tr>
              ) : (
                filteredPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-neutral-50/60 transition-colors">
                    <td className="py-5 px-6 font-mono text-neutral-400 text-xs">{String(post.id).padStart(2, '0')}</td>
                    <td className="py-5 px-4">
                      <div className="font-bold text-neutral-900">{post.title}</div>
                      <div className="text-[10px] text-neutral-400 mt-0.5">{post.titleBn}</div>
                    </td>
                    <td className="py-5 px-4">
                      <div className="flex items-center gap-1.5 text-xs font-medium">
                        {platformIcon(post.platform)}
                        <span>{post.platform}</span>
                      </div>
                    </td>
                    <td className="py-5 px-4">
                      <span className="text-xs font-semibold text-neutral-600 bg-neutral-100 rounded-md px-2.5 py-1">{post.type}</span>
                    </td>
                    <td className="py-5 px-4">
                      {post.status === 'Published' && <span className="bg-emerald-50 text-emerald-700 font-bold px-3.5 py-1.5 rounded-full text-[10px] tracking-wide inline-flex items-center uppercase font-mono border border-emerald-100">Published</span>}
                      {post.status === 'Draft' && <span className="bg-amber-50 text-amber-600 font-bold px-3.5 py-1.5 rounded-full text-[10px] tracking-wide inline-flex items-center uppercase font-mono border border-amber-100">Draft</span>}
                      {post.status === 'Archived' && <span className="bg-neutral-100 text-neutral-500 font-bold px-3.5 py-1.5 rounded-full text-[10px] tracking-wide inline-flex items-center uppercase font-mono border border-neutral-200">Archived</span>}
                    </td>
                    <td className="py-5 px-4 text-xs font-mono text-neutral-400">{post.publishDate}</td>
                    <td className="py-5 px-4 text-xs font-bold text-neutral-700">{post.views}</td>
                    <td className="py-5 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="w-8 h-8 rounded-lg border border-neutral-200 text-neutral-400 hover:text-[#3BB75E] hover:border-emerald-200 bg-white flex items-center justify-center transition cursor-pointer" title="View"><Eye size={14} /></button>
                        <button className="w-8 h-8 rounded-lg border border-neutral-200 text-neutral-400 hover:text-blue-500 hover:border-blue-200 bg-white flex items-center justify-center transition cursor-pointer" title="Edit"><Pencil size={14} /></button>
                        <button onClick={() => handleDelete(post.id)} className="w-8 h-8 rounded-lg border border-neutral-200 text-neutral-400 hover:text-red-500 hover:border-red-200 bg-white flex items-center justify-center transition cursor-pointer" title="Delete"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="p-5 border-t border-neutral-100 bg-white flex items-center justify-between font-sans text-xs text-neutral-500 font-medium">
          <div>{language === 'bn' ? `মোট ${filteredPosts.length} টি কন্টেন্ট` : `${filteredPosts.length} items total`}</div>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-neutral-950/40 backdrop-blur-xs flex items-center justify-center z-55 p-4">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl text-left border border-neutral-200">
            <div className="p-6 bg-[#3BB75E] text-white flex items-center justify-between">
              <div>
                <h3 className="font-serif font-black text-lg">{language === 'bn' ? 'নতুন কন্টেন্ট যোগ করুন' : 'Add New Content'}</h3>
              </div>
              <button onClick={() => setShowAddModal(false)} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-lg font-bold border-0 transition"><X size={18} /></button>
            </div>
            <form onSubmit={handleAddPost}>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block">{language === 'bn' ? 'শিরোনাম (বাংলা)' : 'Title (Bengali)'}</label>
                    <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="w-full border border-neutral-200 p-2.5 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#3BB75E]" placeholder="যেমন: গাজর চাষের আধুনিক পদ্ধতি" required />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block">{language === 'bn' ? 'শিরোনাম (ইংরেজি)' : 'Title (English)'}</label>
                    <input value={newTitleBn} onChange={(e) => setNewTitleBn(e.target.value)} className="w-full border border-neutral-200 p-2.5 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#3BB75E]" placeholder="e.g. Modern Carrot Farming" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block">{language === 'bn' ? 'প্ল্যাটফর্ম' : 'Platform'}</label>
                    <select value={newPlatform} onChange={(e) => setNewPlatform(e.target.value as any)} className="w-full border border-neutral-200 p-2.5 rounded-xl text-xs bg-white focus:outline-none focus:ring-1 focus:ring-[#3BB75E]">
                      <option value="Facebook">Facebook</option>
                      <option value="YouTube">YouTube</option>
                      <option value="Instagram">Instagram</option>
                      <option value="Website">Website</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block">{language === 'bn' ? 'ধরন' : 'Type'}</label>
                    <select value={newType} onChange={(e) => setNewType(e.target.value as any)} className="w-full border border-neutral-200 p-2.5 rounded-xl text-xs bg-white focus:outline-none focus:ring-1 focus:ring-[#3BB75E]">
                      <option value="Post">Post</option>
                      <option value="Vlog">Vlog</option>
                      <option value="Story">Story</option>
                      <option value="Article">Article</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-neutral-50 border-t border-neutral-100 flex justify-end gap-3 rounded-b-3xl">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4.5 py-2 hover:bg-neutral-100 text-neutral-600 text-xs font-bold rounded-xl border border-neutral-200 transition cursor-pointer">
                  {language === 'bn' ? 'বাতিল' : 'Cancel'}
                </button>
                <button type="submit" className="px-5 py-2 bg-[#3BB75E] hover:bg-[#3BB75E]/90 text-white text-xs font-bold rounded-xl transition cursor-pointer shadow-xs border-0">
                  {language === 'bn' ? 'যোগ করুন' : 'Add Content'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
