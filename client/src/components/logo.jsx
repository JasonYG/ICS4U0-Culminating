import React from "react";

const Logo = props => {
  const iconCss = {};
  return (
    <a className="navbar-item">
      <img src={require("../images/logo.png")} className="img-fluid logo-img" />
    </a>
  );
};

export default Logo;
