import React from 'react';
import './index.css';

function App() {
  return (
    <div className="app-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-left">
          <a href="#" className="logo">EstateFlow</a>
          <ul className="nav-links">
            <li><a href="#" className="active">Buy</a></li>
            <li><a href="#">Rent</a></li>
            <li><a href="#">Commercial</a></li>
            <li><a href="#">Luxury</a></li>
            <li><a href="#">Agencies</a></li>
          </ul>
        </div>
        
        <div className="nav-right">
          <a href="#" className="icon-link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </a>
          <a href="#" className="icon-link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
          </a>
          <a href="#" className="icon-link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </a>
          <button className="btn-black">List Property</button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <div className="hero-bg">
          <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1920&auto=format&fit=crop" alt="Luxury Home" />
        </div>
        <div className="hero-content">
          <span className="badge-text-white">THE PRIVATE COLLECTION</span>
          <h1 className="hero-title">
            Residing in Architectural<br/>
            Masterpieces.
          </h1>
          <div className="hero-actions">
            <button className="btn-white">Explore Portfolio</button>
            <button className="btn-outline-white">Request Private Viewing</button>
          </div>
        </div>
      </header>

      {/* Curated Standard Section */}
      <section className="curated-section">
        <div className="section-header-row">
          <div className="header-text">
            <h2 className="serif-title">The Curated Standard</h2>
            <p className="desc-text">
              A restricted selection of the world's most exceptional residential architectures. Our Private Collection features properties that transcend living spaces, becoming habitable art.
            </p>
          </div>
          <a href="#" className="link-underline">View All Curations</a>
        </div>

        <div className="collections-grid">
          {/* Left Large */}
          <div className="collection-card large">
            <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop" alt="The Glass Pavilion" />
            <div className="card-overlay">
              <span className="badge-black">EXCLUSIVE LISTING</span>
              <h3>The Glass Pavilion, Bel Air</h3>
              <p className="property-meta">$34,500,000 — 7 Beds, 11 Baths, 14,000 Sq Ft</p>
              <button className="btn-white-small mt-4">Details</button>
            </div>
          </div>
          
          <div className="collections-right">
            {/* Top Right */}
            <div className="collection-card small">
              <img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=600&auto=format&fit=crop" alt="Interior" />
            </div>
            
            {/* Bottom Right */}
            <div className="collection-card small">
              <img src="https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=600&auto=format&fit=crop" alt="Terrace" />
            </div>
          </div>
        </div>
      </section>

      {/* Split Content Section */}
      <section className="split-section">
        <div className="split-left">
          <div className="split-content">
            <div className="icon-wrapper">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2l4 8h-8z"></path>
                <path d="M12 10v12"></path>
                <path d="M7 22l5-5 5 5"></path>
              </svg>
            </div>
            <h2 className="serif-title">Architectural Integrity</h2>
            <p className="desc-text">
              Each property is vetted by our board of design consultants to ensure it meets the rigorous standards of architectural innovation and structural excellence.
            </p>
          </div>
        </div>
        <div className="split-right">
          <img src="https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=1000&auto=format&fit=crop" alt="Modern glass house in forest" />
        </div>
      </section>

      {/* Discretion Section */}
      <section className="discretion-section">
        <h2 className="serif-title-white">Discretion is our standard.</h2>
        <p className="desc-text-white">
          Access unlisted off-market properties and bespoke acquisition services tailored for the discerning collector.
        </p>
        <div className="discretion-actions">
          <button className="btn-white">Request Private Viewing</button>
          <button className="btn-outline-gray">Consult an Advisor</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-brand">
            <h3 className="logo-text">EstateFlow</h3>
            <p>Defining the global standard for luxury real estate and architectural excellence since 2024.</p>
            <div className="social-icons">
              <a href="#">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="2" y1="12" x2="22" y2="12"></line>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
              </a>
              <a href="#">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </a>
              <a href="#">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </a>
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
    </div>
  );
}

export default App;
