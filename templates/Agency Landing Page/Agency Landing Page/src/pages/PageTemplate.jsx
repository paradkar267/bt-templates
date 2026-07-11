import React from 'react';

function PageTemplate({ title }) {
  return (
    <div style={{ padding: '8rem 5%', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h1 className="section-title">{title}</h1>
      <p style={{ color: 'var(--text-secondary)' }}>This page is currently under construction.</p>
    </div>
  );
}

export default PageTemplate;
