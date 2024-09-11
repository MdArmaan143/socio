import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const AddUpcomingEvent = () => {
  const { collegeName, societyName } = useParams();
  const decodedSocietyName = decodeURIComponent(societyName);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting new upcoming event:', { title, description, date });

    try {
      const response = await axios.post(`/societies/${collegeName}/${decodedSocietyName}/add-upcoming-event`, {
        title,
        description,
        date,
      });

      if (response.data.success) {
        console.log('Event added successfully:', response.data);
        setSuccess('Event added successfully!');
        setError('');
        navigate(`/societies/${collegeName}/${decodedSocietyName}/upcoming-events`);
      } else {
        console.error('Failed to add event:', response.data.message);
        setError('Failed to add event. Please try again.');
      }
    } catch (error) {
      console.error('Error adding event:', error);
      setError('Failed to add event. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Add Upcoming Event</h2>
      {error && <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>}
      {success && <div className="bg-green-100 text-green-700 p-2 mb-4 rounded">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-500 text-white font-medium rounded-md hover:bg-indigo-600 transition-all"
        >
          Add Event
        </button>
      </form>
    </div>
  );
};

export default AddUpcomingEvent;
