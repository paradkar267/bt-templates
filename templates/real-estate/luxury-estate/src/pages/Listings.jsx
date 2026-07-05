import { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Filter, Map as MapIcon, List as ListIcon, X } from 'lucide-react';
import PropertyCard from '../components/PropertyCard';
import { properties } from '../data/mockData';
import { motion, AnimatePresence } from 'framer-motion';

export default function Listings() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get('q') || '';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'map'
  const [showFilters, setShowFilters] = useState(false);
  
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    type: 'All',
    beds: 'Any'
  });

  const propertyTypes = ['All', ...new Set(properties.map(p => p.type))];

  const filteredProperties = useMemo(() => {
    return properties.filter(p => {
      // Search
      if (searchQuery && !p.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !p.address.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      // Price
      if (filters.minPrice && p.price < parseInt(filters.minPrice)) return false;
      if (filters.maxPrice && p.price > parseInt(filters.maxPrice)) return false;
      // Type
      if (filters.type !== 'All' && p.type !== filters.type) return false;
      // Beds
      if (filters.beds !== 'Any' && p.bedrooms < parseInt(filters.beds)) return false;
      
      return true;
    });
  }, [searchQuery, filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="pt-24 min-h-screen">
      <div className="container mx-auto px-6 md:px-12 py-8 flex flex-col lg:flex-row gap-8">
        
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden flex justify-between items-center border-b border-border pb-4">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 text-sm uppercase tracking-widest font-medium"
          >
            <Filter size={18} />
            <span>Filters</span>
          </button>
          <div className="flex space-x-4">
            <button onClick={() => setViewMode('grid')} className={viewMode === 'grid' ? 'text-accent' : 'text-muted-foreground'}><ListIcon size={20}/></button>
            <button onClick={() => setViewMode('map')} className={viewMode === 'map' ? 'text-accent' : 'text-muted-foreground'}><MapIcon size={20}/></button>
          </div>
        </div>

        {/* Sidebar Filters */}
        <AnimatePresence>
          {(showFilters || window.innerWidth >= 1024) && (
            <motion.aside 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className={`w-full lg:w-1/4 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}
            >
              <div className="sticky top-32 space-y-8">
                <div>
                  <h3 className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-4 font-medium">Search</h3>
                  <input 
                    type="text" 
                    placeholder="Location or keyword" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent border-b border-border/50 py-3 text-sm outline-none focus:border-accent transition-colors duration-500 font-light"
                  />
                </div>

                <div>
                  <h3 className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-4 font-medium mt-10">Price Range</h3>
                  <div className="flex gap-4">
                    <input 
                      type="number" 
                      name="minPrice"
                      placeholder="Min" 
                      value={filters.minPrice}
                      onChange={handleFilterChange}
                      className="w-1/2 bg-transparent border-b border-border py-2 outline-none focus:border-accent transition-colors"
                    />
                    <input 
                      type="number" 
                      name="maxPrice"
                      placeholder="Max" 
                      value={filters.maxPrice}
                      onChange={handleFilterChange}
                      className="w-1/2 bg-transparent border-b border-border/50 py-3 text-sm outline-none focus:border-accent transition-colors duration-500 font-light"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-4 font-medium mt-10">Property Type</h3>
                  <div className="space-y-4">
                    {propertyTypes.map(type => (
                      <label key={type} className="flex items-center space-x-3 cursor-pointer">
                        <input 
                          type="radio" 
                          name="type" 
                          value={type} 
                          checked={filters.type === type}
                          onChange={handleFilterChange}
                          className="accent-accent"
                        />
                        <span className="text-primary font-light text-sm">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-4 font-medium mt-10">Bedrooms</h3>
                  <select 
                    name="beds" 
                    value={filters.beds} 
                    onChange={handleFilterChange}
                    className="w-full bg-transparent border-b border-border/50 py-3 text-sm outline-none focus:border-accent transition-colors duration-500 font-light cursor-pointer"
                  >
                    <option value="Any">Any</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                    <option value="5">5+</option>
                  </select>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="w-full lg:w-3/4">
          <div className="hidden lg:flex justify-between items-end mb-12 border-b border-border/30 pb-6">
            <h1 className="text-4xl font-serif text-primary font-light">{filteredProperties.length} Properties</h1>
            <div className="flex space-x-6">
              <button 
                onClick={() => setViewMode('grid')} 
                className={`flex items-center space-x-2 text-[10px] uppercase tracking-[0.2em] font-medium transition-all duration-300 ${viewMode === 'grid' ? 'text-accent border-b border-accent pb-2' : 'text-muted-foreground hover:text-primary pb-2'}`}
              >
                <ListIcon size={16} /> <span>Grid</span>
              </button>
              <button 
                onClick={() => setViewMode('map')} 
                className={`flex items-center space-x-2 text-[10px] uppercase tracking-[0.2em] font-medium transition-all duration-300 ${viewMode === 'map' ? 'text-accent border-b border-accent pb-2' : 'text-muted-foreground hover:text-primary pb-2'}`}
              >
                <MapIcon size={16} /> <span>Map</span>
              </button>
            </div>
          </div>

          {filteredProperties.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-xl font-serif text-muted-foreground mb-4">No properties match your criteria.</p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setFilters({ minPrice: '', maxPrice: '', type: 'All', beds: 'Any' });
                }}
                className="text-sm uppercase tracking-widest text-accent hover:text-primary transition-colors border-b border-accent"
              >
                Clear Filters
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-10">
              {filteredProperties.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="h-[600px] bg-muted flex items-center justify-center border border-border">
              <div className="text-center">
                <MapIcon size={48} className="mx-auto text-muted-foreground mb-4 opacity-50" />
                <p className="font-serif text-xl text-muted-foreground">Interactive Map Integration</p>
                <p className="text-sm text-muted-foreground/70 mt-2">Mapbox or Google Maps would render here.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
