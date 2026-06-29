import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useAuth } from './AuthContext';
import { supabase } from './lib/supabase';
import { marketplaceTemplates } from './data';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const { user, requireAuth } = useAuth();

  // Load wishlist from User Metadata
  useEffect(() => {
    if (user) {
      const savedIds = user.user_metadata?.wishlist_templates || [];
      const fetchedTemplates = marketplaceTemplates.filter(t => savedIds.includes(t.id));
      setWishlistItems(fetchedTemplates);
    } else {
      setWishlistItems([]);
    }
  }, [user]);

  const toggleWishlist = (product) => {
    requireAuth(async () => {
      const isCurrentlyInWishlist = wishlistItems.some(item => item.id === product.id);
      
      let newWishlist;
      if (isCurrentlyInWishlist) {
        newWishlist = wishlistItems.filter(item => item.id !== product.id);
        toast.info(`${product.title} removed from wishlist.`);
      } else {
        newWishlist = [...wishlistItems, product];
        toast.success(`${product.title} added to wishlist!`);
      }
      
      setWishlistItems(newWishlist);
      
      const newIds = newWishlist.map(item => item.id);
      
      const { error } = await supabase.auth.updateUser({
        data: { wishlist_templates: newIds }
      });
      
      if (error) {
        console.error("Wishlist error:", error);
        toast.error("Failed to update wishlist. Please try again.");
      }
    });
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.id === productId);
  };

  return (
    <WishlistContext.Provider value={{ wishlistItems, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};
