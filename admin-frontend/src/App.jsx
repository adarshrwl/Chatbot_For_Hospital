// src/App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./common/Header/Header";
import Footer from "./common/Footer/Footer";
import Sidebar from "./common/Sidebar/Sidebar";
import Dashboard from "./Pages/dashboard/Dashboard";
import Doctors from "./Pages/doctor/Doctors";
import Login from "./Pages/login/Login";
import Signup from "./Pages/signup/Signup";
import Departments from "./Pages/department/department";
import "./App.css";
import Appointment from "./Pages/appointment/appointment";
import Chat from "./Pages/chat/ChatPage";

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <div className="main-content">
          <Sidebar />
          <div className="content-area">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/doctors" element={<Doctors />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="*" element={<Navigate to="/" />} />
              <Route path="/departments" element={<Departments />} />
              <Route path="/appointments" element={<Appointment />} />
              <Route path="/chat" element={<Chat />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
