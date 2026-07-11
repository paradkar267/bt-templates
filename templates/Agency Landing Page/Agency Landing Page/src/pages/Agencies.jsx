import React from 'react';

function Agencies() {
  const agencies = [
    { id: 1, name: 'Apex Real Estate', focus: 'Commercial & Retail', location: 'New York, NY' },
    { id: 2, name: 'Luxe Global Brokers', focus: 'High-End Residential', location: 'Los Angeles, CA' },
    { id: 3, name: 'Urban Dwelling Co.', focus: 'Urban Apartments & Lofts', location: 'Chicago, IL' },
    { id: 4, name: 'Horizon Property Management', focus: 'Asset Management', location: 'Miami, FL' },
  ];

  return (
    <section className="expertise-section" style={{ minHeight: '80vh' }}>
      <div className="section-header">
        <span className="section-label">OUR PARTNERS</span>
        <h2 className="section-title">Verified Agencies</h2>
      </div>
      <div className="expertise-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
        {agencies.map(agency => (
          <div className="expertise-card" key={agency.id} style={{ textAlign: 'center', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ width: '80px', height: '80px', backgroundColor: 'var(--secondary-color)', borderRadius: '50%', margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>
              {agency.name.charAt(0)}
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{agency.name}</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>{agency.focus}</p>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', marginBottom: '1.5rem' }}>📍 {agency.location}</p>
            <div style={{ flexGrow: 1 }} />
            <button className="btn-outline" style={{ width: '100%', padding: '0.75rem', marginTop: 'auto' }}>Contact Agency</button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Agencies;
