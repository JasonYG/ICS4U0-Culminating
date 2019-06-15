import React from "react";

//image path
const Logo = props => {
  return (
    <a className="navbar-item">
      <img src={props.imagePath} className="img-fluid logo-img" />
    </a>
  );
};

export default Logo;
