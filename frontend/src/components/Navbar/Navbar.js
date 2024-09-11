import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from '../../assets/images/logo1.png';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [collegeExists, setCollegeExists] = useState(false);
  const [societyExists, setSocietyExists] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/user', { withCredentials: true });

        if (response.status === 200 && response.data) {
          setUser(response.data);

          const userId = response.data._id;
          if (userId) {
            const [collegeResponse, societyResponse] = await Promise.all([
              axios.get(`/college/exists/${userId}`, { withCredentials: true }),
              axios.get(`/society/exists/${userId}`, { withCredentials: true }),
            ]);

            setCollegeExists(collegeResponse.data.exists);
            setSocietyExists(societyResponse.data.exists);
          } else {
            console.error('User ID is undefined');
          }
        }
      } catch (err) {
        if (err.response && err.response.status === 401) {
          setUser(null); // User not logged in
        } else if (err.response && err.response.status === 404) {
          console.error('Endpoint not found:', err.response.config.url);
        } else {
          console.error('Error fetching user data or checking existence:', err);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleLogin = () => {
    window.location.href = '/login';
  };

  const handleLogout = () => {
    axios.get('/logout', { withCredentials: true })
      .then(() => {
        setUser(null);
        window.location.href = '/';
      })
      .catch(err => console.error('Logout failed', err));
  };

  return (
    <nav className="bg-indigo-600/75 p-4 fixed w-full font-semibold z-40">
      <div className="container mx-auto flex justify-between items-center">

        <div className="flex-grow flex mb-1 justify-center space-x-12">
          <a href="/" className="text-white border-b-2 border-transparent hover:border-white">Home</a>
          <a href="/about" className="text-white border-b-2 border-transparent hover:border-white">About</a>
          {user ? (
            <>
              <a href="/profile" className="text-white border-b-2 border-transparent hover:border-white">My Profile</a>

              {!collegeExists && user.signupType === 'college' && (
                <a href="/add-college" className="text-white border-b-2 border-transparent hover:border-white">Add Your College</a>
              )}
              {user.signupType === 'society' && (
                <>
                  {!societyExists && (
                    <a href="/add-society" className="text-white border-b-2 border-transparent hover:border-white">Add Your Society</a>
                  )}
                  <a href="/society/requests" className="text-white border-b-2 border-transparent hover:border-white">Student Requests</a>
                </>
              )}

              {user.signupType === 'college' && (
                <a href="/college/requests" className="text-white border-b-2 border-transparent hover:border-white">Society Requests</a>
              )}

              <button onClick={handleLogout} className="text-white border-b-2 border-transparent hover:border-white">Logout</button>
            </>
          ) : (
            <>
              <button onClick={handleLogin} className="text-white border-b-2 border-transparent hover:border-white">Login</button>
              <button onClick={() => window.location.href = '/signup'} className="text-white border-b-2 border-transparent hover:border-white">Signup</button>
            </>
          )}
        </div>

        <div className="">
          <a href="/">
            <img src={logo} alt="Logo" className="w-36" />
          </a>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
