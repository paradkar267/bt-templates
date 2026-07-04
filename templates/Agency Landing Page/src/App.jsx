import React from 'react';
import './App.css';

function App() {
  return (
    <div className="app-container">
      {/* Navigation */}
      <nav className="navbar">
        <div className="logo">EstateFlow</div>
        <ul className="nav-links">
          <li><a href="#" className="active">Buy</a></li>
          <li><a href="#">Rent</a></li>
          <li><a href="#">Commercial</a></li>
          <li><a href="#">Luxury</a></li>
          <li><a href="#">Agencies</a></li>
        </ul>
        <div className="nav-actions">
          <button className="icon-btn">♡</button>
          <button className="icon-btn">🔔</button>
          <button className="icon-btn">👤</button>
          <button className="list-property-btn">List Property</button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Precision in Every <em>Square Foot.</em></h1>
          <p className="hero-subtitle">
            Our corporate real estate advisors combine deep market intelligence with institutional-grade strategy to manage your high-value portfolio.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary">Consult Our Experts</button>
            <button className="btn-outline">View Market Reports</button>
          </div>
        </div>
        <div className="hero-image-wrapper">
          <img src="https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2000&auto=format&fit=crop" alt="Corporate Real Estate Advisors" className="hero-image" />
          <div className="hero-badge">
            <h2>15+</h2>
            <p>YEARS EXCELLENCE</p>
          </div>
        </div>
      </header>

      {/* Expertise Section */}
      <section className="expertise-section">
        <div className="section-header">
          <span className="section-label">OUR EXPERTISE</span>
          <h2 className="section-title">Specialized Sectors</h2>
        </div>
        <div className="expertise-grid">
          <div className="expertise-card">
            <div className="card-icon">🏠</div>
            <h3>Residential</h3>
            <p>Curated luxury estates and high-rise residences designed for elite urban living and long-term capital preservation.</p>
            <ul className="card-features">
              <li>✓ Luxury Condos</li>
              <li>✓ Private Estates</li>
              <li>✓ Smart Home Assets</li>
            </ul>
            <a href="#" className="explore-link">Explore Residential ➔</a>
          </div>
          <div className="expertise-card">
            <div className="card-icon">🏢</div>
            <h3>Commercial</h3>
            <p>Strategic acquisition and disposition of Class-A office spaces, logistics hubs, and retail flagship locations.</p>
            <ul className="card-features">
              <li>✓ Grade A Office</li>
              <li>✓ Industrial Parks</li>
              <li>✓ High-Street Retail</li>
            </ul>
            <a href="#" className="explore-link">Explore Commercial ➔</a>
          </div>
          <div className="expertise-card">
            <div className="card-icon">📈</div>
            <h3>Investments</h3>
            <p>Data-driven advisory for institutional investors seeking high-yield opportunities in emerging and stable markets.</p>
            <ul className="card-features">
              <li>✓ REIT Advisory</li>
              <li>✓ Portfolio Diversification</li>
              <li>✓ Opportunity Zones</li>
            </ul>
            <a href="#" className="explore-link">View Analytics ➔</a>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="portfolio-section">
        <div className="section-header portfolio-header">
          <div>
            <span className="section-label">PORTFOLIO</span>
            <h2 className="section-title">Significant Closings</h2>
          </div>
          <a href="#" className="view-ledger-link">View Global Ledger</a>
        </div>
        <div className="portfolio-grid">
          <div className="portfolio-item large">
            <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop" alt="The Apex Plaza" />
            <div className="portfolio-overlay">
              <span className="portfolio-tag">COMMERCIAL</span>
              <h3>The Apex Plaza</h3>
              <p>$145M Closing — Financial District</p>
            </div>
          </div>
          <div className="portfolio-item top-right">
            <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000&auto=format&fit=crop" alt="Starlight Estate" />
            <div className="portfolio-overlay">
              <h3>Starlight Estate</h3>
              <p>$12.4M — Beverly Hills</p>
            </div>
          </div>
          <div className="portfolio-item bottom-right-1">
            <img src="https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1000&auto=format&fit=crop" alt="Soho Loft" />
            <div className="portfolio-overlay">
              <p>$4.2M — Soho Loft</p>
            </div>
          </div>
          <div className="portfolio-item bottom-right-2">
            <img src="https://images.unsplash.com/photo-1586528116311-ad8ed7c663be?q=80&w=1000&auto=format&fit=crop" alt="Port District" />
            <div className="portfolio-overlay">
              <p>$28M — Port District</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="trust-section">
        <span className="section-label center-label">TRUST</span>
        <h2 className="section-title center-title">Client Feedback</h2>
        <div className="feedback-grid">
          <div className="feedback-card">
            <div className="stars">★★★★★</div>
            <p className="quote">"The precision of their market analysis was instrumental in our North American expansion. EstateFlow doesn't just find space; they secure strategic assets."</p>
            <div className="author">
              <strong>Marcus Sterling</strong>
              <span>COO, NEXGEN LOGISTICS</span>
            </div>
          </div>
          <div className="feedback-card">
            <div className="stars">★★★★★</div>
            <p className="quote">"Absolute professionalism. Their team handled the acquisition of our flagship building with remarkable transparency and speed. Truly a global standard."</p>
            <div className="author">
              <strong>Elena Rodriguez</strong>
              <span>MANAGING DIRECTOR, AZURE CAPITAL</span>
            </div>
          </div>
          <div className="feedback-card">
            <div className="stars">★★★★★</div>
            <p className="quote">"The portfolio management tools they provided transformed how we view our holdings. They are a partner, not just a broker."</p>
            <div className="author">
              <strong>Julian Vane</strong>
              <span>PRIVATE INVESTOR</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Expose Your Asset to Our Global Network.</h2>
          <p>Leverage our proprietary database of high-net-worth individuals and institutional buyers.</p>
          <div className="cta-buttons">
            <button className="btn-light">Initiate Listing</button>
            <button className="btn-ghost-light">📞 Direct Line: +1 (800) ESTATE</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-brand">
            <h2>EstateFlow</h2>
            <p>Institutional-grade real estate advisory for global markets. Founded on transparency, driven by data.</p>
          </div>
          <div className="footer-links">
            <div className="link-group">
              <h4>Company</h4>
              <a href="#">About Us</a>
              <a href="#">Leadership</a>
              <a href="#">Global Offices</a>
              <a href="#">Careers</a>
            </div>
            <div className="link-group">
              <h4>Services</h4>
              <a href="#">Commercial Sale</a>
              <a href="#">Luxury Residential</a>
              <a href="#">Investment Advisory</a>
              <a href="#">Asset Management</a>
            </div>
            <div className="link-group">
              <h4>Legal & Connect</h4>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Contact Us</a>
              <a href="#">Sitemap</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2024 EstateFlow Global. All rights reserved.</p>
          <div className="social-icons">
            <span>🌐</span>
            <span>⑂</span>
            <span>✉</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
