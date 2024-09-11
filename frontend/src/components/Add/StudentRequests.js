import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('/society/requests');
        setRequests(response.data);
      } catch (err) {
        console.error('Error fetching requests:', err);
        setError('Failed to fetch requests. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleAccept = async (requestId) => {
    try {
      await axios.post('/society/requests/accept', { requestId });
      setRequests(requests.filter(request => request._id !== requestId));
    } catch (err) {
      console.error('Error accepting request:', err);
      alert('Failed to accept the request. Please try again later.');
    }
  };

  const handleReject = async (requestId) => {
    try {
      await axios.post('/society/requests/reject', { requestId });
      setRequests(requests.filter(request => request._id !== requestId));
    } catch (err) {
      console.error('Error rejecting request:', err);
      alert('Failed to reject the request. Please try again later.');
    }
  };

  if (loading) {
    return <div>Loading requests...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-4xl font-bold pt-20 mb-4">Pending <span className="text-indigo-700">Requests</span></h2>
      {requests.length > 0 ? (
        <ul className='px-56'>
          {requests.map(request => (
            <li key={request._id} className="bg-white p-4 rounded-lg shadow-md mb-4 flex justify-between">
              <div className='ml-8 text-left text-xl'>
                <p><strong>Student Name:</strong> {request.name}</p>
                <p><strong>Stream:</strong> {request.stream}</p>
                <p><strong>Batch:</strong> {request.batch}</p>
              </div>

              <div className="flex gap-4 mt-2 justify-center pt-4 mr-8">
                <button
                  className="bg-green-500/20 border-2 border-green-500 text-green-500 px-4 rounded-full hover:bg-green-500/40 font-bold h-10"
                  onClick={() => handleAccept(request._id)}
                >
                  <i class="fa-solid fa-check"></i> Accept
                </button>
                <button
                  className="bg-red-500/20 border-2 border-red-500 text-red-500 px-4 rounded-full hover:bg-red-500/40 font-bold h-10"
                  onClick={() => handleReject(request._id)}
                >
                  <i class="fa-solid fa-xmark"></i> Reject
                </button>
              </div>

            </li>
          ))}
        </ul>
      ) : (
        <p>No join requests at the moment.</p>
      )}
    </div>
  );
};

export default StudentRequests;
