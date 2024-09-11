import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const AddComment = () => {
  const { discussionId } = useParams();
  const [comment, setComment] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`/discussions/${discussionId}/comments`, { content: comment })
      .then(() => navigate(-1))  // Go back to the discussion forum
      .catch(err => console.error('Error adding comment:', err));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Add Comment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea 
          placeholder="Write your comment" 
          value={comment} 
          onChange={(e) => setComment(e.target.value)} 
          className="border p-2 w-full" 
          rows="5" 
          required 
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit Comment</button>
      </form>
    </div>
  );
};

export default AddComment;
