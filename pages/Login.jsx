import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../src/utils/axiosConfig';
import Footer from '../Footer';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill out all fields.');
      return;
    }
    
    try {
      const response = await axiosInstance.post('/auth/login', { email, password });
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', email);
        localStorage.setItem('role', response.data.role);
        localStorage.setItem('name', response.data.name);
        window.dispatchEvent(new Event('storage'));
        navigate('/');
      }
    } catch (err) {
      setError('Invalid credentials or network error.');
    }
  };

  return (
    <>
      <div style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', paddingTop: '100px', paddingBottom: '60px' }}>
        <div style={{ maxWidth: 450, width: '100%', padding: '40px', background: 'var(--surface)', borderRadius: '24px', border: '1px solid var(--border)', boxShadow: '0 12px 40px rgba(0,0,0,0.5)', position: 'relative' }}>
          
          <div style={{
              position: 'absolute', top: -50, right: -50, width: 250, height: 250,
              borderRadius: '50%', background: 'var(--accent3)20', filter: 'blur(60px)',
              pointerEvents: 'none', zIndex: 0
          }} />
          <div style={{
              position: 'absolute', bottom: -50, left: -50, width: 250, height: 250,
              borderRadius: '50%', background: 'var(--accent)20', filter: 'blur(60px)',
              pointerEvents: 'none', zIndex: 0
          }} />

          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', marginBottom: 30 }}>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '32px', fontWeight: 800, color: 'white', marginBottom: '8px' }}>
              Welcome <span style={{ color: 'var(--accent2)' }}>Back</span>
            </h2>
            <p style={{ color: 'var(--text2)', fontSize: '15px' }}>
              Sign in to continue exploring your career path.
            </p>
          </div>

          <form style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }} onSubmit={handleLogin}>
            {error && <div style={{ color: 'var(--red)', fontSize: '14px', background: 'rgba(255,79,106,0.1)', padding: '12px', borderRadius: '8px', textAlign: 'center', border: '1px solid rgba(255,79,106,0.3)' }}>{error}</div>}
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '13px', color: 'var(--text2)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Email Address</label>
              <input
                type="email"
                required
                style={{ width: '100%', padding: '14px 16px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: '12px', color: 'white', fontSize: '15px', outline: 'none', transition: 'border-color 0.2s' }}
                onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'}
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '13px', color: 'var(--text2)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Password</label>
              <input
                type="password"
                required
                style={{ width: '100%', padding: '14px 16px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: '12px', color: 'white', fontSize: '15px', outline: 'none', transition: 'border-color 0.2s' }}
                onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              style={{
                marginTop: '10px', width: '100%', background: 'linear-gradient(135deg, var(--accent), var(--accent3))',
                border: 'none', color: 'white', fontSize: '16px', fontWeight: 600, padding: '14px', borderRadius: '12px',
                cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s', boxShadow: 'var(--glow)', fontFamily: 'DM Sans, sans-serif'
              }}
              onMouseEnter={e => { e.target.style.transform = 'scale(1.02)'; e.target.style.boxShadow = '0 0 50px rgba(61,127,255,0.4)'; }}
              onMouseLeave={e => { e.target.style.transform = 'scale(1)'; e.target.style.boxShadow = 'var(--glow)'; }}
            >
              Sign In
            </button>
            
            <div style={{ textAlign: 'center', fontSize: '14px', color: 'var(--text2)', marginTop: '8px' }}>
                Don't have an account? <Link to="/register" style={{ color: 'var(--accent2)', textDecoration: 'none', fontWeight: 600 }}>Sign up</Link>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;
