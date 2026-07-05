import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/product/ProductCard';
import { products, categories } from '../data/mockData';

export default function Home() {
  const featuredProducts = products.filter(p => p.isNew).slice(0, 4);
  const { scrollY } = useScroll();
  
  // Parallax effect for the hero image
  const y = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);

  return (
    <div className="flex flex-col w-full overflow-hidden bg-background">
      
      {/* Cinematic Hero Section */}
      <section className="relative h-[100vh] min-h-[700px] w-full flex items-center justify-center overflow-hidden">
        <motion.div style={{ y, opacity }} className="absolute inset-0 w-full h-full">
          <img 
            src="https://images.unsplash.com/photo-1549439602-43ebca2327af?q=80&w=2000&auto=format&fit=crop" 
            alt="Hero Editorial" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>
        
        <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center text-white mt-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
            className="text-xs uppercase tracking-[0.3em] mb-6 font-bold"
          >
            Spring / Summer Collection
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.25, 1, 0.5, 1] }}
            className="text-6xl md:text-8xl lg:text-9xl font-serif font-medium tracking-tighter mb-8 max-w-5xl leading-[0.9]"
          >
            The Art of Subtlety.
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1, ease: "easeOut" }}
          >
            <Link 
              to="/category/fashion" 
              className="inline-block border border-white/30 rounded-md bg-transparent text-white px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black hover:shadow-lg active:scale-95 transition-all duration-500"
            >
              Discover the Collection
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Luxury Infinite Marquee */}
      <div className="w-full bg-foreground text-background py-4 overflow-hidden flex whitespace-nowrap border-y border-border">
        <motion.div 
          animate={{ x: [0, -1035] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
          className="flex space-x-12 items-center text-xs uppercase tracking-[0.2em] font-medium"
        >
          <span>Complimentary Global Shipping</span>
          <span>•</span>
          <span>New Season Arrivals</span>
          <span>•</span>
          <span>Complimentary Global Shipping</span>
          <span>•</span>
          <span>New Season Arrivals</span>
          <span>•</span>
          <span>Complimentary Global Shipping</span>
          <span>•</span>
          <span>New Season Arrivals</span>
          <span>•</span>
          <span>Complimentary Global Shipping</span>
          <span>•</span>
          <span>New Season Arrivals</span>
        </motion.div>
      </div>

      {/* Asymmetrical Categories Section */}
      <section className="py-32 container mx-auto px-4 lg:px-8">
        <div className="flex justify-center items-center mb-20">
          <h2 className="text-4xl md:text-6xl font-serif font-medium tracking-tight">Curated Categories</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
          {/* Large Editorial Card */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
            className="md:col-span-8 relative group aspect-[4/3] md:aspect-[16/9] overflow-hidden rounded-md shadow-sm cursor-pointer"
          >
            <Link to={`/category/${categories[0].id}`}>
              <img 
                src={categories[0].image} 
                alt={categories[0].name} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-1000" />
              <div className="absolute bottom-10 left-10 text-white">
                <span className="text-xs uppercase tracking-[0.2em] mb-2 block opacity-80">Explore</span>
                <h3 className="text-4xl font-serif">{categories[0].name}</h3>
              </div>
            </Link>
          </motion.div>

          {/* Tall Sub-Cards */}
          <div className="md:col-span-4 flex flex-col gap-6 lg:gap-8">
            {categories.slice(1).map((category, idx) => (
              <motion.div 
                key={category.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: 0.2 + (idx * 0.2), duration: 1, ease: [0.25, 1, 0.5, 1] }}
                className="relative group flex-1 aspect-[3/4] overflow-hidden rounded-md shadow-sm cursor-pointer"
              >
                <Link to={`/category/${category.id}`}>
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-1000" />
                  <div className="absolute bottom-8 left-8 text-white">
                    <span className="text-[10px] uppercase tracking-[0.2em] mb-2 block opacity-80">Shop</span>
                    <h3 className="text-2xl font-serif">{category.name}</h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products - High End Grid */}
      <section className="py-32 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col items-center mb-24 text-center">
            <span className="text-xs uppercase tracking-[0.2em] mb-4 text-muted-foreground font-bold">Latest Additions</span>
            <h2 className="text-4xl md:text-5xl font-serif font-medium tracking-tight mb-8">Selected Arrivals</h2>
            <Link to="/category/fashion" className="text-xs tracking-[0.2em] uppercase font-bold text-foreground border-b border-foreground pb-1 hover:text-accent hover:border-accent transition-colors">
              View All Pieces
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {featuredProducts.map((product, idx) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.15, duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Banner */}
      <section className="py-32 container mx-auto px-4 lg:px-8">
        <div className="relative aspect-[16/9] md:aspect-[21/9] w-full bg-foreground flex items-center overflow-hidden">
          <motion.img 
            initial={{ scale: 1.1 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            viewport={{ once: true }}
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2000&auto=format&fit=crop" 
            alt="Editorial" 
            className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity grayscale"
          />
          <div className="relative z-10 w-full text-center px-8 text-background flex flex-col items-center">
            <h2 className="text-5xl md:text-7xl font-serif font-medium mb-8 leading-[1.1] max-w-3xl">Redefining modern elegance.</h2>
            <Link 
              to="/category/fashion" 
              className="inline-block bg-background text-foreground rounded-md px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] shadow-sm hover:shadow-xl hover:bg-accent hover:text-white active:scale-95 transition-all duration-500"
            >
              The Editorial
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
