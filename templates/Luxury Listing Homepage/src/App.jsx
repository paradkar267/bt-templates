import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './index.css';

// Mock Data for Properties
const PROPERTIES = [
  {
    id: 1,
    title: "The Glass Pavilion",
    location: "Bel Air, CA",
    type: "Mansion",
    price: 34500000,
    priceStr: "$34,500,000",
    beds: 7,
    baths: 11,
    sqft: "14,000",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",
    features: ["Infinity Pool", "Wine Cellar", "Home Theater", "Panoramic Views"]
  },
  {
    id: 2,
    title: "Coastal Modern Masterpiece",
    location: "Malibu, CA",
    type: "Villa",
    price: 22000000,
    priceStr: "$22,000,000",
    beds: 5,
    baths: 7,
    sqft: "8,500",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop",
    features: ["Private Beach", "Smart Home", "Guest House", "Ocean Front"]
  },
  {
    id: 3,
    title: "Urban Skyline Penthouse",
    location: "New York, NY",
    type: "Penthouse",
    price: 18500000,
    priceStr: "$18,500,000",
    beds: 4,
    baths: 5,
    sqft: "6,200",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200&auto=format&fit=crop",
    features: ["Wrap-around Terrace", "Private Elevator", "Chef's Kitchen", "Doorman"]
  },
  {
    id: 4,
    title: "Desert Oasis Retreat",
    location: "Scottsdale, AZ",
    type: "Estate",
    price: 12900000,
    priceStr: "$12,900,000",
    beds: 6,
    baths: 8,
    sqft: "10,500",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200&auto=format&fit=crop",
    features: ["Golf Course Access", "Resort Pool", "Spa", "Motor Court"]
  },
  {
    id: 5,
    title: "Alpine Ski Chalet",
    location: "Aspen, CO",
    type: "Chalet",
    price: 28000000,
    priceStr: "$28,000,000",
    beds: 8,
    baths: 10,
    sqft: "12,000",
    image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=1200&auto=format&fit=crop",
    features: ["Ski-in/Ski-out", "Indoor Pool", "Heated Driveway", "Vaulted Ceilings"]
  },
  {
    id: 6,
    title: "Historic French Chateau",
    location: "Provence, FR",
    type: "Chateau",
    price: 45000000,
    priceStr: "$45,000,000",
    beds: 12,
    baths: 14,
    sqft: "22,000",
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=1200&auto=format&fit=crop",
    features: ["Vineyard", "Helipad", "Equestrian Facilities", "Staff Quarters"]
  }
];

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeProperty, setActiveProperty] = useState(null); // For Quick View Modal
  
  // Filter States
  const [filterLocation, setFilterLocation] = useState('All');
  const [filterType, setFilterType] = useState('All');
  const [filteredProps, setFilteredProps] = useState(PROPERTIES);

  // Mortgage Calculator States
  const [calcPrice, setCalcPrice] = useState(10000000);
  const [calcDown, setCalcDown] = useState(20); // percentage
  const [calcRate, setCalcRate] = useState(6.5);
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  // Toast Notification
  const [toasts, setToasts] = useState([]);

  // Handle Scroll for Navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter Logic
  const handleSearch = () => {
    let result = PROPERTIES;
    if (filterLocation !== 'All') {
      result = result.filter(p => p.location.includes(filterLocation) || p.location.includes(filterLocation.split(',')[1]?.trim() || filterLocation));
    }
    if (filterType !== 'All') {
      result = result.filter(p => p.type === filterType);
    }
    setFilteredProps(result);
    addToast("Search filters applied successfully");
  };

  // Mortgage Calculation Logic
  useEffect(() => {
    const principal = calcPrice - (calcPrice * (calcDown / 100));
    const monthlyRate = (calcRate / 100) / 12;
    const payments = 30 * 12; // 30 year fixed
    
    if (monthlyRate === 0) {
      setMonthlyPayment(principal / payments);
    } else {
      const mathPower = Math.pow(1 + monthlyRate, payments);
      const payment = principal * ((monthlyRate * mathPower) / (mathPower - 1));
      setMonthlyPayment(payment);
    }
  }, [calcPrice, calcDown, calcRate]);

  // Toast Helper
  const addToast = (message) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  const handleViewingRequest = (e) => {
    e.preventDefault();
    addToast("Private viewing request submitted securely.");
    setActiveProperty(null);
  };

  return (
    <div className="app-container">
      {/* Toast Notifications */}
      <div className="toast-container">
        <AnimatePresence>
          {toasts.map(toast => (
            <motion.div 
              key={toast.id}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              className="toast"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              {toast.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Dynamic Navbar */}
      <nav className={`navbar ${isScrolled || isMenuOpen ? 'scrolled' : ''}`}>
        <div className="nav-left">
          <a href="#" className="logo">EstateFlow</a>
        </div>
        
        <div className="nav-right">
          {!isMenuOpen && (
            <button className="btn-black" style={{ display: window.innerWidth > 768 ? 'flex' : 'none' }}>
              List Property
            </button>
          )}
          <button 
            className={`menu-toggle ${isMenuOpen ? 'open' : ''}`} 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Mega Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="mega-menu-overlay"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="menu-content">
              <div className="menu-links">
                <motion.a 
                  href="#" className="menu-link-item active"
                  initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
                >The Collection</motion.a>
                <motion.a 
                  href="#" className="menu-link-item"
                  initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                >Acquisitions</motion.a>
                <motion.a 
                  href="#" className="menu-link-item"
                  initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
                >New Developments</motion.a>
                <motion.a 
                  href="#" className="menu-link-item"
                  initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
                >Advisory Board</motion.a>
              </div>
              <motion.div 
                className="menu-info"
                initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
              >
                <h3>Global Headquarters</h3>
                <p>1200 Avenue of the Americas<br/>New York, NY 10036</p>
                <br/>
                <p>Private Line: +1 (800) 555-0199</p>
                <p>Email: concierge@estateflow.com</p>
                
                <button className="btn-gold" style={{ marginTop: '32px' }} onClick={() => {setIsMenuOpen(false); addToast("Contact initiated.")}}>
                  Contact Concierge
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <header className="hero">
        <motion.div 
          className="hero-bg"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1920&auto=format&fit=crop" alt="Luxury Home" />
        </motion.div>
        
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="badge badge-white">THE PRIVATE COLLECTION</span>
            <h1 className="hero-title">
              Residing in Architectural Masterpieces.
            </h1>
            <p className="hero-subtitle">
              Access unlisted off-market properties and bespoke acquisition services tailored for the discerning collector.
            </p>
            <button className="btn-white">Explore Portfolio</button>
          </motion.div>
        </div>

        {/* Floating Search Console */}
        <motion.div 
          className="filter-console"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="filter-group">
            <label>Location</label>
            <select value={filterLocation} onChange={(e) => setFilterLocation(e.target.value)}>
              <option value="All">Global Destinations</option>
              <option value="CA">California</option>
              <option value="NY">New York</option>
              <option value="CO">Colorado</option>
              <option value="FR">France</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Property Type</label>
            <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
              <option value="All">All Types</option>
              <option value="Mansion">Mansion</option>
              <option value="Villa">Villa</option>
              <option value="Penthouse">Penthouse</option>
              <option value="Chateau">Chateau</option>
            </select>
          </div>
          <button className="search-btn" onClick={handleSearch} aria-label="Search Properties">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </motion.div>
      </header>

      {/* Curated Standard Section */}
      <section className="curated-section">
        <div className="section-header">
          <h2 className="serif-title">Curated Curations</h2>
          <p style={{ color: 'var(--color-text-muted)', maxWidth: '600px', margin: '0 auto' }}>
            A restricted selection of the world's most exceptional residential architectures. Our Private Collection features properties that transcend living spaces, becoming habitable art.
          </p>
        </div>

        <motion.div layout className="collections-grid">
          <AnimatePresence>
            {filteredProps.map((property) => (
              <motion.div 
                key={property.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="property-card"
              >
                <div className="property-img-wrapper">
                  <span className="property-badge">EXCLUSIVE</span>
                  <img src={property.image} alt={property.title} />
                  
                  {/* Quick View Overlay trigger */}
                  <div className="quick-view-overlay">
                    <button className="quick-view-btn" onClick={() => setActiveProperty(property)}>
                      Quick View
                    </button>
                  </div>
                </div>
                
                <div className="property-details">
                  <div className="property-price">{property.priceStr}</div>
                  <h3 className="property-title">{property.title}</h3>
                  <div className="property-meta">
                    <span className="meta-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                      {property.beds} Beds
                    </span>
                    <span className="meta-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 12h20M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M10 8V4a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v4"></path></svg>
                      {property.baths} Baths
                    </span>
                    <span className="meta-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg>
                      {property.sqft} SqFt
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {filteredProps.length === 0 && (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px', color: 'var(--color-text-muted)' }}>
              No properties found matching your criteria. Try adjusting the filters.
            </div>
          )}
        </motion.div>
      </section>

      {/* Discretion Section & Mortgage Calculator */}
      <section className="discretion-section">
        <div className="discretion-bg"></div>
        <div className="discretion-content">
          <h2 className="serif-title-white">Financial Advisory</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '48px' }}>
            Calculate estimated monthly obligations for our premium listings. Note that property taxes and private insurance are not included.
          </p>
          
          <div style={{ backgroundColor: 'var(--color-white)', padding: '40px', borderRadius: '8px', textAlign: 'left' }}>
            <div className="form-group">
              <label>Home Price ($)</label>
              <input 
                type="number" 
                value={calcPrice} 
                onChange={(e) => setCalcPrice(Number(e.target.value))}
                min="1000000"
                step="500000"
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div className="form-group">
                <label>Down Payment (%)</label>
                <input 
                  type="number" 
                  value={calcDown} 
                  onChange={(e) => setCalcDown(Number(e.target.value))}
                  min="0"
                  max="100"
                />
              </div>
              <div className="form-group">
                <label>Interest Rate (%)</label>
                <input 
                  type="number" 
                  value={calcRate} 
                  onChange={(e) => setCalcRate(Number(e.target.value))}
                  min="0.1"
                  step="0.1"
                />
              </div>
            </div>
            
            <div className="calculator-result">
              <h4>Estimated Monthly Payment</h4>
              <div className="amount">
                ${monthlyPayment.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-brand">
            <h3 className="logo-text">EstateFlow</h3>
            <p>Defining the global standard for luxury real estate and architectural excellence since 2024.</p>
            <div className="social-icons">
              <a href="#"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg></a>
              <a href="#"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg></a>
              <a href="#"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
            </div>
          </div>
          
          <div className="footer-links">
            <div className="link-column">
              <h4>PORTFOLIO</h4>
              <a href="#">The Private Collection</a>
              <a href="#">Coastal Residences</a>
              <a href="#">Urban Penthouses</a>
              <a href="#">Architectural Heritage</a>
            </div>
            <div className="link-column">
              <h4>COMPANY</h4>
              <a href="#">About Us</a>
              <a href="#">Journal</a>
              <a href="#">Advisory Board</a>
              <a href="#">Contact Us</a>
            </div>
            <div className="link-column">
              <h4>LEGAL</h4>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookie Settings</a>
              <a href="#">Accessibility</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© 2024 EstateFlow Global. All rights reserved.</p>
          <div className="bottom-links">
            <a href="#">Sitemap</a>
            <a href="#">Global Offices</a>
          </div>
        </div>
      </footer>

      {/* Property Quick View Modal Overlay */}
      <AnimatePresence>
        {activeProperty && (
          <div className="modal-backdrop" onClick={() => setActiveProperty(null)}>
            <motion.div 
              className="modal-container"
              onClick={e => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <button className="modal-close" onClick={() => setActiveProperty(null)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
              
              <div className="modal-image">
                <img src={activeProperty.image} alt={activeProperty.title} />
              </div>
              
              <div className="modal-content">
                <span className="badge badge-black">EXCLUSIVE</span>
                <h2 className="modal-title">{activeProperty.title}</h2>
                <p style={{ color: 'var(--color-text-muted)', marginBottom: '16px' }}>{activeProperty.location} — {activeProperty.type}</p>
                <div className="modal-price">{activeProperty.priceStr}</div>
                
                <div className="modal-features">
                  <div className="feature-box">
                    <span className="feature-value">{activeProperty.beds}</span>
                    <span className="feature-label">Bedrooms</span>
                  </div>
                  <div className="feature-box">
                    <span className="feature-value">{activeProperty.baths}</span>
                    <span className="feature-label">Bathrooms</span>
                  </div>
                  <div className="feature-box">
                    <span className="feature-value">{activeProperty.sqft}</span>
                    <span className="feature-label">Square Feet</span>
                  </div>
                  <div className="feature-box">
                    <span className="feature-value">2023</span>
                    <span className="feature-label">Built Year</span>
                  </div>
                </div>

                <div style={{ marginBottom: '32px' }}>
                  <h4 style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>Key Amenities</h4>
                  <ul style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '14px', color: 'var(--color-text-muted)' }}>
                    {activeProperty.features.map((f, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="modal-actions">
                  <form onSubmit={handleViewingRequest} style={{ display: 'flex', gap: '12px' }}>
                    <input type="email" placeholder="Your Email Address" required style={{ flex: 1, padding: '12px 16px', border: '1px solid var(--border-color)', borderRadius: '4px', outline: 'none' }} />
                    <button type="submit" className="btn-black">Request Viewing</button>
                  </form>
                  <button className="btn-outline" style={{ color: 'var(--color-text-main)', borderColor: 'var(--border-color)' }} onClick={() => setActiveProperty(null)}>Close Details</button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
