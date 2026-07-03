import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useTemplates } from './useTemplates';
import { useCurrency } from './CurrencyContext';
import { supabase } from './lib/supabase';
import { 
  LayoutDashboard, 
  Package, 
  Upload, 
  TrendingUp, 
  Users, 
  DollarSign,
  AlertCircle,
  Loader2,
  CheckCircle2,
  Image as ImageIcon,
  FileArchive
} from 'lucide-react';
import { Logo } from './components/ui/Logo';
import { Link, useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const { session, user } = useAuth();
  const navigate = useNavigate();
  const { templates, refetch } = useTemplates();
  const { formatPrice } = useCurrency();
  const [activeTab, setActiveTab] = useState('templates');
  
  // Upload state
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState('');
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: 'React',
    tag: 'SaaS',
    keywords: '',
    image: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);

  // Check Admin Access
  const isAdmin = user?.email?.toLowerCase() === 'bizleap1@gmail.com';

  useEffect(() => {
    if (session && !isAdmin) {
      navigate('/');
    }
  }, [session, isAdmin, navigate]);

  const handlePriceUpdate = async (templateId, currentPrice) => {
    const newPrice = window.prompt(`Enter new price for this template:`, currentPrice);
    if (!newPrice || isNaN(newPrice) || newPrice === currentPrice) return;
    
    try {
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      const res = await fetch('http://localhost:3000/api/admin/update-price', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentSession?.access_token}`
        },
        body: JSON.stringify({ templateId, newPrice })
      });
      if (!res.ok) throw new Error('Failed to update price');
      alert('Price updated successfully!');
      refetch();
    } catch (error) {
      console.error(error);
      alert('Error updating price');
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setUploadError('Please select a ZIP file');
      return;
    }
    
    setUploadLoading(true);
    setUploadError('');
    setUploadSuccess(false);

    const formPayload = new FormData();
    formPayload.append('file', selectedFile);
    formPayload.append('title', formData.title);
    formPayload.append('description', formData.description);
    formPayload.append('price', formData.price);
    formPayload.append('category', formData.category);
    formPayload.append('tag', formData.tag);
    formPayload.append('keywords', formData.keywords);
    formPayload.append('image', formData.image);

    try {
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      const res = await fetch('http://localhost:3000/api/admin/upload-template', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${currentSession?.access_token}`
        },
        body: formPayload
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      
      setUploadSuccess(true);
      setFormData({
        title: '', description: '', price: '', category: 'React', tag: 'SaaS', keywords: '', image: ''
      });
      setSelectedFile(null);
      refetch(); // Refresh template list
    } catch (error) {
      console.error(error);
      setUploadError(error.message);
    } finally {
      setUploadLoading(false);
    }
  };

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] text-black dark:text-white font-sans flex">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-[#111111] border-r border-gray-200 dark:border-white/10 h-screen sticky top-0 flex flex-col">
        <div className="p-6 border-b border-gray-200 dark:border-white/10">
          <Logo />
          <div className="mt-2 text-xs font-bold text-indigo-500 uppercase tracking-widest">Admin Panel</div>
        </div>
        <nav className="p-4 space-y-2 flex-1">
          <button 
            onClick={() => setActiveTab('templates')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'templates' ? 'bg-black text-white dark:bg-white dark:text-black shadow-md' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-black dark:hover:text-white'}`}
          >
            <Package className="w-5 h-5" /> Manage Templates
          </button>
          <button 
            onClick={() => setActiveTab('upload')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'upload' ? 'bg-black text-white dark:bg-white dark:text-black shadow-md' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-black dark:hover:text-white'}`}
          >
            <Upload className="w-5 h-5" /> Add New Template
          </button>
        </nav>
        <div className="p-4 border-t border-gray-200 dark:border-white/10">
          <Link to="/" className="w-full flex items-center justify-center gap-2 py-3 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 rounded-xl font-bold transition-colors">
            Back to Store
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-8 lg:p-12">

        {activeTab === 'templates' && (
          <div className="max-w-5xl mx-auto animate-fade-in-up">
            <h1 className="text-3xl font-black mb-8">Manage Templates</h1>
            <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm">
               <div className="overflow-x-auto">
                 <table className="w-full text-left">
                    <thead className="bg-gray-50 dark:bg-white/5 border-b border-gray-200 dark:border-white/10 text-xs uppercase font-bold text-gray-500">
                      <tr>
                        <th className="px-6 py-4">Product</th>
                        <th className="px-6 py-4">Category</th>
                        <th className="px-6 py-4">Price</th>
                        <th className="px-6 py-4">Sales</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-white/5">
                      {templates.map(t => (
                        <tr key={t.id} className="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <img src={t.image} alt={t.title} className="w-10 h-10 rounded-lg object-cover" />
                              <span className="font-bold">{t.title}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-2 py-1 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold rounded-md">
                              {t.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 font-bold">{formatPrice(t.price)}</td>
                          <td className="px-6 py-4 text-gray-500">{t.sales}</td>
                          <td className="px-6 py-4 text-right">
                             <button 
                               onClick={() => handlePriceUpdate(t.id, t.price)}
                               className="px-3 py-1 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 rounded-md text-sm font-bold transition-colors"
                             >
                               Edit Price
                             </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                 </table>
               </div>
            </div>
          </div>
        )}

        {activeTab === 'upload' && (
          <div className="max-w-3xl mx-auto animate-fade-in-up">
            <h1 className="text-3xl font-black mb-2">Upload New Template</h1>
            <p className="text-gray-500 mb-8">Add a new digital product to the marketplace.</p>

            <form onSubmit={handleUpload} className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-3xl p-8 shadow-sm">
              {uploadError && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 rounded-xl flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span className="font-medium text-sm">{uploadError}</span>
                </div>
              )}
              {uploadSuccess && (
                <div className="mb-6 p-4 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span className="font-medium text-sm">Template uploaded successfully!</span>
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold mb-2">Title</label>
                  <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-gray-50 dark:bg-black border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow" placeholder="e.g. Next.js SaaS Starter" />
                </div>
                
                <div>
                  <label className="block text-sm font-bold mb-2">Description</label>
                  <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows="3" className="w-full bg-gray-50 dark:bg-black border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow" placeholder="Detailed description of the template..."></textarea>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold mb-2">Price (₹)</label>
                    <input type="number" required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full bg-gray-50 dark:bg-black border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow" placeholder="4999" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Category</label>
                    <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-gray-50 dark:bg-black border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow">
                      <option value="React">React</option>
                      <option value="Vue">Vue</option>
                      <option value="Next.js">Next.js</option>
                      <option value="Svelte">Svelte</option>
                      <option value="HTML">HTML</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold mb-2">Tag</label>
                    <input type="text" required value={formData.tag} onChange={e => setFormData({...formData, tag: e.target.value})} className="w-full bg-gray-50 dark:bg-black border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow" placeholder="e.g. Dashboard" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Keywords (comma separated)</label>
                    <input type="text" required value={formData.keywords} onChange={e => setFormData({...formData, keywords: e.target.value})} className="w-full bg-gray-50 dark:bg-black border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow" placeholder="react, admin, dark mode" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">Cover Image URL</label>
                  <div className="relative">
                     <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                     <input type="url" required value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="w-full bg-gray-50 dark:bg-black border border-gray-200 dark:border-white/10 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow" placeholder="https://images.unsplash.com/..." />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">ZIP File (The actual product)</label>
                  <div className="relative">
                     <input 
                       type="file" 
                       accept=".zip" 
                       required 
                       onChange={e => setSelectedFile(e.target.files[0])}
                       className="hidden" 
                       id="zip-upload"
                     />
                     <label htmlFor="zip-upload" className="w-full flex items-center justify-center gap-3 border-2 border-dashed border-gray-300 dark:border-white/20 hover:border-indigo-500 dark:hover:border-indigo-500 rounded-2xl p-8 cursor-pointer transition-colors bg-gray-50 dark:bg-white/[0.02]">
                       <FileArchive className={`w-8 h-8 ${selectedFile ? 'text-indigo-500' : 'text-gray-400'}`} />
                       <span className={`font-medium ${selectedFile ? 'text-indigo-500' : 'text-gray-500'}`}>
                         {selectedFile ? selectedFile.name : 'Click to select a .zip file'}
                       </span>
                     </label>
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={uploadLoading}
                  className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                >
                  {uploadLoading ? <><Loader2 className="w-5 h-5 animate-spin" /> Uploading...</> : 'Upload Template'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
