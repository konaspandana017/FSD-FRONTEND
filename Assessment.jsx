import React, { useState } from 'react';

const questions = [
  {
    q: 'What type of work energizes you most?',
    options: [
      { label: 'Building & creating systems', val: 'tech' },
      { label: 'Analyzing data & patterns', val: 'data' },
      { label: 'Designing visuals & experiences', val: 'design' },
      { label: 'Leading teams & strategy', val: 'management' },
    ],
  },
  {
    q: 'How do you prefer to solve problems?',
    options: [
      { label: 'Logic and code', val: 'tech' },
      { label: 'Research and statistics', val: 'data' },
      { label: 'Creative thinking', val: 'design' },
      { label: 'Team collaboration', val: 'management' },
    ],
  },
  {
    q: 'What matters most to you in a career?',
    options: [
      { label: 'Technical mastery', val: 'tech' },
      { label: 'Insights & discovery', val: 'data' },
      { label: 'Aesthetic impact', val: 'design' },
      { label: 'Influence & growth', val: 'management' },
    ],
  },
];

const results = {
  tech: { path: 'Software Engineering', icon: '💻', desc: 'Your analytical and logical mindset is perfect for building software systems.', color: '#3D7FFF' },
  data: { path: 'Data Science & Analytics', icon: '📊', desc: 'You thrive on uncovering patterns and turning data into insights.', color: '#00D4FF' },
  design: { path: 'UI/UX Design', icon: '🎨', desc: 'Your creative vision and empathy make you a natural designer.', color: '#FF6B9D' },
  management: { path: 'Product Management', icon: '📈', desc: 'You are a strategic thinker who can lead teams toward impactful goals.', color: '#7B4FFF' },
};

const Assessment = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [selected, setSelected] = useState(null);

  const handleSelect = (val) => {
    setSelected(val);
    setTimeout(() => {
      const newAnswers = [...answers, val];
      if (step < questions.length - 1) {
        setAnswers(newAnswers);
        setStep(step + 1);
        setSelected(null);
      } else {
        // Tally
        const counts = {};
        newAnswers.forEach(a => counts[a] = (counts[a] || 0) + 1);
        const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
        setResult(results[top]);
      }
    }, 300);
  };

  const reset = () => { setStep(0); setAnswers([]); setResult(null); setSelected(null); };

  return (
    <section id="assessment" style={{ padding: '100px 24px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{
            display: 'inline-block', background: 'rgba(0,229,160,0.1)',
            border: '1px solid rgba(0,229,160,0.3)', borderRadius: 100,
            padding: '6px 18px', marginBottom: 20,
            fontSize: 12, color: 'var(--green)', fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase',
          }}>Quick Assessment</div>
          <h2 style={{
            fontFamily: 'Syne, sans-serif', fontSize: 'clamp(26px, 4vw, 42px)',
            fontWeight: 800, marginBottom: 16,
          }}>Discover Your <span style={{ color: 'var(--green)' }}>Career Match</span></h2>
          <p style={{ color: 'var(--text2)', lineHeight: 1.7 }}>Answer 3 quick questions and get an instant career path recommendation.</p>
        </div>

        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 24, padding: '36px', overflow: 'hidden',
        }}>
          {!result ? (
            <>
              {/* Progress */}
              <div style={{ marginBottom: 28 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 13, color: 'var(--text2)' }}>Question {step + 1} of {questions.length}</span>
                  <span style={{ fontSize: 13, color: 'var(--accent2)' }}>{Math.round(((step) / questions.length) * 100)}%</span>
                </div>
                <div style={{ height: 4, background: 'var(--surface2)', borderRadius: 99, overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', borderRadius: 99,
                    background: 'linear-gradient(90deg, var(--accent), var(--accent2))',
                    width: `${((step) / questions.length) * 100}%`,
                    transition: 'width 0.4s ease',
                  }} />
                </div>
              </div>

              <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 20, fontWeight: 700, marginBottom: 24, lineHeight: 1.4 }}>
                {questions[step].q}
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {questions[step].options.map((opt, i) => (
                  <button key={i} onClick={() => handleSelect(opt.val)} style={{
                    background: selected === opt.val ? 'rgba(61,127,255,0.2)' : 'var(--surface2)',
                    border: `1px solid ${selected === opt.val ? 'var(--accent)' : 'var(--border)'}`,
                    cursor: 'pointer', color: selected === opt.val ? 'white' : 'var(--text2)',
                    fontSize: 15, fontWeight: 500, padding: '14px 18px', borderRadius: 12,
                    textAlign: 'left', transition: 'all 0.2s', fontFamily: 'DM Sans, sans-serif',
                  }}
                  onMouseEnter={e => { if (selected !== opt.val) { e.target.style.borderColor = 'var(--border2)'; e.target.style.color = 'white'; }}}
                  onMouseLeave={e => { if (selected !== opt.val) { e.target.style.borderColor = 'var(--border)'; e.target.style.color = 'var(--text2)'; }}}
                  >{opt.label}</button>
                ))}
              </div>
            </>
          ) : (
            <div style={{ textAlign: 'center', animation: 'slide-up 0.5s ease' }}>
              <div style={{ fontSize: 64, marginBottom: 16 }}>{result.icon}</div>
              <div style={{ fontSize: 12, color: result.color, textTransform: 'uppercase', letterSpacing: 2, fontWeight: 700, marginBottom: 8 }}>Your Best Match</div>
              <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 26, fontWeight: 800, color: result.color, marginBottom: 14 }}>{result.path}</h3>
              <p style={{ color: 'var(--text2)', lineHeight: 1.7, maxWidth: 400, margin: '0 auto 28px' }}>{result.desc}</p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <button onClick={() => document.getElementById('career-paths').scrollIntoView({behavior:'smooth'})} style={{
                  background: `linear-gradient(135deg, ${result.color}, ${result.color}aa)`,
                  border: 'none', cursor: 'pointer', color: 'white',
                  fontSize: 14, fontWeight: 600, padding: '12px 24px', borderRadius: 10,
                  fontFamily: 'DM Sans, sans-serif',
                }}>Explore This Path →</button>
                <button onClick={reset} style={{
                  background: 'transparent', border: '1px solid var(--border2)',
                  cursor: 'pointer', color: 'var(--text2)', fontSize: 14,
                  fontWeight: 500, padding: '12px 24px', borderRadius: 10,
                  fontFamily: 'DM Sans, sans-serif',
                }}>Retake Quiz</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Assessment;
