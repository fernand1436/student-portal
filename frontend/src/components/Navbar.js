import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ onLogout }) {
  const navigate = useNavigate();
  const student = JSON.parse(localStorage.getItem('student') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('student');
    onLogout();
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/dashboard" className="text-2xl font-bold">Student Portal</Link>
        <div className="flex gap-6 items-center">
          <Link to="/dashboard" className="hover:text-blue-200 transition">Dashboard</Link>
          <Link to="/results" className="hover:text-blue-200 transition">Results</Link>
          <Link to="/profile" className="hover:text-blue-200 transition">Profile</Link>
          <span className="text-sm">{student.firstName}</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
