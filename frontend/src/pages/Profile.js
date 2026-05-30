import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Profile({ student }) {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/students/profile', {
        headers: {
          'x-auth-token': token
        }
      });
      setProfileData(response.data);
    } catch (err) {
      console.error('Error fetching profile:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8 text-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Student Profile</h1>

      <div className="bg-white rounded-lg shadow p-8 max-w-2xl">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-gray-600 text-sm font-semibold mb-1">First Name</p>
            <p className="text-lg text-gray-800 mb-6">{profileData?.firstName}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm font-semibold mb-1">Last Name</p>
            <p className="text-lg text-gray-800 mb-6">{profileData?.lastName}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm font-semibold mb-1">Email</p>
            <p className="text-lg text-gray-800 mb-6">{profileData?.email}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm font-semibold mb-1">Student ID</p>
            <p className="text-lg text-gray-800 mb-6">{profileData?.studentId}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm font-semibold mb-1">Program</p>
            <p className="text-lg text-gray-800 mb-6">{profileData?.program}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm font-semibold mb-1">Enrollment Year</p>
            <p className="text-lg text-gray-800 mb-6">{profileData?.enrollmentYear}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
