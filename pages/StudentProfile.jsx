import React, { useState, useEffect } from 'react';
import axiosInstance from '../src/utils/axiosConfig';

function StudentProfile() {
  const [appointments, setAppointments] = useState([]);
  const email = localStorage.getItem('user');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axiosInstance.get(`/appointments/student/${email}`);
        setAppointments(response.data);
      } catch (err) {
        console.error('Error fetching appointments', err);
      }
    };
    if (email) fetchAppointments();
  }, [email]);

  const handleReschedule = async (id, oldDate, oldTime) => {
    const newDate = prompt("Enter new Date (YYYY-MM-DD):", oldDate);
    if (!newDate) return;
    const newTime = prompt("Enter new Time (HH:MM):", oldTime);
    if (!newTime) return;

    try {
      await axiosInstance.patch(`/appointments/${id}`, { date: newDate, time: newTime });
      // Refresh
      const response = await axiosInstance.get(`/appointments/student/${email}`);
      setAppointments(response.data);
    } catch (e) {
      alert("Failed to reschedule.");
    }
  };

  return (
    <div style={{ minHeight: '100vh', padding: '120px 24px', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', background: 'var(--surface)', padding: 40, borderRadius: 24, border: '1px solid var(--border)' }}>
        <h2 style={{ fontFamily: 'Syne', fontSize: 32, marginBottom: 8 }}>Student Profile</h2>
        <p style={{ color: 'var(--text2)', marginBottom: 32 }}>Welcome back, {localStorage.getItem('name') || email}</p>

        <h3 style={{ fontFamily: 'Syne', fontSize: 24, marginBottom: 16, color: 'var(--accent2)' }}>My Sessions</h3>
        {appointments.length === 0 ? (
          <div style={{ padding: 20, background: 'var(--surface2)', borderRadius: 12, color: 'var(--text3)' }}>No sessions booked yet.</div>
        ) : (
          <div style={{ display: 'grid', gap: 16 }}>
            {appointments.map(app => (
              <div key={app.id} style={{ display: 'flex', justifyContent: 'space-between', padding: 20, background: 'var(--surface2)', borderRadius: 12, border: '1px solid var(--border)' }}>
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: 18, color: 'white' }}>Meeting with {app.mentorName}</div>
                  <div style={{ color: 'var(--text2)', marginTop: 4 }}>Date: {app.date} | Time: {app.time}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                  <div style={{ 
                    background: app.status === 'APPROVED' ? 'rgba(0, 229, 160, 0.1)' : app.status === 'REJECTED' ? 'rgba(255, 100, 100, 0.1)' : 'rgba(61, 127, 255, 0.1)', 
                    color: app.status === 'APPROVED' ? 'var(--green)' : app.status === 'REJECTED' ? 'var(--red)' : 'var(--accent)', 
                    padding: '8px 16px', borderRadius: 8, fontWeight: 'bold' 
                  }}>
                    {app.status === 'PENDING' ? 'Approval Pending' : app.status}
                  </div>
                  {app.meetingLink && app.status === 'APPROVED' && (
                    <a href={app.meetingLink} target="_blank" rel="noreferrer" style={{ background: 'var(--green)', color: 'var(--bg)', padding: '8px 16px', borderRadius: 8, fontSize: 13, textDecoration: 'none', fontWeight: 'bold' }}>
                      Join Meeting →
                    </a>
                  )}
                  {app.status === 'PENDING' && (
                    <button onClick={() => handleReschedule(app.id, app.date, app.time)} style={{ background: 'rgba(255,255,255,0.1)', color: 'white', padding: '6px 12px', borderRadius: 8, border: 'none', fontSize: 12, cursor: 'pointer', fontWeight: 'bold', marginTop: 4 }}>
                      Reschedule
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentProfile;
