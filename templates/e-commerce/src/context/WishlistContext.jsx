import React, { createContext, useContext, useReducer, useEffect } from 'react';

const WishlistContext = createContext();

function wishlistReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_ITEM': {
      const exists = state.includes(action.payload);
      if (exists) {
        return state.filter(id => id !== action.payload);
      } else {
        return [...state, action.payload];
      }
    }
    default:
      return state;
  }
}

export function WishlistProvider({ children }) {
  const [wishlist, dispatch] = useReducer(wishlistReducer, [], (initial) => {
    const saved = localStorage.getItem('wishlist_state');
    return saved ? JSON.parse(saved) : initial;
  });

  useEffect(() => {
    localStorage.setItem('wishlist_state', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (productId) => {
    dispatch({ type: 'TOGGLE_ITEM', payload: productId });
  };

  const isInWishlist = (productId) => wishlist.includes(productId);

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist must be used within a WishlistProvider');
  return context;
}
