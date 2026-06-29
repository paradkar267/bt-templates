import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Star, MoveRight, Layers, Zap, Infinity, ArrowUpRight, ShoppingCart, Code, LayoutTemplate, Palette, User, Smartphone, Box, Headset } from 'lucide-react';
import { NavBar } from './components/ui/tubelight-navbar';
import { useCart } from './CartContext';
import { marketplaceTemplates } from './data';
import { useAuth } from './AuthContext';
import { TestimonialsSection } from './components/ui/TestimonialsSection';
import { ExploreCategories } from './components/ui/ExploreCategories';
import { InteractiveProductCard } from './components/ui/card-7';
import Spline from '@splinetool/react-spline';
import { BlurFade } from '@/components/ui/blur-fade';
import UserMenu from './UserMenu';
import { Floating3DWrapper } from '@/components/ui/3d-card';
import { IconBar, IconBarItem } from '@/components/ui/icon-bar';
import { ShinyButton } from '@/components/ui/shiny-button';
import { Footerdemo } from '@/components/ui/footer-section';
import SocialCards from '@/components/ui/card-fan-carousel';
import { motion } from "motion/react";
import { HeroGeometricBackground } from '@/components/ui/shape-landing-hero';
import { Button as NeonButton } from '@/components/ui/neon-button';
import { AnimatedThemeToggle } from '@/components/ui/animated-theme-toggle';

const HeroCard = ({ tag, title, price, image, className }) => (
  <div className={`absolute p-4 rounded-[2rem] bg-white/80 dark:bg-black/80 backdrop-blur-xl border border-white text-black dark:text-white shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:-translate-y-2 transition-transform duration-500 cursor-pointer ${className}`}>
    <div className={`w-full h-32 rounded-2xl overflow-hidden mb-4 relative group bg-gray-100 dark:bg-gray-800`}>
      <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700 ease-out" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
    <div className="flex justify-between items-center px-1">
      <div>
        <p className={`text-[10px] font-bold tracking-[0.2em] uppercase mb-1.5 flex items-center gap-1 text-gray-400`}>
          <Star className="w-3 h-3 fill-current text-black dark:text-white" /> {tag}
        </p>
        <h4 className={`font-bold text-lg tracking-tight text-gray-900 dark:text-gray-100`}>{title}</h4>
      </div>
      <div className={`px-3 py-1.5 rounded-full text-xs font-black shadow-sm bg-black text-white`}>
        ₹{price}
      </div>
    </div>
  </div>
);

// Spline component isolated with its own lazy-load fade-in state
const SplineRobot = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <div className={`w-full h-full transition-opacity duration-[1500ms] ease-in-out relative overflow-hidden ${isLoaded ? 'opacity-100' : 'opacity-0'} pointer-events-none flex items-center justify-center`}>
      <div className="w-full h-full transform scale-[1.15] md:scale-[1.25]">
        <Spline
          scene="https://prod.spline.design/bE20pt4os2xtpKLK/scene.splinecode"
          onLoad={() => setIsLoaded(true)}
          style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
        />
      </div>
    </div>
  );
};

// DenseCard delegates to InteractiveProductCard
export const DenseCard = ({ template }) => (
  <InteractiveProductCard template={template} />
);


