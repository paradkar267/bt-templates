import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Star, MoveRight, Layers, Zap, Infinity, ArrowUpRight, ShoppingCart, Code, LayoutTemplate, Palette, User, Smartphone, Box, Headset } from 'lucide-react';
import { NavBar } from './components/ui/tubelight-navbar';
import { useCart } from './CartContext';
import { useTemplates } from './useTemplates';
import { useAuth } from './AuthContext';

import { ExploreCategories } from './components/ui/ExploreCategories';
import { InteractiveProductCard } from './components/ui/card-7';
import { CenterNav } from './components/ui/CenterNav';
import { BlurFade } from '@/components/ui/blur-fade';
import UserMenu from './UserMenu';
import { Floating3DWrapper } from '@/components/ui/3d-card';
import { IconBar, IconBarItem } from '@/components/ui/icon-bar';
import { ShinyButton } from '@/components/ui/shiny-button';
import { Footerdemo } from '@/components/ui/footer-section';
import SocialCards from '@/components/ui/card-fan-carousel';
import { motion } from "motion/react";
import { HeroGeometricBackground } from '@/components/ui/shape-landing-hero';
import { FAQSection } from './components/ui/FAQSection';

import { Logo } from './components/ui/Logo';


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


  const { templates: marketplaceTemplates, loading } = useTemplates();
  const filteredTemplates = activeFilter === "All" 
    ? marketplaceTemplates 
    : marketplaceTemplates.filter(t => t.category === activeFilter);

  return (
    <div className={`scene-7-hero relative w-full min-h-screen z-40 pointer-events-none flex flex-col font-sans bg-white dark:bg-black text-black dark:text-white dark:bg-black dark:text-white`}>
      
      {/* 0. GLOBAL STICKY NAVIGATION */}
      <nav className={`sticky top-0 hero-nav h-[80px] w-full px-6 md:px-12 flex items-center justify-between z-[100] glass-nav pointer-events-auto transition-all dark:bg-black/50 dark:border-gray-800`}>
        {/* LOGO */}
        <Logo />

        {/* CENTER LINKS - TUBELIGHT NAVBAR */}
        <CenterNav />
        
        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-2 md:gap-3">
          <Link to="/contact" title="Contact Us" className="hidden md:flex items-center justify-center h-10 w-10 bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300 rounded-full transition-colors cursor-pointer text-gray-600 hover:text-black dark:text-white shadow-sm border border-black/[0.03] dark:border-gray-700">
            <Headset className="w-4 h-4" />
          </Link>
          <div 
            onClick={() => window.dispatchEvent(new CustomEvent('open-command-palette'))}
            className="flex items-center justify-center h-10 w-10 bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300 rounded-full transition-colors cursor-pointer text-gray-600 hover:text-black dark:text-white shadow-sm border border-black/[0.03] dark:border-gray-700"
          >
            <Search className="w-4 h-4" />
          </div>

          <button onClick={() => requireAuth(() => navigate('/cart'))} className="relative flex items-center justify-center h-10 w-10 bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-full transition-colors cursor-pointer text-gray-600 dark:text-gray-300 hover:text-black dark:text-white dark:hover:text-white shadow-sm border border-black/[0.03] dark:border-gray-700">
            <ShoppingCart className="w-4 h-4" />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-sm">
                {cartItems.length}
              </span>
            )}
          </button>
          <div className="block">
            <UserMenu />
          </div>
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

          {/* RIGHT SIDE: Video */}
          <div className="w-full lg:w-[55%] h-full relative z-20 flex items-center justify-center pb-0 pr-10">
            <div className="absolute inset-0 w-full h-full flex items-center justify-end" style={{ maskImage: 'linear-gradient(to right, transparent, black 20%)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 20%)' }}>
              <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="w-full h-full object-cover object-left lg:object-center z-0"
                src="/bg.mp4"
              ></video>
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
               <Link to="/templates" className={`hidden md:flex items-center gap-2 font-bold hover:gap-4 transition-all px-6 py-3 rounded-full bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:bg-gray-800 text-black dark:text-white border border-black/[0.05]`}>
                  View all featured <MoveRight className="w-5 h-5" />
               </Link>
            </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...marketplaceTemplates].sort((a, b) => (b.sales * b.rating) - (a.sales * a.rating)).slice(0, 4).map(template => (
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
         <div id="catalog" className={`pt-20 md:pt-24 pb-8 md:pb-10 px-8 md:px-16 w-full max-w-[1600px] mx-auto border-b border-black/[0.03] relative`}>
            
            {/* Soft Aurora Glow behind catalog */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-100/60 dark:bg-indigo-900/20 aurora-blob pointer-events-none"></div>

            <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6 relative z-10">
               <h2 className="text-5xl md:text-6xl font-black tracking-tight text-gray-900 dark:text-gray-100">Newest Arrivals</h2>
               <Link to="/templates" className={`flex items-center gap-2 font-bold hover:gap-4 transition-all px-6 py-3 rounded-full bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:bg-gray-800 text-black dark:text-white border border-black/[0.05]`}>
                  Browse all <MoveRight className="w-5 h-5" />
               </Link>
            </div>

             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 relative z-10">
                {filteredTemplates.slice(0, 10).map(template => (
                   <DenseCard key={`new-${template.id}`} template={template} />
               ))}
               
               {filteredTemplates.length === 0 && (
                  <div className="col-span-full py-24 text-center border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-[2rem]">
                     <p className="text-xl text-gray-400 font-bold">No templates found for this category.</p>
                  </div>
               )}
            </div>
            
            <div className="mt-10 flex justify-center">
               <Link to="/templates" className={`px-12 py-5 border border-black/[0.1] font-black rounded-full transition-all text-lg shadow-sm cursor-pointer inline-flex items-center bg-white dark:bg-black text-black dark:text-white hover:bg-gray-50 dark:bg-gray-900 hover:shadow-md`}>
                 Load More Templates
               </Link>
            </div>
         </div>

         {/* D. VALUE PROPOSITION — Creative Bento Grid */}
         <div className={`pt-10 md:pt-12 pb-20 md:pb-24 w-full border-y border-black/[0.04] bg-white dark:bg-black relative overflow-hidden`}>
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

               {/* Premium Features Grid */}
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                  {/* Feature 1 */}
                  <div className="group p-8 md:p-10 rounded-[2.5rem] border border-black/5 dark:border-white/5 hover:border-violet-500/30 transition-all duration-500 bg-white/50 dark:bg-[#0a0a0a]/50 backdrop-blur-xl hover:shadow-2xl hover:shadow-violet-500/10 relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                     <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 dark:from-violet-500/20 dark:to-fuchsia-500/20 flex items-center justify-center mb-8 transform group-hover:scale-110 transition-transform duration-500">
                        <Layers className="w-7 h-7 text-violet-600 dark:text-violet-400" />
                     </div>
                     <h3 className="text-2xl font-black mb-4 text-gray-900 dark:text-gray-100 tracking-tight">Pixel Perfect</h3>
                     <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm md:text-base font-medium">Every layer is meticulously organized. Components are built with strict design systems to ensure flawless aesthetics at every breakpoint.</p>
                  </div>

                  {/* Feature 2 */}
                  <div className="group p-8 md:p-10 rounded-[2.5rem] border border-black/5 dark:border-white/5 hover:border-cyan-500/30 transition-all duration-500 bg-white/50 dark:bg-[#0a0a0a]/50 backdrop-blur-xl hover:shadow-2xl hover:shadow-cyan-500/10 relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                     <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 dark:from-cyan-500/20 dark:to-blue-500/20 flex items-center justify-center mb-8 transform group-hover:scale-110 transition-transform duration-500">
                        <Zap className="w-7 h-7 text-cyan-600 dark:text-cyan-400" />
                     </div>
                     <h3 className="text-2xl font-black mb-4 text-gray-900 dark:text-gray-100 tracking-tight">Production Ready</h3>
                     <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm md:text-base font-medium">Stop translating designs to code. Our kits ship with clean, responsive React & Tailwind code — ready to deploy instantly.</p>
                  </div>

                  {/* Feature 3 */}
                  <div className="group p-8 md:p-10 rounded-[2.5rem] border border-black/5 dark:border-white/5 hover:border-pink-500/30 transition-all duration-500 bg-white/50 dark:bg-[#0a0a0a]/50 backdrop-blur-xl hover:shadow-2xl hover:shadow-pink-500/10 relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                     <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500/10 to-rose-500/10 dark:from-pink-500/20 dark:to-rose-500/20 flex items-center justify-center mb-8 transform group-hover:scale-110 transition-transform duration-500">
                        <Infinity className="w-7 h-7 text-pink-600 dark:text-pink-400" />
                     </div>
                     <h3 className="text-2xl font-black mb-4 text-gray-900 dark:text-gray-100 tracking-tight">Lifetime Updates</h3>
                     <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm md:text-base font-medium">Pay once, use forever. Future updates, new components, and continuous design upgrades — all included at no extra cost.</p>
                  </div>
               </div>

               {/* Premium Stats Box */}
               <div className="bg-gradient-to-br from-white to-gray-50 dark:from-[#0a0a0a] dark:to-[#111] p-8 md:p-12 rounded-[2.5rem] border border-black/5 dark:border-white/10 shadow-2xl flex flex-wrap items-center justify-between gap-8 md:gap-6 relative overflow-hidden">
                  <div className="absolute top-0 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl pointer-events-none mix-blend-screen" />
                  
                  <div className="text-center w-[40%] sm:w-auto relative z-10">
                     <div className="text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-gray-900 to-gray-500 dark:from-white dark:to-gray-400 tracking-tighter mb-2">2,400+</div>
                     <div className="text-xs md:text-sm font-bold text-gray-400 uppercase tracking-widest">Templates</div>
                  </div>
                  <div className="hidden sm:block w-px h-16 bg-gradient-to-b from-transparent via-black/10 dark:via-white/10 to-transparent"></div>
                  
                  <div className="text-center w-[40%] sm:w-auto relative z-10">
                     <div className="text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-gray-900 to-gray-500 dark:from-white dark:to-gray-400 tracking-tighter mb-2">98%</div>
                     <div className="text-xs md:text-sm font-bold text-gray-400 uppercase tracking-widest">Satisfaction</div>
                  </div>
                  <div className="hidden sm:block w-px h-16 bg-gradient-to-b from-transparent via-black/10 dark:via-white/10 to-transparent"></div>
                  
                  <div className="text-center w-[40%] sm:w-auto relative z-10">
                     <div className="text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-gray-900 to-gray-500 dark:from-white dark:to-gray-400 tracking-tighter mb-2">50K+</div>
                     <div className="text-xs md:text-sm font-bold text-gray-400 uppercase tracking-widest">Creators</div>
                  </div>
                  <div className="hidden sm:block w-px h-16 bg-gradient-to-b from-transparent via-black/10 dark:via-white/10 to-transparent"></div>
                  
                  <div className="text-center w-[40%] sm:w-auto relative z-10">
                     <div className="text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-gray-900 to-gray-500 dark:from-white dark:to-gray-400 tracking-tighter mb-2">4.9 ★</div>
                     <div className="text-xs md:text-sm font-bold text-gray-400 uppercase tracking-widest">Avg. Rating</div>
                  </div>
               </div>
            </div>
         </div>




         {/* E. FAQ SECTION */}
         <div className="py-20 md:py-24 px-8 md:px-16 w-full max-w-[1600px] mx-auto">
           <FAQSection />
         </div>

         {/* F. FOOTER */}
         <Footerdemo />

      </div>
    </div>
  );
}
