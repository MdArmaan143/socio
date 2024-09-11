import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SocietyForm = () => {
  const [formData, setFormData] = useState({
    societyName: '',
    societyEmail: '',
    societyType: '',
    mentorName: '',
  });
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get('/user')
      .then((response) => setUser(response.data))
      .catch((err) => console.error('Error fetching user:', err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user || !user._id) {
      console.error('User is not defined');
      return;
    }

    axios
      .post('/society/details', { ...formData, userId: user._id })
      .then(() => (window.location.href = '/profile'))
      .catch((err) => console.error('Error submitting society form:', err));
  };

  return (
    <div className="pt-24">
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg"
      >
        <h2 className="text-4xl font-semibold text-center mb-6">
          Society <span className="text-indigo-700">Details</span>
        </h2>
        <div className="mb-4">
          <input
            name="societyName"
            placeholder="Society Name"
            onChange={handleChange}
            value={formData.societyName}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <input
            name="societyEmail"
            placeholder="Society Email"
            onChange={handleChange}
            value={formData.societyEmail}
            type="email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <input
            name="societyType"
            placeholder="Society Type"
            onChange={handleChange}
            value={formData.societyType}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <input
            name="mentorName"
            placeholder="Mentor Name"
            onChange={handleChange}
            value={formData.mentorName}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-2 rounded-lg font-bold hover:bg-indigo-700 transition duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SocietyForm;
