import React, { useState, useEffect, useRef } from 'react';
import { User, LogOut } from 'lucide-react';
import { useCart } from './CartContext';
import { toast } from 'sonner';

export default function UserMenu() {
  const { isLoggedIn, setShowLoginModal, logout } = useCart();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!isLoggedIn) {
    return (
      <button onClick={() => setShowLoginModal(true)} className="flex items-center justify-center bg-white dark:bg-black rounded-full h-10 w-10 border border-gray-200 dark:border-gray-800 shadow-sm hover:bg-gray-50 dark:bg-gray-900 transition-colors cursor-pointer">
        <User className="w-5 h-5 text-black dark:text-white" />
      </button>
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      <button onClick={() => setOpen(!open)} className="relative flex items-center justify-center bg-white dark:bg-black rounded-full h-10 w-10 border border-gray-200 dark:border-gray-800 shadow-sm hover:bg-gray-50 dark:bg-gray-900 transition-colors cursor-pointer">
        <User className="w-5 h-5 text-black dark:text-white" />
        <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
      </button>

      {open && (
        <div className="absolute top-full mt-2 right-0 w-48 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.12)] py-2 z-[999] animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="px-5 py-3 border-b border-gray-100 mb-2 bg-gray-50/50">
            <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Account</p>
            <p className="text-sm font-bold text-black dark:text-white truncate">user@bizleap.com</p>
          </div>
          <button 
            onClick={() => { logout(); setOpen(false); toast.success("Logged out successfully"); }} 
            className="w-full text-left px-5 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 transition-colors flex items-center gap-3"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