export default function Home({ mountSpline }) {
  const { cartItems, isLoggedIn } = useCart();
  const { requireAuth } = useAuth();
  const navigate = useNavigate();
  const filters = ["All", "Figma", "Next.js", "React", "Webflow", "Tailwind", "HTML", "Shopify", "React Native", "Framer"];
  const [activeFilter, setActiveFilter] = useState("All");

  // 5 Massive Cards Data
  const bigOrbits = [
    { id: 1, tag: "UI KIT", title: "Nexus Dashboard", price: "49", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800", angle: 0, y: 0 },
    { id: 2, tag: "WEB", title: "Aura Landing Page", price: "29", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800", angle: 72, y: 150 },
    { id: 3, tag: "MOBILE", title: "Fintech App", price: "39", image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=800", angle: 144, y: 50 },
    { id: 4, tag: "SAAS", title: "Creator Studio", price: "59", image: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?auto=format&fit=crop&q=80&w=800", angle: 216, y: 180 },
    { id: 5, tag: "DASHBOARD", title: "Dev Tools UI", price: "45", image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=800", angle: 288, y: -20 }
  ];

  const filteredTemplates = activeFilter === "All" 
    ? marketplaceTemplates 
    : marketplaceTemplates.filter(t => t.category === activeFilter);

  return (
    <div className={`scene-7-hero relative w-full min-h-screen z-40 pointer-events-none flex flex-col font-sans bg-white dark:bg-black text-black dark:text-white dark:bg-black dark:text-white`}>
      
      {/* 0. GLOBAL STICKY NAVIGATION */}
      <nav className={`sticky top-0 hero-nav h-[80px] w-full px-6 md:px-12 flex items-center justify-between z-[100] glass-nav pointer-events-auto transition-all dark:bg-black/50 dark:border-gray-800`}>
        {/* LOGO */}
        <Link 
          to="/" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-9 h-9 bg-black text-white rounded-xl flex items-center justify-center font-bold text-lg group-hover:scale-105 transition-transform shadow-md">B</div>
          <div className="text-xl font-black tracking-[0.1em] uppercase text-gray-900 dark:text-gray-100 group-hover:opacity-80 transition-opacity">Bizleap</div>
        </Link>

        {/* CENTER LINKS - TUBELIGHT NAVBAR */}
        <div className="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2 mt-2">
           <NavBar 
             activeTab={
               activeFilter === "All" ? "TEMPLATES" :
               activeFilter === "Figma" ? "UI KITS" :
               activeFilter === "Framer" ? "FRAMER" : "TEMPLATES"
             }
             onChange={(name) => {
               if (name === "TEMPLATES") return navigate("/templates");
               else if (name === "UI KITS") return navigate("/ui-kits");
               else if (name === "FRAMER") return navigate("/templates?tech=Framer");
               else if (name === "REACT") return navigate("/templates?tech=React");
             }}
             items={[
               { name: "TEMPLATES", url: "/templates", icon: LayoutTemplate },
               { name: "UI KITS", url: "/ui-kits", icon: Layers },
               { name: "FRAMER", url: "/templates?tech=Framer", icon: Zap },
               { name: "REACT", url: "/templates?tech=React", icon: Code },
             ]} 
           />
        </div>
        
        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-2 md:gap-3">
          <Link to="/contact" title="Contact Us" className="hidden md:flex items-center justify-center h-10 w-10 bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300 rounded-full transition-colors cursor-pointer text-gray-600 hover:text-black dark:text-white shadow-sm border border-black/[0.03] dark:border-gray-700">
            <Headset className="w-4 h-4" />
          </Link>
          <div 
            onClick={() => window.dispatchEvent(new CustomEvent('open-command-palette'))}
            className="hidden md:flex items-center justify-center h-10 w-10 bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300 rounded-full transition-colors cursor-pointer text-gray-600 hover:text-black dark:text-white shadow-sm border border-black/[0.03] dark:border-gray-700"
          >
            <Search className="w-4 h-4" />
          </div>
          <div className="hidden md:block">
            <UserMenu />
          </div>
          <AnimatedThemeToggle className="rounded-full w-10 h-10 border border-black/[0.03] dark:border-gray-700 shadow-sm bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 dark:hover:text-white" />
          <button onClick={() => requireAuth(() => navigate('/cart'))} className="relative flex items-center justify-center h-10 w-10 bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-full transition-colors hidden md:flex cursor-pointer text-gray-600 dark:text-gray-300 hover:text-black dark:text-white dark:hover:text-white shadow-sm border border-black/[0.03] dark:border-gray-700">
            <ShoppingCart className="w-4 h-4" />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-sm">
                {cartItems.length}
              </span>
            )}
          </button>
        </div>
      </nav>

      <div className="relative w-full h-[90vh] overflow-hidden flex flex-col shrink-0">
        <HeroGeometricBackground />
        
        {/* Animated Aurora Background Blobs */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 dark:bg-purple-900/50 aurora-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-cyan-300 dark:bg-cyan-900/50 aurora-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-rose-300 dark:bg-rose-900/50 aurora-blob animation-delay-4000"></div>

        <div className="flex-1 w-full max-w-[1800px] mx-auto relative flex items-center">
          {/* LEFT SIDE: Text Information */}
          <div className="w-full lg:w-[45%] h-full relative z-20 flex flex-col justify-center pl-10 md:pl-24 pointer-events-auto">
            <BlurFade delay={0.25} inView>
              <h2 className={`text-6xl md:text-[6.5rem] font-black leading-[0.9] tracking-tighter mb-8 text-gray-900 dark:text-gray-100`}>
                Design<br />Redefined.
              </h2>
            </BlurFade>

            <p className={`info-stagger text-xl font-medium max-w-lg mb-12 leading-relaxed text-gray-500`}>
              Welcome to Bizleap. The premier digital marketplace for world-class UI kits, 3D assets, and high-converting website templates built for modern creators.
            </p>

            <div className="flex gap-4 info-stagger">
              <ShinyButton onClick={() => document.getElementById('catalog').scrollIntoView({ behavior: 'smooth' })}>
                Explore Market
              </ShinyButton>
            </div>
          </div>

          {/* RIGHT SIDE: 3D Robot & 5 Massive Orbiting HeroCards */}
          <div className="w-full lg:w-[55%] h-full relative z-20 flex items-center justify-center pb-0 pr-10" style={{ perspective: '2000px' }}>
            <div className="absolute w-full h-full flex items-center justify-center translate-x-12 lg:translate-x-24" style={{ transformStyle: 'preserve-3d' }}>
              {/* SPLINE ROBOT MOUNTS LAZILY */}
              <div className="hero-robot-container absolute w-full h-full max-w-[1000px] flex items-center justify-center pointer-events-auto" style={{ transform: 'translateZ(1px)' }}>
                {mountSpline && <SplineRobot />}
              </div>

              <div className="orbit-master absolute w-full h-full pointer-events-none animate-orbit" style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}>
                {bigOrbits.map((orbit) => (
                  <div key={orbit.id} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ transformStyle: 'preserve-3d', transform: `rotateY(${orbit.angle}deg) translateY(${orbit.y}px)` }}>
                    <div className="orbit-distance" style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}>
                      <div className={`orbit-card-counter-${orbit.id} animate-orbit-counter`} style={{ '--initial-rotation': `-${orbit.angle}deg`, transform: `rotateY(-${orbit.angle}deg)`, willChange: 'transform' }}>
                        <HeroCard
                          tag={orbit.tag}
                          title={orbit.title}
                          price={orbit.price}
                          image={orbit.image}
                          className="relative -ml-[110px] -mt-[85px] pointer-events-auto"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`w-full relative z-50 pointer-events-auto flex flex-col items-center bg-white dark:bg-black text-black dark:text-white`}>

         {/* A. FEATURED THEMES - Moved to Top priority */}
         <div className={`py-20 md:py-24 px-8 md:px-16 w-full max-w-[1600px] mx-auto`}>
            <div className="flex justify-between items-end mb-16">
               <div>
                  <h2 className="text-5xl md:text-6xl font-black tracking-tight mb-4 text-gray-900 dark:text-gray-100">Featured Themes</h2>
                  <p className="text-gray-500 font-medium text-xl">Our highest-rated and meticulously crafted templates.</p>
               </div>
               <Link to="/featured" className={`hidden md:flex items-center gap-2 font-bold hover:gap-4 transition-all px-6 py-3 rounded-full bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:bg-gray-800 text-black dark:text-white border border-black/[0.05]`}>
                  View all featured <MoveRight className="w-5 h-5" />
               </Link>
            </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...marketplaceTemplates].sort((a, b) => (b.sales * b.rating) - (a.sales * a.rating)).slice(0, 3).map(template => (
                   <DenseCard key={template.id} template={template} />
                ))}
             </div>
         </div>

         {/* B. CATEGORY DIRECTORY - Art Gallery Style */}
         <div className={`py-20 md:py-24 w-full border-y border-black/[0.03] dark:border-white/5 bg-gray-50/50 dark:bg-black`}>
            <div className="max-w-[1600px] mx-auto px-8 md:px-16 overflow-hidden">
               <div className="text-center mb-20 relative z-10">
                  <h2 className={`text-5xl md:text-6xl font-black tracking-tight mb-6 text-gray-900 dark:text-gray-100`}>Explore Categories</h2>
                  <p className="text-gray-500 font-medium text-xl max-w-2xl mx-auto">Discover industry-leading templates, curated perfectly for modern digital businesses.</p>
               </div>
               <div className="relative z-20">
                 <ExploreCategories />
               </div>
            </div>
         </div>

         {/* C. CATALOG FILTER & TEMPLATES GRID */}
         <div id="catalog" className={`py-20 md:py-24 px-8 md:px-16 w-full max-w-[1600px] mx-auto border-b border-black/[0.03] relative`}>
            
            {/* Soft Aurora Glow behind catalog */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-100/60 dark:bg-indigo-900/20 aurora-blob pointer-events-none"></div>

            <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6 relative z-10">
               <h2 className="text-5xl md:text-6xl font-black tracking-tight text-gray-900 dark:text-gray-100">Newest Arrivals</h2>
               <Link to="/templates" className={`flex items-center gap-2 font-bold hover:gap-4 transition-all px-6 py-3 rounded-full bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:bg-gray-800 text-black dark:text-white border border-black/[0.05]`}>
                  Browse all <MoveRight className="w-5 h-5" />
               </Link>
            </div>

             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
                {filteredTemplates.slice(0, 6).map(template => (
                   <DenseCard key={`new-${template.id}`} template={template} />
               ))}
               
               {filteredTemplates.length === 0 && (
                  <div className="col-span-full py-24 text-center border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-[2rem]">
                     <p className="text-xl text-gray-400 font-bold">No templates found for this category.</p>
                  </div>
               )}
            </div>
            
            <div className="mt-20 flex justify-center">
               <Link to="/templates" className={`px-12 py-5 border border-black/[0.1] font-black rounded-full transition-all text-lg shadow-sm cursor-pointer inline-flex items-center bg-white dark:bg-black text-black dark:text-white hover:bg-gray-50 dark:bg-gray-900 hover:shadow-md`}>
                 Load More Templates
               </Link>
            </div>
         </div>

         {/* D. VALUE PROPOSITION — Creative Bento Grid */}
         <div className={`py-20 md:py-24 w-full border-y border-black/[0.04] bg-white dark:bg-black relative overflow-hidden`}>
            <div className="max-w-[1600px] mx-auto px-8 md:px-16 relative z-10">
               {/* Header */}
               <div className="mb-16">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-50 dark:bg-gray-900 border border-black/[0.06] mb-6 shadow-sm">
                     <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse inline-block"></span>
                     <span className="text-sm font-bold tracking-wide uppercase text-gray-700">Why Bizleap</span>
                  </div>
                  <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-gray-900 dark:text-gray-100 leading-none">
                     Built for<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-cyan-500">perfectionists.</span>
                  </h2>
               </div>

               {/* Simplified Features Grid */}
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                  {/* Feature 1 */}
                  <div className="p-8 rounded-3xl border border-black/[0.08] dark:border-white/[0.08] hover:border-violet-500/30 transition-all bg-gray-50/50 dark:bg-white/[0.02]">
                     <div className="w-12 h-12 rounded-xl bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center mb-6">
                        <Layers className="w-6 h-6 text-violet-600 dark:text-violet-400" />
                     </div>
                     <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-gray-100">Pixel Perfect</h3>
                     <p className="text-gray-500 leading-relaxed text-sm">Every layer is meticulously organized. Components are built with strict design systems to ensure flawless aesthetics at every breakpoint.</p>
                  </div>

                  {/* Feature 2 */}
                  <div className="p-8 rounded-3xl border border-black/[0.08] dark:border-white/[0.08] hover:border-violet-500/30 transition-all bg-gray-50/50 dark:bg-white/[0.02]">
                     <div className="w-12 h-12 rounded-xl bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center mb-6">
                        <Zap className="w-6 h-6 text-violet-600 dark:text-violet-400" />
                     </div>
                     <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-gray-100">Production Ready</h3>
                     <p className="text-gray-500 leading-relaxed text-sm">Stop translating designs to code. Our kits ship with clean, responsive React & Tailwind code — ready to deploy.</p>
                  </div>

                  {/* Feature 3 */}
                  <div className="p-8 rounded-3xl border border-black/[0.08] dark:border-white/[0.08] hover:border-violet-500/30 transition-all bg-gray-50/50 dark:bg-white/[0.02]">
                     <div className="w-12 h-12 rounded-xl bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center mb-6">
                        <Infinity className="w-6 h-6 text-violet-600 dark:text-violet-400" />
                     </div>
                     <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-gray-100">Lifetime Updates</h3>
                     <p className="text-gray-500 leading-relaxed text-sm">Pay once, use forever. Future updates, new components, and continuous design upgrades — all included at no extra cost.</p>
                  </div>
               </div>

               {/* Simplified Stats strip */}
               <div className="border-t border-black/5 dark:border-white/5 pt-12 flex flex-wrap items-center justify-between gap-6 max-w-4xl mx-auto">
                  <div className="text-center w-[40%] sm:w-auto">
                     <div className="text-3xl md:text-5xl font-black text-gray-900 dark:text-gray-100 tracking-tight">2,400+</div>
                     <div className="text-xs md:text-sm font-semibold text-gray-400 uppercase tracking-widest mt-2">Templates</div>
                  </div>
                  <div className="text-center w-[40%] sm:w-auto">
                     <div className="text-3xl md:text-5xl font-black text-gray-900 dark:text-gray-100 tracking-tight">98%</div>
                     <div className="text-xs md:text-sm font-semibold text-gray-400 uppercase tracking-widest mt-2">Satisfaction</div>
                  </div>
                  <div className="text-center w-[40%] sm:w-auto">
                     <div className="text-3xl md:text-5xl font-black text-gray-900 dark:text-gray-100 tracking-tight">50K+</div>
                     <div className="text-xs md:text-sm font-semibold text-gray-400 uppercase tracking-widest mt-2">Creators</div>
                  </div>
                  <div className="text-center w-[40%] sm:w-auto">
                     <div className="text-3xl md:text-5xl font-black text-gray-900 dark:text-gray-100 tracking-tight">4.9 ★</div>
                     <div className="text-xs md:text-sm font-semibold text-gray-400 uppercase tracking-widest mt-2">Avg. Rating</div>
                  </div>
               </div>
            </div>
         </div>

         {/* D2. TESTIMONIALS SECTION */}
         <TestimonialsSection />


         {/* F. FOOTER */}
         <Footerdemo />

      </div>
    </div>
  );
}
