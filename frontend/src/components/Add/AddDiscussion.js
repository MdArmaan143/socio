import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const AddDiscussion = () => {
  const { collegeName, societyName } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(`/societies/${collegeName}/${societyName}/add-discussion`, { title, content }, { withCredentials: true })
      .then(() => navigate(`/societies/${collegeName}/${societyName}/discussion-forum`))
      .catch(err => console.error('Error adding discussion:', err));
  };

  return (
    <div>
      <h2 className="text-4xl font-bold mb-4 mt-2">Add a New <span className="text-indigo-700">Discussion</span></h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          type="text" 
          placeholder="Title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          className="border p-2 w-full" 
          id="title"
          required 
        />
        <textarea 
          placeholder="Content" 
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
          className="border p-2 w-full" 
          rows="5" 
          required 
        />
        <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded font-bold hover:bg-indigo-600 transition-all">Add Discussion</button>
      </form>
    </div>
  );
};

export default AddDiscussion;
