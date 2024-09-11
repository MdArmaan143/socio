import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SocietyProfile = () => {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    axios.get('/society/details')
      .then(response => setDetails(response.data))
      .catch(() => setDetails(null));
  }, []);

  if (!details) {
    return <p className="text-center text-gray-500">loading.</p>;
  }

  return (
    <div>
      <h3 className="text-4xl font-bold mb-6">Society <span className='text-indigo-700'>Details</span></h3>
      <p className="text-gray-700 mb-4 text-xl"><strong>Society Name:</strong> {details.societyName}</p>
      <p className="text-gray-700 mb-4 text-xl"><strong>Society Email:</strong> {details.societyEmail}</p>
      <p className="text-gray-700 mb-4 text-xl"><strong>Society Type:</strong> {details.societyType}</p>
      <p className="text-gray-700 text-xl"><strong>Mentor Name:</strong> {details.mentorName}</p>
    </div>
  );
};

export default SocietyProfile;
