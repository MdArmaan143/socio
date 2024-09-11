import React from 'react';

const CollegeProfile = ({ user }) => {
  if (!user || !user.details) {
    return <p className="text-center text-gray-500">loading.</p>;
  }

  return (
    <div>
      <h3 className="text-4xl font-bold mb-6">College <span className='text-indigo-700'>Details</span></h3>
      <p className="text-gray-700 mb-4 text-xl"><strong>University ID:</strong> {user.details.universityId}</p>
      <p className="text-gray-700 mb-4 text-xl"><strong>College Name:</strong> {user.details.collegeName}</p>
      <p className="text-gray-700 mb-4 text-xl"><strong>College Email:</strong> {user.details.collegeEmail}</p>
      <p className="text-gray-700 text-xl"><strong>University Name:</strong> {user.details.universityName}</p>
    </div>
  );
};

export default CollegeProfile;
