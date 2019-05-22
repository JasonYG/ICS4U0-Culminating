import React from "react";
import Logo from "./logo";
import HomeTitle from "./homeTitle";
import Subheading from "./subheading";

const NavBar = props => {
  const { subheadings } = props;
  const { imagePath } = props;
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Logo />
      </div>

      <HomeTitle />
    </nav>
  );
};

export default NavBar;
