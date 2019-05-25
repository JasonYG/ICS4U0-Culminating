import React from "react";
import Logo from "./logo";
import Subheading from "./subheading";

const NavBar = props => {
  const { subheadings } = props;
  const { imagePath } = props;
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Logo />
        <h1 className="navbar-item">Study4Life</h1>
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
