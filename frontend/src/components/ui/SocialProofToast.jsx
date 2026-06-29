import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X } from 'lucide-react';
import { useTheme } from '../../ThemeContext';
import { useAuth } from '../../AuthContext';

const PURCHASES = [
  { name: "Rahul from Mumbai", item: "Aura Landing Page", time: "2 mins ago" },
  { name: "Sarah from New York", item: "SaaS Dashboard Kit", time: "5 mins ago" },
  { name: "David from London", item: "E-commerce UI Pack", time: "12 mins ago" },
  { name: "Priya from Delhi", item: "Finance Mobile App Kit", time: "1 min ago" },
  { name: "Alex from Toronto", item: "Agency Website Template", time: "Just now" }
];

export function SocialProofToast() {
  const { isAdmin } = useAuth();
  const [currentPurchase, setCurrentPurchase] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    if (!isAdmin) return;
    
    // Start showing popups after an initial delay
    const initialTimer = setTimeout(() => {
      showRandomPurchase();
    }, 5000);

    return () => clearTimeout(initialTimer);
  }, [isAdmin]);

  const showRandomPurchase = () => {
    if (!isAdmin) return;
    const randomPurchase = PURCHASES[Math.floor(Math.random() * PURCHASES.length)];
    setCurrentPurchase(randomPurchase);
    setIsVisible(true);

    // Hide it after 5 seconds
    setTimeout(() => {
      setIsVisible(false);
      
      // Schedule the next one randomly between 15 to 30 seconds
      const nextDelay = Math.floor(Math.random() * (30000 - 15000 + 1) + 15000);
      setTimeout(() => {
        showRandomPurchase();
      }, nextDelay);
    }, 5000);
  };

  if (!isAdmin) return null;

  return (
    <AnimatePresence>
      {isVisible && currentPurchase && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: "spring", damping: 20, stiffness: 200 }}
          className={`fixed bottom-6 left-6 z-[9999] flex items-center gap-4 p-4 pr-10 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.12)] border cursor-pointer hover:scale-105 transition-transform backdrop-blur-xl ${
            isDark 
              ? 'bg-black/60 border-white/10 text-white shadow-[0_10px_40px_rgba(0,0,0,0.5)]' 
              : 'bg-white/80 border-gray-200 text-black'
          }`}
          onClick={() => setIsVisible(false)}
        >
          <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-inner ${
            isDark ? 'bg-white/10 text-white' : 'bg-black/5 text-black'
          }`}>
            <ShoppingBag className="w-5 h-5" />
          </div>
          
          <div>
            <p className="text-sm font-bold leading-tight mb-1">
              {currentPurchase.name}
            </p>
            <p className={`text-xs font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              purchased <span className={`font-bold ${isDark ? 'text-white' : 'text-black'}`}>{currentPurchase.item}</span>
            </p>
            <p className={`text-[10px] uppercase tracking-wider font-bold ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              {currentPurchase.time}
            </p>
          </div>

          <button 
            onClick={(e) => { e.stopPropagation(); setIsVisible(false); }}
            className={`absolute top-3 right-3 p-1 rounded-full transition-colors ${
              isDark ? 'hover:bg-white/10 text-gray-400 hover:text-white' : 'hover:bg-black/5 text-gray-400 hover:text-black'
            }`}
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
