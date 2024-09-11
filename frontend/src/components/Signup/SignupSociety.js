import React, { useEffect } from 'react';
import axios from 'axios';

const SignupCollege = () => {
  useEffect(() => {
    axios
      .post('/signup/society')
      .then((response) => {
        window.location.href = 'http://localhost:5000/auth/google';
      })
      .catch((error) => {
        console.error('There was an error signing up!', error);
      });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-100">
      <h2 className="text-3xl font-bold mb-6 text-center">Redirecting to Google Signup...</h2>
    </div>
  );
};

export default SignupCollege;
