import React, { useState } from "react";

function Navbar() {
  const navbarStyle = {
    backgroundColor: "#333",
    overflow: "hidden",
  };

  const linkStyle = {
    float: "left",
    display: "block",
    color: "white",
    textAlign: "center",
    padding: "14px 20px",
    textDecoration: "none",
    transition: "background-color 0.3s ease, color 0.3s ease",
  };

  const activeStyle = {
    backgroundColor: "#04AA6D",
    color: "white",
  };

  const hoverStyle = {
    backgroundColor: "#ddd",
    color: "black",
  };

  const [hovered, setHovered] = useState(null);

  const handleMouseEnter = (index) => {
    setHovered(index);
  };

  const handleMouseLeave = () => {
    setHovered(null);
  };

  return (
    <div style={navbarStyle}>
      <a
        href="#home"
        style={hovered === 0 ? { ...linkStyle, ...hoverStyle } : { ...linkStyle, ...activeStyle }}
        onMouseEnter={() => handleMouseEnter(0)}
        onMouseLeave={handleMouseLeave}
      >
        Home
      </a>
      <a
        href="#about"
        style={hovered === 1 ? { ...linkStyle, ...hoverStyle } : linkStyle}
        onMouseEnter={() => handleMouseEnter(1)}
        onMouseLeave={handleMouseLeave}
      >
        About
      </a>
      <a
        href="#contact"
        style={hovered === 2 ? { ...linkStyle, ...hoverStyle } : linkStyle}
        onMouseEnter={() => handleMouseEnter(2)}
        onMouseLeave={handleMouseLeave}
      >
        Contact
      </a>
    </div>
  );
}

export default Navbar;
