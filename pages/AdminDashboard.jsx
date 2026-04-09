import React, { useState, useEffect } from 'react';
import axiosInstance from '../src/utils/axiosConfig';

function AdminDashboard() {
  const [mentors, setMentors] = useState([]);
  const [careers, setCareers] = useState([]);
  const [students, setStudents] = useState([]);
  const [sessions, setSessions] = useState([]);
  // Quick form states
  const [newMentor, setNewMentor] = useState({ name: '', expertise: '' });
  const [newCareer, setNewCareer] = useState({ title: '', description: '' });
  const [newStudent, setNewStudent] = useState({ name: '', email: '', password: '' });
  const [newResource, setNewResource] = useState({ title: '', type: '', url: '' });
  const [resources, setResources] = useState([]);

  const fetchData = async () => {
    try {
      const mRes = await axiosInstance.get('/mentors');
      const cRes = await axiosInstance.get('/careers');
      const sRes = await axiosInstance.get('/users/students');
      const appRes = await axiosInstance.get('/appointments');
      const resRes = await axiosInstance.get('/resources');
      
      setMentors(mRes.data);
      setCareers(cRes.data);
      setStudents(sRes.data);
      setSessions(appRes.data);
      setResources(resRes.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const addMentor = async (e) => {
    e.preventDefault();
    await axiosInstance.post('/mentors', newMentor);
    setNewMentor({name: '', expertise: ''});
    fetchData();
  };

  const addCareer = async (e) => {
    e.preventDefault();
    await axiosInstance.post('/careers', newCareer);
    setNewCareer({title: '', description: ''});
    fetchData();
  };

  const addStudent = async (e) => {
    e.preventDefault();
    await axiosInstance.post('/auth/register', { ...newStudent, role: 'STUDENT' });
    setNewStudent({name: '', email: '', password: ''});
    fetchData();
  };

  const addResource = async (e) => {
    e.preventDefault();
    await axiosInstance.post('/resources', newResource);
    setNewResource({title: '', type: '', url: ''});
    fetchData();
  };

  const handleDelete = async (type, id) => {
    try {
      await axiosInstance.delete(`/${type}/${id}`);
      fetchData();
    } catch(err) {
      alert("Failed to delete record.");
    }
  };

  const handleUpdate = async (type, id, oldTitle) => {
    try {
      const newTitle = prompt(`Update value for ${oldTitle}:`);
      if(!newTitle) return; // User cancelled
      
      let payload = {};
      if(type === 'careers') payload = { title: newTitle };
      else if(type === 'mentors') payload = { name: newTitle };
      
      await axiosInstance.patch(`/${type}/${id}`, payload);
      fetchData();
    } catch(err) {
      alert("Failed to update.");
    }
  };

  return (
    <div style={{ minHeight: '100vh', padding: '120px 24px', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', background: 'var(--surface)', padding: 40, borderRadius: 24, border: '1px solid var(--border)' }}>
        <h2 style={{ fontFamily: 'Syne', fontSize: 32, marginBottom: 8 }}>Admin Panel</h2>
        <p style={{ color: 'var(--text2)', marginBottom: 32 }}>Full CRUD access across standard architectures.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 32 }}>
          
          {/* Mentors Section */}
          <div style={{ background: 'var(--surface2)', padding: 24, borderRadius: 16 }}>
            <h3 style={{ color: 'white', marginBottom: 16 }}>Manage Mentors</h3>
            <form onSubmit={addMentor} style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
              <input type="text" placeholder="Name" required value={newMentor.name} onChange={e => setNewMentor({...newMentor, name: e.target.value})} style={{flex: 1, padding: 8, borderRadius: 6, border: '1px solid var(--border)', background: 'var(--bg)', color: 'white'}} />
              <input type="text" placeholder="Expertise" required value={newMentor.expertise} onChange={e => setNewMentor({...newMentor, expertise: e.target.value})} style={{flex: 1, padding: 8, borderRadius: 6, border: '1px solid var(--border)', background: 'var(--bg)', color: 'white'}} />
              <button type="submit" style={{ padding: '8px 16px', background: 'var(--accent)', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer' }}>Add</button>
            </form>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 300, overflowY: 'auto' }}>
              {mentors.map(m => (
                <div key={m.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 12, background: 'var(--bg)', borderRadius: 8 }}>
                  <div>{m.name} <span style={{ color: 'var(--text2)', fontSize: 12 }}>({m.expertise})</span></div>
                  <div style={{ display:'flex', gap:6 }}>
                    <button onClick={() => handleUpdate('mentors', m.id, m.name)} style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', padding: '4px 10px', borderRadius: 4, cursor: 'pointer' }}>Edit</button>
                    <button onClick={() => handleDelete('mentors', m.id)} style={{ background: 'rgba(255,100,100,0.2)', color: 'var(--red)', border: 'none', padding: '4px 10px', borderRadius: 4, cursor: 'pointer' }}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Careers Section */}
          <div style={{ background: 'var(--surface2)', padding: 24, borderRadius: 16 }}>
            <h3 style={{ color: 'white', marginBottom: 16 }}>Manage Career Paths</h3>
            <form onSubmit={addCareer} style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
              <input type="text" placeholder="Title" required value={newCareer.title} onChange={e => setNewCareer({...newCareer, title: e.target.value})} style={{flex: 1, padding: 8, borderRadius: 6, border: '1px solid var(--border)', background: 'var(--bg)', color: 'white'}} />
              <input type="text" placeholder="Desc" required value={newCareer.description} onChange={e => setNewCareer({...newCareer, description: e.target.value})} style={{flex: 1, padding: 8, borderRadius: 6, border: '1px solid var(--border)', background: 'var(--bg)', color: 'white'}} />
              <button type="submit" style={{ padding: '8px 16px', background: 'var(--green)', color: 'var(--bg)', fontWeight: 'bold', border: 'none', borderRadius: 6, cursor: 'pointer' }}>Add</button>
            </form>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 300, overflowY: 'auto' }}>
              {careers.map(c => (
                <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 12, background: 'var(--bg)', borderRadius: 8 }}>
                  <div>{c.title}</div>
                  <div style={{ display:'flex', gap:6 }}>
                    <button onClick={() => handleUpdate('careers', c.id, c.title)} style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', padding: '4px 10px', borderRadius: 4, cursor: 'pointer' }}>Edit</button>
                    <button onClick={() => handleDelete('careers', c.id)} style={{ background: 'rgba(255,100,100,0.2)', color: 'var(--red)', border: 'none', padding: '4px 10px', borderRadius: 4, cursor: 'pointer' }}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sessions Section */}
          <div style={{ background: 'var(--surface2)', padding: 24, borderRadius: 16 }}>
            <h3 style={{ color: 'white', marginBottom: 16 }}>Manage Sessions</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 300, overflowY: 'auto' }}>
              {sessions.map(s => (
                <div key={s.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 12, background: 'var(--bg)', borderRadius: 8 }}>
                  <div>
                    <div style={{fontSize: 14}}>{s.mentorName} ↔ {s.studentEmail}</div>
                    <div style={{fontSize: 11, color: 'var(--text2)'}}>{s.date} at {s.time} ({s.status})</div>
                  </div>
                  <button onClick={() => handleDelete('appointments', s.id)} style={{ background: 'rgba(255,100,100,0.2)', color: 'var(--red)', border: 'none', padding: '4px 10px', borderRadius: 4, cursor: 'pointer' }}>Delete</button>
                </div>
              ))}
              {sessions.length === 0 && <div style={{color: 'var(--text3)'}}>No active sessions.</div>}
            </div>
          </div>

          {/* Students Section */}
          <div style={{ background: 'var(--surface2)', padding: 24, borderRadius: 16 }}>
            <h3 style={{ color: 'white', marginBottom: 16 }}>Manage Students</h3>
            <form onSubmit={addStudent} style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
              <input type="text" placeholder="Name" required value={newStudent.name} onChange={e => setNewStudent({...newStudent, name: e.target.value})} style={{minWidth: 100, flex: 1, padding: 8, borderRadius: 6, border: '1px solid var(--border)', background: 'var(--bg)', color: 'white'}} />
              <input type="email" placeholder="Email" required value={newStudent.email} onChange={e => setNewStudent({...newStudent, email: e.target.value})} style={{minWidth: 100, flex: 1, padding: 8, borderRadius: 6, border: '1px solid var(--border)', background: 'var(--bg)', color: 'white'}} />
              <input type="password" placeholder="Pass" required value={newStudent.password} onChange={e => setNewStudent({...newStudent, password: e.target.value})} style={{minWidth: 100, flex: 1, padding: 8, borderRadius: 6, border: '1px solid var(--border)', background: 'var(--bg)', color: 'white'}} />
              <button type="submit" style={{ padding: '8px 16px', background: 'var(--accent)', color: 'white', fontWeight: 'bold', border: 'none', borderRadius: 6, cursor: 'pointer' }}>Add</button>
            </form>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 300, overflowY: 'auto' }}>
              {students.map(std => (
                <div key={std.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 12, background: 'var(--bg)', borderRadius: 8 }}>
                  <div>
                    <div>{std.name}</div>
                    <div style={{fontSize: 12, color: 'var(--text2)'}}>{std.email}</div>
                  </div>
                  <button onClick={() => handleDelete('users', std.id)} style={{ background: 'rgba(255,100,100,0.2)', color: 'var(--red)', border: 'none', padding: '4px 10px', borderRadius: 4, cursor: 'pointer' }}>Delete</button>
                </div>
              ))}
            </div>
          </div>

          {/* Resources Section */}
          <div style={{ background: 'var(--surface2)', padding: 24, borderRadius: 16 }}>
            <h3 style={{ color: 'white', marginBottom: 16 }}>Manage Resources</h3>
            <form onSubmit={addResource} style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
              <input type="text" placeholder="Title" required value={newResource.title} onChange={e => setNewResource({...newResource, title: e.target.value})} style={{minWidth: 100, flex: 1, padding: 8, borderRadius: 6, border: '1px solid var(--border)', background: 'var(--bg)', color: 'white'}} />
              <input type="text" placeholder="Type (Video/Doc)" required value={newResource.type} onChange={e => setNewResource({...newResource, type: e.target.value})} style={{minWidth: 100, flex: 1, padding: 8, borderRadius: 6, border: '1px solid var(--border)', background: 'var(--bg)', color: 'white'}} />
              <input type="url" placeholder="URL" required value={newResource.url} onChange={e => setNewResource({...newResource, url: e.target.value})} style={{minWidth: 150, flex: 2, padding: 8, borderRadius: 6, border: '1px solid var(--border)', background: 'var(--bg)', color: 'white'}} />
              <button type="submit" style={{ padding: '8px 16px', background: 'var(--green)', color: 'var(--bg)', fontWeight: 'bold', border: 'none', borderRadius: 6, cursor: 'pointer' }}>Add</button>
            </form>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 300, overflowY: 'auto' }}>
              {resources.map(r => (
                <div key={r.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 12, background: 'var(--bg)', borderRadius: 8 }}>
                  <div>
                    <div>{r.title} <span style={{fontSize:11, color: 'var(--accent2)'}}>({r.type})</span></div>
                    <div style={{fontSize: 12, color: 'var(--text2)'}}>{r.url.substring(0,25)}...</div>
                  </div>
                  <button onClick={() => handleDelete('resources', r.id)} style={{ background: 'rgba(255,100,100,0.2)', color: 'var(--red)', border: 'none', padding: '4px 10px', borderRadius: 4, cursor: 'pointer' }}>Delete</button>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
