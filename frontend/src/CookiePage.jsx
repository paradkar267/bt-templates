import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Logo } from './components/ui/Logo';
import UserMenu from './UserMenu';
import { useTheme } from './ThemeContext';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CookiePage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={`min-h-screen font-sans transition-colors duration-500 ${isDark ? 'bg-black text-white' : 'bg-gray-50 text-black'}`}>
      <nav className="flex items-center justify-between p-6 md:px-16 border-b border-gray-200 dark:border-white/10 bg-white/50 dark:bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <Logo />
        <UserMenu />
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-500 font-bold hover:text-black dark:text-white transition-colors mb-8">
          <ArrowLeft className="w-5 h-5" /> Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-8 md:p-12 rounded-[2rem]"
        >
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-8">Cookie Settings</h1>
          
          <div className="space-y-8 text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
            <section>
              <h2 className="text-2xl font-bold text-black dark:text-white mb-4">What Are Cookies?</h2>
              <p>
                Cookies are small text files that are stored on your computer or mobile device when you visit a website. They allow the website to recognize your device and remember if you have been to the website before.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-black dark:text-white mb-4">How We Use Cookies</h2>
              <p>
                We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By continuing to use our site, you consent to our use of cookies.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li><strong>Essential Cookies:</strong> Required for the website to function properly.</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with the website.</li>
                <li><strong>Marketing Cookies:</strong> Used to track visitors across websites for advertising.</li>
              </ul>
            </section>
            <section className="pt-8 border-t border-gray-200 dark:border-white/10">
              <p className="text-sm">
                You can manage your cookie preferences through your browser settings at any time. For any questions, please contact us at bizleap1@gmail.com.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
