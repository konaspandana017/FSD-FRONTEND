import React, { useState, useEffect } from 'react';
import axiosInstance from '../src/utils/axiosConfig';

function MentorDashboard() {
  const [appointments, setAppointments] = useState([]);
  const name = localStorage.getItem('name');

  const fetchAppointments = async () => {
    try {
      const response = await axiosInstance.get(`/appointments/mentor/${name}`);
      setAppointments(response.data);
    } catch (err) {
      console.error('Error fetching appointments', err);
    }
  };

  useEffect(() => {
    if (name) fetchAppointments();
  }, [name]);

  const updateStatus = async (id, newStatus) => {
    try {
      const payload = { status: newStatus };
      if (newStatus === 'APPROVED') {
        const randStr = Math.random().toString(36).substring(2, 6) + '-' + Math.random().toString(36).substring(2, 6) + '-' + Math.random().toString(36).substring(2, 6);
        payload.meetingLink = `https://meet.google.com/${randStr}`;
      }
      await axiosInstance.patch(`/appointments/${id}`, payload);
      fetchAppointments();
    } catch(err) {
      alert("Failed to update status.");
    }
  };

  return (
    <div style={{ minHeight: '100vh', padding: '120px 24px', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', background: 'var(--surface)', padding: 40, borderRadius: 24, border: '1px solid var(--border)' }}>
        <h2 style={{ fontFamily: 'Syne', fontSize: 32, marginBottom: 8 }}>Mentor Dashboard</h2>
        <p style={{ color: 'var(--text2)', marginBottom: 32 }}>Welcome, {name}. Here are your incoming student requests.</p>

        {appointments.length === 0 ? (
          <div style={{ padding: 20, background: 'var(--surface2)', borderRadius: 12, color: 'var(--text3)' }}>No sessions currently.</div>
        ) : (
          <div style={{ display: 'grid', gap: 16 }}>
            {appointments.map(app => (
              <div key={app.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 20, background: 'var(--surface2)', borderRadius: 12, border: '1px solid var(--border)' }}>
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: 18, color: 'white' }}>Student: {app.studentEmail}</div>
                  <div style={{ color: 'var(--text2)', marginTop: 4 }}>Date: {app.date} | Time: {app.time}</div>
                  <div style={{ fontSize: 13, marginTop: 6, color: app.status === 'APPROVED' ? 'var(--green)' : app.status === 'REJECTED' ? 'var(--red)' : 'var(--accent)' }}>
                    Status: {app.status}
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: 10 }}>
                  {app.status === 'PENDING' && (
                    <>
                      <button onClick={() => updateStatus(app.id, 'APPROVED')} style={{ background: 'rgba(0, 229, 160, 0.15)', color: 'var(--green)', padding: '8px 16px', border: '1px solid var(--green)', borderRadius: 8, cursor: 'pointer', fontWeight: 'bold' }}>
                        Approve
                      </button>
                      <button onClick={() => updateStatus(app.id, 'REJECTED')} style={{ background: 'rgba(255, 100, 100, 0.15)', color: 'var(--red)', padding: '8px 16px', border: '1px solid var(--red)', borderRadius: 8, cursor: 'pointer', fontWeight: 'bold' }}>
                        Reject
                      </button>
                    </>
                  )}
                  {app.status === 'APPROVED' && (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                      <div style={{ background: 'rgba(0, 229, 160, 0.1)', color: 'var(--green)', padding: '8px 16px', borderRadius: 8, fontWeight: 'bold' }}>Approved</div>
                      {app.meetingLink && <a href={app.meetingLink} target="_blank" rel="noreferrer" style={{ color: 'var(--accent)', fontSize: 13, textDecoration: 'none', fontWeight: 'bold' }}>Join Meeting →</a>}
                    </div>
                  )}
                  {app.status === 'REJECTED' && <div style={{ background: 'rgba(255, 100, 100, 0.1)', color: 'var(--red)', padding: '8px 16px', borderRadius: 8, fontWeight: 'bold', height: 'fit-content' }}>Rejected</div>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MentorDashboard;
