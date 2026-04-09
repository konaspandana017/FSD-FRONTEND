import React, { useState, useEffect } from 'react';
import axiosInstance from './src/utils/axiosConfig';

const staticPaths = [
  { icon: '💻', title: 'Software Engineering', salary: '₹8L – ₹40L', growth: '+22%', skills: ['DSA', 'System Design', 'Cloud', 'DevOps'], color: '#3D7FFF', desc: 'Build scalable software systems and web/mobile applications driving the digital world.' },
  { icon: '🤖', title: 'AI / Machine Learning', salary: '₹12L – ₹60L', growth: '+35%', skills: ['Python', 'TensorFlow', 'Statistics', 'NLP'], color: '#7B4FFF', desc: 'Design intelligent systems that learn and evolve, powering the next generation of products.' },
  { icon: '📊', title: 'Data Science & Analytics', salary: '₹10L – ₹45L', growth: '+28%', skills: ['SQL', 'Python', 'Tableau', 'Statistics'], color: '#00D4FF', desc: 'Turn raw data into powerful business insights using statistical and visualization tools.' },
  { icon: '🎨', title: 'UI/UX Design', salary: '₹6L – ₹30L', growth: '+18%', skills: ['Figma', 'Prototyping', 'Research', 'CSS'], color: '#FF6B9D', desc: 'Craft beautiful digital experiences that delight users and solve real-world problems.' },
  { icon: '🛡️', title: 'Cyber Security Analyst', salary: '₹7L – ₹35L', growth: '+32%', skills: ['Networking', 'Linux', 'Ethical Hacking', 'CISSP'], color: '#FF4A4A', desc: 'Protect organizations from cyber threats and ensure data integrity securely.' },
  { icon: '☁️', title: 'Cloud Architect', salary: '₹15L – ₹50L', growth: '+26%', skills: ['AWS', 'Azure', 'Kubernetes', 'Docker'], color: '#00B8FF', desc: 'Design and manage large scale cloud infrastructure deployments securely and safely.' },
  { icon: '📈', title: 'Product Manager', salary: '₹12L – ₹55L', growth: '+20%', skills: ['Strategy', 'Agile', 'Market Research', 'Leadership'], color: '#FF9E00', desc: 'Lead cross-functional teams to build products that solve core user problems.' },
  { icon: '👾', title: 'Game Developer', salary: '₹5L – ₹28L', growth: '+15%', skills: ['C++', 'Unity', 'Unreal Engine', '3D Math'], color: '#9C27B0', desc: 'Develop interactive gaming experiences using advanced physics and graphics engines.' }
];

