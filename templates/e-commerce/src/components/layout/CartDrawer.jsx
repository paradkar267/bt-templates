import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export default function CartDrawer() {
  const { state, dispatch, cartTotal } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    dispatch({ type: 'TOGGLE_CART', payload: false });
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {state.isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => dispatch({ type: 'TOGGLE_CART', payload: false })}
            className="fixed inset-0 bg-primary/40 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-background shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h2 className="text-xl font-serif font-semibold">Your Cart ({state.items.length})</h2>
              <button 
                onClick={() => dispatch({ type: 'TOGGLE_CART', payload: false })}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {state.items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                    <Trash2 size={24} />
                  </div>
                  <p className="text-lg font-medium">Your cart is empty</p>
                  <button 
                    onClick={() => dispatch({ type: 'TOGGLE_CART', payload: false })}
                    className="text-accent font-medium hover:underline"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                state.items.map((item) => (
                  <div key={`${item.id}-${item.color}-${item.size}`} className="flex gap-4 border-b border-border pb-6">
                    <img 
                      src={item.image || item.images?.[0]} 
                      alt={item.name} 
                      className="w-24 h-32 object-cover rounded-md"
                    />
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between">
                        <Link 
                          to={`/product/${item.id}`} 
                          className="font-medium hover:text-accent line-clamp-1"
                          onClick={() => dispatch({ type: 'TOGGLE_CART', payload: false })}
                        >
                          {item.name}
                        </Link>
                        <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                      
                      <div className="text-sm text-muted-foreground mt-1 space-x-2">
                        {item.color && <span>Color: <span className="inline-block w-3 h-3 rounded-full border border-border align-middle" style={{backgroundColor: item.color}}></span></span>}
                        {item.size && <span>Size: {item.size}</span>}
                      </div>

                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center border border-border rounded-md">
                          <button 
                            className="p-1 px-2 hover:bg-muted text-muted-foreground transition-colors"
                            onClick={() => {
                              if (item.quantity > 1) {
                                dispatch({ type: 'UPDATE_QUANTITY', payload: { ...item, quantity: item.quantity - 1 }});
                              } else {
                                dispatch({ type: 'REMOVE_ITEM', payload: item });
                              }
                            }}
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <button 
                            className="p-1 px-2 hover:bg-muted text-muted-foreground transition-colors"
                            onClick={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { ...item, quantity: item.quantity + 1 }})}
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        
                        <button 
                          onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item })}
                          className="text-sm text-muted-foreground hover:text-danger underline underline-offset-4"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {state.items.length > 0 && (
              <div className="p-6 border-t border-border bg-muted/30">
                <div className="flex justify-between mb-4 text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-6 text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <button 
                  onClick={handleCheckout}
                  className="w-full bg-foreground text-background py-4 rounded-md font-medium hover:bg-foreground/90 transition-colors flex items-center justify-center gap-2 group"
                >
                  Checkout
                  <span className="font-normal opacity-70 group-hover:opacity-100 transition-opacity">
                    • ${cartTotal.toFixed(2)}
                  </span>
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
