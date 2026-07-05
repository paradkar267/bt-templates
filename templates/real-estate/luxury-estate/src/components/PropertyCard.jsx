import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bed, Bath, Square } from 'lucide-react';

export default function PropertyCard({ property }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="group block bg-background border border-border/40 rounded-[2px] overflow-hidden hover:shadow-xl hover:border-border transition-all duration-700 ease-luxury"
    >
      <Link to={`/property/${property.id}`} className="block relative overflow-hidden aspect-[4/5]">
        {/* Image with slow zoom effect on hover */}
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-[1500ms] ease-luxury z-10" />
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-[1500ms] ease-luxury group-hover:scale-105"
        />

        {/* Badge */}
        {property.featured && (
          <div className="absolute top-4 left-4 z-20 bg-primary/90 backdrop-blur-sm text-primary-foreground text-[10px] uppercase tracking-[0.2em] px-4 py-2 rounded-sm font-medium">
            Featured
          </div>
        )}
      </Link>

      <div className="p-6 space-y-3">
        <div className="flex justify-between items-start">
          <Link to={`/property/${property.id}`} className="block">
            <h3 className="font-serif text-2xl text-primary group-hover:text-accent transition-colors duration-500">{property.title}</h3>
          </Link>
          <span className="font-sans font-light text-lg text-primary tracking-wide">{formatPrice(property.price)}</span>
        </div>

        <p className="text-muted-foreground text-sm truncate font-light tracking-wide">{property.address}</p>

        <div className="flex items-center space-x-6 pt-4 border-t border-border/30 text-[11px] uppercase tracking-[0.15em] text-muted-foreground font-medium">
          <div className="flex items-center space-x-2">
            <Bed size={14} className="text-accent" />
            <span>{property.bedrooms} Beds</span>
          </div>
          <div className="flex items-center space-x-2">
            <Bath size={14} className="text-accent" />
            <span>{property.bathrooms} Baths</span>
          </div>
          <div className="flex items-center space-x-2">
            <Square size={14} className="text-accent" />
            <span>{property.sqft.toLocaleString()} Sq Ft</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
