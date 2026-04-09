import React, { useState, useEffect } from 'react';

const testimonials = [
  { name: 'Aditya Kumar', role: 'Placed at Infosys as SDE', initials: 'AK', bg: 'linear-gradient(135deg,#3D7FFF,#7B4FFF)', quote: 'PathWise completely changed my career trajectory. The AI assessment was spot on — it identified software engineering as my perfect match. Within 6 months of following the roadmap, I landed my dream job at Infosys!' },
  { name: 'Divya Menon', role: 'UX Designer at Swiggy', initials: 'DM', bg: 'linear-gradient(135deg,#FF6B9D,#B44FFF)', quote: "I was confused between 3 career options. PathWise's mentor Kavya guided me through each option with real industry insights. I chose UX design and couldn't be happier. The platform ROI is insane!" },
  { name: 'Rohit Joshi', role: 'Data Analyst at HDFC', initials: 'RJ', bg: 'linear-gradient(135deg,#00D4FF,#00E5A0)', quote: 'The career assessment identified my analytical strengths I never even knew I had. The skill roadmap was perfectly structured. Got placed at HDFC within 4 months. 100% recommend to every student!' },
  { name: 'Ananya Reddy', role: 'Product Manager at Razorpay', initials: 'AR', bg: 'linear-gradient(135deg,#FFB830,#FF6B3D)', quote: "PathWise's mentorship program is genuinely outstanding. My mentor Sneha had real product experience at top companies. Her advice on interview preparation was exactly what I needed to crack Razorpay." },
  { name: 'Suresh Nair', role: 'ML Engineer at Juspay', initials: 'SN', bg: 'linear-gradient(135deg,#7B4FFF,#3D7FFF)', quote: "The AI-powered skill gap analysis was incredibly accurate. PathWise showed me exactly what I needed to learn for ML roles and connected me with resources. Placed at Juspay with a 200% salary hike!" },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, []);

  const t = testimonials[current];

  return (
    <section id="testimonials" style={{ padding: '100px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{
            display: 'inline-block', background: 'rgba(61,127,255,0.1)',
            border: '1px solid rgba(61,127,255,0.3)', borderRadius: 100,
            padding: '6px 18px', marginBottom: 20,
            fontSize: 12, color: 'var(--accent)', fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase',
          }}>Success Stories</div>
          <h2 style={{
            fontFamily: 'Syne, sans-serif', fontSize: 'clamp(28px, 4vw, 48px)',
            fontWeight: 800, marginBottom: 16,
          }}>Students Who <span style={{ color: 'var(--accent)' }}>Made It</span></h2>
        </div>

        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 24, padding: '40px', position: 'relative', overflow: 'hidden',
          minHeight: 240,
        }}>
          <div style={{
            position: 'absolute', top: -30, right: -30, fontSize: 120,
            opacity: 0.04, fontFamily: 'serif', lineHeight: 1,
          }}>"</div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
            <div style={{
              width: 52, height: 52, borderRadius: '50%', background: t.bg,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'Syne, sans-serif', fontSize: 16, fontWeight: 800, color: 'white', flexShrink: 0,
            }}>{t.initials}</div>
            <div>
              <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 16, fontWeight: 700 }}>{t.name}</div>
              <div style={{ fontSize: 13, color: 'var(--accent2)' }}>{t.role}</div>
            </div>
            <div style={{ marginLeft: 'auto', color: '#FFB830', fontSize: 18 }}>★★★★★</div>
          </div>

          <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text2)', fontStyle: 'italic' }}>"{t.quote}"</p>
        </div>

        {/* Dots */}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 24 }}>
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} style={{
              width: i === current ? 24 : 8, height: 8, borderRadius: 100,
              background: i === current ? 'var(--accent)' : 'var(--surface2)',
              border: 'none', cursor: 'pointer', transition: 'all 0.3s', padding: 0,
            }} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
