import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const Subheading = props => {
  return (
    <Link
      to={`/${props.heading.toLowerCase()}/`}
      className="navbar-item subheading is-tab"
    >
      {props.heading}
    </Link>
  );
};

export default Subheading;
