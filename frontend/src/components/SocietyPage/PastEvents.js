import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";

const PastEvents = () => {
  const { collegeName, societyName } = useParams();
  const [user, setUser] = useState(null);
  const [pastEvents, setPastEvents] = useState([]);
  const [society, setSociety] = useState(null);

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
  }, []);

  useEffect(() => {
    if (collegeName && societyName) {
      axios
        .get(
          `/societies/${encodeURIComponent(collegeName)}/${encodeURIComponent(
            societyName
          )}/past-events`
        )
        .then((response) => {
          setSociety(response.data.society);
          setPastEvents(response.data.pastEvents || []);
        })
        .catch((err) => {
          console.error("Error fetching past events:", err);
          setPastEvents([]);
        });
    } else {
      console.error(
        "collegeName or societyName is undefined. Check the URL and route configuration."
      );
    }
  }, [collegeName, societyName]);

  const getImageGridTemplate = (numImages) => {
    switch (numImages) {
      case 1:
        return {
          gridTemplateColumns: '1fr',
          gridTemplateRows: '1fr',
          width: '100%',
        };
      case 2:
        return {
          gridTemplateColumns: 'repeat(2, 1fr)',
          gridTemplateRows: '1fr',
          width: '100%',
        };
      case 4:
        return {
          gridTemplateColumns: 'repeat(2, 1fr)',
          gridTemplateRows: 'repeat(2, 1fr)',
          width: '100%',
        };
      default:
        return {
          gridTemplateColumns: 'repeat(2, 1fr)',
          gridTemplateRows: '1fr',
          width: '100%',
        };
    }
  };

  return (
    <div>
      <h2 className="text-4xl font-bold mb-4 text-black mt-2">Past <span className="text-indigo-700">Events</span></h2>

      {user && society && user._id === society.userId && (
        <div className="mb-4">
          <Link
            to={`/societies/${encodeURIComponent(
              collegeName
            )}/${encodeURIComponent(societyName)}/add-past-event`}
          >
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Add Past Event
            </button>
          </Link>
        </div>
      )}

      <div>
        {pastEvents.length > 0 ? (
          pastEvents.map((event, index) => (
            <div
              key={index}
              className="mb-8 p-4 border border-gray-300 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
              <p className="mb-4">{event.description}</p>

              <div className="flex flex-wrap">
                <div className="w-full md:w-1/2 p-2">
                  <div
                    className="grid gap-2"
                    style={getImageGridTemplate(event.photos.length)}
                  >
                    {event.photos.map((photo, photoIndex) => (
                      <img
                        key={photoIndex}
                        src={photo}
                        alt="Event"
                        className="w-full h-64 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                </div>
                <div className="w-full md:w-1/2 p-2">
                  {event.videoUrl && (
                    <ReactPlayer url={event.videoUrl} width="100%" controls />
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No past events found.</p>
        )}
      </div>
    </div>
  );
};

export default PastEvents;
