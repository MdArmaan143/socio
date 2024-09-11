import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import axios from "axios";

// Carousel responsive settings
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 2,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

// Custom Arrow components for the carousel
const CustomLeftArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full focus:outline-none z-10"
  >
    <FaArrowLeft className="text-2xl" />
  </button>
);

const CustomRightArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full focus:outline-none z-10"
  >
    <FaArrowRight className="text-2xl" />
  </button>
);

function AlumniPage() {
  const { collegeName, societyName } = useParams();
  const [alumni, setAlumni] = useState([]); 
  const [user, setUser] = useState(null);
  const [society, setSociety] = useState(null);

  useEffect(() => {
    axios
      .get("/user", { withCredentials: true })
      .then((response) => {
        setUser(response.data);
      })
      .catch(() => {
        setUser(null);
      });
  }, []);

  useEffect(() => {
    const encodedCollegeName = encodeURIComponent(collegeName);
    const encodedSocietyName = encodeURIComponent(societyName);

    axios
      .get(`/societies/${encodedCollegeName}/${encodedSocietyName}/alumni`, {
        withCredentials: true,
      })
      .then((response) => {
        setAlumni(response.data.alumni || []);
        setSociety(response.data.society);
      })
      .catch(() => {
        setAlumni([]);
      });
  }, [collegeName, societyName]);

  return (
    <div className="text-black rounded-md mt-12 mb-12 mx-auto max-w-screen-lg px-4">
      <div className="text-center mb-6">
        <span className="text-2xl md:text-4xl font-bold text-purple-800">
          Our <span className="text-black">Alumni <i className="fa-regular fa-graduation-cap mr-3"></i></span>
        </span>
        <div className="border-t-2 border-slate-600 w-4/3 md:w-2/3 mb-1.5 mt-1 mx-auto"></div>
      </div>

      {user && society && user._id === society.userId && (
        <div className="mb-4 text-center">
          <Link
            to={`/societies/${encodeURIComponent(collegeName)}/${encodeURIComponent(societyName)}/add-alumni`}
          >
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Add Alumni
            </button>
          </Link>
        </div>
      )}

      <div className="relative">
        {alumni.length === 0 ? (
          <p className="text-center">No alumni data available</p>
        ) : (
          <Carousel
            responsive={responsive}
            autoPlay={true}
            autoPlaySpeed={2000}
            infinite={true}
            customLeftArrow={<CustomLeftArrow />}
            customRightArrow={<CustomRightArrow />}
            pauseOnHover={true}
            containerClass="carousel-container"
            itemClass="carousel-item-padding-40-px"
            className="overflow-hidden"
          >
            {alumni.map((alum) => (
              <div key={alum._id} className="p-2">
                <div className="bg-white shadow-md p-6 rounded-2xl border border-gray-300 hover:shadow-lg transition-shadow duration-300 h-full flex flex-col justify-between">
                  <div>
                    <h1 className="font-semibold text-2xl text-center mb-4">{alum.name}</h1>
                    <p className="text-center text-lg">{alum.review}</p>
                  </div>

                  <div className="mt-4 text-left">
                    <p><i className="fa-solid fa-graduation-cap"></i> Batch: {alum.batch}</p>
                    <p><i className="fa-solid fa-building"></i> Company: {alum.company}</p>
                    <a
                      href={alum.linkedin}
                      className="text-purple-900 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa-brands fa-linkedin"></i> LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        )}
      </div>
      <div className="border-t-2 border-slate-500 w-11/12 mx-auto mt-8"></div>
    </div>
  );
}

export default AlumniPage;
