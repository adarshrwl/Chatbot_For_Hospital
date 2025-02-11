// src/common/footer/Footer.jsx
import React from "react";
import "./Footer.css";

const Footer = () => (
  <footer className="footer">
    <p>
      &copy; {new Date().getFullYear()} Hospital Admin. All rights reserved.
    </p>
  </footer>
);

export default Footer;
