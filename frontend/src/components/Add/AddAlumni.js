import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const AddAlumni = () => {
  const { collegeName, societyName } = useParams();
  const [alumniData, setAlumniData] = useState({
    name: '',
    batch: '',
    company: '',
    linkedin: '',
    review: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAlumniData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/societies/${collegeName}/${societyName}/add-alumni`, alumniData);
      console.log('Alumni added:', res.data);
    } catch (error) {
      console.error('Error adding alumni:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Add Alumni</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          value={alumniData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Batch</label>
        <input
          type="text"
          name="batch"
          value={alumniData.batch}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Company</label>
        <input
          type="text"
          name="company"
          value={alumniData.company}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">LinkedIn Profile</label>
        <input
          type="url"
          name="linkedin"
          value={alumniData.linkedin}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Review</label>
        <textarea
          name="review"
          value={alumniData.review}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg"
          required
        />
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
        Submit
      </button>
    </form>
  );
};

export default AddAlumni;
