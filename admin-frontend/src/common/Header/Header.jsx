import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext"; // Correct import
import "./Header.css";

const Header = () => {
  const { user, logout } = useContext(AuthContext); // Use AuthContext, not AuthProvider
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Clear user state
    navigate("/login"); // Redirect to login page
  };

  return (
    <header className="header">
      <h1 className="header-title">Hospital Admin</h1>
      <nav className="nav-links">
        <Link to="/">Dashboard</Link>
        <Link to="/doctors">Doctors</Link>
        <Link to="/departments">Departments</Link>
        <Link to="/appointments">Appointments</Link>

        {/* Conditional rendering based on user state */}
        {user ? (
          <>
            <span className="user-greeting">Welcome, {user.username}</span>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
