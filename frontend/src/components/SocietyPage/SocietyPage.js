import React, { useState, useEffect } from "react";
import { Link, Route, Routes, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import PastEvents from "./PastEvents";
import Details from "./Details";
import Members from "./Members";
import AddPastEvent from "../Add/AddPastEvent";
import "./style.css";
import UpcomingEvents from "./UpcomingEvents";
import DiscussionForum from "./DiscussionForum";
import AddDiscussion from "../Add/AddDiscussion";
import AddAlumni from "../Add/AddAlumni";
import AlumniPage from "./AlumniPage";


const SocietyPage = () => {
  const { collegeName, societyName } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("/user", { withCredentials: true })
      .then((response) => {
        setUser(response.data);
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
        setUser(null);
      });

    const checkbox = document.getElementById('check');
    const parentDiv = document.querySelector('.parent_div');

    const toggleMenuWidth = () => {
      if (checkbox.checked) {
        parentDiv.classList.add('menu-open');
      } else {
        parentDiv.classList.remove('menu-open');
      }
    };

    checkbox.addEventListener('change', toggleMenuWidth);
    toggleMenuWidth();

    return () => {
      checkbox.removeEventListener('change', toggleMenuWidth);
    };
  }, []);

  const handleRedirect = () => {
    navigate(`/societies/${collegeName}`);
  };

  return (
    <div className="h-screen flex">
      <div className="text-white h-screen parent_div z-50">  
        <input type="checkbox" id="check" />
        <div className="btn_one font-bold">
          <label htmlFor="check">
            <i className="fa-solid fa-bars text-2xl hover:text-gray-300"></i>
          </label>
        </div>

        <nav className="px-4 w-60 font-bold bg-indigo-500/75 h-dvh menubar">
          <div className="btn_two font-bold text-2xl">
            <label htmlFor="check">
              <i className="fa-solid fa-backward hover:text-gray-300"></i>
            </label>
          </div>
          <ul>
            <li className="hover:text-gray-300 my-4">
              <Link to="past-events"><i className="fa-regular fa-calendar-minus"></i> Past Events</Link>
            </li>
            <li className="hover:text-gray-300 my-4">
              <Link to="details"><i className="fa-solid fa-circle-info"></i> Details</Link>
            </li>
            <li className="hover:text-gray-300 my-4">
              <Link to="members">
                <i className="fa-solid fa-user mr-2"></i>
                Members
              </Link>
            </li>
            <li className="hover:text-gray-300 my-4">
              <Link to="discussion-forum"><i className="fa-regular fa-message"></i> Discussion Forum</Link>
            </li>
            <li className="hover:text-gray-300 my-4">
              <Link to="upcoming-events"><i className="fa-regular fa-calendar-plus"></i> Upcoming Events</Link>
            </li>
            <li className="hover:text-gray-300 my-4">
              <Link to="alumni"><i className="fa-solid fa-graduation-cap"></i> Alumni</Link>
            </li>
            <li className="hover:text-gray-300 my-4">
              <button onClick={handleRedirect} className="w-full focus:outline-none hover:text-gray-300">
                <i className="fa-solid fa-building-columns mr-1"></i>
                View All Societies
              </button>
            </li>
            
          </ul>
        </nav>
      </div>

      <div className="p-20 flex-grow">
        <Routes>
          <Route path="past-events/*" element={<PastEvents />} />
          <Route path="details/*" element={<Details />} />
          <Route path="members/*" element={<Members />} />
          <Route path="discussion-forum/*" element={<DiscussionForum />} /> 
          <Route path="upcoming-events/*" element={<UpcomingEvents />} />
          <Route path="add-discussion/*" element={<AddDiscussion />} />
          <Route path="add-alumni/*" element={<AddAlumni />} /> 
          <Route path="alumni/*" element={<AlumniPage />} /> 
          <Route path="add-past-event/*" element={<AddPastEvent />} />
        </Routes>
      </div>
    </div>
  );
};

export default SocietyPage;
