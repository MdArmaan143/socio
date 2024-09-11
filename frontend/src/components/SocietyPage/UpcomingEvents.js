import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import AddUpcomingEvent from "../Add/AddUpcomingEvent";

const UpcomingEvents = () => {
  const { collegeName, societyName } = useParams();
  const decodedSocietyName = decodeURIComponent(societyName);
  const [events, setEvents] = useState([]);
  const [value, setValue] = useState(new Date());
  const [isSocietyOwner, setIsSocietyOwner] = useState(false);

  useEffect(() => {
    const fetchUserAndSociety = async () => {
      try {
        const userResponse = await axios.get("/user", {
          withCredentials: true,
        });
        const user = userResponse.data;

        const societyResponse = await axios.get(
          `/societies/${collegeName}/${decodedSocietyName}`
        );
        const society = societyResponse.data;

        if (society && user && society.userId === user._id) {
          setIsSocietyOwner(true);
        }
      } catch (error) {
        setIsSocietyOwner(false);
      }
    };

    fetchUserAndSociety();
  }, [collegeName, decodedSocietyName]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `/societies/${collegeName}/${decodedSocietyName}/upcoming-events`
        );
        if (Array.isArray(response.data)) {
          setEvents(response.data);
        } else {
          setEvents([]);
        }
      } catch (error) {
        setEvents([]);
      }
    };

    fetchEvents();
  }, [collegeName, decodedSocietyName]);

  const getTileContent = ({ date, view }) => {
    if (view === "month" && Array.isArray(events)) {
      const event = events.find(
        (event) => new Date(event.date).toDateString() === date.toDateString()
      );
      if (event) {
        return <p className="event-indicator">{event.title}</p>;
      }
    }
    return null;
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded-md mt-2">
      <h2 className="text-4xl font-bold mb-6 text-center">
            Upcoming <span className="text-indigo-700">Events</span>
          </h2>
      <div className="flex justify-center gap-x-8 flex-wrap">
        <div>
          {isSocietyOwner && (
            <div className="mb-4">
              <AddUpcomingEvent />
            </div>
          )}
        </div>

        <div>
          <div className="flex justify-center">
            <Calendar
              value={value}
              onChange={setValue}
              tileContent={getTileContent}
              className="react-calendar"
            />
          </div>
          {value && (
            <div className="mt-4">
              <h3 className="text-xl font-semibold text-center">
                Event Description:
              </h3>
              <p className="text-center">
                {(Array.isArray(events) &&
                  events.find(
                    (event) =>
                      new Date(event.date).toDateString() ===
                      value.toDateString()
                  )?.description) ||
                  "No events on this date"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpcomingEvents;
