import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Heart, Search, Menu, X, User } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export default function Navbar() {
  const { cartCount, dispatch } = useCart();
  const { wishlist } = useWishlist();
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

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navClass = (isHome && !isScrolled && !mobileMenuOpen)
    ? 'bg-transparent text-white border-transparent'
    : 'bg-background/95 backdrop-blur-md text-foreground border-b border-border shadow-sm';

  return (
    <header className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${navClass}`}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <button 
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} strokeWidth={1} /> : <Menu size={24} strokeWidth={1} />}
          </button>

          <Link to="/" className="text-3xl font-serif tracking-tighter z-50">
            KINETIC<span className="text-accent">.</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/category/fashion" className="text-sm font-medium hover:text-accent transition-colors">Fashion</Link>
            <Link to="/category/accessories" className="text-sm font-medium hover:text-accent transition-colors">Accessories</Link>
            <Link to="/category/home" className="text-sm font-medium hover:text-accent transition-colors">Home Goods</Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4 lg:space-x-6 z-50">
            <button className="text-foreground hover:text-accent transition-colors hidden sm:block">
              <Search size={20} />
            </button>
            <Link to="/account" className="text-foreground hover:text-accent transition-colors hidden sm:block">
              <User size={20} />
            </Link>
            <Link to="/wishlist" className="relative text-foreground hover:text-accent transition-colors">
              <Heart size={20} />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <button 
              className="relative text-foreground hover:text-accent transition-colors"
              onClick={() => dispatch({ type: 'TOGGLE_CART' })}
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-foreground text-background text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`lg:hidden fixed inset-0 bg-background z-40 pt-24 px-6 transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col space-y-6 text-xl font-serif">
          <Link to="/category/fashion" className="border-b border-border pb-4">Fashion</Link>
          <Link to="/category/accessories" className="border-b border-border pb-4">Accessories</Link>
          <Link to="/category/home" className="border-b border-border pb-4">Home Goods</Link>
          <Link to="/account" className="border-b border-border pb-4">Account</Link>
        </div>
      </div>
    </header>
  );
}
