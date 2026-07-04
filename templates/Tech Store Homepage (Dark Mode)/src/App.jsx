import React from 'react';
import './App.css';

function App() {
  return (
    <div className="app-container">
      {/* Top Banner */}
      <div className="top-banner">
        <div className="banner-content">
          <span>⚡ FLASH SALE: NEXT DROP IN 14:16:25</span>
          <span>⚡ FLASH SALE: NEXT DROP IN 14:16:25</span>
          <span>⚡ FLASH SALE: NEXT DROP IN 14:16:25</span>
        </div>
      </div>

      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">ELITE COMMERCE</div>
        <div className="nav-links">
          <a href="#" className="nav-link active">Fashion</a>
          <a href="#" className="nav-link">Tech</a>
          <a href="#" className="nav-link">Artisanal</a>
          <a href="#" className="nav-link">Launch</a>
          <a href="#" className="nav-link">Beauty</a>
        </div>
        <div className="nav-icons">
          <button className="icon-btn">🔍</button>
          <button className="icon-btn">🛍️</button>
          <button className="icon-btn">👤</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text-area">
            <span className="overline">LIMITED RELEASE</span>
            <h1 className="hero-title">NEON<br/>STRIKE-1</h1>
            
            <div className="specs-grid">
              <div className="spec-item">
                <span className="spec-label">CPU</span>
                <span className="spec-value">Z1-Core Octa</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">DISPLAY</span>
                <span className="spec-value">165Hz OLED</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">LATENCY</span>
                <span className="spec-value">0.2ms Response</span>
              </div>
            </div>

            <button className="btn-preorder">
              PRE-ORDER NOW <span className="arrow">→</span>
            </button>
          </div>
          
          <div className="hero-image-area">
            {/* Glowing Laptop Image Placeholder */}
            <div className="glow-effect"></div>
            <img src="https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=1000&auto=format&fit=crop" alt="Neon Strike-1 Laptop" className="hero-image" />
          </div>
        </div>
      </section>

      {/* The Ecosystem Section */}
      <section className="ecosystem-section">
        <div className="section-header">
          <h2 className="section-title">THE ECOSYSTEM</h2>
          <a href="#" className="view-link">View Full Inventory ↗</a>
        </div>

        <div className="ecosystem-grid">
          <div className="eco-item eco-mobile">
            <div className="eco-bg">
              <img src="https://images.unsplash.com/photo-1556656793-08538906a9f8?q=80&w=800&auto=format&fit=crop" alt="Mobile Unit" />
            </div>
            <div className="eco-content">
              <span className="eco-number">01/</span>
              <h3 className="eco-title">MOBILE UNITS</h3>
            </div>
          </div>
          
          <div className="eco-item eco-compute">
            <div className="eco-bg">
              <img src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1000&auto=format&fit=crop" alt="Compute Cores" />
            </div>
            <div className="eco-content">
              <span className="eco-number">02/</span>
              <h3 className="eco-title">COMPUTE CORES</h3>
              <button className="eco-plus-btn">⊕</button>
            </div>
          </div>

          <div className="eco-item eco-sonic">
            <div className="eco-bg">
              <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop" alt="Sonic Immersion" />
            </div>
            <div className="eco-content">
              <span className="eco-number">03/</span>
              <h3 className="eco-title">SONIC IMMERSION</h3>
            </div>
          </div>

          <div className="eco-item eco-peripherals">
            <div className="eco-content-light">
              <div className="icon-cable">⑂</div>
              <div className="eco-text-bottom">
                <span className="eco-number-dark">04/</span>
                <h3 className="eco-title-dark">PERIPHERALS</h3>
                <p className="eco-desc">Expansion modules for the elite user.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="arrivals-section">
        <h2 className="arrivals-title">NEW ARRIVALS</h2>
        <div className="title-underline"></div>

        <div className="products-grid">
          {/* Product 1 */}
          <div className="product-card">
            <div className="product-image-container">
              <div className="badge badge-white">NEW IN</div>
              <img src="https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=600&auto=format&fit=crop" alt="Earbuds" />
            </div>
            <div className="product-info">
              <div className="product-header">
                <h3 className="product-name">U-LINK PRO</h3>
                <span className="product-price">$299.00</span>
              </div>
              <p className="product-category">AUDIO TRANSMISSION</p>
            </div>
          </div>

          {/* Product 2 */}
          <div className="product-card">
            <div className="product-image-container">
              <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop" alt="Smart Watch" />
            </div>
            <div className="product-info">
              <div className="product-header">
                <h3 className="product-name">CHRONOS V2</h3>
                <span className="product-price">$450.00</span>
              </div>
              <p className="product-category">WEARABLE COMPUTE</p>
            </div>
          </div>

          {/* Product 3 */}
          <div className="product-card">
            <div className="product-image-container">
              <img src="https://images.unsplash.com/photo-1561154464-82e9adf32764?q=80&w=600&auto=format&fit=crop" alt="Tablet" />
            </div>
            <div className="product-info">
              <div className="product-header">
                <h3 className="product-name">NEXUS SLATE</h3>
                <span className="product-price">$899.00</span>
              </div>
              <p className="product-category">DISPLAY UNIT</p>
            </div>
          </div>

          {/* Product 4 */}
          <div className="product-card">
            <div className="product-image-container">
              <div className="badge badge-outline">SOLD OUT</div>
              <img src="https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=600&auto=format&fit=crop" alt="Headphones" />
            </div>
            <div className="product-info">
              <div className="product-header">
                <h3 className="product-name">VOID SOUND</h3>
                <span className="product-price">Waiting List</span>
              </div>
              <p className="product-category">ACOUSTIC DRIVER</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-brand">
            <h3 className="footer-logo">ELITE<br/>COMMERCE</h3>
            <p className="footer-desc">
              Pioneering the<br/>
              intersection of<br/>
              architectural design and<br/>
              extreme computational<br/>
              power.
            </p>
          </div>
          
          <div className="footer-links">
            <div className="footer-col">
              <h4>Support</h4>
              <a href="#">Shipping Info</a>
              <a href="#">Returns</a>
              <a href="#">Contact Us</a>
            </div>
            <div className="footer-col">
              <h4>Legal</h4>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
          
          <div className="footer-newsletter">
            <h4>Newsletter</h4>
            <p>Get priority access to<br/>limited drops.</p>
            <div className="email-input-wrapper">
              <input type="email" placeholder="ENTER EMAIL" />
              <button>→</button>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© 2024 Elite Commerce. All rights reserved.</p>
          <div className="footer-lang">
            <span className="globe-icon">🌐</span> ENG / USD
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
