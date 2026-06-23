import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, LayoutTemplate, X, Code, MonitorSmartphone } from 'lucide-react';
import { marketplaceTemplates } from '../../data';
import { motion, AnimatePresence } from 'framer-motion';

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const filteredTemplates = query
    ? marketplaceTemplates.filter((item) => {
        const lowerQuery = query.toLowerCase();
        return (
          item.title.toLowerCase().includes(lowerQuery) ||
          item.category.toLowerCase().includes(lowerQuery) ||
          item.tag.toLowerCase().includes(lowerQuery) ||
          (item.keywords && item.keywords.some((k) => k.toLowerCase().includes(lowerQuery)))
        );
      })
    : marketplaceTemplates.slice(0, 6); // Show top 6 as suggestions

  if (!isOpen) return null;

  const handleSelect = (id) => {
    setIsOpen(false);
    setQuery('');
    navigate(`/product/${id}`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-[10vh] px-4 sm:px-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
          />

          {/* Palette Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="w-full max-w-2xl relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-white/10"
          >
            <div className="flex items-center px-4 py-4 border-b border-gray-100 dark:border-white/5">
              <Search className="w-5 h-5 text-gray-400 mr-3 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search templates, UI kits, UI components..."
                className="flex-1 bg-transparent border-none outline-none text-lg text-gray-900 dark:text-white placeholder:text-gray-400 font-medium"
              />
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-white/10">
              {query === '' && (
                <div className="px-3 py-2 text-xs font-bold uppercase tracking-widest text-gray-400 mt-2">
                  Suggestions
                </div>
              )}
              
              {filteredTemplates.length > 0 ? (
                <div className="flex flex-col space-y-1 mt-1 pb-2">
                  {filteredTemplates.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleSelect(item.id)}
                      className="w-full text-left px-3 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors flex items-center gap-4 group"
                    >
                      <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-gray-100 dark:bg-gray-800">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-gray-900 dark:text-white font-bold truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-sm text-gray-500 font-medium mt-0.5 flex items-center gap-2">
                          <span className="flex items-center gap-1">
                            {item.category === 'React' || item.category === 'Next.js' ? (
                              <Code className="w-3.5 h-3.5" />
                            ) : item.category === 'Figma' ? (
                              <LayoutTemplate className="w-3.5 h-3.5" />
                            ) : (
                              <MonitorSmartphone className="w-3.5 h-3.5" />
                            )}
                            {item.category}
                          </span>
                          <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-700"></span>
                          <span>{item.tag}</span>
                        </p>
                      </div>
                      <div className="hidden sm:block text-gray-400 dark:text-gray-500 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                        View Details
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center text-gray-500 dark:text-gray-400">
                  <Search className="w-12 h-12 mx-auto mb-4 opacity-20" />
                  <p className="text-lg font-medium text-gray-900 dark:text-white mb-1">No results found.</p>
                  <p className="text-sm">We couldn't find anything matching "{query}".</p>
                </div>
              )}
            </div>
            
            <div className="bg-gray-50 dark:bg-white/[0.02] border-t border-gray-100 dark:border-white/5 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-4 text-xs font-medium text-gray-500">
                <span className="flex items-center gap-1.5">
                  <kbd className="px-2 py-1 rounded bg-white dark:bg-black border border-gray-200 dark:border-white/10 shadow-sm font-sans font-bold text-[10px]">↑</kbd>
                  <kbd className="px-2 py-1 rounded bg-white dark:bg-black border border-gray-200 dark:border-white/10 shadow-sm font-sans font-bold text-[10px]">↓</kbd>
                  to navigate
                </span>
                <span className="flex items-center gap-1.5">
                  <kbd className="px-2 py-1 rounded bg-white dark:bg-black border border-gray-200 dark:border-white/10 shadow-sm font-sans font-bold text-[10px]">enter</kbd>
                  to select
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
                <kbd className="px-2 py-1 rounded bg-white dark:bg-black border border-gray-200 dark:border-white/10 shadow-sm font-sans font-bold text-[10px]">esc</kbd>
                to close
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
