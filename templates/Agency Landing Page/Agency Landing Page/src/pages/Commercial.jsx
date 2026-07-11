import React, { useState } from 'react';
import { useUser } from '../context/UserContext';

function Commercial() {
  const [selectedProp, setSelectedProp] = useState(null);
  const { toggleWishlist, isInWishlist } = useUser();

  const spaces = [
    { id: 1, title: 'Tech Hub Office Space', price: '$12,000 / month', specs: '5,000 sqft | Class A', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop', city: 'San Jose, CA', area: 'Silicon Valley', type: 'Office', capacity: 'Up to 50 employees', description: 'Premium Class-A office space located in the heart of Silicon Valley. Fully furnished with ergonomic desks, meeting rooms, and gigabit fiber internet.' },
    { id: 2, title: 'Retail Storefront', price: '$8,500 / month', specs: '2,200 sqft | High Traffic', img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000&auto=format&fit=crop', city: 'Chicago, IL', area: 'Magnificent Mile', type: 'Retail', capacity: 'N/A', description: 'High-visibility retail space on a premium shopping street. Features large display windows, high ceilings, and significant daily foot traffic.' },
    { id: 3, title: 'Industrial Warehouse', price: '$22,000 / month', specs: '15,000 sqft | 3 Loading Docks', img: 'https://images.unsplash.com/photo-1586528116311-ad8ed7c663be?q=80&w=1000&auto=format&fit=crop', city: 'Newark, NJ', area: 'Port District', type: 'Industrial', capacity: 'N/A', description: 'Expansive industrial warehouse perfect for logistics or manufacturing. Includes 3 heavy-duty loading docks, 30ft clearance heights, and an attached management office.' },
  ];

  return (
    <section className="expertise-section" style={{ minHeight: '80vh' }}>
      <div className="section-header">
        <span className="section-label">COMMERCIAL REAL ESTATE</span>
        <h2 className="section-title">Strategic Spaces for Business</h2>
      </div>
      <div className="expertise-grid">
        {spaces.map(space => (
          <div className="expertise-card" key={space.id} style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
            <button 
              onClick={(e) => { e.stopPropagation(); toggleWishlist(space); }}
              style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', fontSize: '1.2rem', cursor: 'pointer', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.2)', color: isInWishlist(space) ? 'var(--primary-color)' : '#999' }}
            >
              {isInWishlist(space) ? '♥' : '♡'}
            </button>
            <img src={space.img} alt={space.title} style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
            <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              <span className="portfolio-tag" style={{ display: 'inline-block', marginBottom: '0.5rem', border: '1px solid var(--border-color)' }}>COMMERCIAL</span>
              <h3 style={{ marginBottom: '0.5rem' }}>{space.title}</h3>
              <p style={{ color: 'var(--primary-color)', fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '1rem' }}>{space.price}</p>
              <p style={{ color: 'var(--text-secondary)' }}>{space.specs}</p>
              <button className="btn-primary" style={{ marginTop: 'auto', width: '100%' }} onClick={() => setSelectedProp(space)}>Inquire Now</button>
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
              <span style={{ fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '0.1em', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>{selectedProp.type}</span>
              <h2 style={{ marginBottom: '0.5rem', marginTop: '0.5rem', fontSize: '2rem', color: 'var(--primary-color)' }}>{selectedProp.title}</h2>
              <p style={{ color: 'var(--primary-color)', fontWeight: 'bold', fontSize: '1.8rem', marginBottom: '1.5rem' }}>{selectedProp.price}</p>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', padding: '1.5rem 0' }}>
                <div><strong style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.2rem' }}>Location</strong> {selectedProp.city}, {selectedProp.area}</div>
                <div><strong style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.2rem' }}>Specs</strong> {selectedProp.specs}</div>
                <div><strong style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.2rem' }}>Property Type</strong> {selectedProp.type}</div>
                <div><strong style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.2rem' }}>Capacity</strong> {selectedProp.capacity}</div>
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

export default Commercial;
