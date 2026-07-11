import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    let animationId;
    const scroll = () => {
      if (!isPaused && !isDragging && scrollRef.current) {
        scrollRef.current.scrollLeft += 1;
        if (scrollRef.current.scrollLeft >= scrollRef.current.scrollWidth / 2) {
          scrollRef.current.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(scroll);
    };
    animationId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationId);
  }, [isPaused, isDragging]);

  const handleMouseDown = (e) => {
    setIsPaused(true);
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsPaused(false);
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <>
      {/* Hero Section */}
      <header className="hero-section" style={{
        backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.3) 45%, rgba(0, 0, 0, 0) 100%), url(https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2500&auto=format&fit=crop)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        padding: '0 5%',
        position: 'relative'
      }}>
        <div className="hero-content" style={{ maxWidth: '700px', zIndex: 2, textAlign: 'left', paddingTop: '2vh' }}>
          
          <div style={{ display: 'inline-block', padding: '0.3rem 0.8rem', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '30px', marginBottom: '1rem', fontSize: '0.7rem', letterSpacing: '1px', textTransform: 'uppercase', color: 'white', backgroundColor: 'rgba(0,0,0,0.3)' }}>
            Elevating Global Real Estate
          </div>

          <h1 className="hero-title" style={{ color: 'white', fontSize: 'clamp(2rem, 3.5vw, 3.5rem)', fontWeight: '400', letterSpacing: '-0.5px', marginBottom: '1rem', lineHeight: '1.2' }}>
            Precision in Every <br /><em style={{ fontStyle: 'italic', fontWeight: '300', color: 'white' }}>Square Foot.</em>
          </h1>
          
          <p className="hero-subtitle" style={{ color: 'rgba(255,255,255,0.8)', fontSize: 'clamp(0.9rem, 1vw, 1rem)', maxWidth: '550px', marginBottom: '2rem', lineHeight: '1.5', fontWeight: '300' }}>
            Our corporate real estate advisors combine deep market intelligence with institutional-grade strategy to manage and scale your high-value portfolio.
          </p>
          
          <div className="hero-buttons" style={{ display: 'flex', gap: '1rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
            <button className="btn-primary" style={{ padding: '0.8rem 1.8rem', fontSize: '0.9rem', fontWeight: '500', backgroundColor: 'var(--accent-color)', borderColor: 'var(--accent-color)', color: 'var(--white)' }} onClick={() => navigate('/consultation')}>Consult Experts</button>
            <button className="btn-outline" style={{ padding: '0.8rem 1.8rem', fontSize: '0.9rem', fontWeight: '500', borderColor: 'rgba(255,255,255,0.4)', color: 'white', transition: 'all 0.3s' }} onClick={() => navigate('/reports')}>Market Reports</button>
          </div>

          <div style={{ display: 'flex', gap: '2.5rem', borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '1.5rem', maxWidth: '550px', flexWrap: 'wrap' }}>
            <div>
              <h3 style={{ fontSize: '1.5rem', margin: '0 0 0.2rem 0', fontWeight: '400', color: 'white' }}>$12B+</h3>
              <p style={{ margin: 0, fontSize: '0.65rem', letterSpacing: '1.5px', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase' }}>Transactions</p>
            </div>
            <div>
              <h3 style={{ fontSize: '1.5rem', margin: '0 0 0.2rem 0', fontWeight: '400', color: 'white' }}>15+</h3>
              <p style={{ margin: 0, fontSize: '0.65rem', letterSpacing: '1.5px', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase' }}>Years Exp</p>
            </div>
            <div>
              <h3 style={{ fontSize: '1.5rem', margin: '0 0 0.2rem 0', fontWeight: '400', color: 'white' }}>42</h3>
              <p style={{ margin: 0, fontSize: '0.65rem', letterSpacing: '1.5px', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase' }}>Offices</p>
            </div>
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
        <div 
          className="feedback-wrapper"
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          <div className="feedback-grid">
            {/* Original Set */}
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
            <div className="feedback-card">
              <div className="stars">★★★★★</div>
              <p className="quote">"Unparalleled access to off-market luxury properties. They found us exactly what we were looking for within weeks. Highly recommended."</p>
              <div className="author">
                <strong>Sarah Jenkins</strong>
                <span>CEO, HORIZON TECH</span>
              </div>
            </div>
            <div className="feedback-card">
              <div className="stars">★★★★★</div>
              <p className="quote">"EstateFlow's data-driven approach gave us the confidence to restructure our entire European real estate portfolio. Phenomenal insights."</p>
              <div className="author">
                <strong>David Chen</strong>
                <span>CFO, OMNI GLOBAL</span>
              </div>
            </div>
            
            {/* Duplicated Set for Infinite Marquee */}
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
            <div className="feedback-card">
              <div className="stars">★★★★★</div>
              <p className="quote">"Unparalleled access to off-market luxury properties. They found us exactly what we were looking for within weeks. Highly recommended."</p>
              <div className="author">
                <strong>Sarah Jenkins</strong>
                <span>CEO, HORIZON TECH</span>
              </div>
            </div>
            <div className="feedback-card">
              <div className="stars">★★★★★</div>
              <p className="quote">"EstateFlow's data-driven approach gave us the confidence to restructure our entire European real estate portfolio. Phenomenal insights."</p>
              <div className="author">
                <strong>David Chen</strong>
                <span>CFO, OMNI GLOBAL</span>
              </div>
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
    </>
  );
}

export default Home;
