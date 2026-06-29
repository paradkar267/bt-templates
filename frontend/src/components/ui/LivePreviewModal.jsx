import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Monitor, Smartphone, ExternalLink } from 'lucide-react';

export function LivePreviewModal({ isOpen, onClose, template }) {
  const [device, setDevice] = useState('desktop'); // 'desktop' | 'mobile'

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !template) return null;

  // We use example.com as a fallback if the template doesn't have a real preview URL
  const previewUrl = template.previewUrl || "https://example.com";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex flex-col"
      >
        {/* Top Bar */}
        <div className="h-16 shrink-0 bg-white/5 border-b border-white/10 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <h2 className="text-white font-bold tracking-wide truncate max-w-[200px] sm:max-w-md">
              {template.title}
            </h2>
            <span className="hidden sm:inline-block px-3 py-1 bg-white/10 text-white text-xs rounded-full uppercase tracking-wider">
              {template.category}
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Device Toggles */}
            <div className="flex items-center bg-black/50 rounded-lg p-1 border border-white/10 hidden sm:flex">
              <button
                onClick={() => setDevice('desktop')}
                className={`p-2 rounded-md transition-colors ${
                  device === 'desktop' ? 'bg-white/20 text-white' : 'text-gray-400 hover:text-white'
                }`}
                title="Desktop View"
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDevice('mobile')}
                className={`p-2 rounded-md transition-colors ${
                  device === 'mobile' ? 'bg-white/20 text-white' : 'text-gray-400 hover:text-white'
                }`}
                title="Mobile View"
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>

            <div className="w-px h-6 bg-white/20 mx-2 hidden sm:block"></div>

            <a 
              href={previewUrl} 
              target="_blank" 
              rel="noreferrer"
              className="text-gray-400 hover:text-white flex items-center gap-2 text-sm transition-colors"
              title="Open in new tab"
            >
              <span className="hidden sm:inline">Open App</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <button
              onClick={onClose}
              className="p-2 bg-white/10 hover:bg-red-500 hover:text-white text-gray-400 rounded-lg transition-colors ml-2"
              title="Close Preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Iframe Container */}
        <div className="flex-1 flex items-center justify-center bg-black/50 p-4 sm:p-8 overflow-hidden">
          <motion.div
            layout
            initial={false}
            animate={{
              width: device === 'mobile' ? 375 : '100%',
              height: device === 'mobile' ? 812 : '100%',
              borderRadius: device === 'mobile' ? 40 : 12,
            }}
            transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
            className={`relative bg-white overflow-hidden transition-all shadow-2xl ${
              device === 'mobile' ? 'border-[12px] border-black/90 ring-1 ring-white/20 max-h-[90vh]' : 'border border-white/10'
            }`}
          >
            {/* Fake iPhone notch for mobile view */}
            {device === 'mobile' && (
              <div className="absolute top-0 inset-x-0 h-6 bg-black/90 flex justify-center z-10 rounded-b-2xl w-32 mx-auto" />
            )}

            {/* Warning overlay for example.com to avoid confusion */}
            <div className="absolute inset-x-0 top-0 bg-yellow-100 text-yellow-800 text-xs font-bold text-center py-1 z-10 pointer-events-none opacity-80 border-b border-yellow-200">
              Note: This is a placeholder preview ({previewUrl})
            </div>

            <iframe
              src={previewUrl}
              title={`Preview of ${template.title}`}
              className="w-full h-full border-0 bg-white"
              sandbox="allow-scripts allow-same-origin"
            />
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
