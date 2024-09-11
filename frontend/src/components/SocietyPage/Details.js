import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Details = () => {
  const { collegeName, societyName } = useParams();
  const [societyDetails, setSocietyDetails] = useState(null);

  useEffect(() => {
    const fetchSocietyDetails = async () => {
      try {
        const response = await axios.get(`/society/${encodeURIComponent(collegeName)}/${encodeURIComponent(societyName)}/details`);
        setSocietyDetails(response.data);
      } catch (err) {
        console.error('Error fetching society details:', err);
      }
    };

    fetchSocietyDetails();
  }, [collegeName, societyName]);

  if (!societyDetails) {
    return <p>Loading society details...</p>;
  }

  return (
  
    <div>
        <h1 className='text-4xl font-bold mt-2'>Details</h1>
        <div className="p-6 bg-white rounded-lg pt-16 shadow-md">
        <img
          src={societyDetails.societyLogo}
          alt={`${societyDetails.societyName} Logo`}
          className="w-full h-40 object-contain mb-4 rounded-lg"
        />
        
        <h2 className="text-3xl font-semibold mb-4">{societyDetails.societyName}</h2>
        <p className="text-gray-600"><strong>Mentor:</strong> {societyDetails.mentorName}</p>
        <p className="text-gray-600"><strong>Email:</strong> {societyDetails.email}</p>
        <p className="text-gray-600"><strong>Type:</strong> {societyDetails.type}</p>
        {societyDetails.description && (
          <p className="text-gray-600"><strong>Description:</strong> {societyDetails.description}</p>
        )}
        {societyDetails.slogan && (
          <p className="text-gray-600"><strong>Slogan:</strong> {societyDetails.slogan}</p>
        )}
      </div>
    </div>

  );
};

export default Details;
