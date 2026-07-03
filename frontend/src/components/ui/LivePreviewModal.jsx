import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Monitor, Smartphone, ExternalLink } from 'lucide-react';

export function LivePreviewModal({ isOpen, onClose, template }) {
  const [device, setDevice] = useState('desktop'); // 'desktop' | 'mobile'
  const [urlExists, setUrlExists] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      
      // Check if preview URL actually exists on the server
      const checkUrl = async () => {
        if (!template?.previewUrl) {
           setUrlExists(false);
           return;
        }
        setIsChecking(true);
        try {
          // Use GET instead of HEAD because Vite Dev Server often rejects HEAD requests for static files
          const res = await fetch(template.previewUrl, { method: 'GET' });
          setUrlExists(res.ok);
        } catch (e) {
          setUrlExists(false);
        } finally {
          setIsChecking(false);
        }
      };
      checkUrl();
      
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, template]);

  if (!isOpen || !template) return null;

  const previewUrl = template.previewUrl;

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

            {isChecking ? (
              <div className="w-full h-full flex items-center justify-center bg-gray-50">
                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
              </div>
            ) : urlExists && previewUrl ? (
              <iframe
                src={previewUrl}
                title={`Preview of ${template.title}`}
                className="w-full h-full border-0 bg-white"
                sandbox="allow-scripts allow-same-origin"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 text-center p-8">
                <Monitor className="w-16 h-16 text-gray-300 mb-4" />
                <h3 className="text-2xl font-bold text-gray-700 mb-2">No Preview Available</h3>
                <p className="text-gray-500 max-w-sm">
                  This template does not have a live preview link yet. 
                  Once you add the template files to <code>{previewUrl}</code>, the preview will appear here automatically.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
