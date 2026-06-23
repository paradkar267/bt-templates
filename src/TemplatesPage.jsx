import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Search, ArrowLeft } from 'lucide-react';
import { useCart } from './CartContext';
import { marketplaceTemplates } from './data';
import { DenseCard } from './Home';
import UserMenu from './UserMenu';
import { motion } from "motion/react";
import { useTheme } from './ThemeContext';

export default function TemplatesPage() {
  const { cartItems } = useCart();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const filters = ["All", "Figma", "Next.js", "React", "Webflow", "Tailwind", "HTML", "Shopify", "React Native", "Framer"];
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredTemplates = marketplaceTemplates.filter(t => {
    const matchesCategory = activeFilter === "All" || t.category === activeFilter;
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = t.title.toLowerCase().includes(searchLower) || 
                          t.author.toLowerCase().includes(searchLower) ||
                          t.description.toLowerCase().includes(searchLower) ||
                          t.category.toLowerCase().includes(searchLower) ||
                          t.tag.toLowerCase().includes(searchLower) ||
                          (t.keywords && t.keywords.some(k => k.toLowerCase().includes(searchLower)));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className={`min-h-screen flex flex-col font-sans pb-32 transition-colors duration-1000 ${isDark ? 'bg-transparent text-white' : 'bg-gray-50 dark:bg-gray-900 text-black dark:text-white'}`}>
      
      {/* Navigation */}
      <nav className={`h-[80px] w-full px-8 md:px-16 flex items-center justify-between border-b sticky top-0 z-50 shadow-sm transition-colors duration-1000 ${isDark ? 'bg-black/20 border-white/10 text-white backdrop-blur-md' : 'bg-white dark:bg-black border-gray-200 dark:border-gray-800 text-black dark:text-white'}`}>
        <Link to="/" className="text-2xl font-black tracking-[0.25em] uppercase hover:opacity-80 transition-opacity">Bizleap</Link>
        <div className="flex items-center gap-6">
          <UserMenu />
          <Link to="/cart" className="relative p-2 hover:bg-gray-100 dark:bg-gray-800 rounded-full transition-colors cursor-pointer">
            <ShoppingCart className="w-6 h-6" />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-black text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-md">
                {cartItems.length}
              </span>
            )}
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-[1600px] w-full mx-auto px-8 md:px-16 mt-12 flex flex-col">
        
        <Link to="/" className="inline-flex items-center gap-2 text-gray-500 font-bold hover:text-black dark:text-white mb-8 transition-colors self-start">
          <ArrowLeft className="w-5 h-5" /> Back to Home
        </Link>

        <div className="flex flex-col mb-12 gap-8">
           <div>
              <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-4">All Templates</h1>
              <p className="text-xl text-gray-500 font-medium">Browse our entire collection of premium digital assets.</p>
           </div>
           
           <div className="flex flex-col xl:flex-row gap-6 items-start xl:items-center w-full">
              {/* Search Bar */}
              <div className="relative w-full xl:w-[400px] flex-shrink-0">
                 <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                 <input 
                   type="text" 
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   placeholder="Search templates, UI kits..." 
                   className={`w-full pl-12 pr-6 py-3.5 border rounded-full outline-none transition-all text-sm font-bold shadow-sm ${isDark ? 'bg-white/5 dark:bg-black/5 border-white/10 text-white focus:border-white/30 focus:ring-4 focus:ring-white/5 placeholder:text-gray-500' : 'bg-white dark:bg-black border-gray-200 dark:border-gray-800 text-black dark:text-white focus:border-black focus:ring-4 focus:ring-black/5 placeholder:text-gray-400'}`}
                 />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap xl:flex-nowrap xl:overflow-x-auto gap-2 w-full" style={{ scrollbarWidth: 'none' }}>
                 {filters.map(filter => (
                    <button 
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      className={`relative px-5 py-3 rounded-full font-bold transition-all text-sm flex-shrink-0 border ${activeFilter === filter ? (isDark ? 'text-black dark:text-white border-white' : 'text-white border-black') : (isDark ? 'bg-white/5 dark:bg-black/5 text-gray-400 border-transparent hover:bg-white/10 dark:bg-black/10 hover:text-white' : 'bg-gray-50 dark:bg-gray-900 text-gray-600 border-transparent hover:bg-gray-100 dark:bg-gray-800 hover:text-black dark:text-white')}`}
                    >
                      {activeFilter === filter && (
                        <motion.div
                          layoutId="activeFilterTemplatesPage"
                          className={`absolute inset-0 rounded-full ${isDark ? 'bg-white dark:bg-black' : 'bg-black'}`}
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      <span className="relative z-10">{filter}</span>
                    </button>
                 ))}
              </div>
           </div>
        </div>

        {/* Template Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
           {filteredTemplates.map(template => (
              <DenseCard key={template.id} template={template} />
           ))}
           
           {filteredTemplates.length === 0 && (
              <div className={`col-span-full py-32 text-center border-2 border-dashed rounded-3xl ${isDark ? 'border-white/10 bg-white/5 dark:bg-black/5' : 'border-gray-300 bg-white dark:bg-black'}`}>
                 <h3 className={`text-2xl font-black mb-2 ${isDark ? 'text-gray-300' : 'text-gray-400'}`}>No templates found</h3>
                 <p className="text-gray-500 font-medium">Try selecting a different category.</p>
              </div>
           )}
        </div>
      </div>
    </div>
  );
}
