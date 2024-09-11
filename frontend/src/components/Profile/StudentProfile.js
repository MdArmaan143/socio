import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentProfile = () => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/student/details')
      .then(response => {
        setDetails(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching student details:', err);
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (error || !details) {
    return <p className="text-center text-gray-500">There was an issue loading the student details.</p>;
  }

  return (
    <div>
      <h3 className="text-4xl font-bold mb-6">Student <span className='text-indigo-700'>Details</span></h3>
      <p className="text-gray-700 mb-4 text-xl"><strong>Name:</strong> {details.name}</p>
      {/* <p className="text-gray-700 mb-4 text-xl"><strong>Email:</strong> {details.email}</p> */}
      <p className="text-gray-700 mb-4 text-xl"><strong>Stream:</strong> {details.stream}</p>
      <p className="text-gray-700 mb-4 text-xl"><strong>Batch:</strong> {details.batch}</p>
      <p className="text-gray-700 text-xl"><strong>College Name:</strong> {details.collegeName}</p> {/* Added College Name */}
    </div>
  );
};

export default StudentProfile;
