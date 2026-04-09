import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const checkAuth = () => {
    setIsLoggedIn(!!localStorage.getItem('token'));
    setUserRole(localStorage.getItem('role'));
  };

  useEffect(() => {
    checkAuth();
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    setIsLoggedIn(false);
    setUserRole(null);
    navigate('/login');
  };

  const links = [
    { label: 'Home', path: '/' },
    ...(isLoggedIn && userRole !== 'MENTOR' && userRole !== 'ADMIN' ? [
      { label: 'Mentors', path: '/mentors' }, 
      { label: 'Career Paths', path: '/careers' }, 
      { label: 'Assessment', path: '/assessment' },
      { label: 'Resources', path: '/resources' }
    ] : []),
    ...(userRole === 'STUDENT' ? [{ label: 'My Sessions', path: '/profile' }] : []),
    ...(userRole === 'MENTOR' ? [{ label: 'Mentor Dashboard', path: '/dashboard/mentor' }] : []),
    ...(userRole === 'ADMIN' ? [{ label: 'Admin Panel', path: '/dashboard/admin' }] : []),
  ];

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      padding: scrolled ? '12px 32px' : '20px 32px',
      background: scrolled ? 'rgba(5,10,20,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : 'none',
      transition: 'all 0.4s ease',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      {/* Logo */}
      <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 38, height: 38, borderRadius: 10,
          background: 'linear-gradient(135deg, var(--accent), var(--accent3))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 18, fontWeight: 700, boxShadow: '0 0 20px rgba(61,127,255,0.4)',
          color: 'white'
        }}>CG</div>
        <span style={{ fontFamily: 'Syne, sans-serif', fontSize: 20, fontWeight: 700, color: 'white' }}>
          Career<span style={{ color: 'var(--accent2)' }}>Guidance</span>
        </span>
      </Link>

      {/* Desktop Nav */}
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }} className="desktop-nav">
        {links.map(link => (
          <Link key={link.label} to={link.path} style={{
            textDecoration: 'none',
            color: 'var(--text2)', fontSize: 14, fontWeight: 500,
            padding: '8px 14px', borderRadius: 8,
            transition: 'all 0.2s',
            fontFamily: 'DM Sans, sans-serif',
          }}
          onMouseEnter={e => { e.target.style.color = 'white'; e.target.style.background = 'rgba(100,160,255,0.08)'; }}
          onMouseLeave={e => { e.target.style.color = 'var(--text2)'; e.target.style.background = 'none'; }}
          >{link.label}</Link>
        ))}
        
        {!isLoggedIn ? (
          <Link to="/login" style={{
            marginLeft: 8,
            background: 'linear-gradient(135deg, var(--accent), var(--accent3))',
            textDecoration: 'none', color: 'white',
            fontSize: 14, fontWeight: 600, padding: '10px 22px', borderRadius: 10,
            boxShadow: '0 0 20px rgba(61,127,255,0.35)',
            transition: 'all 0.2s', fontFamily: 'DM Sans, sans-serif',
          }}
          onMouseEnter={e => e.target.style.transform = 'scale(1.04)'}
          onMouseLeave={e => e.target.style.transform = 'scale(1)'}
          >Login / Register</Link>
        ) : (
          <button onClick={handleLogout} style={{
            marginLeft: 8,
            background: 'transparent',
            border: '1px solid var(--accent)', color: 'white',
            cursor: 'pointer',
            fontSize: 14, fontWeight: 600, padding: '10px 22px', borderRadius: 10,
            transition: 'all 0.2s', fontFamily: 'DM Sans, sans-serif',
          }}
          onMouseEnter={e => { e.target.style.background = 'var(--accent)' }}
          onMouseLeave={e => { e.target.style.background = 'transparent' }}
          >Logout</button>
        )}
      </div>

      {/* Mobile hamburger */}
      <button onClick={() => setMenuOpen(!menuOpen)} style={{
        display: 'none', background: 'none', border: '1px solid var(--border2)',
        cursor: 'pointer', color: 'white', padding: '8px 10px', borderRadius: 8,
        fontSize: 18,
      }} className="mobile-menu-btn">{menuOpen ? '✕' : '☰'}</button>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0,
          background: 'rgba(5,10,20,0.97)', backdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--border)', padding: '16px 24px 24px',
          display: 'flex', flexDirection: 'column', gap: 4,
        }}>
          {links.map(link => (
            <Link key={link.label} to={link.path} onClick={() => setMenuOpen(false)} style={{
              textDecoration: 'none', color: 'var(--text2)', 
              fontSize: 15, fontWeight: 500, padding: '12px 16px', 
              borderRadius: 8, textAlign: 'left', fontFamily: 'DM Sans, sans-serif',
            }}>{link.label}</Link>
          ))}
          {!isLoggedIn ? (
            <Link to="/login" onClick={() => setMenuOpen(false)} style={{
              marginTop: 8, background: 'linear-gradient(135deg, var(--accent), var(--accent3))',
              textDecoration: 'none', color: 'white', textAlign: 'center',
              fontSize: 15, fontWeight: 600, padding: '12px 22px', borderRadius: 10,
              fontFamily: 'DM Sans, sans-serif',
            }}>Login</Link>
          ) : (
            <button onClick={() => { handleLogout(); setMenuOpen(false); }} style={{
              marginTop: 8, background: 'transparent',
              border: '1px solid var(--accent)', cursor: 'pointer', color: 'white',
              fontSize: 15, fontWeight: 600, padding: '12px 22px', borderRadius: 10,
              fontFamily: 'DM Sans, sans-serif',
            }}>Logout</button>
          )}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
