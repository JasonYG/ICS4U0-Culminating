import React from "react";
import { Link } from "react-router-dom";

import Logo from "./logo";
import Subheading from "./subheading";

const NavBar = props => {
  const { subheadings } = props;
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Logo imagePath={props.imagePath} />
        <Link to="/" className="navbar-item">
          Study4Life
        </Link>
      </div>
      <div className="navbar-menu">
        <div className="navbar-end">
          {subheadings.map(subheading => (
            <Subheading key={subheading} heading={subheading} />
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
