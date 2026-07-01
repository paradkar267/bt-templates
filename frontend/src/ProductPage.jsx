import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, ShoppingCart, Check, ShieldCheck, Zap, Search, Heart, Eye } from 'lucide-react';
import { useTemplates } from './useTemplates';
import { useCart } from './CartContext';
import { useWishlist } from './WishlistContext';
import { ReviewsSection } from './ReviewsSection';
import UserMenu from './UserMenu';
import { useTheme } from './ThemeContext';
import { useAuth } from './AuthContext';
import { ProductSkeleton } from './components/ui/Skeleton';
import { FAQSection } from './components/ui/FAQSection';
import { LivePreviewModal } from './components/ui/LivePreviewModal';
import { InteractiveProductCard } from './components/ui/card-7';
import { Logo } from './components/ui/Logo';

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, cartItems, purchasedTemplates } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { templates, loading } = useTemplates();
  const { requireAuth } = useAuth();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white font-sans transition-colors duration-500">
        <nav className="h-[80px] w-full px-8 md:px-16 flex items-center justify-between glass-nav sticky top-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-gray-200 dark:border-white/10">
          <Logo />
          <UserMenu />
        </nav>
        <ProductSkeleton />
      </div>
    );
  }

  const template = templates.find(t => t.id === parseInt(id));

  const inCart = template ? cartItems.some(item => item.id === template.id) : false;
  const isOwned = template ? purchasedTemplates?.some(item => item.id === template.id) : false;
  const similarTemplates = template ? templates.filter(t => t.category === template.category && t.id !== template.id).slice(0, 3) : [];

  if (!template) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-transparent text-white' : 'bg-white dark:bg-black text-black dark:text-white'}`}>
        <div className="text-center flex flex-col items-center">
          <h1 className="text-4xl font-black mb-4">Template Not Found</h1>
          <Logo />
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen font-sans transition-colors duration-1000 ${isDark ? 'bg-black text-white' : 'bg-gray-50 text-black'}`}>
      <nav className="flex items-center justify-between p-6 md:px-16 border-b border-gray-200 dark:border-white/10">
        <Logo />
        <div className="flex items-center gap-6">
<button onClick={() => requireAuth(() => navigate('/cart'))} className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors cursor-pointer">
            <ShoppingCart className="w-6 h-6" />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-black text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-md">
                {cartItems.length}
              </span>
            )}
          </button>
          <UserMenu />
          
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
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                {template.description}
              </p>
              
              <h3 className="text-xl font-bold mb-4">Features</h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300 font-medium">
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
                 <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">{template.category} • {template.tag}</p>
                 <h1 className="text-4xl font-black tracking-tight leading-tight mb-2">{template.title}</h1>
                 <p className="text-gray-500 font-medium">by <span className="text-black dark:text-white font-bold cursor-pointer hover:underline">{template.author}</span></p>
               </div>

               <div className="flex items-center gap-4 mb-8">
                  <div className="flex text-black dark:text-white">
                     {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < Math.floor(template.rating) ? 'fill-current' : 'text-gray-300 dark:text-gray-600'}`} />
                     ))}
                  </div>
                  <span className="text-sm font-bold text-gray-600 dark:text-gray-300">{template.sales.toLocaleString()} Sales</span>
               </div>

               <div className="text-5xl font-black text-black dark:text-white mb-8 border-y border-gray-100 dark:border-white/10 py-6">
                 ₹{template.price}
               </div>


               <div className="space-y-4 mb-8 text-sm font-medium text-gray-600 dark:text-gray-300">
                  <div className="flex items-center gap-3"><ShieldCheck className="w-5 h-5 text-black dark:text-white" /> Quality checked by Bizleap</div>
                  <div className="flex items-center gap-3"><Zap className="w-5 h-5 text-black dark:text-white" /> Instant download access</div>
               </div>

               <button 
                  onClick={() => {
                    if (isOwned) return;
                    requireAuth(() => addToCart(template));
                  }}
                  disabled={isOwned}
                  className={`w-full py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.1)] ${
                    isOwned
                    ? 'bg-emerald-500 text-white shadow-emerald-500/20 cursor-default opacity-90'
                    : inCart 
                    ? 'bg-green-500 text-white shadow-green-500/20' 
                    : 'bg-black dark:bg-white text-white dark:text-black hover:scale-[1.02] hover:shadow-black/20 dark:hover:shadow-white/20'
                  }`}
               >
                  {isOwned ? <><Check className="w-6 h-6" /> Already Owned</> : inCart ? 'Added to Cart' : <><ShoppingCart className="w-6 h-6" /> Add to Cart</>}
               </button>

               <div className="flex gap-4 mt-4">
                 <button
                    onClick={() => toggleWishlist(template)}
                    className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:bg-gray-900 transition-all"
                    title="Add to Wishlist"
                 >
                    <Heart className={`w-6 h-6 ${isInWishlist(template.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                    <span className="font-bold text-black dark:text-white">{isInWishlist(template.id) ? 'Wishlisted' : 'Add to Wishlist'}</span>
                 </button>
                 <button
                    onClick={() => setIsPreviewOpen(true)}
                    className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:bg-gray-900 transition-all"
                    title="Live Preview"
                 >
                    <Eye className="w-6 h-6 text-gray-400" />
                    <span className="font-bold text-black dark:text-white">Live Preview</span>
                 </button>
               </div>
            </div>
          </div>
        </div>
        </div>
      </div>

      <ReviewsSection templateId={template.id} />
      
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-16 border-t border-gray-100 dark:border-white/10">
        <h2 className="text-3xl font-black mb-8 text-black dark:text-white">You Might Also Like</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {similarTemplates.map(t => (
            <InteractiveProductCard key={t.id} template={t} />
          ))}
        </div>
      </div>

      <FAQSection />

      <LivePreviewModal isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)} template={template} />
    </div>
  );
}
