import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const initialState = {
  items: [],
  isCartOpen: false,
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id && item.color === action.payload.color && item.size === action.payload.size
      );
      
      if (existingItemIndex > -1) {
        const newItems = [...state.items];
        newItems[existingItemIndex].quantity += action.payload.quantity;
        return { ...state, items: newItems, isCartOpen: true };
      }
      return { ...state, items: [...state.items, action.payload], isCartOpen: true };
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(
          (item) => !(item.id === action.payload.id && item.color === action.payload.color && item.size === action.payload.size)
        ),
      };
    case 'UPDATE_QUANTITY': {
      const newItems = state.items.map((item) => {
        if (item.id === action.payload.id && item.color === action.payload.color && item.size === action.payload.size) {
          return { ...item, quantity: action.payload.quantity };
        }
        return item;
      });
      return { ...state, items: newItems };
    }
    case 'TOGGLE_CART':
      return { ...state, isCartOpen: action.payload !== undefined ? action.payload : !state.isCartOpen };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState, (initial) => {
    const savedCart = localStorage.getItem('cart_state');
    return savedCart ? JSON.parse(savedCart) : initial;
  });

  useEffect(() => {
    localStorage.setItem('cart_state', JSON.stringify(state));
  }, [state]);

  const cartTotal = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartCount = state.items.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{ state, dispatch, cartTotal, cartCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
}
