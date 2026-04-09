import React, { useState } from 'react';

const features = [
  {
    icon: '🧠',
    title: 'AI Career Assessment',
    desc: 'Advanced psychometric tests and AI analysis map your personality, skills, and interests to ideal career paths with 94% accuracy.',
    tag: 'AI-Powered',
    color: 'var(--accent)',
  },
  {
    icon: '🎯',
    title: 'Personalized Roadmaps',
    desc: 'Get a step-by-step actionable career roadmap customized to your current skills, goals, and target industry.',
    tag: 'Custom Plans',
    color: 'var(--accent3)',
  },
  {
    icon: '👨‍💼',
    title: '1-on-1 Mentorship',
    desc: 'Connect with verified industry professionals and certified counselors for personalized guidance and insider advice.',
    tag: 'Live Sessions',
    color: 'var(--accent2)',
  },
  {
    icon: '📚',
    title: 'Skill Development',
    desc: 'Access curated courses, certifications, and resources hand-picked by mentors for your specific career target.',
    tag: '500+ Resources',
    color: 'var(--gold)',
  },
  {
    icon: '🌐',
    title: 'Industry Insights',
    desc: 'Real-time salary data, job trends, and market intelligence to make informed career decisions with confidence.',
    tag: 'Live Data',
    color: 'var(--green)',
  },
  {
    icon: '🤝',
    title: 'Networking Hub',
    desc: 'Join peer communities, attend virtual career fairs, and build your professional network before you even graduate.',
    tag: 'Community',
    color: '#FF6B9D',
  },
];

const Features = () => {
  const [hovered, setHovered] = useState(null);

  return (
    <section id="features" style={{ padding: '100px 24px', position: 'relative' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{
            display: 'inline-block', background: 'rgba(123,79,255,0.12)',
            border: '1px solid rgba(123,79,255,0.3)', borderRadius: 100,
            padding: '6px 18px', marginBottom: 20,
            fontSize: 12, color: 'var(--accent3)', fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase',
          }}>Platform Features</div>
          <h2 style={{
            fontFamily: 'Syne, sans-serif', fontSize: 'clamp(28px, 4vw, 48px)',
            fontWeight: 800, marginBottom: 16,
          }}>Everything You Need to<br />
            <span style={{ color: 'var(--accent2)' }}>Launch Your Dream Career</span>
          </h2>
          <p style={{ color: 'var(--text2)', maxWidth: 500, margin: '0 auto', lineHeight: 1.7 }}>
            From self-discovery to job placement, PathWise guides you every step of the way 
            with cutting-edge tools and expert support.
          </p>
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 20,
        }}>
          {features.map((f, i) => (
            <div key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: hovered === i ? 'var(--surface2)' : 'var(--surface)',
                border: `1px solid ${hovered === i ? f.color + '44' : 'var(--border)'}`,
                borderRadius: 18, padding: '28px 28px 24px',
                transition: 'all 0.3s ease',
                transform: hovered === i ? 'translateY(-4px)' : 'translateY(0)',
                boxShadow: hovered === i ? `0 16px 50px ${f.color}22` : 'none',
                cursor: 'default',
              }}>
              <div style={{
                width: 52, height: 52, borderRadius: 14,
                background: f.color + '18', border: `1px solid ${f.color}33`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 24, marginBottom: 18,
                transition: 'all 0.3s',
                transform: hovered === i ? 'scale(1.1)' : 'scale(1)',
              }}>{f.icon}</div>

              <div style={{
                display: 'inline-block', fontSize: 11, fontWeight: 600,
                color: f.color, background: f.color + '15',
                border: `1px solid ${f.color}30`,
                borderRadius: 100, padding: '3px 10px',
                marginBottom: 12, letterSpacing: 0.5, textTransform: 'uppercase',
              }}>{f.tag}</div>

              <h3 style={{
                fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 700,
                marginBottom: 10, color: 'white',
              }}>{f.title}</h3>
              <p style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.7 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
