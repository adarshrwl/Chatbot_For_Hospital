// src/common/sidebar/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => (
  <aside className="sidebar">
    <nav>
      <ul>
        <li>
          <NavLink to="/" end>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/doctors">Doctors</NavLink>
        </li>
        <li>
          <NavLink to="/departments">departments</NavLink>
        </li>
        {/* Additional links can be added here */}
      </ul>
    </nav>
  </aside>
);

export default Sidebar;
