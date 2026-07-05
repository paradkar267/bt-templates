import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';

export default function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);
  const { dispatch } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToast } = useToast();

  const isWished = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch({ 
      type: 'ADD_ITEM', 
      payload: { 
        ...product, 
        quantity: 1, 
        color: product.colors?.[0], 
        size: product.sizes?.[0] 
      } 
    });
    addToast(`Added ${product.name} to cart`, 'success');
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    toggleWishlist(product.id);
    addToast(isWished ? 'Removed from wishlist' : 'Added to wishlist', 'info');
  };

  return (
    <Link 
      to={`/product/${product.id}`}
      className="group flex flex-col relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {product.isNew && (
          <span className="bg-foreground text-background text-xs font-bold px-2 py-1 uppercase tracking-wider">
            New
          </span>
        )}
        {product.originalPrice && (
          <span className="bg-accent text-accent-foreground text-xs font-bold px-2 py-1 uppercase tracking-wider">
            Sale
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button 
        onClick={handleToggleWishlist}
        className="absolute top-3 right-3 z-10 p-2 bg-background/80 backdrop-blur-sm rounded-full text-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background hover:scale-110 duration-200"
      >
        <Heart size={18} fill={isWished ? 'currentColor' : 'none'} className={isWished ? 'text-danger' : ''} />
      </button>

      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-muted mb-6 rounded-md shadow-sm group-hover:shadow-xl transition-shadow duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]">
        <img
          src={product.images[0]}
          alt={product.name}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${isHovered && product.images[1] ? 'opacity-0 scale-105' : 'opacity-100 scale-100'}`}
          loading="lazy"
        />
        {product.images[1] && (
          <img
            src={product.images[1]}
            alt={`${product.name} alternate`}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
            loading="lazy"
          />
        )}
        
        {/* Quick Add Overlay */}
        <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]">
          <button 
            onClick={handleAddToCart}
            className="w-full bg-background/95 backdrop-blur-md rounded text-foreground py-3.5 text-xs tracking-[0.2em] uppercase font-bold flex items-center justify-center gap-2 shadow-sm hover:shadow-md hover:bg-foreground hover:text-background active:scale-[0.98] transition-all duration-300"
          >
            <ShoppingBag size={16} strokeWidth={1.5} />
            Quick Add
          </button>
        </div>
      </div>

      {/* Details */}
      <div className="flex flex-col flex-1 px-1">
        <h3 className="text-sm tracking-wide font-sans mb-1.5 line-clamp-1 group-hover:text-accent transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center gap-3 mt-auto">
          <span className="text-sm tracking-wider">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through decoration-muted-foreground/40">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
        
        {/* Swatches (Visual only on card) */}
        {product.colors && (
          <div className="flex gap-1 mt-2">
            {product.colors.slice(0, 4).map((color, idx) => (
              <span 
                key={idx} 
                className="w-3 h-3 rounded-full border border-border"
                style={{ backgroundColor: color }}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-[10px] text-muted-foreground ml-1">+{product.colors.length - 4}</span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
