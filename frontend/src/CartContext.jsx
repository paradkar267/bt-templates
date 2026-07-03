import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useAuth } from './AuthContext';
import { supabase } from './lib/supabase';
import { useTemplates } from './useTemplates';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [purchasedTemplates, setPurchasedTemplates] = useState([]);
  const [hasPlayedIntro, setHasPlayedIntro] = useState(window.location.pathname !== '/');
  const { user, requireAuth } = useAuth();
  const { templates } = useTemplates();

  const isLoggedIn = !!user;

  // Load purchases from User Metadata
  useEffect(() => {
    if (user && templates.length > 0) {
      const purchasedIds = user.user_metadata?.purchased_templates || [];
      const fetchedTemplates = templates.filter(t => purchasedIds.includes(t.id));
      setPurchasedTemplates(fetchedTemplates);
    } else if (!user) {
      setPurchasedTemplates([]);
    }
  }, [user, templates]);

  const addToCart = (product) => {
    requireAuth(() => {
      if (cartItems.find(item => item.id === product.id)) {
        toast.error(`${product.title} is already in your cart!`);
        return;
      }
      
      if (purchasedTemplates.find(item => item.id === product.id)) {
        toast.info(`You already own ${product.title}!`);
        return;
      }

      setCartItems(prev => [...prev, product]);
      toast.success(`${product.title} added to cart!`);
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
    toast.success("Item removed from cart");
  };

  const checkout = async (paymentId = 'mock_pay_id') => {
    if (cartItems.length === 0) return;
    if (!user) {
      toast.error("You must be logged in to checkout.");
      return;
    }
    
    const newPurchaseIds = cartItems.map(item => item.id);
    const existingIds = user.user_metadata?.purchased_templates || [];
    const finalIds = [...new Set([...existingIds, ...newPurchaseIds])];
    
    // Save to Supabase User Metadata (works without creating custom tables)
    const { error: metadataError } = await supabase.auth.updateUser({
      data: { 
        purchased_templates: finalIds
      }
    });
      
    if (metadataError) {
      console.error("Purchase metadata error:", metadataError);
      toast.error("Failed to save purchase. Please try again.");
      return;
    }

    // Insert into the purchases table for Admin Dashboard analytics
    const purchaseRecords = cartItems.map(item => ({
      user_id: user.id,
      template_id: item.id,
      payment_id: paymentId // Save the Razorpay payment ID here!
    }));

    const { error: dbError } = await supabase
      .from('purchases')
      .insert(purchaseRecords);

    if (dbError) {
       console.error("Database purchase log error:", dbError);
    }
    
    // Update local state
    const newPurchasedObjects = templates.filter(t => finalIds.includes(t.id));
    setPurchasedTemplates(newPurchasedObjects);
    setCartItems([]);
  };

  const removePurchasedTemplate = async (templateId) => {
    if (!user) return;
    
    const existingIds = user.user_metadata?.purchased_templates || [];
    const finalIds = existingIds.filter(id => id !== templateId);
    
    const { error } = await supabase.auth.updateUser({
      data: { purchased_templates: finalIds }
    });
      
    if (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete template.");
      return;
    }
    
    const newPurchasedObjects = templates.filter(t => finalIds.includes(t.id));
    setPurchasedTemplates(newPurchasedObjects);
    toast.success("Template removed from your collection.");
  };

  const cartTotal = cartItems.reduce((sum, item) => sum + parseFloat(item.price), 0);

  return (
    <CartContext.Provider value={{ cartItems, purchasedTemplates, addToCart, removeFromCart, checkout, cartTotal, isLoggedIn, hasPlayedIntro, setHasPlayedIntro, removePurchasedTemplate }}>
      {children}
    </CartContext.Provider>
  );
};
