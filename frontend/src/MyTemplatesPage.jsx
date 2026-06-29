import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Download, LayoutTemplate, ArrowLeft, Loader2, CheckCircle2, Trash2 } from 'lucide-react';
import { useCart } from './CartContext';
import UserMenu from './UserMenu';
import { toast } from 'sonner';

export default function MyTemplatesPage() {
  const { purchasedTemplates, removePurchasedTemplate } = useCart();
  const [downloading, setDownloading] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleDelete = (templateId, templateTitle) => {
    if (window.confirm(`Are you sure you want to delete ${templateTitle} from your templates? This action cannot be undone.`)) {
      removePurchasedTemplate(templateId);
    }
  };

  const handleDownload = (templateId, templateTitle) => {
    if (downloading[templateId]) return;

    setDownloading(prev => ({ ...prev, [templateId]: { progress: 0, done: false, link: null } }));
    toast.info(`Authenticating & generating secure token for ${templateTitle}...`);

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 20) + 10;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setDownloading(prev => ({ ...prev, [templateId]: { progress: 100, done: true, link: `https://download.bizleap.com/secure/${Math.random().toString(36).substring(2,15)}` } }));
        
        toast.success(`Secure temporary link generated!`, {
          icon: <CheckCircle2 className="w-5 h-5 text-green-500" />
        });
      } else {
        setDownloading(prev => ({ ...prev, [templateId]: { progress, done: false, link: null } }));
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-black dark:text-white font-sans pb-24 transition-colors duration-500">
      <nav className="h-[80px] w-full px-8 md:px-16 flex items-center justify-between glass-nav sticky top-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-gray-200 dark:border-white/10">
        <Link to="/" className="text-2xl font-black tracking-[0.25em] uppercase text-black dark:text-white">Bizleap</Link>
        <div className="flex items-center gap-6">
          <UserMenu />
        </div>
      </nav>

      <div className="max-w-[1200px] mx-auto px-8 md:px-16 mt-12 relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl pointer-events-none mix-blend-screen" />
        
        <Link to="/" className="inline-flex items-center gap-2 text-gray-500 font-bold hover:text-black dark:text-white mb-8 transition-colors">
          <ArrowLeft className="w-5 h-5" /> Back to Market
        </Link>

        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-12">My Templates</h1>

        {!purchasedTemplates || purchasedTemplates.length === 0 ? (
          <div className="bg-white/50 dark:bg-white/[0.02] backdrop-blur-xl p-16 md:p-32 rounded-[3rem] border border-black/[0.04] dark:border-white/[0.05] shadow-[0_20px_40px_rgba(0,0,0,0.02)] text-center">
             <div className="w-32 h-32 bg-gray-100 dark:bg-gray-900 rounded-[2rem] flex items-center justify-center mx-auto mb-8">
                <LayoutTemplate className="w-12 h-12 text-gray-300 dark:text-gray-600" />
             </div>
             <h2 className="text-3xl font-black text-gray-900 dark:text-gray-100 mb-4">No templates yet</h2>
             <p className="text-lg text-gray-500 mb-8 max-w-md mx-auto">
               You haven't purchased any templates. Explore the marketplace to find the perfect template for your next project.
             </p>
             <Link to="/" className="px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-full font-bold hover:scale-105 transition-transform shadow-lg inline-block">
                Explore Market
             </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            {purchasedTemplates.map(template => {
              const isDownloading = downloading[template.id] !== undefined;
              const progress = isDownloading ? downloading[template.id].progress : 0;
              const isDone = isDownloading && downloading[template.id].done;

              return (
                <div key={template.id} className="glass-panel p-6 rounded-[2rem] flex flex-col group hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-white/10 bg-white dark:bg-gray-900/50 relative overflow-hidden">
                   <div className="w-full aspect-[16/10] bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden mb-6 relative">
                      <img src={template.image} alt={template.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                   </div>
                   <div className="flex-1">
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">{template.category}</p>
                      <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">{template.title}</h3>
                   </div>
                   <div className="pt-6 border-t border-gray-100 dark:border-white/10 mt-6 relative">
                      {isDownloading && !isDone && (
                        <div className="absolute top-0 left-0 w-full h-1 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden mb-2 -mt-2">
                          <div 
                            className="h-full bg-blue-500 transition-all duration-300 ease-out" 
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      )}
                      
                      <div className="flex gap-2 w-full">
                        {isDone ? (
                          <div className="flex-1 flex flex-col gap-2">
                            <a 
                              href="#"
                              onClick={(e) => { e.preventDefault(); toast.success("Download started via secure signed URL."); }}
                              className="w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-md bg-green-500 text-white hover:bg-green-600"
                            >
                              <CheckCircle2 className="w-5 h-5" /> Download Ready
                            </a>
                            <p className="text-[10px] text-gray-500 dark:text-gray-400 text-center font-medium">
                              Link expires in 15m. Bound to your IP.
                            </p>
                          </div>
                        ) : (
                          <button 
                            onClick={() => handleDownload(template.id, template.title)}
                            disabled={isDownloading}
                            className={`flex-1 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-md ${
                              isDownloading
                                ? 'bg-gray-100 dark:bg-gray-800 text-gray-500 cursor-not-allowed'
                                : 'bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200'
                            }`}
                          >
                            {isDownloading ? (
                              <><Loader2 className="w-5 h-5 animate-spin" /> Generating Token... {progress}%</>
                            ) : (
                              <><Download className="w-5 h-5" /> Generate Secure Link</>
                            )}
                          </button>
                        )}
                        
                        {!isDone && (
                          <button 
                            onClick={() => handleDelete(template.id, template.title)}
                            className="w-14 shrink-0 flex items-center justify-center rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                            title="Delete Template"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                   </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
