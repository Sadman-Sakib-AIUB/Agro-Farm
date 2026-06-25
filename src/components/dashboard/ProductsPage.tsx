import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  Search,
  Plus,
  Trash2,
  Package,
  AlertCircle,
  Star,
  X,
  Pencil
} from 'lucide-react';

interface Product {
  id: number;
  name: string;
  nameBn: string;
  price: string;
  unit: string;
  stock: number;
  minStock: number;
  category: string;
  rating: string;
}

const categories = ['All', 'Vegetables', 'Grains', 'Seeds', 'Dairy'];

export const ProductsPage: React.FC = () => {
  const { language } = useLanguage();

  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: 'Fresh Organic Carrots', nameBn: 'টাটকা গাজর', price: '$2.00', unit: 'kg', stock: 120, minStock: 20, category: 'Vegetables', rating: '4.9' },
    { id: 2, name: 'Premium Red Potato', nameBn: 'দেশি গোল আলু', price: '$1.20', unit: 'kg', stock: 350, minStock: 50, category: 'Vegetables', rating: '4.8' },
    { id: 3, name: 'Savar Sweet Honey', nameBn: 'খাঁটি মধু', price: '$12.50', unit: 'bottle', stock: 15, minStock: 10, category: 'Grains', rating: '5.0' },
    { id: 4, name: 'Mustard Oil Seeds', nameBn: 'সরিষা বীজ', price: '$4.00', unit: 'kg', stock: 5, minStock: 30, category: 'Seeds', rating: '4.6' },
    { id: 5, name: 'Kushtia Red Lentils', nameBn: 'কুষ্টিয়ার লাল ডাল', price: '$3.50', unit: 'kg', stock: 180, minStock: 40, category: 'Grains', rating: '4.7' },
    { id: 6, name: 'Organic Butter Ghee', nameBn: 'গাওয়া ঘি', price: '$18.00', unit: 'pot', stock: 0, minStock: 15, category: 'Dairy', rating: '4.9' }
  ]);

  const [categoryFilter, setCategoryFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newNameBn, setNewNameBn] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newStock, setNewStock] = useState('');
  const [newUnit, setNewUnit] = useState('kg');
  const [newCategory, setNewCategory] = useState('Vegetables');

  const filteredProducts = products.filter(p => {
    const matchCategory = categoryFilter === 'All' || p.category === categoryFilter;
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        p.nameBn.includes(searchTerm);
    return matchCategory && matchSearch;
  });

  const lowStockCount = products.filter(p => p.stock < p.minStock).length;
  const categoryCount = new Set(products.map(p => p.category)).size;
  const avgRating = (products.reduce((sum, p) => sum + parseFloat(p.rating), 0) / products.length).toFixed(1);

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newPrice || !newStock) return;
    const newId = products.length + 1;
    setProducts([...products, {
      id: newId,
      name: newName,
      nameBn: newNameBn || newName,
      price: `$${parseFloat(newPrice).toFixed(2)}`,
      unit: newUnit,
      stock: parseInt(newStock) || 0,
      minStock: 20,
      category: newCategory,
      rating: '5.0'
    }]);
    setShowAddModal(false);
    setNewName('');
    setNewNameBn('');
    setNewPrice('');
    setNewStock('');
  };

  const handleDeleteProduct = (id: number) => {
    const confirmText = language === 'bn' ? 'এই পণ্যটি ডিলিট করবেন?' : 'Delete this product?';
    if (window.confirm(confirmText)) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto w-full text-left">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-black tracking-tight text-neutral-950">
            {language === 'bn' ? 'পণ্য তালিকা' : 'Product Inventory'}
          </h1>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2.5 bg-[#3BB75E] hover:bg-[#3BB75E]/90 text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition flex items-center gap-2 cursor-pointer"
        >
          <Plus size={16} />
          <span>{language === 'bn' ? 'নতুন পণ্য যোগ করুন' : 'Add Product'}</span>
        </button>
      </div>

      {/* METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-neutral-200/70 shadow-xs space-y-4">
          <div className="flex justify-between items-start">
            <span className="text-sm font-semibold text-neutral-500">
              {language === 'bn' ? 'মোট পণ্য' : 'Total Products'}
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#3BB75E] flex items-center justify-center">
              <Package size={16} />
            </div>
          </div>
          <div className="text-3xl font-bold text-neutral-950">{products.length}</div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-neutral-200/70 shadow-xs space-y-4">
          <div className="flex justify-between items-start">
            <span className="text-sm font-semibold text-neutral-500">
              {language === 'bn' ? 'স্বল্প মজুদ' : 'Low Stock Items'}
            </span>
            <div className="w-8 h-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center">
              <AlertCircle size={16} />
            </div>
          </div>
          <div className={`text-3xl font-bold ${lowStockCount > 0 ? 'text-red-500' : 'text-neutral-950'}`}>
            {lowStockCount}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-neutral-200/70 shadow-xs space-y-4">
          <div className="flex justify-between items-start">
            <span className="text-sm font-semibold text-neutral-500">
              {language === 'bn' ? 'বিভাগ' : 'Categories'}
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center">
              <Package size={16} />
            </div>
          </div>
          <div className="text-3xl font-bold text-neutral-950">{categoryCount}</div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-neutral-200/70 shadow-xs space-y-4">
          <div className="flex justify-between items-start">
            <span className="text-sm font-semibold text-neutral-500">
              {language === 'bn' ? 'গড় রেটিং' : 'Avg Rating'}
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-500 flex items-center justify-center">
              <Star size={16} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-neutral-950">{avgRating}</span>
            <span className="text-xs text-amber-500">★</span>
          </div>
        </div>
      </div>

      {/* TABLE CARD */}
      <div className="bg-white border border-neutral-200/80 rounded-3xl overflow-hidden shadow-xs">
        <div className="p-6 border-b border-neutral-200 flex flex-col md:flex-row md:items-center justify-between gap-5 bg-white">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-4.5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  categoryFilter === cat
                    ? 'bg-[#3BB75E] text-white shadow-sm border-transparent'
                    : 'bg-white hover:bg-neutral-50 text-neutral-500 border border-neutral-200'
                }`}
              >
                {cat === 'All' && (language === 'bn' ? 'সব পণ্য' : 'All Menu')}
                {cat === 'Vegetables' && (language === 'bn' ? 'সবজি' : 'Vegetables')}
                {cat === 'Grains' && (language === 'bn' ? 'শস্য' : 'Grains')}
                {cat === 'Seeds' && (language === 'bn' ? 'বীজ' : 'Seeds')}
                {cat === 'Dairy' && (language === 'bn' ? 'দুগ্ধ' : 'Dairy')}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder={language === 'bn' ? 'পণ্যের নাম খুঁজুন...' : 'Search products...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 bg-neutral-50 border border-neutral-200 focus:border-[#3BB75E] focus:bg-white rounded-xl text-xs transition focus:outline-none focus:ring-1 focus:ring-[#3BB75E] outline-none text-neutral-800 w-48 font-semibold"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm text-neutral-600 border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-neutral-100 text-[11px] sm:text-xs uppercase font-semibold text-neutral-500 bg-neutral-50/50">
                <th className="py-4 px-6 font-bold">#</th>
                <th className="py-4 px-4 font-bold">{language === 'bn' ? 'পণ্যের নাম' : 'Product Name'}</th>
                <th className="py-4 px-4 font-bold">{language === 'bn' ? 'দাম' : 'Price'}</th>
                <th className="py-4 px-4 font-bold">{language === 'bn' ? 'একক' : 'Unit'}</th>
                <th className="py-4 px-4 font-bold text-center">{language === 'bn' ? 'স্টক' : 'Stock'}</th>
                <th className="py-4 px-4 font-bold text-center">{language === 'bn' ? 'ন্যূনতম' : 'Min Stock'}</th>
                <th className="py-4 px-4 font-bold">{language === 'bn' ? 'বিভাগ' : 'Category'}</th>
                <th className="py-4 px-4 font-bold text-center">{language === 'bn' ? 'রেটিং' : 'Rating'}</th>
                <th className="py-4 px-6 font-bold text-right">{language === 'bn' ? 'অ্যাকশন' : 'Action'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-neutral-700 bg-white">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-neutral-400 font-light">
                    {language === 'bn' ? 'কোনো পণ্য পাওয়া যায়নি।' : 'No products found.'}
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-neutral-50/60 transition-colors">
                    <td className="py-5 px-6 font-mono text-neutral-400 text-xs">{String(product.id).padStart(2, '0')}</td>
                    <td className="py-5 px-4">
                      <div className="font-bold text-neutral-900">{product.name}</div>
                      <div className="text-[10px] text-neutral-400 mt-0.5">{product.nameBn}</div>
                    </td>
                    <td className="py-5 px-4 font-semibold text-neutral-900 font-mono">{product.price}</td>
                    <td className="py-5 px-4 text-xs text-neutral-400 font-medium">{product.unit}</td>
                    <td className="py-5 px-4 text-center">
                      <span className={`font-bold font-mono text-sm ${
                        product.stock < product.minStock ? 'text-red-500' : 'text-neutral-900'
                      }`}>
                        {product.stock}
                      </span>
                      {product.stock < product.minStock && (
                        <span className="ml-1.5 inline-flex items-center text-red-400">
                          <AlertCircle size={12} />
                        </span>
                      )}
                    </td>
                    <td className="py-5 px-4 text-center font-mono text-neutral-400 text-xs">{product.minStock}</td>
                    <td className="py-5 px-4">
                      <span className="text-xs font-semibold text-neutral-600 bg-neutral-100 rounded-md px-2.5 py-1">
                        {product.category}
                      </span>
                    </td>
                    <td className="py-5 px-4 text-center">
                      <span className="flex items-center justify-center gap-1 text-xs font-bold text-amber-600">
                        <Star size={12} className="fill-amber-400 text-amber-400" />
                        {product.rating}
                      </span>
                    </td>
                    <td className="py-5 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="w-8 h-8 rounded-lg border border-neutral-200 text-neutral-400 hover:text-blue-500 hover:border-blue-200 bg-white flex items-center justify-center transition cursor-pointer" title="Edit">
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
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
          <div>{language === 'bn' ? `মোট ${filteredProducts.length} টি পণ্য` : `${filteredProducts.length} products total`}</div>
        </div>
      </div>

      {/* ADD PRODUCT MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-neutral-950/40 backdrop-blur-xs flex items-center justify-center z-55 p-4">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl text-left border border-neutral-200">
            <div className="p-6 bg-[#3BB75E] text-white flex items-center justify-between">
              <div>
                <h3 className="font-serif font-black text-lg">
                  {language === 'bn' ? 'নতুন পণ্য যোগ করুন' : 'Add New Product'}
                </h3>
              </div>
              <button onClick={() => setShowAddModal(false)} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-lg font-bold border-0 transition">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleAddProduct}>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block">{language === 'bn' ? 'পণ্যের নাম' : 'Product Name'}</label>
                    <input value={newName} onChange={(e) => setNewName(e.target.value)} className="w-full border border-neutral-200 p-2.5 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#3BB75E]" placeholder="e.g. Fresh Carrot" required />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block">{language === 'bn' ? 'বাংলা নাম' : 'Bengali Name'}</label>
                    <input value={newNameBn} onChange={(e) => setNewNameBn(e.target.value)} className="w-full border border-neutral-200 p-2.5 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#3BB75E]" placeholder="যেমন: টাটকা গাজর" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block">{language === 'bn' ? 'দাম' : 'Price'}</label>
                    <input type="number" step="0.01" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} className="w-full border border-neutral-200 p-2.5 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#3BB75E]" placeholder="$0.00" required />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block">{language === 'bn' ? 'একক' : 'Unit'}</label>
                    <select value={newUnit} onChange={(e) => setNewUnit(e.target.value)} className="w-full border border-neutral-200 p-2.5 rounded-xl text-xs bg-white focus:outline-none focus:ring-1 focus:ring-[#3BB75E]">
                      <option value="kg">kg</option>
                      <option value="bottle">bottle</option>
                      <option value="pot">pot</option>
                      <option value="piece">piece</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block">{language === 'bn' ? 'স্টক' : 'Stock'}</label>
                    <input type="number" value={newStock} onChange={(e) => setNewStock(e.target.value)} className="w-full border border-neutral-200 p-2.5 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#3BB75E]" placeholder="0" required />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block">{language === 'bn' ? 'বিভাগ' : 'Category'}</label>
                    <select value={newCategory} onChange={(e) => setNewCategory(e.target.value)} className="w-full border border-neutral-200 p-2.5 rounded-xl text-xs bg-white focus:outline-none focus:ring-1 focus:ring-[#3BB75E]">
                      <option value="Vegetables">Vegetables</option>
                      <option value="Grains">Grains</option>
                      <option value="Seeds">Seeds</option>
                      <option value="Dairy">Dairy</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-neutral-50 border-t border-neutral-100 flex justify-end gap-3 rounded-b-3xl">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4.5 py-2 hover:bg-neutral-100 text-neutral-600 text-xs font-bold rounded-xl border border-neutral-200 transition cursor-pointer">
                  {language === 'bn' ? 'বাতিল' : 'Cancel'}
                </button>
                <button type="submit" className="px-5 py-2 bg-[#3BB75E] hover:bg-[#3BB75E]/90 text-white text-xs font-bold rounded-xl transition cursor-pointer shadow-xs border-0">
                  {language === 'bn' ? 'যোগ করুন' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
