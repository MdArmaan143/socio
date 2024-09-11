import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SocietyList = () => {
  const { collegeName } = useParams();
  const navigate = useNavigate();
  const [societies, setSocieties] = useState({});
  const [user, setUser] = useState(null);
  const [membershipStatus, setMembershipStatus] = useState({}); 

  const checkMembershipStatus = async () => {
    try {
      if (user?.signupType === 'student') {
        const response = await axios.post('/society/membership-status', { userId: user._id });
        setMembershipStatus(response.data);
      }
    } catch (err) {
      console.error('Error checking membership status:', err);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/user', { withCredentials: true });
        setUser(response.data);
      } catch (err) {
        console.error('Error fetching user data:', err);
      }
    };

    const fetchSocieties = async () => {
      try {
        const response = await axios.get(`/society/all?collegeName=${encodeURIComponent(collegeName)}`);
        const societiesData = response.data;

        if (!Array.isArray(societiesData)) {
          throw new Error("Unexpected response format");
        }

        const societiesByType = societiesData.reduce((acc, society) => {
          acc[society.type] = acc[society.type] || [];
          acc[society.type].push(society);
          return acc;
        }, {});

        setSocieties(societiesByType);
      } catch (err) {
        console.error('Error fetching societies:', err);
      }
    };

    fetchUserData();
    fetchSocieties();
  }, [collegeName]);

  useEffect(() => {
    if (user) {
      checkMembershipStatus();
    }
  }, [user]);

  const handleSocietyClick = (societyName) => {
    navigate(`/societies/${collegeName}/${societyName}/details`);
  };

  const handleJoinSociety = async (societyId) => {
    try {
      const response = await axios.post('/society/join', { societyId }, { withCredentials: true });

      if (response.status === 200) {
        alert('Request to join the society has been sent!');
        setMembershipStatus(prevStatus => ({
          ...prevStatus,
          [societyId]: 'pending'
        }));
      } else {
        alert('Failed to send request. Please try again later.');
      }
    } catch (err) {
      console.error('Error requesting to join society:', err);
      alert('Failed to send request. Please try again later.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 min-h-screen pt-24 px-8">
      <h3 className="text-3xl font-semibold mb-4">
        Societies for <span className="border-b-2 border-indigo-700 text-indigo-700 font-bold">{collegeName}</span>
      </h3>
      {Object.keys(societies).map((type) => (
        <div key={type}>
          <h4 className="text-2xl font-semibold mt-3"><span className=" text-indigo-700 border-b-2 border-indigo-700 font-bold">{type}</span> Societies :</h4>
          <div className="flex gap-4 my-4">
            {societies[type].map((society) => (
              <div
                key={society._id}
                className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:scale-105 transition-all duration-1000"
                onClick={() => handleSocietyClick(society.societyName)}
              >
                <img
                  src={society.societyLogo}
                  alt={`${society.societyName} Logo`}
                  className="w-full h-40 object-cover mb-4 rounded-lg"
                />
                <h3 className="text-2xl font-semibold mb-2">{society.societyName}</h3>
                <p className="text-gray-600">
                  <strong>Mentor:</strong> {society.mentorName}
                </p>
                <p className="text-gray-600">
                  <strong>Email:</strong> {society.email}
                </p>
                {user?.signupType === 'student' && (
                  <button
                    className={`mt-4 py-2 px-4 rounded font-bold ${
                      membershipStatus[society._id] === 'joined'
                        ? 'bg-green-500 text-white'
                        : membershipStatus[society._id] === 'pending'
                        ? 'bg-yellow-500 text-white'
                        : 'bg-indigo-700 text-white'
                    }`}
                    onClick={() =>
                      membershipStatus[society._id] === 'none' || !membershipStatus[society._id]
                        ? handleJoinSociety(society._id)
                        : null
                    }
                    disabled={membershipStatus[society._id] !== 'none' && membershipStatus[society._id] !== undefined}
                  >
                    {membershipStatus[society._id] === 'joined'
                      ? 'Joined'
                      : membershipStatus[society._id] === 'pending'
                      ? 'Request Pending'
                      : 'Request to Join'}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SocietyList;
