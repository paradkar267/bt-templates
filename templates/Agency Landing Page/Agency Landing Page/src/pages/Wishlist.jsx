import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

function Wishlist() {
  const { wishlist, toggleWishlist } = useUser();
  const navigate = useNavigate();

  return (
    <section className="expertise-section" style={{ minHeight: '80vh', backgroundColor: 'var(--secondary-color)' }}>
      <div className="section-header">
        <span className="section-label">SAVED PROPERTIES</span>
        <h2 className="section-title">Your Wishlist</h2>
      </div>

      {wishlist.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem 0' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem', opacity: 0.5, color: 'var(--primary-color)' }}>♡</div>
          <h3 style={{ marginBottom: '1rem' }}>Your wishlist is empty</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Browse our properties and click the heart icon to save them here.</p>
          <button className="btn-primary" onClick={() => navigate('/buy')}>Browse Properties</button>
        </div>
      ) : (
        <div className="expertise-grid">
          {wishlist.map((prop, idx) => (
            <div className="expertise-card" key={`${prop.id}-${idx}`} style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
              
              <button 
                onClick={() => toggleWishlist(prop)}
                style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', fontSize: '1.2rem', cursor: 'pointer', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.2)', color: 'var(--primary-color)' }}
              >
                ♥
              </button>

              <img src={prop.img} alt={prop.title} style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
              <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                {prop.type && <span className="portfolio-tag" style={{ display: 'inline-block', marginBottom: '0.5rem', border: '1px solid var(--border-color)' }}>{prop.type}</span>}
                <h3 style={{ marginBottom: '0.5rem' }}>{prop.title}</h3>
                <p style={{ color: 'var(--primary-color)', fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '1rem' }}>{prop.price}</p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{prop.city}, {prop.area}</p>
                
                <button className="btn-outline" style={{ marginTop: 'auto', width: '100%' }} onClick={() => toggleWishlist(prop)}>Remove from Wishlist</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Wishlist;