const CareerPaths = () => {
  const [active, setActive] = useState(0);
  const [paths, setPaths] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const response = await axiosInstance.get('/careers');
        if (response.data && response.data.length > 0) {
          const fetchedPaths = response.data.map((p, index) => ({
            ...staticPaths[index % staticPaths.length],
            id: p.id,
            title: p.title,
            desc: p.description
          }));
          setPaths(fetchedPaths);
        } else {
          for (let sp of staticPaths) {
            await axiosInstance.post('/careers', { title: sp.title, description: sp.desc });
          }
          const newlySeeded = await axiosInstance.get('/careers');
          setPaths(newlySeeded.data.map((p, index) => ({
            ...staticPaths[index % staticPaths.length],
            id: p.id, title: p.title, desc: p.description
          })));
        }
      } catch (err) {
        console.error('Error fetching careers', err);
        setPaths(staticPaths);
      } finally {
        setLoading(false);
      }
    };
    fetchCareers();
  }, []);

  if (loading || paths.length === 0) return <div style={{padding: 100, textAlign: 'center'}}>Loading career paths...</div>;

  const p = paths[active] || paths[0];

  return (
    <>
      {modalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(5, 10, 20, 0.8)', backdropFilter: 'blur(10px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setModalOpen(false)}>
          <div style={{ background: 'var(--surface)', padding: 40, borderRadius: 24, border: '1px solid var(--border)', maxWidth: 600, width: '90%' }} onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>{p.icon}</div>
            <h2 style={{ fontFamily: 'Syne', fontSize: 32, marginBottom: 12, color: 'white' }}>{p.title}</h2>
            <p style={{ color: 'var(--text2)', lineHeight: 1.7, marginBottom: 24 }}>{p.desc}</p>
            <div style={{ background: 'var(--bg)', padding: 16, borderRadius: 12, marginBottom: 24 }}>
              <strong>Salary Expectation:</strong> <span style={{ color: 'var(--green)' }}>{p.salary}</span><br />
              <strong>Year over Year Growth:</strong> <span style={{ color: 'var(--accent2)' }}>{p.growth}</span>
            </div>
            <button onClick={() => setModalOpen(false)} style={{ width: '100%', background: 'var(--surface2)', color: 'white', border: '1px solid var(--border)', padding: 14, borderRadius: 12, cursor: 'pointer', fontWeight: 'bold' }}>Close Details</button>
          </div>
        </div>
      )}

      <section id="career-paths" style={{ padding: '100px 24px', background: 'var(--bg2)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{
              display: 'inline-block', background: 'rgba(0,212,255,0.1)',
              border: '1px solid rgba(0,212,255,0.3)', borderRadius: 100,
              padding: '6px 18px', marginBottom: 20,
              fontSize: 12, color: 'var(--accent2)', fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase',
            }}>Explore Paths</div>
            <h2 style={{
              fontFamily: 'Syne, sans-serif', fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 800, marginBottom: 16,
            }}>
              Find Your <span style={{ color: 'var(--accent)' }}>Ideal Career Track</span>
            </h2>
            <p style={{ color: 'var(--text2)', maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>
              Explore trending career paths with salary insights, growth rates, and skill requirements from industry data.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
            {/* Left: path list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {paths.map((path, i) => (
                <button key={i} onClick={() => setActive(i)} style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  background: active === i ? path.color + '15' : 'transparent',
                  border: `1px solid ${active === i ? path.color + '50' : 'var(--border)'}`,
                  borderRadius: 12, padding: '14px 18px', cursor: 'pointer',
                  transition: 'all 0.25s', textAlign: 'left',
                }}>
                  <span style={{ fontSize: 22, flexShrink: 0 }}>{path.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontFamily: 'Syne, sans-serif', fontSize: 14, fontWeight: 600,
                      color: active === i ? 'white' : 'var(--text2)',
                    }}>{path.title}</div>
                    <div style={{ fontSize: 12, color: active === i ? path.color : 'var(--text3)', marginTop: 2 }}>
                      {path.salary}
                    </div>
                  </div>
                  <div style={{
                    fontSize: 11, fontWeight: 700, color: '#00E5A0',
                    background: 'rgba(0,229,160,0.12)', borderRadius: 100,
                    padding: '3px 8px',
                  }}>{path.growth}</div>
                </button>
              ))}
            </div>

            {/* Right: detail card */}
            <div style={{
              background: 'var(--surface)', border: `1px solid ${p.color}33`,
              borderRadius: 20, padding: 32, position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: -40, right: -40, width: 200, height: 200,
                borderRadius: '50%', background: p.color + '10', filter: 'blur(40px)',
                pointerEvents: 'none',
              }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>{p.icon}</div>
                <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 24, fontWeight: 800, marginBottom: 8 }}>{p.title}</h3>
                <p style={{ color: 'var(--text2)', lineHeight: 1.7, marginBottom: 24, fontSize: 15 }}>{p.desc}</p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 24 }}>
                  <div style={{ background: 'var(--surface2)', borderRadius: 12, padding: '14px 16px' }}>
                    <div style={{ fontSize: 11, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>Avg. Salary</div>
                    <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 700, color: 'var(--green)' }}>{p.salary}</div>
                  </div>
                  <div style={{ background: 'var(--surface2)', borderRadius: 12, padding: '14px 16px' }}>
                    <div style={{ fontSize: 11, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>Job Growth</div>
                    <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 700, color: '#00E5A0' }}>{p.growth} YoY</div>
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: 12, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>Key Skills</div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {p.skills.map(s => (
                      <span key={s} style={{
                        background: p.color + '18', border: `1px solid ${p.color}33`,
                        color: p.color, fontSize: 12, fontWeight: 600,
                        borderRadius: 8, padding: '5px 12px',
                      }}>{s}</span>
                    ))}
                  </div>
                </div>

                <button style={{
                  marginTop: 24, width: '100%',
                  background: `linear-gradient(135deg, ${p.color}, ${p.color}aa)`,
                  border: 'none', cursor: 'pointer', color: 'white',
                  fontSize: 15, fontWeight: 600, padding: '14px', borderRadius: 12,
                  fontFamily: 'DM Sans, sans-serif', transition: 'all 0.2s',
                }}
                onClick={() => setModalOpen(true)}
                onMouseEnter={e => e.target.style.opacity = '0.85'}
                onMouseLeave={e => e.target.style.opacity = '1'}
                >Explore {p.title} Path →</button>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            section#career-paths > div > div:last-child { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>
    </>
  );
};

export default CareerPaths;
