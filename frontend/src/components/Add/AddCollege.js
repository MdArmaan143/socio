import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AddCollege = () => {
  const [formData, setFormData] = useState({
    collegeName: '',
    universityName: '',
    location: '',
    email: ''
  });
  const [collegeImage, setCollegeImage] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('/user', { withCredentials: true });
        setUser(response.data);
      } catch (err) {
        console.error('Error fetching user:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setCollegeImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('collegeName', formData.collegeName);
    data.append('universityName', formData.universityName);
    data.append('location', formData.location);
    data.append('email', formData.email);
    data.append('collegeImage', collegeImage);

    axios.post('http://localhost:5000/college/add', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      withCredentials: true
    })
      .then(() => window.location.href = '/')
      .catch(err => {
        if (err.response && err.response.status === 400) {
          alert('You have already added your college!');
        } else {
          console.error('Error adding college:', err);
        }
      });
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (!user) {
    return <p className="text-center text-red-500">You must be logged in to add a college.</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-100">
      <h2 className="text-3xl font-bold mb-6">Add College</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="collegeName"
          placeholder="College Name"
          onChange={handleChange}
          value={formData.collegeName}
          className="px-4 py-2 border rounded-lg w-full"
          required
        />
        <input
          name="universityName"
          placeholder="University Name"
          onChange={handleChange}
          value={formData.universityName}
          className="px-4 py-2 border rounded-lg w-full"
          required
        />
        <input
          name="location"
          placeholder="Location"
          onChange={handleChange}
          value={formData.location}
          className="px-4 py-2 border rounded-lg w-full"
          required
        />
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={formData.email}
          className="px-4 py-2 border rounded-lg w-full"
          type="email"
          required
        />
        <input
          type="file"
          name="collegeImage"
          onChange={handleImageChange}
          className="px-4 py-2 border rounded-lg w-full"
          accept="image/*"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddCollege;
