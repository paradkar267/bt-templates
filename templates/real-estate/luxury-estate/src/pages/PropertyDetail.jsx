import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bed, Bath, Square, ChevronLeft, ChevronRight, X, Phone, Mail, Check, Video } from 'lucide-react';
import { properties, agents } from '../data/mockData';
import PropertyCard from '../components/PropertyCard';

export default function PropertyDetail() {
  const { id } = useParams();
  const property = properties.find(p => p.id === id);
  const agent = property ? agents.find(a => a.id === property.agentId) : null;
  const similarProperties = properties.filter(p => p.type === property?.type && p.id !== property?.id).slice(0, 3);
  
  const [activeImage, setActiveImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!property) return <div className="pt-32 text-center text-2xl font-serif">Property not found.</div>;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  const nextImage = () => setActiveImage((prev) => (prev + 1) % property.images.length);
  const prevImage = () => setActiveImage((prev) => (prev === 0 ? property.images.length - 1 : prev - 1));

  return (
    <div className="pt-20">
      {/* Gallery Header */}
      <div className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden bg-muted group cursor-pointer" onClick={() => setLightboxOpen(true)}>
        <motion.img
          key={activeImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          src={property.images[activeImage]}
          alt={property.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-300" />
        
        {/* Gallery Controls */}
        <div className="absolute bottom-6 right-6 flex space-x-2 z-10" onClick={(e) => e.stopPropagation()}>
          <button onClick={prevImage} className="bg-white/10 hover:bg-white/30 backdrop-blur-md text-white p-4 transition-colors duration-500 rounded-[1px]">
            <ChevronLeft size={24} strokeWidth={1} />
          </button>
          <button onClick={nextImage} className="bg-white/10 hover:bg-white/30 backdrop-blur-md text-white p-4 transition-colors duration-500 rounded-[1px]">
            <ChevronRight size={24} strokeWidth={1} />
          </button>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-md text-white px-6 py-3 text-[10px] tracking-[0.3em] font-medium uppercase rounded-[1px]">
          {activeImage + 1} / {property.images.length}
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 py-16 flex flex-col lg:flex-row gap-16">
        {/* Main Content */}
        <div className="w-full lg:w-2/3">
          <div className="mb-12">
            <h1 className="text-5xl md:text-6xl font-serif mb-6 font-light">{property.title}</h1>
            <p className="text-lg md:text-xl text-muted-foreground font-light tracking-wide">{property.address}</p>
          </div>

          <div className="flex flex-wrap items-center gap-10 py-8 border-y border-border/40 mb-16">
            <div className="text-4xl font-serif text-primary font-light">{formatPrice(property.price)}</div>
            <div className="h-10 w-px bg-border/50 hidden md:block"></div>
            <div className="flex items-center space-x-3 text-sm uppercase tracking-[0.15em] font-medium text-muted-foreground">
              <Bed className="text-accent" size={18} /> <span>{property.bedrooms} Beds</span>
            </div>
            <div className="flex items-center space-x-3 text-sm uppercase tracking-[0.15em] font-medium text-muted-foreground">
              <Bath className="text-accent" size={18} /> <span>{property.bathrooms} Baths</span>
            </div>
            <div className="flex items-center space-x-3 text-sm uppercase tracking-[0.15em] font-medium text-muted-foreground">
              <Square className="text-accent" size={18} /> <span>{property.sqft.toLocaleString()} Sq Ft</span>
            </div>
          </div>

          <div className="mb-20">
            <h2 className="text-[10px] uppercase tracking-[0.3em] text-accent mb-6 font-medium">About this Property</h2>
            <p className="text-base md:text-lg text-primary/80 leading-relaxed font-light">
              {property.description}
            </p>
          </div>

          <div className="mb-20">
            <h2 className="text-[10px] uppercase tracking-[0.3em] text-accent mb-8 font-medium">Amenities & Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
              {property.features.map((feature, idx) => (
                <div key={idx} className="flex items-center space-x-4 text-base font-light text-primary/80">
                  <Check size={16} className="text-accent flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Virtual Tour Placeholder */}
          <div className="mb-20">
            <h2 className="text-[10px] uppercase tracking-[0.3em] text-accent mb-8 font-medium">Virtual Tour</h2>
            <div className="w-full aspect-video bg-muted border border-border/40 flex flex-col items-center justify-center cursor-pointer group relative overflow-hidden">
              <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors duration-700 ease-luxury"></div>
              <div className="w-20 h-20 bg-background/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-700 ease-luxury mb-6 text-primary z-10">
                <Video size={24} strokeWidth={1} />
              </div>
              <p className="uppercase tracking-[0.2em] text-[10px] text-primary font-medium z-10">Explore 3D Tour</p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-1/3">
          <div className="sticky top-32 border border-border/40 p-10 bg-background shadow-2xl">
            <h3 className="text-[10px] uppercase tracking-[0.3em] text-accent mb-8 font-medium">Listed By</h3>
            
            <div className="flex items-center space-x-5 mb-8">
              <img src={agent.image} alt={agent.name} className="w-20 h-20 rounded-[2px] object-cover" />
              <div>
                <h4 className="font-serif text-2xl font-light">{agent.name}</h4>
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-2">{agent.title}</p>
              </div>
            </div>

            <div className="space-y-4 mb-10 text-sm font-light text-primary/80">
              <a href={`tel:${agent.phone}`} className="flex items-center space-x-3 hover:text-accent transition-colors duration-300">
                <Phone size={14} /> <span>{agent.phone}</span>
              </a>
              <a href={`mailto:${agent.email}`} className="flex items-center space-x-3 hover:text-accent transition-colors duration-300">
                <Mail size={14} /> <span>{agent.email}</span>
              </a>
            </div>

            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder="YOUR NAME" className="w-full bg-transparent border-b border-border/50 p-3 text-[11px] uppercase tracking-[0.1em] font-light outline-none focus:border-accent transition-colors duration-500 placeholder:text-muted-foreground" />
              <input type="email" placeholder="YOUR EMAIL" className="w-full bg-transparent border-b border-border/50 p-3 text-[11px] uppercase tracking-[0.1em] font-light outline-none focus:border-accent transition-colors duration-500 placeholder:text-muted-foreground" />
              <input type="tel" placeholder="PHONE NUMBER" className="w-full bg-transparent border-b border-border/50 p-3 text-[11px] uppercase tracking-[0.1em] font-light outline-none focus:border-accent transition-colors duration-500 placeholder:text-muted-foreground" />
              <textarea placeholder="I AM INTERESTED IN..." rows="3" className="w-full bg-transparent border-b border-border/50 p-3 text-[11px] uppercase tracking-[0.1em] font-light outline-none focus:border-accent transition-colors duration-500 placeholder:text-muted-foreground resize-none"></textarea>
              <button type="submit" className="w-full bg-primary hover:bg-accent text-white py-5 uppercase tracking-[0.2em] text-[10px] font-medium transition-colors duration-500 mt-4">
                Request Information
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Similar Properties */}
      {similarProperties.length > 0 && (
        <div className="bg-muted py-24 px-6 md:px-12">
          <div className="container mx-auto">
            <h2 className="text-3xl font-serif mb-12">Similar Properties</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {similarProperties.map(p => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          >
            <button 
              onClick={() => setLightboxOpen(false)}
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-50"
            >
              <X size={32} />
            </button>
            
            <button onClick={prevImage} className="absolute left-6 text-white/50 hover:text-white transition-colors z-50 p-4">
              <ChevronLeft size={48} />
            </button>
            
            <img 
              src={property.images[activeImage]} 
              alt="Gallery"
              className="max-h-[90vh] max-w-[90vw] object-contain"
            />
            
            <button onClick={nextImage} className="absolute right-6 text-white/50 hover:text-white transition-colors z-50 p-4">
              <ChevronRight size={48} />
            </button>

            <div className="absolute bottom-6 text-white/50 text-sm uppercase tracking-widest">
              {activeImage + 1} / {property.images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
