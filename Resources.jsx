import React, { useState, useEffect } from 'react';
import axiosInstance from './src/utils/axiosConfig';

const Resources = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await axiosInstance.get('/resources');
        setResources(response.data);
      } catch (err) {
        console.error('Error fetching resources', err);
      } finally {
        setLoading(false);
      }
    };
    fetchResources();
  }, []);

  if (loading) return <div style={{padding: 100, textAlign: 'center'}}>Loading resources...</div>;

  return (
    <section style={{ padding: '100px 24px', background: 'var(--bg2)', minHeight: '100vh' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, marginBottom: 16 }}>
            Premium <span style={{ color: 'var(--accent)' }}>Learning Resources</span>
          </h2>
          <p style={{ color: 'var(--text2)', maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>
            Curated materials, articles, and roadmaps to supercharge your career vector.
          </p>
        </div>

        {resources.length === 0 ? (
          <div style={{ textAlign: 'center', color: 'var(--text3)' }}>No resources available yet. Check back later!</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
            {resources.map((r, i) => (
              <div key={r.id || i} style={{
                background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: 18, padding: 24, transition: 'all 0.3s',
                display: 'flex', flexDirection: 'column', gap: 12
              }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'} onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
                <div style={{ fontSize: 12, color: 'var(--accent2)', fontWeight: 600, textTransform: 'uppercase' }}>{r.type || 'Article'}</div>
                <div style={{ fontWeight: 700, fontSize: 18, color: 'white', fontFamily: 'Syne, sans-serif' }}>{r.title}</div>
                <div style={{ marginTop: 'auto', paddingTop: 10 }}>
                  <a href={r.url} target="_blank" rel="noreferrer" style={{ 
                    display: 'inline-block', background: 'linear-gradient(135deg, var(--accent), var(--accent3))', 
                    color: 'white', padding: '10px 20px', borderRadius: 8, fontSize: 14, 
                    textDecoration: 'none', fontWeight: 'bold' 
                  }}>Visit Resource →</a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Resources;
