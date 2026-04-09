import React from 'react';

const Footer = () => (
  <footer style={{
    padding: '60px 24px 32px',
    background: 'var(--bg)',
    borderTop: '1px solid var(--border)',
  }}>
    <div style={{ maxWidth: 1100, margin: '0 auto' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: 40, marginBottom: 48,
      }}>
        {/* Brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <div style={{
              width: 34, height: 34, borderRadius: 9,
              background: 'linear-gradient(135deg, var(--accent), var(--accent3))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 16, fontWeight: 700,
            }}>P</div>
            <span style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 700 }}>
              Path<span style={{ color: 'var(--accent2)' }}>Wise</span>
            </span>
          </div>
          <p style={{ color: 'var(--text3)', fontSize: 13, lineHeight: 1.7, maxWidth: 200 }}>
            AI-powered career guidance platform helping students discover and build their dream careers.
          </p>
          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            {['𝕏', 'in', 'f'].map((s, i) => (
              <div key={i} style={{
                width: 34, height: 34, borderRadius: 8,
                background: 'var(--surface)', border: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--text2)', fontSize: 13, fontWeight: 700, cursor: 'pointer',
              }}>{s}</div>
            ))}
          </div>
        </div>

        {/* Platform */}
        <div>
          <h4 style={{ fontFamily: 'Syne, sans-serif', fontSize: 14, fontWeight: 700, marginBottom: 16, color: 'white' }}>Platform</h4>
          {['Career Assessment', 'Mentor Connect', 'Career Paths', 'Skill Roadmaps', 'Job Board', 'Pricing'].map(l => (
            <div key={l} style={{ fontSize: 13, color: 'var(--text3)', marginBottom: 10, cursor: 'pointer' }}
              onMouseEnter={e => e.target.style.color = 'var(--text2)'}
              onMouseLeave={e => e.target.style.color = 'var(--text3)'}
            >{l}</div>
          ))}
        </div>

        {/* Resources */}
        <div>
          <h4 style={{ fontFamily: 'Syne, sans-serif', fontSize: 14, fontWeight: 700, marginBottom: 16, color: 'white' }}>Resources</h4>
          {['Blog', 'Career Guides', 'Interview Prep', 'Resume Builder', 'Salary Insights', 'Community'].map(l => (
            <div key={l} style={{ fontSize: 13, color: 'var(--text3)', marginBottom: 10, cursor: 'pointer' }}
              onMouseEnter={e => e.target.style.color = 'var(--text2)'}
              onMouseLeave={e => e.target.style.color = 'var(--text3)'}
            >{l}</div>
          ))}
        </div>

        {/* Company */}
        <div>
          <h4 style={{ fontFamily: 'Syne, sans-serif', fontSize: 14, fontWeight: 700, marginBottom: 16, color: 'white' }}>Company</h4>
          {['About Us', 'Careers', 'Press', 'Privacy Policy', 'Terms of Service', 'Contact'].map(l => (
            <div key={l} style={{ fontSize: 13, color: 'var(--text3)', marginBottom: 10, cursor: 'pointer' }}
              onMouseEnter={e => e.target.style.color = 'var(--text2)'}
              onMouseLeave={e => e.target.style.color = 'var(--text3)'}
            >{l}</div>
          ))}
        </div>
      </div>

      <div style={{
        paddingTop: 24, borderTop: '1px solid var(--border)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: 12,
      }}>
        <span style={{ fontSize: 13, color: 'var(--text3)' }}>
          © 2025 PathWise. All rights reserved. | FSAD-PS24 Project
        </span>
        <span style={{ fontSize: 12, color: 'var(--text3)' }}>
          Made with ❤️ for career success
        </span>
      </div>
    </div>
  </footer>
);

export default Footer;
