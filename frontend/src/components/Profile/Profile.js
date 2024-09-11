import React, { useEffect, useState } from "react";
import axios from "axios";
import CollegeProfile from "./CollegeProfile";
import SocietyProfile from "./SocietyProfile";
import StudentProfile from "./StudentProfile";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/user");
        setUser(response.data);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return <p className="text-center text-gray-500">Loading user...</p>;
  }

  return (
    <div className="pt-24">
      <div className="flex gap-8 px-12 flex-wrap">
        <div className="max-w-3xl bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-7xl border-2 border-black py-6 px-8 rounded-full mb-6 inline-block"><i class="fa-solid fa-user"></i></h1>
          <h2 className="text-3xl font-bold mb-4">{user.name}'s Profile</h2>
          <p className="text-gray-700 mb-4 text-xl">
            <strong>Email:</strong> {user.email}
          </p>
          {/* <p className="text-gray-700 mb-4">
            <strong>Google ID:</strong> {user.googleId}
          </p> */}
          {/* <p className="text-gray-700 mb-4"><strong>Signed Up:</strong> {user.signedUp ? 'Yes' : 'No'}</p> */}
          <p className="text-gray-700 mb-4 text-xl">
            <strong>Registered As:</strong> {user.signupType}
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 flex-grow">
          {user.signupType === "college" && <CollegeProfile user={user} />}
          {user.signupType === "society" && <SocietyProfile user={user} />}
          {user.signupType === "student" && <StudentProfile user={user} />}
        </div>
      </div>
    </div>
  );
};

export default Profile;
