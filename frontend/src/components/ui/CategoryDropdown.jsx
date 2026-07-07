import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutGrid, ChevronDown } from 'lucide-react';
import { useTemplates } from '../../useTemplates';
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function CategoryDropdown({ isActive, isOpen, setIsOpen }) {
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { templates } = useTemplates();

  // Extract unique business tags from templates
  const predefinedTags = [
    "Business", "Corporate", "Startup", "Agency", "SaaS", "E-commerce", 
    "Fashion & Clothing", "Jewelry", "Electronics", "Furniture", 
    "Beauty & Cosmetics", "Grocery", "Marketplace", "Portfolio"
  ];
  const tags = Array.from(new Set([...predefinedTags, ...templates.map(t => t.tag).filter(Boolean)])).sort();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (tag) => {
    setIsOpen(false);
    const targetPath = location.pathname.startsWith('/ui-kits') ? '/ui-kits' : '/templates';
    navigate(`${targetPath}?tag=${encodeURIComponent(tag)}`);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors flex items-center gap-2 uppercase",
          "text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white",
          isActive && "bg-gray-100/50 dark:bg-white/10 text-black dark:text-white",
        )}
      >
        <LayoutGrid className="hidden md:inline-block w-4 h-4" />
        <span className="hidden md:inline">CATEGORIES</span>
        <ChevronDown className={`hidden md:inline-block w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        
        {/* Mobile icon view */}
        <span className="md:hidden flex items-center gap-1">
           <LayoutGrid size={18} strokeWidth={2.5} />
        </span>
        
        {isActive && (
          <motion.div
            layoutId="lamp"
            className="absolute inset-0 w-full bg-gray-100/50 dark:bg-white/5 rounded-full -z-10"
            initial={false}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          >
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-black dark:bg-white rounded-t-full">
              <div className="absolute w-12 h-6 bg-black/10 dark:bg-white/10 rounded-full blur-md -top-2 -left-2" />
              <div className="absolute w-8 h-6 bg-black/10 dark:bg-white/10 rounded-full blur-md -top-1" />
              <div className="absolute w-4 h-4 bg-black/10 dark:bg-white/10 rounded-full blur-sm top-0 left-2" />
            </div>
          </motion.div>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-black/90 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-2xl shadow-xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
          <div 
            className="py-2 max-h-64 overflow-y-auto overscroll-none"
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
          >
            {tags.length > 0 ? (
              tags.map(tag => (
                <button
                  key={tag}
                  onClick={() => handleSelect(tag)}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                >
                  {tag}
                </button>
              ))
            ) : (
              <div className="px-4 py-2 text-sm text-gray-500">Loading...</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
