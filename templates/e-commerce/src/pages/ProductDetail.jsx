import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Truck, RefreshCw, ShieldCheck, ChevronRight, Star, Minus, Plus } from 'lucide-react';
import { products } from '../data/mockData';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import ProductCard from '../components/product/ProductCard';

export default function ProductDetail() {
  const { productId } = useParams();
  const product = products.find(p => p.id === productId);
  
  const { dispatch } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToast } = useToast();
  
  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('details');

  const isWished = product ? isInWishlist(product.id) : false;

  useEffect(() => {
    // Reset state when product changes
    if (product) {
      setActiveImage(0);
      setSelectedColor(product.colors?.[0]);
      setSelectedSize(product.sizes?.[0]);
      setQuantity(1);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h2 className="text-3xl font-serif mb-4">Product Not Found</h2>
        <Link to="/" className="text-accent hover:underline">Return to Home</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch({ 
      type: 'ADD_ITEM', 
      payload: { 
        ...product, 
        quantity, 
        color: selectedColor, 
        size: selectedSize 
      } 
    });
    addToast(`Added ${quantity} ${product.name} to cart`, 'success');
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product.id);
    addToast(isWished ? 'Removed from wishlist' : 'Added to wishlist', 'info');
  };

  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="container mx-auto px-4 lg:px-8 py-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center text-sm text-muted-foreground mb-8">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <ChevronRight size={14} className="mx-2" />
        <Link to={`/category/${product.category}`} className="hover:text-foreground capitalize">{product.category}</Link>
        <ChevronRight size={14} className="mx-2" />
        <span className="text-foreground font-medium">{product.name}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
        {/* Image Gallery */}
        <div className="w-full lg:w-1/2 flex flex-col-reverse md:flex-row gap-4">
          {/* Thumbnails */}
          <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto max-h-[600px] no-scrollbar">
            {product.images.map((img, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`flex-shrink-0 w-20 h-24 bg-muted overflow-hidden border-2 transition-all ${
                  activeImage === idx ? 'border-foreground' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
          
          {/* Main Image */}
          <div className="flex-1 bg-muted relative aspect-[3/4] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img 
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                src={product.images[activeImage]} 
                alt={product.name} 
                className="absolute inset-0 w-full h-full object-cover cursor-zoom-in hover:scale-105 transition-transform duration-700"
              />
            </AnimatePresence>
            
            {/* Badges */}
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
              {product.isNew && (
                <span className="bg-foreground text-background text-xs font-bold px-3 py-1.5 uppercase tracking-wider">
                  New
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">{product.name}</h1>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            
            <div className="h-4 w-px bg-border"></div>
            
            <div className="flex items-center gap-1 text-sm">
              <div className="flex text-accent">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'} />
                ))}
              </div>
              <span className="text-muted-foreground ml-1">({product.reviews} Reviews)</span>
            </div>
          </div>

          <p className="text-muted-foreground mb-8 leading-relaxed">
            {product.description}
          </p>

          {/* Variants */}
          <div className="space-y-6 mb-8">
            {product.colors && (
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="font-medium text-sm">Color</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-full border-2 focus:outline-none transition-all ${
                        selectedColor === color ? 'border-foreground p-0.5' : 'border-border hover:border-muted-foreground'
                      }`}
                      aria-label={`Select color ${color}`}
                    >
                      <span className="block w-full h-full rounded-full" style={{ backgroundColor: color }}></span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.sizes && (
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="font-medium text-sm">Size</span>
                  <button className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors">
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-12 h-10 px-4 border text-sm font-medium transition-all ${
                        selectedSize === size 
                          ? 'border-foreground bg-foreground text-background' 
                          : 'border-border hover:border-foreground/50'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Quantity */}
            <div>
              <span className="font-medium text-sm mb-3 block">Quantity</span>
              <div className="flex items-center border border-border w-32">
                <button 
                  className="flex-1 py-3 flex items-center justify-center hover:bg-muted text-muted-foreground transition-colors"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus size={16} />
                </button>
                <span className="flex-1 text-center font-medium">{quantity}</span>
                <button 
                  className="flex-1 py-3 flex items-center justify-center hover:bg-muted text-muted-foreground transition-colors"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 mb-10">
            <button 
              onClick={handleAddToCart}
              className="flex-1 bg-foreground text-background py-4 font-bold uppercase tracking-widest rounded-md shadow-sm hover:shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              Add To Cart
            </button>
            <button 
              onClick={handleToggleWishlist}
              className="w-14 h-14 border border-border rounded-md shadow-sm hover:shadow-md flex items-center justify-center hover:bg-muted active:scale-[0.98] transition-all text-foreground"
            >
              <Heart size={20} fill={isWished ? 'currentColor' : 'none'} className={isWished ? 'text-danger' : ''} />
            </button>
          </div>

          {/* Value Props */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-6 border-y border-border mb-10">
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Truck size={20} className="text-foreground" />
              <span>Complimentary shipping on orders over $200.</span>
            </div>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <RefreshCw size={20} className="text-foreground" />
              <span>Free returns within 30 days of purchase.</span>
            </div>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <ShieldCheck size={20} className="text-foreground" />
              <span>2-year warranty on all products.</span>
            </div>
          </div>

          {/* Tabs */}
          <div>
            <div className="flex border-b border-border mb-6">
              {['details', 'shipping', 'sustainability'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 px-1 mr-8 text-sm font-medium capitalize border-b-2 transition-all ${
                    activeTab === tab ? 'border-foreground text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            
            <div className="text-sm text-muted-foreground leading-relaxed min-h-[150px]">
              {activeTab === 'details' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <p>{product.description}</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Premium materials sourced ethically</li>
                    <li>Designed in our studio</li>
                    <li>Care: Dry clean only or wipe with damp cloth</li>
                    <li>Imported</li>
                  </ul>
                </motion.div>
              )}
              {activeTab === 'shipping' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <p>Standard delivery typically takes 3-5 business days. We offer expedited shipping options at checkout.</p>
                  <p>International shipping is available to select countries. Duties and taxes are calculated at checkout.</p>
                </motion.div>
              )}
              {activeTab === 'sustainability' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <p>We are committed to minimizing our environmental impact. This product is shipped in 100% recyclable, plastic-free packaging.</p>
                  <p>Our manufacturing partners are certified for fair labor practices and environmental responsibility.</p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-24 pt-16 border-t border-border">
          <h2 className="text-2xl font-serif font-bold mb-8 text-center">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {relatedProducts.map(related => (
              <ProductCard key={related.id} product={related} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
