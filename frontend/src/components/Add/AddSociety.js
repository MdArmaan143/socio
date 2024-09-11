import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddSociety = () => {
  const [formData, setFormData] = useState({
    societyName: '',
    mentorName: '',
    email: '',
    type: '',
    collegeId: '',
    description: '',
    slogan: ''
  });
  const [societyLogo, setSocietyLogo] = useState(null);
  const [user, setUser] = useState(null);
  const [colleges, setColleges] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('/user', { withCredentials: true });
        setUser(response.data);
      } catch (err) {
        console.error('Error fetching user:', err);
      }
    };

    const fetchColleges = async () => {
      try {
        const response = await axios.get('/college/all');
        setColleges(response.data);
      } catch (err) {
        console.error('Error fetching colleges:', err);
      }
    };

    fetchUser();
    fetchColleges();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogoChange = (e) => {
    setSocietyLogo(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('societyName', formData.societyName);
    data.append('mentorName', formData.mentorName);
    data.append('email', formData.email);
    data.append('type', formData.type);
    data.append('collegeId', formData.collegeId);
    data.append('description', formData.description);
    data.append('slogan', formData.slogan);
    data.append('societyLogo', societyLogo);

    if (user) {
      axios.post('/society/add', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${user.token}`
        }
      })
        .then(() => window.location.href = '/profile')
        .catch(err => {
          if (err.response && err.response.status === 400) {
            alert('A society with this name already exists!');
          } else {
            console.error('Error adding society:', err);
          }
        });
    } else {
      console.error('User is not authenticated');
    }
  };

  if (!user) {
    return <p className="text-center text-gray-500">Loading user...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-100">
      <h2 className="text-3xl font-bold mb-6">Add Society</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="societyName"
          placeholder="Society Name"
          onChange={handleChange}
          value={formData.societyName}
          className="px-4 py-2 border rounded-lg w-full"
          required
        />
        <input
          name="mentorName"
          placeholder="Mentor Name"
          onChange={handleChange}
          value={formData.mentorName}
          className="px-4 py-2 border rounded-lg w-full"
          required
        />
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={formData.email}
          className="px-4 py-2 border rounded-lg w-full"
          type="email"
          required
        />
        <select
          name="type"
          onChange={handleChange}
          value={formData.type}
          className="px-4 py-2 border rounded-lg w-full"
          required
        >
          <option value="" disabled>Select Type of Society</option>
          <option value="Tech">Tech</option>
          <option value="Sports">Sports</option>
          <option value="Dance">Dance</option>
          <option value="Music">Music</option>
          <option value="Gaming">Gaming</option>
        </select>
        <select
          name="collegeId"
          onChange={handleChange}
          value={formData.collegeId}
          className="px-4 py-2 border rounded-lg w-full"
          required
        >
          <option value="" disabled>Select College</option>
          {colleges.map(college => (
            <option key={college._id} value={college._id}>{college.collegeName}</option>
          ))}
        </select>
        <textarea
          name="description"
          placeholder="Society Description"
          onChange={handleChange}
          value={formData.description}
          className="px-4 py-2 border rounded-lg w-full"
          required
        />
        <input
          name="slogan"
          placeholder="Society Slogan"
          onChange={handleChange}
          value={formData.slogan}
          className="px-4 py-2 border rounded-lg w-full"
          required
        />
        <input
          type="file"
          name="societyLogo"
          onChange={handleLogoChange}
          className="px-4 py-2 border rounded-lg w-full"
          accept="image/*"
          required
        />
        <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-600">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddSociety;
