import React, { useState } from "react";
import { FaRobot, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar-container">

        <div className="logo">
          <FaRobot className="logo-icon" />
          <span>MCP Nexus</span>
        </div>

        <nav className={`nav-links ${menuOpen ? "active" : ""}`}>
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#assistant">AI Assistant</a>
          <a href="#contact">Contact</a>

          <button className="nav-btn">
            Launch AI
          </button>
        </nav>

        <div
          className="mobile-menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

      </div>
    </header>
  );
};

export default Navbar;