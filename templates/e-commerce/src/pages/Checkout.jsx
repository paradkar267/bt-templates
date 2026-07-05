import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function Checkout() {
  const { state, cartTotal, dispatch } = useCart();
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success
  const navigate = useNavigate();
  const { addToast } = useToast();

  const handleNext = (e) => {
    e.preventDefault();
    if (step === 1) setStep(2);
    else if (step === 2) {
      // Simulate processing
      setTimeout(() => {
        setStep(3);
        dispatch({ type: 'CLEAR_CART' });
      }, 1500);
    }
  };

  if (state.items.length === 0 && step !== 3) {
    return (
      <div className="container mx-auto px-4 py-32 text-center min-h-[70vh] flex flex-col items-center justify-center">
        <h2 className="text-3xl font-serif mb-4">Your cart is empty</h2>
        <p className="text-muted-foreground mb-8">Add some items before checking out.</p>
        <Link to="/" className="bg-foreground text-background rounded-md shadow-sm px-8 py-3 uppercase tracking-widest font-bold hover:shadow-md active:scale-[0.98] transition-all">
          Return to Shop
        </Link>
      </div>
    );
  }

  if (step === 3) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }} 
        className="container mx-auto px-4 py-32 text-center min-h-[70vh] flex flex-col items-center justify-center"
      >
        <div className="w-20 h-20 bg-success/10 text-success rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 size={40} />
        </div>
        <h2 className="text-4xl font-serif font-bold mb-4">Order Confirmed</h2>
        <p className="text-muted-foreground max-w-md mx-auto mb-8 text-lg">
          Thank you for your purchase. We've sent a confirmation email to you with your order details.
        </p>
        <div className="text-sm text-muted-foreground mb-8 bg-muted p-4 rounded-md">
          Order Number: <span className="font-mono text-foreground font-medium">#{Math.floor(Math.random() * 1000000)}</span>
        </div>
        <Link to="/" className="bg-foreground text-background rounded-md shadow-sm px-8 py-4 uppercase tracking-widest font-bold hover:shadow-md active:scale-[0.98] transition-all">
          Continue Shopping
        </Link>
      </motion.div>
    );
  }

  return (
    <div className="container mx-auto px-4 lg:px-8 py-12 mb-20">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left Column - Form */}
        <div className="w-full lg:w-3/5">
          {/* Breadcrumbs / Progress */}
          <div className="flex items-center gap-4 text-sm font-medium mb-10 pb-4 border-b border-border">
            <Link to="/cart" className="text-muted-foreground hover:text-foreground flex items-center gap-1">
              <ArrowLeft size={16} /> Cart
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className={step >= 1 ? 'text-foreground' : 'text-muted-foreground'}>Shipping</span>
            <span className="text-muted-foreground">/</span>
            <span className={step >= 2 ? 'text-foreground' : 'text-muted-foreground'}>Payment</span>
          </div>

          <form onSubmit={handleNext}>
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="shipping"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-8"
                >
                  <div>
                    <h2 className="text-2xl font-serif mb-6">Contact Information</h2>
                    <div className="space-y-4">
                      <input type="email" placeholder="Email" required className="w-full px-4 py-3 bg-transparent border border-border focus:border-foreground focus:outline-none transition-colors" />
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-serif mb-6">Shipping Address</h2>
                    <div className="grid grid-cols-2 gap-4">
                      <input type="text" placeholder="First Name" required className="w-full px-4 py-3 bg-transparent border border-border rounded-md focus:border-foreground focus:outline-none transition-colors" />
                      <input type="text" placeholder="Last Name" required className="w-full px-4 py-3 bg-transparent border border-border rounded-md focus:border-foreground focus:outline-none transition-colors" />
                      <input type="text" placeholder="Address" required className="col-span-2 w-full px-4 py-3 bg-transparent border border-border rounded-md focus:border-foreground focus:outline-none transition-colors" />
                      <input type="text" placeholder="Apartment, suite, etc. (optional)" className="col-span-2 w-full px-4 py-3 bg-transparent border border-border rounded-md focus:border-foreground focus:outline-none transition-colors" />
                      <input type="text" placeholder="City" required className="w-full px-4 py-3 bg-transparent border border-border rounded-md focus:border-foreground focus:outline-none transition-colors" />
                      <div className="flex gap-4">
                        <select className="w-1/2 px-4 py-3 bg-transparent border border-border rounded-md focus:border-foreground focus:outline-none transition-colors text-muted-foreground">
                          <option>State</option>
                          <option>NY</option>
                          <option>CA</option>
                          <option>TX</option>
                        </select>
                        <input type="text" placeholder="ZIP Code" required className="w-1/2 px-4 py-3 bg-transparent border border-border rounded-md focus:border-foreground focus:outline-none transition-colors" />
                      </div>
                    </div>
                  </div>
                  
                  <button type="submit" className="w-full bg-foreground text-background rounded-md shadow-sm py-4 font-bold uppercase tracking-widest hover:shadow-lg active:scale-[0.98] transition-all mt-8">
                    Continue to Payment
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-8"
                >
                  {/* Summary of Shipping */}
                  <div className="border border-border p-4 rounded-md space-y-3 mb-8 text-sm">
                    <div className="flex justify-between pb-3 border-b border-border">
                      <span className="text-muted-foreground">Contact</span>
                      <span>user@example.com</span>
                      <button type="button" onClick={() => setStep(1)} className="text-accent hover:underline">Change</button>
                    </div>
                    <div className="flex justify-between pt-1">
                      <span className="text-muted-foreground">Ship to</span>
                      <span className="text-right">123 Main St, New York, NY 10001</span>
                      <button type="button" onClick={() => setStep(1)} className="text-accent hover:underline">Change</button>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-serif mb-6">Payment</h2>
                    <p className="text-sm text-muted-foreground mb-4">All transactions are secure and encrypted.</p>
                    
                    <div className="border border-border rounded-md overflow-hidden">
                      <div className="p-4 border-b border-border bg-muted/30 flex items-center gap-3">
                        <input type="radio" id="cc" name="payment" defaultChecked className="accent-foreground w-4 h-4" />
                        <label htmlFor="cc" className="font-medium cursor-pointer">Credit Card</label>
                      </div>
                      <div className="p-4 grid gap-4 bg-card">
                        <input type="text" placeholder="Card number" required className="w-full px-4 py-3 bg-transparent border border-border rounded-md focus:border-foreground focus:outline-none transition-colors" />
                        <input type="text" placeholder="Name on card" required className="w-full px-4 py-3 bg-transparent border border-border rounded-md focus:border-foreground focus:outline-none transition-colors" />
                        <div className="flex gap-4">
                          <input type="text" placeholder="Expiration date (MM / YY)" required className="w-1/2 px-4 py-3 bg-transparent border border-border rounded-md focus:border-foreground focus:outline-none transition-colors" />
                          <input type="text" placeholder="Security code" required className="w-1/2 px-4 py-3 bg-transparent border border-border rounded-md focus:border-foreground focus:outline-none transition-colors" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <button type="submit" className="w-full bg-foreground text-background rounded-md shadow-sm py-4 font-bold uppercase tracking-widest hover:shadow-lg active:scale-[0.98] transition-all mt-8 relative flex justify-center items-center">
                    Pay Now
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>

        {/* Right Column - Order Summary */}
        <div className="w-full lg:w-2/5">
          <div className="bg-muted/30 p-6 lg:p-8 rounded-lg sticky top-28 border border-border">
            <h2 className="text-xl font-serif font-semibold mb-6 border-b border-border pb-4">Order Summary</h2>
            
            <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
              {state.items.map(item => (
                <div key={`${item.id}-${item.color}-${item.size}`} className="flex gap-4">
                  <div className="relative">
                    <img src={item.image || item.images[0]} alt={item.name} className="w-16 h-16 object-cover rounded border border-border" />
                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-foreground text-background text-xs font-bold rounded-full flex items-center justify-center">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 text-sm">
                    <p className="font-medium line-clamp-1">{item.name}</p>
                    <p className="text-muted-foreground mt-1">
                      {item.color && <span className="mr-2">Color: <span className="inline-block w-2 h-2 rounded-full border border-border align-middle" style={{backgroundColor: item.color}}></span></span>}
                      {item.size && <span>Size: {item.size}</span>}
                    </p>
                  </div>
                  <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-6 space-y-4 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span className="text-foreground">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span className="text-foreground">Calculated</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Taxes</span>
                <span className="text-foreground">${(cartTotal * 0.08).toFixed(2)}</span>
              </div>
            </div>

            <div className="border-t border-border mt-6 pt-6 flex justify-between items-end">
              <span className="text-lg font-medium">Total</span>
              <div className="text-right">
                <span className="text-sm text-muted-foreground mr-2">USD</span>
                <span className="text-2xl font-bold">${(cartTotal * 1.08).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
