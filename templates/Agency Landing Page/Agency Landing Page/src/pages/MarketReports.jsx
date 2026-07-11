import React from 'react';
import { Link } from 'react-router-dom';

function MarketReports() {
  return (
    <div style={{ minHeight: '80vh', backgroundColor: 'var(--white)', padding: '2rem 5%' }}>
      <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold', marginBottom: '2rem', color: 'var(--text-primary)', textDecoration: 'none' }}>
        <span style={{ fontSize: '1.5rem' }}>←</span> Back to Home
      </Link>

      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h1 className="section-title">Market Sales & Analytics</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          Real-time insights into institutional real estate transactions, quarterly sales graphs, and property value projections.
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
          <div style={{ padding: '2rem', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
            <h3 style={{ marginBottom: '1rem' }}>Quarterly Revenue</h3>
            <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop" alt="Graph" style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '4px' }} />
          </div>
          <div style={{ padding: '2rem', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
            <h3 style={{ marginBottom: '1rem' }}>Market Trends (YTD)</h3>
            <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop" alt="Analytics" style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '4px' }} />
          </div>
        </div>
        
        <div style={{ padding: '2rem', backgroundColor: 'var(--secondary-color)', borderRadius: '8px' }}>
          <h3 style={{ marginBottom: '1rem' }}>Summary</h3>
          <p>The market has seen a 12% increase in commercial property acquisitions in Q2. Retail and industrial spaces are driving the highest ROI for institutional investors, with an average yield of 8.4%.</p>
        </div>
      </div>
    </div>
  );
}

export default MarketReports;
