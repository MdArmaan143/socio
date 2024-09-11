import React, { useState, useEffect } from "react";
import axios from "axios";

const StudentForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    stream: "",
    batch: "",
    collegeName: "", // Added collegeName to the formData state
  });
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("/user")
      .then((response) => setUser(response.data))
      .catch((err) => console.error("Error fetching user:", err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user || !user._id) {
      console.error("User is not defined");
      return;
    }

    axios
      .post("/student/details", { ...formData, userId: user._id })
      .then(() => (window.location.href = "/profile"))
      .catch((err) => console.error("Error submitting student form:", err));
  };

  return (
    <div className="pt-24">
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg"
      >
        <h2 className="text-4xl font-semibold text-center mb-6">
          Student <span className="text-indigo-700">Details</span>
        </h2>
        <div className="mb-4">
          <input
            name="name"
            placeholder="Name"
            onChange={handleChange}
            value={formData.name}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={formData.email}
            type="email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <input
            name="stream"
            placeholder="Stream"
            onChange={handleChange}
            value={formData.stream}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <input
            name="batch"
            placeholder="Batch"
            onChange={handleChange}
            value={formData.batch}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <input
            name="collegeName" // Added input for collegeName
            placeholder="College Name"
            onChange={handleChange}
            value={formData.collegeName}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-2 rounded-lg font-bold hover:bg-indigo-700 transition duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default StudentForm;
