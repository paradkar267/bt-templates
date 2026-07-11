import React from 'react';
import './index.css';

function App() {
  return (
    <div className="app-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-left">
          <a href="#" className="logo">PharmaCare</a>
        </div>
        
        <ul className="nav-links">
          <li><a href="#" className="active">Prescriptions</a></li>
          <li><a href="#">Store Locator</a></li>
          <li><a href="#">Services</a></li>
          <li><a href="#">Health Advice</a></li>
          <li><a href="#">Shop</a></li>
        </ul>
        
        <div className="nav-right">
          <button className="btn-search">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            Search
          </button>
          <a href="#" className="link-signin">Sign In</a>
          <button className="btn-solid-blue">Refill Rx</button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <div className="hero-bg">
          <img src="https://images.unsplash.com/photo-1576602976047-174e57a47881?q=80&w=1920&auto=format&fit=crop" alt="Luxury Pharmacy Interior" />
          <div className="hero-gradient"></div>
        </div>
        
        <div className="hero-content">
          <div className="badge-wrapper">
            <span className="badge-light-blue">THE FUTURE OF PERSONAL WELLNESS</span>
          </div>
          
          <h1 className="hero-title">
            Precision Care<br/>
            <span className="italic-serif">Evolved.</span>
          </h1>
          
          <p className="hero-subtitle">
            Experience a new standard of health. From concierge medication management to curated global skincare, PharmaCare redefines the boutique pharmacy experience.
          </p>
          
          <div className="hero-actions">
            <button className="btn-solid-blue large">Book Concierge</button>
            <button className="btn-outline-blue large">Explore Collections</button>
          </div>
        </div>
      </header>

      {/* Grid Section */}
      <section className="grid-section">
        <div className="bento-grid">
          
          {/* Left Large Card */}
          <div className="card-large">
            <img src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop" alt="Curated Skincare" />
            <div className="card-overlay">
              <h2>Curated Skincare</h2>
              <p>Dermatologist-approved formulas from Paris, Seoul, and Zurich. Science-led beauty for the discerning patient.</p>
              <a href="#" className="link-with-arrow">Shop the Collection →</a>
            </div>
          </div>
          
          <div className="cards-right">
            {/* Top Right Card */}
            <div className="card-small bg-light-blue">
              <div className="icon-wrapper text-blue">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z"></path>
                  <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"></path>
                </svg>
              </div>
              <h3>Private Concierge</h3>
              <p>Bespoke health management, private consultations, and bio-identical therapy coordination.</p>
              <a href="#" className="link-blue mt-auto">Schedule Consultation ›</a>
            </div>
            
            {/* Bottom Right Card */}
            <div className="card-small bg-blue">
              <div className="icon-wrapper text-white">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="1" y="3" width="15" height="13"></rect>
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                  <circle cx="5.5" cy="18.5" r="2.5"></circle>
                  <circle cx="18.5" cy="18.5" r="2.5"></circle>
                </svg>
              </div>
              <h3>White-Glove Delivery</h3>
              <p>Discrete, temperature-controlled delivery within 2 hours across the metropolitan area.</p>
              <button className="btn-white-small mt-auto">Track Order</button>
            </div>
          </div>
          
        </div>
      </section>

      {/* Seamless Management Section */}
      <section className="management-section">
        <div className="management-container">
          
          <div className="management-content">
            <h2 className="serif-title">Seamless <span className="italic-serif">Management</span></h2>
            <p className="desc-text">
              Our digital dashboard provides real-time tracking of your medication regimen. Secure, HIPAA-compliant, and designed for absolute clarity.
            </p>
            
            <div className="feature-boxes">
              <div className="feature-box">
                <div className="feature-icon bg-light-green">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2">
                    <polyline points="23 4 23 10 17 10"></polyline>
                    <polyline points="1 20 1 14 7 14"></polyline>
                    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
                  </svg>
                </div>
                <div className="feature-text">
                  <h4>Auto-Refill Intelligence</h4>
                  <p>We coordinate with your physician automatically before you ever run low.</p>
                </div>
              </div>
              
              <div className="feature-box">
                <div className="feature-icon bg-light-orange">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    <path d="M12 8v4"></path>
                    <path d="M12 16h.01"></path>
                  </svg>
                </div>
                <div className="feature-text">
                  <h4>Compounding Specialist</h4>
                  <p>Customized dosages and allergen-free formulations prepared in our on-site lab.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="management-dashboard">
            <div className="dashboard-card">
              <div className="card-header">
                <h4>Current Prescription</h4>
                <span className="badge-status-green">In Stock</span>
              </div>
              
              <div className="medication-info">
                <div className="med-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="7" y="3" width="10" height="4" rx="1"></rect>
                    <rect x="5" y="7" width="14" height="14" rx="2"></rect>
                    <path d="M12 10v6"></path>
                    <path d="M9 13h6"></path>
                  </svg>
                </div>
                <div>
                  <h3>Rosuvastatin</h3>
                  <p>20mg Oral Tablet • Once Daily</p>
                </div>
              </div>
              
              <div className="progress-section">
                <div className="progress-labels">
                  <span>Next Refill Date: Oct 24, 2024</span>
                  <span className="text-blue font-semibold">Refilling soon...</span>
                </div>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill"></div>
                </div>
              </div>
              
              <button className="btn-solid-blue full-width">Request Early Refill</button>
            </div>
          </div>
          
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <h2 className="serif-title-white">Elevate Your Wellness Knowledge</h2>
        <p className="newsletter-desc">
          Join our exclusive circle for monthly health insights, luxury product previews, and invitations to our wellness salons.
        </p>
        <form className="newsletter-form">
          <input type="email" placeholder="Email Address" />
          <button type="submit" className="btn-light">Subscribe</button>
        </form>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-left">
            <h3 className="logo-text">PharmaCare</h3>
            <p>© 2024 PharmaCare. All rights reserved. Licensed Pharmacy #12345.</p>
          </div>
          
          <div className="footer-right">
            <a href="#">Regulatory Certifications</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">HIPAA Compliance</a>
            <a href="#" className="link-contact">Contact Pharmacist</a>
          </div>
        </div>
      </footer>

      {/* Floating Action Button */}
      <div className="fab">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      </div>

    </div>
  );
}

export default App;
