import React from 'react';
import './index.css';

function App() {
  return (
    <div className="app-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-left">
          <a href="#" className="logo">ELITE COMMERCE</a>
        </div>
        
        <ul className="nav-links">
          <li><a href="#" className="active">Fashion</a></li>
          <li><a href="#">Tech</a></li>
          <li><a href="#">Artisanal</a></li>
          <li><a href="#">Launch</a></li>
          <li><a href="#">Beauty</a></li>
        </ul>
        
        <div className="nav-right">
          <div className="search-bar">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input type="text" placeholder="Search curated goods..." />
          </div>
          <a href="#" className="icon-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
          </a>
          <a href="#" className="icon-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <div className="hero-bg">
          <img src="https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=1920&auto=format&fit=crop" alt="Ceramics and dried flowers" />
        </div>
        <div className="hero-content">
          <span className="badge-text">HANDCRAFTED HERITAGE</span>
          <h1 className="hero-title">
            Objects made with<br/>
            soul, for homes with<br/>
            spirit.
          </h1>
          <p className="hero-subtitle">
            Discover our curated collection of artisanal treasures, where every piece tells a story of craftsmanship and intentional design.
          </p>
          <div className="hero-actions">
            <button className="btn-solid">EXPLORE COLLECTIONS</button>
            <button className="btn-outline">THE STORY</button>
          </div>
        </div>
      </header>

      {/* Curated Collections */}
      <section className="collections-section">
        <div className="section-header-row">
          <div>
            <h2 className="section-title">Curated Collections</h2>
            <p className="section-subtitle">Carefully selected pieces categorized by their elemental purpose.</p>
          </div>
          <a href="#" className="link-underline">VIEW ALL CATEGORIES</a>
        </div>

        <div className="collections-grid">
          {/* Left Large */}
          <div className="collection-card large">
            <img src="https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=800&auto=format&fit=crop" alt="Ceramics" />
            <div className="card-overlay">
              <h3>The Ceramics Edit</h3>
              <p>RAW, FIRED SOUL. 48 PIECES</p>
            </div>
          </div>
          
          <div className="collections-right">
            {/* Top Right */}
            <div className="collection-card small">
              <img src="https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=600&auto=format&fit=crop" alt="Jewelry" />
              <div className="card-overlay">
                <h3>Jewelry</h3>
                <p>WEARABLE ART</p>
              </div>
            </div>
            
            {/* Bottom Right */}
            <div className="collection-card small">
              <img src="https://images.unsplash.com/photo-1528399587440-6218d6a86f78?q=80&w=600&auto=format&fit=crop" alt="Textiles" />
              <div className="card-overlay">
                <h3>Home & Textiles</h3>
                <p>WOVEN WONDERS</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Maker of the Month */}
      <section className="maker-section">
        <div className="maker-image-wrapper">
          <img src="https://images.unsplash.com/photo-1561081395-5dbd836b7017?q=80&w=800&auto=format&fit=crop" alt="Elena Voss making pottery" />
          <div className="maker-card">
            <h4>ELENA VOSS</h4>
            <p>"Every piece of clay holds a secret that only the fire can reveal."</p>
          </div>
        </div>
        <div className="maker-content">
          <span className="badge-text">MAKER OF THE MONTH</span>
          <h2 className="serif-title">Sculpting Silence: The Elena Voss Studio</h2>
          <p className="desc-text">
            Based in the rugged hills of Tuscany, Elena Voss creates ceramics that are as much about the space they occupy as the material they are made of. Her current collection, 'Terra Silentia', explores the relationship between raw earth and refined form.
          </p>
          <button className="btn-solid">SHOP THE COLLECTION</button>
          
          <div className="maker-stats">
            <div className="stat">
              <span className="stat-value">12+</span>
              <span className="stat-label">YEARS CRAFT</span>
            </div>
            <div className="stat">
              <span className="stat-value">Local</span>
              <span className="stat-label">MATERIALS</span>
            </div>
            <div className="stat">
              <span className="stat-value">Limited</span>
              <span className="stat-label">BATCHES</span>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="arrivals-section">
        <div className="section-header-center">
          <h2 className="section-title">New Arrivals</h2>
          <p className="section-subtitle">Freshly curated pieces from our global network of makers.</p>
        </div>

        <div className="products-grid">
          {/* Product 1 */}
          <div className="product-card">
            <div className="product-img-wrapper">
              <span className="badge-new">NEW IN</span>
              <img src="https://images.unsplash.com/photo-1602874801007-bd458cb6c975?q=80&w=500&auto=format&fit=crop" alt="Candle" />
            </div>
            <div className="product-info">
              <div className="product-header">
                <h4>Stone-washed Linen Candle</h4>
                <span className="price">$48.00</span>
              </div>
              <p className="vendor">THE TALLOW CO.</p>
            </div>
          </div>

          {/* Product 2 */}
          <div className="product-card">
            <div className="product-img-wrapper">
              <img src="https://images.unsplash.com/photo-1596160359051-fb18e38fbf38?q=80&w=500&auto=format&fit=crop" alt="Basket" />
            </div>
            <div className="product-info">
              <div className="product-header">
                <h4>Woven Totem Basket</h4>
                <span className="price">$120.00</span>
              </div>
              <p className="vendor">HERITAGE WEAVE</p>
            </div>
          </div>

          {/* Product 3 */}
          <div className="product-card">
            <div className="product-img-wrapper">
              <img src="https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=500&auto=format&fit=crop" alt="Mugs" />
            </div>
            <div className="product-info">
              <div className="product-header">
                <h4>Indigo Drip Mugs (Set of 2)</h4>
                <span className="price">$64.00</span>
              </div>
              <p className="vendor">MIDNIGHT POTTERY</p>
            </div>
          </div>

          {/* Product 4 */}
          <div className="product-card">
            <div className="product-img-wrapper">
              <img src="https://images.unsplash.com/photo-1599818816972-23c72eb62507?q=80&w=500&auto=format&fit=crop" alt="Platter" />
            </div>
            <div className="product-info">
              <div className="product-header">
                <h4>Hand-Carved Walnut Platter</h4>
                <span className="price">$85.00</span>
              </div>
              <p className="vendor">GRAIN & GROVE</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Philosophy */}
      <section className="philosophy-section">
        <div className="philosophy-header">
          <span className="badge-text-white">OUR PHILOSOPHY</span>
          <h2 className="serif-title-white">
            Rejecting the mass-produced<br/>
            in favor of the meaningful.
          </h2>
          <p className="philosophy-desc">
            We believe that the objects we surround ourselves with carry energy. By supporting independent makers, we choose a slower, more intentional way of living—one that honors tradition and preserves the human touch.
          </p>
        </div>

        <div className="philosophy-features">
          <div className="feature">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 22h20L12 2z"></path>
            </svg>
            <h3>Ethical Sourcing</h3>
            <p>We partner with makers who prioritize sustainable materials and fair labor practices in every single stitch and pour.</p>
          </div>
          <div className="feature">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
            </svg>
            <h3>Ancient Crafts</h3>
            <p>From centuries-old weaving techniques to traditional kiln-firing, we preserve methods that are nearly lost to time.</p>
          </div>
          <div className="feature">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <h3>Guaranteed Origin</h3>
            <p>Every item in our marketplace is authenticated to ensure it is 100% handcrafted by the artist listed.</p>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter-section">
        <h2>Join the Inner Circle</h2>
        <p>Receive early access to limited edition drops and stories from our artisan studios around the world.</p>
        <form className="newsletter-form">
          <input type="email" placeholder="Your email address" />
          <button type="submit" className="btn-solid">SUBSCRIBE</button>
        </form>
        <p className="no-spam">NO SPAM. JUST SOUL. UNSUBSCRIBE ANYTIME.</p>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-brand">
            <h3 className="logo">ELITE<br/>COMMERCE</h3>
            <p>Elevating the everyday through curated artisanal excellence. Bridging the gap between maker and home.</p>
            <div className="social-links">
              <a href="#">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>
          
          <div className="footer-links">
            <div className="link-column">
              <h4>SHOP</h4>
              <a href="#">New Arrivals</a>
              <a href="#">Ceramics</a>
              <a href="#">Textiles</a>
              <a href="#">Jewelry</a>
              <a href="#">Gift Guide</a>
            </div>
            <div className="link-column">
              <h4>SUPPORT</h4>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Shipping Info</a>
              <a href="#">Returns</a>
              <a href="#">Contact Us</a>
            </div>
            <div className="link-column">
              <h4>STORY</h4>
              <a href="#">Our Mission</a>
              <a href="#">Meet the Makers</a>
              <a href="#">Sustainability</a>
              <a href="#">Wholesale</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© 2024 ELITE COMMERCE. ALL RIGHTS RESERVED.</p>
          <div className="payment-icons">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
              <line x1="1" y1="10" x2="23" y2="10"></line>
            </svg>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="5" width="20" height="14" rx="2"></rect>
              <line x1="2" y1="10" x2="22" y2="10"></line>
            </svg>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
