import React from "react";
const SignIn = ({ onClick }) => {
  return (
    <a
      className="button is-primary is-inverted is-outlined subtitle is-4"
      onClick={onClick}
    >
      Sign In
    </a>
  );
};

export default SignIn;
