import React, { useState } from 'react';

const plans = [
  {
    name: 'Free', price: { monthly: 0, yearly: 0 }, icon: '🌱',
    desc: 'Perfect to explore your options',
    features: ['Basic career assessment', '3 career path guides', 'Community access', 'Job board access', '2 mentor messages/month'],
    cta: 'Get Started Free', color: 'var(--text2)',
    highlight: false,
  },
  {
    name: 'Pro', price: { monthly: 499, yearly: 399 }, icon: '⚡',
    desc: 'For serious career growth',
    features: ['Full AI assessment suite', 'Unlimited career paths', '4 mentor sessions/month', 'Custom roadmap', 'Resume & LinkedIn review', 'Priority support'],
    cta: 'Start Pro Trial', color: 'var(--accent)',
    highlight: true,
  },
  {
    name: 'Elite', price: { monthly: 999, yearly: 799 }, icon: '👑',
    desc: 'For accelerated placement',
    features: ['Everything in Pro', 'Unlimited mentor sessions', 'Dedicated career coach', 'Mock interviews', 'Company referrals', 'Placement guarantee'],
    cta: 'Go Elite', color: '#FFB830',
    highlight: false,
  },
];

const Pricing = () => {
  const [yearly, setYearly] = useState(false);

  return (
    <section id="pricing" style={{ padding: '100px 24px', background: 'var(--bg2)' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{
            display: 'inline-block', background: 'rgba(255,184,48,0.1)',
            border: '1px solid rgba(255,184,48,0.3)', borderRadius: 100,
            padding: '6px 18px', marginBottom: 20,
            fontSize: 12, color: 'var(--gold)', fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase',
          }}>Pricing</div>
          <h2 style={{
            fontFamily: 'Syne, sans-serif', fontSize: 'clamp(28px, 4vw, 48px)',
            fontWeight: 800, marginBottom: 16,
          }}>Invest in <span style={{ color: 'var(--gold)' }}>Your Future</span></h2>
          <p style={{ color: 'var(--text2)', marginBottom: 28, lineHeight: 1.7 }}>
            Transparent pricing, no hidden fees. Start free and scale as you grow.
          </p>

          {/* Toggle */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 100, padding: '6px 16px' }}>
            <span style={{ fontSize: 14, color: !yearly ? 'white' : 'var(--text3)' }}>Monthly</span>
            <div onClick={() => setYearly(!yearly)} style={{
              width: 44, height: 24, borderRadius: 100, cursor: 'pointer',
              background: yearly ? 'var(--accent)' : 'var(--surface2)',
              transition: 'all 0.3s', position: 'relative',
              border: '1px solid var(--border2)',
            }}>
              <div style={{
                position: 'absolute', top: 2, left: yearly ? 20 : 2,
                width: 18, height: 18, borderRadius: '50%',
                background: 'white', transition: 'all 0.3s',
              }} />
            </div>
            <span style={{ fontSize: 14, color: yearly ? 'white' : 'var(--text3)' }}>Yearly</span>
            {yearly && <span style={{ fontSize: 11, color: 'var(--green)', background: 'rgba(0,229,160,0.15)', borderRadius: 100, padding: '2px 8px', fontWeight: 700 }}>Save 20%</span>}
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 20, alignItems: 'start',
        }}>
          {plans.map((plan, i) => (
            <div key={i} style={{
              background: plan.highlight ? 'linear-gradient(145deg, rgba(61,127,255,0.12), rgba(123,79,255,0.12))' : 'var(--surface)',
              border: `1px solid ${plan.highlight ? 'var(--accent)' : 'var(--border)'}`,
              borderRadius: 20, padding: '28px 24px',
              position: 'relative', overflow: 'hidden',
              transform: plan.highlight ? 'scale(1.03)' : 'scale(1)',
              boxShadow: plan.highlight ? '0 0 40px rgba(61,127,255,0.2)' : 'none',
            }}>
              {plan.highlight && (
                <div style={{
                  position: 'absolute', top: 14, right: 14,
                  fontSize: 11, fontWeight: 700, color: 'white',
                  background: 'linear-gradient(135deg, var(--accent), var(--accent3))',
                  borderRadius: 100, padding: '4px 10px', letterSpacing: 0.5,
                }}>MOST POPULAR</div>
              )}

              <div style={{ fontSize: 28, marginBottom: 10 }}>{plan.icon}</div>
              <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 20, fontWeight: 800, marginBottom: 4 }}>{plan.name}</div>
              <div style={{ fontSize: 13, color: 'var(--text2)', marginBottom: 20 }}>{plan.desc}</div>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 24 }}>
                {plan.price.monthly === 0 ? (
                  <span style={{ fontFamily: 'Syne, sans-serif', fontSize: 36, fontWeight: 800, color: 'var(--green)' }}>Free</span>
                ) : (
                  <>
                    <span style={{ fontFamily: 'Syne, sans-serif', fontSize: 36, fontWeight: 800, color: plan.color }}>
                      ₹{yearly ? plan.price.yearly : plan.price.monthly}
                    </span>
                    <span style={{ fontSize: 14, color: 'var(--text3)' }}>/mo</span>
                  </>
                )}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
                {plan.features.map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: 'var(--text2)' }}>
                    <span style={{ color: 'var(--green)', flexShrink: 0, marginTop: 1 }}>✓</span>
                    {f}
                  </div>
                ))}
              </div>

              <button style={{
                width: '100%',
                background: plan.highlight
                  ? 'linear-gradient(135deg, var(--accent), var(--accent3))'
                  : 'transparent',
                border: plan.highlight ? 'none' : `1px solid ${plan.color}50`,
                cursor: 'pointer',
                color: plan.highlight ? 'white' : plan.color,
                fontSize: 14, fontWeight: 600, padding: '13px',
                borderRadius: 12, transition: 'all 0.2s',
                fontFamily: 'DM Sans, sans-serif',
                boxShadow: plan.highlight ? '0 0 20px rgba(61,127,255,0.3)' : 'none',
              }}
              onMouseEnter={e => e.target.style.opacity = '0.85'}
              onMouseLeave={e => e.target.style.opacity = '1'}
              >{plan.cta}</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
