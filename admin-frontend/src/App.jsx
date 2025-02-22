import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Header from "./common/Header/Header";
import Footer from "./common/Footer/Footer";
import Sidebar from "./common/Sidebar/Sidebar";
import Dashboard from "./Pages/dashboard/Dashboard";
import Doctors from "./Pages/doctor/Doctors";
import Login from "./Pages/login/Login";
import Signup from "./Pages/signup/Signup";
import Departments from "./Pages/department/department";
import Appointment from "./Pages/appointment/appointment";
import Chat from "./Pages/chat/ChatPage";
import ChatLogPage from "./Pages/chatlog/ChatLogPage";
import "./App.css";

const Layout = ({ children }) => {
  const location = useLocation();

  // Hide Header, Sidebar, and Footer only on the ChatPage
  const hideLayout = location.pathname === "/chat";

  return (
    <div className="app-container">
      {!hideLayout && <Header />}
      <div className="main-content">
        {!hideLayout && <Sidebar />}
        <div className={`content-area ${hideLayout ? "full-width" : ""}`}>
          {children}
        </div>
      </div>
      {!hideLayout && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/appointments" element={<Appointment />} />
          <Route path="/chat-logs" element={<ChatLogPage />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
