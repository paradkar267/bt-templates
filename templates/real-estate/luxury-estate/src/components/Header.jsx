import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Properties', path: '/listings' },
    { name: 'Agents', path: '/agent/a1' }, // Hardcoded to first agent for demo
    { name: 'About', path: '#' },
    { name: 'Contact', path: '#' },
  ];

  const headerClass = `fixed w-full z-50 transition-all duration-700 ${
    isScrolled || !isHome
      ? 'bg-white/95 backdrop-blur-md border-b border-border/40 py-4 text-primary'
      : 'bg-transparent py-8 text-white'
  }`;

  return (
    <header className={headerClass}>
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-3xl font-serif font-light tracking-widest uppercase">
          Vanguard <span className="font-sans text-[10px] font-light tracking-[0.3em] text-accent uppercase block mt-1">International Realty</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-12 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`relative group text-[11px] uppercase tracking-[0.2em] font-medium transition-colors duration-500 ${
                (isScrolled || !isHome) ? 'text-primary hover:text-accent' : 'text-white hover:text-white/70'
              }`}
            >
              {link.name}
              <span className={`absolute -bottom-2 left-0 w-full h-[1px] transform origin-left scale-x-0 transition-transform duration-500 ease-luxury group-hover:scale-x-100 ${
                (isScrolled || !isHome) ? 'bg-accent' : 'bg-white'
              }`} />
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center space-x-6">
          <button className="hover:text-accent hover:scale-105 transition-all duration-300">
            <Search size={20} />
          </button>
          <button className="hover:text-accent hover:scale-105 transition-all duration-300">
            <User size={20} />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-background shadow-lg md:hidden"
          >
            <div className="flex flex-col px-6 py-4 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-primary text-sm uppercase tracking-widest py-2 border-b border-border hover:text-accent"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
