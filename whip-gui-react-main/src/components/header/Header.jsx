import React from "react";
import "./header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex navbar">
      <div className="logo">Whispersnap BG</div>
      <div className="links flex">
        <Link to={"assets/props"}>Props</Link>
        <Link to={"assets/background"}>Background</Link>
        <Link to={"assets/filters"}>Filters</Link>
      </div>
    </header>
  );
};

export default Header;
