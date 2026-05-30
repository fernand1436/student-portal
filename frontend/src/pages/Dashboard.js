import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard({ student }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [gpa, setGpa] = useState(0);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/results', {
        headers: {
          'x-auth-token': token
        }
      });
      setResults(response.data);
      calculateGPA(response.data);
    } catch (err) {
      console.error('Error fetching results:', err);
    } finally {
      setLoading(false);
    }
  };

  const calculateGPA = (results) => {
    if (results.length === 0) {
      setGpa(0);
      return;
    }
    const gradePoints = { 'A': 4, 'B': 3, 'C': 2, 'D': 1, 'F': 0 };
    const totalPoints = results.reduce((sum, result) => sum + (gradePoints[result.grade] || 0), 0);
    setGpa((totalPoints / results.length).toFixed(2));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Welcome, {student?.firstName}!</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-600 text-sm font-semibold mb-2">Student ID</h3>
          <p className="text-2xl font-bold text-blue-600">{student?.studentId}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-600 text-sm font-semibold mb-2">Current GPA</h3>
          <p className="text-2xl font-bold text-green-600">{gpa}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-600 text-sm font-semibold mb-2">Total Courses</h3>
          <p className="text-2xl font-bold text-purple-600">{results.length}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Recent Results</h2>
        </div>
        {loading ? (
          <div className="p-6 text-center text-gray-500">Loading results...</div>
        ) : results.length === 0 ? (
          <div className="p-6 text-center text-gray-500">No results available yet</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Course</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Code</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Score</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Grade</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Semester</th>
                </tr>
              </thead>
              <tbody>
                {results.slice(0, 5).map((result) => (
                  <tr key={result._id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-800">{result.courseName}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{result.courseCode}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{result.score}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-white font-semibold ${
                        result.grade === 'A' ? 'bg-green-500' : 
                        result.grade === 'B' ? 'bg-blue-500' : 
                        result.grade === 'C' ? 'bg-yellow-500' : 
                        result.grade === 'D' ? 'bg-orange-500' : 'bg-red-500'
                      }`}>
                        {result.grade}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">{result.semester}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
