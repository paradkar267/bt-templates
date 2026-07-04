import React from 'react';
import './App.css';

function App() {
  return (
    <div className="app-container">
      {/* Top Navbar */}
      <nav className="navbar">
        <div className="navbar-left">
          <div className="logo">EstateFlow</div>
          <div className="nav-links">
            <a href="#" className="nav-link active">Buy</a>
            <a href="#" className="nav-link">Rent</a>
            <a href="#" className="nav-link">Commercial</a>
            <a href="#" className="nav-link">Luxury</a>
            <a href="#" className="nav-link">Agencies</a>
          </div>
        </div>
        
        <div className="navbar-right">
          <div className="nav-icons">
            <button className="icon-btn">♡</button>
            <button className="icon-btn">🔔</button>
            <button className="icon-btn">👤</button>
          </div>
          <button className="btn-list-property">List Property</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-bg-left"></div>
        <div className="hero-bg-right">
          {/* Abstract architecture background pattern */}
          <svg className="hero-pattern" width="100%" height="100%" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
             <path d="M0,600 L1000,0 L1000,600 Z" fill="rgba(240,240,240,0.8)" />
             <path d="M200,600 L1000,100 L1000,600 Z" fill="rgba(230,230,230,0.8)" />
             <path d="M400,600 L1000,200 L1000,600 Z" fill="rgba(220,220,220,0.8)" />
             <path d="M600,600 L1000,300 L1000,600 Z" fill="rgba(210,210,210,0.8)" />
             <line x1="0" y1="200" x2="1000" y2="-300" stroke="#fff" strokeWidth="20" />
             <line x1="0" y1="400" x2="1000" y2="-100" stroke="#fff" strokeWidth="20" />
             <line x1="0" y1="600" x2="1000" y2="100" stroke="#fff" strokeWidth="20" />
          </svg>
        </div>
        
        <div className="hero-content">
          <div className="hero-text-area">
            <h1 className="hero-title">
              Find a space that<br/>
              <span className="text-gray">defines your future.</span>
            </h1>
            <p className="hero-subtitle">
              Discover the most comprehensive collection of premium residential<br/>
              and commercial properties curated with professional precision.
            </p>
          </div>

          <div className="search-widget">
            <div className="search-field location-field">
              <label>LOCATION</label>
              <div className="input-with-icon">
                <span className="input-icon">📍</span>
                <input type="text" placeholder="City, Neighborhood..." />
              </div>
            </div>
            <div className="search-divider"></div>
            <div className="search-field dropdown-field">
              <label>PROPERTY TYPE</label>
              <div className="select-wrapper">
                <select>
                  <option>Any Type</option>
                  <option>House</option>
                  <option>Apartment</option>
                </select>
                <span className="dropdown-icon">▼</span>
              </div>
            </div>
            <div className="search-divider"></div>
            <div className="search-field dropdown-field flex-small">
              <label>BEDS</label>
              <div className="select-wrapper">
                <select>
                  <option>Any</option>
                  <option>1+</option>
                  <option>2+</option>
                  <option>3+</option>
                </select>
                <span className="dropdown-icon">▼</span>
              </div>
            </div>
            <div className="search-divider"></div>
            <div className="search-field dropdown-field">
              <label>PRICE RANGE</label>
              <div className="select-wrapper">
                <select>
                  <option>No Limit</option>
                  <option>Under $500k</option>
                  <option>$500k - $1M</option>
                </select>
                <span className="dropdown-icon">▼</span>
              </div>
            </div>
            <button className="btn-search">
              <span className="search-btn-icon">🔍</span> Search
            </button>
          </div>

          <div className="trending-searches">
            <span className="trending-label">Trending Searches:</span>
            <div className="trending-tags">
              <span className="tag">Luxury Penthouses NY</span>
              <span className="tag">Modern Lofts Berlin</span>
              <span className="tag">Beachfront Villas Miami</span>
            </div>
          </div>
        </div>
      </section>

      {/* New on Market Section */}
      <section className="listings-section">
        <div className="section-header">
          <div>
            <h2 className="section-title">New on Market</h2>
            <p className="section-subtitle">Hand-picked properties uploaded in the last 24 hours.</p>
          </div>
          <a href="#" className="view-all-link">View All Listings →</a>
        </div>

        <div className="property-grid">
          {/* Card 1 */}
          <div className="property-card">
            <div className="card-image-wrapper">
              <div className="badge badge-white">NEW CONSTRUCTION</div>
              <button className="btn-favorite">♡</button>
              <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop" alt="Villa" />
            </div>
            <div className="card-content">
              <div className="card-top">
                <h3 className="price">$4,250,000</h3>
                <div className="rating"><span>★</span> 4.9</div>
              </div>
              <p className="property-title">The Obsidian Heights Villa, Los Angeles</p>
              <div className="property-features">
                <div className="feature"><span className="feature-icon">🛏</span> 5 Beds</div>
                <div className="feature"><span className="feature-icon">🛁</span> 6 Baths</div>
                <div className="feature"><span className="feature-icon">📐</span> 4,800 sqft</div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="property-card">
            <div className="card-image-wrapper">
              <div className="badge badge-black">FEATURED LISTING</div>
              <button className="btn-favorite">♡</button>
              <img src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop" alt="Loft" />
            </div>
            <div className="card-content">
              <div className="card-top">
                <h3 className="price">$1,150,000</h3>
                <div className="rating"><span>★</span> 4.8</div>
              </div>
              <p className="property-title">Tribeca Industrial Loft, New York</p>
              <div className="property-features">
                <div className="feature"><span className="feature-icon">🛏</span> 2 Beds</div>
                <div className="feature"><span className="feature-icon">🛁</span> 2 Baths</div>
                <div className="feature"><span className="feature-icon">📐</span> 1,250 sqft</div>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="property-card">
            <div className="card-image-wrapper">
              <div className="badge badge-white">PRICE REDUCED</div>
              <button className="btn-favorite">♡</button>
              <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop" alt="Contemporary House" />
            </div>
            <div className="card-content">
              <div className="card-top">
                <h3 className="price">$2,800,000</h3>
                <div className="rating"><span>★</span> 5.0</div>
              </div>
              <p className="property-title">White Pines Contemporary, Colorado</p>
              <div className="property-features">
                <div className="feature"><span className="feature-icon">🛏</span> 4 Beds</div>
                <div className="feature"><span className="feature-icon">🛁</span> 3 Baths</div>
                <div className="feature"><span className="feature-icon">📐</span> 3,200 sqft</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Neighborhood Insights */}
      <section className="insights-section">
        <div className="insights-content">
          <div className="insights-text">
            <div className="insights-label">NEIGHBORHOOD INSIGHTS</div>
            <h2 className="insights-title">Explore locations with architectural precision.</h2>
            <p className="insights-desc">
              Our integrated mapping technology allows you to visualize property surroundings, school districts, and transit hubs in high definition.
            </p>
            
            <div className="feature-list">
              <div className="feature-row">
                <div className="feature-icon-box">🚌</div>
                <div className="feature-text">
                  <h4>Transit Connectivity</h4>
                  <p>Real-time commute calculations to your workplace.</p>
                </div>
              </div>
              <div className="feature-row">
                <div className="feature-icon-box">🎓</div>
                <div className="feature-text">
                  <h4>School Grading</h4>
                  <p>Verified data from local education boards and parents.</p>
                </div>
              </div>
            </div>

            <button className="btn-outline">Open Interactive Map</button>
          </div>
          
          <div className="insights-map">
            {/* Map Placeholder Graphic */}
            <div className="map-bg">
               <svg width="100%" height="100%" viewBox="0 0 400 400" preserveAspectRatio="none">
                  {/* Grid Lines */}
                  <path d="M -100 200 L 500 -100" stroke="rgba(255,255,255,0.3)" strokeWidth="4" />
                  <path d="M -100 300 L 500 0" stroke="rgba(255,255,255,0.3)" strokeWidth="8" />
                  <path d="M 0 500 L 400 300" stroke="rgba(255,255,255,0.2)" strokeWidth="6" />
                  <path d="M 100 500 L 500 300" stroke="rgba(255,255,255,0.3)" strokeWidth="4" />
                  <path d="M 200 500 L 500 350" stroke="rgba(255,255,255,0.2)" strokeWidth="10" />
                  <path d="M 200 -100 L -100 500" stroke="rgba(255,255,255,0.4)" strokeWidth="6" />
                  <path d="M 350 -100 L 50 500" stroke="rgba(255,255,255,0.3)" strokeWidth="4" />
                  <path d="M 500 -50 L 150 650" stroke="rgba(255,255,255,0.5)" strokeWidth="12" />
               </svg>
            </div>
            
            {/* Map Pins */}
            <div className="map-pin pin-1">
              <div className="pin-label dark">$1.2M</div>
              <div className="pin-arrow dark"></div>
            </div>
            <div className="map-pin pin-2">
              <div className="pin-label light">$850k</div>
              <div className="pin-arrow light"></div>
            </div>
            <div className="map-pin pin-3">
              <div className="pin-label dark">$2.5M</div>
              <div className="pin-arrow dark"></div>
            </div>

            <div className="map-legend">
              <div className="legend-item">
                <span className="legend-dot dark-dot"></span> High Value
              </div>
              <div className="legend-item">
                <span className="legend-dot light-dot"></span> Market Average
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2 className="cta-title">Ready to change your lifestyle?</h2>
        <p className="cta-desc">
          Join over 50,000 professionals using EstateFlow to find their next commercial<br/>
          or residential investment.
        </p>
        <div className="cta-actions">
          <button className="btn-primary-large">Get Started Free</button>
          <button className="btn-outline-large">Talk to an Agent</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-brand">
            <h3 className="footer-logo">EstateFlow</h3>
            <p className="footer-desc">
              The premium standard in real<br/>
              estate exploration and investment<br/>
              management.
            </p>
            <div className="social-icons">
              <button className="social-btn">🌍</button>
              <button className="social-btn">@</button>
            </div>
          </div>
          
          <div className="footer-links-grid">
            <div className="footer-col">
              <h4>Properties</h4>
              <a href="#">Buy Residential</a>
              <a href="#">Rent Luxury</a>
              <a href="#">Commercial Spaces</a>
              <a href="#">New Developments</a>
            </div>
            <div className="footer-col">
              <h4>Company</h4>
              <a href="#">Contact Us</a>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Sitemap</a>
            </div>
            <div className="footer-col">
              <h4>Resources</h4>
              <a href="#">Market Reports</a>
              <a href="#">Mortgage Calculator</a>
              <a href="#">Accessibility</a>
              <a href="#">Cookie Settings</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="copyright">© 2024 EstateFlow Global. All rights reserved.</p>
          <div className="footer-selectors">
            <div className="selector">
              English (US) <span className="selector-arrow">▼</span>
            </div>
            <div className="selector">
              USD ($) <span className="selector-arrow">▼</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
