import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  // Load initial state from localStorage if available
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('estateFlowUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem('estateFlowWishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('estateFlowUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('estateFlowUser');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('estateFlowWishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    setWishlist([]); 
  };

  const updateProfile = (updatedData) => {
    setUser((prev) => ({ ...prev, ...updatedData }));
  };

  const toggleWishlist = (property) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === property.id && item.title === property.title);
      if (exists) {
        return prev.filter((item) => !(item.id === property.id && item.title === property.title));
      } else {
        return [...prev, property];
      }
    });
  };

  const isInWishlist = (property) => {
    return wishlist.some((item) => item.id === property.id && item.title === property.title);
  };

  const value = {
    user,
    login,
    logout,
    updateProfile,
    wishlist,
    toggleWishlist,
    isInWishlist
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
