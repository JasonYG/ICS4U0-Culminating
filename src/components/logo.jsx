import React from "react";
// import "../App.css";

const Logo = props => {
  const iconCss = {};
  return (
    <a className="navbar-item" href="">
      <img src={require("../images/logo.png")} className="img-fluid logo-img" />
    </a>
  );
};

export default Logo;
