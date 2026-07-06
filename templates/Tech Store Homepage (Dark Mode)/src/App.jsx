import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, 
  Search, 
  Menu, 
  X, 
  ChevronRight, 
  Zap, 
  ShieldCheck, 
  Truck,
  ArrowUpRight,
  Trash2,
  Plus,
  Minus,
  Star,
  Check
} from 'lucide-react';

const products = [
  {
    id: 1,
    name: "Aura Pro Max",
    category: "Audio",
    price: "$399",
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=1000&auto=format&fit=crop",
    tag: "New Release",
    colSpan: "col-span-12 md:col-span-8",
    rating: 4.9,
    description: "Computational audio re-engineered. Experience distortion-free acoustics under active neutral acoustics.",
    colors: [
      { name: "Space Black", hex: "#111" },
      { name: "Silver Satin", hex: "#ccc" },
      { name: "Aurora Teal", hex: "#0d9488" }
    ],
    specs: ["Custom 40mm Dynamic Driver", "Active Noise Cancellation", "Up to 30 Hours Battery Life", "Spatial Audio Support"]
  },
  {
    id: 2,
    name: "Nexus Watch Series X",
    category: "Wearables",
    price: "$499",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1000&auto=format&fit=crop",
    colSpan: "col-span-12 md:col-span-4",
    rating: 4.8,
    description: "Your health and connectivity, elevated. Real-time bio-sensors combined with an always-on premium titanium case.",
    colors: [
      { name: "Matte Black", hex: "#18181b" },
      { name: "Chrono Gold", hex: "#d97706" }
    ],
    specs: ["Always-On OLED Retina Display", "Electrocardiogram (ECG) Tracker", "Water Resistant (50m)", "4G LTE Connectivity"]
  },
  {
    id: 3,
    name: "CyberDeck Mini",
    category: "Computing",
    price: "$899",
    image: "https://images.unsplash.com/photo-1625842268584-8f3296236761?q=80&w=1000&auto=format&fit=crop",
    colSpan: "col-span-12 md:col-span-4",
    rating: 4.7,
    description: "The desktop powerhouse that fits in your hand. Optimized for code compilers and terminal applications.",
    colors: [
      { name: "Cyber Gray", hex: "#3f3f46" },
      { name: "Neon Violet", hex: "#7c3aed" }
    ],
    specs: ["12-Core Processor", "32GB Unified Memory", "1TB NVMe Storage", "Dual Thunderbolt 4 Ports"]
  },
  {
    id: 4,
    name: "Quantum VR Headset",
    category: "Gaming",
    price: "$799",
    image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=1000&auto=format&fit=crop",
    colSpan: "col-span-12 md:col-span-8",
    rating: 4.9,
    description: "Step into virtual worlds with ultra-dense micro-OLED displays and precise spatial eye tracking mechanics.",
    colors: [
      { name: "Stellar White", hex: "#fafafa" },
      { name: "Obsidian Black", hex: "#09090b" }
    ],
    specs: ["Dual 4K Micro-OLED Displays", "120Hz Refresh Rate", "LiDAR Space Mapping Sensors", "Zero-Latency Eye Tracking"]
  },
];

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  
  // Interactive States
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeQuickView, setActiveQuickView] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [isCheckoutSuccess, setIsCheckoutSuccess] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribedEmail, setSubscribedEmail] = useState("");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Set default selected color when quick view opens
  useEffect(() => {
    if (activeQuickView) {
      setSelectedColor(activeQuickView.colors[0].name);
    }
  }, [activeQuickView]);

  // Toast Helper
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Cart Handlers
  const addToCart = (product, colorName) => {
    const color = colorName || product.colors[0].name;
    const existingIndex = cart.findIndex(item => item.id === product.id && item.color === color);
    
    if (existingIndex > -1) {
      const newCart = [...cart];
      newCart[existingIndex].quantity += 1;
      setCart(newCart);
    } else {
      setCart([...cart, {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        color: color,
        quantity: 1
      }]);
    }
    
    triggerToast(`Added ${product.name} (${color}) to bag.`);
  };

  const updateQuantity = (id, color, delta) => {
    const existingIndex = cart.findIndex(item => item.id === id && item.color === color);
    if (existingIndex === -1) return;
    
    const newCart = [...cart];
    newCart[existingIndex].quantity += delta;
    
    if (newCart[existingIndex].quantity <= 0) {
      newCart.splice(existingIndex, 1);
      triggerToast("Item removed from bag.");
    }
    setCart(newCart);
  };

  const removeFromCart = (id, color) => {
    setCart(cart.filter(item => !(item.id === id && item.color === color)));
    triggerToast("Item removed from bag.");
  };

  const cartSubtotal = cart.reduce((acc, item) => {
    const priceNum = parseInt(item.price.replace('$', ''));
    return acc + (priceNum * item.quantity);
  }, 0);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutSuccess(true);
    setCart([]);
  };

  // Filtered Products for Search
  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!subscribedEmail) return;
    setIsSubscribing(true);
    setTimeout(() => {
      setIsSubscribing(false);
      triggerToast("Successfully subscribed to newsletter.");
      setSubscribedEmail("");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white/20">
      
      {/* Toast Banner */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: 50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 50, x: "-50%" }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-zinc-900 border border-white/10 px-6 py-3 rounded-full text-sm font-semibold tracking-wide shadow-2xl flex items-center gap-3"
          >
            <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navbar */}
      <header className={`fixed top-0 w-full z-45 transition-all duration-500 ${isScrolled ? 'bg-black/60 backdrop-blur-xl border-b border-white/10 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-[1400px] mx-auto px-6 flex justify-between items-center">
          <div className="text-2xl font-bold tracking-tighter cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            SYNTH<span className="text-zinc-500">.</span>
          </div>

          <nav className="hidden md:flex gap-10">
            {['Mac', 'iPad', 'iPhone', 'Watch', 'Vision'].map((item) => (
              <a key={item} href="#arrivals" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors duration-300">
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-6">
            <button className="text-zinc-400 hover:text-white transition-colors" onClick={() => setIsSearchOpen(true)} aria-label="Search">
              <Search className="w-5 h-5" />
            </button>
            <button className="text-zinc-400 hover:text-white transition-colors relative" onClick={() => setIsCartOpen(true)} aria-label="Shopping Cart">
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-white text-black font-bold text-[9px] rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button className="md:hidden text-zinc-400" onClick={() => setMobileMenu(true)} aria-label="Menu">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-50 bg-black pt-6 px-6"
          >
            <div className="flex justify-between items-center mb-16">
              <div className="text-2xl font-bold tracking-tighter">SYNTH.</div>
              <button onClick={() => setMobileMenu(false)} className="text-white" aria-label="Close menu">
                <X className="w-8 h-8" />
              </button>
            </div>
            <div className="flex flex-col gap-8 text-3xl font-medium tracking-tight">
              {['Mac', 'iPad', 'iPhone', 'Watch', 'Vision', 'Accessories', 'Support'].map((item) => (
                <a key={item} href="#arrivals" onClick={() => setMobileMenu(false)} className="border-b border-white/10 pb-4 flex justify-between items-center">
                  {item}
                  <ChevronRight className="w-6 h-6 text-zinc-600" />
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col p-8"
          >
            <div className="max-w-4xl mx-auto w-full flex justify-between items-center mb-16">
              <span className="text-xl font-semibold text-zinc-400">Search Products</span>
              <button onClick={() => { setIsSearchOpen(false); setSearchQuery(""); }} className="text-white hover:opacity-70 transition">
                <X className="w-8 h-8" />
              </button>
            </div>
            
            <div className="max-w-4xl mx-auto w-full">
              <input 
                type="text" 
                placeholder="Type to search (e.g. Aura, Watch...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full bg-transparent text-4xl md:text-6xl font-bold tracking-tight outline-none border-b border-white/10 pb-6 placeholder-zinc-700"
              />
              
              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[50vh] overflow-y-auto pr-4">
                {searchQuery && filteredProducts.map(p => (
                  <div 
                    key={p.id} 
                    className="flex items-center gap-6 p-4 rounded-2xl bg-zinc-900/50 border border-white/5 cursor-pointer hover:border-white/20 transition-all"
                    onClick={() => {
                      setActiveQuickView(p);
                      setIsSearchOpen(false);
                      setSearchQuery("");
                    }}
                  >
                    <img src={p.image} alt={p.name} className="w-16 h-16 rounded-xl object-cover" />
                    <div>
                      <h4 className="font-bold text-lg">{p.name}</h4>
                      <p className="text-zinc-400 text-sm">{p.price} • {p.category}</p>
                    </div>
                  </div>
                ))}
                {searchQuery && filteredProducts.length === 0 && (
                  <p className="text-zinc-500 text-lg">No products found matching your search.</p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 z-49 bg-black"
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.35, ease: "easeInOut" }}
              className="fixed top-0 right-0 w-full sm:w-[450px] h-full bg-zinc-950 border-l border-white/10 z-50 p-8 flex flex-col justify-between shadow-2xl"
            >
              <div>
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-2xl font-bold tracking-tight flex items-center gap-3">
                    Your Bag 
                    <span className="text-sm font-semibold text-zinc-500 bg-white/5 px-2.5 py-0.5 rounded-full">
                      {cartCount}
                    </span>
                  </h3>
                  <button onClick={() => setIsCartOpen(false)} className="text-zinc-400 hover:text-white" aria-label="Close cart">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {cart.length === 0 ? (
                  <div className="text-center py-20">
                    <ShoppingBag className="w-16 h-16 text-zinc-700 mx-auto mb-6" />
                    <p className="text-zinc-500 text-lg font-light mb-8">Your bag is empty.</p>
                    <button 
                      onClick={() => setIsCartOpen(false)} 
                      className="px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-zinc-200 transition"
                    >
                      Continue Shopping
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2">
                    {cart.map(item => (
                      <div key={`${item.id}-${item.color}`} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                        <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover" />
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start">
                              <h4 className="font-bold">{item.name}</h4>
                              <button onClick={() => removeFromCart(item.id, item.color)} className="text-zinc-500 hover:text-white">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                            <p className="text-xs text-zinc-400 mt-0.5">Color: {item.color}</p>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-semibold text-zinc-300">{item.price}</span>
                            <div className="flex items-center gap-3 bg-black/40 border border-white/10 rounded-full px-2.5 py-1">
                              <button onClick={() => updateQuantity(item.id, item.color, -1)} className="text-zinc-400 hover:text-white">
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="text-xs font-semibold w-4 text-center">{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.id, item.color, 1)} className="text-zinc-400 hover:text-white">
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="border-t border-white/10 pt-6">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-zinc-400">Subtotal</span>
                    <span className="text-2xl font-bold">${cartSubtotal}</span>
                  </div>
                  <button 
                    onClick={handleCheckout}
                    className="w-full py-4 bg-white text-black font-semibold rounded-full hover:bg-zinc-200 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    Proceed to Checkout <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Quick View Modal */}
      <AnimatePresence>
        {activeQuickView && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveQuickView(null)}
              className="fixed inset-0 z-49 bg-black"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-4xl bg-zinc-950 border border-white/10 rounded-[32px] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
            >
              <div className="md:w-1/2 relative bg-zinc-900 aspect-video md:aspect-auto">
                <img src={activeQuickView.image} alt={activeQuickView.name} className="w-full h-full object-cover" />
                <button 
                  onClick={() => setActiveQuickView(null)} 
                  className="absolute top-6 left-6 w-10 h-10 rounded-full bg-black/60 backdrop-blur border border-white/10 flex items-center justify-center text-white md:hidden"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <p className="text-zinc-500 uppercase tracking-widest text-xs font-semibold mb-1">{activeQuickView.category}</p>
                      <h3 className="text-3xl font-bold tracking-tight">{activeQuickView.name}</h3>
                    </div>
                    <button 
                      onClick={() => setActiveQuickView(null)} 
                      className="hidden md:flex w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 items-center justify-center text-zinc-400 hover:text-white transition"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-2xl font-bold text-zinc-200">{activeQuickView.price}</span>
                    <div className="flex items-center gap-1 text-yellow-500 bg-yellow-500/10 px-2 py-0.5 rounded-full text-xs font-bold">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      {activeQuickView.rating}
                    </div>
                  </div>

                  <p className="text-zinc-400 mb-8 leading-relaxed font-light">{activeQuickView.description}</p>

                  <div className="mb-8">
                    <span className="block text-xs uppercase tracking-wider text-zinc-500 font-bold mb-3">Select Color</span>
                    <div className="flex gap-3">
                      {activeQuickView.colors.map(color => (
                        <button
                          key={color.name}
                          onClick={() => setSelectedColor(color.name)}
                          style={{ backgroundColor: color.hex }}
                          className={`w-8 h-8 rounded-full border-2 transition-all relative flex items-center justify-center ${selectedColor === color.name ? 'border-white scale-110 shadow-[0_0_12px_rgba(255,255,255,0.3)]' : 'border-transparent opacity-80'}`}
                          title={color.name}
                        >
                          {selectedColor === color.name && (
                            <Check className={`w-4 h-4 ${color.hex === '#fafafa' ? 'text-black' : 'text-white'}`} />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-8">
                    <span className="block text-xs uppercase tracking-wider text-zinc-500 font-bold mb-3">Specifications</span>
                    <div className="grid grid-cols-2 gap-3 text-sm text-zinc-400">
                      {activeQuickView.specs.map((spec, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                          {spec}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => { addToCart(activeQuickView, selectedColor); setActiveQuickView(null); }}
                  className="w-full py-4 bg-white text-black font-semibold rounded-full hover:bg-zinc-200 transition-all duration-300"
                >
                  Add to Bag
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Checkout Success Modal */}
      <AnimatePresence>
        {isCheckoutSuccess && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCheckoutSuccess(false)}
              className="fixed inset-0 z-49 bg-black"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-md bg-zinc-950 border border-white/10 p-8 rounded-3xl text-center shadow-2xl"
            >
              <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Order Received!</h3>
              <p className="text-zinc-400 mb-8 font-light leading-relaxed">
                Thank you for your purchase. We are processing your payment and will dispatch your package shortly.
              </p>
              
              <div className="space-y-3 bg-white/5 border border-white/5 p-4 rounded-2xl text-left text-sm mb-8">
                <div className="flex justify-between"><span className="text-zinc-500">Estimated Delivery</span><span className="font-semibold">Tomorrow, July 7</span></div>
                <div className="flex justify-between"><span className="text-zinc-500">Shipping Mode</span><span className="font-semibold text-green-400">Next Day Express</span></div>
              </div>

              <button 
                onClick={() => setIsCheckoutSuccess(false)}
                className="w-full py-4 bg-white text-black font-semibold rounded-full hover:bg-zinc-200 transition"
              >
                Close Window
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main>
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px] mix-blend-screen pointer-events-none"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px] mix-blend-screen pointer-events-none"></div>
          
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-30 mask-image-gradient-b"></div>
          
          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center mt-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="text-sm uppercase tracking-[0.3em] text-zinc-400 mb-6 font-semibold animate-pulse">The New Era of Sound</h2>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-8 leading-[0.9]">
                Aura Pro <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 to-zinc-600">
                  Max.
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto mb-12 font-light">
                High-fidelity audio meets computational perfection. Experience sound like never before.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <button 
                  onClick={() => addToCart(products[0], "Space Black")}
                  className="w-full sm:w-auto px-8 py-4 bg-white text-black rounded-full font-semibold hover:scale-105 transition-transform duration-300 shadow-lg shadow-white/10"
                >
                  Buy from $399
                </button>
                <button 
                  onClick={() => openFundModal || document.getElementById('arrivals').scrollIntoView({ behavior: 'smooth' })}
                  className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 rounded-full font-semibold hover:bg-white/10 transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  Learn more <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-500"
          >
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <div className="w-px h-12 bg-gradient-to-b from-zinc-500 to-transparent"></div>
          </motion.div>
        </section>

        {/* Value Props */}
        <section className="py-24 border-y border-white/10 bg-zinc-950">
          <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: <Zap className="w-8 h-8 text-white mb-6" />, title: "Ultra Fast Shipping", desc: "Order today, receive tomorrow. Free shipping on all orders over $50." },
              { icon: <ShieldCheck className="w-8 h-8 text-white mb-6" />, title: "Secure Checkout", desc: "Your data is protected by bank-level 256-bit AES encryption." },
              { icon: <Truck className="w-8 h-8 text-white mb-6" />, title: "Easy Returns", desc: "30-day money-back guarantee. No questions asked." }
            ].map((prop, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                className="text-center md:text-left hover:scale-[1.02] transition-transform duration-300"
              >
                <div className="inline-block p-4 rounded-2xl bg-white/5 border border-white/10">{prop.icon}</div>
                <h3 className="text-xl font-semibold mb-3 mt-6">{prop.title}</h3>
                <p className="text-zinc-400">{prop.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Product Grid (Bento Style) */}
        <section className="py-32" id="arrivals">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="flex justify-between items-end mb-16">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Latest Arrivals</h2>
                <p className="text-zinc-400 text-lg font-light">Discover our newest generation of devices.</p>
              </div>
              <button 
                onClick={() => triggerToast("Redirecting to all products catalogue...")}
                className="hidden md:flex items-center gap-2 text-white hover:text-zinc-300 transition-colors font-medium text-sm border border-white/10 px-5 py-2.5 rounded-full hover:bg-white/5"
              >
                View All <ArrowUpRight className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-12 gap-6">
              {products.map((product, idx) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className={`${product.colSpan} group relative rounded-[32px] overflow-hidden bg-zinc-900 border border-white/5 aspect-square md:aspect-auto md:h-[600px] cursor-pointer`}
                  onClick={() => setActiveQuickView(product)}
                >
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10 duration-500"></div>
                  
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-20"></div>
                  
                  <div className="absolute inset-0 z-30 p-8 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      {product.tag && (
                        <span className="px-4 py-1.5 rounded-full bg-white text-black text-xs font-bold uppercase tracking-widest shadow-lg">
                          {product.tag}
                        </span>
                      )}
                      <button className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white hover:text-black ml-auto">
                        <ArrowUpRight className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <div>
                      <p className="text-zinc-400 mb-2 uppercase tracking-widest text-xs font-semibold">{product.category}</p>
                      <h3 className="text-3xl font-bold tracking-tight mb-2">{product.name}</h3>
                      <p className="text-xl text-zinc-300 font-semibold">{product.price}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <button 
              onClick={() => triggerToast("Redirecting to all products catalogue...")}
              className="w-full mt-10 md:hidden py-4 border border-white/20 rounded-full font-medium flex items-center justify-center gap-2"
            >
              View All Products <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* Feature Highlight */}
        <section className="py-32 bg-zinc-950 overflow-hidden relative border-t border-white/10">
          <div className="max-w-[1400px] mx-auto px-6 flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2 relative z-10">
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-[1.1]">
                Designed for <br/> 
                <span className="text-zinc-500">the future.</span>
              </h2>
              <p className="text-xl text-zinc-400 mb-10 leading-relaxed font-light">
                Every curve, every material, every microchip has been engineered to perfection. We don't just build devices; we craft experiences that push humanity forward.
              </p>
              <div className="space-y-6">
                {[
                  "Aerospace-grade titanium enclosure",
                  "Next-generation neural processor",
                  "All-day battery life with rapid charging"
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-lg text-zinc-300 font-light">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-purple-600/20 blur-[100px] rounded-full"></div>
              <img 
                src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1000&auto=format&fit=crop" 
                alt="Product feature" 
                className="relative z-10 rounded-3xl w-full object-cover aspect-[4/5] md:aspect-square shadow-[0_0_100px_rgba(255,255,255,0.08)] grayscale hover:grayscale-0 transition-all duration-700 cursor-pointer"
                onClick={() => setActiveQuickView(products[1])}
              />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black pt-32 pb-12">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-24">
            <div className="col-span-2 md:col-span-2">
              <div className="text-3xl font-bold tracking-tighter mb-6">SYNTH.</div>
              <p className="text-zinc-400 max-w-sm mb-8 font-light">
                Crafting the tools of tomorrow. Join our newsletter for early access to new releases.
              </p>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  value={subscribedEmail}
                  onChange={(e) => setSubscribedEmail(e.target.value)}
                  required
                  className="bg-white/5 border border-white/10 rounded-full px-6 py-3 text-white focus:outline-none focus:border-white/30 w-full max-w-xs text-sm"
                />
                <button 
                  type="submit" 
                  disabled={isSubscribing}
                  className="bg-white text-black rounded-full px-6 py-3 font-semibold hover:bg-zinc-200 transition-colors text-sm flex items-center justify-center min-w-[100px]"
                >
                  {isSubscribing ? "Subscribing..." : "Subscribe"}
                </button>
              </form>
            </div>
            
            <div>
              <h4 className="font-semibold mb-6 text-sm uppercase tracking-wider text-zinc-500">Products</h4>
              <ul className="space-y-4 text-zinc-400 text-sm">
                <li><a href="#arrivals" className="hover:text-white transition">Mac</a></li>
                <li><a href="#arrivals" className="hover:text-white transition">iPad</a></li>
                <li><a href="#arrivals" className="hover:text-white transition">iPhone</a></li>
                <li><a href="#arrivals" className="hover:text-white transition">Watch</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-6 text-sm uppercase tracking-wider text-zinc-500">Services</h4>
              <ul className="space-y-4 text-zinc-400 text-sm">
                <li><a href="#" onClick={(e) => { e.preventDefault(); triggerToast("Coming Soon"); }} className="hover:text-white transition">Music</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); triggerToast("Coming Soon"); }} className="hover:text-white transition">TV+</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); triggerToast("Coming Soon"); }} className="hover:text-white transition">Fitness</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); triggerToast("Coming Soon"); }} className="hover:text-white transition">Cloud</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-6 text-sm uppercase tracking-wider text-zinc-500">Company</h4>
              <ul className="space-y-4 text-zinc-400 text-sm">
                <li><a href="#" onClick={(e) => { e.preventDefault(); triggerToast("Coming Soon"); }} className="hover:text-white transition">About</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); triggerToast("Coming Soon"); }} className="hover:text-white transition">Careers</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); triggerToast("Coming Soon"); }} className="hover:text-white transition">Environment</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); triggerToast("Coming Soon"); }} className="hover:text-white transition">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-sm text-zinc-500">
            <p>© 2026 SYNTH Technology. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white transition">United States (EN)</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Icon for CheckCircle2
function CheckCircle2({className}) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  )
}
