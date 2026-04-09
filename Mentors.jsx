import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from './src/utils/axiosConfig';

const staticMentors = [
  { name: 'Karthik Reddy', expertise: 'Senior SDE @ Google', exp: '9 yrs', sessions: '420+', rating: 4.9, tags: ['Software Eng', 'DSA', 'System Design'], color: '#3D7FFF', initials: 'KR', bg: 'linear-gradient(135deg,#3D7FFF,#7B4FFF)' },
  { name: 'Ananya Sharma', expertise: 'ML Engineer @ Amazon', exp: '7 yrs', sessions: '310+', rating: 4.8, tags: ['ML/AI', 'Python', 'NLP'], color: '#7B4FFF', initials: 'AS', bg: 'linear-gradient(135deg,#7B4FFF,#FF6B9D)' },
  { name: 'Rajesh Varma', expertise: 'Product Lead @ Flipkart', exp: '10 yrs', sessions: '530+', rating: 5.0, tags: ['Product Mgmt', 'Strategy', 'Agile'], color: '#00D4FF', initials: 'RV', bg: 'linear-gradient(135deg,#00D4FF,#00E5A0)' },
  { name: 'Rakesh Naidu', expertise: 'Cybersec Specialist @ TCS', exp: '8 yrs', sessions: '280+', rating: 4.9, tags: ['Cybersecurity', 'Networking', 'CISSP'], color: '#FFB830', initials: 'RN', bg: 'linear-gradient(135deg,#FFB830,#FF6B3D)' },
];

const Mentors = () => {
  const [hovered, setHovered] = useState(null);
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await axiosInstance.get('/mentors');
        if (response.data && response.data.length > 0) {
          // Merge backend fields with our static design constants for visualization
          const fetchedMentors = response.data.map((m, index) => ({
            ...staticMentors[index % staticMentors.length],
            id: m.id,
            name: m.name,
            expertise: m.expertise
          }));
          setMentors(fetchedMentors);
        } else {
          // Auto-seed database if empty
          for (let sm of staticMentors) {
            await axiosInstance.post('/mentors', { name: sm.name, expertise: sm.expertise });
          }
          const newlySeeded = await axiosInstance.get('/mentors');
          setMentors(newlySeeded.data.map((m, index) => ({
            ...staticMentors[index % staticMentors.length],
             id: m.id, name: m.name, expertise: m.expertise
          })));
        }
      } catch (err) {
        console.error('Error fetching mentors', err);
        setMentors(staticMentors); // fallback
      } finally {
        setLoading(false);
      }
    };
    fetchMentors();
  }, []);

  if (loading) return <div style={{padding: 100, textAlign: 'center'}}>Loading mentors...</div>;

  return (
    <section id="mentors" style={{ padding: '100px 24px', background: 'var(--bg2)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{
            display: 'inline-block', background: 'rgba(255,107,157,0.1)',
            border: '1px solid rgba(255,107,157,0.3)', borderRadius: 100,
            padding: '6px 18px', marginBottom: 20,
            fontSize: 12, color: '#FF6B9D', fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase',
          }}>Expert Mentors</div>
          <h2 style={{
            fontFamily: 'Syne, sans-serif', fontSize: 'clamp(28px, 4vw, 48px)',
            fontWeight: 800, marginBottom: 16,
          }}>Learn from <span style={{ color: '#FF6B9D' }}>Industry Veterans</span></h2>
          <p style={{ color: 'var(--text2)', maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>
            Our mentors are verified professionals from top companies who've walked the path you're on.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 20,
        }}>
          {mentors.map((m, i) => (
            <div key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: hovered === i ? 'var(--surface2)' : 'var(--surface)',
                border: `1px solid ${hovered === i ? m.color + '44' : 'var(--border)'}`,
                borderRadius: 18, padding: '24px', transition: 'all 0.3s',
                transform: hovered === i ? 'translateY(-4px)' : 'translateY(0)',
                boxShadow: hovered === i ? `0 12px 40px ${m.color}20` : 'none',
              }}>
              {/* Avatar + info */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                <div style={{
                  width: 52, height: 52, borderRadius: '50%',
                  background: m.bg, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontFamily: 'Syne, sans-serif',
                  fontSize: 16, fontWeight: 800, color: 'white',
                  flexShrink: 0,
                }}>{m.initials}</div>
                <div>
                  <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 15, fontWeight: 700 }}>{m.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text2)' }}>{m.expertise || m.role}</div>
                </div>
              </div>

              {/* Stats row */}
              <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
                <div style={{ flex: 1, background: 'var(--surface2)', borderRadius: 10, padding: '10px', textAlign: 'center' }}>
                  <div style={{ fontSize: 14, fontWeight: 700, fontFamily: 'Syne, sans-serif', color: m.color }}>{m.sessions}</div>
                  <div style={{ fontSize: 11, color: 'var(--text3)' }}>Sessions</div>
                </div>
                <div style={{ flex: 1, background: 'var(--surface2)', borderRadius: 10, padding: '10px', textAlign: 'center' }}>
                  <div style={{ fontSize: 14, fontWeight: 700, fontFamily: 'Syne, sans-serif', color: '#FFB830' }}>⭐ {m.rating}</div>
                  <div style={{ fontSize: 11, color: 'var(--text3)' }}>Rating</div>
                </div>
                <div style={{ flex: 1, background: 'var(--surface2)', borderRadius: 10, padding: '10px', textAlign: 'center' }}>
                  <div style={{ fontSize: 14, fontWeight: 700, fontFamily: 'Syne, sans-serif', color: 'var(--green)' }}>{m.exp}</div>
                  <div style={{ fontSize: 11, color: 'var(--text3)' }}>Experience</div>
                </div>
              </div>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
                {m.tags.map(t => (
                  <span key={t} style={{
                    fontSize: 11, color: m.color, background: m.color + '15',
                    border: `1px solid ${m.color}30`, borderRadius: 6, padding: '3px 8px', fontWeight: 600,
                  }}>{t}</span>
                ))}
              </div>

              <button style={{
                width: '100%', background: m.color + '18',
                border: `1px solid ${m.color}40`, cursor: 'pointer',
                color: m.color, fontSize: 13, fontWeight: 600, padding: '11px',
                borderRadius: 10, transition: 'all 0.2s', fontFamily: 'DM Sans, sans-serif',
              }}
              onClick={() => navigate(`/book/${encodeURIComponent(m.name)}`)}
              onMouseEnter={e => { e.target.style.background = m.color; e.target.style.color = 'white'; }}
              onMouseLeave={e => { e.target.style.background = m.color + '18'; e.target.style.color = m.color; }}
              >Book a Session</button>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <button style={{
            background: 'transparent', border: '1px solid var(--border2)',
            cursor: 'pointer', color: 'var(--text)', fontSize: 15,
            fontWeight: 600, padding: '14px 32px', borderRadius: 12,
            transition: 'all 0.2s', fontFamily: 'DM Sans, sans-serif',
          }}
          onMouseEnter={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.background = 'rgba(61,127,255,0.08)'; }}
          onMouseLeave={e => { e.target.style.borderColor = 'var(--border2)'; e.target.style.background = 'transparent'; }}
          >View All 200+ Mentors →</button>
        </div>
      </div>
    </section>
  );
};

export default Mentors;
