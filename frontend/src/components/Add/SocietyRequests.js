import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SocietyRequests = () => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get('/college/requests', { withCredentials: true });
                setRequests(response.data);
            } catch (err) {
                console.error('Error fetching society requests:', err);
            }
        };

        fetchRequests();
    }, []);

    const handleAccept = async (id) => {
        try {
            await axios.post(`/college/accept-society/${id}`, null, { withCredentials: true });
            setRequests(requests.filter(request => request._id !== id));
        } catch (err) {
            console.error('Error accepting society request:', err);
        }
    };

    const handleReject = async (id) => {
        try {
            await axios.delete(`/college/reject-society/${id}`, { withCredentials: true });
            setRequests(requests.filter(request => request._id !== id));
        } catch (err) {
            console.error('Error rejecting society request:', err);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-4xl font-bold pt-20 mb-4">Pending <span className="text-indigo-700">Society Requests</span></h2>
            {requests.length > 0 ? (
                <ul className='px-56'>
                    {requests.map(request => (
                        <li key={request._id} className="bg-white p-4 rounded-lg shadow-md mb-4 flex justify-between">
                            <div className='ml-8 text-left text-xl'>
                                <p><strong>Society Name:</strong> {request.societyName}</p>
                                <p><strong>Mentor:</strong> {request.mentorName}</p>
                                <p><strong>Email:</strong> {request.email}</p>
                                <p><strong>Type:</strong> {request.type}</p>
                                <p><strong>Description:</strong> {request.description}</p>
                            </div>

                            <div className="flex gap-4 mt-2 justify-center pt-12 mr-8">
                                <button
                                    className="bg-green-500/20 border-2 border-green-500 text-green-500 px-4 rounded-full hover:bg-green-500/40 font-bold h-10"
                                    onClick={() => handleAccept(request._id)}
                                >
                                    <i className="fa-solid fa-check"></i> Accept
                                </button>
                                <button
                                    className="bg-red-500/20 border-2 border-red-500 text-red-500 px-4 rounded-full hover:bg-red-500/40 font-bold h-10"
                                    onClick={() => handleReject(request._id)}
                                >
                                    <i className="fa-solid fa-xmark"></i> Reject
                                </button>
                            </div>

                        </li>
                    ))}
                </ul>
            ) : (
                <p>No pending requests</p>
            )}
        </div>
    );
};

export default SocietyRequests;
