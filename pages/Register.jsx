import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../src/utils/axiosConfig';
import Footer from '../Footer';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('STUDENT');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword || !name) {
      setError('Please fill out all fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await axiosInstance.post('/auth/register', { email, password, name, role });
      setSuccess('Account created successfully!');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError('Registration failed. User may already exist.');
    }
  };

  return (
    <>
      <div style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', paddingTop: '100px', paddingBottom: '60px' }}>
        <div style={{ maxWidth: 450, width: '100%', padding: '40px', background: 'var(--surface)', borderRadius: '24px', border: '1px solid var(--border)', boxShadow: '0 12px 40px rgba(0,0,0,0.5)', position: 'relative' }}>
          
          <div style={{
              position: 'absolute', top: -50, left: -50, width: 250, height: 250,
              borderRadius: '50%', background: 'var(--green)15', filter: 'blur(60px)',
              pointerEvents: 'none', zIndex: 0
          }} />

          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', marginBottom: 30 }}>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '32px', fontWeight: 800, color: 'white', marginBottom: '8px' }}>
              Create an <span style={{ color: 'var(--green)' }}>Account</span>
            </h2>
            <p style={{ color: 'var(--text2)', fontSize: '15px' }}>
              Join PathWise and shape your future.
            </p>
          </div>

          <form style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }} onSubmit={handleRegister}>
            {error && <div style={{ color: 'var(--red)', fontSize: '14px', background: 'rgba(255,79,106,0.1)', padding: '12px', borderRadius: '8px', textAlign: 'center', border: '1px solid rgba(255,79,106,0.3)' }}>{error}</div>}
            {success && <div style={{ color: 'var(--green)', fontSize: '14px', background: 'rgba(0,229,160,0.1)', padding: '12px', borderRadius: '8px', textAlign: 'center', border: '1px solid rgba(0,229,160,0.3)' }}>{success}</div>}
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '13px', color: 'var(--text2)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>I am a...</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                style={{ width: '100%', padding: '14px 16px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: '12px', color: 'white', fontSize: '15px', outline: 'none', transition: 'border-color 0.2s', appearance: 'none' }}
              >
                <option value="STUDENT">Student</option>
                <option value="MENTOR">Mentor</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '13px', color: 'var(--text2)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Full Name</label>
              <input
                type="text"
                required
                style={{ width: '100%', padding: '14px 16px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: '12px', color: 'white', fontSize: '15px', outline: 'none', transition: 'border-color 0.2s' }}
                onFocus={e => e.target.style.borderColor = 'var(--green)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'}
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '13px', color: 'var(--text2)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Email Address</label>
              <input
                type="email"
                required
                style={{ width: '100%', padding: '14px 16px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: '12px', color: 'white', fontSize: '15px', outline: 'none', transition: 'border-color 0.2s' }}
                onFocus={e => e.target.style.borderColor = 'var(--green)'}
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
                onFocus={e => e.target.style.borderColor = 'var(--green)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '13px', color: 'var(--text2)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Confirm Password</label>
              <input
                type="password"
                required
                style={{ width: '100%', padding: '14px 16px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: '12px', color: 'white', fontSize: '15px', outline: 'none', transition: 'border-color 0.2s' }}
                onFocus={e => e.target.style.borderColor = 'var(--green)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              style={{
                marginTop: '10px', width: '100%', background: 'linear-gradient(135deg, var(--green), #00A678)',
                border: 'none', color: '#050A14', fontSize: '16px', fontWeight: 700, padding: '14px', borderRadius: '12px',
                cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s', boxShadow: '0 0 30px rgba(0,229,160,0.3)', fontFamily: 'DM Sans, sans-serif'
              }}
              onMouseEnter={e => { e.target.style.transform = 'scale(1.02)'; e.target.style.boxShadow = '0 0 50px rgba(0,229,160,0.5)'; }}
              onMouseLeave={e => { e.target.style.transform = 'scale(1)'; e.target.style.boxShadow = '0 0 30px rgba(0,229,160,0.3)'; }}
            >
              Sign Up
            </button>
            
            <div style={{ textAlign: 'center', fontSize: '14px', color: 'var(--text2)', marginTop: '8px' }}>
                Already have an account? <Link to="/login" style={{ color: 'var(--green)', textDecoration: 'none', fontWeight: 600 }}>Log in</Link>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Register;
