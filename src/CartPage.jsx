import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Trash2, Lock, ShieldCheck, User, ShoppingCart } from 'lucide-react';
import { useCart } from './CartContext';
import UserMenu from './UserMenu';
import { useTheme } from './ThemeContext';

export default function CartPage() {
  const { cartItems, removeFromCart, cartTotal, isLoggedIn, setShowLoginModal } = useCart();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={`min-h-screen font-sans pb-24 transition-colors duration-1000 ${isDark ? 'bg-transparent text-white' : 'bg-gray-50 dark:bg-gray-900 text-black dark:text-white'}`}>
      {/* Mini Nav */}
      <nav className={`h-[80px] w-full px-8 md:px-16 flex items-center justify-between border-b sticky top-0 z-50 ${isDark ? 'bg-transparent border-white/10' : 'bg-white dark:bg-black border-gray-200 dark:border-gray-800'}`}>
        <Link to="/" className="text-2xl font-black tracking-[0.25em] uppercase">Bizleap</Link>
        <div className="flex items-center gap-6">
          <UserMenu />
        </div>
      </nav>

      <div className="max-w-[1200px] mx-auto px-8 md:px-16 mt-12">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-500 font-bold hover:text-black dark:text-white mb-8 transition-colors">
          <ArrowLeft className="w-5 h-5" /> Continue Shopping
        </Link>

        <h1 className="text-4xl font-black tracking-tight mb-12">Your Cart</h1>

        {cartItems.length === 0 ? (
          <div className="bg-white/50 dark:bg-black/50 backdrop-blur-xl p-16 md:p-32 rounded-[3rem] border border-black/[0.04] shadow-[0_20px_40px_rgba(0,0,0,0.02)] text-center relative overflow-hidden">
             <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.02)_0%,transparent_70%)] pointer-events-none"></div>
             
             <div className="relative z-10 flex flex-col items-center">
               <div className="w-32 h-32 bg-gradient-to-b from-gray-50 to-white rounded-[2rem] shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-black/[0.03] flex items-center justify-center mx-auto mb-8 relative">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_#fff_0%,_transparent_60%)] rounded-[2rem]"></div>
                  <ShoppingCart className="w-12 h-12 text-gray-300 relative z-10" />
               </div>
               
               <h2 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-gray-100 mb-6">Your cart is feeling light</h2>
               <p className="text-xl text-gray-500 mb-12 max-w-lg mx-auto font-medium leading-relaxed">
                 Discover industry-leading templates and UI kits curated perfectly for modern digital businesses.
               </p>
               
               <Link to="/" className="group relative inline-flex items-center justify-center px-10 py-5 bg-black text-white font-bold rounded-2xl hover:bg-gray-900 hover:scale-[1.02] transition-all duration-300 shadow-[0_10px_20px_rgba(0,0,0,0.1)]">
                  Explore the Market
                  <ArrowLeft className="w-5 h-5 ml-3 rotate-180 group-hover:translate-x-1 transition-transform" />
               </Link>
             </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left: Cart Items */}
            <div className="lg:col-span-2 space-y-6">
               {cartItems.map(item => (
                  <div key={item.id} className="bg-white dark:bg-black p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col sm:flex-row gap-6 items-center sm:items-start relative group">
                     <div className="w-full sm:w-48 aspect-[16/10] rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                     </div>
                     <div className="flex-1 w-full">
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">{item.category}</p>
                        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                        <p className="text-sm text-gray-500 mb-4">by {item.author}</p>
                        <div className="text-2xl font-black">${item.price}</div>
                     </div>
                     <button 
                        onClick={() => removeFromCart(item.id)}
                        className="absolute top-6 right-6 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                     >
                        <Trash2 className="w-5 h-5" />
                     </button>
                  </div>
               ))}
            </div>

            {/* Right: Order Summary */}
            <div className="lg:col-span-1">
               <div className="bg-white dark:bg-black p-8 rounded-[2rem] border border-gray-200 dark:border-gray-800 shadow-[0_20px_40px_rgba(0,0,0,0.06)] sticky top-[120px]">
                  <h3 className="text-2xl font-black mb-6">Order Summary</h3>
                  
                  <div className="flex justify-between items-center mb-4 text-gray-600 font-medium">
                     <span>Subtotal ({cartItems.length} items)</span>
                     <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center mb-6 text-gray-600 font-medium">
                     <span>Taxes</span>
                     <span>$0.00</span>
                  </div>
                  
                  <div className="flex justify-between items-center border-t border-gray-100 pt-6 mb-8">
                     <span className="text-lg font-bold">Total</span>
                     <span className="text-3xl font-black">${cartTotal.toFixed(2)}</span>
                  </div>

                  <button className="w-full py-5 bg-black text-white rounded-xl font-black text-lg hover:bg-gray-800 transition-all shadow-xl flex items-center justify-center gap-2 mb-4">
                     <Lock className="w-5 h-5" /> Secure Checkout
                  </button>

                  <div className="flex items-center justify-center gap-2 text-sm text-gray-500 font-medium">
                     <ShieldCheck className="w-4 h-4" /> 30-Day Money-Back Guarantee
                  </div>
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
