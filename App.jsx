import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './pages/Home';
import CareersPage from './pages/CareersPage';
import MentorsPage from './pages/MentorsPage';
import AssessmentPage from './pages/AssessmentPage';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentProfile from './pages/StudentProfile';
import MentorDashboard from './pages/MentorDashboard';
import AdminDashboard from './pages/AdminDashboard';
import BookSession from './pages/BookSession';
import Resources from './Resources';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected Routes */}
        <Route path="/careers" element={<ProtectedRoute><CareersPage /></ProtectedRoute>} />
        <Route path="/resources" element={<ProtectedRoute><Resources /></ProtectedRoute>} />
        <Route path="/mentors" element={<ProtectedRoute><MentorsPage /></ProtectedRoute>} />
        <Route path="/assessment" element={<ProtectedRoute><AssessmentPage /></ProtectedRoute>} />
        <Route path="/book/:mentorName" element={<ProtectedRoute><BookSession /></ProtectedRoute>} />
        
        {/* Dashboards */}
        <Route path="/profile" element={<ProtectedRoute><StudentProfile /></ProtectedRoute>} />
        <Route path="/dashboard/mentor" element={<ProtectedRoute><MentorDashboard /></ProtectedRoute>} />
        <Route path="/dashboard/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      </Routes>
    </>
  );
}

export default App;
