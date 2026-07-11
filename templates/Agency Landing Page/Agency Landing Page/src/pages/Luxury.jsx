import React, { useState } from 'react';
import { useUser } from '../context/UserContext';

function Luxury() {
  const [selectedProp, setSelectedProp] = useState(null);
  const { toggleWishlist, isInWishlist } = useUser();

  const properties = [
    { id: 1, title: 'Beverly Hills Mansion', price: '$24,500,000', specs: '7 Bed | 9 Bath | 12,000 sqft', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1000&auto=format&fit=crop', city: 'Beverly Hills, CA', area: 'Trousdale Estates', lotSize: '1.5 Acres', yearBuilt: '2022', description: 'An architectural masterpiece offering unparalleled luxury. Features include a zero-edge infinity pool, private cinema, 10-car subterranean garage, and sweeping views of the LA skyline.' },
    { id: 2, title: 'Penthouse Suite', price: '$15,200,000', specs: '4 Bed | 4.5 Bath | 5,500 sqft', img: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=1000&auto=format&fit=crop', city: 'New York, NY', area: 'Billionaires\' Row', lotSize: 'N/A (Penthouse)', yearBuilt: '2020', description: 'Occupying the entire 85th floor, this penthouse redefines urban luxury. Enjoy 360-degree views of Central Park and the Manhattan skyline, bespoke interiors, and white-glove concierge service.' },
    { id: 3, title: 'Private Island Retreat', price: '$45,000,000', specs: '10 Bed | 12 Bath | 25,000 sqft', img: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=1000&auto=format&fit=crop', city: 'Exumas, Bahamas', area: 'Private Cay', lotSize: '40 Acres', yearBuilt: '2015', description: 'The ultimate escape. A fully self-sustaining private island featuring a main villa, 4 guest houses, deep-water dock for superyachts, private airstrip, and pristine white sand beaches.' },
  ];

  return (
    <section className="expertise-section" style={{ minHeight: '80vh', backgroundColor: 'var(--primary-color)', color: 'var(--white)' }}>
      <div className="section-header">
        <span className="section-label" style={{ color: 'var(--text-light)' }}>EXCLUSIVE ESTATES</span>
        <h2 className="section-title" style={{ color: 'var(--white)' }}>Luxury Properties</h2>
      </div>
      <div className="expertise-grid">
        {properties.map(prop => (
          <div className="expertise-card" key={prop.id} style={{ padding: 0, overflow: 'hidden', backgroundColor: 'var(--accent-color)', border: 'none', display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
            <button 
              onClick={(e) => { e.stopPropagation(); toggleWishlist(prop); }}
              style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(0,0,0,0.7)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', fontSize: '1.2rem', cursor: 'pointer', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.4)', color: isInWishlist(prop) ? '#ff4b4b' : '#fff' }}
            >
              {isInWishlist(prop) ? '♥' : '♡'}
            </button>
            <img src={prop.img} alt={prop.title} style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
            <div style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              <h3 style={{ marginBottom: '0.5rem', color: 'var(--white)' }}>{prop.title}</h3>
              <p style={{ color: 'var(--white)', fontWeight: 'bold', fontSize: '1.4rem', marginBottom: '1rem' }}>{prop.price}</p>
              <p style={{ color: 'var(--text-light)' }}>{prop.specs}</p>
              <button className="btn-light" style={{ marginTop: 'auto', width: '100%' }} onClick={() => setSelectedProp(prop)}>Request Private Viewing</button>
            </div>
          </div>
        ))}
      </div>

      {selectedProp && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '2rem' }} onClick={() => setSelectedProp(null)}>
          <div style={{ backgroundColor: 'var(--primary-color)', borderRadius: '8px', maxWidth: '700px', width: '100%', maxHeight: '90vh', overflowY: 'auto', display: 'flex', flexDirection: 'column', border: '1px solid #333' }} onClick={e => e.stopPropagation()}>
            <div style={{ position: 'relative' }}>
              <img src={selectedProp.img} alt={selectedProp.title} style={{ width: '100%', height: '350px', objectFit: 'cover' }} />
              <button onClick={() => setSelectedProp(null)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(0,0,0,0.7)', color: 'white', border: 'none', borderRadius: '50%', width: '40px', height: '40px', fontSize: '1.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
            </div>
            <div style={{ padding: '2.5rem', color: 'var(--white)' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '0.1em', color: 'var(--text-light)', textTransform: 'uppercase' }}>ULTRA LUXURY</span>
              <h2 style={{ marginBottom: '0.5rem', marginTop: '0.5rem', fontSize: '2rem', color: 'var(--white)' }}>{selectedProp.title}</h2>
              <p style={{ color: 'var(--white)', fontWeight: 'bold', fontSize: '1.8rem', marginBottom: '1.5rem' }}>{selectedProp.price}</p>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem', borderTop: '1px solid #333', borderBottom: '1px solid #333', padding: '1.5rem 0' }}>
                <div><strong style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-light)', marginBottom: '0.2rem' }}>Location</strong> {selectedProp.city}, {selectedProp.area}</div>
                <div><strong style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-light)', marginBottom: '0.2rem' }}>Specs</strong> {selectedProp.specs}</div>
                <div><strong style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-light)', marginBottom: '0.2rem' }}>Lot Size</strong> {selectedProp.lotSize}</div>
                <div><strong style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-light)', marginBottom: '0.2rem' }}>Year Built</strong> {selectedProp.yearBuilt}</div>
              </div>
              
              <h3 style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>Property Overview</h3>
              <p style={{ color: '#ccc', lineHeight: '1.7', marginBottom: '2.5rem' }}>{selectedProp.description}</p>
              
              <button className="btn-light" style={{ width: '100%', padding: '1rem' }} onClick={() => setSelectedProp(null)}>Close Details</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Luxury;
