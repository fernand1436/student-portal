import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Results from './pages/Results';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const studentData = localStorage.getItem('student');
    if (token && studentData) {
      setIsAuthenticated(true);
      setStudent(JSON.parse(studentData));
    }
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {isAuthenticated && <Navbar onLogout={() => setIsAuthenticated(false)} />}
        <Routes>
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} setStudent={setStudent} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard student={student} /></PrivateRoute>} />
          <Route path="/results" element={<PrivateRoute><Results /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile student={student} /></PrivateRoute>} />
          <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
