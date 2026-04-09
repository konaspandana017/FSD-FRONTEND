import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../src/utils/axiosConfig';

function BookSession() {
  const { mentorName } = useParams();
  const navigate = useNavigate();
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [loading, setLoading] = useState(false);
  const studentEmail = localStorage.getItem('user');

  const handleBooking = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axiosInstance.post('/appointments', {
        mentorName,
        studentEmail,
        date,
        time
      });
      alert('Session Booked Successfully!');
      navigate('/profile');
    } catch (err) {
      alert('Failed to book session. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', padding: '120px 24px', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 500, margin: '0 auto', background: 'var(--surface)', padding: 40, borderRadius: 24, border: '1px solid var(--border)' }}>
        <h2 style={{ fontFamily: 'Syne', fontSize: 28, marginBottom: 8, color: 'white' }}>Book Session with {decodeURIComponent(mentorName)}</h2>
        <p style={{ color: 'var(--text2)', marginBottom: 24 }}>Select a suitable date and time for your 1-on-1 mentorship session.</p>

        <form onSubmit={handleBooking} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontSize: 13, color: 'var(--text2)', textTransform: 'uppercase', fontWeight: 600 }}>Select Date</label>
            <input type="date" required value={date} onChange={e => setDate(e.target.value)} style={{ padding: '12px 16px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 12, color: 'white', outline: 'none', colorScheme: 'dark' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontSize: 13, color: 'var(--text2)', textTransform: 'uppercase', fontWeight: 600 }}>Select Time</label>
            <input type="time" required value={time} onChange={e => setTime(e.target.value)} style={{ padding: '12px 16px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 12, color: 'white', outline: 'none', colorScheme: 'dark', '&::-webkit-calendar-picker-indicator': { filter: 'invert(1)' } }} />
          </div>

          <button type="submit" disabled={loading} style={{
            marginTop: 16, width: '100%', background: 'linear-gradient(135deg, var(--accent), var(--accent3))',
            border: 'none', color: 'white', fontSize: 16, fontWeight: 700, padding: 14, borderRadius: 12,
            cursor: 'pointer', transition: 'box-shadow 0.2s', boxShadow: 'var(--glow)'
          }}>
            {loading ? 'Confirming...' : 'Confirm Booking'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default BookSession;
