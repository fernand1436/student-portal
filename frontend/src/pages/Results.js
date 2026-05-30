import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Results() {
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSemester, setSelectedSemester] = useState('all');
  const [semesters, setSemesters] = useState([]);

  useEffect(() => {
    fetchResults();
  }, []);

  useEffect(() => {
    filterResults();
  }, [results, selectedSemester]);

  const fetchResults = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/results', {
        headers: {
          'x-auth-token': token
        }
      });
      setResults(response.data);
      const uniqueSemesters = [...new Set(response.data.map(r => r.semester))];
      setSemesters(uniqueSemesters);
    } catch (err) {
      console.error('Error fetching results:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterResults = () => {
    if (selectedSemester === 'all') {
      setFilteredResults(results);
    } else {
      setFilteredResults(results.filter(r => r.semester === selectedSemester));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Academic Results</h1>

      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">Filter by Semester</label>
        <select
          value={selectedSemester}
          onChange={(e) => setSelectedSemester(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Semesters</option>
          {semesters.map(sem => (
            <option key={sem} value={sem}>{sem}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="text-center text-gray-500 py-8">Loading results...</div>
      ) : filteredResults.length === 0 ? (
        <div className="text-center text-gray-500 py-8">No results available</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResults.map(result => (
            <div key={result._id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{result.courseName}</h3>
              <p className="text-sm text-gray-600 mb-4">Code: {result.courseCode}</p>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-sm text-gray-600">Score</p>
                  <p className="text-2xl font-bold text-blue-600">{result.score}%</p>
                </div>
                <div className={`px-4 py-2 rounded text-white font-bold text-2xl ${
                  result.grade === 'A' ? 'bg-green-500' : 
                  result.grade === 'B' ? 'bg-blue-500' : 
                  result.grade === 'C' ? 'bg-yellow-500' : 
                  result.grade === 'D' ? 'bg-orange-500' : 'bg-red-500'
                }`}>
                  {result.grade}
                </div>
              </div>
              <p className="text-sm text-gray-600">Semester: {result.semester}</p>
              <p className="text-sm text-gray-600">Credit Hours: {result.creditHours}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Results;
