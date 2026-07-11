import React, { useState } from 'react';
import { useUser } from '../context/UserContext';

function Buy() {
  const [selectedProp, setSelectedProp] = useState(null);
  const { toggleWishlist, isInWishlist } = useUser();

  const properties = [
    { id: 1, title: 'Modern Downtown Loft', price: '$850,000', specs: '2 Bed | 2 Bath | 1,200 sqft', img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1000&auto=format&fit=crop', city: 'Seattle, WA', area: 'Downtown', lotSize: 'N/A (Condo)', yearBuilt: '2018', description: 'Experience luxury urban living in this stunning modern loft featuring floor-to-ceiling windows, smart home technology, and premium finishes throughout.' },
    { id: 2, title: 'Suburban Family Home', price: '$1,200,000', specs: '4 Bed | 3 Bath | 2,800 sqft', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000&auto=format&fit=crop', city: 'Bellevue, WA', area: 'Somerset', lotSize: '0.25 Acres', yearBuilt: '2005', description: 'Spacious family home in a highly desired neighborhood. Features a large backyard, newly renovated kitchen, and proximity to top-rated schools.' },
    { id: 3, title: 'Oceanfront Condo', price: '$2,150,000', specs: '3 Bed | 3 Bath | 2,100 sqft', img: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1000&auto=format&fit=crop', city: 'Miami, FL', area: 'South Beach', lotSize: 'N/A (Condo)', yearBuilt: '2021', description: 'Breathtaking ocean views from every room. This exclusive condo offers resort-style amenities, private beach access, and contemporary design.' },
  ];

  return (
    <section className="expertise-section" style={{ minHeight: '80vh' }}>
      <div className="section-header">
        <span className="section-label">PROPERTIES FOR SALE</span>
        <h2 className="section-title">Find Your Next Home</h2>
      </div>
      <div className="expertise-grid">
        {properties.map(prop => (
          <div className="expertise-card" key={prop.id} style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
            <button 
              onClick={(e) => { e.stopPropagation(); toggleWishlist(prop); }}
              style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', fontSize: '1.2rem', cursor: 'pointer', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.2)', color: isInWishlist(prop) ? 'var(--primary-color)' : '#999' }}
            >
              {isInWishlist(prop) ? '♥' : '♡'}
            </button>
            <img src={prop.img} alt={prop.title} style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
            <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              <h3 style={{ marginBottom: '0.5rem' }}>{prop.title}</h3>
              <p style={{ color: 'var(--primary-color)', fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '1rem' }}>{prop.price}</p>
              <p style={{ color: 'var(--text-secondary)' }}>{prop.specs}</p>
              <button className="btn-primary" style={{ marginTop: 'auto', width: '100%' }} onClick={() => setSelectedProp(prop)}>View Details</button>
            </div>
          </div>
        ))}
      </div>

      {selectedProp && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '2rem' }} onClick={() => setSelectedProp(null)}>
          <div style={{ backgroundColor: 'white', borderRadius: '8px', maxWidth: '700px', width: '100%', maxHeight: '90vh', overflowY: 'auto', display: 'flex', flexDirection: 'column' }} onClick={e => e.stopPropagation()}>
            <div style={{ position: 'relative' }}>
              <img src={selectedProp.img} alt={selectedProp.title} style={{ width: '100%', height: '350px', objectFit: 'cover' }} />
              <button onClick={() => setSelectedProp(null)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', fontSize: '1.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>×</button>
            </div>
            <div style={{ padding: '2.5rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '0.1em', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>FOR SALE</span>
              <h2 style={{ marginBottom: '0.5rem', marginTop: '0.5rem', fontSize: '2rem', color: 'var(--primary-color)' }}>{selectedProp.title}</h2>
              <p style={{ color: 'var(--primary-color)', fontWeight: 'bold', fontSize: '1.8rem', marginBottom: '1.5rem' }}>{selectedProp.price}</p>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', padding: '1.5rem 0' }}>
                <div><strong style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.2rem' }}>Location</strong> {selectedProp.city}, {selectedProp.area}</div>
                <div><strong style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.2rem' }}>Specs</strong> {selectedProp.specs}</div>
                <div><strong style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.2rem' }}>Lot Size</strong> {selectedProp.lotSize}</div>
                <div><strong style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.2rem' }}>Year Built</strong> {selectedProp.yearBuilt}</div>
              </div>
              
              <h3 style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>Property Overview</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '2.5rem' }}>{selectedProp.description}</p>
              
              <button className="btn-primary" style={{ width: '100%', padding: '1rem' }} onClick={() => setSelectedProp(null)}>Close Details</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Buy;
