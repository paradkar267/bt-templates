import React, { createContext, useContext, useState } from 'react';
import { toast } from 'sonner';
import { X, Mail, Lock, Eye, EyeOff } from 'lucide-react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [pendingProduct, setPendingProduct] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [hasPlayedIntro, setHasPlayedIntro] = useState(window.location.pathname !== '/');

  const addToCart = (product) => {
    if (!isLoggedIn) {
      setPendingProduct(product);
      setShowLoginModal(true);
      return;
    }

    setCartItems(prev => {
      if (prev.find(item => item.id === product.id)) {
        toast.error(`${product.title} is already in your cart!`);
        return prev;
      }
      toast.success(`${product.title} added to cart!`);
      return [...prev, product];
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setShowLoginModal(false);
    toast.success("Successfully logged in!");
    if (pendingProduct) {
      addToCart(pendingProduct);
      setPendingProduct(null);
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
    toast.success("Item removed from cart");
  };

  const cartTotal = cartItems.reduce((sum, item) => sum + parseFloat(item.price), 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, cartTotal, isLoggedIn, setShowLoginModal, logout, hasPlayedIntro, setHasPlayedIntro }}>
      {children}
      
      {/* Login Modal Overlay */}
      {showLoginModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowLoginModal(false)}></div>
          
          <div className="relative w-full max-w-md bg-white dark:bg-black rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <button 
              onClick={() => setShowLoginModal(false)}
              className="absolute top-6 right-6 p-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 text-gray-500 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="p-10">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-black text-white rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl font-black tracking-widest uppercase">
                  BZ
                </div>
                <h2 className="text-3xl font-black tracking-tight mb-2">Welcome Back</h2>
                <p className="text-gray-500 font-medium">Please sign in to add items to your cart.</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                      type="email" 
                      required
                      placeholder="hello@example.com" 
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl outline-none focus:bg-white dark:bg-black focus:border-black focus:ring-2 focus:ring-black/5 transition-all font-medium"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-bold text-gray-700">Password</label>
                    <a href="#" className="text-sm font-bold text-gray-500 hover:text-black dark:text-white">Forgot?</a>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="••••••••" 
                      className="w-full pl-12 pr-12 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl outline-none focus:bg-white dark:bg-black focus:border-black focus:ring-2 focus:ring-black/5 transition-all font-medium"
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black dark:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <button type="submit" className="w-full py-4 mt-4 bg-black text-white font-black rounded-xl hover:bg-gray-800 hover:scale-[1.02] transition-all shadow-xl text-lg">
                  Sign In
                </button>
              </form>
              
              <p className="text-center text-sm font-medium text-gray-500 mt-8">
                Don't have an account? <a href="#" className="text-black dark:text-white font-bold hover:underline">Sign up</a>
              </p>
            </div>
          </div>
        </div>
      )}
    </CartContext.Provider>
  );
};
