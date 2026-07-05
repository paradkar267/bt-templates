import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { SlidersHorizontal, ChevronDown, LayoutGrid, List } from 'lucide-react';
import ProductCard from '../components/product/ProductCard';
import { products, categories } from '../data/mockData';

export default function ProductList() {
  const { categoryId } = useParams();
  const [view, setView] = useState('grid');
  const [sort, setSort] = useState('featured');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const category = categories.find(c => c.id === categoryId);
  
  const filteredProducts = useMemo(() => {
    let result = products;
    if (categoryId) {
      result = result.filter(p => p.category === categoryId);
    }
    
    // Sort
    switch (sort) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1));
        break;
      default:
        break; // featured
    }
    
    return result;
  }, [categoryId, sort]);

  return (
    <div className="container mx-auto px-4 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-12 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
          {category ? category.name : 'All Products'}
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Explore our collection of premium {category ? category.name.toLowerCase() : 'goods'}, carefully curated for quality and timeless design.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden flex justify-between items-center pb-4 border-b border-border">
          <button 
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="flex items-center gap-2 font-medium"
          >
            <SlidersHorizontal size={20} />
            Filters
          </button>
          <span className="text-sm text-muted-foreground">{filteredProducts.length} Results</span>
        </div>

        {/* Sidebar Filters */}
        <aside className={`w-full lg:w-64 flex-shrink-0 ${filtersOpen ? 'block' : 'hidden lg:block'}`}>
          <div className="space-y-8 sticky top-28">
            <div>
              <h3 className="font-semibold mb-4 text-lg">Category</h3>
              <ul className="space-y-3">
                <li>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 accent-foreground" defaultChecked={!categoryId} />
                    <span>All</span>
                  </label>
                </li>
                {categories.map(c => (
                  <li key={c.id}>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 accent-foreground cursor-pointer" 
                        checked={c.id === categoryId}
                        readOnly
                      />
                      <span className="group-hover:text-accent transition-colors">{c.name}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-border pt-8">
              <h3 className="font-semibold mb-4 text-lg">Price Range</h3>
              <div className="space-y-4">
                <input type="range" className="w-full accent-foreground" min="0" max="1000" defaultValue="500" />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>$0</span>
                  <span>$500+</span>
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-8">
              <h3 className="font-semibold mb-4 text-lg">Colors</h3>
              <div className="flex flex-wrap gap-3">
                {['#000000', '#ffffff', '#8b4513', '#4b5563', '#c4a173', '#f5f5dc'].map((color, idx) => (
                  <button 
                    key={idx} 
                    className="w-8 h-8 rounded-full border border-border focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 transition-all hover:scale-110"
                    style={{ backgroundColor: color }}
                    aria-label={`Color ${idx}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Toolbar */}
          <div className="hidden lg:flex justify-between items-center mb-8 pb-4 border-b border-border">
            <span className="text-muted-foreground">{filteredProducts.length} Results</span>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 border-r border-border pr-6">
                <span className="text-sm font-medium mr-2">Sort by:</span>
                <select 
                  className="bg-transparent border-none text-sm font-medium focus:ring-0 cursor-pointer"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest Arrivals</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
              
              <div className="flex gap-2 text-muted-foreground">
                <button 
                  onClick={() => setView('grid')}
                  className={`p-2 transition-colors ${view === 'grid' ? 'text-foreground' : 'hover:text-foreground'}`}
                >
                  <LayoutGrid size={20} />
                </button>
                <button 
                  onClick={() => setView('list')}
                  className={`p-2 transition-colors ${view === 'list' ? 'text-foreground' : 'hover:text-foreground'}`}
                >
                  <List size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className={`grid gap-x-6 gap-y-10 ${view === 'grid' ? 'grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <h3 className="text-2xl font-serif mb-2">No products found</h3>
              <p className="text-muted-foreground">Try adjusting your filters or browse a different category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
