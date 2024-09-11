import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CollegeForm from './CollegeForm';
import SocietyForm from './SocietyForm';
import StudentForm from './StudentForm';

const Form = ({ type }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/user')
      .then(response => {
        setUser(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching user:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>error h </div>;
  }

  if (!user || !user.signupType) {
    return <div>Error: User or signup type not found</div>;
  }

  switch (type) {
    case 'college':
      return <CollegeForm user={user} />;
    case 'society':
      return <SocietyForm user={user} />;
    case 'student':
      return <StudentForm user={user} />;
    default:
      return <div>Invalid signup type</div>;
  }
};

export default Form;
