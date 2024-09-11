import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import mainImg from '../../assets/images/image4.png'

const CollegeData = () => {
  const [colleges, setColleges] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await axios.get('/college/all');
        setColleges(response.data);
      } catch (err) {
        console.error('Error fetching college data:', err);
      }
    };

    fetchColleges();
  }, []);

  const handleCollegeClick = (collegeName) => {
    navigate(`/societies/${encodeURIComponent(collegeName)}`);
  };

  return (
    <div className="min-h-screen pt-8" style={{
      backgroundImage:`url(${mainImg})`,
      backgroundSize: "cover",
    }}>
      <h2 className="text-4xl font-bold pt-12">Colleges</h2>
      <div className="flex flex-col items-center justify-center">
      <div className="flex gap-8 my-8">
        {colleges.map((college) => (
          <div
            key={college._id}
            className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:scale-105 transition-all duration-1000 flex-grow"
            onClick={() => handleCollegeClick(college.collegeName)}
          >
            <img
              src={college.collegeImage}
              alt={`${college.collegeName} Image`}
              className="w-full h-40 object-cover mb-4 rounded-lg"
            />
            <h3 className="text-2xl font-semibold mb-2">{college.collegeName}</h3>
            <p className="text-gray-600"><strong>University:</strong> {college.universityName}</p>
            <p className="text-gray-600"><strong>Location:</strong> {college.location}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default CollegeData;
