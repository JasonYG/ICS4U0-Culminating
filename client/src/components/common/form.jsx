import React from "react";
const Form = props => {
  return (
    <form onSubmit={props.raiseSubmit}>
      <div className="field">
        <label htmlFor="" className="subtitle">
          {props.label}
        </label>
        <input
          type="text"
          placeholder="subject"
          value={props.topic}
          className="input topic-input"
          onChange={props.raiseChange}
        />
      </div>
    </form>
  );
};

export default Form;
