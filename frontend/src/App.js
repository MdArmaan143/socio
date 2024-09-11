import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import SignupCollege from "./components/Signup/SignupCollege";
import SignupSociety from "./components/Signup/SignupSociety";
import SignupStudent from "./components/Signup/SignupStudent";
import Profile from "./components/Profile/Profile";
import Form from "./components/Forms/Form";
import About from "./components/About/About";
import "./App.css";
import Login from "./components/Signup/Login";
import Signup from "./components/Signup/Signup";
import AddCollege from "./components/Add/AddCollege";
import AddSociety from "./components/Add/AddSociety";
import Home from "./components/Home/Home";
import SocietyList from "./components/Home/SocietyList";
import SocietyPage from "./components/SocietyPage/SocietyPage";
import PastEvents from "./components/SocietyPage/PastEvents";
import Details from "./components/SocietyPage/Details";
import Members from "./components/SocietyPage/Members";
import SocietyRequests from "./components/Add/SocietyRequests";
import StudentRequests from "./components/Add/StudentRequests";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signup/college" element={<SignupCollege />} />
          <Route path="/signup/society" element={<SignupSociety />} />
          <Route path="/signup/student" element={<SignupStudent />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/form/college" element={<Form type="college" />} />
          <Route path="/form/society" element={<Form type="society" />} />
          <Route path="/form/student" element={<Form type="student" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add-college" element={<AddCollege />} />
          <Route path="/add-society" element={<AddSociety />} />
          <Route path="/societies/:collegeName" element={<SocietyList />} />
          <Route path="/societies/:collegeName/:societyName/*" element={<SocietyPage />} />
          <Route path="/college/requests" element={<SocietyRequests />} />
          <Route path="/society/requests" element={<StudentRequests />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
