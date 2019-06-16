import React from "react";
const Loading = () => {
  return (
    <React.Fragment>
      <h1 className="title">Your study guide is being created.</h1>
      <progress class="progress is-small is-primary" max="100">
        15%
      </progress>
    </React.Fragment>
  );
};

export default Loading;
