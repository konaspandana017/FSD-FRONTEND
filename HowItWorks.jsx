import React from 'react';

const steps = [
  { num: '01', icon: '📝', title: 'Create Your Profile', desc: 'Sign up and complete a detailed profile highlighting your education, skills, interests, and career aspirations.' },
  { num: '02', icon: '🧠', title: 'Take AI Assessment', desc: 'Complete our scientifically-validated psychometric and aptitude tests. Our AI analyzes 50+ data points to understand you deeply.' },
  { num: '03', icon: '🗺️', title: 'Get Your Roadmap', desc: 'Receive a personalized career roadmap with clear milestones, recommended skills, courses, and timeline.' },
  { num: '04', icon: '👨‍🏫', title: 'Connect with Mentors', desc: 'Match with expert mentors from your target industry for 1-on-1 sessions, guidance, and real-world insights.' },
  { num: '05', icon: '📈', title: 'Track & Grow', desc: 'Monitor your progress, complete milestones, get feedback, and continuously refine your strategy for success.' },
];

const HowItWorks = () => (
  <section id="how-it-works" style={{ padding: '100px 24px' }}>
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 64 }}>
        <div style={{
          display: 'inline-block', background: 'rgba(0,229,160,0.1)',
          border: '1px solid rgba(0,229,160,0.3)', borderRadius: 100,
          padding: '6px 18px', marginBottom: 20,
          fontSize: 12, color: 'var(--green)', fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase',
        }}>How It Works</div>
        <h2 style={{
          fontFamily: 'Syne, sans-serif', fontSize: 'clamp(28px, 4vw, 48px)',
          fontWeight: 800, marginBottom: 16,
        }}>
          Your Career Success<br /><span style={{ color: 'var(--accent2)' }}>in 5 Simple Steps</span>
        </h2>
      </div>

      <div style={{ position: 'relative' }}>
        {/* Vertical line */}
        <div style={{
          position: 'absolute', left: 27, top: 0, bottom: 0, width: 2,
          background: 'linear-gradient(to bottom, var(--accent), var(--accent3), transparent)',
          opacity: 0.3,
        }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {steps.map((step, i) => (
            <div key={i} style={{
              display: 'flex', gap: 24, alignItems: 'flex-start',
              paddingBottom: 40, position: 'relative',
            }}>
              {/* Circle */}
              <div style={{
                flexShrink: 0, width: 56, height: 56, borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--accent), var(--accent3))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 22, zIndex: 1, boxShadow: '0 0 20px rgba(61,127,255,0.35)',
              }}>{step.icon}</div>

              {/* Content */}
              <div style={{
                flex: 1, background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: 16, padding: '20px 24px',
                transition: 'all 0.3s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border2)'; e.currentTarget.style.background = 'var(--surface2)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--surface)'; }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <span style={{
                    fontFamily: 'Syne, sans-serif', fontSize: 11, fontWeight: 800,
                    color: 'var(--accent)', letterSpacing: 2,
                  }}>STEP {step.num}</span>
                </div>
                <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{step.title}</h3>
                <p style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.7 }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default HowItWorks;
