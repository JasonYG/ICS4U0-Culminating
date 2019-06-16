import React from "react";
import { Link } from "react-router-dom";

import Subheading from "./subheading";

const NavBar = props => {
  const { subheadings, appTitle, logoComponent } = props;
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        {logoComponent}
        <Link to="/" className="navbar-item">
          {appTitle}
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
