import React, { useState } from 'react';

const CTAStrip = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (email.includes('@')) {
      setSubmitted(true);
    }
  };

  return (
    <section id="cta" style={{
      padding: '80px 24px',
      background: 'linear-gradient(135deg, rgba(61,127,255,0.1), rgba(123,79,255,0.1))',
      borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)',
    }}>
      <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>🚀</div>
        <h2 style={{
          fontFamily: 'Syne, sans-serif', fontSize: 'clamp(26px, 4vw, 44px)',
          fontWeight: 800, marginBottom: 14,
        }}>
          Start Your Career Journey <span style={{ color: 'var(--accent2)' }}>Today</span>
        </h2>
        <p style={{ color: 'var(--text2)', marginBottom: 32, lineHeight: 1.7, fontSize: 16 }}>
          Join 50,000+ students who've discovered their perfect career path with PathWise. 
          Free to start, no credit card required.
        </p>

        {!submitted ? (
          <div style={{ display: 'flex', gap: 12, maxWidth: 460, margin: '0 auto', flexWrap: 'wrap', justifyContent: 'center' }}>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email address"
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              style={{
                flex: 1, minWidth: 220,
                background: 'var(--surface)', border: '1px solid var(--border2)',
                color: 'white', fontSize: 15, padding: '14px 18px', borderRadius: 12,
                outline: 'none', fontFamily: 'DM Sans, sans-serif',
              }}
              onFocus={e => e.target.style.borderColor = 'var(--accent)'}
              onBlur={e => e.target.style.borderColor = 'var(--border2)'}
            />
            <button onClick={handleSubmit} style={{
              background: 'linear-gradient(135deg, var(--accent), var(--accent3))',
              border: 'none', cursor: 'pointer', color: 'white',
              fontSize: 15, fontWeight: 600, padding: '14px 26px', borderRadius: 12,
              boxShadow: '0 0 24px rgba(61,127,255,0.35)',
              transition: 'all 0.2s', fontFamily: 'DM Sans, sans-serif', whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => e.target.style.transform = 'scale(1.04)'}
            onMouseLeave={e => e.target.style.transform = 'scale(1)'}
            >Get Started Free</button>
          </div>
        ) : (
          <div style={{
            background: 'rgba(0,229,160,0.12)', border: '1px solid rgba(0,229,160,0.4)',
            borderRadius: 14, padding: '18px 24px', animation: 'slide-up 0.4s ease',
          }}>
            <div style={{ fontSize: 24, marginBottom: 6 }}>🎉</div>
            <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: 'var(--green)', fontSize: 18 }}>Welcome aboard!</div>
            <div style={{ color: 'var(--text2)', fontSize: 14, marginTop: 4 }}>Check your inbox for your career assessment link.</div>
          </div>
        )}

        <div style={{ display: 'flex', gap: 20, justifyContent: 'center', marginTop: 24, flexWrap: 'wrap' }}>
          {['✓ Free forever plan', '✓ No credit card', '✓ Cancel anytime'].map(item => (
            <span key={item} style={{ fontSize: 13, color: 'var(--text3)' }}>{item}</span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CTAStrip;
