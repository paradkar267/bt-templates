import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, ShoppingCart, Check, ShieldCheck, Zap, X, Monitor, Smartphone, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { marketplaceTemplates } from './data';
import { useCart } from './CartContext';
import UserMenu from './UserMenu';
import { useTheme } from './ThemeContext';

export default function ProductPage() {
  const { id } = useParams();
  const { addToCart, cartItems } = useCart();
  const { theme } = useTheme();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [deviceMode, setDeviceMode] = useState('desktop'); // 'desktop' or 'mobile'
  const isDark = theme === 'dark';
  const template = marketplaceTemplates.find(t => t.id === parseInt(id));

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!template) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-transparent text-white' : 'bg-white dark:bg-black text-black dark:text-white'}`}>
        <div className="text-center">
          <h1 className="text-4xl font-black mb-4">Template Not Found</h1>
          <Link to="/" className="text-gray-500 hover:text-black dark:text-white underline">Back to Marketplace</Link>
        </div>
      </div>
    );
  }

  const inCart = cartItems.some(item => item.id === template.id);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-black dark:text-white font-sans pb-24">
      {/* Mini Nav */}
      <nav className="h-[80px] w-full px-8 md:px-16 flex items-center justify-between glass-nav sticky top-0 z-50">
        <Link to="/" className="text-2xl font-black tracking-[0.25em] text-black dark:text-white uppercase">Bizleap</Link>
        <div className="flex items-center gap-6">
          <UserMenu />
          <Link to="/cart" className="relative p-2 hover:bg-gray-100 dark:bg-gray-800 rounded-full transition-colors cursor-pointer">
            <ShoppingCart className="w-6 h-6" />
            {cartItems.length > 0 && (
              <span className="absolute top-0 right-0 w-5 h-5 bg-black text-white text-xs font-bold rounded-full flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Link>
        </div>
      </nav>

      <div className="max-w-[1400px] mx-auto px-8 md:px-16 mt-12 relative">
        {/* Subtle Aurora Blobs for Product Page */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-200/50 aurora-blob"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-200/50 aurora-blob animation-delay-2000"></div>

        <div className="relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <Link to="/#catalog" className="inline-flex items-center gap-2 text-gray-500 font-bold hover:text-black dark:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" /> Back to Market
            </Link>
            
            <button 
              onClick={() => {
                const event = new KeyboardEvent('keydown', { key: 'k', ctrlKey: true });
                window.dispatchEvent(event);
              }}
              className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-black dark:hover:text-white transition-colors group bg-white/50 dark:bg-white/5 px-3 py-1.5 rounded-full border border-gray-200 dark:border-white/5"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Quick Search</span>
              <kbd className="px-1.5 py-0.5 rounded-md bg-gray-100 dark:bg-black border border-gray-200 dark:border-white/10 shadow-sm font-sans font-bold text-[10px] text-gray-500 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors">Ctrl+K</kbd>
            </button>
          </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Image & Details */}
          <div className="lg:col-span-2">
            <div className="w-full h-[350px] lg:h-[450px] bg-gray-200 rounded-[2rem] overflow-hidden shadow-sm mb-12 border border-gray-200 dark:border-gray-800">
              <img src={template.image} alt={template.title} className="w-full h-full object-cover" />
            </div>

            <div className="glass-panel p-10 rounded-[2rem]">
              <h2 className="text-3xl font-black tracking-tight mb-6">Product Overview</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                {template.description}
              </p>
              
              <h3 className="text-xl font-bold mb-4">Features</h3>
              <ul className="space-y-3 text-gray-600 font-medium">
                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-black dark:text-white" /> Fully responsive design layout</li>
                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-black dark:text-white" /> Modular and clean component architecture</li>
                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-black dark:text-white" /> Easy to customize variables and tokens</li>
                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-black dark:text-white" /> Premium email support for 6 months</li>
              </ul>
            </div>
          </div>

          {/* Right Column: Checkout Box */}
          <div className="lg:col-span-1">
            <div className="glass-panel p-8 rounded-[2rem] sticky top-[120px]">
               <div className="mb-6">
                 <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">{template.category} • {template.tag}</p>
                 <h1 className="text-4xl font-black tracking-tight leading-tight mb-2">{template.title}</h1>
                 <p className="text-gray-500 font-medium">by <span className="text-black dark:text-white font-bold cursor-pointer hover:underline">{template.author}</span></p>
               </div>

               <div className="flex items-center gap-4 mb-8">
                  <div className="flex text-black dark:text-white">
                     {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < Math.floor(template.rating) ? 'fill-current' : 'text-gray-300'}`} />
                     ))}
                  </div>
                  <span className="text-sm font-bold text-gray-600">{template.sales.toLocaleString()} Sales</span>
               </div>

               <div className="text-5xl font-black text-black dark:text-white mb-8 border-y border-gray-100 py-6">
                 ${template.price}
               </div>

               <div className="space-y-4 mb-8 text-sm font-medium text-gray-600">
                  <div className="flex items-center gap-3"><ShieldCheck className="w-5 h-5 text-black dark:text-white" /> Quality checked by Bizleap</div>
                  <div className="flex items-center gap-3"><Zap className="w-5 h-5 text-black dark:text-white" /> Instant download access</div>
               </div>

               <button 
                  onClick={() => addToCart(template)}
                  disabled={inCart}
                  className={`w-full py-5 rounded-xl font-black text-lg transition-all shadow-xl flex items-center justify-center gap-3 ${inCart ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-black text-white hover:bg-gray-800 hover:scale-[1.02]'}`}
               >
                  {inCart ? 'Added to Cart' : <><ShoppingCart className="w-6 h-6" /> Add to Cart</>}
               </button>

               <button 
                  onClick={() => setIsPreviewOpen(true)}
                  className="w-full py-4 mt-4 rounded-xl font-bold text-black dark:text-white border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:bg-gray-900 transition-all"
               >
                  Live Preview
               </button>
            </div>
          </div>
        </div>
        </div>
      </div>

      {/* Live Preview Modal */}
      <AnimatePresence>
        {isPreviewOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] bg-black/80 backdrop-blur-md flex flex-col"
          >
            {/* Top Bar */}
            <div className="h-16 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-white/10 flex items-center justify-between px-6 shrink-0">
              <div className="flex items-center gap-4">
                <span className="font-black text-lg tracking-tight">{template.title}</span>
                <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-gray-100 dark:bg-gray-800 rounded-md">Live Preview</span>
              </div>
              
              <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-900 rounded-lg p-1">
                <button 
                  onClick={() => setDeviceMode('desktop')}
                  className={`p-1.5 rounded-md transition-colors ${deviceMode === 'desktop' ? 'bg-white dark:bg-gray-800 shadow-sm text-black dark:text-white' : 'text-gray-500 hover:text-black dark:hover:text-white'}`}
                >
                  <Monitor className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setDeviceMode('mobile')}
                  className={`p-1.5 rounded-md transition-colors ${deviceMode === 'mobile' ? 'bg-white dark:bg-gray-800 shadow-sm text-black dark:text-white' : 'text-gray-500 hover:text-black dark:hover:text-white'}`}
                >
                  <Smartphone className="w-4 h-4" />
                </button>
              </div>

              <button 
                onClick={() => setIsPreviewOpen(false)}
                className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-black dark:hover:text-white transition-colors"
              >
                Close <X className="w-5 h-5" />
              </button>
            </div>

            {/* Iframe Container */}
            <div className="flex-1 w-full bg-gray-100 dark:bg-black/50 overflow-hidden flex items-center justify-center p-4 sm:p-8">
              <motion.div 
                layout
                initial={false}
                animate={{ 
                  width: deviceMode === 'desktop' ? '100%' : '375px',
                  height: deviceMode === 'desktop' ? '100%' : '812px',
                  borderRadius: deviceMode === 'desktop' ? '0.5rem' : '2.5rem'
                }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="bg-white dark:bg-gray-900 overflow-hidden shadow-2xl relative border-4 border-gray-200 dark:border-gray-800"
              >
                <iframe 
                  src="https://example.com" 
                  title={`${template.title} Live Preview`}
                  className="w-full h-full border-none bg-white"
                  sandbox="allow-scripts allow-same-origin"
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
