import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  Layers, 
  Zap, 
  Shield, 
  ArrowRight, 
  CheckCircle2, 
  ChevronRight,
  Menu,
  X,
  Play
} from 'lucide-react';

const navLinks = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Pricing', href: '#' },
  { name: 'Company', href: '#' },
];

const features = [
  {
    icon: <BarChart3 className="w-6 h-6 text-indigo-400" />,
    title: 'Advanced Analytics',
    description: 'Get deep insights into your user behavior with real-time tracking and custom dashboards.',
    colSpan: 'col-span-12 md:col-span-8',
    bg: 'bg-slate-900',
  },
  {
    icon: <Zap className="w-6 h-6 text-amber-400" />,
    title: 'Lightning Fast',
    description: 'Built on edge network architecture ensuring millisecond response times globally.',
    colSpan: 'col-span-12 md:col-span-4',
    bg: 'bg-slate-800',
  },
  {
    icon: <Shield className="w-6 h-6 text-emerald-400" />,
    title: 'Bank-grade Security',
    description: 'Your data is encrypted at rest and in transit. SOC2 Type II certified infrastructure.',
    colSpan: 'col-span-12 md:col-span-4',
    bg: 'bg-slate-800',
  },
  {
    icon: <Layers className="w-6 h-6 text-fuchsia-400" />,
    title: 'Seamless Integrations',
    description: 'Connect with your favorite tools in one click. Slack, Jira, GitHub, and 100+ more.',
    colSpan: 'col-span-12 md:col-span-8',
    bg: 'bg-slate-900',
  }
];

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#030712] text-slate-200 font-sans selection:bg-indigo-500/30">
      
      {/* Navbar */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#030712]/80 backdrop-blur-md border-b border-white/10' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">Nexus</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                {link.name}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <button className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Sign in</button>
            <button className="px-5 py-2.5 text-sm font-medium text-white bg-white/10 hover:bg-white/20 border border-white/10 rounded-full transition-all">
              Get Started
            </button>
          </div>

          <button className="md:hidden text-slate-300" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#030712] pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} className="text-2xl font-semibold text-slate-200">
                  {link.name}
                </a>
              ))}
              <div className="h-px bg-white/10 w-full my-4"></div>
              <button className="w-full py-4 rounded-xl border border-white/20 text-white font-medium">Sign in</button>
              <button className="w-full py-4 rounded-xl bg-indigo-600 text-white font-medium">Get Started</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-indigo-300 mb-8"
            >
              <span className="flex h-2 w-2 rounded-full bg-indigo-500"></span>
              Nexus 2.0 is now live
              <ChevronRight className="w-4 h-4" />
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white max-w-4xl"
            >
              Build faster with <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                intelligent tools.
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8 text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed"
            >
              The unified workspace for modern teams. Bring your tasks, docs, and goals together in one powerful platform designed for speed.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <button className="px-8 py-4 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors flex items-center justify-center gap-2 shadow-[0_0_40px_rgba(79,70,229,0.3)]">
                Start for free <ArrowRight className="w-4 h-4" />
              </button>
              <button className="px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-colors flex items-center justify-center gap-2">
                <Play className="w-4 h-4" /> Watch demo
              </button>
            </motion.div>

            {/* Dashboard Preview Image */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-20 w-full max-w-5xl mx-auto rounded-2xl border border-white/10 bg-slate-900/50 backdrop-blur-xl shadow-2xl overflow-hidden p-2"
            >
              <div className="w-full rounded-xl border border-white/5 bg-[#0f172a] aspect-video relative overflow-hidden flex flex-col">
                {/* Mock Header */}
                <div className="h-12 border-b border-white/5 flex items-center px-4 gap-4 bg-slate-900">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                  </div>
                  <div className="flex-1 max-w-md mx-auto bg-slate-800 rounded-md h-6 border border-white/5"></div>
                </div>
                {/* Mock Content */}
                <div className="flex-1 p-6 flex gap-6">
                  <div className="w-48 hidden md:flex flex-col gap-3">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className={`h-8 rounded-lg ${i === 0 ? 'bg-indigo-500/20 border border-indigo-500/30' : 'bg-slate-800'}`}></div>
                    ))}
                  </div>
                  <div className="flex-1 flex flex-col gap-4">
                    <div className="flex gap-4">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="flex-1 h-24 bg-slate-800 rounded-xl border border-white/5"></div>
                      ))}
                    </div>
                    <div className="flex-1 bg-slate-800 rounded-xl border border-white/5 mt-2"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Logo Cloud */}
        <section className="py-10 border-y border-white/5 bg-white/[0.02]">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-sm font-medium text-slate-500 mb-8 uppercase tracking-wider">Trusted by innovative teams worldwide</p>
            <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-50 grayscale">
              {['Acme Corp', 'GlobalBank', 'TechFlow', 'Zenith', 'Nova'].map((logo) => (
                <span key={logo} className="text-xl md:text-2xl font-bold">{logo}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Bento Grid Features */}
        <section className="py-24 md:py-32 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6">Everything you need to scale</h2>
              <p className="text-lg text-slate-400">Stop switching between apps. Nexus brings your entire workflow into one beautifully designed platform.</p>
            </div>

            <div className="grid grid-cols-12 gap-6">
              {features.map((feature, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  key={feature.title} 
                  className={`${feature.colSpan} ${feature.bg} rounded-3xl p-8 border border-white/5 relative overflow-hidden group hover:border-white/10 transition-colors`}
                >
                  {/* Decorative Gradient */}
                  <div className="absolute -right-20 -top-20 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:bg-indigo-500/10 transition-colors"></div>
                  
                  <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-white/5 flex items-center justify-center mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-slate-400 text-lg leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-indigo-900/20"></div>
          <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Ready to transform your work?</h2>
            <p className="text-xl text-slate-400 mb-10">Join 10,000+ teams already using Nexus to ship products faster.</p>
            <button className="px-8 py-4 rounded-full bg-white text-slate-900 hover:bg-slate-200 font-semibold transition-colors text-lg shadow-[0_0_40px_rgba(255,255,255,0.2)]">
              Get Started for Free
            </button>
            <p className="mt-6 text-sm text-slate-500">No credit card required. 14-day free trial.</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#030712] pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-6 h-6 rounded-md bg-indigo-500 flex items-center justify-center">
                  <Layers className="w-3 h-3 text-white" />
                </div>
                <span className="text-lg font-bold text-white">Nexus</span>
              </div>
              <p className="text-sm text-slate-500">Making work better for modern teams everywhere.</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition">Features</a></li>
                <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition">Integrations</a></li>
                <li><a href="#" className="hover:text-white transition">Changelog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition">About Us</a></li>
                <li><a href="#" className="hover:text-white transition">Careers</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
            <p>© 2024 Nexus Inc. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition">Twitter</a>
              <a href="#" className="hover:text-white transition">GitHub</a>
              <a href="#" className="hover:text-white transition">Discord</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
