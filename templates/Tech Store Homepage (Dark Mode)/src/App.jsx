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
  ArrowUpRight
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
  },
  {
    id: 2,
    name: "Nexus Watch Series X",
    category: "Wearables",
    price: "$499",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1000&auto=format&fit=crop",
    colSpan: "col-span-12 md:col-span-4",
  },
  {
    id: 3,
    name: "CyberDeck Mini",
    category: "Computing",
    price: "$899",
    image: "https://images.unsplash.com/photo-1625842268584-8f3296236761?q=80&w=1000&auto=format&fit=crop",
    colSpan: "col-span-12 md:col-span-4",
  },
  {
    id: 4,
    name: "Quantum VR Headset",
    category: "Gaming",
    price: "$799",
    image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=1000&auto=format&fit=crop",
    colSpan: "col-span-12 md:col-span-8",
  },
];

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white/20">
      
      {/* Navbar */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-black/60 backdrop-blur-xl border-b border-white/10 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-[1400px] mx-auto px-6 flex justify-between items-center">
          <div className="text-2xl font-bold tracking-tighter">
            SYNTH<span className="text-zinc-500">.</span>
          </div>

          <nav className="hidden md:flex gap-10">
            {['Mac', 'iPad', 'iPhone', 'Watch', 'Vision'].map((item) => (
              <a key={item} href="#" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors duration-300">
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-6">
            <button className="text-zinc-400 hover:text-white transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="text-zinc-400 hover:text-white transition-colors relative">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full border-2 border-black"></span>
            </button>
            <button className="md:hidden text-zinc-400" onClick={() => setMobileMenu(true)}>
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
              <button onClick={() => setMobileMenu(false)} className="text-white">
                <X className="w-8 h-8" />
              </button>
            </div>
            <div className="flex flex-col gap-8 text-3xl font-medium tracking-tight">
              {['Mac', 'iPad', 'iPhone', 'Watch', 'Vision', 'Accessories', 'Support'].map((item) => (
                <a key={item} href="#" className="border-b border-white/10 pb-4 flex justify-between items-center">
                  {item}
                  <ChevronRight className="w-6 h-6 text-zinc-600" />
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          {/* Animated Background Gradients */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px] mix-blend-screen pointer-events-none"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px] mix-blend-screen pointer-events-none"></div>
          
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-30 mask-image-gradient-b"></div>
          
          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center mt-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="text-sm uppercase tracking-[0.3em] text-zinc-400 mb-6 font-semibold">The New Era of Sound</h2>
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
                <button className="w-full sm:w-auto px-8 py-4 bg-white text-black rounded-full font-semibold hover:scale-105 transition-transform duration-300">
                  Buy from $399
                </button>
                <button className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 rounded-full font-semibold hover:bg-white/10 transition-colors duration-300 flex items-center justify-center gap-2">
                  Learn more <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
          
          {/* Scroll Indicator */}
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
                className="text-center md:text-left"
              >
                <div className="inline-block p-4 rounded-2xl bg-white/5 border border-white/10">{prop.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{prop.title}</h3>
                <p className="text-zinc-400">{prop.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Product Grid (Bento Style) */}
        <section className="py-32">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="flex justify-between items-end mb-16">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Latest Arrivals</h2>
                <p className="text-zinc-400 text-lg">Discover our newest generation of devices.</p>
              </div>
              <button className="hidden md:flex items-center gap-2 text-white hover:text-zinc-300 transition-colors">
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
                  className={`${product.colSpan} group relative rounded-3xl overflow-hidden bg-zinc-900 border border-white/5 aspect-square md:aspect-auto md:h-[600px]`}
                >
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10 duration-500"></div>
                  
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-20"></div>
                  
                  <div className="absolute inset-0 z-30 p-8 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      {product.tag && (
                        <span className="px-4 py-1.5 rounded-full bg-white text-black text-xs font-bold uppercase tracking-widest">
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
                      <p className="text-xl text-zinc-300">{product.price}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <button className="w-full mt-10 md:hidden py-4 border border-white/20 rounded-full font-medium flex items-center justify-center gap-2">
              View All Products <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* Feature Highlight */}
        <section className="py-32 bg-zinc-950 overflow-hidden relative">
          <div className="max-w-[1400px] mx-auto px-6 flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2 relative z-10">
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-[1.1]">
                Designed for <br/> 
                <span className="text-zinc-500">the future.</span>
              </h2>
              <p className="text-xl text-zinc-400 mb-10 leading-relaxed">
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
                    <span className="text-lg text-zinc-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-purple-600/20 blur-[100px] rounded-full"></div>
              <img 
                src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1000&auto=format&fit=crop" 
                alt="Product feature" 
                className="relative z-10 rounded-3xl w-full object-cover aspect-[4/5] md:aspect-square shadow-[0_0_100px_rgba(255,255,255,0.1)] grayscale hover:grayscale-0 transition-all duration-700"
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
              <p className="text-zinc-400 max-w-sm mb-8">
                Crafting the tools of tomorrow. Join our newsletter for early access to new releases.
              </p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="bg-white/5 border border-white/10 rounded-full px-6 py-3 text-white focus:outline-none focus:border-white/30 w-full max-w-xs"
                />
                <button className="bg-white text-black rounded-full px-6 py-3 font-medium hover:bg-zinc-200 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-6">Products</h4>
              <ul className="space-y-4 text-zinc-400">
                <li><a href="#" className="hover:text-white transition">Mac</a></li>
                <li><a href="#" className="hover:text-white transition">iPad</a></li>
                <li><a href="#" className="hover:text-white transition">iPhone</a></li>
                <li><a href="#" className="hover:text-white transition">Watch</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-6">Services</h4>
              <ul className="space-y-4 text-zinc-400">
                <li><a href="#" className="hover:text-white transition">Music</a></li>
                <li><a href="#" className="hover:text-white transition">TV+</a></li>
                <li><a href="#" className="hover:text-white transition">Fitness</a></li>
                <li><a href="#" className="hover:text-white transition">Cloud</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-6">Company</h4>
              <ul className="space-y-4 text-zinc-400">
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Careers</a></li>
                <li><a href="#" className="hover:text-white transition">Environment</a></li>
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-sm text-zinc-500">
            <p>© 2024 SYNTH Technology. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition">United States (EN)</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Icon for CheckCircle2 (missing import)
function CheckCircle2({className}) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  )
}
