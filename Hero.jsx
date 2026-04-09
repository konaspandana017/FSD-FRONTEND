import React, { useEffect, useRef } from 'react';

const Hero = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.3,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.5 + 0.1,
        color: Math.random() > 0.5 ? '61,127,255' : '123,79,255',
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.dx; p.y += p.dy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
        ctx.fill();
      });
      // Draw connections
      particles.forEach((p, i) => {
        particles.slice(i + 1).forEach(q => {
          const dist = Math.hypot(p.x - q.x, p.y - q.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(61,127,255,${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <section id="home" style={{
      minHeight: '100vh', position: 'relative', display: 'flex',
      alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
      padding: '120px 24px 80px',
    }}>
      <canvas ref={canvasRef} style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
      }} />

      {/* Background gradient orbs */}
      <div style={{
        position: 'absolute', top: '15%', left: '10%',
        width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(61,127,255,0.08) 0%, transparent 70%)',
        filter: 'blur(40px)', animation: 'float 8s ease-in-out infinite',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '20%', right: '5%',
        width: 400, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(123,79,255,0.1) 0%, transparent 70%)',
        filter: 'blur(40px)', animation: 'float 10s ease-in-out infinite 2s',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 800 }}>
        {/* Badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'rgba(61,127,255,0.1)', border: '1px solid rgba(61,127,255,0.3)',
          borderRadius: 100, padding: '8px 18px', marginBottom: 32,
          animation: 'slide-up 0.5s ease forwards',
        }}>
          <span style={{ fontSize: 12, color: 'var(--accent2)', fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase' }}>
            🚀 AI-Powered Career Platform
          </span>
        </div>

        <h1 style={{
          fontFamily: 'Syne, sans-serif',
          fontSize: 'clamp(38px, 7vw, 78px)',
          fontWeight: 800, lineHeight: 1.08, marginBottom: 24,
          animation: 'slide-up 0.6s ease 0.1s both',
        }}>
          Discover Your{' '}
          <span style={{
            background: 'linear-gradient(135deg, var(--accent), var(--accent2), var(--accent3))',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundSize: '200%', animation: 'shimmer 3s linear infinite',
          }}>Perfect Career</span>
          {' '}Path
        </h1>

        <p style={{
          fontSize: 'clamp(15px, 2vw, 19px)', color: 'var(--text2)',
          lineHeight: 1.7, maxWidth: 580, margin: '0 auto 40px',
          animation: 'slide-up 0.6s ease 0.2s both',
        }}>
          Get personalized career guidance, connect with expert mentors, and unlock 
          your true potential with AI-driven insights tailored to your skills and interests.
        </p>

        <div style={{
          display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap',
          animation: 'slide-up 0.6s ease 0.3s both',
        }}>
          <button onClick={() => document.getElementById('cta').scrollIntoView({behavior:'smooth'})} style={{
            background: 'linear-gradient(135deg, var(--accent), var(--accent3))',
            border: 'none', cursor: 'pointer', color: 'white',
            fontSize: 16, fontWeight: 600, padding: '16px 34px', borderRadius: 12,
            boxShadow: '0 0 30px rgba(61,127,255,0.4)',
            transition: 'all 0.25s', fontFamily: 'DM Sans, sans-serif',
          }}
          onMouseEnter={e => { e.target.style.transform='translateY(-2px)'; e.target.style.boxShadow='0 8px 40px rgba(61,127,255,0.5)'; }}
          onMouseLeave={e => { e.target.style.transform='translateY(0)'; e.target.style.boxShadow='0 0 30px rgba(61,127,255,0.4)'; }}
          >Start Your Journey →</button>
          
          <button onClick={() => document.getElementById('features').scrollIntoView({behavior:'smooth'})} style={{
            background: 'transparent', border: '1px solid var(--border2)',
            cursor: 'pointer', color: 'var(--text)',
            fontSize: 16, fontWeight: 500, padding: '16px 34px', borderRadius: 12,
            transition: 'all 0.25s', fontFamily: 'DM Sans, sans-serif',
          }}
          onMouseEnter={e => { e.target.style.borderColor='var(--accent)'; e.target.style.background='rgba(61,127,255,0.08)'; }}
          onMouseLeave={e => { e.target.style.borderColor='var(--border2)'; e.target.style.background='transparent'; }}
          >Explore Features</button>
        </div>

        {/* Stats row */}
        <div style={{
          display: 'flex', gap: 32, justifyContent: 'center', flexWrap: 'wrap',
          marginTop: 64, paddingTop: 40,
          borderTop: '1px solid var(--border)',
          animation: 'slide-up 0.6s ease 0.4s both',
        }}>
          {[
            { value: '50K+', label: 'Students Guided' },
            { value: '200+', label: 'Expert Mentors' },
            { value: '150+', label: 'Career Paths' },
            { value: '94%', label: 'Success Rate' },
          ].map(stat => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: 'Syne, sans-serif', fontSize: 28, fontWeight: 800,
                background: 'linear-gradient(135deg, var(--accent2), var(--accent))',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>{stat.value}</div>
              <div style={{ fontSize: 13, color: 'var(--text3)', marginTop: 4 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
