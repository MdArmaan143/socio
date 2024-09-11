import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';

const AddPastEvent = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [photos, setPhotos] = useState([]);
  const [videoUrl, setVideoUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { collegeName, societyName } = useParams(); 

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setPhotos(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    photos.forEach((photo) => formData.append('photos', photo));
    formData.append('videoUrl', videoUrl);

    try {
      setLoading(true);
      await axios.post(`/societies/${collegeName}/${societyName}/add-past-event`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });
      navigate(`/societies/${collegeName}/${societyName}/past-events`);
    } catch (err) {
      console.error('Error adding event:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add Past Event</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 w-full"
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Upload Photos</label>
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            className="p-2 w-full"
            accept="image/*"
          />
          {loading && <p>Uploading photos...</p>}
          <div className="flex flex-wrap mt-4">
            {photos.map((photo, index) => (
              <img key={index} src={URL.createObjectURL(photo)} alt="Event" className="w-24 h-24 object-cover mr-2" />
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Video URL</label>
          <input
            type="text"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className="border p-2 w-full"
          />
          {videoUrl && <ReactPlayer url={videoUrl} className="mt-4" controls />}
        </div>

        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add Event
        </button>
      </form>
    </div>
  );
};

export default AddPastEvent;
