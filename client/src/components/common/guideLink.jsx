import React from "react";
const GuideLink = props => {
  return (
    <h2
      className={props.styling}
      onClick={() => props.handleGuideSelect(props.studyGuide)}
    >
      {props.name}
    </h2>
  );
};

export default GuideLink;
