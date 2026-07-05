import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Shield, Award, Globe } from 'lucide-react';
import PropertyCard from '../components/PropertyCard';
import { properties, agents } from '../data/mockData';

export default function Home() {
  const navigate = useNavigate();
  const featuredProperties = properties.filter(p => p.featured).slice(0, 3);
  
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/listings?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/40 z-10" />
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: "easeOut" }}
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80" 
            alt="Luxury Estate" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-20 text-center px-6 max-w-5xl mx-auto mt-20">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-8xl font-serif text-white mb-6 leading-[1.1] font-light"
          >
            Extraordinary Properties.<br />Exceptional Lives.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.6 }}
            className="text-sm md:text-base text-white/80 mb-16 uppercase tracking-[0.3em] font-light"
          >
            Discover the world's finest real estate portfolio
          </motion.p>
          
          {/* Search Bar */}
          <motion.form 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
            onSubmit={handleSearch}
            className="bg-black/40 backdrop-blur-md p-2 flex flex-col md:flex-row max-w-2xl mx-auto border border-white/20 relative"
          >
            <input 
              type="text" 
              placeholder="SEARCH BY LOCATION, NEIGHBORHOOD, OR ZIP" 
              className="flex-grow bg-transparent px-8 py-5 outline-none text-white placeholder:text-white/50 text-[11px] tracking-[0.2em] font-light uppercase"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              type="submit"
              className="bg-white hover:bg-accent text-primary hover:text-white px-10 py-5 uppercase tracking-[0.2em] text-[10px] font-medium transition-colors duration-500 flex items-center justify-center"
            >
              Explore
            </button>
          </motion.form>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-32 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="flex justify-between items-end mb-20">
          <div>
            <h2 className="text-[10px] uppercase tracking-[0.3em] text-accent mb-4 font-medium">Curated Collection</h2>
            <h3 className="text-5xl md:text-6xl font-serif text-primary font-light">Featured Properties</h3>
          </div>
          <button onClick={() => navigate('/listings')} className="hidden md:flex items-center text-[10px] uppercase tracking-[0.2em] font-medium hover:text-accent transition-colors duration-500 border-b border-primary hover:border-accent pb-2">
            Explore Collection
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {featuredProperties.map((property, idx) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
        
        <div className="mt-16 text-center md:hidden">
          <button onClick={() => navigate('/listings')} className="text-[10px] uppercase tracking-[0.2em] font-medium hover:text-accent transition-colors duration-500 border-b border-primary hover:border-accent pb-2">
            Explore Collection
          </button>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-primary text-primary-foreground py-32 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-24 max-w-3xl mx-auto"
          >
            <h2 className="text-[10px] uppercase tracking-[0.3em] text-accent mb-4 font-medium">The Vanguard Advantage</h2>
            <h3 className="text-5xl md:text-6xl font-serif mb-6 font-light">Redefining Luxury</h3>
            <p className="text-white/60 font-light text-base md:text-lg leading-relaxed">
              We provide an unparalleled standard of service, combining global reach with deep local knowledge to deliver exceptional results for our discerning clientele.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12">
            {[
              { icon: Globe, title: "Global Network", desc: "Access to a worldwide network of elite buyers and exclusive off-market properties." },
              { icon: Shield, title: "Absolute Discretion", desc: "Unwavering commitment to privacy and confidentiality in all our transactions." },
              { icon: Award, title: "Market Expertise", desc: "Decades of combined experience navigating the complexities of the ultra-luxury market." }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, delay: idx * 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-center group"
              >
                <div className="w-16 h-16 mx-auto border border-white/20 rounded-full flex items-center justify-center mb-8 text-accent group-hover:scale-110 group-hover:border-accent transition-all duration-700 ease-luxury">
                  <feature.icon size={24} className="group-hover:text-white transition-colors duration-500" />
                </div>
                <h4 className="text-2xl font-serif mb-4 font-light tracking-wide">{feature.title}</h4>
                <p className="text-white/60 font-light text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Agent Highlight */}
      <section className="py-32 px-6 md:px-12 max-w-[1400px] mx-auto flex flex-col md:flex-row items-center gap-20">
        <div className="w-full md:w-1/2">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-accent/20 transform translate-x-4 translate-y-4 z-0 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform duration-700 ease-luxury"></div>
            <img 
              src={agents[0].image} 
              alt={agents[0].name}
              className="relative z-10 w-full h-[600px] object-cover"
            />
          </motion.div>
        </div>
        
        <div className="w-full md:w-1/2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-[10px] uppercase tracking-[0.3em] text-accent mb-4 font-medium">Meet Our Experts</h2>
            <h3 className="text-5xl md:text-6xl font-serif text-primary mb-8 font-light">Guided by Excellence</h3>
            <p className="text-muted-foreground font-light text-base md:text-lg mb-10 leading-relaxed max-w-xl">
              Our team of senior advisors represents the pinnacle of real estate professionalism. With unmatched market insight and a dedication to client success, we transform your real estate aspirations into reality.
            </p>
            
            <div className="mb-10 flex items-center gap-6">
              <div className="w-12 h-[1px] bg-accent/50"></div>
              <div>
                <h4 className="font-serif text-3xl text-primary">{agents[0].name}</h4>
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-2 font-medium">{agents[0].title}</p>
              </div>
            </div>
            
            <button onClick={() => navigate(`/agent/${agents[0].id}`)} className="bg-primary hover:bg-accent hover:shadow-xl hover:-translate-y-1 text-white px-10 py-5 uppercase tracking-[0.2em] text-[10px] font-medium transition-all duration-500 ease-luxury inline-block">
              View Profile
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
