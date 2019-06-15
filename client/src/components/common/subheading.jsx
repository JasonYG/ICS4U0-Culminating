import React from "react";
import { NavLink } from "react-router-dom";

const Subheading = props => {
  return (
    <NavLink
      to={`/${props.heading.toLowerCase()}/`}
      activeClassName="is-active"
      className="navbar-item subheading is-tab"
    >
      {props.heading}
    </NavLink>
  );
};

export default Subheading;
