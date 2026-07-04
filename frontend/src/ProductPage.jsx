import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, ShoppingCart, Check, ShieldCheck, Zap, Search, Heart, Eye } from 'lucide-react';
import { useTemplates } from './useTemplates';
import { useCart } from './CartContext';
import { useWishlist } from './WishlistContext';
import { useCurrency } from './CurrencyContext';
import { ReviewsSection } from './ReviewsSection';
import UserMenu from './UserMenu';
import { useTheme } from './ThemeContext';
import { useAuth } from './AuthContext';
import { ProductSkeleton } from './components/ui/Skeleton';
import { FAQSection } from './components/ui/FAQSection';
import { InteractiveProductCard } from './components/ui/card-7';
import { Logo } from './components/ui/Logo';
import { motion } from 'framer-motion';
import SEO from './components/SEO';

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, cartItems, purchasedTemplates } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { templates, loading } = useTemplates();
  const { requireAuth } = useAuth();
  const { formatPrice } = useCurrency();

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
      <SEO 
        title={template.title}
        description={template.description}
        keywords={template.keywords?.join(', ')}
        image={template.image}
        url={`/product/${template.id}`}
      />
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
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Main Image Container */}
            <div className="w-full relative aspect-[16/10] sm:aspect-video lg:h-[500px] rounded-[2.5rem] overflow-hidden group">
              {/* Subtle background glow when loading or if transparent */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 dark:from-indigo-500/20 dark:via-purple-500/20 dark:to-pink-500/20 animate-gradient-xy"></div>
              
              <img 
                src={template.image} 
                alt={template.title} 
                className="w-full h-full object-cover relative z-10 transition-transform duration-700 group-hover:scale-105" 
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              {/* Fallback state if image fails */}
              <div className="absolute inset-0 hidden items-center justify-center bg-gray-100 dark:bg-gray-800/50 backdrop-blur-sm z-20">
                 <span className="text-gray-400 font-medium">Image Preview Unavailable</span>
              </div>
              
              {/* Overlay shadow for depth */}
              <div className="absolute inset-0 ring-1 ring-inset ring-black/10 dark:ring-white/10 rounded-[2.5rem] z-30 pointer-events-none"></div>
            </div>

            {/* Product Overview Card */}
            <div className="bg-white/80 dark:bg-[#0F0F11]/80 backdrop-blur-xl p-8 sm:p-12 rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-sm">
              <h2 className="text-3xl font-black tracking-tight mb-6 text-gray-900 dark:text-white">Overview</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-10">
                {template.description}
              </p>
              
              <div className="grid sm:grid-cols-2 gap-6">
                 <div className="p-6 rounded-2xl bg-gray-50/50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Highlights</h3>
                    <ul className="space-y-4 text-gray-600 dark:text-gray-400 font-medium text-sm">
                      <li className="flex items-start gap-3"><Check className="w-5 h-5 text-indigo-500 shrink-0" /> Fully responsive design layout</li>
                      <li className="flex items-start gap-3"><Check className="w-5 h-5 text-indigo-500 shrink-0" /> Modular component architecture</li>
                    </ul>
                 </div>
                 <div className="p-6 rounded-2xl bg-gray-50/50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Support</h3>
                    <ul className="space-y-4 text-gray-600 dark:text-gray-400 font-medium text-sm">
                      <li className="flex items-start gap-3"><Check className="w-5 h-5 text-indigo-500 shrink-0" /> Easy to customize variables</li>
                      <li className="flex items-start gap-3"><Check className="w-5 h-5 text-indigo-500 shrink-0" /> Premium email support</li>
                    </ul>
                 </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Checkout Box */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="bg-white/90 dark:bg-[#0F0F11]/90 backdrop-blur-2xl p-8 rounded-[2.5rem] shadow-[0_0_50px_-12px_rgba(0,0,0,0.1)] dark:shadow-none border border-gray-100 dark:border-white/10 ring-1 ring-black/5 dark:ring-white/5 sticky top-[120px]">
               <div className="mb-6">
                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 mb-4">
                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">{template.category}</span>
                    <span className="w-1 h-1 rounded-full bg-indigo-300 dark:bg-indigo-500/50"></span>
                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">{template.tag}</span>
                 </div>
                 <h1 className="text-4xl font-black tracking-tight leading-tight mb-3 text-gray-900 dark:text-white">
                   {template.title}
                 </h1>
                 <p className="text-gray-500 font-medium">by <span className="text-indigo-600 dark:text-indigo-400 font-bold cursor-pointer hover:underline">{template.author}</span></p>
               </div>
               
               {template.is_sold_out && (
                 <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 flex items-start gap-3">
                   <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-800 flex items-center justify-center shrink-0">
                     <ShieldCheck className="w-4 h-4 text-red-600 dark:text-red-400" />
                   </div>
                   <div>
                     <h3 className="text-red-800 dark:text-red-300 font-bold text-sm">This template is Sold Out</h3>
                     <p className="text-red-600 dark:text-red-400 text-xs mt-1">This is an exclusive 1-of-1 template that has already been purchased by another user and is no longer available.</p>
                   </div>
                 </div>
               )}

               <div className="flex items-center gap-4 mb-8">
                  <div className="flex text-amber-400">
                     {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < Math.floor(template.rating) ? 'fill-current' : 'text-gray-200 dark:text-gray-700'}`} />
                     ))}
                  </div>
                  <span className="text-sm font-bold text-gray-500 dark:text-gray-400">
                    {template.is_sold_out ? '1/1 Edition' : `${template.sales.toLocaleString()} Sales`}
                  </span>
               </div>

               <div className={`text-5xl font-black mb-8 border-y border-gray-100 dark:border-white/10 py-8 ${template.is_sold_out ? 'text-red-500' : 'text-transparent bg-clip-text bg-gradient-to-br from-gray-900 to-gray-600 dark:from-white dark:to-gray-400'}`}>
                 {template.is_sold_out ? 'Sold Out' : formatPrice(template.price)}
               </div>

               <div className="space-y-4 mb-8 text-sm font-medium text-gray-600 dark:text-gray-400 bg-gray-50/50 dark:bg-white/[0.02] p-5 rounded-2xl border border-gray-100 dark:border-white/5">
                  <div className="flex items-center gap-3"><ShieldCheck className="w-5 h-5 text-emerald-500" /> Quality checked by Bizleap</div>
                  <div className="flex items-center gap-3"><Zap className="w-5 h-5 text-amber-500" /> Instant download access</div>
               </div>

               <button 
                  onClick={() => {
                    if (isOwned || template.is_sold_out) return;
                    requireAuth(() => addToCart(template));
                  }}
                  disabled={isOwned || template.is_sold_out}
                  className={`w-full py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300 relative overflow-hidden group ${
                    template.is_sold_out
                    ? 'bg-red-50 dark:bg-red-900/20 text-red-400 cursor-not-allowed border border-red-200 dark:border-red-800'
                    : isOwned
                    ? 'bg-gray-100 dark:bg-white/5 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                    : inCart 
                    ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 shadow-[0_0_20px_-5px_rgba(16,185,129,0.3)]' 
                    : 'bg-black dark:bg-white text-white dark:text-black hover:scale-[1.02] hover:shadow-[0_15px_30px_-10px_rgba(0,0,0,0.3)] dark:hover:shadow-[0_15px_30px_-10px_rgba(255,255,255,0.3)]'
                  }`}
               >
                  {/* Subtle shine effect on primary button */}
                  {!isOwned && !inCart && !template.is_sold_out && (
                    <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 dark:via-black/10 to-transparent"></div>
                  )}
                  {template.is_sold_out ? 'Sold Out' : isOwned ? <><Check className="w-6 h-6" /> Already Owned</> : inCart ? 'Added to Cart' : <><ShoppingCart className="w-6 h-6" /> Add to Cart</>}
               </button>

               <div className="flex flex-col sm:flex-row gap-3 mt-4">
                 <button
                    onClick={() => toggleWishlist(template)}
                    className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl border transition-all duration-300 font-bold ${
                      isInWishlist(template.id)
                        ? 'border-red-200 dark:border-red-500/20 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400'
                        : 'border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5'
                    }`}
                    title="Add to Wishlist"
                 >
                    <Heart className={`w-5 h-5 ${isInWishlist(template.id) ? 'fill-current' : ''}`} />
                    <span className="text-sm">{isInWishlist(template.id) ? 'Wishlisted' : 'Wishlist'}</span>
                 </button>
                 <Link
                    to={`/preview/${template.id}`}
                    target="_blank"
                    className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-all duration-300 font-bold"
                    title="Live Preview"
                 >
                    <Eye className="w-5 h-5" />
                    <span className="text-sm">Preview</span>
                 </Link>
               </div>
            </div>
          </motion.div>
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
    </div>
  );
}
